import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoints FIRST
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '3.0.0-perfectionist' });
});

// Secular Gemini consultant endpoint securely on the backend
app.post('/api/gemini/consult', async (req, res) => {
  const { name, primaryType, secondaryType, answers, confidence, coverage, userQuestion } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the host container secrets.' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const promptMessage = `
Context & Profile:
User Name: ${name || 'Researcher'}
Primary TIM: ${primaryType}
Secondary TIM (Close Match): ${secondaryType || 'None'}
Diagnostic Confidence: ${confidence}%
Metric Coverage: ${coverage * 100}%
User Question: "${userQuestion || 'Tinjau model batin kepribadian saya berdasarkan Model A dan tunjukkan kontradiksi potensial yang paling berbahaya.'}"

Persona Instruction:
Anda adalah pakar senior Socionics ber-temperamen ENTJ 3w4 (super perfectionist, tajam, bermartabat tinggi, terpelajar, dan sangat teliti tanpa ampun terhadap kelemahan atau pathology aneh). Bicaralah menggunakan Bahasa Indonesia bercampur terminologi Socionics (Base, Creative, PoLR, Suggestive) secara kasual namun megah, tegas, dan sangat akurat. 

Sikap Anda:
1. Menolak bersikap puitis romantis palsu. Tekankan bahwa kesadaran letak fungsi Model A batin jauh lebih penting daripada ramalan nasib.
2. Bedah kontradiksi terdalam batin bertipe ${primaryType}. Tunjukkan konflik antara ego (Fungsi 1-2) dengan area rentan PoLR (vulnerable) dan suggestive mereka dengan kaidah sinematik/perilaku nyata.
3. Jawab pertanyaan pengguna ("${userQuestion}") dengan analisis tajam dan logis beralter ENTJ. Yakinkan dia untuk merapikan sistem kehidupannya berlandaskan data empiris yang benar.

Tulis dalam format laporan editorial berstruktur jernih, tajam, beralter, dan penuh ritme batin.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptMessage,
      config: {
        temperature: 0.8,
        systemInstruction: 'Anda adalah Socionics Master berpersona ENTJ 3w4 perfectionist yang menilai diagnosa psikologis batin pengguna dengan akurat, tegas, tajam, dan edukatif.',
      }
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error('Gemini API call error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate consultation response from Gemini model.' });
  }
});

// Vite middleware integration for asset compilation
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Socionics Engine] Server running in ${process.env.NODE_ENV || 'development'} mode on Port ${PORT}`);
  });
}

setupVite();
