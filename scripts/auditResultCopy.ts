import { ALL_QUESTIONS } from "../src/data/questions";
import { calculateResult } from "../src/scoring/engine";
import { buildResultExperience } from "../src/results/resultExperience";
import { polishEditorialList, polishEditorialText } from "../src/utils/editorialText";
import type { TIM } from "../src/types/socionics";
import { TIM_MODELS } from "../src/constants/socionicsData";

const answers = Object.fromEntries(
  ALL_QUESTIONS.map((question, index) => [question.id, (index % 5) + 1]),
);

const result = calculateResult(answers, ALL_QUESTIONS, {
  questionIds: ALL_QUESTIONS.map((question) => question.id),
  startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
});

const problems: string[] = [];
const banned = [
  /\bAnda\b/i,
  /jendela yang terus membuka/i,
  /empat pintu/i,
  /ruang cuaca/i,
  /penyair batin/i,
  /menari di antara/i,
];

const inspect = (label: string, value?: string) => {
  if (!value) return;
  const text = polishEditorialText(value);
  if (/^[a-zà-ÿ]/.test(text)) problems.push(`${label}: dimulai huruf kecil -> ${text}`);
  if (text.length > 520) problems.push(`${label}: terlalu panjang (${text.length} karakter)`);
  for (const pattern of banned) {
    if (pattern.test(text)) problems.push(`${label}: mengandung pola terlarang ${pattern} -> ${text}`);
  }
};

for (const type of Object.keys(TIM_MODELS) as TIM[]) {
  const experience = buildResultExperience(type, result);
  inspect(`${type}.title`, experience.title);
  inspect(`${type}.subtitle`, experience.subtitle);
  inspect(`${type}.expertSnapshot`, experience.expertSnapshot);
  inspect(`${type}.internetSnapshot`, experience.internetSnapshot);
  polishEditorialList(experience.tags).forEach((item, index) => inspect(`${type}.tag.${index}`, item));
  polishEditorialList(experience.observedSignals).forEach((item, index) => inspect(`${type}.signal.${index}`, item));

  experience.sections.forEach((section) => {
    inspect(`${type}.${section.id}.title`, section.title);
    inspect(`${type}.${section.id}.intro`, section.intro);
    section.cards.forEach((card, cardIndex) => {
      inspect(`${type}.${section.id}.${cardIndex}.title`, card.title);
      inspect(`${type}.${section.id}.${cardIndex}.expert`, card.expert);
      inspect(`${type}.${section.id}.${cardIndex}.simple`, card.simple);
      inspect(`${type}.${section.id}.${cardIndex}.stereotype`, card.stereotype);
      inspect(`${type}.${section.id}.${cardIndex}.misunderstood`, card.misunderstood);
      inspect(`${type}.${section.id}.${cardIndex}.warning`, card.warning);
      polishEditorialList(card.actions).forEach((item, index) => inspect(`${type}.${section.id}.${cardIndex}.action.${index}`, item));
    });
    section.recommendations?.forEach((group, groupIndex) => {
      inspect(`${type}.${section.id}.recommendation.${groupIndex}.title`, group.title);
      inspect(`${type}.${section.id}.recommendation.${groupIndex}.note`, group.note);
      polishEditorialList(group.items).forEach((item, index) => inspect(`${type}.${section.id}.recommendation.${groupIndex}.${index}`, item));
    });
  });
}

if (problems.length > 0) {
  console.error(`Audit copy hasil gagal: ${problems.length} masalah.`);
  problems.slice(0, 100).forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log("Audit copy hasil lulus untuk 16 TIM.");
