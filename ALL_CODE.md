# ALL CODE — Socionics Dalam Diriku v2.0.1

Dokumen ini menggabungkan seluruh kode sumber, konfigurasi utama, skrip audit, dan dokumentasi proyek. `node_modules`, hasil build minified, dan lockfile tidak disalin ke sini agar tetap terbaca.

## Daftar file

- `.env.example`
- `.gitignore`
- `CHANGELOG.md`
- `README.md`
- `docs/AUDIT_RESULT.txt`
- `docs/COVERAGE_REPORT.md`
- `docs/DEPLOYMENT.md`
- `docs/FAIRNESS_AUDIT.md`
- `docs/QUESTION_WRITING_GUIDE.md`
- `docs/REBUILD_REPORT.md`
- `docs/SCORING_GUIDE.md`
- `docs/VALIDATION_ROADMAP.md`
- `index.html`
- `metadata.json`
- `package.json`
- `scripts/audit.ts`
- `src/App.tsx`
- `src/audit/instrumentAudit.ts`
- `src/constants/socionicsData.ts`
- `src/data/coreQuestions.ts`
- `src/data/holdoutQuestions.ts`
- `src/data/questions.ts`
- `src/data/tieBreakQuestions.ts`
- `src/hooks/useTestSession.ts`
- `src/index.css`
- `src/main.tsx`
- `src/scoring/engine.ts`
- `src/session/sessionState.ts`
- `src/types/socionics.ts`
- `src/utils/optionDetails.ts`
- `tsconfig.json`
- `vite.config.ts`

---

## `.env.example`

````text
# Tidak ada environment variable yang diperlukan.
# Seluruh tes berjalan lokal di browser tanpa backend atau API.
````

---

## `.gitignore`

````text
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
````

---

## `CHANGELOG.md`

````md
# Changelog

## 2.0.0 — Rebuild instrumen

### Bank pertanyaan

- Menghapus `ELEMENT_THEMES`, `CHANNEL_TEMPLATES`, dan `generateCoreQuestions()` versi lama.
- Menulis ulang 192 core item secara eksplisit.
- Menambahkan tiga konteks berbeda per sel elemen-kanal.
- Menulis ulang 32 holdout dan 32 tie-break.
- Menambahkan `responseFocus`, `replicationFamilyId`, dan versioning item.

### Sampling

- Ringkas dan standar kini selalu mencakup 64/64 sel.
- Menambahkan penyebaran item agar elemen/kanal sama tidak mudah muncul berturut-turut.
- Tie-break menjadi adaptif.

### Scoring

- Menghapus pseudo-parameter `reliability` dan `discrimination` hard-coded.
- Mengganti normalisasi distribusi positif dengan signed channel profile.
- Mengganti softmax probability dengan indeks kecocokan terhadap theory prior.
- Holdout memakai continuous similarity.
- Completion time dihitung aktual.

### Sesi dan UI

- Jawaban disimpan sebelum auto-next.
- Menambahkan reducer murni dan smoke test untuk alur penyimpanan.
- Menghapus tampilan ID internal dan klaim reliabilitas palsu.
- Penjelasan opsi tetap tersembunyi dan dapat dibuka/tutup melalui ikon informasi.
- Sesi lama direset aman karena item version berubah.

### Quality gate

- TypeScript lint.
- Audit 10.000 seed.
- 256 pernyataan unik.
- 64 sel lengkap.
- 16/16 synthetic TIM recovery.
- Production build lulus.

## 2.0.1 — Final quality gate

- Mencegah sesi diselesaikan setelah hanya beberapa jawaban; seluruh item aktif harus dijawab atau dilewati terlebih dahulu.
- Menyatukan jalur penyelesaian normal, skip terakhir, dan adaptive tie-break agar jawaban terakhir tidak hilang.
- Memperbaiki skip pada item yang sebelumnya dijawab: jawaban lama kini dihapus sebelum item dicatat sebagai dilewati.
- Menambahkan lexical near-duplicate gate ke audit instrumen.
- Memastikan tulisan internal seperti `Seeded ID` tidak tampil di UI peserta.
````

---

## `README.md`

````md
# Socionics Dalam Diriku

Aplikasi React + TypeScript + Vite untuk eksplorasi pendidikan Socionics Model A. Seluruh jawaban dan hasil disimpan lokal di browser.

## Status metodologis

Aplikasi ini bukan diagnosis klinis dan bukan alat psikologi profesional. Versi 2.0 membandingkan pola jawaban dengan 16 profil teori Model A dan menampilkan **indeks kecocokan relatif**, bukan probabilitas ilmiah. Angka reliabilitas empiris tidak ditampilkan sebelum tersedia data pilot yang memadai.

## Perubahan utama versi 2.0

- 192 core item eksplisit: 8 elemen × 8 kanal × 3 replikasi lintas konteks.
- Tidak ada lagi generator pertanyaan yang menempelkan delapan template ke seluruh bank.
- 32 holdout untuk memeriksa prediksi kandidat awal.
- 32 tie-break tersedia secara adaptif; hanya dua item pasangan teratas yang ditanyakan bila diperlukan.
- Mode ringkas dan standar selalu mencakup seluruh 64 kombinasi elemen-kanal.
- Scoring mempertahankan tanda dan magnitudo respons; semua nilai rendah tidak dinormalisasi menjadi bentuk yang sama dengan semua nilai tinggi.
- Jawaban disimpan sebelum auto-next.
- Sesi versi lama direset secara aman karena isi item dan model skoring berubah.
- Audit otomatis memeriksa duplikasi, cakupan, sampling 10.000 seed, canonical pair, dan pemulihan 16 synthetic type vectors.
- Klaim Cronbach alpha/reliabilitas hard-coded dihapus.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Pemeriksaan lengkap:

```bash
npm run check
```

Perintah tersebut menjalankan TypeScript, audit instrumen, synthetic recovery test, dan build produksi.

## Struktur penting

- `src/data/coreQuestions.ts` — 192 item inti eksplisit.
- `src/data/holdoutQuestions.ts` — 32 item verifikasi.
- `src/data/tieBreakQuestions.ts` — 32 item pembeda adaptif.
- `src/scoring/engine.ts` — profil 64 kanal dan model-fit bertanda.
- `src/hooks/useTestSession.ts` — sampler berstrata, autosave, migrasi sesi, dan tie-break adaptif.
- `src/audit/instrumentAudit.ts` — audit struktural yang juga tampil di aplikasi.
- `scripts/audit.ts` — quality gate untuk pengembangan dan build.

## Mode tes

- Ringkas: 80 item — 64 sel wajib + 16 replikasi seimbang.
- Standar: 128 item — 64 sel wajib + 48 replikasi + 16 holdout.
- Mendalam: 224 item — semua core dan holdout, ditambah maksimal 2 tie-break jika kandidat sangat dekat.

## Batas klaim

Versi ini jauh lebih konsisten secara arsitektur dan content coverage dibanding versi awal, tetapi reliabilitas, validitas konstruk, differential item functioning, calibration, dan invariance tetap membutuhkan data peserta nyata. Lihat `docs/VALIDATION_ROADMAP.md`.
````

---

## `docs/AUDIT_RESULT.txt`

````text

> socionics-dalam-diriku@2.0.1 audit
> tsx scripts/audit.ts

{
  "status": "passed",
  "metrics": {
    "totalItems": 256,
    "coreItems": 192,
    "holdoutItems": 32,
    "tieBreakItems": 32,
    "completeCoreCells": 64,
    "uniqueStatements": 256,
    "contexts": 14,
    "simulatedSessions": 10000
  },
  "warnings": [],
  "syntheticTypesRecovered": 16,
  "extremeProfilesDistinct": true,
  "uniformResponseConfidence": {
    "allLow": "tidak cukup bukti",
    "allHigh": "tidak cukup bukti"
  }
}
````

---

## `docs/COVERAGE_REPORT.md`

````md
# Laporan Cakupan Instrumen v2.0

## Bank utama

- 192 core item.
- 8 information elements.
- 8 measurement channels.
- 3 replikasi independen untuk setiap kombinasi elemen-kanal.
- 64/64 sel lengkap.
- 32 holdout, empat per elemen.
- 32 tie-break, dua per pasangan kandidat yang telah ditentukan.

Core item tidak dibentuk dari satu template channel yang hanya mengganti nama elemen. Setiap skenario, pernyataan, dan fokus respons ditulis secara eksplisit.

## Cakupan per mode

### Ringkas — 80 item

- Satu item dari setiap 64 sel.
- Enam belas replikasi tambahan.
- Tambahan disusun dengan pola Latin sederhana sehingga setiap elemen dan kanal mendapat jumlah tambahan yang sama.

### Standar — 128 item

- Satu item dari setiap 64 sel.
- Empat puluh delapan replikasi tambahan.
- Enam belas holdout: dua per elemen.

### Mendalam — 224–226 item

- Semua 192 core.
- Semua 32 holdout.
- Maksimal dua tie-break untuk pasangan top-two apabila selisih masih kecil.

## Quality gate

`scripts/audit.ts` menjalankan:

1. Audit ID dan pernyataan identik.
2. Pemeriksaan 64 sel × 3 core item.
3. Pemeriksaan empat holdout per elemen.
4. Canonical pair untuk seluruh tie-break.
5. Simulasi 10.000 seed pada ketiga mode.
6. Pemeriksaan bahwa semua jawaban 1 dan semua jawaban 5 tidak menghasilkan profil kanal yang sama.
7. Synthetic recovery untuk seluruh 16 TIM.

Audit struktural bukan bukti reliabilitas empiris.
````

---

## `docs/DEPLOYMENT.md`

````md
# Panduan Deployment & Produksi
## Aplikasi Web - "Socionics Dalam Diriku"

Aplikasi ini dirancang sebagai SPA (*Single Page Application*) statis murni yang 100% berjalan di sisi klien (browser). Aplikasi ini tidak memerlukan database eksternal, server backend, kunci API rahasia, atau langganan cloud berbayar.

---

### 1. Prasyarat Lingkungan Kerja
Pastikan peranti Anda telah terpasang:
- **Node.js:** Versi 18 atau lebih tinggi.
- **npm:** Versi 9 atau lebih tinggi.

---

### 2. Instruksi Instalasi Lokal
1. Ekstrak seluruh file proyek ke folder tujuan.
2. Buka terminal atau Command Prompt pada folder tersebut.
3. Jalankan perintah instalasi dependency:
   ```bash
   npm install
   ```

---

### 3. Menjalankan Server Pengembangan (Local Dev Server)
Untuk menguji aplikasi secara interaktif dengan dukungan *Hot Module Replacement (HMR)* di komputer lokal:
```bash
npm run dev
```
Aplikasi secara bawaan dapat diakses pada alamat: `http://localhost:3000` (atau port alternatif yang diberikan oleh Vite).

---

### 4. Melakukan Kompilasi Produksi (Production Build)
Untuk melakukan kompilasi file aset produksi statis optimal:
```bash
npm run build
```
Hasil build akan tersimpan dalam folder `/dist`. Folder ini berisi:
- `/dist/index.html` (Entrypoint tunggal terkompilasi)
- `/dist/assets/` (Gabungan script TypeScript, style CSS Tailwind, dan font)

Aset di dalam folder `/dist` ini siap diunggah langsung ke penyedia hosting statis mana pun.

---

### 5. Deployment ke Vercel (Static App)
Karena aplikasi ini statis murni, men-deploy-nya ke Vercel sangatlah mudah:
1. Hubungkan repository GitHub proyek Anda dengan Vercel Dashboard.
2. Atur konfigurasi build berikut:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Klik **Deploy**. Aplikasi akan online dalam waktu kurang dari 1 menit.

---

### 6. Beroperasi Sebagai Aplikasi Mandiri Offline
Anda juga dapat membuka aplikasi secara langsung dari piringan penyimpanan lokal (hard disk/flashdisk) tanpa koneksi internet sama sekali:
1. Buat hasil build dengan `npm run build`.
2. Gunakan static server lokal minimal seperti `http-server` (bisa diinstal via `npm install -g http-server`) untuk membukanya harian tanpa internet:
   ```bash
   npx http-server dist
   ```
3. Data jawaban Anda tetap aman dan andal tersimpan di `localStorage` peranti masing-masing.
````

---

## `docs/FAIRNESS_AUDIT.md`

````md
# Audit Keadilan Awal v2.0

Versi ini mengurangi ketergantungan pada profesi, gender role, estetika, dan hobi tertentu dengan menyebarkan item ke 14 konteks. Namun, fairness belum dapat dinyatakan terbukti tanpa sampel nyata.

## Mitigasi desain

- Semua 8 elemen dan 8 kanal mendapat cakupan yang sama.
- Mode ringkas tidak lagi kehilangan cell secara acak.
- Item tidak memberi poin langsung kepada satu TIM.
- Tie-break dipisahkan dari bank core dan hanya dipakai pada pasangan relevan.
- Scoring tidak menggunakan korelasi MBTI/Enneagram sebagai shortcut.
- Data peserta tetap di localStorage.

## Yang belum dapat diklaim

- Tidak ada bukti measurement invariance lintas gender, usia, pendidikan, daerah, atau budaya.
- Tidak ada differential item functioning analysis.
- Tidak ada norma populasi Indonesia.
- Tidak ada Cronbach alpha atau omega dari data nyata.
- Tidak ada test–retest study.

Lihat `VALIDATION_ROADMAP.md` untuk langkah empiris berikutnya.
````

---

## `docs/QUESTION_WRITING_GUIDE.md`

````md
# Pedoman Penulisan Item v2.0

## Kontrak item

Setiap item harus:

1. Mengukur satu elemen dan satu kanal utama.
2. Menyebut situasi yang dapat dibayangkan.
3. Tidak menyebut nama elemen, TIM, quadra, atau posisi Model A kepada peserta.
4. Tidak menjadikan kebajikan sebagai jawaban yang jelas lebih baik.
5. Tidak menyamakan kemampuan, kenyamanan, nilai, rasa sakit, dan bantuan dari orang lain.
6. Berbeda secara semantik dari dua replikasi dalam sel yang sama.
7. Memakai konteks yang berbeda dari dua replikasi lainnya.
8. Memiliki `responseFocus` agar penjelasan opsi tetap spesifik.

## Kanal

- Producer: produksi spontan tanpa diminta.
- Flexible: penggunaan adaptif untuk membantu tujuan lain.
- Mask: performa karena peran, norma, atau citra.
- Threat: rasa tertekan, kaku, malu, defensif, atau ingin menghindar.
- Receiver: relief ketika orang lain menyediakan informasi/aksi yang tepat.
- Aspiration: area perkembangan dan pengakuan yang menyentuh.
- Dismissive: mampu tetapi membatasi atau menganggapnya bukan inti.
- Background: kompetensi otomatis yang berjalan di latar.

## Larangan stereotype

- Ne bukan “kreatif” saja.
- Ni bukan ramalan atau melamun saja.
- Se bukan galak atau kekerasan saja.
- Si bukan makanan dan rebahan saja.
- Te bukan rajin, hemat, atau angka saja.
- Ti bukan rapi dan patuh aturan saja.
- Fe bukan lucu dan pesta saja.
- Fi bukan baik hati dan curhat saja.

## Review manusia

Audit kode dapat menemukan duplikasi dan cakupan yang hilang, tetapi tidak dapat menggantikan cognitive interview. Setiap item yang lolos kode tetap perlu diuji kepada peserta untuk memastikan tafsirnya sesuai maksud penulis.
````

---

## `docs/REBUILD_REPORT.md`

````md
# Laporan Rebuild v2.0

## Akar masalah versi awal

- 192 core item berasal dari delapan template channel.
- Sampler hanya menyeimbangkan elemen dan dapat kehilangan banyak elemen-kanal.
- Angka `reliability` dan `discrimination` ditulis langsung pada item lalu diperlakukan seperti hasil empiris.
- Normalisasi positif membuang perbedaan magnitudo respons.
- Banyak tag tie-break tidak canonical.
- Waktu penyelesaian masih placeholder.
- Audit UI hanya memeriksa struktur Model A, tetapi membuat klaim instrumen yang lebih luas.

## Perubahan teknis

- Bank eksplisit dipecah ke tiga file.
- Schema item memakai `designWeight`, bukan pseudo-reliability.
- Signed theory priors dan weighted RMSE.
- Holdout similarity kontinu.
- Pairwise adaptive tie-break.
- Stratified sampler dengan full 64-cell coverage.
- Autosave sebelum auto-next dan migrasi localStorage versi.
- Completion time aktual.
- Audit struktural dan synthetic vectors.

## Hasil pemeriksaan build

- TypeScript: lulus.
- Audit 10.000 seed: lulus.
- Unique statements: 256/256.
- 64 core cells: lengkap.
- Synthetic recovery: 16/16 TIM.
- Production build: lulus.

Pemeriksaan tersebut memastikan integritas kode dan desain internal, bukan validasi psikometrik populasi.

## Final quality gate tambahan

- Sesi tidak lagi dapat diselesaikan setelah dua jawaban; seluruh item aktif harus sudah dijawab atau dilewati.
- Jawaban dan status skip tidak dapat tercatat bersamaan pada item yang sama.
- Jalur jawaban terakhir dan skip terakhir menggunakan proses penyelesaian yang sama, termasuk adaptive tie-break.
- Audit kini juga menolak pasangan item dengan kemiripan leksikal sangat tinggi.
````

---

## `docs/SCORING_GUIDE.md`

````md
# Panduan Scoring v2.0

## 1. Transformasi respons

Pilihan 1–5 ditransformasikan menjadi -1, -0,5, 0, +0,5, +1. Tanda dan magnitudo dipertahankan.

## 2. Profil 64 kanal

Untuk setiap elemen, respons diringkas ke delapan kanal:

- producer
- flexible
- mask
- threat
- receiver
- aspiration
- dismissive
- background

Item yang tidak dijawab tidak dimasukkan ke rata-rata. Sampler menjamin seluruh sel muncul setidaknya sekali pada semua mode.

## 3. Theory priors Model A

Setiap posisi Model A memiliki expected signed channel profile. Parameter ini berstatus **theory prior**, bukan estimasi populasi. Fit dihitung dengan weighted RMSE antara profil jawaban dan prior posisi.

## 4. Perbandingan 16 TIM

Setiap TIM dinilai sebagai susunan lengkap delapan posisi. Skor utama adalah rata-rata similarity delapan elemen, lalu diberi kontribusi kecil dari koherensi quadra dan holdout.

`fitScore` adalah indeks kecocokan 0–100 terhadap profile prior. Ia bukan posterior Bayesian terkalibrasi dan bukan peluang ilmiah bahwa tipe tersebut “benar”.

## 5. Holdout

Holdout tidak digunakan untuk membuat profil core. Setelah kandidat dibentuk, respons holdout dibandingkan dengan respons yang diprediksi oleh posisi kandidat. Jawaban netral tidak dianggap cocok otomatis; similarity dihitung secara kontinu.

## 6. Tie-break adaptif

Jika top-two berjarak kurang dari ambang dan pasangan memiliki item pembeda, aplikasi menambahkan dua item pasangan tersebut. Tag selalu dibuat melalui `canonicalPair()`.

## 7. Confidence

Confidence mempertimbangkan:

- jumlah sel yang terjawab;
- jarak top-one dan top-two;
- konsistensi replikasi;
- straightlining;
- penggunaan midpoint;
- holdout agreement.

Confidence tetap merupakan indikator internal, bukan koefisien reliabilitas psikometrik.
````

---

## `docs/VALIDATION_ROADMAP.md`

````md
# Roadmap Validasi Empiris

## Tahap 1 — Cognitive interview

- 5–8 peserta per putaran.
- Minta peserta menjelaskan ulang arti item.
- Catat kata yang ambigu, motif yang tidak dimaksudkan, dan opsi yang sulit dibedakan.
- Revisi lalu ulangi sampai tafsir stabil.

## Tahap 2 — Pilot awal

- Target awal 300–500 respons lengkap.
- Simpan versi item dan waktu respons.
- Analisis missingness, distribusi opsi, floor/ceiling, residual, dan item-total pada masing-masing kanal.
- Jangan menghapus item hanya karena satu statistik; periksa kembali content coverage.

## Tahap 3 — Struktur dan reliabilitas

- Gunakan omega dan model multidimensi yang sesuai dengan 64 kanal.
- Uji alternatif: hierarchical model, multidimensional IRT, atau Bayesian latent profile.
- Bandingkan hasil internal dengan self-typing yang telah diverifikasi melalui wawancara, bukan sekadar tes Socionics lain.

## Tahap 4 — Holdout dan calibration

- Pisahkan calibration dan validation sample.
- Estimasi parameter item dari calibration set.
- Evaluasi top-1/top-3 recovery, calibration curve, Brier score, dan uncertainty pada validation set.

## Tahap 5 — Fairness dan stabilitas

- Test–retest 2–4 minggu.
- DIF lintas kelompok yang memiliki ukuran sampel cukup.
- Measurement invariance untuk bahasa/kelompok budaya bila data memungkinkan.
- Pantau perubahan hasil karena kondisi sesaat, bukan hanya tipe.

## Aturan publikasi

Jangan menampilkan alpha, accuracy, atau probability sebagai fakta sebelum analisis dapat direproduksi dari dataset dan kode yang terdokumentasi.
````

---

## `index.html`

````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Socionics Dalam Diriku - Tes Model A Lengkap</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

---

## `metadata.json`

````json
{
  "name": "Socionics Dalam Diriku",
  "description": "Aplikasi refleksi pendidikan Socionics Model A dengan bank 256 item, sampling berstrata, holdout, tie-break adaptif, dan penyimpanan lokal.",
  "requestFramePermissions": [],
  "majorCapabilities": [],
  "version": "2.0.1"
}
````

---

## `package.json`

