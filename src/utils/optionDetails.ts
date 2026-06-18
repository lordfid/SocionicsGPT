import type {
  InformationElement,
  MeasurementChannel,
  ScaleType,
  SocionicsQuestion,
} from "../types/socionics";

export interface OptionDetail {
  artinya: string;
  reaksi: string;
}

type FiveLevels = readonly [string, string, string, string, string];

const lowerFirst = (value: string): string =>
  value.length > 0
    ? value.charAt(0).toLocaleLowerCase("id-ID") + value.slice(1)
    : value;

const upperFirst = (value: string): string =>
  value.length > 0
    ? value.charAt(0).toLocaleUpperCase("id-ID") + value.slice(1)
    : value;

const normalizeSpaces = (value: string): string =>
  value.replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").trim();

const casualize = (value: string): string =>
  normalizeSpaces(
    value
      .replace(/\bpikiran saya\b/gi, "kepalaku")
      .replace(/\bkepala saya\b/gi, "kepalaku")
      .replace(/\bperhatian saya\b/gi, "perhatianku")
      .replace(/\btubuh saya\b/gi, "tubuhku")
      .replace(/\bposisi saya\b/gi, "posisiku")
      .replace(/\blogika saya\b/gi, "logikaku")
      .replace(/\bperasaan pribadi saya\b/gi, "perasaan pribadiku")
      .replace(/\bmenurut saya\b/gi, "menurutku")
      .replace(/\bbagi saya\b/gi, "buatku")
      .replace(/\bmembuat saya\b/gi, "bikin aku")
      .replace(/\bSaya merasa\b/g, "Aku ngerasa")
      .replace(/\bsaya merasa\b/g, "aku ngerasa")
      .replace(/\bSaya dapat\b/g, "Aku bisa")
      .replace(/\bsaya dapat\b/g, "aku bisa")
      .replace(/\bSaya\b/g, "Aku")
      .replace(/\bsaya\b/g, "aku")
      .replace(/\bAnda\b/g, "kamu")
      .replace(/\banda\b/g, "kamu")
      .replace(/\bSaat\b/g, "Pas")
      .replace(/\bsaat\b/g, "pas")
      .replace(/\bKetika\b/g, "Pas")
      .replace(/\bketika\b/g, "pas")
      .replace(/\bJika\b/g, "Kalau")
      .replace(/\bjika\b/g, "kalau")
      .replace(/\bTidak\b/g, "Nggak")
      .replace(/\btidak\b/g, "nggak")
      .replace(/\bNamun\b/g, "Tapi")
      .replace(/\bnamun\b/g, "tapi")
      .replace(/\bMeskipun\b/g, "Walau")
      .replace(/\bmeskipun\b/g, "walau")
      .replace(/\bCenderung\b/g, "Biasanya")
      .replace(/\bcenderung\b/g, "biasanya")
      .replace(/\bRelatif\b/g, "Lumayan")
      .replace(/\brelatif\b/g, "lumayan")
      .replace(/\bDapat\b/g, "Bisa")
      .replace(/\bdapat\b/g, "bisa")
      .replace(/\bMemerlukan\b/g, "Butuh")
      .replace(/\bmemerlukan\b/g, "butuh")
      .replace(/\bMerasa\b/g, "Ngerasa")
      .replace(/\bmerasa\b/g, "ngerasa")
      .replace(/\bMembuat\b/g, "Bikin")
      .replace(/\bmembuat\b/g, "bikin")
      .replace(/\bMemberi\b/g, "Ngasih")
      .replace(/\bmemberi\b/g, "ngasih")
      .replace(/\bMemberikan\b/g, "Ngasih")
      .replace(/\bmemberikan\b/g, "ngasih")
      .replace(/\bMenggunakan\b/g, "Pakai")
      .replace(/\bmenggunakan\b/g, "pakai")
      .replace(/\bMenunjukkan\b/g, "Nunjukin")
      .replace(/\bmenunjukkan\b/g, "nunjukin")
      .replace(/\bMencoba\b/g, "Nyoba")
      .replace(/\bmencoba\b/g, "nyoba")
      .replace(/\bTerpikir\b/g, "Kepikiran")
      .replace(/\bterpikir\b/g, "kepikiran")
      .replace(/\bMemikirkan\b/g, "Mikirin")
      .replace(/\bmemikirkan\b/g, "mikirin")
      .replace(/\bBerpikir\b/g, "Mikir")
      .replace(/\bberpikir\b/g, "mikir")
      .replace(/\bMenjelaskan\b/g, "Jelasin")
      .replace(/\bmenjelaskan\b/g, "jelasin")
      .replace(/\bMemilih\b/g, "Milih")
      .replace(/\bmemilih\b/g, "milih")
      .replace(/\bMenghadapi\b/g, "Ngadepin")
      .replace(/\bmenghadapi\b/g, "ngadepin")
      .replace(/\bMenemukan\b/g, "Nemuin")
      .replace(/\bmenemukan\b/g, "nemuin")
      .replace(/\bMengubah\b/g, "Ngubah")
      .replace(/\bmengubah\b/g, "ngubah")
      .replace(/\bMenunggu\b/g, "Nunggu")
      .replace(/\bmenunggu\b/g, "nunggu")
      .replace(/\bMencari\b/g, "Nyari")
      .replace(/\bmencari\b/g, "nyari")
      .replace(/\bSehingga\b/g, "Sampai")
      .replace(/\bsehingga\b/g, "sampai")
      .replace(/\btersebut\b/g, "itu"),
  );

