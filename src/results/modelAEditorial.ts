import { TIM_MODELS } from "../constants/socionicsData";
import type { InformationElement, ModelAPosition, TIM } from "../types/socionics";

export interface PositionEditorial {
  position: ModelAPosition;
  element: InformationElement;
  title: string;
  block: "Ego" | "Super-ego" | "Super-id" | "Id";
  status: string;
  meaning: string;
  inPractice: string;
  evidence: string;
  caution: string;
  reflection: string;
}

export interface TypeComparisonSnapshot {
  type: TIM;
  base: PositionEditorial;
  creative: PositionEditorial;
  vulnerable: PositionEditorial;
  suggestive: PositionEditorial;
}

const ELEMENT_COPY: Record<InformationElement, {
  name: string;
  focus: string;
  behavior: string;
  overload: string;
  support: string;
}> = {
  Ne: {
    name: "Kemungkinan dan potensi",
    focus: "kemungkinan lain, bakat laten, variasi, dan jalan yang belum dicoba",
    behavior: "membuka alternatif, menghubungkan ide, dan melihat potensi sebelum semuanya terbukti",
    overload: "terlalu banyak pilihan, sulit menutup opsi, atau tergoda oleh ide baru sebelum yang lama selesai",
    support: "orang yang membuka pilihan tanpa memaksa keputusan terlalu cepat",
  },
  Ni: {
    name: "Arah waktu dan perkembangan",
    focus: "arah perubahan, timing, konsekuensi, dan makna dari rangkaian kejadian",
    behavior: "membaca ke mana situasi bergerak, menunggu momen yang tepat, dan merangkum banyak kejadian menjadi satu arah",
    overload: "terlalu lama menunggu, terlalu yakin pada satu tafsir, atau melihat pertanda lebih cepat daripada bukti",
    support: "orang yang membantu mengubah pembacaan arah menjadi langkah nyata",
  },
  Se: {
    name: "Tekanan, batas, dan tindakan",
    focus: "siapa memegang kendali, apa yang perlu ditegaskan, dan tindakan langsung yang mengubah keadaan",
    behavior: "memasang batas, mengambil posisi, menggerakkan orang, dan bertindak saat situasi menuntut keputusan",
    overload: "menekan terlalu keras, membaca banyak hal sebagai adu kekuatan, atau sulit memberi ruang pada cara yang lebih halus",
    support: "orang yang memberi arah tegas tanpa merendahkan atau mengambil alih seluruh keputusan",
  },
  Si: {
    name: "Kenyamanan dan kualitas pengalaman",
    focus: "kondisi tubuh, ritme, rasa nyaman, kualitas inderawi, dan detail yang membuat hidup terasa layak dijalani",
    behavior: "menata suasana, memperbaiki kenyamanan, menjaga tempo, dan menyadari perubahan kecil pada tubuh atau lingkungan",
    overload: "terlalu lama bertahan di zona nyaman, menghindari dorongan yang perlu, atau terlalu sibuk mengatur detail kecil",
    support: "orang yang membantu menjaga ritme, tubuh, dan suasana tanpa membuatmu merasa dikontrol",
  },
  Te: {
    name: "Fakta, hasil, dan cara kerja",
    focus: "apa yang terbukti bekerja, data yang bisa dipakai, hasil nyata, dan langkah yang paling efisien",
    behavior: "menguji cara, membandingkan hasil, mencari bukti, dan memperbaiki proses supaya lebih efektif",
    overload: "menilai semuanya hanya dari hasil, mengabaikan proses manusia, atau memaksa efisiensi pada situasi yang butuh pemahaman",
    support: "orang yang memberi fakta jelas, contoh nyata, dan langkah praktis tanpa membuatmu merasa bodoh",
  },
  Ti: {
    name: "Struktur, aturan, dan konsistensi",
    focus: "bagaimana bagian saling terhubung, aturan bekerja, definisi dibedakan, dan sistem tetap konsisten",
    behavior: "merapikan konsep, membuat kategori, memeriksa kontradiksi, dan menyusun kerangka yang mudah dipahami",
    overload: "terlalu kaku pada definisi, lama menyusun sistem, atau sulit bergerak sebelum semuanya terasa konsisten",
    support: "orang yang memberi kerangka jelas dan membantu memisahkan masalah tanpa menghakimi",
  },
  Fe: {
    name: "Suasana dan ekspresi emosi",
    focus: "energi kelompok, perubahan mood, ekspresi, dan cara emosi bergerak dari satu orang ke orang lain",
    behavior: "menghidupkan suasana, menyesuaikan ekspresi, membaca energi ruangan, dan membuat emosi lebih terlihat",
    overload: "menaikkan intensitas terlalu cepat, merasa perlu mengatur mood semua orang, atau kehilangan batas emosi pribadi",
    support: "orang yang membantu menamai dan menyalurkan emosi tanpa menjadikannya pertunjukan",
  },
  Fi: {
    name: "Kedekatan, nilai, dan batas personal",
    focus: "siapa yang dipercaya, seberapa dekat hubungan, apa yang terasa tulus, dan batas etis antarorang",
    behavior: "menilai kedekatan, menjaga loyalitas, memilih kata dengan hati-hati, dan mengubah jarak saat rasa percaya berubah",
    overload: "terlalu cepat menyimpulkan niat orang, menyimpan penilaian terlalu lama, atau menutup hubungan tanpa memberi konteks",
    support: "orang yang menunjukkan ketulusan secara konsisten dan menghormati batas personal",
  },
};

