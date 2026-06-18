# Changelog

## 2.1.2 — Library result stage 2

- Mendesain ulang cover hasil utama menjadi sampul buku editorial.
- Menata Top 3 sebagai rak katalog kandidat.
- Mendesain ulang generator kartu hasil agar kontrasnya aman di tema terang dan gelap.
- Mengubah perbandingan tipe menjadi tampilan buku terbuka dua halaman.
- Mengubah analisis hubungan menjadi laci katalog tipe dan kartu catatan relasi.
- Memperbaiki hierarki warna, ukuran teks, dan layout mobile.
- Mempertahankan scoring, Model A, compare, intertype, autosave, dan ekspor kartu.

## 2.1.0 — Library Editorial Results

### Bahasa hasil

- Menghapus framing empat pintu dan metafora berlebihan.
- Mengganti hasil menjadi profil editorial yang ringkas, tajam, dan mudah dipindai.
- Menambahkan blok Catatan ahli, Versi gampangnya, Stereotipe internet, Yang sering disalahpahami, Blind spot, dan Saran praktis.
- Menggunakan kata “kamu” secara konsisten pada halaman hasil.
- Menjaga stereotipe sebagai bagian ringan yang diberi label jelas, bukan fakta.

### UI/UX

- Membangun tema perpustakaan modern dengan warna walnut, parchment, burgundy, navy, dusty plum, dan muted gold.
- Menambahkan rak pembacaan mengambang, kartu katalog, bookmark, dan rekomendasi bergaya punggung buku.
- Mengganti font utama menjadi Plus Jakarta Sans dan DM Serif Display.
- Menambahkan navigasi hasil yang sticky di desktop dan horizontal di mobile.
- Mempertahankan Bandingkan Dengan Tipe Lain dan Analisis Hubungan Antar-Tipe, lalu menyelaraskan warna dan bahasanya.

### Performa dan teknis

- Memecah ResultPortal menjadi lazy-loaded chunk agar bundle utama lebih kecil.
- Mempertahankan perbaikan autosave dengan navigasi berbasis savedSession.
- TypeScript, audit instrumen 10.000 seed, dan production build lulus.

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
## 2.0.4 — Four-Door Result Experience

- Mempertahankan fitur **Bandingkan Dengan Tipe Lain** dan **Analisis Hubungan Antar-Tipe**.
- Menambahkan hasil berbentuk empat pintu interaktif:
  - Pintu A: mesin batin, Base, Creative, Role, Demonstrative, ritme, dan bukti penyangkal.
  - Pintu B: peta sukacita, marah, takut, sedih, malu, iri, muak, cinta, bosan, dan regulasi.
  - Pintu C: cara melihat aturan, politik, agama, ekonomi, masyarakat, kekuasaan, dan kontribusi publik.
  - Pintu D: nasihat, sirkel, hadiah, buku, film, musik, pekerjaan, destinasi, kosakata, dan eksperimen hidup.
- Setiap kartu hasil memiliki bagian **Vibe**, **Artinya**, pembacaan utama, sisi rawan, dan eksperimen.
- Menambahkan rekomendasi berbeda untuk seluruh 16 TIM.
- Menampilkan sinyal terkuat dari channel profile aktual peserta.
- Menambahkan batas interpretasi agar hasil mendalam tidak disalahartikan sebagai diagnosis, ramalan ideologi, atau keputusan hidup mutlak.
