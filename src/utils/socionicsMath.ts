/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IntertypeRelation {
  code: string;
  name: string;
  order: number;
  algebraicSymbol: string;
  desc: string;
  compatibilityScore: number; // 0 to 100 for visual metrics
}

export interface ModelAPosition {
  functionNumber: number;
  channelName: string;
  element: string;
  roleDescription: string;
}

// Map 16 types to their Model A functions (1 to 8)
export const MODEL_A_MAP: Record<string, string[]> = {
  ILE: ["Ne", "Ti", "Se", "Fi", "Si", "Fe", "Ni", "Te"],
  SEI: ["Si", "Fe", "Ni", "Te", "Ne", "Ti", "Se", "Fi"],
  ESE: ["Fe", "Si", "Te", "Ni", "Ti", "Ne", "Fi", "Se"],
  LII: ["Ti", "Ne", "Fi", "Se", "Fe", "Si", "Te", "Ni"],
  SLE: ["Se", "Ti", "Ne", "Fi", "Ni", "Fe", "Si", "Te"],
  IEI: ["Ni", "Fe", "Si", "Te", "Se", "Ti", "Ne", "Fi"],
  EIE: ["Fe", "Ni", "Te", "Si", "Ti", "Se", "Fi", "Ne"],
  LSI: ["Ti", "Se", "Fi", "Ne", "Fe", "Ni", "Te", "Si"],
  SEE: ["Se", "Fi", "Ne", "Ti", "Ni", "Te", "Si", "Fe"],
  ILI: ["Ni", "Te", "Si", "Fe", "Se", "Fi", "Ne", "Ti"],
  LIE: ["Te", "Ni", "Fe", "Si", "Fi", "Se", "Ti", "Ne"],
  ESI: ["Fi", "Se", "Ti", "Ne", "Te", "Ni", "Fe", "Si"],
  LSE: ["Te", "Si", "Fe", "Ni", "Fi", "Ne", "Ti", "Se"],
  EII: ["Fi", "Ne", "Ti", "Se", "Te", "Si", "Fe", "Ni"],
  IEE: ["Ne", "Fi", "Se", "Ti", "Si", "Te", "Ni", "Fe"],
  SLI: ["Si", "Te", "Ni", "Fe", "Ne", "Fi", "Se", "Ti"]
};

export const CHANNELS_IN_ORDER = [
  "producer",   // F1 - Program/Base
  "flexible",   // F2 - Creative
  "mask",       // F3 - Role
  "threat",     // F4 - Vulnerable/PoLR
  "receiver",   // F5 - Suggestive/Dual-seeking
  "aspiration", // F6 - Mobilizing
  "dismissive", // F7 - Ignoring
  "background"  // F8 - Demonstrative
];

export const CHANNEL_LABELS: Record<string, string> = {
  producer: "Program / Base (F1) — Produsen Utama",
  flexible: "Creative (F2) — Instrumentasi Fleksibel",
  mask: "Role (F3) — Topeng Adaptasi",
  threat: "Vulnerable / PoLR (F4) — Titik Rentan Kritis",
  receiver: "Suggestive / Dual-seeking (F5) — Penerima Suplemen",
  aspiration: "Mobilizing (F6) — Dorongan Aspiratif",
  dismissive: "Ignoring / Limiting (F7) — Pengabaian Selektif",
  background: "Demonstrative (F8) — Latar Belakang Otomatis"
};

