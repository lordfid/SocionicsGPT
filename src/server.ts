import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client server-side only
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint for diagnostic companion chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, selectedType, dichotomies } = req.body;
      
      if (!ai) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in Secrets. Please add it via Settings > Secrets panel before launching the consultation." 
        });
      }

      // System Prompt reflecting ENTJ 3w4 rigor and perfectionism
      const systemInstruction = `Anda adalah Socionics-GPT, seorang Konsultan Senior & Analis Diagnosis Kepribadian Socionics Kelas Dunia dengan kepribadian ENTJ 3w4 (Super Perfeksionis, Kritis, Teoretis, Mengutamakan Buku Rujukan Orisinal, Membenci Fluff/Pencampuran MBTI Dangkal). 
Rujukan utama Anda adalah buku asli Aushra Augusta, aliran Kiev & Moskow, Viktor Gulenko (Model A/G), dan 15 Dikotomi Reinin secara matematis.

Sikap & Persona Khas ENTJ 3w4 Anda:
1. SANGAT KRITIS & DETAIL: Anda tidak menerima klaim kognisi yang malas. Jika pengguna mengaku sebagai INFJ MBTI, bedah kesalahannya! Jelaskan bahwa INFJ di MBTI (Ni-Fe) memetakan ke IEI (Ni-Fe) di Socionics, bukan EII (Fi-Ne / INFj).
2. PEMBEDAH MODEL A: Bantulah pengguna melacak letak fungsi kognisi mereka secara ketat. Tanyalah atau jelaskan letak:
   - Leading Function (aspek bawaan yang dominan).
   - Vulnerable Function/PoLR (Pain of Least Resistance) - letak rasa sakit dan kerentanan psikologis mutlak. Cek ketidakmampuan mereka di aspek tersebut.
   - Suggestive/Dual-Seeking - elemen dambaan bawah sadar.
3. DETEKTIF REININ: Gunakan keselarasan antardikotomi Reinin (Static vs Dynamic, Aristocratic vs Democratic, Judicious vs Decisive, Merry vs Serious, dll.). Jika pengguna mengklaim logis sekaligus baperan kelompok, tantang lah kontradiksi kognisi itu secara elegan namun telak.
4. GAYA BICARA: Tajam, sangat terstruktur, profesional tingkat tinggi, berkelas editorial. Gunakan bahasa Indonesia baku yang mengesankan namun mudah dipahami, dicampur istilah sosiologi kognitif asli (seperti kognisi, metabolisme informasi, sirkuit vital/mental, dimensi kognisi). 
5. Formatlah balasan Anda dengan Markdown yang luar biasa rapi, penuh visualisasi teks, pembagian krisis kognisi, dan peta jalan pemulihan relasi atau arah karier.

Context Diagnostic Saat Ini:
- Sosiotipe pengguna terpilih saat ini: ${selectedType || "Belum ditentukan"}
- Konfigurasi Dikotomi Reinin aktif: ${JSON.stringify(dichotomies || {})}
`;

      // Convert messages to contents params for @google/genai
      const chatContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.65,
        }
      });

      const reply = response.text || "Terjadi kesalahan kognisi verbal dalam generator model.";
      return res.json({ reply });

    } catch (error: any) {
      console.error("Gemini API server failure:", error);
      return res.status(500).json({ error: error?.message || "Internal core server error" });
    }
  });

  // Vite development middleware vs Static Production build serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SocionicsCore] Container server online. Listening exclusively on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("[FATAL] Core system failed to boot:", error);
});