const scenarioLead = (scenario: string): string => {
  const scene = lowerFirst(casualize(scenario).replace(/[.]+$/, ""));
  const alreadyClause =
    /\b(mulai|sedang|harus|diminta|ditolak|rusak|buntu|berubah|menjadi|terasa|terlihat|datang|muncul|saling|dinilai|diukur|membingungkan|berjalan|menunggu|kehilangan|butuh|perlu)\b/i.test(scene);

  return alreadyClause
    ? `Pas ${scene}`
    : `Pas lagi menghadapi ${scene}`;
};

const CASUAL_OVERRIDES: Partial<Record<string, string>> = {
  core_ne_threat_03:
    "Kalau nggak ada petunjuk atau jawaban pasti, aku gampang gelisah karena harus bikin jalan dari nol.",
  core_ne_aspiration_02:
    "Pas lagi belajar bidang baru, aku pengin tetap terbuka sama banyak kemungkinan tanpa buru-buru menutup ide yang belum kukenal.",
  core_ni_receiver_02:
    "Kalau aku nggak tahu kapan harus bergerak, saran soal kapan menunggu dan kapan mulai bisa bikin aku jauh lebih tenang.",
  core_se_threat_01:
    "Kalau harus menghadapi orang yang agresif dan mempertahankan posisiku saat itu juga, tubuhku bisa langsung kaku, defensif, atau pengin keluar.",
  core_te_receiver_03:
    "Kalau aku nggak tahu cara memakai sesuatu, contoh langsung dari orang yang berpengalaman jauh lebih melegakan daripada penjelasan panjang.",
  core_ti_threat_03:
    "Kalau kesalahan kecil dalam penalaranku terus disorot, aku bisa malu, defensif, dan akhirnya pengin berhenti bicara.",
  core_fi_threat_03:
    "Kalau perasaan pribadiku dipertanyakan dan aku didesak menjelaskan siapa yang kusayangi, kupercaya, atau kujauhi, aku bisa malu dan langsung menutup diri.",
  core_fi_receiver_01:
    "Kalau aku nggak yakin sama posisi sebuah hubungan, aku lega banget saat orang itu bilang dengan jelas bahwa ia percaya, tetap dekat, dan nggak menyimpan maksud lain.",
  holdout_ne_03:
    "Kalau aku belum menangkap potensi sebuah topik, pikiranku terasa kebuka lagi saat seseorang nunjukin hubungan tak terduga yang bikin topik itu punya banyak jalan buat dipelajari.",
  holdout_fi_03:
    "Kalau hubungan terasa nggak pasti, konsistensi kecil dan ucapan jujur soal posisi hubungan bisa ngasih aku rasa aman yang besar.",
};

const SCENE_LEAD_OVERRIDES: Partial<Record<string, string>> = {
  core_ne_threat_03: "Pas aku nggak dikasih petunjuk atau jawaban pasti",
  core_ne_aspiration_02: "Pas aku lagi belajar bidang baru",
  core_ni_receiver_02: "Pas aku nggak tahu kapan harus bergerak",
  core_se_threat_01: "Pas aku berhadapan sama orang yang agresif",
  core_te_receiver_03: "Pas aku nggak tahu cara memakai sesuatu",
  core_ti_threat_03: "Pas kesalahan kecil dalam penalaranku disorot",
  core_fi_threat_03: "Pas perasaan pribadiku dipertanyakan",
  core_fi_receiver_01: "Pas aku nggak yakin sama posisi sebuah hubungan",
  holdout_ne_03: "Pas aku belum menangkap potensi sebuah topik",
  holdout_fi_03: "Pas hubungan terasa nggak pasti",
};