// Relation codes dictionary map relative to ILE
export const RELATION_DEFS: Record<string, IntertypeRelation> = {
  e: {
    code: "e",
    name: "Identitas (Identity)",
    order: 1,
    algebraicSymbol: "e",
    desc: "Refleksi diri yang mutlak. Pemahaman intelektual dan nilai hidup berjalan 100% selaras karena kalian memiliki arsitektur Model A yang identik. Namun, relasi ini melahirkan kerentanan ganda karena tidak ada penyembuh di area rentan (Threat/PoLR) kalian.",
    compatibilityScore: 50
  },
  d: {
    code: "d",
    name: "Dualitas (Duality)",
    order: 2,
    algebraicSymbol: "d",
    desc: "Hubungan ideal terlengkap secara transaksional kognitif. Fungsi Program (F1) Anda menyembuhkan fungsi Suggestive (F5) pasangan Anda, sementara fungsi Creative (F2) Anda melindungi fungsi Vulnerable (F4) mereka secara asimetris timbal balik. Sangat nyaman dalam jangka panjang.",
    compatibilityScore: 100
  },
  a: {
    code: "a",
    name: "Aktivasi (Activation)",
    order: 2,
    algebraicSymbol: "a",
    desc: "Relasi berenergi tinggi dalam Quadra yang sama. Sangat cepat akrab, penuh tawa, dan bersemangat. Namun, karena fungsi Dominan (F1) mencocoki fungsi Mobilizing (F6), relasi ini cenderung melelahkan secara fisik jika dijalani tanpa jeda harian.",
    compatibilityScore: 85
  },
  m: {
    code: "m",
    name: "Cermin (Mirror)",
    order: 2,
    algebraicSymbol: "m",
    desc: "Melihat diri Anda dari sudut yang berbeda. Anda memimpin dengan argumen yang baru dirumuskan secara teoretis oleh cermin Anda, dan sebaliknya. Saling menghormati kecerdasan masing-masing secara setara, meskipun porsi prioritas penanganan masalah berbeda.",
    compatibilityScore: 80
  },
  g: {
    code: "g",
    name: "Superego",
    order: 2,
    algebraicSymbol: "g",
    desc: "Saling menghormati dari kejauhan namun membingungkan saat berdekatan. Pasangan Anda memegahkan fungsi yang diposisikan sebagai topeng sosial (Role) Anda. Terlihat sangat sopan tetapi tidak memenuhi dorongan terdalam batin.",
    compatibilityScore: 45
  },
  c: {
    code: "c",
    name: "Konfliktor (Conflictor)",
    order: 2,
    algebraicSymbol: "c",
    desc: "Kontradiksi sistemik terbesar. Lead function pasangan Anda menghantam tepat di area Vulnerable (Threat/F4) Anda secara konstan, sementara motivasi kalian sepenuhnya berlawanan arah. Membutuhkan jarak fisik besar untuk bertahan hidup selaras.",
    compatibilityScore: 10
  },
  q: {
    code: "q",
    name: "Quasi-Identik",
    order: 2,
    algebraicSymbol: "q",
    desc: "Tampak mirip secara intelektual, tetapi beroperasi di bawah cara kerja yang berbeda. Kalian membahas topik yang sama namun tidak pernah setuju tentang kesimpulan akhir karena satu orang memakai metode teoretis subjektif dan yang lain memakai data taktis.",
    compatibilityScore: 40
  },
  x: {
    code: "x",
    name: "Kontrari / Extinguishment",
    order: 2,
    algebraicSymbol: "x",
    desc: "Setengah dari diri Anda yang berbalik arah. Saling melumpuhkan pemikiran: ketika salah satu berbicara secara ekstrovert, pasangan introvertnya kehilangan minat memproses informasi tersebut. Diskusi satu lawan satu bisa sangat mendalam, tetapi runtuh di depan publik.",
    compatibilityScore: 35
  },
  k: {
    code: "k",
    name: "Kindred (Comparative)",
    order: 2,
    algebraicSymbol: "k",
    desc: "Memiliki kepala yang sama tetapi tangan yang berbeda. Menggunakan elemen Program (F1) yang sama sehingga langsung memahami motif utama pasangan, tetapi fungsi kreatif yang bertolak belakang sering memicu perdebatan sengit tentang cara eksekusi.",
    compatibilityScore: 65
  },
  h: {
    code: "h",
    name: "Setengah Dual (Semidual)",
    order: 2,
    algebraicSymbol: "h",
    desc: "Dualitas yang tidak tuntas. Fungsi suggestive terobati dengan baik, tetapi area Vulnerable (Threat) tetap tidak terlindungi dari bahaya luar. Hubungan bisa sangat romantis di awal, tetapi menyisakan ketegangan laten yang tidak terpecahkan.",
    compatibilityScore: 75
  },
  l: {
    code: "l",
    name: "Lookalike (Business)",
    order: 2,
    algebraicSymbol: "l",
    desc: "Mengejar tujuan berbeda menggunakan instrumen yang sama. Sangat praktis untuk hubungan kerja karena kalian bisa membagi tugas secara adil menggunakan fungsi kreatif yang setara, tetapi kering secara emosional batin.",
    compatibilityScore: 60
  },
  i: {
    code: "i",
    name: "Ilusionari (Mirage)",
    order: 2,
    algebraicSymbol: "i",
    desc: "Relasi yang terasa santai, romantis, dan nyaman bagi masa istirahat fisik, tetapi tidak produktif jika diajak menyelesaikan proyek nyata. Memadamkan ambisi masing-masing dan cenderung mengabaikan realitas.",
    compatibilityScore: 68
  },
  S: {
    code: "S",
    name: "Supervisor (Reviser)",
    order: 4,
    algebraicSymbol: "S",
    desc: "Asimetri kekuasaan kognitif. Anda berada di bawah pengawasan psikologis supervisor Anda secara terus-menerus. Setiap tindakan santai Anda dinilai sebagai kesalahan operasi oleh program supervisor Anda. Memicu kecemasan laten tinggi.",
    compatibilityScore: 20
  },
  s: {
    code: "s",
    name: "Supervisee (Revisee)",
    order: 4,
    algebraicSymbol: "s",
    desc: "Asimetri kontrol. Anda memegang kendali psikologis atas pasangan Anda. Anda secara alami mendeteksi kegagalan logis atau fisik mereka di area rentan mereka, dan berupaya menceramahinya meskipun tidak berniat jahat.",
    compatibilityScore: 25
  },
  B: {
    code: "B",
    name: "Benefaktor (Request Transmitter)",
    order: 4,
    algebraicSymbol: "B",
    desc: "Asimetri inspirasi. Benefaktor adalah inspirator spiritual Anda. Tindakan mereka memicu gairah aspiratif Anda, tetapi interaksi satu arah ini melelahkan karena Anda tidak sanggup membalas ekspektasi taktis mereka secara setara.",
    compatibilityScore: 55
  },
  b: {
    code: "b",
    name: "Benefisari (Request Receiver)",
    order: 4,
    algebraicSymbol: "b",
    desc: "Asimetri penerima instruksi. Pasangan Anda memandang Anda sebagai sosok yang sangat mengagumkan dan berusaha keras melaksanakan visi Anda. Menyenangkan bagi ego Anda, tetapi melahirkan kesenjangan intelektual batin.",
    compatibilityScore: 58
  }
};

