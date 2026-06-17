/** Holdout items are withheld from the initial core fit and used as a prediction check. */
import type { InformationElement, MeasurementChannel, QuestionContext, SocionicsQuestion } from "../types/socionics";

const makeHoldout = (
  id: string,
  element: InformationElement,
  channel: MeasurementChannel,
  context: QuestionContext,
  scenario: string,
  statement: string,
  responseFocus: string,
): SocionicsQuestion => ({
  id,
  scenario,
  statement,
  responseFocus,
  element,
  channel,
  context,
  scaleType:
    channel === "producer" || channel === "background" ? "automaticity" :
    channel === "threat" ? "threat" :
    channel === "receiver" ? "relief" :
    channel === "aspiration" ? "recognition" : "frequency",
  direction: 1,
  reverseKeyed: false,
  designWeight: 0.9,
  ambiguityRisk: "low",
  desirabilityRisk: channel === "aspiration" ? "medium" : "low",
  evidenceTags: [element, channel, context, "holdout"],
  replicationFamilyId: `holdout_${element}_${channel}`,
  isHoldout: true,
  isTieBreak: false,
  itemVersion: "2.0.0",
});

export const HOLDOUT_QUESTIONS: SocionicsQuestion[] = [
  makeHoldout("holdout_ne_01", "Ne", "producer", "new_situation", "Aturan permainan belum lengkap", "Sebelum orang lain selesai menjelaskan, saya sering sudah melihat beberapa kemungkinan tentang cara permainan itu bisa berkembang.", "melihat beberapa kemungkinan dari aturan yang belum lengkap"),
  makeHoldout("holdout_ne_02", "Ne", "threat", "public", "Semua orang menunggu ide yang belum pernah ada", "Tekanan untuk menjadi satu-satunya sumber ide baru dapat membuat pikiran saya mengecil dan takut semua pilihan terdengar bodoh.", "menghasilkan kebaruan ketika semua orang menunggu"),
  makeHoldout("holdout_ne_03", "Ne", "receiver", "study", "Tidak memahami potensi sebuah topik", "Saya merasa terbuka kembali ketika seseorang menunjukkan hubungan tak terduga yang membuat topik itu punya lebih banyak jalan untuk dipelajari.", "menerima hubungan baru yang membuka potensi"),
  makeHoldout("holdout_ne_04", "Ne", "background", "general", "Melihat aturan yang dianggap tetap", "Saya kerap spontan menemukan pengecualian atau penggunaan lain, lalu menyimpannya di kepala tanpa merasa harus memperdebatkannya.", "melihat pengecualian dan penggunaan lain secara latar"),

  makeHoldout("holdout_ni_01", "Ni", "producer", "decision", "Sebuah keputusan terasa belum waktunya", "Saya sering merasakan bahwa langkah tertentu akan lebih tepat jika ditunda sampai rangkaian keadaan mencapai titik yang pas.", "merasakan kematangan waktu sebelum bertindak"),
  makeHoldout("holdout_ni_02", "Ni", "threat", "time_pressure", "Diminta menetapkan kapan masalah akan selesai", "Saya dapat sangat tertekan ketika harus menjanjikan tanggal akhir padahal alur perubahan belum cukup terbaca.", "menjamin waktu akhir ketika arah belum jelas"),
  makeHoldout("holdout_ni_03", "Ni", "receiver", "friendship", "Kejadian buruk terasa tidak bermakna", "Saya lega ketika seseorang dapat menjelaskan bagaimana kejadian itu mungkin menjadi bagian dari perkembangan yang lebih panjang.", "menerima makna perkembangan dari orang lain"),
  makeHoldout("holdout_ni_04", "Ni", "background", "work", "Proyek mulai kehilangan momentum", "Saya sering mengubah tempo atau menunggu satu tahap tertentu tanpa menjelaskan panjang karena arah perlambatannya sudah terasa.", "menyesuaikan momentum secara diam-diam"),

  makeHoldout("holdout_se_01", "Se", "producer", "conflict", "Seseorang terus menggeser batas yang sudah disepakati", "Saya cenderung segera menghentikannya dengan sikap yang jelas daripada berharap ia menyadari sendiri.", "menghentikan pelanggaran batas secara langsung"),
  makeHoldout("holdout_se_02", "Se", "threat", "public", "Harus merebut kendali dari orang yang dominan", "Tubuh saya dapat menegang ketika harus beradu posisi secara terbuka dan semua orang melihat siapa yang akan mundur.", "beradu posisi secara terbuka"),
  makeHoldout("holdout_se_03", "Se", "receiver", "family", "Keluarga menghadapi gangguan nyata", "Saya merasa aman ketika seseorang mengambil tindakan tegas, membagi peran, dan tidak membiarkan ancaman terus berlarut.", "menerima perlindungan dan tindakan tegas"),
  makeHoldout("holdout_se_04", "Se", "background", "work", "Barang dan orang menghalangi jalur kerja", "Saya sering langsung memindahkan, mengatur, atau membuka ruang agar kegiatan kembali lancar tanpa banyak rapat.", "membuka ruang dan menyingkirkan hambatan secara otomatis"),

  makeHoldout("holdout_si_01", "Si", "producer", "body", "Tubuh mulai kehilangan keseimbangan", "Saya biasanya cepat tahu apakah yang saya butuhkan adalah makan, tidur, bergerak, mengurangi suara, atau sekadar mengubah posisi.", "membaca kebutuhan tubuh secara spontan"),
  makeHoldout("holdout_si_02", "Si", "threat", "work", "Harus mengawasi kenyamanan banyak orang", "Saya dapat kewalahan ketika setiap keluhan suhu, makanan, bau, dan posisi duduk menjadi tanggung jawab saya.", "mengelola seluruh detail kenyamanan orang lain"),
  makeHoldout("holdout_si_03", "Si", "receiver", "romance", "Badan sedang benar-benar lelah", "Perhatian sederhana seperti menyiapkan tempat nyaman atau makanan yang pas dapat membuat saya merasa sangat dirawat.", "menerima perawatan indrawi yang tepat"),
  makeHoldout("holdout_si_04", "Si", "background", "friendship", "Kegiatan bersama berlangsung lama", "Saya sering tanpa sadar mengusulkan jeda, tempat yang lebih enak, atau tempo yang lebih ringan sebelum orang lain menyadari kelelahan.", "menjaga kenyamanan kelompok secara latar"),

  makeHoldout("holdout_te_01", "Te", "producer", "decision", "Menerima klaim yang terdengar meyakinkan", "Saya spontan ingin tahu sumbernya, contoh hasilnya, dan apakah informasi itu benar-benar dapat dipakai.", "memeriksa fakta dan kegunaan klaim"),
  makeHoldout("holdout_te_02", "Te", "threat", "time_pressure", "Harus memperbaiki alat tanpa petunjuk", "Saya dapat panik ketika hasil harus segera keluar tetapi saya tidak tahu prosedur mana yang terbukti bekerja.", "menemukan prosedur yang bekerja di bawah tekanan"),
  makeHoldout("holdout_te_03", "Te", "receiver", "new_situation", "Mencoba pekerjaan teknis pertama kali", "Saya sangat terbantu oleh orang yang menunjukkan satu contoh nyata, membiarkan saya mencoba, lalu memperbaiki langkah yang salah.", "menerima demonstrasi praktis"),
  makeHoldout("holdout_te_04", "Te", "background", "private", "Rutinitas kecil terasa boros waktu", "Saya sering mengubah urutan atau alat secara otomatis sampai kegiatan itu selesai dengan lebih sedikit langkah.", "menyederhanakan rutinitas secara latar"),

  makeHoldout("holdout_ti_01", "Ti", "producer", "study", "Dua penjelasan memakai aturan yang berbeda", "Saya cepat ingin menemukan prinsip mana yang berubah dan apakah keduanya masih dapat berada dalam satu kerangka yang konsisten.", "mencari prinsip yang menyatukan aturan"),
  makeHoldout("holdout_ti_02", "Ti", "threat", "public", "Diminta mempertahankan definisi di depan banyak orang", "Saya dapat merasa malu atau defensif ketika setiap kata saya dibedah sebelum sempat menyusun kerangka yang utuh.", "mempertahankan definisi di bawah sorotan"),
  makeHoldout("holdout_ti_03", "Ti", "receiver", "work", "Pembagian tugas tidak jelas", "Saya lega ketika seseorang menetapkan batas peran dan menunjukkan bagaimana satu bagian terhubung dengan bagian lain.", "menerima struktur peran yang jelas"),
  makeHoldout("holdout_ti_04", "Ti", "background", "general", "Mendengar argumen yang tampak lancar", "Saya sering otomatis menangkap lompatan logika atau kategori yang bercampur, meskipun tidak selalu menyela.", "mendeteksi lompatan logika secara latar"),

  makeHoldout("holdout_fe_01", "Fe", "producer", "group", "Energi ruangan turun setelah kabar buruk", "Saya sering spontan mengubah nada bicara atau memberi respons yang membantu kelompok menyalurkan emosi bersama.", "menggerakkan emosi kelompok secara spontan"),
  makeHoldout("holdout_fe_02", "Fe", "threat", "work", "Diminta tetap ceria sepanjang hari", "Saya dapat merasa terperangkap ketika ekspresi saya harus terus disetel agar orang lain tidak kehilangan semangat.", "mempertahankan ekspresi positif sebagai tuntutan"),
  makeHoldout("holdout_fe_03", "Fe", "receiver", "private", "Sulit memahami perasaan sendiri", "Ekspresi terbuka dari orang lain sering membantu saya memberi nama pada emosi dan keluar dari keadaan yang datar.", "menerima ekspresi yang membantu menggerakkan emosi"),
  makeHoldout("holdout_fe_04", "Fe", "background", "friendship", "Percakapan menjadi terlalu tegang", "Saya kerap memberi satu nada ringan atau reaksi hangat yang membuat semua orang bernapas lagi tanpa merasa sedang tampil.", "melunakkan suasana secara latar"),

  makeHoldout("holdout_fi_01", "Fi", "producer", "friendship", "Seseorang meminta maaf setelah melukai kepercayaan", "Saya spontan menilai bukan hanya kata-katanya, tetapi juga perubahan sikap yang menunjukkan apakah hubungan benar-benar dapat dipulihkan.", "menilai ketulusan pemulihan hubungan"),
  makeHoldout("holdout_fi_02", "Fi", "threat", "conflict", "Harus menyatakan siapa yang paling saya percaya", "Saya dapat merasa sangat terpojok ketika pilihan itu akan mengubah kedekatan dan dibaca sebagai penolakan pribadi.", "menyatakan hierarki kepercayaan di bawah tekanan"),
  makeHoldout("holdout_fi_03", "Fi", "receiver", "romance", "Hubungan terasa tidak pasti", "Konsistensi kecil dan pernyataan jujur mengenai posisi hubungan dapat memberi rasa aman yang sangat besar.", "menerima kepastian hubungan yang tulus"),
  makeHoldout("holdout_fi_04", "Fi", "background", "family", "Ada jarak yang belum dibicarakan", "Saya sering mengubah cara mendekat, memberi ruang, atau menjaga kata-kata agar rasa hormat tetap ada tanpa membuatnya menjadi pembicaraan besar.", "merawat jarak dan rasa hormat secara latar"),
];