const questionSceneLead = (question: SocionicsQuestion): string =>
  SCENE_LEAD_OVERRIDES[question.id] ?? scenarioLead(question.scenario);

/**
 * Versi kasual wajib terasa seperti ucapan sehari-hari, memakai sudut pandang
 * "aku", dan bisa dibaca dalam satu tarikan napas.
 */
export function getCasualVersion(question: SocionicsQuestion): string {
  const overridden = CASUAL_OVERRIDES[question.id];
  if (overridden) return overridden;

  const raw = casualize(question.statement).replace(/[.]+$/, "");
  const statementAlreadyHasContext =
    /^(Kalau|Pas|Begitu|Waktu|Setelah|Sebelum|Melihat|Begitu melihat|Saat)\b/i.test(raw);

  if (statementAlreadyHasContext) return `${raw}.`;

  return `${questionSceneLead(question)}, ${lowerFirst(raw)}.`;
}

const ELEMENT_MIND: Record<InformationElement, string> = {
  Ne: "otakmu suka membuka cabang, celah, dan kemungkinan lain dari sesuatu yang kelihatannya sudah mentok",
  Ni: "kepalamu suka membaca tempo, arah perubahan, dan ke mana rangkaian kejadian ini bakal bergerak",
  Se: "perhatianmu cepat menangkap batas, posisi, tekanan, dan siapa atau apa yang sedang menguasai ruang",
  Si: "pikiranmu peka pada rasa tubuh, ritme, suhu, suara, posisi, dan apakah keadaan terasa pas atau mengganggu",
  Te: "kepalamu otomatis nyari bukti yang bisa dipakai, langkah yang bekerja, dan hasil yang kelihatan nyata",
  Ti: "otakmu suka memisahkan bagian, mencari hubungan yang konsisten, lalu menaruh semuanya di tempat yang masuk akal",
  Fe: "pikiranmu cepat membaca suhu emosi, nada, ekspresi, dan energi yang sedang menular di antara orang-orang",
  Fi: "kepalamu peka pada kedekatan, ketulusan, rasa percaya, dan batas personal yang nggak selalu diucapkan",
};

const CHANNEL_MIND: Record<MeasurementChannel, string> = {
  producer: "Kalau mode ini nyala, kepalamu pengin langsung mengubah keadaan, bukan cuma mengamati.",
  flexible: "Kepalamu memakai pola ini sebagai alat yang bisa dinaik-turunkan sesuai tujuan.",
  mask: "Di balik responsnya ada self-monitoring: kamu mengecek apakah dirimu sudah kelihatan cukup mampu.",
  threat: "Di sini yang bekerja bukan cuma kemampuan, tapi alarm batin saat tuntutannya terasa terlalu dekat.",
  receiver: "Kepalamu lebih gampang melepas beban saat orang lain memegang bagian ini dengan cara yang pas.",
  aspiration: "Area ini dekat dengan rasa ingin berkembang, bangga, dan diakui tanpa merasa dipermalukan.",
  dismissive: "Kemampuannya bisa ada, tapi kepalamu nggak menganggap bagian ini sebagai sesuatu yang pantas mengambil banyak ruang.",
  background: "Prosesnya cenderung jalan senyap di belakang layar dan sering baru kamu sadari setelah semuanya selesai.",
};

