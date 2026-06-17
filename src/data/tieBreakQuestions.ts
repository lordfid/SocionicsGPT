/** Adaptive pairwise items. Rating 5 supports the first type in the pair; rating 1 supports the second. */
import type { SocionicsQuestion, TIM } from "../types/socionics";

export const canonicalPair = (a: TIM, b: TIM): string => [a, b].sort().join("_");

const makeTieBreak = (
  id: string,
  first: TIM,
  second: TIM,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => {
  const pair = canonicalPair(first, second);
  return {
    id,
    scenario,
    statement,
    responseFocus,
    scaleType: "comparison",
    element: "Ne",
    channel: "producer",
    context: "decision",
    direction: 1,
    reverseKeyed: false,
    designWeight: 1,
    ambiguityRisk: "medium",
    desirabilityRisk: "low",
    evidenceTags: ["tiebreak", pair],
    tieBreakTags: [pair],
    tieBreakSupport: { [first]: 1, [second]: -1 },
    isHoldout: false,
    isTieBreak: true,
    itemVersion: "2.0.0",
  };
};

export const TIE_BREAK_QUESTIONS: SocionicsQuestion[] = [
  makeTieBreak("tb_ile_iee_01", "ILE", "IEE", "Membantu kelompok yang kehilangan arah", "Saya lebih terdorong membongkar cara kerja gagasan dan menemukan struktur yang konsisten daripada memetakan siapa yang cocok, tulus, atau perlu didekati secara personal.", "struktur gagasan dibanding nuansa hubungan"),
  makeTieBreak("tb_ile_iee_02", "ILE", "IEE", "Menemukan kemungkinan baru", "Setelah ide muncul, saya lebih ingin menguji bagaimana bagian-bagiannya terhubung daripada membayangkan potensi orang yang dapat tumbuh melalui ide itu.", "konsistensi sistem dibanding potensi personal"),

  makeTieBreak("tb_sei_sli_01", "SEI", "SLI", "Membuat keadaan lebih baik", "Saya lebih cepat memperhatikan suasana emosional dan kenyamanan bersama daripada mencari metode kerja yang paling hemat tenaga dan sumber daya.", "kehangatan suasana dibanding efektivitas praktis"),
  makeTieBreak("tb_sei_sli_02", "SEI", "SLI", "Teman berkunjung ketika ada pekerjaan", "Saya lebih terdorong membuat interaksi terasa ringan dan menyenangkan daripada segera mengoptimalkan alat serta langkah kerja.", "suasana bersama dibanding optimasi cara kerja"),

  makeTieBreak("tb_ese_eie_01", "ESE", "EIE", "Menghidupkan sebuah acara", "Saya lebih berfokus pada kenyamanan nyata yang sedang dirasakan orang daripada membangun satu tema besar tentang arah acara dan dampaknya ke depan.", "kenyamanan saat ini dibanding tema jangka panjang"),
  makeTieBreak("tb_ese_eie_02", "ESE", "EIE", "Kelompok sedang kehilangan semangat", "Saya lebih spontan memperbaiki suasana lewat perhatian konkret daripada mengarahkan emosi mereka menuju visi atau makna tertentu.", "perawatan konkret dibanding pengarahan visi emosional"),

  makeTieBreak("tb_lii_lsi_01", "LII", "LSI", "Aturan tidak lagi cocok", "Saya lebih tertarik mencari kemungkinan kerangka baru daripada memperkuat batas dan menegakkan aturan yang sudah disepakati.", "membuka kerangka baru dibanding menegakkan batas"),
  makeTieBreak("tb_lii_lsi_02", "LII", "LSI", "Sistem menghadapi pengecualian", "Saya lebih nyaman memperluas definisi agar pengecualian dapat dijelaskan daripada memutuskan secara tegas mana yang tetap boleh dan tidak boleh.", "memperluas definisi dibanding menetapkan ketegasan"),

  makeTieBreak("tb_sle_see_01", "SLE", "SEE", "Memimpin konflik kelompok", "Saya lebih mengandalkan aturan peran dan struktur keputusan daripada membaca siapa yang setia, tersinggung, atau perlu dirangkul secara personal.", "struktur kendali dibanding nuansa hubungan"),
  makeTieBreak("tb_sle_see_02", "SLE", "SEE", "Membagi kekuasaan", "Saya lebih ingin membuat batas kewenangan yang konsisten daripada menyesuaikan dukungan berdasarkan kedekatan dan kepercayaan antarorang.", "konsistensi kewenangan dibanding aliansi personal"),

  makeTieBreak("tb_iei_ili_01", "IEI", "ILI", "Membaca arah keadaan", "Saya lebih mudah mengungkapkan tema itu melalui suasana dan emosi bersama daripada mengujinya lewat fakta efektivitas serta hasil yang dapat diamati.", "tema emosional dibanding verifikasi praktis"),
  makeTieBreak("tb_iei_ili_02", "IEI", "ILI", "Melihat perubahan yang akan datang", "Saya lebih tertarik pada bagaimana perubahan itu akan dirasakan orang daripada pada biaya, kegunaan, dan mekanisme pelaksanaannya.", "dampak emosional dibanding konsekuensi praktis"),

  makeTieBreak("tb_lie_lse_01", "LIE", "LSE", "Mengembangkan pekerjaan", "Saya lebih terdorong menata langkah menurut arah jangka panjang daripada memastikan ritme harian, kondisi fisik, dan kenyamanan proses tetap stabil.", "arah jangka panjang dibanding kestabilan keseharian"),
  makeTieBreak("tb_lie_lse_02", "LIE", "LSE", "Memilih metode yang efektif", "Saya lebih mudah menerima ketidaknyamanan sekarang jika metode itu membuka perkembangan besar di masa depan.", "pertumbuhan masa depan dibanding kenyamanan proses"),

  makeTieBreak("tb_esi_eii_01", "ESI", "EII", "Kepercayaan dilanggar", "Saya lebih terdorong memasang batas dan konsekuensi nyata daripada terus membuka kemungkinan alasan, perubahan, atau niat baik dari pelakunya.", "konsekuensi tegas dibanding kemungkinan perubahan"),
  makeTieBreak("tb_esi_eii_02", "ESI", "EII", "Melindungi orang dekat", "Saya lebih spontan menghentikan ancaman sekarang daripada mengeksplorasi jalan yang mungkin membuat semua pihak berkembang.", "perlindungan langsung dibanding eksplorasi potensi"),

  makeTieBreak("tb_ile_lii_01", "ILE", "LII", "Menemukan konsep baru", "Saya lebih bersemangat membuka cabang dan kemungkinan baru daripada menahan diri sampai seluruh definisi tersusun konsisten.", "ekspansi kemungkinan dibanding penyempurnaan kerangka"),
  makeTieBreak("tb_ile_lii_02", "ILE", "LII", "Diskusi teori berkembang", "Saya lebih cepat melompat ke hubungan baru yang menarik daripada merapikan satu sistem penjelasan hingga benar-benar tuntas.", "eksplorasi hubungan baru dibanding ketuntasan struktur"),

  makeTieBreak("tb_sei_ese_01", "SEI", "ESE", "Suasana bersama mulai tidak nyaman", "Saya lebih dahulu menyesuaikan ritme dan kenyamanan secara tenang daripada mengangkat energi kelompok dengan ekspresi yang lebih kuat.", "penyetelan kenyamanan dibanding aktivasi emosi"),
  makeTieBreak("tb_sei_ese_02", "SEI", "ESE", "Teman sedang lesu", "Saya lebih spontan menciptakan suasana santai yang menenangkan daripada mengajak mereka menunjukkan emosi dan kembali bersemangat.", "ketenangan indrawi dibanding ekspresi emosional"),

  makeTieBreak("tb_sle_lsi_01", "SLE", "LSI", "Masalah membutuhkan kendali", "Saya lebih cepat bertindak dan mengubah posisi nyata daripada memastikan setiap tindakan sudah sesuai kerangka aturan yang lengkap.", "aksi penguasaan dibanding ketepatan struktur"),
  makeTieBreak("tb_sle_lsi_02", "SLE", "LSI", "Ada pelanggaran di lapangan", "Saya lebih terdorong menghentikannya saat itu juga daripada menata prosedur dan klasifikasi pelanggaran terlebih dahulu.", "intervensi langsung dibanding prosedur sistematis"),

  makeTieBreak("tb_iei_eie_01", "IEI", "EIE", "Menangkap tema emosional", "Saya lebih sering membiarkan gambaran itu tumbuh diam-diam sebelum mengungkapkannya daripada langsung membentuk suasana kelompok secara terbuka.", "visi batin dibanding ekspresi terbuka"),
  makeTieBreak("tb_iei_eie_02", "IEI", "EIE", "Merasakan arah sebuah hubungan", "Saya lebih nyaman menunggu makna dan waktunya mengendap daripada segera memberi nama serta intensitas pada emosi yang ada.", "pengendapan makna dibanding pengarahan emosi"),

  makeTieBreak("tb_see_esi_01", "SEE", "ESI", "Menghadapi orang yang merusak kepercayaan", "Saya lebih cepat mengubah posisi, pengaruh, dan aliansi secara aktif daripada menetapkan satu penilaian moral yang tetap tentang hubungan itu.", "manuver pengaruh dibanding keteguhan penilaian relasi"),
  makeTieBreak("tb_see_esi_02", "SEE", "ESI", "Membela orang dekat", "Saya lebih spontan menggerakkan orang dan sumber daya daripada berfokus pada batas kesetiaan yang tidak boleh dilanggar.", "mobilisasi pengaruh dibanding batas kesetiaan"),

  makeTieBreak("tb_ili_lie_01", "ILI", "LIE", "Melihat peluang besar", "Saya lebih dahulu mengamati bagaimana peluang itu mungkin berkembang atau gagal daripada segera mengubahnya menjadi rencana kerja yang produktif.", "pengamatan arah dibanding eksekusi praktis"),
  makeTieBreak("tb_ili_lie_02", "ILI", "LIE", "Tren baru mulai terlihat", "Saya lebih nyaman menunggu pola dan waktunya menjadi jelas daripada langsung mengerahkan sumber daya untuk memanfaatkannya.", "menunggu kematangan arah dibanding bergerak produktif"),

  makeTieBreak("tb_iee_eii_01", "IEE", "EII", "Melihat potensi seseorang", "Saya lebih terdorong membuka kemungkinan baru baginya daripada menjaga satu arah hubungan yang paling selaras dengan nilai dan batasnya.", "membuka potensi dibanding menjaga arah relasi"),
  makeTieBreak("tb_iee_eii_02", "IEE", "EII", "Orang dekat ingin berubah", "Saya lebih cepat menunjukkan banyak jalan yang dapat dicoba daripada mendalami mana yang paling sesuai dengan suara batin dan komitmennya.", "banyak jalan pertumbuhan dibanding keselarasan nilai"),

  makeTieBreak("tb_sli_lse_01", "SLI", "LSE", "Pekerjaan harian perlu dibenahi", "Saya lebih dahulu mencari cara yang paling ringan dan nyaman dijalankan daripada membuat jadwal, target, dan pengawasan yang lebih ketat.", "cara ringan adaptif dibanding pengaturan produktif"),
  makeTieBreak("tb_sli_lse_02", "SLI", "LSE", "Ada alat dan waktu terbatas", "Saya lebih suka menyesuaikan diri secara tenang dengan apa yang tersedia daripada mengorganisasi orang agar seluruh proses bergerak lebih cepat.", "adaptasi praktis tenang dibanding pengorganisasian aktif"),
];

export const getTieBreakQuestionsForPair = (pair: string): SocionicsQuestion[] =>
  TIE_BREAK_QUESTIONS.filter((question) => question.tieBreakTags?.includes(pair));
