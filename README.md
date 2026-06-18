# Socionics Dalam Diriku

Aplikasi web statis untuk tes Socionics berbasis Model A, 8 Information Elements, quadra, coverage audit, holdout validation, adaptive tie-break, dan kartu hasil yang bisa diunduh.

## Isi utama

- React + TypeScript + Vite.
- Berjalan sepenuhnya di browser.
- Tidak membutuhkan backend, database, API key, atau environment secret.
- Jawaban dan foto opsional disimpan lokal di browser pengguna.
- Scoring aktif memakai satu engine: `src/scoring/engine.ts`.
- Bank pertanyaan aktif memakai `src/data/coreQuestions.ts`, `src/data/holdoutQuestions.ts`, dan `src/data/tieBreakQuestions.ts`.

## Jalankan lokal

```bash
npm ci
npm run dev
```

## Cek kualitas

```bash
npm run lint
npm run build
```

## Deploy Vercel

Upload isi folder ini ke repository, lalu deploy sebagai proyek Vite. File `vercel.json` sudah memakai:

- `npm ci --no-audit --no-fund`
- `npm run build`
- output `dist`

## Catatan interpretasi

Tes ini bukan diagnosis klinis. Hasil memakai bahasa kemungkinan, kecenderungan, dan indikasi pola. Confidence rendah atau jawaban terlalu monoton akan ditandai oleh quality gate.
