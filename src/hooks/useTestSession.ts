import { useCallback, useEffect, useMemo, useState } from "react";
import type { InformationElement, MeasurementChannel, SocionicsQuestion, TestSession } from "../types/socionics";
import { ALL_QUESTIONS, getCoreQuestions, getHoldoutQuestions, getQuestionById } from "../data/questions";
import { getTieBreakQuestionsForPair } from "../data/tieBreakQuestions";
import { applyAnswer, applySkip, moveToQuestion } from "../session/sessionState";

const STORAGE_KEY = "socionics_dalam_diriku_session_v2";
const LEGACY_STORAGE_KEY = "socionics_dalam_diriku_session_v1";
const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const CHANNELS: MeasurementChannel[] = ["producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"];

function createLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function shuffleDeterministic<T>(items: readonly T[], seed: number): T[] {
  const random = createLcg(seed);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function spreadSimilarItems(items: SocionicsQuestion[], seed: number): SocionicsQuestion[] {
  const pool = shuffleDeterministic(items, seed);
  const result: SocionicsQuestion[] = [];

  while (pool.length > 0) {
    const previous = result[result.length - 1];
    let chosenIndex = pool.findIndex((candidate) =>
      !previous || (candidate.element !== previous.element && candidate.channel !== previous.channel),
    );
    if (chosenIndex < 0) {
      chosenIndex = pool.findIndex((candidate) => !previous || candidate.element !== previous.element);
    }
    if (chosenIndex < 0) chosenIndex = 0;
    result.push(pool.splice(chosenIndex, 1)[0]);
  }

  return result;
}

function groupCoreByCell(): Map<string, SocionicsQuestion[]> {
  const map = new Map<string, SocionicsQuestion[]>();
  for (const question of getCoreQuestions()) {
    const key = `${question.element}_${question.channel}`;
    const group = map.get(key) ?? [];
    group.push(question);
    map.set(key, group);
  }
  for (const group of map.values()) group.sort((left, right) => left.id.localeCompare(right.id));
  return map;
}

function selectVariant(group: SocionicsQuestion[], seed: number, offset = 0): SocionicsQuestion {
  const index = Math.abs(seed + offset) % group.length;
  return group[index];
}

/**
 * Stratified selection guarantees at least one item in every element × channel cell.
 * Ringkas: 64 cells + 16 balanced replications = 80.
 * Standar: 64 cells + 48 balanced replications + 16 holdouts = 128.
 * Mendalam: all 192 core + 32 holdouts = 224, followed by up to two adaptive pair items.
 */
export function selectQuestionsForMode(
  mode: TestSession["mode"],
  seed: number,
): SocionicsQuestion[] {
  const cellMap = groupCoreByCell();
  const selected: SocionicsQuestion[] = [];

  if (mode === "mendalam") {
    selected.push(...getCoreQuestions(), ...getHoldoutQuestions());
    return spreadSimilarItems(selected, seed + 901);
  }

  const primaryByCell = new Map<string, SocionicsQuestion>();
  ELEMENTS.forEach((element, elementIndex) => {
    CHANNELS.forEach((channel, channelIndex) => {
      const key = `${element}_${channel}`;
      const group = cellMap.get(key);
      if (!group || group.length < 3) throw new Error(`Bank tidak lengkap pada sel ${key}.`);
      const primary = selectVariant(group, seed + elementIndex * 17 + channelIndex * 31);
      primaryByCell.set(key, primary);
      selected.push(primary);
    });
  });

  const offset = Math.abs(seed) % CHANNELS.length;

  if (mode === "ringkas") {
    ELEMENTS.forEach((element, elementIndex) => {
      const extraChannels = [
        CHANNELS[(elementIndex + offset) % CHANNELS.length],
        CHANNELS[(elementIndex + offset + 4) % CHANNELS.length],
      ];
      for (const channel of extraChannels) {
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      }
    });
  } else {
    // Add a second replication to six of eight cells per element. The omitted
    // channels rotate, so every channel receives the same total coverage.
    ELEMENTS.forEach((element, elementIndex) => {
      const omitted = new Set([
        (elementIndex + offset) % CHANNELS.length,
        (elementIndex + offset + 4) % CHANNELS.length,
      ]);
      CHANNELS.forEach((channel, channelIndex) => {
        if (omitted.has(channelIndex)) return;
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      });
    });

    const shuffledHoldouts = shuffleDeterministic(getHoldoutQuestions(), seed + 113);
    ELEMENTS.forEach((element) => {
      selected.push(...shuffledHoldouts.filter((question) => question.element === element).slice(0, 2));
    });
  }

  return spreadSimilarItems(selected, seed + 901);
}

function persist(session: TestSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function restoreSession(): TestSession | null {
  for (const key of [STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as Partial<TestSession>;
      if (!parsed.mode || !parsed.seed) continue;
      const questionIds = Array.isArray(parsed.questionIds)
        ? parsed.questionIds.filter((id): id is string => typeof id === "string" && Boolean(getQuestionById(id)))
        : selectQuestionsForMode(parsed.mode, parsed.seed).map((question) => question.id);
      const isLegacy = key === LEGACY_STORAGE_KEY || parsed.appVersion !== "2.0.0";
      const validQuestionIds = new Set(questionIds);
      const restoredAnswers = isLegacy
        ? {}
        : Object.fromEntries(
            Object.entries(parsed.answers ?? {}).filter(([id, value]) =>
              validQuestionIds.has(id) && typeof value === "number" && value >= 1 && value <= 5,
            ),
          );
      const restored: TestSession = {
        mode: parsed.mode,
        answers: restoredAnswers,
        skippedIds: isLegacy ? [] : (parsed.skippedIds ?? []).filter((id) => validQuestionIds.has(id)),
        questionIds,
        currentIndex: isLegacy ? 0 : Math.min(parsed.currentIndex ?? 0, Math.max(0, questionIds.length - 1)),
        startedAt: isLegacy ? new Date().toISOString() : (parsed.startedAt ?? new Date().toISOString()),
        lastUpdatedAt: new Date().toISOString(),
        seed: parsed.seed,
        appVersion: "2.0.0",
        completed: isLegacy ? false : Boolean(parsed.completed),
        tieBreakPair: isLegacy ? undefined : parsed.tieBreakPair,
      };
      persist(restored);
      if (key === LEGACY_STORAGE_KEY) localStorage.removeItem(LEGACY_STORAGE_KEY);
      return restored;
    } catch {
      localStorage.removeItem(key);
    }
  }
  return null;
}

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(restoreSession());
    setHydrated(true);
  }, []);

  const activeQuestions = useMemo(
    () => (session?.questionIds ?? []).map(getQuestionById).filter(Boolean) as SocionicsQuestion[],
    [session?.questionIds],
  );

  const commit = useCallback((next: TestSession): TestSession => {
    persist(next);
    setSession(next);
    return next;
  }, []);

  const startNewSession = useCallback((mode: TestSession["mode"]): TestSession => {
    const seed = Math.floor(Math.random() * 2_000_000_000) + 1;
    const now = new Date().toISOString();
    const questionIds = selectQuestionsForMode(mode, seed).map((question) => question.id);
    return commit({
      mode,
      answers: {},
      skippedIds: [],
      questionIds,
      currentIndex: 0,
      startedAt: now,
      lastUpdatedAt: now,
      seed,
      appVersion: "2.0.0",
      completed: false,
    });
  }, [commit]);

  const answerQuestion = useCallback((questionId: string, rating: number, advance = true): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applyAnswer(session, questionId, rating, advance));
    } catch (error) {
      console.error("Jawaban gagal disimpan", error);
      return null;
    }
  }, [commit, session]);

  const skipQuestion = useCallback((questionId: string): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applySkip(session, questionId));
    } catch (error) {
      console.error("Pertanyaan gagal dilewati", error);
      return null;
    }
  }, [commit, session]);

  const goToQuestion = useCallback((index: number): TestSession | null => {
    if (!session) return null;
    const next = moveToQuestion(session, index);
    return next === session ? session : commit(next);
  }, [commit, session]);

  const appendTieBreakQuestions = useCallback((pair: string, baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    const newIds = getTieBreakQuestionsForPair(pair)
      .map((question) => question.id)
      .filter((id) => !source.questionIds.includes(id));
    if (newIds.length === 0) return source;
    return commit({
      ...source,
      questionIds: [...source.questionIds, ...newIds],
      currentIndex: source.questionIds.length,
      completed: false,
      tieBreakPair: pair,
      lastUpdatedAt: new Date().toISOString(),
    });
  }, [commit, session]);

  const completeSession = useCallback((baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    return commit({ ...source, completed: true, lastUpdatedAt: new Date().toISOString() });
  }, [commit, session]);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setSession(null);
  }, []);

  const currentIndex = session?.currentIndex ?? 0;
  return {
    session,
    activeQuestions,
    currentQuestion: activeQuestions[currentIndex],
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: activeQuestions.length > 0 && currentIndex === activeQuestions.length - 1,
    startNewSession,
    answerQuestion,
    skipQuestion,
    goToQuestion,
    appendTieBreakQuestions,
    completeSession,
    resetSession,
    isSessionLoaded: hydrated,
    allQuestions: ALL_QUESTIONS,
  };
}
