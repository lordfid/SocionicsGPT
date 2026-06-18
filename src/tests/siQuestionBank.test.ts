/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from "assert";
import { allQuestions } from "../data/questions";

console.log("=== MENJALANKAN STRUKTUR & KUALITAS AUDIT UNIT TEST ===");

try {
  // Test 1: Total questions in database
  console.log("Test 1: Memeriksa jumlah total pertanyaan...");
  assert.strictEqual(allQuestions.length, 96, `Total pertanyaan harus tepat 96 (Ne:24, Ni:24, Se:24, Si:24), tetapi ditemukan: ${allQuestions.length}`);
  console.log("✅ Sukses: Total tepat 96 pertanyaan.");

  // Test 2: Distribusi elemen
  console.log("Test 2: Memeriksa sebaran elemen...");
  const elements = ["Ne", "Ni", "Se", "Si"];
  for (const el of elements) {
    const elCount = allQuestions.filter((q) => q.element === el).length;
    assert.strictEqual(elCount, 24, `Elemen ${el} harus memiliki tepat 24 item, ditemukan: ${elCount}`);
  }
  console.log("✅ Sukses: Tiap elemen memiliki tepat 24 pertanyaan.");

  // Test 3: Distribusi channel tiap elemen
  console.log("Test 3: Memeriksa kanal (channel) tiap elemen...");
  const channels = [
    "producer",
    "flexible",
    "mask",
    "threat",
    "receiver",
    "aspiration",
    "dismissive",
    "background",
  ];

  for (const el of elements) {
    const elQuestions = allQuestions.filter((q) => q.element === el);
    for (const ch of channels) {
      const count = elQuestions.filter((q) => q.channel === ch).length;
      assert.strictEqual(count, 3, `Elemen ${el} pada salurann ${ch} harus memiliki tepat 3 item, ditemukan: ${count}`);
    }
  }
  console.log("✅ Sukses: Distribusi tiap kanal (channel) tepat 3 per elemen.");

  // Test 4: Keunikan ID dan Statement
  console.log("Test 4: Memeriksa keunikan ID dan pernyataan (statement)...");
  const seenIds = new Set<string>();
  const seenStatements = new Set<string>();
  const seenScenarios = new Set<string>();

  for (const q of allQuestions) {
    // Unique ID
    assert.ok(!seenIds.has(q.id), `Ditemukan duplikasi ID pertanyaan: ${q.id}`);
    seenIds.add(q.id);

    // Unique Statement
    assert.ok(!seenStatements.has(q.statement), `Ditemukan duplikasi pernyataan (statement): "${q.statement}"`);
    seenStatements.add(q.statement);

    // Field compliance
    assert.ok(q.scenario.length > 10, `Scenario terlalu pendek atau kosong untuk ID: ${q.id}`);
    assert.ok(q.statement.length > 10, `Statement terlalu pendek atau kosong untuk ID: ${q.id}`);
    assert.strictEqual(q.isHoldout, false, `isHoldout harus bernilai false untuk ID: ${q.id}`);
    assert.strictEqual(q.isTieBreak, false, `isTieBreak harus bernilai false untuk ID: ${q.id}`);
    assert.strictEqual(q.calibrationStatus, "uncalibrated", `calibrationStatus harus uncalibrated untuk ID: ${q.id}`);
  }
  console.log("✅ Sukses: Seluruh ID, Statement, dan Scenario unik dan ber-skema patuh.");

  console.log("\n=======================================================");
  console.log("🎉 SELURUH DATA QUESTION BANK LULUS VERIFIKASI UNIT TEST!");
  console.log("=======================================================");
} catch (error) {
  console.error("❌ UNIT TEST GAGAL:");
  console.error(error);
  process.exit(1);
}
