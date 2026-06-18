import React, { useState } from "react";
import { SociotypeInfo, ModelAPosition, InformationElementCode } from "../types";
import { INFORMATIONAL_ELEMENTS } from "../data/socionicsData";
import { Info, ShieldAlert, Sparkles, Zap, Heart, Database, Compass, EyeOff } from "lucide-react";

interface ModelAGridProps {
  typeInfo: SociotypeInfo;
}

interface BlockDetail {
  name: string;
  desc: string;
  css: string;
  functions: { pos: ModelAPosition; rank: number; label: string; dim: string; icon: any }[];
}

const BLOCKS: BlockDetail[] = [
  {
    name: "Blok Ego (Kesadaran Akbar)",
    desc: "Blok paling sadar, bernilai, dan aktif secara sosial. Menentukan inti kekuatan kepribadian, keyakinan intelektual, dan gaya hidup aktif Anda.",
    css: "border-emerald-500/30 bg-emerald-950/10",
    functions: [
      { pos: ModelAPosition.Leading, rank: 1, label: "Leading (Garis Depan)", dim: "4D (Pengalaman, Norma, Situasi, Waktu)", icon: Zap },
      { pos: ModelAPosition.Creative, rank: 2, label: "Creative (Pencipta)", dim: "3D (Pengalaman, Norma, Situasi)", icon: Sparkles }
    ]
  },
  {
    name: "Blok Super-Ego (Pertahanan Sosial & Tugas)",
    desc: "Blok sadar namun tidak bernilai. Di sinilah letak kewajiban sosial, tuntutan formalitas, dan titik kelemahan rasa sakit (PoLR) terdalam Anda.",
    css: "border-rose-500/30 bg-rose-950/10",
    functions: [
      { pos: ModelAPosition.Role, rank: 3, label: "Role (Peran Formal)", dim: "2D (Pengalaman, Norma)", icon: Compass },
      { pos: ModelAPosition.Vulnerable, rank: 4, label: "Vulnerable (PoLR - Titik Retak)", dim: "1D (Hanya Pengalaman Pribadi)", icon: ShieldAlert }
    ]
  },
  {
    name: "Blok Super-Id (Dambaan Hati & Kemitraan)",
    desc: "Blok bawah sadar yang sangat dinilai. Bersifat reseptif, haus akan asupan eksternal, dan menjadi jangkar kenyamanan yang dicari dari pasangan Dual Anda.",
    css: "border-sky-500/30 bg-sky-950/10",
    functions: [
      { pos: ModelAPosition.Suggestive, rank: 5, label: "Suggestive (Dambaan Bawah Sadar)", dim: "1D (Hanya Pengalaman)", icon: Heart },
      { pos: ModelAPosition.Mobilizing, rank: 6, label: "Mobilizing (Penggerak Aksi)", dim: "2D (Pengalaman, Norma)", icon: Database }
    ]
  },
  {
    name: "Blok Id (Kekuatan Latar Belakang)",
    desc: "Blok bawah sadar yang tidak dinilai namun sangat kuat. Berjalan otomatis di latar belakang untuk menyaring bahaya, melindungi diri, dan membantah argumen.",
    css: "border-purple-500/30 bg-purple-950/10",
    functions: [
      { pos: ModelAPosition.Ignoring, rank: 7, label: "Ignoring (Pelemah/Membatasi)", dim: "3D (Pengalaman, Norma, Situasi)", icon: EyeOff },
      { pos: ModelAPosition.Demonstrative, rank: 8, label: "Demonstrative (Pembuktian)", dim: "4D (Pengalaman, Norma, Situasi, Waktu)", icon: Info }
    ]
  }
];

