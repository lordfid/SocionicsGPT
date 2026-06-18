/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Quadra = 'Alpha' | 'Beta' | 'Gamma' | 'Delta';

export interface ModelAFunction {
  element: string; // Ne, Ni, Se, Si, Te, Ti, Fe, Fi
  name: string;
  position: number; // 1 to 8
  role: string; // Base, Creative, Role, Vulnerable (PoLR), Suggestive, Mobilizing, Ignoring, Demonstrative
  description: string;
}

export interface TIMProfile {
  id: string; // ILE, SEI, ESE, LII, EIE, LSI, SLE, IEI, SEE, ILI, LIE, ESI, LSE, EII, IEE, SLI
  name: string; // e.g. Intuitive Logical Extratim
  alias: string; // e.g. Seeker / Don Quixote
  quadra: Quadra;
  modelA: ModelAFunction[];
  strengths: string[];
  vulnerabilities: string[];
  description: string;
  summary: string;
}

export interface IntertypeRelation {
  code: string; // d, a, m, g, c, q, x, S, s, B, b, k, h, l, i, e
  name: string; // Dual, Activator, Mirror, Superego, Conflictor, Quasi-Identical, Extinguishment, Supervisor, Supervisee, Benefactor, Beneficiary, Kindred, Semidual, Business, Illusionary, Identity
  description: string;
  isAsymmetric: boolean;
  direction?: 'transmitter' | 'receiver' | 'supervisor' | 'supervisee';
}

export interface Question {
  id: number;
  dichotomy: 'EI' | 'TF' | 'SN' | 'JP'; // Extra/Intro, Thinking/Feeling, Sensing/Intuition, Rational/Irrational
  scaleLabel1: string; // Description for scale = 1
  scaleLabel5: string; // Description for scale = 5
  kasual: string; // Conversational description
  artinya1: string; // Analysis of scale = 1
  artinya5: string; // Analysis of scale = 5
  reaksi1: string; // Cinematic action for scale = 1
  reaksi5: string; // Cinematic action for scale = 5
  context: string; // work, private, group, conflict, etc.
}

export interface TestSession {
  name: string;
  answers: Record<number, number>; // questionId -> value (1 to 5)
  holdoutAnswers: Record<number, number>;
  history: Array<{ questionId: number; value: number; timestamp: number }>;
}