const ELEMENT_ACTIONS: Record<InformationElement, FiveLevels> = {
  Ne: [
    "kamu tetap pakai satu cara, menutup catatan, atau nunggu orang lain yang membuka opsi baru",
    "kamu menatap layar sebentar, mencoret satu-dua kemungkinan, lalu berhenti buat menimbang mana yang paling aman",
    "kamu kadang bikin daftar alternatif, tapi di lain waktu langsung pilih cara pertama biar cepat selesai",
    "kamu membuka beberapa tab, menulis tiga opsi, lalu cepat mencoba jalan yang paling menjanjikan",
    "tanganmu otomatis bikin cabang di catatan, memindah-mindah benda, atau melempar beberapa kemungkinan sebelum orang lain selesai bicara",
  ],
  Ni: [
    "kamu langsung jalan tanpa membaca tempo, jarang menengok urutan kejadian, dan baru sadar arahnya setelah semuanya keburu bergerak",
    "kamu berhenti cukup lama, melihat jam atau timeline, lalu masih ragu apakah sekarang memang waktu yang pas",
    "kamu kadang menunda dan mengamati arah, tapi di situasi lain langsung bergerak tanpa membaca momentumnya",
    "kamu mengecilkan suara, menunggu beberapa detik, lalu memilih momen yang terasa paling pas untuk masuk",
    "kamu otomatis mengubah tempo, menahan satu langkah, atau maju tepat saat rangkaian situasinya terasa matang",
  ],
  Se: [
    "kamu membiarkan posisi tetap berantakan, mengikuti arus, atau pura-pura sibuk sama HP supaya orang lain yang mengambil kendali",
    "kamu melirik risih, menggeser badan sedikit, lalu berhenti buat mikir apakah perlu maju atau lebih aman diam",
    "kamu kadang pasang badan atau bicara tegas, tapi di waktu lain memilih membiarkan orang lain mengatur",
    "kamu langsung maju setengah langkah, menutup celah, memindahkan penghalang, atau memberi instruksi pendek",
    "posturmu otomatis berubah, bahumu menghadap sumber gangguan, tanganmu mengatur jarak, dan orang lain langsung menangkap batasnya",
  ],
  Si: [
    "kamu tetap duduk dalam posisi yang bikin pegal, membiarkan suara atau suhu mengganggu, lalu baru sadar setelah tubuhmu benar-benar protes",
    "kamu mengusap leher, mengubah posisi beberapa kali, lalu masih butuh waktu buat tahu apa yang sebenarnya bikin nggak nyaman",
    "kamu kadang meredupkan lampu atau mencari posisi enak, tapi di waktu lain mengabaikan sinyal tubuh sampai urusan selesai",
    "kamu cepat mengatur kursi, suhu, suara, makanan, atau ritme supaya badan kembali terasa enak",
    "tanpa mikir panjang kamu langsung menggeser posisi, membuka jendela, mengambil air, atau menurunkan tempo sebelum rasa nggak nyaman membesar",
  ],
  Te: [
    "kamu lanjut menebak, memakai cara lama, atau menunggu orang lain menunjukkan data dan langkah yang benar-benar bekerja",
    "kamu membuka catatan atau mesin pencari, mengecek satu-dua angka, lalu masih lama menimbang apakah buktinya cukup",
    "kamu kadang bikin daftar hasil dan membandingkan cara, tapi di waktu lain cukup mengikuti feeling atau kebiasaan",
    "kamu langsung membuka data, membandingkan waktu atau biaya, lalu mencoba langkah yang paling masuk akal",
    "jarimu otomatis mencari angka, riwayat, contoh nyata, atau alat uji sebelum obrolannya keburu penuh asumsi",
  ],
  Ti: [
    "kamu membiarkan aturan tumpang tindih, mengikuti penjelasan seadanya, atau baru sadar ada kontradiksi setelah orang lain menunjukkannya",
    "kamu mencoret-coret kotak dan panah, berhenti cukup lama, lalu masih mengecek apakah pembagiannya benar-benar konsisten",
    "kamu kadang membuat kategori atau urutan, tapi di waktu lain membiarkan susunannya longgar selama masih bisa dipakai",
    "kamu langsung memberi nama kategori, menggambar hubungan, atau merapikan aturan supaya bagian-bagiannya nggak saling tabrak",
    "tanganmu otomatis bikin tabel, garis, kelompok, dan urutan sampai pola yang tadinya kusut kelihatan rapi tanpa perlu banyak penjelasan",
  ],
  Fe: [
    "kamu tetap datar, membiarkan suasana menggantung, atau menunggu orang lain yang mengubah energi ruangan",
    "kamu melirik wajah orang satu-satu, menyusun nada yang pas, lalu masih ragu apakah perlu ikut mencairkan suasana",
    "kamu kadang bercanda atau menaikkan nada, tapi di waktu lain memilih diam dan membiarkan mood ruangan berjalan sendiri",
    "kamu cepat mengubah intonasi, melempar satu kalimat ringan, atau menunjukkan ekspresi yang bikin energi ruangan ikut bergerak",
    "wajah, suara, dan gesturmu otomatis menyesuaikan; kamu bisa bikin orang tertawa, tegang, atau ikut semangat tanpa perlu briefing",
  ],
  Fi: [
    "kamu tetap menjaga jarak yang sama ke semua orang, mengabaikan sinyal personal, atau baru sadar ada batas yang rusak setelah hubungan telanjur dingin",
    "kamu membaca ulang chat, memperhatikan nada, lalu lama menimbang apakah perlu mendekat, menjauh, atau bertanya langsung",
    "kamu kadang mengajak bicara empat mata, tapi di waktu lain membiarkan kedekatan atau jaraknya tetap samar",
    "kamu cepat memisahkan obrolan dari keramaian, menurunkan suara, lalu menyampaikan batas atau perhatian secara personal",
    "tanpa banyak bicara kamu otomatis mengubah jarak, memilih kata, mengirim pesan pribadi, atau menghentikan kedekatan begitu rasa percaya berubah",
  ],
};

