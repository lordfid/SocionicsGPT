# Socionics Dalam Diriku — All Active Code


## package.json

```json
{
  "name": "socionics-dalam-diriku",
  "private": true,
  "version": "2.3.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "lucide-react": "^0.546.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}

```

## index.html

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#241711" />
    <meta
      name="description"
      content="Socionics Dalam Diriku adalah tes Socionics berbasis Model A, 8 elemen informasi, quadra, dan audit konsistensi jawaban."
    />
    <title>Socionics Dalam Diriku</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## vite.config.ts

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": false,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noEmit": true
  },
  "include": ["src/main.tsx"]
}

```

## vercel.json

```json
{
  "framework": "vite",
  "installCommand": "npm ci --no-audit --no-fund",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}

```

## src/main.tsx

```tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

```

## src/App.tsx

```tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Camera,
  Check,
  Download,
  FileText,
  Layers,
  RefreshCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useTestSession } from "./hooks/useTestSession";
import { ALL_QUESTIONS } from "./data/questions";
import { calculateResult, CHANNELS, ELEMENTS } from "./scoring/engine";
import { ELEMENTS_METADATA, QUADRA_DATA, TIM_MODELS, TIM_PROFILES } from "./constants/socionicsData";
import type { AssessmentResult, InformationElement, ModelAPosition, TIM } from "./types/socionics";

const USER_NAME_KEY = "sdd_user_name_v230";
const USER_PHOTO_KEY = "sdd_user_photo_v230";
const USER_THEME_KEY = "sdd_user_theme_v230";

type AppTab = "test" | "atlas" | "audit";
type CardTheme = "amber" | "rose" | "noir" | "sage";
type CardLayout = "story" | "feed" | "square" | "landscape";

const MODE_COPY = {
  ringkas: {
    title: "Ringkas",
    count: "±80 item",
    note: "Cocok untuk gambaran cepat, tetap menjaga 64 sel elemen × kanal.",
  },
  standar: {
    title: "Standar",
    count: "±128 item",
    note: "Lebih stabil karena menambah replikasi dan holdout seimbang.",
  },
  mendalam: {
    title: "Mendalam",
    count: "±224 item",
    note: "Paling lengkap untuk membaca Model A, quadra, dan sinyal kontradiksi.",
  },
} as const;

const POSITION_ORDER: ModelAPosition[] = [
  "Base",
  "Creative",
  "Role",
  "Vulnerable",
  "Suggestive",
  "Mobilizing",
  "Ignoring",
  "Demonstrative",
];

const POSITION_LABEL: Record<ModelAPosition, string> = {
  Base: "Base",
  Creative: "Creative",
  Role: "Role",
  Vulnerable: "PoLR",
  Suggestive: "Suggestive",
  Mobilizing: "Mobilizing",
  Ignoring: "Ignoring",
  Demonstrative: "Demonstrative",
};

const SCALE_LABELS = [
  "Sangat tidak cocok",
  "Kurang cocok",
  "Netral / situasional",
  "Cukup cocok",
  "Sangat cocok",
];

const CARD_THEMES: Record<CardTheme, { label: string; bg: string; panel: string; ink: string; muted: string; accent: string; soft: string }> = {
  amber: {
    label: "Amber Library",
    bg: "#f8efe1",
    panel: "#fffaf2",
    ink: "#231914",
    muted: "#725a48",
    accent: "#b8783f",
    soft: "#ead1ad",
  },
  rose: {
    label: "Rose Archive",
    bg: "#fbeced",
    panel: "#fff8f7",
    ink: "#2b171c",
    muted: "#78515d",
    accent: "#a4435e",
    soft: "#edc2cb",
  },
  noir: {
    label: "Noir Velvet",
    bg: "#18110f",
    panel: "#251a17",
    ink: "#fff4e6",
    muted: "#d6bda4",
    accent: "#e0a15d",
    soft: "#4d342b",
  },
  sage: {
    label: "Sage Paper",
    bg: "#ecf2e7",
    panel: "#fbfff7",
    ink: "#182015",
    muted: "#566a4d",
    accent: "#648c51",
    soft: "#cddfbd",
  },
};

const cleanName = (value: string) => value.trim().replace(/\s+/g, " ").slice(0, 28) || "Peserta";
const percent = (value: number) => `${Math.round(value)}%`;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function elementScore(result: AssessmentResult, element: InformationElement): number {
  const channel = result.channelProfile[element];
  const raw = (channel.producer + channel.flexible + channel.background - channel.threat) / 4;
  return Math.round(clamp((raw + 1) * 50, 0, 100));
}

function valueSignal(result: AssessmentResult, element: InformationElement): number {
  const channel = result.channelProfile[element];
  const raw = (channel.producer + channel.flexible + channel.receiver + channel.aspiration - channel.dismissive) / 5;
  return Math.round(clamp((raw + 1) * 50, 0, 100));
}

function buildAuditSummary() {
  const core = ALL_QUESTIONS.filter((question) => !question.isHoldout && !question.isTieBreak);
  const holdout = ALL_QUESTIONS.filter((question) => question.isHoldout);
  const tieBreak = ALL_QUESTIONS.filter((question) => question.isTieBreak);
  const cells = new Set(core.map((question) => `${question.element}_${question.channel}`));
  const perElement = Object.fromEntries(ELEMENTS.map((element) => [element, core.filter((question) => question.element === element).length])) as Record<InformationElement, number>;
  const perChannel = Object.fromEntries(CHANNELS.map((channel) => [channel, core.filter((question) => question.channel === channel).length])) as Record<string, number>;
  const forbidden = /(holdout|diferensiator|seeded|kunci jawaban|chatgpt|openai|gemini|google ai studio|ai studio)/i;
  const textLeaks = ALL_QUESTIONS.filter((question) => forbidden.test(`${question.scenario} ${question.statement} ${question.responseFocus}`));
  return {
    total: ALL_QUESTIONS.length,
    core: core.length,
    holdout: holdout.length,
    tieBreak: tieBreak.length,
    cells: cells.size,
    perElement,
    perChannel,
    textLeaks,
    pass: cells.size === 64 && textLeaks.length === 0 && core.length >= 192 && holdout.length >= 32 && tieBreak.length >= 32,
  };
}

function loadStored(key: string) {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function saveStored(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // Browser storage may be unavailable; the app can still run without persistence.
  }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 5) {
  const words = text.split(/\s+/);
  let line = "";
  let lines = 0;
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else {
      line = trial;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y);
}

async function createResultCard(options: {
  result: AssessmentResult;
  userName: string;
  photoDataUrl: string;
  theme: CardTheme;
  layout: CardLayout;
}): Promise<Blob> {
  const sizeMap: Record<CardLayout, [number, number]> = {
    story: [1080, 1920],
    feed: [1080, 1350],
    square: [1080, 1080],
    landscape: [1200, 630],
  };
  const [width, height] = sizeMap[options.layout];
  const palette = CARD_THEMES[options.theme];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
  const top = options.result.top3[0];
  const type = top.type;
  const model = TIM_MODELS[type];
  const profile = TIM_PROFILES[type];
  const margin = Math.round(width * 0.07);
  const compact = height <= 700;

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createRadialGradient(width * 0.2, height * 0.1, 20, width * 0.2, height * 0.1, Math.max(width, height) * 0.75);
  gradient.addColorStop(0, palette.soft);
  gradient.addColorStop(1, palette.bg);
  ctx.globalAlpha = options.theme === "noir" ? 0.18 : 0.32;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = Math.max(4, width * 0.006);
  roundedRect(ctx, margin * 0.48, margin * 0.48, width - margin * 0.96, height - margin * 0.96, 34);
  ctx.stroke();

  roundedRect(ctx, margin, margin, width - margin * 2, height - margin * 2, 36);
  ctx.fillStyle = palette.panel;
  ctx.fill();

  ctx.fillStyle = palette.accent;
  ctx.font = `800 ${Math.round(width * 0.026)}px ui-monospace, monospace`;
  ctx.textAlign = "left";
  ctx.fillText("SOCIONICS DALAM DIRIKU", margin * 1.35, margin * 1.6);

  ctx.fillStyle = palette.ink;
  ctx.font = `900 ${compact ? Math.round(width * 0.095) : Math.round(width * 0.16)}px Georgia, serif`;
  ctx.fillText(type, margin * 1.35, compact ? margin * 3.05 : margin * 3.65);

  ctx.fillStyle = palette.muted;
  ctx.font = `700 ${Math.round(width * 0.033)}px ui-sans-serif, system-ui`;
  ctx.fillText(`${model.name} · Quadra ${model.quadra}`, margin * 1.35, compact ? margin * 3.55 : margin * 4.25);

  const photoSize = compact ? Math.round(width * 0.18) : Math.round(width * 0.26);
  const photoX = width - margin * 1.35 - photoSize;
  const photoY = margin * 1.32;
  roundedRect(ctx, photoX, photoY, photoSize, photoSize, 28);
  ctx.fillStyle = palette.soft;
  ctx.fill();
  if (options.photoDataUrl) {
    try {
      const image = await loadImage(options.photoDataUrl);
      ctx.save();
      roundedRect(ctx, photoX, photoY, photoSize, photoSize, 28);
      ctx.clip();
      const scale = Math.max(photoSize / image.width, photoSize / image.height);
      const iw = image.width * scale;
      const ih = image.height * scale;
      ctx.drawImage(image, photoX + (photoSize - iw) / 2, photoY + (photoSize - ih) / 2, iw, ih);
      ctx.restore();
    } catch {
      // Ignore invalid image data and keep the placeholder panel.
    }
  } else {
    ctx.fillStyle = palette.muted;
    ctx.font = `800 ${Math.round(width * 0.07)}px ui-sans-serif, system-ui`;
    ctx.textAlign = "center";
    ctx.fillText(cleanName(options.userName).charAt(0).toUpperCase(), photoX + photoSize / 2, photoY + photoSize * 0.62);
    ctx.textAlign = "left";
  }

  const identityY = compact ? margin * 4.25 : margin * 5.1;
  ctx.fillStyle = palette.muted;
  ctx.font = `700 ${Math.round(width * 0.024)}px ui-monospace, monospace`;
  ctx.fillText("NAMA KARTU", margin * 1.35, identityY);
  ctx.fillStyle = palette.ink;
  ctx.font = `900 ${Math.round(width * 0.043)}px ui-sans-serif, system-ui`;
  ctx.fillText(cleanName(options.userName), margin * 1.35, identityY + Math.round(width * 0.055));

  const metricsY = identityY + (compact ? Math.round(width * 0.1) : Math.round(width * 0.14));
  const chipW = (width - margin * 2.7) / 3;
  const chipH = compact ? 76 : 104;
  const metrics = [
    ["Confidence", options.result.confidence],
    ["Cakupan", percent(options.result.coverage.ratio * 100)],
    ["Holdout", percent(top.holdoutScore)],
  ];
  metrics.forEach(([label, value], index) => {
    const x = margin * 1.35 + chipW * index;
    roundedRect(ctx, x, metricsY, chipW - 14, chipH, 20);
    ctx.fillStyle = options.theme === "noir" ? "#32231f" : "#fffdf8";
    ctx.fill();
    ctx.fillStyle = palette.accent;
    ctx.font = `800 ${Math.round(width * 0.022)}px ui-monospace, monospace`;
    ctx.fillText(label, x + 24, metricsY + 34);
    ctx.fillStyle = palette.ink;
    ctx.font = `900 ${Math.round(width * 0.029)}px ui-sans-serif, system-ui`;
    ctx.fillText(String(value), x + 24, metricsY + (compact ? 62 : 72));
  });

  let cursor = metricsY + chipH + (compact ? 42 : 70);
  if (!compact) {
    ctx.fillStyle = palette.ink;
    ctx.font = `800 ${Math.round(width * 0.034)}px ui-sans-serif, system-ui`;
    ctx.fillText("Model A ringkas", margin * 1.35, cursor);
    cursor += 34;
    ctx.font = `600 ${Math.round(width * 0.026)}px ui-sans-serif, system-ui`;
    ctx.fillStyle = palette.muted;
    wrapText(ctx, profile.description, margin * 1.35, cursor, width - margin * 2.7, Math.round(width * 0.037), 4);
    cursor += Math.round(width * 0.17);
  }

  const slotRows = compact ? POSITION_ORDER.slice(0, 4) : POSITION_ORDER;
  const rowH = compact ? 48 : 62;
  slotRows.forEach((position) => {
    const element = model.positions[position];
    ctx.fillStyle = palette.accent;
    ctx.font = `800 ${Math.round(width * 0.023)}px ui-monospace, monospace`;
    ctx.fillText(POSITION_LABEL[position], margin * 1.35, cursor);
    ctx.fillStyle = palette.ink;
    ctx.font = `900 ${Math.round(width * 0.034)}px ui-sans-serif, system-ui`;
    ctx.fillText(element, margin * 3.4, cursor);
    ctx.fillStyle = palette.muted;
    ctx.font = `600 ${Math.round(width * 0.022)}px ui-sans-serif, system-ui`;
    ctx.fillText(ELEMENTS_METADATA[element].coreConcept.slice(0, compact ? 42 : 72), margin * 4.45, cursor);
    cursor += rowH;
  });

  const footerY = height - margin * 1.38;
  ctx.fillStyle = palette.accent;
  ctx.font = `900 ${Math.round(width * 0.022)}px ui-monospace, monospace`;
  ctx.fillText(`TOP 3 · ${options.result.top3.map((candidate) => `${candidate.type} ${candidate.fitScore}`).join(" / ")}`, margin * 1.35, footerY);
  ctx.textAlign = "right";
  ctx.fillText(new Date().toLocaleDateString("id-ID"), width - margin * 1.35, footerY);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error("Gagal membuat PNG."));
      else resolve(blob);
    }, "image/png", 0.96);
  });
}