const POSITION_COPY: Record<ModelAPosition, {
  title: string;
  block: PositionEditorial["block"];
  status: string;
  meaning: string;
  evidence: string;
  cautionPrefix: string;
  reflection: string;
}> = {
  Base: {
    title: "Base / Leading",
    block: "Ego",
    status: "Kuat, sadar, dan dihargai",
    meaning: "Ini biasanya menjadi orientasi paling spontan. Kamu cenderung melihat dunia melalui aspek ini dan merasa cukup berhak memberi penilaian atau arah tanpa harus menunggu izin.",
    evidence: "Carilah otomatisitas, kedalaman, rasa punya otoritas, dan kebiasaan memperbaiki keadaan pada aspek ini tanpa diminta.",
    cautionPrefix: "Saat dipakai berlebihan, kekuatan ini bisa berubah menjadi",
    reflection: "Apakah kamu tetap memakai pola ini saat santai, tidak sedang tampil, dan tidak sedang mengejar pujian?",
  },
  Creative: {
    title: "Creative",
    block: "Ego",
    status: "Kuat, sadar, dan dihargai",
    meaning: "Ini adalah alat fleksibel untuk membantu tujuan fungsi Base. Kamu biasanya bisa menyesuaikan kadar, gaya, dan timing pemakaiannya sesuai kebutuhan situasi.",
    evidence: "Carilah keluwesan, kemampuan membantu orang lain, dan kemudahan memakai aspek ini tanpa menjadikannya identitas utama.",
    cautionPrefix: "Saat terlalu aktif, fungsi ini bisa membuatmu",
    reflection: "Apakah kamu memakai kemampuan ini sebagai alat, bukan sebagai hal yang harus terus dibuktikan?",
  },
  Role: {
    title: "Role / Peran",
    block: "Super-ego",
    status: "Lebih lemah, sadar, dan tidak terlalu dihargai",
    meaning: "Ini sering muncul sebagai performa sosial: hal yang kamu lakukan karena terasa pantas, perlu, atau dituntut. Kamu bisa terlihat cukup mampu, tetapi kualitasnya mudah turun saat situasi baru atau kompleks.",
    evidence: "Carilah bahasa 'aku seharusnya', skrip sosial, rasa harus terlihat mampu, dan kelelahan setelah mempertahankan performa terlalu lama.",
    cautionPrefix: "Kalau dipaksa terus, area ini bisa membuatmu",
    reflection: "Apakah kamu melakukan ini karena memang ingin, atau karena takut terlihat tidak pantas?",
  },
  Vulnerable: {
    title: "Vulnerable / PoLR",
    block: "Super-ego",
    status: "Lemah, sadar, dan tidak dihargai",
    meaning: "Ini bukan sekadar skor rendah. Area ini lebih tepat dikenali dari rasa sakit spesifik, kaku, malu, defensif, beku, atau ingin menghindar saat tuntutannya meningkat.",
    evidence: "Carilah aversion, freeze, shame, avoidance, dan kesulitan menyesuaikan diri yang terasa tidak sebanding dengan usaha.",
    cautionPrefix: "Tekanan berlebihan di sini bisa membuatmu",
    reflection: "Apa yang biasanya kamu lakukan: menyerang balik, membeku, menghindar, atau pura-pura tidak peduli?",
  },
  Suggestive: {
    title: "Suggestive",
    block: "Super-id",
    status: "Lemah, vital, dan dihargai",
    meaning: "Ini adalah saluran penerimaan. Bantuan yang tepat pada aspek ini dapat terasa menenangkan, meyakinkan, atau membuat hidup jauh lebih mudah.",
    evidence: "Carilah relief, trust, admiration, dan kecenderungan membiarkan orang kompeten membantu tanpa merasa direndahkan.",
    cautionPrefix: "Kebutuhan ini bisa menjadi tidak sehat kalau kamu",
    reflection: "Bantuan seperti apa yang langsung membuat tubuh atau pikiranmu terasa lebih ringan?",
  },
  Mobilizing: {
    title: "Mobilizing / Activating",
    block: "Super-id",
    status: "Lebih lemah, vital, dan dihargai",
    meaning: "Ini adalah area aspirasi dan kebanggaan sensitif. Kamu ingin berkembang di sini dan bisa sangat tersentuh oleh pujian yang tepat, tetapi performanya belum selalu stabil.",
    evidence: "Carilah proyek pengembangan diri, pujian yang paling menggerakkan, lonjakan usaha, dan kebanggaan yang masih rapuh.",
    cautionPrefix: "Kalau terlalu ingin membuktikan diri, kamu bisa",
    reflection: "Pujian tentang kemampuan apa yang paling lama kamu ingat?",
  },
  Ignoring: {
    title: "Ignoring",
    block: "Id",
    status: "Kuat, vital, dan tidak dihargai",
    meaning: "Kamu biasanya mampu memakai aspek ini, tetapi tidak ingin menjadikannya pusat identitas. Kamu akan menggunakannya saat perlu lalu mengembalikan fokus ke orientasi Base.",
    evidence: "Carilah sikap 'aku bisa, tetapi bukan itu intinya', kemampuan nyata, dan kebiasaan menutup topik saat aspek ini mengambil terlalu banyak ruang.",
    cautionPrefix: "Karena terasa bukan inti, kamu bisa",
    reflection: "Kemampuan apa yang sering dipuji orang lain tetapi kamu anggap biasa saja?",
  },
  Demonstrative: {
    title: "Demonstrative",
    block: "Id",
    status: "Kuat, vital, dan tidak dihargai",
    meaning: "Ini adalah kompetensi latar yang sangat otomatis. Kamu bisa memakainya untuk menjaga keadaan atau membantu orang tanpa merasa sedang menunjukkan kemampuan khusus.",
    evidence: "Carilah tindakan tepat tanpa banyak penjelasan, kemampuan tinggi yang diremehkan, dan rasa heran saat orang lain menganggapnya sulit.",
    cautionPrefix: "Karena terlalu otomatis, kamu bisa",
    reflection: "Apa yang kamu lakukan dengan mudah sampai lupa bahwa orang lain belum tentu bisa?",
  },
};

