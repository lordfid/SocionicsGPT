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
