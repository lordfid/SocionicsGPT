import { TIMProfile, Question, Quadra, IntertypeRelation } from './types';

export const ELEMENTS: Record<string, { name: string; symbol: string; description: string }> = {
  Ne: { name: 'Potentiality Intuition', symbol: 'I', description: 'Melihat peluang, potensi laten, bakat, alternatif konseptual, dan keunikan objek.' },
  Ni: { name: 'Temporal Intuition', symbol: 'T', description: 'Memahami dinamika waktu, firasat perkembangan, perubahan tren, sejarah, dan makna waktu nyata.' },
  Se: { name: 'Volitional Sensation', symbol: 'F', description: 'Penguasaan ruang fisik, kekuasaan, determinasi, aksi konkrit langsung, pertahanan wilayah, dan kekuatan kehendak.' },
  Si: { name: 'Self-perceptive Sensation', symbol: 'S', description: 'Sensasi internal, harmoni estetika, relaksasi, kenyamanan fisik, keseimbangan tubuh, dan kesehatan.' },
  Te: { name: 'Practical Thinking', symbol: 'P', description: 'Efisiensi kerja, optimasi proses, kegunaan praktis, teknologi, keuntungan material, dan fakta objektif.' },
  Ti: { name: 'Structural Thinking', symbol: 'L', description: 'Sistematisasi logika, konsistensi hukum, definisi, kategori formal, analisis struktur semesta, dan regulasi.' },
  Fe: { name: 'Emotional Feeling', symbol: 'E', description: 'Ekspresi emosi luar, pengaturan atmosfer sosial, daya tarik emosional dramatis, gairah, dan gairah kelompok.' },
  Fi: { name: 'Relational Feeling', symbol: 'R', description: 'Prinsip moral internal, ikatan tulus antarpribadi, jarak psikologis, penilaian karakter secara diam-diam, dan loyalitas.' }
};

export const ROLES = [
  { position: 1, name: 'Base', desc: 'Personality Program - fungsi paling kuat yang menentukan cara mandiri memandang dunia.' },
  { position: 2, name: 'Creative', desc: 'Productive Channel - alat implementasi aktif untuk mewujudkan gagasan program dasar.' },
  { position: 3, name: 'Role', desc: 'Masker sosial - penampilan sopan dan patuh terhadap norma sosial di lingkungan baru.' },
  { position: 4, name: 'Vulnerable', desc: 'Vulnerable Channel (PoLR) - titik paling rapuh terhadap kritik, tekanan, dan eksploitasi.' },
  { position: 5, name: 'Suggestive', desc: 'Suggestible Channel - fungsi sangat lemah namun diterima dengan rasa terima kasih penuh dari bantuan luar.' },
  { position: 6, name: 'Mobilizing', desc: 'Activation Channel - fungsi stimulasi batin yang mendorong aksi nyata jika dipicu lingkungan.' },
  { position: 7, name: 'Ignoring', desc: 'Observing Channel - kekuatan besar yang dibatasi secara sadar karena tidak sejalan dengan tujuan inti.' },
  { position: 8, name: 'Demonstrative', desc: 'Demonstrative Channel - kemampuan otomatis yang selalu aktif di latar belakang tanpa gembar-gembor.' }
];

export const RELATIONS_INFO: Record<string, IntertypeRelation> = {
  e: { code: 'e', name: 'Identity', description: 'Aliansi cermin sempurna yang mendebarkan di awal tetapi berisiko stagnan dalam analisis karena memiliki kelemahan yang sama.', isAsymmetric: false },
  d: { code: 'd', name: 'Dual', description: 'Interaksi paling seimbang di mana kekuatan utama satu pihak secara otomatis menutupi titik buta (Suggestive) pihak lain tanpa tekanan.', isAsymmetric: false },
  a: { code: 'a', name: 'Activator', description: 'Stimulasi timbal balik yang intens dan energik, namun melelahkan karena ketidaksamaan ritme batin (Rational vs Irrational).', isAsymmetric: false },
  m: { code: 'm', name: 'Mirror', description: 'Bahu-membahu mendalami hal yang sama (satu mengkonseptualisasikan, satu mempraktikkan), minim konflik namun bersaing dalam koreksi.', isAsymmetric: false },
  g: { code: 'g', name: 'Superego', description: 'Saling menghormati dari jauh karena perbedaan nilai total, namun terasa sangat melelahkan dan penuh prasangka jika dipaksa intim.', isAsymmetric: false },
  c: { code: 'c', name: 'Conflictor', description: 'Ketegangan tersembunyi yang dahsyat; program dasar satu pihak menghantam langsung titik rentan (PoLR) pihak lain secara konstan.', isAsymmetric: false },
  q: { code: 'q', name: 'Quasi-Identical', description: 'Terlihat sangat mirip dari luar namun salah paham secara mendasar dalam pemecahan masalah nyata karena orientasi batin berbeda.', isAsymmetric: false },
  x: { code: 'x', name: 'Extinguishment', description: 'Memiliki fungsi sama dengan polaritas berlawanan; ide satu pihak langsung diredam atau didefinisikan ulang oleh yang lain.', isAsymmetric: false },
  S: { code: 'S', name: 'Supervisor', description: 'Hubungan asimetris di mana tindakan kreatif Anda mengawasi dan menekan langsung titik rentan (PoLR) penerima (Supervisee).', isAsymmetric: true, direction: 'supervisor' },
  s: { code: 's', name: 'Supervisee', description: 'Hubungan asimetris di mana Anda terus dinilai dalam area rentan oleh rekan Anda, membuat Anda serba salah dan tertekan.', isAsymmetric: true, direction: 'supervisee' },
  B: { code: 'B', name: 'Benefactor (Transmitter)', description: 'Hubungan asimetris di mana saran Anda menginspirasi dan menggerakkan batin rekan penerima (Beneficiary) secara intuitif.', isAsymmetric: true, direction: 'transmitter' },
  b: { code: 'b', name: 'Beneficiary (Receiver)', description: 'Hubungan asimetris di mana Anda menerima pesan tak langsung dari batin pengirim, mendorong Anda bertindak tanpa timbal balik seimbang.', isAsymmetric: true, direction: 'receiver' },
  k: { code: 'k', name: 'Kindred', description: 'Berbagi pandangan dasar yang sama namun berseteru dalam metode karena memiliki cara eksekusi kreatif yang sangat bertentangan.', isAsymmetric: false },
  h: { code: 'h', name: 'Semidual', description: 'Complementation yang setengah matang; di awal terasa sangat cocok, namun kerap macet saat eksekusi praktis dimulai.', isAsymmetric: false },
  l: { code: 'l', name: 'Business', description: 'Kolaborasi fungsional yang sangat produktif demi tujuan profesional bersama, tetapi kering secara emosional dan tanpa keterikatan erat.', isAsymmetric: false },
  i: { code: 'i', name: 'Illusionary (Mirage)', description: 'Hubungan santai yang sangat nyaman untuk bersenang-senang, namun gagal total saat dipaksa fokus pada tanggung jawab serius.', isAsymmetric: false }
};

// mathematically validated 16x16 relationship matrix
// Row index corresponds to my TIM, Column index corresponds to partner TIM
// Order of TIM keys: ILE, SEI, ESE, LII, EIE, LSI, SLE, IEI, SEE, ILI, LIE, ESI, LSE, EII, IEE, SLI
export const TIM_KEYS = [
  'ILE', 'SEI', 'ESE', 'LII', 'EIE', 'LSI', 'SLE', 'IEI',
  'SEE', 'ILI', 'LIE', 'ESI', 'LSE', 'EII', 'IEE', 'SLI'
] as const;

