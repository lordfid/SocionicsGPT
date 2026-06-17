import type { InformationElement, MeasurementChannel, SocionicsQuestion } from "../types/socionics";
import { ALL_QUESTIONS, getCoreQuestions, getHoldoutQuestions, getTieBreakQuestions } from "../data/questions";
import { canonicalPair } from "../data/tieBreakQuestions";
import { selectQuestionsForMode } from "../hooks/useTestSession";

const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const CHANNELS: MeasurementChannel[] = ["producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"];

export interface InstrumentAuditReport {
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalItems: number;
    coreItems: number;
    holdoutItems: number;
    tieBreakItems: number;
    completeCoreCells: number;
    uniqueStatements: number;
    contexts: number;
    simulatedSessions: number;
  };
}

const normalize = (value: string): string => value
  .toLocaleLowerCase("id-ID")
  .replace(/[^a-z0-9\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const SIMILARITY_STOPWORDS = new Set([
  "saya", "aku", "yang", "dan", "dengan", "untuk", "dari", "pada", "dalam",
  "saat", "ketika", "kalau", "lebih", "bisa", "tidak", "agar", "atau", "setelah",
  "sebuah", "orang", "biasanya", "terasa", "langsung", "mulai", "tetap", "tanpa",
]);

function contentTokens(value: string): Set<string> {
  return new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length > 2 && !SIMILARITY_STOPWORDS.has(token)),
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  const union = new Set([...left, ...right]);
  if (union.size === 0) return 0;
  let overlap = 0;
  for (const token of left) if (right.has(token)) overlap += 1;
  return overlap / union.size;
}

function cellCoverage(questions: SocionicsQuestion[]): Set<string> {
  return new Set(questions.filter((question) => !question.isTieBreak).map((question) => `${question.element}_${question.channel}`));
}

export function runInstrumentAudit(simulatedSessions = 200): InstrumentAuditReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const core = getCoreQuestions();
  const holdout = getHoldoutQuestions();
  const tieBreak = getTieBreakQuestions();

  const ids = new Set<string>();
  const normalizedStatements = new Map<string, string[]>();
  for (const question of ALL_QUESTIONS) {
    if (ids.has(question.id)) errors.push(`ID duplikat: ${question.id}`);
    ids.add(question.id);
    const key = normalize(question.statement);
    const list = normalizedStatements.get(key) ?? [];
    list.push(question.id);
    normalizedStatements.set(key, list);
    if (!question.responseFocus.trim()) errors.push(`responseFocus kosong: ${question.id}`);
  }

  for (const [statement, questionIds] of normalizedStatements.entries()) {
    if (questionIds.length > 1) errors.push(`Pernyataan identik pada ${questionIds.join(", ")}: ${statement.slice(0, 70)}`);
  }

  // Lexical near-duplicate gate. This is intentionally conservative: it catches
  // sentence factories while avoiding false positives from normal Socionics vocabulary.
  const semanticItems = ALL_QUESTIONS.filter((question) => !question.isTieBreak);
  const tokenCache = new Map(semanticItems.map((question) => [question.id, contentTokens(question.statement)]));
  for (let leftIndex = 0; leftIndex < semanticItems.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < semanticItems.length; rightIndex += 1) {
      const left = semanticItems[leftIndex];
      const right = semanticItems[rightIndex];
      const similarity = jaccard(tokenCache.get(left.id)!, tokenCache.get(right.id)!);
      if (similarity >= 0.68) {
        errors.push(`Kemiripan leksikal terlalu tinggi (${similarity.toFixed(2)}): ${left.id} dan ${right.id}.`);
      } else if (similarity >= 0.55) {
        warnings.push(`Periksa kemiripan leksikal (${similarity.toFixed(2)}): ${left.id} dan ${right.id}.`);
      }
    }
  }

  let completeCoreCells = 0;
  for (const element of ELEMENTS) {
    for (const channel of CHANNELS) {
      const items = core.filter((question) => question.element === element && question.channel === channel);
      if (items.length !== 3) errors.push(`Sel ${element}_${channel} memiliki ${items.length} core item; wajib 3.`);
      else completeCoreCells += 1;
      if (new Set(items.map((question) => question.context)).size < 3) {
        warnings.push(`Sel ${element}_${channel} belum memakai tiga konteks berbeda.`);
      }
    }
    const elementHoldouts = holdout.filter((question) => question.element === element);
    if (elementHoldouts.length !== 4) errors.push(`${element} memiliki ${elementHoldouts.length} holdout; wajib 4.`);
  }

  const pairCounts = new Map<string, number>();
  for (const question of tieBreak) {
    const tag = question.tieBreakTags?.[0];
    const supported = Object.keys(question.tieBreakSupport ?? {});
    if (!tag || supported.length !== 2) {
      errors.push(`Tie-break ${question.id} tidak memiliki tag atau dua kandidat dukungan.`);
      continue;
    }
    if (canonicalPair(supported[0] as never, supported[1] as never) !== tag) {
      errors.push(`Tag tie-break tidak canonical: ${question.id} -> ${tag}`);
    }
    pairCounts.set(tag, (pairCounts.get(tag) ?? 0) + 1);
  }
  for (const [pair, count] of pairCounts.entries()) {
    if (count !== 2) errors.push(`Pasangan ${pair} memiliki ${count} tie-break; wajib 2.`);
  }
  if (pairCounts.size !== 16) errors.push(`Jumlah pasangan tie-break ${pairCounts.size}; wajib 16.`);

  // Repeated opening audit catches templated sentence factories without rejecting
  // normal Indonesian openings such as "Saya" by using the first four words.
  const openings = new Map<string, string[]>();
  for (const question of core) {
    const opening = normalize(question.statement).split(" ").slice(0, 4).join(" ");
    const list = openings.get(opening) ?? [];
    list.push(question.id);
    openings.set(opening, list);
  }
  for (const [opening, questionIds] of openings.entries()) {
    if (questionIds.length > 12) warnings.push(`Pembuka "${opening}" dipakai ${questionIds.length} kali.`);
  }

  for (let seed = 1; seed <= simulatedSessions; seed += 1) {
    for (const mode of ["ringkas", "standar", "mendalam"] as const) {
      const selection = selectQuestionsForMode(mode, seed);
      const expectedCount = mode === "ringkas" ? 80 : mode === "standar" ? 128 : 224;
      if (selection.length !== expectedCount) {
        errors.push(`Seed ${seed} mode ${mode}: ${selection.length} item, seharusnya ${expectedCount}.`);
        break;
      }
      const coverage = cellCoverage(selection);
      if (coverage.size !== 64) {
        errors.push(`Seed ${seed} mode ${mode}: cakupan hanya ${coverage.size}/64 sel.`);
        break;
      }
    }
    if (errors.length > 20) break;
  }

  if (core.length !== 192) errors.push(`Core item ${core.length}; wajib 192.`);
  if (holdout.length !== 32) errors.push(`Holdout item ${holdout.length}; wajib 32.`);
  if (tieBreak.length !== 32) errors.push(`Tie-break item ${tieBreak.length}; wajib 32.`);

  return {
    success: errors.length === 0,
    errors,
    warnings,
    metrics: {
      totalItems: ALL_QUESTIONS.length,
      coreItems: core.length,
      holdoutItems: holdout.length,
      tieBreakItems: tieBreak.length,
      completeCoreCells,
      uniqueStatements: normalizedStatements.size,
      contexts: new Set(ALL_QUESTIONS.map((question) => question.context)).size,
      simulatedSessions,
    },
  };
}
