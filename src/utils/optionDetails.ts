/**
 * Domain types for Socionics Dalam Diriku.
 *
 * The instrument intentionally separates theory priors from empirical claims.
 * Item metadata below describes design intent; it is not a measured reliability
 * coefficient and must not be presented as one.
 */

export type InformationElement =
  | "Ne"
  | "Ni"
  | "Se"
  | "Si"
  | "Te"
  | "Ti"
  | "Fe"
  | "Fi";

export type MeasurementChannel =
  | "producer"
  | "flexible"
  | "mask"
  | "threat"
  | "receiver"
  | "aspiration"
  | "dismissive"
  | "background";

export type ScaleType =
  | "frequency"
  | "automaticity"
  | "comfort"
  | "competence"
  | "importance"
  | "threat"
  | "relief"
  | "recognition"
  | "comparison";

export type QuestionContext =
  | "general"
  | "private"
  | "family"
  | "friendship"
  | "romance"
  | "work"
  | "study"
  | "group"
  | "conflict"
  | "decision"
  | "body"
  | "public"
  | "new_situation"
  | "time_pressure";

export type ModelAPosition =
  | "Base"
  | "Creative"
  | "Role"
  | "Vulnerable"
  | "Suggestive"
  | "Mobilizing"
  | "Ignoring"
  | "Demonstrative";

export type TIM =
  | "ILE"
  | "SEI"
  | "ESE"
  | "LII"
  | "SLE"
  | "IEI"
  | "EIE"
  | "LSI"
  | "SEE"
  | "ILI"
  | "LIE"
  | "ESI"
  | "IEE"
  | "SLI"
  | "LSE"
  | "EII";

export type Quadra = "Alpha" | "Beta" | "Gamma" | "Delta";
export type Club = "Researchers" | "Socials" | "Pragmatists" | "Humanitarians";
export type Temperament = "EP" | "IP" | "EJ" | "IJ";

export interface SocionicsQuestion {
  id: string;
  scenario: string;
  statement: string;
  /** A short natural-language description used only to contextualize option help. */
  responseFocus: string;
  scaleType: ScaleType;
  element: InformationElement;
  channel: MeasurementChannel;
  context: QuestionContext;

  /** High answers should add evidence to the declared channel. */
  direction: 1 | -1;
  reverseKeyed: boolean;

  /** Theory/design weight, not an empirical psychometric coefficient. */
  designWeight: number;
  ambiguityRisk: "low" | "medium" | "high";
  desirabilityRisk: "low" | "medium" | "high";

  evidenceTags: string[];
  replicationFamilyId?: string;
  contradictionPairId?: string;
  tieBreakTags?: string[];
  tieBreakSupport?: Partial<Record<TIM, number>>;

  isHoldout: boolean;
  isTieBreak: boolean;
  itemVersion: string;
}

export type ElementChannelProfile = Record<MeasurementChannel, number>;
export type FullChannelProfile = Record<InformationElement, ElementChannelProfile>;

export interface TIMModel {
  type: TIM;
  name: string;
  fullName: string;
  quadra: Quadra;
  club: Club;
  temperament: Temperament;
  dual: TIM;
  positions: Record<ModelAPosition, InformationElement>;
}

export interface TIMProfile {
  type: TIM;
  description: string;
  orientasiBase: string;
  caraCreative: string;
  roleTampilan: string;
  tuntutanPolr: string;
  bantuanSuggestive: string;
  areaMobilizing: string;
  kompetensiIgnoring: string;
  kemampuanDemonstrative: string;
  polaSeimbang: string;
  polaTertekan: string;
  gayaBelajar: string;
  gayaKerja: string;
  gayaKomunikasi: string;
  kebutuhanKelompok: string;
  batasPerhatian: string;
  CommonMistypes: string[];
  refleksi: string;
  buktiMenyangkal: string;
}

export interface TestSession {
  mode: "ringkas" | "standar" | "mendalam";
  answers: Record<string, number>;
  skippedIds: string[];
  questionIds: string[];
  currentIndex: number;
  startedAt: string;
  lastUpdatedAt: string;
  seed: number;
  appVersion: string;
  completed: boolean;
  tieBreakPair?: string;
}

export interface ModelFitScore {
  type: TIM;
  /** Relative match index, not a calibrated probability. */
  fitScore: number;
  rawSimilarity: number;
  channelScores: Record<InformationElement, number>;
  elementFits: Record<InformationElement, number>;
  contradictions: number;
  personFitRatio: number;
  holdoutScore: number;
}

export interface AssessmentResult {
  top3: ModelFitScore[];
  confidence: "tidak cukup bukti" | "rendah" | "tentatif" | "sedang" | "cukup kuat" | "kuat";
  confidenceExplanation: string;
  unresolvedPair?: string;
  channelProfile: FullChannelProfile;
  coverage: {
    answeredCells: number;
    totalCells: number;
    ratio: number;
  };
  auditNotes: string[];
  responseQuality: {
    straightlining: boolean;
    midpointOveruse: boolean;
    extremeResponseRatio: number;
    completionTimeSeconds: number;
    inconsistencyScore: number;
  };
}
