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
