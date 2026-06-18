import React, { useState, useEffect } from "react";
import { SociotypeCode, SociotypeInfo, SavedDiagnosis } from "./types";
import { SOCIOTYPES } from "./data/socionicsData";
import ModelAGrid from "./components/ModelAGrid";
import RelationsMatrix from "./components/RelationsMatrix";
import ReininCalculator from "./components/ReininCalculator";
import CounselingChat from "./components/CounselingChat";
import { 
  Award, 
  BookOpen, 
  MessageSquare, 
  Scale, 
  Archive, 
  HelpCircle, 
  AlertTriangle, 
  ChevronRight, 
  Clock, 
  Trash2, 
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function App() {
  // Application tabs
  const [activeTab, setActiveTab] = useState<"profiler" | "reinin" | "chat" | "history">("profiler");
  
  // Selected Sociotype state
  const [selectedType, setSelectedType] = useState<SociotypeCode>(SociotypeCode.LII);
  
  // History diagnostics saved states
  const [savedReports, setSavedReports] = useState<SavedDiagnosis[]>([]);
  const [viewingReportId, setViewingReportId] = useState<string | null>(null);

  // Meticulous editorial panel open state
  const [showCritique, setShowCritique] = useState(true);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("socionics_reports");
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Gagal memuat arsip diagnosis dari localStorage:", e);
    }
  }, []);

  // Save report to local storage
  const handleSaveDiagnosisReport = (summary: string) => {
    const newReport: SavedDiagnosis = {
      id: "report-" + Date.now(),
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      selectedType: selectedType,
      chatHistorySummary: summary
    };

    const updated = [newReport, ...savedReports];
    setSavedReports(updated);
    localStorage.setItem("socionics_reports", JSON.stringify(updated));
    setActiveTab("history"); // Instantly navigate to history
    setViewingReportId(newReport.id);
  };

  const handleDeleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedReports.filter(r => r.id !== id);
    setSavedReports(updated);
    localStorage.setItem("socionics_reports", JSON.stringify(updated));
    if (viewingReportId === id) {
      setViewingReportId(null);
    }
  };

  const typeInfo = SOCIOTYPES[selectedType];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white" id="main-applet">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-radial-gradient from-indigo-950/15 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Header section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm tracking-tighter text-white shadow shadow-indigo-500/20">
                SΩ
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white font-sans sm:text-2xl">
                  Socionics GPT
                </h1>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-normal leading-relaxed">
              Kalkulator Teori Model A, Analis 15 Dikotomi Reinin, dan Konsul Diagnostik GPT-Counselor berdasarkan rujukan baku Aushra Augusta tanpa penyelewengan pop-MBTI.
            </p>
          </div>

          {/* Quick Context panel */}
          <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <span className="text-[10px] font-mono text-slate-500 block">PROFIL AKTIF:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-indigo-950">
                {typeInfo.code}
              </span>
              <span className="text-xs text-slate-300 font-bold">{typeInfo.pseudonym}</span>
              <span className="text-[10px] text-slate-500">({typeInfo.mbtiEquivalent})</span>
            </div>
          </div>
        </header>

        {/* Meticulous Editorial Critique Banner from ENTJ 3w4 analyst */}
        {showCritique && (
          <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/40 to-indigo-950/10 p-5 rounded-2xl border border-indigo-900/40 mb-6 flex items-start gap-4 shadow-xl">
            <div className="p-2.5 bg-indigo-950 border border-indigo-800/80 text-indigo-400 rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-400 uppercase">
                  KRITIK EDITOR PARADIGMA J-K (ENTJ 3w4 PERFEKSIONIS)
                </span>
                <button 
                  onClick={() => setShowCritique(false)}
                  className="text-slate-500 hover:text-slate-300 text-xs font-mono font-bold hover:underline cursor-pointer"
                >
                  TUTUP KRITIK &times;
                </button>
              </div>
              <h4 className="text-sm font-bold text-slate-200 mt-1 font-sans">
                Kenapa Tes Kepribadian Online Anda Sampah? Menjawab Kontradiksi MBTI vs Model A
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-5xl leading-normal">
                Mayoritas komunitas mencampuradukkan MBTI dengan Socionics tanpa mengerti bahwa sistem dinamis kognisinya bertolak belakang. 
                <strong className="text-indigo-300"> MBTI menyamakan INTJ dengan INTj Socionics.</strong> Ini adalah pembodohan kolektif. 
                INTJ MBTI (Ni-Te) memetakan murni ke <strong className="text-indigo-400 font-mono">ILI (Balzac)</strong> di Socionics, 
                sedangkan INTj Socionics adalah <strong className="text-indigo-400 font-mono">LII (Robespierre)</strong> yang kognisi utamanya adalah <strong className="text-indigo-300">Ti-Ne</strong>. 
                Aplikasi ini kami desain untuk memutus sisa-sisa kontradiksi tersebut membedah fungsi kerentanan (PoLR) mutlak Anda dan memaksa kognisi Anda sejajar dengan literatur orisinal Augusta, bukannya diagram trait malas berkuisioner 4-pertanyaan.
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation Menu bar */}
        <div className="flex border-b border-slate-800 gap-2 mb-6 overflow-x-auto scrollbar-none pb-px">
          <button
            onClick={() => setActiveTab("profiler")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "profiler"
                ? "border-indigo-500 text-indigo-400 bg-indigo-950/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Profiler Model A & Relasi
          </button>
          
          <button
            onClick={() => setActiveTab("reinin")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "reinin"
                ? "border-indigo-500 text-indigo-400 bg-indigo-950/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
          >
            <Scale className="w-4 h-4" />
            Dikotomi Reinin Matematik
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "chat"
                ? "border-indigo-500 text-indigo-400 bg-indigo-950/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Analis Diagnosa AI
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap relative ${
              activeTab === "history"
                ? "border-indigo-500 text-indigo-400 bg-indigo-950/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
          >
            <Archive className="w-4 h-4" />
            Arsip Hasil Diagnosa
            {savedReports.length > 0 && (
              <span className="ml-1.5 bg-indigo-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {savedReports.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Canvas Content area */}
        <main className="space-y-6">
          
          {/* TAB 1: PROFILER */}
          {activeTab === "profiler" && (
            <div className="flex flex-col gap-6">
              
              {/* Type Grid Selector categorised by Quadra */}
              <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">DAFTAR KATEGORI QUADRA</span>
                <h3 className="text-sm font-bold text-slate-200 mt-0.5 mb-3">Pilih Sosiotipe untuk Diagnosa Introspektif</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Alpha Quadra panel */}
                  <div className="bg-slate-900/10 p-3 rounded-xl border border-emerald-950/40">
                    <div className="flex items-center justify-between border-b border-emerald-950/40 pb-1.5 mb-2">
                      <span className="text-xs font-sans font-bold text-emerald-400">Quadra Alpha</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">Val: Fe, Ti, Ne, Si</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[SociotypeCode.ILE, SociotypeCode.SEI, SociotypeCode.ESE, SociotypeCode.LII].map((code) => (
                        <button
                          key={code}
                          onClick={() => setSelectedType(code)}
                          className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                            selectedType === code
                              ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-300 font-bold"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className="font-mono font-bold">{code}</div>
                          <div className="text-[10px] truncate">{SOCIOTYPES[code].pseudonym}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Beta Quadra panel */}
                  <div className="bg-slate-900/10 p-3 rounded-xl border border-rose-950/40">
                    <div className="flex items-center justify-between border-b border-rose-950/40 pb-1.5 mb-2">
                      <span className="text-xs font-sans font-bold text-rose-400">Quadra Beta</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">Val: Fe, Ti, Se, Ni</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[SociotypeCode.EIE, SociotypeCode.LSI, SociotypeCode.SLE, SociotypeCode.IEI].map((code) => (
                        <button
                          key={code}
                          onClick={() => setSelectedType(code)}
                          className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                            selectedType === code
                              ? "bg-rose-950/40 border-rose-500/80 text-rose-300 font-bold"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className="font-mono font-bold">{code}</div>
                          <div className="text-[10px] truncate">{SOCIOTYPES[code].pseudonym}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gamma Quadra panel */}
                  <div className="bg-slate-900/10 p-3 rounded-xl border border-sky-950/40">
                    <div className="flex items-center justify-between border-b border-sky-950/40 pb-1.5 mb-2">
                      <span className="text-xs font-sans font-bold text-sky-400">Quadra Gamma</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">Val: Te, Fi, Se, Ni</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[SociotypeCode.SEE, SociotypeCode.ILI, SociotypeCode.LIE, SociotypeCode.ESI].map((code) => (
                        <button
                          key={code}
                          onClick={() => setSelectedType(code)}
                          className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                            selectedType === code
                              ? "bg-sky-950/40 border-sky-500/80 text-sky-300 font-bold"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className="font-mono font-bold">{code}</div>
                          <div className="text-[10px] truncate">{SOCIOTYPES[code].pseudonym}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delta Quadra panel */}
                  <div className="bg-slate-900/10 p-3 rounded-xl border border-purple-950/40">
                    <div className="flex items-center justify-between border-b border-purple-950/40 pb-1.5 mb-2">
                      <span className="text-xs font-sans font-bold text-purple-400">Quadra Delta</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">Val: Te, Fi, Ne, Si</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[SociotypeCode.LSE, SociotypeCode.EII, SociotypeCode.IEE, SociotypeCode.SLI].map((code) => (
                        <button
                          key={code}
                          onClick={() => setSelectedType(code)}
                          className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                            selectedType === code
                              ? "bg-purple-950/40 border-purple-500/80 text-purple-300 font-bold"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className="font-mono font-bold">{code}</div>
                          <div className="text-[10px] truncate">{SOCIOTYPES[code].pseudonym}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Type Overview card */}
              <div className="bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-slate-800/85 pb-5 gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono font-black text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-indigo-950 shadow">
                        {typeInfo.code}
                      </span>
                      <h2 className="text-2xl font-bold font-sans text-slate-100 tracking-tight">
                        {typeInfo.pseudonym} &mdash; {typeInfo.englishName}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-2 font-mono">
                      <span>Rusia: <strong className="text-slate-300">{typeInfo.russianName}</strong></span>
                      <span>Alias Gulenko: <strong className="text-slate-300">{typeInfo.gulenkoAlias}</strong></span>
                      <span>MBTI Equivalent: <strong className="text-slate-300">{typeInfo.mbtiEquivalent}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-300 font-bold bg-slate-955 px-3 py-1.5 rounded-lg border border-slate-800">
                      Quadra: {typeInfo.quadra}
                    </span>
                    <button
                      onClick={() => setSelectedType(typeInfo.duals)}
                      className="text-xs text-indigo-300 font-bold bg-indigo-950/40 hover:bg-indigo-900/30 border border-indigo-900/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Dual: {typeInfo.duals} &rarr;
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                  {/* Text descriptions */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">KOMPETENSI PSIKOKOGNISI</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed leading-normal">
                        {typeInfo.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-800/40 pt-4">
                      <h4 className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider mb-2">ORISINALITAS REININ CHANNELS</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {typeInfo.keyTraits.map((trait) => (
                          <span key={trait} className="bg-slate-900 text-slate-300 border border-slate-800 text-[10px] px-2.5 py-1 rounded-md font-mono">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses cards */}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/5 border border-emerald-900/20 p-4 rounded-xl">
                      <h5 className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-2">KEKUATAN UTAMA</h5>
                      <ul className="space-y-1.5">
                        {typeInfo.strengths.map((st) => (
                          <li key={st} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-normal leading-relaxed">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">&bull;</span>
                            {st}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-950/5 border border-rose-900/20 p-4 rounded-xl">
                      <h5 className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider mb-2">KERENTANAN UTAMA</h5>
                      <ul className="space-y-1.5">
                        {typeInfo.weaknesses.map((wk) => (
                          <li key={wk} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-normal leading-relaxed">
                            <span className="text-rose-500 font-bold shrink-0 mt-0.5">&bull;</span>
                            {wk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embed Model A and Intertype Relations dashboards */}
              <ModelAGrid typeInfo={typeInfo} />
              <RelationsMatrix currentType={typeInfo} />
            </div>
          )}

          {/* TAB 2: REININ CALCULATOR */}
          {activeTab === "reinin" && (
            <ReininCalculator onSelectType={(code) => {
              setSelectedType(code);
              setActiveTab("profiler");
            }} />
          )}

          {/* TAB 3: AI DIAGNOSIS CHAT */}
          {activeTab === "chat" && (
            <CounselingChat 
              selectedType={selectedType} 
              onSaveDiagnosticsReport={handleSaveDiagnosisReport} 
            />
          )}

          {/* TAB 4: ARCHIVE HISTORY */}
          {activeTab === "history" && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6" id="history-section">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
                  <Archive className="w-5 h-5 text-indigo-400" />
                  Arsip & Berkas Laporan Diagnostik
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Seluruh transkrip diagnosa and evaluasi asisten ENTJ 3w4 tersimpan aman di peranti penyimpanan lokal peramban Anda.
                </p>
              </div>

              {savedReports.length === 0 ? (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-4">
                  <Archive className="w-12 h-12 text-slate-700 animate-pulse" />
                  <div>
                    <p className="text-sm font-bold text-slate-300 font-sans">Belum ada diagnosa yang diarsipkan</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Lakukan konsultasi dengan asisten AI di tab &quot;Analis Diagnosa AI&quot; lalu klik &quot;Arsipkan Laporan&quot; untuk mengunci transkrip kognisi Anda.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Sidebar: List of archived transcripts */}
                  <div className="lg:col-span-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {savedReports.map((report) => {
                      const details = SOCIOTYPES[report.selectedType];
                      const isSelected = viewingReportId === report.id;

                      return (
                        <div
                          key={report.id}
                          onClick={() => setViewingReportId(report.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-slate-900 border-indigo-500/50 shadow shadow-indigo-500/5"
                              : "bg-slate-950 border-slate-900 hover:border-slate-800"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-black text-indigo-400 bg-slate-950 border border-indigo-950 px-1.5 py-0.5 rounded">
                                {report.selectedType}
                              </span>
                              <span className="text-xs font-bold text-slate-200 truncate">{details.pseudonym}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-1.5">
                              <Clock className="w-3 h-3 shrink-0" />
                              <span className="truncate">{report.date}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleDeleteReport(report.id, e)}
                            className="p-1.5 rounded-md hover:bg-rose-950/20 text-slate-600 hover:text-rose-400 transition-colors shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Canvas: View Full report */}
                  <div className="lg:col-span-8">
                    {viewingReportId ? (() => {
                      const report = savedReports.find(r => r.id === viewingReportId);
                      if (!report) return null;
                      const details = SOCIOTYPES[report.selectedType];

                      return (
                        <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-4">
                          <div className="border-b border-slate-800 pb-3 flex items-start justify-between flex-wrap gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-950 text-indigo-400 border border-indigo-900/60 text-xs font-mono font-bold px-2 py-0.5 rounded">
                                  {report.selectedType}
                                </span>
                                <h4 className="text-sm font-bold font-sans text-slate-200">
                                  Dokumen Evaluasi Kognitif {details.pseudonym}
                                </h4>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1">
                                Diarsipkan pada {report.date}
                              </p>
                            </div>
                            
                            <button
                              onClick={() => {
                                setSelectedType(report.selectedType);
                                setActiveTab("profiler");
                              }}
                              className="text-[10px] font-mono font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer hover:underline"
                            >
                              MUAT MODEL A &rarr;
                            </button>
                          </div>

                          {/* Render Full report content */}
                          <div className="bg-slate-955 p-5 rounded-xl border border-slate-850 max-h-[460px] overflow-y-auto scrollbar-thin text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
                            {report.chatHistorySummary ? (
                              report.chatHistorySummary.split("\n").map((line, idx) => {
                                if (line.startsWith("### ")) {
                                  return <h5 key={idx} className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mt-4 mb-1.5">{line.replace("### ", "")}</h5>;
                                }
                                if (line.startsWith("## ")) {
                                  return <h4 key={idx} className="text-sm font-sans font-black text-slate-100 tracking-tight mt-5 mb-2 border-b border-slate-800 pb-1">{line.replace("## ", "")}</h4>;
                                }
                                if (line.startsWith("# ")) {
                                  return <h3 key={idx} className="text-base font-sans font-black text-slate-200 mt-6 mb-2">{line.replace("# ", "")}</h3>;
                                }
                                if (line.startsWith("- ") || line.startsWith("* ")) {
                                  return (
                                    <li key={idx} className="list-disc list-inside text-xs text-slate-300 ml-2 mt-1">
                                      {line.substring(2)}
                                    </li>
                                  );
                                }
                                if (line.trim() === "") return <div key={idx} className="h-2" />;
                                return <p key={idx} className="mt-1 leading-normal leading-relaxed">{line}</p>;
                              })
                            ) : (
                              <p className="italic text-slate-500">Isi transkrip tidak ditemukan.</p>
                            )}
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="bg-slate-900/10 border border-slate-800 border-dashed p-10 rounded-2xl text-center text-slate-500">
                        <Clock className="w-8 h-8 mx-auto text-slate-700 animate-pulse mb-3" />
                        <p className="text-xs font-bold text-slate-400">Pilih berkas arsip di sebelah kiri untuk menelaah transkrip evaluasi kognisi.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
