# Panduan Deployment & Produksi
## Aplikasi Web - "Socionics Dalam Diriku"

Aplikasi ini dirancang sebagai SPA (*Single Page Application*) statis murni yang 100% berjalan di sisi klien (browser). Aplikasi ini tidak memerlukan database eksternal, server backend, kunci API rahasia, atau langganan cloud berbayar.

---

### 1. Prasyarat Lingkungan Kerja
Pastikan peranti Anda telah terpasang:
- **Node.js:** Versi 18 atau lebih tinggi.
- **npm:** Versi 9 atau lebih tinggi.

---

### 2. Instruksi Instalasi Lokal
1. Ekstrak seluruh file proyek ke folder tujuan.
2. Buka terminal atau Command Prompt pada folder tersebut.
3. Jalankan perintah instalasi dependency:
   ```bash
   npm install
   ```

---

### 3. Menjalankan Server Pengembangan (Local Dev Server)
Untuk menguji aplikasi secara interaktif dengan dukungan *Hot Module Replacement (HMR)* di komputer lokal:
```bash
npm run dev
```
Aplikasi secara bawaan dapat diakses pada alamat: `http://localhost:3000` (atau port alternatif yang diberikan oleh Vite).

---

### 4. Melakukan Kompilasi Produksi (Production Build)
Untuk melakukan kompilasi file aset produksi statis optimal:
```bash
npm run build
```
Hasil build akan tersimpan dalam folder `/dist`. Folder ini berisi:
- `/dist/index.html` (Entrypoint tunggal terkompilasi)
- `/dist/assets/` (Gabungan script TypeScript, style CSS Tailwind, dan font)

Aset di dalam folder `/dist` ini siap diunggah langsung ke penyedia hosting statis mana pun.

---

### 5. Deployment ke Vercel (Static App)
Karena aplikasi ini statis murni, men-deploy-nya ke Vercel sangatlah mudah:
1. Hubungkan repository GitHub proyek Anda dengan Vercel Dashboard.
2. Atur konfigurasi build berikut:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Klik **Deploy**. Aplikasi akan online dalam waktu kurang dari 1 menit.

---

### 6. Beroperasi Sebagai Aplikasi Mandiri Offline
Anda juga dapat membuka aplikasi secara langsung dari piringan penyimpanan lokal (hard disk/flashdisk) tanpa koneksi internet sama sekali:
1. Buat hasil build dengan `npm run build`.
2. Gunakan static server lokal minimal seperti `http-server` (bisa diinstal via `npm install -g http-server`) untuk membukanya harian tanpa internet:
   ```bash
   npx http-server dist
   ```
3. Data jawaban Anda tetap aman dan andal tersimpan di `localStorage` peranti masing-masing.
