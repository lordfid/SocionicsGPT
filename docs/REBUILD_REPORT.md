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
