# Laporan Integrasi Bahasa v2.0.3

## Sumber proyek

Versi ini dibangun dari ZIP terbaru yang diunggah pengguna, lalu diperiksa ulang sebelum perubahan diterapkan.

## Yang dimasukkan

- Versi Kasual menjadi kalimat utama di layar tes.
- Kalimat formal tetap tersedia lewat panel `Lihat kalimat asli`.
- `Artinya` menjelaskan proses batin.
- `Reaksi` menampilkan tindakan fisik atau perilaku nyata.
- Penjelasan tidak lagi menempelkan `responseFocus` secara mentah.
- Label internal skala di panel peserta dihapus.
- Label `Contoh reaksi` diganti menjadi `Reaksi`.
- Gaya kutipan miring pada Reaksi dihapus agar terasa seperti contoh perilaku, bukan dialog.
- Copy layar utama tes diperhalus agar lebih dekat dengan gaya `aku/kamu`.

## Perlindungan bug yang dipertahankan

Auto-next tetap memakai `savedSession`:

```ts
goToQuestion(savedSession.currentIndex + 1, savedSession);
```

Jadi jawaban tidak ditimpa kembali oleh closure session lama.

## Tambahan editor

- `docs/EDITORIAL_COPY_ALL_256.txt`
- `scripts/exportEditorialCopy.ts`
- `scripts/auditLanguage.ts`

File editorial memuat:

- 256 Versi Kasual
- 1.280 Artinya
- 1.280 Reaksi
- metadata item yang tidak boleh diubah

## Hasil pemeriksaan

- TypeScript: lulus
- Audit instrumen: lulus
- Audit 10.000 sesi: lulus
- Audit bahasa: 256 item dan 1.280 penjelasan lulus
- 64/64 core cells lengkap
- 16/16 synthetic TIM recovered
- Production build: lulus