export function getPositionEditorial(type: TIM, position: ModelAPosition): PositionEditorial {
  const element = TIM_MODELS[type].positions[position];
  const elementCopy = ELEMENT_COPY[element];
  const positionCopy = POSITION_COPY[position];

  let inPractice = `Dalam praktik, perhatianmu cenderung tertuju pada ${elementCopy.focus}. Kamu biasanya ${elementCopy.behavior}.`;
  let caution = `${positionCopy.cautionPrefix} ${elementCopy.overload}.`;

  if (position === "Role") {
    inPractice = `Dalam situasi formal, kamu bisa berusaha terlihat mampu pada ${elementCopy.focus}, tetapi responsnya lebih bergantung pada aturan, contoh, atau persiapan.`;
  } else if (position === "Vulnerable") {
    inPractice = `Tuntutan pada ${elementCopy.focus} dapat terasa jauh lebih berat daripada yang terlihat dari luar. Kamu mungkin butuh waktu, konteks yang aman, atau bantuan yang sangat konkret.`;
  } else if (position === "Suggestive") {
    inPractice = `Kamu biasanya merasa lebih lega saat orang tepercaya membantu lewat ${elementCopy.support}.`;
  } else if (position === "Mobilizing") {
    inPractice = `Kamu ingin berkembang pada ${elementCopy.focus} dan mudah termotivasi saat kemajuan kecilmu benar-benar diperhatikan.`;
  } else if (position === "Ignoring") {
    inPractice = `Kamu bisa menangani ${elementCopy.focus}, tetapi cepat menganggapnya bukan hal utama dan mengarahkan kembali perhatian ke prioritas lain.`;
  } else if (position === "Demonstrative") {
    inPractice = `Kamu sering ${elementCopy.behavior} secara otomatis, terutama untuk menjaga kelancaran situasi, tanpa merasa perlu membicarakannya panjang lebar.`;
  }

  return {
    position,
    element,
    title: positionCopy.title,
    block: positionCopy.block,
    status: positionCopy.status,
    meaning: positionCopy.meaning,
    inPractice,
    evidence: positionCopy.evidence,
    caution,
    reflection: positionCopy.reflection,
  };
}

