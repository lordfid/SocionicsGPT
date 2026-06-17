import type {
  AssessmentResult,
  FullChannelProfile,
  InformationElement,
  MeasurementChannel,
  ModelAPosition,
  ModelFitScore,
  SocionicsQuestion,
  TIM,
} from "../types/socionics";
import { TIM_MODELS, QUADRA_DATA } from "../constants/socionicsData";
import { canonicalPair } from "../data/tieBreakQuestions";

export const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
export const CHANNELS: MeasurementChannel[] = [
  "producer",
  "flexible",
  "mask",
  "threat",
  "receiver",
  "aspiration",
  "dismissive",
  "background",
];

/**
 * Signed theory priors for the eight Model A positions.
 * Values are design hypotheses in [-1, 1], not empirical population parameters.
 */
export const POSITION_PRIORS: Record<ModelAPosition, Record<MeasurementChannel, number>> = {
  Base: {
    producer: 0.95, flexible: 0.55, mask: -0.55, threat: -0.75,
    receiver: -0.45, aspiration: 0.15, dismissive: 0.10, background: 0.70,
  },
  Creative: {
    producer: 0.55, flexible: 0.95, mask: -0.50, threat: -0.65,
    receiver: -0.35, aspiration: 0.20, dismissive: 0.15, background: 0.60,
  },
  Role: {
    producer: -0.35, flexible: -0.05, mask: 0.90, threat: 0.25,
    receiver: -0.20, aspiration: -0.20, dismissive: 0.10, background: -0.45,
  },
  Vulnerable: {
    producer: -0.75, flexible: -0.60, mask: 0.15, threat: 0.95,
    receiver: 0.10, aspiration: -0.45, dismissive: -0.15, background: -0.85,
  },
  Suggestive: {
    producer: -0.70, flexible: -0.50, mask: -0.20, threat: 0.15,
    receiver: 0.95, aspiration: 0.40, dismissive: -0.45, background: -0.80,
  },
  Mobilizing: {
    producer: -0.35, flexible: 0.05, mask: -0.10, threat: 0.20,
    receiver: 0.40, aspiration: 0.95, dismissive: -0.45, background: -0.40,
  },
  Ignoring: {
    producer: 0.30, flexible: 0.45, mask: -0.45, threat: -0.65,
    receiver: -0.55, aspiration: -0.40, dismissive: 0.95, background: 0.30,
  },
  Demonstrative: {
    producer: 0.50, flexible: 0.60, mask: -0.55, threat: -0.70,
    receiver: -0.55, aspiration: -0.35, dismissive: 0.20, background: 0.95,
  },
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function transformResponse(answer: number, isReverse = false): number {
  const safe = clamp(answer, 1, 5);
  const centered = (safe - 3) / 2;
  return isReverse ? -centered : centered;
}

const createEmptyProfile = (): FullChannelProfile => {
  const profile = {} as FullChannelProfile;
  for (const element of ELEMENTS) {
    profile[element] = {} as Record<MeasurementChannel, number>;
    for (const channel of CHANNELS) profile[element][channel] = 0;
  }
  return profile;
};

export function calculateChannelProfile(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): FullChannelProfile {
  const profile = createEmptyProfile();
  const sums = new Map<string, number>();
  const weights = new Map<string, number>();

  for (const question of questions) {
    if (question.isTieBreak) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;

    const key = `${question.element}_${question.channel}`;
    const weight = question.designWeight || 1;
    const response = transformResponse(answer, question.reverseKeyed) * question.direction;
    sums.set(key, (sums.get(key) ?? 0) + response * weight);
    weights.set(key, (weights.get(key) ?? 0) + weight);
  }

  for (const element of ELEMENTS) {
    for (const channel of CHANNELS) {
      const key = `${element}_${channel}`;
      const denominator = weights.get(key) ?? 0;
      profile[element][channel] = denominator > 0 ? clamp((sums.get(key) ?? 0) / denominator, -1, 1) : 0;
    }
  }
  return profile;
}

export function calculatePositionFit(
  observed: Record<MeasurementChannel, number>,
  position: ModelAPosition,
): number {
  const expected = POSITION_PRIORS[position];
  let weightedSquaredError = 0;
  let totalWeight = 0;

  for (const channel of CHANNELS) {
    const emphasis = Math.abs(expected[channel]) >= 0.9 ? 1.35 : Math.abs(expected[channel]) >= 0.6 ? 1.15 : 1;
    const delta = observed[channel] - expected[channel];
    weightedSquaredError += emphasis * delta * delta;
    totalWeight += emphasis;
  }

  const rmse = Math.sqrt(weightedSquaredError / totalWeight);
  return clamp(1 - rmse / 2, 0, 1);
}

function findPosition(type: TIM, element: InformationElement): ModelAPosition {
  const positions = TIM_MODELS[type].positions;
  const found = (Object.keys(positions) as ModelAPosition[]).find((position) => positions[position] === element);
  if (!found) throw new Error(`Elemen ${element} tidak ditemukan pada Model A ${type}.`);
  return found;
}

function calculateQuadraCoherence(type: TIM, profile: FullChannelProfile): number {
  const valued = QUADRA_DATA[TIM_MODELS[type].quadra].valuedElements;
  const unvalued = ELEMENTS.filter((element) => !valued.includes(element));

  const valueSignal = (element: InformationElement): number => {
    const scores = profile[element];
    return (scores.producer + scores.flexible + scores.receiver + scores.aspiration - scores.dismissive) / 5;
  };

  const valuedAverage = valued.reduce((sum, element) => sum + valueSignal(element), 0) / valued.length;
  const unvaluedAverage = unvalued.reduce((sum, element) => sum + valueSignal(element), 0) / unvalued.length;
  return clamp((valuedAverage - unvaluedAverage) * 0.025, -0.025, 0.025);
}

function calculateHoldoutScore(
  type: TIM,
  answers: Record<string, number>,
  holdoutQuestions: SocionicsQuestion[],
): { score: number; count: number } {
  let similaritySum = 0;
  let count = 0;

  for (const question of holdoutQuestions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const position = findPosition(type, question.element);
    const expected = POSITION_PRIORS[position][question.channel];
    const observed = transformResponse(answer, question.reverseKeyed) * question.direction;
    similaritySum += 1 - Math.abs(observed - expected) / 2;
    count += 1;
  }

  return { score: count > 0 ? clamp(similaritySum / count, 0, 1) : 0.5, count };
}

function tieBreakAdjustment(type: TIM, answers: Record<string, number>, questions: SocionicsQuestion[]): number {
  let adjustment = 0;
  for (const question of questions) {
    if (!question.isTieBreak || !question.tieBreakSupport) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const support = question.tieBreakSupport[type];
    if (support === undefined) continue;
    adjustment += transformResponse(answer, false) * support * 0.0125;
  }
  return clamp(adjustment, -0.035, 0.035);
}

export function analyzeCoverage(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): AssessmentResult["coverage"] {
  const cells = new Set<string>();
  for (const question of questions) {
    if (question.isTieBreak || answers[question.id] === undefined) continue;
    cells.add(`${question.element}_${question.channel}`);
  }
  return { answeredCells: cells.size, totalCells: 64, ratio: cells.size / 64 };
}

export function analyzePersonFit(
  answers: Record<string, number>,
  orderedQuestions: SocionicsQuestion[],
): AssessmentResult["responseQuality"] {
  const answered = orderedQuestions.filter((question) => answers[question.id] !== undefined);
  const ratings = answered.map((question) => answers[question.id]);
  const total = ratings.length;

  let maxStreak = 0;
  let streak = 0;
  let previous: number | undefined;
  for (const rating of ratings) {
    if (rating === previous) streak += 1;
    else { previous = rating; streak = 1; }
    maxStreak = Math.max(maxStreak, streak);
  }

  const midpointCount = ratings.filter((rating) => rating === 3).length;
  const extremeCount = ratings.filter((rating) => rating === 1 || rating === 5).length;

  const families = new Map<string, number[]>();
  for (const question of answered) {
    if (!question.replicationFamilyId || question.isHoldout) continue;
    const values = families.get(question.replicationFamilyId) ?? [];
    values.push(transformResponse(answers[question.id], question.reverseKeyed));
    families.set(question.replicationFamilyId, values);
  }

  let pairDifferenceSum = 0;
  let pairCount = 0;
  for (const values of families.values()) {
    for (let left = 0; left < values.length; left += 1) {
      for (let right = left + 1; right < values.length; right += 1) {
        pairDifferenceSum += Math.abs(values[left] - values[right]);
        pairCount += 1;
      }
    }
  }

  return {
    straightlining: total >= 20 && maxStreak >= Math.max(10, Math.ceil(total * 0.2)),
    midpointOveruse: total >= 20 && midpointCount / total > 0.5,
    extremeResponseRatio: total > 0 ? Number((extremeCount / total).toFixed(2)) : 0,
    completionTimeSeconds: 0,
    inconsistencyScore: pairCount > 0 ? Number((pairDifferenceSum / pairCount).toFixed(2)) : 0,
  };
}

function buildAuditNotes(quality: AssessmentResult["responseQuality"], coverage: AssessmentResult["coverage"]): string[] {
  const notes: string[] = [];
  if (coverage.ratio < 1) notes.push(`Cakupan baru ${coverage.answeredCells}/64 sel elemen-kanal.`);
  if (quality.straightlining) notes.push("Ada rentang jawaban identik yang sangat panjang; hasil perlu dibaca lebih hati-hati.");
  if (quality.midpointOveruse) notes.push("Pilihan tengah digunakan sangat sering; beberapa pembeda tipe mungkin belum terlihat.");
  if (quality.extremeResponseRatio > 0.65) notes.push("Jawaban ekstrem sangat dominan; periksa apakah semua pilihan benar-benar menggambarkan pengalaman nyata.");
  if (quality.inconsistencyScore > 1.1) notes.push("Replikasi lintas konteks cukup berfluktuasi; keadaan atau peran sosial mungkin memengaruhi hasil.");
  return notes;
}

export function calculateResult(
  answers: Record<string, number>,
  allQuestions: SocionicsQuestion[],
  options?: { startedAt?: string; questionIds?: string[] },
): AssessmentResult {
  const coreQuestions = allQuestions.filter((question) => !question.isHoldout && !question.isTieBreak);
  const holdoutQuestions = allQuestions.filter((question) => question.isHoldout);
  const orderedQuestions = options?.questionIds
    ? options.questionIds.map((id) => allQuestions.find((question) => question.id === id)).filter(Boolean) as SocionicsQuestion[]
    : allQuestions;

  const profile = calculateChannelProfile(answers, coreQuestions);
  const coverage = analyzeCoverage(answers, coreQuestions);
  const quality = analyzePersonFit(answers, orderedQuestions);
  if (options?.startedAt) {
    const seconds = Math.max(0, Math.round((Date.now() - Date.parse(options.startedAt)) / 1000));
    quality.completionTimeSeconds = Number.isFinite(seconds) ? seconds : 0;
  }

  const candidateScores: ModelFitScore[] = (Object.keys(TIM_MODELS) as TIM[]).map((type) => {
    const elementFits = {} as Record<InformationElement, number>;
    let modelSimilarity = 0;

    for (const position of Object.keys(TIM_MODELS[type].positions) as ModelAPosition[]) {
      const element = TIM_MODELS[type].positions[position];
      const similarity = calculatePositionFit(profile[element], position);
      elementFits[element] = similarity;
      modelSimilarity += similarity;
    }
    modelSimilarity /= 8;

    const holdout = calculateHoldoutScore(type, answers, holdoutQuestions);
    const holdoutBlend = holdout.count > 0 ? 0.15 : 0;
    let rawSimilarity = modelSimilarity * (1 - holdoutBlend) + holdout.score * holdoutBlend;
    rawSimilarity += calculateQuadraCoherence(type, profile);
    rawSimilarity += tieBreakAdjustment(type, answers, allQuestions);
    rawSimilarity = clamp(rawSimilarity, 0, 1);

    const channelScores = {} as Record<InformationElement, number>;
    for (const element of ELEMENTS) {
      const scores = profile[element];
      channelScores[element] = Number(((scores.producer + scores.flexible + scores.background - scores.threat) / 4).toFixed(2));
    }

    return {
      type,
      fitScore: Number((rawSimilarity * 100).toFixed(1)),
      rawSimilarity,
      channelScores,
      elementFits,
      contradictions: quality.inconsistencyScore > 1.1 ? 1 : 0,
      personFitRatio: Number(clamp(1 - quality.inconsistencyScore / 2, 0, 1).toFixed(2)),
      holdoutScore: Number((holdout.score * 100).toFixed(1)),
    };
  }).sort((left, right) => right.rawSimilarity - left.rawSimilarity);

  const top1 = candidateScores[0];
  const top2 = candidateScores[1];
  const separation = (top1.rawSimilarity - top2.rawSimilarity) * 100;
  const pair = canonicalPair(top1.type, top2.type);
  const pairItems = allQuestions.filter((question) => question.tieBreakTags?.includes(pair));
  const pairAnswered = pairItems.filter((question) => answers[question.id] !== undefined).length;
  const unresolvedPair = separation < 2.5 && pairItems.length > 0 && pairAnswered < pairItems.length ? pair : undefined;

  const answeredCount = Object.keys(answers).length;
  const auditNotes = buildAuditNotes(quality, coverage);
  let confidence: AssessmentResult["confidence"] = "sedang";
  let confidenceExplanation = "Pola awal sudah terlihat, tetapi hasil tetap merupakan indeks kecocokan terhadap model teori.";

  if (answeredCount < 64 || coverage.ratio < 0.85) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Belum cukup sel elemen-kanal yang terjawab untuk membandingkan 16 model secara layak.";
  } else if (quality.straightlining) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Rentang jawaban identik terlalu panjang sehingga perbedaan antarposisi Model A tidak dapat dibaca secara layak.";
  } else if (quality.inconsistencyScore > 1.35) {
    confidence = "rendah";
    confidenceExplanation = "Pola respons menunjukkan ketidakstabilan yang cukup besar; hasil sebaiknya diuji ulang pada waktu berbeda.";
  } else if (unresolvedPair || separation < 1.5) {
    confidence = "tentatif";
    confidenceExplanation = "Dua kandidat teratas masih sangat berdekatan dan membutuhkan pertanyaan pembeda tambahan.";
  } else if (separation < 3 || coverage.ratio < 1) {
    confidence = "sedang";
    confidenceExplanation = "Satu kandidat mulai unggul, tetapi beberapa pembeda atau replikasi masih belum cukup kuat.";
  } else if (separation >= 6 && top1.holdoutScore >= 70 && quality.inconsistencyScore < 0.65) {
    confidence = "kuat";
    confidenceExplanation = "Kandidat teratas terpisah cukup jelas, sel inti tercakup, dan jawaban holdout relatif selaras.";
  } else {
    confidence = "cukup kuat";
    confidenceExplanation = "Kandidat teratas cukup konsisten dengan pola kanal Model A, dengan ketidakpastian yang masih wajar.";
  }

  return {
    top3: candidateScores.slice(0, 3),
    confidence,
    confidenceExplanation,
    unresolvedPair,
    channelProfile: profile,
    coverage,
    auditNotes,
    responseQuality: quality,
  };
}
