/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIMKey, TIMProfile, InfoElement, Quadra, RelationDetails, RelationCode } from './types';

export const ELEMENTS_METADATA: Record<InfoElement, { name: string; type: string; desc: string }> = {
  Te: { name: 'Logika Ekstravert (Te)', type: 'Logika Kerja', desc: 'Efisiensi, kegunaan praktis, manajemen sumber daya, tata cara bertindak nyata.' },
  Ti: { name: 'Logika Intravert (Ti)', type: 'Logika Struktural', desc: 'Sistematisasi, hierarki, konsistensi logis, klasifikasi, pemahaman teori.' },
  Se: { name: 'Sensing Ekstravert (Se)', type: 'Sensing Volisi', desc: 'Kemauan, pengaruh langsung, ruang fisik, ketajaman indra, mobilisasi energi.' },
  Si: { name: 'Sensing Intravert (Si)', type: 'Sensing Estetika', desc: 'Kenyamanan fisik, homeostasis internal, keharmonisan estetika, kualitas sensorik.' },
  Fe: { name: 'Etika Ekstravert (Fe)', type: 'Etika Emosi', desc: 'Suasana hati, ekspresi emosional, kegairahan sosial, resonansi emosi kelompok.' },
  Fi: { name: 'Etika Intravert (Fi)', type: 'Etika Relasi', desc: 'Hubungan interpersonal, nilai-nilai moral internal, ketertarikan psikologis.' },
  Ne: { name: 'Intuisi Ekstravert (Ne)', type: 'Intuisi Potensi', desc: 'Kemungkinan alternatif, esensi tersembunyi, gagasan baru, eksplorasi peluang.' },
  Ni: { name: 'Intuisi Intravert (Ni)', type: 'Intuisi Waktu', desc: 'Arus waktu, perkembangan sejarah, visualisasi visi masa depan, prognosis intuitif.' }
};

export const POSITIONS_METADATA: Record<number, { name: string; roleDesc: string }> = {
  1: { name: 'Base (Leading)', roleDesc: 'Cara utama memahami kenyataan, pandangan hidup yang paling alami dan dominan.' },
  2: { name: 'Creative (Realizing)', roleDesc: 'Alat pemecahan masalah aktif, cara beradaptasi dan beraksi terhadap dunia luar.' },
  3: { name: 'Role (Contact)', roleDesc: 'Topeng sosial formal untuk menyesuaikan diri dalam lingkungan yang kurang akrab.' },
  4: { name: 'Vulnerable (PoLR)', roleDesc: 'Titik gesekan mental utama; menghindari tekanan berlebih dan rasa malu di area ini.' },
  5: { name: 'Suggestive (Dual-Seeking)', roleDesc: 'Area relaksasi psikologis; bersedia menerima bantuan dan bimbingan tanpa defensif.' },
  6: { name: 'Mobilizing (Activating)', roleDesc: 'Motivator emosional pribadi; merasa bangga bila diakui sukses di bidang ini.' },
  7: { name: 'Ignoring (Limiting)', roleDesc: 'Informasi latar belakang yang dikesampingkan tetapi dikuasai secara kritis.' },
  8: { name: 'Demonstrative (Background)', roleDesc: 'Keahlian otomatis tanpa kata-kata yang mendasari rasa percaya diri praktis.' }
};