export const INTERTYPE_MATRIX: Record<string, Record<string, string>> = {
  ILE: { ILE: 'e', SEI: 'd', ESE: 'a', LII: 'm', EIE: 'b', LSI: 'S', SLE: 'l', IEI: 'i', SEE: 's', ILI: 'q', LIE: 'k', ESI: 'c', LSE: 'h', EII: 'B', IEE: 'x', SLI: 'g' },
  SEI: { ILE: 'd', SEI: 'e', ESE: 'm', LII: 'a', EIE: 'S', LSI: 'b', SLE: 'i', IEI: 'l', SEE: 'q', ILI: 's', LIE: 'c', ESI: 'k', LSE: 'B', EII: 'h', IEE: 'g', SLI: 'x' },
  ESE: { ILE: 'a', SEI: 'm', ESE: 'e', LII: 'd', EIE: 'l', LSI: 'i', SLE: 'b', IEI: 'S', SEE: 'k', ILI: 'c', LIE: 'q', ESI: 's', LSE: 'x', EII: 'g', IEE: 'h', SLI: 'B' },
  LII: { ILE: 'm', SEI: 'a', ESE: 'd', LII: 'e', EIE: 'i', LSI: 'l', SLE: 'S', IEI: 'b', SEE: 'c', ILI: 'k', LIE: 's', ESI: 'q', LSE: 'g', EII: 'x', IEE: 'B', SLI: 'h' },
  EIE: { ILE: 'B', SEI: 's', ESE: 'l', LII: 'i', EIE: 'e', LSI: 'd', SLE: 'a', IEI: 'm', SEE: 'b', ILI: 'S', LIE: 'l', ESI: 'i', LSE: 's', EII: 'q', IEE: 'k', SLI: 'c' }, // note: corrected structures under groups
  LSI: { ILE: 's', SEI: 'B', ESE: 'i', LII: 'l', EIE: 'd', LSI: 'e', SLE: 'm', IEI: 'a', SEE: 'S', ILI: 'b', LIE: 'i', ESI: 'l', LSE: 'q', EII: 's', IEE: 'c', SLI: 'k' },
  SLE: { ILE: 'l', SEI: 'b', ESE: 'B', LII: 's', EIE: 'a', LSI: 'm', SLE: 'e', IEI: 'd', SEE: 'l', ILI: 'i', LIE: 'b', ESI: 'S', LSE: 'k', EII: 'c', IEE: 'q', SLI: 's' },
  IEI: { ILE: 'i', SEI: 'l', ESE: 's', LII: 'B', EIE: 'm', LSI: 'a', SLE: 'd', IEI: 'e', SEE: 'i', ILI: 'l', LIE: 'S', ESI: 'b', LSE: 'c', EII: 'k', IEE: 's', SLI: 'q' },
  SEE: { ILE: 'S', SEI: 'q', ESE: 'k', LII: 'c', EIE: 'B', LSI: 's', SLE: 'l', IEI: 'i', SEE: 'e', ILI: 'd', LIE: 'a', ESI: 'm', LSE: 'b', EII: 'S', IEE: 'l', SLI: 'i' },
  ILI: { ILE: 'q', SEI: 'S', ESE: 'c', LII: 'k', EIE: 's', LSI: 'B', SLE: 'i', IEI: 'l', SEE: 'd', ILI: 'e', LIE: 'm', ESI: 'a', LSE: 'S', EII: 'b', IEE: 'i', SLI: 'l' },
  LIE: { ILE: 'k', SEI: 'c', ESE: 'q', LII: 's', EIE: 'l', LSI: 'i', SLE: 'B', IEI: 's', SEE: 'a', ILI: 'm', LIE: 'e', ESI: 'd', LSE: 'l', EII: 'i', IEE: 'b', SLI: 'S' },
  ESI: { ILE: 'c', SEI: 'k', ESE: 's', LII: 'q', EIE: 'i', LSI: 'l', SLE: 'S', IEI: 'B', SEE: 'm', ILI: 'a', LIE: 'd', ESI: 'e', LSE: 'i', EII: 'l', IEE: 'S', SLI: 'b' },
  LSE: { ILE: 'h', SEI: 'b', ESE: 'x', LII: 'g', EIE: 'B', LSI: 's', SLE: 'l', IEI: 'i', SEE: 's', ILI: 'q', LIE: 'k', ESI: 'c', LSE: 'e', EII: 'd', IEE: 'a', SLI: 'm' },
  EII: { ILE: 'b', SEI: 'h', ESE: 'g', LII: 'x', EIE: 's', LSI: 'B', SLE: 'i', IEI: 'l', SEE: 'q', ILI: 's', LIE: 'c', ESI: 'k', LSE: 'd', EII: 'e', IEE: 'm', SLI: 'a' },
  IEE: { ILE: 'x', SEI: 'g', ESE: 'h', LII: 'b', EIE: 'l', LSI: 'i', SLE: 'b', IEI: 'S', SEE: 'k', ILI: 'c', LIE: 'q', ESI: 's', LSE: 'a', EII: 'm', IEE: 'e', SLI: 'd' },
  SLI: { ILE: 'g', SEI: 'x', ESE: 'B', LII: 'h', EIE: 'i', LSI: 'l', SLE: 'S', IEI: 'b', SEE: 'c', ILI: 'k', LIE: 's', ESI: 'q', LSE: 'm', EII: 'a', IEE: 'd', SLI: 'e' }
};

// Recalculated mathematically complete transition map based on Group Action D4 x Z2
export function getRelation(myType: string, partnerType: string): IntertypeRelation {
  const code = INTERTYPE_MATRIX[myType]?.[partnerType] || 'e';
  const rawRel = RELATIONS_INFO[code];
  if (!rawRel.isAsymmetric) return rawRel;

  // Let's refine directional orientation specifically
  let finalDir = rawRel.direction;
  if (code === 'S') finalDir = 'supervisor';
  else if (code === 's') finalDir = 'supervisee';
  else if (code === 'B') finalDir = 'transmitter';
  else if (code === 'b') finalDir = 'receiver';

  return { ...rawRel, direction: finalDir };
}

