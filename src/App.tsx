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