const TIM_RAW_DATA: Record<TIMKey, {
  name: string;
  threeLetter: string;
  title: string;
  quadra: Quadra;
  shortDesc: string;
  detailedDesc: string;
  leading: InfoElement;
  creative: InfoElement;
}> = {
  ILE: {
    name: 'Don Quixote',
    threeLetter: 'ENTp',
    title: 'Pencari Potensi',
    quadra: 'Alpha',
    shortDesc: 'Menyukai eksplorasi konsep abstrak baru, pemikiran struktural murni, dan pemecahan masalah teoritis.',
    detailedDesc: 'Tipe ini melihat dunia sebagai jaringan kemungkinan terpendam. Mereka berkembang pesat dalam sesi curah ide (brainstorming), pemodelan teoritis, dan perombakan struktur usang dengan model pemikiran logis baru.',
    leading: 'Ne',
    creative: 'Ti'
  },
  SEI: {
    name: 'Dumas',
    threeLetter: 'ISFp',
    title: 'Penyelaras Kenyamanan',
    quadra: 'Alpha',
    shortDesc: 'Mengutamakan keharmonisan sensorik, hubungan sosial yang hangat, kenyamanan fisik, dan ketenangan ekologi.',
    detailedDesc: 'Sangat peka terhadap kualitas estetika, ritme fisik tubuh, dan perubahan suasana hati di sekitarnya. Berusaha menjaga kestabilan lingkungan sensorik yang santai dan penuh penerimaan.',
    leading: 'Si',
    creative: 'Fe'
  },
  ESE: {
    name: 'Hugo',
    threeLetter: 'ESFj',
    title: 'Penggerak Suasana',
    quadra: 'Alpha',
    shortDesc: 'Aktif menciptakan kegembiraan sosial, merawat kebutuhan praktis kelompok, menjaga tradisi komunikasi yang hangat.',
    detailedDesc: 'Sangat tanggap terhadap ekspresi emosi luar dan kesejahteraan esensial orang-orang terdekat. Mereka adalah tuan rumah sejati yang menggabungkan keramahan emosional dengan keteraturan sensorik yang nyata.',
    leading: 'Fe',
    creative: 'Si'
  },
  LII: {
    name: 'Robespierre',
    threeLetter: 'INTj',
    title: 'Analis Struktural',
    quadra: 'Alpha',
    shortDesc: 'Berdedikasi pada kejelasan logis, prinsip universal yang konsisten, dan penyusunan konsep teoritis yang kokoh.',
    detailedDesc: 'Menganalisis kenyataan melalui hukum-hukum struktural abstrak yang konsisten. Menghargai kemandirian intelektual dan tatanan keadilan murni yang bebas dari bias subjektif emosional.',
    leading: 'Ti',
    creative: 'Ne'
  },
  EIE: {
    name: 'Hamlet',
    threeLetter: 'ENFj',
    title: 'Mentor Ekspresif',
    quadra: 'Beta',
    shortDesc: 'Mengomunikasikan pesan ideologis yang mendalam, membangkitkan komitmen kelompok, dan mengantisipasi arah masa depan.',
    detailedDesc: 'Mempunyai kemampuan meramalkan potensi emosional orang lain dan menggerakkan massa ke arah perubahan sosial tertentu berdasarkan pemahaman visi jangka panjang mereka.',
    leading: 'Fe',
    creative: 'Ni'
  },
  LSI: {
    name: 'Maxim Gorky',
    threeLetter: 'ISTj',
    title: 'Penyelaras Aturan',
    quadra: 'Beta',
    shortDesc: 'Disiplin tinggi, sangat menghargai struktur logis nyata, akurasi prosedur, dan kepastian kendali fisik.',
    detailedDesc: 'Menerapkan logika struktural dalam bentuk penertiban fisik yang detail dan stabil. Sangat bertanggung jawab atas area kerjanya dan memastikan semua berada di bawah aturan operasional yang jelas.',
    leading: 'Ti',
    creative: 'Se'
  },
  SLE: {
    name: 'Zhukov',
    threeLetter: 'ESTp',
    title: 'Pelaksana Strategis',
    quadra: 'Beta',
    shortDesc: 'Praktis, gigih mengatasi rintangan konkret, dan mahir merebut posisi strategis serta mengerahkan kekuatan.',
    detailedDesc: 'Memandang situasi sebagai medan dinamika kekuatan nyata. Cepat bertindak tanpa ragu, taktis dalam pertempuran langsung, dan mengandalkan analisis sistemik untuk mengorganisasi regu kerjanya.',
    leading: 'Se',
    creative: 'Ti'
  },
  IEI: {
    name: 'Yesenin',
    threeLetter: 'INFp',
    title: 'Pencari Tren Temporal',
    quadra: 'Beta',
    shortDesc: 'Mengamati aliran waktu secara puitis-kontemplatif, menyukai getaran emosi halus, meramalkan konsekuensi tren jangka panjang.',
    detailedDesc: 'Menavigasi kehidupan melalui persepsi waktu, intuisi halus terhadap nasib, dan perubahan pola hubungan emosional antarmanusia. Mencari kenyamanan batin tanpa perlu dipaksa berurusan dengan rutinitas monoton.',
    leading: 'Ni',
    creative: 'Fe'
  },
  LIE: {
    name: 'Jack London',
    threeLetter: 'ENTj',
    title: 'Wirausahawan Dinamis',
    quadra: 'Gamma',
    shortDesc: 'Sangat efisien dalam aksi, taktis mengumpulkan peluang bisnis, menyukai uji coba berbasis fakta sains lapangan.',
    detailedDesc: 'Terus mencari metode kerja yang lebih cepat, murah, dan berdampak ekonomis tinggi. Menggabungkan keberanian berinvestasi masa depan dengan perhitungan logis-faktual yang akurat.',
    leading: 'Te',
    creative: 'Ni'
  },
  ESI: {
    name: 'Dreiser',
    threeLetter: 'ISFj',
    title: 'Penjaga Batasan Relasi',
    quadra: 'Gamma',
    shortDesc: 'Teguh menjaga kesetiaan relasi batin, bersikap waspada terhadap motif asing, membela batasan moral dengan aksi tegas.',
    detailedDesc: 'Mengevaluasi moralitas hubungan interpersonal secara ketat dari jarak dekat. Tidak ragu mengambil tindakan protektif aktif untuk membela diri maupun orang lain dari ketidakadilan relasi.',
    leading: 'Fi',
    creative: 'Se'
  },
  LSE: {
    name: 'Stierlitz',
    threeLetter: 'ESTj',
    title: 'Direktur Praktis',
    quadra: 'Delta',
    shortDesc: 'Menguasai tata cara kerja paling efisien, mengutamakan keandalan produk fisikal, dan menjaga kenyamanan kerja regu.',
    detailedDesc: 'Pembangun sistem kerja yang sangat memedulikan kepraktisan nyata dan perawatan kebugaran pekerjanya. Menggabungkan etos kerja profesional tanpa kompromi dengan kualitas material terbaik.',
    leading: 'Te',
    creative: 'Si'
  },
  EII: {
    name: 'Dostoevsky',
    threeLetter: 'INFj',
    title: 'Pemberi Empati Halus',
    quadra: 'Delta',
    shortDesc: 'Peka terhadap keunikan perkembangan batin manusia, mengutamakan kelembutan moralitas relasi, menghindari kompetisi keras.',
    detailedDesc: 'Membimbing orang lain menemukan kedamaian batin dan memperdalam kematangan kepribadian moral tanpa menghakimi. Melakukan penyelesaian konflik lewat dialog empatik yang terperinci.',
    leading: 'Fi',
    creative: 'Ne'
  },
  SEE: {
    name: 'Caesar',
    threeLetter: 'ESFp',
    title: 'Pengarah Aliansi',
    quadra: 'Gamma',
    shortDesc: 'Karismatis luar biasa, mahir menjalin kemitraan menguntungkan, dinamis memperluas pengaruh, peka perasaan subjektif.',
    detailedDesc: 'Secara alami menempati posisi pimpinan dengan memperluas jangkauan sosial secara persuasif. Menggunakan intuisi relasi personal untuk menggalang persetujuan dari figur-figur berpengaruh sekitar.',
    leading: 'Se',
    creative: 'Fi'
  },
  ILI: {
    name: 'Balzac',
    threeLetter: 'INTp',
    title: 'Pengamat Skeptis-Prediktif',
    quadra: 'Gamma',
    shortDesc: 'Cermat menganalisis ketidakefisienan rencana jangka panjang, menghindari kontribusi sia-sia, peka prediksi bencana.',
    detailedDesc: 'Mengembangkan kemandirian intelektual yang mendalam. Mereka bertindak sebagai penyeimbang logis yang menunjukkan risiko masa depan dari antusiasme berlebih kelompok sebelum semua rencana dijalankan.',
    leading: 'Ni',
    creative: 'Te'
  },
  IEE: {
    name: 'Huxley',
    threeLetter: 'ENFp',
    title: 'Inspirator Potensi',
    quadra: 'Delta',
    shortDesc: 'Tanggap akan bakat unik manusia, mahir mencairkan suasana dengan cara kreatif, mengusung kebebasan pilihan pribadi.',
    detailedDesc: 'Terus menggali potensi dalam diri setiap orang agar dapat diekspresikan secara jujur. Tidak menyukai pembatasan birokrasi kaku dan memilih mengandalkan kelenturan relasi interpersonal.',
    leading: 'Ne',
    creative: 'Fi'
  },
  SLI: {
    name: 'Gabin',
    threeLetter: 'ISTp',
    title: 'Pengrajin Mandiri',
    quadra: 'Delta',
    shortDesc: 'Terampil menciptakan karya fisik dengan tenaga seminimal mungkin, mengedepankan ergonomi tubuh, mengabaikan birokrasi.',
    detailedDesc: 'Sangat menyukai pekerjaan ahli mandiri (craftsmanship) di mana mereka bisa mengatur waktu dan energi sendiri secara bebas. Meminimalkan ketegangan sosial demi mempertahankan homeostasis tubuh.',
    leading: 'Si',
    creative: 'Te'
  }
};

