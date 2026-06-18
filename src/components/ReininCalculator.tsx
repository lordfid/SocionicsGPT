import React, { useState } from "react";
import { ReininDichotomies, SociotypeCode } from "../types";
import { REININ_DICHOTOMIES_DATA, SOCIOTYPES } from "../data/socionicsData";
import { Scale, CheckCircle, HelpCircle, RefreshCw, AlertTriangle, Crosshair } from "lucide-react";

interface ReininCalculatorProps {
  onSelectType: (code: SociotypeCode) => void;
}

type SelectedDichotomies = Partial<ReininDichotomies>;

const DICHO_MEDIANS: { key: keyof ReininDichotomies; label: string; left: string; right: string; desc: string }[] = [
  {
    key: "extraversion",
    label: "Extraversion vs Introversion (Inti Dasar)",
    left: "Extraverted",
    right: "Introverted",
    desc: "Arah sirkuit metabolisme informasi eksternal (mengubah lanskap luar) vs internal (menjaga keselarasan dalam)."
  },
  {
    key: "sensing",
    label: "Sensing vs Intuition (Inti Dasar)",
    left: "Sensing",
    right: "Intuition",
    desc: "Konkret fisik dan sensorik saat ini vs asosiasi hipotetis dan prospek temporal masa depan."
  },
  {
    key: "logic",
    label: "Logic vs Ethics (Inti Dasar)",
    left: "Logic",
    right: "Ethics",
    desc: "Kausalitas hukum alam, kegunaan objektif vs sentimen emosional individu, moralitas, dan keselarasan relasi."
  },
  {
    key: "rational",
    label: "Rational vs Irrational (Inti Dasar)",
    left: "Rational",
    right: "Irrational",
    desc: "Orientasi tindakan berdasarkan hukum (j-type) vs tanggapan langsung pada gejolak situasi yang mengalir spontan (p-type)."
  },
  {
    key: "aristocracy",
    label: "Aristocracy vs Democracy",
    left: "Aristocratic",
    right: "Democratic",
    desc: "Melihat individu berdasarkan kelompok sosial/quadranya vs melihat orang secara murni individualistis tanpa predikat kelasisme."
  },
  {
    key: "carefree",
    label: "Carefree vs Farsighted",
    left: "Carefree",
    right: "Farsighted",
    desc: "Memecahkan masalah dengan mengandalkan info segar darinya vs membongkar basis arsip data lampau sebelum bertindak."
  },
  {
    key: "yielding",
    label: "Yielding vs Obstinate",
    left: "Yielding",
    right: "Obstinate",
    desc: "Melenturkan sumber daya material demi menyelamatkan keselarasan emosi vs memperjuangkan fisik habis-habisan walau moral terluka."
  },
  {
    key: "staticDynamic",
    label: "Static vs Dynamic",
    left: "Static",
    right: "Dynamic",
    desc: "Melihat semesta sebagai kumpulan rekaman slide foto yang independen (Ti, Ne, Se, Fi) vs melihat alam sebagai video alur gerak sinambung (Te, Ni, Fe, Si)."
  },
  {
    key: "tactical",
    label: "Tactical vs Strategic",
    left: "Tactical",
    right: "Strategic",
    desc: "Fokus pada manuver langkah taktis pendek demi menghindari rintangan vs bersetia pada peta sasaran jangka panjang berdurasi tahunan."
  },
  {
    key: "constructivist",
    label: "Constructivist vs Emotivest",
    left: "Constructivist",
    right: "Emotivest",
    desc: "Menyerap logika dahulu sebelum terpengaruh suasana hati vs masuk ke gelombang emosional dahulu sebelum merestrukturisasi gagasan."
  },
  {
    key: "positivist",
    label: "Positivist vs Negativist",
    left: "Positivist",
    right: "Negativist",
    desc: "Mencari kelebihan yang ada di hadapannya dahulu vs melihat letak kecacatan dan apa yang hilang dari suatu skenario."
  },
  {
    key: "judicious",
    label: "Judicious vs Decisive",
    left: "Judicious",
    right: "Decisive",
    desc: "Menjaga iklim santai, berdiskusi panjang, tegang hanya saat eksekusi vs tegang saat perencanaan dan santai setelah pertempuran usai."
  },
  {
    key: "merry",
    label: "Merry vs Serious",
    left: "Merry",
    right: "Serious",
    desc: "Ego dipandu oleh hubungan logika impersonal Ti-Fe vs ego dipandu oleh kegunaan bisnis Te-Fi."
  },
  {
    key: "process",
    label: "Process vs Result",
    left: "Process",
    right: "Result",
    desc: "Tenggelam menikmati detail proses bertahap tanpa buru-buru vs berorientasi memotong jalur demi meraih produk akhir secepat mungkin."
  },
  {
    key: "asking",
    label: "Asking vs Declaring",
    left: "Asking",
    right: "Declaring",
    desc: "Berkomunikasi dengan cara melempar pertanyaan pemantik dialog vs berbicara dalam bentuk pernyataan satu arah yang asertif."
  }
];

