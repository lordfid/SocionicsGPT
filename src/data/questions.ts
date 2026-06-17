import type { SocionicsQuestion } from "../types/socionics";
import { CORE_QUESTIONS } from "./coreQuestions";
import { HOLDOUT_QUESTIONS } from "./holdoutQuestions";
import { TIE_BREAK_QUESTIONS } from "./tieBreakQuestions";

export const ALL_QUESTIONS: SocionicsQuestion[] = [
  ...CORE_QUESTIONS,
  ...HOLDOUT_QUESTIONS,
  ...TIE_BREAK_QUESTIONS,
];

export const getQuestionById = (id: string): SocionicsQuestion | undefined =>
  ALL_QUESTIONS.find((question) => question.id === id);

export const getCoreQuestions = (): SocionicsQuestion[] => CORE_QUESTIONS;
export const getHoldoutQuestions = (): SocionicsQuestion[] => HOLDOUT_QUESTIONS;
export const getTieBreakQuestions = (): SocionicsQuestion[] => TIE_BREAK_QUESTIONS;
