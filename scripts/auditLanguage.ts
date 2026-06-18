import { ALL_QUESTIONS } from "../src/data/questions";
import { getCasualVersion, getOptionDetail } from "../src/utils/optionDetails";

const errors: string[] = [];
const forbidden = [
  "situasi tersebut",
  "hal ini cukup menggambarkan",
  "melakukan hal tersebut",
  "merespons situasi ini",
  "dalam kalimat tersebut",
];

const normalize = (value: string): string =>
  value.toLocaleLowerCase("id-ID").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

for (const question of ALL_QUESTIONS) {
  const casual = getCasualVersion(question);

  if (/\b(saya|anda)\b/i.test(casual)) {
    errors.push(`${question.id}: Versi Kasual masih memakai saya/Anda.`);
  }

  if (!/(?:\baku\b|\b\p{L}+ku\b)/iu.test(casual)) {
    errors.push(`${question.id}: Versi Kasual tidak memakai sudut pandang aku.`);
  }

  const casualNormalized = normalize(casual);
  const statementNormalized = normalize(question.statement);
  if (casualNormalized === statementNormalized) {
    errors.push(`${question.id}: Versi Kasual identik dengan kalimat asli.`);
  }

  const meanings = new Set<string>();
  const reactions = new Set<string>();

  for (let value = 1; value <= 5; value += 1) {
    const detail = getOptionDetail(question, value);
    const meaningNormalized = normalize(detail.artinya);
    const reactionNormalized = normalize(detail.reaksi);

    if (!detail.artinya.trim() || !detail.reaksi.trim()) {
      errors.push(`${question.id} pilihan ${value}: Artinya/Reaksi kosong.`);
    }

    if (/\b(anda|saya)\b/i.test(`${detail.artinya} ${detail.reaksi}`)) {
      errors.push(`${question.id} pilihan ${value}: masih memakai Anda/saya.`);
    }

    for (const phrase of forbidden) {
      if (`${detail.artinya} ${detail.reaksi}`.toLocaleLowerCase("id-ID").includes(phrase)) {
        errors.push(`${question.id} pilihan ${value}: memakai frasa generik "${phrase}".`);
      }
    }

    const focusNormalized = normalize(question.responseFocus);
    if (focusNormalized.length >= 24 && reactionNormalized.includes(focusNormalized)) {
      errors.push(`${question.id} pilihan ${value}: Reaksi menyalin responseFocus.`);
    }

    if (statementNormalized.length >= 40 && reactionNormalized.includes(statementNormalized)) {
      errors.push(`${question.id} pilihan ${value}: Reaksi menyalin kalimat asli.`);
    }

    meanings.add(meaningNormalized);
    reactions.add(reactionNormalized);
  }

  if (meanings.size !== 5) {
    errors.push(`${question.id}: lima Artinya tidak unik.`);
  }
  if (reactions.size !== 5) {
    errors.push(`${question.id}: lima Reaksi tidak unik.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  throw new Error(`Audit bahasa gagal dengan ${errors.length} masalah.`);
}

console.log(JSON.stringify({
  status: "passed",
  itemsChecked: ALL_QUESTIONS.length,
  optionExplanationsChecked: ALL_QUESTIONS.length * 5,
  rules: [
    "Versi Kasual memakai aku",
    "tidak ada saya/Anda",
    "Artinya dan Reaksi tidak kosong",
    "lima gradasi unik",
    "larangan frasa generik",
    "Reaksi tidak menyalin kalimat asli atau responseFocus",
  ],
}, null, 2));
