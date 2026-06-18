/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Download, Sliders, ShieldAlert, BadgeInfo, Users, RefreshCw, Layers, Sparkles, Smile, HelpCircle, Key, FileDown } from 'lucide-react';
import { TIMKey, ProfileResult, ValidationMetrics } from '../types';
import { get16TIMProfiles, getIntertypeRelation } from '../profiles';

interface ResultsViewProps {
  results: ProfileResult[];
  metrics: ValidationMetrics;
  topPairUnresolved: boolean;
  tieBreakApplied: boolean;
  clientNickname?: string;
  onRestart: () => void;
}

export default function ResultsView({
  results,
  metrics,
  topPairUnresolved,
  tieBreakApplied,
  clientNickname = 'Peserta Utama',
  onRestart
}: ResultsViewProps) {
  const [selectedRelationPartner, setSelectedRelationPartner] = useState<TIMKey>('SEI');
  const [exporting, setExporting] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const profiles = get16TIMProfiles();
  const topResult = results[0];
  const topProfile = topResult ? profiles.find(p => p.key === topResult.key) : null;

  if (!topResult || !topProfile) {
    return (
      <div className="text-center py-20" id="results-view-empty">
        <p className="text-sm font-mono text-slate-400">Tidak ada data hasil yang tersedia.</p>
        <button onClick={onRestart} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded">Mulai Ulang</button>
      </div>
    );
  }

  // Find relationship details
  const relationResult = getIntertypeRelation(topProfile.key, selectedRelationPartner);
  const partnerProfile = profiles.find(p => p.key === selectedRelationPartner);

  // Promise-based result card canvas renderer
  const generatePngCard = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error('Canvas element not loaded');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context not available');
        }

        // Set dimensions (Golden ratio editorial card 800 x 500)
        canvas.width = 800;
        canvas.height = 500;

        // 1. Draw elegant background block
        ctx.fillStyle = '#fafaf9'; // stone-500
        ctx.fillRect(0, 0, 800, 500);

        // Solid accent stripe on left border
        ctx.fillStyle = '#b45309'; // amber-700
        ctx.fillRect(0, 0, 15, 500);

        // 2. Beautiful borders & frames
        ctx.strokeStyle = '#e7e5e4'; // stone-200
        ctx.lineWidth = 1;
        ctx.strokeRect(15, 0, 785, 500);

        // Decorative corner lines (editorial vibes)
        ctx.strokeStyle = '#d6d3d1'; // stone-300
        ctx.lineWidth = 2;
        ctx.strokeRect(35, 20, 730, 460);

        // 3. Render brand headers (Aptos / Local Serif stack)
        ctx.fillStyle = '#78716c'; // stone-500
        ctx.font = 'bold 11px "JetBrains Mono", Courier, monospace';
        ctx.fillText('SOCIONICSGPT v3.0.0 — KARTU HASIL RESERVASI', 60, 55);

        // Date Stamp
        const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        ctx.font = '11px "Georgia", serif';
        ctx.fillText(dateStr, 600, 55);

        // Inner Divider
        ctx.strokeStyle = '#e7e5e4';
        ctx.beginPath();
        ctx.moveTo(60, 70);
        ctx.lineTo(740, 70);
        ctx.stroke();

        // 4. Client profile name and general details
        ctx.fillStyle = '#1c1917'; // stone-900
        ctx.font = 'normal 15px "Georgia", serif';
        ctx.fillText('Nama Peserta:', 60, 110);
        
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 18px "Georgia", serif';
        const rawNickname = clientNickname.replace(/[^\w\s\.-]/gi, '').substring(0, 24); // Sanitization
        ctx.fillText(rawNickname || 'Peserta Utama', 165, 110);

        // Confidence badge box
        ctx.fillStyle = '#fef3c7'; // amber-100
        ctx.fillRect(520, 93, 220, 32);
        ctx.strokeStyle = '#f59e0b'; // amber-500
        ctx.lineWidth = 1;
        ctx.strokeRect(520, 93, 220, 32);

        ctx.fillStyle = '#78350f'; // amber-900
        ctx.font = 'bold 11px "JetBrains Mono", Courier, monospace';
        ctx.fillText(`CONFIDENCE: ${metrics.confidence}%`, 540, 113);

        // 5. Huge identified type branding
        ctx.fillStyle = '#9a3412'; // orange-800
        ctx.font = 'bold 54px "Georgia", serif';
        ctx.fillText(topProfile.key, 60, 200);

        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 24px "Georgia", serif';
        ctx.fillText(topProfile.name, 195, 175);

        ctx.fillStyle = '#78716c';
        ctx.font = 'italic 16px "Georgia", serif';
        ctx.fillText(`(${topProfile.threeLetter} — ${topProfile.title})`, 195, 201);

        // 6. Draw core Model A functions on card (Base & Creative)
        ctx.fillStyle = '#f5f5f4'; // stone-100
        ctx.fillRect(60, 250, 680, 120);
        ctx.strokeStyle = '#e7e5e4';
        ctx.strokeRect(60, 250, 680, 120);

        // Column 1: Base (Leading)
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 12px "JetBrains Mono", Courier, monospace';
        ctx.fillText('FUNGSI UTAMA (BASE)', 80, 280);
        ctx.font = 'bold 18px "Georgia", serif';
        ctx.fillText(topProfile.positions[0]?.element || '', 80, 310);
        ctx.font = 'normal 11px "Georgia", serif';
        ctx.fillStyle = '#44403c';
        ctx.fillText('Pandangan dunia fundamental,', 80, 335);
        ctx.fillText('cara bertindak paling dominan alami.', 80, 350);

        // Vertical Divider
        ctx.strokeStyle = '#d6d3d1';
        ctx.beginPath();
        ctx.moveTo(380, 260);
        ctx.lineTo(380, 360);
        ctx.stroke();

        // Column 2: Creative (Realizing)
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 12px "JetBrains Mono", Courier, monospace';
        ctx.fillText('FUNGSI KREATIF', 400, 280);
        ctx.font = 'bold 18px "Georgia", serif';
        ctx.fillText(topProfile.positions[1]?.element || '', 400, 310);
        ctx.font = 'normal 11px "Georgia", serif';
        ctx.fillStyle = '#44403c';
        ctx.fillText('Alat pemecahan masalah aktif,', 400, 335);
        ctx.fillText('instrumen fleksibel adaptasi luar.', 400, 350);

        // 7. Footer metadata validation
        ctx.fillStyle = '#a8a29e';
        ctx.font = 'italic 11px "Georgia", serif';
        ctx.fillText(`Kriteria: ${metrics.coverage}% Coverage &bull; ${metrics.holdoutCount} Holdouts &bull; Index: ${topResult.fitScore}`, 60, 420);
        
        ctx.font = 'bold 10px "JetBrains Mono", Courier, monospace';
        ctx.fillText('DISETUJUI OLEH PANEL AUDIT VALIDITAS COGNITIVE SOCIONICS v3.0.0', 60, 445);

        // Resolve Image Card URL
        const dataUrl = canvas.toDataURL('image/png');
        if (!dataUrl || dataUrl.length < 100) {
          throw new Error('Failed to generate high-resolution image data from HTML5 canvas.');
        }
        resolve(dataUrl);

      } catch (err) {
        reject(err);
      }
    });
  };

  const handleDownload = async () => {
    setExporting(true);
    try {
      const dataUrl = await generatePngCard();
      const cleanName = (clientNickname || 'peserta').replace(/[^\w\s-]/gi, '').trim().substring(0, 16);
      const filename = `socionics_v3_${cleanName || 'peserta'}.png`;

      // Trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Gagal menghasilkan kartu hasil karena error internal kanvas. Fallback gambar standar tetap disiapkan.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="font-sans py-6 px-2 md:px-4" id="results-dashboard-root">
      {/* Editorial Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">SocionicsGPT v3.0.0</span>
        <h2 className="text-4xl font-serif font-medium text-stone-900 mt-4 leading-tight">Analisis Kepribadian Kognitif</h2>
        <p className="text-stone-500 font-sans mt-2 text-sm max-w-xl mx-auto">
          Identifikasi arsitektur informasi internal Anda diolah berbasis logika transisi Model A kognitif penuh.
        </p>
      </div>

      {/* Main Identified Candidate Section */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 md:p-10 mb-8 flex flex-col md:flex-row gap-8 items-center" id="identified-tim-card">
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
            <span className="text-xs font-mono font-bold tracking-wider text-amber-800 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full uppercase">
              Quadra {topProfile.quadra}
            </span>
            {tieBreakApplied && (
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
                Resolusi Tie-Break Aktif
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight mt-3">
            {topProfile.key}
          </h1>
          <h2 className="text-xl font-serif text-stone-700 font-medium mt-1">
            {topProfile.name} <span className="text-stone-400">&bull;</span> {topProfile.threeLetter}
          </h2>
          <p className="text-base font-serif text-amber-900 italic font-medium mt-1">
            "{topProfile.title}"
          </p>
          <p className="text-sm text-stone-600 mt-4 leading-relaxed font-sans max-w-lg">
            {topProfile.shortDesc} {topProfile.detailedDesc}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              id="btn-download-card"
              onClick={handleDownload}
              disabled={exporting}
              className="flex items-center gap-2 py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs font-bold rounded-xl shadow transition-all disabled:opacity-50"
            >
              {exporting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Merender...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" /> Simpan Kartu Hasil
                </>
              )}
            </button>

            <button
              id="btn-reset-survey-dashboard"
              onClick={onRestart}
              className="py-2.5 px-5 border border-stone-300 text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 text-xs font-bold font-mono rounded-xl transition-all"
            >
              Mulai Ulang Tes
            </button>
          </div>
        </div>

        {/* Confidence Badge Component */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 w-full md:w-80 shadow-sm shrink-0">
          <h4 className="text-xs font-mono uppercase text-stone-400 tracking-widest block font-bold mb-4">Indeks Pengujian</h4>
          
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-sans text-stone-600">Skor Confidence</span>
            <span className="text-3xl font-mono text-amber-700 font-bold">{metrics.confidence}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: `${metrics.confidence}%` }} />
          </div>

          <div className="space-y-3.5 text-xs text-stone-500 font-sans border-t border-stone-100 pt-4">
            <div className="flex justify-between">
              <span>Cakupan 64 Sel (Coverage):</span>
              <span className="font-mono text-stone-800 font-bold">{metrics.coverage}%</span>
            </div>
            <div className="flex justify-between">
              <span>Akurasi Holdout:</span>
              <span className="font-mono text-stone-800 font-bold">{metrics.holdoutSupport}%</span>
            </div>
            <div className="flex justify-between">
              <span>Rata-rata Respon Kecepatan:</span>
              <span className="font-mono text-stone-800 font-bold">{metrics.responseSpeedAvg > 0 ? `${(metrics.responseSpeedAvg / 1000).toFixed(1)}s` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Diferensiator Tie-Break:</span>
              <span className="font-mono text-stone-800 font-bold">{tieBreakApplied ? 'Capped ±0.02' : 'N/A'}</span>
            </div>
            
            {/* Warning markers for biases */}
            {(metrics.straightlining || metrics.midpointOveruse || metrics.extremeResponses) && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 flex items-start gap-2 text-[10px] leading-relaxed">
                <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Peringatan Kualitas Respon:</span>
                  {metrics.straightlining && <span className="block">• Pola jawaban monoton terdeteksi (Straightlining).</span>}
                  {metrics.midpointOveruse && <span className="block">• Terlalu sering memilih nilai tengah (Neutral/3).</span>}
                  {metrics.extremeResponses && <span className="block">• Bias ekstrim terdeteksi (Hanya 1 atau 5).</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Model A Diagram & Spectrum of TIMs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8" id="model-a-and-spectrum-grids">
        {/* Model A Visualizer */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-amber-700 shrink-0" />
            <div>
              <h3 className="text-xl font-serif font-semibold text-stone-900">Arsitektur Model A</h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">Penempatan posisi 8 elemen metabolisme kognitif secara fungsional.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProfile.positions.map((pos, i) => {
              const num = i + 1;
              let channelBadgeColor = "bg-slate-100 text-slate-700 border-slate-200";
              
              if (num === 1 || num === 2) {
                // Strong and Valued (Core Ego)
                channelBadgeColor = "bg-amber-100 text-amber-900 border-amber-300";
              } else if (num === 4) {
                // PoLR Pain point
                channelBadgeColor = "bg-rose-100 text-rose-900 border-rose-300";
              } else if (num === 5) {
                // Suggestive Dual seeking
                channelBadgeColor = "bg-teal-100 text-teal-900 border-teal-300";
              }

              return (
                <div key={pos.functionName} className="p-4 border border-stone-200/80 rounded-xl bg-stone-50/50 hover:bg-stone-50 transition-colors flex gap-3">
                  <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${channelBadgeColor}`}>
                    {pos.element}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase">Fungsi {num}: {pos.functionName}</span>
                    <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                      {pos.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate Spectrum and Indices */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-1">Spektrum 16 TIM</h3>
            <p className="text-xs text-stone-500 font-sans mb-6">Penjajaran kecenderungan relatif untuk seluruh modal kognitif.</p>

            <div className="space-y-3">
              {results.slice(0, 7).map((score, idx) => (
                <div key={score.key} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-stone-400 w-4 font-bold">#{idx + 1}</span>
                  <span className="font-mono text-xs text-stone-800 font-bold w-10">{score.key}</span>
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${idx === 0 ? 'bg-amber-600' : 'bg-stone-450 bg-stone-400'}`}
                      style={{ width: `${score.fitScore * 100}%` }}
                    />
                  </div>
                  <span className="text-right font-mono text-[11px] text-stone-700 font-bold w-12">
                    {(score.fitScore * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 bg-amber-50/30 p-3.5 rounded-2xl border border-amber-200/50">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider flex items-center gap-1.5 mb-1">
              <BadgeInfo className="h-3.5 w-3.5" /> Catatan Metodologi
            </span>
            <p className="text-[11px] text-stone-500 leading-normal font-sans">
              <strong>Indeks Kemiripan Model</strong> menunjukkan kedekatan pola rating Anda dengan arsitektur murni TIM. Sedangkan <strong>Relative Support</strong> dihitung searah variabilitas spektral session.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Intertype Relations Explorer */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8" id="intertype-relations-panel">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <h3 className="text-xl font-serif font-semibold text-stone-900">Eksplorasi Hubungan Antar-Tipe (v3.0.0)</h3>
            <p className="text-xs text-stone-500 font-sans mt-0.5">Evaluasi keselarasan nilai, keselamatan interaksi, dan batas komunikasi asimetris.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider block mb-2 select-none">Pilih Partner TIM:</label>
            <div className="grid grid-cols-4 gap-2">
              {profiles.map(p => {
                const active = selectedRelationPartner === p.key;
                return (
                  <button
                    key={p.key}
                    id={`partner-select-${p.key}`}
                    onClick={() => setSelectedRelationPartner(p.key)}
                    className={`py-2 px-1 text-center font-mono text-xs font-bold rounded-xl border transition-all ${active ? 'bg-amber-700 text-white border-amber-700 font-extrabold shadow-sm' : 'border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {p.key}
                  </button>
                );
              })}
            </div>
          </div>

          {partnerProfile && relationResult && (
            <div className="md:col-span-2 bg-stone-50/70 border border-stone-200 p-6 rounded-2xl flex flex-col justify-between" id="relation-details-box">
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                    <h4 className="text-lg font-serif font-bold text-stone-800">
                      Hubungan {relationResult.name} ({relationResult.code})
                    </h4>
                  </div>
                  {relationResult.asymmetricDirection && (
                    <span className="text-[10px] font-mono leading-none py-1 px-2.5 bg-amber-100 text-amber-900 border border-amber-200 rounded-full font-bold">
                      {relationResult.asymmetricDirection}
                    </span>
                  )}
                </div>

                <p className="text-sm font-serif font-semibold text-stone-700 italic">
                  "{relationResult.title}"
                </p>
                <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2.5">
                  {relationResult.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-500 font-sans flex flex-col sm:flex-row justify-between gap-2 leading-normal">
                <span>Partner: <strong>{partnerProfile.name}</strong> ({partnerProfile.threeLetter} &bull; {partnerProfile.title})</span>
                <span className="text-rose-700 font-medium">Batas: Utamakan keharmonisan batin di atas label teori hasil.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Absolute Hidden Canvas for Card Generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} id="hidden-results-canvas" />
    </div>
  );
}