export default function ReininCalculator(props: ReininCalculatorProps) {
  const { onSelectType } = props;
  const [selected, setSelected] = useState<SelectedDichotomies>({});

  const handleToggle = (key: keyof ReininDichotomies, value: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[key] === value) {
        delete next[key]; // Unselect if clicked again
      } else {
        // We know value fits because options are strictly left/right
        next[key] = value as any;
      }
      return next;
    });
  };

  const handleReset = () => {
    setSelected({});
  };

  // Compute fit score for each of the 16 types
  const selectedKeys = Object.keys(selected) as (keyof ReininDichotomies)[];
  const totalSelected = selectedKeys.length;

  const typeScores = Object.keys(REININ_DICHOTOMIES_DATA).map((codeStr) => {
    const code = codeStr as SociotypeCode;
    const typeDichos = REININ_DICHOTOMIES_DATA[code];
    let matchCount = 0;

    selectedKeys.forEach((key) => {
      if (selected[key] === typeDichos[key]) {
        matchCount++;
      }
    });

    const scorePercent = totalSelected > 0 ? Math.round((matchCount / totalSelected) * 100) : 0;

    return {
      code,
      matchCount,
      scorePercent,
      dichos: typeDichos
    };
  });

  // Sort by score percent descending
  typeScores.sort((a, b) => b.scorePercent - a.scorePercent);

  const topMatch = typeScores[0];
  const hasContradiction = totalSelected > 0 && topMatch.scorePercent < 100;

  // Find exact contradictions for the top matching type to help users
  const getContradictoryDichos = () => {
    if (!hasContradiction || !topMatch) return [];
    const topDichos = topMatch.dichos;
    return selectedKeys.filter((key) => selected[key] !== topDichos[key]);
  };

  const contradictions = getContradictoryDichos();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="reinin-section">
      {/* Selector Panels */}
      <div className="xl:col-span-8 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              Tabel Matriks Konsistensi 15 Dikotomi Reinin
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Tentukan orientasi kognisi Anda. Sistem akan mencari kecocokan sosiotipe dengan akurasi matematis murni.
            </p>
          </div>
          <button
            onClick={handleReset}
            disabled={totalSelected === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-300 hover:border-slate-500 hover:bg-slate-850 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>

        {/* List of Dichotomies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-2 scrollbar-thin">
          {DICHO_MEDIANS.map((dicho) => {
            const currentVal = selected[dicho.key];
            const leftSelected = currentVal === dicho.left;
            const rightSelected = currentVal === dicho.right;

            return (
              <div
                key={dicho.key}
                className={`p-3.5 rounded-xl border transition-all flex flex-col gap-2 ${
                  currentVal
                    ? "bg-slate-900/40 border-slate-700/80"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-800"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{dicho.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5 leading-relaxed">{dicho.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
                  <button
                    onClick={() => handleToggle(dicho.key, dicho.left)}
                    className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      leftSelected
                        ? "bg-indigo-900/30 text-indigo-300 border-indigo-500 shadow-lg shadow-indigo-500/5 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {dicho.left}
                  </button>
                  <button
                    onClick={() => handleToggle(dicho.key, dicho.right)}
                    className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      rightSelected
                        ? "bg-indigo-900/30 text-indigo-300 border-indigo-500 shadow-lg shadow-indigo-500/5 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {dicho.right}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Math results panel */}
      <div className="xl:col-span-4 flex flex-col gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">HASIL KALKULATOR</span>
            <h4 className="text-sm font-bold text-slate-200 mt-0.5">Analisis Matematika Reinin</h4>

            {totalSelected === 0 ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-3">
                <HelpCircle className="w-10 h-10 text-slate-600 animate-pulse" />
                <p className="text-xs max-w-xs leading-relaxed leading-normal">
                  Klik pilihan dikotomi di sebelah kiri untuk mulai kalkulasi tipe Socionics yang rasional dan konsisten menurut buku.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-3">
                {/* Score Summary Box */}
                <div className={`p-4 rounded-xl border ${hasContradiction ? 'bg-amber-950/10 border-amber-900/30' : 'bg-emerald-950/10 border-emerald-900/30'}`}>
                  <div className="flex items-start gap-3">
                    {hasContradiction ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">
                        {hasContradiction ? "Deteksi Kontradiksi Kognitif!" : "Sirkuit Kognisi Konsisten!"}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal leading-relaxed">
                        {hasContradiction 
                          ? `Ditemukan ${contradictions.length} dikotomi yang berlawanan arah dengan sosiotipe kecocokan terdekat Anda (${topMatch.code}).`
                          : `Luar biasa! Konfigurasi 15 Dikotomi Reinin Anda cocok 100% dan sejajar murni dengan sosiotipe ${topMatch.code}.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contradictory list */}
                {hasContradiction && (
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <span className="text-[9px] font-mono text-amber-400 uppercase font-bold block mb-1">KOMPARASI ELEMEN ERROR:</span>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
                      {contradictions.map((key) => {
                        const info = DICHO_MEDIANS.find((d) => d.key === key);
                        return (
                          <div key={key} className="text-[10px] text-slate-300 flex items-center justify-between border-b border-slate-900 pb-1">
                            <span className="font-medium text-slate-400 font-sans">{info?.label.split(" ")[0]}</span>
                            <span className="font-mono text-slate-500 flex items-center gap-1">
                              Sel: <strong className="text-rose-400 font-bold">{selected[key]}</strong> &rarr; Seharusnya: <strong className="text-emerald-400 font-bold">{topMatch.dichos[key]}</strong>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Recommendations List */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">KEMUNGKINAN COCOK (TOP MATCHES)</span>
                  <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                    {typeScores.slice(0, 4).map((m, index) => {
                      const details = SOCIOTYPES[m.code];
                      return (
                        <div
                          key={m.code}
                          className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                            index === 0
                              ? "bg-slate-900 border-indigo-500 shadow shadow-indigo-500/10"
                              : "bg-slate-950 border-slate-900"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-black text-indigo-400 bg-slate-950 border border-indigo-950 px-1.5 py-0.5 rounded">
                                {m.code}
                              </span>
                              <span className="text-xs font-bold text-slate-200">{details.pseudonym}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-sans mt-0.5 truncate max-w-[180px]">
                              {details.englishName}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-indigo-300 tracking-wide">
                              {m.scorePercent}% Match
                            </span>
                            <button
                              onClick={() => onSelectType(m.code)}
                              className="block text-[9px] font-mono font-black text-indigo-400 hover:text-indigo-200 mt-1 cursor-pointer"
                            >
                              PILIH TIPE &rarr;
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {totalSelected > 0 && (
            <div className="border-t border-slate-800/60 pt-4 mt-4 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase">SELECTED CHANNELS</p>
                <p className="text-xs font-bold text-slate-200 font-sans">{totalSelected} / 15 Dikotomi</p>
              </div>
              <button
                disabled={!topMatch}
                onClick={() => onSelectType(topMatch.code)}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs px-3.5 py-2 rounded-lg cursor-pointer transition-all"
              >
                <Crosshair className="w-3.5 h-3.5" />
                Validasi {topMatch?.code}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