const STRESS_ACTION: Record<InformationElement, string> = {
  Ne: "kamu membuka-tutup catatan, melontarkan ide setengah jadi, lalu mendadak buntu karena semua pilihan terasa jelek",
  Ni: "kamu berkali-kali melihat jam atau timeline, mengulang prediksi di kepala, lalu makin takut salah membaca momennya",
  Se: "bahumu kaku, rahangmu mengeras, suaramu bisa mendadak mengecil atau justru naik karena kamu merasa sedang didesak",
  Si: "kamu terus mengubah posisi, memegang kepala atau perut, lalu makin susah fokus karena semua sensasi terasa mengganggu",
  Te: "kamu bolak-balik mengecek angka, takut datanya salah, lalu menunda keputusan karena nggak yakin langkah mana yang benar-benar bekerja",
  Ti: "kamu menghapus dan menulis ulang susunan, terpaku pada satu aturan, lalu nge-blank ketika ada pengecualian baru",
  Fe: "senyummu kaku, nadamu jadi dibuat-buat, atau kamu menarik diri karena merasa semua orang sedang membaca ekspresimu",
  Fi: "kamu membaca ulang pesan, menjawab sangat pendek, menjaga jarak, atau menutup obrolan karena takut salah menilai kedekatan",
};

const RELIEF_ACTION: Record<InformationElement, string> = {
  Ne: "bahumu turun, kamu langsung membuka catatan, lalu mulai menambahkan pilihan baru dari kemungkinan yang orang itu tunjukkan",
  Ni: "kamu berhenti memaksa jawaban cepat, mengangguk pelan, lalu menyusun ulang langkah sesuai tempo yang dijelaskan orang itu",
  Se: "posturmu lebih rileks, kamu mundur setengah langkah, lalu membiarkan orang yang tegas itu mengamankan batas dan membagi peran",
  Si: "napasmu melambat, kamu memperbaiki posisi duduk atau menerima minum, lalu tubuhmu terasa lebih gampang diajak lanjut",
  Te: "kamu langsung mengikuti data atau langkah yang diberikan, mencentang satu-satu, lalu beban di kepalamu terasa turun",
  Ti: "kamu melihat bagan atau aturan yang dibuat orang itu, mengangguk, lalu bisa melanjutkan tanpa terus mengurai semuanya sendirian",
  Fe: "wajahmu lebih hidup, kamu ikut tersenyum atau bicara lagi, lalu energi ruangan nggak terasa seberat tadi",
  Fi: "bahumu melemas, kamu mulai bicara lebih jujur, lalu membiarkan orang itu menjaga jarak atau kedekatan dengan cara yang terasa aman",
};

const PRAISE_ACTION: Record<InformationElement, string> = {
  Ne: "kamu menyimpan idenya, membuka catatan baru, lalu kepikiran mengembangkan kemungkinan itu lagi setelah obrolan selesai",
  Ni: "kamu mengulang pujian itu di kepala, menandai momen penting, lalu makin berani mempercayai pembacaan arahmu",
  Se: "posturmu langsung lebih tegak, kamu mengambil peran lebih jelas, lalu ingin membuktikan bahwa kamu memang bisa memegang keadaan",
  Si: "kamu tersenyum kecil, memperhatikan detail kenyamanan lagi, lalu makin percaya pada kepekaan tubuhmu",
  Te: "kamu menyimpan hasilnya, membandingkan progres, lalu ingin mencoba metode yang lebih efektif lagi",
  Ti: "kamu merapikan catatan, memperbaiki modelnya, lalu ingin menunjukkan bahwa susunannya bisa tetap konsisten",
  Fe: "wajahmu langsung cerah, nada suaramu naik, lalu kamu ingin menghidupkan suasana itu sekali lagi",
  Fi: "kamu mengingat kalimatnya lama, mengirim respons personal, lalu makin berani menjaga hubungan dengan cara yang terasa tulus",
};

