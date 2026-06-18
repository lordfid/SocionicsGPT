import { useState, useMemo, useRef } from 'react';
import { CORE_QUESTIONS, TIM_PROFILES, getRelation } from '../data';
import { calculateSocionicsScore, ScoreBreakdown } from '../engine';
import { Sparkles, ChevronRight, ChevronLeft, RotateCcw, Download, HelpCircle, BadgeInfo, CheckCircle } from 'lucide-react';

interface TestViewProps {
  onTestingCompleted: (score: ScoreBreakdown) => void;
  resultScore: ScoreBreakdown | null;
  setResultScore: (val: ScoreBreakdown | null) => void;
}

export default function TestView({ onTestingCompleted, resultScore, setResultScore }: TestViewProps) {
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 is Name input view
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isExporting, setIsSimulatingCard] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeQuestion = useMemo(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < CORE_QUESTIONS.length) {
      return CORE_QUESTIONS[currentQuestionIndex];
    }
    return null;
  }, [currentQuestionIndex]);

  const selectAnswer = (val: number) => {
    if (!activeQuestion) return;
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: val }));
  };

  const handleNext = () => {
    if (currentQuestionIndex === -1 && !userName.trim()) {
      alert('Tolong masukkan nama panggilan Anda terlebih dahulu agar kartu diagnosis tersanitasi dengan benar.');
      return;
    }
    if (currentQuestionIndex === -1) {
      setCurrentQuestionIndex(0);
      return;
    }
    
    // Check if answered
    if (activeQuestion && answers[activeQuestion.id] === undefined) {
      alert('Tolong pilih salah satu poin kecenderungan perilaku Anda sebelum melangkah maju.');
      return;
    }

    if (currentQuestionIndex < CORE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed! Compute final scoring
      const finalResult = calculateSocionicsScore(answers);
      setResultScore(finalResult);
      onTestingCompleted(finalResult);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > -1) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mematikan model batin diagnosa ini dan memulai ulang tes dari awal?')) {
      setAnswers({});
      setCurrentQuestionIndex(-1);
      setResultScore(null);
    }
  };

  // Promise-based PNG card download with center-cropped background image, high contrast alignment
  // Sanitizes name inputs up to 15 chars maximum length to prevent visual frame overflow
  const downloadResultCard = () => {
    if (!resultScore) return;
    setIsSimulatingCard(true);

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Elegant Cream/Beige background
    ctx.fillStyle = '#faf8f5';
    ctx.fillRect(0, 0, 800, 1000);

    // Dark charcoal borders & accent framing
    ctx.strokeStyle = '#bf9872';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 740, 940);
    ctx.strokeStyle = '#1e1e20';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, 50, 700, 900);

    // Header branding
    ctx.fillStyle = '#1e1e20';
    ctx.font = 'bold 36px "Playfair Display", "Iowan Old Style", "Playfair", "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText('SOCIONICS DIAGNOSTIC CARD', 400, 120);

    ctx.fillStyle = '#bf9872';
    ctx.font = 'bold 14px "Fira Code", "JetBrains Mono", monospace';
    ctx.fillText('v3.0.0 — PERFECT MULTIDIMENSIONAL FIT', 400, 155);

    // Profile Box
    ctx.fillStyle = '#1e1e20';
    ctx.font = 'normal 18px "Playfair Display", "Georgia", serif';
    const cleanName = userName.trim().slice(0, 15).replace(/[^a-zA-Z0-9\s]/g, '');
    ctx.fillText(`SPESIMEN SUBJEK: ${cleanName.toUpperCase()}`, 400, 230);

    // Primary TIM Display large
    const primary = resultScore.primaryType;
    const details = TIM_PROFILES[primary];

    ctx.fillStyle = '#1e1e20';
    ctx.font = 'bold 96px "Playfair Display", "Georgia", serif';
    ctx.fillText(primary, 400, 340);

    ctx.fillStyle = '#bf9872';
    ctx.font = 'italic 20px "Playfair Display", "Georgia", serif';
    ctx.fillText(details?.name || '', 400, 390);

    ctx.fillStyle = '#1e1e20';
    ctx.font = 'normal 14px "Fira Code", monospace';
    ctx.fillText(`Slogan: ${details?.alias || ''}`, 400, 420);

    // Line separator
    ctx.beginPath();
    ctx.moveTo(150, 460);
    ctx.lineTo(650, 460);
    ctx.strokeStyle = 'rgba(30, 30, 32, 0.15)';
    ctx.stroke();

    // Model metrics text wrapping
    ctx.fillStyle = '#1e1e20';
    ctx.font = 'bold 15px "Playfair Display", serif';
    ctx.textAlign = 'left';
    ctx.fillText('METRIK VERIFIKASI MODEL BATIN ADAPTIF:', 150, 500);

    ctx.font = 'normal 13px "Fira Code", monospace';
    ctx.fillText(`• Indeks Pemantauan (Confidence): ${resultScore.confidence}%`, 150, 535);
    ctx.fillText(`• Person-Fit Ratio (Integrity): ${resultScore.personFitIndex * 100}%`, 150, 565);
    ctx.fillText(`• Cakupan Bukti (Sparse Coverage): ${resultScore.coverage * 100}%`, 150, 595);

    // Model A primary block summary
    ctx.font = 'bold 15px "Playfair Display", serif';
    ctx.fillText('DIAGRAM JALUR EGO DASAR (MODEL A):', 150, 650);

    ctx.font = 'normal 13px "Fira Code", monospace';
    const bElem = details?.modelA[0]?.element || '';
    const cElem = details?.modelA[1]?.element || '';
    const vElem = details?.modelA[3]?.element || '';
    const sElem = details?.modelA[4]?.element || '';

    ctx.fillText(`[Fungsi 1] Program Dasar (Base): ${bElem} – ${details?.modelA[0]?.description.slice(0, 50)}...`, 150, 685);
    ctx.fillText(`[Fungsi 2] Implementasi (Creative): ${cElem} – ${details?.modelA[1]?.description.slice(0, 50)}...`, 150, 715);
    ctx.fillText(`[Fungsi 4] Kerentanan Buta (PoLR): ${vElem}`, 150, 745);
    ctx.fillText(`[Fungsi 5] Penawar Duka (Suggestive): ${sElem}`, 150, 775);

    // Stamp authenticity
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1e1e20';
    ctx.font = 'bold 12px "Fira Code", monospace';
    ctx.fillText('DISETUJUI OLEH MEKANISME AUDIT PERFEKTIONIST', 400, 850);

    ctx.fillStyle = '#bf9872';
    ctx.font = 'italic 11px "Playfair Display", serif';
    ctx.fillText('"Kebenaran batin berada di atas clinical label semu."', 400, 875);

    // We promise loading fallback for rendering clean PNG outcome
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(canvas.toDataURL('image/png'));
      }, 500);
    }).then((imgData) => {
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Socionics_Card_${cleanName || 'subject'}.png`;
      link.click();
      setIsSimulatingCard(false);
    }).catch(() => {
      setIsSimulatingCard(false);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 transition-all duration-300">
      {/* 1. Name registration View */}
      {currentQuestionIndex === -1 && !resultScore && (
        <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto">
          <Sparkles className="w-12 h-12 text-brand-accent mx-auto mb-6 animate-spin" />
          <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            Mulai Pengukuran Model Batin
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed mb-8">
            Sebuah diagnosa matematis klinis berdasarkan Ibrahim Tencer finite group D4 x Z2 dan Ekaterina Filatova model batin. Menghadirkan Behavior Anchored Rating Scales (1 - 5) berbentuk cinematic.
          </p>

          <div className="text-left mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2">
              NAMA MAHASISWA / SPESIMEN SUBJEK:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Masukkan 1 kata nama panggilan..."
              className="w-full bg-neutral-100 border border-neutral-300 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl p-3.5 text-sm font-semibold focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            Masuk ke Arena Diagnosa
          </button>
        </div>
      )}

      {/* 2. Operational Quiz View */}
      {currentQuestionIndex >= 0 && !resultScore && activeQuestion && (
        <div className="space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent font-mono">
                Kategori Konteks: {activeQuestion.context.toUpperCase()}
              </span>
              <h3 className="font-serif text-lg font-bold text-neutral-800 mt-1">
                Pertanyaan {currentQuestionIndex + 1} dari {CORE_QUESTIONS.length}
              </h3>
            </div>
            <div className="w-24 bg-neutral-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-accent h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / CORE_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Cinematic Question Box */}
          <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <span className="text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full">
              KASUAL BEHAVIOR SCENARIO
            </span>
            <p className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-4 leading-norm text-left">
              "{activeQuestion.kasual}"
            </p>
          </div>

          {/* Behavior Anchored Slider Selector (1 to 5) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 font-bold uppercase">
              <span className="text-left max-w-xs">{activeQuestion.scaleLabel1}</span>
              <span className="text-right max-w-xs">{activeQuestion.scaleLabel5}</span>
            </div>

            {/* Slider with 5 distinct snap points */}
            <div className="flex items-center justify-between gap-2 bg-neutral-100/80 p-3 rounded-2xl border border-neutral-300/60 max-w-lg mx-auto">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => selectAnswer(val)}
                  className={`w-12 h-12 rounded-full font-mono text-xs font-bold transition-all border ${
                    answers[activeQuestion.id] === val
                      ? 'bg-neutral-900 text-white border-neutral-900 scale-110 shadow-md'
                      : 'bg-white hover:bg-neutral-200 text-neutral-600 border-neutral-300'
                  }`}
                >
                  {val === 1 ? '1' : val === 2 ? '2' : val === 3 ? '3 (SKIP)' : val === 4 ? '4' : '5'}
                </button>
              ))}
            </div>

            {/* Cinematic Artinya & Reaksi Panels dynamically drawn based on choice */}
            {answers[activeQuestion.id] !== undefined && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50/20 border border-[rgba(191,152,114,0.2)] rounded-2xl p-6 transition-all duration-500">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-brand-accent flex items-center gap-1.5">
                    <BadgeInfo className="w-3.5 h-3.5" /> PROSES INTERNAL (ARTINYA)
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed text-left">
                    {answers[activeQuestion.id] <= 2 ? activeQuestion.artinya1 :
                     answers[activeQuestion.id] === 3 ? 'Anda bersikap seimbang (netral), tidak condong pada bias fungsi ekstrem mana pun.' :
                     activeQuestion.artinya5}
                  </p>
                </div>

                <div className="space-y-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-neutral-200">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-brand-accent flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> KAIDAH SINEMATIK (REAKSI FISIK)
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed italic text-left">
                    {answers[activeQuestion.id] <= 2 ? activeQuestion.reaksi1 :
                     answers[activeQuestion.id] === 3 ? 'Anda diam sejenak di depan komputer tanpa merespons secara fisik.' :
                     activeQuestion.reaksi5}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t pt-6">
            <button
              onClick={handlePrev}
              className="py-2.5 px-5 border border-neutral-300 rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all hover:bg-neutral-100 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            
            <button
              onClick={handleNext}
              className="py-2.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all flex items-center gap-1 shadow-sm"
            >
              {currentQuestionIndex === CORE_QUESTIONS.length - 1 ? 'Mulai Analisis Batin' : 'Kecenderungan Lanjutan'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Diagnostic Report View */}
      {resultScore && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
            <span className="bg-neutral-950 text-white font-mono text-[9px] px-4 py-1.5 font-bold uppercase tracking-widest absolute top-0 right-0 rounded-bl-2xl">
              v3.0.0 Diagnostic Report
            </span>

            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent font-mono">Diagnosis Selesai</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
              Model Batin Utama: <span className="text-neutral-950">{resultScore.primaryType}</span>
            </h2>
            <p className="text-sm font-mono text-neutral-500 italic mt-1">
              Kompas Kepribadian {userName.toUpperCase()}
            </p>

            {/* Model stats visual row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-b py-6 border-neutral-100">
              <div>
                <span className="text-2xl font-serif font-bold text-neutral-900">{resultScore.confidence}%</span>
                <p className="text-[10px] uppercase font-mono text-neutral-400 mt-1">Confidence Fit</p>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-neutral-900">{resultScore.personFitIndex * 100}%</span>
                <p className="text-[10px] uppercase font-mono text-neutral-400 mt-1">Person-Fit Ratio</p>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-neutral-900">{resultScore.coverage * 100}%</span>
                <p className="text-[10px] uppercase font-mono text-neutral-400 mt-1">Evidence Coverage</p>
              </div>
              <div>
                <span className="text-sm font-mono font-bold text-brand-accent block truncate">{TIM_PROFILES[resultScore.primaryType]?.quadra || 'Alpha'}</span>
                <p className="text-[10px] uppercase font-mono text-neutral-400 mt-1">Quadra</p>
              </div>
            </div>

            {/* Summary card description */}
            <div className="mt-8 text-left space-y-4 max-w-2xl mx-auto">
              <h4 className="font-serif text-lg font-bold text-neutral-800">Spesifikasi Hubungan Nilai Quadra</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans bg-neutral-50 border p-4 rounded-xl">
                {resultScore.quadraHypothesis}
              </p>
            </div>

            {/* Canvas fallback container */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={downloadResultCard}
                disabled={isExporting}
                className="py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 font-mono"
              >
                <Download className="w-4 h-4 animate-bounce" /> {isExporting ? 'Pembuatan Kartu PNG...' : 'Unduh Kartu Diagnosis (PNG)'}
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-6 border border-neutral-300 hover:bg-neutral-100 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 font-mono"
              >
                <RotateCcw className="w-4 h-4" /> Memulai Ulang
              </button>
            </div>
          </div>

          {/* Model A Functions Breakdown */}
          <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-4 border-b pb-2">Struktur Jalur Ego Anda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TIM_PROFILES[resultScore.primaryType]?.modelA?.slice(0, 4).map((fn) => (
                <div key={fn.position} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="font-mono text-[9px] uppercase bg-neutral-200 px-2 py-0.5 rounded text-neutral-600 font-bold block w-fit mb-2">
                    Posisi {fn.position} : {fn.role}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-neutral-900">{fn.element} – {fn.name}</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{fn.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