export default function ModelAGrid(props: ModelAGridProps) {
  const { typeInfo } = props;
  const [activeTab, setActiveTab] = useState<ModelAPosition | null>(ModelAPosition.Leading);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="model-a-section">
      {/* 2x4 Model A Dashboard */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-sans font-semibold text-slate-100 tracking-tight">
            Arsitektur Model A: {typeInfo.code} ({typeInfo.pseudonym})
          </h3>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
            METABOLISME INFORMASI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BLOCKS.map((block) => (
            <div
              key={block.name}
              className={`p-4 rounded-xl border flex flex-col gap-3 transition-all hover:bg-slate-900/50 ${block.css}`}
            >
              <div>
                <h4 className="text-sm font-semibold text-slate-200">{block.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed leading-normal">{block.desc}</p>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-auto">
                {block.functions.map((fn) => {
                  const elCode = typeInfo.modelA[fn.pos];
                  const element = INFORMATIONAL_ELEMENTS[elCode];
                  const Icon = fn.icon;
                  const isSelected = activeTab === fn.pos;

                  return (
                    <button
                      key={fn.pos}
                      onClick={() => setActiveTab(fn.pos)}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 group relative cursor-pointer ${
                        isSelected
                          ? "bg-slate-800 border-indigo-500/50 shadow-lg shadow-indigo-500/5"
                          : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className={`p-1.5 rounded-md border ${element.color}`}>
                        <span className="font-mono text-xs font-bold leading-none">{element.symbol}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-300 font-medium">
                            {fn.rank}. {fn.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                            Dim: {fn.pos === ModelAPosition.Vulnerable || fn.pos === ModelAPosition.Suggestive ? "1D" : fn.pos === ModelAPosition.Role || fn.pos === ModelAPosition.Mobilizing ? "2D" : fn.pos === ModelAPosition.Creative || fn.pos === ModelAPosition.Ignoring ? "3D" : "4D"}
                          </span>
                        </div>
                        <h5 className="text-xs font-sans font-bold text-slate-200 flex items-center gap-1.5 mt-0.5">
                          {element.fullName} ({element.code})
                        </h5>
                      </div>
                      <Icon className={`w-3.5 h-3.5 transition-all ${isSelected ? "text-indigo-400 scale-110" : "text-slate-600 group-hover:text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Function Depth Analysis Card */}
      <div className="lg:col-span-5 flex flex-col">
        {activeTab && (() => {
          const elCode = typeInfo.modelA[activeTab];
          const element = INFORMATIONAL_ELEMENTS[elCode];
          const blockConfig = BLOCKS.find((b) => b.functions.some((f) => f.pos === activeTab));
          const fnConfig = blockConfig?.functions.find((f) => f.pos === activeTab);

          return (
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between border-b border-slate-800/60 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">
                      FUNGSI KE-{fnConfig?.rank}: {activeTab}
                    </span>
                    <h4 className="text-base font-bold text-slate-100 font-sans tracking-tight">
                      {fnConfig?.label}
                    </h4>
                  </div>
                  <div className={`p-2 rounded-lg border ${element.color}`}>
                    <span className="font-mono text-sm font-bold">{element.symbol} {element.code}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">ASPEK METABOLISME</span>
                    <p className="text-sm text-slate-300 font-sans font-medium">
                      {element.fullName} ({element.gulenkoName})
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">DIMENSI & KAPASITAS</span>
                    <div className="bg-slate-950/50 border border-slate-800 px-3 py-2 rounded-lg mt-1">
                      <p className="text-xs text-indigo-300 font-mono font-medium">{fnConfig?.dim}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {activeTab === ModelAPosition.Leading && "Mampu memproses informasi pada level tertinggi. Mengevaluasi evolusi aspek melintasi waktu sejarah, situasi, dan norma sosial secara otomatis."}
                        {activeTab === ModelAPosition.Creative && "Mengekspresikan tindakan kreatif secara kontekstual (situasional) sesuai kebutuhan saat ini secara fleksibel tanpa kekakuan dogmatis."}
                        {activeTab === ModelAPosition.Role && "Mengikuti norma-norma standar sosial secara kaku hanya demi kesopanan publik. Sangat cepat merasa lelah jika harus bertahan di sini."}
                        {activeTab === ModelAPosition.Vulnerable && "Sangat rentan. Tidak memiliki pemahaman norma ataupun fleksibilitas situasi. Hanya belajar dari pengalaman pribadi yang menyakitkan. Harus dilindungi oleh dual Anda."}
                        {activeTab === ModelAPosition.Suggestive && "Kosong namun mendambakan asupan eksternal. Sangat mengagumi siapa pun yang mahir mengemas aspek kognitif ini demi kegembiraan hidup mereka."}
                        {activeTab === ModelAPosition.Mobilizing && "Ingin diakui hebat di aspek ini demi pertahanan diri, namun sering kali gagal bertindak proporsional tanpa bimbingan objektif pasangannya."}
                        {activeTab === ModelAPosition.Ignoring && "Memiliki kapasitas kuat yang setara aspek kreatif namun disupresi secara penuh agar tidak mengganggu fokus fungsi Leading saat bermanuver."}
                        {activeTab === ModelAPosition.Demonstrative && "Kekuatan senyap luar biasa di latar belakang. Berjalan instan tanpa kata-kata untuk memecahkan dilema praktis orang-orang terdekat Anda."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">DIFERENSIASI DEFINISI</span>
                    <p className="text-xs text-slate-400 leading-normal mt-1 leading-relaxed">
                      {element.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/40 pt-3">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">MANIFESTASI SIKAP {typeInfo.code}:</span>
                    <p className="text-xs text-slate-200 mt-1.5 italic bg-indigo-950/10 border-l-2 border-indigo-500 pl-3 py-1.5 leading-relaxed">
                      &ldquo;{element.manifestationInModelA[activeTab]}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mt-4 flex items-center gap-3">
                <div className="p-1 text-amber-400 bg-amber-950/40 rounded-md border border-amber-900/60">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Klik fungsi lain di grid kiri untuk beralih dan membaca bedah psikokognitif Model A secara detail.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
