import { useState, useEffect } from 'react';
import { ScoreBreakdown } from './engine';
import Header from './components/Header';
import TestView from './components/TestView';
import AtlasView from './components/AtlasView';
import ConsultView from './components/ConsultView';
import { Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'test' | 'atlas' | 'consult'>('test');
  const [score, setScore] = useState<ScoreBreakdown | null>(null);

  // Auto-restore previous spec session state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('socionics_v3_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.primaryType) {
          setScore(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse previous stored diagnosis session:', e);
    }
  }, []);

  const handleTestingCompleted = (finalScore: ScoreBreakdown) => {
    setScore(finalScore);
    try {
      localStorage.setItem('socionics_v3_session', JSON.stringify(finalScore));
    } catch (e) {
      console.warn('Failed to save diagnosis to localStorage:', e);
    }
  };

  const handleResetScore = (val: ScoreBreakdown | null) => {
    setScore(val);
    if (!val) {
      localStorage.removeItem('socionics_v3_session');
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige flex flex-col font-sans relative text-neutral-900 select-none selection:bg-brand-accent/20">
      <Header onNavigate={setCurrentView} currentView={currentView} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TestView
                onTestingCompleted={handleTestingCompleted}
                resultScore={score}
                setResultScore={handleResetScore}
              />
            </motion.div>
          )}

          {currentView === 'atlas' && (
            <motion.div
              key="atlas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <AtlasView />
            </motion.div>
          )}

          {currentView === 'consult' && (
            <motion.div
              key="consult"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ConsultView score={score} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Premium Minimalist Footer */}
      <footer className="border-t border-[rgba(191,152,114,0.15)] bg-white/60 py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 font-mono text-[10px]">
          <p>© 2026 MATHEMATICAL SOCIONICS ATLAS. ALL RIGHTS RESERVED.</p>
          <p className="flex items-center gap-1.5 text-brand-accent">
            <Compass className="w-3.5 h-3.5" /> AUDITED UNDER RIGOROUS METRIC GATES
          </p>
        </div>
      </footer>
    </div>
  );
}