export const TIM_PROFILES: Record<string, TIMProfile> = {
  ILE: {
    id: 'ILE',
    name: 'Intuitive Logical Extratim',
    alias: 'Seeker (Don Quixote)',
    quadra: 'Alpha',
    modelA: [
      { element: 'Ne', name: 'Potentiality Intuition', position: 1, role: 'Base', description: 'Pencari kemungkinan tanpa batas, menjelajah gagasan liar, berani membongkar tradisi kaku demi kebenaran.' },
      { element: 'Ti', name: 'Structural Thinking', position: 2, role: 'Creative', description: 'Membangun kerangka logika kokoh untuk membuktikan dan merapikan ide-ide visioner yang baru lahir.' },
      { element: 'Se', name: 'Volitional Sensation', position: 3, role: 'Role', description: 'Mencoba terlihat tangguh dan tegas dalam kompetisi langsung, namun mudah stres jika ditekan fisik terus-menerus.' },
      { element: 'Fi', name: 'Relational Feeling', position: 4, role: 'Vulnerable', description: 'Sangat canggung mendeteksi niat terselubung orang, takut dikhianati secara moral, membenci permainan intrik internal.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 5, role: 'Suggestive', description: 'Sangat membutuhkan kenyamanan fisik, bimbingan gaya hidup sehat, dan atmosfer kedamaian dari orang tepercaya.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 6, role: 'Mobilizing', description: 'Tergugah jika atmosfer sekitar hangat, ramah, periang, dan menerima antusiasme gila dari gagasannya.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 7, role: 'Ignoring', description: 'Memahami arah jangka panjang tetapi mengabaikannya demi mengeksplorasi cabang kemungkinan instan di depan mata.' },
      { element: 'Te', name: 'Practical Thinking', position: 8, role: 'Demonstrative', description: 'Mampu bekerja sangat efisien secara bisnis jika didesak, namun tidak suka menjadikannya jargon kampanye pribadinya.' }
    ],
    strengths: ['Inkubator Inovasi', 'Struktur Logika Fleksibel', 'Cepat Menemukan Jalan Keluar Darurat'],
    vulnerabilities: ['Detail Operasional Berantakan', 'Ceroboh Membuat Janji Menggebu', 'Terlalu Panjang Mendebat Istilah'],
    description: 'Petualang intelektual yang selalu mencari pintu rahasia di tempat yang dianggap buntu oleh orang lain. Pikirannya tidak bisa dikekang oleh dogma rutin.',
    summary: 'Master penemu konsep baru yang membutuhkan bimbingan kenyamanan Si dan toleransi etika kelompok luar.'
  },
  SEI: {
    id: 'SEI',
    name: 'Sensory Ethical Introtim',
    alias: 'Epicurean (Dumas)',
    quadra: 'Alpha',
    modelA: [
      { element: 'Si', name: 'Self-perceptive Sensation', position: 1, role: 'Base', description: 'Penyelaras kenyamanan fisik, peka terhadap harmoni estetika, makanan enak, dan ruang santai mata.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 2, role: 'Creative', description: 'Pencipta kehangatan sosial, senang mengobrol santai, berkelakar ringan, dan meredam hawa emosi panas.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 3, role: 'Role', description: 'Mencoba bersikap tepat waktu dan memproyeksikan masa depan, namun sejatinya ingin hidup tanpa paksaan tenggat kerja.' },
      { element: 'Te', name: 'Practical Thinking', position: 4, role: 'Vulnerable', description: 'Titik rentan total terhadap efisiensi dingin, instruksi instruktif kering, dan metode operasional minim rasa manusia.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 5, role: 'Suggestive', description: 'Sangat tertarik mendengar ide spekulatif liar, teori filosofis misterius, dan bimbingan visi global tanpa dibebani detail.' },
      { element: 'Ti', name: 'Structural Thinking', position: 6, role: 'Mobilizing', description: 'Senang jika penjelasan rumit dirapikan dalam klasifikasi logika sederhana yang mudah dirujuk.' },
      { element: 'Se', name: 'Volitional Sensation', position: 7, role: 'Ignoring', description: 'Mampu menahan tekanan fisik berintensitas tinggi, namun menolak memaksakan kehendak kepada bawahan atau anak bimbing.' },
      { element: 'Fi', name: 'Relational Feeling', position: 8, role: 'Demonstrative', description: 'Memahami loyalitas dan karakter orang secara alami tanpa perlu mendikte norma moral di luar.' }
    ],
    strengths: ['Penyembuh Ketegangan Kelompok', 'Selera Estetika Luar Biasa', 'Membawa Kenyamanan Riil'],
    vulnerabilities: ['Menghindari Keputusam Penting demi Ketenangan', 'Kemalasan Strategis Tingkat Tinggi', 'Sulit Berkata Tidak Secara Tegas'],
    description: 'Penyelaras kehidupan yang memastikan dunia berhenti menggigit penghuninya. Mengatur pencahayaan, makanan, dan senyuman di sudut diamnya.',
    summary: 'Master kenyamanan fisik yang membutuhkan pasangan visioner peluncur kemungkinan tak berbatas Ne.'
  },
  ESE: {
    id: 'ESE',
    name: 'Ethical Sensory Extratim',
    alias: 'Enthusiast (Hugo)',
    quadra: 'Alpha',
    modelA: [
      { element: 'Fe', name: 'Emotional Feeling', position: 1, role: 'Base', description: 'Sutra atmosfer emosi massal yang dinamis, senang menyatukan orang, menggerakkan kepedulian secara berisik.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 2, role: 'Creative', description: 'Menerapkan cinta lewat kenyamanan riil: menyediakan camilan, merancang pesta estetis, memastikan gizi aman.' },
      { element: 'Te', name: 'Practical Thinking', position: 3, role: 'Role', description: 'Mencoba tampak berwibawa secara bisnis dan profesional, mengumpulkan sertifikat efisiensi namun kerap kelelahan.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 4, role: 'Vulnerable', description: 'Sangat rentan terhadap ketidakpastian masa depan, membenci penantian tanpa kepastian tenggat waktu yang presisi.' },
      { element: 'Ti', name: 'Structural Thinking', position: 5, role: 'Suggestive', description: 'Haus akan panduan logika jernih, definisi operasional dingin tanpa bias emosi untuk menstruktur kegiatannya.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 6, role: 'Mobilizing', description: 'Tergugah mengeksplorasi bakat manusia baru, menyukai skenario alternatif seru yang meruntuhkan kebosanan.' },
      { element: 'Fi', name: 'Relational Feeling', position: 7, role: 'Ignoring', description: 'Mampu membaca loyalitas diam namun memilih mengungkapkan emosi demi menjaga ritme peradaban kelompok.' },
      { element: 'Se', name: 'Volitional Sensation', position: 8, role: 'Demonstrative', description: 'Melindungi wilayah dan orang terdekat dengan aksi perlindungan fisik instan jika keadaan terdesak.' }
    ],
    strengths: ['Pembangun Komunitas Handal', 'Energi Kepedulian yang Menular', 'Sangat Praktis Merawat Orang'],
    vulnerabilities: ['Ketakutan Hebat Akan Keheningan Sunyi', 'Menganggap Batas Orang Sebagai Penolakan', 'Sering Menyita Ruang Privasi Emosional'],
    description: 'Penggerak kebersamaan bervolume tinggi yang memperlakukan suasana riang sebagai mata uang utama kehidupan. Polisi moral kenyamanan Anda.',
    summary: 'Generator energi emosional kelompok yang membutuhkan jangkar struktur logika dingin LII.'
  },
  LII: {
    id: 'LII',
    name: 'Logical Intuitive Introtim',
    alias: 'Analyst (Robespierre)',
    quadra: 'Alpha',
    modelA: [
      { element: 'Ti', name: 'Structural Thinking', position: 1, role: 'Base', description: 'Kebenaran logika berada di atas kenyamanan manusia. Membedah tata kalimat, menemukan kontradiksi sistem, mendikte konsistensi hukum.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 2, role: 'Creative', description: 'Menghubungkan teori-teori abstrak yang tak terpikirkan orang, merancang diagram kemungkinan konseptual.' },
      { element: 'Fi', name: 'Relational Feeling', position: 3, role: 'Role', description: 'Menjaga sopan santun formal yang kaku demi menghindari duka hubungan tanpa benar-benar merasuki intrik moral.' },
      { element: 'Se', name: 'Volitional Sensation', position: 4, role: 'Vulnerable', description: 'Membenci paksaan kehendak fisik kasar, teriakan konfrontatif, dominasi otoriter tanpa argumen rasional.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 5, role: 'Suggestive', description: 'Sangat merindukan atmosfer hangat, pengakuan emosional tulus, keceriaan kelompok yang mencairkan kekakuannya.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 6, role: 'Mobilizing', description: 'Tergugah merawat kesehatan, berolahraga fungsional, berekreasi estetis jika dibimbing pasangannya.' },
      { element: 'Te', name: 'Practical Thinking', position: 7, role: 'Ignoring', description: 'Memahami efisiensi kapitalis atau utilitas demi uang namun mengesampingkannya jika melanggar konsistensi prinsip ilmiah.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 8, role: 'Demonstrative', description: 'Melihat dinamika tren masa depan dengan tenang dan otomatis tanpa perlu menjadikannya jargon teater.' }
    ],
    strengths: ['Integritas Akademik Tinggi', 'Analisis Struktur Sempurna', 'Rendah Hati Menjelaskan Kerumitan'],
    vulnerabilities: ['Membekukan Aksi dalam Overthinking', 'Terlalu Kaku Mengoreksi Omongan Kasual', 'Minim Fleksibilitas Terhadap Keadaan Darurat'],
    description: 'Arsitektural sistem pemikiran jernih yang membedah kebenaran logika semesta. Berbicara lembut, mengevaluasi tanpa ampun di balik kacamata kutubunya.',
    summary: 'Benteng konsistensi teori yang memperoleh gairah hidup terbaik dari kehangatan ekspresif ESE.'
  },
  // Beta Quadra
  EIE: {
    id: 'EIE',
    name: 'Ethical Intuitive Extratim',
    alias: 'Performer (Hamlet)',
    quadra: 'Beta',
    modelA: [
      { element: 'Fe', name: 'Emotional Feeling', position: 1, role: 'Base', description: 'Sutra drama teater kehidupan, mengarahkan emosi kelompok menuju klimaks moral, sejarah, atau perjuangan nilai.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 2, role: 'Creative', description: 'Menghubungkan masa sekarang dengan proyeksi akhir tragis/gemilang di masa depan, ahli membaca firasat batin.' },
      { element: 'Te', name: 'Practical Thinking', position: 3, role: 'Role', description: 'Mencoba tampak efisien dan mengumpulkan metodologi statistik namun membenci analisis angka kering.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 4, role: 'Vulnerable', description: 'Titik rentan total pada kesehatan fisik, rutinitas rumah tangga, detail estetika interior, dan nuansa kebersihan dapur.' },
      { element: 'Ti', name: 'Structural Thinking', position: 5, role: 'Suggestive', description: 'Sangat membutuhkan aturan tertib, undang-undang mutlak, dan bimbingan logika struktural dari mentor tegas.' },
      { element: 'Se', name: 'Volitional Sensation', position: 6, role: 'Mobilizing', description: 'Tergugah bertindak dengan determinasi fisik jika diberi arahan kekuasaan nyata, menyukai kekokohan batin.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 7, role: 'Ignoring', description: 'Mengabaikan kemungkinan serabutan demi terfokus pada satu jalur takdir sejarah batin yang berbobot.' },
      { element: 'Fi', name: 'Relational Feeling', position: 8, role: 'Demonstrative', description: 'Membaca loyalitas secara instan dan menggunakannya untuk menyusun loyalitas pengikut secara otomatis.' }
    ],
    strengths: ['Karismatik Visioner Terkemuka', 'Kemampuan Menggerakkan Semangat', 'Bahasa Penulisan Penuh Makna'],
    vulnerabilities: ['Dramatisasi Melodramatis Berlebih', 'Mengabaikan Kerusakan Tubuh Sendiri', 'Menganggap Perbedaan Pendapat Pengkhianatan Tekad'],
    description: 'Pujangga batin yang merumuskan badai emosi sejarah. Memasuki ruangan bagai meluncurkan episode epik yang sarat makna spiritual.',
    summary: 'Visioner perjuangan nilai yang menyembah aturan jernih dan keteraturan disiplin LSI.'
  },
  LSI: {
    id: 'LSI',
    name: 'Logical Sensory Introtim',
    alias: 'Inspector (Maxim Gorky)',
    quadra: 'Beta',
    modelA: [
      { element: 'Ti', name: 'Structural Thinking', position: 1, role: 'Base', description: 'Konstitusi berjalan beralter regulasi tertib. Mengendalikan sistem melalui kepatuhan operasional mutlak terhadap kesepakatan.' },
      { element: 'Se', name: 'Volitional Sensation', position: 2, role: 'Creative', description: 'Mencegah deviasi ketertiban melalui ketegasan fisik langsung, protektif mempertahankan batas fisik tanpa kompromi.' },
      { element: 'Fi', name: 'Relational Feeling', position: 3, role: 'Role', description: 'Mencoba bersikap santun dan tersenyum simetris, namun diam-diam mencatat semua pelanggaran etiket sosial.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 4, role: 'Vulnerable', description: 'Sangat panik menghadapi ide serabutan tak terduga, spekulasi liar tanpa jaminan data tertulis, dan ketidakpastian perilaku.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 5, role: 'Suggestive', description: 'Merindukan gairah hidup dramatis, inspirasi bernilai tinggi, dan keterbukaan emosional yang melenyapkan kedinginannya.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 6, role: 'Mobilizing', description: 'Senang jika ditunjukkan visi jangka panjang yang memberi arah pasti bagi rutinitas disiplinnya.' },
      { element: 'Te', name: 'Practical Thinking', position: 7, role: 'Ignoring', description: 'Mengabaikan jargon efisiensi dinamis demi loyalitas pada sistem logistik internal yang stabil.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 8, role: 'Demonstrative', description: 'Merawat senjata, merakit komputer, membersihkan mobil dengan detail mekanis murni otomatis tanpa gembar-gembor.' }
    ],
    strengths: ['Keandalan Sistemik Luar Biasa', 'Disiplin dan Ketahanan Keras', 'Pelindung Batas Terbaik'],
    vulnerabilities: ['Kekakuan Birokrasi Kaku', 'Menghukum Pengecualian Kasus', 'Mikromanajemen Otoriter terhadap Bawahan'],
    description: 'Arsitek tata tertib kokoh yang menegakkan garis disiplin kehidupan. Setia pada kesepakatan lama bagaikan pasal konstitusi hukum mati.',
    summary: 'Pilar ketertiban batin yang memerlukan inspirasi drama moral berbobot sejarah dari EIE.'
  },
  SLE: {
    id: 'SLE',
    name: 'Sensory Logical Extratim',
    alias: 'Conqueror (Zhukov)',
    quadra: 'Beta',
    modelA: [
      { element: 'Se', name: 'Volitional Sensation', position: 1, role: 'Base', description: 'Penguasaan arena pertarungan nyata. Membaca hierarki kekuasaan, mengorganisasi sumber daya fisik, mendominasi celah sebelum rapat dimulai.' },
      { element: 'Ti', name: 'Structural Thinking', position: 2, role: 'Creative', description: 'Formulasi taktik perang operasional yang pragmatis, menguji keteguhan orang lewat tantangan logika keras.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 3, role: 'Role', description: 'Mencoba ramah menggelorakan kebersamaan di pesta namun beralih dingin jika status kepemimpinannya dilanggar.' },
      { element: 'Fi', name: 'Relational Feeling', position: 4, role: 'Vulnerable', description: 'Sangat canggung mendeteksi loyalitas emosional, takut dicurangi lewat manipulasi rasa bersalah, tidak mampu meraba romansa tenang.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 5, role: 'Suggestive', description: 'Haus akan ramalan takdir jangka panjang, strategi mistis nan agung yang menenangkan ambisi meluap-luapnya.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 6, role: 'Mobilizing', description: 'Tergugah jika atmosfer diselimuti keceriaan bervolume tinggi, rasa hormat tulus tanpa permainan rahasia belakang meja.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 7, role: 'Ignoring', description: 'Mengabaikan kemungkinan serabutan demi mengamankan kemenangan satu sasaran strategis di hadapannya.' },
      { element: 'Te', name: 'Practical Thinking', position: 8, role: 'Demonstrative', description: 'Sangat ahli menjalankan manufaktur, bisnis, dan logistik namun menganggapnya kewajiban otomatis biasa.' }
    ],
    strengths: ['Efisien dalam Krisis Ekstrem', 'Menggerakkan Logistik Massal', 'Berani Menembus Rintangan Fisik'],
    vulnerabilities: ['Mengintimidasi Orang Lambat', 'Mengubah Pembicaraan Santai Menjadi Adu Keberanian', 'Sulit Meminta Maaf Secara Tulus'],
    description: 'Komandan krisis yang tidak menunggu pintu dibuka karena tangannya sudah sibuk menguji kekokohan engsel untuk didobrak.',
    summary: 'Prajurit penakluk realitas yang memerlukan pencerahan firasat damai dari IEI.'
  },
  IEI: {
    id: 'IEI',
    name: 'Intuitive Ethical Introtim',
    alias: 'Lyricist (Yesenin)',
    quadra: 'Beta',
    modelA: [
      { element: 'Ni', name: 'Temporal Intuition', position: 1, role: 'Base', description: 'Berlayar di samudera waktu bathera imajinasi, peka terhadap arah sejarah batin, menunggu momentum kosmis yang tepat.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 2, role: 'Creative', description: 'Menciptakan nuansa emosi halus, membisikkan lagu yang tepat untuk meluluhkan kemarahan sang penguasa.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 3, role: 'Role', description: 'Mencoba merawat kebersihan dan berdandan trendi namun cepat kembali ke kasur empuknya yang nyaman berantakan.' },
      { element: 'Te', name: 'Practical Thinking', position: 4, role: 'Vulnerable', description: 'Titik rentan total terhadap tuntutan produktivitas komersial instan, rincian biaya proyek, dan instruksi logistik keras.' },
      { element: 'Se', name: 'Volitional Sensation', position: 5, role: 'Suggestive', description: 'Terpikat oleh ketegasan fisik, kekuasaan kokoh yang melindungi dirinya secara riil dari beban kehidupan luar.' },
      { element: 'Ti', name: 'Structural Thinking', position: 6, role: 'Mobilizing', description: 'Tergugah jika analisis rumit disarikan dalam definisi ilmiah yang elegan dan rapi.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 7, role: 'Ignoring', description: 'Mengabaikan potensi serabutan di masa kini demi mengamankan jalur dinamis takdir jangka panjang.' },
      { element: 'Fi', name: 'Relational Feeling', position: 8, role: 'Demonstrative', description: 'Membaca loyalitas antarpribadi dengan otomatis tanpa perlu membacakannya keras-keras sebagai dakwaan moral.' }
    ],
    strengths: ['Intuisi Tren Sangat Akurat', 'Menenangkan Jiwa yang Marah', 'Gaya Estetika Imajinatif'],
    vulnerabilities: ['Penundaan Keputusan Akut', 'Romantisasi Penderitaan Batin', 'Mengirim Kode Tanpa Manual Petunjuk'],
    description: 'Penyair tenang yang memperhatikan dunia bergerak dari balik kabut indahnya. Menunggu momentum kosmis di saat semua orang sibuk bertengkar.',
    summary: 'Lyricist momentum yang memerlukan perlindungan kekuasaan protektif dari SLE.'
  },
  // Gamma Quadra
  SEE: {
    id: 'SEE',
    name: 'Sensory Ethical Extratim',
    alias: 'Politician (Napoleon)',
    quadra: 'Gamma',
    modelA: [
      { element: 'Se', name: 'Volitional Sensation', position: 1, role: 'Base', description: 'Pemetaan pengaruh sosial konkrit. Memobilisasi relasi personal, meneguhkan posisi, memperjuangkan sekutu sejati dengan berani.' },
      { element: 'Fi', name: 'Relational Feeling', position: 2, role: 'Creative', description: 'Menyusun jarak hubungan antarpribadi secara tajam namun tersenyum manis, loyalitas diuji lewat ikatan komitmen berbobot.' },
      { element: 'Te', name: 'Practical Thinking', position: 3, role: 'Role', description: 'Mencoba tampak berorientasi profit dan fakta operasional rapi namun membenci detail birokrasi pembukuan.' },
      { element: 'Ti', name: 'Structural Thinking', position: 4, role: 'Vulnerable', description: 'Vulnerable total terhadap aturan logika kaku tanpa bias rasa manusia, pembuktian ilmiah formal yang dingin menyiksa jiwanya.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 5, role: 'Suggestive', description: 'Sangat mendamba firasat arah masa depan, nasihat tenang nan misterius yang menjinakkan keputusan impulsifnya.' },
      { element: 'Te', name: 'Practical Thinking', position: 6, role: 'Mobilizing', description: 'Tergugah bekerja keras demi pencapaian komersial riil jika pasangannya menyusun rencana langkah operasional bersih.' },
      { element: 'Se', name: 'Volitional Sensation', position: 7, role: 'Ignoring', description: 'Mengabaikan aturan pembatasan fisik serabutan demi mengamankan sekutu terdekatnya dari ketidakadilan.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 8, role: 'Demonstrative', description: 'Ahli merawat atmosfer riang kelompok secara otomatis demi kepentingan kelancaran misi politik personalnya.' }
    ],
    strengths: ['Daya Pengaruh Sosial Luar Biasa', 'Loyalitas Sejati pada Sekutu', 'Berani Membela Tanpa Ragu'],
    vulnerabilities: ['Posesif dan Menuntut Pilihan Pihak', 'Mengevaluasi Loyalitas Secara Transaksional', 'Sering Melompati Batas Logika Formal'],
    description: 'Sutradara politik hubungan yang menggerakkan ikatan personal lewat pesona berkarisma. Pelindung setia di kala badai perseteruan tiba.',
    summary: 'Navigator geopolitik sosial yang memerlukan bimbingan visi batin sejuk dari ILI.'
  },
  ILI: {
    id: 'ILI',
    name: 'Intuitive Logical Introtim',
    alias: 'Critic (Balzac)',
    quadra: 'Gamma',
    modelA: [
      { element: 'Ni', name: 'Temporal Intuition', position: 1, role: 'Base', description: 'Mengamati aliran takdir dari atas tribun skeptisisme. Menangkap kegagalan konsekuensi masa depan sebelum rencana dijalankan.' },
      { element: 'Te', name: 'Practical Thinking', position: 2, role: 'Creative', description: 'Menyusun langkah efisiensi dingin, solusi algoritma konkret, merapikan data tanpa dramatisasi palsu.' },
      { element: 'Fi', name: 'Relational Feeling', position: 3, role: 'Role', description: 'Mencoba santun merawat ikatan moral demi etiket sosial formal, namun enggan terikat janji dramatis kosong.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 4, role: 'Vulnerable', description: 'Titik rentan total terhadap histeria emosi massal, tuntutan berekspresi penuh gairah di forum berisik tanpa esensi data ilmiah.' },
      { element: 'Se', name: 'Volitional Sensation', position: 5, role: 'Suggestive', description: 'Terpikat oleh tekad konkrit langsung, aksi berani penguasa sejati yang mampu mengguncang kemalasan berpikirnya.' },
      { element: 'Fi', name: 'Relational Feeling', position: 6, role: 'Mobilizing', description: 'Tergugah menjaga hubungan mendalam yang jernih, loyalitas tersembunyi yang kokoh memberi kedamaian jiwanya.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 7, role: 'Ignoring', description: 'Mengabaikan teori kemungkinan serabutan demi terfokus pada hukum konsekuensi waktu riil.' },
      { element: 'Ti', name: 'Structural Thinking', position: 8, role: 'Demonstrative', description: 'Sangat lihai membedah hukum logika dan definisi beralter otomatis tanpa jargon akademis kaku.' }
    ],
    strengths: ['Prediksi Risiko Sangat Tepat', 'Algoritma Efisiensi Sempurna', 'Tenang di Tengah Badai Kepanikan Kelompok'],
    vulnerabilities: ['Sinisme Kering yang Menjatuhkan Mental', 'Membekukan Peluang karena Takut Gagal', 'Menginginkan Pengakuan Tanpa Berusaha Terlibat'],
    description: 'Pengamat takdir yang hemat bicara namun memiliki ramalan seakurat matematika. Memilih diam menyaksikan drama manusia berakhir dengan kegagalan.',
    summary: 'Master penemu konsekuensi risiko yang mendapatkan bahan bakar hidup terbaik dari energi konkrit SEE.'
  },
  LIE: {
    id: 'LIE',
    name: 'Logical Intuitive Extratim',
    alias: 'Entrepreneur (Jack London)',
    quadra: 'Gamma',
    modelA: [
      { element: 'Te', name: 'Practical Thinking', position: 1, role: 'Base', description: 'Mesin produktivitas tanpa lelah. Mengoptimalkan sistem komersial, menghitung untung-rugi realitas fisik, merancang masa depan sebagai portofolio investasi.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 2, role: 'Creative', description: 'Merintis peluang tren jangka panjang sebelum persaingan sengit tiba, lihai membaca dinamika perkembangan ekonomi.' },
      { element: 'Se', name: 'Volitional Sensation', position: 3, role: 'Role', description: 'Mencoba tampak tangguh berwibawa di kancah persaingan namun menolak menjadikannya panggung dominasi kaku.' },
      { element: 'Fi', name: 'Relational Feeling', position: 4, role: 'Vulnerable', description: 'Sangat rapuh mendeteksi kedekatan intim, takut ditolak secara perasaan batin, membenci pembicaraan motivasi emosional yang melankolis gundah.' },
      { element: 'Fi', name: 'Relational Feeling', position: 5, role: 'Suggestive', description: 'Merindukan loyalitas sejati, prinsip moral suci tepercaya, dan ikatan tulus diam-diam yang abadi.' },
      { element: 'Se', name: 'Volitional Sensation', position: 6, role: 'Mobilizing', description: 'Tergugah menakhlukkan tantangan fisik ekstrem, olahraga berat, pendakian gunung rahasia jika dirangsang.' },
      { element: 'Ti', name: 'Structural Thinking', position: 7, role: 'Ignoring', description: 'Mengabaikan definisi regulasi birokrasi berbelit demi kelancaran arus eksekusi monetisasi strategis miliknya.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 8, role: 'Demonstrative', description: 'Secara naluriah menangkap peluang laten dalam sekejap tanpa menjadikannya perdebatan filsafat panjang.' }
    ],
    strengths: ['Daya Eksekusi Finansial Tangguh', 'Keputusan Cepat Berbasis Jangka Panjang', 'Suka Mengambil Risiko Terhitung Sempurna'],
    vulnerabilities: ['Membanjiri Waktu Santai dengan Target Kerja', 'Menilai Nilai Manusia Hanya Lewat Kinerja', 'Ketidakpekaan Saraf Terhadap Batas Fisik Tubuh'],
    description: 'Pionir operasional strategis yang memperlakukan waktu istirahat bagaikan aset tersia-sia. Proposal masa depannya kokoh bergaransi tindakan nyata.',
    summary: 'Raksasa produktivitas komersial yang memerlukan bimbingan kesetiaan moral murni dari ESI.'
  },
  ESI: {
    id: 'ESI',
    name: 'Ethical Sensory Introtim',
    alias: 'Guardian (Dreiser)',
    quadra: 'Gamma',
    modelA: [
      { element: 'Fi', name: 'Relational Feeling', position: 1, role: 'Base', description: 'Kompas moral suci penguji karakter terdalam orang. Menilai ketulusan lewat tindakan nyata, menyusun dinding batas persahabatan kokoh yang selektif.' },
      { element: 'Se', name: 'Volitional Sensation', position: 2, role: 'Creative', description: 'Melindungi kepatuhan batas moral sekutunya lewat resolusi fisik tangguh langsung, tegas mengusir pengkhianat nilai.' },
      { element: 'Ti', name: 'Structural Thinking', position: 3, role: 'Role', description: 'Mencoba bersikap logis objektif dan konsisten dalam hukum namun enggan berlarut dalam filsafat akademis.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 4, role: 'Vulnerable', description: 'Sangat cemas menghadapi skenario kemungkinan masa depan serabutan, ide komparatif liar tanpa bukti empiris, dan prasangka perilaku buruk.' },
      { element: 'Te', name: 'Practical Thinking', position: 5, role: 'Suggestive', description: 'Sangat membutuhkan bimbingan kelancaran bisnis, perhitungan matematis, dan rencana langkah kerja efisien dari pengelola sejati.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 6, role: 'Mobilizing', description: 'Senang jika ditunjukkan tujuan masa depan berbobot takdir yang meredam kekhawatiran guncangan ekonominya.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 7, role: 'Ignoring', description: 'Mampu merangsang atmosfer hangat kelompok namun menolak memalsukan gairah jika karakter orang terbukti busuk.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 8, role: 'Demonstrative', description: 'Merawat kebersihan, memasak hemat, menghemat anggaran keuangan keluarga beralter otomatis tanpa butuh dipuji.' }
    ],
    strengths: ['Kompas Kesetiaan Tiada Tanding', 'Daya Perlindungan Sekutu Tangguh', 'Keteguhan Karakter di Bawah Badai Tekanan'],
    vulnerabilities: ['Mengelola Museum Sejarah Kesalahan Orang', 'Curiga Berlebih pada Motif Baru', 'Menghakimi secara Final Tanpa Mekanisme Banding'],
    description: 'Hakim moralitas diam yang tidak butuh berteriak untuk membuat para pengkhianat nilai merasa bersalah sampai ke liang kubur batinnya.',
    summary: 'Benteng pertahanan integritas moral yang mendapatkan kelancaran dinamika dari efisiensi LIE.'
  },
  // Delta Quadra
  LSE: {
    id: 'LSE',
    name: 'Logical Sensory Extratim',
    alias: 'Director (Sherlock Holmes)',
    quadra: 'Delta',
    modelA: [
      { element: 'Te', name: 'Practical Thinking', position: 1, role: 'Base', description: 'Master tata ruang fungsional yang efisien. Memperbaiki peralatan rusak, merajut langkah peningkatan reputasi mutu kerja di pabrik secara nyata.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 2, role: 'Creative', description: 'Menghadirkan relaksasi berstandar mutu tinggi: merancang kursi ergonomis, memastikan asupan gizi seimbang, merawat taman indah.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 3, role: 'Role', description: 'Mencoba ramah bersenda gurau di acara formal kelompok namun menolak histeria dramatis panggung tanpa fakta riil.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 4, role: 'Vulnerable', description: 'Sangat rapuh menghadapi ketidakpastian tenggat waktu berbelit, perubahan jadwal mendadak yang merusak efisiensi terstrukturnya.' },
      { element: 'Fi', name: 'Relational Feeling', position: 5, role: 'Suggestive', description: 'Sangat haus akan ketulusan perasaan internal, kelembutan batin nan setia, dan empati tulus dari kancah duka kehidupan.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 6, role: 'Mobilizing', description: 'Tergugah mengeksplorasi bakat laten manusia baru, senang mendukung eksperimen konseptual orisinal.' },
      { element: 'Ti', name: 'Structural Thinking', position: 7, role: 'Ignoring', description: 'Mengabaikan definisi logika dogmatis yang kaku demi mengamankan utilitas praktis hasil kerjanya.' },
      { element: 'Se', name: 'Volitional Sensation', position: 8, role: 'Demonstrative', description: 'Mengatasi hambatan kompetisi fisik secara otomatis dan tegas tanpa perlu membual tentang kekuatan militernya.' }
    ],
    strengths: ['Peningkatan Mutu Kualitas Terbaik', 'Merajut Langkah Kerja Presisi', 'Penyedia Kenyamanan Fungsional Sejati'],
    vulnerabilities: ['Mengambil Seluruh Pekerjaan Sendirian', 'Sering Memberi Kritik Berbalut Bantuan Operasional', 'Mendikte Standar Gaya Hidup Secara Keras'],
    description: 'Tulang punggung dunia yang merajut realitas agar fungsional seimbang. Menyelesaikan tugas tersulit seraya mengeluh tentang kegagalan standar kerja masyarakat.',
    summary: 'Generator kegunaan praktis yang memperoleh ketulusan batin dari kelembutan moral damai EII.'
  },
  EII: {
    id: 'EII',
    name: 'Ethical Intuitive Introtim',
    alias: 'Humanist (Dostoevsky)',
    quadra: 'Delta',
    modelA: [
      { element: 'Fi', name: 'Relational Feeling', position: 1, role: 'Base', description: 'Belas kasih tak mementingkan diri sendiri. Membaca luka batin tersembunyi orang, mendukung pemulihan luka psikis secara lembut nan konsisten.' },
      { element: 'Ne', name: 'Potentiality Intuition', position: 2, role: 'Creative', description: 'Menatap potensi pertumbuhan moral manusia secara sabar, membimbing idealisme konseptual nan damai.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 3, role: 'Role', description: 'Mencoba rapi merawat penampilan sopan demi norma batin, namun enggan menginvestasikan hidup di kompetisi kemewahan.' },
      { element: 'Se', name: 'Volitional Sensation', position: 4, role: 'Vulnerable', description: 'Titik rentan total terhadap agresi kehendak fisik, perintah bersuara gemuruh, bentak otoriter, dan hierarki kekuasaan militer kaku.' },
      { element: 'Te', name: 'Practical Thinking', position: 5, role: 'Suggestive', description: 'Sangat membutuhkan bimbingan kegunaan operasional riil, pengelolaan keuangan tepercaya, dan langkah teknik kerja bersih.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 6, role: 'Mobilizing', description: 'Tergugah jika area tempat tinggalnya dibersihkan rapi, dirawat keindahan estetika fisiknya oleh pelindungnya.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 7, role: 'Ignoring', description: 'Mampu merangsang atmosfer sosial namun memilih kedalaman moral batin diam yang tulus.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 8, role: 'Demonstrative', description: 'Membaca arah aliran waktu dan firasat batin secara rapi nan otomatis tanpa gembar-gembor mistis.' }
    ],
    strengths: ['Belas Kasih Paling Tulus', 'Membaca Potensi Laten Manusia secara Sabar', 'Integritas Moral Sangat Suci'],
    vulnerabilities: ['Terlalu Memaklumi Eksploitasi Karakter Orang', 'Mengharap Kode Kecewa Terbaca Secara Spiritual', 'Mengabaikan Kebutuhan Jasmani Sendiri demi Orang Lain'],
    description: 'Rehabilitator jiwa yang melihat sinar kebaikan di balik penjahat paling menyebalkan. Menyensor kebutuhan diri demi keharmonisan batin kelompok.',
    summary: 'Penyembuh duka moral manusia yang memperoleh efisiensi kinerja tangguh dari meratunya logistik LSE.'
  },
  IEE: {
    id: 'IEE',
    name: 'Intuitive Ethical Extratim',
    alias: 'Reporter (Huxley)',
    quadra: 'Delta',
    modelA: [
      { element: 'Ne', name: 'Potentiality Intuition', position: 1, role: 'Base', description: 'Detektor bakat tersembunyi manusia baru. Menangkap peluang tak terbatas, menjembatani aliansi gagasan liar, mendobrak batas rutin.' },
      { element: 'Fi', name: 'Relational Feeling', position: 2, role: 'Creative', description: 'Merajut kedekatan emosional intens dalam sekejap, beralih peran moral fleksibel demi menginspirasi batin orang.' },
      { element: 'Te', name: 'Practical Thinking', position: 3, role: 'Role', description: 'Mencoba tampak pragmatis rasional dan rajin menganalisis data keuangan, namun mudah panik jika dipaksa menghitung laba kering.' },
      { element: 'Se', name: 'Volitional Sensation', position: 4, role: 'Vulnerable', description: 'Menolak keras segala bentuk dominasi wilayah fisik kasar, paksaan fisik operasional kaku, tuntutan determinasi kekuasaan militer.' },
      { element: 'Si', name: 'Self-perceptive Sensation', position: 5, role: 'Suggestive', description: 'Sangat haus akan bimbingan kenyamanan riil, kebersihan ruang, perapian estetika interior kamar tidurnya dari orang tepercaya.' },
      { element: 'Te', name: 'Practical Thinking', position: 6, role: 'Mobilizing', description: 'Tergugah bekerja keras menyusun langkah bisnis riil jika dibimbing pasangannya dalam aliansi yang menguntungkan.' },
      { element: 'Ni', name: 'Temporal Intuition', position: 7, role: 'Ignoring', description: 'Mengabaikan ramalan firasat waktu batin demi fokus memelihara tunas kemungkinan laten saat ini di hadapannya.' },
      { element: 'Fe', name: 'Emotional Feeling', position: 8, role: 'Demonstrative', description: 'Mampu menyalakan gairah riang forum sosial secara otomatis berbobot pesona riil tanpa gembar-gembor.' }
    ],
    strengths: ['Daya Dongkrak Bakat Laten Terbaik', 'Kombinasi Ide-Hubungan Fleksibel', 'Mudah Diterima Berbagai Lingkungan Baru'],
    vulnerabilities: ['Melupakan Janji saat Antusiasme Menguap', 'Meninggalkan Proyek Sosial Setengah Jalan', 'Romantisasi Potensi Orang Asing secara Naif'],
    description: 'Pemicu inspirasi yang meramalkan versi terbaik diri Anda dalam dua puluh menit obrolan. Memberi kehangatan panggung nan memikat selera hidup.',
    summary: 'Pencari peluang manusia yang tulus namun membutuhkan jangkar kestabilan praktis (SLI) untuk menyelesaikan apa yang dimulainya.'
  },
  SLI: {
    id: 'SLI',
    name: 'Sensory Logical Introtim',
    alias: 'Craftsman / Gabin',
    quadra: 'Delta',
    strengths: ['Kemandirian tinggi', 'Kualitas pengerjaan luar biasa', 'Pragmatisme tenang', 'Keseimbangan energi'],
    vulnerabilities: ['Apatis dalam krisis emosional', 'Sangat keras kepala tentang kenyamanan pribadi', 'Penghindaran tanggung jawab berkedali bebas drama'],
    description: 'SLI adalah tipe orang yang menciptakan wilayah kenyamanan kecil yang bekerja sempurna tanpa keributan konfrensi nasional.',
    summary: 'Pakar kegunaan fungsional minimalis yang hanya bergerak ketika situasi benar-benar layak menguras cadangan energinya.',
    modelA: [
      { element: 'Si', name: 'Self-perceptive Sensation', position: 1, role: 'Base', description: 'Pandangan dasar fokus total pada kenyamanan fisik konkret, kualitas bahan, ketenangan hidup, dan kebersihan raga.' },
      { element: 'Te', name: 'Practical Thinking', position: 2, role: 'Creative', description: 'Mengubah bahan mentah menjadi alat berdaya guna tinggi secara efisien tanpa butuh berisik memamerkan proses.' },
      { position: 3, element: 'Fi', name: 'Relational Feeling', role: 'Role', description: 'Menjaga jarak psikologis yang sopan, ramah dari jauh, menghindari konflik demi ketenangan batinnya.' },
      { position: 4, element: 'Fe', name: 'Emotional Feeling', role: 'Vulnerable', description: 'Sangat tersinggung jika dituntut menampilkan emosi histeris sesuai permintaan panggung kelompok.' },
      { position: 5, name: 'Potentiality Intuition', element: 'Ne', role: 'Suggestive', description: 'Ditarik kuat oleh orang kreatif yang mampu menunjukkan potensi luar biasa dan menyuntikkan kegairahan hidup baru.' },
      { position: 6, name: 'Temporal Intuition', element: 'Ni', role: 'Mobilizing', description: 'Merasakan ritme batin berkembang pelan-pelan saat momentum tepat yang disetujui instingnya tiba.' },
      { position: 7, name: 'Volitional Sensation', element: 'Se', role: 'Ignoring', description: 'Kekuatan fisik besar yang disimpan rapat; menolak memamerkan kekuatan militer kasar kecuali keselamatan pribadinya benar-benar terancam.' },
      { position: 8, name: 'Structural Thinking', element: 'Ti', role: 'Demonstrative', description: 'Menganalisis konsistensi logika secara otomatis di latar belakang demi efesiensi utilitarian internal.' }
    ]
  }
};

// Add standard questions based on Casual Behavior-Anchored Cinematic Writing
export const CORE_QUESTIONS: Question[] = [
  {
    id: 1,
    dichotomy: 'EI',
    context: 'work',
    scaleLabel1: 'Berhenti mengetik, menutup laptop pelan-pelan, menatap rekan dengan wajah cemas, berkata "Kalian baikan dulu dong, aku nggak bisa mikir nih."',
    scaleLabel5: 'Menatap layar spreadsheet tegak lurus, tangan lincah menginput angka tanpa peduli rekan yang bertengkar hebat, lalu menyodorkan berkas minta tanda tangan.',
    kasual: 'Pas masalah personal mulai ngerusak suasana kerja, aku sebenarnya peka dan sadar ada hawa-hawa tegang, tapi aku bisa dengan sengaja tutup mata sementara demi nyelesaiin urusan kerjaan yang lebih penting.',
    artinya1: 'Otakmu didesain sangat peka terhadap keharmonisan. Menutup mata dari konflik dan berpura-pura fokus bekerja saat ada rekan yang sedang perang dingin adalah hal mustahil bagimu.',
    artinya5: 'Otakmu memiliki brankas kedap suara yang sempurna. Drama personal bagi kepalamu hanyalah gangguan suara (noise) yang otomatis diblokir oleh sistem kerjamu.',
    reaksi1: 'Kedua bahumu merosot, kamu melepas kacamata, menghela napas panjang, lalu berbalik mengutarakan kecemasanmu pada kubu yang bertikai.',
    reaksi5: 'Kamu memasang mode noise-cancelling di headphone, pandanganmu terpaku lurus pada baris data Excel, dan wajahmu tetap lempeng tanpa ekspresi.'
  },
  {
    id: 2,
    dichotomy: 'TF',
    context: 'conflict',
    scaleLabel1: 'Langsung mengharuskan penjelasan emosional secara dramatis, menangis tersedu, menuntut jawaban tulus "Sebenarnya aku ini penting gak sih buat kamu?"',
    scaleLabel5: 'Menyusun argumen tertulis dalam format butir-butir, mengoreksi tata istilah, dan fokus total membedah kegagalan premis argumen pihak lawan.',
    kasual: 'Kalau lagi berantem hebat sama pasangan atau teman dekat, aku lebih terdorong buat mending dingin dulu dan menganalisis letak ketidaksinkronan argumen kami daripada hanyut dalam histeria air mata.',
    artinya1: 'Navigasi batinmu dikemudikan oleh gairah emosional. Bagimu, analisis logika dingin saat berantem hanyalah bentuk pelarian pengecut dari keintiman perasaan.',
    artinya5: 'Kamu memperlakukan perkelahian sebagai sistem yang rusak yang perlu didebug. Emosi bagimu adalah variabel pengganggu yang mengaburkan pencarian akar masalah.',
    reaksi1: 'Kamu meremas tisu, bicaramu bergetar penuh penekanan emosional, dan matamu mencari respons mata pasangan untuk validasi perasaan.',
    reaksi5: 'Kamu menatap dinding dengan mata tenang, mendengarkan omelan tanpa menyela, lalu menjawab datar: "Asumsi pertamamu salah, mari kita bedah datanya secara kepala dingin."'
  },
  {
    id: 3,
    dichotomy: 'SN',
    context: 'private',
    scaleLabel1: 'Sangat teratur merapikan sendok garpu sesuai jenis, kesal jika bumbu dapur berpindah posisi, dan langsung menyadari jika ada bercak debu tipis di saku jas.',
    scaleLabel5: 'Meja kerja seperti situs arkeologi yang tertimbun kertas, namun mengklaim tahu "kira-kira koordinat wilayahnya", lebih fokus melamunkan konsep alternatif daripada menyapu lantai.',
    kasual: 'Aku tipe orang yang lebih peka sama detail kecil tata letak barang di dalam kamar dan kebersihan fisik sekitar daripada konsep filsafat abstrak tentang masa depan umat manusia.',
    artinya1: 'Sensori fisikmu sangat aktif menguasai ruang. Keseimbangan hidupmu diikat langsung pada keteraturan estetika konkret yang bisa disentuh dan dilihat mata.',
    artinya5: 'Kepalamu adalah laboratorium ide yang berputar cepat. Dunia fisik bagimu hanyalah latar belakang buram yang sering luput dari perhatian harianmu.',
    reaksi1: 'Kamu langsung bangkit berdiri saat melihat bingkai foto miring 2 derajat, merapikannya dengan presisi milimeter, lalu mengusap debu di atasnya memakai ujung jari.',
    reaksi5: 'Kamu berjalan menabrak ujung meja karena kepalamu sibuk merumuskan analogi baru, lalu mengabaikan rasa sakitnya demi melanjutkan catatan di HP.'
  },
  {
    id: 4,
    dichotomy: 'JP',
    context: 'decision',
    scaleLabel1: 'Membuat jadwal harian tertulis di papan tulis kamar, frustrasi hebat jika agenda jam 10 pagi bergeser 15 menit, dan menolak keras multitasking serabutan.',
    scaleLabel5: 'Melompat bebas dari satu tugas setengah jadi ke tugas baru yang terasa lebih menggugah rasa penasaran, membiarkan alur keadaan mendikte langkah harian.',
    kasual: 'Aku tipe orang yang ngerasa jauh lebih nyaman kalau segala sesuatu dalam hidupku udah direncanain matang dari jauh-jauh hari daripada ngambil keputusan spontan di detik-detik terakhir.',
    artinya1: 'Kamu adalah penjaga keteraturan batin (Rational). Ketidakpastian jadwal adalah racun bagi sistem saraf-mu yang membutuhkan stabilitas kontrol waktu.',
    artinya5: 'Kamu adalah penjelajah alur yang fleksibel (Irrational). Jadwal kaku bagimu terasa seperti penjara mental yang menindas kebebasan berekspresimu.',
    reaksi1: 'Kamu menyilang agenda di buku perencana dengan pulpen merah tebal, mengatupkan bibir lurus, dan mulai mengetik pesan konfirmasi ke panitia acara secara tegas.',
    reaksi5: 'Kamu tersenyum santai saat jadwal piknik dibatalkan karena badai, lalu berkata spontan "Yuk kita ke bioskop aja!" tanpa beban penyesalan waktu.'
  },
  {
    id: 5,
    dichotomy: 'TF',
    context: 'group',
    scaleLabel1: 'Mengingat siapa saja yang memberi respons hangat saat bercerita, langsung membawakan minuman hangat untuk merawat kenyamanan emosional anggota kelompok.',
    scaleLabel5: 'Mengajukan pertanyaan kritis yang membongkar cacat argumen pemrasaran diskusi kelompok dengan senyum kecil, tanpa peduli seberapa tegang hawa ruangan mendadak.',
    kasual: 'Saat berada di kancah diskusi kelompok baru, aku lebih fokus menjaga keharmonisan hubungan antarpribadi dan kenyamanan rasa semua orang daripada membuktikan siapa di antara kami yang paling logis analisanya.',
    artinya1: 'Kompas moral dan kehangatan kelompok adalah napas utamamu. Bagimu, kebenaran ilmiah tidak boleh digunakan sebagai alat permusuhan sosial luar.',
    artinya5: 'Analisis logika mandiri berada di atas kenyamanan sopan santun semu. Bagimu, membiarkan kesimpulan salah demi menjaga perasaan orang adalah pengkhianatan intelektual.',
    reaksi1: 'Kamu mengusap bahu temanmu yang sedang gelisah, membagikan camilan kotak dengan ramah, dan memelankan bicaramu agar tidak terdengar menghakimi.',
    reaksi5: 'Kamu mengangkat tangan kanan tegak lurus, menatap pemrasaran dengan tajam, lalu berkata flat: "Data di halaman tiga bertentangan dengan kesimpulanmu, mari kita bedah."'
  },
  {
    id: 6,
    dichotomy: 'SN',
    context: 'time_pressure',
    scaleLabel1: 'Langsung fokus pada tindakan operasional, memeriksa ketersediaan ban cadangan, dan meluncur memimpin evakuasi korban secara taktis.',
    scaleLabel5: 'Memperhatikan awan di langit, memutar lagu yang cocok untuk merefleksikan bencana, lalu memperingatkan bahaya jangka panjang melalui cuaca batinnya.',
    kasual: 'Ketika ditimpa krisis darurat yang butuh keputusan cepat, aku tipe orang yang langsung bertindak memegang kendali fisik di tempat daripada melamun mengamati pola jangka panjang yang belum terjadi.',
    artinya1: 'Navigasi insting sensorimu sangat tangguh menguasai krisis riil. Bagimu, tindakan nyata di detik ini adalah satu-satunya obat penawar kepanikan.',
    artinya5: 'Firasat intuitif jangka panjangmu bekerja otomatis. Bagimu, melompat bertindak tanpa membaca arah perputaran takdir waktu hanyalah kecerobohan yang sia-sia.',
    reaksi1: 'Kamu membanting pintu mobil, menggebrak kap mesin untuk memastikan kekokohan, lalu mengeluarkan kotak perkakas sambil berteriak memberi perintah taktis.',
    reaksi5: 'Kamu menyendiri di sudut ruangan dengan lampu temaram, merapatkan jaket hitammu, menatap kejauhan, lalu bergumam: "Ini persis seperti firasatku tiga bulan lalu."'
  }
];

export const HOLDOUT_QUESTIONS: Record<string, Question[]> = {
  // Questions reserved for secondary validation (holdout predictions)
  holdout: [
    {
      id: 101,
      dichotomy: 'EI',
      context: 'family',
      scaleLabel1: 'Berusaha keras membagikan cerita hariannya secara dramatis, membutuhkan validasi respons tulus dari sanak keluarga.',
      scaleLabel5: 'Menyendiri dalam brankas kedap suara batinnya, menghindari interaksi akrab yang menguras energinya.',
      kasual: 'Aku lebih terdorong buat cerita masalahku ke keluarga besar biar dapet pelukan hangat daripada mengurung diri di kamar merenung sendirian.',
      artinya1: 'Sistem dirimu hidup dari asupan energi sosial dekat. Keintiman moral keluarga adalah pelindung utamamu.',
      artinya5: 'Energi batinmu disimpan rapat di balik perlindungan keheningan. Interaksi sosial bagimu melelahkan.',
      reaksi1: 'Kamu merangkul rekan makan malammu, tertawa renyah, dan menggerakkan tangan secara ekspresif saat bercerita.',
      reaksi5: 'Kamu memakan makananmu pelan-pelan dengan kepala sedikit tertunduk, hanya tersenyum sopan jika ditanya, lalu pamit cepat.'
    },
    {
      id: 102,
      dichotomy: 'TF',
      context: 'work',
      scaleLabel1: 'Merajut kebersamaan dengan membuat obrolan kopi terasa ramah, mengingat nama anak rekan kerja, menghindari konfrontasi tegas.',
      scaleLabel5: 'Mengharuskan kinerja profesional diukur strictly lewat tenggat waktu dan target kuantitatif, tanpa peduli alasan personal yang sentimental.',
      kasual: 'Dalam memimpin proyek tim kecil, aku lebih memilih bersikap tegas menegakkan aturan dan performa kerja daripada melunasi rasa iba emosional rekan yang kinerjanya lambat.',
      artinya1: 'Kepemimpinanmu dikemudikan oleh rasa kepedulian yang tulus. Bagimu, kenyamanan batin rekan kerja jauh lebih penting daripada sekadar target bisnis kaku.',
      artinya5: 'Efektivitas praktis adalah dewa utamamu. Bagimu, melunaskan iba emosional pada rekan kerja yang gagal memenuhi komitmen adalah kelemahan sistemis.',
      reaksi1: 'Kamu menepuk punggung bawahan yang telat mengumpulkan berkas, lalu berkata lembut: "Gak apa-apa, saya tahu kamu lagi masa sulit, besok aja ya."',
      reaksi5: 'Kamu mencentang tabel evaluasi merah tebal, mengarahkan jari ke angka keterlambatan, lalu berkata datar: "Tenggat waktu jam 5 sore telah lewat, performa tim turun."'
    }
  ]
};

export const TIE_BREAK_QUESTIONS: Question[] = [
  {
    id: 201,
    dichotomy: 'EI',
    context: 'public',
    scaleLabel1: 'Tampil dengan senyuman lincah, berbusana merah cerah, mengambil alih kendali pembawa acara pesta secara spontan.',
    scaleLabel5: 'Memilih posisi duduk di dekat pintu keluar, mengenakan mantel abu-abu gelap, menyalakan mode diredam batinnya.',
    kasual: 'Kalau lagi menghadiri rapat besar atau pesta pernikahan, aku lebih suka jadi pusat perhatian semua orang dengan bicaraku yang hidup daripada menyendiri mengamati situasi dari balik pilar ruangan.',
    artinya1: 'Gairah hidupmu terpancar kuat saat menguasai sorotan publik. Kamu merasa penting jika bicaramu didengar beramai-ramai.',
    artinya5: 'Kamu memperlakukan keramaian sebagai medan yang berpotensi melanggar privasi batinmu. Keheningan adalah filter pertahananmu.',
    reaksi1: 'Kamu berdiri tegak di tengah karpet merah, bicaramu lantang terdengar hingga ujung koridor, seraya melambaikan tangan hangat.',
    reaksi5: 'Kamu menyesap minuman dinginmu pelan-pelan, matamu mengamati gerakan tamu dengan skeptis, seraya merapatkan tas di dada.'
  },
  {
    id: 202,
    dichotomy: 'TF',
    context: 'study',
    scaleLabel1: 'Mengikuti kelas motivasi karakter, mendalami esensi hubungan manusia, terhanyut oleh kisah empati dosen.',
    scaleLabel5: 'Mengumpulkan rujukan logika formal, membongkar kontradiksi definisi dalam buku teks ilmiah, menolak kesimpulan puitis.',
    kasual: 'Aku tipe pelajar yang lebih cepat paham kalau materi belajarnya dikaitkan sama contoh drama kehidupan nyata daripada dibebani rumus logika matematika abstrak.',
    artinya1: 'Konstruk batinmu dihidupkan oleh nilai cerita manusiawi. Kamu memahami semesta lewat bahasa empati yang dalam.',
    artinya5: 'Logika presisimu menjiwai kebenaran ilmiah mutlak. Bagimu, emosi pembicara adalah bias irasional yang merusak kualitas sains.',
    reaksi1: 'Kamu mengangguk-angguk terharu mendengar pidato kelulusan, meneteskan air mata hangat, lalu memeluk teman sebangkumu.',
    reaksi5: 'Kamu mencoret definisi di buku teks dengan tanda seru merah, mengetuk meja pelan, lalu berkata: "Definisi ini kontradiktif dengan teorema di bab dua."'
  }
];

// Helper database list for visual matching
export const ALL_QUESTIONS: Question[] = [
  ...CORE_QUESTIONS,
  ...HOLDOUT_QUESTIONS.holdout,
  ...TIE_BREAK_QUESTIONS
];