export default function App() {
  const [tab, setTab] = useState<AppTab>("test");
  const [userName, setUserName] = useState(() => loadStored(USER_NAME_KEY) || "Peserta Utama");
  const [photoDataUrl, setPhotoDataUrl] = useState(() => loadStored(USER_PHOTO_KEY));
  const [theme, setTheme] = useState<CardTheme>(() => (loadStored(USER_THEME_KEY) as CardTheme) || "amber");
  const [cardLayout, setCardLayout] = useState<CardLayout>("story");
  const [selectedAtlasType, setSelectedAtlasType] = useState<TIM>("ILI");
  const [isExporting, setIsExporting] = useState(false);
  const [questionHelpOpen, setQuestionHelpOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const test = useTestSession();

  useEffect(() => saveStored(USER_NAME_KEY, userName), [userName]);
  useEffect(() => saveStored(USER_PHOTO_KEY, photoDataUrl), [photoDataUrl]);
  useEffect(() => saveStored(USER_THEME_KEY, theme), [theme]);

  const result = useMemo(() => {
    if (!test.session) return null;
    return calculateResult(test.session.answers, test.allQuestions, {
      startedAt: test.session.startedAt,
      questionIds: test.session.questionIds,
    });
  }, [test.session, test.allQuestions]);

  const audit = useMemo(() => buildAuditSummary(), []);
  const activeQuestion = test.currentQuestion;
  const answeredCount = test.session ? Object.keys(test.session.answers).length : 0;
  const totalQuestions = test.activeQuestions.length;
  const currentAnswer = activeQuestion && test.session ? test.session.answers[activeQuestion.id] : undefined;
  const currentProgress = totalQuestions > 0 ? Math.round(((test.session?.currentIndex ?? 0) + 1) / totalQuestions * 100) : 0;

  const handleComplete = () => {
    if (!test.session || !result) return;
    if (result.unresolvedPair && !test.session.tieBreakPair) {
      test.appendTieBreakQuestions(result.unresolvedPair);
      setQuestionHelpOpen(false);
      return;
    }
    test.completeSession();
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const downloadCard = async (share = false) => {
    if (!result) return;
    setIsExporting(true);
    try {
      const blob = await createResultCard({ result, userName, photoDataUrl, theme, layout: cardLayout });
      const fileName = `Socionics-Dalam-Diriku-${cleanName(userName).replace(/\s+/g, "-")}-${result.top3[0].type}.png`;
      if (share && navigator.canShare) {
        const file = new File([blob], fileName, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: "Socionics Dalam Diriku", text: `Hasilku: ${result.top3[0].type}`, files: [file] });
          setIsExporting(false);
          return;
        }
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const renderStart = () => (
    <section className="hero-grid">
      <div className="hero-card hero-main">
        <div className="eyebrow"><Sparkles size={16} /> Tes Socionics Model A</div>
        <h1>Socionics Dalam Diriku</h1>
        <p className="hero-copy">
          Tes ini membaca pola 8 elemen informasi, kanal kekuatan, kanal kebutuhan, PoLR, suggestive, quadra, dan risiko mistype. Jawabanmu tidak diperlakukan sebagai vonis, melainkan sebagai bukti bertingkat yang diaudit ulang.
        </p>
        <div className="name-panel">
          <label>Nama untuk kartu hasil</label>
          <div className="input-shell">
            <User size={18} />
            <input value={userName} onChange={(event) => setUserName(event.target.value)} maxLength={28} placeholder="Nama panggilan" />
          </div>
        </div>
        <div className="mode-grid">
          {(Object.keys(MODE_COPY) as Array<keyof typeof MODE_COPY>).map((mode) => (
            <button key={mode} className="mode-card" onClick={() => test.startNewSession(mode)}>
              <strong>{MODE_COPY[mode].title}</strong>
              <span>{MODE_COPY[mode].count}</span>
              <p>{MODE_COPY[mode].note}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="hero-card side-card">
        <ShieldCheck size={28} />
        <h2>Yang sudah diperbaiki</h2>
        <ul>
          <li>Satu engine scoring aktif.</li>
          <li>Gate hasil berbasis coverage dan kualitas respons.</li>
          <li>Adaptive tie-break saat top kandidat terlalu dekat.</li>
          <li>Kartu hasil bergaya identitas, dengan foto dan tema.</li>
          <li>Audit instrumen langsung di dalam aplikasi.</li>
        </ul>
      </div>
    </section>
  );

  const renderQuiz = () => {
    if (!test.session || !activeQuestion) return renderStart();
    const isLast = test.isLastQuestion;
    return (
      <section className="quiz-layout">
        <div className="quiz-panel">
          <div className="quiz-topline">
            <span>{MODE_COPY[test.session.mode].title}</span>
            <span>{answeredCount}/{totalQuestions} terjawab</span>
          </div>
          <div className="progress-track"><span style={{ width: `${currentProgress}%` }} /></div>
          <div className="question-card">
            <div className="question-meta">
              <span>Pertanyaan {test.session.currentIndex + 1}</span>
              <button type="button" onClick={() => setQuestionHelpOpen((open) => !open)}>penjelasan</button>
            </div>
            <p className="scenario">{activeQuestion.scenario}</p>
            <h2>{activeQuestion.statement}</h2>
            {questionHelpOpen && (
              <div className="help-box">
                Pilih berdasarkan pola yang paling sering terjadi dalam hidupmu, bukan versi ideal yang ingin terlihat bagus. Tidak ada jawaban benar atau salah.
              </div>
            )}
            <div className="scale-grid" role="radiogroup" aria-label="Skala kecocokan">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`scale-button ${currentAnswer === rating ? "selected" : ""}`}
                  onClick={() => {
                    test.answerQuestion(activeQuestion.id, rating, !isLast);
                    setQuestionHelpOpen(false);
                  }}
                >
                  <strong>{rating}</strong>
                  <span>{SCALE_LABELS[rating - 1]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="quiz-actions">
            <button className="ghost-button" disabled={test.isFirstQuestion} onClick={() => test.goToQuestion((test.session?.currentIndex ?? 1) - 1)}>
              <ArrowLeft size={16} /> Kembali
            </button>
            <button className="ghost-button" onClick={() => test.skipQuestion(activeQuestion.id)}>Lewati</button>
            {isLast ? (
              <button className="primary-button" disabled={currentAnswer === undefined} onClick={handleComplete}>
                {result?.unresolvedPair && !test.session.tieBreakPair ? "Lanjut klarifikasi" : "Lihat hasil"}
              </button>
            ) : (
              <button className="primary-button" disabled={currentAnswer === undefined} onClick={() => test.goToQuestion((test.session?.currentIndex ?? 0) + 1)}>
                Lanjut
              </button>
            )}
          </div>
        </div>
        <aside className="quality-panel">
          <h3>Audit sementara</h3>
          <Metric label="Cakupan sel" value={`${result ? result.coverage.answeredCells : 0}/64`} />
          <Metric label="Confidence" value={result?.confidence ?? "belum ada"} />
          <Metric label="Kandidat sementara" value={result?.top3.map((candidate) => candidate.type).join(" · ") ?? "—"} />
          <p>
            Hasil final baru dikunci setelah jawaban cukup banyak dan tidak terdeteksi pola respons yang terlalu monoton.
          </p>
        </aside>
      </section>
    );
  };

  const renderResults = () => {
    if (!result || !test.session) return renderStart();
    const primary = result.top3[0];
    const model = TIM_MODELS[primary.type];
    const profile = TIM_PROFILES[primary.type];
    const elementRanking = [...ELEMENTS].sort((a, b) => elementScore(result, b) - elementScore(result, a));
    const valued = QUADRA_DATA[model.quadra].valuedElements;
    const qualityIssues = [
      result.responseQuality.straightlining ? "Jawaban identik terlalu panjang" : "",
      result.responseQuality.midpointOveruse ? "Pilihan tengah terlalu dominan" : "",
      result.responseQuality.extremeResponseRatio > 0.65 ? "Jawaban ekstrem terlalu sering" : "",
    ].filter(Boolean);

    return (
      <section className="result-layout">
        <div className="result-hero">
          <div className="eyebrow"><BadgeCheck size={16} /> Hasil interpretatif</div>
          <h1>{primary.type}</h1>
          <h2>{model.name} · Quadra {model.quadra}</h2>
          <p>{profile.description}</p>
          <div className="result-badges">
            <span>Confidence: {result.confidence}</span>
            <span>Cakupan: {Math.round(result.coverage.ratio * 100)}%</span>
            <span>Holdout: {primary.holdoutScore}%</span>
          </div>
          <div className="callout">
            {result.confidenceExplanation}
          </div>
          {qualityIssues.length > 0 && (
            <div className="warning-box"><AlertTriangle size={18} /> {qualityIssues.join(" · ")}</div>
          )}
        </div>

        <div className="result-grid">
          <Panel title="Top 3 TIM">
            <div className="candidate-list">
              {result.top3.map((candidate, index) => (
                <div className="candidate-row" key={candidate.type}>
                  <b>#{index + 1} {candidate.type}</b>
                  <span>{candidate.fitScore}</span>
                  <i style={{ width: `${candidate.fitScore}%` }} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Ranking 8 Elemen">
            <div className="bar-list">
              {elementRanking.map((element) => (
                <div className="bar-row" key={element}>
                  <span>{element}</span>
                  <div><i style={{ width: `${elementScore(result, element)}%` }} /></div>
                  <b>{elementScore(result, element)}</b>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Model A Map">
            <div className="model-grid">
              {POSITION_ORDER.map((position) => {
                const element = model.positions[position];
                return (
                  <div className="slot-card" key={position}>
                    <span>{POSITION_LABEL[position]}</span>
                    <b>{element}</b>
                    <p>{ELEMENTS_METADATA[element].coreConcept}</p>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Quadra & Valued Pattern">
            <p>{QUADRA_DATA[model.quadra].description}</p>
            <div className="chip-line">
              {valued.map((element) => <span key={element}>{element} · {valueSignal(result, element)}</span>)}
            </div>
          </Panel>

          <Panel title="PoLR, Suggestive, Mobilizing">
            <div className="insight-stack">
              <Insight label="PoLR" value={model.positions.Vulnerable} text={profile.tuntutanPolr} />
              <Insight label="Suggestive" value={model.positions.Suggestive} text={profile.bantuanSuggestive} />
              <Insight label="Mobilizing" value={model.positions.Mobilizing} text={profile.areaMobilizing} />
            </div>
          </Panel>

          <Panel title="Catatan mistype & kontradiksi">
            <p><b>Kemungkinan mistype:</b> {profile.CommonMistypes.join(" · ")}</p>
            <p><b>Catatan audit:</b> {result.auditNotes.length ? result.auditNotes.join(" ") : "Tidak ada catatan berat dari quality gate."}</p>
            {result.unresolvedPair && <p><b>Masih dekat:</b> {result.unresolvedPair}</p>}
          </Panel>
        </div>

        <div className="card-studio">
          <div>
            <div className="eyebrow"><Camera size={16} /> Kartu hasil</div>
            <h2>Card style identitas</h2>
            <p>Masukkan foto opsional, pilih tema dan orientasi, lalu unduh sebagai PNG.</p>
          </div>
          <div className="card-controls">
            <button className="ghost-button" onClick={() => fileInputRef.current?.click()}><Camera size={16} /> Foto</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} />
            {photoDataUrl && <button className="ghost-button" onClick={() => setPhotoDataUrl("")}>Hapus foto</button>}
            <select value={theme} onChange={(event) => setTheme(event.target.value as CardTheme)}>
              {(Object.keys(CARD_THEMES) as CardTheme[]).map((key) => <option key={key} value={key}>{CARD_THEMES[key].label}</option>)}
            </select>
            <select value={cardLayout} onChange={(event) => setCardLayout(event.target.value as CardLayout)}>
              <option value="story">Story 1080×1920</option>
              <option value="feed">Feed 1080×1350</option>
              <option value="square">Square 1080×1080</option>
              <option value="landscape">Landscape 1200×630</option>
            </select>
            <button className="primary-button" disabled={isExporting} onClick={() => downloadCard(false)}><Download size={16} /> Unduh PNG</button>
            <button className="ghost-button" disabled={isExporting} onClick={() => downloadCard(true)}><Share2 size={16} /> Bagikan</button>
          </div>
        </div>

        <div className="result-actions">
          <button className="ghost-button" onClick={() => test.resetSession()}><RefreshCcw size={16} /> Ulang dari awal</button>
        </div>
      </section>
    );
  };

  const renderAtlas = () => {
    const model = TIM_MODELS[selectedAtlasType];
    const profile = TIM_PROFILES[selectedAtlasType];
    return (
      <section className="atlas-layout">
        <div className="atlas-list">
          {(Object.keys(TIM_MODELS) as TIM[]).map((type) => (
            <button key={type} className={selectedAtlasType === type ? "active" : ""} onClick={() => setSelectedAtlasType(type)}>
              <b>{type}</b><span>{TIM_MODELS[type].quadra}</span>
            </button>
          ))}
        </div>
        <div className="atlas-detail">
          <div className="eyebrow"><BookOpen size={16} /> Atlas TIM</div>
          <h1>{selectedAtlasType} · {model.name}</h1>
          <p>{profile.description}</p>
          <div className="atlas-columns">
            <Insight label="Base" value={model.positions.Base} text={profile.orientasiBase} />
            <Insight label="Creative" value={model.positions.Creative} text={profile.caraCreative} />
            <Insight label="Role" value={model.positions.Role} text={profile.roleTampilan} />
            <Insight label="PoLR" value={model.positions.Vulnerable} text={profile.tuntutanPolr} />
            <Insight label="Suggestive" value={model.positions.Suggestive} text={profile.bantuanSuggestive} />
            <Insight label="Mobilizing" value={model.positions.Mobilizing} text={profile.areaMobilizing} />
          </div>
        </div>
      </section>
    );
  };

  const renderAudit = () => (
    <section className="audit-layout">
      <div className="audit-hero">
        <div className="eyebrow"><FileText size={16} /> Checklist internal</div>
        <h1>{audit.pass ? "Audit instrumen lulus" : "Audit instrumen perlu revisi"}</h1>
        <p>Panel ini memeriksa apakah bank soal aktif benar-benar tersambung, merata, dan tidak membocorkan metadata tes kepada peserta.</p>
      </div>
      <div className="audit-grid">
        <AuditCard label="Total item aktif" value={String(audit.total)} pass={audit.total >= 256} />
        <AuditCard label="Core item" value={String(audit.core)} pass={audit.core >= 192} />
        <AuditCard label="Holdout" value={String(audit.holdout)} pass={audit.holdout >= 32} />
        <AuditCard label="Tie-break" value={String(audit.tieBreak)} pass={audit.tieBreak >= 32} />
        <AuditCard label="Sel elemen × kanal" value={`${audit.cells}/64`} pass={audit.cells === 64} />
        <AuditCard label="UI leak pada item" value={String(audit.textLeaks.length)} pass={audit.textLeaks.length === 0} />
      </div>
      <Panel title="Sebaran elemen core">
        <div className="bar-list">
          {ELEMENTS.map((element) => (
            <div className="bar-row" key={element}>
              <span>{element}</span>
              <div><i style={{ width: `${audit.perElement[element] / 24 * 100}%` }} /></div>
              <b>{audit.perElement[element]}</b>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Sebaran kanal core">
        <div className="chip-line">
          {CHANNELS.map((channel) => <span key={channel}>{channel}: {audit.perChannel[channel]}</span>)}
        </div>
      </Panel>
    </section>
  );

  if (!test.isSessionLoaded) {
    return <div className="loading-screen">Memulihkan sesi...</div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setTab("test")}>
          <Layers />
          <span>Socionics Dalam Diriku</span>
        </button>
        <nav>
          <button className={tab === "test" ? "active" : ""} onClick={() => setTab("test")}>Tes</button>
          <button className={tab === "atlas" ? "active" : ""} onClick={() => setTab("atlas")}>Atlas</button>
          <button className={tab === "audit" ? "active" : ""} onClick={() => setTab("audit")}>Audit</button>
        </nav>
      </header>
      <main>
        {tab === "test" && (test.session?.completed ? renderResults() : renderQuiz())}
        {tab === "atlas" && renderAtlas()}
        {tab === "audit" && renderAudit()}
      </main>
      <footer>
        Tes ini bukan diagnosis klinis. Hasil adalah interpretasi tipologi berbasis pola jawaban dan perlu dibaca sebagai kecenderungan, bukan label mutlak.
      </footer>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="metric"><span>{label}</span><b>{value}</b></div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="panel"><h3>{title}</h3>{children}</section>;
}

function Insight({ label, value, text }: { label: string; value: string; text: string }) {
  return <div className="insight"><span>{label}</span><b>{value}</b><p>{text}</p></div>;
}

function AuditCard({ label, value, pass }: { label: string; value: string; pass: boolean }) {
  return <div className={`audit-card ${pass ? "pass" : "fail"}`}><span>{label}</span><b>{value}</b>{pass ? <Check size={16} /> : <AlertTriangle size={16} />}</div>;
}

```

## src/index.css

```css
@import "tailwindcss";

:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f5eadb;
  color: #251914;
}

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; background: radial-gradient(circle at top left, rgba(184, 120, 63, 0.22), transparent 32rem), #f5eadb; }
button, input, select { font: inherit; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; opacity: .45; }

.app-shell { min-height: 100vh; display: flex; flex-direction: column; }
.topbar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem clamp(1rem, 4vw, 3rem); background: rgba(255, 250, 242, .78); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(118, 76, 46, .18); }
.brand { display: inline-flex; align-items: center; gap: .75rem; border: 0; background: transparent; color: #241711; font-weight: 950; letter-spacing: -.02em; }
.brand svg { width: 1.35rem; height: 1.35rem; color: #a96631; }
.topbar nav { display: flex; gap: .4rem; padding: .35rem; background: #f0ddc5; border-radius: 999px; }
.topbar nav button { border: 0; border-radius: 999px; background: transparent; padding: .6rem .9rem; font-size: .83rem; font-weight: 850; color: #6f5948; }
.topbar nav button.active { background: #fffaf2; color: #251914; box-shadow: 0 8px 22px rgba(86, 50, 24, .12); }
main { width: min(1180px, calc(100% - 2rem)); margin: 0 auto; padding: clamp(1.6rem, 4vw, 3rem) 0 4rem; flex: 1; }
footer { border-top: 1px solid rgba(118, 76, 46, .16); text-align: center; color: #806855; padding: 1.3rem; font-size: .82rem; background: rgba(255, 250, 242, .58); }
.loading-screen { min-height: 100vh; display: grid; place-items: center; color: #725a48; font-weight: 800; }

.hero-grid { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(280px, .55fr); gap: 1rem; align-items: stretch; }
.hero-card, .quiz-panel, .quality-panel, .panel, .result-hero, .card-studio, .atlas-detail, .atlas-list, .audit-hero { background: rgba(255, 250, 242, .88); border: 1px solid rgba(118, 76, 46, .18); box-shadow: 0 24px 60px rgba(62, 35, 21, .12); border-radius: 2rem; }
.hero-main { padding: clamp(1.4rem, 4vw, 3.5rem); }
.side-card { padding: 1.6rem; background: #251914; color: #fff4e6; }
.side-card svg { color: #e0a15d; }
.side-card h2, .panel h3, .audit-hero h1, .atlas-detail h1, .card-studio h2 { margin: .7rem 0 .55rem; font-size: clamp(1.35rem, 3vw, 2rem); letter-spacing: -.04em; }
.side-card ul { margin: 1rem 0 0; padding-left: 1.2rem; color: #dbc6ad; line-height: 1.8; }
.eyebrow { display: inline-flex; align-items: center; gap: .48rem; color: #a96631; background: rgba(184, 120, 63, .12); border: 1px solid rgba(184, 120, 63, .18); padding: .45rem .7rem; border-radius: 999px; font-size: .73rem; text-transform: uppercase; letter-spacing: .14em; font-weight: 950; }
.hero-main h1, .result-hero h1 { font-family: Georgia, Cambria, serif; margin: 1rem 0; font-size: clamp(3.1rem, 10vw, 7.8rem); line-height: .88; letter-spacing: -.07em; }
.hero-copy, .result-hero p, .atlas-detail p, .audit-hero p, .card-studio p, .panel p, .quality-panel p { color: #66513f; line-height: 1.78; }
.name-panel { margin: 2rem 0 1.3rem; }
.name-panel label { display: block; margin-bottom: .55rem; color: #7b604c; font-size: .78rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 900; }
.input-shell { display: flex; align-items: center; gap: .65rem; background: #fffdf8; border: 1px solid rgba(118, 76, 46, .18); border-radius: 1rem; padding: .75rem 1rem; }
.input-shell input { border: 0; outline: 0; background: transparent; width: 100%; color: #251914; font-weight: 750; }
.mode-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; }
.mode-card { text-align: left; border: 1px solid rgba(118, 76, 46, .18); border-radius: 1.4rem; background: #fffdf8; padding: 1rem; transition: transform .18s ease, box-shadow .18s ease; }
.mode-card:hover { transform: translateY(-3px); box-shadow: 0 16px 30px rgba(62, 35, 21, .12); }
.mode-card strong { display: block; font-size: 1.1rem; color: #251914; }
.mode-card span { display: inline-block; margin: .5rem 0; color: #a96631; font-weight: 950; font-size: .8rem; }
.mode-card p { margin: 0; color: #725a48; font-size: .86rem; line-height: 1.55; }

.quiz-layout { display: grid; grid-template-columns: minmax(0, 1fr) 310px; gap: 1rem; align-items: start; }
.quiz-panel { padding: clamp(1.1rem, 3vw, 2rem); }
.quiz-topline { display: flex; justify-content: space-between; gap: 1rem; color: #8d6d55; text-transform: uppercase; letter-spacing: .12em; font-size: .73rem; font-weight: 950; }
.progress-track { height: .62rem; background: #ead6bc; border-radius: 999px; overflow: hidden; margin: .9rem 0 1.4rem; }
.progress-track span { display: block; height: 100%; background: linear-gradient(90deg, #a96631, #d79c5d); border-radius: inherit; transition: width .24s ease; }
.question-card { background: #fffdf8; border: 1px solid rgba(118, 76, 46, .14); border-radius: 1.7rem; padding: clamp(1.1rem, 3vw, 2rem); }
.question-meta { display: flex; align-items: center; justify-content: space-between; color: #a96631; font-size: .78rem; font-weight: 950; text-transform: uppercase; letter-spacing: .12em; }
.question-meta button { border: 0; background: rgba(184, 120, 63, .12); color: #8b562b; border-radius: 999px; padding: .4rem .7rem; font-weight: 900; }
.scenario { color: #7b604c; margin: 1.4rem 0 .55rem; font-weight: 850; }
.question-card h2 { margin: 0; font-size: clamp(1.35rem, 4vw, 2.25rem); line-height: 1.18; letter-spacing: -.04em; color: #251914; }
.help-box, .callout, .warning-box { margin-top: 1rem; border-radius: 1rem; padding: 1rem; line-height: 1.6; }
.help-box { background: #f7ead8; color: #634c3a; }
.scale-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: .65rem; margin-top: 1.5rem; }
.scale-button { min-height: 8.2rem; border: 1px solid rgba(118, 76, 46, .18); border-radius: 1.15rem; background: #f9efe1; color: #3a261d; padding: .9rem .65rem; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: .5rem; transition: transform .16s ease, border .16s ease, background .16s ease; }
.scale-button:hover { transform: translateY(-2px); }
.scale-button.selected { background: #251914; color: #fff4e6; border-color: #251914; }
.scale-button strong { font-size: 2rem; font-family: Georgia, serif; }
.scale-button span { font-size: .78rem; font-weight: 800; line-height: 1.35; }
.quiz-actions, .result-actions, .card-controls { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1rem; align-items: center; }
.primary-button, .ghost-button { border: 0; display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border-radius: 999px; padding: .75rem 1rem; font-weight: 950; }
.primary-button { background: #251914; color: #fff4e6; }
.ghost-button { background: #fffdf8; color: #5f4938; border: 1px solid rgba(118, 76, 46, .18); }
.quality-panel { padding: 1.2rem; position: sticky; top: 6rem; }
.quality-panel h3 { margin: 0 0 .7rem; }
.metric { display: flex; justify-content: space-between; gap: 1rem; padding: .8rem 0; border-bottom: 1px solid rgba(118, 76, 46, .12); }
.metric span { color: #806855; }
.metric b { text-align: right; color: #251914; }

.result-layout { display: grid; gap: 1rem; }
.result-hero { padding: clamp(1.4rem, 4vw, 3.2rem); }
.result-hero h2 { margin: -.4rem 0 1rem; color: #a96631; font-weight: 950; }
.result-badges, .chip-line { display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 1rem; }
.result-badges span, .chip-line span { border: 1px solid rgba(118, 76, 46, .18); background: #fffdf8; padding: .55rem .75rem; border-radius: 999px; color: #5f4938; font-weight: 850; font-size: .86rem; }
.callout { background: #251914; color: #fff4e6; }
.warning-box { display: flex; gap: .6rem; align-items: center; background: #fff4d8; color: #7a4a1e; }
.result-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.panel { padding: clamp(1rem, 3vw, 1.45rem); }
.panel h3 { margin-top: 0; font-size: 1.3rem; }
.candidate-list, .bar-list, .insight-stack { display: grid; gap: .75rem; }
.candidate-row { position: relative; overflow: hidden; border-radius: 1rem; border: 1px solid rgba(118, 76, 46, .15); padding: .85rem; display: flex; justify-content: space-between; background: #fffdf8; }
.candidate-row i { position: absolute; left: 0; bottom: 0; height: 4px; background: #a96631; }
.bar-row { display: grid; grid-template-columns: 48px 1fr 42px; gap: .7rem; align-items: center; }
.bar-row span, .bar-row b { font-weight: 950; color: #4d372b; }
.bar-row div { height: .7rem; background: #ead6bc; border-radius: 999px; overflow: hidden; }
.bar-row i { display: block; height: 100%; background: linear-gradient(90deg, #a96631, #d79c5d); }
.model-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.slot-card, .insight { background: #fffdf8; border: 1px solid rgba(118, 76, 46, .14); border-radius: 1.1rem; padding: .9rem; }
.slot-card span, .insight span { color: #a96631; font-size: .75rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 950; }
.slot-card b, .insight b { display: block; margin: .35rem 0; font-size: 1.25rem; color: #251914; }
.slot-card p, .insight p { margin: 0; font-size: .88rem; line-height: 1.55; color: #6d5543; }
.card-studio { display: grid; grid-template-columns: minmax(240px, .75fr) minmax(0, 1.25fr); gap: 1rem; align-items: center; padding: 1.4rem; }
.card-controls { justify-content: flex-end; margin: 0; }
.card-controls select { border: 1px solid rgba(118, 76, 46, .18); border-radius: 999px; padding: .75rem 1rem; background: #fffdf8; color: #251914; font-weight: 850; }

.atlas-layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 1rem; align-items: start; }
.atlas-list { padding: .8rem; display: grid; gap: .45rem; position: sticky; top: 6rem; }
.atlas-list button { border: 1px solid rgba(118, 76, 46, .13); background: #fffdf8; color: #4d372b; border-radius: .95rem; padding: .75rem; display: flex; align-items: center; justify-content: space-between; }
.atlas-list button.active { background: #251914; color: #fff4e6; }
.atlas-list span { opacity: .75; font-size: .78rem; font-weight: 850; }
.atlas-detail { padding: clamp(1.2rem, 3vw, 2rem); }
.atlas-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; margin-top: 1.2rem; }

.audit-layout { display: grid; gap: 1rem; }
.audit-hero { padding: clamp(1.2rem, 3vw, 2rem); }
.audit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem; }
.audit-card { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: .6rem; border-radius: 1.2rem; padding: 1rem; background: #fffdf8; border: 1px solid rgba(118, 76, 46, .18); }
.audit-card span { grid-column: 1 / -1; color: #725a48; font-size: .82rem; font-weight: 850; }
.audit-card b { font-size: 1.4rem; color: #251914; }
.audit-card.pass svg { color: #648c51; }
.audit-card.fail svg { color: #a4435e; }

@media (max-width: 920px) {
  .hero-grid, .quiz-layout, .result-grid, .card-studio, .atlas-layout { grid-template-columns: 1fr; }
  .quality-panel, .atlas-list { position: static; }
  .mode-grid, .audit-grid { grid-template-columns: 1fr; }
  .scale-grid { grid-template-columns: 1fr; }
  .scale-button { min-height: auto; align-items: flex-start; flex-direction: row; justify-content: flex-start; padding: 1rem; }
  .scale-button strong { min-width: 2rem; }
  .topbar { align-items: flex-start; flex-direction: column; }
  .topbar nav { width: 100%; justify-content: space-between; }
}

@media (max-width: 560px) {
  main { width: min(100% - 1rem, 1180px); }
  .hero-main h1, .result-hero h1 { font-size: 3.3rem; }
  .model-grid, .atlas-columns { grid-template-columns: 1fr; }
  .card-controls { justify-content: flex-start; }
}

```

## src/types/socionics.ts

```ts
/**
 * Domain types for Socionics Dalam Diriku.
 *
 * The instrument intentionally separates theory priors from empirical claims.
 * Item metadata below describes design intent; it is not a measured reliability
 * coefficient and must not be presented as one.
 */

export type InformationElement =
  | "Ne"
  | "Ni"
  | "Se"
  | "Si"
  | "Te"
  | "Ti"
  | "Fe"
  | "Fi";

export type MeasurementChannel =
  | "producer"
  | "flexible"
  | "mask"
  | "threat"
  | "receiver"
  | "aspiration"
  | "dismissive"
  | "background";

export type ScaleType =
  | "frequency"
  | "automaticity"
  | "comfort"
  | "competence"
  | "importance"
  | "threat"
  | "relief"
  | "recognition"
  | "comparison";

export type QuestionContext =
  | "general"
  | "private"
  | "family"
  | "friendship"
  | "romance"
  | "work"
  | "study"
  | "group"
  | "conflict"
  | "decision"
  | "body"
  | "public"
  | "new_situation"
  | "time_pressure";

export type ModelAPosition =
  | "Base"
  | "Creative"
  | "Role"
  | "Vulnerable"
  | "Suggestive"
  | "Mobilizing"
  | "Ignoring"
  | "Demonstrative";

export type TIM =
  | "ILE"
  | "SEI"
  | "ESE"
  | "LII"
  | "SLE"
  | "IEI"
  | "EIE"
  | "LSI"
  | "SEE"
  | "ILI"
  | "LIE"
  | "ESI"
  | "IEE"
  | "SLI"
  | "LSE"
  | "EII";

export type Quadra = "Alpha" | "Beta" | "Gamma" | "Delta";
export type Club = "Researchers" | "Socials" | "Pragmatists" | "Humanitarians";
export type Temperament = "EP" | "IP" | "EJ" | "IJ";

export interface SocionicsQuestion {
  id: string;
  scenario: string;
  statement: string;
  /** A short natural-language description used only to contextualize option help. */
  responseFocus: string;
  scaleType: ScaleType;
  element: InformationElement;
  channel: MeasurementChannel;
  context: QuestionContext;

  /** High answers should add evidence to the declared channel. */
  direction: 1 | -1;
  reverseKeyed: boolean;

  /** Theory/design weight, not an empirical psychometric coefficient. */
  designWeight: number;
  ambiguityRisk: "low" | "medium" | "high";
  desirabilityRisk: "low" | "medium" | "high";

  evidenceTags: string[];
  replicationFamilyId?: string;
  contradictionPairId?: string;
  tieBreakTags?: string[];
  tieBreakSupport?: Partial<Record<TIM, number>>;

  isHoldout: boolean;
  isTieBreak: boolean;
  itemVersion: string;
}

export type ElementChannelProfile = Record<MeasurementChannel, number>;
export type FullChannelProfile = Record<InformationElement, ElementChannelProfile>;

export interface TIMModel {
  type: TIM;
  name: string;
  fullName: string;
  quadra: Quadra;
  club: Club;
  temperament: Temperament;
  dual: TIM;
  positions: Record<ModelAPosition, InformationElement>;
}

export interface TIMProfile {
  type: TIM;
  description: string;
  orientasiBase: string;
  caraCreative: string;
  roleTampilan: string;
  tuntutanPolr: string;
  bantuanSuggestive: string;
  areaMobilizing: string;
  kompetensiIgnoring: string;
  kemampuanDemonstrative: string;
  polaSeimbang: string;
  polaTertekan: string;
  gayaBelajar: string;
  gayaKerja: string;
  gayaKomunikasi: string;
  kebutuhanKelompok: string;
  batasPerhatian: string;
  CommonMistypes: string[];
  refleksi: string;
  buktiMenyangkal: string;
}

export interface TestSession {
  mode: "ringkas" | "standar" | "mendalam";
  answers: Record<string, number>;
  skippedIds: string[];
  questionIds: string[];
  currentIndex: number;
  startedAt: string;
  lastUpdatedAt: string;
  seed: number;
  appVersion: string;
  completed: boolean;
  tieBreakPair?: string;
}

export interface ModelFitScore {
  type: TIM;
  /** Relative match index, not a calibrated probability. */
  fitScore: number;
  rawSimilarity: number;
  channelScores: Record<InformationElement, number>;
  elementFits: Record<InformationElement, number>;
  contradictions: number;
  personFitRatio: number;
  holdoutScore: number;
}

export interface AssessmentResult {
  top3: ModelFitScore[];
  confidence: "tidak cukup bukti" | "rendah" | "tentatif" | "sedang" | "cukup kuat" | "kuat";
  confidenceExplanation: string;
  unresolvedPair?: string;
  channelProfile: FullChannelProfile;
  coverage: {
    answeredCells: number;
    totalCells: number;
    ratio: number;
  };
  auditNotes: string[];
  responseQuality: {
    straightlining: boolean;
    midpointOveruse: boolean;
    extremeResponseRatio: number;
    completionTimeSeconds: number;
    inconsistencyScore: number;
  };
}

```

## src/constants/socionicsData.ts

```ts
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIM, TIMModel, TIMProfile, InformationElement, Quadra, Club, Temperament } from "../types/socionics";

export const ELEMENTS_METADATA: Record<InformationElement, { name: string; symbol: string; description: string; coreConcept: string }> = {
  Ne: {
    name: "Extraverted Intuition",
    symbol: "Ne",
    description: "Visi peluang, potensi tersembunyi, alternatif gagasan, gagasan inventif, dan esensi laten dari suatu hal.",
    coreConcept: "Mengeksplorasi kemungkinan baru dan melihat apa yang bisa dikembangkan secara kreatif."
  },
  Ni: {
    name: "Introverted Intuition",
    symbol: "Ni",
    description: "Tren historis, perubahan waktu, firasat batin, visi masa depan, sinkronitas peristiwa, dan konsekuensi jangka panjang.",
    coreConcept: "Membayangkan bagaimana peristiwa berkembang seiring berjalannya waktu dan menangkap makna tersembunyi."
  },
  Se: {
    name: "Extraverted Sensing",
    symbol: "Se",
    description: "Kehendak, kekuasaan fisik, wilayah kekuasaan, batas taktis, mobilisasi aksi langsung, pengaruh, dan estetika eksternal.",
    coreConcept: "Menguasai atau menaklukkan ruang fisik secara energetik dan melatih kepemimpinan direktif."
  },
  Si: {
    name: "Introverted Sensing",
    symbol: "Si",
    description: "Kenyamanan fisik, keadaan jasmani, kesehatan, keharmonisan estetika lingkungan sekitar, dan relaksasi internal.",
    coreConcept: "Menjaga keseimbangan kenyamanan internal, kebersihan, dan sensasi fisik yang damai."
  },
  Te: {
    name: "Extraverted Logic (Thinking)",
    symbol: "Te",
    description: "Efisiensi praktis, logika utilitas, fakta empiris, pengoptimalan proses kerja, dan alokasi sumber daya finansial/alat.",
    coreConcept: "Meningkatkan produktivitas kerja dan mengambil tindakan berdasarkan data realitas yang objektif."
  },
  Ti: {
    name: "Introverted Logic (Thinking)",
    symbol: "Ti",
    description: "Konsistensi teori, klasifikasi logis, bagan sistematis, keteraturan hukum, analisis terstruktur, dan pembuktian prinsip.",
    coreConcept: "Membangun keteraturan logis, struktur teoretis, dan mematuhi definisi konsep secara murni."
  },
  Fe: {
    name: "Extraverted Ethics (Feeling)",
    symbol: "Fe",
    description: "Ekspresi emosional, atmosfer kelompok, gelora perasaan, keterlibatan sosial, dan memengaruhi emosi audiens.",
    coreConcept: "Mengekspresikan gairah emosional dan menjaga orkestrasi getaran emosi sosial."
  },
  Fi: {
    name: "Introverted Ethics (Feeling)",
    symbol: "Fi",
    description: "Ikatan moral batin, hubungan kedekatan interpersonal, rasa suka/benci personal, ketulusan hati, kesetiaan, dan jarak psikologis.",
    coreConcept: "Menjaga keontentikan hubungan batin antar-manusia dan memegang prinsip etis pribadi."
  }
};

export const QUADRA_DATA: Record<Quadra, { name: string; valuedElements: InformationElement[]; atmosphere: string; description: string }> = {
  Alpha: {
    name: "Alpha",
    valuedElements: ["Ne", "Ti", "Fe", "Si"],
    atmosphere: "Demokratis-Kolektif, Santai, Menghargai Ide Baru dan Kenyamanan bersama.",
    description: "Quadra Alpha berfokus pada eksplorasi gagasan demi kesenangan intelektual (Ne, Ti) dipadukan dengan kesenangan bersosialisasi yang hangat dan kenyamanan fisik (Fe, Si). Menghindari ketegangan kekuasaan atau ambisi materialistis."
  },
  Beta: {
    name: "Beta",
    valuedElements: ["Se", "Ti", "Fe", "Ni"],
    atmosphere: "Aristokratis-Kolektif, Bergelora, Terstruktur, Berorientasi pada Visi Bersama.",
    description: "Quadra Beta memadukan kehendak aksi taktis (Se, Ti) demi mewujudkan visi atau makna historis yang agung (Ni), didorong oleh orkestrasi emosional kelompok yang kuat (Fe). Menghargai hierarki, kepemimpinan, kompetisi, dan loyalitas kelompok."
  },
  Gamma: {
    name: "Gamma",
    valuedElements: ["Se", "Fi", "Te", "Ni"],
    atmosphere: "Demokratis-Individualis, Kompetitif, Pragmatis, Fokus pada Hubungan Setia.",
    description: "Quadra Gamma berfokus pada aksi bisnis pragmatis (Te) dan kehendak tekad mandiri (Se) dipadukan dengan kesetiaan batin interpersonal yang kuat (Fi) serta kalkulasi risiko jangka panjang (Ni). Menghargai kemandirian ekonomi dan kompetensi nyata."
  },
  Delta: {
    name: "Delta",
    atmosphere: "Aristokratis-Individualis, Tenang, Produktif, Peduli Pengembangan Manusia.",
    valuedElements: ["Ne", "Fi", "Te", "Si"],
    description: "Quadra Delta menyeimbangkan produktivitas kerja berkualitas tinggi (Te) dengan pemenuhan kenyamanan dan estetika hidup sehari-hari (Si), serta pengembangan potensi unik individu (Ne) dalam ikatan relasi tulus yang mendalam (Fi). Menghindari drama emosional ekstrem."
  }
};

export const TIM_MODELS: Record<TIM, TIMModel> = {
  ILE: { type: "ILE", name: "Don Quixote", fullName: "Intuitive Logical Extratim", quadra: "Alpha", club: "Researchers", temperament: "EP", dual: "SEI", positions: { Base: "Ne", Creative: "Ti", Role: "Se", Vulnerable: "Fi", Suggestive: "Si", Mobilizing: "Fe", Ignoring: "Ni", Demonstrative: "Te" } },
  SEI: { type: "SEI", name: "Dumas", fullName: "Sensory Ethical Introtim", quadra: "Alpha", club: "Socials", temperament: "IP", dual: "ILE", positions: { Base: "Si", Creative: "Fe", Role: "Ni", Vulnerable: "Te", Suggestive: "Ne", Mobilizing: "Ti", Ignoring: "Se", Demonstrative: "Fi" } },
  ESE: { type: "ESE", name: "Hugo", fullName: "Ethical Sensory Extratim", quadra: "Alpha", club: "Socials", temperament: "EJ", dual: "LII", positions: { Base: "Fe", Creative: "Si", Role: "Te", Vulnerable: "Ni", Suggestive: "Ti", Mobilizing: "Ne", Ignoring: "Fi", Demonstrative: "Se" } },
  LII: { type: "LII", name: "Robespierre", fullName: "Logical Intuitive Introtim", quadra: "Alpha", club: "Researchers", temperament: "IJ", dual: "ESE", positions: { Base: "Ti", Creative: "Ne", Role: "Fi", Vulnerable: "Se", Suggestive: "Fe", Mobilizing: "Si", Ignoring: "Te", Demonstrative: "Ni" } },
  
  SLE: { type: "SLE", name: "Zhukov", fullName: "Sensory Logical Extratim", quadra: "Beta", club: "Pragmatists", temperament: "EP", dual: "IEI", positions: { Base: "Se", Creative: "Ti", Role: "Ne", Vulnerable: "Fi", Suggestive: "Ni", Mobilizing: "Fe", Ignoring: "Si", Demonstrative: "Te" } },
  IEI: { type: "IEI", name: "Yesenin", fullName: "Intuitive Ethical Introtim", quadra: "Beta", club: "Humanitarians", temperament: "IP", dual: "SLE", positions: { Base: "Ni", Creative: "Fe", Role: "Si", Vulnerable: "Te", Suggestive: "Se", Mobilizing: "Ti", Ignoring: "Ne", Demonstrative: "Fi" } },
  EIE: { type: "EIE", name: "Hamlet", fullName: "Ethical Intuitive Extratim", quadra: "Beta", club: "Humanitarians", temperament: "EJ", dual: "LSI", positions: { Base: "Fe", Creative: "Ni", Role: "Te", Vulnerable: "Si", Suggestive: "Ti", Mobilizing: "Se", Ignoring: "Fi", Demonstrative: "Ne" } },
  LSI: { type: "LSI", name: "Maxim Gorky", fullName: "Logical Sensory Introtim", quadra: "Beta", club: "Pragmatists", temperament: "IJ", dual: "EIE", positions: { Base: "Ti", Creative: "Se", Role: "Fi", Vulnerable: "Ne", Suggestive: "Fe", Mobilizing: "Ni", Ignoring: "Te", Demonstrative: "Si" } },
  
  SEE: { type: "SEE", name: "Napoleon", fullName: "Sensory Ethical Extratim", quadra: "Gamma", club: "Socials", temperament: "EP", dual: "ILI", positions: { Base: "Se", Creative: "Fi", Role: "Ne", Vulnerable: "Ti", Suggestive: "Ni", Mobilizing: "Te", Ignoring: "Si", Demonstrative: "Fe" } },
  ILI: { type: "ILI", name: "Balzac", fullName: "Intuitive Logical Introtim", quadra: "Gamma", club: "Researchers", temperament: "IP", dual: "SEE", positions: { Base: "Ni", Creative: "Te", Role: "Si", Vulnerable: "Fe", Suggestive: "Se", Mobilizing: "Fi", Ignoring: "Ne", Demonstrative: "Ti" } },
  LIE: { type: "LIE", name: "Jack London", fullName: "Logical Intuitive Extratim", quadra: "Gamma", club: "Researchers", temperament: "EJ", dual: "ESI", positions: { Base: "Te", Creative: "Ni", Role: "Fe", Vulnerable: "Si", Suggestive: "Fi", Mobilizing: "Se", Ignoring: "Ti", Demonstrative: "Ne" } },
  ESI: { type: "ESI", name: "Dreiser", fullName: "Ethical Sensory Introtim", quadra: "Gamma", club: "Socials", temperament: "IJ", dual: "LIE", positions: { Base: "Fi", Creative: "Se", Role: "Ti", Vulnerable: "Ne", Suggestive: "Te", Mobilizing: "Ni", Ignoring: "Fe", Demonstrative: "Si" } },
  
  IEE: { type: "IEE", name: "Huxley", fullName: "Intuitive Ethical Extratim", quadra: "Delta", club: "Humanitarians", temperament: "EP", dual: "SLI", positions: { Base: "Ne", Creative: "Fi", Role: "Se", Vulnerable: "Ti", Suggestive: "Si", Mobilizing: "Te", Ignoring: "Ni", Demonstrative: "Fe" } },
  SLI: { type: "SLI", name: "Gabin", fullName: "Sensory Logical Introtim", quadra: "Delta", club: "Pragmatists", temperament: "IP", dual: "IEE", positions: { Base: "Si", Creative: "Te", Role: "Ni", Vulnerable: "Fe", Suggestive: "Ne", Mobilizing: "Fi", Ignoring: "Se", Demonstrative: "Ti" } },
  LSE: { type: "LSE", name: "Sherlock Holmes", fullName: "Logical Sensory Extratim", quadra: "Delta", club: "Pragmatists", temperament: "EJ", dual: "EII", positions: { Base: "Te", Creative: "Si", Role: "Fe", Vulnerable: "Ni", Suggestive: "Fi", Mobilizing: "Ne", Ignoring: "Ti", Demonstrative: "Se" } },
  EII: { type: "EII", name: "Dostoevsky", fullName: "Ethical Intuitive Introtim", quadra: "Delta", club: "Humanitarians", temperament: "IJ", dual: "LSE", positions: { Base: "Fi", Creative: "Ne", Role: "Ti", Vulnerable: "Se", Suggestive: "Te", Mobilizing: "Si", Ignoring: "Fe", Demonstrative: "Ni" } }
};

export const TIM_PROFILES: Record<TIM, TIMProfile> = {
  ILE: {
    type: "ILE",
    description: "Pendobrak sekat konseptual yang selalu mencari kemungkinan baru. Anda melihat dunia sebagai anyaman rahasia yang menunggu diuraikan lewat teori terstruktur. Anda senang menyatukan berbagai bidang ilmiah yang tampak tidak berhubungan menjadi gagasan baru.",
    orientasiBase: "Menangkap potensi tersembunyi, inovasi gagasan murni, dan hubungan spekulatif tanpa batas.",
    caraCreative: "Membangun penjelasan teoretis, diagram, dan keteraturan logis untuk mewujudkan alternatif baru.",
    roleTampilan: "Berusaha terlihat tegas dan siap beraksi taktis saat ditekan, namun menguras tenaga bila berkepanjangan.",
    tuntutanPolr: "Sangat tidak nyaman dengan keharusan menilai kesetiaan moral batin seseorang atau mengurus gosip emosional personal.",
    bantuanSuggestive: "Relief luar biasa didapat saat lingkungan sekitar merawat kenyamanan tubuh, memberi hidangan lezat, dan suasana rileks tanpa tuntutan.",
    areaMobilizing: "Sangat bersemangat menghidupkan keceriaan sosial, mendambakan dipuji karena mampu meramaikan suasana kelompok.",
    kompetensiIgnoring: "Sangat memahami visi masa depan yang abstrak atau ramalan tren, tetapi cenderung mengabaikannya karena lebih menyukai pilihan aktif yang ada di hadapan.",
    kemampuanDemonstrative: "Secara otomatis membagikan trik efisiensi praktis, merancang perbaikan alat bertenaga tinggi, tetapi enggan menyombongkannya.",
    polaSeimbang: "Aktif membangun teori, ramah mengobrol, sehat merawat tubuh secara berkala bersama lingkar dekatnya.",
    polaTertekan: "Menjadi defensif secara fisik, terobsesi dengan aturan formal yang kaku, atau merasa ditinggalkan secara emosional oleh kawan dekat.",
    gayaBelajar: "Eksploratif, menyukai pembelajaran konseptual tanpa sekat, membuat mind-map yang rumit.",
    gayaKerja: "Visioner, perancang sistem awal, pembongkar kemacetan ide lewat brainstorming tanpa batas.",
    gayaKomunikasi: "Argumentatif namun santai, dipenuhi kiasan analogi tak terduga, cepat berpindah topik.",
    kebutuhanKelompok: "Sebagai katalis ide-ide murni dan penyusun model teoritis awal yang fleksibel.",
    batasPerhatian: "Terlalu cepat bosan pada detail rutin dan cenderung mengabaikan keutuhan relasi emosional batin.",
    CommonMistypes: ["ENTP (MBTI)", "IEE (Socionics - akibat kemiripan sifat kreatif)", "LII (akibat fokus teori yang kuat)"],
    refleksi: "Apakah dorongan mengeksplorasi ide baru kadang menjauhkanmu dari memperhatikan kebutuhan tubuh sendiri dan perasaan orang-orang tercinta?",
    buktiMenyangkal: "Jika Anda ternyata sangat teliti menjaga detail kenyamanan fisik sehari-hari tanpa bantuan eksternal dan sangat sensitif terhadap keretakan relasi batin kawan dekat secara konstan, mungkin Anda tipe lain."
  },
  SEI: {
    type: "SEI",
    description: "Pemelihara keharmonisan indrawi dan kehangatan emosi. Anda bergerak di dunia berdasarkan kenyamanan lingkungan, merespons kebutuhan fisik secara rileks, dan mahir mencairkan suasana canggung melalui gurauan ringan bin lembut.",
    orientasiBase: "Sensasi kenyamanan indrawi, kesehatan fisik, detail estetika yang asri, dan kehidupan yang tenang.",
    caraCreative: "Menciptakan suasana sosial yang hangat, mengekspresikan keramahan emosi secara langsung untuk menyatukan orang.",
    roleTampilan: "Mempresentasikan diri sebagai orang yang visioner dan terencana di hadapan publik, padahal batinnya lebih suka mengikuti aliran momen.",
    tuntutanPolr: "Mengalami stres tinggi bila dipaksa bekerja di lingkungan berantakan dengan perdebatan efisiensi bisnis kering tanpa kehangatan.",
    bantuanSuggestive: "Sangat berterima kasih ketika ada orang lain yang datang membawa teori-teori baru yang jenius murni tanpa mengharapkan ia merancang teori itu.",
    areaMobilizing: "Ingin membuktikan diri mampu berpikir secara terstruktur dan logis, sangat menikmati pujian atas analisisnya.",
    kompetensiIgnoring: "Mampu menegaskan otoritas diri saat didesak, namun buru-buru meredakannya karena mengganggu kedamaian.",
    kemampuanDemonstrative: "Secara alami membaca nuansa emosi orang lain dan menjaga kedamaian batin dalam ikatan persahabatan sejati di balik layar.",
    polaSeimbang: "Mampu menyalurkan kreativitas seni, menjaga kepuasan pangan, teratur menyusun logika hidup yang jernih.",
    polaTertekan: "Mengisolasi diri secara fisik, menjadi terlalu sensitif terhadap ancaman dari luar, atau memaksakan keceriaan palsu yang melelahkan.",
    gayaBelajar: "Praktis bernuansa indrawi, menyukai contoh nyata yang nyaman dipahami, dibantu visual yang indah.",
    gayaKerja: "Menciptakan lingkungan kerja yang ramah emosi, kolaborator andal yang menjaga kebahagiaan tim pelaksana.",
    gayaKomunikasi: "Hangat, santun, penuh candaan bersahabat, menghindari konfrontasi langsung.",
    kebutuhanKelompok: "Sebagai perekat sosial yang merawat kenyamanan fisik dan kebersamaan kelompok secara nyata.",
    batasPerhatian: "Sering menunda-nunda keputusan penting karena enggan melangkah keluar dari situasi nyaman.",
    CommonMistypes: ["ISFP (MBTI)", "ESE (Socionics - akibat dorongan bersosialisasi hangat)", "IEI (akibat kemiripan sifat damai)"],
    refleksi: "Apakah keengganan berkonfrontasi membuatmu memendam banyak kekesalan fisik dan emosional hingga meracuni batinmu sendiri?",
    buktiMenyangkal: "Jika Anda terbukti sangat menyukai perdebatan konseptual abstrak yang rumit secara tiada henti dan mengabaikan tidur/pola makan dengan mudah demi produktivitas bisnis yang keras, Anda bukan SEI."
  },
  ESE: {
    type: "ESE",
    description: "Orkestrator kegembiraan sosial yang energetik. Anda memiliki radar tajam untuk membaca 'getaran emosi' ruangan dan dengan sigap menggelontorkan aksi kepedulian fisik bagi kenyamanan orang-orang di sekitar.",
    orientasiBase: "Mengekspresikan gairah emosional, menyebarkan kegembiraan, mendeteksi kelusuan atmosfer kelompok untuk diperbaiki.",
    caraCreative: "Menata estetika fisik, menyediakan makanan, kesehatan, dan keindahan detail ruang sekitar demi kebahagiaan sesama.",
    roleTampilan: "Berusaha tampil sangat produktif, logis, dan profesional secara administratif di tempat kerja ilmiah.",
    tuntutanPolr: "Sangat panik jika dihadapkan pada ketidakpastian waktu, keterlambatan kronis, atau tuntutan memetakan tren visioner abstrak.",
    bantuanSuggestive: "Lega sekali jika ada pasangan yang membantunya merapikan definisi konseptual, sistem administrasi, dan konsistensi hukum objektif.",
    areaMobilizing: "Sangat menyukai petualangan menemukan ide-ide baru, menggemari diskusi kemungkinan kreatif demi dinilai berpengetahuan luas.",
    kompetensiIgnoring: "Punya kepatuhan etis interpersonal yang kuat, namun emosi sponannya yang menyala di luar sering menutupi jarak psikologis yang murni.",
    kemampuanDemonstrative: "Secara bawah sadar lihai mengamankan perlindungan fisik dan menunjukkan tekad kepemimpinan taktis di saat krisis melanda kelompok.",
    polaSeimbang: "Teratur mengelola waktu dengan bantuan perencana, aktif membina relasi hangat, dan menjaga struktur administrasi rumah tangga.",
    polaTertekan: "Menjadi sangat cemas tentang masa depan, menuduh orang lain tidak menghargai pengorbanan emosinya, serta bertindak terburu-buru yang merusak fisik.",
    gayaBelajar: "Interaktif, menyukai demonstrasi langsung dengan dinamika vokal yang berenergi dan diskusi kelompok.",
    gayaKerja: "Penyelenggara acara utama, komunikator tim yang energik, memastikan semua orang terurus kebutuhannya.",
    gayaKomunikasi: "Ekspresif, bermelodi, menggunakan bahasa tubuh yang kaya, cenderung dominan dalam percakapan.",
    kebutuhanKelompok: "Pembangun moral perjuangan kelompok dan pelaksana urusan kenyamanan fisik yang super andal.",
    batasPerhatian: "Rentan kelelahan ekstrem karena memaksakan diri merawat emosi semua orang tanpa istirahat terjadwal.",
    CommonMistypes: ["ESFJ (MBTI)", "EIE (Socionics - sering dikacaukan karena sama-sama menyukai ekspresi sosial)", "SEE (akibat kesamaan energi dominan)"],
    refleksi: "Apakah ketakutanmu terhadap kesunyian atau situasi tak pasti memaksamu terus-menerus memicu aktivitas sosial tanpa arti?",
    buktiMenyangkal: "Jika Anda terbukti dingin secara emosional, sangat menikmati kesendirian yang sunyi sepanjang hari, dan lihai bersenang-senang mengonseptualisasikan tren abstrak tanpa peduli kenyamanan fisik orang sekitar, Anda bukan ESE."
  },
  LII: {
    type: "LII",
    description: "Arsitek sistem yang berdedikasi mencari esensi keadilan logis. Anda mengupas realitas hingga ke fondasi struktur teoretisnya, lalu merapikannya ke dalam klasifikasi murni yang konsisten.",
    orientasiBase: "Analisis logis murni, klasifikasi terstruktur, penegakan prinsip keadilan, ketertarikan teoritis.",
    caraCreative: "Menjelajahi alternatif konseptual, melahirkan gagasan spekulatif unik untuk memperluas cakrawala sistem.",
    roleTampilan: "Mempresentasikan diri sebagai sosok yang peduli hubungan etis dan ramah secara personal di lingkungan formal.",
    tuntutanPolr: "Merasa sangat terancam oleh desakan fisik yang agresif, intimidasi kekuasaan langsung, atau konfrontasi perebutan wilayah taktis.",
    bantuanSuggestive: "Jiwa batinnya dipenuhi kedamaian ketika berada di dekat orang yang membawa kegembiraan emosional murni, kehangatan atmosfer sosial, dan tawa tulus.",
    areaMobilizing: "Sangat mendambakan tubuhnya sehat dan hidupnya dipenuhi kenyamanan indrawi yang rapi, bangga jika dinilai terurus fisiknya.",
    kompetensiIgnoring: "Sangat andal dalam menyusun efisiensi bisnis pragmatis, namun mengabaikannya jika teori logis prinsipilnya tidak terpenuhi.",
    kemampuanDemonstrative: "Secara otomatis memprediksi skenario jangka panjang dari teori buatannya secara tajam tanpa perlu pamer keahlian visioner.",
    polaSeimbang: "Rutin berolahraga ringan, aktif berdiskusi gagasan baru, dan sesekali menikmati festival musik yang hangat.",
    polaTertekan: "Menarik diri ke dalam analisis teoretis obsesif yang paranoid, kehilangan rasa aman emosional, atau tiba-tiba meledak kasar menentang penindas kasar.",
    gayaBelajar: "Sains teoretis murni, menyukai buku rujukan tebal yang disusun sistematis dan objektif secara matematis.",
    gayaKerja: "Perancang skema algoritma, analis kebijakan berkeadilan sosial, penasihat murni yang independen.",
    gayaKomunikasi: "Tenang, artikulatif, menggunakan bahasa presisi, seringkali terdengar formal dan datar pada awalnya.",
    kebutuhanKelompok: "Sebagai pilar kejernihan logika, penilai objektif aturan, dan penyeimbang keadilan klasifikasi.",
    batasPerhatian: "Terlalu lama bergulat dalam teori murni sehingga melewatkan momentum bertindak secara taktis di dunia nyata.",
    CommonMistypes: ["INTJ (MBTI)", "ILE (Socionics - akibat ketajaman gagasan)", "ILI (akibat kesamaan sifat pendiam)"],
    refleksi: "Apakah ketakutanmu pada tekanan fisik membuatmu lari ke dunia aturan logis murni dan menolak menghadapi kompleksitas praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai aksi perebutan kekuasaan fisik di lapangan, lincah bertarung secara taktis demi material, dan benci aturan teoretis abstrak, Anda bukan LII."
  },
  SLE: {
    type: "SLE",
    description: "Panglima aksi taktis yang menguasai ruang fisik. Anda melihat hidup sebagai medan kekuatan yang harus dituntun secara strategis, mahir mengalokasikan sumber daya, menegakkan hierarki disiplin, dan mendobrak hambatan fisik langsung.",
    orientasiBase: "Kehendak baja, penguasaan ruang fisik taktis, kontrol wilayah, arah mobilisasi tim secara dominan.",
    caraCreative: "Membangun sistem klasifikasi, analisis hukum, dan aturan hierarki yang tegas untuk mengunci kekuasaan.",
    roleTampilan: "Berusaha tampil berwawasan konseptual unik, membaca kemungkinan alternatif di depan klien besar.",
    tuntutanPolr: "Sangat rapuh di wilayah kedekatan relasi emosional batin (Fi); takut disingkirkan secara etis atau dituduh tak tulus hatinya.",
    bantuanSuggestive: "Luar biasa ditenangkan ketika didampingi oleh figur bijak yang meramalkan tren masa depan, konsekuensi mistik jangka panjang, dan mengurai kecemasan batinnya.",
    areaMobilizing: "Mendambakan suasana sosial yang meriah penuh tawa riang, bangga jika diakui mampu membuat orang termotivasi gembira.",
    kompetensiIgnoring: "Sangat tangguh secara daya tahan tubuh dan kebugaran fisik rutin, tetapi melindas kenyamanan fisik demi meraih target kemenangan target.",
    kemampuanDemonstrative: "Secara instingtif membongkar inefisiensi administrasi proyek kerja pragmatis, langsung mengarahkan sumber daya secara instan.",
    polaSeimbang: "Mampu menyalurkan energi kepemimpinan secara adil, mendengarkan nasehat spiritual, dan melatih disiplin etis yang tulus.",
    polaTertekan: "Menjadi paranoid terhadap kesetiaan kawan sedekatnya, bertindak sangat agresif secara fisik untuk mempertahankan kontrol, atau jatuh dalam kemurungan batin.",
    gayaBelajar: "Studi kasus taktis, membedah struktur organisasi kekuasaan, menyukai pelatihan kepemimpinan militer/olahraga keras.",
    gayaKerja: "Eksekutor krisis murni, jenderal lapangan industri, pembangun infrastruktur berskala masif.",
    gayaKomunikasi: "Tegas, langsung to-the-point, berwibawa, menggunakan perintah verbal yang lugas.",
    kebutuhanKelompok: "Sebagai panglima pelaksana yang memastikan target tercapai melalui disiplin internal yang solid.",
    batasPerhatian: "Sering melindas ikatan relasi tulus kawan dekat demi tegaknya aturan taktis pencapaian target.",
    CommonMistypes: ["ESTP (MBTI)", "SEE (Socionics - sering dikacaukan karena sama-sama gigih secara fisik)", "LSI (akibat kesamaan ketatnya aturan logis)"],
    refleksi: "Apakah kekerasan lahiriahmu sebenarnya topeng untuk menyembunyikan ketakutan mendalam akan pengkhianatan emosional kawan dekat?",
    buktiMenyangkal: "Jika Anda terbiasa cemas secara fisik, sangat menghindari membebankan kehendak pada orang lain, dan menghargai kesantunan hubungan batin di atas segalanya, Anda bukan SLE."
  },
  IEI: {
    type: "IEI",
    description: "Penyair batin yang menavigasi arus waktu dan makna spiritual. Anda menangkap arah perkembangan zaman, mengurai emosi tersembunyi, dan membimbing jiwa-jiwa keras agar melunak melalui bahasa puitis yang menyentuh hati.",
    orientasiBase: "Aliran batiniah waktu, tren perkembangan visioner, firasat murni, dan makna eksistensial peristiwa.",
    caraCreative: "Memengaruhi dinamika emosi sekitar, mencairkan kemarahan dengan orkestrasi ekspresi yang santun bin bermelodi.",
    roleTampilan: "Tampil sangat peduli pada detail kenyamanan indrawi dan tata krama kerapian di lingkungan formal baru.",
    tuntutanPolr: "Merasa sangat tersiksa oleh instruksi bisnis yang garing teknis, fakta-fakta ekonomi kering, atau tuntutan efisiensi kerja tanpa jiwa kemanusiaan.",
    bantuanSuggestive: "Kemantapan hidupnya utuh di dekat pelindung tangguh yang berkehendak tegas, dominan secara taktis, dan membantunya bertindak di dunia nyata.",
    areaMobilizing: "Ingin dipuji sebagai pemikir analitis yang objektif dan konsisten dalam merumuskan teori terstruktur.",
    kompetensiIgnoring: "Sangat kreatif melahirkan ide-ide alternatif konseptual baru, tetapi mengabaikannya demi fokus pada ramalan tren utama yang ia yakini terjadi.",
    kemampuanDemonstrative: "Secara alami menjaga jarak psikologis etis yang tulus di balik layar dalam hubungan persahabatan sejati.",
    polaSeimbang: "Konsisten menulis karya sastra/seni, melatih logika teoretis, menetapkan batasan aksi taktis bersama mentor tepercaya.",
    polaTertekan: "Tergelincir menjadi pemimpi pasif yang menyalahkan realitas objektif, terjebak dalam delusi penganiayaan emosional, atau membelanjakan uang secara serampangan.",
    gayaBelajar: "Metafora imajinatif, menyukai pembelajaran sejarah, filsafat, sastra, psikologi naratif.",
    gayaKerja: "Inspirator spiritual tim, penasihat arah perubahan budaya, perancang naskah komunikasi visioner.",
    gayaKomunikasi: "Lembut, diplomatis, puitis, kaya metafora, menggunakan intonasi emosional yang menyentuh.",
    kebutuhanKelompok: "Sebagai jangkar visi masa depan yang membimbing moral pejuang kelompok lewat inspirasi emosional hangat.",
    batasPerhatian: "Seringkali mangkir dari kewajiban tugas praktis harian karena tenggelam dalam dunia imajinasi internal.",
    CommonMistypes: ["INFJ (MBTI)", "EII (Socionics - sering tertukar karena kelembutan batin)", "SEI (akibat kemiripan kenyamanan batin)"],
    refleksi: "Apakah pelarianmu ke dalam dimensi firasat masa depan sebenarnya cara menghindari realitas keras tanggung jawab hidup praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai keteraturan data bisnis yang dingin, rajin menghitung laba-rugi operasional harian, dan benci metafora sastra mistis, Anda bukan IEI."
  },
  EIE: {
    type: "EIE",
    description: "Dramaturg perjuangan ideologis yang membakar gairah khalayak. Anda menerjemahkan visi jangka panjang menjadi histeria emosional massal demi menggerakkan roda perubahan sejarah kemanusiaan.",
    orientasiBase: "Ketenaran emosional, orkestrasi atmosfer sosial, membakar gairah kelompok demi keadilan ideologis.",
    caraCreative: "Membaca dinamika tren masa depan, meramalkan konsekuensi perubahan zaman bagi kehidupan spiritual.",
    roleTampilan: "Berusaha keras tampak sangat mahir mengurus bisnis administrasi praktis yang diatur rapi.",
    tuntutanPolr: "Sangat terancam oleh tuntutan mengurus detail perawatan fisik tubuh jasmani, sensasi indrawi rutin, atau memasak harian.",
    bantuanSuggestive: "Sangat terbantu oleh orang terstruktur yang membawakan keteraturan logika formal, penjelasan teoretis yang baku dinamis.",
    areaMobilizing: "Sangat ingin diakui sebagai pemimpin aksi taktis yang tegas dan pemberani di garis depan pertempuran fisik.",
    kompetensiIgnoring: "Sangat memahami ikatan kesetiaan moral etis personal, tetapi lebih memilih membakar emosi kelompok demi tujuan besar.",
    kemampuanDemonstrative: "Secara otomatis mendeteksi potensi tersembunyi gagasan ilmiah baru, melahirkan alternatif tak terduga secara cerdas harian.",
    polaSeimbang: "Teratur merawat kesehatan fisik bersama pasangannya, membina disiplin kaji teori, mengarahkan drama sosial demi kebaikan.",
    polaTertekan: "Mengalami ketakutan paranoid akan penyakit fisik di organ tubuhnya, melontarkan luapan emosi histeris merusak hubungan etis personal kawan dekat.",
    gayaBelajar: "Drama naratif historis, menyukai kuliah dengan dosen karismatik yang mendiskusikan visi kemanusiaan agung.",
    gayaKerja: "Komunikator masa depan, sutradara kreatif, aktor hubungan politik global, pembina ideologi perjuangan.",
    gayaKomunikasi: "Dramatis, teatral, berwibawa, sarat gairah emosional, piawai memikat hati pendengar dengan metafora dinamis.",
    kebutuhanKelompok: "Sebagai pembakar semangat juang ideologi kemanusiaan yang mempersatukan kelompok dalam batin perjuangan.",
    batasPerhatian: "Sering merusak kesehatan diri sendiri demi menjaga panggung pertunjukan emosi khalayak.",
    CommonMistypes: ["ENFJ (MBTI)", "ESE (Socionics - akibat kesamaan ekspresi sosial berpendar)", "LIE (akibat visi aksi yang menggebu)"],
    refleksi: "Apakah ledakan emosi panggungmu benar-benar memperjuangkan nilai tulus, atau sekadar ketakutan batinmu akan pengabaian khalayak?",
    buktiMenyangkal: "Jika Anda dingin secara sosial, sangat asik menghidupkan kenyamanan indrawi seperti memijat tubuh secara mandiri dengan teliti harian, serta benci panggung pembicara kelompok, Anda bukan EIE."
  },
  LSI: {
    type: "LSI",
    description: "Inspektur keteraturan sistem yang mengawal disiplin operasional. Anda adalah batu karang kestabilan, merapikan setiap sel regulasi, menegakkan keadilan klasifikasi logika murni, didukung pengawasan taktis yang presisi harian.",
    orientasiBase: "Klasifikasi logika terstruktur, hukum tertulis yang baku murni, keadilan regulasi dan keteraturan sistemik.",
    caraCreative: "Menerapkan kepemimpinan taktis fisik, menegakkan disiplin operasional di lapangan kerja.",
    roleTampilan: "Tampil sangat bersahabat secara moral interpersonal harian di lingkungan kerja baru untuk kenyamanan administratif.",
    tuntutanPolr: "Mengalami kelumpuhan aksi ketika menghadapi alternatif spekulatif yang berubah tanpa batas waktu, atau ide nirkabel nireguler.",
    bantuanSuggestive: "Hatinya tergetar melembut di dekat sosok karismatik yang membawakan gairah emosional membakar, keceriaan kelompok yang tulus berpendar.",
    areaMobilizing: "Sangat mendambakan bimbingan visi masa depan, mendambakan dipuji karena mampu menangkap tren mistis eksistensial.",
    kompetensiIgnoring: "Sangat mahir mengurus detail bisnis administrasi praktis, tetapi menundukkannya di bawah aturan logika filosofis prinsipil.",
    kemampuanDemonstrative: "Secara alami menjaga kerapian fisik, kebersihan ruang, dan keteraturan sensasi tubuh sehat harian di latar belakang.",
    polaSeimbang: "Secara sadar membuka ruang diskusi alternatif gagasan, rutin bersenang-senang menikmati orkestrasi seni teater yang hangat.",
    polaTertekan: "Menjadi birokrat luar biasa kaku yang menindas setiap ide unik, terobsesi membongkar persekongkolan fantasi fiktif yang dicurigai menyerangnya.",
    gayaBelajar: "Instruktif, terstruktur, menyetujui bagan diagram murni yang terbukti kokoh dan terdokumentasi rapi.",
    gayaKerja: "Administrator kepatuhan mutu harian, inspektur tata tertib kerja proyek fisik, pengelola operasional bersistem ketat.",
    gayaKomunikasi: "Komunikasi formal-monoton, presisi tinggi, lugas murni berpola deduktif.",
    kebutuhanKelompok: "Sebagai pengawal kedisiplinan regulasi internal dan penjamin kelancaran operasional taktis tim.",
    batasPerhatian: "Seringkali membunuh kreativitas ide-ide liar unik demi memaksakan kepatuhan terhadap regulasi tertulis lama.",
    CommonMistypes: ["ISTJ (MBTI)", "SLE (Socionics - sering dikacaukan karena ketegasan fisik)", "ESI (akibat kemiripan menjaga etika hukum batin)"],
    refleksi: "Apakah ketakutanmu menghadapi ketidakpastian ide baru memaksamu membangun tembok aturan hukum yang mengurung kebebasan sesama?",
    buktiMenyangkal: "Jika Anda terbukti sangat membenci aturan formal administrasi, lincah berspekulasi ide aneh yang berantakan, serta tidak peduli kerapian ruang, Anda bukan LSI."
  },
  SEE: {
    type: "SEE",
    description: "Wiraswasta kharisma yang menaklukkan tantangan hubungan interpersonal. Anda memiliki tekad beraksi yang berlimpah, memobilisasi orang demi target praktis menggunakan diplomasi pesona pribadi yang lincah berpendar.",
    orientasiBase: "Kehendak baja, taktis fisik penuh energi, penguasaan wilayah, pengaruh direktif lewat pesona kharisma.",
    caraCreative: "Membina kedekatan relasi etis personal, menyepakati nilai moral batin tulus demi mendulang loyalitas tim.",
    roleTampilan: "Tampil tampak ramah dengan berwawasan teoretis saat diskusi ilmiah, berusaha terlihat pintar akademis kaku.",
    tuntutanPolr: "Sangat menderita ketika dipaksa menganalisis teori matematika murni formal kering, atau bagan logika klasifikasi rumit.",
    bantuanSuggestive: "Lega luar biasa dibantu oleh analis visioner yang merangkum kalkulasi konsekuensi tren jangka panjang dan strategi bisnis.",
    areaMobilizing: "Ingin dipuji sebagai pekerja profesional yang berwawasan efisiensi bisnis pragmatis canggih tinggi praktis.",
    kompetensiIgnoring: "Sangat andal menjaga kegembiraan emosional kelompok berpendar, tetapi memprioritaskan ketulusan aliansi relasi batin harian.",
    kemampuanDemonstrative: "Secara instingtif mendeteksi kebugaran jasmani fisik kawan terdekatnya, menjaga keasrian tubuh alami harian secara otomatis.",
    polaSeimbang: "Aktif melatih kesabaran belajar teori prinsipil, merenungkan tren pembangunan zaman bersama penasihat spiritual tepercaya.",
    polaTertekan: "Menjadi curiga teoretis secara konyol, bertindak manipulatif lewat relasi personal untuk memukul lawan bisnis, jatuh dalam kecemasan target.",
    gayaBelajar: "Pembelajaran aktif interaktif penuh negosiasi, membedah dinamika kepemimpinan personal dan politik pragmatis.",
    gayaKerja: "Negosiator bisnis hebat, pemimpin aktivis pergerakan, penggalang loyalitas personal berskala akar rumput harian.",
    gayaKomunikasi: "Hangat-direktif, energetik pesona tinggi, lincah menggunakan humor personal mendekatkan jarak emosi.",
    kebutuhanKelompok: "Sebagai penggalang masa yang tangguh dan pembuka gerbang aliansi strategis bernuansa kekerabatan erat.",
    batasPerhatian: "Seringkali mengorbankan ketertiban aturan sistem hukum tertulis formal demi membela kawan relasi dekatnya.",
    CommonMistypes: ["ESFP (MBTI)", "SLE (Socionics - akibat dorongan fisik yang energetik)", "IEE (akibat kemiripan dalam kelincahan sosial)"],
    refleksi: "Apakah pesona diplomasi personalmu sebenarnya cara menghindari perenungan jernih akan kekosongan arah hidup jangka panjangmu?",
    buktiMenyangkal: "Jika Anda ternyata pendiam kaku, sangat asyik meneliti klasifikasi logika formal murni sepanjang hari, serta benci politik negosiasi personal praktis, Anda bukan SEE."
  },
  ILI: {
    type: "ILI",
    description: "Begawan analisis yang merenungkan konsekuensi waktu. Anda adalah kritikus objektif penyaring risiko jangka panjang, membedah inefisiensi bisnis murni pragmatis dibantu oleh visi masa depan yang tenang bin tajam.",
    orientasiBase: "Membaca arah tren jangka panjang, analisis konsekuensi waktu, pertapa batiniah menyaring risiko buruk.",
    caraCreative: "Merancang efisiensi praktis operasional bisnis, mengoptimalisasi sumber daya riil lewat fakta objektif harian.",
    roleTampilan: "Tampil bersikap sopan ramah rileks dengan menyapa tetangga, menunjukkan perawatan kenyamanan sosial formal.",
    tuntutanPolr: "Mengalami stres akut bila dipaksa menghidupkan keceriaan histeris emosional kelompok secara manipulatif harian.",
    bantuanSuggestive: "Merasa jiwanya dinyalakan berenergi ketika ditemani kawan bertekad baja energetik yang menggerakkannya masuk ke lapangan tindakan.",
    areaMobilizing: "Sangat mendambakan ketulusan hubungan etis personal yang setia, bangga dinilai sebagai kekasih yang tulus setia.",
    kompetensiIgnoring: "Sangat pandai menyusun klasifikasi logika teoritis murni, tetapi membuangnya sebagai kesenangan tak berguna tanpa hasil pragmatis.",
    kemampuanDemonstrative: "Secara alami memisahkan diri ke dalam prediksi spekulatif alternatif gagasan baru secara cerdas otomatis di belakang layar.",
    polaSeimbang: "Menjaga keontentikan hubungan batin dekatnya, teratur berolahraga aktif, dan mengekspresikan kritik secara konstruktif logis.",
    polaTertekan: "Menarik diri ke dalam isolasi batin dingin, menghujami setiap orang dengan pesimisme tajam perusak moral, serta jatuh dalam inersia pasif.",
    gayaBelajar: "Analitis komparatif mendalam, melahap buku ekonomi bisnis makro, fisika teori, sejarah ramalan peradaban.",
    gayaKerja: "Analis risiko keuangan global, kritikus kualitas sistem, arsitek strategi bisnis jangka panjang.",
    gayaKomunikasi: "Skeptis-tenang, satir hangat secara intelektual, datar, menggunakan analogi logis pragmatis ringkas.",
    kebutuhanKelompok: "Sebagai navigator arah jangka panjang penjamin keselamatan kelompok dari keputusan tergesa-gesa buruk.",
    batasPerhatian: "Kecenderungan menolak bertindak langsung di lapangan karena terlalu asyik menyaring cacat dan risiko teoretis.",
    CommonMistypes: ["INTJ (MBTI)", "LII (Socionics - akibat kemiripan sifat analitis akademis)", "SLI (akibat kesamaan pembawaan tenang rileks)"],
    refleksi: "Apakah kritisme satirmu sebenarnya cara bertahan dari ketakutanmu menghadapi ketidakmampuan bergaul ramah secara emosi hangat?",
    buktiMenyangkal: "Jika Anda terbukti sangat energetik bersosialisasi membakar emosi kelompok panggung sepanjang hari, dan benci kalkulasi risiko jangka panjang ekonomi, Anda bukan ILI."
  },
  LIE: {
    type: "LIE",
    description: "Wirausahawan dinamis yang mengejar realisasi target pragmatis. Anda mengawasi proses bisnis dengan lincah, memadukan riset pasar pragmatis dengan visi tren masa depan yang menguntungkan harian.",
    orientasiBase: "Efisiensi bisnis teoretis praktis, alokasi investasi sumber daya, aksi cepat melipatgandakan produktivitas empiris.",
    caraCreative: "Memetakan arah tren bisnis masa depan, memproyeksikan kalkulasi waktu jangka panjang secara visioner.",
    roleTampilan: "Mempresentasikan diri berpura-pura ramah sosial emosional hangat membara saat memikat penanam modal baru harian.",
    tuntutanPolr: "Mengalami depresi batin jika dipaksa menata estetik kenyamanan indrawi detail ruang hias, atau pijat santai relaks harian fisik.",
    bantuanSuggestive: "Jiwa batinnya tunduk melembut hormat di dekat pasangan setia bermoral batin tulus yang menjaga keaslian hubungan etis suci.",
    areaMobilizing: "Ingin diakui sebagai kesatria aksi fisik pemberani yang menguasai seni bela diri taktis atau olahraga ekstrem target fisik.",
    kompetensiIgnoring: "Sangat andal menyusun bagan logika konseptual sistem sains murni, tetapi segera mengabaikannya karena dirasakan tidak mendulang laba.",
    kemampuanDemonstrative: "Secara otomatis memancar ide-ide spekulatif inovasi baru bernilai bisnis cerdas tinggi di latar belakang.",
    polaSeimbang: "Secara berkala meditasi hening etis batin, rutin olahraga fisik aman, membina kesetiaan keluarga erat penuh kasih.",
    polaTertekan: "Jatuh dalam hipokondria cemas berlebihan akan penyakit fisik kecil, menuduh kawan dekatnya mengkhianati reputasinya secara moral batin.",
    gayaBelajar: "Studi kelayakan bisnis komparatif pragmatis, keuangan terapan, penerapan inovasi teknologi masa depan.",
    gayaKerja: "Pelopor industri rintisan, manajer investasi skala global, pendorong transformasi produktivitas proyek fisik.",
    gayaKomunikasi: "Cepat dinamis, penuh energi progresif, menggunakan humor candaan bisnis pragmatis produktif harian.",
    kebutuhanKelompok: "Sebagai motor penggerak keefektifan pencapaian kemakmuran ekonomi dan akselerasi visi ke depan tim.",
    batasPerhatian: "Seringkali melindas batas kebugaran fisik tubuh demi memacu ambisi produktivitas target bisnis harian.",
    CommonMistypes: ["ENTJ (MBTI)", "EIE (Socionics - akibat kesamaan dorongan aksi yang progresif keras)", "LSE (akibat kemiripan efisiensi kerja)"],
    refleksi: "Apakah ambisi akselerasi bisnis pragmatismu sebenarnya pelarian dari ketakutanmu untuk duduk diam merenungi kerentanan etis batinmu rasa bersalah?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai bersantai rebahan sepanjang hari merawat dekorasi kamar tidur estetik dengan teliti, serta benci kalkulasi keuangan dinamis, Anda bukan LIE."
  },
  ESI: {
    type: "ESI",
    description: "Benteng penjaga kesucian moral batin dan integritas relasi. Anda mengamati ketulusan hati sesama secara hening, tegas memilah siapa yang layak dipercaya harian, didukung tekad pertahanan diri taktis yang kokoh teguh.",
    orientasiBase: "Ikatan etis moral interpersonal tulus, mendeteksi kepalsuan jarak hubungan, memegang janji integritas batin.",
    caraCreative: "Menerapkan perlindungan taktis fisik langsung, mempertahankan wilayah moral keluarga dekatnya dari perusak fisik luar.",
    roleTampilan: "Tampil tampak ramah dengan menerangkan bagan matematika teoritis kaku di ruang formal baru administratif harian.",
    tuntutanPolr: "Mengalami stres batin hebat saat dilemparkan ke dalam situasi ide konseptual acak perubahan yang serba teoritis liar nirkabel.",
    bantuanSuggestive: "Jiwa batinnya disegarkan ceria ketika ada penasihat profesional tepercaya membawakan solusi efisiensi bisnis operasional pragmatis.",
    areaMobilizing: "Sangat merindukan bimbingan visi tren masa depan, bangga jika pujian ditujukan atas kemampuannya meramal risiko zaman.",
    kompetensiIgnoring: "Sangat berbakat mengenali moral getaran emosional kelompok bersosialisasi hangat, tetapi memangkasnya demi kejujuran relasi dekat batin suci.",
    kemampuanDemonstrative: "Secara alami menjaga detail kebersihan rumah tangga, estetika kenyamanan indrawi jasmani sehat harian dalam keheningan.",
    polaSeimbang: "Teratur membaca perkembangan sejarah tren ke depan, rajin menyelaraskan bisnis karirnya, dan membuka batin terhadap alternatif ide hangat.",
    polaTertekan: "Menjadi hakim moral yang sangat kaku berpembawaan dingin memusuhi sekelompok besar orang luar, terjerembab curiga aneh-aneh tak rasional.",
    gayaBelajar: "Kesusastraan bernuansa etika perjuangan kemanusiaan, psikologi hubungan konseptual tulus pragmatis berkeluarga.",
    gayaKerja: "Pengawal kepatuhan kode etik industri, penjaga benteng operasional rahasia tim, psikolog klinis hubungan personal.",
    gayaKomunikasi: "Tenang berwibawa sekuriti batin tinggi, diplomatis jarak sosial teratur, tajam mengamati keontentikan gerak mata kawan.",
    kebutuhanKelompok: "Sebagai batu karang integritas etika internal pengaman moralitas kawan tim dekat pengusir pengkhianat.",
    batasPerhatian: "Cenderung terlalu cepat menghakimi dingin seseorang sebagai tidak tulus dan menutup pintu maaf selamanya.",
    CommonMistypes: ["ISFJ (MBTI)", "LSI (Socionics - akibat kesamaan kekristalan aturan dingin)", "EII (akibat kesamaan integritas etis batin)"],
    refleksi: "Apakah ketegasanmu memilah hubungan moral batin sebenarnya memenjarakanmu ke dalam ketakutan kesepian abadi menolak dimaafkan?",
    buktiMenyangkal: "Jika Anda sangat toleran terhadap kelonggaran moralitas batin, asyik berspekulatif teori kosmologi nirkabel liar semesta, serta mengabaikan janji setia personal, Anda bukan ESI."
  },
  IEE: {
    type: "IEE",
    description: "Penjelajah potensi kemanusiaan yang lincah menular pesona kehangatan. Anda menangkap bakat unik tersembunyi dalam diri setiap jiwa yang Anda temui, membimbing mereka menemukan jati diri sejati ditopang oleh diplomasi relasi personal etis yang luwes berpendar harian.",
    orientasiBase: "Mendeteksi potensi bakat unik murninya manusia, alternatif jalan hidup kreatif inovatif, keunikan esensi tersembunyi.",
    caraCreative: "Membangun ikatan relasi etis hangat dari hati ke hati, menavigasi keharmonisan moral persahabatan tulus personal.",
    roleTampilan: "Tampil bersikap seakan-akan petarung taktis fisik berwibawa militer energetik direktif di depan rapat umum birokrasi baru.",
    tuntutanPolr: "Sangat tidak nyaman dipaksa menelan klasifikasi logika teoretis formal baku kering yang membelenggu kreativitas batinnya.",
    bantuanSuggestive: "Luar biasa rileks tenang ketika pasangannya menatanya tidur di atas kamar estetik bersih, merawat kebugaran tubuh, serta memasakkannya makanan bergizi.",
    areaMobilizing: "Mendambakan pengakuan profesional akan kemampuan efisiensi kerja pragmatisnya, bangga dinilai lihai merancang bisnis.",
    kompetensiIgnoring: "Sangat peka terhadap tren masa depan batiniah, tetapi mengesampingkannya demi mengeksplorasi berlimpahnya kemungkinan ide aktif harian nyata.",
    kemampuanDemonstrative: "Secara alami mencairkan sengketa atmosfer emosional tim kelompok lewat humor ceria bersahabat otomatis dari belakang.",
    polaSeimbang: "Membina disiplin hidup operasional bisnis terencana, rutin pijat tubuh rileks sehat secara berkala, sabar mengkaji logika tertata.",
    polaTertekan: "Tiba-tiba meledak menuduh pembatasan teoretis kaku orang lain sebagai kejahatan, mencoba bertarung taktis agresif berlebihan fisik.",
    gayaBelajar: "Psikologi humanistik interaktif, karya sastra sastrawan eksentrik ide baru, diskusi pemikiran orisinalitas manusia.",
    gayaKerja: "Konsultan pencari bakat talenta, pembina pengembangan keunikan individu tim, manajer humas aliansi strategis hangat.",
    gayaKomunikasi: "Ekspresif simpatik, humoris personal hangat berpendar, menulari tawa riang mengikis jarak psikologis kaku.",
    kebutuhanKelompok: "Sebagai dinamisator moral persahabatan yang menyulut tumbuhnya keunikan bakat terpendam kawan kelompok.",
    batasPerhatian: "Terlalu mudah teralihkan oleh kemunculan ide manusia baru sehingga menelantarkan penyelesaian proyek administratif pragmatis lama.",
    CommonMistypes: ["ENFP (MBTI)", "ILE (Socionics - akibat kesamaan kelincahan berpikir)", "EII (akibat kesamaan sifat etis hangat tulus)"],
    refleksi: "Apakah doronganmu terus mencari keunikan potensi luar biasa manusia lain sebenarnya pelarian dari keheningan untuk mencintai kerapihan hidup pribadimu?",
    buktiMenyangkal: "Jika Anda ternyata berkarakter dingin kaku, sangat menyukai matematika teoritis formula kering harian, serta benci obrolan dari hati ke hati, Anda bukan IEE."
  },
  SLI: {
    type: "SLI",
    description: "Teknisi hening yang menyempurnakan kualitas indrawi praktis. Anda menciptakan keindahan kenyamanan fisik yang bermutu tinggi, menyusun efisiensi alat proyek nyata, bernuansa ketenangan rileks murni harian.",
    orientasiBase: "Kenyamanan indrawi jasmani murni sehat, relaksasi tubuh, keseimbangan estetika alam sekitar, hidup minimalis.",
    caraCreative: "Memperbaiki keefektifan sistem mekanik alat kerja harian, merancang operasi bisnis praktis pragmatis.",
    roleTampilan: "Berusaha menampilkan diri tampak visioner spiritual membaca ramalan masa depan tren waktu didepan keramaian publik.",
    tuntutanPolr: "Jiwa batinnya membeku panik bila dipukuli tuntutan performa panggung histeria keceriaan emosional kelompok manipulatif harian.",
    bantuanSuggestive: "Relief hidupnya utuh didapatkan tatkala kawan kreatif membawakannya petualangan ide baru spekulatif aneh unik yang segar murni.",
    areaMobilizing: "Sangat mendambakan ketulusan kasih batin dalam relasi suci personal setia, bangga dinilai penyayang berintegritas tulus batin.",
    kompetensiIgnoring: "Sangat andal menegakkan perlindungan taktis fisik langsung, tetapi memilih mundur tenang rileks menghindari sengketa kekuasaan.",
    kemampuanDemonstrative: "Secara bawah sadar menyusun logika pembuktian prinsip teori sains murni dalam operasi hening otomatis tanpa banyak bicara.",
    polaSeimbang: "Teratur bersosialisasi mengeksplorasi ide segar bersama komunitas kecil, hening melatih kepekaan rasa setia etis.",
    polaTertekan: "Mengisolasi diri total di kamar tidur mati rasa indrawi fisik, melontarkan penolakan dingin sinis teoretis, cemas akan visi masa depan.",
    gayaBelajar: "Keterampilan teknik terapan operasional mekanis fisik, desain arsitektur minimalis lingkungan, sains praktis nyata.",
    gayaKerja: "Perancang produk ergonomis fisik bermutu, manajer pemeliharaan aset infrastruktur rahasia, pengrajin kayu murni.",
    gayaKomunikasi: "Sangat ringkas tenang datar to-the-point, santun menghindari gesekan verbal berisik, bersuara emosi ramah lirih.",
    kebutuhanKelompok: "Sebagai penjamin mutlak berjalannya kenyamanan fisik peralatan teknis dan tatanan ergonomis tempat tinggal.",
    batasPerhatian: "Seringkali menolak berkomunikasi ekspresif emosional membuat kawan dekatnya merasa diabaikan ditinggal gersang.",
    CommonMistypes: ["ISTP (MBTI)", "ILI (Socionics - akibat kemiripan pembawaan menyendiri hening)", "SEI (akibat kesamaan merawat indrawi fisik)"],
    refleksi: "Apakah kedok minimalis tenang keheninganmu sebenarnya ketakutanmu berlarut menghadapi tantangan gejolak interaksi emosi hangat kelompok?",
    buktiMenyangkal: "Jika Anda terbukti sangat senang tampil berbicara histeris dipanggung drama emosional membakar khalayak luas harian, Anda bukan SLI."
  },
  LSE: {
    type: "LSE",
    description: "Sutradara profesionalisme kerja bermutu tinggi. Anda memadukan efisiensi industri operasional pragmatis dengan ketelitian detail rasa indrawi kenyamanan fisik harian demi mewujudkan tatanan produktivitas murni berstandar mutu tinggi.",
    orientasiBase: "Efisiensi industri pragmatis empiris objektif harian, optimalisasi proses kerja alat berdisiplin tinggi, produktivitas handal.",
    caraCreative: "Merawat kenyamanan fisik jasmani tempat kerja ergonomis sehat, kebersihan estetika ruang, ketelitian detail indrawi.",
    roleTampilan: "Berusaha tampil ekspresif emosional hangat berpendar ceria bagai pembawa acara ulung di pesta baru kelompok formal harian.",
    tuntutanPolr: "Mengalami depresi batin parah bila dipaksa menebak makna ramalan visi tren masa depan tanpa didukung fakta empiris.",
    bantuanSuggestive: "Jiwa batinnya luar biasa tenang teduh disembuhkan ketika pasangannya membimbing rasa batin kedekatan interpersonal etis tulus.",
    areaMobilizing: "Ingin dipuji sebagai konseptor inovasi yang kaya akan kemungkinan ide alternatif aneh unik sains berpikiran terbuka.",
    kompetensiIgnoring: "Sangat andal menegakkan konsistensi logika teoretis rumus formal murni, tetapi memilih membuangnya demi kepiawaian kerja operasional riil.",
    kemampuanDemonstrative: "Secara otomatis memasang kehendak baja perlindungan taktis disiplin operasional lapangan fisik tanpa teriak kasar.",
    polaSeimbang: "Teratur meluangkan waktu hening yoga batin menyepakati etika hati kesetiaan keluarga, sabar menyaring imajinasi alternatif liar segar.",
    polaTertekan: "Menjadi paranoid akan kehabisan waktu operasional bisnis yang dikejar kecemasan krisis, melontarkan kritik moral pedas merusak persahabatan.",
    gayaBelajar: "Manajemen manufaktur industri, sertifikasi standar mutu mutu internasional, penerapan mekanika praktis ergonomis lapangan.",
    gayaKerja: "Direktur pelaksana operasional, kepala penjamin mutu laboratorium harian, arsitek lanskap kota terpadu bernuansa rapi.",
    gayaKomunikasi: "Eksplosif berenergi profesional kerja, runut logis pragmatis, santun tegas berpostur tubuh tegap rapi.",
    kebutuhanKelompok: "Sebagai panglima jenderal keefektifan target produktivitas bermutu tinggi dan pengatur keasrian indrawi lingkungan.",
    batasPerhatian: "Seringkali mengabaikan kelembutan kesetiaan batin emosional pasangannya demi memacu penyempurnaan detail target proyek.",
    CommonMistypes: ["ESTJ (MBTI)", "LIE (Socionics - akibat kesamaan pengejaran aksi efisiensi)", "LSI (akibat kesamaan disiplin keteraturan kerja)"],
    refleksi: "Apakah tuntutan tanpa cela profesional standar mutumu harian sebenarnya pelampiasan rasa takutmu dituduh gagal secara etika moral batin?",
    buktiMenyangkal: "Jika Anda ternyata pemimpi mager, berantakan secara fisik indrawi harian, mengabaikan fakta keuangan, serta membenci operasional lapangan, Anda bukan LSE."
  },
  EII: {
    type: "EII",
    description: "Malaikat penasihat moral spiritual penata keheningan batin kemanusiaan. Anda berdiri teguh di atas kompas ketulusan etis persahabatan sejati, menumbuhkan bakat kreatif konseptor unik pada sesama, dibalut kesabaran batin hening tulus alami.",
    orientasiBase: "Integritas moral batin interpersonal suci, ikatan persahabatan etis tulus murni penuh kedekatan batin sunyi.",
    caraCreative: "Memprediksi kemungkinan bakat unik terpendam kemanusiaan, melahirkan alternatif jalan hidup kreatif orisinal harian sesama.",
    roleTampilan: "Tampil tampak sangat mahir berdebat regulasi hukum tertulis formal bagaikan profesor kaku tata tertib baru sanksi administratif harian.",
    tuntutanPolr: "Merasa jiwanya membeku ketakutan terancam bila dihadapkan pada kekerasan fisik agresif langsung taktis direktif ancaman wilayah.",
    bantuanSuggestive: "Merasa hidupnya kokoh aman terstruktur bila didampingi pemimpin profesional tangguh yang meluruskan tata kelola bisnis karirnya.",
    areaMobilizing: "Sangat mendambakan kenyamanan tubuh jasmani fisik yang teratur rapi ergonomis, bangga dinilai bersih sehat tubuh jasmani.",
    kompetensiIgnoring: "Sangat berbakat membaca aliran firasat makna batin trends masa depan, tetapi dikesampingkan demi fokus persahabatan tulus aktif riil kini.",
    kemampuanDemonstrative: "Secara alami mencairkan ketegangan kemarahan kelompok emosi sosial berpendar lewat tutur hening simpatik otomatis di belakang.",
    polaSeimbang: "Teratur olahraga fisik aman bersama pelindungnya, rajin menyelaraskan bisnis karir, sabar membuka pemahaman aturan logis.",
    polaTertekan: "Terpuruk pasif merasa menjadi martir penzaliman moral batin, melontarkan luapan kritik tertulis sanksi logis teoretis dingin kaku.",
    gayaBelajar: "Psikoanalisis kepribadian humanistik, filsafat etika kemanusiaan suar kasih, kesusastraan naratif spiritual batin pendamai.",
    gayaKerja: "Penasihat karir pengembangan kemanusiaan tim, psikolog terapi kedamaian batin, mediator sengketa komunikasi persahabatan tim.",
    gayaKomunikasi: "Sangat hening lembut santun simpatik tinggi, memilih jarak psikologis dekat rahasia satu-lawan-satu sarat cinta kasih.",
    kebutuhanKelompok: "Sebagai kompas penjaga muruah integritas kedamaian etis tim pengusir hawa permusuhan sengketa kotor.",
    batasPerhatian: "Terlalu takut berkonfrontasi fisik taktis direktif langsung sehingga membiarkan penindas menyiksa wilayah aslinya berlarut.",
    CommonMistypes: ["INFP (MBTI)", "IEI (Socionics - akibat kesamaan kelembutan pertapa hening batin)", "ESI (akibat kesamaan menjaga kesucian moral batin)"],
    refleksi: "Apakah pengorbanan batinmu sebagai martir moral sebenarnya bentuk ketakutanmu menegakkan kekuasaan taktis fisik bertahan membela diri?",
    buktiMenyangkal: "Jika Anda ternyata lincah bertarung fisik merebut aset kekuasaan wilayah secara taktis, dan benci refleksi etis, Anda bukan EII."
  }
};

export const INTERTYPE_RELATIONS_METADATA: Record<string, { name: string; description: string; impact: string }> = {
  duality: {
    name: "Duality (Dualitas)",
    description: "Hubungan komplementer sempurna dalam Socionics Model A.",
    impact: "Elemen dasar Anda adalah informasi Suggestive pasangan, sementara elemen kreatif Anda adalah Mobilizing mereka. Interaksi terasa sangat aman, meredakan kecemasan PoLR masing-masing tanpa kata-kata, mengungkit produktivitas dan menyembuhkan batin secara timbal balik."
  },
  activation: {
    name: "Activation (Aktivasi)",
    description: "Hubungan penguat energi saling merangsang aksi aktif.",
    impact: "Kompatibel tinggi dalam quadra yang sama. Anggota saling menyalakan energi aksi cepat (Mobilizing terisi oleh Base). Sangat menyenangkan untuk kolaborasi cepat jangka pendek, namun rentan menimbulkan kelelahan fisik jika berlarut tanpa jeda hening."
  },
  mirror: {
    name: "Mirror (Cermin)",
    description: "Saling merefleksikan ide intelektual dari sudut pandang yang berbeda.",
    impact: "Sama-sama dalam satu blok Ego yang dihargai (Base satu adalah Creative lainnya). Hubungan dipenuhi diskusi konseptual yang tajam dan konstruktif, saling mengoreksi detail implementasi gagasan, sangat cocok untuk kemitraan ilmiah."
  },
  identity: {
    name: "Identity (Identitas)",
    description: "Melihat cerminan persis diri sendiri dalam orang lain.",
    impact: "Memiliki struktur Model A yang identik. Pemahaman instan tanpa perlu penjelasan panjang lebar. Sangat baik untuk proses belajar awal bersama, namun rentan mandek karena memiliki kelemahan yang persis sama di area PoLR tanpa ada saling menutupi."
  },
  kindred: {
    name: "Kindred (Sekerabat)",
    description: "Memiliki dasar orientasi hidup sama namun jalan kreasi berbeda.",
    impact: "Sama-sama memiliki elemen Base yang persis sama, namun elemen kreatif berbeda (misal Ne-Ti ILE vs Ne-Fi IEE). Terlihat sangat mirip di permukaan, namun sering berselisih paham saat menentukan metode praktis penyelesaian masalah."
  },
  business: {
    name: "Business (Mitra Bisnis)",
    description: "Hubungan kerja sama profesional yang pragmatis dinamis.",
    impact: "Memiliki elemen kreatif yang sama namun elemen base berbeda (misal ILE Ti-creative vs SLE Ti-creative). Sangat andal untuk bersinergi menyelesaikan tugas pragmatis operasional di kantor, namun gersang secara kedalaman emosional dan spiritual batin."
  },
  semi_duality: {
    name: "Semi-Duality (Semi-Dualitas)",
    description: "Dualitas yang belum tuntas atau setengah jalan.",
    impact: "Elemen Suggestive terpenuhi oleh Base pasangan, namun elemen Creative tidak menyokong Mobilizing (atau PoLR bergeser tidak terproteksi sempurna). Terasa sangat memikat di awal, namun rentan memicu kesalahpahaman tak terduga harian."
  },
  mirage: {
    name: "Mirage (Fatamorgana)",
    description: "Hubungan rileks yang menenangkan namun rentan melempem.",
    impact: "Interaksi terasa sangat nyaman, santai, dan damai untuk liburan bersama. Namun, ketika dipaksa bekerja serius mengejar target bisnis keras, fokus tim hancur karena saling membiarkan kemalasan atau kurang koordinasi logis praktis."
  },
  contrary: {
    name: "Contrary (Kontras / Pemadam)",
    description: "Saling memadamkan orientasi batin akibat arah ekstratim-introtim terbalik.",
    impact: "Memiliki elemen yang sama namun terbalik arah mental-vitalnya (misal Ne-Ti ILE vs Ni-Te ILI). Saat berdiskusi berdua, terasa ada benturan senyap di mana argumen yang satu seolah menihilkan makna orientasi dasar yang dipegang pihak lainnya."
  },
  quasi_identity: {
    name: "Quasi-Identity (Identitas Semu)",
    description: "Kemiripan aktivitas konseptual luar yang menyembunyikan perbedaan batin murni.",
    impact: "Merasa sangat mirip secara profesi luar (misal LII arsitek logika vs ILI arsitek risiko), mendiskusikan topik serupa. Namun sesungguhnya menyembunyikan perbedaan visi quadra yang sangat bertolak belakang, membuat penyebutan definisi sering bergeser kaku."
  },
  superego: {
    name: "Super-Ego",
    description: "Hubungan penghormatan formal yang melelahkan akibat ketiadaan kecocokan nilai batin.",
    impact: "Blok Ego Anda adalah blok Super-Ego mereka (Base Anda adalah elemen Role mereka, PoLR Anda adalah Creative mereka). Selalu merasa harus tampil sempurna dan sopan kaku demi menjaga gengsi sosial, namun sangat menguras batin jika tinggal bersama harian."
  },
  conflict: {
    name: "Conflict (Konflik)",
    description: "Hubungan gesekan permanen tak terselesaikan dalam Socionics.",
    impact: "Base Anda adalah PoLR pasangan, sementara Creative Anda menyerang rasa aman batin mereka, begitu pula sebaliknya. Hubungan dipenuhi salah tafsir konstan yang melelahkan batin. Membutuhkan kedewasaan spiritual raksasa untuk tidak saling melukai wilayah intim batin harian."
  },
  benefit: {
    name: "Benefit (Pemberi Manfaat - Penerima Manfaat)",
    description: "Hubungan asimetris di mana energi mengalir satu arah.",
    impact: "Hubungan asimetris. Benefactor (Pemberi) diposisikan di atas Beneficiary (Penerima). Beneficiary memandang Benefactor dengan kekaguman konseptual tinggi dan selalu berusaha mendapatkan persetujuan mereka, sementara Benefactor menganggap Beneficiary menarik namun kurang mumpuni."
  },
  supervision: {
    name: "Supervision (Pengawasan - Terawas)",
    description: "Hubungan koreksi asimetris di mana PoLR salah satu diawasi langsung pihak lain.",
    impact: "Hubungan asimetris paling tajam. Supervisor (Pengawas) mengamati elemen PoLR Supervisee (Terawas) memakai elemen Base mereka yang kuat. Supervisee terus-menerus merasa dikoreksi, diaudit, atau dicari-cari kesalahannya tanpa ampun di wilayah batin ringkihnya."
  }
};

export const INTERTYPE_MAP: Record<TIM, Record<TIM, string>> = {
  ILE: { ILE: "identity", SEI: "duality", ESE: "activation", LII: "mirror", SLE: "business", IEI: "mirage", EIE: "benefit", LSI: "supervision", SEE: "benefit", ILI: "contrary", LIE: "semi_duality", ESI: "supervision", IEE: "kindred", SLI: "semi_duality", LSE: "supervision", EII: "conflict" },
  SEI: { ILE: "duality", SEI: "identity", ESE: "mirror", LII: "activation", SLE: "mirage", IEI: "business", EIE: "supervision", LSI: "benefit", SEE: "supervision", ILI: "semi_duality", LIE: "conflict", ESI: "benefit", IEE: "semi_duality", SLI: "kindred", LSE: "conflict", EII: "benefit" },
  ESE: { ILE: "activation", SEI: "mirror", ESE: "identity", LII: "duality", SLE: "semi_duality", IEI: "supervision", EIE: "kindred", LSI: "semi_duality", SEE: "semi_duality", ILI: "conflict", LIE: "benefit", ESI: "supervision", IEE: "supervision", SLI: "conflict", LSE: "business", EII: "mirage" },
  LII: { ILE: "mirror", SEI: "activation", ESE: "duality", LII: "identity", SLE: "supervision", IEI: "semi_duality", EIE: "semi_duality", LSI: "kindred", SEE: "conflict", ILI: "business", LIE: "mirage", ESI: "conflict", IEE: "conflict", SLI: "benefit", LSE: "mirage", EII: "business" },
  
  SLE: { ILE: "business", SEI: "mirage", ESE: "semi_duality", LII: "supervision", SLE: "identity", IEI: "duality", EIE: "activation", LSI: "mirror", SEE: "kindred", ILI: "semi_duality", LIE: "business", ESI: "contrary", IEE: "contrary", SLI: "business", LSE: "contrary", EII: "conflict" },
  IEI: { ILE: "mirage", SEI: "business", ESE: "supervision", LII: "semi_duality", SLE: "duality", IEI: "identity", EIE: "mirror", LSI: "activation", SEE: "semi_duality", ILI: "kindred", LIE: "contrary", ESI: "supervision", IEE: "semi_duality", SLI: "contrary", LSE: "conflict", EII: "contrary" },
  EIE: { ILE: "benefit", SEI: "supervision", ESE: "kindred", LII: "semi_duality", SLE: "activation", IEI: "mirror", EIE: "identity", LSI: "duality", SEE: "benefit", ILI: "conflict", LIE: "mirror", ESI: "semi_duality", IEE: "contrary", SLI: "conflict", LSE: "activation", EII: "contrary" },
  LSI: { ILE: "supervision", SEI: "benefit", ESE: "semi_duality", LII: "kindred", SLE: "mirror", IEI: "activation", EIE: "duality", LSI: "identity", SEE: "conflict", ILI: "semi_duality", LIE: "benefit", ESI: "mirror", IEE: "conflict", SLI: "benefit", LSE: "activation", EII: "mirror" },
  
  SEE: { ILE: "benefit", SEI: "supervision", ESE: "semi_duality", LII: "conflict", SLE: "kindred", IEI: "semi_duality", EIE: "benefit", LSI: "conflict", SEE: "identity", ILI: "duality", LIE: "activation", ESI: "mirror", IEE: "business", SLI: "mirage", LSE: "benefit", EII: "supervision" },
  ILI: { ILE: "contrary", SEI: "semi_duality", ESE: "conflict", LII: "business", SLE: "semi_duality", IEI: "kindred", EIE: "conflict", LSI: "semi_duality", SEE: "duality", ILI: "identity", LIE: "mirror", ESI: "activation", IEE: "mirage", SLI: "business", LSE: "benefit", EII: "supervision" },
  LIE: { ILE: "semi_duality", SEI: "conflict", ESE: "benefit", LII: "mirage", SLE: "business", IEI: "contrary", EIE: "mirror", LSI: "benefit", SEE: "activation", ILI: "mirror", LIE: "identity", ESI: "duality", IEE: "benefit", SLI: "supervision", LSE: "mirror", EII: "benefit" },
  ESI: { ILE: "supervision", SEI: "benefit", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "supervision", EIE: "semi_duality", LSI: "mirror", SEE: "mirror", ILI: "activation", LIE: "duality", ESI: "identity", IEE: "supervision", SLI: "benefit", LSE: "mirror", EII: "activation" },
  
  IEE: { ILE: "kindred", SEI: "semi_duality", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "semi_duality", EIE: "contrary", LSI: "conflict", SEE: "business", ILI: "mirage", LIE: "benefit", ESI: "supervision", IEE: "identity", SLI: "duality", LSE: "activation", EII: "mirror" },
  SLI: { ILE: "semi_duality", SEI: "kindred", ESE: "conflict", LII: "benefit", SLE: "business", IEI: "contrary", EIE: "conflict", LSI: "benefit", SEE: "mirage", ILI: "business", LIE: "supervision", ESI: "benefit", IEE: "duality", SLI: "identity", LSE: "mirror", EII: "activation" },
  LSE: { ILE: "supervision", SEI: "conflict", ESE: "business", LII: "mirage", SLE: "contrary", IEI: "conflict", EIE: "activation", LSI: "activation", SEE: "benefit", ILI: "benefit", LIE: "mirror", ESI: "mirror", IEE: "activation", SLI: "mirror", LSE: "identity", EII: "duality" },
  EII: { ILE: "conflict", SEI: "benefit", ESE: "mirage", LII: "business", SLE: "conflict", IEI: "contrary", EIE: "contrary", LSI: "mirror", SEE: "supervision", ILI: "supervision", LIE: "benefit", ESI: "activation", IEE: "mirror", SLI: "activation", LSE: "duality", EII: "identity" }
};

export function validateSocionicsData(): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  const TIM_TYPES = Object.keys(TIM_MODELS) as TIM[];
  if (TIM_TYPES.length !== 16) {
    errors.push(`Jumlah TIM tidak sama dengan 16, melainkan ${TIM_TYPES.length}`);
  }

  const allElements: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];

  for (const tim of TIM_TYPES) {
    const model = TIM_MODELS[tim];
    if (!model) {
      errors.push(`TIM ${tim} tidak memiliki konfigurasi model.`);
      continue;
    }

    const posMapped = Object.values(model.positions) as InformationElement[];
    if (posMapped.length !== 8) {
      errors.push(`TIM ${tim} tidak memiliki tepat 8 posisi fungsi, melainkan ${posMapped.length}`);
    }

    const uniqueElements = new Set(posMapped);
    if (uniqueElements.size !== 8) {
      errors.push(`TIM ${tim} memiliki posisi dengan elemen duplikat: ${posMapped.join(", ")}`);
    }

    for (const el of allElements) {
      if (!uniqueElements.has(el)) {
        errors.push(`TIM ${tim} kekurangan elemen ${el}`);
      }
    }

    const quadra = model.quadra;
    const valued = QUADRA_DATA[quadra].valuedElements;
    const base = model.positions.Base;
    const creative = model.positions.Creative;
    const suggestive = model.positions.Suggestive;
    const mobilizing = model.positions.Mobilizing;

    const valuesMapped = [base, creative, suggestive, mobilizing];
    for (const valEl of valuesMapped) {
      if (!valued.includes(valEl)) {
        errors.push(`TIM ${tim} berada di Quadra ${quadra} tetapi mengalirkan elemen ${valEl} yang tidak tercakup dalam valued quadra.`);
      }
    }

    const dualType = model.dual;
    const dualModel = TIM_MODELS[dualType];
    if (!dualModel) {
      errors.push(`TIM ${tim} memiliki dual ${dualType} yang tidak terdaftar di TIM_MODELS.`);
    } else {
      if (dualModel.dual !== tim) {
        errors.push(`Ketidakselarasan pasangan dual: ${tim} berteman dual ${dualType}, tapi ${dualType} berteman dual ${dualModel.dual}`);
      }
      if (dualModel.quadra !== quadra) {
        errors.push(`Ketidakselarasan quadra dual: ${tim} (${quadra}) berdual dengan ${dualType} (${dualModel.quadra})`);
      }
    }
  }

  return {
    success: errors.length === 0,
    errors
  };
}

```

## src/data/coreQuestions.ts

```ts
/** Explicit core question bank.
 *
 * Each of the 64 element × channel cells has three independently written
 * replications in different contexts. There is no sentence-template generator.
 */
import type { InformationElement, MeasurementChannel, QuestionContext, SocionicsQuestion } from "../types/socionics";

const makeCore = (
  id: string,
  element: InformationElement,
  channel: MeasurementChannel,
  context: QuestionContext,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => ({
  id, scenario, statement, responseFocus, element, channel, context,
  scaleType: CHANNEL_SCALE[channel],
  direction: 1,
  reverseKeyed: false,
  designWeight: 1,
  ambiguityRisk: "low",
  desirabilityRisk: channel === "aspiration" || channel === "mask" ? "medium" : "low",
  evidenceTags: [element, channel, context, "core"],
  replicationFamilyId: `${element}_${channel}`,
  isHoldout: false,
  isTieBreak: false,
  itemVersion: "2.0.0",
});

const CHANNEL_SCALE: Record<MeasurementChannel, SocionicsQuestion["scaleType"]> = {
  producer: "automaticity", flexible: "comfort", mask: "frequency", threat: "threat",
  receiver: "relief", aspiration: "recognition", dismissive: "frequency", background: "automaticity",
};

export const CORE_QUESTIONS: SocionicsQuestion[] = [
  makeCore("core_ne_producer_01", "Ne", "producer", "new_situation", "Aplikasi baru dengan banyak menu", "Saat mencoba aplikasi yang belum dikenal, saya cepat melihat beberapa cara berbeda untuk memakainya, termasuk fungsi yang mungkin tidak terpikir oleh orang lain.", "melihat beberapa kemungkinan penggunaan yang berbeda"),
  makeCore("core_ne_producer_02", "Ne", "producer", "group", "Obrolan kelompok mulai buntu", "Ketika pembahasan mentok pada satu jalan, pikiran saya spontan membuka beberapa arah lain yang masih mungkin dicoba.", "membuka beberapa kemungkinan ketika pembahasan buntu"),
  makeCore("core_ne_producer_03", "Ne", "producer", "private", "Barang lama yang tidak terpakai", "Melihat benda yang hendak dibuang sering membuat saya langsung membayangkan fungsi lain yang masih bisa diberikan kepadanya.", "membayangkan fungsi baru dari sesuatu yang sudah ada"),
  makeCore("core_ne_flexible_01", "Ne", "flexible", "work", "Rencana kerja utama gagal", "Jika cara pertama tidak bisa dipakai, saya relatif nyaman berpindah di antara beberapa alternatif sampai menemukan jalan yang paling masuk akal.", "berpindah di antara alternatif untuk menyelesaikan masalah"),
  makeCore("core_ne_flexible_02", "Ne", "flexible", "friendship", "Teman bingung memilih langkah", "Saya mudah menyesuaikan jenis saran: kadang memberi pilihan aman, kadang pilihan berani, tergantung kemungkinan yang paling cocok bagi teman itu.", "menyesuaikan pilihan dengan kebutuhan orang lain"),
  makeCore("core_ne_flexible_03", "Ne", "flexible", "study", "Tugas masih sangat terbuka", "Saya cukup nyaman memperlebar pilihan di awal, lalu mempersempitnya setelah tujuan tugas mulai jelas.", "membuka lalu menyaring kemungkinan sesuai tujuan"),
  makeCore("core_ne_mask_01", "Ne", "mask", "work", "Rapat menuntut ide yang unik", "Saya pernah memaksa diri melempar banyak gagasan agar terlihat kreatif, meskipun sebenarnya kepala saya sudah lelah dan ingin memakai cara yang pasti.", "menampilkan kreativitas karena tuntutan suasana"),
  makeCore("core_ne_mask_02", "Ne", "mask", "public", "Diminta menjadi orang paling inovatif", "Ketika orang berharap saya selalu punya terobosan, saya berusaha terlihat penuh ide walau prosesnya terasa seperti pertunjukan.", "berusaha tampak penuh kemungkinan demi citra"),
  makeCore("core_ne_mask_03", "Ne", "mask", "study", "Presentasi harus terlihat berbeda", "Saya kadang menambahkan ide yang tidak biasa hanya agar tugas tampak kreatif, bukan karena ide itu benar-benar muncul dengan alami.", "menambahkan kebaruan karena merasa seharusnya"),
  makeCore("core_ne_threat_01", "Ne", "threat", "time_pressure", "Diminta memberi banyak alternatif saat itu juga", "Ketika harus menghasilkan beberapa pilihan dalam hitungan detik dan semuanya dinilai, pikiran saya dapat mendadak buntu atau defensif.", "menghadapi tuntutan menghasilkan banyak alternatif secara cepat"),
  makeCore("core_ne_threat_02", "Ne", "threat", "work", "Semua usulan ditolak dan diminta mencari lagi", "Saya merasa makin tertekan ketika setiap pilihan dibantah tetapi saya tetap dituntut terus menciptakan kemungkinan baru.", "terus menghasilkan kemungkinan setelah berulang kali ditolak"),
  makeCore("core_ne_threat_03", "Ne", "threat", "new_situation", "Tidak ada petunjuk dan jawaban pasti", "Situasi yang sepenuhnya terbuka tanpa pegangan dapat membuat saya gelisah karena saya harus menciptakan jalan dari nol.", "menemukan kemungkinan tanpa pegangan yang jelas"),
  makeCore("core_ne_receiver_01", "Ne", "receiver", "friendship", "Masalah terasa tidak punya jalan keluar", "Saya merasa sangat terbantu ketika seseorang menunjukkan sudut pandang baru yang membuat pilihan yang tadinya tertutup kembali terlihat.", "menerima sudut pandang baru dari orang lain"),
  makeCore("core_ne_receiver_02", "Ne", "receiver", "work", "Proyek tersangkut pada cara lama", "Orang yang datang membawa alternatif segar membuat beban saya terasa lebih ringan dan memberi energi untuk mencoba lagi.", "menerima alternatif segar saat cara lama buntu"),
  makeCore("core_ne_receiver_03", "Ne", "receiver", "private", "Merasa kemampuan diri mentok", "Saya lega ketika seseorang bisa melihat potensi yang belum saya sadari dan menunjukkan apa lagi yang mungkin saya kembangkan.", "menerima pembacaan potensi yang belum terlihat"),
  makeCore("core_ne_aspiration_01", "Ne", "aspiration", "public", "Mendapat komentar tentang cara berpikir", "Pujian bahwa saya mampu melihat kemungkinan yang tidak biasa terasa sangat berarti dan ingin saya buktikan lagi.", "diakui karena melihat kemungkinan yang tidak biasa"),
  makeCore("core_ne_aspiration_02", "Ne", "aspiration", "study", "Belajar bidang baru", "Saya ingin menjadi orang yang lebih terbuka terhadap banyak kemungkinan tanpa cepat menutup ide yang belum dikenal.", "berkembang dalam menjelajahi kemungkinan"),
  makeCore("core_ne_aspiration_03", "Ne", "aspiration", "work", "Mengusulkan jalan yang belum dicoba", "Pengakuan bahwa hubungan ide yang saya lihat ternyata berguna dapat membuat saya sangat bersemangat.", "dihargai karena menghubungkan ide secara orisinal"),
  makeCore("core_ne_dismissive_01", "Ne", "dismissive", "decision", "Ada terlalu banyak pilihan", "Saya bisa memikirkan beberapa alternatif, tetapi setelah satu jalan terasa cukup, saya cenderung menutup pilihan lain agar urusan tidak melebar.", "mampu melihat alternatif tetapi memilih segera menutupnya"),
  makeCore("core_ne_dismissive_02", "Ne", "dismissive", "work", "Sesi curah gagasan terlalu panjang", "Saya mampu ikut menghasilkan ide, namun cepat merasa pembahasan kemungkinan tanpa keputusan nyata sudah tidak penting.", "menghentikan eksplorasi kemungkinan yang terlalu lama"),
  makeCore("core_ne_dismissive_03", "Ne", "dismissive", "private", "Muncul gagasan baru saat sibuk", "Ide baru sering sempat terlihat, tetapi saya menyisihkannya tanpa banyak rasa kehilangan agar fokus utama tidak terganggu.", "menyisihkan kemungkinan yang tidak dianggap utama"),
  makeCore("core_ne_background_01", "Ne", "background", "general", "Melihat cara orang melakukan sesuatu", "Tanpa sengaja saya sering menangkap bahwa benda, aturan, atau kebiasaan yang sama sebenarnya dapat dipakai dengan cara lain.", "menangkap kemungkinan lain secara diam-diam"),
  makeCore("core_ne_background_02", "Ne", "background", "friendship", "Teman menceritakan rencana", "Saya kadang langsung melihat beberapa arah yang bisa berkembang dari ceritanya, tetapi tidak selalu merasa perlu mengatakannya.", "melihat cabang kemungkinan tanpa menjadikannya pusat perhatian"),
  makeCore("core_ne_background_03", "Ne", "background", "work", "Alat yang tersedia tidak sesuai kebutuhan", "Saya sering menemukan kegunaan alternatif secara spontan dan langsung memakainya tanpa menganggap hal itu sebagai ide besar.", "menggunakan alternatif dengan lancar tanpa mencari pengakuan"),
  makeCore("core_ni_producer_01", "Ni", "producer", "decision", "Beberapa kejadian terasa saling berkaitan", "Setelah melihat potongan yang terpisah, pikiran saya sering mengerucut pada satu arah tentang bagaimana situasi ini akan berkembang.", "mengerucutkan kejadian menjadi satu arah perkembangan"),
  makeCore("core_ni_producer_02", "Ni", "producer", "private", "Mengingat perjalanan beberapa bulan terakhir", "Saya spontan membaca fase yang sedang saya jalani dan merasakan apakah sesuatu sedang matang, menurun, atau belum waktunya.", "merasakan fase dan kematangan suatu proses"),
  makeCore("core_ni_producer_03", "Ni", "producer", "group", "Banyak orang memberi pendapat berbeda", "Di tengah detail yang ramai, saya sering menangkap satu tema utama yang menjelaskan ke mana pembahasan sebenarnya bergerak.", "menangkap tema dan arah di balik banyak detail"),
  makeCore("core_ni_flexible_01", "Ni", "flexible", "work", "Waktu pelaksanaan perlu diubah", "Saya cukup nyaman menggeser urutan atau momentum tindakan supaya rencana utama tetap berjalan pada saat yang lebih tepat.", "menyesuaikan waktu dan urutan demi tujuan"),
  makeCore("core_ni_flexible_02", "Ni", "flexible", "friendship", "Teman ingin mengambil keputusan besar", "Saya bisa menyesuaikan cara menjelaskan kemungkinan perkembangan agar teman memahami kapan sebaiknya menunggu dan kapan bergerak.", "menyesuaikan pembacaan arah untuk membantu keputusan orang lain"),
  makeCore("core_ni_flexible_03", "Ni", "flexible", "new_situation", "Keadaan berubah perlahan", "Saya dapat memperbarui gambaran arah ketika tanda-tanda baru muncul, tanpa kehilangan benang merah keseluruhan.", "memperbarui arah sambil menjaga tema utama"),
  makeCore("core_ni_mask_01", "Ni", "mask", "work", "Diminta memberi visi lima tahun", "Saya pernah menyusun narasi masa depan yang terdengar meyakinkan karena jabatan menuntutnya, padahal saya belum benar-benar melihat arahnya.", "menampilkan visi karena tuntutan peran"),
  makeCore("core_ni_mask_02", "Ni", "mask", "public", "Orang menunggu ramalan yang pasti", "Saya kadang berbicara seolah tahu bagaimana semuanya akan berakhir agar terlihat berwawasan, meski batin saya masih ragu.", "berusaha tampak mampu membaca arah"),
  makeCore("core_ni_mask_03", "Ni", "mask", "study", "Presentasi harus memuat prediksi", "Saya dapat memaksakan kesimpulan jangka panjang dari sedikit data hanya karena tugas mengharuskan ada proyeksi.", "membuat proyeksi karena merasa seharusnya"),
  makeCore("core_ni_threat_01", "Ni", "threat", "time_pressure", "Harus menentukan saat yang tepat seketika", "Saya dapat membeku ketika dituntut memastikan waktu dan arah perkembangan tanpa diberi ruang untuk mengamati lebih dulu.", "menentukan waktu dan arah di bawah tekanan"),
  makeCore("core_ni_threat_02", "Ni", "threat", "work", "Diminta menjamin hasil jangka panjang", "Tuntutan untuk menjelaskan secara pasti bagaimana keadaan akan berkembang membuat saya takut memberi arah yang keliru.", "menjamin arah masa depan secara pasti"),
  makeCore("core_ni_threat_03", "Ni", "threat", "conflict", "Semua orang mendesak keputusan sekarang", "Saya merasa terpojok ketika harus membaca momentum di tengah desakan yang tidak memberi waktu untuk memahami alurnya.", "membaca momentum ketika didesak"),
  makeCore("core_ni_receiver_01", "Ni", "receiver", "private", "Arah hidup terasa kabur", "Saya sangat lega ketika seseorang membantu merangkai kejadian yang berantakan menjadi satu arah yang terasa masuk akal.", "menerima gambaran arah yang menyatukan kejadian"),
  makeCore("core_ni_receiver_02", "Ni", "receiver", "work", "Tidak tahu kapan harus bergerak", "Nasihat mengenai momentum—kapan menunggu dan kapan mulai—dapat membuat saya jauh lebih tenang.", "menerima bantuan mengenai waktu yang tepat"),
  makeCore("core_ni_receiver_03", "Ni", "receiver", "friendship", "Terjebak pada fase yang membingungkan", "Saya mudah percaya pada orang yang mampu menunjukkan bahwa keadaan ini adalah bagian dari proses yang masih berkembang.", "menerima konteks perkembangan dari orang lain"),
  makeCore("core_ni_aspiration_01", "Ni", "aspiration", "public", "Orang menilai cara saya melihat keadaan", "Pujian bahwa saya mampu menangkap arah sebelum orang lain menyadarinya terasa sangat mengena.", "diakui karena menangkap arah perkembangan"),
  makeCore("core_ni_aspiration_02", "Ni", "aspiration", "study", "Mempelajari sejarah atau tren", "Saya ingin lebih mahir memahami bagaimana satu fase berubah menjadi fase berikutnya tanpa terjebak pada detail terpisah.", "berkembang dalam membaca perkembangan dari waktu ke waktu"),
  makeCore("core_ni_aspiration_03", "Ni", "aspiration", "decision", "Rencana besar mulai terbentuk", "Saya ingin dipercaya sebagai orang yang tahu kapan sebuah langkah sudah matang untuk dijalankan.", "diakui karena kepekaan terhadap momentum"),
  makeCore("core_ni_dismissive_01", "Ni", "dismissive", "work", "Arah masalah sudah terlihat", "Saya kadang sudah memperkirakan bagaimana situasi akan berkembang, tetapi memilih tidak membahasnya karena sekarang perlu tindakan konkret.", "melihat arah tetapi sengaja tidak menjadikannya fokus"),
  makeCore("core_ni_dismissive_02", "Ni", "dismissive", "private", "Pikiran mulai membentuk makna panjang", "Saya bisa mengikuti benang merah yang dalam, lalu sengaja memutusnya ketika merasa perenungan itu tidak lagi membantu.", "menghentikan pembacaan makna yang dianggap tidak perlu"),
  makeCore("core_ni_dismissive_03", "Ni", "dismissive", "group", "Diskusi terus membahas kemungkinan masa depan", "Saya mampu melihat implikasi jangka panjang, tetapi cepat bosan jika kelompok terus berputar pada prediksi tanpa keputusan.", "membatasi pembahasan arah yang terlalu panjang"),
  makeCore("core_ni_background_01", "Ni", "background", "general", "Jadwal berubah sedikit demi sedikit", "Saya sering menyesuaikan langkah sebelum masalah benar-benar muncul karena secara samar sudah merasakan arah perubahannya.", "mengantisipasi arah secara diam-diam"),
  makeCore("core_ni_background_02", "Ni", "background", "friendship", "Cerita teman berkembang dari waktu ke waktu", "Saya mudah mengingat alur ceritanya dan diam-diam menangkap fase apa yang sedang ia lewati.", "mengikuti alur perkembangan tanpa banyak menjelaskan"),
  makeCore("core_ni_background_03", "Ni", "background", "work", "Proyek panjang berjalan beberapa tahap", "Saya sering tahu bagian mana yang belum matang dan menunggu waktu yang lebih pas tanpa menganggapnya kemampuan khusus.", "merasakan kematangan dan timing secara otomatis"),
  makeCore("core_se_producer_01", "Se", "producer", "conflict", "Batas pribadi dilanggar", "Ketika seseorang melewati batas yang jelas, saya spontan menegur dan menunjukkan sampai mana ia boleh bertindak.", "menetapkan batas secara langsung"),
  makeCore("core_se_producer_02", "Se", "producer", "work", "Hambatan nyata menghentikan pekerjaan", "Saya cenderung segera turun tangan, mengerahkan sumber yang ada, dan membuat keadaan kembali bergerak.", "mengambil tindakan nyata terhadap hambatan"),
  makeCore("core_se_producer_03", "Se", "producer", "decision", "Kesempatan hanya terbuka sebentar", "Saat peluang harus direbut sekarang, saya cepat menentukan langkah dan berani mengambil ruang yang tersedia.", "merebut momentum melalui tindakan tegas"),
  makeCore("core_se_flexible_01", "Se", "flexible", "group", "Tim butuh dorongan berbeda", "Saya cukup nyaman mengatur kadar tekanan: kadang tegas, kadang memberi ruang, sesuai kekuatan yang dibutuhkan kelompok.", "menyesuaikan tekanan untuk menggerakkan orang"),
  makeCore("core_se_flexible_02", "Se", "flexible", "work", "Negosiasi mulai keras", "Saya dapat menaikkan atau menurunkan ketegasan tanpa kehilangan tujuan utama yang ingin dicapai.", "mengatur ketegasan sesuai tujuan"),
  makeCore("core_se_flexible_03", "Se", "flexible", "family", "Anggota keluarga sulit mengambil tindakan", "Saya bisa mengambil alih sementara, lalu mengembalikan kendali ketika mereka sudah siap.", "menggunakan kendali secara situasional"),
  makeCore("core_se_mask_01", "Se", "mask", "public", "Peran mengharuskan tampil kuat", "Saya pernah memasang sikap keras dan dominan agar tidak diremehkan, meskipun mempertahankannya terasa melelahkan.", "menampilkan kekuatan karena tuntutan citra"),
  makeCore("core_se_mask_02", "Se", "mask", "work", "Atasan mengharapkan pemimpin yang galak", "Saya dapat memaksa nada tegas dan memberi perintah hanya karena merasa itulah gaya yang dianggap pantas.", "memainkan ketegasan karena tuntutan jabatan"),
  makeCore("core_se_mask_03", "Se", "mask", "conflict", "Tidak ingin terlihat lemah", "Saya kadang membalas lebih keras daripada yang sebenarnya saya inginkan agar orang lain tidak menganggap saya mudah ditekan.", "memperagakan perlawanan untuk melindungi citra"),
  makeCore("core_se_threat_01", "Se", "threat", "conflict", "Harus menghadapi orang yang agresif", "Konfrontasi langsung yang menuntut saya mempertahankan posisi dapat membuat tubuh saya kaku, defensif, atau ingin keluar.", "menghadapi adu kekuatan langsung"),
  makeCore("core_se_threat_02", "Se", "threat", "public", "Diminta memimpin dengan keras", "Saya sangat tertekan jika harus menguasai ruangan dan memberi instruksi tegas sementara semua mata menilai keberanian saya.", "mengambil kendali di bawah penilaian orang lain"),
  makeCore("core_se_threat_03", "Se", "threat", "time_pressure", "Harus bertindak sebelum sempat berpikir", "Desakan untuk segera menekan, merebut, atau memutuskan dapat membuat saya takut salah menggunakan kekuatan.", "menggunakan kekuatan secara cepat"),
  makeCore("core_se_receiver_01", "Se", "receiver", "friendship", "Ada orang lain menekan saya", "Saya merasa sangat lega ketika teman dengan tenang memasang batas dan menghentikan tekanan itu tanpa banyak ragu.", "menerima perlindungan dan batas yang tegas"),
  makeCore("core_se_receiver_02", "Se", "receiver", "work", "Keadaan kacau tanpa pemimpin", "Kehadiran orang yang berani mengambil keputusan dan membagi tindakan membuat saya merasa lebih aman.", "menerima arah tindakan yang tegas"),
  makeCore("core_se_receiver_03", "Se", "receiver", "family", "Masalah nyata terus dibiarkan", "Saya terbantu ketika seseorang berhenti berdebat dan langsung mengurus bagian yang memang harus dibereskan.", "menerima tindakan langsung dari orang lain"),
  makeCore("core_se_aspiration_01", "Se", "aspiration", "public", "Mendapat penilaian tentang keberanian", "Pujian bahwa saya berani menjaga batas dan tidak mudah ditekan terasa sangat berarti.", "diakui karena keberanian dan ketegasan"),
  makeCore("core_se_aspiration_02", "Se", "aspiration", "work", "Belajar memegang tanggung jawab", "Saya ingin lebih mampu mengambil keputusan sulit tanpa kehilangan wibawa ketika keadaan memanas.", "berkembang dalam ketegasan dan kepemimpinan"),
  makeCore("core_se_aspiration_03", "Se", "aspiration", "private", "Melatih keberanian diri", "Saya ingin membuktikan bahwa saya bisa berdiri untuk diri sendiri dan tidak selalu mundur saat menghadapi tekanan.", "membangun keberanian mempertahankan diri"),
  makeCore("core_se_dismissive_01", "Se", "dismissive", "work", "Masalah sudah bisa dikendalikan", "Saya mampu mengambil alih dan menekan hambatan, tetapi segera melepaskan kendali setelah hasil pokok tercapai.", "mampu mengendalikan tetapi tidak ingin terus memegang kuasa"),
  makeCore("core_se_dismissive_02", "Se", "dismissive", "conflict", "Perdebatan mulai menjadi perebutan posisi", "Saya bisa menunjukkan kekuatan bila perlu, namun menganggap adu dominasi berkepanjangan sebagai pemborosan energi.", "membatasi penggunaan kekuatan yang berlebihan"),
  makeCore("core_se_dismissive_03", "Se", "dismissive", "group", "Orang menunggu saya terus memimpin", "Saya dapat mengarahkan kelompok, tetapi tidak suka jika semua urusan akhirnya bergantung pada kendali saya.", "menggunakan kepemimpinan lalu mengembalikannya"),
  makeCore("core_se_background_01", "Se", "background", "general", "Ruang atau antrean mulai tidak tertib", "Saya sering secara otomatis mengambil posisi yang membuat batas lebih jelas tanpa perlu mengumumkan bahwa saya sedang mengatur.", "menjaga batas fisik secara diam-diam"),
  makeCore("core_se_background_02", "Se", "background", "family", "Ada urusan praktis yang terus tertunda", "Saya bisa langsung mengangkat, memindahkan, menghubungi, atau membereskan hal yang menghambat tanpa banyak bicara.", "membereskan hambatan nyata secara otomatis"),
  makeCore("core_se_background_03", "Se", "background", "work", "Sumber daya terbatas", "Saya cepat melihat apa yang masih bisa digunakan dan mengalokasikannya agar pekerjaan tetap bergerak.", "mengatur sumber daya dengan spontan"),
  makeCore("core_si_producer_01", "Si", "producer", "body", "Tubuh mulai memberi tanda halus", "Saya cepat menyadari perubahan kecil seperti tegang, terlalu panas, lapar, atau lelah sebelum keluhan itu menjadi berat.", "menyadari kondisi tubuh secara spontan"),
  makeCore("core_si_producer_02", "Si", "producer", "private", "Ruangan terasa kurang enak ditempati", "Saya otomatis memperhatikan cahaya, suhu, posisi duduk, atau kebisingan lalu menyesuaikannya agar terasa lebih pas.", "menyetel kenyamanan indrawi secara spontan"),
  makeCore("core_si_producer_03", "Si", "producer", "general", "Aktivitas berlangsung terlalu lama", "Saya spontan mengatur ritme, jeda, dan cara bergerak supaya tenaga tetap stabil dan tubuh tidak dipaksa berlebihan.", "menjaga ritme dan keseimbangan fisik"),
  makeCore("core_si_flexible_01", "Si", "flexible", "work", "Pekerjaan panjang perlu tetap nyaman", "Saya mudah menyesuaikan pencahayaan, posisi, jeda, atau urutan kerja agar orang dapat bertahan tanpa kehilangan fokus.", "menyesuaikan kondisi fisik demi tujuan kerja"),
  makeCore("core_si_flexible_02", "Si", "flexible", "friendship", "Teman tampak tidak nyaman", "Saya cukup luwes mengubah tempat, makanan, atau tempo kegiatan sesuai kebutuhan tubuh orang yang bersama saya.", "menyesuaikan kenyamanan untuk orang lain"),
  makeCore("core_si_flexible_03", "Si", "flexible", "body", "Kondisi badan berubah", "Saya dapat mengganti intensitas aktivitas, makanan, atau istirahat berdasarkan sinyal tubuh saat itu.", "menyesuaikan kebiasaan dengan kondisi tubuh"),
  makeCore("core_si_mask_01", "Si", "mask", "family", "Diharapkan menjadi tuan rumah yang sempurna", "Saya pernah sibuk menata hidangan dan kenyamanan tamu karena takut dianggap tidak perhatian, walau sebenarnya sudah terkuras.", "menampilkan perhatian fisik karena tuntutan kepantasan"),
  makeCore("core_si_mask_02", "Si", "mask", "work", "Lingkungan harus terlihat rapi dan nyaman", "Saya dapat memaksakan diri mengurus detail kenyamanan supaya tampak profesional, bukan karena saya menikmati prosesnya.", "merawat kenyamanan demi citra profesional"),
  makeCore("core_si_mask_03", "Si", "mask", "public", "Orang menilai penampilan dan kerapian", "Saya kadang terlalu mengatur tampilan fisik agar terlihat pantas, meskipun perhatian pada detail itu terasa seperti beban.", "menampilkan kerapian indrawi karena penilaian sosial"),
  makeCore("core_si_threat_01", "Si", "threat", "body", "Diminta memantau banyak sensasi tubuh", "Tuntutan untuk terus menjelaskan apa yang terasa di tubuh dapat membuat saya bingung, kesal, atau ingin mengabaikannya.", "memantau sensasi tubuh secara rinci di bawah tuntutan"),
  makeCore("core_si_threat_02", "Si", "threat", "family", "Orang lain mengkritik cara saya makan dan beristirahat", "Komentar yang terus mengatur kenyamanan fisik saya dapat terasa sangat mengusik dan membuat saya defensif.", "menghadapi tuntutan pada kebiasaan fisik pribadi"),
  makeCore("core_si_threat_03", "Si", "threat", "work", "Harus menjamin semua orang selalu nyaman", "Saya tertekan ketika diminta mengendalikan setiap detail suhu, makanan, kebersihan, dan kenyamanan tanpa ada kesalahan.", "bertanggung jawab atas seluruh detail kenyamanan"),
  makeCore("core_si_receiver_01", "Si", "receiver", "body", "Kondisi fisik sedang menurun", "Saya merasa sangat lega ketika seseorang membantu menyiapkan makanan, obat, tempat istirahat, atau suasana yang benar-benar nyaman.", "menerima perawatan fisik yang tepat"),
  makeCore("core_si_receiver_02", "Si", "receiver", "work", "Ruangan membuat sulit berkonsentrasi", "Orang yang peka mengubah cahaya, suhu, atau posisi kerja dapat langsung membuat saya lebih tenang dan produktif.", "menerima penyesuaian lingkungan yang nyaman"),
  makeCore("core_si_receiver_03", "Si", "receiver", "friendship", "Hari terasa melelahkan", "Ajakan untuk makan enak, beristirahat, atau menikmati suasana tenang sering membantu saya kembali merasa utuh.", "menerima pengalaman indrawi yang menenangkan"),
  makeCore("core_si_aspiration_01", "Si", "aspiration", "public", "Orang menikmati suasana yang saya siapkan", "Pujian bahwa saya membuat tempat terasa nyaman dan enak ditempati memberi kepuasan yang cukup dalam.", "diakui karena menciptakan kenyamanan"),
  makeCore("core_si_aspiration_02", "Si", "aspiration", "body", "Belajar merawat diri", "Saya ingin lebih mahir membaca kebutuhan tubuh tanpa menunggu sampai kelelahan atau sakit.", "berkembang dalam merawat keseimbangan tubuh"),
  makeCore("core_si_aspiration_03", "Si", "aspiration", "family", "Menyiapkan rumah untuk orang terdekat", "Saya ingin menjadi orang yang tahu cara membuat orang lain merasa diterima secara fisik dan tenang.", "dihargai karena perhatian pada kenyamanan orang"),
  makeCore("core_si_dismissive_01", "Si", "dismissive", "work", "Tubuh mulai sedikit tidak nyaman", "Saya sering menyadari rasa lelah atau posisi yang kurang enak, tetapi menyingkirkannya agar pekerjaan utama tetap selesai.", "menyadari ketidaknyamanan lalu mengabaikannya"),
  makeCore("core_si_dismissive_02", "Si", "dismissive", "decision", "Pilihan nyaman bertentangan dengan target", "Saya bisa menemukan pilihan yang lebih enak bagi tubuh, namun tidak keberatan mengorbankannya ketika ada tujuan yang lebih penting.", "mampu mengatur kenyamanan tetapi tidak memprioritaskannya"),
  makeCore("core_si_dismissive_03", "Si", "dismissive", "private", "Lingkungan belum benar-benar pas", "Saya tahu bagian mana yang perlu disesuaikan, tetapi dapat membiarkannya karena merasa detail kenyamanan tidak perlu dibesar-besarkan.", "membatasi perhatian pada detail kenyamanan"),
  makeCore("core_si_background_01", "Si", "background", "general", "Masuk ke ruangan baru", "Tanpa banyak berpikir saya sering memilih tempat duduk, suhu, atau posisi yang membuat aktivitas terasa lebih lancar.", "menemukan kenyamanan yang pas secara otomatis"),
  makeCore("core_si_background_02", "Si", "background", "friendship", "Teman tampak lelah saat berkunjung", "Saya kerap mengambilkan air, mengubah tempat duduk, atau memperlambat tempo tanpa menganggapnya perhatian khusus.", "merawat kenyamanan orang secara diam-diam"),
  makeCore("core_si_background_03", "Si", "background", "work", "Meja kerja mulai membuat badan pegal", "Saya spontan mengubah posisi alat atau ritme kerja agar tubuh tetap seimbang, lalu melanjutkan tanpa banyak membahasnya.", "menyetel kondisi fisik sebagai kebiasaan latar"),
  makeCore("core_te_producer_01", "Te", "producer", "decision", "Membandingkan beberapa pilihan barang", "Saya spontan mencari informasi tentang harga, ketahanan, hasil nyata, dan cara pakai sebelum menentukan pilihan.", "membandingkan fakta praktis untuk mengambil keputusan"),
  makeCore("core_te_producer_02", "Te", "producer", "work", "Pekerjaan terasa lebih lambat dari seharusnya", "Saya cepat melihat langkah yang tidak perlu dan mencoba cara yang lebih ringkas agar hasil tetap tercapai.", "meningkatkan kepraktisan dan efektivitas"),
  makeCore("core_te_producer_03", "Te", "producer", "new_situation", "Harus memakai alat yang belum dikenal", "Saya cenderung mencari petunjuk yang bisa langsung dicoba, lalu menguji apakah cara itu benar-benar bekerja.", "mencari dan menguji cara yang dapat dipakai"),
  makeCore("core_te_flexible_01", "Te", "flexible", "work", "Sumber daya berubah di tengah proyek", "Saya cukup nyaman mengganti metode, alat, atau urutan berdasarkan waktu dan biaya yang benar-benar tersedia.", "menyesuaikan metode dengan sumber daya nyata"),
  makeCore("core_te_flexible_02", "Te", "flexible", "friendship", "Teman meminta bantuan praktis", "Saya bisa mengubah penjelasan menjadi langkah sederhana yang sesuai kemampuan dan alat yang dimiliki teman itu.", "menyesuaikan langkah praktis untuk orang lain"),
  makeCore("core_te_flexible_03", "Te", "flexible", "study", "Teori perlu diterapkan", "Saya mudah memilih bagian informasi yang paling berguna lalu mengubahnya menjadi prosedur yang dapat dicoba.", "mengubah informasi menjadi langkah yang berguna"),
  makeCore("core_te_mask_01", "Te", "mask", "work", "Rapat penuh angka dan indikator", "Saya pernah menampilkan diri seolah sangat menguasai data dan produktivitas agar tampak kompeten, padahal saya sedang mengejar-ngejar pemahaman.", "menampilkan kompetensi praktis demi citra"),
  makeCore("core_te_mask_02", "Te", "mask", "public", "Harus terlihat selalu produktif", "Saya kadang membuat daftar, angka, atau laporan hanya supaya terlihat bekerja efektif, bukan karena alat itu benar-benar membantu.", "memperagakan produktivitas karena tuntutan sosial"),
  makeCore("core_te_mask_03", "Te", "mask", "study", "Tugas harus terlihat berbasis bukti", "Saya dapat menambahkan banyak sumber dan angka agar karya tampak meyakinkan meski belum sempat memeriksa kegunaan semuanya.", "menampilkan bukti karena merasa seharusnya"),
  makeCore("core_te_threat_01", "Te", "threat", "time_pressure", "Harus memberi angka dan fakta dengan cepat", "Saya dapat panik ketika dituntut menyebut data yang tepat saat itu juga dan takut memberikan informasi yang tidak akurat.", "memberikan fakta tepat di bawah tekanan"),
  makeCore("core_te_threat_02", "Te", "threat", "work", "Kinerja diukur terus-menerus", "Tuntutan untuk membuktikan efisiensi setiap langkah dengan angka dapat membuat saya defensif atau kehilangan fokus.", "mempertanggungjawabkan efisiensi secara rinci"),
  makeCore("core_te_threat_03", "Te", "threat", "new_situation", "Alat rusak dan harus segera diperbaiki", "Saya tertekan ketika harus menemukan cara teknis yang bekerja tanpa petunjuk atau bantuan yang jelas.", "menangani masalah teknis tanpa pegangan"),
  makeCore("core_te_receiver_01", "Te", "receiver", "work", "Tugas terasa membingungkan", "Saya sangat terbantu ketika seseorang memberi langkah yang sudah teruji, contoh nyata, dan urutan kerja yang jelas.", "menerima prosedur praktis yang teruji"),
  makeCore("core_te_receiver_02", "Te", "receiver", "decision", "Informasi saling bertentangan", "Orang yang menunjukkan sumber tepercaya dan membedakan mana fakta dengan dugaan membuat saya jauh lebih tenang.", "menerima fakta yang dapat dipercaya"),
  makeCore("core_te_receiver_03", "Te", "receiver", "private", "Tidak tahu cara memakai sesuatu", "Demonstrasi langsung dari orang yang berpengalaman sering terasa lebih melegakan daripada penjelasan panjang.", "menerima contoh penggunaan yang langsung bisa ditiru"),
  makeCore("core_te_aspiration_01", "Te", "aspiration", "public", "Hasil kerja dinilai orang lain", "Pujian bahwa saya bekerja efektif dan menghasilkan sesuatu yang benar-benar berguna terasa sangat memuaskan.", "diakui karena hasil praktis yang efektif"),
  makeCore("core_te_aspiration_02", "Te", "aspiration", "study", "Mempelajari keterampilan baru", "Saya ingin menjadi lebih cakap memilih metode yang terbukti dan tidak membuang waktu pada cara yang tidak bekerja.", "berkembang dalam keterampilan praktis"),
  makeCore("core_te_aspiration_03", "Te", "aspiration", "work", "Proyek berhasil disederhanakan", "Pengakuan bahwa saya membuat proses lebih cepat atau lebih hemat dapat mendorong saya bekerja jauh lebih keras.", "dihargai karena memperbaiki efisiensi"),
  makeCore("core_te_dismissive_01", "Te", "dismissive", "work", "Proses sudah cukup berjalan", "Saya mampu terus mengoptimalkan angka dan langkah, tetapi memilih berhenti ketika hasilnya sudah memadai.", "membatasi optimasi setelah hasil cukup"),
  makeCore("core_te_dismissive_02", "Te", "dismissive", "decision", "Ada banyak data tambahan", "Saya bisa mencari fakta lebih jauh, namun sering menganggap tambahan informasi tidak penting jika keputusan sudah dapat dibuat.", "menghentikan pencarian fakta yang dianggap berlebihan"),
  makeCore("core_te_dismissive_03", "Te", "dismissive", "friendship", "Orang membahas cara paling efisien terlalu lama", "Saya memahami pembahasannya, tetapi cepat merasa hidup tidak perlu diubah menjadi perhitungan untung-rugi terus-menerus.", "mampu berpikir praktis tetapi menolak menjadikannya pusat"),
  makeCore("core_te_background_01", "Te", "background", "general", "Menjalani kegiatan harian", "Saya sering merapikan urutan langkah atau memilih alat yang lebih berguna tanpa sadar bahwa orang lain menganggapnya efisien.", "menyederhanakan cara kerja secara otomatis"),
  makeCore("core_te_background_02", "Te", "background", "friendship", "Teman kesulitan melakukan hal praktis", "Saya biasanya langsung menunjukkan cara yang lebih mudah atau membantu memperbaikinya tanpa banyak teori.", "memberi solusi praktis secara diam-diam"),
  makeCore("core_te_background_03", "Te", "background", "work", "Ada informasi yang perlu diperiksa", "Saya spontan mengecek sumber, hasil, atau cara kerja sebelum meneruskannya, lalu menganggap itu hal biasa.", "memverifikasi kegunaan dan fakta sebagai kebiasaan latar"),
  makeCore("core_ti_producer_01", "Ti", "producer", "study", "Membaca penjelasan yang rumit", "Saya spontan mencari definisi, hubungan antarbagian, dan aturan yang membuat keseluruhan penjelasan konsisten.", "menyusun struktur logis dari informasi"),
  makeCore("core_ti_producer_02", "Ti", "producer", "group", "Orang memakai istilah yang berbeda-beda", "Saya cepat menyadari bahwa pembahasan kacau karena arti kata atau kategori belum disepakati.", "menjernihkan definisi dan kategori"),
  makeCore("core_ti_producer_03", "Ti", "producer", "decision", "Aturan menghasilkan keputusan yang janggal", "Saya cenderung memeriksa apakah prinsip yang dipakai benar-benar konsisten untuk semua kasus.", "memeriksa konsistensi aturan"),
  makeCore("core_ti_flexible_01", "Ti", "flexible", "work", "Sistem lama tidak lagi cocok", "Saya cukup nyaman menata ulang kategori atau hubungan aturan agar sistem tetap jelas tanpa kehilangan inti.", "menyesuaikan kerangka untuk menjaga kejelasan"),
  makeCore("core_ti_flexible_02", "Ti", "flexible", "friendship", "Teman bingung memahami persoalan", "Saya bisa mengganti cara menjelaskan—memakai analogi, urutan, atau batas konsep—hingga hubungan masalahnya terlihat.", "menyesuaikan struktur penjelasan untuk orang lain"),
  makeCore("core_ti_flexible_03", "Ti", "flexible", "study", "Banyak konsep perlu dihubungkan", "Saya mudah memilih kerangka yang berbeda sesuai pertanyaan yang sedang ingin dijawab.", "menggunakan kerangka secara fleksibel"),
  makeCore("core_ti_mask_01", "Ti", "mask", "public", "Lingkungan menghargai orang yang sangat logis", "Saya pernah berbicara dengan istilah formal dan aturan kaku agar tampak rasional, meskipun sebenarnya saya belum nyaman dengan kerangkanya.", "menampilkan logika formal demi citra"),
  makeCore("core_ti_mask_02", "Ti", "mask", "work", "Harus membuat prosedur yang tampak rapi", "Saya kadang menyusun bagan dan kategori hanya supaya pekerjaan terlihat terstruktur, bukan karena sistem itu benar-benar membantu.", "memperagakan keteraturan karena tuntutan peran"),
  makeCore("core_ti_mask_03", "Ti", "mask", "study", "Dosen menuntut definisi yang sangat ketat", "Saya dapat memaksakan bahasa teoritis agar terlihat menguasai materi walau prosesnya terasa berat dan tidak alami.", "menampilkan ketepatan konsep karena merasa seharusnya"),
  makeCore("core_ti_threat_01", "Ti", "threat", "time_pressure", "Harus membuktikan konsistensi saat itu juga", "Saya dapat nge-blank ketika didesak menjelaskan setiap definisi dan hubungan logis tanpa waktu menyusun pikiran.", "membuktikan struktur logis di bawah tekanan"),
  makeCore("core_ti_threat_02", "Ti", "threat", "work", "Aturan saling bertentangan dan saya diminta memutuskan", "Situasi yang menuntut saya membangun sistem sempurna dari aturan yang kacau dapat membuat saya sangat tertekan.", "merapikan aturan yang saling bertentangan"),
  makeCore("core_ti_threat_03", "Ti", "threat", "public", "Kesalahan kecil dalam penalaran disorot", "Koreksi terus-menerus terhadap istilah dan logika saya dapat memicu malu, defensif, atau keinginan berhenti bicara.", "menghadapi penilaian atas ketepatan logika"),
  makeCore("core_ti_receiver_01", "Ti", "receiver", "study", "Materi terasa berantakan", "Saya merasa lega ketika seseorang menyusun konsep ke dalam kerangka yang jelas sehingga hubungan antarbagian mudah diikuti.", "menerima kerangka yang menjernihkan konsep"),
  makeCore("core_ti_receiver_02", "Ti", "receiver", "work", "Aturan kerja membingungkan", "Orang yang mampu merumuskan batas, peran, dan alur secara konsisten membuat saya jauh lebih tenang.", "menerima aturan dan struktur yang jelas"),
  makeCore("core_ti_receiver_03", "Ti", "receiver", "decision", "Banyak pendapat tidak sejalan", "Saya terbantu ketika seseorang menunjukkan prinsip inti yang dapat dipakai untuk membandingkan semua pilihan secara adil.", "menerima prinsip pembanding yang konsisten"),
  makeCore("core_ti_aspiration_01", "Ti", "aspiration", "public", "Cara berpikir saya dinilai", "Pujian bahwa penjelasan saya jernih, konsisten, dan sulit dibantah terasa sangat berarti.", "diakui karena kejernihan dan konsistensi"),
  makeCore("core_ti_aspiration_02", "Ti", "aspiration", "study", "Mempelajari teori baru", "Saya ingin lebih mahir membangun kerangka yang rapi tanpa tersesat dalam istilah yang tidak perlu.", "berkembang dalam menyusun kerangka logis"),
  makeCore("core_ti_aspiration_03", "Ti", "aspiration", "work", "Sistem yang saya buat dipakai orang lain", "Pengakuan bahwa aturan yang saya susun membuat pekerjaan lebih mudah dipahami dapat sangat membanggakan.", "dihargai karena menciptakan struktur yang jelas"),
  makeCore("core_ti_dismissive_01", "Ti", "dismissive", "work", "Struktur sudah cukup jelas", "Saya bisa terus menyempurnakan kategori dan aturan, tetapi memilih berhenti ketika sistem sudah dapat dipakai.", "membatasi penyempurnaan struktur yang berlebihan"),
  makeCore("core_ti_dismissive_02", "Ti", "dismissive", "friendship", "Percakapan berubah menjadi debat definisi", "Saya mampu mengikuti rincian logikanya, namun cepat merasa hubungan nyata lebih penting daripada memenangkan struktur argumen.", "mampu menganalisis tetapi mengesampingkannya"),
  makeCore("core_ti_dismissive_03", "Ti", "dismissive", "decision", "Ada ketidakkonsistenan kecil", "Saya sering melihat celah logis, tetapi tidak selalu merasa perlu memperbaikinya bila tidak mengubah hasil utama.", "mengetahui inkonsistensi tanpa menjadikannya pusat"),
  makeCore("core_ti_background_01", "Ti", "background", "general", "Menyimpan barang atau informasi", "Saya otomatis membuat kelompok dan batas yang masuk akal agar sesuatu mudah ditemukan kembali.", "mengelompokkan secara otomatis"),
  makeCore("core_ti_background_02", "Ti", "background", "work", "Instruksi dari beberapa orang bertabrakan", "Saya sering diam-diam menyusun ulang hubungan tugas di kepala sampai tahu aturan mana yang mengikat bagian lain.", "merapikan struktur dalam pikiran"),
  makeCore("core_ti_background_03", "Ti", "background", "friendship", "Teman menceritakan masalah panjang", "Saya mudah menangkap bagian yang tidak konsisten atau premis yang hilang, meski tidak selalu mengoreksinya.", "mendeteksi ketidakkonsistenan sebagai kebiasaan latar"),
  makeCore("core_fe_producer_01", "Fe", "producer", "group", "Suasana kelompok berubah", "Saya cepat menangkap perubahan energi ruangan dan spontan menyesuaikan ekspresi agar suasana bergerak ke arah tertentu.", "membaca dan menggerakkan suasana kelompok"),
  makeCore("core_fe_producer_02", "Fe", "producer", "friendship", "Obrolan mulai canggung", "Saya sering langsung memberi respons, cerita, atau candaan yang membuat emosi bersama kembali mengalir.", "mencairkan suasana secara spontan"),
  makeCore("core_fe_producer_03", "Fe", "producer", "public", "Menyampaikan hal yang penting", "Saya mudah memberi tekanan emosi pada suara dan ekspresi supaya orang benar-benar merasakan pesan yang disampaikan.", "mengekspresikan emosi untuk memberi dampak"),
  makeCore("core_fe_flexible_01", "Fe", "flexible", "work", "Tim membutuhkan semangat yang berbeda", "Saya cukup nyaman mengubah nada—lebih hangat, lebih serius, atau lebih bersemangat—sesuai energi yang dibutuhkan pekerjaan.", "menyesuaikan ekspresi dengan kebutuhan kelompok"),
  makeCore("core_fe_flexible_02", "Fe", "flexible", "friendship", "Teman sedang sedih", "Saya bisa ikut lembut, menghibur, atau mengalihkan suasana berdasarkan respons emosional yang paling membantu saat itu.", "menyesuaikan emosi untuk membantu orang lain"),
  makeCore("core_fe_flexible_03", "Fe", "flexible", "group", "Acara mulai kehilangan arah", "Saya mudah menaikkan atau menurunkan intensitas suasana agar kelompok tetap terlibat tanpa menjadi terlalu gaduh.", "mengatur intensitas suasana secara fleksibel"),
  makeCore("core_fe_mask_01", "Fe", "mask", "work", "Harus terlihat selalu antusias", "Saya pernah memaksa senyum dan energi ceria agar tampak profesional, meskipun suasana hati saya sebenarnya jauh berbeda.", "menampilkan emosi positif karena tuntutan peran"),
  makeCore("core_fe_mask_02", "Fe", "mask", "family", "Diharapkan menjaga suasana tetap damai", "Saya kadang memainkan ekspresi hangat supaya orang lain tidak curiga ada masalah, walau hal itu menguras tenaga.", "memperagakan kehangatan demi kepantasan"),
  makeCore("core_fe_mask_03", "Fe", "mask", "public", "Semua orang menunggu saya menghibur", "Saya dapat tampil heboh dan ekspresif karena merasa wajib menghidupkan acara, bukan karena energi itu muncul alami.", "memainkan peran penghidup suasana"),
  makeCore("core_fe_threat_01", "Fe", "threat", "public", "Diminta tampil ekspresif di depan banyak orang", "Tuntutan untuk menunjukkan emosi yang jelas dapat membuat saya kaku, malu, atau ingin menghilang dari perhatian.", "menampilkan emosi di bawah sorotan"),
  makeCore("core_fe_threat_02", "Fe", "threat", "conflict", "Harus mengendalikan suasana yang memanas", "Saya tertekan ketika semua orang berharap saya mengubah emosi kelompok sementara saya sendiri belum tahu harus bereaksi bagaimana.", "mengelola emosi kelompok saat konflik"),
  makeCore("core_fe_threat_03", "Fe", "threat", "work", "Ekspresi saya terus dinilai", "Kritik bahwa saya terlalu datar, terlalu kuat, atau salah suasana dapat membuat saya defensif dan sangat sadar diri.", "menghadapi penilaian atas ekspresi emosional"),
  makeCore("core_fe_receiver_01", "Fe", "receiver", "friendship", "Hari terasa muram", "Saya merasa sangat terbantu ketika seseorang membawa kehangatan, tawa, atau ekspresi yang membuat emosi saya kembali bergerak.", "menerima energi emosional yang menghidupkan"),
  makeCore("core_fe_receiver_02", "Fe", "receiver", "group", "Suasana tidak jelas dan semua diam", "Orang yang berani menyatakan perasaan ruangan dan memberi nada yang tepat membuat saya jauh lebih lega.", "menerima arah suasana dari orang lain"),
  makeCore("core_fe_receiver_03", "Fe", "receiver", "private", "Sulit keluar dari perasaan sendiri", "Musik, cerita, atau kehadiran orang yang ekspresif sering membantu saya memahami dan melepaskan emosi.", "menerima pemantik ekspresi emosional"),
  makeCore("core_fe_aspiration_01", "Fe", "aspiration", "public", "Orang bereaksi pada kehadiran saya", "Pujian bahwa saya punya ekspresi kuat atau mampu menghidupkan suasana terasa sangat menyenangkan.", "diakui karena dampak emosional"),
  makeCore("core_fe_aspiration_02", "Fe", "aspiration", "work", "Belajar berbicara di depan orang", "Saya ingin lebih mampu membawa energi yang membuat orang mendengarkan dan ikut merasakan pesan saya.", "berkembang dalam ekspresi dan pengaruh suasana"),
  makeCore("core_fe_aspiration_03", "Fe", "aspiration", "friendship", "Teman menikmati kebersamaan", "Pengakuan bahwa saya membuat kelompok terasa lebih hangat dapat menyentuh bagian diri yang ingin saya kembangkan.", "dihargai karena menciptakan kehangatan bersama"),
  makeCore("core_fe_dismissive_01", "Fe", "dismissive", "group", "Suasana sudah cukup hidup", "Saya bisa terus menjaga energi kelompok, tetapi memilih berhenti ketika ekspresi mulai terasa berlebihan atau mengganggu tujuan.", "mampu menggerakkan suasana tetapi membatasinya"),
  makeCore("core_fe_dismissive_02", "Fe", "dismissive", "work", "Masalah berubah menjadi drama", "Saya memahami emosi yang sedang dimainkan, namun cepat menutupnya jika dianggap tidak membantu pekerjaan nyata.", "mampu membaca emosi tetapi menolak drama berkepanjangan"),
  makeCore("core_fe_dismissive_03", "Fe", "dismissive", "friendship", "Orang meminta reaksi yang lebih besar", "Saya dapat menunjukkan emosi dengan jelas, tetapi tidak suka jika setiap hal harus dibesarkan agar dianggap penting.", "menahan ekspresi yang dianggap tidak perlu"),
  makeCore("core_fe_background_01", "Fe", "background", "general", "Berada di antara beberapa orang", "Saya sering otomatis menyesuaikan nada wajah dan suara dengan atmosfer sekitar tanpa sadar sedang melakukannya.", "menyesuaikan ekspresi sebagai kebiasaan latar"),
  makeCore("core_fe_background_02", "Fe", "background", "friendship", "Teman mulai kehilangan semangat", "Saya kerap memberi respons kecil yang mengangkat suasana tanpa merasa sedang menjadi penghibur.", "mengangkat emosi orang secara diam-diam"),
  makeCore("core_fe_background_03", "Fe", "background", "work", "Rapat terasa terlalu tegang", "Saya bisa menyisipkan nada, humor, atau penekanan yang membuat orang kembali terlibat lalu melanjutkan seperti biasa.", "mengatur suasana tanpa mencari perhatian"),
  makeCore("core_fi_producer_01", "Fi", "producer", "new_situation", "Bertemu orang baru", "Saya cepat membentuk rasa tentang seberapa dekat, tulus, atau aman hubungan dengan seseorang, meski belum banyak dibicarakan.", "menilai jarak dan kualitas hubungan secara spontan"),
  makeCore("core_fi_producer_02", "Fi", "producer", "friendship", "Teman mengatakan sesuatu yang berbeda dari biasanya", "Saya spontan memperhatikan apakah perubahan itu menunjukkan jarak, luka, ketulusan, atau batas baru di antara kami.", "membaca perubahan hubungan"),
  makeCore("core_fi_producer_03", "Fi", "producer", "decision", "Pilihan dapat memengaruhi orang dekat", "Saya cenderung langsung mempertimbangkan siapa yang akan merasa dikhianati, dihargai, atau semakin dipercaya.", "menilai dampak keputusan pada ikatan pribadi"),
  makeCore("core_fi_flexible_01", "Fi", "flexible", "friendship", "Teman membutuhkan kedekatan yang berbeda", "Saya cukup nyaman mengatur jarak: mendekat, memberi ruang, atau berbicara lebih jujur sesuai keadaan hubungan.", "menyesuaikan kedekatan dengan kebutuhan hubungan"),
  makeCore("core_fi_flexible_02", "Fi", "flexible", "work", "Harus memberi umpan balik pribadi", "Saya dapat memilih nada yang tetap jujur tanpa merusak kepercayaan yang sudah dibangun.", "menyesuaikan kejujuran untuk menjaga hubungan"),
  makeCore("core_fi_flexible_03", "Fi", "flexible", "family", "Dua orang dekat sedang berselisih", "Saya bisa mengubah pendekatan kepada masing-masing orang berdasarkan sejarah dan batas hubungan mereka.", "menyesuaikan pendekatan berdasarkan ikatan personal"),
  makeCore("core_fi_mask_01", "Fi", "mask", "work", "Harus terlihat akrab dengan semua orang", "Saya pernah menunjukkan keramahan yang lebih dekat daripada yang benar-benar saya rasakan agar dianggap mudah bekerja sama.", "menampilkan kedekatan karena tuntutan peran"),
  makeCore("core_fi_mask_02", "Fi", "mask", "family", "Diharapkan selalu tampak rukun", "Saya kadang menyembunyikan jarak atau kekecewaan dan memainkan sikap hangat demi menjaga penampilan hubungan.", "memperagakan keharmonisan demi kepantasan"),
  makeCore("core_fi_mask_03", "Fi", "mask", "public", "Orang menilai saya dari kesopanan", "Saya dapat memaksa perhatian personal dan kata-kata manis agar tampak tulus, walau batin saya tidak merasa dekat.", "menampilkan ketulusan demi citra sosial"),
  makeCore("core_fi_threat_01", "Fi", "threat", "conflict", "Harus menentukan siapa yang benar-benar setia", "Tekanan untuk menilai niat dan hubungan orang secara pasti dapat membuat saya takut salah, defensif, atau ingin menghindar.", "menilai kesetiaan di bawah tekanan"),
  makeCore("core_fi_threat_02", "Fi", "threat", "friendship", "Diminta memilih salah satu teman", "Saya sangat tertekan ketika keputusan saya akan dibaca sebagai pengkhianatan atau penolakan pribadi.", "menghadapi pilihan yang mengancam ikatan"),
  makeCore("core_fi_threat_03", "Fi", "threat", "public", "Perasaan pribadi saya dipertanyakan", "Desakan untuk menjelaskan siapa yang saya sayangi, percaya, atau jauhi dapat membuat saya malu dan menutup diri.", "membuka penilaian hubungan di bawah sorotan"),
  makeCore("core_fi_receiver_01", "Fi", "receiver", "friendship", "Tidak yakin pada posisi hubungan", "Saya merasa sangat lega ketika seseorang menyatakan dengan jelas bahwa ia percaya, tetap dekat, dan tidak menyimpan niat tersembunyi.", "menerima kepastian dan ketulusan hubungan"),
  makeCore("core_fi_receiver_02", "Fi", "receiver", "romance", "Muncul keraguan tentang perasaan", "Sikap yang konsisten dan jujur dari orang terdekat membuat hati saya jauh lebih tenang daripada janji yang samar.", "menerima bukti kesetiaan dan kedekatan"),
  makeCore("core_fi_receiver_03", "Fi", "receiver", "work", "Hubungan tim terasa dingin", "Orang yang membantu menjernihkan salah paham personal tanpa mempermalukan siapa pun membuat saya merasa aman.", "menerima mediasi hubungan yang tulus"),
  makeCore("core_fi_aspiration_01", "Fi", "aspiration", "public", "Orang menilai karakter saya", "Pujian bahwa saya setia, tulus, dan tahu menjaga kepercayaan terasa sangat dalam bagi saya.", "diakui karena ketulusan dan kesetiaan"),
  makeCore("core_fi_aspiration_02", "Fi", "aspiration", "friendship", "Membangun hubungan jangka panjang", "Saya ingin lebih mampu menjaga kedekatan tanpa kehilangan batas diri atau menyimpan luka terlalu lama.", "berkembang dalam merawat hubungan"),
  makeCore("core_fi_aspiration_03", "Fi", "aspiration", "family", "Menjadi tempat aman bagi orang dekat", "Saya ingin dipercaya sebagai orang yang memahami batas pribadi dan tidak mempermainkan perasaan.", "dihargai karena menjaga batas dan kepercayaan"),
  makeCore("core_fi_dismissive_01", "Fi", "dismissive", "work", "Masalah personal mulai menguasai pekerjaan", "Saya mampu membaca ketegangan hubungan, tetapi sengaja mengesampingkannya ketika urusan objektif harus diselesaikan.", "membaca hubungan tetapi tidak menjadikannya pusat"),
  makeCore("core_fi_dismissive_02", "Fi", "dismissive", "friendship", "Percakapan terus membahas siapa dekat dengan siapa", "Saya memahami nuansanya, namun cepat merasa pengukuran kedekatan yang berlebihan hanya memperumit hubungan.", "membatasi analisis hubungan yang berlebihan"),
  makeCore("core_fi_dismissive_03", "Fi", "dismissive", "decision", "Ada rasa tidak enak kecil", "Saya dapat menangkap perubahan jarak, tetapi memilih tidak menindaklanjutinya jika tidak menyentuh kepercayaan utama.", "mengetahui nuansa hubungan tanpa selalu merespons"),
  makeCore("core_fi_background_01", "Fi", "background", "general", "Berinteraksi dengan orang yang berbeda", "Saya otomatis menjaga kadar keterbukaan dan jarak yang terasa pantas untuk masing-masing hubungan.", "mengatur jarak personal secara otomatis"),
  makeCore("core_fi_background_02", "Fi", "background", "friendship", "Teman menyebut kejadian lama", "Saya sering mengingat nada, janji, dan perubahan kecil dalam hubungan tanpa sengaja menyimpannya sebagai daftar.", "menyimpan nuansa hubungan sebagai kebiasaan latar"),
  makeCore("core_fi_background_03", "Fi", "background", "family", "Ada ketegangan yang belum diucapkan", "Saya kerap melakukan penyesuaian kecil agar batas dan rasa hormat tetap terjaga tanpa mengumumkan bahwa saya sedang memperbaiki hubungan.", "merawat kepercayaan secara diam-diam"),
];

```

## src/data/holdoutQuestions.ts

```ts
/** Holdout items are withheld from the initial core fit and used as a prediction check. */
import type { InformationElement, MeasurementChannel, QuestionContext, SocionicsQuestion } from "../types/socionics";

const makeHoldout = (
  id: string,
  element: InformationElement,
  channel: MeasurementChannel,
  context: QuestionContext,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => ({
  id,
  scenario,
  statement,
  responseFocus,
  element,
  channel,
  context,
  scaleType:
    channel === "producer" || channel === "background" ? "automaticity" :
    channel === "threat" ? "threat" :
    channel === "receiver" ? "relief" :
    channel === "aspiration" ? "recognition" : "frequency",
  direction: 1,
  reverseKeyed: false,
  designWeight: 0.9,
  ambiguityRisk: "low",
  desirabilityRisk: channel === "aspiration" ? "medium" : "low",
  evidenceTags: [element, channel, context, "holdout"],
  replicationFamilyId: `holdout_${element}_${channel}`,
  isHoldout: true,
  isTieBreak: false,
  itemVersion: "2.0.0",
});

export const HOLDOUT_QUESTIONS: SocionicsQuestion[] = [
  makeHoldout("holdout_ne_01", "Ne", "producer", "new_situation", "Aturan permainan belum lengkap", "Sebelum orang lain selesai menjelaskan, saya sering sudah melihat beberapa kemungkinan tentang cara permainan itu bisa berkembang.", "melihat beberapa kemungkinan dari aturan yang belum lengkap"),
  makeHoldout("holdout_ne_02", "Ne", "threat", "public", "Semua orang menunggu ide yang belum pernah ada", "Tekanan untuk menjadi satu-satunya sumber ide baru dapat membuat pikiran saya mengecil dan takut semua pilihan terdengar bodoh.", "menghasilkan kebaruan ketika semua orang menunggu"),
  makeHoldout("holdout_ne_03", "Ne", "receiver", "study", "Tidak memahami potensi sebuah topik", "Saya merasa terbuka kembali ketika seseorang menunjukkan hubungan tak terduga yang membuat topik itu punya lebih banyak jalan untuk dipelajari.", "menerima hubungan baru yang membuka potensi"),
  makeHoldout("holdout_ne_04", "Ne", "background", "general", "Melihat aturan yang dianggap tetap", "Saya kerap spontan menemukan pengecualian atau penggunaan lain, lalu menyimpannya di kepala tanpa merasa harus memperdebatkannya.", "melihat pengecualian dan penggunaan lain secara latar"),

  makeHoldout("holdout_ni_01", "Ni", "producer", "decision", "Sebuah keputusan terasa belum waktunya", "Saya sering merasakan bahwa langkah tertentu akan lebih tepat jika ditunda sampai rangkaian keadaan mencapai titik yang pas.", "merasakan kematangan waktu sebelum bertindak"),
  makeHoldout("holdout_ni_02", "Ni", "threat", "time_pressure", "Diminta menetapkan kapan masalah akan selesai", "Saya dapat sangat tertekan ketika harus menjanjikan tanggal akhir padahal alur perubahan belum cukup terbaca.", "menjamin waktu akhir ketika arah belum jelas"),
  makeHoldout("holdout_ni_03", "Ni", "receiver", "friendship", "Kejadian buruk terasa tidak bermakna", "Saya lega ketika seseorang dapat menjelaskan bagaimana kejadian itu mungkin menjadi bagian dari perkembangan yang lebih panjang.", "menerima makna perkembangan dari orang lain"),
  makeHoldout("holdout_ni_04", "Ni", "background", "work", "Proyek mulai kehilangan momentum", "Saya sering mengubah tempo atau menunggu satu tahap tertentu tanpa menjelaskan panjang karena arah perlambatannya sudah terasa.", "menyesuaikan momentum secara diam-diam"),

  makeHoldout("holdout_se_01", "Se", "producer", "conflict", "Seseorang terus menggeser batas yang sudah disepakati", "Saya cenderung segera menghentikannya dengan sikap yang jelas daripada berharap ia menyadari sendiri.", "menghentikan pelanggaran batas secara langsung"),
  makeHoldout("holdout_se_02", "Se", "threat", "public", "Harus merebut kendali dari orang yang dominan", "Tubuh saya dapat menegang ketika harus beradu posisi secara terbuka dan semua orang melihat siapa yang akan mundur.", "beradu posisi secara terbuka"),
  makeHoldout("holdout_se_03", "Se", "receiver", "family", "Keluarga menghadapi gangguan nyata", "Saya merasa aman ketika seseorang mengambil tindakan tegas, membagi peran, dan tidak membiarkan ancaman terus berlarut.", "menerima perlindungan dan tindakan tegas"),
  makeHoldout("holdout_se_04", "Se", "background", "work", "Barang dan orang menghalangi jalur kerja", "Saya sering langsung memindahkan, mengatur, atau membuka ruang agar kegiatan kembali lancar tanpa banyak rapat.", "membuka ruang dan menyingkirkan hambatan secara otomatis"),

  makeHoldout("holdout_si_01", "Si", "producer", "body", "Tubuh mulai kehilangan keseimbangan", "Saya biasanya cepat tahu apakah yang saya butuhkan adalah makan, tidur, bergerak, mengurangi suara, atau sekadar mengubah posisi.", "membaca kebutuhan tubuh secara spontan"),
  makeHoldout("holdout_si_02", "Si", "threat", "work", "Harus mengawasi kenyamanan banyak orang", "Saya dapat kewalahan ketika setiap keluhan suhu, makanan, bau, dan posisi duduk menjadi tanggung jawab saya.", "mengelola seluruh detail kenyamanan orang lain"),
  makeHoldout("holdout_si_03", "Si", "receiver", "romance", "Badan sedang benar-benar lelah", "Perhatian sederhana seperti menyiapkan tempat nyaman atau makanan yang pas dapat membuat saya merasa sangat dirawat.", "menerima perawatan indrawi yang tepat"),
  makeHoldout("holdout_si_04", "Si", "background", "friendship", "Kegiatan bersama berlangsung lama", "Saya sering tanpa sadar mengusulkan jeda, tempat yang lebih enak, atau tempo yang lebih ringan sebelum orang lain menyadari kelelahan.", "menjaga kenyamanan kelompok secara latar"),

  makeHoldout("holdout_te_01", "Te", "producer", "decision", "Menerima klaim yang terdengar meyakinkan", "Saya spontan ingin tahu sumbernya, contoh hasilnya, dan apakah informasi itu benar-benar dapat dipakai.", "memeriksa fakta dan kegunaan klaim"),
  makeHoldout("holdout_te_02", "Te", "threat", "time_pressure", "Harus memperbaiki alat tanpa petunjuk", "Saya dapat panik ketika hasil harus segera keluar tetapi saya tidak tahu prosedur mana yang terbukti bekerja.", "menemukan prosedur yang bekerja di bawah tekanan"),
  makeHoldout("holdout_te_03", "Te", "receiver", "new_situation", "Mencoba pekerjaan teknis pertama kali", "Saya sangat terbantu oleh orang yang menunjukkan satu contoh nyata, membiarkan saya mencoba, lalu memperbaiki langkah yang salah.", "menerima demonstrasi praktis"),
  makeHoldout("holdout_te_04", "Te", "background", "private", "Rutinitas kecil terasa boros waktu", "Saya sering mengubah urutan atau alat secara otomatis sampai kegiatan itu selesai dengan lebih sedikit langkah.", "menyederhanakan rutinitas secara latar"),

  makeHoldout("holdout_ti_01", "Ti", "producer", "study", "Dua penjelasan memakai aturan yang berbeda", "Saya cepat ingin menemukan prinsip mana yang berubah dan apakah keduanya masih dapat berada dalam satu kerangka yang konsisten.", "mencari prinsip yang menyatukan aturan"),
  makeHoldout("holdout_ti_02", "Ti", "threat", "public", "Diminta mempertahankan definisi di depan banyak orang", "Saya dapat merasa malu atau defensif ketika setiap kata saya dibedah sebelum sempat menyusun kerangka yang utuh.", "mempertahankan definisi di bawah sorotan"),
  makeHoldout("holdout_ti_03", "Ti", "receiver", "work", "Pembagian tugas tidak jelas", "Saya lega ketika seseorang menetapkan batas peran dan menunjukkan bagaimana satu bagian terhubung dengan bagian lain.", "menerima struktur peran yang jelas"),
  makeHoldout("holdout_ti_04", "Ti", "background", "general", "Mendengar argumen yang tampak lancar", "Saya sering otomatis menangkap lompatan logika atau kategori yang bercampur, meskipun tidak selalu menyela.", "mendeteksi lompatan logika secara latar"),

  makeHoldout("holdout_fe_01", "Fe", "producer", "group", "Energi ruangan turun setelah kabar buruk", "Saya sering spontan mengubah nada bicara atau memberi respons yang membantu kelompok menyalurkan emosi bersama.", "menggerakkan emosi kelompok secara spontan"),
  makeHoldout("holdout_fe_02", "Fe", "threat", "work", "Diminta tetap ceria sepanjang hari", "Saya dapat merasa terperangkap ketika ekspresi saya harus terus disetel agar orang lain tidak kehilangan semangat.", "mempertahankan ekspresi positif sebagai tuntutan"),
  makeHoldout("holdout_fe_03", "Fe", "receiver", "private", "Sulit memahami perasaan sendiri", "Ekspresi terbuka dari orang lain sering membantu saya memberi nama pada emosi dan keluar dari keadaan yang datar.", "menerima ekspresi yang membantu menggerakkan emosi"),
  makeHoldout("holdout_fe_04", "Fe", "background", "friendship", "Percakapan menjadi terlalu tegang", "Saya kerap memberi satu nada ringan atau reaksi hangat yang membuat semua orang bernapas lagi tanpa merasa sedang tampil.", "melunakkan suasana secara latar"),

  makeHoldout("holdout_fi_01", "Fi", "producer", "friendship", "Seseorang meminta maaf setelah melukai kepercayaan", "Saya spontan menilai bukan hanya kata-katanya, tetapi juga perubahan sikap yang menunjukkan apakah hubungan benar-benar dapat dipulihkan.", "menilai ketulusan pemulihan hubungan"),
  makeHoldout("holdout_fi_02", "Fi", "threat", "conflict", "Harus menyatakan siapa yang paling saya percaya", "Saya dapat merasa sangat terpojok ketika pilihan itu akan mengubah kedekatan dan dibaca sebagai penolakan pribadi.", "menyatakan hierarki kepercayaan di bawah tekanan"),
  makeHoldout("holdout_fi_03", "Fi", "receiver", "romance", "Hubungan terasa tidak pasti", "Konsistensi kecil dan pernyataan jujur mengenai posisi hubungan dapat memberi rasa aman yang sangat besar.", "menerima kepastian hubungan yang tulus"),
  makeHoldout("holdout_fi_04", "Fi", "background", "family", "Ada jarak yang belum dibicarakan", "Saya sering mengubah cara mendekat, memberi ruang, atau menjaga kata-kata agar rasa hormat tetap ada tanpa membuatnya menjadi pembicaraan besar.", "merawat jarak dan rasa hormat secara latar"),
];

```

## src/data/tieBreakQuestions.ts

```ts
/** Adaptive pairwise items. Rating 5 supports the first type in the pair; rating 1 supports the second. */
import type { SocionicsQuestion, TIM } from "../types/socionics";

export const canonicalPair = (a: TIM, b: TIM): string => [a, b].sort().join("_");

const makeTieBreak = (
  id: string,
  first: TIM,
  second: TIM,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => {
  const pair = canonicalPair(first, second);
  return {
    id,
    scenario,
    statement,
    responseFocus,
    scaleType: "comparison",
    element: "Ne",
    channel: "producer",
    context: "decision",
    direction: 1,
    reverseKeyed: false,
    designWeight: 1,
    ambiguityRisk: "medium",
    desirabilityRisk: "low",
    evidenceTags: ["tiebreak", pair],
    tieBreakTags: [pair],
    tieBreakSupport: { [first]: 1, [second]: -1 },
    isHoldout: false,
    isTieBreak: true,
    itemVersion: "2.0.0",
  };
};

export const TIE_BREAK_QUESTIONS: SocionicsQuestion[] = [
  makeTieBreak("tb_ile_iee_01", "ILE", "IEE", "Membantu kelompok yang kehilangan arah", "Saya lebih terdorong membongkar cara kerja gagasan dan menemukan struktur yang konsisten daripada memetakan siapa yang cocok, tulus, atau perlu didekati secara personal.", "struktur gagasan dibanding nuansa hubungan"),
  makeTieBreak("tb_ile_iee_02", "ILE", "IEE", "Menemukan kemungkinan baru", "Setelah ide muncul, saya lebih ingin menguji bagaimana bagian-bagiannya terhubung daripada membayangkan potensi orang yang dapat tumbuh melalui ide itu.", "konsistensi sistem dibanding potensi personal"),

  makeTieBreak("tb_sei_sli_01", "SEI", "SLI", "Membuat keadaan lebih baik", "Saya lebih cepat memperhatikan suasana emosional dan kenyamanan bersama daripada mencari metode kerja yang paling hemat tenaga dan sumber daya.", "kehangatan suasana dibanding efektivitas praktis"),
  makeTieBreak("tb_sei_sli_02", "SEI", "SLI", "Teman berkunjung ketika ada pekerjaan", "Saya lebih terdorong membuat interaksi terasa ringan dan menyenangkan daripada segera mengoptimalkan alat serta langkah kerja.", "suasana bersama dibanding optimasi cara kerja"),

  makeTieBreak("tb_ese_eie_01", "ESE", "EIE", "Menghidupkan sebuah acara", "Saya lebih berfokus pada kenyamanan nyata yang sedang dirasakan orang daripada membangun satu tema besar tentang arah acara dan dampaknya ke depan.", "kenyamanan saat ini dibanding tema jangka panjang"),
  makeTieBreak("tb_ese_eie_02", "ESE", "EIE", "Kelompok sedang kehilangan semangat", "Saya lebih spontan memperbaiki suasana lewat perhatian konkret daripada mengarahkan emosi mereka menuju visi atau makna tertentu.", "perawatan konkret dibanding pengarahan visi emosional"),

  makeTieBreak("tb_lii_lsi_01", "LII", "LSI", "Aturan tidak lagi cocok", "Saya lebih tertarik mencari kemungkinan kerangka baru daripada memperkuat batas dan menegakkan aturan yang sudah disepakati.", "membuka kerangka baru dibanding menegakkan batas"),
  makeTieBreak("tb_lii_lsi_02", "LII", "LSI", "Sistem menghadapi pengecualian", "Saya lebih nyaman memperluas definisi agar pengecualian dapat dijelaskan daripada memutuskan secara tegas mana yang tetap boleh dan tidak boleh.", "memperluas definisi dibanding menetapkan ketegasan"),

  makeTieBreak("tb_sle_see_01", "SLE", "SEE", "Memimpin konflik kelompok", "Saya lebih mengandalkan aturan peran dan struktur keputusan daripada membaca siapa yang setia, tersinggung, atau perlu dirangkul secara personal.", "struktur kendali dibanding nuansa hubungan"),
  makeTieBreak("tb_sle_see_02", "SLE", "SEE", "Membagi kekuasaan", "Saya lebih ingin membuat batas kewenangan yang konsisten daripada menyesuaikan dukungan berdasarkan kedekatan dan kepercayaan antarorang.", "konsistensi kewenangan dibanding aliansi personal"),

  makeTieBreak("tb_iei_ili_01", "IEI", "ILI", "Membaca arah keadaan", "Saya lebih mudah mengungkapkan tema itu melalui suasana dan emosi bersama daripada mengujinya lewat fakta efektivitas serta hasil yang dapat diamati.", "tema emosional dibanding verifikasi praktis"),
  makeTieBreak("tb_iei_ili_02", "IEI", "ILI", "Melihat perubahan yang akan datang", "Saya lebih tertarik pada bagaimana perubahan itu akan dirasakan orang daripada pada biaya, kegunaan, dan mekanisme pelaksanaannya.", "dampak emosional dibanding konsekuensi praktis"),

  makeTieBreak("tb_lie_lse_01", "LIE", "LSE", "Mengembangkan pekerjaan", "Saya lebih terdorong menata langkah menurut arah jangka panjang daripada memastikan ritme harian, kondisi fisik, dan kenyamanan proses tetap stabil.", "arah jangka panjang dibanding kestabilan keseharian"),
  makeTieBreak("tb_lie_lse_02", "LIE", "LSE", "Memilih metode yang efektif", "Saya lebih mudah menerima ketidaknyamanan sekarang jika metode itu membuka perkembangan besar di masa depan.", "pertumbuhan masa depan dibanding kenyamanan proses"),

  makeTieBreak("tb_esi_eii_01", "ESI", "EII", "Kepercayaan dilanggar", "Saya lebih terdorong memasang batas dan konsekuensi nyata daripada terus membuka kemungkinan alasan, perubahan, atau niat baik dari pelakunya.", "konsekuensi tegas dibanding kemungkinan perubahan"),
  makeTieBreak("tb_esi_eii_02", "ESI", "EII", "Melindungi orang dekat", "Saya lebih spontan menghentikan ancaman sekarang daripada mengeksplorasi jalan yang mungkin membuat semua pihak berkembang.", "perlindungan langsung dibanding eksplorasi potensi"),

  makeTieBreak("tb_ile_lii_01", "ILE", "LII", "Menemukan konsep baru", "Saya lebih bersemangat membuka cabang dan kemungkinan baru daripada menahan diri sampai seluruh definisi tersusun konsisten.", "ekspansi kemungkinan dibanding penyempurnaan kerangka"),
  makeTieBreak("tb_ile_lii_02", "ILE", "LII", "Diskusi teori berkembang", "Saya lebih cepat melompat ke hubungan baru yang menarik daripada merapikan satu sistem penjelasan hingga benar-benar tuntas.", "eksplorasi hubungan baru dibanding ketuntasan struktur"),

  makeTieBreak("tb_sei_ese_01", "SEI", "ESE", "Suasana bersama mulai tidak nyaman", "Saya lebih dahulu menyesuaikan ritme dan kenyamanan secara tenang daripada mengangkat energi kelompok dengan ekspresi yang lebih kuat.", "penyetelan kenyamanan dibanding aktivasi emosi"),
  makeTieBreak("tb_sei_ese_02", "SEI", "ESE", "Teman sedang lesu", "Saya lebih spontan menciptakan suasana santai yang menenangkan daripada mengajak mereka menunjukkan emosi dan kembali bersemangat.", "ketenangan indrawi dibanding ekspresi emosional"),

  makeTieBreak("tb_sle_lsi_01", "SLE", "LSI", "Masalah membutuhkan kendali", "Saya lebih cepat bertindak dan mengubah posisi nyata daripada memastikan setiap tindakan sudah sesuai kerangka aturan yang lengkap.", "aksi penguasaan dibanding ketepatan struktur"),
  makeTieBreak("tb_sle_lsi_02", "SLE", "LSI", "Ada pelanggaran di lapangan", "Saya lebih terdorong menghentikannya saat itu juga daripada menata prosedur dan klasifikasi pelanggaran terlebih dahulu.", "intervensi langsung dibanding prosedur sistematis"),

  makeTieBreak("tb_iei_eie_01", "IEI", "EIE", "Menangkap tema emosional", "Saya lebih sering membiarkan gambaran itu tumbuh diam-diam sebelum mengungkapkannya daripada langsung membentuk suasana kelompok secara terbuka.", "visi batin dibanding ekspresi terbuka"),
  makeTieBreak("tb_iei_eie_02", "IEI", "EIE", "Merasakan arah sebuah hubungan", "Saya lebih nyaman menunggu makna dan waktunya mengendap daripada segera memberi nama serta intensitas pada emosi yang ada.", "pengendapan makna dibanding pengarahan emosi"),

  makeTieBreak("tb_see_esi_01", "SEE", "ESI", "Menghadapi orang yang merusak kepercayaan", "Saya lebih cepat mengubah posisi, pengaruh, dan aliansi secara aktif daripada menetapkan satu penilaian moral yang tetap tentang hubungan itu.", "manuver pengaruh dibanding keteguhan penilaian relasi"),
  makeTieBreak("tb_see_esi_02", "SEE", "ESI", "Membela orang dekat", "Saya lebih spontan menggerakkan orang dan sumber daya daripada berfokus pada batas kesetiaan yang tidak boleh dilanggar.", "mobilisasi pengaruh dibanding batas kesetiaan"),

  makeTieBreak("tb_ili_lie_01", "ILI", "LIE", "Melihat peluang besar", "Saya lebih dahulu mengamati bagaimana peluang itu mungkin berkembang atau gagal daripada segera mengubahnya menjadi rencana kerja yang produktif.", "pengamatan arah dibanding eksekusi praktis"),
  makeTieBreak("tb_ili_lie_02", "ILI", "LIE", "Tren baru mulai terlihat", "Saya lebih nyaman menunggu pola dan waktunya menjadi jelas daripada langsung mengerahkan sumber daya untuk memanfaatkannya.", "menunggu kematangan arah dibanding bergerak produktif"),

  makeTieBreak("tb_iee_eii_01", "IEE", "EII", "Melihat potensi seseorang", "Saya lebih terdorong membuka kemungkinan baru baginya daripada menjaga satu arah hubungan yang paling selaras dengan nilai dan batasnya.", "membuka potensi dibanding menjaga arah relasi"),
  makeTieBreak("tb_iee_eii_02", "IEE", "EII", "Orang dekat ingin berubah", "Saya lebih cepat menunjukkan banyak jalan yang dapat dicoba daripada mendalami mana yang paling sesuai dengan suara batin dan komitmennya.", "banyak jalan pertumbuhan dibanding keselarasan nilai"),

  makeTieBreak("tb_sli_lse_01", "SLI", "LSE", "Pekerjaan harian perlu dibenahi", "Saya lebih dahulu mencari cara yang paling ringan dan nyaman dijalankan daripada membuat jadwal, target, dan pengawasan yang lebih ketat.", "cara ringan adaptif dibanding pengaturan produktif"),
  makeTieBreak("tb_sli_lse_02", "SLI", "LSE", "Ada alat dan waktu terbatas", "Saya lebih suka menyesuaikan diri secara tenang dengan apa yang tersedia daripada mengorganisasi orang agar seluruh proses bergerak lebih cepat.", "adaptasi praktis tenang dibanding pengorganisasian aktif"),
];

export const getTieBreakQuestionsForPair = (pair: string): SocionicsQuestion[] =>
  TIE_BREAK_QUESTIONS.filter((question) => question.tieBreakTags?.includes(pair));

```

## src/data/questions.ts

```ts
import type { SocionicsQuestion } from "../types/socionics";
import { CORE_QUESTIONS } from "./coreQuestions";
import { HOLDOUT_QUESTIONS } from "./holdoutQuestions";
import { TIE_BREAK_QUESTIONS } from "./tieBreakQuestions";

export const ALL_QUESTIONS: SocionicsQuestion[] = [
  ...CORE_QUESTIONS,
  ...HOLDOUT_QUESTIONS,
  ...TIE_BREAK_QUESTIONS,
];

export const getQuestionById = (id: string): SocionicsQuestion | undefined =>
  ALL_QUESTIONS.find((question) => question.id === id);

export const getCoreQuestions = (): SocionicsQuestion[] => CORE_QUESTIONS;
export const getHoldoutQuestions = (): SocionicsQuestion[] => HOLDOUT_QUESTIONS;
export const getTieBreakQuestions = (): SocionicsQuestion[] => TIE_BREAK_QUESTIONS;

```

## src/scoring/engine.ts

```ts
import type {
  AssessmentResult,
  FullChannelProfile,
  InformationElement,
  MeasurementChannel,
  ModelAPosition,
  ModelFitScore,
  SocionicsQuestion,
  TIM,
} from "../types/socionics";
import { TIM_MODELS, QUADRA_DATA } from "../constants/socionicsData";
import { canonicalPair } from "../data/tieBreakQuestions";

export const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
export const CHANNELS: MeasurementChannel[] = [
  "producer",
  "flexible",
  "mask",
  "threat",
  "receiver",
  "aspiration",
  "dismissive",
  "background",
];

/**
 * Signed theory priors for the eight Model A positions.
 * Values are design hypotheses in [-1, 1], not empirical population parameters.
 */
export const POSITION_PRIORS: Record<ModelAPosition, Record<MeasurementChannel, number>> = {
  Base: {
    producer: 0.95, flexible: 0.55, mask: -0.55, threat: -0.75,
    receiver: -0.45, aspiration: 0.15, dismissive: 0.10, background: 0.70,
  },
  Creative: {
    producer: 0.55, flexible: 0.95, mask: -0.50, threat: -0.65,
    receiver: -0.35, aspiration: 0.20, dismissive: 0.15, background: 0.60,
  },
  Role: {
    producer: -0.35, flexible: -0.05, mask: 0.90, threat: 0.25,
    receiver: -0.20, aspiration: -0.20, dismissive: 0.10, background: -0.45,
  },
  Vulnerable: {
    producer: -0.75, flexible: -0.60, mask: 0.15, threat: 0.95,
    receiver: 0.10, aspiration: -0.45, dismissive: -0.15, background: -0.85,
  },
  Suggestive: {
    producer: -0.70, flexible: -0.50, mask: -0.20, threat: 0.15,
    receiver: 0.95, aspiration: 0.40, dismissive: -0.45, background: -0.80,
  },
  Mobilizing: {
    producer: -0.35, flexible: 0.05, mask: -0.10, threat: 0.20,
    receiver: 0.40, aspiration: 0.95, dismissive: -0.45, background: -0.40,
  },
  Ignoring: {
    producer: 0.30, flexible: 0.45, mask: -0.45, threat: -0.65,
    receiver: -0.55, aspiration: -0.40, dismissive: 0.95, background: 0.30,
  },
  Demonstrative: {
    producer: 0.50, flexible: 0.60, mask: -0.55, threat: -0.70,
    receiver: -0.55, aspiration: -0.35, dismissive: 0.20, background: 0.95,
  },
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function transformResponse(answer: number, isReverse = false): number {
  const safe = clamp(answer, 1, 5);
  const centered = (safe - 3) / 2;
  return isReverse ? -centered : centered;
}

const createEmptyProfile = (): FullChannelProfile => {
  const profile = {} as FullChannelProfile;
  for (const element of ELEMENTS) {
    profile[element] = {} as Record<MeasurementChannel, number>;
    for (const channel of CHANNELS) profile[element][channel] = 0;
  }
  return profile;
};

export function calculateChannelProfile(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): FullChannelProfile {
  const profile = createEmptyProfile();
  const sums = new Map<string, number>();
  const weights = new Map<string, number>();

  for (const question of questions) {
    if (question.isTieBreak) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;

    const key = `${question.element}_${question.channel}`;
    const weight = question.designWeight || 1;
    const response = transformResponse(answer, question.reverseKeyed) * question.direction;
    sums.set(key, (sums.get(key) ?? 0) + response * weight);
    weights.set(key, (weights.get(key) ?? 0) + weight);
  }

  for (const element of ELEMENTS) {
    for (const channel of CHANNELS) {
      const key = `${element}_${channel}`;
      const denominator = weights.get(key) ?? 0;
      profile[element][channel] = denominator > 0 ? clamp((sums.get(key) ?? 0) / denominator, -1, 1) : 0;
    }
  }
  return profile;
}

export function calculatePositionFit(
  observed: Record<MeasurementChannel, number>,
  position: ModelAPosition,
): number {
  const expected = POSITION_PRIORS[position];
  let weightedSquaredError = 0;
  let totalWeight = 0;

  for (const channel of CHANNELS) {
    const emphasis = Math.abs(expected[channel]) >= 0.9 ? 1.35 : Math.abs(expected[channel]) >= 0.6 ? 1.15 : 1;
    const delta = observed[channel] - expected[channel];
    weightedSquaredError += emphasis * delta * delta;
    totalWeight += emphasis;
  }

  const rmse = Math.sqrt(weightedSquaredError / totalWeight);
  return clamp(1 - rmse / 2, 0, 1);
}

function findPosition(type: TIM, element: InformationElement): ModelAPosition {
  const positions = TIM_MODELS[type].positions;
  const found = (Object.keys(positions) as ModelAPosition[]).find((position) => positions[position] === element);
  if (!found) throw new Error(`Elemen ${element} tidak ditemukan pada Model A ${type}.`);
  return found;
}

function calculateQuadraCoherence(type: TIM, profile: FullChannelProfile): number {
  const valued = QUADRA_DATA[TIM_MODELS[type].quadra].valuedElements;
  const unvalued = ELEMENTS.filter((element) => !valued.includes(element));

  const valueSignal = (element: InformationElement): number => {
    const scores = profile[element];
    return (scores.producer + scores.flexible + scores.receiver + scores.aspiration - scores.dismissive) / 5;
  };

  const valuedAverage = valued.reduce((sum, element) => sum + valueSignal(element), 0) / valued.length;
  const unvaluedAverage = unvalued.reduce((sum, element) => sum + valueSignal(element), 0) / unvalued.length;
  return clamp((valuedAverage - unvaluedAverage) * 0.025, -0.025, 0.025);
}

function calculateHoldoutScore(
  type: TIM,
  answers: Record<string, number>,
  holdoutQuestions: SocionicsQuestion[],
): { score: number; count: number } {
  let similaritySum = 0;
  let count = 0;

  for (const question of holdoutQuestions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const position = findPosition(type, question.element);
    const expected = POSITION_PRIORS[position][question.channel];
    const observed = transformResponse(answer, question.reverseKeyed) * question.direction;
    similaritySum += 1 - Math.abs(observed - expected) / 2;
    count += 1;
  }

  return { score: count > 0 ? clamp(similaritySum / count, 0, 1) : 0.5, count };
}

function tieBreakAdjustment(type: TIM, answers: Record<string, number>, questions: SocionicsQuestion[]): number {
  let adjustment = 0;
  for (const question of questions) {
    if (!question.isTieBreak || !question.tieBreakSupport) continue;
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const support = question.tieBreakSupport[type];
    if (support === undefined) continue;
    adjustment += transformResponse(answer, false) * support * 0.0125;
  }
  return clamp(adjustment, -0.035, 0.035);
}

export function analyzeCoverage(
  answers: Record<string, number>,
  questions: SocionicsQuestion[],
): AssessmentResult["coverage"] {
  const cells = new Set<string>();
  for (const question of questions) {
    if (question.isTieBreak || answers[question.id] === undefined) continue;
    cells.add(`${question.element}_${question.channel}`);
  }
  return { answeredCells: cells.size, totalCells: 64, ratio: cells.size / 64 };
}

export function analyzePersonFit(
  answers: Record<string, number>,
  orderedQuestions: SocionicsQuestion[],
): AssessmentResult["responseQuality"] {
  const answered = orderedQuestions.filter((question) => answers[question.id] !== undefined);
  const ratings = answered.map((question) => answers[question.id]);
  const total = ratings.length;

  let maxStreak = 0;
  let streak = 0;
  let previous: number | undefined;
  for (const rating of ratings) {
    if (rating === previous) streak += 1;
    else { previous = rating; streak = 1; }
    maxStreak = Math.max(maxStreak, streak);
  }

  const midpointCount = ratings.filter((rating) => rating === 3).length;
  const extremeCount = ratings.filter((rating) => rating === 1 || rating === 5).length;

  const families = new Map<string, number[]>();
  for (const question of answered) {
    if (!question.replicationFamilyId || question.isHoldout) continue;
    const values = families.get(question.replicationFamilyId) ?? [];
    values.push(transformResponse(answers[question.id], question.reverseKeyed));
    families.set(question.replicationFamilyId, values);
  }

  let pairDifferenceSum = 0;
  let pairCount = 0;
  for (const values of families.values()) {
    for (let left = 0; left < values.length; left += 1) {
      for (let right = left + 1; right < values.length; right += 1) {
        pairDifferenceSum += Math.abs(values[left] - values[right]);
        pairCount += 1;
      }
    }
  }

  return {
    straightlining: total >= 20 && maxStreak >= Math.max(10, Math.ceil(total * 0.2)),
    midpointOveruse: total >= 20 && midpointCount / total > 0.5,
    extremeResponseRatio: total > 0 ? Number((extremeCount / total).toFixed(2)) : 0,
    completionTimeSeconds: 0,
    inconsistencyScore: pairCount > 0 ? Number((pairDifferenceSum / pairCount).toFixed(2)) : 0,
  };
}

function buildAuditNotes(quality: AssessmentResult["responseQuality"], coverage: AssessmentResult["coverage"]): string[] {
  const notes: string[] = [];
  if (coverage.ratio < 1) notes.push(`Cakupan baru ${coverage.answeredCells}/64 sel elemen-kanal.`);
  if (quality.straightlining) notes.push("Ada rentang jawaban identik yang sangat panjang; hasil perlu dibaca lebih hati-hati.");
  if (quality.midpointOveruse) notes.push("Pilihan tengah digunakan sangat sering; beberapa pembeda tipe mungkin belum terlihat.");
  if (quality.extremeResponseRatio > 0.65) notes.push("Jawaban ekstrem sangat dominan; periksa apakah semua pilihan benar-benar menggambarkan pengalaman nyata.");
  if (quality.inconsistencyScore > 1.1) notes.push("Replikasi lintas konteks cukup berfluktuasi; keadaan atau peran sosial mungkin memengaruhi hasil.");
  return notes;
}

export function calculateResult(
  answers: Record<string, number>,
  allQuestions: SocionicsQuestion[],
  options?: { startedAt?: string; questionIds?: string[] },
): AssessmentResult {
  const coreQuestions = allQuestions.filter((question) => !question.isHoldout && !question.isTieBreak);
  const holdoutQuestions = allQuestions.filter((question) => question.isHoldout);
  const orderedQuestions = options?.questionIds
    ? options.questionIds.map((id) => allQuestions.find((question) => question.id === id)).filter(Boolean) as SocionicsQuestion[]
    : allQuestions;

  const profile = calculateChannelProfile(answers, coreQuestions);
  const coverage = analyzeCoverage(answers, coreQuestions);
  const quality = analyzePersonFit(answers, orderedQuestions);
  if (options?.startedAt) {
    const seconds = Math.max(0, Math.round((Date.now() - Date.parse(options.startedAt)) / 1000));
    quality.completionTimeSeconds = Number.isFinite(seconds) ? seconds : 0;
  }

  const candidateScores: ModelFitScore[] = (Object.keys(TIM_MODELS) as TIM[]).map((type) => {
    const elementFits = {} as Record<InformationElement, number>;
    let modelSimilarity = 0;

    for (const position of Object.keys(TIM_MODELS[type].positions) as ModelAPosition[]) {
      const element = TIM_MODELS[type].positions[position];
      const similarity = calculatePositionFit(profile[element], position);
      elementFits[element] = similarity;
      modelSimilarity += similarity;
    }
    modelSimilarity /= 8;

    const holdout = calculateHoldoutScore(type, answers, holdoutQuestions);
    const holdoutBlend = holdout.count > 0 ? 0.15 : 0;
    let rawSimilarity = modelSimilarity * (1 - holdoutBlend) + holdout.score * holdoutBlend;
    rawSimilarity += calculateQuadraCoherence(type, profile);
    rawSimilarity += tieBreakAdjustment(type, answers, allQuestions);
    rawSimilarity = clamp(rawSimilarity, 0, 1);

    const channelScores = {} as Record<InformationElement, number>;
    for (const element of ELEMENTS) {
      const scores = profile[element];
      channelScores[element] = Number(((scores.producer + scores.flexible + scores.background - scores.threat) / 4).toFixed(2));
    }

    return {
      type,
      fitScore: Number((rawSimilarity * 100).toFixed(1)),
      rawSimilarity,
      channelScores,
      elementFits,
      contradictions: quality.inconsistencyScore > 1.1 ? 1 : 0,
      personFitRatio: Number(clamp(1 - quality.inconsistencyScore / 2, 0, 1).toFixed(2)),
      holdoutScore: Number((holdout.score * 100).toFixed(1)),
    };
  }).sort((left, right) => right.rawSimilarity - left.rawSimilarity);

  const top1 = candidateScores[0];
  const top2 = candidateScores[1];
  const separation = (top1.rawSimilarity - top2.rawSimilarity) * 100;
  const pair = canonicalPair(top1.type, top2.type);
  const pairItems = allQuestions.filter((question) => question.tieBreakTags?.includes(pair));
  const pairAnswered = pairItems.filter((question) => answers[question.id] !== undefined).length;
  const unresolvedPair = separation < 2.5 && pairItems.length > 0 && pairAnswered < pairItems.length ? pair : undefined;

  const answeredCount = Object.keys(answers).length;
  const auditNotes = buildAuditNotes(quality, coverage);
  let confidence: AssessmentResult["confidence"] = "sedang";
  let confidenceExplanation = "Pola awal sudah terlihat, tetapi hasil tetap merupakan indeks kecocokan terhadap model teori.";

  if (answeredCount < 64 || coverage.ratio < 0.85) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Belum cukup sel elemen-kanal yang terjawab untuk membandingkan 16 model secara layak.";
  } else if (quality.straightlining) {
    confidence = "tidak cukup bukti";
    confidenceExplanation = "Rentang jawaban identik terlalu panjang sehingga perbedaan antarposisi Model A tidak dapat dibaca secara layak.";
  } else if (quality.inconsistencyScore > 1.35) {
    confidence = "rendah";
    confidenceExplanation = "Pola respons menunjukkan ketidakstabilan yang cukup besar; hasil sebaiknya diuji ulang pada waktu berbeda.";
  } else if (unresolvedPair || separation < 1.5) {
    confidence = "tentatif";
    confidenceExplanation = "Dua kandidat teratas masih sangat berdekatan dan membutuhkan pertanyaan pembeda tambahan.";
  } else if (separation < 3 || coverage.ratio < 1) {
    confidence = "sedang";
    confidenceExplanation = "Satu kandidat mulai unggul, tetapi beberapa pembeda atau replikasi masih belum cukup kuat.";
  } else if (separation >= 6 && top1.holdoutScore >= 70 && quality.inconsistencyScore < 0.65) {
    confidence = "kuat";
    confidenceExplanation = "Kandidat teratas terpisah cukup jelas, sel inti tercakup, dan jawaban holdout relatif selaras.";
  } else {
    confidence = "cukup kuat";
    confidenceExplanation = "Kandidat teratas cukup konsisten dengan pola kanal Model A, dengan ketidakpastian yang masih wajar.";
  }

  return {
    top3: candidateScores.slice(0, 3),
    confidence,
    confidenceExplanation,
    unresolvedPair,
    channelProfile: profile,
    coverage,
    auditNotes,
    responseQuality: quality,
  };
}

```

## src/session/sessionState.ts

```ts
import type { TestSession } from "../types/socionics";

export function applyAnswer(
  session: TestSession,
  questionId: string,
  rating: number,
  advance: boolean,
): TestSession {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new RangeError(`Rating harus bilangan bulat 1–5, menerima ${rating}.`);
  }
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }

  return {
    ...session,
    answers: { ...session.answers, [questionId]: rating },
    skippedIds: session.skippedIds.filter((id) => id !== questionId),
    currentIndex: advance
      ? Math.min(session.currentIndex + 1, session.questionIds.length - 1)
      : session.currentIndex,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function applySkip(session: TestSession, questionId: string): TestSession {
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Pertanyaan ${questionId} tidak ada di sesi aktif.`);
  }
  const { [questionId]: _removedAnswer, ...remainingAnswers } = session.answers;
  return {
    ...session,
    answers: remainingAnswers,
    skippedIds: Array.from(new Set([...session.skippedIds, questionId])),
    currentIndex: Math.min(session.currentIndex + 1, session.questionIds.length - 1),
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function moveToQuestion(session: TestSession, index: number): TestSession {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) {
    return session;
  }
  return { ...session, currentIndex: index, lastUpdatedAt: new Date().toISOString() };
}

```

## src/hooks/useTestSession.ts

```ts
import { useCallback, useEffect, useMemo, useState } from "react";
import type { InformationElement, MeasurementChannel, SocionicsQuestion, TestSession } from "../types/socionics";
import { ALL_QUESTIONS, getCoreQuestions, getHoldoutQuestions, getQuestionById } from "../data/questions";
import { getTieBreakQuestionsForPair } from "../data/tieBreakQuestions";
import { applyAnswer, applySkip, moveToQuestion } from "../session/sessionState";

const STORAGE_KEY = "socionics_dalam_diriku_session_v2";
const LEGACY_STORAGE_KEY = "socionics_dalam_diriku_session_v1";
const ELEMENTS: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const CHANNELS: MeasurementChannel[] = ["producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"];

function createLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function shuffleDeterministic<T>(items: readonly T[], seed: number): T[] {
  const random = createLcg(seed);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function spreadSimilarItems(items: SocionicsQuestion[], seed: number): SocionicsQuestion[] {
  const pool = shuffleDeterministic(items, seed);
  const result: SocionicsQuestion[] = [];

  while (pool.length > 0) {
    const previous = result[result.length - 1];
    let chosenIndex = pool.findIndex((candidate) =>
      !previous || (candidate.element !== previous.element && candidate.channel !== previous.channel),
    );
    if (chosenIndex < 0) {
      chosenIndex = pool.findIndex((candidate) => !previous || candidate.element !== previous.element);
    }
    if (chosenIndex < 0) chosenIndex = 0;
    result.push(pool.splice(chosenIndex, 1)[0]);
  }

  return result;
}

function groupCoreByCell(): Map<string, SocionicsQuestion[]> {
  const map = new Map<string, SocionicsQuestion[]>();
  for (const question of getCoreQuestions()) {
    const key = `${question.element}_${question.channel}`;
    const group = map.get(key) ?? [];
    group.push(question);
    map.set(key, group);
  }
  for (const group of map.values()) group.sort((left, right) => left.id.localeCompare(right.id));
  return map;
}

function selectVariant(group: SocionicsQuestion[], seed: number, offset = 0): SocionicsQuestion {
  const index = Math.abs(seed + offset) % group.length;
  return group[index];
}

/**
 * Stratified selection guarantees at least one item in every element × channel cell.
 * Ringkas: 64 cells + 16 balanced replications = 80.
 * Standar: 64 cells + 48 balanced replications + 16 holdouts = 128.
 * Mendalam: all 192 core + 32 holdouts = 224, followed by up to two adaptive pair items.
 */
export function selectQuestionsForMode(
  mode: TestSession["mode"],
  seed: number,
): SocionicsQuestion[] {
  const cellMap = groupCoreByCell();
  const selected: SocionicsQuestion[] = [];

  if (mode === "mendalam") {
    selected.push(...getCoreQuestions(), ...getHoldoutQuestions());
    return spreadSimilarItems(selected, seed + 901);
  }

  const primaryByCell = new Map<string, SocionicsQuestion>();
  ELEMENTS.forEach((element, elementIndex) => {
    CHANNELS.forEach((channel, channelIndex) => {
      const key = `${element}_${channel}`;
      const group = cellMap.get(key);
      if (!group || group.length < 3) throw new Error(`Bank tidak lengkap pada sel ${key}.`);
      const primary = selectVariant(group, seed + elementIndex * 17 + channelIndex * 31);
      primaryByCell.set(key, primary);
      selected.push(primary);
    });
  });

  const offset = Math.abs(seed) % CHANNELS.length;

  if (mode === "ringkas") {
    ELEMENTS.forEach((element, elementIndex) => {
      const extraChannels = [
        CHANNELS[(elementIndex + offset) % CHANNELS.length],
        CHANNELS[(elementIndex + offset + 4) % CHANNELS.length],
      ];
      for (const channel of extraChannels) {
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      }
    });
  } else {
    // Add a second replication to six of eight cells per element. The omitted
    // channels rotate, so every channel receives the same total coverage.
    ELEMENTS.forEach((element, elementIndex) => {
      const omitted = new Set([
        (elementIndex + offset) % CHANNELS.length,
        (elementIndex + offset + 4) % CHANNELS.length,
      ]);
      CHANNELS.forEach((channel, channelIndex) => {
        if (omitted.has(channelIndex)) return;
        const key = `${element}_${channel}`;
        const group = cellMap.get(key)!;
        const primary = primaryByCell.get(key)!;
        selected.push(group.find((question) => question.id !== primary.id)!);
      });
    });

    const shuffledHoldouts = shuffleDeterministic(getHoldoutQuestions(), seed + 113);
    ELEMENTS.forEach((element) => {
      selected.push(...shuffledHoldouts.filter((question) => question.element === element).slice(0, 2));
    });
  }

  return spreadSimilarItems(selected, seed + 901);
}

function persist(session: TestSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function restoreSession(): TestSession | null {
  for (const key of [STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as Partial<TestSession>;
      if (!parsed.mode || !parsed.seed) continue;
      const questionIds = Array.isArray(parsed.questionIds)
        ? parsed.questionIds.filter((id): id is string => typeof id === "string" && Boolean(getQuestionById(id)))
        : selectQuestionsForMode(parsed.mode, parsed.seed).map((question) => question.id);
      const isLegacy = key === LEGACY_STORAGE_KEY || parsed.appVersion !== "2.0.0";
      const validQuestionIds = new Set(questionIds);
      const restoredAnswers = isLegacy
        ? {}
        : Object.fromEntries(
            Object.entries(parsed.answers ?? {}).filter(([id, value]) =>
              validQuestionIds.has(id) && typeof value === "number" && value >= 1 && value <= 5,
            ),
          );
      const restored: TestSession = {
        mode: parsed.mode,
        answers: restoredAnswers,
        skippedIds: isLegacy ? [] : (parsed.skippedIds ?? []).filter((id) => validQuestionIds.has(id)),
        questionIds,
        currentIndex: isLegacy ? 0 : Math.min(parsed.currentIndex ?? 0, Math.max(0, questionIds.length - 1)),
        startedAt: isLegacy ? new Date().toISOString() : (parsed.startedAt ?? new Date().toISOString()),
        lastUpdatedAt: new Date().toISOString(),
        seed: parsed.seed,
        appVersion: "2.0.0",
        completed: isLegacy ? false : Boolean(parsed.completed),
        tieBreakPair: isLegacy ? undefined : parsed.tieBreakPair,
      };
      persist(restored);
      if (key === LEGACY_STORAGE_KEY) localStorage.removeItem(LEGACY_STORAGE_KEY);
      return restored;
    } catch {
      localStorage.removeItem(key);
    }
  }
  return null;
}

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(restoreSession());
    setHydrated(true);
  }, []);

  const activeQuestions = useMemo(
    () => (session?.questionIds ?? []).map(getQuestionById).filter(Boolean) as SocionicsQuestion[],
    [session?.questionIds],
  );

  const commit = useCallback((next: TestSession): TestSession => {
    persist(next);
    setSession(next);
    return next;
  }, []);

  const startNewSession = useCallback((mode: TestSession["mode"]): TestSession => {
    const seed = Math.floor(Math.random() * 2_000_000_000) + 1;
    const now = new Date().toISOString();
    const questionIds = selectQuestionsForMode(mode, seed).map((question) => question.id);
    return commit({
      mode,
      answers: {},
      skippedIds: [],
      questionIds,
      currentIndex: 0,
      startedAt: now,
      lastUpdatedAt: now,
      seed,
      appVersion: "2.0.0",
      completed: false,
    });
  }, [commit]);

  const answerQuestion = useCallback((questionId: string, rating: number, advance = true): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applyAnswer(session, questionId, rating, advance));
    } catch (error) {
      console.error("Jawaban gagal disimpan", error);
      return null;
    }
  }, [commit, session]);

  const skipQuestion = useCallback((questionId: string): TestSession | null => {
    if (!session) return null;
    try {
      return commit(applySkip(session, questionId));
    } catch (error) {
      console.error("Pertanyaan gagal dilewati", error);
      return null;
    }
  }, [commit, session]);

  const goToQuestion = useCallback((index: number, baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    const next = moveToQuestion(source, index);
    return next === source ? source : commit(next);
  }, [commit, session]);

  const appendTieBreakQuestions = useCallback((pair: string, baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    const newIds = getTieBreakQuestionsForPair(pair)
      .map((question) => question.id)
      .filter((id) => !source.questionIds.includes(id));
    if (newIds.length === 0) return source;
    return commit({
      ...source,
      questionIds: [...source.questionIds, ...newIds],
      currentIndex: source.questionIds.length,
      completed: false,
      tieBreakPair: pair,
      lastUpdatedAt: new Date().toISOString(),
    });
  }, [commit, session]);

  const completeSession = useCallback((baseSession?: TestSession): TestSession | null => {
    const source = baseSession ?? session;
    if (!source) return null;
    return commit({ ...source, completed: true, lastUpdatedAt: new Date().toISOString() });
  }, [commit, session]);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setSession(null);
  }, []);

  const currentIndex = session?.currentIndex ?? 0;
  return {
    session,
    activeQuestions,
    currentQuestion: activeQuestions[currentIndex],
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: activeQuestions.length > 0 && currentIndex === activeQuestions.length - 1,
    startNewSession,
    answerQuestion,
    skipQuestion,
    goToQuestion,
    appendTieBreakQuestions,
    completeSession,
    resetSession,
    isSessionLoaded: hydrated,
    allQuestions: ALL_QUESTIONS,
  };
}

```