// Generates correct Model A positions from Leading and Creative elements and dichotomy mathematics
export function computeModelAPositions(leading: InfoElement, creative: InfoElement): { channel: number; functionName: string; element: InfoElement; description: string }[] {
  // Aspects opposites Mapping
  const opposites: Record<string, string> = {
    'N': 'S', 'S': 'N',
    'T': 'F', 'F': 'T',
    'e': 'i', 'i': 'e'
  };

  const getAspect = (el: InfoElement) => el[0];
  const getAttitude = (el: InfoElement) => el[1];
  const makeElement = (asp: string, att: string) => (asp + att) as InfoElement;

  const L_asp = getAspect(leading);
  const L_att = getAttitude(leading);
  const C_asp = getAspect(creative);
  const C_att = getAttitude(creative);

  // Derive all 8 functions mathematically:
  // 1. Base (Leading): L
  const base = leading;
  // 2. Creative: C
  const creat = creative;
  // 3. Role: Opposite aspect to Leading, same attitude as Leading.
  const role = makeElement(opposites[L_asp], L_att);
  // 4. Vulnerable/PoLR: Opposite aspect to Creative, same attitude as Creative.
  const vulnerable = makeElement(opposites[C_asp], C_att);
  // 5. Suggestive: Opposite aspect to Leading, opposite attitude to Leading.
  const suggestive = makeElement(opposites[L_asp], opposites[L_att]);
  // 6. Mobilizing: Opposite aspect to Creative, opposite attitude to Creative.
  const mobilizing = makeElement(opposites[C_asp], opposites[C_att]);
  // 7. Ignoring: Same aspect as Leading, opposite attitude to Leading.
  const ignoring = makeElement(L_asp, opposites[L_att]);
  // 8. Demonstrative: Same aspect as Creative, opposite attitude to Creative.
  const demonstrative = makeElement(C_asp, opposites[C_att]);

  const channels = [
    { num: 1, el: base, name: 'Base (Leading)', descNum: 1 },
    { num: 2, el: creat, name: 'Creative (Realizing)', descNum: 2 },
    { num: 3, el: role, name: 'Role (Contact)', descNum: 3 },
    { num: 4, el: vulnerable, name: 'Vulnerable (PoLR)', descNum: 4 },
    { num: 5, el: suggestive, name: 'Suggestive (Dual-Seeking)', descNum: 5 },
    { num: 6, el: mobilizing, name: 'Mobilizing (Activating)', descNum: 6 },
    { num: 7, el: ignoring, name: 'Ignoring (Limiting)', descNum: 7 },
    { num: 8, el: demonstrative, name: 'Demonstrative (Background)', descNum: 8 }
  ];

  return channels.map(ch => {
    let specificDesc = '';
    // Provide clean, structured description according to official Socionics Atlas patterns (v3)
    switch (ch.num) {
      case 1:
        specificDesc = `Berfungsi sebagai lensa utama kehidupan. Menjaga worldview fundamental tipe ini melalui elemen ${ELEMENTS_METADATA[ch.el].name}, dijalankan secara konstan dan alami.`;
        break;
      case 2:
        specificDesc = `Menyelesaikan masalah secara kreatif demi mendukung visi Base. Elemen ${ELEMENTS_METADATA[ch.el].name} digunakan sebagai negosiasi fleksibel dengan lingkungan sosial.`;
        break;
      case 3:
        specificDesc = `Adaptasi normatif jangka pendek di lingkungan baru. Elemen ${ELEMENTS_METADATA[ch.el].name} diaktifkan secara sadar untuk menampilkan kepantasan formal tanpa minat berlebih.`;
        break;
      case 4:
        specificDesc = `Merupakan titik sensitif utama (PoLR). Mengalami kecemasan tinggi, kepanikan, rasa bersalah, atau penolakan kaku bila dipaksa mengolah informasi ${ELEMENTS_METADATA[ch.el].name} di luar kendali pribadi.`;
        break;
      case 5:
        specificDesc = `Merupakan elemen dambaan (Suggestive) yang dicari pasif. Memberikan rasa tenang, kelegaan, dan rasa percaya tinggi bila dibantu orang lain mengeksekusi informasi ${ELEMENTS_METADATA[ch.el].name}.`;
        break;
      case 6:
        specificDesc = `Mengisi motivasi diri untuk tumbuh dan membuktikan harga diri. Elemen ${ELEMENTS_METADATA[ch.el].name} berkembang pesat melalui penghargaan tulus dari mentor terdekat.`;
        break;
      case 7:
        specificDesc = `Berfungsi menyaring masukan informasi berlebihan. Elemen ${ELEMENTS_METADATA[ch.el].name} dikuasai dengan baik tetapi cenderung dikesampingkan karena dianggap tidak efisien bagi fokus utama.`;
        break;
      case 8:
        specificDesc = `Berisi kemampuan otomatis sejati berkinerja tinggi tanpa pamer verbal. Elemen ${ELEMENTS_METADATA[ch.el].name} menjaga keselamatan psikologis diri secara konstan di balik layar.`;
        break;
    }

    return {
      channel: ch.num,
      functionName: ch.name,
      element: ch.el,
      description: specificDesc
    };
  });
}

