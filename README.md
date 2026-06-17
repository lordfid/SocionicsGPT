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
