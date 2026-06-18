/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Brain,
  Compass,
  Activity,
  Sliders,
  Shield,
  Heart,
  Target,
  Check,
  RotateCcw,
  Download,
  Upload,
  BookOpen,
  Info,
  Users,
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  AlertTriangle,
  X,
  Menu,
  Lock,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

import { useTestSession } from "./hooks/useTestSession";
import { TIM_MODELS, TIM_PROFILES, QUADRA_DATA, INTERTYPE_MAP, INTERTYPE_RELATIONS_METADATA, ELEMENTS_METADATA } from "./constants/socionicsData";
import { ALL_QUESTIONS } from "./data/questions";
import { calculateResult } from "./scoring/engine";
import { TIM, TIMProfile, InformationElement, MeasurementChannel, ModelAPosition, Quadra, TestSession } from "./types/socionics";
import { getCasualVersion, getOptionDetail } from "./utils/optionDetails";
import { runInstrumentAudit } from "./audit/instrumentAudit";

// Option Scale Wording by ScaleType
const SCALE_OPTIONS_MAP: Record<string, { val: number; label: string }[]> = {
  automaticity: [
    { val: 1, label: "Tidak muncul secara alami" },
    { val: 2, label: "Harus kupikirkan cukup lama" },
    { val: 3, label: "Tergantung keadaan" },
    { val: 4, label: "Cukup spontan" },
    { val: 5, label: "Muncul hampir tanpa usaha" }
  ],
  comfort: [
    { val: 1, label: "Sangat menguras tenaga" },
    { val: 2, label: "Cukup tidak nyaman" },
    { val: 3, label: "Netral atau tergantung situasi" },
    { val: 4, label: "Cukup nyaman" },
    { val: 5, label: "Sangat nyaman" }
  ],
  threat: [
    { val: 1, label: "Sama sekali tidak mengganggu" },
    { val: 2, label: "Sedikit mengganggu" },
    { val: 3, label: "Cukup menekan" },
    { val: 4, label: "Sangat menekan" },
    { val: 5, label: "Membuatku beku, defensif, malu, atau menghindar" }
  ],
  relief: [
    { val: 1, label: "Tidak membantu" },
    { val: 2, label: "Sedikit membantu" },
    { val: 3, label: "Lumayan membantu" },
    { val: 4, label: "Sangat membantu" },
    { val: 5, label: "Sangat melegakan batin harian" }
  ],
  recognition: [
    { val: 1, label: "Tidak berarti" },
    { val: 2, label: "Sedikit berarti" },
    { val: 3, label: "Cukup menyenangkan" },
    { val: 4, label: "Sangat berarti" },
    { val: 5, label: "Menyentuh kebutuhan terdalam batin" }
  ],
  frequency: [
    { val: 1, label: "Tidak pernah" },
    { val: 2, label: "Jarang" },
    { val: 3, label: "Kadang-kadang" },
    { val: 4, label: "Sering" },
    { val: 5, label: "Hampir selalu" }
  ],
  competence: [
    { val: 1, label: "Sangat kesulitan" },
    { val: 2, label: "Cukup kesulitan" },
    { val: 3, label: "Bisa dalam keadaan tertentu" },
    { val: 4, label: "Cukup mampu" },
    { val: 5, label: "Sangat mampu" }
  ],
  importance: [
    { val: 1, label: "Sama sekali tidak penting" },
    { val: 2, label: "Kurang penting" },
    { val: 3, label: "Tergantung keadaan" },
    { val: 4, label: "Penting" },
    { val: 5, label: "Sangat penting" }
  ],
  comparison: [
    { val: 1, label: "Jauh lebih dekat B" },
    { val: 2, label: "Agak lebih dekat B" },
    { val: 3, label: "Sama dekat" },
    { val: 4, label: "Agak lebih dekat A" },
    { val: 5, label: "Jauh lebih dekat A" }
  ]
};