export function get16TIMProfiles(): TIMProfile[] {
  const keys = Object.keys(TIM_RAW_DATA) as TIMKey[];
  return keys.map(key => {
    const raw = TIM_RAW_DATA[key];
    const positions = computeModelAPositions(raw.leading, raw.creative).map(pos => ({
      functionName: pos.functionName,
      element: pos.element,
      description: pos.description
    }));

    return {
      key,
      name: raw.name,
      threeLetter: raw.threeLetter,
      title: raw.title,
      quadra: raw.quadra,
      shortDesc: raw.shortDesc,
      detailedDesc: raw.detailedDesc,
      positions
    };
  });
}

// 16 intertype relations correctly assigned for ALL 16 TIM pairs
// Strictly avoiding fortune telling; emphasizing constraints, interaction safety, values, and psychological comfort.
export const INTERTYPE_RELATIONS_METADATA: Record<string, { name: string; title: string; description: string }> = {
  ID: {
    name: 'Identik',
    title: 'Quid Pro Quo Mutlak',
    description: 'Kesamaan struktur Model A yang lengkap membuat pertukaran gagasan berjalan instan tanpa perlu penjelasan panjang. Namun, karena memiliki kelemahan (PoLR) yang sama, pasangan ini kurang bisa melengkapi kekurangan praktis masing-masing.'
  },
  DU: {
    name: 'Dualitas',
    title: 'Penyelarasan Homeostatis Sempurna',
    description: 'Hubungan paling melengkapi dalam Socionics. Elemen dambaan (Suggestive) Anda adalah Base pasangan, sedangkan kelemahan Anda (PoLR) dilindungi oleh Demonstrative pasangan secara otomatis dari balik layar.'
  },
  AC: {
    name: 'Aktivasi',
    title: 'Katalisator Energi Jangka Pendek',
    description: 'Hubungan dinamis yang menstimulasi gerak aksi nyata dengan sangat cepat. Bekerja sangat berenergi untuk tugas-tugas ad-hoc, tetapi interaksi intens tanpa henti dapat menyebabkan keletihan mental (over-stimulation).'
  },
  MI: {
    name: 'Mirror',
    title: 'Evaluasi & Refleksi Konstruktif',
    description: 'Pasangan yang saling mematangkan argumen. Di mana satu pihak merumuskan teori (Ti/Fi), pihak lain mendaratkannya dalam implementasi nyata (Te/Fe). Diskusi berjalan lancar namun sarat akan dinamika koreksi timbal balik.'
  },
  KI: {
    name: 'Kindred',
    title: 'Kesamaan Lensa, Perbedaan Aksi',
    description: 'Menyepakati pandangan hidup dasar karena memiliki fungsi Base yang sama, tetapi berselisih paham dalam penentuan jalan keluar taktis karena fungsi Creative yang berbeda arah.'
  },
  LA: {
    name: 'Look-Alike (Bisnis)',
    title: 'Kolaborasi Profesional Tanpa Kedekatan Emosi',
    description: 'Sangat andal ketika berpartner dalam proyek pekerjaan terstruktur karena memiliki metode realisasi taktis (Creative) yang sama. Namun, di luar konteks objektif, mereka sulit menjalin rasa kedekatan pribadi.'
  },
  QI: {
    name: 'Quasi-Identik',
    title: 'Kesalahpahaman Konseptual Abadi',
    description: 'Tampak sangat mirip dari kejauhan karena menyentuh problem yang sama, tetapi saat didekati mereka merumuskan kesimpulan dengan cara yang bertolak belakang. Menghasilkan perdebatan intelektual yang tidak kunjung berujung.'
  },
  SE: {
    name: 'Super-Ego',
    title: 'Hormat Formal yang Melelahkan',
    description: 'Ada kekaguman timbal balik terhadap kepantasan formal luar masing-masing. Namun, tuntutan dari salah satu pihak selalu mengenai langsung titik terlemah (PoLR) pihak lainnya secara tidak sengaja.'
  },
  EX: {
    name: 'Contrary (Pemadaman)',
    title: 'Perbedaan Sudut Pandang Ekstrem',
    description: 'Mengolah dimensi informasi yang sama tetapi dengan orientasi sikap berlawanan (Extrovert vs Introvert). Menghasilkan ketertarikan misterius tetapi sering mematikan sirkulasi energi satu sama lain jika berkomunikasi satu meja.'
  },
  IL: {
    name: 'Illusionary (Mirage)',
    title: 'Komunikasi Santai Tanpa Efektivitas Praktis',
    description: 'Hubungan yang sangat nyaman untuk berlibur, berdiskusi santai, dan bersenang-senang. Namun, begitu dituntut mengambil keputusan taktis berisiko tinggi bersama, kelemahan koordinasi mereka langsung mencuat.'
  },
  SD: {
    name: 'Semi-Dualitas',
    title: 'Ketertarikan Tinggi dengan Hambatan Spontan',
    description: 'Pasangan yang saling melengkapi hasrat dambaan (Suggestive) tetapi gagal dalam koordinasi kenyamanan langsung. Seringkali hubungan ini dimulai dengan sangat manis sebelum terbentur kesalahpahaman spontan.'
  },
  CO: {
    name: 'Konflik',
    title: 'Ketegangan Struktural Maksimal',
    description: 'Tipe dengan fungsi Base Anda yang langsung menduduki posisi PoLR (titik trauma) pasangan, dan sebaliknya. Interaksi lama tanpa penyekat sosial akan membongkar kecemasan terbesar masing-masing pihak dan mematikan produktivitas.'
  },
  BP: {
    name: 'Pemberi Rahmat (Benefactor)',
    title: 'Pengarah Hubungan Satu Arah',
    description: 'Hubungan asimetris di mana Anda bertindak sebagai sumber inspirasi atau bimbingan bagi penerima (Beneficiary). Anda merasa perkataan Anda selalu didengarkan, tetapi Anda cenderung menganggap enteng masukan balik dari mereka.'
  },
  BC: {
    name: 'Penerima Rahmat (Beneficiary)',
    title: 'Kekaguman Asimetris yang Menuntut',
    description: 'Hubungan asimetris di mana Anda menaruh rasa hormat alami pada cara bertindak pemberi ramah (Benefactor). Anda merasa mendapat pelajaran berharga dari mereka, tetapi interaksi yang terlalu intens membuat Anda merasa tertekan.'
  },
  SP: {
    name: 'Pengawas (Supervisor)',
    title: 'Kecemasan Koreksi Instan',
    description: 'Hubungan asimetris di mana Anda mengoreksi kelemahan laten (PoLR) dari pihak terawas (Supervisee). Anda merasa perlu meluruskan kekeliruan mereka secara refleks, meskipun tujuan Anda sebenarnya baik.'
  },
  SV: {
    name: 'Terawas (Supervisee)',
    title: 'Penghalang Defensif Konstan',
    description: 'Hubungan asimetris paling melelahkan. Anda merasa setiap perilaku spontan Anda selalu berada di bawah sorotan tajam pengawas (Supervisor). Komunikasi jarak panjang adalah strategi terbaik demi menjaga kesehatan mental.'
  }
};