// Comprehensive lookup mapping from the unique (pos_F1, pos_F2) coordinate pair
// where pos_F1 is the 0-indexed position of type1's Lead in type2's Model A,
// and pos_F2 is the position of type1's Creative in type2's Model A.
// This is the absolute group-theoretic formulation of Model A intertype relations.
export const getRelation = (type1: string, type2: string): IntertypeRelation => {
  if (type1 === type2) return RELATION_DEFS.e;

  const m1 = MODEL_A_MAP[type1];
  const m2 = MODEL_A_MAP[type2];

  if (!m1 || !m2) return RELATION_DEFS.e;

  const f1 = m1[0];
  const f2 = m1[1];

  const pos1 = m2.indexOf(f1);
  const pos2 = m2.indexOf(f2);

  if (pos1 === -1 || pos2 === -1) {
    return RELATION_DEFS.g; // Absolute fallback boundary
  }

  // Pure bijective coordination of all 16 intertype relations in Socionics
  const coordinateKey = `${pos1},${pos2}`;
  
  const relationCodeMap: Record<string, string> = {
    "0,1": "e", // Identity
    "4,5": "d", // Duality
    "5,4": "a", // Activation
    "1,0": "m", // Mirror
    "1,2": "g", // Superego
    "3,2": "c", // Conflictor
    "6,7": "q", // Quasi-Identical
    "7,6": "x", // Contrary / Extinguishment
    "0,3": "k", // Kindred / Comparative
    "4,7": "h", // Setengah Dual / Semidual
    "2,1": "l", // Lookalike / Business
    "6,5": "i", // Illusionary / Mirage
    "7,4": "b", // Beneficiary (Partner is your beneficiary/receiver)
    "5,6": "B", // Benefactor (Partner is your benefactor/transmitter)
    "3,0": "s", // Supervisee (Partner is your supervisee/revisee)
    "2,3": "S"  // Supervisor (Partner is your supervisor/reviser)
  };

  const relCode = relationCodeMap[coordinateKey] || "g";
  return RELATION_DEFS[relCode] || RELATION_DEFS.g;
};
