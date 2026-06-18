# Changelog

## 2.0.3 — Editorial copy terintegrasi

- Memasukkan Versi Kasual, Artinya, dan Reaksi yang lebih hidup ke proyek terbaru.
- Mempertahankan perbaikan autosave: auto-next memakai session yang baru saja menyimpan jawaban.
- Menghapus badge skala internal dari panel bantuan peserta.
- Mengganti label “Contoh reaksi” menjadi “Reaksi” dan menghapus gaya kutipan formal.
- Memperhalus bahasa layar tes agar lebih dekat dengan gaya `aku/kamu`.
- Menambahkan `scripts/auditLanguage.ts` untuk mencegah bahasa generik, `Anda/saya`, dan penyalinan kalimat asli.
- Menambahkan `scripts/exportEditorialCopy.ts` untuk menghasilkan seluruh 256 item beserta 1.280 Artinya dan 1.280 Reaksi dalam satu TXT.
- Menambahkan `docs/EDITORIAL_COPY_ALL_256.txt` sebagai naskah editor yang bisa direvisi tanpa menyentuh scoring.

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
- Pertanyaan utama tampil dalam Versi Kasual satu tarikan napas; kalimat asli tetap bisa dibuka.
- Artinya menjelaskan proses batin, sedangkan Reaksi wajib menggambarkan tindakan nyata yang spesifik.
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

## 2.0.2 — Revisi bahasa peserta dan autosave

- Menjadikan Versi Kasual sebagai kalimat utama yang dibaca peserta.
- Kalimat asli tetap tersedia dalam panel kecil “Lihat kalimat asli”.
- Mengganti penjelasan opsi generik dengan bahasa harian yang membedakan proses batin dan tindakan nyata.
- Menambahkan aturan keras: Artinya membahas isi kepala; Reaksi wajib berupa perilaku yang bisa divisualkan.
- Menghapus gaya “hal ini”, “situasi tersebut”, dan penempelan `responseFocus` ke Reaksi.
- Memperbaiki auto-next agar memakai session terbaru dan tidak menimpa jawaban yang baru disimpan.

## 2.0.1 — Final quality gate

- Mencegah sesi diselesaikan setelah hanya beberapa jawaban; seluruh item aktif harus dijawab atau dilewati terlebih dahulu.
- Menyatukan jalur penyelesaian normal, skip terakhir, dan adaptive tie-break agar jawaban terakhir tidak hilang.
- Memperbaiki skip pada item yang sebelumnya dijawab: jawaban lama kini dihapus sebelum item dicatat sebagai dilewati.
- Menambahkan lexical near-duplicate gate ke audit instrumen.
- Memastikan tulisan internal seperti `Seeded ID` tidak tampil di UI peserta.