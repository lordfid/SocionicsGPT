import React, { useState } from "react";
import { SociotypeCode, SociotypeInfo } from "../types";
import { SOCIOTYPES, calculateIntertypeRelation, INFORMATIONAL_ELEMENTS } from "../data/socionicsData";
import { Users, Shield, AlertTriangle, CheckCircle, ArrowRight, HeartHandshake } from "lucide-react";

interface RelationsMatrixProps {
  currentType: SociotypeInfo;
}

export default function RelationsMatrix(props: RelationsMatrixProps) {
  const { currentType } = props;
  const [partnerCode, setPartnerCode] = useState<SociotypeCode>(currentType.duals);

  const partnerInfo = SOCIOTYPES[partnerCode];
  const relationResult = calculateIntertypeRelation(currentType.code, partnerCode);

  const isDual = currentType.duals === partnerCode;
  const isConflict = currentType.conflict === partnerCode;
  const isSupervision = currentType.supervisionPartner === partnerCode || currentType.supervisee === partnerCode;
  const isBenefit = currentType.benefactor === partnerCode || currentType.beneficiary === partnerCode;

  // Let's explain why they compatible or not based on model A valuations
  const getRelationAspectDetails = () => {
    if (isDual) {
      return {
        rating: "Kompatibilitas Sempurna (10/10)",
        color: "text-emerald-400 border-emerald-950 bg-emerald-950/20",
        icon: CheckCircle,
        verdict: "Dualitas adalah hubungan kerja-sama terbaik dalam psikologi Socionics. Fungsi Leading Anda menyuapi fungsi Suggestive mereka secara konstan dan bebas tekanan, sementara fungsi Creative mereka melindungi kelemahan fatal PoLR Anda."
      };
    }
    if (isConflict) {
      return {
        rating: "Kompatibilitas Destruktif (1/10)",
        color: "text-rose-400 border-rose-950 bg-rose-950/20",
        icon: AlertTriangle,
        verdict: "Hubungan konflikter. Cara berpikir mereka mematikan nilai-nilai Anda. Tanpa disadari, tindakan luar biasa mereka justru menggaruk letak luka terdalam (PoLR) kognisi Anda. Hindari kemitraan serumah berdurasi panjang."
      };
    }
    if (isSupervision) {
      return {
        rating: "Kompatibilitas Asimetris Menekan (4/10)",
        color: "text-amber-400 border-amber-950 bg-amber-950/20",
        icon: Shield,
        verdict: "Hubungan asimetris satu arah (Supervisi). Salah satu pihak (Supervisor) bertindak sebagai hakim moral/logika yang secara genetik mendeteksi letak kecacatan berpikir pihak lain (Supervisee). Sangat melelahkan bagi pihak yang diawasi."
      };
    }
    if (isBenefit) {
      return {
        rating: "Koneksi Impuls Asimetris (6/10)",
        color: "text-sky-400 border-sky-950 bg-sky-950/20",
        icon: HeartHandshake,
        verdict: "Hubungan asimetris transaksional sosial (Benefit). Benefactor bertindak sebagai panutan kharismatik kognitif yang memukau Beneficiary. Penerima impuls merasa kagum namun sulit mendekati pengirim gagasan."
      };
    }
    return {
      rating: "Koneksi Netral / Seimbang (7/10)",
      color: "text-slate-300 border-slate-800 bg-slate-900/40",
      icon: Users,
      verdict: "Koneksi rasional simetris. Anda berdua berdiskusi dengan nyaman, namun adakalanya merasa frustrasi karena perbedaan orientasi tindakan nyata atau kelemahan kognisi yang tumpang tindih."
    };
  };

  const relationshipMeta = getRelationAspectDetails();
  const RelationshipIcon = relationshipMeta.icon;

  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6" id="relations-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/60 pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400 animate-pulse" />
            Kalkulator Relasi Intertipe Socionics
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Pilih sosiotipe rekan untuk memetakan dinamika pertukaran energi kognitif di bawah Model A.
          </p>
        </div>
        
        {/* Partner Select Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-slate-400">Pilih Partner:</label>
          <select
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value as SociotypeCode)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {Object.keys(SOCIOTYPES).map((code) => {
              const info = SOCIOTYPES[code as SociotypeCode];
              return (
                <option key={code} value={code}>
                  {code} - {info.pseudonym} ({info.mbtiEquivalent})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Dynamic Comparison Visual Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-900/20 border border-slate-800/60 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Users className="w-40 h-40" />
          </div>

          <div className="flex items-center gap-4 z-10 w-full justify-between px-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 text-indigo-400 font-mono font-black text-xl rounded-2xl flex items-center justify-center mx-auto shadow-md">
                {currentType.code}
              </div>
              <p className="text-xs font-bold text-slate-300 mt-2">{currentType.pseudonym}</p>
              <p className="text-[10px] font-mono text-slate-500">{currentType.gulenkoAlias}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-1 rounded bg-slate-950">VS</span>
              <ArrowRight className="w-4 h-4 text-indigo-400 animate-pulse" />
            </div>

            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-slate-900 border border-indigo-500/20 text-indigo-300 font-mono font-black text-xl rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                {partnerInfo.code}
              </div>
              <p className="text-xs font-bold text-slate-300 mt-2">{partnerInfo.pseudonym}</p>
              <p className="text-[10px] font-mono text-slate-500">{partnerInfo.gulenkoAlias}</p>
            </div>
          </div>

          <div className="w-full mt-6 border-t border-slate-800/60 pt-4 text-center z-10">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">QUADRA ALIGNMENT</span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-xs text-slate-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {currentType.quadra}
              </span>
              <span className="text-slate-600 font-extrabold">&rarr;</span>
              <span className="text-xs text-slate-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-indigo-950">
                {partnerInfo.quadra}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Relationship Verdict Dashboard */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div className={`p-4 rounded-xl border flex items-start gap-4 ${relationshipMeta.color}`}>
            <div className="p-2 bg-slate-950 rounded-lg shrink-0 border border-slate-800/40">
              <RelationshipIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest block uppercase text-slate-400">
                {relationshipMeta.rating}
              </span>
              <h4 className="text-base font-bold font-sans mt-0.5">
                {relationResult.relation}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {relationResult.description}
              </p>
            </div>
          </div>

          {/* Deep Model A Shield Interlock breakdown */}
          <div className="bg-slate-900/30 border border-slate-800/40 p-4 rounded-xl mt-4">
            <h5 className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider mb-2.5">
              ANALISIS KELAS ENTJ 3w4: MEKANISME TAMENG MODEL A
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block">TAMENG POLR (TITIK RAWAN)</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isDual ? (
                    <span>
                      <strong className="text-emerald-400">Dilindungi Sempurna!</strong> Fungsi Creative partner ({partnerInfo.code}) menggunakan <strong className="font-mono text-indigo-300">{INFORMATIONAL_ELEMENTS[partnerInfo.modelA.Creative].fullName}</strong> untuk memecahkan ketakutan visual kognisi PoLR Anda tanpa drama menghakimi.
                    </span>
                  ) : isConflict ? (
                    <span>
                      <strong className="text-rose-400">Bahaya Total!</strong> Fungsi Leading partner ({partnerInfo.code}) secara otomatis memancarkan energi <strong className="font-mono text-indigo-300">{INFORMATIONAL_ELEMENTS[partnerInfo.modelA.Leading].fullName}</strong> yang merupakan PoLR Anda secara konstan dan merusak fondasi mental Anda.
                    </span>
                  ) : (
                    <span>
                      Tameng PoLR Anda berhadapan secara sekunder. Komunikasi membutuhkan filter kesopanan agar kelemahan <strong className="font-mono text-amber-400">{currentType.modelA.Vulnerable}</strong> Anda tidak tersentuh secara kasar oleh kognisi mereka.
                    </span>
                  )}
                </p>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block">SUGGESTIVE FEED (DAMBAAN)</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isDual ? (
                    <span>
                      <strong className="text-emerald-400">Nutrisi Kognitor Maksimal!</strong> Tipe partner ({partnerInfo.code}) memandu hidup Anda dengan melimpahi asupan <strong className="font-mono text-indigo-300">{INFORMATIONAL_ELEMENTS[partnerInfo.modelA.Leading].fullName}</strong> secara murah hati untuk diserap Suggestive function Anda yang haus stimulasi.
                    </span>
                  ) : isConflict ? (
                    <span>
                      <strong className="text-rose-400">Gagal Total!</strong> Partner memiliki aspek dambaan Anda di posisi terdalam yang mereka abaikan, sehingga Anda berdua merasa kering kognitif dan berlawanan dalam mengeksploitasi kepuasan interpersonal.
                    </span>
                  ) : (
                    <span>
                      Asupan rasa damba dalam aspek <strong className="font-mono text-amber-400">{currentType.modelA.Suggestive}</strong> Anda bergantung pada kedewasaan emosional masing-masing karena minimnya resonansi dualitas dasar.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
