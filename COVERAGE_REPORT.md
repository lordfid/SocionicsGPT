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
