import type { TestSession } from "../types/socionics";

export function applyAnswer(
  session: TestSession,
  questionId: string,
  rating: number,
  advance: boolean,
): TestSession {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new RangeError(`Rating harus bilangan bulat 1–5, menerima ${rating}.`);
  }
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }

  return {
    ...session,
    answers: { ...session.answers, [questionId]: rating },
    skippedIds: session.skippedIds.filter((id) => id !== questionId),
    currentIndex: advance
      ? Math.min(session.currentIndex + 1, session.questionIds.length - 1)
      : session.currentIndex,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function applySkip(session: TestSession, questionId: string): TestSession {
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }
  const { [questionId]: _removedAnswer, ...remainingAnswers } = session.answers;
  return {
    ...session,
    answers: remainingAnswers,
    skippedIds: Array.from(new Set([...session.skippedIds, questionId])),
    currentIndex: Math.min(session.currentIndex + 1, session.questionIds.length - 1),
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function moveToQuestion(session: TestSession, index: number): TestSession {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) {
    return session;
  }
  return { ...session, currentIndex: index, lastUpdatedAt: new Date().toISOString() };
}