const scaleMeaning = (
  scaleType: ScaleType,
  value: number,
  mind: string,
  channel: string,
): string => {
  const tables: Record<ScaleType, FiveLevels> = {
    automaticity: [
      `Proses ini bukan default otakmu. Dalam situasi seperti ini, ${mind}, tapi pola itu biasanya baru muncul setelah ada pemicu yang sangat jelas atau orang lain lebih dulu membuka jalannya.`,
      `Kamu sebenarnya bisa masuk ke mode ini, tapi kepalamu butuh pause, menyusun langkah, dan meyakinkan diri dulu sebelum responsnya keluar.`,
      `Mode ini nyala-mati. Kadang kepalamu langsung masuk ke pola ini, kadang energi, orang, dan kondisi saat itu bikin kamu memilih jalur lain.`,
      `Pola ini cukup dekat dengan respons pertamamu. Begitu pemicunya muncul, ${mind}, bahkan sebelum kamu sempat banyak mengatur diri.`,
      `Pola ini sudah kayak autopilot. Begitu situasinya muncul, ${mind}, nyaris barengan dengan saat kamu sadar ada sesuatu yang perlu ditangani.`,
    ],
    frequency: [
      `Pola ini hampir nggak pernah jadi cara harianmu. Kepalamu biasanya memilih jalur lain yang terasa lebih masuk akal atau lebih ringan.`,
      `Pola ini muncul sesekali, biasanya karena keadaan memaksa. Begitu tekanannya hilang, kamu balik lagi ke kebiasaan yang lebih natural.`,
      `Pola ini lumayan ada, tapi belum konsisten. Kadang ${mind}, kadang kamu sama sekali nggak merasa perlu masuk ke mode itu.`,
      `Pola ini cukup sering muncul dalam keseharianmu. Kepalamu gampang balik ke cara ini walau nggak selalu di setiap kesempatan.`,
      `Pola ini sangat konsisten. Orang dekat kemungkinan sudah bisa nebak bahwa kepalamu bakal masuk ke cara ini lagi.`,
    ],
    comfort: [
      `Menahan mode ini bikin kepalamu sibuk ngawasin diri sendiri. Kamu bisa melakukannya, tapi rasanya kayak terus main peran dan cepat menguras tenaga.`,
      `Kamu masih agak kaku di area ini. Sebagian perhatianmu habis buat memastikan kamu nggak salah, jadi responsnya susah terasa santai.`,
      `Rasa nyamannya fifty-fifty. Kadang mode ini mengalir, kadang kepalamu cepat capek tergantung tekanan dan siapa yang ada di situ.`,
      `Kamu cukup santai memakai mode ini. Kepalamu masih punya ruang buat menyesuaikan respons tanpa merasa sedang memaksa diri.`,
      `Mode ini terasa natural dan ringan. Saat memakainya, ${mind}, sementara energimu masih cukup buat memperhatikan hal lain.`,
    ],
    competence: [
      `Kepalamu belum punya pegangan yang stabil di area ini. Begitu situasinya berubah sedikit, kamu gampang kehilangan arah dan butuh contoh konkret.`,
      `Kamu sudah punya sebagian cara, tapi masih sering bergantung pada panduan, aturan, atau orang lain buat memastikan langkahmu nggak meleset.`,
      `Kemampuanmu cukup jalan di kondisi yang familiar. Begitu tekanannya naik atau polanya berubah, kualitas responsmu bisa ikut goyah.`,
      `Kamu cukup paham cara menangani area ini dan biasanya bisa memperbaiki kesalahan tanpa banyak dituntun.`,
      `Pemahamanmu di area ini luas dan lentur. Kepalamu bisa tetap membaca masalah meski konteksnya berubah atau jadi jauh lebih rumit.`,
    ],
    importance: [
      `Bagian ini hampir nggak mendapat ruang di kepalamu. Ada hal lain yang jauh lebih cepat terasa penting dan mengambil keputusanmu.`,
      `Bagian ini punya bobot kecil. Kamu baru memasukkannya ke pertimbangan kalau ada alasan praktis yang benar-benar jelas.`,
      `Nilainya berubah-ubah. Kadang bagian ini terasa penting, kadang cepat kalah sama kebutuhan lain yang lebih mendesak.`,
      `Bagian ini cukup dekat dengan prioritasmu. Kepalamu sering mengecek apakah keputusan yang kamu ambil masih menjaga area ini.`,
      `Bagian ini duduk dekat pusat prioritasmu. Sulit buatmu menukarnya, bahkan saat mempertahankannya bikin pilihan jadi lebih berat.`,
    ],
    threat: [
      `Tuntutan ini nggak menyentuh alarm batinmu. Kepalamu tetap punya ruang buat berpikir, mencoba, dan salah tanpa merasa harga dirimu sedang diserang.`,
      `Ada sedikit gesekan di kepala, tapi kamu masih gampang menenangkan diri dan kembali melihat pilihan yang tersedia.`,
      `Alarm batinmu mulai nyala. Sebagian pikiranmu sibuk takut salah atau dinilai, jadi ruang gerakmu terasa lebih sempit.`,
      `Tuntutan ini gampang menyentuh titik sensitifmu. Kepalamu masuk mode bertahan, makin kaku, dan susah melihat pilihan dengan santai.`,
      `Tuntutan ini langsung menekan tombol daruratmu. Pikiranmu bisa nge-blank, defensif, malu, atau cuma ingin secepatnya keluar dari situasi itu.`,
    ],
    relief: [
      `Bantuan di area ini nggak banyak mengubah keadaan batinmu. Kepalamu tetap merasa lebih aman memegang bagian itu sendiri atau mencari bentuk bantuan lain.`,
      `Ada sedikit rasa ringan, tapi nggak sampai bikin kepalamu benar-benar menyerahkan kendali atau merasa sangat terbantu.`,
      `Bantuan ini lumayan menurunkan beban. Kamu masih bisa jalan sendiri, tapi kepalamu nggak perlu memegang semuanya seketat tadi.`,
      `Bantuan ini benar-benar berguna. Begitu orang yang tepat masuk, kepalamu lebih cepat tenang dan situasinya terasa jauh lebih bisa dijalani.`,
      `Bantuan ini menyentuh kebutuhan yang dalam. Rasanya kayak ada bagian berat di kepalamu yang akhirnya dipegang orang yang ngerti caranya.`,
    ],
    recognition: [
      `Pujian di area ini lewat begitu saja. Kepalamu nggak menjadikannya bukti penting tentang siapa dirimu atau ke mana kamu ingin berkembang.`,
      `Pujian itu enak didengar, tapi efeknya tipis dan cepat hilang. Kamu nggak merasa perlu mengejar pengalaman yang sama lagi.`,
      `Pujian ini lumayan masuk. Kadang bikin semangatmu naik, kadang cuma terasa seperti komentar baik biasa.`,
      `Pujian ini menyentuh bagian yang ingin tumbuh. Kepalamu menyimpannya sebagai bukti bahwa kamu mungkin memang bisa berkembang di sini.`,
      `Pujian ini masuk sangat dalam. Kamu bisa replay kalimatnya berkali-kali karena area ini berkaitan dengan rasa bangga yang masih sensitif.`,
    ],
    comparison: [
      `Sisi kedua terasa jauh lebih dekat dengan cara kerja kepalamu. Sisi pertama mungkin bisa kamu lakukan, tapi bukan jalur yang paling natural.`,
      `Kepalamu agak condong ke sisi kedua, walau sisi pertama masih muncul di keadaan tertentu.`,
      `Dua sisi ini terasa sama kuat. Pilihanmu benar-benar bergantung pada siapa, tujuan, dan tekanan yang sedang ada.`,
      `Kepalamu agak condong ke sisi pertama, walau sisi kedua tetap bisa dipakai saat keadaan menuntut.`,
      `Sisi pertama terasa jauh lebih natural dan cepat mengambil alih keputusanmu dibanding sisi kedua.`,
    ],
  };

  const base = tables[scaleType][value - 1];
  return `${base} ${channel}`;
};

