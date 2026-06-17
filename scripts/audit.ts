import { runInstrumentAudit } from "../src/audit/instrumentAudit";
import { ALL_QUESTIONS } from "../src/data/questions";
import { calculateResult, POSITION_PRIORS } from "../src/scoring/engine";
import { TIM_MODELS } from "../src/constants/socionicsData";
import type { ModelAPosition, TestSession, TIM } from "../src/types/socionics";
import { applyAnswer, applySkip } from "../src/session/sessionState";

const fail = (message: string): never => {
  throw new Error(message);
};

const report = runInstrumentAudit(10_000);
if (!report.success) {
  console.error(report.errors.join("\n"));
  fail(`Audit struktural gagal dengan ${report.errors.length} error.`);
}

const coreAndHoldout = ALL_QUESTIONS.filter((question) => !question.isTieBreak);
const allLow = Object.fromEntries(coreAndHoldout.map((question) => [question.id, 1]));
const allHigh = Object.fromEntries(coreAndHoldout.map((question) => [question.id, 5]));

const sessionFixture: TestSession = {
  mode: "ringkas",
  answers: {},
  skippedIds: [],
  questionIds: coreAndHoldout.slice(0, 2).map((question) => question.id),
  currentIndex: 0,
  startedAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
  seed: 1,
  appVersion: "2.0.0",
  completed: false,
};
const savedFixture = applyAnswer(sessionFixture, sessionFixture.questionIds[0], 4, false);
if (savedFixture.answers[sessionFixture.questionIds[0]] !== 4) fail("applyAnswer tidak menyimpan jawaban.");
if (savedFixture.currentIndex !== 0) fail("applyAnswer advance=false tetap memindahkan indeks.");
const advancedFixture = applyAnswer(savedFixture, savedFixture.questionIds[0], 5, true);
if (advancedFixture.currentIndex !== 1 || advancedFixture.answers[savedFixture.questionIds[0]] !== 5) {
  fail("applyAnswer gagal memperbarui jawaban sebelum berpindah.");
}
const skippedFixture = applySkip(savedFixture, savedFixture.questionIds[0]);
if (skippedFixture.answers[savedFixture.questionIds[0]] !== undefined) {
  fail("applySkip tidak menghapus jawaban lama pada pertanyaan yang dilewati.");
}
if (!skippedFixture.skippedIds.includes(savedFixture.questionIds[0])) {
  fail("applySkip tidak mencatat pertanyaan yang dilewati.");
}

const lowResult = calculateResult(allLow, ALL_QUESTIONS);
const highResult = calculateResult(allHigh, ALL_QUESTIONS);
const lowVector = JSON.stringify(lowResult.channelProfile);
const highVector = JSON.stringify(highResult.channelProfile);
if (lowVector === highVector) fail("Semua jawaban 1 dan semua jawaban 5 menghasilkan profil yang sama.");

const syntheticFailures: string[] = [];
for (const type of Object.keys(TIM_MODELS) as TIM[]) {
  const answers: Record<string, number> = {};
  for (const question of coreAndHoldout) {
    const positions = TIM_MODELS[type].positions;
    const position = (Object.keys(positions) as ModelAPosition[]).find((key) => positions[key] === question.element);
    if (!position) continue;
    const expected = POSITION_PRIORS[position][question.channel];
    answers[question.id] = expected >= 0.65 ? 5 : expected >= 0.2 ? 4 : expected <= -0.65 ? 1 : expected <= -0.2 ? 2 : 3;
  }
  const result = calculateResult(answers, ALL_QUESTIONS);
  if (result.top3[0].type !== type) {
    syntheticFailures.push(`${type} -> ${result.top3.map((entry) => entry.type).join(", ")}`);
  }
}
if (syntheticFailures.length > 0) {
  fail(`Synthetic recovery gagal:\n${syntheticFailures.join("\n")}`);
}

console.log(JSON.stringify({
  status: "passed",
  metrics: report.metrics,
  warnings: report.warnings,
  syntheticTypesRecovered: 16,
  extremeProfilesDistinct: lowVector !== highVector,
  uniformResponseConfidence: {
    allLow: lowResult.confidence,
    allHigh: highResult.confidence,
  },
}, null, 2));