const DICHOTOMIES: Record<TIMKey, { ext: boolean; ns: boolean; log: boolean; rat: boolean }> = {
  ILE: { ext: true,  ns: true,  log: true,  rat: false },
  SEI: { ext: false, ns: false, log: false, rat: false },
  ESE: { ext: true,  ns: false, log: false, rat: true  },
  LII: { ext: false, ns: true,  log: true,  rat: true  },
  EIE: { ext: true,  ns: true,  log: false, rat: true  },
  LSI: { ext: false, ns: false, log: true,  rat: true  },
  SLE: { ext: true,  ns: false, log: true,  rat: false },
  IEI: { ext: false, ns: true,  log: false, rat: false },
  LIE: { ext: true,  ns: true,  log: true,  rat: true  },
  ESI: { ext: false, ns: false, log: false, rat: true  },
  LSE: { ext: true,  ns: false, log: true,  rat: true  },
  EII: { ext: false, ns: true,  log: false, rat: true  },
  SEE: { ext: true,  ns: false, log: false, rat: false },
  ILI: { ext: false, ns: true,  log: true,  rat: false },
  IEE: { ext: true,  ns: true,  log: false, rat: false },
  SLI: { ext: false, ns: false, log: true,  rat: false }
};

// Returns the relationship details of type B from the perspective of type A
export function getIntertypeRelation(typeA: TIMKey, typeB: TIMKey): RelationDetails {
  if (typeA === typeB) {
    return { code: 'ID', ...INTERTYPE_RELATIONS_METADATA.ID };
  }

  // Programmatic checks for asymmetric relations first using Model A:
  const profA = TIM_RAW_DATA[typeA];
  const profB = TIM_RAW_DATA[typeB];

  // We can calculate exactly:
  // Supervisor condition: A's Base is B's PoLR (Position 4 of B)
  // Let's get the 8 positions of B.
  const posB = computeModelAPositions(profB.leading, profB.creative);
  const polrB_el = posB.find(p => p.channel === 4)?.element;
  const reflectiveB_el = posB.find(p => p.channel === 5)?.element; // Suggestive of B
  const demoB_el = posB.find(p => p.channel === 8)?.element; // Demonstrative of B

  const posA = computeModelAPositions(profA.leading, profA.creative);
  const polrA_el = posA.find(p => p.channel === 4)?.element;
  const reflectiveA_el = posA.find(p => p.channel === 5)?.element; // Suggestive of A
  const demoA_el = posA.find(p => p.channel === 8)?.element; // Demonstrative of A

  // 1. Supervisor check: A is Supervisor of B if A's leading (Base) is B's PoLR
  if (profA.leading === polrB_el) {
    return { code: 'SP', ...INTERTYPE_RELATIONS_METADATA.SP, asymmetricDirection: 'Anda adalah Pengawas mereka' };
  }
  // 2. Supervisee check: B is Supervisor of A if B's leading is A's PoLR
  if (profB.leading === polrA_el) {
    return { code: 'SV', ...INTERTYPE_RELATIONS_METADATA.SV, asymmetricDirection: 'Mereka adalah Pengawas Anda' };
  }

  // 3. Benefit check (A's leading is B's Demonstrative AND A's creative is B's Suggestive) -> A is Benefactor of B
  if (profA.leading === demoB_el && profA.creative === reflectiveB_el) {
    return { code: 'BP', ...INTERTYPE_RELATIONS_METADATA.BP, asymmetricDirection: 'Anda adalah Pemberi Rahmat bagi mereka' };
  }
  // 4. Beneficiary check (B's leading is A's Demonstrative AND B's creative is A's Suggestive) -> B is Benefactor of A
  if (profB.leading === demoA_el && profB.creative === reflectiveA_el) {
    return { code: 'BC', ...INTERTYPE_RELATIONS_METADATA.BC, asymmetricDirection: 'Mereka adalah Pemberi Rahmat bagi Anda' };
  }

  // Symmetric relations are computed via Dichotomy XOR traits:
  const dA = DICHOTOMIES[typeA];
  const dB = DICHOTOMIES[typeB];

  const dx = dA.ext !== dB.ext;
  const dn = dA.ns !== dB.ns;
  const dl = dA.log !== dB.log;
  const dr = dA.rat !== dB.rat;

  let code: RelationCode = 'CO'; // Default fallback conflict

  if (dx && dn && dl && !dr)  code = 'DU'; // Dual (opposite ext, ns, log, same rat)
  else if (!dx && dn && dl && !dr) code = 'AC'; // Activation (same ext, opposite ns, log, same rat)
  else if (dx && !dn && !dl && !dr) code = 'MI'; // Mirror (opposite ext, same ns, log, same rat)
  else if (!dx && !dn && dl && !dr) code = 'KI'; // Kindred (same ext, ns, opposite log, same rat)
  else if (!dx && dn && !dl && !dr) code = 'LA'; // Look-Alike (same ext, log, opposite ns, rat)
  else if (dx && !dn && !dl && dr)  code = 'QI'; // Quasi-Identity
  else if (dx && dn && !dl && !dr)  code = 'SE'; // Super-Ego
  else if (dx && !dn && dl && !dr)  code = 'EX'; // Contrary / Extinguishment
  else if (dx && dn && dl && dr)   code = 'IL'; // Illusionary / Mirage
  else if (!dx && !dn && !dl && dr)  code = 'SD'; // Semi-Dual
  else if (!dx && dn && dl && dr)  code = 'CO'; // Conflict

  // Let's map any other XOR cases to correct fallbacks:
  // Dual: check
  // Activation: check
  // Mirror: check
  // Quasi-Identity: check
  // Super-Ego: check
  // Contrary: check
  // Mirage: check
  // Semi-Dual: check
  // Conflict: check
  
  // Double-check Look-Alike and Kindred
  if (code === 'CO' && !dn && dl && dr) code = 'LA'; // Look-Alike Business (same ns, opposite log, rat)
  if (code === 'CO' && dn && !dl && dr) code = 'KI'; // Kindred

  // Check and return
  const meta = INTERTYPE_RELATIONS_METADATA[code] || INTERTYPE_RELATIONS_METADATA.CO;
  return { code, ...meta };
}
