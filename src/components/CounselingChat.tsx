import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, SociotypeCode } from "../types";
import { MessageSquare, Send, Bot, User, Award, ShieldAlert, BookOpen, AlertCircle } from "lucide-react";

interface CounselingChatProps {
  selectedType: SociotypeCode | null;
  onSaveDiagnosticsReport: (summary: string) => void;
}

export default function CounselingChat(props: CounselingChatProps) {
  const { selectedType, onSaveDiagnosticsReport } = props;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Selamat datang di Sesi Konsultasi Eksklusif Socionics. Saya adalah analis kepribadian senior Socionics-GPT Anda. 

Adopsi saya adalah metodologi ilmiah murni Aushra Augusta, sosiologi kognitif Kiev-Moskow, dan dikotomi Reinin teoretis. Saya beroperasi dengan karakter kognitif **ENTJ 3w4** — yang artinya saya sangat membenci deskripsi kepribadian 'fluff' MBTI dangkal yang dipaksakan.

*Fokus Utama Kita Hari Ini:*
1. Menguji kecocokan kognisi sejati Anda, mencari letak **Vulnerable Function (PoLR)** sebagai kerentanan fisik/mental mutlak.
2. Membongkar mitos pencampuran MBTI vs Socionics (contoh: mengapa INTJ di MBTI tidak otomatis menjadi INTj di Socionics).
3. Mengevaluasi keselarasan dikotomi Reinin Anda secara logis.

Ketikkan ketakutan Anda saat di bawah tekanan, bagaimana Anda mengambil keputusan, atau sosiotipe apa yang sedang Anda curigai. Mari kita bedah metabolisme berpikir Anda secara presisi tanpa basa-basi klise.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setErrorMsg(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          selectedType: selectedType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal memproses kognisi konsultasi.");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gagal terhubung dengan server analis kognitif.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = () => {
    // Generate an beautiful summary based on assistant's latest long response
    const assistantResponses = messages.filter(m => m.role === "assistant");
    if (assistantResponses.length < 1) return;

    const latestReply = assistantResponses[assistantResponses.length - 1].content;
    onSaveDiagnosticsReport(latestReply);
  };

  // Premium text parser that converts markdown headers, bolding and bullet points into styled HTML elements
  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("### ")) {
        return <h5 key={index} className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider mt-4 mb-2">{line.replace("### ", "")}</h5>;
      }
      if (line.startsWith("## ")) {
        return <h4 key={index} className="text-sm font-sans font-black text-slate-100 tracking-tight mt-5 mb-2.5 border-b border-slate-800 pb-1">{line.replace("## ", "")}</h4>;
      }
      if (line.startsWith("# ")) {
        return <h3 key={index} className="text-base font-sans font-black text-slate-200 mt-6 mb-3">{line.replace("# ", "")}</h3>;
      }

      // Bullet points
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const cleanContent = line.replace(/^[-*]\s+/, "");
        return (
          <li key={index} className="list-disc list-inside text-xs text-slate-300 leading-relaxed ml-3 mt-1 class-list">
            {formatBoldItalic(cleanContent)}
          </li>
        );
      }

      // Standard paragraphs
      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }

      return (
        <p key={index} className="text-xs text-slate-300 leading-relaxed mt-1 leading-normal leading-relaxed">
          {formatBoldItalic(line)}
        </p>
      );
    });
  };

  // Helper helper to look for bolding (**word**) and italics (*word*)
  const formatBoldItalic = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-slate-100 font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="text-slate-200 italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl flex flex-col h-[700px] overflow-hidden" id="counseling-chat-panel">
      {/* Active Header panel */}
      <div className="bg-slate-900/60 p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans font-bold text-slate-200">Analis Socionics GPT</span>
              <span className="bg-indigo-950 text-indigo-400 border border-indigo-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                ENTJ 3w4 PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-sans">
              Metabolisme Informasi & Diagnosis Model A
            </p>
          </div>
        </div>

        {/* Current contextual indicator */}
        <div className="flex items-center gap-3">
          {selectedType ? (
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Target Diagnosa: <strong className="font-mono text-indigo-400 font-bold">{selectedType}</strong></span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-lg text-slate-500 italic">
              <BookOpen className="w-4 h-4" />
              <span>Tipe belum dilekatkan</span>
            </div>
          )}

          <button
            onClick={handleSaveReport}
            disabled={messages.length <= 1}
            className="text-[11px] font-sans font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3.5 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            Arsipkan Laporan
          </button>
        </div>
      </div>

      {/* Messages Canvas Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/20 scrollbar-thin">
        {messages.map((m) => {
          const isBot = m.role === "assistant";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                isBot ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  isBot
                    ? "bg-slate-900 border-indigo-900/60 text-indigo-400"
                    : "bg-indigo-950/40 border-indigo-800/60 text-indigo-200"
                }`}
              >
                {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-4 rounded-xl border font-sans text-xs ${
                  isBot
                    ? "bg-slate-900/40 border-slate-800/80 text-slate-200"
                    : "bg-indigo-950/10 border-indigo-900/40 text-slate-200 shadow-md shadow-indigo-950/5"
                }`}
              >
                <div className="space-y-1">{formatMessageText(m.content)}</div>
                <div className="text-[9px] font-mono text-slate-500 text-right mt-2">{m.timestamp}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-4 mr-auto max-w-[80%] animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce shrink-0" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce shrink-0 delay-100" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce shrink-0 delay-200" />
              <span className="text-[10px] font-mono text-slate-400 ml-1">Analis kognitif sedang membedah data...</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-400 flex items-start gap-2.5 max-w-lg mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Kegagalan Sistem Kognitif:</p>
              <p className="text-[11px] text-rose-300 mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form panel */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-800/80 bg-slate-900/20 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Tulis sanggahan kognisi Anda, keluhan PoLR, atau tanya sosiotipe..."
          className="flex-1 bg-slate-950 border border-slate-800/80 text-xs text-slate-200 rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 flex items-center justify-center transition-all disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
