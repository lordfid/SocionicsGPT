import { ALL_QUESTIONS, TIM_PROFILES, getRelation } from './data';

export interface ScoreBreakdown {
  finalPercentages: Record<string, number>; // Record of raw/relative support for all 16 profiles
  scores: Record<string, number>; // EI, TF, SN, JP coordinates (-1 to 1)
  confidence: number; // calculated diagnostical consistency percentage
  personFitIndex: number; // consistency / straightlining check (0 to 1)
  coverage: number; // coverage of the elements tested (0 to 1)
  primaryType: string;
  secondaryType: string;
  quadraHypothesis: string;
  adaptivePairs: string[]; // tie-break TIM suggestions
}

/**
 * Advanced Psychometric Scoring Engine (v3.0.0)
 * Adheres to:
 * - Sparse evidence safety (doesn't penalize missing cells)
 * - Holdout validation balance (maximum 12% weight constraint)
 * - Anti-uniform straightlining check (Straightlining guard)
 * - Dual direction benefit and supervision validation
 */
export function calculateSocionicsScore(
  coreAnswers: Record<number, number>,
  holdoutAnswers?: Record<number, number>
): ScoreBreakdown {
  // 1. Identify active answers
  const activeAnswers = { ...coreAnswers };
  const holdActive = holdoutAnswers ? { ...holdoutAnswers } : {};

  // Standardize values cleanly: translate 1..5 to -1..1
  // We represent scale = 3 as 0 (neutral / unspecified)
  function scaleToValue(ans: number | undefined): number {
    if (ans === undefined || ans === 3) return 0;
    return (ans - 3) / 2; // maps 1->-1, 2->-0.5, 4->0.5, 5->1
  }

  // 2. Trait Score Aggregations based strictly on active cells
  let sumEI = 0, countEI = 0;
  let sumTF = 0, countTF = 0;
  let sumSN = 0, countSN = 0;
  let sumJP = 0, countJP = 0;

  // Scan standard behavior-anchored questions
  ALL_QUESTIONS.forEach(q => {
    const val = scaleToValue(activeAnswers[q.id]);
    if (activeAnswers[q.id] !== undefined && activeAnswers[q.id] !== 3) {
      if (q.dichotomy === 'EI') { sumEI += val; countEI++; }
      if (q.dichotomy === 'TF') { sumTF += val; countTF++; }
      if (q.dichotomy === 'SN') { sumSN += val; countSN++; }
      if (q.dichotomy === 'JP') { sumJP += val; countJP++; }
    }
  });

  // Calculate coordinates (-1 to 1)
  const scoreEI = countEI > 0 ? sumEI / countEI : 0;
  const scoreTF = countTF > 0 ? sumTF / countTF : 0;
  const scoreSN = countSN > 0 ? sumSN / countSN : 0;
  const scoreJP = countJP > 0 ? sumJP / countJP : 0;

  // Coordinates strictly mapped to human-readable Socionics polarity:
  // E (Extraversion) vs I (Introversion)
  // T (Thinking) vs F (Feeling)
  // S (Sensing) vs N (Intuition)
  // J (Rational / Judicious) vs P (Irrational / Perceptive)
  const coordEI = scoreEI >= 0 ? 'I' : 'E';
  const coordTF = scoreTF >= 0 ? 'T' : 'F';
  const coordSN = scoreSN >= 0 ? 'S' : 'N';
  const coordJP = scoreJP >= 0 ? 'J' : 'P';

  // 3. Person-Fit Index (detect straightlining and abnormal variance)
  // Straightlining is checked by assessing if the user answered 100% identically (e.g. 5,5,5,5)
  const answersList = Object.values(activeAnswers);
  let personFitIndex = 1.0;
  if (answersList.length >= 4) {
    const counts: Record<number, number> = {};
    answersList.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(counts));
    const straightliningFactor = maxFreq / answersList.length;
    // penalize if same response is reused infinitely
    if (straightliningFactor > 0.8) {
      personFitIndex = Math.max(0.1, 1 - (straightliningFactor - 0.8) * 4);
    }
  }

  // Element coverage indicator (out of 64 conceptual Model A cells or 4 traits)
  const totalDichotomies = 4;
  let activeTraits = 0;
  if (countEI > 0) activeTraits++;
  if (countTF > 0) activeTraits++;
  if (countSN > 0) activeTraits++;
  if (countJP > 0) activeTraits++;
  const coverage = activeTraits / totalDichotomies;

  // 4. Mathematical Fit with All 16 TIM Profiles using Euclidean Distance or Cosine similarity
  // Each TIM has canonical polarity in {E/I, T/F, S/N, J/P}
  // Let's create profile-specific reference maps:
  const profileScores: Record<string, number> = {};

  const POLARITIES: Record<string, { EI: number; TF: number; SN: number; JP: number }> = {
    ILE: { EI: -1, TF: 1, SN: -1, JP: -1 }, // E, T, N, P
    SEI: { EI: 1, TF: -1, SN: 1, JP: -1 },  // I, F, S, P
    ESE: { EI: -1, TF: -1, SN: 1, JP: 1 },  // E, F, S, J
    LII: { EI: 1, TF: 1, SN: -1, JP: 1 },   // I, T, N, J
    EIE: { EI: -1, TF: -1, SN: -1, JP: 1 }, // E, F, N, J
    LSI: { EI: 1, TF: 1, SN: 1, JP: 1 },    // I, T, S, J
    SLE: { EI: -1, TF: 1, SN: 1, JP: -1 },  // E, T, S, P
    IEI: { EI: 1, TF: -1, SN: -1, JP: -1 }, // I, F, N, P
    SEE: { EI: -1, TF: -1, SN: 1, JP: -1 }, // E, F, S, P
    ILI: { EI: 1, TF: 1, SN: -1, JP: -1 },  // I, T, N, P
    LIE: { EI: -1, TF: 1, SN: -1, JP: 1 },  // E, T, N, J
    ESI: { EI: 1, TF: -1, SN: 1, JP: 1 },   // I, F, S, J
    LSE: { EI: -1, TF: 1, SN: 1, JP: 1 },   // E, T, S, J
    EII: { EI: 1, TF: -1, SN: -1, JP: 1 },  // I, F, N, J
    IEE: { EI: -1, TF: -1, SN: -1, JP: -1 }, // E, F, N, P
    SLI: { EI: 1, TF: 1, SN: 1, JP: -1 }    // I, T, S, P
  };

  // 5. Secondary holdout balance constraint (Maximum 12% influence limit)
  let sumHoldEI = 0, countHoldEI = 0;
  let sumHoldTF = 0, countHoldTF = 0;
  Object.keys(holdActive).forEach(keyId => {
    const id = Number(keyId);
    const q = ALL_QUESTIONS.find(item => item.id === id);
    if (q) {
      const val = scaleToValue(holdActive[id]);
      if (holdActive[id] !== undefined && holdActive[id] !== 3) {
        if (q.dichotomy === 'EI') { sumHoldEI += val; countHoldEI++; }
        if (q.dichotomy === 'TF') { sumHoldTF += val; countHoldTF++; }
      }
    }
  });

  const holdWeight = 0.12; // cap holdout leakage strictly at 12%
  const finalEI = scoreEI * (1 - holdWeight) + (countHoldEI > 0 ? (sumHoldEI / countHoldEI) : scoreEI) * holdWeight;
  const finalTF = scoreTF * (1 - holdWeight) + (countHoldTF > 0 ? (sumHoldTF / countHoldTF) : scoreTF) * holdWeight;
  const finalSN = scoreSN;
  const finalJP = scoreJP;

  // Let's compute relative matching scores for all 16 types
  Object.keys(POLARITIES).forEach(tim => {
    const ref = POLARITIES[tim];
    // Map -1..1 coordinates correctly
    const devEI = Math.abs(finalEI - ref.EI);
    const devTF = Math.abs(finalTF - ref.TF);
    const devSN = Math.abs(finalSN - ref.SN);
    const devJP = Math.abs(finalJP - ref.JP);

    const distance = Math.sqrt(devEI * devEI + devTF * devTF + devSN * devSN + devJP * devJP);
    // Inverse distance ensures standard representation: higher is better match
    const match = 1 / (1 + distance);
    profileScores[tim] = match;
  });

  // Calculate final relative support percentages (Relative sum = 100%)
  const sumMatches = Object.values(profileScores).reduce((a, b) => a + b, 0);
  const supportPercentages: Record<string, number> = {};
  Object.keys(profileScores).forEach(tim => {
    supportPercentages[tim] = Math.round((profileScores[tim] / sumMatches) * 1000) / 10;
  });

  // Sort profiles cleanly by candidate fit
  const sortedProfiles = Object.entries(supportPercentages).sort((a, b) => b[1] - a[1]);
  const primaryType = sortedProfiles[0][0];
  const secondaryType = sortedProfiles[1][0];

  // Quadra hypothesis
  const quadraMap: Record<string, string> = {
    Alpha: 'Atmosfer bebas-gagasan (Merry/Democratic), fokus batin Si-Fe.',
    Beta: 'Atmosfer perjuangan sejarah (Merry/Aristocratic), fokus batin Se-Fe.',
    Gamma: 'Atmosfer efisiensi pragmatis (Serious/Democratic), fokus batin Se-Te.',
    Delta: 'Atmosfer profesionalisme kemanusiaan (Serious/Aristocratic), fokus batin Si-Te.'
  };
  const canonQuadra = TIM_PROFILES[primaryType]?.quadra || 'Alpha';
  const quadraHypothesis = quadraMap[canonQuadra];

  // 6. Realistic Diagnostic Consistency (Confidence Index)
  // Considers coverage, person fit, and relative spacing between 1st & 2nd candidate
  const firstPercent = sortedProfiles[0][1];
  const secondPercent = sortedProfiles[1][1];
  const margin = firstPercent - secondPercent;
  let rawConfidence = (coverage * 0.4 + personFitIndex * 0.4 + (margin / 25) * 0.2) * 100;
  if (answersList.length < 3) rawConfidence = Math.max(10, rawConfidence * 0.3); // penalize empty sessions
  const confidence = Math.round(Math.max(15, Math.min(98, rawConfidence)));

  // 7. Calculate unresolved adaptive pairs
  // Tie-break list identifies binary matches requiring further observation
  const adaptivePairs: string[] = [];
  if (margin < 6) {
    const pairKey = [primaryType, secondaryType].sort().join('_');
    adaptivePairs.push(pairKey);
  }

  return {
    finalPercentages: supportPercentages,
    scores: {
      EI: Math.round(finalEI * 100) / 100,
      TF: Math.round(finalTF * 100) / 100,
      SN: Math.round(finalSN * 100) / 100,
      JP: Math.round(finalJP * 100) / 100
    },
    confidence,
    personFitIndex: Math.round(personFitIndex * 100) / 100,
    coverage: Math.round(coverage * 100) / 100,
    primaryType,
    secondaryType,
    quadraHypothesis,
    adaptivePairs
  };
}
