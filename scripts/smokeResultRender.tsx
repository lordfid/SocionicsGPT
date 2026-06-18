import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ResultPortal from "../src/components/ResultPortal";
import { TIM_MODELS } from "../src/constants/socionicsData";
import { ALL_QUESTIONS } from "../src/data/questions";
import { calculateResult } from "../src/scoring/engine";
import { getPositionEditorial, getRelationEditorial } from "../src/results/modelAEditorial";
import type { ModelAPosition, TIM } from "../src/types/socionics";

const answers = Object.fromEntries(
  ALL_QUESTIONS.map((question, index) => [question.id, ((index * 3) % 5) + 1]),
);

const result = calculateResult(answers, ALL_QUESTIONS, {
  questionIds: ALL_QUESTIONS.map((question) => question.id),
  startedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
});

const positions: ModelAPosition[] = [
  "Base",
  "Creative",
  "Role",
  "Vulnerable",
  "Suggestive",
  "Mobilizing",
  "Ignoring",
  "Demonstrative",
];

for (const type of Object.keys(TIM_MODELS) as TIM[]) {
  for (const theme of ["dark", "light"] as const) {
    const html = renderToStaticMarkup(
      <ResultPortal primaryType={type} result={result} theme={theme} />,
    );

    if (html.length < 5000) {
      throw new Error(`${type}/${theme}: hasil render terlalu pendek (${html.length}).`);
    }
    if (/\bundefined\b|\bnull\b/.test(html)) {
      throw new Error(`${type}/${theme}: render mengandung undefined/null.`);
    }
    if (!html.includes("Daftar bab hasil") || !html.includes("Kualitas bukti hasil")) {
      throw new Error(`${type}/${theme}: struktur hasil utama tidak lengkap.`);
    }
  }

  for (const position of positions) {
    const detail = getPositionEditorial(type, position);
    if (!detail.inPractice || !detail.evidence || !detail.caution) {
      throw new Error(`${type}/${position}: rincian Model A tidak lengkap.`);
    }
  }
}

for (const code of [
  "duality",
  "activation",
  "mirror",
  "identity",
  "kindred",
  "business",
  "semi_duality",
  "mirage",
  "contrary",
  "quasi_identity",
  "superego",
  "conflict",
  "benefit",
  "supervision",
]) {
  const relation = getRelationEditorial(code);
  if (!relation.summary || !relation.strength || !relation.friction || !relation.advice) {
    throw new Error(`${code}: editorial relasi tidak lengkap.`);
  }
}

console.log("Smoke render hasil lulus: 16 TIM × 2 tema, 128 posisi Model A, dan 14 relasi.");