/// Option details are now loaded dynamically from src/utils/optionDetails.ts

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "test" | "review" | "result" | "method" | "references" | "audit">("landing");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Local temporary states for redesigned automatic test flow
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [expandedRating, setExpandedRating] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  const {
    session,
    activeQuestions,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    startNewSession,
    answerQuestion,
    skipQuestion,
    goToQuestion,
    appendTieBreakQuestions,
    completeSession,
    resetSession
  } = useTestSession();

  // Clear timeout on unmount or cleanup
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Handle auto-redirection on fresh completion
  useEffect(() => {
    if (session?.completed) {
      setCurrentPage("result");
    }
  }, [session?.completed]);

  const finishOrExtendSession = (baseSession: TestSession) => {
    const provisional = calculateResult(baseSession.answers, ALL_QUESTIONS, {
      startedAt: baseSession.startedAt,
      questionIds: baseSession.questionIds,
    });

    if (provisional.unresolvedPair && !baseSession.tieBreakPair) {
      const extended = appendTieBreakQuestions(provisional.unresolvedPair, baseSession);
      if (extended && extended.questionIds.length > baseSession.questionIds.length) {
        setCurrentPage("test");
        return;
      }
    }

    completeSession(baseSession);
    setCurrentPage("result");
  };

  // One tap saves immediately. The information icon remains a separate control.
  const handleOptionSelect = (val: number) => {
    if (isTransitioning || !currentQuestion || !session) return;

    setSelectedRating(val);
    const savedSession = answerQuestion(currentQuestion.id, val, false);
    if (!savedSession) return;

    setIsTransitioning(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReducedMotion ? 60 : 420;

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setExpandedRating(null);

      if (isLastQuestion) {
        finishOrExtendSession(savedSession);
      } else {
        goToQuestion(savedSession.currentIndex + 1, savedSession);
      }

      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, delay);
  };

  const handleSkipCurrentQuestion = () => {
    if (isTransitioning || !currentQuestion || !session) return;
    const savedSession = skipQuestion(currentQuestion.id);
    if (!savedSession) return;
    setExpandedRating(null);
    setSelectedRating(null);
    if (isLastQuestion) finishOrExtendSession(savedSession);
  };

  const handleInfoClick = (e: React.MouseEvent, val: number) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedRating((current) => (current === val ? null : val));
  };

  // Synchronize local selected rating and hide explanation panel on question/index change
  useEffect(() => {
    if (currentPage === "test" && currentQuestion) {
      const saved = session?.answers[currentQuestion.id] || null;
      setSelectedRating(saved);
      setExpandedRating(null); // Keep explanation closed by default!
      
      // Gentle scroll to the active question Card
      if (questionRef.current) {
        questionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentPage, currentQuestion?.id, session?.currentIndex]);

  // Keyboard Event Listeners for Test (1 to 5 keys to instantly select, arrow keys to slide page)
  useEffect(() => {
    if (currentPage !== "test" || !currentQuestion || isTransitioning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "5") {
        const rating = parseInt(e.key);
        handleOptionSelect(rating);
      } else if (e.key === "ArrowLeft" && !isFirstQuestion) {
        goToQuestion(session!.currentIndex - 1);
      } else if (e.key === "ArrowRight" && !isLastQuestion) {
        skipQuestion(currentQuestion.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, currentQuestion?.id, isFirstQuestion, isLastQuestion, selectedRating, session, isTransitioning]);

  // Compute assessment outputs
  const handledCount = session
    ? Object.keys(session.answers).length + session.skippedIds.length
    : 0;
  const allSessionItemsHandled = Boolean(
    session && activeQuestions.length > 0 && handledCount >= activeQuestions.length,
  );

  const calculatedOutput = useMemo(() => {
    if (!session || Object.keys(session.answers).length < 2) return null;
    return calculateResult(session.answers, ALL_QUESTIONS, {
      startedAt: session.startedAt,
      questionIds: session.questionIds,
    });
  }, [session]);

  // Card Uploader assets
  const [cardNickname, setCardNickname] = useState("");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const cardCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawResultCard = () => {
    const canvas = cardCanvasRef.current;
    if (!canvas || !calculatedOutput) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const top1 = calculatedOutput.top3[0];
    const topModel = TIM_MODELS[top1.type];

    // Clear and fill canvas vertical space
    ctx.clearRect(0, 0, 1080, 1920);

    // Outer Background
    ctx.fillStyle = theme === "dark" ? "#0b1329" : "#f8fafc";
    ctx.fillRect(0, 0, 1080, 1920);

    // Gradient corner lighting
    const grad = ctx.createRadialGradient(540, 960, 50, 540, 960, 1000);
    grad.addColorStop(0, theme === "dark" ? "#132b4f" : "#ecfdf5");
    grad.addColorStop(1, theme === "dark" ? "#030712" : "#f1f5f9");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Frame borders
    ctx.strokeStyle = theme === "dark" ? "#10b981" : "#059669";
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, 1000, 1840);

    // Inner subtle guidelines
    ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 960, 1800);

    // Header Title
    ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
    ctx.font = "bold 64px Space Grotesk";
    ctx.textAlign = "center";
    ctx.fillText("KARTU COGNITIVE TIPOLOGI", 540, 160);

    ctx.font = "bold 28px JetBrains Mono";
    ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
    ctx.fillText("SOCIONICS DALAM DIRIKU • MODEL A", 540, 215);

    // Sub Title
    ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
    ctx.font = "22px Inter";
    ctx.fillText("Aplikasi Asesmen Mandiri - Bukan Identitas Resmi Negara", 540, 255);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
    ctx.beginPath();
    ctx.moveTo(150, 290);
    ctx.lineTo(930, 290);
    ctx.stroke();

    // Portrait Section
    const drawPortrait = () => {
      const px = 540 - 150;
      const py = 330;
      const pw = 300;
      const ph = 300;

      // Card Photo Inner Shadow Border
      ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.4)" : "rgba(5, 150, 105, 0.4)";
      ctx.lineWidth = 6;
      ctx.strokeRect(px - 10, py - 10, pw + 20, ph + 20);

      if (cardImage) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, px, py, pw, ph);
          drawMetas();
        };
        img.src = cardImage;
      } else {
        // Fallback Vector
        ctx.fillStyle = theme === "dark" ? "#111827" : "#e2e8f0";
        ctx.fillRect(px, py, pw, ph);

        ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
        ctx.font = "bold 110px Space Grotesk";
        ctx.fillText(top1.type, 540, 500);

        ctx.font = "20px JetBrains Mono";
        ctx.fillStyle = "rgba(100, 116, 139, 0.8)";
        ctx.fillText("No Image Uploaded", 540, 550);
        drawMetas();
      }
    };

    const drawMetas = () => {
      // Nickname
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 44px Space Grotesk";
      ctx.fillText(cardNickname ? cardNickname.toUpperCase() : "PARTICIPANT", 540, 710);

      // Main TIM Title
      ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
      ctx.font = "bold 88px Space Grotesk";
      ctx.fillText(`${top1.type} • ${topModel.name}`, 540, 830);

      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "34px Inter";
      ctx.fillText(topModel.fullName, 540, 890);

      // Metadata Pill Box
      ctx.fillStyle = theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.1)";
      ctx.fillRect(150, 930, 780, 120);
      ctx.strokeStyle = theme === "dark" ? "rgba(16, 185, 129, 0.3)" : "rgba(5, 150, 105, 0.3)";
      ctx.strokeRect(150, 930, 780, 120);

      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "26px JetBrains Mono";
      ctx.fillText(`Quadra: ${topModel.quadra}  |  Club: ${topModel.club}  |  Dual: ${topModel.dual}`, 540, 1000);

      // Model A Grid (Simplified for Card)
      ctx.textAlign = "left";
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 34px Space Grotesk";
      ctx.fillText("FUNGSI MODEL A UTAMA:", 150, 1120);

      const positions: { key: ModelAPosition; title: string }[] = [
        { key: "Base", title: "1. Leading / Base" },
        { key: "Creative", title: "2. Creative" },
        { key: "Role", title: "3. Role" },
        { key: "Vulnerable", title: "4. Vulnerable / PoLR" },
        { key: "Suggestive", title: "5. Suggestive" },
        { key: "Mobilizing", title: "6. Mobilizing" },
        { key: "Ignoring", title: "7. Ignoring" },
        { key: "Demonstrative", title: "8. Demonstrative" }
      ];

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";

      positions.forEach((pos, idx) => {
        const el = topModel.positions[pos.key];
        const row = Math.floor(idx / 2);
        const col = idx % 2;

        const x = 150 + col * 400;
        const y = 1170 + row * 130;

        // Position cell backing
        ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
        ctx.fillRect(x, y, 380, 100);
        ctx.strokeRect(x, y, 380, 100);

        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.font = "20px JetBrains Mono";
        ctx.fillText(pos.title, x + 15, y + 40);

        ctx.fillStyle = theme === "dark" ? "#10b981" : "#059669";
        ctx.font = "bold 38px Space Grotesk";
        ctx.fillText(`${el} (${ELEMENTS_METADATA[el].name.split(" ")[0]})`, x + 15, y + 80);
      });

      // Bottom confidence seal
      ctx.textAlign = "center";
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#0f172a";
      ctx.font = "bold 26px Space Grotesk";
      ctx.fillText(`Indeks kecocokan: ${top1.fitScore}%  |  Verifikasi holdout: ${top1.holdoutScore}%`, 540, 1720);

      ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
      ctx.font = "20px JetBrains Mono";
      const timestamp = new Date(session!.lastUpdatedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
      ctx.fillText(`Timestamp: ${timestamp}  |  Scoring Engine v2.0.0`, 540, 1770);
    };

    drawPortrait();
  };

  const handleDownloadCard = () => {
    drawResultCard();
    setTimeout(() => {
      const canvas = cardCanvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Socionics_Dalam_Diriku_${cardNickname || "hasil"}.png`;
      link.href = dataUrl;
      link.click();
    }, 200);
  };

  // Integrity checks
  const auditReport = useMemo(() => runInstrumentAudit(200), []);

  // UI state for detailed view tabs
  const [activeModelAPos, setActiveModelAPos] = useState<ModelAPosition | null>("Base");
  const [compareTIM, setCompareTIM] = useState<TIM | "">("");
  const [intertypeTarget, setIntertypeTarget] = useState<TIM>("SEI");

  // Dynamic selection lists
  const availableTIMs = Object.keys(TIM_MODELS) as TIM[];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* GLOBAL BACKGROUND CANVAS RENDERER FOR CARDS */}
      <canvas ref={cardCanvasRef} width="1080" height="1920" className="hidden" />

      {/* HEADER BAR */}
      <header className={`sticky top-0 z-50 border-b no-print ${theme === "dark" ? "bg-slate-900/90 border-slate-800 backdrop-blur-md" : "bg-white/90 border-slate-200 backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer" onClick={() => setCurrentPage("landing")}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              <Brain className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <span className="text-base md:text-xl font-display font-bold tracking-tight">Socionics Dalam Diriku</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">MODEL A</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <button onClick={() => setCurrentPage("landing")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "landing" ? "text-emerald-500" : ""}`}>Beranda</button>
            {session && (
              <button onClick={() => setCurrentPage("test")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "test" ? "text-emerald-500" : ""}`}>Asesmen</button>
            )}
            {calculatedOutput && (
              <button onClick={() => setCurrentPage("result")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "result" ? "text-emerald-500" : ""}`}>Hasil</button>
            )}
            <button onClick={() => setCurrentPage("method")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "method" ? "text-emerald-500" : ""}`}>Metodologi</button>
            <button onClick={() => setCurrentPage("references")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "references" ? "text-emerald-500" : ""}`}>Referensi</button>
            <button onClick={() => setCurrentPage("audit")} className={`text-sm font-medium transition hover:text-emerald-500 ${currentPage === "audit" ? "text-emerald-500" : ""}`}>Audit</button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-11 h-11 lg:w-auto lg:h-auto min-w-[44px] min-h-[44px] px-0 lg:px-3 lg:py-2 flex items-center justify-center rounded-lg border transition text-sm ${
                theme === "dark" ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              }`}
              aria-label="Ubah Tema"
            >
              <span className="lg:hidden">{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="hidden lg:inline">{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              className={`lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border transition ${
                theme === "dark" ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-2 pb-4 space-y-2 border-t no-print ${
            theme === "dark" ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900 shadow-lg"
          }`}>
            <button onClick={() => { setCurrentPage("landing"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Beranda</button>
            {session && (
              <button onClick={() => { setCurrentPage("test"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Asesmen</button>
            )}
            {calculatedOutput && (
              <button onClick={() => { setCurrentPage("result"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Hasil</button>
            )}
            <button onClick={() => { setCurrentPage("method"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Metodologi</button>
            <button onClick={() => { setCurrentPage("references"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Referensi</button>
            <button onClick={() => { setCurrentPage("audit"); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>Audit</button>
          </div>
        )}
      </header>

      {/* CORE CONTENT SWITCH */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LANDING PAGE */}
        {currentPage === "landing" && (
          <div className="max-w-4xl mx-auto text-center space-y-12 py-10">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 text-xs sm:text-sm font-mono mx-auto">
                <Compass className="w-4 h-4" />
                <span>TES REFLEKSI SOCIONICS MODEL A</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
                Temukan Struktur Kognitif <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  Model A Socionics
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Tes refleksi berbasis 64 kanal Model A, item verifikasi, dan pemeriksaan konsistensi untuk membaca pola jawabanmu dengan lebih hati-hati.
              </p>
            </div>

            {/* Session status reload box */}
            {session && (
              <div className={`p-6 rounded-xl border max-w-md mx-auto space-y-4 ${
                theme === "dark" ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-950"
              }`}>
                <div className={`flex items-center justify-center space-x-3 font-medium ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
                  <Activity className="w-5 h-5 animate-pulse" />
                  <span>Tesmu masih tersimpan</span>
                </div>
                <div className={`text-xs font-mono ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Selesai: {Object.keys(session.answers).length} / {activeQuestions.length} Soal | Mode: {session.mode.toUpperCase()}
                </div>
                <div className="flex justify-center space-x-3">
                  <button onClick={() => setCurrentPage("test")} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition shadow cursor-pointer">
                    Lanjutkan Tes
                  </button>
                  <button onClick={resetSession} className={`font-medium px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                    theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-100 hover:bg-slate-200 text-slate-850 border border-slate-200 shadow-sm"
                  }`}>
                    Mulai Baru
                  </button>
                </div>
              </div>
            )}

            {!session && (
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                {[
                  { mode: "ringkas", label: "Mode Ringkas", count: "80 Soal", desc: "Seluruh 64 elemen-kanal tetap tercakup, ditambah 16 replikasi seimbang. Estimasi 10–14 menit." },
                  { mode: "standar", label: "Mode Standar", count: "128 Soal", desc: "Cakupan penuh, replikasi lintas konteks, dan 16 item holdout. Estimasi 18–24 menit." },
                  { mode: "mendalam", label: "Mode Mendalam", count: "224–226 Soal", desc: "Semua 192 core dan 32 holdout; dua pembeda adaptif muncul hanya bila kandidat sangat dekat. Estimasi 32–45 menit." }
                ].map((m) => (
                  <div key={m.mode} className={`p-6 rounded-xl border space-y-4 hover:border-emerald-500/30 transition shadow-lg flex flex-col justify-between ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/50 text-slate-100" : "border-slate-200 bg-white text-slate-900 shadow-sm"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{m.label}</h3>
                        <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full font-mono font-bold">{m.count}</span>
                      </div>
                      <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>{m.desc}</p>
                    </div>
                    <button
                      onClick={() => startNewSession(m.mode as any)}
                      className={`w-full font-bold py-2 rounded-lg text-sm transition mt-4 cursor-pointer ${
                        theme === "dark"
                          ? "bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200"
                          : "bg-slate-100 hover:bg-emerald-500 hover:text-slate-950 text-slate-800 border border-slate-205 shadow-sm"
                      }`}
                    >
                      Pilih Mode
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy and Ethics notice */}
            <div className={`grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-xs border-t pt-8 text-left ${
              theme === "dark" ? "text-slate-500 border-slate-900" : "text-slate-600 border-slate-200"
            }`}>
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                <p>
                  <strong>DATAMU TETAP LOKAL:</strong> Jawaban dan foto opsional diproses di perangkatmu. Aplikasi tidak mengirimkannya ke server.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-slate-500 shrink-0" />
                <p>
                  <strong>BATAS TES:</strong> Ini alat refleksi tipologi, bukan diagnosis, penilaian nilai diri, atau keputusan klinis.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-4">
              <button onClick={() => setCurrentPage("method")} className={`inline-flex items-center space-x-1 text-xs transition cursor-pointer ${
                theme === "dark" ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-700"
              }`}>
                <Sliders className="w-3.5 h-3.5" />
                <span>Lihat cara penilaian</span>
              </button>
              <button onClick={() => setCurrentPage("references")} className={`inline-flex items-center space-x-1 text-xs transition cursor-pointer ${
                theme === "dark" ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-700"
              }`}>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lihat rujukan</span>
              </button>
            </div>
          </div>
        )}

        {/* TEST SESSIONS SCRIPT */}
        {currentPage === "test" && currentQuestion && session && (
          <div className="max-w-2xl mx-auto space-y-8">
            
            {/* Header progress info */}
            <div className={`flex items-center justify-between border-b pb-4 text-xs font-mono ${
              theme === "dark" ? "border-slate-905 text-slate-400" : "border-slate-200 text-slate-600"
            }`}>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-emerald-500" />
                <span>Bagian: Pola respons sehari-hari</span>
              </div>
              <div>
                Pertanyaan <span className="text-emerald-500 font-bold">{session.currentIndex + 1}</span> dari <span className="font-bold">{activeQuestions.length}</span>
              </div>
            </div>

            {/* Progress Meter bar */}
            <div className={`w-full h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-slate-900" : "bg-slate-200"}`}>
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${((session.currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Scenarios / Statement Display */}
            <div
              ref={questionRef}
              className={`p-8 rounded-2xl border space-y-6 shadow-xl relative overflow-hidden ${
                theme === "dark" ? "border-slate-850 bg-slate-900/40 text-slate-100" : "border-slate-205 bg-white text-slate-800 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-mono font-bold">
                  Versi Kasual
                </span>
                <p className={`text-lg sm:text-xl font-medium leading-relaxed font-sans ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {getCasualVersion(currentQuestion)}
                </p>
              </div>

              <details className={`border-t pt-4 group ${
                theme === "dark" ? "border-slate-800/85" : "border-slate-100"
              }`}>
                <summary className={`cursor-pointer text-xs select-none ${
                  theme === "dark" ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"
                }`}>
                  Lihat kalimat asli
                </summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-mono font-bold">
                      Situasi
                    </span>
                    <p className={`mt-1 text-sm leading-relaxed ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {currentQuestion.scenario}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-teal-500 font-mono font-bold">
                      Respons atau Sikapmu
                    </span>
                    <p className={`mt-1 text-sm leading-relaxed ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}>
                      {currentQuestion.statement}
                    </p>
                  </div>
                </div>
              </details>
            </div>

            {/* SCALE RESPONSE CHOICES BUTTONS */}
            <div className="space-y-4">
              
              {/* Responsive compact instruction header */}
              <div className={`text-center text-xs md:text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"} max-w-md mx-auto transition-all`}>
                {session.currentIndex >= 3 ? (
                  <span className="opacity-75">Ketuk jawabanmu.</span>
                ) : (
                  <span>Ketuk jawabanmu. Tekan <span className="text-emerald-500 font-bold font-mono">(i)</span> untuk melihat penjelasan.</span>
                )}
              </div>

              {/* Compact 5-column responsive Likert Grid */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5" role="radiogroup" aria-label="Skala Pilihan Jawaban">
                {(SCALE_OPTIONS_MAP[currentQuestion.scaleType] || SCALE_OPTIONS_MAP.frequency).map((opt) => {
                  const isSelected = selectedRating === opt.val;
                  const isExpanded = expandedRating === opt.val;
                  return (
                    <div
                      key={opt.val}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleOptionSelect(opt.val);
                        }
                      }}
                      onClick={() => handleOptionSelect(opt.val)}
                      className={`relative p-1.5 sm:p-2.5 rounded-xl border text-center flex flex-col items-center justify-between transition-all duration-300 cursor-pointer select-none group min-h-[82px] sm:min-h-[105px] focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.22)] scale-[1.01]"
                            : "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm scale-[1.01]"
                          : isExpanded
                            ? theme === "dark"
                              ? "border-teal-500/80 bg-teal-950/20 text-teal-300"
                              : "border-teal-500 bg-teal-50/50 text-teal-800 shadow-xs"
                            : theme === "dark"
                              ? "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {/* Interactive (i) indicator toggle */}
                      <button
                        type="button"
                        onClick={(e) => handleInfoClick(e, opt.val)}
                        className={`absolute top-0.5 right-0.5 p-1 rounded-full transition-all duration-200 cursor-pointer ${
                          isExpanded
                            ? "text-teal-400 bg-teal-950/55 scale-110"
                            : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800/10"
                        }`}
                        aria-label={`Maksud rincian opsi ${opt.val}`}
                        title="Lihat rincian maksud"
                      >
                        <Info className="w-3.5 h-3.5 shrink-0" />
                      </button>

                      {/* Score Value circle / checkmark badge */}
                      <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs md:text-sm border transition-all duration-350 ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md scale-105"
                            : "bg-emerald-600 text-white border-emerald-500 font-extrabold shadow-xs"
                          : isExpanded
                            ? "bg-teal-500 text-slate-950 border-teal-400 font-bold"
                            : theme === "dark"
                              ? "border-slate-700 bg-slate-800 text-slate-300 group-hover:border-slate-600"
                              : "border-slate-250 bg-slate-50 text-slate-700 group-hover:border-slate-300 shadow-xs"
                      }`}>
                        {isSelected ? (
                          <span className="flex items-center justify-center">
                            <Check className="w-3 h-3 sm:w-4.5 sm:h-4.5 text-current shrink-0 stroke-[3]" />
                          </span>
                        ) : (
                          opt.val
                        )}
                      </span>

                      {/* Custom styled 2-3 lines description with line clamp */}
                      <span className="text-[9px] sm:text-[10px] font-medium leading-tight text-center mt-1 sm:mt-1.5 tracking-tight break-words max-w-full block line-clamp-2 sm:line-clamp-3">
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Feedbacks visual for auto-saving event */}
              {isTransitioning && (
                <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-500 font-medium animate-pulse py-1">
                  <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                  <span>Jawaban tersimpan. Lanjut ke soal berikutnya...</span>
                </div>
              )}

              {/* Redesigned Compact Accordion Explanation Panel */}
              {expandedRating !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`p-4 rounded-xl border space-y-3 shadow-md overflow-hidden transition-all ${
                    theme === "dark"
                      ? "bg-slate-900/60 border-slate-800 text-slate-200"
                      : "bg-teal-50/10 border-teal-500/15 text-slate-800 shadow-sm"
                  }`}
                >
                  <div
                    onClick={() => setExpandedRating(null)}
                    className="flex items-center justify-between cursor-pointer border-b pb-1.5 select-none group/header"
                    title="Klik untuk menutup"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs sm:text-sm font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}>
                        {(SCALE_OPTIONS_MAP[currentQuestion.scaleType] || SCALE_OPTIONS_MAP.frequency).find(o => o.val === expandedRating)?.label || "Penjelasan"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-slate-800/10 transition text-slate-400 group-hover/header:text-slate-200"
                      aria-label="Tutup panel"
                    >
                      <ChevronUp className="w-4 h-4 shrink-0" />
                    </button>
                  </div>

                  {(() => {
                    const detail = getOptionDetail(currentQuestion, expandedRating);
                    return (
                      <div className="space-y-3.5 text-xs sm:text-sm">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Artinya</span>
                          <p className={`leading-relaxed ${theme === "dark" ? "text-slate-350" : "text-slate-600"}`}>
                            {detail?.artinya}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">Reaksi</span>
                          <p className={`leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-650"}`}>
                            {detail?.reaksi}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className={`pt-6 border-t space-y-4 ${theme === "dark" ? "border-slate-900" : "border-slate-200"}`}>
              {/* Primary Nav Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
                <button
                  onClick={() => goToQuestion(session.currentIndex - 1)}
                  disabled={isFirstQuestion}
                  className={`w-full sm:w-auto px-5 py-3 text-sm font-medium rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center space-x-2 ${
                    theme === "dark"
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                      : "bg-white border-slate-205 text-slate-750 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span>Kembali</span>
                </button>

                <button
                  onClick={handleSkipCurrentQuestion}
                  className={`w-full sm:w-auto px-5 py-3 text-sm font-semibold rounded-xl border transition cursor-pointer flex items-center justify-center space-x-2 ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-300"
                      : "border-slate-205 bg-white hover:bg-slate-50 text-slate-705 shadow-sm"
                  }`}
                >
                  <span>Lewati Soal</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Utility Nav Buttons (Tinjau, Jeda, Selesaikan) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 w-full border-t border-slate-200/40 dark:border-slate-800/40">
                <button
                  onClick={() => {
                    if (window.confirm("Ingin menjeda sesi tes? Jawabanmu tersimpan otomatis.")) {
                      setCurrentPage("landing");
                    }
                  }}
                  className={`w-full sm:w-auto text-xs font-mono px-3 py-2 border rounded-lg transition cursor-pointer flex items-center justify-center space-x-1 ${
                    theme === "dark"
                      ? "border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-900/20"
                      : "border-slate-205 text-slate-500 hover:text-slate-750 hover:bg-slate-50 bg-white shadow-sm"
                  }`}
                >
                  <span>Jeda & Simpan Tes</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentPage("review")}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-mono transition cursor-pointer border text-center ${
                      theme === "dark"
                        ? "bg-slate-900/50 hover:bg-slate-800 border-slate-800 text-slate-305"
                        : "bg-white hover:bg-slate-50 text-slate-605 border-slate-202 shadow-sm"
                    }`}
                  >
                    Tinjau Sesi ({Object.keys(session.answers).length}/{activeQuestions.length})
                  </button>

                  {allSessionItemsHandled && (
                    <button
                      onClick={() => finishOrExtendSession(session)}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition cursor-pointer shadow-md text-center"
                    >
                      Selesaikan Sesi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW SESSION SCREEN */}
        {currentPage === "review" && session && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold font-semibold">Tinjau Progress Menjawab</span>
              <h2 className="text-3xl font-display font-extrabold tracking-tight">Tinjauan Sesi Asesmen</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Berikut adalah rekam jejak jawaban Anda. Pastikan semua pertanyaan telah terisi untuk mendapatkan ketajaman interpretasi Model A yang lebih baik.
              </p>
            </div>

            {/* Quick stats panel */}
            <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              theme === "dark" ? "border-slate-850 bg-slate-900/60 text-white" : "border-slate-200 bg-white text-slate-800 shadow-sm"
            }`}>
              <div className="text-center sm:text-left space-y-1">
                <div className="text-xs font-mono text-slate-400">Total Progress Terjawab:</div>
                <div className="text-xl font-bold font-display">
                  {Object.keys(session.answers).length} dari {activeQuestions.length} Pertanyaan ({Math.round((Object.keys(session.answers).length / activeQuestions.length) * 100)}%)
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const firstUnansweredIdx = activeQuestions.findIndex(q => session.answers[q.id] === undefined);
                    goToQuestion(firstUnansweredIdx !== -1 ? firstUnansweredIdx : 0);
                    setCurrentPage("test");
                  }}
                  className={`w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg border transition cursor-pointer text-center ${
                    theme === "dark" ? "bg-slate-800 border-slate-750 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm"
                  }`}
                >
                  Lanjutkan Pengisian
                </button>
                <button
                  onClick={() => finishOrExtendSession(session)}
                  disabled={!allSessionItemsHandled}
                  title={allSessionItemsHandled ? "Selesaikan sesi" : "Jawab atau lewati seluruh pertanyaan terlebih dahulu"}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 px-5 py-2.5 rounded-lg font-bold text-sm transition cursor-pointer shadow text-center"
                >
                  {allSessionItemsHandled ? "Selesaikan & Lihat Hasil" : `Belum selesai (${handledCount}/${activeQuestions.length})`}
                </button>
              </div>
            </div>

            {/* Questions list (one by one downwards) */}
            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const ansVal = session.answers[q.id];
                const isAnswered = ansVal !== undefined;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                      isAnswered
                        ? theme === "dark" ? "bg-slate-900/20 border-slate-800" : "bg-emerald-50/10 border-emerald-100"
                        : theme === "dark" ? "bg-red-500/5 border-red-500/10" : "bg-red-50/20 border-red-100"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-450 bg-slate-850/10 px-2 py-0.5 rounded">
                          No. {idx + 1}
                        </span>
                        {!isAnswered && (
                          <span className="text-[10px] uppercase font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                            Belum Diisi
                          </span>
                        )}
                      </div>
                      
                      {q.scenario && (
                        <p className="text-xs text-slate-520">
                          <span className="font-semibold text-emerald-500 font-mono text-[10px] uppercase tracking-wider mr-1.5">Situasi</span> — {q.scenario}
                        </p>
                      )}
                      
                      <p className={`text-sm sm:text-base font-medium leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-850"}`}>
                        {q.statement}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                      {isAnswered ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400 font-mono mr-1">Skor Pilihan</span>
                          <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center font-mono text-sm">
                            {ansVal}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-red-400 italic">Dilewati</span>
                      )}

                      <button
                        onClick={() => {
                          goToQuestion(idx);
                          setCurrentPage("test");
                        }}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                          theme === "dark"
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-750"
                            : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm"
                        }`}
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Review page footer buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4">
              <button
                onClick={() => setCurrentPage("test")}
                className={`w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg border transition cursor-pointer text-center ${
                  theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
              >
                ← Kembali ke Tes
              </button>
              <button
                onClick={() => finishOrExtendSession(session)}
                disabled={!allSessionItemsHandled}
                title={allSessionItemsHandled ? "Selesaikan sesi" : "Jawab atau lewati seluruh pertanyaan terlebih dahulu"}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition cursor-pointer shadow text-center"
              >
                {allSessionItemsHandled ? "Selesaikan Tes & Lihat Analisis →" : `Belum selesai (${handledCount}/${activeQuestions.length})`}
              </button>
            </div>
          </div>
        )}

        {/* DETAILED RESULTS DASHBOARD */}
        {currentPage === "result" && calculatedOutput && (
          <div className="space-y-12">
            
            {/* Dossier top badge */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1 rounded-full font-mono">
                <Target className="w-4 h-4 animate-spin-slow" />
                <span>INTERPRETASI MODEL A SELESAI</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">Daftar Hasil Personal</h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Silakan periksa pola metabolisme informasi kognitif harian Anda berbasis scoring Model A di bawah ini.
              </p>
            </div>

            {/* TOP 3 candidates layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main candidate display */}
              <div className="lg:col-span-2 p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
                
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Kandidat Tipe Utama (Most Likely match):</span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                    <span className="text-5xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
                      {calculatedOutput.top3[0].type}
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-medium text-emerald-400">
                      {TIM_MODELS[calculatedOutput.top3[0].type].name}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-slate-400">
                    {TIM_MODELS[calculatedOutput.top3[0].type].fullName} | Quadra {TIM_MODELS[calculatedOutput.top3[0].type].quadra} | {calculatedOutput.top3[0].fitScore}% Kecocokan Relatif
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {TIM_PROFILES[calculatedOutput.top3[0].type].description}
                  </p>
                </div>

                {/* Top 3 relative matching table bar chart */}
                <div className="space-y-3.5 border-t border-slate-800 pt-6">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">Kecocokan Relatif Top 3 Model Kandidat:</span>
                  <div className="space-y-2.5">
                    {calculatedOutput.top3.map((cand) => (
                      <div key={cand.type} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="font-bold text-slate-300">
                            {cand.type} ({TIM_MODELS[cand.type].name})
                          </span>
                          <span>{cand.fitScore}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${cand.fitScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence banner */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Tingkat Keyakinan Tes: <span className="text-emerald-400">{calculatedOutput.confidence.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{calculatedOutput.confidenceExplanation}</p>
                  </div>
                </div>
              </div>

              {/* CARD GENERATOR EXPORTER CONTROLLER */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-6 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider font-display">
                    <Download className="w-4 h-4" />
                    <span>Ekspor Kartu Identitas Tipologi</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sediakan nama panggilan Anda dan unggah foto opsional (semua diproses murni di browser Anda harian) untuk menghasilkan kartu infografis.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-mono font-bold">Nama Panggilan</label>
                    <input
                      type="text"
                      id="nickname-input-privacy"
                      name="random_tipologi_nickname_field"
                      autoComplete="off"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-white font-mono"
                      placeholder="Contoh: Pengembara atau Anda"
                      value={cardNickname}
                      onChange={(e) => setCardNickname(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-mono font-bold">Unggah Foto Mandiri:</label>
                    <div className="border border-dashed border-slate-800 rounded p-4 text-center cursor-pointer hover:border-slate-700 hover:bg-slate-900/45 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="cardFilePortrait"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="cardFilePortrait" className="cursor-pointer space-y-1 block">
                        <Upload className="w-5 h-5 mx-auto text-slate-500" />
                        <span className="block text-[10px] text-slate-400 font-mono mt-1">Cari File Gambar (.jpg/.png)</span>
                      </label>
                    </div>
                  </div>

                  {cardImage && (
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-emerald-400">Gambar Terbaca (Selesai)</span>
                      <button onClick={() => setCardImage(null)} className="text-[10px] text-rose-400 hover:underline">Hapus</button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownloadCard}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg text-sm transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Unduh Kartu PNG</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE MODEL A GRID */}
            <div className={`space-y-6 border-t pt-10 ${theme === "dark" ? "border-slate-900" : "border-slate-205"}`}>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Visualisasi Arsitektur Mental:</span>
                <h3 className={`text-2xl sm:text-3xl font-display font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Grid Interaktif Model A</h3>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>
                  Klik di masing-masing kotak fungsi posisi Model A untuk menampilkan keterlaksanaan energinya dalam diri Anda menurut hasil asesmen.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* 4x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "Base", index: 1, title: "1. Base / Leading" },
                    { key: "Creative", index: 2, title: "2. Creative" },
                    { key: "Role", index: 3, title: "3. Role / Peran" },
                    { key: "Vulnerable", index: 4, title: "4. Vulnerable / PoLR" },
                    { key: "Suggestive", index: 5, title: "5. Suggestive" },
                    { key: "Mobilizing", index: 6, title: "6. Mobilizing" },
                    { key: "Ignoring", index: 7, title: "7. Ignoring" },
                    { key: "Demonstrative", index: 8, title: "8. Demonstrative" }
                  ].map((pos) => {
                    const top1 = calculatedOutput.top3[0];
                    const el = TIM_MODELS[top1.type].positions[pos.key];
                    const isSelected = activeModelAPos === pos.key;

                    return (
                      <button
                        key={pos.key}
                        onClick={() => setActiveModelAPos(isSelected ? null : (pos.key as ModelAPosition))}
                        className={`p-4 rounded-xl border text-left transition relative select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                          isSelected
                            ? theme === "dark"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 font-medium"
                              : "bg-emerald-500/5 border-emerald-500 text-emerald-700 font-semibold shadow-sm"
                            : theme === "dark"
                              ? "border-slate-850 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-305 hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                          <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>{pos.title}</span>
                          <span className={isSelected ? (theme === "dark" ? "text-emerald-400 font-bold" : "text-emerald-600 font-bold") : "text-slate-605"}>Pos {pos.index}</span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight ${theme === "dark" ? "" : "text-slate-900"}`}>
                          {el} ({ELEMENTS_METADATA[el].name.split(" ")[0]})
                        </div>
                        <div className={`text-[10px] font-mono truncate mt-1 ${theme === "dark" ? "text-slate-500" : "text-slate-450"}`}>
                          {ELEMENTS_METADATA[el].name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Position detail reader card with conditional toggle */}
                {activeModelAPos ? (
                  <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/30 text-slate-100" : "border-slate-200 bg-white text-slate-800 shadow-sm"
                  }`}>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center border-b pb-3 ${theme === "dark" ? "border-slate-800" : "border-slate-150"}`}>
                        <div className="flex items-center space-x-2">
                          <Info className="w-4 h-4 text-emerald-500" />
                          <h4 className={`text-base font-bold font-display ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                            Rincian Posisi {activeModelAPos}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-705"
                          }`}>
                            Tipe utama {calculatedOutput.top3[0].type}
                          </span>
                          <button
                            onClick={() => setActiveModelAPos(null)}
                            className={`p-1 rounded-full transition cursor-pointer hover:bg-slate-800/80 ${
                              theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                            title="Sembunyikan Informasi"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className={`space-y-4 text-xs sm:text-sm leading-relaxed font-sans ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        {/* Detailed explanatory text built on real model dynamics */}
                        {activeModelAPos === "Base" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Arah Orientasi Utama:</strong> Element ini kuat dan sangat Anda hargai (Ego). Berfungsi sebagai motor spontan hidup pertama Anda dalam memproses semua data eksternal.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].orientasiBase}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Creative" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Alat Pendukung Utama:</strong> Berfungsi melengkapi dan mewujudkan target dari Base Anda. Sangat fleksibel, kreatif, serta adaptif harian.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].caraCreative}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Role" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Sosok Penyesuai Sosial:</strong> Berfungsi adaptasi sekunder saat bertatap muka di lingkungan formal yang belum akrab. Lemah dan menguras energi mental jika dituntut bekerja konstan lama.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].roleTampilan}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Vulnerable" && (
                          <div className="space-y-2">
                            <p>
                              <strong>PoLR (Point of Least Resistance):</strong> Titik kelemahan terdalam Anda yang tidak dihargai (Super-Ego). Kritik atau tekanan pada fungsi ini memicu rasa bingung, benci, lelah batin, defensif, atau aksi menyendiri.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs border ${
                              theme === "dark" ? "bg-rose-500/5 border-rose-500/15 text-rose-300" : "bg-rose-50/70 border-rose-200 text-rose-800"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].tuntutanPolr}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Suggestive" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Titik Receptor Kenyamanan:</strong> Sangat Anda hargai namun bernilai lemah (Super-Id). Datangnya informasi elemen ini dari orang tepercaya di hadapan Anda memulihkan ketenangan jiwa batin seketika harian.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs border ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-emerald-300/90" : "bg-emerald-50/70 border-emerald-200 text-emerald-850"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].bantuanSuggestive}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Mobilizing" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Gairah Pembuktian/Pujian:</strong> Ingin terus dikembangkan secara bertahap namun kinerjanya fluktuatif (Super-Id). Sanjungan atas kemajuan kecil pada fungsi ini mendatangkan kebahagiaan batin yang besar.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].areaMobilizing}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Ignoring" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Kompetensi Dikesampingkan:</strong> Kuat secara otomatis namun tidak dihargai (Id). Sebenarnya mampu Anda lakukan secara prima untuk memitigasi krisis harian, tetapi dijauhi / dihentikan secepatnya karena dinilai di luar esensi identitas.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].kompetensiIgnoring}
                            </p>
                          </div>
                        )}

                        {activeModelAPos === "Demonstrative" && (
                          <div className="space-y-2">
                            <p>
                              <strong>Latar Belakang Otomatis:</strong> Sangat kuat di bawah alam sadar Anda (Id). Beroperasi terus-menerus mengawal kelancaran aktivitas tanpa menuntut sanjungan atau pamer di panggung.
                            </p>
                            <p className={`p-3 rounded font-mono text-xs ${
                              theme === "dark" ? "bg-slate-950/60 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-150 text-slate-650"
                            }`}>
                              {TIM_PROFILES[calculatedOutput.top3[0].type].kemampuanDemonstrative}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`text-xs font-mono text-right pt-4 border-t mt-4 ${
                      theme === "dark" ? "text-slate-500 border-slate-800" : "text-slate-400 border-slate-150"
                    }`}>
                      Asesmen didukung dynamic context tags.
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 rounded-2xl border flex flex-col items-center justify-center text-center space-y-3 ${
                    theme === "dark" ? "border-slate-800 bg-slate-900/10 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-500 shadow-sm"
                  }`}>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1">
                      <Target className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="font-display font-semibold text-base">Detail Posisi Belum Dipilih</h4>
                    <p className="text-xs max-w-xs leading-relaxed">
                      Silakan klik salah satu kotak fungsi posisi Model A di sebelah kiri untuk membaca analisa dan peran kustom pengolahan informasi Anda secara rinci.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* MODEL COMPARISON FEATURE */}
            <div className={`space-y-6 border-t pt-10 ${theme === "dark" ? "border-slate-900" : "border-slate-205"}`}>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Analisis Korelasi Lanjutan:</span>
                <h3 className={`text-2xl sm:text-3xl font-display font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Bandingkan Dengan Tipe Lain</h3>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>
                  Pilih tipe sekunder untuk mengevaluasi perbedaan struktur pengolah informasinya (Model A) terhadap kandidat utama Anda.
                </p>
              </div>

              <div className="space-y-4 max-w-sm">
                <label className="block text-xs font-mono">Pilih Tipe Pembanding:</label>
                <select
                  value={compareTIM}
                  onChange={(e) => setCompareTIM(e.target.value as TIM)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-white text-semibold font-mono"
                >
                  <option value="">-- Pilih Tipe --</option>
                  {availableTIMs.filter((t) => t !== calculatedOutput.top3[0].type).map((t) => (
                    <option key={t} value={t}>{t} - {TIM_MODELS[t].name}</option>
                  ))}
                </select>
              </div>

              {compareTIM && (
                <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/10">
                  {/* Tipe Utama */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <span className="text-xs text-slate-500 font-mono">Tipe Utama Anda:</span>
                      <h4 className="text-xl font-bold font-display text-emerald-400">
                        {calculatedOutput.top3[0].type} ({TIM_MODELS[calculatedOutput.top3[0].type].name})
                      </h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div><strong>Orientasi Base:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].orientasiBase}</div>
                      <div><strong>Tuntutan PoLR / Kelemahan:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].tuntutanPolr}</div>
                      <div><strong>Sugesti Relief:</strong> {TIM_PROFILES[calculatedOutput.top3[0].type].bantuanSuggestive}</div>
                    </div>
                  </div>

                  {/* Tipe Pembanding */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <span className="text-xs text-slate-500 font-mono">Tipe Pembanding:</span>
                      <h4 className="text-xl font-bold font-display text-teal-400">
                        {compareTIM} ({TIM_MODELS[compareTIM].name})
                      </h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div><strong>Orientasi Base:</strong> {TIM_PROFILES[compareTIM].orientasiBase}</div>
                      <div><strong>Tuntutan PoLR / Kelemahan:</strong> {TIM_PROFILES[compareTIM].tuntutanPolr}</div>
                      <div><strong>Sugesti Relief:</strong> {TIM_PROFILES[compareTIM].bantuanSuggestive}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DYNAMIC INTERTYPE RELATIONS CALCULATOR */}
            <div className="space-y-6 border-t border-slate-900 pt-10">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-500 font-mono font-bold">Evaluasi Dinamika Komunikasi:</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Analisis Hubungan Antar-Tipe</h3>
                <p className="text-xs text-slate-400">
                  Hitung jenis dinamika interaksi informasi Model A antara tipe utama Anda dengan salah satu dari 15 tipe lainnya.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="space-y-4">
                  <label className="block text-xs font-mono">Pilih Tipe Mitra:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTIMs.map((t) => {
                      const isActive = intertypeTarget === t;
                      const relCode = INTERTYPE_MAP[calculatedOutput.top3[0].type][t];
                      return (
                        <button
                          key={t}
                          onClick={() => setIntertypeTarget(t)}
                          className={`py-2 rounded font-mono text-xs border uppercase font-bold transition ${
                            isActive
                              ? "bg-emerald-500 text-slate-950 border-emerald-500"
                              : "border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-850"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calculation breakdown result */}
                <div className="md:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4">
                  {(() => {
                    const self = calculatedOutput.top3[0].type;
                    const relCode = INTERTYPE_MAP[self][intertypeTarget];
                    const relMeta = INTERTYPE_RELATIONS_METADATA[relCode] || { name: relCode, description: "", impact: "" };

                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
                          <h4 className="text-lg font-bold font-display text-white">
                            Interaksi: <span className="text-emerald-400">{relMeta.name}</span>
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {self} bertemu {intertypeTarget}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-mono italic">
                          {relMeta.description}
                        </p>
                        <hr className="border-slate-800/80" />
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">Dampak Aliran Metabolisme Informasi:</div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                            {relMeta.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* RE-TEST BOX */}
            <div className="p-8 rounded-2xl border border-slate-900 bg-slate-900/20 text-center space-y-4 pt-10 border-t">
              <h4 className="font-display font-bold text-xl">Ulangi Tes Model A?</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Sesi tes sebelumnya akan dihapus dari peranti lokal Anda secara permanen. Mode tes, skor jawaban baru, dan holdouts verification akan diacak ulang.
              </p>
              <button
                onClick={() => {
                  if (window.confirm("Ingin menghapus data dan mengulang tes dari awal?")) {
                    resetSession();
                    setCurrentPage("landing");
                  }
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold px-6 py-2 rounded-lg text-sm transition"
              >
                Mulai Ulang Tes
              </button>
            </div>
          </div>
        )}

        {/* METHODOLOGY DESCRIPTION BLOCK */}
        {currentPage === "method" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Arsitektur Interpretasi Model A</h2>
              <p className="text-sm text-slate-400">
                Dokumentasi teoretis scoring engine dari aplikasi Socionics Dalam Diriku.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">1. Matriks 64 Kanal</h3>
                <p>
                  Asesmen ini mengumpulkan bukti dari 8 Information Elements melalui 8 kanal: Producer, Flexible, Mask, Threat, Receiver, Aspiration, Dismissive, dan Background. Kombinasi tersebut membentuk 64 sel yang dibandingkan dengan pola posisi Model A. Ini adalah model interpretatif berbasis teori, bukan pengukuran klinis objektif.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">2. Signed Position Fit</h3>
                <p>
                  Pilihan 1–5 dipetakan ke rentang -1 sampai +1 sehingga arah dan kekuatan jawaban tetap terlihat. Setiap elemen dibandingkan dengan signed theory prior delapan posisi Model A menggunakan weighted RMSE. Prior ini adalah hipotesis desain yang dapat dikalibrasi ulang setelah data pilot tersedia.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">3. Perbandingan 16 Model Kandidat</h3>
                <p>
                  Enam belas TIM dievaluasi sebagai enam belas susunan lengkap posisi Model A. Skor yang ditampilkan adalah indeks kemiripan terhadap prior teori, dengan kontribusi kecil dari koherensi quadra, holdout, dan item pembeda yang relevan. Angka tersebut tidak disebut posterior atau probabilitas ilmiah sebelum model dikalibrasi menggunakan data nyata.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-center border border-slate-800 text-slate-300">
                  Fit(TIM) = mean(position similarity) + limited supporting evidence
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold font-display text-emerald-400">4. Holdout Silang & Penilai Person-Fit</h3>
                <p>
                  Item holdout tidak membentuk profil core dan dipakai sebagai pemeriksaan prediksi tambahan. Konsistensi dihitung dari replikasi yang sengaja menarget sel yang sama di konteks berbeda. Confidence merangkum cakupan, jarak kandidat, holdout, dan pola respons; ia bukan koefisien reliabilitas empiris.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* REFERENCES & CITATIONS PAGE */}
        {currentPage === "references" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Tinjauan Rujukan Kajian</h2>
              <p className="text-sm text-slate-400">
                Parafrase kutipan, atribusi, dan landasan intelektual Socionics Model A.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Carl Gustav Jung - Psychological Types (1921)</h4>
                <p className="text-xs text-slate-400">
                  Peletak batu pertama dari konsep pembagian tipe metabolisme mental utama lewat pilar dimensi rasional-irasional dan ekstratimid-introtimid, yang kelak direstrukturisasi ke dalam Socionics.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Aušra Augustinavičiūtė - Model A & Wikisocion Traditional Compliations</h4>
                <p className="text-xs text-slate-400">
                  Lembaga pendiri sosiologis asal Lithuania yang meletakkan pola 8 posisi fungsi mental (Ego, Super-ego, Super-id, Id) dan memilah relasi dinamika metabolisme informasi (Intertype Relations).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Antoni Kępiński - Information Metabolism Theory</h4>
                <p className="text-xs text-slate-400">
                  Mengembangkan kerangka psikiatri bahwa jiwa manusia mengonsumsi informasi eksternal dengan cara metabolik layaknya lambung mengonsumsi kalori fisik, menjadi basis analogi Socionics.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white font-display">• Kajian Akademik Karol Pietrak</h4>
                <p className="text-xs text-slate-400">
                  Menelaah penggunaan Socionics sebagai kerangka pendidikan dan refleksi, tanpa mengklaim validasi klinis atau reliabilitas empiris yang belum diuji.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* EMBEDDED REAL-TIME AUDIT SUITE */}
        {currentPage === "audit" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <button onClick={() => setCurrentPage("landing")} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Konsol Audit Integritas Instrumen</h2>
              <p className="text-sm text-slate-400">
                Pemeriksaan struktural otomatis terhadap duplikasi, cakupan 64 sel, canonical tie-break, dan sampling lintas seed. Ini bukan bukti reliabilitas empiris.
              </p>
            </div>

            {/* Test result banner from metadata checklist */}
            <div className={`p-5 rounded-xl border ${auditReport.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}>
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 animate-pulse" />
                <div>
                  <h3 className="font-bold text-lg">
                    {auditReport.success ? "AUDIT STRUKTURAL LULUS" : "MASALAH STRUKTURAL DITEMUKAN"}
                  </h3>
                  <p className="text-xs text-slate-400">{auditReport.errors.length} error dan {auditReport.warnings.length} peringatan ditemukan pada pemeriksaan otomatis.</p>
                </div>
              </div>
            </div>

            {/* Coverage statistics table */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Jumlah Pertanyaan Sesi:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.totalItems} ITEM</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">{auditReport.metrics.coreItems} Core | {auditReport.metrics.holdoutItems} Holdout | {auditReport.metrics.tieBreakItems} Adaptive tie-break</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Keseimbangan Kognitif:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.completeCoreCells} / 64 SEL</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">Masing-masing sel memiliki tiga core item independen.</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/40 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Penyebaran Konteks Kegiatan:</span>
                <div className="text-3xl font-display font-bold text-white">{auditReport.metrics.simulatedSessions} SEED</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">Ringkas, standar, dan mendalam diuji agar selalu mencakup 64/64 sel.</p>
              </div>
            </div>

            {auditReport.warnings.length > 0 && (
              <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Peringatan yang Perlu Ditinjau:</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-amber-200 space-y-1.5 font-mono">
                  {auditReport.warnings.map((warning, index) => <li key={index}>{warning}</li>)}
                </ul>
              </div>
            )}

            {/* Error logs */}
            {auditReport.errors.length > 0 && (
              <div className="p-6 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-4">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Daftar Pelanggaran Konsistensi:</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-rose-300 space-y-1.5 font-mono">
                  {auditReport.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-20 no-print text-center text-xs ${theme === "dark" ? "bg-slate-900/50 border-slate-900 text-slate-500" : "bg-white border-slate-200 text-slate-400"}`}>
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Socionics Dalam Diriku. Hak cipta dilindungi undang-undang.</p>
          <p>Scored locally on device client-side. No cookie session telemetry trackers deployed.</p>
        </div>
      </footer>
    </div>
  );
}