export function getTypeComparisonSnapshot(type: TIM): TypeComparisonSnapshot {
  return {
    type,
    base: getPositionEditorial(type, "Base"),
    creative: getPositionEditorial(type, "Creative"),
    vulnerable: getPositionEditorial(type, "Vulnerable"),
    suggestive: getPositionEditorial(type, "Suggestive"),
  };
}

const RELATION_COPY: Record<string, { name: string; summary: string; strength: string; friction: string; advice: string }> = {
  duality: {
    name: "Duality / Saling Melengkapi",
    summary: "Kekuatan satu pihak cenderung menyentuh area yang dihargai tetapi lebih lemah pada pihak lain.",
    strength: "Bisa terasa melegakan karena bantuan datang pada area yang memang dicari.",
    friction: "Kecocokan tidak otomatis muncul kalau komunikasi, batas, dan kedewasaan tidak ada.",
    advice: "Jelaskan kebutuhan secara langsung. Jangan berharap pasangan membaca semua kebutuhan tanpa konteks.",
  },
  activation: {
    name: "Activation / Aktivasi",
    summary: "Interaksi biasanya terasa hidup, cepat, dan saling mendorong untuk bergerak.",
    strength: "Bagus untuk ide, aktivitas, dan kolaborasi yang butuh energi awal.",
    friction: "Tempo yang tinggi dapat melelahkan kalau tidak ada waktu tenang.",
    advice: "Selingi aktivitas dengan jeda dan pembagian peran yang jelas.",
  },
  mirror: {
    name: "Mirror / Cermin",
    summary: "Keduanya menghargai elemen yang sama, tetapi menempatkan prioritasnya secara berbeda.",
    strength: "Diskusi dapat tajam, saling mengoreksi, dan mudah menemukan titik temu konsep.",
    friction: "Perbedaan antara orientasi utama dan alat pendukung bisa menimbulkan debat soal mana yang lebih penting.",
    advice: "Gunakan perbedaan sudut pandang untuk memperbaiki ide, bukan untuk menentukan siapa yang paling benar.",
  },
  identity: {
    name: "Identity / Identitas",
    summary: "Struktur Model A sama, sehingga pola pikir dan titik rawan sering terasa familiar.",
    strength: "Pemahaman awal bisa cepat karena bahasa dan prioritas mirip.",
    friction: "Keduanya juga membawa kelemahan yang sama, jadi tidak selalu saling menutup kekurangan.",
    advice: "Cari masukan dari luar saat kalian mulai mengulang blind spot yang sama.",
  },
  kindred: {
    name: "Kindred / Sekerabat",
    summary: "Orientasi Base sama, tetapi cara menjalankan dan mewujudkannya berbeda.",
    strength: "Biasanya mudah memahami apa yang sama-sama dianggap penting.",
    friction: "Metode dan prioritas praktis dapat berbeda cukup jauh.",
    advice: "Pisahkan kesamaan tujuan dari perbedaan cara kerja.",
  },
  business: {
    name: "Business / Mitra Kerja",
    summary: "Ada kesamaan alat kerja, tetapi pusat perhatian dan nilai utama berbeda.",
    strength: "Bisa efektif untuk tugas konkret dan pembagian peran yang jelas.",
    friction: "Hubungan dapat terasa fungsional tetapi kurang menyentuh kebutuhan personal.",
    advice: "Jangan hanya membahas tugas. Beri ruang untuk ekspektasi dan batas relasi.",
  },
  semi_duality: {
    name: "Semi-Duality / Semi-Dualitas",
    summary: "Ada rasa saling melengkapi, tetapi tidak semua kebutuhan tertangani dengan mulus.",
    strength: "Daya tarik dan rasa nyaman bisa muncul cukup cepat.",
    friction: "Harapan tinggi mudah berubah menjadi bingung saat dukungan datang dalam bentuk yang kurang pas.",
    advice: "Sebutkan bantuan yang kamu butuhkan secara spesifik.",
  },
  mirage: {
    name: "Mirage / Relasi Santai",
    summary: "Interaksi sering terasa ringan dan nyaman, terutama saat tidak banyak tekanan.",
    strength: "Bagus untuk kebersamaan santai dan dukungan emosional ringan.",
    friction: "Koordinasi target besar bisa lemah kalau keduanya terlalu membiarkan.",
    advice: "Saat ada tujuan bersama, buat tenggat dan pembagian tanggung jawab yang konkret.",
  },
  contrary: {
    name: "Contrary / Kontras",
    summary: "Keduanya memakai elemen yang mirip, tetapi arah perhatian dan ritmenya berbeda.",
    strength: "Bisa membuka sudut pandang yang sebelumnya tidak terlihat.",
    friction: "Argumen mudah terasa saling mematahkan walau topiknya sama.",
    advice: "Periksa dulu apakah kalian berbeda kesimpulan atau hanya berbeda urutan berpikir.",
  },
  quasi_identity: {
    name: "Quasi-Identity / Identitas Semu",
    summary: "Di permukaan tampak mirip, tetapi struktur prioritasnya berbeda.",
    strength: "Keduanya dapat tertarik pada topik yang sama.",
    friction: "Definisi, tujuan, dan cara menyimpulkan sering bergeser tanpa disadari.",
    advice: "Gunakan contoh konkret dan ulangi definisi sebelum debat makin jauh.",
  },
  superego: {
    name: "Super-Ego",
    summary: "Hubungan dapat terasa formal karena masing-masing menyentuh area adaptasi pihak lain.",
    strength: "Ada peluang belajar disiplin dan sudut pandang yang berbeda.",
    friction: "Keduanya mudah merasa sedang dinilai atau harus tampil benar.",
    advice: "Kurangi koreksi publik dan jangan mengubah perbedaan menjadi penilaian karakter.",
  },
  conflict: {
    name: "Conflict / Konflik",
    summary: "Kekuatan utama satu pihak mudah menyentuh titik paling sensitif pihak lain.",
    strength: "Hubungan ini bisa memperlihatkan blind spot dengan sangat jelas.",
    friction: "Tanpa batas dan komunikasi yang matang, interaksi cepat terasa melelahkan atau menyerang.",
    advice: "Jaga jarak sehat, hindari memaksa cara sendiri, dan gunakan aturan komunikasi yang konkret.",
  },
  benefit: {
    name: "Benefit / Manfaat Asimetris",
    summary: "Aliran perhatian dan kekaguman cenderung terasa tidak seimbang.",
    strength: "Salah satu pihak dapat memberi inspirasi atau arah yang sangat berarti.",
    friction: "Pihak lain bisa merasa kurang dilihat atau terus mengejar pengakuan.",
    advice: "Periksa apakah kontribusi, penghargaan, dan keputusan dibagi secara adil.",
  },
  supervision: {
    name: "Supervision / Pengawasan Asimetris",
    summary: "Satu pihak mudah melihat kelemahan yang sangat sensitif pada pihak lain.",
    strength: "Dapat berguna dalam konteks belajar yang aman dan jelas.",
    friction: "Koreksi berulang mudah terasa seperti audit pribadi atau penghinaan.",
    advice: "Batasi area koreksi, minta izin sebelum memberi kritik, dan hindari nada menggurui.",
  },
};

export function getRelationEditorial(code: string) {
  return RELATION_COPY[code] ?? {
    name: code,
    summary: "Hubungan ini memiliki pola pertukaran informasi yang khas dalam teori Socionics.",
    strength: "Ada area yang dapat saling membantu.",
    friction: "Ada pula perbedaan prioritas yang perlu dibicarakan secara langsung.",
    advice: "Gunakan hasil ini sebagai hipotesis, bukan kepastian tentang kualitas hubungan.",
  };
}
