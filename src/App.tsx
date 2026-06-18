/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layers, Library, ShieldAlert, BadgeCheck, User, Sparkles, HelpCircle, AlertCircle, Trash2 } from 'lucide-react';
import { SurveyMode, Answer, SessionState, ProfileResult, ValidationMetrics } from './types';
import { generate320QuestionBank, getQuestionsForMode } from './questions';
import { calculateSocionicsResult } from './scoring';
import { get16TIMProfiles } from './profiles';
import Questionnaire from './components/Questionnaire';
import ResultsView from './components/ResultsView';
import DiagnosticsSandbox from './components/DiagnosticsSandbox';

const AUTOSAVE_KEY = 'socionics_v3_session_autosave';

export default function App() {
  const [activeTab, setActiveTab] = useState<'test' | 'profiles' | 'sandbox'>('test');
  const [nickname, setNickname] = useState<string>('Peserta Utama');
  const [mode, setMode] = useState<SurveyMode>('Ringkas');
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [selectedProfileKey, setSelectedProfileKey] = useState<string>('ILE');

  // Load session from storage if valid (Point 11: strict session validation & migration)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SessionState;
        if (parsed && typeof parsed === 'object' && parsed.answers) {
          // Reject corrupted seeds or fake modes
          const validModes = ['Ringkas', 'Standar', 'Mendalam'];
          if (validModes.includes(parsed.currentMode)) {
            // Verify all question IDs actually exist in our 320 bank
            const qBank = generate320QuestionBank();
            const validQIds = new Set(qBank.map(q => q.id));
            
            const sanitizedAnswers: Record<string, Answer> = {};
            let validCount = 0;

            Object.keys(parsed.answers).forEach(qId => {
              const ans = parsed.answers[qId];
              if (validQIds.has(qId) && ans && ans.rating >= 1 && ans.rating <= 5) {
                sanitizedAnswers[qId] = ans;
                validCount++;
              }
            });

            if (validCount >= 1) {
              setAnswers(sanitizedAnswers);
              setMode(parsed.currentMode);
              setCompleted(parsed.completed || false);
            }
          }
        }
      }
    } catch (err) {
      // Clear legacy broken cached states silently (point 11)
      localStorage.removeItem(AUTOSAVE_KEY);
    }
  }, []);

  // Save changes to LocalStorage automatically (Autosave)
  const saveSession = (newAnswers: Record<string, Answer>, curMode: SurveyMode, curComplete: boolean) => {
    try {
      const sessionState: SessionState = {
        currentMode: curMode,
        answers: newAnswers,
        startTime: Date.now(),
        completed: curComplete,
        history: []
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(sessionState));
    } catch (e) {
      console.warn('Autosave failed:', e);
    }
  };

  const handleAnswer = (qId: string, ratingObj: Answer | undefined) => {
    const updatedAnswers = { ...answers };
    if (ratingObj === undefined) {
      delete updatedAnswers[qId]; // Point 11: skips clear existing records
    } else {
      updatedAnswers[qId] = ratingObj;
    }
    setAnswers(updatedAnswers);
    saveSession(updatedAnswers, mode, completed);
  };

  const handleModeChange = (newMode: SurveyMode) => {
    setMode(newMode);
    setAnswers({}); // Mode switch resets answers to guarantee clean baseline
    setCompleted(false);
    saveSession({}, newMode, false);
  };

  const handleComplete = () => {
    setCompleted(true);
    saveSession(answers, mode, true);
  };

  const handleRestart = () => {
    if (confirm('Apakah Anda yakin ingin menghapus respon saat ini dan memulai penilaian kognitif baru?')) {
      setAnswers({});
      setCompleted(false);
      localStorage.removeItem(AUTOSAVE_KEY);
    }
  };

  // Run real scoring computation on current state
  const questions = generate320QuestionBank();
  const scoring = calculateSocionicsResult(questions, answers);
  const profiles = get16TIMProfiles();
  const currentProfile = profiles.find(p => p.key === selectedProfileKey);

  return (
    <div className="min-h-screen bg-stone-100/50 text-stone-800" id="application-container">
      {/* Top Navigation Bar with local serif typographics (editorial system font stack, point 13) */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm" id="main-header">
        <div className="flex items-center gap-3">
          <Layers className="h-6 w-6 text-amber-700 shrink-0" />
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 leading-none">SocionicsGPT</h1>
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 mt-1 block">Sistem Audit Kepribadian v3.0.0</span>
          </div>
        </div>

        {/* Tab Switcher Interface */}
        <nav className="flex bg-stone-100 p-1 rounded-xl" id="navigation-tabs">
          {[
            { id: 'test', label: 'Penilaian', icon: BadgeCheck },
            { id: 'profiles', label: 'Perpustakaan TIM', icon: Library },
            { id: 'sandbox', label: 'Sandbox Kualitas', icon: Sparkles }
          ].map(it => {
            const Icon = it.icon;
            const active = activeTab === it.id;
            return (
              <button
                key={it.id}
                id={`tab-btn-${it.id}`}
                onClick={() => setActiveTab(it.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all ${active ? 'bg-white text-stone-950 shadow-sm font-extrabold' : 'text-stone-500 hover:text-stone-800'}`}
              >
                <Icon className="h-3.5 w-3.5" /> {it.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4 md:px-8 min-h-[calc(100vh-140px)]">
        {activeTab === 'test' && (
          <div id="survey-and-results-view">
            {completed && Object.keys(answers).length >= 5 ? (
              <ResultsView
                results={scoring.results}
                metrics={scoring.metrics}
                topPairUnresolved={scoring.topPairUnresolved}
                tieBreakApplied={scoring.tieBreakApplied}
                clientNickname={nickname}
                onRestart={handleRestart}
              />
            ) : (
              <div className="max-w-xl mx-auto">
                {/* Configuration details for participants before beginning */}
                {Object.keys(answers).length === 0 && (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6 shadow-sm" id="participants-setup-form">
                    <h3 className="text-lg font-serif font-medium text-stone-900 border-b border-stone-100 pb-3">Profil Peserta</h3>
                    <div className="mt-4">
                      <label className="text-xs font-mono font-bold uppercase text-stone-400 block mb-1">Nama Panggilan untuk Kartu Hasil:</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                        <input
                          id="input-nickname"
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value.substring(0, 24))}
                          placeholder="Masukkan nama Anda..."
                          className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-xl bg-stone-50/50 hover:bg-stone-50 focus:bg-white text-sm font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Questionnaire
                  answers={answers}
                  onAnswer={handleAnswer}
                  onComplete={handleComplete}
                  initialMode={mode}
                  onModeChange={handleModeChange}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab: Library Profile Details */}
        {activeTab === 'profiles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="profiles-dictionary">
            {/* Left Nav for TIM keys */}
            <div className="lg:col-span-3 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm h-fit">
              <label className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-wider block mb-3">Daftar 16 Tipe Metabolisme:</label>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {profiles.map(p => (
                  <button
                    key={p.key}
                    id={`dict-select-${p.key}`}
                    onClick={() => setSelectedProfileKey(p.key)}
                    className={`p-3 text-left rounded-xl border text-xs font-mono transition-all flex justify-between items-center ${selectedProfileKey === p.key ? 'bg-amber-700 text-white border-amber-700 font-bold' : 'border-stone-100 hover:bg-stone-50 text-stone-700'}`}
                  >
                    <span>{p.key}</span>
                    <span className="opacity-80 text-[10px]">{p.threeLetter}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display details */}
            <div className="lg:col-span-9 bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
              {currentProfile ? (
                <div id="selected-profile-pane">
                  <span className="text-xs font-mono uppercase text-amber-800 bg-amber-50 border border-amber-200 py-1 px-3 rounded-full font-bold">
                    {currentProfile.quadra} Quadra
                  </span>
                  <h2 className="text-4xl font-serif font-bold text-stone-900 mt-3">{currentProfile.key}</h2>
                  <h3 className="text-lg font-serif text-stone-600 font-medium mt-0.5">
                    {currentProfile.name} &bull; <span className="italic">"{currentProfile.title}"</span>
                  </h3>
                  
                  <p className="text-sm font-sans text-stone-600 leading-relaxed mt-4 border-l-2 border-stone-200 pl-4">
                    {currentProfile.shortDesc} {currentProfile.detailedDesc}
                  </p>

                  <h4 className="text-sm font-mono font-bold uppercase text-stone-400 tracking-wider mt-8 mb-4">Urutan Model A:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProfile.positions.map((pos, idx) => (
                      <div key={pos.functionName} className="p-4 border border-stone-250 border-stone-200 rounded-xl bg-stone-50 flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-stone-200 text-stone-800 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                          {pos.element}
                        </div>
                        <div>
                          <td className="text-[10px] font-mono text-stone-400 block tracking-wide uppercase">Fungsi {idx + 1}: {pos.functionName}</td>
                          <p className="text-xs text-stone-600 font-sans mt-0.5 leading-relaxed">{pos.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-sm font-mono text-stone-400">Pilihlah salah satu tipe di sebelah kiri.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Quality Gate sandbox simulator */}
        {activeTab === 'sandbox' && (
          <div id="diagnostics-sandbox-container">
            <div className="mb-6 p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7] text-[#78350f] flex items-start gap-2 text-xs font-sans">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Fungsi Diagnostik Lanjut:</span>
                Evaluasi model dilakukan secara luring langsung di peramban Anda. Anda dapat menjalankan hingga 10.000 simulasi sesi dalam sekejap guna mengaudit persentase akurasi klasifikasi dan toleransi holdout.
              </div>
            </div>

            <DiagnosticsSandbox />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-400 font-mono select-none" id="main-footer">
        <p>&copy; 2026 SocionicsGPT. Dikembangkan demi kualitas tertinggi dalam metodologi kognitif.</p>
      </footer>
    </div>
  );
}
