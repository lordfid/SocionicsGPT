/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CornerDownLeft, CircleAlert, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Question, Answer, SurveyMode } from '../types';
import { getQuestionsForMode, CONTEXTS_METADATA } from '../questions';

interface QuestionnaireProps {
  answers: Record<string, Answer>;
  onAnswer: (qId: string, ratingObj: Answer | undefined) => void;
  onComplete: () => void;
  initialMode: SurveyMode;
  onModeChange: (mode: SurveyMode) => void;
}

export default function Questionnaire({
  answers,
  onAnswer,
  onComplete,
  initialMode,
  onModeChange
}: QuestionnaireProps) {
  const [mode, setMode] = useState<SurveyMode>(initialMode);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(true);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Load appropriate questions on mode change
  useEffect(() => {
    const list = getQuestionsForMode(mode);
    setQuestions(list);
    setCurrentIndex(0);
  }, [mode]);

  const handleSelectMode = (newMode: SurveyMode) => {
    setMode(newMode);
    onModeChange(newMode);
    setShowConfig(false);
    setStartTime(Date.now());
  };

  const handleRating = (rating: number) => {
    if (rating < 1 || rating > 5) return; // Point 11: Validation
    
    const elapsed = Date.now() - startTime;
    const q = questions[currentIndex];
    
    // Save answer with time duration for velocity checking
    onAnswer(q.id, {
      questionId: q.id,
      rating,
      timestamp: elapsed
    } as any);

    // Auto advance after short timer for beautiful flow
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setStartTime(Date.now());
      }
    }, 180);
  };

  const handleSkip = () => {
    const q = questions[currentIndex];
    onAnswer(q.id, undefined); // Point 11: Skips purge old records
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStartTime(Date.now());
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setStartTime(Date.now());
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStartTime(Date.now());
    }
  };

  const progressPercent = Math.round((Object.keys(answers).length / Math.max(1, questions.length)) * 100);
  const currentAnswer = answers[questions[currentIndex]?.id];

  if (showConfig) {
    return (
      <div className="max-w-xl mx-auto py-10" id="assessment-configuration">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#d97706] font-semibold">SocionicsGPT v3.0.0</span>
          <h2 className="text-3xl font-serif font-medium text-slate-900 mt-2">Pilih Kedalaman Penilaian</h2>
          <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
            Semua mode penilaian menjamin cakupan 64 sel Model A secara merata sejak awal untuk kepastian hasil ilmiah.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              id: 'Ringkas' as SurveyMode,
              title: 'Mode Ringkas',
              size: '80 Pertanyaan',
              duration: '7 - 10 Menit',
              desc: 'Cakupan instan 64 sel Model A ditambah masing-masing 8 pertanyaan holdout dan tie-break untuk ketepatan dasar.'
            },
            {
              id: 'Standar' as SurveyMode,
              title: 'Mode Standar',
              size: '128 Pertanyaan',
              duration: '15 - 20 Menit',
              desc: 'Cakupan ganda sebagian besar sel utama guna memperdalam akurasi model dan filter noise jawaban.'
            },
            {
              id: 'Mendalam' as SurveyMode,
              title: 'Mode Mendalam',
              size: '224 Pertanyaan',
              duration: '30 - 45 Menit',
              desc: 'Investigasi tingkat lanjut untuk riset pribadi dengan multi-konteks melimpah dan kekebalan tinggi dari anomali.'
            }
          ].map(it => (
            <button
              key={it.id}
              id={`mode-select-${it.id}`}
              onClick={() => handleSelectMode(it.id)}
              className="w-full text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-md transition-all group flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="max-w-md">
                <span className="text-xs font-mono font-medium text-slate-400 block tracking-wider uppercase mb-1">{it.size} &bull; {it.duration}</span>
                <h4 className="text-lg font-serif font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">{it.title}</h4>
                <p className="text-xs text-slate-500 mt-1 font-sans">{it.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-amber-500 mt-3 md:mt-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  if (!q) return null;

  const contextMeta = CONTEXTS_METADATA[q.context];

  return (
    <div className="max-w-2xl mx-auto py-8 font-sans px-4" id="active-questionnaire">
      {/* Top Banner and Navigation Bar */}
      <div className="flex justify-between items-center mb-6 text-xs text-slate-400 font-mono">
        <button
          id="btn-back-to-mode"
          onClick={() => setShowConfig(true)}
          className="hover:text-slate-700 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Ganti Mode ({mode})
        </button>
        <span>
          Pertanyaan {currentIndex + 1} dari {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card with Editorial Styling */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 md:p-10 mb-6 transition-all min-h-[300px] flex flex-col justify-between" id="question-card">
        <div>
          <div className="flex items-center gap-2 mb-4">
            {contextMeta && (
              <span className="text-xs font-mono font-medium tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">
                {contextMeta.label}
              </span>
            )}
            {q.type !== 'core' && (
              <span className="text-xs font-mono font-medium tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase">
                {q.type === 'holdout' ? 'Holdout' : 'Diferensiator'}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-serif text-slate-800 font-medium leading-relaxed mt-2 select-none min-h-[90px]">
            {q.text}
          </h3>
        </div>

        {/* Rating Button Matrix */}
        <div className="mt-8">
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5].map(rating => {
              const active = currentAnswer && currentAnswer.rating === rating;
              let btnClass = "border border-slate-200 text-slate-700 hover:border-slate-400 ";
              if (active) {
                btnClass = "bg-amber-600 text-white border-amber-600 hover:bg-amber-700 ";
              }

              return (
                <button
                  key={rating}
                  id={`btn-rating-${rating}`}
                  onClick={() => handleRating(rating)}
                  className={`py-4 md:py-5 px-1 rounded-xl text-lg font-mono font-semibold transition-all shadow-sm ${btnClass}`}
                >
                  {rating}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider font-mono mt-3 select-none px-1">
            <span>Sangat Tidak Setuju</span>
            <span>Sangat Setuju</span>
          </div>
        </div>
      </div>

      {/* Control Buttons (Prev, Skip, Next, Finish) */}
      <div className="flex justify-between items-center px-1">
        <button
          id="btn-prev-question"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium font-mono text-slate-500 rounded-lg hover:text-slate-800 transition-colors ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ArrowLeft className="h-4 w-4" /> Mundur
        </button>

        <button
          id="btn-skip-question"
          onClick={handleSkip}
          className="px-4 py-2 text-xs font-semibold font-mono text-slate-400 hover:text-slate-600 uppercase tracking-widest hover:underline transition-colors"
        >
          Skip / Kosongkan
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            id="btn-complete-survey"
            onClick={onComplete}
            disabled={Object.keys(answers).length < 5}
            className={`flex items-center gap-1.5 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold font-mono rounded-lg transition-all shadow ${Object.keys(answers).length < 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Selesai Tes <CornerDownLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            id="btn-next-question"
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium font-mono text-slate-500 hover:text-slate-800 transition-colors"
          >
            Maju <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Small notification when incomplete */}
      {Object.keys(answers).length < 5 && (
        <div className="mt-8 p-3 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-800 flex items-center gap-2 text-xs font-sans">
          <CircleAlert className="h-4 w-4 text-amber-600 shrink-0" />
          <span>Isilah minimal <strong>5 pertanyaan</strong> untuk dapat menyelesaikan penilaian dan menghasilkan visualisasi tipe informasi.</span>
        </div>
      )}
    </div>
  );
}
