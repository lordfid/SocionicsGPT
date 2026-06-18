export enum SociotypeCode {
  ILE = "ILE",
  SEI = "SEI",
  ESE = "ESE",
  LII = "LII",
  EIE = "EIE",
  LSI = "LSI",
  SLE = "SLE",
  IEI = "IEI",
  SEE = "SEE",
  ILI = "ILI",
  LIE = "LIE",
  ESI = "ESI",
  LSE = "LSE",
  EII = "EII",
  IEE = "IEE",
  SLI = "SLI"
}

export enum InformationElementCode {
  Ne = "Ne",
  Ni = "Ni",
  Se = "Se",
  Si = "Si",
  Te = "Te",
  Ti = "Ti",
  Fe = "Fe",
  Fi = "Fi"
}

export enum QuadraName {
  Alpha = "Alpha",
  Beta = "Beta",
  Gamma = "Gamma",
  Delta = "Delta"
}

export enum ModelAPosition {
  Leading = "Leading", // Leading (Base) - 1st Function
  Creative = "Creative", // Creative - 2nd Function
  Role = "Role", // Role - 3rd Function
  Vulnerable = "Vulnerable", // Vulnerable (PoLR) - 4th Function
  Suggestive = "Suggestive", // Suggestive (Dual-seeking) - 5th Function
  Mobilizing = "Mobilizing", // Mobilizing (Activating) - 6th Function
  Ignoring = "Ignoring", // Ignoring (Limiting) - 7th Function
  Demonstrative = "Demonstrative" // Demonstrative - 8th Function
}

export interface SociotypeInfo {
  code: SociotypeCode;
  mbtiEquivalent: string;
  russianName: string;
  englishName: string;
  pseudonym: string;
  gulenkoAlias: string;
  quadra: QuadraName;
  duals: SociotypeCode;
  activation: SociotypeCode;
  mirror: SociotypeCode;
  conflict: SociotypeCode;
  supervisionPartner: SociotypeCode; // Who supervises them
  supervisee: SociotypeCode; // Who they supervise
  benefactor: SociotypeCode; // Who gives benefit to them
  beneficiary: SociotypeCode; // Who they give benefit to
  description: string;
  strengths: string[];
  weaknesses: string[];
  keyTraits: string[];
  modelA: Record<ModelAPosition, InformationElementCode>;
}

export interface InformationElementInfo {
  code: InformationElementCode;
  symbol: string;
  color: string;
  theme: "black" | "white";
  aspect: "Intuition" | "Sensing" | "Logic" | "Ethics";
  direction: "Extraverted" | "Introverted";
  fullName: string;
  gulenkoName: string;
  description: string;
  manifestationInModelA: Record<ModelAPosition, string>;
}

export interface ReininDichotomies {
  extraversion: "Extraverted" | "Introverted";
  sensing: "Sensing" | "Intuition";
  logic: "Logic" | "Ethics";
  rational: "Rational" | "Irrational";
  aristocracy: "Aristocratic" | "Democratic";
  carefree: "Carefree" | "Farsighted";
  yielding: "Yielding" | "Obstinate";
  staticDynamic: "Static" | "Dynamic";
  tactical: "Tactical" | "Strategic";
  constructivist: "Constructivist" | "Emotivest";
  positivist: "Positivist" | "Negativist";
  judicious: "Judicious" | "Decisive";
  merry: "Merry" | "Serious";
  process: "Process" | "Result";
  asking: "Asking" | "Declaring";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SavedDiagnosis {
  id: string;
  date: string;
  selectedType: SociotypeCode;
  notes?: string;
  chatHistorySummary?: string;
}
