# UI/UX Revision Report — v2.1.3

Fokus revisi kali ini adalah membetulkan masalah yang terlihat pada layar hasil: kontras rendah, teks yang tampak tenggelam, navigasi bab hasil yang sempit di mobile, gaya penulisan yang tidak konsisten, dan tampilan hasil yang kurang terasa “menarik dibaca”.

## Ringkasan revisi utama

### A. Perbaikan keterbacaan dan kontras
1. Memperbaiki struktur tampilan `ResultPortal` agar tidak lagi bergantung pada utilitas `dark:` yang tidak aktif di konteks tema sekarang.
2. Mengganti pendekatan warna teks di halaman hasil dengan kelas berbasis `theme === "dark"` / `theme === "light"`.
3. Meningkatkan kontras judul besar pada halaman hasil.
4. Meningkatkan kontras paragraf deskripsi utama.
5. Meningkatkan kontras isi kartu insight agar tidak lagi tampak pudar.
6. Meningkatkan kontras note box / callout box.
7. Meningkatkan kontras area “Tingkat Keyakinan Tes”.
8. Meningkatkan kontras daftar sinyal jawaban.
9. Meningkatkan kontras daftar rekomendasi rak.
10. Meningkatkan kontras chip metadata pada cover hasil.

### B. Perbaikan struktur visual halaman hasil
11. Menata ulang hero hasil supaya lebih editorial dan lebih “layak dibaca”.
12. Menambahkan ringkasan editorial yang lebih jelas di bagian atas.
13. Menambahkan blok “Pendapat Ahli Singkat”.
14. Menambahkan blok “Stereotipe Internet”.
15. Menambahkan chip observasi / sinyal jawaban yang lebih rapi.
16. Menambahkan highlight chips pada cover kandidat utama.
17. Menata ulang kartu kandidat top-3 agar lebih bersih.
18. Menegaskan hierarki visual antara judul, label, isi, dan catatan.
19. Membuat card insight terasa lebih konsisten antar-bagian.
20. Menata ulang rekomendasi menjadi rak yang lebih rapi dan lebih mudah dipindai.

### C. Perbaikan mobile UI / navigation
21. Mengubah navigasi bab hasil dari pola sempit / sulit dibaca menjadi grid responsif.
22. Membuat tab navigasi bab hasil lebih tinggi dan lebih mudah ditekan dengan jari.
23. Menjaga judul tab bisa membungkus (wrap), sehingga tidak terpotong.
24. Menambahkan ikon area tab agar scanning visual lebih cepat.
25. Membuat layout nav 2 kolom di tablet / mobile lebar, 1 kolom di mobile sempit, dan 1 kolom vertikal di desktop sidebar.
26. Menyesuaikan layout hero cover agar lebih nyaman di layar kecil.
27. Mengurangi potensi kesan “sesak” di mobile.
28. Membuat kartu hasil atas tidak terasa terlalu kosong atau terlalu padat.

### D. Perbaikan copywriting / capitalization
29. Menambahkan utilitas `polishEditorialText()` untuk merapikan teks hasil.
30. Memastikan kalimat yang tampil dimulai dengan huruf kapital.
31. Mengurangi kemunculan pembukaan kalimat yang dimulai huruf kecil.
32. Mengganti sapaan “Anda” menjadi “Kamu” pada layer presentasi hasil.
33. Merapikan daftar teks rekomendasi agar konsisten kapitalisasi awalnya.
34. Merapikan copy hasil agar lebih natural dibaca.
35. Mengurangi rasa terlalu “aneh” / terlalu puitis di cover hasil dengan memakai snapshot editorial yang lebih ringkas.

### E. Perbaikan estetika tambahan
36. Menghilangkan rotasi kartu kecil yang memberi kesan kurang rapi.
37. Memperhalus background card dan panel untuk kesan lebih premium.
38. Memperjelas batas antar-bagian hasil.
39. Memperkuat tampilan callout “Yang sering bikin orang salah paham”.
40. Memperkuat tampilan callout “Yang perlu kamu waspadai”.
41. Memperkuat tampilan note batas interpretasi.
42. Menambahkan ikon rak rekomendasi agar lebih menarik secara visual.
43. Memoles ulang warna cover utama agar lebih seimbang di dark mode.
44. Memoles ulang warna cover utama agar tidak terlalu datar di light mode.
45. Memperbaiki rasa keseluruhan halaman hasil supaya lebih “mau dibaca terus”.

## File yang direvisi
- `src/components/ResultPortal.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/utils/editorialText.ts`

## Catatan teknis
- Build produksi berhasil.
- Type-check / lint berhasil.
- Revisi ini fokus pada UI/UX hasil dan presentasi copy, belum menyentuh audit empiris reliabilitas psikometrik.