````json
{
  "name": "socionics-dalam-diriku",
  "private": true,
  "version": "2.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit",
    "audit": "tsx scripts/audit.ts",
    "check": "npm run lint && npm run audit && npm run build"
  },
  "dependencies": {
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.1",
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.2.0",
    "tailwindcss": "^4.3.1",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
````

---

## `scripts/audit.ts`

````ts
import { runInstrumentAudit } from "../src/audit/instrumentAudit";
import { ALL_QUESTIONS } from "../src/data/questions";
import { calculateResult, POSITION_PRIORS } from "../src/scoring/engine";
import { TIM_MODELS } from "../src/constants/socionicsData";
import type { ModelAPosition, TestSession, TIM } from "../src/types/socionics";
import { applyAnswer, applySkip } from "../src/session/sessionState";

const fail = (message: string): never => {
  throw new Error(message);
};

const report = runInstrumentAudit(10_000);
if (!report.success) {
  console.error(report.errors.join("\n"));
  fail(`Audit struktural gagal dengan ${report.errors.length} error.`);
}

const coreAndHoldout = ALL_QUESTIONS.filter((question) => !question.isTieBreak);
const allLow = Object.fromEntries(coreAndHoldout.map((question) => [question.id, 1]));
const allHigh = Object.fromEntries(coreAndHoldout.map((question) => [question.id, 5]));

const sessionFixture: TestSession = {
  mode: "ringkas",
  answers: {},
  skippedIds: [],
  questionIds: coreAndHoldout.slice(0, 2).map((question) => question.id),
  currentIndex: 0,
  startedAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
  seed: 1,
  appVersion: "2.0.0",
  completed: false,
};
const savedFixture = applyAnswer(sessionFixture, sessionFixture.questionIds[0], 4, false);
if (savedFixture.answers[sessionFixture.questionIds[0]] !== 4) fail("applyAnswer tidak menyimpan jawaban.");
if (savedFixture.currentIndex !== 0) fail("applyAnswer advance=false tetap memindahkan indeks.");
const advancedFixture = applyAnswer(savedFixture, savedFixture.questionIds[0], 5, true);
if (advancedFixture.currentIndex !== 1 || advancedFixture.answers[savedFixture.questionIds[0]] !== 5) {
  fail("applyAnswer gagal memperbarui jawaban sebelum berpindah.");
}
const skippedFixture = applySkip(savedFixture, savedFixture.questionIds[0]);
if (skippedFixture.answers[savedFixture.questionIds[0]] !== undefined) {
  fail("applySkip tidak menghapus jawaban lama pada pertanyaan yang dilewati.");
}
if (!skippedFixture.skippedIds.includes(savedFixture.questionIds[0])) {
  fail("applySkip tidak mencatat pertanyaan yang dilewati.");
}

const lowResult = calculateResult(allLow, ALL_QUESTIONS);
const highResult = calculateResult(allHigh, ALL_QUESTIONS);
const lowVector = JSON.stringify(lowResult.channelProfile);
const highVector = JSON.stringify(highResult.channelProfile);
if (lowVector === highVector) fail("Semua jawaban 1 dan semua jawaban 5 menghasilkan profil yang sama.");

const syntheticFailures: string[] = [];
for (const type of Object.keys(TIM_MODELS) as TIM[]) {
  const answers: Record<string, number> = {};
  for (const question of coreAndHoldout) {
    const positions = TIM_MODELS[type].positions;
    const position = (Object.keys(positions) as ModelAPosition[]).find((key) => positions[key] === question.element);
    if (!position) continue;
    const expected = POSITION_PRIORS[position][question.channel];
    answers[question.id] = expected >= 0.65 ? 5 : expected >= 0.2 ? 4 : expected <= -0.65 ? 1 : expected <= -0.2 ? 2 : 3;
  }
  const result = calculateResult(answers, ALL_QUESTIONS);
  if (result.top3[0].type !== type) {
    syntheticFailures.push(`${type} -> ${result.top3.map((entry) => entry.type).join(", ")}`);
  }
}
if (syntheticFailures.length > 0) {
  fail(`Synthetic recovery gagal:\n${syntheticFailures.join("\n")}`);
}

console.log(JSON.stringify({
  status: "passed",
  metrics: report.metrics,
  warnings: report.warnings,
  syntheticTypesRecovered: 16,
  extremeProfilesDistinct: lowVector !== highVector,
  uniformResponseConfidence: {
    allLow: lowResult.confidence,
    allHigh: highResult.confidence,
  },
}, null, 2));
````

---

## `src/App.tsx`

````tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Brain,
  Compass,
  Activity,
  Sliders,
  Shield,
  Heart,
  Target,
  Check,
  RotateCcw,
  Download,
  Upload,
  BookOpen,
  Info,
  Users,
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  AlertTriangle,
  X,
  Menu,
  Lock,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

import { useTestSession } from "./hooks/useTestSession";
import { TIM_MODELS, TIM_PROFILES, QUADRA_DATA, INTERTYPE_MAP, INTERTYPE_RELATIONS_METADATA, ELEMENTS_METADATA } from "./constants/socionicsData";
import { ALL_QUESTIONS } from "./data/questions";
import { calculateResult } from "./scoring/engine";
import { TIM, TIMProfile, InformationElement, MeasurementChannel, ModelAPosition, Quadra, TestSession } from "./types/socionics";
import { getOptionDetail } from "./utils/optionDetails";
import { runInstrumentAudit } from "./audit/instrumentAudit";

// Option Scale Wording by ScaleType
const SCALE_OPTIONS_MAP: Record<string, { val: number; label: string }[]> = {
  automaticity: [
    { val: 1, label: "Tidak muncul secara alami" },
    { val: 2, label: "Harus kupikirkan cukup lama" },
    { val: 3, label: "Tergantung keadaan" },
    { val: 4, label: "Cukup spontan" },
    { val: 5, label: "Muncul hampir tanpa usaha" }
  ],
  comfort: [
    { val: 1, label: "Sangat menguras tenaga" },
    { val: 2, label: "Cukup tidak nyaman" },
    { val: 3, label: "Netral atau tergantung situasi" },
    { val: 4, label: "Cukup nyaman" },
    { val: 5, label: "Sangat nyaman" }
  ],
  threat: [
    { val: 1, label: "Sama sekali tidak mengganggu" },
    { val: 2, label: "Sedikit mengganggu" },
    { val: 3, label: "Cukup menekan" },
    { val: 4, label: "Sangat menekan" },
    { val: 5, label: "Membuatku beku, defensif, malu, atau menghindar" }
  ],
  relief: [
    { val: 1, label: "Tidak membantu" },
    { val: 2, label: "Sedikit membantu" },
    { val: 3, label: "Lumayan membantu" },
    { val: 4, label: "Sangat membantu" },
    { val: 5, label: "Sangat melegakan batin harian" }
  ],
  recognition: [
    { val: 1, label: "Tidak berarti" },
    { val: 2, label: "Sedikit berarti" },
    { val: 3, label: "Cukup menyenangkan" },
    { val: 4, label: "Sangat berarti" },
    { val: 5, label: "Menyentuh kebutuhan terdalam batin" }
  ],
  frequency: [
    { val: 1, label: "Tidak pernah" },
    { val: 2, label: "Jarang" },
    { val: 3, label: "Kadang-kadang" },
    { val: 4, label: "Sering" },
    { val: 5, label: "Hampir selalu" }
  ],
  competence: [
    { val: 1, label: "Sangat kesulitan" },
    { val: 2, label: "Cukup kesulitan" },
    { val: 3, label: "Bisa dalam keadaan tertentu" },
    { val: 4, label: "Cukup mampu" },
    { val: 5, label: "Sangat mampu" }
  ],
  importance: [
    { val: 1, label: "Sama sekali tidak penting" },
    { val: 2, label: "Kurang penting" },
    { val: 3, label: "Tergantung keadaan" },
    { val: 4, label: "Penting" },
    { val: 5, label: "Sangat penting" }
  ],
  comparison: [
    { val: 1, label: "Jauh lebih dekat B" },
    { val: 2, label: "Agak lebih dekat B" },
    { val: 3, label: "Sama dekat" },
    { val: 4, label: "Agak lebih dekat A" },
    { val: 5, label: "Jauh lebih dekat A" }
  ]
};

/// Option details are now loaded dynamically from src/utils/optionDetails.ts

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "test" | "review" | "result" | "method" | "references" | "audit">("landing");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Local temporary states for redesigned automatic test flow
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [expandedRating, setExpandedRating] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  const {
    session,
    activeQuestions,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    startNewSession,
    answerQuestion,
    skipQuestion,
    goToQuestion,
    appendTieBreakQuestions,
    completeSession,
    resetSession
  } = useTestSession();

  // Clear timeout on unmount or cleanup
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Handle auto-redirection on fresh completion
  useEffect(() => {
    if (session?.completed) {
      setCurrentPage("result");
    }
  }, [session?.completed]);

  const finishOrExtendSession = (baseSession: TestSession) => {
    const provisional = calculateResult(baseSession.answers, ALL_QUESTIONS, {
      startedAt: baseSession.startedAt,
      questionIds: baseSession.questionIds,
    });

    if (provisional.unresolvedPair && !baseSession.tieBreakPair) {
      const extended = appendTieBreakQuestions(provisional.unresolvedPair, baseSession);
      if (extended && extended.questionIds.length > baseSession.questionIds.length) {
        setCurrentPage("test");
        return;
      }
    }

    completeSession(baseSession);
    setCurrentPage("result");
  };

  // One tap saves immediately. The information icon remains a separate control.
  const handleOptionSelect = (val: number) => {
    if (isTransitioning || !currentQuestion || !session) return;

    setSelectedRating(val);
    const savedSession = answerQuestion(currentQuestion.id, val, false);
    if (!savedSession) return;

    setIsTransitioning(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReducedMotion ? 60 : 420;

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setExpandedRating(null);

      if (isLastQuestion) {
        finishOrExtendSession(savedSession);
      } else {
        goToQuestion(savedSession.currentIndex + 1);
      }

      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, delay);
  };

  const handleSkipCurrentQuestion = () => {
    if (isTransitioning || !currentQuestion || !session) return;
    const savedSession = skipQuestion(currentQuestion.id);
    if (!savedSession) return;
    setExpandedRating(null);
    setSelectedRating(null);
    if (isLastQuestion) finishOrExtendSession(savedSession);
  };

  const handleInfoClick = (e: React.MouseEvent, val: number) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedRating((current) => (current === val ? null : val));
  };

  // Synchronize local selected rating and hide explanation panel on question/index change
  useEffect(() => {
    if (currentPage === "test" && currentQuestion) {
      const saved = session?.answers[currentQuestion.id] || null;
      setSelectedRating(saved);
      setExpandedRating(null); // Keep explanation closed by default!
      
      // Gentle scroll to the active question Card
      if (questionRef.current) {
        questionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentPage, currentQuestion?.id, session?.currentIndex]);

  // Keyboard Event Listeners for Test (1 to 5 keys to instantly select, arrow keys to slide page)
  useEffect(() => {
    if (currentPage !== "test" || !currentQuestion || isTransitioning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "5") {
        const rating = parseInt(e.key);
        handleOptionSelect(rating);
      } else if (e.key === "ArrowLeft" && !isFirstQuestion) {
        goToQuestion(session!.currentIndex - 1);
      } else if (e.key === "ArrowRight" && !isLastQuestion) {
        skipQuestion(currentQuestion.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, currentQuestion?.id, isFirstQuestion, isLastQuestion, selectedRating, session, isTransitioning]);

  // Compute assessment outputs
  const handledCount = session
    ? Object.keys(session.answers).length + session.skippedIds.length
    : 0;
  const allSessionItemsHandled = Boolean(
    session && activeQuestions.length > 0 && handledCount >= activeQuestions.length,
  );

  const calculatedOutput = useMemo(() => {
    if (!session || Object.keys(session.answers).length < 2) return null;
    return calculateResult(session.answers, ALL_QUESTIONS, {
      startedAt: session.startedAt,
      questionIds: session.questionIds,
    });
  }, [session]);

  // Card Uploader assets
  const [cardNickname, setCardNickname] = useState("");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const cardCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawResultCard = () => {
    const canvas = cardCanvasRef.current;
    if (!canvas || !calculatedOutput) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const top1 = calculatedOutput.top3[0];
    const topModel = TIM_MODELS[top1.type];

    // Clear and fill canvas vertical space
    ctx.clearRect(0, 0, 1080, 1920);

    // Outer Background
    ctx.fillStyle = theme === "dark" ? "#0b1329" : "#f8fafc";
    ctx.fillRect(0, 0, 1080, 1920);

    // Gradient corner lighting
    const grad = ctx.createRadialGradient(540, 960, 50, 540, 960, 1000);
    grad.addColorStop(0, theme === "dark" ? "#132b4f" : "#ecfdf5");
    grad.addColorStop(1, theme === "dark" ? "#030712" : "#f1f5f9");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Frame borders
    ctx.strokeStyle = theme === "dark" ? "#10b981" : "#059669";
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, 1000, 1840);

    // Inner subtle guidelines
    ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 960, 1800);

    // Header Title
    ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
    ctx.font = "bold 64px Space Grotesk";
    ctx.textAlign = "center";
    ctx.fillText("KARTU COGNITIVE TIPOLOGI", 540, 160);

    ctx.font = "bold 28px JetBrains Mono";
    ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
    ctx.fillText("SOCIONICS DALAM DIRIKU • MODEL A", 540, 215);

    // Sub Title
    ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
    ctx.font = "22px Inter";
    ctx.fillText("Aplikasi Asesmen Mandiri - Bukan Identitas Resmi Negara", 540, 255);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
    ctx.beginPath();
    ctx.moveTo(150, 290);
    ctx.lineTo(930, 290);
    ctx.stroke();

    // Portrait Section
    const drawPortrait = () => {
      const px = 540 - 150;
      const py = 330;
      const pw = 300;
      const ph = 300;

      // Card Photo Inner Shadow Border
      ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.4)" : "rgba(5, 150, 105, 0.4)";
      ctx.lineWidth = 6;
      ctx.strokeRect(px - 10, py - 10, pw + 20, ph + 20);

      if (cardImage) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, px, py, pw, ph);
          drawMetas();
        };
        img.src = cardImage;
      } else {
        // Fallback Vector
        ctx.fillStyle = theme === "dark" ? "#111827" : "#e2e8f0";
        ctx.fillRect(px, py, pw, ph);

        ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
        ctx.font = "bold 110px Space Grotesk";
        ctx.fillText(top1.type, 540, 500);

        ctx.font = "20px JetBrains Mono";
        ctx.fillStyle = "rgba(100, 116, 139, 0.8)";
        ctx.fillText("No Image Uploaded", 540, 550);
        drawMetas();
      }
    };

    const drawMetas = () => {
      // Nickname
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 44px Space Grotesk";
      ctx.fillText(cardNickname ? cardNickname.toUpperCase() : "PARTICIPANT", 540, 710);

      // Main TIM Title
      ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
      ctx.font = "bold 88px Space Grotesk";
      ctx.fillText(`${top1.type} • ${topModel.name}`, 540, 830);

      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "34px Inter";
      ctx.fillText(topModel.fullName, 540, 890);

      // Metadata Pill Box
      ctx.fillStyle = theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.1)";
      ctx.fillRect(150, 930, 780, 120);
      ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.3)" : "rgba(5, 150, 105, 0.3)";
      ctx.strokeRect(150, 930, 780, 120);

      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "26px JetBrains Mono";
      ctx.fillText(`Quadra: ${topModel.quadra}  |  Club: ${topModel.club}  |  Dual: ${topModel.dual}`, 540, 1000);

      // Model A Grid (Simplified for Card)
      ctx.textAlign = "left";
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 34px Space Grotesk";
      ctx.fillText("FUNGSI MODEL A UTAMA:", 150, 1120);

      const positions: { key: ModelAPosition; title: string }[] = [
        { key: "Base", title: "1. Leading / Base" },
        { key: "Creative", title: "2. Creative" },
        { key: "Role", title: "3. Role" },
        { key: "Vulnerable", title: "4. Vulnerable / PoLR" },
        { key: "Suggestive", title: "5. Suggestive" },
        { key: "Mobilizing", title: "6. Mobilizing" },
        { key: "Ignoring", title: "7. Ignoring" },
        { key: "Demonstrative", title: "8. Demonstrative" }
      ];

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";

      positions.forEach((pos, idx) => {
        const el = topModel.positions[pos.key];
        const row = Math.floor(idx / 2);
        const col = idx % 2;

        const x = 150 + col * 400;
        const y = 1170 + row * 130;

        // Position cell backing
        ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
        ctx.fillRect(x, y, 380, 100);
        ctx.strokeRect(x, y, 380, 100);

        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.font = "20px JetBrains Mono";
        ctx.fillText(pos.title, x + 15, y + 40);

        ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
        ctx.font = "bold 38px Space Grotesk";
        ctx.fillText(`${el} (${ELEMENTS_METADATA[el].name.split(" ")[0]})`, x + 15, y + 80);
      });

      // Bottom confidence seal
      ctx.textAlign = "center";
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 26px Space Grotesk";
      ctx.fillText(`Indeks kecocokan: ${top1.fitScore}%  |  Verifikasi holdout: ${top1.holdoutScore}%`, 540, 1720);

      ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
      ctx.font = "20px JetBrains Mono";
      const timestamp = new Date(session!.lastUpdatedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
      ctx.fillText(`Timestamp: ${timestamp}  |  Scoring Engine v2.0.0`, 540, 1770);
    };

    drawPortrait();
  };

  const handleDownloadCard = () => {
    drawResultCard();
    setTimeout(() => {
      const canvas = cardCanvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Socionics_Dalam_Diriku_${cardNickname || "hasil"}.png`;
      link.href = dataUrl;
      link.click();
    }, 200);
  };

  // Integrity checks
  const auditReport = useMemo(() => runInstrumentAudit(200), []);

  // UI state for detailed view tabs
  const [activeModelAPos, setActiveModelAPos] = useState<ModelAPosition | null>("Base");
  const [compareTIM, setCompareTIM] = useState<TIM | "">("");
  const [intertypeTarget, setIntertypeTarget] = useState<TIM>("SEI");

  // Dynamic selection lists
  const availableTIMs = Object.keys(TIM_MODELS) as TIM[];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* GLOBAL BACKGROUND CANVAS RENDERER FOR CARDS */}
      <canvas ref={cardCanvasRef} width="1080" height="1920" className="hidden" />

      {/* HEADER BAR */}
      <header className={`sticky top-0 z-50 border-b no-print ${theme === "dark" ? "bg-slate-900/90 border-slate-800 backdrop-blur-md" : "bg-white/90 border-slate-200 backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer" onClick={() => setCurrentPage("landing")}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              <Brain className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <span className="text-base md:text-xl font-display font-bold tracking-tight">Socionics Dalam Diriku</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">MODEL A</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <button onClick={() => setCurrentPage("landing")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "landing" ? "text-emerald-500" : ""}`}>Beranda</button>
            {session && (
              <button onClick={() => setCurrentPage("test")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "test" ? "text-emerald-500" : ""}`}>Asesmen</button>
            )}
            {calculatedOutput && (
              <button onClick={() => setCurrentPage("result")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "result" ? "text-emerald-500" : ""}`}>Hasil</button>
            )}
            <button onClick={() => setCurrentPage("method")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "method" ? "text-emerald-500" : ""}`}>Metodologi</button>
            <button onClick={() => setCurrentPage("references")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "references" ? "text-emerald-500" : ""}`}>Referensi</button>
            <button onClick={() => setCurrentPage("audit")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "audit" ? "text-emerald-500" : ""}`}>Audit</button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-11 h-11 lg:w-auto lg:h-auto min-w-[44px] min-h-[44px] px-0 lg:px-3 lg:py-2 flex items-center justify-center rounded-lg border transition text-sm ${
                theme === "dark" ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              }`}
              aria-label="Ubah Tema"
            >
              <span className="lg:hidden">{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="hidden lg:inline">{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              className={`lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border transition ${
                theme === "dark" ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-2 pb-4 space-y-2 border-t no-print ${
            theme === "dark" ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900 shadow-lg"
          }`}>
            <button onClick={() => { setCurrentPage("landing"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Beranda</button>
            {session && (
              <button onClick={() => { setCurrentPage("test"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Asesmen</button>
            )}
            {calculatedOutput && (
              <button onClick={() => { setCurrentPage("result"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Hasil</button>
            )}
            <button onClick={() => { setCurrentPage("method"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Metodologi</button>
            <button onClick={() => { setCurrentPage("references"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Referensi</button>
            <button onClick={() => { setCurrentPage("audit"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Audit</button>
          </div>
        )}
      </header>

      {/* CORE CONTENT SWITCH */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LANDING PAGE */}
        {currentPage === "landing" && (
          <div className="max-w-4xl mx-auto text-center space-y-12 py-10">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 text-xs sm:text-sm font-mono mx-auto">
                <Compass className="w-4 h-4" />
                <span>ASOSIASI TIPOLOGI SOCIONICS INDONESIA</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
                Temukan Struktur Kognitif <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  Model A Socionics
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Asesmen psikometrik mutakhir menggunakan 64 profil kanal evaluasi, holdout verification cerdas, dan deteksi person-fit untuk mengungkap metabolisme informasi harian Anda.
              </p>
            </div>

            {/* Session status reload box */}
            {session && (
              <div className={`p-6 rounded-xl border max-w-md mx-auto space-y-4 ${
                theme === "dark" ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-950"
              }`}>
                <div className={`flex items-center justify-center space-x-3 font-medium ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
                  <Activity className="w-5 h-5 animate-pulse" />
                  <span>Sesi Tes Anda Masih Berlangsung</span>
                </div>
                <div className={`text-xs font-mono ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Selesai: {Object.keys(session.answers).length} / {activeQuestions.length} Soal | Mode: {session.mode.toUpperCase()}
                </div>
                <div className="flex justify-center space-x-3">
                  <button onClick={() => setCurrentPage("test")} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition shadow cursor-pointer">
                    Lanjutkan Tes
                  </button>
                  <button onClick={resetSession} className={`font-medium px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                    theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-100 hover:bg-slate-200 text-slate-850 border border-slate-200 shadow-sm"
                  }`}>
                    Mulai Baru
                  </button>
                </div>
              </div>
            )}

            {!session && (
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                {[
                  { mode: "ringkas", label: "Mode Ringkas", count: "80 Soal", desc: "Seluruh 64 elemen-kanal tetap tercakup, ditambah 16 replikasi seimbang. Estimasi 10–14 menit." },
                  { mode: "standar", label: "Mode Standar", count: "128 Soal", desc: "Cakupan penuh, replikasi lintas konteks, dan 16 item holdout. Estimasi 18–24 menit." },
                  { mode: "mendalam", label: "Mode Mendalam", count: "224–226 Soal", desc: "Semua 192 core dan 32 holdout; dua pembeda adaptif muncul hanya bila kandidat sangat dekat. Estimasi 32–45 menit." }
                ].map((m) => (
                  <div key={m.mode} className={`p-6 rounded-xl border space-y-4 hover:border-emerald-500/30 transition shadow-lg flex flex-col justify-between ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/50 text-slate-100" : "border-slate-200 bg-white text-slate-900 shadow-sm"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{m.label}</h3>
                        <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full font-mono font-bold">{m.count}</span>
                      </div>
                      <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>{m.desc}</p>
                    </div>
                    <button
                      onClick={() => startNewSession(m.mode as any)}
                      className={`w-full font-bold py-2 rounded-lg text-sm transition mt-4 cursor-pointer ${
                        theme === "dark"
                          ? "bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200"
                          : "bg-slate-100 hover:bg-emerald-500 hover:text-slate-950 text-slate-800 border border-slate-205 shadow-sm"
                      }`}
                    >
                      Pilih Mode
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy and Ethics notice */}
            <div className={`grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-xs border-t pt-8 text-left ${
              theme === "dark" ? "text-slate-500 border-slate-900" : "text-slate-600 border-slate-200"
            }`}>
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                <p>
                  <strong>KEDAULATAN DATA LOKAL:</strong> Semua respon data jawaban maupun foto diolah secara murni di peranti lokal Anda. Aplikasi tidak mengirimkan data apa pun ke server mana pun.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-slate-500 shrink-0" />
                <p>
                  <strong>BATAS EVALUASI:</strong> Tes mandiri ini bertujuan untuk eksplorasi intelek diri, bukan sebagai saran medis, patokan klinis berlisensi, atau jaminan keselarasan mutlak.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-4">
              <button onClick={() => setCurrentPage("method")} className={`inline-flex items-center space-x-1 text-xs transition cursor-pointer ${
                theme === "dark" ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-700"
              }`}>
                <Sliders className="w-3.5 h-3.5" />
                <span>Baca Formulasi Matematika</span>
              </button>
              <button onClick={() => setCurrentPage("references")} className={`inline-flex items-center space-x-1 text-xs transition cursor-pointer ${
                theme === "dark" ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-700"
              }`}>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tinjauan Rujukan Teoretis</span>
              </button>
            </div>
          </div>
        )}

        {/* TEST SESSIONS SCRIPT */}
        {currentPage === "test" && currentQuestion && session && (
          <div className="max-w-2xl mx-auto space-y-8">
            
            {/* Header progress info */}
            <div className={`flex items-center justify-between border-b pb-4 text-xs font-mono ${
              theme === "dark" ? "border-slate-905 text-slate-400" : "border-slate-200 text-slate-600"
            }`}>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-emerald-500" />
                <span>Bagian: Evaluasi Respon Pola Pikir Baku</span>
              </div>
              <div>
                Pertanyaan <span className="text-emerald-500 font-bold">{session.currentIndex + 1}</span> dari <span className="font-bold">{activeQuestions.length}</span>
              </div>
            </div>

            {/* Progress Meter bar */}
            <div className={`w-full h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-slate-900" : "bg-slate-200"}`}>
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${((session.currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Scenarios / Statement Display */}
            <div
              ref={questionRef}
              className={`p-8 rounded-2xl border space-y-6 shadow-xl relative overflow-hidden ${
                theme === "dark" ? "border-slate-850 bg-slate-900/40 text-slate-100" : "border-slate-205 bg-white text-slate-800 shadow-sm"
              }`}
            >
              {currentQuestion.scenario && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-mono font-bold">Bayangkan Situasi</span>
                  <p className={`text-sm leading-relaxed font-sans ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{currentQuestion.scenario}</p>
                </div>
              )}
              <div className={`border-t pt-6 space-y-3 ${theme === "dark" ? "border-slate-800/85" : "border-slate-100"}`}>
                <span className="text-[10px] uppercase tracking-wider text-teal-500 font-mono font-bold">Respon atau Sikap Anda</span>
                <p className={`text-lg sm:text-xl font-medium leading-relaxed font-sans ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {currentQuestion.statement}
                </p>
              </div>
            </div>

            {/* SCALE RESPONSE CHOICES BUTTONS */}
            <div className="space-y-4">
              
              {/* Responsive compact instruction header */}
              <div className={`text-center text-xs md:text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"} max-w-md mx-auto transition-all`}>
                {session.currentIndex >= 3 ? (
                  <span className="opacity-75">Ketuk jawabanmu.</span>
                ) : (
                  <span>Ketuk jawabanmu. Tekan <span className="text-emerald-500 font-bold font-mono">(i)</span> untuk melihat penjelasan.</span>
                )}
              </div>

              {/* Compact 5-column responsive Likert Grid */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5" role="radiogroup" aria-label="Skala Pilihan Jawaban">
                {(SCALE_OPTIONS_MAP[currentQuestion.scaleType] || SCALE_OPTIONS_MAP.frequency).map((opt) => {
                  const isSelected = selectedRating === opt.val;
                  const isExpanded = expandedRating === opt.val;
                  return (
                    <div
                      key={opt.val}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleOptionSelect(opt.val);
                        }
                      }}
                      onClick={() => handleOptionSelect(opt.val)}
                      className={`relative p-1.5 sm:p-2.5 rounded-xl border text-center flex flex-col items-center justify-between transition-all duration-300 cursor-pointer select-none group min-h-[82px] sm:min-h-[105px] focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.22)] scale-[1.01]"
                            : "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm scale-[1.01]"
                          : isExpanded
                            ? theme === "dark"
                              ? "border-teal-500/80 bg-teal-950/20 text-teal-300"
                              : "border-teal-500 bg-teal-50/50 text-teal-800 shadow-xs"
                            : theme === "dark"
                              ? "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {/* Interactive (i) indicator toggle */}
                      <button
                        type="button"
                        onClick={(e) => handleInfoClick(e, opt.val)}
                        className={`absolute top-0.5 right-0.5 p-1 rounded-full transition-all duration-200 cursor-pointer ${
                          isExpanded
                            ? "text-teal-400 bg-teal-950/55 scale-110"
                            : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800/10"
                        }`}
                        aria-label={`Maksud rincian opsi ${opt.val}`}
                        title="Lihat rincian maksud"
                      >
                        <Info className="w-3.5 h-3.5 shrink-0" />
                      </button>

                      {/* Score Value circle / checkmark badge */}
                      <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs md:text-sm border transition-all duration-350 ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md scale-105"
                            : "bg-emerald-600 text-white border-emerald-500 font-extrabold shadow-xs"
                          : isExpanded
                            ? "bg-teal-500 text-slate-950 border-teal-400 font-bold"
                            : theme === "dark"
                              ? "border-slate-700 bg-slate-800 text-slate-300 group-hover:border-slate-600"
                              : "border-slate-250 bg-slate-50 text-slate-700 group-hover:border-slate-300 shadow-xs"
                      }`}>
                        {isSelected ? (
                          <span className="flex items-center justify-center">
                            <Check className="w-3 h-3 sm:w-4.5 sm:h-4.5 text-current shrink-0 stroke-[3]" />
                          </span>
                        ) : (
                          opt.val
                        )}
                      </span>

                      {/* Custom styled 2-3 lines description with line clamp */}
                      <span className="text-[9px] sm:text-[10px] font-medium leading-tight text-center mt-1 sm:mt-1.5 tracking-tight break-words max-w-full block line-clamp-2 sm:line-clamp-3">
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Feedbacks visual for auto-saving event */}
              {isTransitioning && (
                <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-500 font-medium animate-pulse py-1">
                  <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                  <span>Jawaban disimpan. Pindah ke soal berikutnya...</span>
                </div>
              )}

              {/* Redesigned Compact Accordion Explanation Panel */}
              {expandedRating !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`p-4 rounded-xl border space-y-3 shadow-md overflow-hidden transition-all ${
                    theme === "dark"
                      ? "bg-slate-900/60 border-slate-800 text-slate-200"
                      : "bg-teal-50/10 border-teal-500/15 text-slate-800 shadow-sm"
                  }`}
                >
                  <div
                    onClick={() => setExpandedRating(null)}
                    className="flex items-center justify-between cursor-pointer border-b pb-1.5 select-none group/header"
                    title="Klik untuk menutup"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs sm:text-sm font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}>
                        {(SCALE_OPTIONS_MAP[currentQuestion.scaleType] || SCALE_OPTIONS_MAP.frequency).find(o => o.val === expandedRating)?.label || "Penjelasan"}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 lowercase px-1.5 py-0.5 rounded border border-slate-700/30">
                        skala: {currentQuestion.scaleType}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-slate-800/10 transition text-slate-400 group-hover/header:text-slate-200"
                      aria-label="Tutup panel"
                    >
                      <ChevronUp className="w-4 h-4 shrink-0" />
                    </button>
                  </div>

                  {(() => {
                    const detail = getOptionDetail(currentQuestion, expandedRating);
                    return (
                      <div className="space-y-3.5 text-xs sm:text-sm">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Artinya</span>
                          <p className={`leading-relaxed ${theme === "dark" ? "text-slate-350" : "text-slate-600"}`}>
                            {detail?.artinya}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">Contoh reaksi</span>
                          <p className={`leading-relaxed italic ${theme === "dark" ? "text-slate-300" : "text-slate-650 font-serif"}`}>
                            &ldquo;{detail?.reaksi}&rdquo;
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className={`pt-6 border-t space-y-4 ${theme === "dark" ? "border-slate-900" : "border-slate-200"}`}>
              {/* Primary Nav Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
                <button
                  onClick={() => goToQuestion(session.currentIndex - 1)}
                  disabled={isFirstQuestion}
                  className={`w-full sm:w-auto px-5 py-3 text-sm font-medium rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center space-x-2 ${
                    theme === "dark"
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                      : "bg-white border-slate-205 text-slate-750 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span>Kembali</span>
                </button>

                <button
                  onClick={handleSkipCurrentQuestion}
                  className={`w-full sm:w-auto px-5 py-3 text-sm font-semibold rounded-xl border transition cursor-pointer flex items-center justify-center space-x-2 ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-300"
                      : "border-slate-205 bg-white hover:bg-slate-50 text-slate-705 shadow-sm"
                  }`}
                >
                  <span>Lewati Soal</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Utility Nav Buttons (Tinjau, Jeda, Selesaikan) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 w-full border-t border-slate-200/40 dark:border-slate-800/40">
                <button
                  onClick={() => {
                    if (window.confirm("Ingin menjeda sesi tes? Jawaban Anda tersimpan otomatis.")) {
                      setCurrentPage("landing");
                    }
                  }}
                  className={`w-full sm:w-auto text-xs font-mono px-3 py-2 border rounded-lg transition cursor-pointer flex items-center justify-center space-x-1 ${
                    theme === "dark"
                      ? "border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-900/20"
                      : "border-slate-205 text-slate-500 hover:text-slate-750 hover:bg-slate-50 bg-white shadow-sm"
                  }`}
                >
                  <span>Jeda & Simpan Tes</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentPage("review")}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-mono transition cursor-pointer border text-center ${
                      theme === "dark"
                        ? "bg-slate-900/50 hover:bg-slate-800 border-slate-800 text-slate-305"
                        : "bg-white hover:bg-slate-50 text-slate-605 border-slate-202 shadow-sm"
                    }`}
                  >
                    Tinjau Sesi ({Object.keys(session.answers).length}/{activeQuestions.length})
                  </button>

                  {allSessionItemsHandled && (
                    <button
                      onClick={() => finishOrExtendSession(session)}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition cursor-pointer shadow-md text-center"
                    >
                      Selesaikan Sesi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW SESSION SCREEN */}
        {currentPage === "review" && session && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold font-semibold">Tinjau Progress Menjawab</span>
              <h2 className="text-3xl font-display font-extrabold tracking-tight">Tinjauan Sesi Asesmen</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Berikut adalah rekam jejak jawaban Anda. Pastikan semua pertanyaan telah terisi untuk mendapatkan ketajaman interpretasi Model A yang lebih baik.
              </p>
            </div>

            {/* Quick stats panel */}
            <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              theme === "dark" ? "border-slate-850 bg-slate-900/60 text-white" : "border-slate-200 bg-white text-slate-800 shadow-sm"
            }`}>
              <div className="text-center sm:text-left space-y-1">
                <div className="text-xs font-mono text-slate-400">Total Progress Terjawab:</div>
                <div className="text-xl font-bold font-display">
                  {Object.keys(session.answers).length} dari {activeQuestions.length} Pertanyaan ({Math.round((Object.keys(session.answers).length / activeQuestions.length) * 100)}%)
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const firstUnansweredIdx = activeQuestions.findIndex(q => session.answers[q.id] === undefined);
                    goToQuestion(firstUnansweredIdx !== -1 ? firstUnansweredIdx : 0);
                    setCurrentPage("test");
                  }}
                  className={`w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg border transition cursor-pointer text-center ${
                    theme === "dark" ? "bg-slate-800 border-slate-750 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm"
                  }`}
                >
                  Lanjutkan Pengisian
                </button>
                <button
                  onClick={() => finishOrExtendSession(session)}
                  disabled={!allSessionItemsHandled}
                  title={allSessionItemsHandled ? "Selesaikan sesi" : "Jawab atau lewati seluruh pertanyaan terlebih dahulu"}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 px-5 py-2.5 rounded-lg font-bold text-sm transition cursor-pointer shadow text-center"
                >
                  {allSessionItemsHandled ? "Selesaikan & Lihat Hasil" : `Belum selesai (${handledCount}/${activeQuestions.length})`}
                </button>
              </div>
            </div>

            {/* Questions list (one by one downwards) */}
            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const ansVal = session.answers[q.id];
                const isAnswered = ansVal !== undefined;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                      isAnswered
                        ? theme === "dark" ? "bg-slate-900/20 border-slate-800" : "bg-emerald-50/10 border-emerald-100"
                        : theme === "dark" ? "bg-red-500/5 border-red-500/10" : "bg-red-50/20 border-red-100"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-450 bg-slate-850/10 px-2 py-0.5 rounded">
                          No. {idx + 1}
                        </span>
                        {!isAnswered && (
                          <span className="text-[10px] uppercase font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                            Belum Diisi
                          </span>
                        )}
                      </div>
                      
                      {q.scenario && (
                        <p className="text-xs text-slate-520">
                          <span className="font-semibold text-emerald-500 font-mono text-[10px] uppercase tracking-wider mr-1.5">Situasi</span> — {q.scenario}
                        </p>
                      )}
                      
                      <p className={`text-sm sm:text-base font-medium leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-850"}`}>
                        {q.statement}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                      {isAnswered ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400 font-mono mr-1">Skor Pilihan</span>
                          <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center font-mono text-sm">
                            {ansVal}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-red-400 italic">Dilewati</span>
                      )}

                      <button
                        onClick={() => {
                          goToQuestion(idx);
                          setCurrentPage("test");
                        }}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                          theme === "dark"
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-750"
                            : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm"
                        }`}
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Review page footer buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4">
              <button
                onClick={() => setCurrentPage("test")}
                className={`w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg border transition cursor-pointer text-center ${
                  theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
              >
                ← Kembali ke Tes
              </button>
              <button
                onClick={() => finishOrExtendSession(session)}
                disabled={!allSessionItemsHandled}
                title={allSessionItemsHandled ? "Selesaikan sesi" : "Jawab atau lewati seluruh pertanyaan terlebih dahulu"}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition cursor-pointer shadow text-center"
              >
                {allSessionItemsHandled ? "Selesaikan Tes & Lihat Analisis →" : `Belum selesai (${handledCount}/${activeQuestions.length})`}
              </button>
            </div>
          </div>
        )}

        {/* DETAILED RESULTS DASHBOARD */}
        {currentPage === "result" && calculatedOutput && (
          <div className="space-y-12">
            
            {/* Dossier top badge */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1 rounded-full font-mono">
                <Target className="w-4 h-4 animate-spin-slow" />
                <span>INTERPRETASI MODEL A SELESAI</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">Daftar Hasil Personal</h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Silakan periksa pola metabolisme informasi kognitif harian Anda berbasis scoring Model A di bawah ini.
              </p>
            </div>

            {/* TOP 3 candidates layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main candidate display */}
              <div className="lg:col-span-2 p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
                
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Kandidat Tipe Utama (Most Likely match):</span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                    <span className="text-5xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
                      {calculatedOutput.top3[0].type}
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-medium text-emerald-400">
                      {TIM_MODELS[calculatedOutput.top3[0].type].name}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-slate-400">
                    {TIM_MODELS[calculatedOutput.top3[0].type].fullName} | Quadra {TIM_MODELS[calculatedOutput.top3[0].type].quadra} | {calculatedOutput.top3[0].fitScore}% Kecocokan Relatif
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {TIM_PROFILES[calculatedOutput.top3[0].type].description}
                  </p>
                </div>

                {/* Top 3 relative matching table bar chart */}
                <div className="space-y-3.5 border-t border-slate-800 pt-6">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">Kecocokan Relatif Top 3 Model Kandidat:</span>
                  <div className="space-y-2.5">
                    {calculatedOutput.top3.map((cand) => (
                      <div key={cand.type} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="font-bold text-slate-300">
                            {cand.type} ({TIM_MODELS[cand.type].name})
                          </span>
                          <span>{cand.fitScore}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${cand.fitScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence banner */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Tingkat Keyakinan Tes: <span className="text-emerald-400">{calculatedOutput.confidence.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{calculatedOutput.confidenceExplanation}</p>
                  </div>
                </div>
              </div>

              {/* CARD GENERATOR EXPORTER CONTROLLER */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider font-display">
                    <Download className="w-4 h-4" />
                    <span>Ekspor Kartu Identitas Tipologi</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sediakan nama panggilan Anda dan unggah foto opsional (semua diproses murni di browser Anda harian) untuk menghasilkan kartu infografis.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-mono font-bold">Nama Panggilan</label>
                    <input
                      type="text"
                      id="nickname-input-privacy"
                      name="random_tipologi_nickname_field"
                      autoComplete="off"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-white font-mono"
                      placeholder="Contoh: Pengembara atau Anda"
                      value={cardNickname}
                      onChange={(e) => setCardNickname(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-mono font-bold">Unggah Foto Mandiri:</label>
                    <div className="border border-dashed border-slate-800 rounded p-4 text-center cursor-pointer hover:border-slate-700 hover:bg-slate-900/45 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="cardFilePortrait"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="cardFilePortrait" className="cursor-pointer space-y-1 block">
                        <Upload className="w-5 h-5 mx-auto text-slate-500" />
                        <span className="block text-[10px] text-slate-400 font-mono mt-1">Cari File Gambar (.jpg/.png)</span>
                      </label>
                    </div>
                  </div>

                  {cardImage && (
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-emerald-400">Gambar Terbaca (Selesai)</span>
                      <button onClick={() => setCardImage(null)} className="text-[10px] text-rose-400 hover:underline">Hapus</button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownloadCard}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg text-sm transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Unduh Kartu PNG</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE MODEL A GRID */}
            <div className={`space-y-6 border-t pt-10 ${theme === "dark" ? "border-slate-900" : "border-slate-205"}`}>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Visualisasi Arsitektur Mental:</span>
                <h3 className={`text-2xl sm:text-3xl font-display font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Grid Interaktif Model A</h3>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>
                  Klik di masing-masing kotak fungsi posisi Model A untuk menampilkan keterlaksanaan energinya dalam diri Anda menurut hasil asesmen.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* 4x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "Base", index: 1, title: "1. Base / Leading" },
                    { key: "Creative", index: 2, title: "2. Creative" },
                    { key: "Role", index: 3, title: "3. Role / Peran" },
                    { key: "Vulnerable", index: 4, title: "4. Vulnerable / PoLR" },
                    { key: "Suggestive", index: 5, title: "5. Suggestive" },
                    { key: "Mobilizing", index: 6, title: "6. Mobilizing" },
                    { key: "Ignoring", index: 7, title: "7. Ignoring" },
                    { key: "Demonstrative", index: 8, title: "8. Demonstrative" }
                  ].map((pos) => {
                    const top1 = calculatedOutput.top3[0];
                    const el = TIM_MODELS[top1.type].positions[pos.key];
                    const isSelected = activeModelAPos === pos.key;

                    return (
                      <button
                        key={pos.key}
                        onClick={() => setActiveModelAPos(isSelected ? null : (pos.key as ModelAPosition))}
                        className={`p-4 rounded-xl border text-left transition relative select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                          isSelected
                            ? theme === "dark"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 font-medium"
                              : "bg-emerald-500/5 border-emerald-500 text-emerald-700 font-semibold shadow-sm"
                            : theme === "dark"
                              ? "border-slate-850 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-305 hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                          <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>{pos.title}</span>
                          <span className={isSelected ? (theme === "dark" ? "text-emerald-400 font-bold" : "text-emerald-600 font-bold") : "text-slate-605"}>Pos {pos.index}</span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight ${theme === "dark" ? "" : "text-slate-900"}`}>
                          {el} ({ELEMENTS_METADATA[el].name.split(" ")[0]})
                        </div>
                        <div className={`text-[10px] font-mono truncate mt-1 ${theme === "dark" ? "text-slate-500" : "text-slate-450"}`}>
                          {ELEMENTS_METADATA[el].name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Position detail reader card with conditional toggle */}
                {activeModelAPos ? (
                  <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/30 text-slate-100" : "border-slate-200 bg-white text-slate-800 shadow-sm"
                  }`}>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center border-b pb-3 ${theme === "dark" ? "border-slate-800" : "border-slate-150"}`}>
                        <div className="flex items-center space-x-2">
                          <Info className="w-4 h-4 text-emerald-500" />
                          <h4 className={`text-base font-bold font-display ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                            Rincian Posisi {activeModelAPos}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-705"
                          }`}>
                            Tipe utama {calculatedOutput.top3[0].type}
                          </span>
                          <button
                            onClick={() => setActiveModelAPos(null)}
                            className={`p-1 rounded-full transition cursor-pointer hover:bg-slate-800/80 ${
                              theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                            title="Sembunyikan Informasi"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className={`space-y-4 text-xs sm:text-sm leading-relaxed font-sans ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        {/* Detailed explanatory text built on real model dynamics */}
                        {activeModelAPos === "Base" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Arah Orientasi Utama:</strong> Element ini kuat dan sangat Anda hargai (Ego). Berfungsi sebagai motor spontan hidup pertama Anda dalam memproses semua data eksternal.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].orientasiBase}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Creative" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Alat Pendukung Utama:</strong> Berfungsi melengkapi dan mewujudkan target dari Base Anda. Sangat fleksibel, kreatif, serta adaptif harian.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].caraCreative}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Role" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Sosok Penyesuai Sosial:</strong> Berfungsi adaptasi sekunder saat bertatap muka di lingkungan formal yang belum akrab. Lemah dan menguras energi mental jika dituntut bekerja konstan lama.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].roleTampilan}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Vulnerable" && (
                          <div className="space-y-2">
                            <p>
                              <strong>PoLR (Point of Least Resistance):</strong> Titik kelemahan terdalam Anda yang tidak dihargai (Super-Ego). Kritik atau tekanan pada fungsi ini memicu rasa bingung, benci, lelah batin, defensif, atau aksi menyendiri.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs border ${
                              theme === "dark" ? "bg-rose-500/5 border-rose-500/15 text-rose-300" : "bg-rose-50/70 border-rose-200 text-rose-800"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].tuntutanPolr}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Suggestive" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Titik Receptor Kenyamanan:</strong> Sangat Anda hargai namun bernilai lemah (Super-Id). Datangnya informasi elemen ini dari orang tepercaya di hadapan Anda memulihkan ketenangan jiwa batin seketika harian.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs border ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-emerald-300/90" : "bg-emerald-50/70 border-emerald-200 text-emerald-850"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].bantuanSuggestive}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Mobilizing" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Gairah Pembuktian/Pujian:</strong> Ingin terus dikembangkan secara bertahap namun kinerjanya fluktuatif (Super-Id). Sanjungan atas kemajuan kecil pada fungsi ini mendatangkan kebahagiaan batin yang besar.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].areaMobilizing}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Ignoring" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Kompetensi Dikesampingkan:</strong> Kuat secara otomatis namun tidak dihargai (Id). Sebenarnya mampu Anda lakukan secara prima untuk memitigasi krisis harian, tetapi dijauhi / dihentikan secepatnya karena dinilai di luar esensi identitas.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].kompetensiIgnoring}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Demonstrative" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Latar Belakang Otomatis:</strong> Sangat kuat di bawah alam sadar Anda (Id). Beroperasi terus-menerus mengawal kelancaran aktivitas tanpa menuntut sanjungan atau pamer di panggung.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].kemampuanDemonstrative}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`text-xs font-mono text-right pt-4 border-t mt-4 ${
                      theme === "dark" ? "text-slate-500 border-slate-800" : "text-slate-400 border-slate-150"
                    }`}>
                      Asesmen didukung dynamic context tags.
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 rounded-2xl border flex flex-col items-center justify-center text-center space-y-3 ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/10 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-500 shadow-sm"
                  }`}>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1">
                      <Target className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="font-display font-semibold text-base">Detail Posisi Belum Dipilih</h4>
                    <p className="text-xs max-w-xs leading-relaxed">
                      Silakan klik salah satu kotak fungsi posisi Model A di sebelah kiri untuk membaca analisa dan peran kustom pengolahan informasi Anda secara rinci.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* MODEL COMPARISON FEATURE */}
            <div className={`space-y-6 border-t pt-10 ${theme === "dark" ? "border-slate-900" : "border-slate-205"}`}>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Analisis Korelasi Lanjutan:</span>
                <h3 className={`text-2xl sm:text-3xl font-display font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Bandingkan Dengan Tipe Lain</h3>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>
                  Pilih tipe sekunder untuk mengevaluasi perbedaan struktur pengolah informasinya (Model A) terhadap kandidat utama Anda.
                </p>
              </div>

              <div className="space-y-4 max-w-sm">
                <label className="block text-xs font-mono">Pilih Tipe Pembanding:</label>
                <select
                  value={compareTIM}
                  onChange={(e) => setCompareTIM(e.target.value as TIM)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-white text-semibold font-mono"
                >
                  <option value="">-- Pilih Tipe --</option>
                  {availableTIMs.filter((t) => t !== calculatedOutput.top3[0].type).map((t) => (
                    <option key={t} value={t}>{t} - {TIM_MODELS[t].name}</option>
                  ))}
                </select>
              </div>

              {compareTIM && (
                <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/10">
                  {/* Tipe Utama */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <span className="text-xs text-slate-500 font-mono">Tipe Utama Anda:</span>
                      <h4 className="text-xl font-bold font-display text-emerald-400">
                        {calculatedOutput.top3[0].type} ({TIM_MODELS[calculatedOutput.top3[0].type].name})
                      </h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div><strong>Orientasi Base:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].orientasiBase}</div>
                      <div><strong>Tuntutan PoLR / Kelemahan:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].tuntutanPolr}</div>
                      <div><strong>Sugesti Relief:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].bantuanSuggestive}</div>
                    </div>
                  </div>

                  {/* Tipe Pembanding */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <span className="text-xs text-slate-500 font-mono">Tipe Pembanding:</span>
                      <h4 className="text-xl font-bold font-display text-teal-400">
                        {compareTIM} ({TIM_MODELS[compareTIM].name})
                      </h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div><strong>Orientasi Base:</strong> {TIM_PROFILES[compareTIM].orientasiBase}</div>
                      <div><strong>Tuntutan PoLR / Kelemahan:</strong> {TIM_PROFILES[compareTIM].tuntutanPolr}</div>
                      <div><strong>Sugesti Relief:</strong> {TIM_PROFILES[compareTIM].bantuanSuggestive}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DYNAMIC INTERTYPE RELATIONS CALCULATOR */}
            <div className="space-y-6 border-t border-slate-900 pt-10">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Evaluasi Dinamika Komunikasi:</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Analisis Hubungan Antar-Tipe</h3>
                <p className="text-xs text-slate-400">
                  Hitung jenis dinamika interaksi informasi Model A antara tipe utama Anda dengan salah satu dari 15 tipe lainnya.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="space-y-4">
                  <label className="block text-xs font-mono">Pilih Tipe Mitra:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTIMs.map((t) => {
                      const isActive = intertypeTarget === t;
                      const relCode = INTERTYPE_MAP[calculatedOutput.top3[0].type][t];
                      return (
                        <button
                          key={t}
                          onClick={() => setIntertypeTarget(t)}
                          className={`py-2 rounded font-mono text-xs border uppercase font-bold transition ${
                            isActive
                              ? "bg-emerald-500 text-slate-950 border-emerald-500"
                              : "border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-850"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calculation breakdown result */}
                <div className="md:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4">
                  {(() => {
                    const self = calculatedOutput.top3[0].type;
                    const relCode = INTERTYPE_MAP[self][intertypeTarget];
                    const relMeta = INTERTYPE_RELATIONS_METADATA[relCode] || { name: relCode, description: "", impact: "" };

                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
                          <h4 className="text-lg font-bold font-display text-white">
                            Interaksi: <span className="text-emerald-400">{relMeta.name}</span>
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {self} bertemu {intertypeTarget}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-mono italic">
                          {relMeta.description}
                        </p>
                        <hr className="border-slate-800/80" />
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Dampak Aliran Metabolisme Informasi:</div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                            {relMeta.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* RE-TEST BOX */}
            <div className="p-8 rounded-2xl border border-slate-900 bg-slate-900/20 text-center space-y-4 pt-10 border-t">
              <h4 className="font-display font-bold text-xl">Ulangi Tes Model A?</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Sesi tes sebelumnya akan dihapus dari peranti lokal Anda secara permanen. Mode tes, skor jawaban baru, dan holdouts verification akan diacak ulang.
              </p>
              <button
                onClick={() => {
                  if (window.confirm("Ingin menghapus data dan mengulang tes dari awal?")) {
                    resetSession();
                    setCurrentPage("landing");
                  }
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold px-6 py-2 rounded-lg text-sm transition"
              >
                Mulai Ulang Tes
              </button>
            </div>
          </div>
        )}

        {/* METHODOLOGY DESCRIPTION BLOCK */}
        {currentPage === "method" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Arsitektur Interpretasi Model A</h2>
              <p className="text-sm text-slate-400">
                Dokumentasi teoretis scoring engine dari aplikasi Socionics Dalam Diriku.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">1. Matriks 64 Kanal</h3>
                <p>
                  Asesmen ini mengumpulkan bukti dari 8 Information Elements melalui 8 kanal: Producer, Flexible, Mask, Threat, Receiver, Aspiration, Dismissive, dan Background. Kombinasi tersebut membentuk 64 sel yang dibandingkan dengan pola posisi Model A. Ini adalah model interpretatif berbasis teori, bukan pengukuran klinis objektif.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">2. Signed Position Fit</h3>
                <p>
                  Pilihan 1–5 dipetakan ke rentang -1 sampai +1 sehingga arah dan kekuatan jawaban tetap terlihat. Setiap elemen dibandingkan dengan signed theory prior delapan posisi Model A menggunakan weighted RMSE. Prior ini adalah hipotesis desain yang dapat dikalibrasi ulang setelah data pilot tersedia.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">3. Perbandingan 16 Model Kandidat</h3>
                <p>
                  Enam belas TIM dievaluasi sebagai enam belas susunan lengkap posisi Model A. Skor yang ditampilkan adalah indeks kemiripan terhadap prior teori, dengan kontribusi kecil dari koherensi quadra, holdout, dan item pembeda yang relevan. Angka tersebut tidak disebut posterior atau probabilitas ilmiah sebelum model dikalibrasi menggunakan data nyata.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-center border border-slate-800 text-slate-300">
                  Fit(TIM) = mean(position similarity) + limited supporting evidence
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">4. Holdout Silang & Penilai Person-Fit</h3>
                <p>
                  Item holdout tidak membentuk profil core dan dipakai sebagai pemeriksaan prediksi tambahan. Konsistensi dihitung dari replikasi yang sengaja menarget sel yang sama di konteks berbeda. Confidence merangkum cakupan, jarak kandidat, holdout, dan pola respons; ia bukan koefisien reliabilitas empiris.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* REFERENCES & CITATIONS PAGE */}
        {currentPage === "references" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Tinjauan Rujukan Kajian</h2>
              <p className="text-sm text-slate-400">
                Parafrase kutipan, atribusi, dan landasan intelektual Socionics Model A.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Carl Gustav Jung - Psychological Types (1921)</h4>
                <p className="text-xs text-slate-400">
                  Peletak batu pertama dari konsep pembagian tipe metabolisme mental utama lewat pilar dimensi rasional-irasional dan ekstratimid-introtimid, yang kelak direstrukturisasi ke dalam Socionics.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Aušra Augustinavičiūtė - Model A & Wikisocion Traditional Compliations</h4>
                <p className="text-xs text-slate-400">
                  Lembaga pendiri sosiologis asal Lithuania yang meletakkan pola 8 posisi fungsi mental (Ego, Super-ego, Super-id, Id) dan memilah relasi dinamika metabolisme informasi (Intertype Relations).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Antoni Kępiński - Information Metabolism Theory</h4>
                <p className="text-xs text-slate-400">
                  Mengembangkan kerangka psikiatri bahwa jiwa manusia mengonsumsi informasi eksternal dengan cara metabolik layaknya lambung mengonsumsi kalori fisik, menjadi basis analogi Socionics.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Kajian Akademik Karol Pietrak</h4>
                <p className="text-xs text-slate-400">
                  Menelaah penggunaan Socionics sebagai kerangka pendidikan dan refleksi, tanpa mengklaim validasi klinis atau reliabilitas empiris yang belum diuji.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* EMBEDDED REAL-TIME AUDIT SUITE */}
        {currentPage === "audit" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Konsol Audit Integritas Instrumen</h2>
              <p className="text-sm text-slate-400">
                Pemeriksaan struktural otomatis terhadap duplikasi, cakupan 64 sel, canonical tie-break, dan sampling lintas seed. Ini bukan bukti reliabilitas empiris.
              </p>
            </div>

            {/* Test result banner from metadata checklist */}
            <div className={`p-5 rounded-xl border ${auditReport.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}>
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 animate-pulse" />
                <div>
                  <h3 className="font-bold text-lg">
                    {auditReport.success ? "AUDIT STRUKTURAL LULUS" : "MASALAH STRUKTURAL DITEMUKAN"}
                  </h3>
                  <p className="text-xs text-slate-400">{auditReport.errors.length} error dan {auditReport.warnings.length} peringatan ditemukan pada pemeriksaan otomatis.</p>
                </div>
              </div>
            </div>

            {/* Coverage statistics table */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Jumlah Pertanyaan Sesi:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.totalItems} ITEM</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">{auditReport.metrics.coreItems} Core | {auditReport.metrics.holdoutItems} Holdout | {auditReport.metrics.tieBreakItems} Adaptive tie-break</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Keseimbangan Kognitif:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.completeCoreCells} / 64 SEL</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">Masing-masing sel memiliki tiga core item independen.</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Penyebaran Konteks Kegiatan:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.simulatedSessions} SEED</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">Ringkas, standar, dan mendalam diuji agar selalu mencakup 64/64 sel.</p>
              </div>
            </div>

            {auditReport.warnings.length > 0 && (
              <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Peringatan yang Perlu Ditinjau:</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-amber-200 space-y-1.5 font-mono">
                  {auditReport.warnings.map((warning, index) => <li key={index}>{warning}</li>)}
                </ul>
              </div>
            )}

            {/* Error logs */}
            {auditReport.errors.length > 0 && (
              <div className="p-6 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-4">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Daftar Pelanggaran Konsistensi:</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-rose-300 space-y-1.5 font-mono">
                  {auditReport.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-20 no-print text-center text-xs ${theme === "dark" ? "bg-slate-900/50 border-slate-900 text-slate-500" : "bg-white border-slate-200 text-slate-400"}`}>
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Socionics Dalam Diriku. Hak cipta dilindungi undang-undang.</p>
          <p>Scored locally on device client-side. No cookie session telemetry trackers deployed.</p>
        </div>
      </footer>
    </div>
  );
}
````

---

## `src/audit/instrumentAudit.ts`

````ts
import type { InformationElement, MeasurementChannel, SocionicsQuestion } from "../types/socionics";
import { ALL_QUESTIONS, getCoreQuestions, getHoldoutQuestions, getTieBreakQuestions } from "../data/questions";
import { canonicalPair } from "../data/tieBreakQuestions";
import { selectQuestionsForMode } from "../hooks/useTestSession";

const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const CHANNELS: MeasurementChannel[] = ["producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"];

export interface InstrumentAuditReport {
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalItems: number;
    coreItems: number;
    holdoutItems: number;
    tieBreakItems: number;
    completeCoreCells: number;
    uniqueStatements: number;
    contexts: number;
    simulatedSessions: number;
  };
}

const normalize = (value: string): string => value
  .toLocaleLowerCase("id-ID")
  .replace(/[^a-z0-9\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const SIMILARITY_STOPWORDS = new Set([
  "saya", "aku", "yang", "dan", "dengan", "untuk", "dari", "pada", "dalam",
  "saat", "ketika", "kalau", "lebih", "bisa", "tidak", "agar", "atau", "setelah",
  "sebuah", "orang", "biasanya", "terasa", "langsung", "mulai", "tetap", "tanpa",
]);

function contentTokens(value: string): Set<string> {
  return new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length > 2 && !SIMILARITY_STOPWORDS.has(token)),
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  const union = new Set([...left, ...right]);
  if (union.size === 0) return 0;
  let overlap = 0;
  for (const token of left) if (right.has(token)) overlap += 1;
  return overlap / union.size;
}

function cellCoverage(questions: SocionicsQuestion[]): Set<string> {
  return new Set(questions.filter((question) => !question.isTieBreak).map((question) => `${question.element}_${question.channel}`));
}

export function runInstrumentAudit(simulatedSessions = 200): InstrumentAuditReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const core = getCoreQuestions();
  const holdout = getHoldoutQuestions();
  const tieBreak = getTieBreakQuestions();

  const ids = new Set<string>();
  const normalizedStatements = new Map<string, string[]>();
  for (const question of ALL_QUESTIONS) {
    if (ids.has(question.id)) errors.push(`ID duplikat: ${question.id}`);
    ids.add(question.id);
    const key = normalize(question.statement);
    const list = normalizedStatements.get(key) ?? [];
    list.push(question.id);
    normalizedStatements.set(key, list);
    if (!question.responseFocus.trim()) errors.push(`responseFocus kosong: ${question.id}`);
  }

  for (const [statement, questionIds] of normalizedStatements.entries()) {
    if (questionIds.length > 1) errors.push(`Pernyataan identik pada ${questionIds.join(", ")}: ${statement.slice(0, 70)}`);
  }

  // Lexical near-duplicate gate. This is intentionally conservative: it catches
  // sentence factories while avoiding false positives from normal Socionics vocabulary.
  const semanticItems = ALL_QUESTIONS.filter((question) => !question.isTieBreak);
  const tokenCache = new Map(semanticItems.map((question) => [question.id, contentTokens(question.statement)]));
  for (let leftIndex = 0; leftIndex < semanticItems.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < semanticItems.length; rightIndex += 1) {
      const left = semanticItems[leftIndex];
      const right = semanticItems[rightIndex];
      const similarity = jaccard(tokenCache.get(left.id)!, tokenCache.get(right.id)!);
      if (similarity >= 0.68) {
        errors.push(`Kemiripan leksikal terlalu tinggi (${similarity.toFixed(2)}): ${left.id} dan ${right.id}.`);
      } else if (similarity >= 0.55) {
        warnings.push(`Periksa kemiripan leksikal (${similarity.toFixed(2)}): ${left.id} dan ${right.id}.`);
      }
    }
  }

  let completeCoreCells = 0;
  for (const element of ELEMENTS) {
    for (const channel of CHANNELS) {
      const items = core.filter((question) => question.element === element && question.channel === channel);
      if (items.length !== 3) errors.push(`Sel ${element}_${channel} memiliki ${items.length} core item; wajib 3.`);
      else completeCoreCells += 1;
      if (new Set(items.map((question) => question.context)).size < 3) {
        warnings.push(`Sel ${element}_${channel} belum memakai tiga konteks berbeda.`);
      }
    }
    const elementHoldouts = holdout.filter((question) => question.element === element);
    if (elementHoldouts.length !== 4) errors.push(`${element} memiliki ${elementHoldouts.length} holdout; wajib 4.`);
  }

  const pairCounts = new Map<string, number>();
  for (const question of tieBreak) {
    const tag = question.tieBreakTags?.[0];
    const supported = Object.keys(question.tieBreakSupport ?? {});
    if (!tag || supported.length !== 2) {
      errors.push(`Tie-break ${question.id} tidak memiliki tag atau dua kandidat dukungan.`);
      continue;
    }
    if (canonicalPair(supported[0] as never, supported[1] as never) !== tag) {
      errors.push(`Tag tie-break tidak canonical: ${question.id} -> ${tag}`);
    }
    pairCounts.set(tag, (pairCounts.get(tag) ?? 0) + 1);
  }
  for (const [pair, count] of pairCounts.entries()) {
    if (count !== 2) errors.push(`Pasangan ${pair} memiliki ${count} tie-break; wajib 2.`);
  }
  if (pairCounts.size !== 16) errors.push(`Jumlah pasangan tie-break ${pairCounts.size}; wajib 16.`);

  // Repeated opening audit catches templated sentence factories without rejecting
  // normal Indonesian openings such as "Saya" by using the first four words.
  const openings = new Map<string, string[]>();
  for (const question of core) {
    const opening = normalize(question.statement).split(" ").slice(0, 4).join(" ");
    const list = openings.get(opening) ?? [];
    list.push(question.id);
    openings.set(opening, list);
  }
  for (const [opening, questionIds] of openings.entries()) {
    if (questionIds.length > 12) warnings.push(`Pembuka "${opening}" dipakai ${questionIds.length} kali.`);
  }

  for (let seed = 1; seed <= simulatedSessions; seed += 1) {
    for (const mode of ["ringkas", "standar", "mendalam"] as const) {
      const selection = selectQuestionsForMode(mode, seed);
      const expectedCount = mode === "ringkas" ? 80 : mode === "standar" ? 128 : 224;
      if (selection.length !== expectedCount) {
        errors.push(`Seed ${seed} mode ${mode}: ${selection.length} item, seharusnya ${expectedCount}.`);
        break;
      }
      const coverage = cellCoverage(selection);
      if (coverage.size !== 64) {
        errors.push(`Seed ${seed} mode ${mode}: cakupan hanya ${coverage.size}/64 sel.`);
        break;
      }
    }
    if (errors.length > 20) break;
  }

  if (core.length !== 192) errors.push(`Core item ${core.length}; wajib 192.`);
  if (holdout.length !== 32) errors.push(`Holdout item ${holdout.length}; wajib 32.`);
  if (tieBreak.length !== 32) errors.push(`Tie-break item ${tieBreak.length}; wajib 32.`);

  return {
    success: errors.length === 0,
    errors,
    warnings,
    metrics: {
      totalItems: ALL_QUESTIONS.length,
      coreItems: core.length,
      holdoutItems: holdout.length,
      tieBreakItems: tieBreak.length,
      completeCoreCells,
      uniqueStatements: normalizedStatements.size,
      contexts: new Set(ALL_QUESTIONS.map((question) => question.context)).size,
      simulatedSessions,
    },
  };
}
````

---

## `src/constants/socionicsData.ts`

````ts
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIM, TIMModel, TIMProfile, InformationElement, Quadra, Club, Temperament } from "../types/socionics";

export const ELEMENTS_METADATA: Record<InformationElement, { name: string; symbol: string; description: string; coreConcept: string }> = {
  Ne: {
    name: "Extraverted Intuition",
    symbol: "Ne",
    description: "Visi peluang, potensi tersembunyi, alternatif gagasan, gagasan inventif, dan esensi laten dari suatu hal.",
    coreConcept: "Mengeksplorasi kemungkinan baru dan melihat apa yang bisa dikembangkan secara kreatif."
  },
  Ni: {
    name: "Introverted Intuition",
    symbol: "Ni",
    description: "Tren historis, perubahan waktu, firasat batin, visi masa depan, sinkronitas peristiwa, dan konsekuensi jangka panjang.",
    coreConcept: "Membayangkan bagaimana peristiwa berkembang seiring berjalannya waktu dan menangkap makna tersembunyi."
  },
  Se: {
    name: "Extraverted Sensing",
    symbol: "Se",
    description: "Kehendak, kekuasaan fisik, wilayah kekuasaan, batas taktis, mobilisasi aksi langsung, pengaruh, dan estetika eksternal.",
    coreConcept: "Menguasai atau menaklukkan ruang fisik secara energetik dan melatih kepemimpinan direktif."
  },
  Si: {
    name: "Introverted Sensing",
    symbol: "Si",
    description: "Kenyamanan fisik, keadaan jasmani, kesehatan, keharmonisan estetika lingkungan sekitar, dan relaksasi internal.",
    coreConcept: "Menjaga keseimbangan kenyamanan internal, kebersihan, dan sensasi fisik yang damai."
  },
  Te: {
    name: "Extraverted Logic (Thinking)",
    symbol: "Te",
    description: "Efisiensi praktis, logika utilitas, fakta empiris, pengoptimalan proses kerja, dan alokasi sumber daya finansial/alat.",
    coreConcept: "Meningkatkan produktivitas kerja dan mengambil tindakan berdasarkan data realitas yang objektif."
  },
  Ti: {
    name: "Introverted Logic (Thinking)",
    symbol: "Ti",
    description: "Konsistensi teori, klasifikasi logis, bagan sistematis, keteraturan hukum, analisis terstruktur, dan pembuktian prinsip.",
    coreConcept: "Membangun keteraturan logis, struktur teoretis, dan mematuhi definisi konsep secara murni."
  },
  Fe: {
    name: "Extraverted Ethics (Feeling)",
    symbol: "Fe",
    description: "Ekspresi emosional, atmosfer kelompok, gelora perasaan, keterlibatan sosial, dan memengaruhi emosi audiens.",
    coreConcept: "Mengekspresikan gairah emosional dan menjaga orkestrasi getaran emosi sosial."
  },
  Fi: {
    name: "Introverted Ethics (Feeling)",
    symbol: "Fi",
    description: "Ikatan moral batin, hubungan kedekatan interpersonal, rasa suka/benci personal, ketulusan hati, kesetiaan, dan jarak psikologis.",
    coreConcept: "Menjaga keontentikan hubungan batin antar-manusia dan memegang prinsip etis pribadi."
  }
};

export const QUADRA_DATA: Record<Quadra, { name: string; valuedElements: InformationElement[]; atmosphere: string; description: string }> = {
  Alpha: {
    name: "Alpha",
    valuedElements: ["Ne", "Ti", "Fe", "Si"],
    atmosphere: "Demokratis-Kolektif, Santai, Menghargai Ide Baru dan Kenyamanan bersama.",
    description: "Quadra Alpha berfokus pada eksplorasi gagasan demi kesenangan intelektual (Ne, Ti) dipadukan dengan kesenangan bersosialisasi yang hangat dan kenyamanan fisik (Fe, Si). Menghindari ketegangan kekuasaan atau ambisi materialistis."
  },
  Beta: {
    name: "Beta",
    valuedElements: ["Se", "Ti", "Fe", "Ni"],
    atmosphere: "Aristokratis-Kolektif, Bergelora, Terstruktur, Berorientasi pada Visi Bersama.",
    description: "Quadra Beta memadukan kehendak aksi taktis (Se, Ti) demi mewujudkan visi atau makna historis yang agung (Ni), didorong oleh orkestrasi emosional kelompok yang kuat (Fe). Menghargai hierarki, kepemimpinan, kompetisi, dan loyalitas kelompok."
  },
  Gamma: {
    name: "Gamma",
    valuedElements: ["Se", "Fi", "Te", "Ni"],
    atmosphere: "Demokratis-Individualis, Kompetitif, Pragmatis, Fokus pada Hubungan Setia.",
    description: "Quadra Gamma berfokus pada aksi bisnis pragmatis (Te) dan kehendak tekad mandiri (Se) dipadukan dengan kesetiaan batin interpersonal yang kuat (Fi) serta kalkulasi risiko jangka panjang (Ni). Menghargai kemandirian ekonomi dan kompetensi nyata."
  },
  Delta: {
    name: "Delta",
    atmosphere: "Aristokratis-Individualis, Tenang, Produktif, Peduli Pengembangan Manusia.",
    valuedElements: ["Ne", "Fi", "Te", "Si"],
    description: "Quadra Delta menyeimbangkan produktivitas kerja berkualitas tinggi (Te) dengan pemenuhan kenyamanan dan estetika hidup sehari-hari (Si), serta pengembangan potensi unik individu (Ne) dalam ikatan relasi tulus yang mendalam (Fi). Menghindari drama emosional ekstrem."
  }
};

export const TIM_MODELS: Record<TIM, TIMModel> = {
  ILE: { type: "ILE", name: "Don Quixote", fullName: "Intuitive Logical Extratim", quadra: "Alpha", club: "Researchers", temperament: "EP", dual: "SEI", positions: { Base: "Ne", Creative: "Ti", Role: "Se", Vulnerable: "Fi", Suggestive: "Si", Mobilizing: "Fe", Ignoring: "Ni", Demonstrative: "Te" } },
  SEI: { type: "SEI", name: "Dumas", fullName: "Sensory Ethical Introtim", quadra: "Alpha", club: "Socials", temperament: "IP", dual: "ILE", positions: { Base: "Si", Creative: "Fe", Role: "Ni", Vulnerable: "Te", Suggestive: "Ne", Mobilizing: "Ti", Ignoring: "Se", Demonstrative: "Fi" } },
  ESE: { type: "ESE", name: "Hugo", fullName: "Ethical Sensory Extratim", quadra: "Alpha", club: "Socials", temperament: "EJ", dual: "LII", positions: { Base: "Fe", Creative: "Si", Role: "Te", Vulnerable: "Ni", Suggestive: "Ti", Mobilizing: "Ne", Ignoring: "Fi", Demonstrative: "Se" } },
  LII: { type: "LII", name: "Robespierre", fullName: "Logical Intuitive Introtim", quadra: "Alpha", club: "Researchers", temperament: "IJ", dual: "ESE", positions: { Base: "Ti", Creative: "Ne", Role: "Fi", Vulnerable: "Se", Suggestive: "Fe", Mobilizing: "Si", Ignoring: "Te", Demonstrative: "Ni" } },
  
  SLE: { type: "SLE", name: "Zhukov", fullName: "Sensory Logical Extratim", quadra: "Beta", club: "Pragmatists", temperament: "EP", dual: "IEI", positions: { Base: "Se", Creative: "Ti", Role: "Ne", Vulnerable: "Fi", Suggestive: "Ni", Mobilizing: "Fe", Ignoring: "Si", Demonstrative: "Te" } },
  IEI: { type: "IEI", name: "Yesenin", fullName: "Intuitive Ethical Introtim", quadra: "Beta", club: "Humanitarians", temperament: "IP", dual: "SLE", positions: { Base: "Ni", Creative: "Fe", Role: "Si", Vulnerable: "Te", Suggestive: "Se", Mobilizing: "Ti", Ignoring: "Ne", Demonstrative: "Fi" } },
  EIE: { type: "EIE", name: "Hamlet", fullName: "Ethical Intuitive Extratim", quadra: "Beta", club: "Humanitarians", temperament: "EJ", dual: "LSI", positions: { Base: "Fe", Creative: "Ni", Role: "Te", Vulnerable: "Si", Suggestive: "Ti", Mobilizing: "Se", Ignoring: "Fi", Demonstrative: "Ne" } },
  LSI: { type: "LSI", name: "Maxim Gorky", fullName: "Logical Sensory Introtim", quadra: "Beta", club: "Pragmatists", temperament: "IJ", dual: "EIE", positions: { Base: "Ti", Creative: "Se", Role: "Fi", Vulnerable: "Ne", Suggestive: "Fe", Mobilizing: "Ni", Ignoring: "Te", Demonstrative: "Si" } },
  
  SEE: { type: "SEE", name: "Napoleon", fullName: "Sensory Ethical Extratim", quadra: "Gamma", club: "Socials", temperament: "EP", dual: "ILI", positions: { Base: "Se", Creative: "Fi", Role: "Ne", Vulnerable: "Ti", Suggestive: "Ni", Mobilizing: "Te", Ignoring: "Si", Demonstrative: "Fe" } },
  ILI: { type: "ILI", name: "Balzac", fullName: "Intuitive Logical Introtim", quadra: "Gamma", club: "Researchers", temperament: "IP", dual: "SEE", positions: { Base: "Ni", Creative: "Te", Role: "Si", Vulnerable: "Fe", Suggestive: "Se", Mobilizing: "Fi", Ignoring: "Ne", Demonstrative: "Ti" } },
  LIE: { type: "LIE", name: "Jack London", fullName: "Logical Intuitive Extratim", quadra: "Gamma", club: "Researchers", temperament: "EJ", dual: "ESI", positions: { Base: "Te", Creative: "Ni", Role: "Fe", Vulnerable: "Si", Suggestive: "Fi", Mobilizing: "Se", Ignoring: "Ti", Demonstrative: "Ne" } },
  ESI: { type: "ESI", name: "Dreiser", fullName: "Ethical Sensory Introtim", quadra: "Gamma", club: "Socials", temperament: "IJ", dual: "LIE", positions: { Base: "Fi", Creative: "Se", Role: "Ti", Vulnerable: "Ne", Suggestive: "Te", Mobilizing: "Ni", Ignoring: "Fe", Demonstrative: "Si" } },
  
  IEE: { type: "IEE", name: "Huxley", fullName: "Intuitive Ethical Extratim", quadra: "Delta", club: "Humanitarians", temperament: "EP", dual: "SLI", positions: { Base: "Ne", Creative: "Fi", Role: "Se", Vulnerable: "Ti", Suggestive: "Si", Mobilizing: "Te", Ignoring: "Ni", Demonstrative: "Fe" } },
  SLI: { type: "SLI", name: "Gabin", fullName: "Sensory Logical Introtim", quadra: "Delta", club: "Pragmatists", temperament: "IP", dual: "IEE", positions: { Base: "Si", Creative: "Te", Role: "Ni", Vulnerable: "Fe", Suggestive: "Ne", Mobilizing: "Fi", Ignoring: "Se", Demonstrative: "Ti" } },
  LSE: { type: "LSE", name: "Sherlock Holmes", fullName: "Logical Sensory Extratim", quadra: "Delta", club: "Pragmatists", temperament: "EJ", dual: "EII", positions: { Base: "Te", Creative: "Si", Role: "Fe", Vulnerable: "Ni", Suggestive: "Fi", Mobilizing: "Ne", Ignoring: "Ti", Demonstrative: "Se" } },
  EII: { type: "EII", name: "Dostoevsky", fullName: "Ethical Intuitive Introtim", quadra: "Delta", club: "Humanitarians", temperament: "IJ", dual: "LSE", positions: { Base: "Fi", Creative: "Ne", Role: "Ti", Vulnerable: "Se", Suggestive: "Te", Mobilizing: "Si", Ignoring: "Fe", Demonstrative: "Ni" } }
};

export const TIM_PROFILES: Record<TIM, TIMProfile> = {
  ILE: {
    type: "ILE",
    description: "Pendobrak sekat konseptual yang selalu mencari kemungkinan baru. Anda melihat dunia sebagai anyaman rahasia yang menunggu diuraikan lewat teori terstruktur. Anda senang menyatukan berbagai bidang ilmiah yang tampak tidak berhubungan menjadi gagasan baru.",
    orientasiBase: "Menangkap potensi tersembunyi, inovasi gagasan murni, dan hubungan spekulatif tanpa batas.",
    caraCreative: "Membangun penjelasan teoretis, diagram, dan keteraturan logis untuk mewujudkan alternatif baru.",
    roleTampilan: "Berusaha terlihat tegas dan siap beraksi taktis saat ditekan, namun menguras tenaga bila berkepanjangan.",
    tuntutanPolr: "Sangat tidak nyaman dengan keharusan menilai kesetiaan moral batin seseorang atau mengurus gosip emosional personal.",
    bantuanSuggestive: "Relief luar biasa didapat saat lingkungan sekitar merawat kenyamanan tubuh, memberi hidangan lezat, dan suasana rileks tanpa tuntutan.",
    areaMobilizing: "Sangat bersemangat menghidupkan keceriaan sosial, mendambakan dipuji karena mampu meramaikan suasana kelompok.",
    kompetensiIgnoring: "Sangat memahami visi masa depan yang abstrak atau ramalan tren, tetapi cenderung mengabaikannya karena lebih menyukai pilihan aktif yang ada di hadapan.",
    kemampuanDemonstrative: "Secara otomatis membagikan trik efisiensi praktis, merancang perbaikan alat bertenaga tinggi, tetapi enggan menyombongkannya.",
    polaSeimbang: "Aktif membangun teori, ramah mengobrol, sehat merawat tubuh secara berkala bersama lingkar dekatnya.",
    polaTertekan: "Menjadi defensif secara fisik, terobsesi dengan aturan formal yang kaku, atau merasa ditinggalkan secara emosional oleh kawan dekat.",
    gayaBelajar: "Eksploratif, menyukai pembelajaran konseptual tanpa sekat, membuat mind-map yang rumit.",
    gayaKerja: "Visioner, perancang sistem awal, pembongkar kemacetan ide lewat brainstorming tanpa batas.",
    gayaKomunikasi: "Argumentatif namun santai, dipenuhi kiasan analogi tak terduga, cepat berpindah topik.",
    kebutuhanKelompok: "Sebagai katalis ide-ide murni dan penyusun model teoritis awal yang fleksibel.",
    batasPerhatian: "Terlalu cepat bosan pada detail rutin dan cenderung mengabaikan keutuhan relasi emosional batin.",
    CommonMistypes: ["ENTP (MBTI)", "IEE (Socionics - akibat kemiripan sifat kreatif)", "LII (akibat fokus teori yang kuat)"],
    refleksi: "Apakah dorongan mengeksplorasi ide baru kadang menjauhkanmu dari memperhatikan kebutuhan tubuh sendiri dan perasaan orang-orang tercinta?",
    buktiMenyangkal: "Jika Anda ternyata sangat teliti menjaga detail kenyamanan fisik sehari-hari tanpa bantuan eksternal dan sangat sensitif terhadap keretakan relasi batin kawan dekat secara konstan, mungkin Anda tipe lain."
  },
  SEI: {
    type: "SEI",
    description: "Pemelihara keharmonisan indrawi dan kehangatan emosi. Anda bergerak di dunia berdasarkan kenyamanan lingkungan, merespons kebutuhan fisik secara rileks, dan mahir mencairkan suasana canggung melalui gurauan ringan bin lembut.",
    orientasiBase: "Sensasi kenyamanan indrawi, kesehatan fisik, detail estetika yang asri, dan kehidupan yang tenang.",
    caraCreative: "Menciptakan suasana sosial yang hangat, mengekspresikan keramahan emosi secara langsung untuk menyatukan orang.",
    roleTampilan: "Mempresentasikan diri sebagai orang yang visioner dan terencana di hadapan publik, padahal batinnya lebih suka mengikuti aliran momen.",
    tuntutanPolr: "Mengalami stres tinggi bila dipaksa bekerja di lingkungan berantakan dengan perdebatan efisiensi bisnis kering tanpa kehangatan.",
    bantuanSuggestive: "Sangat berterima kasih ketika ada orang lain yang datang membawa teori-teori baru yang jenius murni tanpa mengharapkan ia merancang teori itu.",
    areaMobilizing: "Ingin membuktikan diri mampu berpikir secara terstruktur dan logis, sangat menikmati pujian atas analisisnya.",
    kompetensiIgnoring: "Mampu menegaskan otoritas diri saat didesak, namun buru-buru meredakannya karena mengganggu kedamaian.",
    kemampuanDemonstrative: "Secara alami membaca nuansa emosi orang lain dan menjaga kedamaian batin dalam ikatan persahabatan sejati di balik layar.",
    polaSeimbang: "Mampu menyalurkan kreativitas seni, menjaga kepuasan pangan, teratur menyusun logika hidup yang jernih.",
    polaTertekan: "Mengisolasi diri secara fisik, menjadi terlalu sensitif terhadap ancaman dari luar, atau memaksakan keceriaan palsu yang melelahkan.",
    gayaBelajar: "Praktis bernuansa indrawi, menyukai contoh nyata yang nyaman dipahami, dibantu visual yang indah.",
    gayaKerja: "Menciptakan lingkungan kerja yang ramah emosi, kolaborator andal yang menjaga kebahagiaan tim pelaksana.",
    gayaKomunikasi: "Hangat, santun, penuh candaan bersahabat, menghindari konfrontasi langsung.",
    kebutuhanKelompok: "Sebagai perekat sosial yang merawat kenyamanan fisik dan kebersamaan kelompok secara nyata.",
    batasPerhatian: "Sering menunda-nunda keputusan penting karena enggan melangkah keluar dari situasi nyaman.",
    CommonMistypes: ["ISFP (MBTI)", "ESE (Socionics - akibat dorongan bersosialisasi hangat)", "IEI (akibat kemiripan sifat damai)"],
    refleksi: "Apakah keengganan berkonfrontasi membuatmu memendam banyak kekesalan fisik dan emosional hingga meracuni batinmu sendiri?",
    buktiMenyangkal: "Jika Anda terbukti sangat menyukai perdebatan konseptual abstrak yang rumit secara tiada henti dan mengabaikan tidur/pola makan dengan mudah demi produktivitas bisnis yang keras, Anda bukan SEI."
  },
  ESE: {
    type: "ESE",
    description: "Orkestrator kegembiraan sosial yang energetik. Anda memiliki radar tajam untuk membaca 'getaran emosi' ruangan dan dengan sigap menggelontorkan aksi kepedulian fisik bagi kenyamanan orang-orang di sekitar.",
    orientasiBase: "Mengekspresikan gairah emosional, menyebarkan kegembiraan, mendeteksi kelusuan atmosfer kelompok untuk diperbaiki.",
    caraCreative: "Menata estetika fisik, menyediakan makanan, kesehatan, dan keindahan detail ruang sekitar demi kebahagiaan sesama.",
    roleTampilan: "Berusaha tampil sangat produktif, logis, dan profesional secara administratif di tempat kerja ilmiah.",
    tuntutanPolr: "Sangat panik jika dihadapkan pada ketidakpastian waktu, keterlambatan kronis, atau tuntutan memetakan tren visioner abstrak.",
    bantuanSuggestive: "Lega sekali jika ada pasangan yang membantunya merapikan definisi konseptual, sistem administrasi, dan konsistensi hukum objektif.",
    areaMobilizing: "Sangat menyukai petualangan menemukan ide-ide baru, menggemari diskusi kemungkinan kreatif demi dinilai berpengetahuan luas.",
    kompetensiIgnoring: "Punya kepatuhan etis interpersonal yang kuat, namun emosi sponannya yang menyala di luar sering menutupi jarak psikologis yang murni.",
    kemampuanDemonstrative: "Secara bawah sadar lihai mengamankan perlindungan fisik dan menunjukkan tekad kepemimpinan taktis di saat krisis melanda kelompok.",
    polaSeimbang: "Teratur mengelola waktu dengan bantuan perencana, aktif membina relasi hangat, dan menjaga struktur administrasi rumah tangga.",
    polaTertekan: "Menjadi sangat cemas tentang masa depan, menuduh orang lain tidak menghargai pengorbanan emosinya, serta bertindak terburu-buru yang merusak fisik.",
    gayaBelajar: "Interaktif, menyukai demonstrasi langsung dengan dinamika vokal yang berenergi dan diskusi kelompok.",
    gayaKerja: "Penyelenggara acara utama, komunikator tim yang energik, memastikan semua orang terurus kebutuhannya.",
    gayaKomunikasi: "Ekspresif, bermelodi, menggunakan bahasa tubuh yang kaya, cenderung dominan dalam percakapan.",
    kebutuhanKelompok: "Pembangun moral perjuangan kelompok dan pelaksana urusan kenyamanan fisik yang super andal.",
    batasPerhatian: "Rentan kelelahan ekstrem karena memaksakan diri merawat emosi semua orang tanpa istirahat terjadwal.",
    CommonMistypes: ["ESFJ (MBTI)", "EIE (Socionics - sering dikacaukan karena sama-sama menyukai ekspresi sosial)", "SEE (akibat kesamaan energi dominan)"],
    refleksi: "Apakah ketakutanmu terhadap kesunyian atau situasi tak pasti memaksamu terus-menerus memicu aktivitas sosial tanpa arti?",
    buktiMenyangkal: "Jika Anda terbukti dingin secara emosional, sangat menikmati kesendirian yang sunyi sepanjang hari, dan lihai bersenang-senang mengonseptualisasikan tren abstrak tanpa peduli kenyamanan fisik orang sekitar, Anda bukan ESE."
  },
  LII: {
    type: "LII",
    description: "Arsitek sistem yang berdedikasi mencari esensi keadilan logis. Anda mengupas realitas hingga ke fondasi struktur teoretisnya, lalu merapikannya ke dalam klasifikasi murni yang konsisten.",
    orientasiBase: "Analisis logis murni, klasifikasi terstruktur, penegakan prinsip keadilan, ketertarikan teoritis.",
    caraCreative: "Menjelajahi alternatif konseptual, melahirkan gagasan spekulatif unik untuk memperluas cakrawala sistem.",
    roleTampilan: "Mempresentasikan diri sebagai sosok yang peduli hubungan etis dan ramah secara personal di lingkungan formal.",
    tuntutanPolr: "Merasa sangat terancam oleh desakan fisik yang agresif, intimidasi kekuasaan langsung, atau konfrontasi perebutan wilayah taktis.",
    bantuanSuggestive: "Jiwa batinnya dipenuhi kedamaian ketika berada di dekat orang yang membawa kegembiraan emosional murni, kehangatan atmosfer sosial, dan tawa tulus.",
    areaMobilizing: "Sangat mendambakan tubuhnya sehat dan hidupnya dipenuhi kenyamanan indrawi yang rapi, bangga jika dinilai terurus fisiknya.",
    kompetensiIgnoring: "Sangat andal dalam menyusun efisiensi bisnis pragmatis, namun mengabaikannya jika teori logis prinsipilnya tidak terpenuhi.",
    kemampuanDemonstrative: "Secara otomatis memprediksi skenario jangka panjang dari teori buatannya secara tajam tanpa perlu pamer keahlian visioner.",
    polaSeimbang: "Rutin berolahraga ringan, aktif berdiskusi gagasan baru, dan sesekali menikmati festival musik yang hangat.",
    polaTertekan: "Menarik diri ke dalam analisis teoretis obsesif yang paranoid, kehilangan rasa aman emosional, atau tiba-tiba meledak kasar menentang penindas kasar.",
    gayaBelajar: "Sains teoretis murni, menyukai buku rujukan tebal yang disusun sistematis dan objektif secara matematis.",
    gayaKerja: "Perancang skema algoritma, analis kebijakan berkeadilan sosial, penasihat murni yang independen.",
    gayaKomunikasi: "Tenang, artikulatif, menggunakan bahasa presisi, seringkali terdengar formal dan datar pada awalnya.",
    kebutuhanKelompok: "Sebagai pilar kejernihan logika, penilai objektif aturan, dan penyeimbang keadilan klasifikasi.",
    batasPerhatian: "Terlalu lama bergulat dalam teori murni sehingga melewatkan momentum bertindak secara taktis di dunia nyata.",
    CommonMistypes: ["INTJ (MBTI)", "ILE (Socionics - akibat ketajaman gagasan)", "ILI (akibat kesamaan sifat pendiam)"],
    refleksi: "Apakah ketakutanmu pada tekanan fisik membuatmu lari ke dunia aturan logis murni dan menolak menghadapi kompleksitas praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai aksi perebutan kekuasaan fisik di lapangan, lincah bertarung secara taktis demi material, dan benci aturan teoretis abstrak, Anda bukan LII."
  },
  SLE: {
    type: "SLE",
    description: "Panglima aksi taktis yang menguasai ruang fisik. Anda melihat hidup sebagai medan kekuatan yang harus dituntun secara strategis, mahir mengalokasikan sumber daya, menegakkan hierarki disiplin, dan mendobrak hambatan fisik langsung.",
    orientasiBase: "Kehendak baja, penguasaan ruang fisik taktis, kontrol wilayah, arah mobilisasi tim secara dominan.",
    caraCreative: "Membangun sistem klasifikasi, analisis hukum, dan aturan hierarki yang tegas untuk mengunci kekuasaan.",
    roleTampilan: "Berusaha tampil berwawasan konseptual unik, membaca kemungkinan alternatif di depan klien besar.",
    tuntutanPolr: "Sangat rapuh di wilayah kedekatan relasi emosional batin (Fi); takut disingkirkan secara etis atau dituduh tak tulus hatinya.",
    bantuanSuggestive: "Luar biasa ditenangkan ketika didampingi oleh figur bijak yang meramalkan tren masa depan, konsekuensi mistik jangka panjang, dan mengurai kecemasan batinnya.",
    areaMobilizing: "Mendambakan suasana sosial yang meriah penuh tawa riang, bangga jika diakui mampu membuat orang termotivasi gembira.",
    kompetensiIgnoring: "Sangat tangguh secara daya tahan tubuh dan kebugaran fisik rutin, tetapi melindas kenyamanan fisik demi meraih target kemenangan target.",
    kemampuanDemonstrative: "Secara instingtif membongkar inefisiensi administrasi proyek kerja pragmatis, langsung mengarahkan sumber daya secara instan.",
    polaSeimbang: "Mampu menyalurkan energi kepemimpinan secara adil, mendengarkan nasehat spiritual, dan melatih disiplin etis yang tulus.",
    polaTertekan: "Menjadi paranoid terhadap kesetiaan kawan sedekatnya, bertindak sangat agresif secara fisik untuk mempertahankan kontrol, atau jatuh dalam kemurungan batin.",
    gayaBelajar: "Studi kasus taktis, membedah struktur organisasi kekuasaan, menyukai pelatihan kepemimpinan militer/olahraga keras.",
    gayaKerja: "Eksekutor krisis murni, jenderal lapangan industri, pembangun infrastruktur berskala masif.",
    gayaKomunikasi: "Tegas, langsung to-the-point, berwibawa, menggunakan perintah verbal yang lugas.",
    kebutuhanKelompok: "Sebagai panglima pelaksana yang memastikan target tercapai melalui disiplin internal yang solid.",
    batasPerhatian: "Sering melindas ikatan relasi tulus kawan dekat demi tegaknya aturan taktis pencapaian target.",
    CommonMistypes: ["ESTP (MBTI)", "SEE (Socionics - sering dikacaukan karena sama-sama gigih secara fisik)", "LSI (akibat kesamaan ketatnya aturan logis)"],
    refleksi: "Apakah kekerasan lahiriahmu sebenarnya topeng untuk menyembunyikan ketakutan mendalam akan pengkhianatan emosional kawan dekat?",
    buktiMenyangkal: "Jika Anda terbiasa cemas secara fisik, sangat menghindari membebankan kehendak pada orang lain, dan menghargai kesantunan hubungan batin di atas segalanya, Anda bukan SLE."
  },
  IEI: {
    type: "IEI",
    description: "Penyair batin yang menavigasi arus waktu dan makna spiritual. Anda menangkap arah perkembangan zaman, mengurai emosi tersembunyi, dan membimbing jiwa-jiwa keras agar melunak melalui bahasa puitis yang menyentuh hati.",
    orientasiBase: "Aliran batiniah waktu, tren perkembangan visioner, firasat murni, dan makna eksistensial peristiwa.",
    caraCreative: "Memengaruhi dinamika emosi sekitar, mencairkan kemarahan dengan orkestrasi ekspresi yang santun bin bermelodi.",
    roleTampilan: "Tampil sangat peduli pada detail kenyamanan indrawi dan tata krama kerapian di lingkungan formal baru.",
    tuntutanPolr: "Merasa sangat tersiksa oleh instruksi bisnis yang garing teknis, fakta-fakta ekonomi kering, atau tuntutan efisiensi kerja tanpa jiwa kemanusiaan.",
    bantuanSuggestive: "Kemantapan hidupnya utuh di dekat pelindung tangguh yang berkehendak tegas, dominan secara taktis, dan membantunya bertindak di dunia nyata.",
    areaMobilizing: "Ingin dipuji sebagai pemikir analitis yang objektif dan konsisten dalam merumuskan teori terstruktur.",
    kompetensiIgnoring: "Sangat kreatif melahirkan ide-ide alternatif konseptual baru, tetapi mengabaikannya demi fokus pada ramalan tren utama yang ia yakini terjadi.",
    kemampuanDemonstrative: "Secara alami menjaga jarak psikologis etis yang tulus di balik layar dalam hubungan persahabatan sejati.",
    polaSeimbang: "Konsisten menulis karya sastra/seni, melatih logika teoretis, menetapkan batasan aksi taktis bersama mentor tepercaya.",
    polaTertekan: "Tergelincir menjadi pemimpi pasif yang menyalahkan realitas objektif, terjebak dalam delusi penganiayaan emosional, atau membelanjakan uang secara serampangan.",
    gayaBelajar: "Metafora imajinatif, menyukai pembelajaran sejarah, filsafat, sastra, psikologi naratif.",
    gayaKerja: "Inspirator spiritual tim, penasihat arah perubahan budaya, perancang naskah komunikasi visioner.",
    gayaKomunikasi: "Lembut, diplomatis, puitis, kaya metafora, menggunakan intonasi emosional yang menyentuh.",
    kebutuhanKelompok: "Sebagai jangkar visi masa depan yang membimbing moral pejuang kelompok lewat inspirasi emosional hangat.",
    batasPerhatian: "Seringkali mangkir dari kewajiban tugas praktis harian karena tenggelam dalam dunia imajinasi internal.",
    CommonMistypes: ["INFJ (MBTI)", "EII (Socionics - sering tertukar karena kelembutan batin)", "SEI (akibat kemiripan kenyamanan batin)"],
    refleksi: "Apakah pelarianmu ke dalam dimensi firasat masa depan sebenarnya cara menghindari realitas keras tanggung jawab hidup praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai keteraturan data bisnis yang dingin, rajin menghitung laba-rugi operasional harian, dan benci metafora sastra mistis, Anda bukan IEI."
  },
  EIE: {
    type: "EIE",
    description: "Dramaturg perjuangan ideologis yang membakar gairah khalayak. Anda menerjemahkan visi jangka panjang menjadi histeria emosional massal demi menggerakkan roda perubahan sejarah kemanusiaan.",
    orientasiBase: "Ketenaran emosional, orkestrasi atmosfer sosial, membakar gairah kelompok demi keadilan ideologis.",
    caraCreative: "Membaca dinamika tren masa depan, meramalkan konsekuensi perubahan zaman bagi kehidupan spiritual.",
    roleTampilan: "Berusaha keras tampak sangat mahir mengurus bisnis administrasi praktis yang diatur rapi.",
    tuntutanPolr: "Sangat terancam oleh tuntutan mengurus detail perawatan fisik tubuh jasmani, sensasi indrawi rutin, atau memasak harian.",
    bantuanSuggestive: "Sangat terbantu oleh orang terstruktur yang membawakan keteraturan logika formal, penjelasan teoretis yang baku dinamis.",
    areaMobilizing: "Sangat ingin diakui sebagai pemimpin aksi taktis yang tegas dan pemberani di garis depan pertempuran fisik.",
    kompetensiIgnoring: "Sangat memahami ikatan kesetiaan moral etis personal, tetapi lebih memilih membakar emosi kelompok demi tujuan besar.",
    kemampuanDemonstrative: "Secara otomatis mendeteksi potensi tersembunyi gagasan ilmiah baru, melahirkan alternatif tak terduga secara cerdas harian.",
    polaSeimbang: "Teratur merawat kesehatan fisik bersama pasangannya, membina disiplin kaji teori, mengarahkan drama sosial demi kebaikan.",
    polaTertekan: "Mengalami ketakutan paranoid akan penyakit fisik di organ tubuhnya, melontarkan luapan emosi histeris merusak hubungan etis personal kawan dekat.",
    gayaBelajar: "Drama naratif historis, menyukai kuliah dengan dosen karismatik yang mendiskusikan visi kemanusiaan agung.",
    gayaKerja: "Komunikator masa depan, sutradara kreatif, aktor hubungan politik global, pembina ideologi perjuangan.",
    gayaKomunikasi: "Dramatis, teatral, berwibawa, sarat gairah emosional, piawai memikat hati pendengar dengan metafora dinamis.",
    kebutuhanKelompok: "Sebagai pembakar semangat juang ideologi kemanusiaan yang mempersatukan kelompok dalam batin perjuangan.",
    batasPerhatian: "Sering merusak kesehatan diri sendiri demi menjaga panggung pertunjukan emosi khalayak.",
    CommonMistypes: ["ENFJ (MBTI)", "ESE (Socionics - akibat kesamaan ekspresi sosial berpendar)", "LIE (akibat visi aksi yang menggebu)"],
    refleksi: "Apakah ledakan emosi panggungmu benar-benar memperjuangkan nilai tulus, atau sekadar ketakutan batinmu akan pengabaian khalayak?",
    buktiMenyangkal: "Jika Anda dingin secara sosial, sangat asik menghidupkan kenyamanan indrawi seperti memijat tubuh secara mandiri dengan teliti harian, serta benci panggung pembicara kelompok, Anda bukan EIE."
  },
  LSI: {
    type: "LSI",
    description: "Inspektur keteraturan sistem yang mengawal disiplin operasional. Anda adalah batu karang kestabilan, merapikan setiap sel regulasi, menegakkan keadilan klasifikasi logika murni, didukung pengawasan taktis yang presisi harian.",
    orientasiBase: "Klasifikasi logika terstruktur, hukum tertulis yang baku murni, keadilan regulasi dan keteraturan sistemik.",
    caraCreative: "Menerapkan kepemimpinan taktis fisik, menegakkan disiplin operasional di lapangan kerja.",
    roleTampilan: "Tampil sangat bersahabat secara moral interpersonal harian di lingkungan kerja baru untuk kenyamanan administratif.",
    tuntutanPolr: "Mengalami kelumpuhan aksi ketika menghadapi alternatif spekulatif yang berubah tanpa batas waktu, atau ide nirkabel nireguler.",
    bantuanSuggestive: "Hatinya tergetar melembut di dekat sosok karismatik yang membawakan gairah emosional membakar, keceriaan kelompok yang tulus berpendar.",
    areaMobilizing: "Sangat mendambakan bimbingan visi masa depan, mendambakan dipuji karena mampu menangkap tren mistis eksistensial.",
    kompetensiIgnoring: "Sangat mahir mengurus detail bisnis administrasi praktis, tetapi menundukkannya di bawah aturan logika filosofis prinsipil.",
    kemampuanDemonstrative: "Secara alami menjaga kerapian fisik, kebersihan ruang, dan keteraturan sensasi tubuh sehat harian di latar belakang.",
    polaSeimbang: "Secara sadar membuka ruang diskusi alternatif gagasan, rutin bersenang-senang menikmati orkestrasi seni teater yang hangat.",
    polaTertekan: "Menjadi birokrat luar biasa kaku yang menindas setiap ide unik, terobsesi membongkar persekongkolan fantasi fiktif yang dicurigai menyerangnya.",
    gayaBelajar: "Instruktif, terstruktur, menyetujui bagan diagram murni yang terbukti kokoh dan terdokumentasi rapi.",
    gayaKerja: "Administrator kepatuhan mutu harian, inspektur tata tertib kerja proyek fisik, pengelola operasional bersistem ketat.",
    gayaKomunikasi: "Komunikasi formal-monoton, presisi tinggi, lugas murni berpola deduktif.",
    kebutuhanKelompok: "Sebagai pengawal kedisiplinan regulasi internal dan penjamin kelancaran operasional taktis tim.",
    batasPerhatian: "Seringkali membunuh kreativitas ide-ide liar unik demi memaksakan kepatuhan terhadap regulasi tertulis lama.",
    CommonMistypes: ["ISTJ (MBTI)", "SLE (Socionics - sering dikacaukan karena ketegasan fisik)", "ESI (akibat kemiripan menjaga etika hukum batin)"],
    refleksi: "Apakah ketakutanmu menghadapi ketidakpastian ide baru memaksamu membangun tembok aturan hukum yang mengurung kebebasan sesama?",
    buktiMenyangkal: "Jika Anda terbukti sangat membenci aturan formal administrasi, lincah berspekulasi ide aneh yang berantakan, serta tidak peduli kerapian ruang, Anda bukan LSI."
  },
  SEE: {
    type: "SEE",
    description: "Wiraswasta kharisma yang menaklukkan tantangan hubungan interpersonal. Anda memiliki tekad beraksi yang berlimpah, memobilisasi orang demi target praktis menggunakan diplomasi pesona pribadi yang lincah berpendar.",
    orientasiBase: "Kehendak baja, taktis fisik penuh energi, penguasaan wilayah, pengaruh direktif lewat pesona kharisma.",
    caraCreative: "Membina kedekatan relasi etis personal, menyepakati nilai moral batin tulus demi mendulang loyalitas tim.",
    roleTampilan: "Tampil tampak ramah dengan berwawasan teoretis saat diskusi ilmiah, berusaha terlihat pintar akademis kaku.",
    tuntutanPolr: "Sangat menderita ketika dipaksa menganalisis teori matematika murni formal kering, atau bagan logika klasifikasi rumit.",
    bantuanSuggestive: "Lega luar biasa dibantu oleh analis visioner yang merangkum kalkulasi konsekuensi tren jangka panjang dan strategi bisnis.",
    areaMobilizing: "Ingin dipuji sebagai pekerja profesional yang berwawasan efisiensi bisnis pragmatis canggih tinggi praktis.",
    kompetensiIgnoring: "Sangat andal menjaga kegembiraan emosional kelompok berpendar, tetapi memprioritaskan ketulusan aliansi relasi batin harian.",
    kemampuanDemonstrative: "Secara instingtif mendeteksi kebugaran jasmani fisik kawan terdekatnya, menjaga keasrian tubuh alami harian secara otomatis.",
    polaSeimbang: "Aktif melatih kesabaran belajar teori prinsipil, merenungkan tren pembangunan zaman bersama penasihat spiritual tepercaya.",
    polaTertekan: "Menjadi curiga teoretis secara konyol, bertindak manipulatif lewat relasi personal untuk memukul lawan bisnis, jatuh dalam kecemasan target.",
    gayaBelajar: "Pembelajaran aktif interaktif penuh negosiasi, membedah dinamika kepemimpinan personal dan politik pragmatis.",
    gayaKerja: "Negosiator bisnis hebat, pemimpin aktivis pergerakan, penggalang loyalitas personal berskala akar rumput harian.",
    gayaKomunikasi: "Hangat-direktif, energetik pesona tinggi, lincah menggunakan humor personal mendekatkan jarak emosi.",
    kebutuhanKelompok: "Sebagai penggalang masa yang tangguh dan pembuka gerbang aliansi strategis bernuansa kekerabatan erat.",
    batasPerhatian: "Seringkali mengorbankan ketertiban aturan sistem hukum tertulis formal demi membela kawan relasi dekatnya.",
    CommonMistypes: ["ESFP (MBTI)", "SLE (Socionics - akibat dorongan fisik yang energetik)", "IEE (akibat kemiripan dalam kelincahan sosial)"],
    refleksi: "Apakah pesona diplomasi personalmu sebenarnya cara menghindari perenungan jernih akan kekosongan arah hidup jangka panjangmu?",
    buktiMenyangkal: "Jika Anda ternyata pendiam kaku, sangat asyik meneliti klasifikasi logika formal murni sepanjang hari, serta benci politik negosiasi personal praktis, Anda bukan SEE."
  },
  ILI: {
    type: "ILI",
    description: "Begawan analisis yang merenungkan konsekuensi waktu. Anda adalah kritikus objektif penyaring risiko jangka panjang, membedah inefisiensi bisnis murni pragmatis dibantu oleh visi masa depan yang tenang bin tajam.",
    orientasiBase: "Membaca arah tren jangka panjang, analisis konsekuensi waktu, pertapa batiniah menyaring risiko buruk.",
    caraCreative: "Merancang efisiensi praktis operasional bisnis, mengoptimalisasi sumber daya riil lewat fakta objektif harian.",
    roleTampilan: "Tampil bersikap sopan ramah rileks dengan menyapa tetangga, menunjukkan perawatan kenyamanan sosial formal.",
    tuntutanPolr: "Mengalami stres akut bila dipaksa menghidupkan keceriaan histeris emosional kelompok secara manipulatif harian.",
    bantuanSuggestive: "Merasa jiwanya dinyalakan berenergi ketika ditemani kawan bertekad baja energetik yang menggerakkannya masuk ke lapangan tindakan.",
    areaMobilizing: "Sangat mendambakan ketulusan hubungan etis personal yang setia, bangga dinilai sebagai kekasih yang tulus setia.",
    kompetensiIgnoring: "Sangat pandai menyusun klasifikasi logika teoritis murni, tetapi membuangnya sebagai kesenangan tak berguna tanpa hasil pragmatis.",
    kemampuanDemonstrative: "Secara alami memisahkan diri ke dalam prediksi spekulatif alternatif gagasan baru secara cerdas otomatis di belakang layar.",
    polaSeimbang: "Menjaga keontentikan hubungan batin dekatnya, teratur berolahraga aktif, dan mengekspresikan kritik secara konstruktif logis.",
    polaTertekan: "Menarik diri ke dalam isolasi batin dingin, menghujami setiap orang dengan pesimisme tajam perusak moral, serta jatuh dalam inersia pasif.",
    gayaBelajar: "Analitis komparatif mendalam, melahap buku ekonomi bisnis makro, fisika teori, sejarah ramalan peradaban.",
    gayaKerja: "Analis risiko keuangan global, kritikus kualitas sistem, arsitek strategi bisnis jangka panjang.",
    gayaKomunikasi: "Skeptis-tenang, satir hangat secara intelektual, datar, menggunakan analogi logis pragmatis ringkas.",
    kebutuhanKelompok: "Sebagai navigator arah jangka panjang penjamin keselamatan kelompok dari keputusan tergesa-gesa buruk.",
    batasPerhatian: "Kecenderungan menolak bertindak langsung di lapangan karena terlalu asyik menyaring cacat dan risiko teoretis.",
    CommonMistypes: ["INTJ (MBTI)", "LII (Socionics - akibat kemiripan sifat analitis akademis)", "SLI (akibat kesamaan pembawaan tenang rileks)"],
    refleksi: "Apakah kritisme satirmu sebenarnya cara bertahan dari ketakutanmu menghadapi ketidakmampuan bergaul ramah secara emosi hangat?",
    buktiMenyangkal: "Jika Anda terbukti sangat energetik bersosialisasi membakar emosi kelompok panggung sepanjang hari, dan benci kalkulasi risiko jangka panjang ekonomi, Anda bukan ILI."
  },
  LIE: {
    type: "LIE",
    description: "Wirausahawan dinamis yang mengejar realisasi target pragmatis. Anda mengawasi proses bisnis dengan lincah, memadukan riset pasar pragmatis dengan visi tren masa depan yang menguntungkan harian.",
    orientasiBase: "Efisiensi bisnis teoretis praktis, alokasi investasi sumber daya, aksi cepat melipatgandakan produktivitas empiris.",
    caraCreative: "Memetakan arah tren bisnis masa depan, memproyeksikan kalkulasi waktu jangka panjang secara visioner.",
    roleTampilan: "Mempresentasikan diri berpura-pura ramah sosial emosional hangat membara saat memikat penanam modal baru harian.",
    tuntutanPolr: "Mengalami depresi batin jika dipaksa menata estetik kenyamanan indrawi detail ruang hias, atau pijat santai relaks harian fisik.",
    bantuanSuggestive: "Jiwa batinnya tunduk melembut hormat di dekat pasangan setia bermoral batin tulus yang menjaga keaslian hubungan etis suci.",
    areaMobilizing: "Ingin diakui sebagai kesatria aksi fisik pemberani yang menguasai seni bela diri taktis atau olahraga ekstrem target fisik.",
    kompetensiIgnoring: "Sangat andal menyusun bagan logika konseptual sistem sains murni, tetapi segera mengabaikannya karena dirasakan tidak mendulang laba.",
    kemampuanDemonstrative: "Secara otomatis memancar ide-ide spekulatif inovasi baru bernilai bisnis cerdas tinggi di latar belakang.",
    polaSeimbang: "Secara berkala meditasi hening etis batin, rutin olahraga fisik aman, membina kesetiaan keluarga erat penuh kasih.",
    polaTertekan: "Jatuh dalam hipokondria cemas berlebihan akan penyakit fisik kecil, menuduh kawan dekatnya mengkhianati reputasinya secara moral batin.",
    gayaBelajar: "Studi kelayakan bisnis komparatif pragmatis, keuangan terapan, penerapan inovasi teknologi masa depan.",
    gayaKerja: "Pelopor industri rintisan, manajer investasi skala global, pendorong transformasi produktivitas proyek fisik.",
    gayaKomunikasi: "Cepat dinamis, penuh energi progresif, menggunakan humor candaan bisnis pragmatis produktif harian.",
    kebutuhanKelompok: "Sebagai motor penggerak keefektifan pencapaian kemakmuran ekonomi dan akselerasi visi ke depan tim.",
    batasPerhatian: "Seringkali melindas batas kebugaran fisik tubuh demi memacu ambisi produktivitas target bisnis harian.",
    CommonMistypes: ["ENTJ (MBTI)", "EIE (Socionics - akibat kesamaan dorongan aksi yang progresif keras)", "LSE (akibat kemiripan efisiensi kerja)"],
    refleksi: "Apakah ambisi akselerasi bisnis pragmatismu sebenarnya pelarian dari ketakutanmu untuk duduk diam merenungi kerentanan etis batinmu rasa bersalah?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai bersantai rebahan sepanjang hari merawat dekorasi kamar tidur estetik dengan teliti, serta benci kalkulasi keuangan dinamis, Anda bukan LIE."
  },
  ESI: {
    type: "ESI",
    description: "Benteng penjaga kesucian moral batin dan integritas relasi. Anda mengamati ketulusan hati sesama secara hening, tegas memilah siapa yang layak dipercaya harian, didukung tekad pertahanan diri taktis yang kokoh teguh.",
    orientasiBase: "Ikatan etis moral interpersonal tulus, mendeteksi kepalsuan jarak hubungan, memegang janji integritas batin.",
    caraCreative: "Menerapkan perlindungan taktis fisik langsung, mempertahankan wilayah moral keluarga dekatnya dari perusak fisik luar.",
    roleTampilan: "Tampil tampak ramah dengan menerangkan bagan matematika teoritis kaku di ruang formal baru administratif harian.",
    tuntutanPolr: "Mengalami stres batin hebat saat dilemparkan ke dalam situasi ide konseptual acak perubahan yang serba teoritis liar nirkabel.",
    bantuanSuggestive: "Jiwa batinnya disegarkan ceria ketika ada penasihat profesional tepercaya membawakan solusi efisiensi bisnis operasional pragmatis.",
    areaMobilizing: "Sangat merindukan bimbingan visi tren masa depan, bangga jika pujian ditujukan atas kemampuannya meramal risiko zaman.",
    kompetensiIgnoring: "Sangat berbakat mengenali moral getaran emosional kelompok bersosialisasi hangat, tetapi memangkasnya demi kejujuran relasi dekat batin suci.",
    kemampuanDemonstrative: "Secara alami menjaga detail kebersihan rumah tangga, estetika kenyamanan indrawi jasmani sehat harian dalam keheningan.",
    polaSeimbang: "Teratur membaca perkembangan sejarah tren ke depan, rajin menyelaraskan bisnis karirnya, dan membuka batin terhadap alternatif ide hangat.",
    polaTertekan: "Menjadi hakim moral yang sangat kaku berpembawaan dingin memusuhi sekelompok besar orang luar, terjerembab curiga aneh-aneh tak rasional.",
    gayaBelajar: "Kesusastraan bernuansa etika perjuangan kemanusiaan, psikologi hubungan konseptual tulus pragmatis berkeluarga.",
    gayaKerja: "Pengawal kepatuhan kode etik industri, penjaga benteng operasional rahasia tim, psikolog klinis hubungan personal.",
    gayaKomunikasi: "Tenang berwibawa sekuriti batin tinggi, diplomatis jarak sosial teratur, tajam mengamati keontentikan gerak mata kawan.",
    kebutuhanKelompok: "Sebagai batu karang integritas etika internal pengaman moralitas kawan tim dekat pengusir pengkhianat.",
    batasPerhatian: "Cenderung terlalu cepat menghakimi dingin seseorang sebagai tidak tulus dan menutup pintu maaf selamanya.",
    CommonMistypes: ["ISFJ (MBTI)", "LSI (Socionics - akibat kesamaan kekristalan aturan dingin)", "EII (akibat kesamaan integritas etis batin)"],
    refleksi: "Apakah ketegasanmu memilah hubungan moral batin sebenarnya memenjarakanmu ke dalam ketakutan kesepian abadi menolak dimaafkan?",
    buktiMenyangkal: "Jika Anda sangat toleran terhadap kelonggaran moralitas batin, asyik berspekulatif teori kosmologi nirkabel liar semesta, serta mengabaikan janji setia personal, Anda bukan ESI."
  },
  IEE: {
    type: "IEE",
    description: "Penjelajah potensi kemanusiaan yang lincah menular pesona kehangatan. Anda menangkap bakat unik tersembunyi dalam diri setiap jiwa yang Anda temui, membimbing mereka menemukan jati diri sejati ditopang oleh diplomasi relasi personal etis yang luwes berpendar harian.",
    orientasiBase: "Mendeteksi potensi bakat unik murninya manusia, alternatif jalan hidup kreatif inovatif, keunikan esensi tersembunyi.",
    caraCreative: "Membangun ikatan relasi etis hangat dari hati ke hati, menavigasi keharmonisan moral persahabatan tulus personal.",
    roleTampilan: "Tampil bersikap seakan-akan petarung taktis fisik berwibawa militer energetik direktif di depan rapat umum birokrasi baru.",
    tuntutanPolr: "Sangat tidak nyaman dipaksa menelan klasifikasi logika teoretis formal baku kering yang membelenggu kreativitas batinnya.",
    bantuanSuggestive: "Luar biasa rileks tenang ketika pasangannya menatanya tidur di atas kamar estetik bersih, merawat kebugaran tubuh, serta memasakkannya makanan bergizi.",
    areaMobilizing: "Mendambakan pengakuan profesional akan kemampuan efisiensi kerja pragmatisnya, bangga dinilai lihai merancang bisnis.",
    kompetensiIgnoring: "Sangat peka terhadap tren masa depan batiniah, tetapi mengesampingkannya demi mengeksplorasi berlimpahnya kemungkinan ide aktif harian nyata.",
    kemampuanDemonstrative: "Secara alami mencairkan sengketa atmosfer emosional tim kelompok lewat humor ceria bersahabat otomatis dari belakang.",
    polaSeimbang: "Membina disiplin hidup operasional bisnis terencana, rutin pijat tubuh rileks sehat secara berkala, sabar mengkaji logika tertata.",
    polaTertekan: "Tiba-tiba meledak menuduh pembatasan teoretis kaku orang lain sebagai kejahatan, mencoba bertarung taktis agresif berlebihan fisik.",
    gayaBelajar: "Psikologi humanistik interaktif, karya sastra sastrawan eksentrik ide baru, diskusi pemikiran orisinalitas manusia.",
    gayaKerja: "Konsultan pencari bakat talenta, pembina pengembangan keunikan individu tim, manajer humas aliansi strategis hangat.",
    gayaKomunikasi: "Ekspresif simpatik, humoris personal hangat berpendar, menulari tawa riang mengikis jarak psikologis kaku.",
    kebutuhanKelompok: "Sebagai dinamisator moral persahabatan yang menyulut tumbuhnya keunikan bakat terpendam kawan kelompok.",
    batasPerhatian: "Terlalu mudah teralihkan oleh kemunculan ide manusia baru sehingga menelantarkan penyelesaian proyek administratif pragmatis lama.",
    CommonMistypes: ["ENFP (MBTI)", "ILE (Socionics - akibat kesamaan kelincahan berpikir)", "EII (akibat kesamaan sifat etis hangat tulus)"],
    refleksi: "Apakah doronganmu terus mencari keunikan potensi luar biasa manusia lain sebenarnya pelarian dari keheningan untuk mencintai kerapihan hidup pribadimu?",
    buktiMenyangkal: "Jika Anda ternyata berkarakter dingin kaku, sangat menyukai matematika teoritis formula kering harian, serta benci obrolan dari hati ke hati, Anda bukan IEE."
  },
  SLI: {
    type: "SLI",
    description: "Teknisi hening yang menyempurnakan kualitas indrawi praktis. Anda menciptakan keindahan kenyamanan fisik yang bermutu tinggi, menyusun efisiensi alat proyek nyata, bernuansa ketenangan rileks murni harian.",
    orientasiBase: "Kenyamanan indrawi jasmani murni sehat, relaksasi tubuh, keseimbangan estetika alam sekitar, hidup minimalis.",
    caraCreative: "Memperbaiki keefektifan sistem mekanik alat kerja harian, merancang operasi bisnis praktis pragmatis.",
    roleTampilan: "Berusaha menampilkan diri tampak visioner spiritual membaca ramalan masa depan tren waktu didepan keramaian publik.",
    tuntutanPolr: "Jiwa batinnya membeku panik bila dipukuli tuntutan performa panggung histeria keceriaan emosional kelompok manipulatif harian.",
    bantuanSuggestive: "Relief hidupnya utuh didapatkan tatkala kawan kreatif membawakannya petualangan ide baru spekulatif aneh unik yang segar murni.",
    areaMobilizing: "Sangat mendambakan ketulusan kasih batin dalam relasi suci personal setia, bangga dinilai penyayang berintegritas tulus batin.",
    kompetensiIgnoring: "Sangat andal menegakkan perlindungan taktis fisik langsung, tetapi memilih mundur tenang rileks menghindari sengketa kekuasaan.",
    kemampuanDemonstrative: "Secara bawah sadar menyusun logika pembuktian prinsip teori sains murni dalam operasi hening otomatis tanpa banyak bicara.",
    polaSeimbang: "Teratur bersosialisasi mengeksplorasi ide segar bersama komunitas kecil, hening melatih kepekaan rasa setia etis.",
    polaTertekan: "Mengisolasi diri total di kamar tidur mati rasa indrawi fisik, melontarkan penolakan dingin sinis teoretis, cemas akan visi masa depan.",
    gayaBelajar: "Keterampilan teknik terapan operasional mekanis fisik, desain arsitektur minimalis lingkungan, sains praktis nyata.",
    gayaKerja: "Perancang produk ergonomis fisik bermutu, manajer pemeliharaan aset infrastruktur rahasia, pengrajin kayu murni.",
    gayaKomunikasi: "Sangat ringkas tenang datar to-the-point, santun menghindari gesekan verbal berisik, bersuara emosi ramah lirih.",
    kebutuhanKelompok: "Sebagai penjamin mutlak berjalannya kenyamanan fisik peralatan teknis dan tatanan ergonomis tempat tinggal.",
    batasPerhatian: "Seringkali menolak berkomunikasi ekspresif emosional membuat kawan dekatnya merasa diabaikan ditinggal gersang.",
    CommonMistypes: ["ISTP (MBTI)", "ILI (Socionics - akibat kemiripan pembawaan menyendiri hening)", "SEI (akibat kesamaan merawat indrawi fisik)"],
    refleksi: "Apakah kedok minimalis tenang keheninganmu sebenarnya ketakutanmu berlarut menghadapi tantangan gejolak interaksi emosi hangat kelompok?",
    buktiMenyangkal: "Jika Anda terbukti sangat senang tampil berbicara histeris dipanggung drama emosional membakar khalayak luas harian, Anda bukan SLI."
  },
  LSE: {
    type: "LSE",
    description: "Sutradara profesionalisme kerja bermutu tinggi. Anda memadukan efisiensi industri operasional pragmatis dengan ketelitian detail rasa indrawi kenyamanan fisik harian demi mewujudkan tatanan produktivitas murni berstandar mutu tinggi.",
    orientasiBase: "Efisiensi industri pragmatis empiris objektif harian, optimalisasi proses kerja alat berdisiplin tinggi, produktivitas handal.",
    caraCreative: "Merawat kenyamanan fisik jasmani tempat kerja ergonomis sehat, kebersihan estetika ruang, ketelitian detail indrawi.",
    roleTampilan: "Berusaha tampil ekspresif emosional hangat berpendar ceria bagai pembawa acara ulung di pesta baru kelompok formal harian.",
    tuntutanPolr: "Mengalami depresi batin parah bila dipaksa menebak makna ramalan visi tren masa depan tanpa didukung fakta empiris.",
    bantuanSuggestive: "Jiwa batinnya luar biasa tenang teduh disembuhkan ketika pasangannya membimbing rasa batin kedekatan interpersonal etis tulus.",
    areaMobilizing: "Ingin dipuji sebagai konseptor inovasi yang kaya akan kemungkinan ide alternatif aneh unik sains berpikiran terbuka.",
    kompetensiIgnoring: "Sangat andal menegakkan konsistensi logika teoretis rumus formal murni, tetapi memilih membuangnya demi kepiawaian kerja operasional riil.",
    kemampuanDemonstrative: "Secara otomatis memasang kehendak baja perlindungan taktis disiplin operasional lapangan fisik tanpa teriak kasar.",
    polaSeimbang: "Teratur meluangkan waktu hening yoga batin menyepakati etika hati kesetiaan keluarga, sabar menyaring imajinasi alternatif liar segar.",
    polaTertekan: "Menjadi paranoid akan kehabisan waktu operasional bisnis yang dikejar kecemasan krisis, melontarkan kritik moral pedas merusak persahabatan.",
    gayaBelajar: "Manajemen manufaktur industri, sertifikasi standar mutu mutu internasional, penerapan mekanika praktis ergonomis lapangan.",
    gayaKerja: "Direktur pelaksana operasional, kepala penjamin mutu laboratorium harian, arsitek lanskap kota terpadu bernuansa rapi.",
    gayaKomunikasi: "Eksplosif berenergi profesional kerja, runut logis pragmatis, santun tegas berpostur tubuh tegap rapi.",
    kebutuhanKelompok: "Sebagai panglima jenderal keefektifan target produktivitas bermutu tinggi dan pengatur keasrian indrawi lingkungan.",
    batasPerhatian: "Seringkali mengabaikan kelembutan kesetiaan batin emosional pasangannya demi memacu penyempurnaan detail target proyek.",
    CommonMistypes: ["ESTJ (MBTI)", "LIE (Socionics - akibat kesamaan pengejaran aksi efisiensi)", "LSI (akibat kesamaan disiplin keteraturan kerja)"],
    refleksi: "Apakah tuntutan tanpa cela profesional standar mutumu harian sebenarnya pelampiasan rasa takutmu dituduh gagal secara etika moral batin?",
    buktiMenyangkal: "Jika Anda ternyata pemimpi mager, berantakan secara fisik indrawi harian, mengabaikan fakta keuangan, serta membenci operasional lapangan, Anda bukan LSE."
  },
  EII: {
    type: "EII",
    description: "Malaikat penasihat moral spiritual penata keheningan batin kemanusiaan. Anda berdiri teguh di atas kompas ketulusan etis persahabatan sejati, menumbuhkan bakat kreatif konseptor unik pada sesama, dibalut kesabaran batin hening tulus alami.",
    orientasiBase: "Integritas moral batin interpersonal suci, ikatan persahabatan etis tulus murni penuh kedekatan batin sunyi.",
    caraCreative: "Memprediksi kemungkinan bakat unik terpendam kemanusiaan, melahirkan alternatif jalan hidup kreatif orisinal harian sesama.",
    roleTampilan: "Tampil tampak sangat mahir berdebat regulasi hukum tertulis formal bagaikan profesor kaku tata tertib baru sanksi administratif harian.",
    tuntutanPolr: "Merasa jiwanya membeku ketakutan terancam bila dihadapkan pada kekerasan fisik agresif langsung taktis direktif ancaman wilayah.",
    bantuanSuggestive: "Merasa hidupnya kokoh aman terstruktur bila didampingi pemimpin profesional tangguh yang meluruskan tata kelola bisnis karirnya.",
    areaMobilizing: "Sangat mendambakan kenyamanan tubuh jasmani fisik yang teratur rapi ergonomis, bangga dinilai bersih sehat tubuh jasmani.",
    kompetensiIgnoring: "Sangat berbakat membaca aliran firasat makna batin trends masa depan, tetapi dikesampingkan demi fokus persahabatan tulus aktif riil kini.",
    kemampuanDemonstrative: "Secara alami mencairkan ketegangan kemarahan kelompok emosi sosial berpendar lewat tutur hening simpatik otomatis di belakang.",
    polaSeimbang: "Teratur olahraga fisik aman bersama pelindungnya, rajin menyelaraskan bisnis karir, sabar membuka pemahaman aturan logis.",
    polaTertekan: "Terpuruk pasif merasa menjadi martir penzaliman moral batin, melontarkan luapan kritik tertulis sanksi logis teoretis dingin kaku.",
    gayaBelajar: "Psikoanalisis kepribadian humanistik, filsafat etika kemanusiaan suar kasih, kesusastraan naratif spiritual batin pendamai.",
    gayaKerja: "Penasihat karir pengembangan kemanusiaan tim, psikolog terapi kedamaian batin, mediator sengketa komunikasi persahabatan tim.",
    gayaKomunikasi: "Sangat hening lembut santun simpatik tinggi, memilih jarak psikologis dekat rahasia satu-lawan-satu sarat cinta kasih.",
    kebutuhanKelompok: "Sebagai kompas penjaga muruah integritas kedamaian etis tim pengusir hawa permusuhan sengketa kotor.",
    batasPerhatian: "Terlalu takut berkonfrontasi fisik taktis direktif langsung sehingga membiarkan penindas menyiksa wilayah aslinya berlarut.",
    CommonMistypes: ["INFP (MBTI)", "IEI (Socionics - akibat kesamaan kelembutan pertapa hening batin)", "ESI (akibat kesamaan menjaga kesucian moral batin)"],
    refleksi: "Apakah pengorbanan batinmu sebagai martir moral sebenarnya bentuk ketakutanmu menegakkan kekuasaan taktis fisik bertahan membela diri?",
    buktiMenyangkal: "Jika Anda ternyata lincah bertarung fisik merebut aset kekuasaan wilayah secara taktis, dan benci refleksi etis, Anda bukan EII."
  }
};

export const INTERTYPE_RELATIONS_METADATA: Record<string, { name: string; description: string; impact: string }> = {
  duality: {
    name: "Duality (Dualitas)",
    description: "Hubungan komplementer sempurna dalam Socionics Model A.",
    impact: "Elemen dasar Anda adalah informasi Suggestive pasangan, sementara elemen kreatif Anda adalah Mobilizing mereka. Interaksi terasa sangat aman, meredakan kecemasan PoLR masing-masing tanpa kata-kata, mengungkit produktivitas dan menyembuhkan batin secara timbal balik."
  },
  activation: {
    name: "Activation (Aktivasi)",
    description: "Hubungan penguat energi saling merangsang aksi aktif.",
    impact: "Kompatibel tinggi dalam quadra yang sama. Anggota saling menyalakan energi aksi cepat (Mobilizing terisi oleh Base). Sangat menyenangkan untuk kolaborasi cepat jangka pendek, namun rentan menimbulkan kelelahan fisik jika berlarut tanpa jeda hening."
  },
  mirror: {
    name: "Mirror (Cermin)",
    description: "Saling merefleksikan ide intelektual dari sudut pandang yang berbeda.",
    impact: "Sama-sama dalam satu blok Ego yang dihargai (Base satu adalah Creative lainnya). Hubungan dipenuhi diskusi konseptual yang tajam dan konstruktif, saling mengoreksi detail implementasi gagasan, sangat cocok untuk kemitraan ilmiah."
  },
  identity: {
    name: "Identity (Identitas)",
    description: "Melihat cerminan persis diri sendiri dalam orang lain.",
    impact: "Memiliki struktur Model A yang identik. Pemahaman instan tanpa perlu penjelasan panjang lebar. Sangat baik untuk proses belajar awal bersama, namun rentan mandek karena memiliki kelemahan yang persis sama di area PoLR tanpa ada saling menutupi."
  },
  kindred: {
    name: "Kindred (Sekerabat)",
    description: "Memiliki dasar orientasi hidup sama namun jalan kreasi berbeda.",
    impact: "Sama-sama memiliki elemen Base yang persis sama, namun elemen kreatif berbeda (misal Ne-Ti ILE vs Ne-Fi IEE). Terlihat sangat mirip di permukaan, namun sering berselisih paham saat menentukan metode praktis penyelesaian masalah."
  },
  business: {
    name: "Business (Mitra Bisnis)",
    description: "Hubungan kerja sama profesional yang pragmatis dinamis.",
    impact: "Memiliki elemen kreatif yang sama namun elemen base berbeda (misal ILE Ti-creative vs SLE Ti-creative). Sangat andal untuk bersinergi menyelesaikan tugas pragmatis operasional di kantor, namun gersang secara kedalaman emosional dan spiritual batin."
  },
  semi_duality: {
    name: "Semi-Duality (Semi-Dualitas)",
    description: "Dualitas yang belum tuntas atau setengah jalan.",
    impact: "Elemen Suggestive terpenuhi oleh Base pasangan, namun elemen Creative tidak menyokong Mobilizing (atau PoLR bergeser tidak terproteksi sempurna). Terasa sangat memikat di awal, namun rentan memicu kesalahpahaman tak terduga harian."
  },
  mirage: {
    name: "Mirage (Fatamorgana)",
    description: "Hubungan rileks yang menenangkan namun rentan melempem.",
    impact: "Interaksi terasa sangat nyaman, santai, dan damai untuk liburan bersama. Namun, ketika dipaksa bekerja serius mengejar target bisnis keras, fokus tim hancur karena saling membiarkan kemalasan atau kurang koordinasi logis praktis."
  },
  contrary: {
    name: "Contrary (Kontras / Pemadam)",
    description: "Saling memadamkan orientasi batin akibat arah ekstratim-introtim terbalik.",
    impact: "Memiliki elemen yang sama namun terbalik arah mental-vitalnya (misal Ne-Ti ILE vs Ni-Te ILI). Saat berdiskusi berdua, terasa ada benturan senyap di mana argumen yang satu seolah menihilkan makna orientasi dasar yang dipegang pihak lainnya."
  },
  quasi_identity: {
    name: "Quasi-Identity (Identitas Semu)",
    description: "Kemiripan aktivitas konseptual luar yang menyembunyikan perbedaan batin murni.",
    impact: "Merasa sangat mirip secara profesi luar (misal LII arsitek logika vs ILI arsitek risiko), mendiskusikan topik serupa. Namun sesungguhnya menyembunyikan perbedaan visi quadra yang sangat bertolak belakang, membuat penyebutan definisi sering bergeser kaku."
  },
  superego: {
    name: "Super-Ego",
    description: "Hubungan penghormatan formal yang melelahkan akibat ketiadaan kecocokan nilai batin.",
    impact: "Blok Ego Anda adalah blok Super-Ego mereka (Base Anda adalah elemen Role mereka, PoLR Anda adalah Creative mereka). Selalu merasa harus tampil sempurna dan sopan kaku demi menjaga gengsi sosial, namun sangat menguras batin jika tinggal bersama harian."
  },
  conflict: {
    name: "Conflict (Konflik)",
    description: "Hubungan gesekan permanen tak terselesaikan dalam Socionics.",
    impact: "Base Anda adalah PoLR pasangan, sementara Creative Anda menyerang rasa aman batin mereka, begitu pula sebaliknya. Hubungan dipenuhi salah tafsir konstan yang melelahkan batin. Membutuhkan kedewasaan spiritual raksasa untuk tidak saling melukai wilayah intim batin harian."
  },
  benefit: {
    name: "Benefit (Pemberi Manfaat - Penerima Manfaat)",
    description: "Hubungan asimetris di mana energi mengalir satu arah.",
    impact: "Hubungan asimetris. Benefactor (Pemberi) diposisikan di atas Beneficiary (Penerima). Beneficiary memandang Benefactor dengan kekaguman konseptual tinggi dan selalu berusaha mendapatkan persetujuan mereka, sementara Benefactor menganggap Beneficiary menarik namun kurang mumpuni."
  },
  supervision: {
    name: "Supervision (Pengawasan - Terawas)",
    description: "Hubungan koreksi asimetris di mana PoLR salah satu diawasi langsung pihak lain.",
    impact: "Hubungan asimetris paling tajam. Supervisor (Pengawas) mengamati elemen PoLR Supervisee (Terawas) memakai elemen Base mereka yang kuat. Supervisee terus-menerus merasa dikoreksi, diaudit, atau dicari-cari kesalahannya tanpa ampun di wilayah batin ringkihnya."
  }
};

export const INTERTYPE_MAP: Record<TIM, Record<TIM, string>> = {
  ILE: { ILE: "identity", SEI: "duality", ESE: "activation", LII: "mirror", SLE: "business", IEI: "mirage", EIE: "benefit", LSI: "supervision", SEE: "benefit", ILI: "contrary", LIE: "semi_duality", ESI: "supervision", IEE: "kindred", SLI: "semi_duality", LSE: "supervision", EII: "conflict" },
  SEI: { ILE: "duality", SEI: "identity", ESE: "mirror", LII: "activation", SLE: "mirage", IEI: "business", EIE: "supervision", LSI: "benefit", SEE: "supervision", ILI: "semi_duality", LIE: "conflict", ESI: "benefit", IEE: "semi_duality", SLI: "kindred", LSE: "conflict", EII: "benefit" },
  ESE: { ILE: "activation", SEI: "mirror", ESE: "identity", LII: "duality", SLE: "semi_duality", IEI: "supervision", EIE: "kindred", LSI: "semi_duality", SEE: "semi_duality", ILI: "conflict", LIE: "benefit", ESI: "supervision", IEE: "supervision", SLI: "conflict", LSE: "business", EII: "mirage" },
  LII: { ILE: "mirror", SEI: "activation", ESE: "duality", LII: "identity", SLE: "supervision", IEI: "semi_duality", EIE: "semi_duality", LSI: "kindred", SEE: "conflict", ILI: "business", LIE: "mirage", ESI: "conflict", IEE: "conflict", SLI: "benefit", LSE: "mirage", EII: "business" },
  
  SLE: { ILE: "business", SEI: "mirage", ESE: "semi_duality", LII: "supervision", SLE: "identity", IEI: "duality", EIE: "activation", LSI: "mirror", SEE: "kindred", ILI: "semi_duality", LIE: "business", ESI: "contrary", IEE: "contrary", SLI: "business", LSE: "contrary", EII: "conflict" },
  IEI: { ILE: "mirage", SEI: "business", ESE: "supervision", LII: "semi_duality", SLE: "duality", IEI: "identity", EIE: "mirror", LSI: "activation", SEE: "semi_duality", ILI: "kindred", LIE: "contrary", ESI: "supervision", IEE: "semi_duality", SLI: "contrary", LSE: "conflict", EII: "contrary" },
  EIE: { ILE: "benefit", SEI: "supervision", ESE: "kindred", LII: "semi_duality", SLE: "activation", IEI: "mirror", EIE: "identity", LSI: "duality", SEE: "benefit", ILI: "conflict", LIE: "mirror", ESI: "semi_duality", IEE: "contrary", SLI: "conflict", LSE: "activation", EII: "contrary" },
  LSI: { ILE: "supervision", SEI: "benefit", ESE: "semi_duality", LII: "kindred", SLE: "mirror", IEI: "activation", EIE: "duality", LSI: "identity", SEE: "conflict", ILI: "semi_duality", LIE: "benefit", ESI: "mirror", IEE: "conflict", SLI: "benefit", LSE: "activation", EII: "mirror" },
  
  SEE: { ILE: "benefit", SEI: "supervision", ESE: "semi_duality", LII: "conflict", SLE: "kindred", IEI: "semi_duality", EIE: "benefit", LSI: "conflict", SEE: "identity", ILI: "duality", LIE: "activation", ESI: "mirror", IEE: "business", SLI: "mirage", LSE: "benefit", EII: "supervision" },
  ILI: { ILE: "contrary", SEI: "semi_duality", ESE: "conflict", LII: "business", SLE: "semi_duality", IEI: "kindred", EIE: "conflict", LSI: "semi_duality", SEE: "duality", ILI: "identity", LIE: "mirror", ESI: "activation", IEE: "mirage", SLI: "business", LSE: "benefit", EII: "supervision" },
  LIE: { ILE: "semi_duality", SEI: "conflict", ESE: "benefit", LII: "mirage", SLE: "business", IEI: "contrary", EIE: "mirror", LSI: "benefit", SEE: "activation", ILI: "mirror", LIE: "identity", ESI: "duality", IEE: "benefit", SLI: "supervision", LSE: "mirror", EII: "benefit" },
  ESI: { ILE: "supervision", SEI: "benefit", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "supervision", EIE: "semi_duality", LSI: "mirror", SEE: "mirror", ILI: "activation", LIE: "duality", ESI: "identity", IEE: "supervision", SLI: "benefit", LSE: "mirror", EII: "activation" },
  
  IEE: { ILE: "kindred", SEI: "semi_duality", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "semi_duality", EIE: "contrary", LSI: "conflict", SEE: "business", ILI: "mirage", LIE: "benefit", ESI: "supervision", IEE: "identity", SLI: "duality", LSE: "activation", EII: "mirror" },
  SLI: { ILE: "semi_duality", SEI: "kindred", ESE: "conflict", LII: "benefit", SLE: "business", IEI: "contrary", EIE: "conflict", LSI: "benefit", SEE: "mirage", ILI: "business", LIE: "supervision", ESI: "benefit", IEE: "duality", SLI: "identity", LSE: "mirror", EII: "activation" },
  LSE: { ILE: "supervision", SEI: "conflict", ESE: "business", LII: "mirage", SLE: "contrary", IEI: "conflict", EIE: "activation", LSI: "activation", SEE: "benefit", ILI: "benefit", LIE: "mirror", ESI: "mirror", IEE: "activation", SLI: "mirror", LSE: "identity", EII: "duality" },
  EII: { ILE: "conflict", SEI: "benefit", ESE: "mirage", LII: "business", SLE: "conflict", IEI: "contrary", EIE: "contrary", LSI: "mirror", SEE: "supervision", ILI: "supervision", LIE: "benefit", ESI: "activation", IEE: "mirror", SLI: "activation", LSE: "duality", EII: "identity" }
};

export function validateSocionicsData(): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  const TIM_TYPES = Object.keys(TIM_MODELS) as TIM[];
  if (TIM_TYPES.length !== 16) {
    errors.push(`Jumlah TIM tidak sama dengan 16, melainkan ${TIM_TYPES.length}`);
  }

  const allElements: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];

  for (const tim of TIM_TYPES) {
    const model = TIM_MODELS[tim];
    if (!model) {
      errors.push(`TIM ${tim} tidak memiliki konfigurasi model.`);
      continue;
    }

    const posMapped = Object.values(model.positions) as InformationElement[];
    if (posMapped.length !== 8) {
      errors.push(`TIM ${tim} tidak memiliki tepat 8 posisi fungsi, melainkan ${posMapped.length}`);
    }

    const uniqueElements = new Set(posMapped);
    if (uniqueElements.size !== 8) {
      errors.push(`TIM ${tim} memiliki posisi dengan elemen duplikat: ${posMapped.join(", ")}`);
    }

    for (const el of allElements) {
      if (!uniqueElements.has(el)) {
        errors.push(`TIM ${tim} kekurangan elemen ${el}`);
      }
    }

    const quadra = model.quadra;
    const valued = QUADRA_DATA[quadra].valuedElements;
    const base = model.positions.Base;
    const creative = model.positions.Creative;
    const suggestive = model.positions.Suggestive;
    const mobilizing = model.positions.Mobilizing;

    const valuesMapped = [base, creative, suggestive, mobilizing];
    for (const valEl of valuesMapped) {
      if (!valued.includes(valEl)) {
        errors.push(`TIM ${tim} berada di Quadra ${quadra} tetapi mengalirkan elemen ${valEl} yang tidak tercakup dalam valued quadra.`);
      }
    }

    const dualType = model.dual;
    const dualModel = TIM_MODELS[dualType];
    if (!dualModel) {
      errors.push(`TIM ${tim} memiliki dual ${dualType} yang tidak terdaftar di TIM_MODELS.`);
    } else {
      if (dualModel.dual !== tim) {
        errors.push(`Ketidakselarasan pasangan dual: ${tim} berteman dual ${dualType}, tapi ${dualType} berteman dual ${dualModel.dual}`);
      }
      if (dualModel.quadra !== quadra) {
        errors.push(`Ketidakselarasan quadra dual: ${tim} (${quadra}) berdual dengan ${dualType} (${dualModel.quadra})`);
      }
    }
  }

  return {
    success: errors.length === 0,
    errors
  };
}
````

---

## `src/data/coreQuestions.ts`

````ts
/** Explicit core question bank.
 *
 * Each of the 64 element × channel cells has three independently written
 * replications in different contexts. There is no sentence-template generator.
 */
import type { InformationElement, MeasurementChannel, QuestionContext, SocionicsQuestion } from "../types/socionics";

const makeCore = (
  id: string,
  element: InformationElement,
  channel: MeasurementChannel,
  context: QuestionContext,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => ({
  id, scenario, statement, responseFocus, element, channel, context,
  scaleType: CHANNEL_SCALE[channel],
  direction: 1,
  reverseKeyed: false,
  designWeight: 1,
  ambiguityRisk: "low",
  desirabilityRisk: channel === "aspiration" || channel === "mask" ? "medium" : "low",
  evidenceTags: [element, channel, context, "core"],
  replicationFamilyId: `${element}_${channel}`,
  isHoldout: false,
  isTieBreak: false,
  itemVersion: "2.0.0",
});

const CHANNEL_SCALE: Record<MeasurementChannel, SocionicsQuestion["scaleType"]> = {
  producer: "automaticity", flexible: "comfort", mask: "frequency", threat: "threat",
  receiver: "relief", aspiration: "recognition", dismissive: "frequency", background: "automaticity",
};

export const CORE_QUESTIONS: SocionicsQuestion[] = [
  makeCore("core_ne_producer_01", "Ne", "producer", "new_situation", "Aplikasi baru dengan banyak menu", "Saat mencoba aplikasi yang belum dikenal, saya cepat melihat beberapa cara berbeda untuk memakainya, termasuk fungsi yang mungkin tidak terpikir oleh orang lain.", "melihat beberapa kemungkinan penggunaan yang berbeda"),
  makeCore("core_ne_producer_02", "Ne", "producer", "group", "Obrolan kelompok mulai buntu", "Ketika pembahasan mentok pada satu jalan, pikiran saya spontan membuka beberapa arah lain yang masih mungkin dicoba.", "membuka beberapa kemungkinan ketika pembahasan buntu"),
  makeCore("core_ne_producer_03", "Ne", "producer", "private", "Barang lama yang tidak terpakai", "Melihat benda yang hendak dibuang sering membuat saya langsung membayangkan fungsi lain yang masih bisa diberikan kepadanya.", "membayangkan fungsi baru dari sesuatu yang sudah ada"),
  makeCore("core_ne_flexible_01", "Ne", "flexible", "work", "Rencana kerja utama gagal", "Jika cara pertama tidak bisa dipakai, saya relatif nyaman berpindah di antara beberapa alternatif sampai menemukan jalan yang paling masuk akal.", "berpindah di antara alternatif untuk menyelesaikan masalah"),
  makeCore("core_ne_flexible_02", "Ne", "flexible", "friendship", "Teman bingung memilih langkah", "Saya mudah menyesuaikan jenis saran: kadang memberi pilihan aman, kadang pilihan berani, tergantung kemungkinan yang paling cocok bagi teman itu.", "menyesuaikan pilihan dengan kebutuhan orang lain"),
  makeCore("core_ne_flexible_03", "Ne", "flexible", "study", "Tugas masih sangat terbuka", "Saya cukup nyaman memperlebar pilihan di awal, lalu mempersempitnya setelah tujuan tugas mulai jelas.", "membuka lalu menyaring kemungkinan sesuai tujuan"),
  makeCore("core_ne_mask_01", "Ne", "mask", "work", "Rapat menuntut ide yang unik", "Saya pernah memaksa diri melempar banyak gagasan agar terlihat kreatif, meskipun sebenarnya kepala saya sudah lelah dan ingin memakai cara yang pasti.", "menampilkan kreativitas karena tuntutan suasana"),
  makeCore("core_ne_mask_02", "Ne", "mask", "public", "Diminta menjadi orang paling inovatif", "Ketika orang berharap saya selalu punya terobosan, saya berusaha terlihat penuh ide walau prosesnya terasa seperti pertunjukan.", "berusaha tampak penuh kemungkinan demi citra"),
  makeCore("core_ne_mask_03", "Ne", "mask", "study", "Presentasi harus terlihat berbeda", "Saya kadang menambahkan ide yang tidak biasa hanya agar tugas tampak kreatif, bukan karena ide itu benar-benar muncul dengan alami.", "menambahkan kebaruan karena merasa seharusnya"),
  makeCore("core_ne_threat_01", "Ne", "threat", "time_pressure", "Diminta memberi banyak alternatif saat itu juga", "Ketika harus menghasilkan beberapa pilihan dalam hitungan detik dan semuanya dinilai, pikiran saya dapat mendadak buntu atau defensif.", "menghadapi tuntutan menghasilkan banyak alternatif secara cepat"),
  makeCore("core_ne_threat_02", "Ne", "threat", "work", "Semua usulan ditolak dan diminta mencari lagi", "Saya merasa makin tertekan ketika setiap pilihan dibantah tetapi saya tetap dituntut terus menciptakan kemungkinan baru.", "terus menghasilkan kemungkinan setelah berulang kali ditolak"),
  makeCore("core_ne_threat_03", "Ne", "threat", "new_situation", "Tidak ada petunjuk dan jawaban pasti", "Situasi yang sepenuhnya terbuka tanpa pegangan dapat membuat saya gelisah karena saya harus menciptakan jalan dari nol.", "menemukan kemungkinan tanpa pegangan yang jelas"),
  makeCore("core_ne_receiver_01", "Ne", "receiver", "friendship", "Masalah terasa tidak punya jalan keluar", "Saya merasa sangat terbantu ketika seseorang menunjukkan sudut pandang baru yang membuat pilihan yang tadinya tertutup kembali terlihat.", "menerima sudut pandang baru dari orang lain"),
  makeCore("core_ne_receiver_02", "Ne", "receiver", "work", "Proyek tersangkut pada cara lama", "Orang yang datang membawa alternatif segar membuat beban saya terasa lebih ringan dan memberi energi untuk mencoba lagi.", "menerima alternatif segar saat cara lama buntu"),
  makeCore("core_ne_receiver_03", "Ne", "receiver", "private", "Merasa kemampuan diri mentok", "Saya lega ketika seseorang bisa melihat potensi yang belum saya sadari dan menunjukkan apa lagi yang mungkin saya kembangkan.", "menerima pembacaan potensi yang belum terlihat"),
  makeCore("core_ne_aspiration_01", "Ne", "aspiration", "public", "Mendapat komentar tentang cara berpikir", "Pujian bahwa saya mampu melihat kemungkinan yang tidak biasa terasa sangat berarti dan ingin saya buktikan lagi.", "diakui karena melihat kemungkinan yang tidak biasa"),
  makeCore("core_ne_aspiration_02", "Ne", "aspiration", "study", "Belajar bidang baru", "Saya ingin menjadi orang yang lebih terbuka terhadap banyak kemungkinan tanpa cepat menutup ide yang belum dikenal.", "berkembang dalam menjelajahi kemungkinan"),
  makeCore("core_ne_aspiration_03", "Ne", "aspiration", "work", "Mengusulkan jalan yang belum dicoba", "Pengakuan bahwa hubungan ide yang saya lihat ternyata berguna dapat membuat saya sangat bersemangat.", "dihargai karena menghubungkan ide secara orisinal"),
  makeCore("core_ne_dismissive_01", "Ne", "dismissive", "decision", "Ada terlalu banyak pilihan", "Saya bisa memikirkan beberapa alternatif, tetapi setelah satu jalan terasa cukup, saya cenderung menutup pilihan lain agar urusan tidak melebar.", "mampu melihat alternatif tetapi memilih segera menutupnya"),
  makeCore("core_ne_dismissive_02", "Ne", "dismissive", "work", "Sesi curah gagasan terlalu panjang", "Saya mampu ikut menghasilkan ide, namun cepat merasa pembahasan kemungkinan tanpa keputusan nyata sudah tidak penting.", "menghentikan eksplorasi kemungkinan yang terlalu lama"),
  makeCore("core_ne_dismissive_03", "Ne", "dismissive", "private", "Muncul gagasan baru saat sibuk", "Ide baru sering sempat terlihat, tetapi saya menyisihkannya tanpa banyak rasa kehilangan agar fokus utama tidak terganggu.", "menyisihkan kemungkinan yang tidak dianggap utama"),
  makeCore("core_ne_background_01", "Ne", "background", "general", "Melihat cara orang melakukan sesuatu", "Tanpa sengaja saya sering menangkap bahwa benda, aturan, atau kebiasaan yang sama sebenarnya dapat dipakai dengan cara lain.", "menangkap kemungkinan lain secara diam-diam"),
  makeCore("core_ne_background_02", "Ne", "background", "friendship", "Teman menceritakan rencana", "Saya kadang langsung melihat beberapa arah yang bisa berkembang dari ceritanya, tetapi tidak selalu merasa perlu mengatakannya.", "melihat cabang kemungkinan tanpa menjadikannya pusat perhatian"),
  makeCore("core_ne_background_03", "Ne", "background", "work", "Alat yang tersedia tidak sesuai kebutuhan", "Saya sering menemukan kegunaan alternatif secara spontan dan langsung memakainya tanpa menganggap hal itu sebagai ide besar.", "menggunakan alternatif dengan lancar tanpa mencari pengakuan"),
  makeCore("core_ni_producer_01", "Ni", "producer", "decision", "Beberapa kejadian terasa saling berkaitan", "Setelah melihat potongan yang terpisah, pikiran saya sering mengerucut pada satu arah tentang bagaimana situasi ini akan berkembang.", "mengerucutkan kejadian menjadi satu arah perkembangan"),
  makeCore("core_ni_producer_02", "Ni", "producer", "private", "Mengingat perjalanan beberapa bulan terakhir", "Saya spontan membaca fase yang sedang saya jalani dan merasakan apakah sesuatu sedang matang, menurun, atau belum waktunya.", "merasakan fase dan kematangan suatu proses"),
  makeCore("core_ni_producer_03", "Ni", "producer", "group", "Banyak orang memberi pendapat berbeda", "Di tengah detail yang ramai, saya sering menangkap satu tema utama yang menjelaskan ke mana pembahasan sebenarnya bergerak.", "menangkap tema dan arah di balik banyak detail"),
  makeCore("core_ni_flexible_01", "Ni", "flexible", "work", "Waktu pelaksanaan perlu diubah", "Saya cukup nyaman menggeser urutan atau momentum tindakan supaya rencana utama tetap berjalan pada saat yang lebih tepat.", "menyesuaikan waktu dan urutan demi tujuan"),
  makeCore("core_ni_flexible_02", "Ni", "flexible", "friendship", "Teman ingin mengambil keputusan besar", "Saya bisa menyesuaikan cara menjelaskan kemungkinan perkembangan agar teman memahami kapan sebaiknya menunggu dan kapan bergerak.", "menyesuaikan pembacaan arah untuk membantu keputusan orang lain"),
  makeCore("core_ni_flexible_03", "Ni", "flexible", "new_situation", "Keadaan berubah perlahan", "Saya dapat memperbarui gambaran arah ketika tanda-tanda baru muncul, tanpa kehilangan benang merah keseluruhan.", "memperbarui arah sambil menjaga tema utama"),
  makeCore("core_ni_mask_01", "Ni", "mask", "work", "Diminta memberi visi lima tahun", "Saya pernah menyusun narasi masa depan yang terdengar meyakinkan karena jabatan menuntutnya, padahal saya belum benar-benar melihat arahnya.", "menampilkan visi karena tuntutan peran"),
  makeCore("core_ni_mask_02", "Ni", "mask", "public", "Orang menunggu ramalan yang pasti", "Saya kadang berbicara seolah tahu bagaimana semuanya akan berakhir agar terlihat berwawasan, meski batin saya masih ragu.", "berusaha tampak mampu membaca arah"),
  makeCore("core_ni_mask_03", "Ni", "mask", "study", "Presentasi harus memuat prediksi", "Saya dapat memaksakan kesimpulan jangka panjang dari sedikit data hanya karena tugas mengharuskan ada proyeksi.", "membuat proyeksi karena merasa seharusnya"),
  makeCore("core_ni_threat_01", "Ni", "threat", "time_pressure", "Harus menentukan saat yang tepat seketika", "Saya dapat membeku ketika dituntut memastikan waktu dan arah perkembangan tanpa diberi ruang untuk mengamati lebih dulu.", "menentukan waktu dan arah di bawah tekanan"),
  makeCore("core_ni_threat_02", "Ni", "threat", "work", "Diminta menjamin hasil jangka panjang", "Tuntutan untuk menjelaskan secara pasti bagaimana keadaan akan berkembang membuat saya takut memberi arah yang keliru.", "menjamin arah masa depan secara pasti"),
  makeCore("core_ni_threat_03", "Ni", "threat", "conflict", "Semua orang mendesak keputusan sekarang", "Saya merasa terpojok ketika harus membaca momentum di tengah desakan yang tidak memberi waktu untuk memahami alurnya.", "membaca momentum ketika didesak"),
  makeCore("core_ni_receiver_01", "Ni", "receiver", "private", "Arah hidup terasa kabur", "Saya sangat lega ketika seseorang membantu merangkai kejadian yang berantakan menjadi satu arah yang terasa masuk akal.", "menerima gambaran arah yang menyatukan kejadian"),
  makeCore("core_ni_receiver_02", "Ni", "receiver", "work", "Tidak tahu kapan harus bergerak", "Nasihat mengenai momentum—kapan menunggu dan kapan mulai—dapat membuat saya jauh lebih tenang.", "menerima bantuan mengenai waktu yang tepat"),
  makeCore("core_ni_receiver_03", "Ni", "receiver", "friendship", "Terjebak pada fase yang membingungkan", "Saya mudah percaya pada orang yang mampu menunjukkan bahwa keadaan ini adalah bagian dari proses yang masih berkembang.", "menerima konteks perkembangan dari orang lain"),
  makeCore("core_ni_aspiration_01", "Ni", "aspiration", "public", "Orang menilai cara saya melihat keadaan", "Pujian bahwa saya mampu menangkap arah sebelum orang lain menyadarinya terasa sangat mengena.", "diakui karena menangkap arah perkembangan"),
  makeCore("core_ni_aspiration_02", "Ni", "aspiration", "study", "Mempelajari sejarah atau tren", "Saya ingin lebih mahir memahami bagaimana satu fase berubah menjadi fase berikutnya tanpa terjebak pada detail terpisah.", "berkembang dalam membaca perkembangan dari waktu ke waktu"),
  makeCore("core_ni_aspiration_03", "Ni", "aspiration", "decision", "Rencana besar mulai terbentuk", "Saya ingin dipercaya sebagai orang yang tahu kapan sebuah langkah sudah matang untuk dijalankan.", "diakui karena kepekaan terhadap momentum"),
  makeCore("core_ni_dismissive_01", "Ni", "dismissive", "work", "Arah masalah sudah terlihat", "Saya kadang sudah memperkirakan bagaimana situasi akan berkembang, tetapi memilih tidak membahasnya karena sekarang perlu tindakan konkret.", "melihat arah tetapi sengaja tidak menjadikannya fokus"),
  makeCore("core_ni_dismissive_02", "Ni", "dismissive", "private", "Pikiran mulai membentuk makna panjang", "Saya bisa mengikuti benang merah yang dalam, lalu sengaja memutusnya ketika merasa perenungan itu tidak lagi membantu.", "menghentikan pembacaan makna yang dianggap tidak perlu"),
  makeCore("core_ni_dismissive_03", "Ni", "dismissive", "group", "Diskusi terus membahas kemungkinan masa depan", "Saya mampu melihat implikasi jangka panjang, tetapi cepat bosan jika kelompok terus berputar pada prediksi tanpa keputusan.", "membatasi pembahasan arah yang terlalu panjang"),
  makeCore("core_ni_background_01", "Ni", "background", "general", "Jadwal berubah sedikit demi sedikit", "Saya sering menyesuaikan langkah sebelum masalah benar-benar muncul karena secara samar sudah merasakan arah perubahannya.", "mengantisipasi arah secara diam-diam"),
  makeCore("core_ni_background_02", "Ni", "background", "friendship", "Cerita teman berkembang dari waktu ke waktu", "Saya mudah mengingat alur ceritanya dan diam-diam menangkap fase apa yang sedang ia lewati.", "mengikuti alur perkembangan tanpa banyak menjelaskan"),
  makeCore("core_ni_background_03", "Ni", "background", "work", "Proyek panjang berjalan beberapa tahap", "Saya sering tahu bagian mana yang belum matang dan menunggu waktu yang lebih pas tanpa menganggapnya kemampuan khusus.", "merasakan kematangan dan timing secara otomatis"),
  makeCore("core_se_producer_01", "Se", "producer", "conflict", "Batas pribadi dilanggar", "Ketika seseorang melewati batas yang jelas, saya spontan menegur dan menunjukkan sampai mana ia boleh bertindak.", "menetapkan batas secara langsung"),
  makeCore("core_se_producer_02", "Se", "producer", "work", "Hambatan nyata menghentikan pekerjaan", "Saya cenderung segera turun tangan, mengerahkan sumber yang ada, dan membuat keadaan kembali bergerak.", "mengambil tindakan nyata terhadap hambatan"),
  makeCore("core_se_producer_03", "Se", "producer", "decision", "Kesempatan hanya terbuka sebentar", "Saat peluang harus direbut sekarang, saya cepat menentukan langkah dan berani mengambil ruang yang tersedia.", "merebut momentum melalui tindakan tegas"),
  makeCore("core_se_flexible_01", "Se", "flexible", "group", "Tim butuh dorongan berbeda", "Saya cukup nyaman mengatur kadar tekanan: kadang tegas, kadang memberi ruang, sesuai kekuatan yang dibutuhkan kelompok.", "menyesuaikan tekanan untuk menggerakkan orang"),
  makeCore("core_se_flexible_02", "Se", "flexible", "work", "Negosiasi mulai keras", "Saya dapat menaikkan atau menurunkan ketegasan tanpa kehilangan tujuan utama yang ingin dicapai.", "mengatur ketegasan sesuai tujuan"),
  makeCore("core_se_flexible_03", "Se", "flexible", "family", "Anggota keluarga sulit mengambil tindakan", "Saya bisa mengambil alih sementara, lalu mengembalikan kendali ketika mereka sudah siap.", "menggunakan kendali secara situasional"),
  makeCore("core_se_mask_01", "Se", "mask", "public", "Peran mengharuskan tampil kuat", "Saya pernah memasang sikap keras dan dominan agar tidak diremehkan, meskipun mempertahankannya terasa melelahkan.", "menampilkan kekuatan karena tuntutan citra"),
  makeCore("core_se_mask_02", "Se", "mask", "work", "Atasan mengharapkan pemimpin yang galak", "Saya dapat memaksa nada tegas dan memberi perintah hanya karena merasa itulah gaya yang dianggap pantas.", "memainkan ketegasan karena tuntutan jabatan"),
  makeCore("core_se_mask_03", "Se", "mask", "conflict", "Tidak ingin terlihat lemah", "Saya kadang membalas lebih keras daripada yang sebenarnya saya inginkan agar orang lain tidak menganggap saya mudah ditekan.", "memperagakan perlawanan untuk melindungi citra"),
  makeCore("core_se_threat_01", "Se", "threat", "conflict", "Harus menghadapi orang yang agresif", "Konfrontasi langsung yang menuntut saya mempertahankan posisi dapat membuat tubuh saya kaku, defensif, atau ingin keluar.", "menghadapi adu kekuatan langsung"),
  makeCore("core_se_threat_02", "Se", "threat", "public", "Diminta memimpin dengan keras", "Saya sangat tertekan jika harus menguasai ruangan dan memberi instruksi tegas sementara semua mata menilai keberanian saya.", "mengambil kendali di bawah penilaian orang lain"),
  makeCore("core_se_threat_03", "Se", "threat", "time_pressure", "Harus bertindak sebelum sempat berpikir", "Desakan untuk segera menekan, merebut, atau memutuskan dapat membuat saya takut salah menggunakan kekuatan.", "menggunakan kekuatan secara cepat"),
  makeCore("core_se_receiver_01", "Se", "receiver", "friendship", "Ada orang lain menekan saya", "Saya merasa sangat lega ketika teman dengan tenang memasang batas dan menghentikan tekanan itu tanpa banyak ragu.", "menerima perlindungan dan batas yang tegas"),
  makeCore("core_se_receiver_02", "Se", "receiver", "work", "Keadaan kacau tanpa pemimpin", "Kehadiran orang yang berani mengambil keputusan dan membagi tindakan membuat saya merasa lebih aman.", "menerima arah tindakan yang tegas"),
  makeCore("core_se_receiver_03", "Se", "receiver", "family", "Masalah nyata terus dibiarkan", "Saya terbantu ketika seseorang berhenti berdebat dan langsung mengurus bagian yang memang harus dibereskan.", "menerima tindakan langsung dari orang lain"),
  makeCore("core_se_aspiration_01", "Se", "aspiration", "public", "Mendapat penilaian tentang keberanian", "Pujian bahwa saya berani menjaga batas dan tidak mudah ditekan terasa sangat berarti.", "diakui karena keberanian dan ketegasan"),
  makeCore("core_se_aspiration_02", "Se", "aspiration", "work", "Belajar memegang tanggung jawab", "Saya ingin lebih mampu mengambil keputusan sulit tanpa kehilangan wibawa ketika keadaan memanas.", "berkembang dalam ketegasan dan kepemimpinan"),
  makeCore("core_se_aspiration_03", "Se", "aspiration", "private", "Melatih keberanian diri", "Saya ingin membuktikan bahwa saya bisa berdiri untuk diri sendiri dan tidak selalu mundur saat menghadapi tekanan.", "membangun keberanian mempertahankan diri"),
  makeCore("core_se_dismissive_01", "Se", "dismissive", "work", "Masalah sudah bisa dikendalikan", "Saya mampu mengambil alih dan menekan hambatan, tetapi segera melepaskan kendali setelah hasil pokok tercapai.", "mampu mengendalikan tetapi tidak ingin terus memegang kuasa"),
  makeCore("core_se_dismissive_02", "Se", "dismissive", "conflict", "Perdebatan mulai menjadi perebutan posisi", "Saya bisa menunjukkan kekuatan bila perlu, namun menganggap adu dominasi berkepanjangan sebagai pemborosan energi.", "membatasi penggunaan kekuatan yang berlebihan"),
  makeCore("core_se_dismissive_03", "Se", "dismissive", "group", "Orang menunggu saya terus memimpin", "Saya dapat mengarahkan kelompok, tetapi tidak suka jika semua urusan akhirnya bergantung pada kendali saya.", "menggunakan kepemimpinan lalu mengembalikannya"),
  makeCore("core_se_background_01", "Se", "background", "general", "Ruang atau antrean mulai tidak tertib", "Saya sering secara otomatis mengambil posisi yang membuat batas lebih jelas tanpa perlu mengumumkan bahwa saya sedang mengatur.", "menjaga batas fisik secara diam-diam"),
  makeCore("core_se_background_02", "Se", "background", "family", "Ada urusan praktis yang terus tertunda", "Saya bisa langsung mengangkat, memindahkan, menghubungi, atau membereskan hal yang menghambat tanpa banyak bicara.", "membereskan hambatan nyata secara otomatis"),
  makeCore("core_se_background_03", "Se", "background", "work", "Sumber daya terbatas", "Saya cepat melihat apa yang masih bisa digunakan dan mengalokasikannya agar pekerjaan tetap bergerak.", "mengatur sumber daya dengan spontan"),
  makeCore("core_si_producer_01", "Si", "producer", "body", "Tubuh mulai memberi tanda halus", "Saya cepat menyadari perubahan kecil seperti tegang, terlalu panas, lapar, atau lelah sebelum keluhan itu menjadi berat.", "menyadari kondisi tubuh secara spontan"),
  makeCore("core_si_producer_02", "Si", "producer", "private", "Ruangan terasa kurang enak ditempati", "Saya otomatis memperhatikan cahaya, suhu, posisi duduk, atau kebisingan lalu menyesuaikannya agar terasa lebih pas.", "menyetel kenyamanan indrawi secara spontan"),
  makeCore("core_si_producer_03", "Si", "producer", "general", "Aktivitas berlangsung terlalu lama", "Saya spontan mengatur ritme, jeda, dan cara bergerak supaya tenaga tetap stabil dan tubuh tidak dipaksa berlebihan.", "menjaga ritme dan keseimbangan fisik"),
  makeCore("core_si_flexible_01", "Si", "flexible", "work", "Pekerjaan panjang perlu tetap nyaman", "Saya mudah menyesuaikan pencahayaan, posisi, jeda, atau urutan kerja agar orang dapat bertahan tanpa kehilangan fokus.", "menyesuaikan kondisi fisik demi tujuan kerja"),
  makeCore("core_si_flexible_02", "Si", "flexible", "friendship", "Teman tampak tidak nyaman", "Saya cukup luwes mengubah tempat, makanan, atau tempo kegiatan sesuai kebutuhan tubuh orang yang bersama saya.", "menyesuaikan kenyamanan untuk orang lain"),
  makeCore("core_si_flexible_03", "Si", "flexible", "body", "Kondisi badan berubah", "Saya dapat mengganti intensitas aktivitas, makanan, atau istirahat berdasarkan sinyal tubuh saat itu.", "menyesuaikan kebiasaan dengan kondisi tubuh"),
  makeCore("core_si_mask_01", "Si", "mask", "family", "Diharapkan menjadi tuan rumah yang sempurna", "Saya pernah sibuk menata hidangan dan kenyamanan tamu karena takut dianggap tidak perhatian, walau sebenarnya sudah terkuras.", "menampilkan perhatian fisik karena tuntutan kepantasan"),
  makeCore("core_si_mask_02", "Si", "mask", "work", "Lingkungan harus terlihat rapi dan nyaman", "Saya dapat memaksakan diri mengurus detail kenyamanan supaya tampak profesional, bukan karena saya menikmati prosesnya.", "merawat kenyamanan demi citra profesional"),
  makeCore("core_si_mask_03", "Si", "mask", "public", "Orang menilai penampilan dan kerapian", "Saya kadang terlalu mengatur tampilan fisik agar terlihat pantas, meskipun perhatian pada detail itu terasa seperti beban.", "menampilkan kerapian indrawi karena penilaian sosial"),
  makeCore("core_si_threat_01", "Si", "threat", "body", "Diminta memantau banyak sensasi tubuh", "Tuntutan untuk terus menjelaskan apa yang terasa di tubuh dapat membuat saya bingung, kesal, atau ingin mengabaikannya.", "memantau sensasi tubuh secara rinci di bawah tuntutan"),
  makeCore("core_si_threat_02", "Si", "threat", "family", "Orang lain mengkritik cara saya makan dan beristirahat", "Komentar yang terus mengatur kenyamanan fisik saya dapat terasa sangat mengusik dan membuat saya defensif.", "menghadapi tuntutan pada kebiasaan fisik pribadi"),
  makeCore("core_si_threat_03", "Si", "threat", "work", "Harus menjamin semua orang selalu nyaman", "Saya tertekan ketika diminta mengendalikan setiap detail suhu, makanan, kebersihan, dan kenyamanan tanpa ada kesalahan.", "bertanggung jawab atas seluruh detail kenyamanan"),
  makeCore("core_si_receiver_01", "Si", "receiver", "body", "Kondisi fisik sedang menurun", "Saya merasa sangat lega ketika seseorang membantu menyiapkan makanan, obat, tempat istirahat, atau suasana yang benar-benar nyaman.", "menerima perawatan fisik yang tepat"),
  makeCore("core_si_receiver_02", "Si", "receiver", "work", "Ruangan membuat sulit berkonsentrasi", "Orang yang peka mengubah cahaya, suhu, atau posisi kerja dapat langsung membuat saya lebih tenang dan produktif.", "menerima penyesuaian lingkungan yang nyaman"),
  makeCore("core_si_receiver_03", "Si", "receiver", "friendship", "Hari terasa melelahkan", "Ajakan untuk makan enak, beristirahat, atau menikmati suasana tenang sering membantu saya kembali merasa utuh.", "menerima pengalaman indrawi yang menenangkan"),
  makeCore("core_si_aspiration_01", "Si", "aspiration", "public", "Orang menikmati suasana yang saya siapkan", "Pujian bahwa saya membuat tempat terasa nyaman dan enak ditempati memberi kepuasan yang cukup dalam.", "diakui karena menciptakan kenyamanan"),
  makeCore("core_si_aspiration_02", "Si", "aspiration", "body", "Belajar merawat diri", "Saya ingin lebih mahir membaca kebutuhan tubuh tanpa menunggu sampai kelelahan atau sakit.", "berkembang dalam merawat keseimbangan tubuh"),
  makeCore("core_si_aspiration_03", "Si", "aspiration", "family", "Menyiapkan rumah untuk orang terdekat", "Saya ingin menjadi orang yang tahu cara membuat orang lain merasa diterima secara fisik dan tenang.", "dihargai karena perhatian pada kenyamanan orang"),
  makeCore("core_si_dismissive_01", "Si", "dismissive", "work", "Tubuh mulai sedikit tidak nyaman", "Saya sering menyadari rasa lelah atau posisi yang kurang enak, tetapi menyingkirkannya agar pekerjaan utama tetap selesai.", "menyadari ketidaknyamanan lalu mengabaikannya"),
  makeCore("core_si_dismissive_02", "Si", "dismissive", "decision", "Pilihan nyaman bertentangan dengan target", "Saya bisa menemukan pilihan yang lebih enak bagi tubuh, namun tidak keberatan mengorbankannya ketika ada tujuan yang lebih penting.", "mampu mengatur kenyamanan tetapi tidak memprioritaskannya"),
  makeCore("core_si_dismissive_03", "Si", "dismissive", "private", "Lingkungan belum benar-benar pas", "Saya tahu bagian mana yang perlu disesuaikan, tetapi dapat membiarkannya karena merasa detail kenyamanan tidak perlu dibesar-besarkan.", "membatasi perhatian pada detail kenyamanan"),
  makeCore("core_si_background_01", "Si", "background", "general", "Masuk ke ruangan baru", "Tanpa banyak berpikir saya sering memilih tempat duduk, suhu, atau posisi yang membuat aktivitas terasa lebih lancar.", "menemukan kenyamanan yang pas secara otomatis"),
  makeCore("core_si_background_02", "Si", "background", "friendship", "Teman tampak lelah saat berkunjung", "Saya kerap mengambilkan air, mengubah tempat duduk, atau memperlambat tempo tanpa menganggapnya perhatian khusus.", "merawat kenyamanan orang secara diam-diam"),
  makeCore("core_si_background_03", "Si", "background", "work", "Meja kerja mulai membuat badan pegal", "Saya spontan mengubah posisi alat atau ritme kerja agar tubuh tetap seimbang, lalu melanjutkan tanpa banyak membahasnya.", "menyetel kondisi fisik sebagai kebiasaan latar"),
  makeCore("core_te_producer_01", "Te", "producer", "decision", "Membandingkan beberapa pilihan barang", "Saya spontan mencari informasi tentang harga, ketahanan, hasil nyata, dan cara pakai sebelum menentukan pilihan.", "membandingkan fakta praktis untuk mengambil keputusan"),
  makeCore("core_te_producer_02", "Te", "producer", "work", "Pekerjaan terasa lebih lambat dari seharusnya", "Saya cepat melihat langkah yang tidak perlu dan mencoba cara yang lebih ringkas agar hasil tetap tercapai.", "meningkatkan kepraktisan dan efektivitas"),
  makeCore("core_te_producer_03", "Te", "producer", "new_situation", "Harus memakai alat yang belum dikenal", "Saya cenderung mencari petunjuk yang bisa langsung dicoba, lalu menguji apakah cara itu benar-benar bekerja.", "mencari dan menguji cara yang dapat dipakai"),
  makeCore("core_te_flexible_01", "Te", "flexible", "work", "Sumber daya berubah di tengah proyek", "Saya cukup nyaman mengganti metode, alat, atau urutan berdasarkan waktu dan biaya yang benar-benar tersedia.", "menyesuaikan metode dengan sumber daya nyata"),
  makeCore("core_te_flexible_02", "Te", "flexible", "friendship", "Teman meminta bantuan praktis", "Saya bisa mengubah penjelasan menjadi langkah sederhana yang sesuai kemampuan dan alat yang dimiliki teman itu.", "menyesuaikan langkah praktis untuk orang lain"),
  makeCore("core_te_flexible_03", "Te", "flexible", "study", "Teori perlu diterapkan", "Saya mudah memilih bagian informasi yang paling berguna lalu mengubahnya menjadi prosedur yang dapat dicoba.", "mengubah informasi menjadi langkah yang berguna"),
  makeCore("core_te_mask_01", "Te", "mask", "work", "Rapat penuh angka dan indikator", "Saya pernah menampilkan diri seolah sangat menguasai data dan produktivitas agar tampak kompeten, padahal saya sedang mengejar-ngejar pemahaman.", "menampilkan kompetensi praktis demi citra"),
  makeCore("core_te_mask_02", "Te", "mask", "public", "Harus terlihat selalu produktif", "Saya kadang membuat daftar, angka, atau laporan hanya supaya terlihat bekerja efektif, bukan karena alat itu benar-benar membantu.", "memperagakan produktivitas karena tuntutan sosial"),
  makeCore("core_te_mask_03", "Te", "mask", "study", "Tugas harus terlihat berbasis bukti", "Saya dapat menambahkan banyak sumber dan angka agar karya tampak meyakinkan meski belum sempat memeriksa kegunaan semuanya.", "menampilkan bukti karena merasa seharusnya"),
  makeCore("core_te_threat_01", "Te", "threat", "time_pressure", "Harus memberi angka dan fakta dengan cepat", "Saya dapat panik ketika dituntut menyebut data yang tepat saat itu juga dan takut memberikan informasi yang tidak akurat.", "memberikan fakta tepat di bawah tekanan"),
  makeCore("core_te_threat_02", "Te", "threat", "work", "Kinerja diukur terus-menerus", "Tuntutan untuk membuktikan efisiensi setiap langkah dengan angka dapat membuat saya defensif atau kehilangan fokus.", "mempertanggungjawabkan efisiensi secara rinci"),
  makeCore("core_te_threat_03", "Te", "threat", "new_situation", "Alat rusak dan harus segera diperbaiki", "Saya tertekan ketika harus menemukan cara teknis yang bekerja tanpa petunjuk atau bantuan yang jelas.", "menangani masalah teknis tanpa pegangan"),
  makeCore("core_te_receiver_01", "Te", "receiver", "work", "Tugas terasa membingungkan", "Saya sangat terbantu ketika seseorang memberi langkah yang sudah teruji, contoh nyata, dan urutan kerja yang jelas.", "menerima prosedur praktis yang teruji"),
  makeCore("core_te_receiver_02", "Te", "receiver", "decision", "Informasi saling bertentangan", "Orang yang menunjukkan sumber tepercaya dan membedakan mana fakta dengan dugaan membuat saya jauh lebih tenang.", "menerima fakta yang dapat dipercaya"),
  makeCore("core_te_receiver_03", "Te", "receiver", "private", "Tidak tahu cara memakai sesuatu", "Demonstrasi langsung dari orang yang berpengalaman sering terasa lebih melegakan daripada penjelasan panjang.", "menerima contoh penggunaan yang langsung bisa ditiru"),
  makeCore("core_te_aspiration_01", "Te", "aspiration", "public", "Hasil kerja dinilai orang lain", "Pujian bahwa saya bekerja efektif dan menghasilkan sesuatu yang benar-benar berguna terasa sangat memuaskan.", "diakui karena hasil praktis yang efektif"),
  makeCore("core_te_aspiration_02", "Te", "aspiration", "study", "Mempelajari keterampilan baru", "Saya ingin menjadi lebih cakap memilih metode yang terbukti dan tidak membuang waktu pada cara yang tidak bekerja.", "berkembang dalam keterampilan praktis"),
  makeCore("core_te_aspiration_03", "Te", "aspiration", "work", "Proyek berhasil disederhanakan", "Pengakuan bahwa saya membuat proses lebih cepat atau lebih hemat dapat mendorong saya bekerja jauh lebih keras.", "dihargai karena memperbaiki efisiensi"),
  makeCore("core_te_dismissive_01", "Te", "dismissive", "work", "Proses sudah cukup berjalan", "Saya mampu terus mengoptimalkan angka dan langkah, tetapi memilih berhenti ketika hasilnya sudah memadai.", "membatasi optimasi setelah hasil cukup"),
  makeCore("core_te_dismissive_02", "Te", "dismissive", "decision", "Ada banyak data tambahan", "Saya bisa mencari fakta lebih jauh, namun sering menganggap tambahan informasi tidak penting jika keputusan sudah dapat dibuat.", "menghentikan pencarian fakta yang dianggap berlebihan"),
  makeCore("core_te_dismissive_03", "Te", "dismissive", "friendship", "Orang membahas cara paling efisien terlalu lama", "Saya memahami pembahasannya, tetapi cepat merasa hidup tidak perlu diubah menjadi perhitungan untung-rugi terus-menerus.", "mampu berpikir praktis tetapi menolak menjadikannya pusat"),
  makeCore("core_te_background_01", "Te", "background", "general", "Menjalani kegiatan harian", "Saya sering merapikan urutan langkah atau memilih alat yang lebih berguna tanpa sadar bahwa orang lain menganggapnya efisien.", "menyederhanakan cara kerja secara otomatis"),
  makeCore("core_te_background_02", "Te", "background", "friendship", "Teman kesulitan melakukan hal praktis", "Saya biasanya langsung menunjukkan cara yang lebih mudah atau membantu memperbaikinya tanpa banyak teori.", "memberi solusi praktis secara diam-diam"),
  makeCore("core_te_background_03", "Te", "background", "work", "Ada informasi yang perlu diperiksa", "Saya spontan mengecek sumber, hasil, atau cara kerja sebelum meneruskannya, lalu menganggap itu hal biasa.", "memverifikasi kegunaan dan fakta sebagai kebiasaan latar"),
  makeCore("core_ti_producer_01", "Ti", "producer", "study", "Membaca penjelasan yang rumit", "Saya spontan mencari definisi, hubungan antarbagian, dan aturan yang membuat keseluruhan penjelasan konsisten.", "menyusun struktur logis dari informasi"),
  makeCore("core_ti_producer_02", "Ti", "producer", "group", "Orang memakai istilah yang berbeda-beda", "Saya cepat menyadari bahwa pembahasan kacau karena arti kata atau kategori belum disepakati.", "menjernihkan definisi dan kategori"),
  makeCore("core_ti_producer_03", "Ti", "producer", "decision", "Aturan menghasilkan keputusan yang janggal", "Saya cenderung memeriksa apakah prinsip yang dipakai benar-benar konsisten untuk semua kasus.", "memeriksa konsistensi aturan"),
  makeCore("core_ti_flexible_01", "Ti", "flexible", "work", "Sistem lama tidak lagi cocok", "Saya cukup nyaman menata ulang kategori atau hubungan aturan agar sistem tetap jelas tanpa kehilangan inti.", "menyesuaikan kerangka untuk menjaga kejelasan"),
  makeCore("core_ti_flexible_02", "Ti", "flexible", "friendship", "Teman bingung memahami persoalan", "Saya bisa mengganti cara menjelaskan—memakai analogi, urutan, atau batas konsep—hingga hubungan masalahnya terlihat.", "menyesuaikan struktur penjelasan untuk orang lain"),
  makeCore("core_ti_flexible_03", "Ti", "flexible", "study", "Banyak konsep perlu dihubungkan", "Saya mudah memilih kerangka yang berbeda sesuai pertanyaan yang sedang ingin dijawab.", "menggunakan kerangka secara fleksibel"),
  makeCore("core_ti_mask_01", "Ti", "mask", "public", "Lingkungan menghargai orang yang sangat logis", "Saya pernah berbicara dengan istilah formal dan aturan kaku agar tampak rasional, meskipun sebenarnya saya belum nyaman dengan kerangkanya.", "menampilkan logika formal demi citra"),
  makeCore("core_ti_mask_02", "Ti", "mask", "work", "Harus membuat prosedur yang tampak rapi", "Saya kadang menyusun bagan dan kategori hanya supaya pekerjaan terlihat terstruktur, bukan karena sistem itu benar-benar membantu.", "memperagakan keteraturan karena tuntutan peran"),
  makeCore("core_ti_mask_03", "Ti", "mask", "study", "Dosen menuntut definisi yang sangat ketat", "Saya dapat memaksakan bahasa teoritis agar terlihat menguasai materi walau prosesnya terasa berat dan tidak alami.", "menampilkan ketepatan konsep karena merasa seharusnya"),
  makeCore("core_ti_threat_01", "Ti", "threat", "time_pressure", "Harus membuktikan konsistensi saat itu juga", "Saya dapat nge-blank ketika didesak menjelaskan setiap definisi dan hubungan logis tanpa waktu menyusun pikiran.", "membuktikan struktur logis di bawah tekanan"),
  makeCore("core_ti_threat_02", "Ti", "threat", "work", "Aturan saling bertentangan dan saya diminta memutuskan", "Situasi yang menuntut saya membangun sistem sempurna dari aturan yang kacau dapat membuat saya sangat tertekan.", "merapikan aturan yang saling bertentangan"),
  makeCore("core_ti_threat_03", "Ti", "threat", "public", "Kesalahan kecil dalam penalaran disorot", "Koreksi terus-menerus terhadap istilah dan logika saya dapat memicu malu, defensif, atau keinginan berhenti bicara.", "menghadapi penilaian atas ketepatan logika"),
  makeCore("core_ti_receiver_01", "Ti", "receiver", "study", "Materi terasa berantakan", "Saya merasa lega ketika seseorang menyusun konsep ke dalam kerangka yang jelas sehingga hubungan antarbagian mudah diikuti.", "menerima kerangka yang menjernihkan konsep"),
  makeCore("core_ti_receiver_02", "Ti", "receiver", "work", "Aturan kerja membingungkan", "Orang yang mampu merumuskan batas, peran, dan alur secara konsisten membuat saya jauh lebih tenang.", "menerima aturan dan struktur yang jelas"),
  makeCore("core_ti_receiver_03", "Ti", "receiver", "decision", "Banyak pendapat tidak sejalan", "Saya terbantu ketika seseorang menunjukkan prinsip inti yang dapat dipakai untuk membandingkan semua pilihan secara adil.", "menerima prinsip pembanding yang konsisten"),
  makeCore("core_ti_aspiration_01", "Ti", "aspiration", "public", "Cara berpikir saya dinilai", "Pujian bahwa penjelasan saya jernih, konsisten, dan sulit dibantah terasa sangat berarti.", "diakui karena kejernihan dan konsistensi"),
  makeCore("core_ti_aspiration_02", "Ti", "aspiration", "study", "Mempelajari teori baru", "Saya ingin lebih mahir membangun kerangka yang rapi tanpa tersesat dalam istilah yang tidak perlu.", "berkembang dalam menyusun kerangka logis"),
  makeCore("core_ti_aspiration_03", "Ti", "aspiration", "work", "Sistem yang saya buat dipakai orang lain", "Pengakuan bahwa aturan yang saya susun membuat pekerjaan lebih mudah dipahami dapat sangat membanggakan.", "dihargai karena menciptakan struktur yang jelas"),
  makeCore("core_ti_dismissive_01", "Ti", "dismissive", "work", "Struktur sudah cukup jelas", "Saya bisa terus menyempurnakan kategori dan aturan, tetapi memilih berhenti ketika sistem sudah dapat dipakai.", "membatasi penyempurnaan struktur yang berlebihan"),
  makeCore("core_ti_dismissive_02", "Ti", "dismissive", "friendship", "Percakapan berubah menjadi debat definisi", "Saya mampu mengikuti rincian logikanya, namun cepat merasa hubungan nyata lebih penting daripada memenangkan struktur argumen.", "mampu menganalisis tetapi mengesampingkannya"),
  makeCore("core_ti_dismissive_03", "Ti", "dismissive", "decision", "Ada ketidakkonsistenan kecil", "Saya sering melihat celah logis, tetapi tidak selalu merasa perlu memperbaikinya bila tidak mengubah hasil utama.", "mengetahui inkonsistensi tanpa menjadikannya pusat"),
  makeCore("core_ti_background_01", "Ti", "background", "general", "Menyimpan barang atau informasi", "Saya otomatis membuat kelompok dan batas yang masuk akal agar sesuatu mudah ditemukan kembali.", "mengelompokkan secara otomatis"),
  makeCore("core_ti_background_02", "Ti", "background", "work", "Instruksi dari beberapa orang bertabrakan", "Saya sering diam-diam menyusun ulang hubungan tugas di kepala sampai tahu aturan mana yang mengikat bagian lain.", "merapikan struktur dalam pikiran"),
  makeCore("core_ti_background_03", "Ti", "background", "friendship", "Teman menceritakan masalah panjang", "Saya mudah menangkap bagian yang tidak konsisten atau premis yang hilang, meski tidak selalu mengoreksinya.", "mendeteksi ketidakkonsistenan sebagai kebiasaan latar"),
  makeCore("core_fe_producer_01", "Fe", "producer", "group", "Suasana kelompok berubah", "Saya cepat menangkap perubahan energi ruangan dan spontan menyesuaikan ekspresi agar suasana bergerak ke arah tertentu.", "membaca dan menggerakkan suasana kelompok"),
  makeCore("core_fe_producer_02", "Fe", "producer", "friendship", "Obrolan mulai canggung", "Saya sering langsung memberi respons, cerita, atau candaan yang membuat emosi bersama kembali mengalir.", "mencairkan suasana secara spontan"),
  makeCore("core_fe_producer_03", "Fe", "producer", "public", "Menyampaikan hal yang penting", "Saya mudah memberi tekanan emosi pada suara dan ekspresi supaya orang benar-benar merasakan pesan yang disampaikan.", "mengekspresikan emosi untuk memberi dampak"),
  makeCore("core_fe_flexible_01", "Fe", "flexible", "work", "Tim membutuhkan semangat yang berbeda", "Saya cukup nyaman mengubah nada—lebih hangat, lebih serius, atau lebih bersemangat—sesuai energi yang dibutuhkan pekerjaan.", "menyesuaikan ekspresi dengan kebutuhan kelompok"),
  makeCore("core_fe_flexible_02", "Fe", "flexible", "friendship", "Teman sedang sedih", "Saya bisa ikut lembut, menghibur, atau mengalihkan suasana berdasarkan respons emosional yang paling membantu saat itu.", "menyesuaikan emosi untuk membantu orang lain"),
  makeCore("core_fe_flexible_03", "Fe", "flexible", "group", "Acara mulai kehilangan arah", "Saya mudah menaikkan atau menurunkan intensitas suasana agar kelompok tetap terlibat tanpa menjadi terlalu gaduh.", "mengatur intensitas suasana secara fleksibel"),
  makeCore("core_fe_mask_01", "Fe", "mask", "work", "Harus terlihat selalu antusias", "Saya pernah memaksa senyum dan energi ceria agar tampak profesional, meskipun suasana hati saya sebenarnya jauh berbeda.", "menampilkan emosi positif karena tuntutan peran"),
  makeCore("core_fe_mask_02", "Fe", "mask", "family", "Diharapkan menjaga suasana tetap damai", "Saya kadang memainkan ekspresi hangat supaya orang lain tidak curiga ada masalah, walau hal itu menguras tenaga.", "memperagakan kehangatan demi kepantasan"),
  makeCore("core_fe_mask_03", "Fe", "mask", "public", "Semua orang menunggu saya menghibur", "Saya dapat tampil heboh dan ekspresif karena merasa wajib menghidupkan acara, bukan karena energi itu muncul alami.", "memainkan peran penghidup suasana"),
  makeCore("core_fe_threat_01", "Fe", "threat", "public", "Diminta tampil ekspresif di depan banyak orang", "Tuntutan untuk menunjukkan emosi yang jelas dapat membuat saya kaku, malu, atau ingin menghilang dari perhatian.", "menampilkan emosi di bawah sorotan"),
  makeCore("core_fe_threat_02", "Fe", "threat", "conflict", "Harus mengendalikan suasana yang memanas", "Saya tertekan ketika semua orang berharap saya mengubah emosi kelompok sementara saya sendiri belum tahu harus bereaksi bagaimana.", "mengelola emosi kelompok saat konflik"),
  makeCore("core_fe_threat_03", "Fe", "threat", "work", "Ekspresi saya terus dinilai", "Kritik bahwa saya terlalu datar, terlalu kuat, atau salah suasana dapat membuat saya defensif dan sangat sadar diri.", "menghadapi penilaian atas ekspresi emosional"),
  makeCore("core_fe_receiver_01", "Fe", "receiver", "friendship", "Hari terasa muram", "Saya merasa sangat terbantu ketika seseorang membawa kehangatan, tawa, atau ekspresi yang membuat emosi saya kembali bergerak.", "menerima energi emosional yang menghidupkan"),
  makeCore("core_fe_receiver_02", "Fe", "receiver", "group", "Suasana tidak jelas dan semua diam", "Orang yang berani menyatakan perasaan ruangan dan memberi nada yang tepat membuat saya jauh lebih lega.", "menerima arah suasana dari orang lain"),
  makeCore("core_fe_receiver_03", "Fe", "receiver", "private", "Sulit keluar dari perasaan sendiri", "Musik, cerita, atau kehadiran orang yang ekspresif sering membantu saya memahami dan melepaskan emosi.", "menerima pemantik ekspresi emosional"),
  makeCore("core_fe_aspiration_01", "Fe", "aspiration", "public", "Orang bereaksi pada kehadiran saya", "Pujian bahwa saya punya ekspresi kuat atau mampu menghidupkan suasana terasa sangat menyenangkan.", "diakui karena dampak emosional"),
  makeCore("core_fe_aspiration_02", "Fe", "aspiration", "work", "Belajar berbicara di depan orang", "Saya ingin lebih mampu membawa energi yang membuat orang mendengarkan dan ikut merasakan pesan saya.", "berkembang dalam ekspresi dan pengaruh suasana"),
  makeCore("core_fe_aspiration_03", "Fe", "aspiration", "friendship", "Teman menikmati kebersamaan", "Pengakuan bahwa saya membuat kelompok terasa lebih hangat dapat menyentuh bagian diri yang ingin saya kembangkan.", "dihargai karena menciptakan kehangatan bersama"),
  makeCore("core_fe_dismissive_01", "Fe", "dismissive", "group", "Suasana sudah cukup hidup", "Saya bisa terus menjaga energi kelompok, tetapi memilih berhenti ketika ekspresi mulai terasa berlebihan atau mengganggu tujuan.", "mampu menggerakkan suasana tetapi membatasinya"),
  makeCore("core_fe_dismissive_02", "Fe", "dismissive", "work", "Masalah berubah menjadi drama", "Saya memahami emosi yang sedang dimainkan, namun cepat menutupnya jika dianggap tidak membantu pekerjaan nyata.", "mampu membaca emosi tetapi menolak drama berkepanjangan"),
  makeCore("core_fe_dismissive_03", "Fe", "dismissive", "friendship", "Orang meminta reaksi yang lebih besar", "Saya dapat menunjukkan emosi dengan jelas, tetapi tidak suka jika setiap hal harus dibesarkan agar dianggap penting.", "menahan ekspresi yang dianggap tidak perlu"),
  makeCore("core_fe_background_01", "Fe", "background", "general", "Berada di antara beberapa orang", "Saya sering otomatis menyesuaikan nada wajah dan suara dengan atmosfer sekitar tanpa sadar sedang melakukannya.", "menyesuaikan ekspresi sebagai kebiasaan latar"),
  makeCore("core_fe_background_02", "Fe", "background", "friendship", "Teman mulai kehilangan semangat", "Saya kerap memberi respons kecil yang mengangkat suasana tanpa merasa sedang menjadi penghibur.", "mengangkat emosi orang secara diam-diam"),
  makeCore("core_fe_background_03", "Fe", "background", "work", "Rapat terasa terlalu tegang", "Saya bisa menyisipkan nada, humor, atau penekanan yang membuat orang kembali terlibat lalu melanjutkan seperti biasa.", "mengatur suasana tanpa mencari perhatian"),
  makeCore("core_fi_producer_01", "Fi", "producer", "new_situation", "Bertemu orang baru", "Saya cepat membentuk rasa tentang seberapa dekat, tulus, atau aman hubungan dengan seseorang, meski belum banyak dibicarakan.", "menilai jarak dan kualitas hubungan secara spontan"),
  makeCore("core_fi_producer_02", "Fi", "producer", "friendship", "Teman mengatakan sesuatu yang berbeda dari biasanya", "Saya spontan memperhatikan apakah perubahan itu menunjukkan jarak, luka, ketulusan, atau batas baru di antara kami.", "membaca perubahan hubungan"),
  makeCore("core_fi_producer_03", "Fi", "producer", "decision", "Pilihan dapat memengaruhi orang dekat", "Saya cenderung langsung mempertimbangkan siapa yang akan merasa dikhianati, dihargai, atau semakin dipercaya.", "menilai dampak keputusan pada ikatan pribadi"),
  makeCore("core_fi_flexible_01", "Fi", "flexible", "friendship", "Teman membutuhkan kedekatan yang berbeda", "Saya cukup nyaman mengatur jarak: mendekat, memberi ruang, atau berbicara lebih jujur sesuai keadaan hubungan.", "menyesuaikan kedekatan dengan kebutuhan hubungan"),
  makeCore("core_fi_flexible_02", "Fi", "flexible", "work", "Harus memberi umpan balik pribadi", "Saya dapat memilih nada yang tetap jujur tanpa merusak kepercayaan yang sudah dibangun.", "menyesuaikan kejujuran untuk menjaga hubungan"),
  makeCore("core_fi_flexible_03", "Fi", "flexible", "family", "Dua orang dekat sedang berselisih", "Saya bisa mengubah pendekatan kepada masing-masing orang berdasarkan sejarah dan batas hubungan mereka.", "menyesuaikan pendekatan berdasarkan ikatan personal"),
  makeCore("core_fi_mask_01", "Fi", "mask", "work", "Harus terlihat akrab dengan semua orang", "Saya pernah menunjukkan keramahan yang lebih dekat daripada yang benar-benar saya rasakan agar dianggap mudah bekerja sama.", "menampilkan kedekatan karena tuntutan peran"),
  makeCore("core_fi_mask_02", "Fi", "mask", "family", "Diharapkan selalu tampak rukun", "Saya kadang menyembunyikan jarak atau kekecewaan dan memainkan sikap hangat demi menjaga penampilan hubungan.", "memperagakan keharmonisan demi kepantasan"),
  makeCore("core_fi_mask_03", "Fi", "mask", "public", "Orang menilai saya dari kesopanan", "Saya dapat memaksa perhatian personal dan kata-kata manis agar tampak tulus, walau batin saya tidak merasa dekat.", "menampilkan ketulusan demi citra sosial"),
  makeCore("core_fi_threat_01", "Fi", "threat", "conflict", "Harus menentukan siapa yang benar-benar setia", "Tekanan untuk menilai niat dan hubungan orang secara pasti dapat membuat saya takut salah, defensif, atau ingin menghindar.", "menilai kesetiaan di bawah tekanan"),
  makeCore("core_fi_threat_02", "Fi", "threat", "friendship", "Diminta memilih salah satu teman", "Saya sangat tertekan ketika keputusan saya akan dibaca sebagai pengkhianatan atau penolakan pribadi.", "menghadapi pilihan yang mengancam ikatan"),
  makeCore("core_fi_threat_03", "Fi", "threat", "public", "Perasaan pribadi saya dipertanyakan", "Desakan untuk menjelaskan siapa yang saya sayangi, percaya, atau jauhi dapat membuat saya malu dan menutup diri.", "membuka penilaian hubungan di bawah sorotan"),
  makeCore("core_fi_receiver_01", "Fi", "receiver", "friendship", "Tidak yakin pada posisi hubungan", "Saya merasa sangat lega ketika seseorang menyatakan dengan jelas bahwa ia percaya, tetap dekat, dan tidak menyimpan niat tersembunyi.", "menerima kepastian dan ketulusan hubungan"),
  makeCore("core_fi_receiver_02", "Fi", "receiver", "romance", "Muncul keraguan tentang perasaan", "Sikap yang konsisten dan jujur dari orang terdekat membuat hati saya jauh lebih tenang daripada janji yang samar.", "menerima bukti kesetiaan dan kedekatan"),
  makeCore("core_fi_receiver_03", "Fi", "receiver", "work", "Hubungan tim terasa dingin", "Orang yang membantu menjernihkan salah paham personal tanpa mempermalukan siapa pun membuat saya merasa aman.", "menerima mediasi hubungan yang tulus"),
  makeCore("core_fi_aspiration_01", "Fi", "aspiration", "public", "Orang menilai karakter saya", "Pujian bahwa saya setia, tulus, dan tahu menjaga kepercayaan terasa sangat dalam bagi saya.", "diakui karena ketulusan dan kesetiaan"),
  makeCore("core_fi_aspiration_02", "Fi", "aspiration", "friendship", "Membangun hubungan jangka panjang", "Saya ingin lebih mampu menjaga kedekatan tanpa kehilangan batas diri atau menyimpan luka terlalu lama.", "berkembang dalam merawat hubungan"),
  makeCore("core_fi_aspiration_03", "Fi", "aspiration", "family", "Menjadi tempat aman bagi orang dekat", "Saya ingin dipercaya sebagai orang yang memahami batas pribadi dan tidak mempermainkan perasaan.", "dihargai karena menjaga batas dan kepercayaan"),
  makeCore("core_fi_dismissive_01", "Fi", "dismissive", "work", "Masalah personal mulai menguasai pekerjaan", "Saya mampu membaca ketegangan hubungan, tetapi sengaja mengesampingkannya ketika urusan objektif harus diselesaikan.", "membaca hubungan tetapi tidak menjadikannya pusat"),
  makeCore("core_fi_dismissive_02", "Fi", "dismissive", "friendship", "Percakapan terus membahas siapa dekat dengan siapa", "Saya memahami nuansanya, namun cepat merasa pengukuran kedekatan yang berlebihan hanya memperumit hubungan.", "membatasi analisis hubungan yang berlebihan"),
  makeCore("core_fi_dismissive_03", "Fi", "dismissive", "decision", "Ada rasa tidak enak kecil", "Saya dapat menangkap perubahan jarak, tetapi memilih tidak menindaklanjutinya jika tidak menyentuh kepercayaan utama.", "mengetahui nuansa hubungan tanpa selalu merespons"),
  makeCore("core_fi_background_01", "Fi", "background", "general", "Berinteraksi dengan orang yang berbeda", "Saya otomatis menjaga kadar keterbukaan dan jarak yang terasa pantas untuk masing-masing hubungan.", "mengatur jarak personal secara otomatis"),
  makeCore("core_fi_background_02", "Fi", "background", "friendship", "Teman menyebut kejadian lama", "Saya sering mengingat nada, janji, dan perubahan kecil dalam hubungan tanpa sengaja menyimpannya sebagai daftar.", "menyimpan nuansa hubungan sebagai kebiasaan latar"),
  makeCore("core_fi_background_03", "Fi", "background", "family", "Ada ketegangan yang belum diucapkan", "Saya kerap melakukan penyesuaian kecil agar batas dan rasa hormat tetap terjaga tanpa mengumumkan bahwa saya sedang memperbaiki hubungan.", "merawat kepercayaan secara diam-diam"),
];
````

---

## `src/data/holdoutQuestions.ts`

````ts
/** Holdout items are withheld from the initial core fit and used as a prediction check. */
import type { InformationElement, MeasurementChannel, QuestionContext, SocionicsQuestion } from "../types/socionics";

const makeHoldout = (
  id: string,
  element: InformationElement,
  channel: MeasurementChannel,
  context: QuestionContext,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => ({
  id,
  scenario,
  statement,
  responseFocus,
  element,
  channel,
  context,
  scaleType:
    channel === "producer" || channel === "background" ? "automaticity" :
    channel === "threat" ? "threat" :
    channel === "receiver" ? "relief" :
    channel === "aspiration" ? "recognition" : "frequency",
  direction: 1,
  reverseKeyed: false,
  designWeight: 0.9,
  ambiguityRisk: "low",
  desirabilityRisk: channel === "aspiration" ? "medium" : "low",
  evidenceTags: [element, channel, context, "holdout"],
  replicationFamilyId: `holdout_${element}_${channel}`,
  isHoldout: true,
  isTieBreak: false,
  itemVersion: "2.0.0",
});

export const HOLDOUT_QUESTIONS: SocionicsQuestion[] = [
  makeHoldout("holdout_ne_01", "Ne", "producer", "new_situation", "Aturan permainan belum lengkap", "Sebelum orang lain selesai menjelaskan, saya sering sudah melihat beberapa kemungkinan tentang cara permainan itu bisa berkembang.", "melihat beberapa kemungkinan dari aturan yang belum lengkap"),
  makeHoldout("holdout_ne_02", "Ne", "threat", "public", "Semua orang menunggu ide yang belum pernah ada", "Tekanan untuk menjadi satu-satunya sumber ide baru dapat membuat pikiran saya mengecil dan takut semua pilihan terdengar bodoh.", "menghasilkan kebaruan ketika semua orang menunggu"),
  makeHoldout("holdout_ne_03", "Ne", "receiver", "study", "Tidak memahami potensi sebuah topik", "Saya merasa terbuka kembali ketika seseorang menunjukkan hubungan tak terduga yang membuat topik itu punya lebih banyak jalan untuk dipelajari.", "menerima hubungan baru yang membuka potensi"),
  makeHoldout("holdout_ne_04", "Ne", "background", "general", "Melihat aturan yang dianggap tetap", "Saya kerap spontan menemukan pengecualian atau penggunaan lain, lalu menyimpannya di kepala tanpa merasa harus memperdebatkannya.", "melihat pengecualian dan penggunaan lain secara latar"),

  makeHoldout("holdout_ni_01", "Ni", "producer", "decision", "Sebuah keputusan terasa belum waktunya", "Saya sering merasakan bahwa langkah tertentu akan lebih tepat jika ditunda sampai rangkaian keadaan mencapai titik yang pas.", "merasakan kematangan waktu sebelum bertindak"),
  makeHoldout("holdout_ni_02", "Ni", "threat", "time_pressure", "Diminta menetapkan kapan masalah akan selesai", "Saya dapat sangat tertekan ketika harus menjanjikan tanggal akhir padahal alur perubahan belum cukup terbaca.", "menjamin waktu akhir ketika arah belum jelas"),
  makeHoldout("holdout_ni_03", "Ni", "receiver", "friendship", "Kejadian buruk terasa tidak bermakna", "Saya lega ketika seseorang dapat menjelaskan bagaimana kejadian itu mungkin menjadi bagian dari perkembangan yang lebih panjang.", "menerima makna perkembangan dari orang lain"),
  makeHoldout("holdout_ni_04", "Ni", "background", "work", "Proyek mulai kehilangan momentum", "Saya sering mengubah tempo atau menunggu satu tahap tertentu tanpa menjelaskan panjang karena arah perlambatannya sudah terasa.", "menyesuaikan momentum secara diam-diam"),

  makeHoldout("holdout_se_01", "Se", "producer", "conflict", "Seseorang terus menggeser batas yang sudah disepakati", "Saya cenderung segera menghentikannya dengan sikap yang jelas daripada berharap ia menyadari sendiri.", "menghentikan pelanggaran batas secara langsung"),
  makeHoldout("holdout_se_02", "Se", "threat", "public", "Harus merebut kendali dari orang yang dominan", "Tubuh saya dapat menegang ketika harus beradu posisi secara terbuka dan semua orang melihat siapa yang akan mundur.", "beradu posisi secara terbuka"),
  makeHoldout("holdout_se_03", "Se", "receiver", "family", "Keluarga menghadapi gangguan nyata", "Saya merasa aman ketika seseorang mengambil tindakan tegas, membagi peran, dan tidak membiarkan ancaman terus berlarut.", "menerima perlindungan dan tindakan tegas"),
  makeHoldout("holdout_se_04", "Se", "background", "work", "Barang dan orang menghalangi jalur kerja", "Saya sering langsung memindahkan, mengatur, atau membuka ruang agar kegiatan kembali lancar tanpa banyak rapat.", "membuka ruang dan menyingkirkan hambatan secara otomatis"),

  makeHoldout("holdout_si_01", "Si", "producer", "body", "Tubuh mulai kehilangan keseimbangan", "Saya biasanya cepat tahu apakah yang saya butuhkan adalah makan, tidur, bergerak, mengurangi suara, atau sekadar mengubah posisi.", "membaca kebutuhan tubuh secara spontan"),
  makeHoldout("holdout_si_02", "Si", "threat", "work", "Harus mengawasi kenyamanan banyak orang", "Saya dapat kewalahan ketika setiap keluhan suhu, makanan, bau, dan posisi duduk menjadi tanggung jawab saya.", "mengelola seluruh detail kenyamanan orang lain"),
  makeHoldout("holdout_si_03", "Si", "receiver", "romance", "Badan sedang benar-benar lelah", "Perhatian sederhana seperti menyiapkan tempat nyaman atau makanan yang pas dapat membuat saya merasa sangat dirawat.", "menerima perawatan indrawi yang tepat"),
  makeHoldout("holdout_si_04", "Si", "background", "friendship", "Kegiatan bersama berlangsung lama", "Saya sering tanpa sadar mengusulkan jeda, tempat yang lebih enak, atau tempo yang lebih ringan sebelum orang lain menyadari kelelahan.", "menjaga kenyamanan kelompok secara latar"),

  makeHoldout("holdout_te_01", "Te", "producer", "decision", "Menerima klaim yang terdengar meyakinkan", "Saya spontan ingin tahu sumbernya, contoh hasilnya, dan apakah informasi itu benar-benar dapat dipakai.", "memeriksa fakta dan kegunaan klaim"),
  makeHoldout("holdout_te_02", "Te", "threat", "time_pressure", "Harus memperbaiki alat tanpa petunjuk", "Saya dapat panik ketika hasil harus segera keluar tetapi saya tidak tahu prosedur mana yang terbukti bekerja.", "menemukan prosedur yang bekerja di bawah tekanan"),
  makeHoldout("holdout_te_03", "Te", "receiver", "new_situation", "Mencoba pekerjaan teknis pertama kali", "Saya sangat terbantu oleh orang yang menunjukkan satu contoh nyata, membiarkan saya mencoba, lalu memperbaiki langkah yang salah.", "menerima demonstrasi praktis"),
  makeHoldout("holdout_te_04", "Te", "background", "private", "Rutinitas kecil terasa boros waktu", "Saya sering mengubah urutan atau alat secara otomatis sampai kegiatan itu selesai dengan lebih sedikit langkah.", "menyederhanakan rutinitas secara latar"),

  makeHoldout("holdout_ti_01", "Ti", "producer", "study", "Dua penjelasan memakai aturan yang berbeda", "Saya cepat ingin menemukan prinsip mana yang berubah dan apakah keduanya masih dapat berada dalam satu kerangka yang konsisten.", "mencari prinsip yang menyatukan aturan"),
  makeHoldout("holdout_ti_02", "Ti", "threat", "public", "Diminta mempertahankan definisi di depan banyak orang", "Saya dapat merasa malu atau defensif ketika setiap kata saya dibedah sebelum sempat menyusun kerangka yang utuh.", "mempertahankan definisi di bawah sorotan"),
  makeHoldout("holdout_ti_03", "Ti", "receiver", "work", "Pembagian tugas tidak jelas", "Saya lega ketika seseorang menetapkan batas peran dan menunjukkan bagaimana satu bagian terhubung dengan bagian lain.", "menerima struktur peran yang jelas"),
  makeHoldout("holdout_ti_04", "Ti", "background", "general", "Mendengar argumen yang tampak lancar", "Saya sering otomatis menangkap lompatan logika atau kategori yang bercampur, meskipun tidak selalu menyela.", "mendeteksi lompatan logika secara latar"),

  makeHoldout("holdout_fe_01", "Fe", "producer", "group", "Energi ruangan turun setelah kabar buruk", "Saya sering spontan mengubah nada bicara atau memberi respons yang membantu kelompok menyalurkan emosi bersama.", "menggerakkan emosi kelompok secara spontan"),
  makeHoldout("holdout_fe_02", "Fe", "threat", "work", "Diminta tetap ceria sepanjang hari", "Saya dapat merasa terperangkap ketika ekspresi saya harus terus disetel agar orang lain tidak kehilangan semangat.", "mempertahankan ekspresi positif sebagai tuntutan"),
  makeHoldout("holdout_fe_03", "Fe", "receiver", "private", "Sulit memahami perasaan sendiri", "Ekspresi terbuka dari orang lain sering membantu saya memberi nama pada emosi dan keluar dari keadaan yang datar.", "menerima ekspresi yang membantu menggerakkan emosi"),
  makeHoldout("holdout_fe_04", "Fe", "background", "friendship", "Percakapan menjadi terlalu tegang", "Saya kerap memberi satu nada ringan atau reaksi hangat yang membuat semua orang bernapas lagi tanpa merasa sedang tampil.", "melunakkan suasana secara latar"),

  makeHoldout("holdout_fi_01", "Fi", "producer", "friendship", "Seseorang meminta maaf setelah melukai kepercayaan", "Saya spontan menilai bukan hanya kata-katanya, tetapi juga perubahan sikap yang menunjukkan apakah hubungan benar-benar dapat dipulihkan.", "menilai ketulusan pemulihan hubungan"),
  makeHoldout("holdout_fi_02", "Fi", "threat", "conflict", "Harus menyatakan siapa yang paling saya percaya", "Saya dapat merasa sangat terpojok ketika pilihan itu akan mengubah kedekatan dan dibaca sebagai penolakan pribadi.", "menyatakan hierarki kepercayaan di bawah tekanan"),
  makeHoldout("holdout_fi_03", "Fi", "receiver", "romance", "Hubungan terasa tidak pasti", "Konsistensi kecil dan pernyataan jujur mengenai posisi hubungan dapat memberi rasa aman yang sangat besar.", "menerima kepastian hubungan yang tulus"),
  makeHoldout("holdout_fi_04", "Fi", "background", "family", "Ada jarak yang belum dibicarakan", "Saya sering mengubah cara mendekat, memberi ruang, atau menjaga kata-kata agar rasa hormat tetap ada tanpa membuatnya menjadi pembicaraan besar.", "merawat jarak dan rasa hormat secara latar"),
];
````

---

## `src/data/questions.ts`

````ts
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
````

---

## `src/data/tieBreakQuestions.ts`

````ts
/** Adaptive pairwise items. Rating 5 supports the first type in the pair; rating 1 supports the second. */
import type { SocionicsQuestion, TIM } from "../types/socionics";

export const canonicalPair = (a: TIM, b: TIM): string => [a, b].sort().join("_");

const makeTieBreak = (
  id: string,
  first: TIM,
  second: TIM,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => {
  const pair = canonicalPair(first, second);
  return {
    id,
    scenario,
    statement,
    responseFocus,
    scaleType: "comparison",
    element: "Ne",
    channel: "producer",
    context: "decision",
    direction: 1,
    reverseKeyed: false,
    designWeight: 1,
    ambiguityRisk: "medium",
    desirabilityRisk: "low",
    evidenceTags: ["tiebreak", pair],
    tieBreakTags: [pair],
    tieBreakSupport: { [first]: 1, [second]: -1 },
    isHoldout: false,
    isTieBreak: true,
    itemVersion: "2.0.0",
  };
};

export const TIE_BREAK_QUESTIONS: SocionicsQuestion[] = [
  makeTieBreak("tb_ile_iee_01", "ILE", "IEE", "Membantu kelompok yang kehilangan arah", "Saya lebih terdorong membongkar cara kerja gagasan dan menemukan struktur yang konsisten daripada memetakan siapa yang cocok, tulus, atau perlu didekati secara personal.", "struktur gagasan dibanding nuansa hubungan"),
  makeTieBreak("tb_ile_iee_02", "ILE", "IEE", "Menemukan kemungkinan baru", "Setelah ide muncul, saya lebih ingin menguji bagaimana bagian-bagiannya terhubung daripada membayangkan potensi orang yang dapat tumbuh melalui ide itu.", "konsistensi sistem dibanding potensi personal"),

  makeTieBreak("tb_sei_sli_01", "SEI", "SLI", "Membuat keadaan lebih baik", "Saya lebih cepat memperhatikan suasana emosional dan kenyamanan bersama daripada mencari metode kerja yang paling hemat tenaga dan sumber daya.", "kehangatan suasana dibanding efektivitas praktis"),
  makeTieBreak("tb_sei_sli_02", "SEI", "SLI", "Teman berkunjung ketika ada pekerjaan", "Saya lebih terdorong membuat interaksi terasa ringan dan menyenangkan daripada segera mengoptimalkan alat serta langkah kerja.", "suasana bersama dibanding optimasi cara kerja"),

  makeTieBreak("tb_ese_eie_01", "ESE", "EIE", "Menghidupkan sebuah acara", "Saya lebih berfokus pada kenyamanan nyata yang sedang dirasakan orang daripada membangun satu tema besar tentang arah acara dan dampaknya ke depan.", "kenyamanan saat ini dibanding tema jangka panjang"),
  makeTieBreak("tb_ese_eie_02", "ESE", "EIE", "Kelompok sedang kehilangan semangat", "Saya lebih spontan memperbaiki suasana lewat perhatian konkret daripada mengarahkan emosi mereka menuju visi atau makna tertentu.", "perawatan konkret dibanding pengarahan visi emosional"),

  makeTieBreak("tb_lii_lsi_01", "LII", "LSI", "Aturan tidak lagi cocok", "Saya lebih tertarik mencari kemungkinan kerangka baru daripada memperkuat batas dan menegakkan aturan yang sudah disepakati.", "membuka kerangka baru dibanding menegakkan batas"),
  makeTieBreak("tb_lii_lsi_02", "LII", "LSI", "Sistem menghadapi pengecualian", "Saya lebih nyaman memperluas definisi agar pengecualian dapat dijelaskan daripada memutuskan secara tegas mana yang tetap boleh dan tidak boleh.", "memperluas definisi dibanding menetapkan ketegasan"),

  makeTieBreak("tb_sle_see_01", "SLE", "SEE", "Memimpin konflik kelompok", "Saya lebih mengandalkan aturan peran dan struktur keputusan daripada membaca siapa yang setia, tersinggung, atau perlu dirangkul secara personal.", "struktur kendali dibanding nuansa hubungan"),
  makeTieBreak("tb_sle_see_02", "SLE", "SEE", "Membagi kekuasaan", "Saya lebih ingin membuat batas kewenangan yang konsisten daripada menyesuaikan dukungan berdasarkan kedekatan dan kepercayaan antarorang.", "konsistensi kewenangan dibanding aliansi personal"),

  makeTieBreak("tb_iei_ili_01", "IEI", "ILI", "Membaca arah keadaan", "Saya lebih mudah mengungkapkan tema itu melalui suasana dan emosi bersama daripada mengujinya lewat fakta efektivitas serta hasil yang dapat diamati.", "tema emosional dibanding verifikasi praktis"),
  makeTieBreak("tb_iei_ili_02", "IEI", "ILI", "Melihat perubahan yang akan datang", "Saya lebih tertarik pada bagaimana perubahan itu akan dirasakan orang daripada pada biaya, kegunaan, dan mekanisme pelaksanaannya.", "dampak emosional dibanding konsekuensi praktis"),

  makeTieBreak("tb_lie_lse_01", "LIE", "LSE", "Mengembangkan pekerjaan", "Saya lebih terdorong menata langkah menurut arah jangka panjang daripada memastikan ritme harian, kondisi fisik, dan kenyamanan proses tetap stabil.", "arah jangka panjang dibanding kestabilan keseharian"),
  makeTieBreak("tb_lie_lse_02", "LIE", "LSE", "Memilih metode yang efektif", "Saya lebih mudah menerima ketidaknyamanan sekarang jika metode itu membuka perkembangan besar di masa depan.", "pertumbuhan masa depan dibanding kenyamanan proses"),

  makeTieBreak("tb_esi_eii_01", "ESI", "EII", "Kepercayaan dilanggar", "Saya lebih terdorong memasang batas dan konsekuensi nyata daripada terus membuka kemungkinan alasan, perubahan, atau niat baik dari pelakunya.", "konsekuensi tegas dibanding kemungkinan perubahan"),
  makeTieBreak("tb_esi_eii_02", "ESI", "EII", "Melindungi orang dekat", "Saya lebih spontan menghentikan ancaman sekarang daripada mengeksplorasi jalan yang mungkin membuat semua pihak berkembang.", "perlindungan langsung dibanding eksplorasi potensi"),

  makeTieBreak("tb_ile_lii_01", "ILE", "LII", "Menemukan konsep baru", "Saya lebih bersemangat membuka cabang dan kemungkinan baru daripada menahan diri sampai seluruh definisi tersusun konsisten.", "ekspansi kemungkinan dibanding penyempurnaan kerangka"),
  makeTieBreak("tb_ile_lii_02", "ILE", "LII", "Diskusi teori berkembang", "Saya lebih cepat melompat ke hubungan baru yang menarik daripada merapikan satu sistem penjelasan hingga benar-benar tuntas.", "eksplorasi hubungan baru dibanding ketuntasan struktur"),

  makeTieBreak("tb_sei_ese_01", "SEI", "ESE", "Suasana bersama mulai tidak nyaman", "Saya lebih dahulu menyesuaikan ritme dan kenyamanan secara tenang daripada mengangkat energi kelompok dengan ekspresi yang lebih kuat.", "penyetelan kenyamanan dibanding aktivasi emosi"),
  makeTieBreak("tb_sei_ese_02", "SEI", "ESE", "Teman sedang lesu", "Saya lebih spontan menciptakan suasana santai yang menenangkan daripada mengajak mereka menunjukkan emosi dan kembali bersemangat.", "ketenangan indrawi dibanding ekspresi emosional"),

  makeTieBreak("tb_sle_lsi_01", "SLE", "LSI", "Masalah membutuhkan kendali", "Saya lebih cepat bertindak dan mengubah posisi nyata daripada memastikan setiap tindakan sudah sesuai kerangka aturan yang lengkap.", "aksi penguasaan dibanding ketepatan struktur"),
  makeTieBreak("tb_sle_lsi_02", "SLE", "LSI", "Ada pelanggaran di lapangan", "Saya lebih terdorong menghentikannya saat itu juga daripada menata prosedur dan klasifikasi pelanggaran terlebih dahulu.", "intervensi langsung dibanding prosedur sistematis"),

  makeTieBreak("tb_iei_eie_01", "IEI", "EIE", "Menangkap tema emosional", "Saya lebih sering membiarkan gambaran itu tumbuh diam-diam sebelum mengungkapkannya daripada langsung membentuk suasana kelompok secara terbuka.", "visi batin dibanding ekspresi terbuka"),
  makeTieBreak("tb_iei_eie_02", "IEI", "EIE", "Merasakan arah sebuah hubungan", "Saya lebih nyaman menunggu makna dan waktunya mengendap daripada segera memberi nama serta intensitas pada emosi yang ada.", "pengendapan makna dibanding pengarahan emosi"),

  makeTieBreak("tb_see_esi_01", "SEE", "ESI", "Menghadapi orang yang merusak kepercayaan", "Saya lebih cepat mengubah posisi, pengaruh, dan aliansi secara aktif daripada menetapkan satu penilaian moral yang tetap tentang hubungan itu.", "manuver pengaruh dibanding keteguhan penilaian relasi"),
  makeTieBreak("tb_see_esi_02", "SEE", "ESI", "Membela orang dekat", "Saya lebih spontan menggerakkan orang dan sumber daya daripada berfokus pada batas kesetiaan yang tidak boleh dilanggar.", "mobilisasi pengaruh dibanding batas kesetiaan"),

  makeTieBreak("tb_ili_lie_01", "ILI", "LIE", "Melihat peluang besar", "Saya lebih dahulu mengamati bagaimana peluang itu mungkin berkembang atau gagal daripada segera mengubahnya menjadi rencana kerja yang produktif.", "pengamatan arah dibanding eksekusi praktis"),
  makeTieBreak("tb_ili_lie_02", "ILI", "LIE", "Tren baru mulai terlihat", "Saya lebih nyaman menunggu pola dan waktunya menjadi jelas daripada langsung mengerahkan sumber daya untuk memanfaatkannya.", "menunggu kematangan arah dibanding bergerak produktif"),

  makeTieBreak("tb_iee_eii_01", "IEE", "EII", "Melihat potensi seseorang", "Saya lebih terdorong membuka kemungkinan baru baginya daripada menjaga satu arah hubungan yang paling selaras dengan nilai dan batasnya.", "membuka potensi dibanding menjaga arah relasi"),
  makeTieBreak("tb_iee_eii_02", "IEE", "EII", "Orang dekat ingin berubah", "Saya lebih cepat menunjukkan banyak jalan yang dapat dicoba daripada mendalami mana yang paling sesuai dengan suara batin dan komitmennya.", "banyak jalan pertumbuhan dibanding keselarasan nilai"),

  makeTieBreak("tb_sli_lse_01", "SLI", "LSE", "Pekerjaan harian perlu dibenahi", "Saya lebih dahulu mencari cara yang paling ringan dan nyaman dijalankan daripada membuat jadwal, target, dan pengawasan yang lebih ketat.", "cara ringan adaptif dibanding pengaturan produktif"),
  makeTieBreak("tb_sli_lse_02", "SLI", "LSE", "Ada alat dan waktu terbatas", "Saya lebih suka menyesuaikan diri secara tenang dengan apa yang tersedia daripada mengorganisasi orang agar seluruh proses bergerak lebih cepat.", "adaptasi praktis tenang dibanding pengorganisasian aktif"),
];

export const getTieBreakQuestionsForPair = (pair: string): SocionicsQuestion[] =>
  TIE_BREAK_QUESTIONS.filter((question) => question.tieBreakTags?.includes(pair));
````

---

## `src/hooks/useTestSession.ts`

````ts
import { useCallback, useEffect, useMemo, useState } from "react";
import type { InformationElement, MeasurementChannel, SocionicsQuestion, TestSession } from "../types/socionics";
import { ALL_QUESTIONS, getCoreQuestions, getHoldoutQuestions, getQuestionById } from "../data/questions";
import { getTieBreakQuestionsForPair } from "../data/tieBreakQuestions";
import { applyAnswer, applySkip, moveToQuestion } from "../session/sessionState";

const STORAGE_KEY = "socionics_dalam_diriku_session_v2";
const LEGACY_STORAGE_KEY = "socionics_dalam_diriku_session_v1";
const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const CHANNELS: MeasurementChannel[] = ["producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"];

function createLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function shuffleDeterministic<T>(items: readonly T[], seed: number): T[] {
  const random = createLcg(seed);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function spreadSimilarItems(items: SocionicsQuestion[], seed: number): SocionicsQuestion[] {
  const pool = shuffleDeterministic(items, seed);
  const result: SocionicsQuestion[] = [];

  while (pool.length > 0) {
    const previous = result[result.length - 1];
    let chosenIndex = pool.findIndex((candidate) =>
      !previous || (candidate.element !== previous.element && candidate.channel !== previous.channel),
    );
    if (chosenIndex < 0) {
      chosenIndex = pool.findIndex((candidate) => !previous || candidate.element !== previous.element);
    }
    if (chosenIndex < 0) chosenIndex = 0;
    result.push(pool.splice(chosenIndex, 1)[0]);
  }

  return result;
}

function groupCoreByCell(): Map<string, SocionicsQuestion[]> {
  const map = new Map<string, SocionicsQuestion[]>();
  for (const question of getCoreQuestions()) {
    const key = `${question.element}_${question.channel}`;
    const group = map.get(key) ?? [];
    group.push(question);
    map.set(key, group);
  }
  for (const group of map.values()) group.sort((left, right) => left.id.localeCompare(right.id));
  return map;
}

function selectVariant(group: SocionicsQuestion[], seed: number, offset = 0): SocionicsQuestion {
  const index = Math.abs(seed + offset) % group.length;
  return group[index];
}

/**
 * Stratified selection guarantees at least one item in every element × channel cell.
 * Ringkas: 64 cells + 16 balanced replications = 80.
 * Standar: 64 cells + 48 balanced replications + 16 holdouts = 128.
 * Mendalam: all 192 core + 32 holdouts = 224, followed by up to two adaptive pair items.
 */
export function selectQuestionsForMode(
  mode: TestSession["mode"],
  seed: number,
): SocionicsQuestion[] {
  const cellMap = groupCoreByCell();
  const selected: SocionicsQuestion[] = [];

  if (mode === "mendalam") {
    selected.push(...getCoreQuestions(), ...getHoldoutQuestions());
    return spreadSimilarItems(selected, seed + 901);
  }

  const primaryByCell = new Map<string, SocionicsQuestion>();
  ELEMENTS.forEach((element, elementIndex) => {
    CHANNELS.forEach((channel, channelIndex) => {
      const key = `${element}_${channel}`;
      const group = cellMap.get(key);
      if (!group || group.length < 3) throw new Error(`Bank tidak lengkap pada sel ${key}.`);
      const primary = selectVariant(group, seed + elementIndex * 17 + channelIndex * 31);
      primaryByCell.set(key, primary);
      selected.push(primary);
    });
  });

  const offset = Math.abs(seed) % CHANNELS.length;

  if (mode === "ringkas") {
    ELEMENTS.forEach((element, elementIndex) => {
      const extraChannels = [
        CHANNELS[(elementIndex + offset) % CHANNELS.length],
        CHANNELS[(elementIndex + offset + 4) % CHANNELS.length],
      ];
      for (const channel of extraChannels) {
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      }
    });
  } else {
    // Add a second replication to six of eight cells per element. The omitted
    // channels rotate, so every channel receives the same total coverage.
    ELEMENTS.forEach((element, elementIndex) => {
      const omitted = new Set([
        (elementIndex + offset) % CHANNELS.length,
        (elementIndex + offset + 4) % CHANNELS.length,
      ]);
      CHANNELS.forEach((channel, channelIndex) => {
        if (omitted.has(channelIndex)) return;
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      });
    });

    const shuffledHoldouts = shuffleDeterministic(getHoldoutQuestions(), seed + 113);
    ELEMENTS.forEach((element) => {
      selected.push(...shuffledHoldouts.filter((question) => question.element === element).slice(0, 2));
    });
  }

  return spreadSimilarItems(selected, seed + 901);
}

function persist(session: TestSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function restoreSession(): TestSession | null {
  for (const key of [STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as Partial<TestSession>;
      if (!parsed.mode || !parsed.seed) continue;
      const questionIds = Array.isArray(parsed.questionIds)
        ? parsed.questionIds.filter((id): id is string => typeof id === "string" && Boolean(getQuestionById(id)))
        : selectQuestionsForMode(parsed.mode, parsed.seed).map((question) => question.id);
      const isLegacy = key === LEGACY_STORAGE_KEY || parsed.appVersion !== "2.0.0";
      const validQuestionIds = new Set(questionIds);
      const restoredAnswers = isLegacy
        ? {}
        : Object.fromEntries(
            Object.entries(parsed.answers ?? {}).filter(([id, value]) =>
              validQuestionIds.has(id) && typeof value === "number" && value >= 1 && value <= 5,
            ),
          );
      const restored: TestSession = {
        mode: parsed.mode,
        answers: restoredAnswers,
        skippedIds: isLegacy ? [] : (parsed.skippedIds ?? []).filter((id) => validQuestionIds.has(id)),
        questionIds,
        currentIndex: isLegacy ? 0 : Math.min(parsed.currentIndex ?? 0, Math.max(0, questionIds.length - 1)),
        startedAt: isLegacy ? new Date().toISOString() : (parsed.startedAt ?? new Date().toISOString()),
        lastUpdatedAt: new Date().toISOString(),
        seed: parsed.seed,
        appVersion: "2.0.0",
        completed: isLegacy ? false : Boolean(parsed.completed),
        tieBreakPair: isLegacy ? undefined : parsed.tieBreakPair,
      };
      persist(restored);
      if (key === LEGACY_STORAGE_KEY) localStorage.removeItem(LEGACY_STORAGE_KEY);
      return restored;
    } catch {
      localStorage.removeItem(key);
    }
  }
  return null;
}

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(restoreSession());
    setHydrated(true);
  }, []);

  const activeQuestions = useMemo(
    () => (session?.questionIds ?? []).map(getQuestionById).filter(Boolean) as SocionicsQuestion[],
    [session?.questionIds],
  );

  const commit = useCallback((next: TestSession): TestSession => {
    persist(next);
    setSession(next);
    return next;
  }, []);

  const startNewSession = useCallback((mode: TestSession["mode"]): TestSession => {
    const seed = Math.floor(Math.random() * 2_000_000_000) + 1;
    const now = new Date().toISOString();
    const questionIds = selectQuestionsForMode(mode, seed).map((question) => question.id);
    return commit({
      mode,
      answers: {},
      skippedIds: [],
      questionIds,
      currentIndex: 0,
      startedAt: now,
      lastUpdatedAt: now,
      seed,
      appVersion: "2.0.0",
      completed: false,
    });
  }, [commit]);

  const answerQuestion = useCallback((questionId: string, rating: number, advance = true): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applyAnswer(session, questionId, rating, advance));
    } catch (error) {
      console.error("Jawaban gagal disimpan", error);
      return null;
    }
  }, [commit, session]);

  const skipQuestion = useCallback((questionId: string): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applySkip(session, questionId));
    } catch (error) {
      console.error("Pertanyaan gagal dilewati", error);
      return null;
    }
  }, [commit, session]);

  const goToQuestion = useCallback((index: number): TestSession | null => {
    if (!session) return null;
    const next = moveToQuestion(session, index);
    return next === session ? session : commit(next);
  }, [commit, session]);

  const appendTieBreakQuestions = useCallback((pair: string, baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    const newIds = getTieBreakQuestionsForPair(pair)
      .map((question) => question.id)
      .filter((id) => !source.questionIds.includes(id));
    if (newIds.length === 0) return source;
    return commit({
      ...source,
      questionIds: [...source.questionIds, ...newIds],
      currentIndex: source.questionIds.length,
      completed: false,
      tieBreakPair: pair,
      lastUpdatedAt: new Date().toISOString(),
    });
  }, [commit, session]);

  const completeSession = useCallback((baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    return commit({ ...source, completed: true, lastUpdatedAt: new Date().toISOString() });
  }, [commit, session]);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setSession(null);
  }, []);

  const currentIndex = session?.currentIndex ?? 0;
  return {
    session,
    activeQuestions,
    currentQuestion: activeQuestions[currentIndex],
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: activeQuestions.length > 0 && currentIndex === activeQuestions.length - 1,
    startNewSession,
    answerQuestion,
    skipQuestion,
    goToQuestion,
    appendTieBreakQuestions,
    completeSession,
    resetSession,
    isSessionLoaded: hydrated,
    allQuestions: ALL_QUESTIONS,
  };
}
````

---

## `src/index.css`

````css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  --color-brand-50: #ecfdf5;
  --color-brand-100: #d1fae5;
  --color-brand-500: #10b981;
  --color-brand-600: #059669;
  --color-brand-700: #047857;
  
  --color-slate-950: #020617;
  --color-slate-900: #0f172a;
}

/* Custom Interactive States and Animation Kernels */
@layer base {
  body {
    font-family: var(--font-sans);
    letter-spacing: -0.011em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
  }
}

/* Print Overrides */
@media print {
  .no-print {
    display: none !important;
  }
  body {
    background-color: white !important;
    color: black !important;
  }
}

/* Prevent layout shifts */
img {
  content-visibility: auto;
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
}
````

---

## `src/main.tsx`

````tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
````

---

## `src/scoring/engine.ts`

````ts
import type {
  AssessmentResult,
  FullChannelProfile,
  InformationElement,
  MeasurementChannel,
  ModelAPosition,
  ModelFitScore,
  SocionicsQuestion,
  TIM,
} from "../types/socionics";
import { TIM_MODELS, QUADRA_DATA } from "../constants/socionicsData";
import { canonicalPair } from "../data/tieBreakQuestions";

export const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
export const CHANNELS: MeasurementChannel[] = [
  "producer",
  "flexible",
  "mask",
  "threat",
  "receiver",
  "aspiration",
  "dismissive",
  "background",
];

/**
 * Signed theory priors for the eight Model A positions.
 * Values are design hypotheses in [-1, 1], not empirical population parameters.
 */
export const POSITION_PRIORS: Record<ModelAPosition, Record<MeasurementChannel, number>> = {
  Base: {
    producer: 0.95, flexible: 0.55, mask: -0.55, threat: -0.75,
    receiver: -0.45, aspiration: 0.15, dismissive: 0.10, background: 0.70,
  },
  Creative: {
    producer: 0.55, flexible: 0.95, mask: -0.50, threat: -0.65,
    receiver: -0.35, aspiration: 0.20, dismissive: 0.15, background: 0.60,
  },
  Role: {
    producer: -0.35, flexible: -0.05, mask: 0.90, threat: 0.25,
    receiver: -0.20, aspiration: -0.20, dismissive: 0.10, background: -0.45,
  },
  Vulnerable: {
    producer: -0.75, flexible: -0.60, mask: 0.15, threat: 0.95,
    receiver: 0.10, aspiration: -0.45, dismissive: -0.15, background: -0.85,
  },
  Suggestive: {
    producer: -0.70, flexible: -0.50, mask: -0.20, threat: 0.15,
    receiver: 0.95, aspiration: 0.40, dismissive: -0.45, background: -0.80,
  },
  Mobilizing: {
    producer: -0.35, flexible: 0.05, mask: -0.10, threat: 0.20,
    receiver: 0.40, aspiration: 0.95, dismissive: -0.45, background: -0.40,
  },
  Ignoring: {
    producer: 0.30, flexible: 0.45, mask: -0.45, threat: -0.65,
    receiver: -0.55, aspiration: -0.40, dismissive: 0.95, background: 0.30,
  },
  Demonstrative: {
    producer: 0.50, flexible: 0.60, mask: -0.55, threat: -0.70,
    receiver: -0.55, aspiration: -0.35, dismissive: 0.20, background: 0.95,
  },
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function transformResponse(answer: number, isReverse = false): number {
  const safe = clamp(answer, 1, 5);
  const centered = (safe - 3) / 2;
  return isReverse ? -centered : centered;
}

const createEmptyProfile = (): FullChannelProfile => {
  const profile = {} as FullChannelProfile;
  for (const element of ELEMENTS) {
    profile[element] = {} as Record<MeasurementChannel, number>;
    for (const channel of CHANNELS) profile[element][channel] = 0;
  }
  return profile;
};

export function calculateChannelProfile(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): FullChannelProfile {
  const profile = createEmptyProfile();
  const sums = new Map<string, number>();
  const weights = new Map<string, number>();

  for (const question of questions) {
    if (question.isTieBreak) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;

    const key = `${question.element}_${question.channel}`;
    const weight = question.designWeight || 1;
    const response = transformResponse(answer, question.reverseKeyed) * question.direction;
    sums.set(key, (sums.get(key) ?? 0) + response * weight);
    weights.set(key, (weights.get(key) ?? 0) + weight);
  }

  for (const element of ELEMENTS) {
    for (const channel of CHANNELS) {
      const key = `${element}_${channel}`;
      const denominator = weights.get(key) ?? 0;
      profile[element][channel] = denominator > 0 ? clamp((sums.get(key) ?? 0) / denominator, -1, 1) : 0;
    }
  }
  return profile;
}

export function calculatePositionFit(
  observed: Record<MeasurementChannel, number>,
  position: ModelAPosition,
): number {
  const expected = POSITION_PRIORS[position];
  let weightedSquaredError = 0;
  let totalWeight = 0;

  for (const channel of CHANNELS) {
    const emphasis = Math.abs(expected[channel]) >= 0.9 ? 1.35 : Math.abs(expected[channel]) >= 0.6 ? 1.15 : 1;
    const delta = observed[channel] - expected[channel];
    weightedSquaredError += emphasis * delta * delta;
    totalWeight += emphasis;
  }

  const rmse = Math.sqrt(weightedSquaredError / totalWeight);
  return clamp(1 - rmse / 2, 0, 1);
}

function findPosition(type: TIM, element: InformationElement): ModelAPosition {
  const positions = TIM_MODELS[type].positions;
  const found = (Object.keys(positions) as ModelAPosition[]).find((position) => positions[position] === element);
  if (!found) throw new Error(`Elemen ${element} tidak ditemukan pada Model A ${type}.`);
  return found;
}

function calculateQuadraCoherence(type: TIM, profile: FullChannelProfile): number {
  const valued = QUADRA_DATA[TIM_MODELS[type].quadra].valuedElements;
  const unvalued = ELEMENTS.filter((element) => !valued.includes(element));

  const valueSignal = (element: InformationElement): number => {
    const scores = profile[element];
    return (scores.producer + scores.flexible + scores.receiver + scores.aspiration - scores.dismissive) / 5;
  };

  const valuedAverage = valued.reduce((sum, element) => sum + valueSignal(element), 0) / valued.length;
  const unvaluedAverage = unvalued.reduce((sum, element) => sum + valueSignal(element), 0) / unvalued.length;
  return clamp((valuedAverage - unvaluedAverage) * 0.025, -0.025, 0.025);
}

function calculateHoldoutScore(
  type: TIM,
  answers: Record<string, number>,
  holdoutQuestions: SocionicsQuestion[],
): { score: number; count: number } {
  let similaritySum = 0;
  let count = 0;

  for (const question of holdoutQuestions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const position = findPosition(type, question.element);
    const expected = POSITION_PRIORS[position][question.channel];
    const observed = transformResponse(answer, question.reverseKeyed) * question.direction;
    similaritySum += 1 - Math.abs(observed - expected) / 2;
    count += 1;
  }

  return { score: count > 0 ? clamp(similaritySum / count, 0, 1) : 0.5, count };
}

function tieBreakAdjustment(type: TIM, answers: Record<string, number>, questions: SocionicsQuestion[]): number {
  let adjustment = 0;
  for (const question of questions) {
    if (!question.isTieBreak || !question.tieBreakSupport) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const support = question.tieBreakSupport[type];
    if (support === undefined) continue;
    adjustment += transformResponse(answer, false) * support * 0.0125;
  }
  return clamp(adjustment, -0.035, 0.035);
}

export function analyzeCoverage(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): AssessmentResult["coverage"] {
  const cells = new Set<string>();
  for (const question of questions) {
    if (question.isTieBreak || answers[question.id] === undefined) continue;
    cells.add(`${question.element}_${question.channel}`);
  }
  return { answeredCells: cells.size, totalCells: 64, ratio: cells.size / 64 };
}

export function analyzePersonFit(
  answers: Record<string, number>,
  orderedQuestions: SocionicsQuestion[],
): AssessmentResult["responseQuality"] {
  const answered = orderedQuestions.filter((question) => answers[question.id] !== undefined);
  const ratings = answered.map((question) => answers[question.id]);
  const total = ratings.length;

  let maxStreak = 0;
  let streak = 0;
  let previous: number | undefined;
  for (const rating of ratings) {
    if (rating === previous) streak += 1;
    else { previous = rating; streak = 1; }
    maxStreak = Math.max(maxStreak, streak);
  }

  const midpointCount = ratings.filter((rating) => rating === 3).length;
  const extremeCount = ratings.filter((rating) => rating === 1 || rating === 5).length;

  const families = new Map<string, number[]>();
  for (const question of answered) {
    if (!question.replicationFamilyId || question.isHoldout) continue;
    const values = families.get(question.replicationFamilyId) ?? [];
    values.push(transformResponse(answers[question.id], question.reverseKeyed));
    families.set(question.replicationFamilyId, values);
  }

  let pairDifferenceSum = 0;
  let pairCount = 0;
  for (const values of families.values()) {
    for (let left = 0; left < values.length; left += 1) {
      for (let right = left + 1; right < values.length; right += 1) {
        pairDifferenceSum += Math.abs(values[left] - values[right]);
        pairCount += 1;
      }
    }
  }

  return {
    straightlining: total >= 20 && maxStreak >= Math.max(10, Math.ceil(total * 0.2)),
    midpointOveruse: total >= 20 && midpointCount / total > 0.5,
    extremeResponseRatio: total > 0 ? Number((extremeCount / total).toFixed(2)) : 0,
    completionTimeSeconds: 0,
    inconsistencyScore: pairCount > 0 ? Number((pairDifferenceSum / pairCount).toFixed(2)) : 0,
  };
}

function buildAuditNotes(quality: AssessmentResult["responseQuality"], coverage: AssessmentResult["coverage"]): string[] {
  const notes: string[] = [];
  if (coverage.ratio < 1) notes.push(`Cakupan baru ${coverage.answeredCells}/64 sel elemen-kanal.`);
  if (quality.straightlining) notes.push("Ada rentang jawaban identik yang sangat panjang; hasil perlu dibaca lebih hati-hati.");
  if (quality.midpointOveruse) notes.push("Pilihan tengah digunakan sangat sering; beberapa pembeda tipe mungkin belum terlihat.");
  if (quality.extremeResponseRatio > 0.65) notes.push("Jawaban ekstrem sangat dominan; periksa apakah semua pilihan benar-benar menggambarkan pengalaman nyata.");
  if (quality.inconsistencyScore > 1.1) notes.push("Replikasi lintas konteks cukup berfluktuasi; keadaan atau peran sosial mungkin memengaruhi hasil.");
  return notes;
}

export function calculateResult(
  answers: Record<string, number>,
  allQuestions: SocionicsQuestion[],
  options?: { startedAt?: string; questionIds?: string[] },
): AssessmentResult {
  const coreQuestions = allQuestions.filter((question) => !question.isHoldout && !question.isTieBreak);
  const holdoutQuestions = allQuestions.filter((question) => question.isHoldout);
  const orderedQuestions = options?.questionIds
    ? options.questionIds.map((id) => allQuestions.find((question) => question.id === id)).filter(Boolean) as SocionicsQuestion[]
    : allQuestions;

  const profile = calculateChannelProfile(answers, coreQuestions);
  const coverage = analyzeCoverage(answers, coreQuestions);
  const quality = analyzePersonFit(answers, orderedQuestions);
  if (options?.startedAt) {
    const seconds = Math.max(0, Math.round((Date.now() - Date.parse(options.startedAt)) / 1000));
    quality.completionTimeSeconds = Number.isFinite(seconds) ? seconds : 0;
  }

  const candidateScores: ModelFitScore[] = (Object.keys(TIM_MODELS) as TIM[]).map((type) => {
    const elementFits = {} as Record<InformationElement, number>;
    let modelSimilarity = 0;

    for (const position of Object.keys(TIM_MODELS[type].positions) as ModelAPosition[]) {
      const element = TIM_MODELS[type].positions[position];
      const similarity = calculatePositionFit(profile[element], position);
      elementFits[element] = similarity;
      modelSimilarity += similarity;
    }
    modelSimilarity /= 8;

    const holdout = calculateHoldoutScore(type, answers, holdoutQuestions);
    const holdoutBlend = holdout.count > 0 ? 0.15 : 0;
    let rawSimilarity = modelSimilarity * (1 - holdoutBlend) + holdout.score * holdoutBlend;
    rawSimilarity += calculateQuadraCoherence(type, profile);
    rawSimilarity += tieBreakAdjustment(type, answers, allQuestions);
    rawSimilarity = clamp(rawSimilarity, 0, 1);

    const channelScores = {} as Record<InformationElement, number>;
    for (const element of ELEMENTS) {
      const scores = profile[element];
      channelScores[element] = Number(((scores.producer + scores.flexible + scores.background - scores.threat) / 4).toFixed(2));
    }

    return {
      type,
      fitScore: Number((rawSimilarity * 100).toFixed(1)),
      rawSimilarity,
      channelScores,
      elementFits,
      contradictions: quality.inconsistencyScore > 1.1 ? 1 : 0,
      personFitRatio: Number(clamp(1 - quality.inconsistencyScore / 2, 0, 1).toFixed(2)),
      holdoutScore: Number((holdout.score * 100).toFixed(1)),
    };
  }).sort((left, right) => right.rawSimilarity - left.rawSimilarity);

  const top1 = candidateScores[0];
  const top2 = candidateScores[1];
  const separation = (top1.rawSimilarity - top2.rawSimilarity) * 100;
  const pair = canonicalPair(top1.type, top2.type);
  const pairItems = allQuestions.filter((question) => question.tieBreakTags?.includes(pair));
  const pairAnswered = pairItems.filter((question) => answers[question.id] !== undefined).length;
  const unresolvedPair = separation < 2.5 && pairItems.length > 0 && pairAnswered < pairItems.length ? pair : undefined;

  const answeredCount = Object.keys(answers).length;
  const auditNotes = buildAuditNotes(quality, coverage);
  let confidence: AssessmentResult["confidence"] = "sedang";
  let confidenceExplanation = "Pola awal sudah terlihat, tetapi hasil tetap merupakan indeks kecocokan terhadap model teori.";

  if (answeredCount < 64 || coverage.ratio < 0.85) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Belum cukup sel elemen-kanal yang terjawab untuk membandingkan 16 model secara layak.";
  } else if (quality.straightlining) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Rentang jawaban identik terlalu panjang sehingga perbedaan antarposisi Model A tidak dapat dibaca secara layak.";
  } else if (quality.inconsistencyScore > 1.35) {
    confidence = "rendah";
    confidenceExplanation = "Pola respons menunjukkan ketidakstabilan yang cukup besar; hasil sebaiknya diuji ulang pada waktu berbeda.";
  } else if (unresolvedPair || separation < 1.5) {
    confidence = "tentatif";
    confidenceExplanation = "Dua kandidat teratas masih sangat berdekatan dan membutuhkan pertanyaan pembeda tambahan.";
  } else if (separation < 3 || coverage.ratio < 1) {
    confidence = "sedang";
    confidenceExplanation = "Satu kandidat mulai unggul, tetapi beberapa pembeda atau replikasi masih belum cukup kuat.";
  } else if (separation >= 6 && top1.holdoutScore >= 70 && quality.inconsistencyScore < 0.65) {
    confidence = "kuat";
    confidenceExplanation = "Kandidat teratas terpisah cukup jelas, sel inti tercakup, dan jawaban holdout relatif selaras.";
  } else {
    confidence = "cukup kuat";
    confidenceExplanation = "Kandidat teratas cukup konsisten dengan pola kanal Model A, dengan ketidakpastian yang masih wajar.";
  }

  return {
    top3: candidateScores.slice(0, 3),
    confidence,
    confidenceExplanation,
    unresolvedPair,
    channelProfile: profile,
    coverage,
    auditNotes,
    responseQuality: quality,
  };
}
````

---

## `src/session/sessionState.ts`

````ts
import type { TestSession } from "../types/socionics";

export function applyAnswer(
  session: TestSession,
  questionId: string,
  rating: number,
  advance: boolean,
): TestSession {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new RangeError(`Rating harus bilangan bulat 1–5, menerima ${rating}.`);
  }
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }

  return {
    ...session,
    answers: { ...session.answers, [questionId]: rating },
    skippedIds: session.skippedIds.filter((id) => id !== questionId),
    currentIndex: advance
      ? Math.min(session.currentIndex + 1, session.questionIds.length - 1)
      : session.currentIndex,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function applySkip(session: TestSession, questionId: string): TestSession {
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }
  const { [questionId]: _removedAnswer, ...remainingAnswers } = session.answers;
  return {
    ...session,
    answers: remainingAnswers,
    skippedIds: Array.from(new Set([...session.skippedIds, questionId])),
    currentIndex: Math.min(session.currentIndex + 1, session.questionIds.length - 1),
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function moveToQuestion(session: TestSession, index: number): TestSession {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) {
    return session;
  }
  return { ...session, currentIndex: index, lastUpdatedAt: new Date().toISOString() };
}
````

---

## `src/types/socionics.ts`

````ts
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
````

---

## `src/utils/optionDetails.ts`

````ts
import type { ScaleType, SocionicsQuestion } from "../types/socionics";

export interface OptionDetail {
  artinya: string;
  reaksi: string;
}

const lowerFirst = (value: string): string => value.length > 0
  ? value.charAt(0).toLocaleLowerCase("id-ID") + value.slice(1)
  : value;

const atScenario = (question: SocionicsQuestion): string => `Saat ${lowerFirst(question.scenario)}`;
const focus = (question: SocionicsQuestion): string => question.responseFocus.replace(/[.]$/, "");

const details: Record<ScaleType, (question: SocionicsQuestion, value: number) => OptionDetail> = {
  automaticity: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Dorongan untuk ${f} hampir tidak pernah menjadi respons awalmu. Biasanya perhatianmu bergerak ke cara lain yang terasa lebih langsung atau lebih akrab.`,
        reaksi: `${scene}, kamu tidak otomatis melakukan hal itu dan mungkin menunggu petunjuk, mengikuti cara yang sudah ada, atau baru memikirkannya setelah orang lain menyinggungnya.`,
      },
      {
        artinya: `Kamu bisa ${f}, tetapi biasanya perlu berhenti dan menyusun pikiran terlebih dahulu. Respons ini lebih terasa sebagai usaha sadar daripada refleks.`,
        reaksi: `${scene}, kamu mengambil jeda, menimbang apa yang perlu dilakukan, lalu baru mencoba respons tersebut jika memang dibutuhkan.`,
      },
      {
        artinya: `Respons ini muncul pada sebagian keadaan, tetapi tidak cukup konsisten untuk disebut kebiasaan otomatis. Kedekatan konteks, energi, dan tuntutan saat itu cukup menentukan.`,
        reaksi: `${scene}, kadang kamu langsung ${f}; pada kesempatan lain, kamu memakai cara berbeda atau membiarkannya lewat.`,
      },
      {
        artinya: `Dorongan untuk ${f} cukup sering datang dengan cepat. Kamu biasanya tidak membutuhkan persiapan panjang untuk mulai merespons dengan cara ini.`,
        reaksi: `${scene}, kamu segera menangkap apa yang perlu dilakukan dan mulai bergerak sebelum orang lain memberi arahan rinci.`,
      },
      {
        artinya: `Ini sangat dekat dengan respons default-mu. Dalam banyak situasi yang relevan, ${f} muncul hampir bersamaan dengan kamu menyadari apa yang sedang terjadi.`,
        reaksi: `${scene}, respons itu keluar begitu saja—cepat, lancar, dan terasa biasa bagimu meskipun orang lain mungkin perlu memikirkannya lebih lama.`,
      },
    ][value - 1];
  },

  frequency: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Pola ${f} hampir tidak pernah menggambarkan kebiasaanmu. Kalau pernah terjadi, itu lebih berupa pengecualian daripada cara yang biasa kamu pilih.`,
        reaksi: `${scene}, kamu umumnya mengambil jalan lain dan tidak merasa perlu merespons dengan pola tersebut.`,
      },
      {
        artinya: `Pola ini sesekali muncul, biasanya karena tuntutan yang cukup jelas. Tanpa alasan khusus, kamu cenderung tidak memilihnya.`,
        reaksi: `${scene}, kamu mungkin melakukannya sekali-sekali, tetapi setelah kebutuhan lewat kamu segera kembali ke cara yang lebih natural bagimu.`,
      },
      {
        artinya: `Kebiasaan ini muncul dengan frekuensi sedang. Ia cukup nyata dalam dirimu, tetapi masih sangat bergantung pada konteks dan orang yang terlibat.`,
        reaksi: `${scene}, ada kalanya kamu ${f}, sementara pada kesempatan lain kamu menilai respons itu tidak diperlukan.`,
      },
      {
        artinya: `Pola ${f} cukup sering terlihat dalam keseharianmu. Dalam banyak situasi yang relevan, respons ini termasuk pilihan yang mudah kamu ambil.`,
        reaksi: `${scene}, kamu biasanya melakukan hal tersebut tanpa perlu didesak berkali-kali, meskipun tidak selalu pada setiap kesempatan.`,
      },
      {
        artinya: `Pola ini sangat konsisten menggambarkan dirimu. Hampir setiap kali konteksnya muncul, kamu cenderung merespons dengan cara yang serupa.`,
        reaksi: `${scene}, kamu hampir selalu ${f}, sampai-sampai orang dekat mungkin sudah dapat menebak reaksimu.`,
      },
    ][value - 1];
  },

  comfort: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Melakukan ${f} terasa sangat menguras. Kamu mungkin tetap mampu menjalaninya, tetapi perlu banyak kendali diri dan biasanya ingin segera berhenti setelah tuntutan selesai.`,
        reaksi: `${scene}, kamu merasa tegang, terus mengawasi langkah sendiri, dan setelahnya membutuhkan waktu untuk memulihkan tenaga.`,
      },
      {
        artinya: `Respons ini masih terasa agak canggung atau melelahkan. Kamu dapat melakukannya, tetapi tidak ingin mempertahankannya terlalu lama.`,
        reaksi: `${scene}, kamu menjalankannya seperlunya sambil berharap situasi segera kembali ke cara yang lebih nyaman bagimu.`,
      },
      {
        artinya: `Tingkat kenyamananmu berada di tengah. Ada situasi ketika ${f} terasa lancar, tetapi ada juga keadaan ketika respons yang sama cukup menguras.`,
        reaksi: `${scene}, kenyamananmu bergantung pada tekanan, orang yang terlibat, dan seberapa jelas tujuan yang ingin dicapai.`,
      },
      {
        artinya: `Kamu cukup nyaman ${f}. Respons ini biasanya dapat dipakai tanpa ketegangan besar dan bisa kamu sesuaikan ketika keadaan berubah.`,
        reaksi: `${scene}, kamu menjalankannya dengan tenang, memperhatikan hasilnya, lalu mengubah kadar respons jika diperlukan.`,
      },
      {
        artinya: `Respons ini terasa sangat natural dan mudah diatur. Kamu dapat ${f} tanpa merasa sedang memainkan peran yang asing.`,
        reaksi: `${scene}, kamu bergerak dengan lancar, tetap fleksibel, dan masih memiliki tenaga untuk memperhatikan kebutuhan lain di sekitarmu.`,
      },
    ][value - 1];
  },

  threat: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Tuntutan untuk ${f} hampir tidak mengganggumu. Kamu dapat menghadapi tekanan ini tanpa merasa harga diri atau rasa amanmu sedang diserang.`,
        reaksi: `${scene}, kamu tetap tenang, memikirkan langkah yang tersedia, dan tidak merasa perlu membela diri secara berlebihan.`,
      },
      {
        artinya: `Ada sedikit rasa tidak nyaman, tetapi tekanannya masih mudah dikelola. Keraguan muncul sebentar lalu biasanya mereda.`,
        reaksi: `${scene}, kamu mungkin berhenti sejenak atau merasa agak jengkel, namun tetap dapat melanjutkan tanpa kehilangan kendali.`,
      },
      {
        artinya: `Tuntutan ini mulai terasa menekan. Kamu masih mampu merespons, tetapi perlu usaha nyata untuk mengatasi tegang, ragu, atau takut dinilai salah.`,
        reaksi: `${scene}, pikiranmu melambat, kamu menjadi lebih hati-hati, dan sesekali mencari kepastian sebelum bertindak.`,
      },
      {
        artinya: `Tekanan untuk ${f} terasa berat dan mudah menyentuh titik sensitifmu. Kamu dapat menjadi sangat tegang, defensif, atau kehilangan keluwesan.`,
        reaksi: `${scene}, kamu kesulitan berpikir bebas, takut membuat kesalahan, dan sangat ingin tuntutan itu dialihkan atau dipersempit.`,
      },
      {
        artinya: `Ini termasuk tuntutan yang paling mudah membuatmu beku, malu, defensif, atau ingin menghindar. Reaksinya dapat terasa jauh lebih besar daripada situasinya sendiri.`,
        reaksi: `${scene}, kamu bisa nge-blank, menutup percakapan, membalas dengan ketus, atau mencari jalan keluar karena tekanan terasa terlalu dekat dengan titik rawanmu.`,
      },
    ][value - 1];
  },

  relief: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Bantuan untuk ${f} tidak banyak mengubah keadaanmu. Kamu mungkin lebih suka mengurusnya sendiri atau membutuhkan bentuk dukungan yang berbeda.`,
        reaksi: `${scene}, kamu menghargai niat orang tersebut, tetapi tidak merasa lebih tenang atau lebih mampu setelah bantuan diberikan.`,
      },
      {
        artinya: `Bantuan ini memberi sedikit kemudahan, tetapi bukan hal yang benar-benar kamu cari. Efeknya cepat lewat atau hanya berguna pada bagian kecil.`,
        reaksi: `${scene}, kamu menerima satu-dua bagian yang berguna lalu tetap mengandalkan cara sendiri untuk menyelesaikan sisanya.`,
      },
      {
        artinya: `Dukungan tersebut cukup membantu, terutama ketika keadaan sedang sulit. Namun, kamu tidak selalu membutuhkannya untuk merasa aman atau mampu.`,
        reaksi: `${scene}, kamu merasa beban sedikit berkurang dan dapat melanjutkan dengan lebih tenang, meski tidak sepenuhnya bergantung pada bantuan itu.`,
      },
      {
        artinya: `Bantuan untuk ${f} terasa sangat berguna. Kehadiran orang yang tepat dapat membuat situasi yang tadinya berat menjadi jauh lebih sederhana.`,
        reaksi: `${scene}, kamu cepat merasa tenang, mempercayai arah yang diberikan, dan lebih mudah bergerak setelah mendapat dukungan tersebut.`,
      },
      {
        artinya: `Bentuk bantuan ini memberi kelegaan yang sangat dalam. Rasanya seperti seseorang akhirnya menangani bagian yang selama ini sulit kamu pegang sendirian.`,
        reaksi: `${scene}, keteganganmu turun dengan jelas, kamu membiarkan orang yang kompeten membantu, dan keadaan terasa jauh lebih aman atau mudah dijalani.`,
      },
    ][value - 1];
  },

  recognition: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Pengakuan mengenai kemampuan untuk ${f} hampir tidak menyentuh kebutuhan pribadimu. Pujian itu mungkin terdengar baik, tetapi tidak banyak mengubah semangatmu.`,
        reaksi: `${scene}, kamu menerima komentar tersebut dengan biasa saja lalu kembali fokus pada hal lain yang lebih berarti bagimu.`,
      },
      {
        artinya: `Pujian di area ini cukup menyenangkan, tetapi bukan sesuatu yang kamu kejar. Efeknya ringan dan tidak bertahan lama.`,
        reaksi: `${scene}, kamu tersenyum atau mengucapkan terima kasih, namun tidak merasa perlu membuktikannya lagi.`,
      },
      {
        artinya: `Pengakuan ini memiliki arti sedang. Pada waktu tertentu ia dapat menambah semangat, tetapi tidak selalu menjadi sumber kebanggaan utama.`,
        reaksi: `${scene}, kamu merasa senang dan mungkin mencoba mengulang keberhasilan itu, tergantung seberapa penting konteksnya.`,
      },
      {
        artinya: `Pujian tentang kemampuan untuk ${f} terasa sangat berarti. Ia dapat membuatmu merasa dilihat dan mendorongmu berkembang lebih jauh.`,
        reaksi: `${scene}, kamu mengingat komentar itu, menjadi lebih percaya diri, dan terdorong menunjukkan bahwa kemampuan tersebut memang dapat kamu bangun.`,
      },
      {
        artinya: `Pengakuan di area ini menyentuh bagian diri yang sangat ingin tumbuh dan dibenarkan. Pujian yang tepat dapat bertahan lama dalam ingatanmu.`,
        reaksi: `${scene}, kamu merasa sangat tersentuh, ingin segera mengembangkan kemampuan itu, dan mungkin mengulang komentar tersebut di kepala selama berhari-hari.`,
      },
    ][value - 1];
  },

  competence: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      { artinya: `Kamu merasa sangat kesulitan ${f}, terutama ketika situasinya baru atau kompleks.`, reaksi: `${scene}, kamu mudah kehilangan arah dan membutuhkan bantuan yang sangat konkret.` },
      { artinya: `Kemampuanmu di area ini masih terbatas. Kamu bisa melakukannya jika ada contoh, aturan, atau orang yang mendampingi.`, reaksi: `${scene}, kamu bergerak hati-hati dan sering mengecek apakah langkahmu sudah benar.` },
      { artinya: `Kamu cukup mampu ${f} dalam kondisi yang mendukung, tetapi kualitasnya belum selalu stabil.`, reaksi: `${scene}, kamu dapat menyelesaikannya dengan hasil wajar selama tekanan tidak terlalu tinggi.` },
      { artinya: `Kamu cukup terampil ${f} dan biasanya dapat bekerja mandiri dalam situasi yang umum.`, reaksi: `${scene}, kamu tahu harus mulai dari mana dan dapat memperbaiki kesalahan tanpa banyak bantuan.` },
      { artinya: `Kemampuan ini terasa sangat kuat dan luas. Kamu dapat ${f} bahkan ketika konteks berubah atau masalah menjadi rumit.`, reaksi: `${scene}, kamu bergerak mantap, melihat beberapa tingkat persoalan, dan masih mampu membantu orang lain.` },
    ][value - 1];
  },

  importance: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      { artinya: `Aspek ${f} hampir tidak masuk dalam pertimbangan pentingmu.`, reaksi: `${scene}, kamu mudah mengesampingkannya demi hal lain yang terasa lebih utama.` },
      { artinya: `Aspek ini memiliki bobot kecil dan biasanya hanya dipertimbangkan jika ada alasan praktis.`, reaksi: `${scene}, kamu menaruhnya sebagai prioritas tambahan, bukan penentu keputusan.` },
      { artinya: `Pentingnya aspek ini berubah sesuai konteks.`, reaksi: `${scene}, kadang kamu menjadikannya pertimbangan utama, kadang hampir tidak memakainya.` },
      { artinya: `Aspek ${f} termasuk pertimbangan penting yang sering memengaruhi pilihanmu.`, reaksi: `${scene}, kamu rela mengubah rencana agar bagian ini tetap terjaga.` },
      { artinya: `Aspek ini berada sangat dekat dengan prioritas inti dan sulit kamu tukar dengan pertimbangan lain.`, reaksi: `${scene}, kamu cenderung mempertahankannya meskipun pilihan itu menuntut biaya atau penyesuaian besar.` },
    ][value - 1];
  },

  comparison: (question, value) => {
    const scene = atScenario(question);
    return [
      {
        artinya: `Bagian setelah kata “daripada” jauh lebih menggambarkan respons naturalmu dibanding bagian pertama.`,
        reaksi: `${scene}, kamu dengan jelas bergerak menuju sisi kedua dari perbandingan dalam kalimat tersebut.`,
      },
      {
        artinya: `Kedua sisi mungkin ada, tetapi sisi kedua terasa lebih sering atau lebih natural bagimu.`,
        reaksi: `${scene}, kamu cenderung memilih pola kedua meskipun sesekali tetap menggunakan sisi pertama.`,
      },
      {
        artinya: `Kedua sisi terasa hampir sama dekat, atau pilihanmu sangat bergantung pada keadaan.`,
        reaksi: `${scene}, kamu bisa bergerak ke salah satu sisi tanpa merasa ada kecenderungan yang benar-benar dominan.`,
      },
      {
        artinya: `Kedua sisi mungkin ada, tetapi bagian pertama lebih sering terasa natural bagimu.`,
        reaksi: `${scene}, kamu cenderung memilih pola pertama meskipun masih dapat memakai sisi kedua ketika dibutuhkan.`,
      },
      {
        artinya: `Bagian pertama jauh lebih menggambarkan respons naturalmu dibanding bagian setelah kata “daripada”.`,
        reaksi: `${scene}, pilihanmu dengan jelas mengikuti sisi pertama dari perbandingan tersebut.`,
      },
    ][value - 1];
  },
};

export function getOptionDetail(question: SocionicsQuestion, value: number): OptionDetail {
  const safeValue = Math.min(5, Math.max(1, Math.round(value)));
  return details[question.scaleType](question, safeValue);
}
````

---

## `tsconfig.json`

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
````

---

## `vite.config.ts`

````ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 650,
  },
});
````

---
