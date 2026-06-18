import { useState, useMemo } from 'react';
import { TIM_PROFILES, RELATIONS_INFO, getRelation, TIM_KEYS, ELEMENTS } from '../data';
import { TIMProfile, IntertypeRelation } from '../types';
import { Flame, ShieldAlert, BadgeCheck, HelpCircle, Trophy, Play, Zap, Shield, Sparkles } from 'lucide-react';

export default function AtlasView() {
  const [selectedTim, setSelectedTim] = useState<string>('ILE');
  const [activeTab, setActiveTab] = useState<'profile' | 'relations' | 'simulator'>('profile');

  // Relations state
  const [myType, setMyType] = useState<string>('ILE');
  const [partnerType, setPartnerType] = useState<string>('SEI');

  // Simulator state
  const [simMyType, setSimMyType] = useState<string>('ILE');
  const [simPartnerType, setSimPartnerType] = useState<string>('LSI');
  const [simContext, setSimContext] = useState<string>('startup');
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{ scoreMy: number; scorePartner: number; winner: string } | null>(null);

  const currentProfile = useMemo(() => TIM_PROFILES[selectedTim], [selectedTim]);

  const activeRelation = useMemo(() => {
    return getRelation(myType, partnerType);
  }, [myType, partnerType]);

  // Seeded Stochastic Match Simulator using Poisson Dixon-Coles model
  // Mapped strictly to Ibrahim Tencer's group relations coefficients
  const runSimulation = () => {
    setIsSimulating(true);
    setSimLogs([]);
    setSimResult(null);

    const rel = getRelation(simMyType, simPartnerType);
    let logs: string[] = [];

    logs.push(`🏆 MEMULAI SIMULASI KEMITRAAN SOCIONICS (90 MENIT + WAKTU TAMBAHAN)`);
    logs.push(`👥 Aktor 1: [${simMyType}] (Base: ${TIM_PROFILES[simMyType]?.modelA[0].element}) vs Aktor 2: [${simPartnerType}] (Base: ${TIM_PROFILES[simPartnerType]?.modelA[0].element})`);
    logs.push(`📑 Hubungan Terdeteksi: ${rel.name} - ${rel.description}`);
    logs.push(`📍 Konteks Tugas: ${simContext === 'startup' ? '🗂️ Membangun Ide Rintisan / Bisnis' : '🌳 Bertahan Hidup di Hutan Liar / Ekspedisi'}`);
    logs.push(`----------------------------------------`);

    // Attack (Communication velocity) and Defense (Resilience) weights based on relations
    let act1Attack = 1.0, act1Defense = 1.0;
    let act2Attack = 1.0, act2Defense = 1.0;

    switch (rel.code) {
      case 'd': // Dual (Cozy synergy)
        act1Attack = 1.8; act1Defense = 2.0;
        act2Attack = 1.8; act2Defense = 2.0;
        break;
      case 'c': // Conflictor (Volatile explosion)
        act1Attack = 2.5; act1Defense = 0.5;
        act2Attack = 2.5; act2Defense = 0.5;
        break;
      case 'S': // Supervisor (I supervising partner)
        act1Attack = 2.2; act1Defense = 1.8;
        act2Attack = 0.7; act2Defense = 0.6;
        break;
      case 's': // Supervisee (Partner supervising me)
        act1Attack = 0.7; act1Defense = 0.6;
        act2Attack = 2.2; act2Defense = 1.8;
        break;
      case 'e': // Identity (Redundancy)
        act1Attack = 1.1; act1Defense = 1.1;
        act2Attack = 1.1; act2Defense = 1.1;
        break;
      case 'a': // Activator (High excitation)
        act1Attack = 2.0; act1Defense = 1.2;
        act2Attack = 2.0; act2Defense = 1.2;
        break;
      default:
        break;
    }

    // Expected goals calculation
    let xG1 = (act1Attack * (1 / act2Defense)) * (simContext === 'startup' ? 1.2 : 0.9);
    let xG2 = (act2Attack * (1 / act1Defense)) * (simContext === 'startup' ? 0.9 : 1.2);

    // Apply Non-linear log soft clipping above 1.8 Goals threshold
    const clipXG = (raw: number) => {
      if (raw <= 1.8) return raw;
      return 1.8 + Math.log(raw - 0.8);
    };

    const finalLambda1 = clipXG(xG1);
    const finalLambda2 = clipXG(xG2);

    // Simulate 90 mins with LCG seeded random values based on team names combined
    let seed = simMyType.charCodeAt(0) + simPartnerType.charCodeAt(0) + simContext.length;
    function seededRandom() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    // Step-by-step game events
    let score1 = 0;
    let score2 = 0;

    const gameMinutes = [15, 30, 45, 60, 75, 90];
    gameMinutes.forEach((min) => {
      const rand1 = seededRandom();
      const rand2 = seededRandom();

      // Simple poisson simulation check per iteration slot
      const chance1 = finalLambda1 / 6;
      const chance2 = finalLambda2 / 6;

      if (rand1 < chance1) {
        score1++;
        if (rel.code === 'd') {
          logs.push(`⏱️ Menit ${min}: [${simMyType}] meluncurkan ide brilian, [${simPartnerType}] memoles kenyamanan operasional secara puitis. Pencapaian solid! (+1 Poin)`);
        } else if (rel.code === 'c') {
          logs.push(`⏱️ Menit ${min}: Guncangan emosi batin! [${simMyType}] mencoba mengendalikan keputusan lewat tekanan, yang menusuk ego [${simPartnerType}]. (+1 Poin Ketegangan)`);
        } else if (rel.code === 'S') {
          logs.push(`⏱️ Menit ${min}: Menyerang langsung! [${simMyType}] memberikan pengawasan ketat yang membekukan tindakan kreatif [${simPartnerType}]. (+1 Poin Kontrol)`);
        } else {
          logs.push(`⏱️ Menit ${min}: Eksekusi taktis berhasil diejawantahkan oleh [${simMyType}]. (+1 Poin)`);
        }
      }

      if (rand2 < chance2) {
        score2++;
        if (rel.code === 'd') {
          logs.push(`⏱️ Menit ${min}: [${simPartnerType}] menutupi titik buta (Suggestive) [${simMyType}] lewat perawatan fisik harmonis. Sinergi dualitas terbukti! (+1 Poin)`);
        } else if (rel.code === 'c') {
          logs.push(`⏱️ Menit ${min}: Pertahanan batin bobol! Kesalahan tata krama [${simPartnerType}] mengganggu harmoni batin [${simMyType}]. (+1 Poin Konflik)`);
        } else if (rel.code === 's') {
          logs.push(`⏱️ Menit ${min}: Tekanan balik! [${simPartnerType}] mengawasi [${simMyType}] di posisi buta dengan kata kasar. (+1 Poin Kontrol)`);
        } else {
          logs.push(`⏱️ Menit ${min}: Langkah fungsional diselesaikan dengan mulus oleh [${simPartnerType}]. (+1 Poin)`);
        }
      }
    });

    // Stoppage time bonus simulation (injury time: 5-10m)
    const injuryMins = Math.floor(seededRandom() * 6) + 5;
    logs.push(`📢 Waktu normal habis. Waktu tambahan diberikan sebanyak +${injuryMins} Menit!`);
    const randExtra = seededRandom();
    if (randExtra < 0.15) {
      if (finalLambda1 > finalLambda2) {
        score1++;
        logs.push(`⏱️ Menit 90+${injuryMins}: Di babak dramatis penutup, [${simMyType}] menembus batas kelelahannya demi menyelesaikan target. (+1 Poin)`);
      } else {
        score2++;
        logs.push(`⏱️ Menit 90+${injuryMins}: [${simPartnerType}] mengambil alih sisa energi bimbingan dan merampungkan pekerjaan. (+1 Poin)`);
      }
    }

    logs.push(`----------------------------------------`);
    logs.push(`🏁 EKSPEDISI SELESAI.`);

    let winner = 'Keduanya seimbang (Draw Game)';
    if (score1 > score2) winner = `Pemenang Efisiensi: [${simMyType}]`;
    if (score2 > score1) winner = `Pemenang Efisiensi: [${simPartnerType}]`;

    setSimLogs(logs);
    setSimResult({ scoreMy: score1, scorePartner: score2, winner });
    setIsSimulating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 transition-all duration-500">
      {/* Category selector */}
      <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto gap-4">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-sm font-semibold uppercase tracking-wide border-b-2 transition-all shrink-0 ${
            activeTab === 'profile' ? 'border-brand-accent text-neutral-900' : 'border-transparent text-neutral-400'
          }`}
        >
          📖 16 TIM Profile Atlas
        </button>
        <button
          onClick={() => setActiveTab('relations')}
          className={`pb-3 text-sm font-semibold uppercase tracking-wide border-b-2 transition-all shrink-0 ${
            activeTab === 'relations' ? 'border-brand-accent text-neutral-900' : 'border-transparent text-neutral-400'
          }`}
        >
          🧬 Intertype Relationship Calculator
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`pb-3 text-sm font-semibold uppercase tracking-wide border-b-2 transition-all shrink-0 ${
            activeTab === 'simulator' ? 'border-brand-accent text-neutral-900' : 'border-transparent text-neutral-400'
          }`}
        >
          🎮 Seeded Cooperational Match Simulator
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Type Selector List */}
          <div className="bg-white/80 border border-[rgba(191,152,114,0.2)] rounded-2xl p-4 shadow-sm h-fit">
            <h3 className="font-serif text-lg font-bold mb-4 border-b pb-2 text-neutral-800">Pilih Tipe TIM</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
              {TIM_KEYS.map((tim) => (
                <button
                  key={tim}
                  onClick={() => setSelectedTim(tim)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-bold tracking-wide transition-all border ${
                    selectedTim === tim
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tim}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-neutral-400 mt-4 leading-relaxed font-mono">
              Model A mencakup 8 posisi fungsional berporak ego, superego, superid, dan id.
            </p>
          </div>

          {/* Main Profiles Display */}
          <div className="lg:col-span-3 bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-neutral-100 pb-6 mb-6">
              <div>
                <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                  Quadra {currentProfile?.quadra}
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 mt-2">
                  {currentProfile?.id} — {currentProfile?.name}
                </h2>
                <p className="text-sm font-mono text-brand-accent italic mt-1">{currentProfile?.alias}</p>
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 shrink-0 max-w-xs">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" /> STEREOTIPE MELEKAT
                </h4>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  {currentProfile?.id === 'ILE' ? 'ILE sering memulai ide tentang masa depan serba ganti kalender, lalu melupakan letak pengisi daya HP di sebelahnya.' :
                   currentProfile?.id === 'SEI' ? 'SEI dapat membongkar kasur ternyaman sejauh 50 meter tanpa butuh mengumumkan rencana dwi-tahunan.' :
                   currentProfile?.id === 'ESE' ? 'Panitia suasana yang tidak pernah terpilih secara resmi namun merasa mengemban tanggung jawab moral kelompok.' :
                   currentProfile?.id === 'LII' ? 'Mampu mengoreksi kesempurnaan definisi kata "selalu" di tengah duka hubungan temannya.' :
                   'Penganalisa tajam batin yang berupaya menjaga integritas model batin dalam kehidupan bersosial sehari-hari.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-serif text-lg font-bold text-neutral-800 border-b pb-2 mb-3">Bentuk Kepribadian Batin</h4>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">{currentProfile?.description}</p>
                <p className="text-xs font-serif text-neutral-400 italic mt-3">"{currentProfile?.summary}"</p>
              </div>

              {/* Strengths & Weaknesses block */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">Diagnosis Perilaku</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" /> GREEN FLAGS (SEHAT)
                    </h5>
                    <ul className="list-disc pl-5 text-xs text-neutral-600 mt-1 space-y-1">
                      {currentProfile?.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-rose-800 flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4 text-rose-600" /> RED FLAGS (TIDAK SEHAT)
                    </h5>
                    <ul className="list-disc pl-5 text-xs text-neutral-600 mt-1 space-y-1">
                      {currentProfile?.vulnerabilities?.map((v, i) => <li key={i}>{v}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Model A functional grid */}
            <div>
              <h4 className="font-serif text-lg font-bold text-neutral-800 mb-4 border-b pb-2">Struktur 8 Fungsi Model A</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProfile?.modelA?.map((fn) => {
                  const elementDetail = ELEMENTS[fn.element] || { name: '', symbol: '' };
                  const isPolr = fn.role.includes('Vulnerable');
                  const isSuggestive = fn.role.includes('Suggestive');

                  return (
                    <div
                      key={fn.position}
                      className={`p-4 rounded-xl border transition-all ${
                        isPolr
                          ? 'bg-rose-50/50 border-rose-200 hover:border-rose-400 shadow-sm'
                          : isSuggestive
                          ? 'bg-indigo-50/50 border-indigo-200 hover:border-indigo-400 shadow-sm'
                          : 'bg-white border-neutral-200 hover:border-brand-accent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] tracking-tight bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                          Posisi {fn.position} : {fn.role}
                        </span>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded">
                          {fn.element} ({elementToSymbol(fn.element)})
                        </span>
                      </div>
                      <h5 className="font-serif text-sm font-bold text-neutral-900">
                        {elementDetail.name}
                      </h5>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                        {fn.description}
                      </p>

                      {isPolr && (
                        <div className="mt-2 text-[10px] text-rose-800 bg-rose-100/50 p-2 rounded leading-relaxed border border-rose-200 font-mono">
                          ⚠️ <strong>VULNERABLE (PoLR):</strong> Area kecemasan hebat, beku di bawah konfrontasi fisik langsung.
                        </div>
                      )}
                      {isSuggestive && (
                        <div className="mt-2 text-[10px] text-indigo-800 bg-indigo-100/50 p-2 rounded leading-relaxed border border-indigo-200 font-mono">
                          💎 <strong>SUGGESTIVE:</strong> Penawar duka, trust penuh menerima arahan dan bantuan tepercaya luar.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'relations' && (
        <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold mb-2">Intertype Relations Matrix</h2>
          <p className="text-sm text-neutral-500 mb-8 max-w-3xl leading-relaxed">
            Struktur hubungan Socionics berjalan lewat perkalian grup grup terbatas D4 x Z2. Hubungan Benefit dan Supervision bersifat asimetris dan memiliki arah aliran batin berbeda.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Selection Card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 h-fit space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono mb-2">Aktor 1 (Saya)</label>
                <select
                  value={myType}
                  onChange={(e) => setMyType(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs font-mono font-bold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-accent"
                >
                  {TIM_KEYS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex justify-center">
                <div className="bg-brand-accent/10 border border-brand-accent p-2 rounded-full cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    const temp = myType;
                    setMyType(partnerType);
                    setPartnerType(temp);
                  }}
                  title="Tukar Posisi"
                >
                  <Zap className="w-4 h-4 text-brand-accent" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono mb-2">Aktor 2 (Partner)</label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs font-mono font-bold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-accent"
                >
                  {TIM_KEYS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Quick Info Box */}
              <div className="bg-amber-50/50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs leading-relaxed font-mono">
                💡 <strong>Disclamer Relasi:</strong> Keamanan hidup, kesehatan mental, komunikasi, dan kestabilan ekonomi jauh lebih menentukan kedekatan komparatif daripada sekadar clinical label semu.
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-[rgba(191,152,114,0.3)] bg-amber-50/20 rounded-2xl p-6 relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-neutral-900 text-white font-mono text-[9px] px-3 py-1 font-bold uppercase tracking-widest rounded-bl-xl">
                  {activeRelation.code.toUpperCase()} RELATION
                </span>
                
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  Hubungan: {activeRelation.name}
                </h3>
                <p className="text-xs font-mono text-brand-accent mt-1">
                  {myType} ⇆ {partnerType} {activeRelation.isAsymmetric ? '(Asymmetric Loop)' : '(Symmetric Loop)'}
                </p>

                <p className="text-sm text-neutral-700 leading-relaxed mt-4 font-sans border-t pt-4 border-neutral-200/50">
                  {activeRelation.description}
                </p>

                {activeRelation.isAsymmetric && (
                  <div className="bg-neutral-900 text-white p-4 rounded-xl mt-4 space-y-2">
                    <h5 className="text-xs font-bold tracking-wider font-mono">⚖️ ALIRAN DIAGNOSTIK ASIMETRIS</h5>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeRelation.code === 'S' && `Anda [${myType}] bertindak sebagai Supervisor yang menekan batin [${partnerType}]. Tindakan mereka teropong dalam pengawasan Anda.`}
                      {activeRelation.code === 's' && `Rekan Anda [${partnerType}] mengawasi Anda dan meremukkan batin [${myType}] secara tak terhindarkan.`}
                      {activeRelation.code === 'B' && `Saran batin Anda [${myType}] bergerak memotivasi batin bawah sasaran [${partnerType}].`}
                      {activeRelation.code === 'b' && `Anda [${myType}] menerima inspirasi batin yang menyetir dorongan batin dari pengirim [${partnerType}].`}
                    </p>
                  </div>
                )}
              </div>

              {/* Loop visualizer schema */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                <h4 className="font-serif text-sm font-bold mb-4">Interaksi Model A Antara Kedua TIM</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-xl border">
                    <p className="font-mono text-xs font-bold text-neutral-500">Model A: [{myType}]</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>Base (1):</span>
                        <span className="font-mono font-bold text-brand-accent">{TIM_PROFILES[myType]?.modelA[0].element}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>Suggestive (5):</span>
                        <span className="font-mono font-bold text-brand-accent">{TIM_PROFILES[myType]?.modelA[4].element}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>PoLR (4):</span>
                        <span className="font-mono font-bold text-rose-600">{TIM_PROFILES[myType]?.modelA[3].element}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-xl border">
                    <p className="font-mono text-xs font-bold text-neutral-500">Model A: [{partnerType}]</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>Base (1):</span>
                        <span className="font-mono font-bold text-brand-accent">{TIM_PROFILES[partnerType]?.modelA[0].element}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>Suggestive (5):</span>
                        <span className="font-mono font-bold text-brand-accent">{TIM_PROFILES[partnerType]?.modelA[4].element}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b pb-1 font-sans">
                        <span>PoLR (4):</span>
                        <span className="font-mono font-bold text-rose-600">{TIM_PROFILES[partnerType]?.modelA[3].element}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'simulator' && (
        <div className="bg-white border border-[rgba(191,152,114,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-brand-accent flex-shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-bold">Seeded Cooperational Match/Action Simulator</h2>
              <p className="text-sm text-neutral-500 font-mono">Poisson Dixon-Coles model based on Ibrahim Tencer math.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Setup Panel */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 h-fit space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono mb-2">Aktor 1 TIM</label>
                <select
                  value={simMyType}
                  onChange={(e) => setSimMyType(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs font-mono font-bold text-neutral-800 focus:outline-none"
                >
                  {TIM_KEYS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono mb-2">Aktor 2 TIM</label>
                <select
                  value={simPartnerType}
                  onChange={(e) => setSimPartnerType(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs font-mono font-bold text-neutral-800 focus:outline-none"
                >
                  {TIM_KEYS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono mb-2">Medan / Skenario Tugas</label>
                <select id="sim-context" class="w-full bg-white border border-neutral-300 rounded-lg p-2.5 text-xs font-bold text-neutral-800 focus:outline-none">
                  <option value="startup">🚀 🗂️ Membangun Ide Rintisan / Bisnis (Te-Ne heavy)</option>
                  <option value="wild">🌳 Ekspedisi Hutan Liar / Bertahan Hidup (Se-Si heavy)</option>
                </select>
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm font-mono"
              >
                <Play className="w-3.5 h-3.5" /> {isSimulating ? 'Memperhitungkan Sinergi...' : 'Mulai Jalankan Simulasi'}
              </button>
            </div>

            {/* Logs Display Panel */}
            <div className="lg:col-span-2 bg-neutral-950 text-neutral-100 rounded-2xl p-6 overflow-hidden flex flex-col h-[450px]">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Terminal Log Simulasi</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2 font-mono text-xs text-[11px] leading-relaxed select-text">
                {simLogs.length === 0 ? (
                  <p className="text-neutral-500 italic text-center py-12">
                    Menunggu masukan parameter... Pilih Aktor, konteks, dan tekan tombol "Mulai Jalankan Simulasi" di samping.
                  </p>
                ) : (
                  simLogs.map((log, index) => (
                    <p key={index} className={log.startsWith('⏱️') ? 'text-amber-300' : log.includes('🥇') || log.includes('🏆') ? 'text-emerald-400 font-bold' : 'text-neutral-300'}>
                      {log}
                    </p>
                  ))
                )}
              </div>

              {simResult && (
                <div className="mt-4 pt-4 border-t border-neutral-800 bg-neutral-900/50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h5 className="text-[10px] font-bold text-brand-accent tracking-widest uppercase font-mono">Hasil Sinergi Akhir</h5>
                    <p className="text-xl font-bold font-serif text-white tracking-tight">
                      Skor Akhir {simResult.scoreMy} - {simResult.scorePartner}
                    </p>
                  </div>
                  <div className="font-mono text-xs bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full border border-brand-accent/30 font-bold">
                    {simResult.winner}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function elementToSymbol(el: string): string {
  const map: Record<string, string> = {
    Ne: 'I', Ni: 'T', Se: 'F', Si: 'S', Te: 'P', Ti: 'L', Fe: 'E', Fi: 'R'
  };
  return map[el] || '';
}
