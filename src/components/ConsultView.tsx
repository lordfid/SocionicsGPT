import { useState, useRef, useEffect } from 'react';
import { ScoreBreakdown } from '../engine';
import { TIM_PROFILES } from '../data';
import { Send, Trash, Sparkles, Trophy, CheckCircle, ShieldAlert } from 'lucide-react';

interface ConsultViewProps {
  score: ScoreBreakdown | null;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ConsultView({ score }: ConsultViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Masuk spesimen subjek! Saya adalah Konsultan Senior Socionics (dan juga seorang ENTJ 3w4 super perfectionist). Di sini kita tidak membiarkan satu pun kontradiksi batin lolos tanpa ampun. `
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputVal.trim() || isLoading) return;

    const userText = inputVal.trim();
    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Researcher Specimen',
          primaryType: score?.primaryType || 'ILE',
          secondaryType: score?.secondaryType || 'LII',
          answers: {},
          confidence: score?.confidence || 75,
          coverage: score?.coverage || 1.0,
          userQuestion: userText
        })
      });

      const data = await response.json();
      if (response.ok && data.answer) {
        setMessages(prev => [...prev, { role: 'model', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `❌ GALAT SISTEMIS: ${data.error || 'Gagal memanggil model batin konsultan.'}` }]);
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'model', text: `❌ KONEKSI MACET: ${e?.message || 'Server proxy tidak merespons.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Bersihkan arsip konsultasi teater batin ini?')) {
      setMessages([
        {
          role: 'model',
          text: `Sistem dibersihkan. Silakan ajukan kontradiksi batin baru, mari kita audit sampai ke akarnya.`
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Diagnostics Specs Panel */}
        <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-5 h-fit space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3 mb-2">
            <Trophy className="w-5 h-5 text-brand-accent shrink-0" />
            <h3 className="font-serif text-lg font-bold">Diagnosa Terdaftar</h3>
          </div>

          {score ? (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-mono text-neutral-400 font-bold">Model Batin Terpilih</p>
                <p className="text-2xl font-serif font-bold text-neutral-900">{score.primaryType}</p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{TIM_PROFILES[score.primaryType]?.name}</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <div className="flex justify-between items-center text-xs font-mono border-b pb-2 mb-2">
                  <span>Confidence:</span>
                  <span className="font-bold text-brand-accent">{score.confidence}%</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>Person Fit:</span>
                  <span className="font-bold text-brand-accent">{score.personFitIndex * 100}%</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-800 font-mono flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> AREA RENTAN POLR (VULNERABLE)
                </p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {TIM_PROFILES[score.primaryType]?.modelA[3]?.description || 'Menolak keras agresi paksaan fisik.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-neutral-400 italic">Belum ada diagnosis terdaftar. Menggunakan spesimen acak [ILE] sebagai model simulasi.</p>
              <div className="mt-4 p-3 bg-neutral-50 rounded-xl border text-[11px] font-mono font-bold text-neutral-700">ILE (Seeker)</div>
            </div>
          )}
        </div>

        {/* Chat Console Panel */}
        <div className="lg:col-span-2 bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl flex flex-col h-[520px] shadow-sm select-text">
          {/* Console Header */}
          <div className="border-b px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse" />
              <h4 className="font-serif text-sm font-bold text-neutral-950">Seated perfectionist ENTJ Consultant</h4>
            </div>
            <button
              onClick={handleClear}
              className="text-neutral-400 hover:text-rose-600 p-1.5 rounded transition-all"
              title="Reset Percakapan"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Logs Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white font-sans'
                      : 'bg-neutral-100 text-neutral-800 font-serif border border-neutral-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 border text-neutral-500 rounded-2xl p-4 text-xs leading-relaxed font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-300" />
                  Pakar senior sedang mengaudit sistem batin Anda...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Control Box */}
          <div className="border-t p-4 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ajukan kegelisahan batin atau tanya tentang area rentan..."
              className="flex-1 bg-neutral-100 border border-neutral-300 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-sans"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputVal.trim()}
              className="bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