const buildReaction = (question: SocionicsQuestion, value: number): string => {
  const scene = upperFirst(questionSceneLead(question));
  const baseAction = ELEMENT_ACTIONS[question.element][value - 1];

  if (question.scaleType === "comparison") {
    const comparisonActions: FiveLevels = [
      "kamu menggeser keputusan ke sisi kedua, mulai mengerjakan langkah dari sana, dan meninggalkan sisi pertama sebagai cadangan",
      "kamu lebih dulu mencoba sisi kedua, lalu baru kembali ke sisi pertama kalau hasil awalnya nggak cocok",
      "kamu berhenti, melihat dua pilihan bergantian, lalu menentukan arah berdasarkan keadaan paling konkret saat itu",
      "kamu lebih dulu mencoba sisi pertama, lalu baru pindah ke sisi kedua kalau situasinya menuntut",
      "kamu langsung bergerak lewat sisi pertama, membangun langkah dari sana, dan hampir nggak melirik sisi kedua",
    ];
    return `${scene}, ${comparisonActions[value - 1]}.`;
  }

  if (question.scaleType === "threat") {
    const reactions: FiveLevels = [
      `${scene}, kamu tetap bernapas normal, menatap situasinya, lalu mengambil satu langkah tanpa sibuk membela diri`,
      `${scene}, kamu sempat mengerutkan dahi atau menarik napas, tapi beberapa detik kemudian tetap lanjut`,
      `${scene}, ${STRESS_ACTION[question.element]}, meski kamu masih bisa memaksa diri menyelesaikan bagian pentingnya`,
      `${scene}, ${STRESS_ACTION[question.element]}, lalu kamu mulai mempersempit obrolan, mencari kepastian, atau ingin menyerahkan bagian itu`,
      `${scene}, ${STRESS_ACTION[question.element]}, kemudian kamu bisa menutup percakapan, menghindar, atau pergi supaya tekanannya berhenti`,
    ];
    return `${reactions[value - 1]}.`;
  }

  if (question.scaleType === "relief") {
    const reactions: FiveLevels = [
      `${scene}, bantuan itu kamu dengar sebentar lalu kamu tetap mengerjakan semuanya dengan caramu sendiri`,
      `${scene}, kamu mengambil satu bagian kecil dari bantuan itu, mengangguk, lalu kembali memegang sisanya sendiri`,
      `${scene}, ${RELIEF_ACTION[question.element]}, tapi kamu masih menjaga sebagian kendali di tanganmu`,
      `${scene}, ${RELIEF_ACTION[question.element]}, dan kamu mulai mengikuti arah orang itu tanpa terlalu banyak menahan diri`,
      `${scene}, ${RELIEF_ACTION[question.element]}, sampai perubahan di wajah, napas, atau posturmu kelihatan jelas`,
    ];
    return `${reactions[value - 1]}.`;
  }

  if (question.scaleType === "recognition") {
    const reactions: FiveLevels = [
      `${scene}, kamu cuma mengangguk atau bilang makasih lalu langsung pindah topik`,
      `${scene}, kamu tersenyum sebentar, menyimpan komentarnya, tapi nggak mengubah apa pun setelah itu`,
      `${scene}, ${PRAISE_ACTION[question.element]}, walau dorongannya bisa hilang lagi setelah beberapa waktu`,
      `${scene}, ${PRAISE_ACTION[question.element]}, lalu kamu sengaja mencari kesempatan lain buat melatihnya`,
      `${scene}, ${PRAISE_ACTION[question.element]}, dan kalimat pujiannya masih terulang di kepalamu berhari-hari`,
    ];
    return `${reactions[value - 1]}.`;
  }

  if (question.channel === "mask") {
    const maskActions: FiveLevels = [
      `${scene}, kamu nggak mencoba memainkan mode itu dan memilih tampil apa adanya`,
      `${scene}, kamu baru mencoba setelah melihat orang lain, lalu gerak atau ucapanmu masih terasa hati-hati`,
      `${scene}, kamu bisa memainkan perannya kalau perlu, tapi begitu tuntutannya turun kamu cepat melepasnya`,
      `${scene}, kamu cukup lancar menjaga ekspresi, kata, atau tindakan supaya kelihatan mampu meski tetap ada rasa capek`,
      `${scene}, kamu langsung memasang mode performa, mengontrol wajah dan pilihan kata, lalu mempertahankannya sampai situasi selesai`,
    ];
    return `${maskActions[value - 1]}.`;
  }

  if (question.channel === "dismissive") {
    const dismissiveEndings: FiveLevels = [
      "dan kamu memang nggak punya dorongan buat mengambil bagian itu",
      "tapi kamu cepat menyerahkannya ke orang lain karena rasanya bukan urusan utama",
      "lalu kamu menilai apakah bagian itu layak diteruskan atau cukup ditinggal",
      "kemudian setelah selesai kamu langsung pindah ke hal yang menurutmu lebih penting",
      "lalu kamu merapikannya tanpa drama dan tetap menganggapnya bukan sesuatu yang perlu dibanggakan",
    ];
    return `${scene}, ${baseAction}, ${dismissiveEndings[value - 1]}.`;
  }

  if (question.channel === "background") {
    const backgroundEndings: FiveLevels = [
      "dan proses itu hampir nggak berjalan di belakang layar",
      "tapi kamu masih perlu sadar penuh buat menjaga langkahnya",
      "dan kadang baru sadar belakangan bahwa kamu sempat melakukannya",
      "sementara perhatian utamamu tetap ada di urusan lain",
      "bahkan sebelum kamu sadar tubuh atau tanganmu sudah lebih dulu bergerak",
    ];
    return `${scene}, ${baseAction}, ${backgroundEndings[value - 1]}.`;
  }

  return `${scene}, ${baseAction}.`;
};

export function getOptionDetail(
  question: SocionicsQuestion,
  value: number,
): OptionDetail {
  const safeValue = Math.min(5, Math.max(1, Math.round(value)));
  const artinya = scaleMeaning(
    question.scaleType,
    safeValue,
    ELEMENT_MIND[question.element],
    CHANNEL_MIND[question.channel],
  );

  return {
    artinya,
    reaksi: buildReaction(question, safeValue),
  };
}