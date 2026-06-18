import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { ALL_QUESTIONS } from "../src/data/questions";
import { getCasualVersion, getOptionDetail } from "../src/utils/optionDetails";
import type { ScaleType } from "../src/types/socionics";

const SCALE_LABELS: Record<ScaleType, readonly string[]> = {
  automaticity: [
    "Tidak muncul secara alami",
    "Harus kupikirkan cukup lama",
    "Tergantung keadaan",
    "Cukup spontan",
    "Muncul hampir tanpa usaha",
  ],
  comfort: [
    "Sangat menguras tenaga",
    "Cukup tidak nyaman",
    "Netral atau tergantung situasi",
    "Cukup nyaman",
    "Sangat nyaman",
  ],
  threat: [
    "Sama sekali tidak mengganggu",
    "Sedikit mengganggu",
    "Cukup menekan",
    "Sangat menekan",
    "Membuatku beku, defensif, malu, atau menghindar",
  ],
  relief: [
    "Tidak membantu",
    "Sedikit membantu",
    "Lumayan membantu",
    "Sangat membantu",
    "Sangat melegakan",
  ],
  recognition: [
    "Tidak berarti",
    "Sedikit berarti",
    "Cukup menyenangkan",
    "Sangat berarti",
    "Menyentuh kebutuhan terdalam",
  ],
  frequency: [
    "Tidak pernah",
    "Jarang",
    "Kadang-kadang",
    "Sering",
    "Hampir selalu",
  ],
  competence: [
    "Sangat kesulitan",
    "Cukup kesulitan",
    "Bisa dalam keadaan tertentu",
    "Cukup mampu",
    "Sangat mampu",
  ],
  importance: [
    "Sama sekali tidak penting",
    "Kurang penting",
    "Tergantung keadaan",
    "Penting",
    "Sangat penting",
  ],
  comparison: [
    "Jauh lebih dekat B",
    "Agak lebih dekat B",
    "Sama dekat",
    "Agak lebih dekat A",
    "Jauh lebih dekat A",
  ],
};

const lines: string[] = [
  "PAKET EDITORIAL — SOCIONICS DALAM DIRIKU",
  "Versi: 2.0.3",
  `Jumlah item: ${ALL_QUESTIONS.length}`,
  "",
  "Yang boleh direvisi: VERSI KASUAL, ARTINYA, REAKSI, CATATAN EDITOR.",
  "Yang jangan diubah: ID, jenis, elemen, kanal, konteks, skala, dan label pilihan.",
  "",
];

ALL_QUESTIONS.forEach((question, index) => {
  const kind = question.isTieBreak ? "TIE_BREAK" : question.isHoldout ? "HOLDOUT" : "CORE";
  lines.push(
    "=".repeat(88),
    `[[ITEM_START]] ${String(index + 1).padStart(3, "0")}/${ALL_QUESTIONS.length}`,
    "=".repeat(88),
    "[META TEKNIS — JANGAN DIUBAH]",
    `ID: ${question.id}`,
    `JENIS: ${kind}`,
    `ELEMEN: ${question.element}`,
    `KANAL: ${question.channel}`,
    `KONTEKS: ${question.context}`,
    `SKALA: ${question.scaleType}`,
    "",
    "[SUMBER ASLI — JANGAN DIHAPUS]",
    "SITUASI ASLI:",
    question.scenario,
    "",
    "RESPONS/SIKAP ASLI:",
    question.statement,
    "",
    "FOKUS RESPONS INTERNAL:",
    question.responseFocus,
    "",
    "[TEKS YANG DIPAKAI APLIKASI]",
    "VERSI KASUAL:",
    getCasualVersion(question),
    "",
  );

  for (let value = 1; value <= 5; value += 1) {
    const detail = getOptionDetail(question, value);
    lines.push(
      `--- PILIHAN ${value} ---`,
      `LABEL SKALA [JANGAN DIUBAH]: ${SCALE_LABELS[question.scaleType][value - 1]}`,
      "",
      "ARTINYA:",
      detail.artinya,
      "",
      "REAKSI:",
      detail.reaksi,
      "",
    );
  }

  lines.push(
    "CATATAN EDITOR:",
    "",
    `[[ITEM_END]] ${question.id}`,
    "",
  );
});

const outputPath = resolve("docs/EDITORIAL_COPY_ALL_256.txt");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Editorial copy written to ${outputPath}`);
