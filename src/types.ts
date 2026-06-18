/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TIMKey =
  | 'ILE' | 'SEI' | 'ESE' | 'LII'
  | 'EIE' | 'LSI' | 'SLE' | 'IEI'
  | 'LIE' | 'ESI' | 'LSE' | 'EII'
  | 'SEE' | 'ILI' | 'IEE' | 'SLI';

export type InfoElement = 'Te' | 'Ti' | 'Se' | 'Si' | 'Fe' | 'Fi' | 'Ne' | 'Ni';

export type Quadra = 'Alpha' | 'Beta' | 'Gamma' | 'Delta';

export interface ModelAPosition {
  functionName: string; // e.g. Base, Creative, Role, Vulnerable/PoLR, Suggestive, Mobilizing, Ignoring, Demonstrative
  element: InfoElement;
  description: string;
}

export interface TIMProfile {
  key: TIMKey;
  name: string;
  threeLetter: string; // e.g. ENTp, ISFp
  title: string; // e.g. Don Quixote
  quadra: Quadra;
  shortDesc: string;
  detailedDesc: string;
  positions: ModelAPosition[]; // 8 functions of Model A
}

export type RelationCode =
  | 'ID' // Identity
  | 'DU' // Dual
  | 'AC' // Activation
  | 'MI' // Mirror
  | 'KI' // Kindred
  | 'LA' // Look-Alike
  | 'QI' // Quasi-Identity
  | 'SE' // Super-Ego
  | 'EX' // Extinguishment (Contrary)
  | 'IL' // Illusionary
  | 'SD' // Semi-Dual
  | 'CO' // Conflict
  | 'BP' // Benefactor (Receiver of your Benefit)
  | 'BC' // Beneficiary (Giver of your Benefit)
  | 'SP' // Supervisor (They check you / you supervise them?)
  | 'SV'; // Supervisee (You check them / they supervise you?)

export interface RelationDetails {
  code: RelationCode;
  name: string;
  title: string;
  description: string;
  asymmetricDirection?: string; // e.g. "Benefactor" or "Beneficiary"
}

export type SurveyMode = 'Ringkas' | 'Standar' | 'Mendalam';

export interface Question {
  id: string;
  text: string;
  context: string; // one of 14 contexts
  type: 'core' | 'holdout' | 'tiebreak';
  element: InfoElement;
  channel: number; // 1 to 8 (Model A channel alignment)
  weight?: number; // default to 1.0
}

export interface Answer {
  questionId: string;
  rating: number; // 1 to 5 (or undefined if skipped/cleared)
  timestamp: number; // speed monitoring
}

export interface SessionState {
  currentMode: SurveyMode;
  answers: Record<string, Answer>;
  startTime: number;
  completed: boolean;
  history: string[]; // paths or steps visited
}

export interface ProfileResult {
  key: TIMKey;
  fitScore: number;         // Model similarity index (0 to 1)
  relativeSupport: number;  // Relative internal probability (percentage)
}

export interface ValidationMetrics {
  coverage: number;         // percentage of 64-channels covered
  confidence: number;       // total confidence metric (0-100)
  straightlining: boolean;  // warning if user keeps entering same rating
  midpointOveruse: boolean; // warning if too many 3s
  extremeResponses: boolean; // extreme answer warning
  holdoutCount: number;
  holdoutSupport: number;
  responseSpeedAvg: number; // avg response time in ms
}
