# Revision & Audit — Socionics Dalam Diriku v2.3.0

Tanggal audit: 19 Juni 2026

## Ringkasan revisi

Versi ini merombak proyek menjadi satu aplikasi frontend statis yang bersih dan konsisten. Sistem lama yang saling bertabrakan sudah dibuang, lalu UI utama dihubungkan ke bank pertanyaan dan scoring engine yang benar-benar aktif.

## Perubahan utama

- Nama proyek diperbaiki menjadi `socionics-dalam-diriku`.
- Title HTML diperbaiki menjadi `Socionics Dalam Diriku`.
- Semua dependency backend dan layanan eksternal dihapus.
- `package-lock.json` disinkronkan ulang dengan `package.json`.
- `vercel.json` dibuat aman untuk Vercel dengan `npm ci`.
- Source lama yang tidak aktif dan konflik dihapus.
- `App.tsx` dibangun ulang memakai:
  - `src/data/coreQuestions.ts`
  - `src/data/holdoutQuestions.ts`
  - `src/data/tieBreakQuestions.ts`
  - `src/scoring/engine.ts`
  - `src/hooks/useTestSession.ts`
- UI tes dibuat ulang dengan mode Ringkas, Standar, Mendalam.
- Hasil final kini memakai gate coverage, straightlining, midpoint overuse, extreme response ratio, inconsistency, holdout score, dan unresolved pair.
- Adaptive tie-break tersambung: jika top kandidat terlalu dekat, sistem menambahkan pertanyaan klarifikasi.
- Kartu hasil PNG ditambahkan dengan:
  - foto opsional,
  - tema warna,
  - orientasi Story / Feed / Square / Landscape,
  - tombol Unduh dan Bagikan.
- Atlas 16 TIM dan Audit Instrumen ditambahkan sebagai tab aplikasi.

## Checklist arsitektur

| Area | Status | Catatan |
|---|---:|---|
| Satu engine scoring aktif | PASS | `src/scoring/engine.ts` menjadi sumber scoring utama. |
| Source konflik lama | PASS | File dan folder lama yang tidak tersambung sudah dihapus. |
| Backend/API key | PASS | Tidak ada backend/API key/runtime server. |
| Branding final | PASS | UI dan metadata memakai `Socionics Dalam Diriku`. |
| Lockfile sinkron | PASS | `npm ci` berhasil setelah revisi. |
| Type-check | PASS | `npm run lint` berhasil. |
| Build produksi | PASS | `npm run build` berhasil. |
| UI leak pada item | PASS | Tidak ditemukan kata internal seperti holdout/diferensiator/seeded pada teks item. |
| Coverage 64 sel | PASS | 64/64 sel elemen × kanal tersedia. |

## Audit bank pertanyaan aktif

| Metrik | Nilai |
|---|---:|
| Total item aktif | 256 |
| Core item | 192 |
| Holdout item | 32 |
| Tie-break item | 32 |
| Elemen × kanal tercakup | 64/64 |
| Item dengan UI leak | 0 |

## Sebaran core per elemen

| Elemen | Item |
|---|---:|
| Ne | 24 |
| Ni | 24 |
| Se | 24 |
| Si | 24 |
| Te | 24 |
| Ti | 24 |
| Fe | 24 |
| Fi | 24 |

## Sebaran core per kanal

| Kanal | Item |
|---|---:|
| producer | 24 |
| flexible | 24 |
| mask | 24 |
| threat | 24 |
| receiver | 24 |
| aspiration | 24 |
| dismissive | 24 |
| background | 24 |

## Audit mode tes

| Mode | Jumlah item aktif |
|---|---:|
| Ringkas | 80 |
| Standar | 128 |
| Mendalam | 224 |

## Audit response quality

| Skenario respons | Hasil gate |
|---|---|
| Semua jawaban 3 pada mode Ringkas | `tidak cukup bukti`, straightlining terdeteksi, midpoint overuse terdeteksi |
| Semua jawaban 5 pada mode Ringkas | `tidak cukup bukti`, straightlining terdeteksi, extreme response ratio = 1 |

## Perintah validasi yang berhasil

```bash
npm ci --no-audit --no-fund
npm run lint
npm run build
```

## Catatan batasan jujur

- Bank pertanyaan sudah seimbang secara struktur desain, tetapi belum memiliki validasi empiris populasi besar. Jadi bahasa hasil tetap indikatif, bukan vonis klinis.
- Beberapa deskripsi profil masih bergaya editorial kuat. Jika ingin rasa lebih lembut/psikologis, tahap selanjutnya adalah polish copy profil TIM dan item agar lebih natural tanpa melemahkan scoring.
- Kartu hasil dibuat via Canvas internal tanpa library tambahan. Ini menjaga deploy ringan, tetapi styling card bisa dikembangkan lagi jika ingin kualitas visual seperti desain studio profesional.
