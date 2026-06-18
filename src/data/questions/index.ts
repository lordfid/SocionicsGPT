/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from "../../types";
import { neQuestions } from "./ne";
import { niQuestions } from "./ni";
import { seQuestions } from "./se";
import { siQuestions } from "./si";

export const allQuestions: Question[] = [
  ...neQuestions,
  ...niQuestions,
  ...seQuestions,
  ...siQuestions,
];

export const getQuestionsByElement = (element: string): Question[] => {
  return allQuestions.filter((q) => q.element === element);
};

export const getQuestionsByChannel = (channel: string): Question[] => {
  return allQuestions.filter((q) => q.channel === channel);
};
