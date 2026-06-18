import { TIM_MODELS, TIM_PROFILES } from "../constants/socionicsData";
import type {
  AssessmentResult,
  Club,
  InformationElement,
  Quadra,
  Temperament,
  TIM,
} from "../types/socionics";

export type ResultSectionId =
  | "summary"
  | "thinking"
  | "emotions"
  | "relationships"
  | "worldview"
  | "blindspots"
  | "recommendations";

export interface ResultInsightCard {
  title: string;
  expert: string;
  simple: string;
  stereotype?: string;
  misunderstood?: string;
  warning?: string;
  actions?: string[];
}

export interface RecommendationGroup {
  title: string;
  note: string;
  items: string[];
}

export interface ResultSection {
  id: ResultSectionId;
  title: string;
  kicker: string;
  intro: string;
  cards: ResultInsightCard[];
  recommendations?: RecommendationGroup[];
}

export interface ResultExperience {
  title: string;
  subtitle: string;
  tags: string[];
  expertSnapshot: string;
  internetSnapshot: string;
  observedSignals: string[];
  sections: ResultSection[];
}

type ElementLens = {
  algorithm: string;
  sees: string;
  blindSpot: string;
  blocked: string;
  restored: string;
  rules: string;
  politics: string;
  religion: string;
  economy: string;
  society: string;
  gift: string;
};

const ELEMENT_LENS: Record<InformationElement, ElementLens> = {
  Ne: {
    algorithm: "mendeteksi kemungkinan, celah, variasi, dan potensi yang belum dipakai",
    sees: "dunia sebagai sesuatu yang belum selesai dan masih bisa ditafsirkan ulang",
    blindSpot: "mudah meninggalkan bentuk final ketika kemungkinan baru terasa lebih hidup",
    blocked: "merasa dikurung saat pilihan dipersempit terlalu cepat atau identitas dipakukan menjadi satu versi",
    restored: "pulih ketika diberi ruang mencoba, bertanya, bercabang, dan menghubungkan hal yang kelihatannya tidak nyambung",
    rules: "aturan terasa sehat bila bisa diuji, direvisi, dan tidak membunuh kemungkinan baru",
    politics: "lebih peka pada pluralitas gagasan, kebebasan bereksperimen, dan hak orang untuk tidak seragam",
    religion: "cenderung tertarik pada pertanyaan, simbol, tafsir, dan kemungkinan makna yang tidak berhenti pada satu jawaban dangkal",
    economy: "melihat nilai pada inovasi, ide yang belum dilirik, jaringan baru, dan peluang yang belum diberi nama",
    society: "cepat menangkap potensi unik orang dan biasanya alergi pada label sosial yang terlalu cepat menutup cerita",
    gift: "memberi orang lain kemungkinan baru tentang siapa mereka bisa jadi",
  },
  Ni: {
    algorithm: "mengompres banyak kejadian menjadi tema, momentum, dan arah perkembangan",
    sees: "dunia sebagai rangkaian cerita yang bergerak menuju konsekuensi tertentu",
    blindSpot: "bisa terlalu percaya pada satu tafsir besar lalu terlambat memberi ruang pada data yang membantahnya",
    blocked: "tertekan saat dipaksa bergerak tanpa timing, tanpa konteks, atau tanpa sempat membaca ke mana semuanya mengarah",
    restored: "pulih ketika punya jeda, ruang sunyi, dan kesempatan menyusun ulang arti dari kejadian yang berserakan",
    rules: "aturan dinilai dari apakah ia selaras dengan arah jangka panjang, bukan cuma benar di atas kertas hari ini",
    politics: "peka pada narasi sejarah, siklus kekuasaan, momentum sosial, dan akibat jangka panjang dari keputusan publik",
    religion: "mudah tertarik pada makna batin, perjalanan, takdir, simbol waktu, kematian, perubahan, dan pertanyaan tentang arah hidup",
    economy: "lebih cepat melihat tren, risiko yang menumpuk, momentum pasar, dan biaya yang baru terasa nanti",
    society: "membaca suasana zaman dan sering merasa satu kejadian kecil adalah tanda dari perubahan yang lebih besar",
    gift: "memberi orang lain rasa arah ketika mereka tenggelam dalam terlalu banyak detail",
  },
  Se: {
    algorithm: "mendeteksi batas, daya tekan, posisi, keberanian, dan apa yang benar-benar bisa digerakkan sekarang",
    sees: "dunia sebagai medan nyata tempat keputusan, batas, dan tindakan punya konsekuensi langsung",
    blindSpot: "bisa terlalu cepat menaikkan tekanan sebelum memastikan orang lain memang butuh dorongan sekeras itu",
    blocked: "marah atau gelisah saat ruangnya diterobos, kendalinya dilumpuhkan, atau orang bicara besar tanpa berani bertindak",
    restored: "pulih ketika bisa bergerak, menetapkan batas, menyelesaikan benturan, dan melihat perubahan yang nyata",
    rules: "aturan dihormati bila punya daya, bisa ditegakkan, dan tidak cuma menjadi dekorasi moral",
    politics: "peka pada distribusi kekuasaan, kapasitas kepemimpinan, keamanan, ketegasan, dan siapa yang benar-benar memegang kendali",
    religion: "lebih tertarik pada keberanian hidup, disiplin, pengorbanan, keteguhan, dan bagaimana keyakinan diwujudkan dalam tindakan",
    economy: "melihat nilai pada aset nyata, daya tawar, keberanian mengambil posisi, dan kemampuan menjaga kepentingan",
    society: "cepat membaca siapa yang dominan, siapa yang ragu, siapa yang menguji batas, dan kapan suasana perlu ditahan atau didorong",
    gift: "memberi orang lain keberanian untuk berhenti mengecilkan diri",
  },
  Si: {
    algorithm: "mendeteksi kualitas sensasi, ritme tubuh, kecocokan, keseimbangan, dan detail yang membuat hidup terasa layak dijalani",
    sees: "dunia melalui kualitas pengalaman langsung: nyaman, kasar, berlebihan, hambar, sehat, atau menenangkan",
    blindSpot: "bisa menunda perubahan penting karena tubuh dan suasana belum terasa siap",
    blocked: "terkuras oleh lingkungan kasar, ritme yang memaksa, kebisingan, ketidakrapian indrawi, atau tuntutan tanpa jeda",
    restored: "pulih lewat tidur, makanan yang tepat, ruang rapi, gerak pelan, sentuhan aman, dan ritme yang kembali manusiawi",
    rules: "aturan dinilai dari apakah ia membuat hidup lebih tertata, sehat, nyaman, dan tidak menyiksa manusia demi formalitas",
    politics: "peka pada kualitas hidup sehari-hari, layanan publik, kesehatan, ruang kota, lingkungan, dan dampak kebijakan pada tubuh nyata",
    religion: "mudah terhubung lewat ritual yang menenangkan, kehadiran, rasa syukur, keindahan, dan pengalaman sakral yang terasa di tubuh",
    economy: "melihat nilai pada kualitas, daya tahan, keterampilan, kesejahteraan, dan produk yang benar-benar membuat hidup lebih baik",
    society: "cepat sadar siapa yang lelah, siapa yang tidak nyaman, dan perubahan kecil apa yang bisa membuat suasana lebih manusiawi",
    gift: "membuat hidup terasa cukup aman untuk dinikmati",
  },
  Te: {
    algorithm: "mencari fakta yang bisa dipakai, hasil yang terukur, metode yang bekerja, dan penggunaan sumber daya yang masuk akal",
    sees: "dunia sebagai kumpulan proses yang bisa diuji, diperbaiki, dipercepat, atau dihentikan bila tidak menghasilkan",
    blindSpot: "bisa meremehkan pengalaman yang sulit diukur meski tetap nyata bagi orang lain",
    blocked: "frustrasi saat harus bergerak dengan informasi kabur, prosedur tidak berguna, atau orang mempertahankan cara yang jelas-jelas gagal",
    restored: "pulih ketika ada data, alat, target, bukti kemajuan, dan kebebasan mengganti metode yang tidak efektif",
    rules: "aturan berguna selama memperlancar hasil; bila menghambat tanpa alasan, aturan itu layak ditinjau ulang",
    politics: "peka pada kapasitas institusi, data kebijakan, akuntabilitas hasil, kualitas layanan, dan jarak antara slogan dengan pelaksanaan",
    religion: "cenderung menghargai keyakinan yang tampak dalam tindakan, etos kerja, pelayanan, tanggung jawab, dan manfaat konkret",
    economy: "secara alami memperhatikan produktivitas, kompetensi, informasi pasar, biaya peluang, dan apakah sistem menghasilkan nilai nyata",
    society: "menghormati orang yang bisa membuktikan kerja, membagikan pengetahuan berguna, dan tidak bersembunyi di balik bahasa besar",
    gift: "membuat sesuatu yang rumit menjadi bisa dikerjakan",
  },
  Ti: {
    algorithm: "mencari konsistensi, definisi, hubungan struktural, kategori, dan aturan yang tidak saling bertabrakan",
    sees: "dunia sebagai sistem yang perlu dipahami dari dalam sebelum disentuh atau diubah",
    blindSpot: "bisa terus merapikan model ketika realitas sudah meminta keputusan praktis",
    blocked: "terganggu oleh istilah kabur, aturan ganda, pengecualian sembarangan, atau argumen yang berubah hanya demi menang",
    restored: "pulih saat bisa mendefinisikan masalah, membongkar asumsi, menyusun ulang struktur, dan menemukan prinsip yang konsisten",
    rules: "aturan harus punya dasar, batas, dan hubungan yang jelas; bukan sekadar perintah dari orang yang lebih keras",
    politics: "peka pada desain institusi, pembagian wewenang, konsistensi hukum, legitimasi, dan apakah struktur mencegah penyalahgunaan",
    religion: "tertarik pada doktrin, filsafat, konsistensi teologis, paradoks, dan bagaimana suatu keyakinan menyusun realitas",
    economy: "melihat nilai pada desain sistem, insentif, klasifikasi, standar, dan aturan permainan yang tidak berubah diam-diam",
    society: "cepat melihat kontradiksi norma dan biasanya ingin tahu aturan tak tertulis apa yang sebenarnya sedang bekerja",
    gift: "memberi bentuk pada kekacauan tanpa harus berteriak",
  },
  Fe: {
    algorithm: "mendeteksi suhu emosi, ekspresi, energi kelompok, dan cara mengubah suasana agar orang ikut bergerak",
    sees: "dunia sebagai arus perasaan yang bisa disuarakan, dibagi, dinaikkan, ditenangkan, atau diarahkan",
    blindSpot: "bisa menaikkan intensitas saat sebagian orang justru membutuhkan ruang yang lebih tenang dan pribadi",
    blocked: "terpukul oleh suasana beku, respons datar, emosi yang disangkal, atau kelompok yang kehilangan semangat tapi pura-pura baik-baik saja",
    restored: "pulih lewat percakapan hidup, musik, tawa, tangis yang jujur, ekspresi kreatif, dan rasa bahwa emosi boleh punya tempat",
    rules: "aturan diterima bila mampu menjaga moral kelompok, rasa keterlibatan, dan kehidupan bersama yang tidak mati rasa",
    politics: "peka pada narasi publik, simbol, emosi massa, kemampuan pemimpin menggerakkan orang, dan bagaimana ketakutan atau harapan dibentuk",
    religion: "mudah terhubung lewat nyanyian, kisah, perayaan, duka bersama, khotbah, simbol, dan rasa transenden yang dibagikan komunitas",
    economy: "melihat bahwa kepercayaan, citra, semangat, pelayanan, dan pengalaman manusia juga menggerakkan nilai ekonomi",
    society: "cepat menangkap mood kolektif dan sering sadar bahwa perubahan sosial tidak hanya bergerak lewat data, tetapi juga lewat perasaan",
    gift: "membuat orang merasa hidup dan ikut hadir",
  },
  Fi: {
    algorithm: "mendeteksi kedekatan, ketulusan, kepercayaan, niat, luka personal, dan kualitas ikatan dari orang ke orang",
    sees: "dunia sebagai jaringan hubungan yang setiap simpulnya punya sejarah, jarak, dan tanggung jawab moral sendiri",
    blindSpot: "bisa terlalu lama menilai niat atau menyimpan luka tanpa memberi orang lain kesempatan memahami batasnya",
    blocked: "terpicu oleh pengkhianatan, kepalsuan, kedekatan yang dipaksa, permainan rasa bersalah, atau orang yang menganggap semua hubungan bisa diperlakukan sama",
    restored: "pulih lewat percakapan jujur, permintaan maaf yang nyata, jarak yang dihormati, dan hubungan yang tidak menuntut topeng",
    rules: "aturan dinilai dari apakah ia adil terhadap manusia konkret dan tidak mengorbankan kepercayaan demi formalitas kosong",
    politics: "peka pada martabat, keadilan personal, loyalitas, korban yang tidak terlihat, dan dampak keputusan pada hubungan nyata",
    religion: "mudah terhubung pada suara hati, pertobatan, belas kasih, kesetiaan, tanggung jawab personal, dan hubungan manusia dengan yang sakral",
    economy: "melihat nilai pada reputasi, kepercayaan, transaksi yang adil, tanggung jawab, dan siapa yang menanggung biaya tersembunyi",
    society: "membaca kualitas hubungan di balik status publik dan cenderung tidak gampang terpesona oleh keramahan yang terasa tidak tulus",
    gift: "membuat orang merasa dilihat sebagai manusia, bukan fungsi",
  },
};

type QuadraLens = {
  world: string;
  circle: string;
  politics: string;
  sacred: string;
  economy: string;
  tension: string;
};

const QUADRA_LENS: Record<Quadra, QuadraLens> = {
  Alpha: {
    world: "hidup terasa sehat ketika orang bisa bertukar ide, bermain dengan konsep, dan menikmati kenyamanan tanpa terlalu banyak drama status",
    circle: "sirkel terbaikmu memberi ruang untuk bertanya aneh, tertawa, mengoreksi tanpa mempermalukan, dan tidak memaksa semua orang tampil keras",
    politics: "cenderung menghargai akses pengetahuan, keterbukaan diskusi, inovasi sosial, dan institusi yang tidak mematikan rasa ingin tahu",
    sacred: "makna tumbuh lewat dialog, keajaiban keseharian, pertanyaan filosofis, dan pengalaman komunitas yang hangat",
    economy: "lebih mudah tertarik pada ekonomi kreatif, pendidikan, teknologi terbuka, kesejahteraan, dan cara membuat sistem terasa lebih manusiawi",
    tension: "bisa meremehkan konflik kekuasaan nyata karena berharap percakapan rasional dan suasana baik cukup untuk menyelesaikannya",
  },
  Beta: {
    world: "hidup terasa bermakna ketika ada arah besar, peran yang jelas, keberanian, dan sesuatu yang layak diperjuangkan bersama",
    circle: "sirkel terbaikmu punya loyalitas, humor internal, keberanian saling mengingatkan, dan rasa bahwa semua orang benar-benar hadir ketika krisis datang",
    politics: "cenderung peka pada kepemimpinan, stabilitas, mobilisasi, legitimasi, keamanan, dan kekuatan narasi kolektif",
    sacred: "makna tumbuh lewat ritual, sejarah, pengorbanan, panggilan, simbol, dan pengalaman menjadi bagian dari sesuatu yang lebih besar",
    economy: "mudah melihat pentingnya infrastruktur, koordinasi besar, disiplin, kapasitas negara atau organisasi, dan pengorbanan jangka pendek untuk tujuan kolektif",
    tension: "bisa terlalu memuliakan intensitas, loyalitas, atau hierarki sampai kritik tenang dianggap kurang berkomitmen",
  },
  Gamma: {
    world: "hidup terasa jujur ketika orang bertanggung jawab atas pilihan, mampu membaca kekuasaan, dan tidak berlindung di balik idealisme tanpa biaya",
    circle: "sirkel terbaikmu kecil tetapi kuat: orang kompeten, tidak palsu, tahan tekanan, menghormati privasi, dan muncul saat benar-benar dibutuhkan",
    politics: "cenderung peka pada akuntabilitas, kepentingan nyata, korupsi kekuasaan, daya tawar, risiko, dan siapa yang membayar keputusan buruk",
    sacred: "makna sering terasa personal, intens, dan dibuktikan lewat pilihan hidup, bukan sekadar pernyataan publik",
    economy: "mudah tertarik pada investasi, strategi, kemandirian, kepemilikan, efisiensi, daya tahan, dan hasil yang tetap bernilai ketika suasana berubah",
    tension: "bisa terlalu curiga, terlalu transaksional, atau sulit menerima kelembutan yang tidak datang bersama bukti kuat",
  },
  Delta: {
    world: "hidup terasa sehat ketika orang berkembang tanpa dipaksa menjadi seragam, bekerja dengan baik, dan menjaga hubungan yang jujur",
    circle: "sirkel terbaikmu tidak heboh, tetapi aman: orang yang menghormati ritme, konsisten, mau belajar, tidak memainkan emosi, dan saling membantu secara nyata",
    politics: "cenderung peka pada kebijakan yang praktis, lokal, berkelanjutan, manusiawi, dan memberi ruang perkembangan individu",
    sacred: "makna tumbuh lewat integritas sehari-hari, kerja baik, alam, pelayanan, kesetiaan kecil, dan hidup yang tidak dibuat-buat",
    economy: "lebih mudah tertarik pada kualitas jangka panjang, keterampilan, usaha berkelanjutan, kerja adil, dan nilai yang tumbuh tanpa drama spekulatif",
    tension: "bisa terlalu menghindari benturan besar, padahal beberapa keadaan memang membutuhkan keputusan cepat dan tekanan yang tegas",
  },
};

const TEMPERAMENT_LENS: Record<Temperament, { pace: string; stress: string; advice: string }> = {
  EP: {
    pace: "bergerak lewat peluang yang muncul dan lebih hidup ketika ruang tetap terbuka",
    stress: "mudah gelisah ketika dipaksa mempertahankan satu jalur yang sudah kehilangan energi",
    advice: "buat jangkar kecil: satu proyek utama, satu tempat menyimpan ide liar, dan satu batas waktu yang benar-benar final",
  },
  IP: {
    pace: "bergerak mengikuti perubahan keadaan dan menunggu momen yang terasa tepat",
    stress: "bisa terlalu lama beradaptasi sampai keputusan penting terus bergeser",
    advice: "bedakan menunggu timing dengan menghindar; pasang satu tanda objektif kapan kamu harus bergerak",
  },
  EJ: {
    pace: "bergerak dengan mendorong proses keluar dan ingin melihat dunia merespons usahanya",
    stress: "mudah kelelahan karena merasa semua harus terus dijaga, dihidupkan, atau dituntaskan",
    advice: "jadwalkan ruang tanpa fungsi; tidak semua jam harus membuktikan kegunaanmu",
  },
  IJ: {
    pace: "bergerak dari posisi internal yang relatif stabil dan lebih suka perubahan yang punya dasar",
    stress: "bisa kaku ketika keadaan berubah sebelum kerangka batin selesai menyesuaikan",
    advice: "latih eksperimen berisiko kecil agar fleksibilitas tidak selalu terasa seperti kehilangan prinsip",
  },
};

const CLUB_LENS: Record<Club, { work: string; strengths: string; risk: string }> = {
  Researchers: {
    work: "lingkungan yang memberi masalah kompleks, ruang berpikir, dan kebebasan merancang model atau strategi",
    strengths: "analisis, abstraksi, skenario, sistem, penelitian, pemetaan risiko, dan desain konsep",
    risk: "terjebak di kepala, menunda kontak dengan pengguna nyata, atau menganggap penjelasan sama dengan penyelesaian",
  },
  Socials: {
    work: "lingkungan yang membuat hubungan, pengalaman manusia, koordinasi, dan pembacaan orang menjadi pusat",
    strengths: "jejaring, pelayanan, negosiasi, komunitas, atmosfer, kebutuhan manusia, dan hubungan",
    risk: "menguras diri demi orang lain, terlalu personal membaca penolakan, atau menghindari keputusan impersonal yang tetap perlu",
  },
  Pragmatists: {
    work: "lingkungan dengan tantangan nyata, alat, operasi, hasil, keputusan, dan ruang memperbaiki cara kerja",
    strengths: "eksekusi, sumber daya, struktur lapangan, kualitas, teknis, logistik, dan penyelesaian masalah",
    risk: "terlalu cepat memperbaiki sebelum memahami makna manusia dari masalah atau menganggap emosi sebagai gangguan saja",
  },
  Humanitarians: {
    work: "lingkungan yang memberi ruang pada makna, manusia, bahasa, pendidikan, budaya, dan perubahan personal",
    strengths: "narasi, konseling non-klinis, pendidikan, seni, komunikasi, nilai, dan pengembangan manusia",
    risk: "terlalu larut dalam kemungkinan manusia, simbol, atau perasaan sampai batas praktis terlambat dipasang",
  },
};

type CuratedProfile = {
  books: string[];
  films: string[];
  music: string[];
  careers: string[];
  destinations: string[];
  words: string[];
  gifts: string[];
  circle: string[];
  experiments: string[];
};

const CURATED: Record<TIM, CuratedProfile> = {
  ILE: {
    books: ["Gödel, Escher, Bach — Douglas Hofstadter", "The Design of Everyday Things — Don Norman", "Invisible Cities — Italo Calvino"],
    films: ["Everything Everywhere All at Once", "The Martian", "Arrival"],
    music: ["progressive electronic", "jazz fusion", "art pop eksperimental"],
    careers: ["R&D dan innovation lab", "product discovery", "arsitektur sistem", "penulis sains atau ide"],
    destinations: ["Berlin, Jerman — ekosistem ide lintas bidang", "Tokyo, Jepang — teknologi dan subkultur", "Reykjavík, Islandia — ruang kosong untuk imajinasi"],
    words: ["serendipity", "bricolage", "liminal", "emergent", "counterfactual"],
    gifts: ["kit modular atau puzzle mekanik", "buku aneh yang tidak akan ia beli sendiri", "kelas singkat topik baru", "tiket museum sains"],
    circle: ["orang yang tidak panik saat topik melompat", "teman yang bisa mengubah ide menjadi langkah", "seseorang yang mengingatkan tubuhmu untuk pulang"],
    experiments: ["selesaikan satu prototipe dalam 48 jam", "buat daftar ide yang sengaja tidak kamu kejar", "jelaskan satu teori rumit dengan benda dapur"],
  },
  SEI: {
    books: ["The Little Prince — Antoine de Saint-Exupéry", "The Art of Stillness — Pico Iyer", "Convenience Store Woman — Sayaka Murata"],
    films: ["Little Forest", "Amélie", "Perfect Days"],
    music: ["bossa nova", "dream pop lembut", "acoustic soul"],
    careers: ["hospitality dan guest experience", "kuliner atau sensory design", "community care", "visual merchandising"],
    destinations: ["Kyoto, Jepang — detail, ritme, dan ketenangan", "Ubud, Indonesia — tubuh, alam, dan seni", "Copenhagen, Denmark — desain hidup manusiawi"],
    words: ["hygge", "savor", "tenderness", "ease", "afterglow"],
    gifts: ["selimut atau tekstil berkualitas", "makanan buatan tangan", "aroma yang dipilih personal", "hari tanpa agenda"],
    circle: ["orang hangat tanpa drama", "teman yang membawa ide segar", "seseorang yang menghormati ritmemu"],
    experiments: ["buat satu sudut rumah yang benar-benar memulihkan", "katakan tidak sebelum tubuhmu harus berteriak", "adakan makan kecil untuk tiga orang favorit"],
  },
  ESE: {
    books: ["The Art of Gathering — Priya Parker", "Humankind — Rutger Bregman", "The Book of Delights — Ross Gay"],
    films: ["Paddington 2", "The Intouchables", "Mamma Mia!"],
    music: ["soul-pop", "disco klasik", "musical theatre"],
    careers: ["event dan community experience", "public relations", "hospitality leadership", "pendidikan berbasis interaksi"],
    destinations: ["Lisbon, Portugal — warna dan kehidupan jalanan", "Naples, Italia — ekspresi dan rasa", "Bangkok, Thailand — energi sosial dan kuliner"],
    words: ["effervescence", "convivial", "radiance", "uplift", "warmth"],
    gifts: ["album foto bersama", "peralatan menjamu tamu", "tiket konser", "surprise gathering kecil"],
    circle: ["orang yang menerima energimu tanpa mengeksploitasinya", "teman yang membantu struktur", "seseorang yang berani berkata kamu boleh istirahat"],
    experiments: ["adakan pertemuan dengan batas waktu jelas", "biarkan orang lain merawatmu satu hari", "buat daftar emosi yang tidak perlu langsung kamu perbaiki"],
  },
  LII: {
    books: ["The Structure of Scientific Revolutions — Thomas Kuhn", "Justice — Michael Sandel", "The Name of the Rose — Umberto Eco"],
    films: ["12 Angry Men", "Primer", "The Imitation Game"],
    music: ["minimal classical", "ambient electronic", "post-rock instrumental"],
    careers: ["research dan methodology", "policy architecture", "data governance", "software atau systems design"],
    destinations: ["Vienna, Austria — sistem dan sejarah ide", "Helsinki, Finlandia — desain institusi manusiawi", "Cambridge, Inggris — tradisi intelektual"],
    words: ["axiom", "taxonomy", "coherence", "parsimony", "boundary condition"],
    gifts: ["edisi anotasi buku penting", "alat tulis presisi", "puzzle logika", "akses kursus mendalam"],
    circle: ["orang yang bisa berbeda pendapat tanpa menyerang", "teman ekspresif yang menghidupkan suasana", "seseorang yang membantu teori menyentuh kenyataan"],
    experiments: ["ambil keputusan saat model baru 80% lengkap", "jelaskan batas tanpa membuat kuliah", "uji satu prinsip di kehidupan nyata selama tujuh hari"],
  },
  SLE: {
    books: ["Meditations — Marcus Aurelius", "The Strategy of Conflict — Thomas Schelling", "The Old Man and the Sea — Ernest Hemingway"],
    films: ["Mad Max: Fury Road", "Gladiator", "Moneyball"],
    music: ["industrial rock", "cinematic percussion", "hard-hitting hip-hop"],
    careers: ["operations leadership", "crisis management", "entrepreneurship", "negotiation dan field strategy"],
    destinations: ["Istanbul, Türkiye — sejarah kekuasaan dan pertemuan dunia", "Cape Town, Afrika Selatan — lanskap dan keberanian", "Seoul, Korea Selatan — kecepatan dan disiplin"],
    words: ["leverage", "fortitude", "decisive", "threshold", "command presence"],
    gifts: ["peralatan premium yang tahan lama", "pengalaman fisik menantang", "jam atau tas fungsional", "tiket pertandingan"],
    circle: ["orang loyal yang tidak rapuh", "teman visioner yang membaca timing", "seseorang yang berani memberi batas balik"],
    experiments: ["tunda respons keras selama sembilan puluh detik", "tanyakan apa yang ingin dilindungi sebelum menyerang", "latih menerima bantuan tanpa menguji orangnya dulu"],
  },
  IEI: {
    books: ["The Waves — Virginia Woolf", "Man's Search for Meaning — Viktor Frankl", "The Master and Margarita — Mikhail Bulgakov"],
    films: ["In the Mood for Love", "Portrait of a Lady on Fire", "The Green Knight"],
    music: ["ethereal wave", "cinematic ambient", "dark art pop"],
    careers: ["penulis dan screenwriting", "brand narrative", "creative direction", "cultural research"],
    destinations: ["Prague, Ceko — simbol dan sejarah", "Edinburgh, Skotlandia — atmosfer cerita", "Istanbul, Türkiye — lapisan waktu"],
    words: ["premonition", "reverie", "elegiac", "ineffable", "zeitgeist"],
    gifts: ["buku puisi dengan catatan personal", "parfum atmosferik", "kamera analog", "tiket pertunjukan"],
    circle: ["orang tegas yang membuatmu merasa aman bergerak", "teman yang tidak menertawakan intuisi", "seseorang yang membantu makna menjadi keputusan"],
    experiments: ["ubah satu firasat menjadi prediksi yang bisa diuji", "buat deadline yang dilindungi orang lain", "pisahkan tanda nyata dari suasana hati"],
  },
  EIE: {
    books: ["The Hero with a Thousand Faces — Joseph Campbell", "The Fire Next Time — James Baldwin", "Antigone — Sophocles"],
    films: ["The Lives of Others", "Black Swan", "Dead Poets Society"],
    music: ["dramatic orchestral", "gospel dan choral", "theatrical art rock"],
    careers: ["public communication", "advocacy", "performing arts", "campaign dan narrative strategy"],
    destinations: ["Athens, Yunani — tragedi, politik, dan simbol", "Buenos Aires, Argentina — ekspresi dan budaya", "Warsaw, Polandia — sejarah dan ketahanan"],
    words: ["catharsis", "rhetoric", "pathos", "prophetic", "gravitas"],
    gifts: ["mikrofon atau alat rekam", "tiket teater", "jurnal premium", "benda simbolik dengan cerita"],
    circle: ["orang yang tahan intensitas tanpa ikut membakar", "teman struktural yang jernih", "seseorang yang mengingatkan tubuh dan batas"],
    experiments: ["turunkan volume tanpa mengurangi kejujuran", "tulis dua tafsir alternatif sebelum menyimpulkan", "jadwalkan hari tanpa peran publik"],
  },
  LSI: {
    books: ["The Rule of Law — Tom Bingham", "The Art of War — Sun Tzu", "The Trial — Franz Kafka"],
    films: ["Tinker Tailor Soldier Spy", "Sicario", "A Few Good Men"],
    music: ["dark classical", "military ambient", "precise techno"],
    careers: ["compliance dan governance", "security architecture", "quality assurance", "operations control"],
    destinations: ["Tallinn, Estonia — struktur digital dan sejarah", "Berlin, Jerman — sistem dan memori", "Zurich, Swiss — presisi dan tata kelola"],
    words: ["protocol", "integrity", "jurisdiction", "fortification", "precedent"],
    gifts: ["alat presisi", "buku sejarah strategi", "organizer berkualitas", "pengalaman latihan keterampilan"],
    circle: ["orang setia dan jelas", "teman ekspresif yang membawa makna", "seseorang yang tidak mempermainkan aturan"],
    experiments: ["buat satu aturan yang punya mekanisme pengecualian", "minta kebutuhanmu tanpa memberi tes tersembunyi", "latih perubahan kecil yang tidak mengancam prinsip"],
  },
  SEE: {
    books: ["The Prince — Niccolò Machiavelli", "Influence — Robert Cialdini", "The Talented Mr. Ripley — Patricia Highsmith"],
    films: ["Ocean's Eleven", "The Favourite", "Erin Brockovich"],
    music: ["confident R&B", "dance-pop", "Latin pop"],
    careers: ["business development", "talent dan partnerships", "sales strategy", "public-facing entrepreneurship"],
    destinations: ["Milan, Italia — gaya dan jaringan", "Dubai, UEA — ambisi dan daya tawar", "Rio de Janeiro, Brasil — energi sosial"],
    words: ["charisma", "reciprocity", "alliance", "magnetism", "social capital"],
    gifts: ["aksesori statement", "dinner di tempat spesial", "pengalaman VIP", "hadiah personal yang menunjukkan kamu memperhatikan"],
    circle: ["orang kompeten yang tidak mudah dipengaruhi", "teman strategis yang membaca masa depan", "seseorang yang loyal tanpa posesif"],
    experiments: ["bedakan kedekatan dari pengaruh", "beri tanpa menciptakan utang emosi", "biarkan satu orang melihat keraguanmu tanpa performa"],
  },
  ILI: {
    books: ["The Black Swan — Nassim Nicholas Taleb", "Thinking in Systems — Donella Meadows", "The Remains of the Day — Kazuo Ishiguro"],
    films: ["Blade Runner 2049", "No Country for Old Men", "Margin Call"],
    music: ["dark ambient", "trip-hop", "minimal techno"],
    careers: ["risk analysis", "strategy dan forecasting", "investment research", "systems intelligence"],
    destinations: ["London, Inggris — sejarah pasar dan institusi", "Tallinn, Estonia — masa depan digital", "Patagonia, Argentina/Chile — jarak dan perspektif"],
    words: ["asymmetry", "entropy", "second-order effect", "antifragile", "horizon"],
    gifts: ["buku analisis mendalam", "alat berkualitas tanpa gimmick", "headphone bagus", "perjalanan sunyi"],
    circle: ["orang berani yang bisa mengeksekusi", "teman yang menghargai diam", "seseorang yang tidak memaksa optimisme palsu"],
    experiments: ["catat satu prediksi beserta batas waktunya", "uji kemungkinan baik sekeras kamu menguji risiko", "ambil satu tindakan sebelum semua konsekuensi selesai dipetakan"],
  },
  LIE: {
    books: ["The Effective Executive — Peter Drucker", "Good Strategy Bad Strategy — Richard Rumelt", "The Innovator's Dilemma — Clayton Christensen"],
    films: ["The Social Network", "Ford v Ferrari", "Apollo 13"],
    music: ["driving electronic", "arena rock", "focus techno"],
    careers: ["venture building", "strategy consulting", "operations scaling", "technology leadership"],
    destinations: ["Singapore — sistem dan kecepatan", "New York, AS — ambisi dan jaringan", "Shenzhen, Tiongkok — eksekusi teknologi"],
    words: ["scalability", "runway", "trajectory", "compounding", "throughput"],
    gifts: ["alat produktivitas premium", "akses konferensi", "buku strategi", "pengalaman yang menghemat waktu"],
    circle: ["orang setia yang berani menahanmu", "teman yang menjaga realitas emosional", "seseorang yang kompeten tanpa permainan status"],
    experiments: ["ukur pemulihan seperti kamu mengukur hasil", "adakan satu percakapan tanpa agenda", "batasi satu proyek agar hidupmu tidak menjadi seluruhnya proyek"],
  },
  ESI: {
    books: ["The Ethics of Ambiguity — Simone de Beauvoir", "A Man Called Ove — Fredrik Backman", "The Crucible — Arthur Miller"],
    films: ["A Separation", "Promising Young Woman", "The Secret in Their Eyes"],
    music: ["intimate singer-songwriter", "dark folk", "soul ballad"],
    careers: ["ethics dan safeguarding", "investigative work", "people risk", "client trust dan advocacy"],
    destinations: ["Kraków, Polandia — memori dan nilai", "Kyoto, Jepang — batas, ritual, dan ketulusan", "Tbilisi, Georgia — keramahan dan loyalitas"],
    words: ["fidelity", "boundary", "redress", "discernment", "moral injury"],
    gifts: ["surat personal yang jujur", "benda tahan lama", "hadiah yang mengingat detail kecil", "waktu privat tanpa gangguan"],
    circle: ["orang yang konsisten", "teman produktif yang bisa diandalkan", "seseorang yang tidak memaksa kamu cepat percaya"],
    experiments: ["ucapkan batas sebelum berubah menjadi hukuman diam", "bedakan kesalahan dari pengkhianatan", "beri ruang pada niat baik yang belum sempurna"],
  },
  IEE: {
    books: ["The Artist's Way — Julia Cameron", "Braiding Sweetgrass — Robin Wall Kimmerer", "The Unbearable Lightness of Being — Milan Kundera"],
    films: ["Frances Ha", "The Secret Life of Walter Mitty", "Before Sunrise"],
    music: ["indie folk", "eclectic pop", "world fusion"],
    careers: ["creative facilitation", "talent development", "community innovation", "writing dan interviewing"],
    destinations: ["Melbourne, Australia — budaya kreatif", "Lisbon, Portugal — pertemuan dan ritme", "Mexico City, Meksiko — warna dan kemungkinan"],
    words: ["becoming", "kinship", "possibility space", "kaleidoscopic", "unfurl"],
    gifts: ["kelas kreatif", "buku yang dipilih berdasarkan potensi", "road trip spontan", "alat untuk hobi baru"],
    circle: ["orang unik yang tidak sinis", "teman praktis yang membantu membumikan", "seseorang yang menghormati kebebasan dan kedekatan sekaligus"],
    experiments: ["pilih satu versi diri untuk dilatih tiga puluh hari", "selesaikan percakapan sulit tanpa membuka topik baru", "buat kalender pemulihan setelah terlalu banyak manusia"],
  },
  SLI: {
    books: ["Zen and the Art of Motorcycle Maintenance — Robert Pirsig", "Shop Class as Soulcraft — Matthew Crawford", "Walden — Henry David Thoreau"],
    films: ["Paterson", "The Straight Story", "Chef"],
    music: ["lo-fi instrumental", "roots rock", "ambient folk"],
    careers: ["product quality", "craft dan technical design", "field engineering", "sustainable operations"],
    destinations: ["Hokkaido, Jepang — alam dan kualitas", "Slovenia — tenang dan fungsional", "New Zealand — ruang dan keterampilan luar"],
    words: ["craftsmanship", "tactile", "frictionless", "stewardship", "calibration"],
    gifts: ["alat yang benar-benar bagus", "makanan berkualitas", "jaket atau sepatu tahan lama", "waktu bebas tanpa agenda sosial"],
    circle: ["orang hangat tetapi tidak menuntut", "teman penuh ide", "seseorang yang menghargai kontribusi diam"],
    experiments: ["jelaskan kebutuhan sebelum diam-diam memperbaiki semuanya", "biarkan satu proyek terlihat meski belum sempurna", "jadwalkan eksplorasi yang tidak punya kegunaan langsung"],
  },
  LSE: {
    books: ["The Checklist Manifesto — Atul Gawande", "The Goal — Eliyahu Goldratt", "Factfulness — Hans Rosling"],
    films: ["Hidden Figures", "The Founder", "The Intern"],
    music: ["upbeat classic rock", "focus playlists", "clean pop production"],
    careers: ["operations management", "supply chain", "quality systems", "public service delivery"],
    destinations: ["Zurich, Swiss — keteraturan dan kualitas", "Singapore — operasi publik", "Munich, Jerman — industri dan kenyamanan"],
    words: ["reliability", "workflow", "maintenance", "service level", "operational excellence"],
    gifts: ["organizer premium", "alat rumah tangga berkualitas", "kursus skill praktis", "pengalaman yang terencana rapi"],
    circle: ["orang yang menepati janji", "teman yang membawa kemungkinan baru", "seseorang yang melihat kasih di balik tindakanmu"],
    experiments: ["tanyakan perasaan sebelum menawarkan solusi", "sisakan satu blok waktu tanpa target", "izinkan metode orang lain berbeda selama hasil dan batas aman terpenuhi"],
  },
  EII: {
    books: ["The Brothers Karamazov — Fyodor Dostoevsky", "Gilead — Marilynne Robinson", "The Gifts of Imperfection — Brené Brown"],
    films: ["Ikiru", "The Quiet Girl", "A Beautiful Day in the Neighborhood"],
    music: ["chamber folk", "piano ballad", "gentle indie"],
    careers: ["education dan mentoring", "ethics dan social impact", "writing dan editing", "people development"],
    destinations: ["Assisi, Italia — kesederhanaan dan spiritualitas", "Edinburgh, Skotlandia — sastra dan keheningan", "Yogyakarta, Indonesia — budaya dan pembelajaran"],
    words: ["conscience", "grace", "reparation", "attunement", "moral imagination"],
    gifts: ["buku dengan dedikasi personal", "surat panjang", "barang buatan tangan", "waktu tenang berdua"],
    circle: ["orang lembut tetapi kompeten", "teman yang mendorong tanpa memaksa", "seseorang yang tidak mengejek idealismemu"],
    experiments: ["ubah belas kasih menjadi batas yang jelas", "tanyakan fakta sebelum menafsirkan niat", "buat satu keputusan tegas tanpa meminta semua orang memahami"],
  },
};


type EditorialProfile = {
  title: string;
  subtitle: string;
  tags: string[];
  expert: string;
  simple: string;
  stereotype: string;
  misunderstood: string;
  emotionalPattern: string;
  relationshipStyle: string;
  loveStyle: string;
  blindspot: string;
  advice: string[];
};

const TYPE_EDITORIAL: Record<TIM, EditorialProfile> = {
  ILE: {
    title: "Penjelajah ide yang sulit dikurung satu jawaban",
    subtitle: "Cepat melihat kemungkinan, senang menghubungkan hal yang tidak terlihat nyambung, lalu memakai logika untuk menguji mana yang layak diteruskan.",
    tags: ["penasaran", "eksperimental", "argumentatif", "cepat bosan"],
    expert: "Dalam Model A, Ne berada di posisi Base dan Ti di Creative. Pola ini biasanya menghasilkan perhatian yang cepat menangkap potensi, disusul dorongan untuk menyusun kerangka yang masuk akal.",
    simple: "Kamu biasanya melihat opsi dulu, baru memikirkan sistemnya. Masalahnya, pilihan baru bisa terasa lebih menarik daripada menyelesaikan pilihan lama.",
    stereotype: "Sering digambarkan sebagai orang yang punya 17 tab terbuka, tiga proyek setengah jadi, dan satu teori yang dijelaskan dengan terlalu semangat.",
    misunderstood: "Orang bisa mengira kamu tidak serius, padahal kamu serius pada eksplorasi—bukan selalu pada bentuk final pertama.",
    emotionalPattern: "Kamu mudah hidup saat ada kebebasan berpikir. Kamu lebih cepat kesal saat ide dipotong terlalu dini, orang menutup kemungkinan, atau kamu dipaksa mengikuti rutinitas tanpa alasan jelas.",
    relationshipStyle: "Kamu butuh orang yang bisa mengikuti lompatan pikiran tanpa menuntut semua obrolan rapi. Kamu tetap berkembang paling baik bersama orang yang berani membantu memilih prioritas.",
    loveStyle: "Kamu menunjukkan perhatian lewat ide, humor, rekomendasi, dan membuka pengalaman baru. Kamu biasanya merasa disayang saat orang memberi ketenangan praktis tanpa mematikan kebebasanmu.",
    blindspot: "Kamu bisa menganggap ide yang menarik sebagai ide yang penting, menunda keputusan, atau mengabaikan sinyal tubuh sampai energi benar-benar habis.",
    advice: ["Pilih satu proyek yang harus selesai sebelum membuka proyek besar baru.", "Simpan ide liar di satu tempat, jangan semuanya langsung dijalankan.", "Tanya: ini peluang nyata atau cuma stimulasi baru?"],
  },
  SEI: {
    title: "Pencipta kenyamanan yang membaca suasana lewat detail kecil",
    subtitle: "Peka pada kualitas pengalaman, kondisi tubuh, dan perubahan mood orang; biasanya lebih kuat mengatur suasana daripada menjelaskan prosesnya.",
    tags: ["hangat", "adaptif", "sensitif suasana", "menghindari tekanan"],
    expert: "Si Base memberi perhatian pada kualitas pengalaman langsung, sedangkan Fe Creative membantu menyesuaikan ekspresi dan suasana sosial secara fleksibel.",
    simple: "Kamu cepat tahu mana yang bikin suasana enak atau melelahkan. Kamu juga bisa membuat orang lebih santai tanpa perlu menguasai ruangan.",
    stereotype: "Sering dianggap chill, suka makanan enak, dan selalu tahu tempat paling nyaman—meski sebenarnya kamu juga punya batas yang cukup tegas.",
    misunderstood: "Sikap tenangmu bisa dianggap pasif. Padahal kamu sering sedang mengamati kondisi dan memilih cara paling halus agar keadaan tidak makin kasar.",
    emotionalPattern: "Kamu lebih mudah terganggu oleh tekanan, nada kasar, lingkungan tidak nyaman, atau konflik yang tidak punya jeda. Emosimu sering terasa dulu di tubuh.",
    relationshipStyle: "Kamu suka relasi yang hangat, tidak memaksa, dan punya ruang bernapas. Kamu cenderung menjauh kalau kedekatan berubah menjadi kontrol atau tuntutan terus-menerus.",
    loveStyle: "Kamu menunjukkan sayang lewat perhatian kecil, makanan, suasana, sentuhan aman, dan membuat orang merasa diterima. Kamu butuh pasangan yang memberi arah tanpa meremehkan ritmemu.",
    blindspot: "Kamu bisa terlalu lama menunggu keadaan terasa nyaman, sulit menegaskan keinginan, atau membiarkan masalah tumbuh karena tidak mau merusak suasana.",
    advice: ["Nyatakan kebutuhan sebelum tubuhmu mulai protes.", "Bedakan damai dengan menunda konflik.", "Pasang satu batas sederhana dan pertahankan tanpa meminta maaf berlebihan."],
  },
  ESE: {
    title: "Penggerak suasana yang membuat orang merasa ikut terlibat",
    subtitle: "Cepat membaca energi sosial, memberi respons emosional yang jelas, lalu memakai perhatian praktis untuk menjaga orang tetap nyaman.",
    tags: ["ekspresif", "peduli", "aktif", "mudah terkuras"],
    expert: "Fe Base membuat dinamika emosi kelompok cepat masuk radar, sementara Si Creative membantu mengubah perhatian itu menjadi pengalaman yang lebih nyaman dan manusiawi.",
    simple: "Kamu biasanya tahu suasana sedang hidup atau mati. Kamu juga cenderung langsung melakukan sesuatu supaya orang merasa lebih diterima.",
    stereotype: "Sering digambarkan sebagai host grup, pengirim chat panjang, atau orang yang ingat ulang tahun dan tahu siapa yang sedang murung.",
    misunderstood: "Ekspresimu bisa dianggap dramatis, padahal sering kali itu cara kamu memberi sinyal yang jelas agar orang tidak perlu menebak-nebak suasana.",
    emotionalPattern: "Kamu mudah terpancing oleh sikap dingin, ketidakpedulian, atau orang yang menolak berpartisipasi tetapi tetap mengeluh. Penolakan sosial bisa terasa lebih berat daripada yang terlihat.",
    relationshipStyle: "Kamu memberi banyak energi pada relasi. Kamu butuh orang yang menghargai perhatianmu, tetapi juga berani mengingatkan saat kamu terlalu mengurus semua orang.",
    loveStyle: "Kamu menunjukkan sayang secara terbuka, merawat detail, dan menciptakan momen. Kamu merasa aman saat pasangan konsisten, responsif, dan tidak membuatmu memikul semua kerja emosional.",
    blindspot: "Kamu bisa mengira semua masalah perlu dibicarakan saat itu juga, mengorbankan diri demi suasana, atau mengambil respons orang terlalu personal.",
    advice: ["Tanya apakah orang butuh didengar atau dibantu.", "Jangan pakai kehangatan sebagai kewajiban permanen.", "Sisakan waktu tanpa harus menjadi pusat energi kelompok."],
  },
  LII: {
    title: "Penyusun sistem yang ingin semuanya masuk akal",
    subtitle: "Mencari konsistensi, definisi, dan struktur yang bersih; memakai kemungkinan baru untuk menguji apakah sebuah sistem benar-benar tahan banting.",
    tags: ["analitis", "independen", "presisi", "terlihat dingin"],
    expert: "Ti Base berfokus pada koherensi internal, sedangkan Ne Creative membantu membuka alternatif dan menguji batas model yang sedang dipakai.",
    simple: "Kamu tidak puas dengan jawaban yang cuma terdengar benar. Kamu ingin tahu apakah logikanya tetap bekerja saat dibawa ke kasus lain.",
    stereotype: "Sering digambarkan sebagai manusia Wikipedia, korektor definisi, atau orang yang bisa mengubah obrolan santai menjadi seminar mini.",
    misunderstood: "Keinginanmu memperjelas konsep bisa dianggap mencari kesalahan orang, padahal kamu sering hanya ingin semua orang memakai makna yang sama.",
    emotionalPattern: "Kamu mudah tegang saat dipaksa bereaksi cepat secara emosional, menghadapi tekanan langsung, atau diminta menerima aturan yang kontradiktif.",
    relationshipStyle: "Kamu nyaman bersama orang yang jujur secara intelektual dan tidak memainkan kode sosial berlebihan. Kedekatan tumbuh lewat kepercayaan, konsistensi, dan obrolan yang punya isi.",
    loveStyle: "Kamu menunjukkan perhatian lewat pemecahan masalah, penjelasan, dan kesediaan memahami dunia orang lain. Kamu butuh kehangatan yang tidak menuntut performa sosial terus-menerus.",
    blindspot: "Kamu bisa terlalu lama menyempurnakan model, mengabaikan kekuasaan nyata, atau menganggap emosi sebagai data yang kurang rapi sehingga terlambat ditangani.",
    advice: ["Uji teori dengan satu tindakan kecil.", "Jelaskan tujuanmu sebelum mengoreksi detail.", "Akui emosi sebagai informasi, meski bentuknya tidak rapi."],
  },
  EIE: {
    title: "Pembaca arah sosial yang kuat pada narasi dan emosi",
    subtitle: "Menangkap perubahan mood, simbol, dan momentum; sering mampu membuat orang merasa sebuah isu punya arti yang lebih besar.",
    tags: ["intens", "visioner", "persuasif", "mudah overthinking"],
    expert: "Fe Base menempatkan dinamika emosi sebagai pusat perhatian, sementara Ni Creative membantu menyusun arah, makna, dan konsekuensi jangka panjang.",
    simple: "Kamu cepat menangkap apa yang sedang dirasakan banyak orang dan ke mana suasananya bergerak. Kamu juga punya dorongan untuk memberi makna pada semua itu.",
    stereotype: "Sering dianggap tokoh utama, pembuat pidato, atau orang yang bisa mengubah satu kejadian kecil menjadi analisis satu musim penuh.",
    misunderstood: "Intensitasmu bisa dianggap manipulatif. Padahal sering kali kamu memang merasakan pentingnya sesuatu lebih cepat dan ingin orang lain ikut melihatnya.",
    emotionalPattern: "Kamu mudah terpicu oleh pengabaian, pengkhianatan narasi, ketidakpedulian moral, atau keadaan yang terasa menuju arah buruk. Emosi bisa menguat saat tidak punya saluran ekspresi.",
    relationshipStyle: "Kamu butuh relasi yang punya kedalaman, keberanian emosional, dan tujuan. Kamu mudah bosan pada hubungan yang terasa datar tetapi juga mudah lelah pada drama tanpa arah.",
    loveStyle: "Kamu menunjukkan cinta lewat perhatian emosional, makna, dan dukungan pada perjalanan hidup seseorang. Kamu butuh ketegasan yang aman, bukan pasangan yang kabur setiap situasi menjadi intens.",
    blindspot: "Kamu bisa terlalu percaya pada satu narasi, membaca motif secara berlebihan, atau menaikkan intensitas sebelum memastikan fakta dasar.",
    advice: ["Pisahkan fakta, tafsir, dan prediksi.", "Jangan menguji cinta lewat krisis buatan.", "Cari satu tindakan konkret setelah analisis emosional selesai."],
  },
  LSI: {
    title: "Penjaga struktur yang serius pada batas dan tanggung jawab",
    subtitle: "Mencari aturan yang konsisten, posisi yang jelas, dan tindakan yang bisa ditegakkan—terutama saat keadaan mulai kacau.",
    tags: ["disiplin", "tegas", "loyal", "sulit fleksibel"],
    expert: "Ti Base mengatur kerangka dan konsistensi, sedangkan Se Creative memberi kemampuan menegakkan batas serta mendorong tindakan saat struktur perlu dijaga.",
    simple: "Kamu ingin semua orang tahu aturan mainnya. Kalau aturan itu masuk akal, kamu bisa sangat konsisten menjaganya.",
    stereotype: "Sering disebut polisi grup, penjaga SOP, atau orang yang diam-diam sudah menilai siapa yang bisa dipercaya saat keadaan genting.",
    misunderstood: "Ketegasanmu bisa dianggap ingin mengontrol, padahal kamu sering sedang berusaha membuat tanggung jawab tidak dilempar ke orang yang salah.",
    emotionalPattern: "Kamu mudah marah pada ketidakjelasan, pelanggaran batas, ketidakdisiplinan, atau orang yang menghindari konsekuensi. Perubahan mendadak bisa membuatmu defensif.",
    relationshipStyle: "Kamu menghargai loyalitas, komitmen, dan orang yang tidak berubah sikap hanya karena suasana. Kamu sulit santai bersama orang yang terus menguji batas.",
    loveStyle: "Kamu menunjukkan cinta lewat perlindungan, konsistensi, dan kehadiran saat sulit. Kamu butuh pasangan yang memberi kehangatan tanpa meremehkan prinsipmu.",
    blindspot: "Kamu bisa terlalu kaku, menganggap tekanan sebagai solusi utama, atau menilai orang sebelum memahami konteks emosional dan perubahan keadaan.",
    advice: ["Tentukan aturan mana yang prinsip dan mana yang cuma kebiasaan.", "Tanya konteks sebelum memberi konsekuensi.", "Latih fleksibilitas pada hal kecil supaya tidak terasa seperti kehilangan kendali."],
  },
  SLE: {
    title: "Pengambil posisi yang cepat membaca kekuatan nyata",
    subtitle: "Melihat siapa memegang kendali, apa yang bisa digerakkan sekarang, dan langkah mana yang memberi hasil langsung.",
    tags: ["berani", "taktis", "langsung", "bisa terlalu menekan"],
    expert: "Se Base menyorot batas, daya, dan tindakan nyata, sementara Ti Creative membantu menyusun taktik serta struktur yang membuat tekanan tetap terarah.",
    simple: "Kamu cepat tahu siapa yang ragu, apa yang macet, dan bagian mana yang perlu didorong. Kamu tidak betah hanya membahas masalah.",
    stereotype: "Sering digambarkan sebagai boss energy, manusia kompetisi, atau orang yang masuk ruangan dan langsung tahu posisi semua orang.",
    misunderstood: "Gaya langsungmu bisa dianggap kasar, padahal kamu sering percaya kejelasan lebih menghormati orang daripada sinyal yang dibuat samar.",
    emotionalPattern: "Kamu mudah terpicu oleh kelemahan yang dipakai sebagai alasan, sikap pasif-agresif, atau orang yang menantang batas tanpa siap menanggung akibat.",
    relationshipStyle: "Kamu menghargai orang kuat yang tidak mudah goyah tetapi tetap jujur. Kamu tidak butuh pasangan yang selalu setuju; kamu butuh orang yang jelas dan tahan dialog keras.",
    loveStyle: "Kamu menunjukkan sayang lewat perlindungan, tindakan, dan membuat masalah terasa bisa ditangani. Kamu butuh seseorang yang membantu membaca timing dan dampak emosional.",
    blindspot: "Kamu bisa bergerak terlalu cepat, mengira semua orang termotivasi oleh tantangan, atau memakai tekanan saat sebenarnya orang butuh waktu dan informasi.",
    advice: ["Tanya izin sebelum mengambil alih.", "Bedakan orang yang takut dengan orang yang tidak peduli.", "Nilai kemenangan dari dampak jangka panjang, bukan cuma hasil cepat."],
  },
  IEI: {
    title: "Pembaca makna yang peka pada arah dan suasana",
    subtitle: "Menangkap tema tersembunyi, perubahan momentum, dan emosi yang belum diucapkan; sering kuat dalam bahasa, simbol, dan intuisi sosial.",
    tags: ["imajinatif", "peka", "mendalam", "mudah menghindar"],
    expert: "Ni Base berfokus pada arah dan perkembangan makna, sedangkan Fe Creative membantu mengekspresikan atau menyesuaikan suasana agar pesan terasa hidup.",
    simple: "Kamu sering tahu sesuatu sedang berubah sebelum bisa menjelaskan buktinya. Kamu juga mudah menangkap nada emosional di balik kata-kata.",
    stereotype: "Sering digambarkan sebagai playlist sedih berjalan, pembaca tarot grup, atau orang yang melihat foreshadowing di semua hal.",
    misunderstood: "Sikap menunggumu bisa dianggap malas. Padahal kamu sering sedang membaca timing atau menunggu gambaran terasa cukup jelas.",
    emotionalPattern: "Kamu mudah terseret oleh suasana, kemungkinan buruk, kehilangan makna, atau relasi yang terasa berubah tanpa penjelasan. Tekanan langsung bisa membuatmu makin menarik diri.",
    relationshipStyle: "Kamu butuh kedekatan emosional, rasa dipahami, dan orang yang tidak menertawakan intuisi. Kamu tetap perlu orang yang membantu mengubah perasaan menjadi keputusan.",
    loveStyle: "Kamu menunjukkan cinta lewat perhatian pada detail emosional, simbol personal, dan pemahaman mendalam. Kamu butuh pasangan yang konsisten dan berani hadir di dunia nyata.",
    blindspot: "Kamu bisa terlalu lama hidup dalam tafsir, memprediksi penolakan tanpa bertanya, atau memakai mood sebagai bukti bahwa sebuah cerita pasti benar.",
    advice: ["Tulis fakta sebelum menyusun makna.", "Buat batas waktu untuk menunggu timing.", "Ambil satu tindakan fisik saat pikiran mulai berputar terlalu jauh."],
  },
  SEE: {
    title: "Pembaca manusia yang berani mengambil ruang",
    subtitle: "Cepat membaca daya tarik, hubungan, batas, dan pengaruh; biasanya tahu cara mendekat, menekan, atau menjaga jarak sesuai situasi.",
    tags: ["karismatik", "adaptif", "protektif", "intens"],
    expert: "Se Base memberi kepekaan pada daya dan posisi, sedangkan Fi Creative membantu membaca kedekatan, loyalitas, dan batas personal secara fleksibel.",
    simple: "Kamu cepat tahu siapa yang tulus, siapa yang ragu, dan kapan harus maju. Kamu cenderung bertindak berdasarkan hubungan nyata, bukan teori abstrak.",
    stereotype: "Sering dilihat sebagai social powerhouse, orang yang punya koneksi di mana-mana, atau teman yang siap membela kamu tanpa banyak rapat.",
    misunderstood: "Kepercayaan dirimu bisa dianggap dangkal. Padahal kamu sering membaca risiko sosial dan loyalitas dengan sangat serius.",
    emotionalPattern: "Kamu mudah terpicu oleh penghinaan, pengkhianatan, sikap pengecut, atau orang yang memanfaatkan kedekatan. Rasa sayang dan marah bisa sama-sama kuat.",
    relationshipStyle: "Kamu butuh relasi yang jelas, hidup, dan punya bukti tindakan. Kamu sulit percaya pada orang yang banyak bicara tetapi tidak hadir saat dibutuhkan.",
    loveStyle: "Kamu menunjukkan cinta lewat keberanian, perhatian personal, hadiah, dan perlindungan. Kamu butuh orang yang membantu melihat konsekuensi jangka panjang tanpa menggurui.",
    blindspot: "Kamu bisa terlalu cepat menilai loyalitas, mengambil keputusan emosional saat terluka, atau mengira daya tarik dan kedekatan selalu berarti arah yang sama.",
    advice: ["Tunda keputusan besar saat harga diri sedang terluka.", "Bedakan chemistry dengan kompatibilitas.", "Tanya apa yang akan kamu pikirkan tentang pilihan ini enam bulan lagi."],
  },
  ILI: {
    title: "Analis arah yang peka pada risiko dan konsekuensi",
    subtitle: "Menangkap pola perkembangan, titik lemah, dan hal yang kemungkinan gagal; memakai fakta praktis untuk memeriksa apakah prediksi itu masuk akal.",
    tags: ["strategis", "skeptis", "mandiri", "terlihat pesimis"],
    expert: "Ni Base membaca arah waktu dan konsekuensi, sementara Te Creative membantu memeriksa prediksi lewat fakta, efisiensi, dan informasi yang dapat dipakai.",
    simple: "Kamu cepat melihat apa yang tidak akan bertahan. Kamu biasanya lebih tertarik pada keputusan yang masuk akal dalam jangka panjang daripada semangat sesaat.",
    stereotype: "Sering dianggap doomer pintar, investor grup, atau orang yang bilang ‘aku sudah bilang’ setelah semua risiko yang diabaikan benar-benar terjadi.",
    misunderstood: "Kehati-hatianmu bisa dianggap negatif, padahal kamu sering sedang melindungi waktu dan sumber daya dari keputusan yang terlalu optimistis.",
    emotionalPattern: "Kamu mudah lelah oleh tuntutan sosial berlebihan, optimisme kosong, tekanan untuk bereaksi cepat, atau orang yang mengabaikan data dan konsekuensi.",
    relationshipStyle: "Kamu menghargai kemandirian, kecerdasan, dan orang yang tidak memaksa kedekatan. Kepercayaan tumbuh perlahan tetapi biasanya sangat serius.",
    loveStyle: "Kamu menunjukkan sayang lewat peringatan, perencanaan, informasi berguna, dan kehadiran diam-diam. Kamu butuh pasangan yang memberi energi hidup tanpa mengabaikan batasmu.",
    blindspot: "Kamu bisa terlalu cepat menyimpulkan sesuatu akan gagal, menunda tindakan karena menunggu momen sempurna, atau meremehkan kekuatan antusiasme sosial.",
    advice: ["Bedakan risiko nyata dengan kebiasaan mengantisipasi yang terburuk.", "Jalankan eksperimen kecil sebelum menolak seluruh ide.", "Sampaikan kebutuhan tanpa menyamarkannya sebagai kritik."],
  },
  LIE: {
    title: "Pendorong strategi yang mengejar hasil dan momentum",
    subtitle: "Cepat melihat metode, peluang, dan hasil; memakai intuisi waktu untuk memilih langkah yang paling layak dikejar.",
    tags: ["ambisius", "strategis", "cepat", "sulit berhenti"],
    expert: "Te Base berorientasi pada informasi yang dapat dipakai dan hasil, sedangkan Ni Creative membantu memilih timing, arah, dan konsekuensi jangka panjang.",
    simple: "Kamu ingin tahu apa yang bekerja, seberapa cepat, dan untuk tujuan apa. Kamu tidak suka energi habis pada proses yang tidak menghasilkan.",
    stereotype: "Sering digambarkan sebagai founder mode, manusia spreadsheet, atau orang yang mengubah liburan menjadi peluang networking.",
    misunderstood: "Fokus hasilmu bisa dianggap tidak peduli, padahal kamu sering menunjukkan kepedulian dengan membuat hidup orang lebih aman dan efektif.",
    emotionalPattern: "Kamu mudah terpicu oleh inkompetensi berulang, pemborosan, ketidakjelasan arah, atau orang yang menuntut hasil tanpa mau mengambil tanggung jawab.",
    relationshipStyle: "Kamu butuh orang yang mandiri, jujur, dan menghargai tujuan. Kamu juga berkembang bersama orang yang bisa mengingatkan bahwa tidak semua kebutuhan bisa dijadikan proyek.",
    loveStyle: "Kamu menunjukkan cinta lewat rencana, peluang, solusi, dan dukungan pada masa depan pasangan. Kamu butuh kepercayaan personal dan batas moral yang jelas.",
    blindspot: "Kamu bisa mengorbankan tubuh, relasi, atau proses emosional demi target; bisa juga terlalu yakin bahwa efisiensi otomatis berarti keputusan terbaik.",
    advice: ["Masukkan istirahat ke dalam strategi, bukan sebagai hadiah.", "Tanya dampak manusia sebelum mengejar percepatan.", "Tetapkan definisi cukup sebelum target terus naik."],
  },
  ESI: {
    title: "Penjaga nilai yang tegas pada loyalitas dan batas",
    subtitle: "Membaca kedekatan, niat, dan kepercayaan secara serius; mampu bertindak tegas kalau nilai atau orang penting perlu dilindungi.",
    tags: ["loyal", "selektif", "protektif", "sulit memaafkan"],
    expert: "Fi Base berfokus pada kualitas hubungan dan nilai personal, sementara Se Creative memberi kemampuan menetapkan batas serta bertindak saat loyalitas diuji.",
    simple: "Kamu tidak gampang menganggap semua orang dekat. Tapi kalau seseorang sudah masuk lingkaranmu, kamu bisa sangat konsisten membela dan menjaga.",
    stereotype: "Sering digambarkan sebagai human lie detector, teman yang ingat semua pengkhianatan, atau orang baik yang jangan diuji batasnya.",
    misunderstood: "Sikap selektifmu bisa dianggap menghakimi, padahal kamu sering sedang memastikan kepercayaan tidak diberikan ke orang yang salah.",
    emotionalPattern: "Kamu mudah terpicu oleh pengkhianatan, ketidakjujuran, penghinaan pada orang lemah, atau permintaan memaafkan tanpa perubahan nyata.",
    relationshipStyle: "Kamu menghargai konsistensi, bukti, dan rasa aman. Kamu butuh relasi yang tidak memaksa keterbukaan cepat tetapi juga tidak bermain abu-abu.",
    loveStyle: "Kamu menunjukkan cinta lewat loyalitas, perlindungan, dan perhatian personal. Kamu butuh pasangan yang membawa arah, peluang, dan kepercayaan pada masa depan.",
    blindspot: "Kamu bisa terlalu lama menyimpan penilaian, sulit memberi kesempatan kedua, atau melihat konflik moral dalam situasi yang sebenarnya lebih kompleks.",
    advice: ["Bedakan kesalahan, pola, dan pengkhianatan.", "Jelaskan batas sebelum menguji apakah orang akan menebaknya.", "Cari bukti baru, bukan hanya mengulang bukti lama."],
  },
  IEE: {
    title: "Pembaca potensi manusia yang hidup dari koneksi dan kemungkinan",
    subtitle: "Cepat melihat sisi unik orang, peluang hubungan, dan arah perkembangan; memakai nilai personal untuk memilih mana yang terasa tulus.",
    tags: ["antusias", "empatik", "spontan", "mudah tersebar"],
    expert: "Ne Base membuka kemungkinan dan potensi, sedangkan Fi Creative membantu menilai kedekatan serta menyesuaikan pendekatan pada tiap orang.",
    simple: "Kamu cepat melihat versi diri yang mungkin tumbuh dari seseorang. Kamu juga mudah membangun kedekatan lewat rasa penasaran yang tulus.",
    stereotype: "Sering dianggap pengadopsi introvert, manusia networking tanpa sadar, atau orang yang punya banyak cerita dan lebih banyak rencana.",
    misunderstood: "Keramahanmu bisa dianggap dangkal, padahal kamu sering benar-benar tertarik pada keunikan orang—hanya saja energimu bergerak cepat.",
    emotionalPattern: "Kamu mudah terpicu oleh penolakan identitas, relasi yang kaku, sinisme, atau orang yang menganggap perubahan tidak mungkin. Terlalu banyak tuntutan praktis bisa membuatmu kabur.",
    relationshipStyle: "Kamu butuh kebebasan, kejujuran personal, dan percakapan yang hidup. Kamu berkembang dengan orang yang membantu memberi struktur tanpa mengendalikan.",
    loveStyle: "Kamu menunjukkan cinta lewat eksplorasi, percakapan, dukungan pada potensi, dan perhatian personal. Kamu butuh konsistensi praktis agar kedekatan tidak hanya jadi kemungkinan.",
    blindspot: "Kamu bisa terlalu cepat percaya pada potensi, membuka terlalu banyak relasi atau proyek, dan menghindari bagian membosankan yang justru membuat sesuatu bertahan.",
    advice: ["Nilai orang dari pola tindakan, bukan hanya potensi.", "Pilih tiga prioritas aktif, sisanya simpan.", "Jangan gunakan topik baru untuk menghindari percakapan sulit."],
  },
  SLI: {
    title: "Pemecah masalah tenang yang menghargai kualitas nyata",
    subtitle: "Peka pada kenyamanan, fungsi, dan detail teknis; biasanya memilih cara yang efisien tanpa perlu banyak menunjukkan prosesnya.",
    tags: ["praktis", "tenang", "mandiri", "sulit dibaca"],
    expert: "Si Base memantau kualitas pengalaman dan keseimbangan, sementara Te Creative membantu memilih metode yang paling berguna serta efisien.",
    simple: "Kamu cepat tahu mana yang tidak nyaman atau tidak bekerja. Kamu biasanya memperbaikinya dengan cara paling sederhana tanpa membuat acara besar.",
    stereotype: "Sering disebut manusia tutorial, teman yang punya alat tepat, atau orang yang terlihat santai tetapi diam-diam paling kompeten.",
    misunderstood: "Sikap hemat kata bisa dianggap tidak peduli, padahal kamu sering menunjukkan perhatian lewat bantuan praktis dan mengurangi beban.",
    emotionalPattern: "Kamu mudah terganggu oleh kebisingan sosial, tuntutan emosional tanpa solusi, alat atau proses buruk, dan orang yang memaksa ritme.",
    relationshipStyle: "Kamu butuh ruang, kejujuran, dan orang yang tidak memperumit hidup. Kedekatan tumbuh lewat waktu, kenyamanan, dan keandalan.",
    loveStyle: "Kamu menunjukkan cinta lewat perbaikan, kualitas, dan menjaga kehidupan sehari-hari tetap lancar. Kamu butuh pasangan yang membawa ide serta kehangatan tanpa menuntut performa.",
    blindspot: "Kamu bisa terlalu lama diam, menganggap masalah akan selesai sendiri, atau hanya bergerak saat sesuatu sudah cukup mengganggu tubuh dan rutinitas.",
    advice: ["Ucapkan kebutuhan sebelum berubah menjadi jarak.", "Biarkan orang melihat kontribusimu.", "Sisihkan ruang untuk mencoba hal yang tidak langsung berguna."],
  },
  LSE: {
    title: "Pengelola kehidupan yang ingin semuanya bisa diandalkan",
    subtitle: "Fokus pada metode, hasil, dan keteraturan praktis; memakai kepekaan pada kenyamanan untuk membuat sistem tetap manusiawi.",
    tags: ["andal", "produktif", "terorganisir", "bisa terlalu menuntut"],
    expert: "Te Base mengutamakan efektivitas dan fakta yang dapat dipakai, sedangkan Si Creative membantu menjaga kualitas, ritme, dan kelayakan proses sehari-hari.",
    simple: "Kamu ingin pekerjaan selesai dengan benar dan hidup berjalan tanpa kekacauan yang sebenarnya bisa dicegah.",
    stereotype: "Sering dianggap project manager keluarga, manusia checklist, atau orang yang datang membawa solusi dan charger cadangan.",
    misunderstood: "Dorongan mengaturmu bisa dianggap tidak percaya pada orang, padahal kamu sering hanya tidak tahan melihat masalah yang bisa dicegah dibiarkan tumbuh.",
    emotionalPattern: "Kamu mudah kesal pada ketidakandalan, janji kosong, proses yang boros, atau orang yang mengeluh tanpa mencoba solusi.",
    relationshipStyle: "Kamu menghargai konsistensi, tanggung jawab, dan perhatian yang terlihat dalam tindakan. Kamu perlu orang yang membantu memberi ruang pada emosi tanpa membuat semuanya tidak efisien.",
    loveStyle: "Kamu menunjukkan cinta lewat pelayanan, perencanaan, dan menjaga kebutuhan praktis. Kamu butuh kedekatan personal yang tidak hanya berbicara lewat tugas.",
    blindspot: "Kamu bisa terlalu cepat memberi solusi, menuntut ritme yang sama dari semua orang, atau mengukur kepedulian dari produktivitas.",
    advice: ["Tanya perasaan sebelum menyusun langkah.", "Bedakan standar penting dengan preferensi pribadi.", "Sisakan waktu yang tidak perlu menghasilkan apa pun."],
  },
  EII: {
    title: "Pembaca nilai yang serius pada pertumbuhan manusia",
    subtitle: "Mencari ketulusan, niat, dan kualitas hubungan; menggunakan kemungkinan untuk melihat bagaimana seseorang masih bisa berkembang.",
    tags: ["idealis", "empatik", "reflektif", "sulit tegas"],
    expert: "Fi Base menempatkan nilai dan hubungan personal sebagai orientasi utama, sementara Ne Creative membantu melihat potensi, alternatif, dan jalan perkembangan.",
    simple: "Kamu cepat merasakan apakah hubungan terasa tulus. Kamu juga cenderung melihat sisi manusia yang belum selesai, bukan hanya kesalahannya saat ini.",
    stereotype: "Sering digambarkan sebagai konselor gratis, pembaca karakter, atau orang lembut yang diam-diam punya standar moral sangat tinggi.",
    misunderstood: "Kelembutanmu bisa dianggap tidak punya batas. Padahal kamu sering memiliki penilaian kuat, hanya tidak selalu mengatakannya secara langsung.",
    emotionalPattern: "Kamu mudah terpicu oleh ketidakjujuran, kekejaman, penolakan emosional, atau situasi yang memaksa kamu mengkhianati nilai sendiri.",
    relationshipStyle: "Kamu butuh ketulusan, ruang aman, dan orang yang tidak meremehkan kedalamanmu. Kamu berkembang bersama orang yang membantu mengubah nilai menjadi tindakan nyata.",
    loveStyle: "Kamu menunjukkan cinta lewat pemahaman, dukungan, dan mengingat hal personal. Kamu butuh pasangan yang konsisten, tegas, dan tidak membuatmu menebak komitmen.",
    blindspot: "Kamu bisa terlalu lama berharap orang berubah, menghindari konflik sampai batas terlambat, atau menyamakan niat baik dengan kemampuan nyata.",
    advice: ["Nilai pola tindakan bersama niat.", "Ucapkan tidak sebelum kamu merasa dikhianati.", "Buat satu keputusan tegas tanpa menunggu semua orang memahami."],
  },
};


const CHANNEL_LABELS: Record<string, string> = {
  producer: "muncul spontan",
  flexible: "mudah dipakai secara fleksibel",
  mask: "sering dipakai sebagai tuntutan sosial",
  threat: "mudah terasa menekan",
  receiver: "terasa melegakan saat diberikan orang lain",
  aspiration: "ingin dikembangkan dan diakui",
  dismissive: "mampu tetapi tidak dianggap pusat",
  background: "berjalan otomatis di latar",
};

const strongestObservedSignals = (result: AssessmentResult): string[] => {
  const entries = Object.entries(result.channelProfile).flatMap(([element, channels]) =>
    Object.entries(channels).map(([channel, score]) => ({
      element: element as InformationElement,
      channel,
      score,
    })),
  );

  return entries
    .filter((entry) => Number.isFinite(entry.score))
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    .slice(0, 4)
    .map((entry) => {
      const label = CHANNEL_LABELS[entry.channel] ?? entry.channel;
      const direction = entry.score >= 0 ? "cukup kuat" : "cukup rendah";
      return `${entry.element} ${label} (${direction}, ${entry.score.toFixed(2)}).`;
    });
};

const recommendationGroups = (curated: CuratedProfile): RecommendationGroup[] => [
  { title: "Buku", note: "Pilih yang membuatmu berpikir, bukan cuma membenarkan dirimu.", items: curated.books },
  { title: "Film", note: "Gunakan konflik dan tokohnya sebagai bahan refleksi, bukan label tipe.", items: curated.films },
  { title: "Musik", note: "Moodboard yang mungkin cocok dengan ritme perhatianmu.", items: curated.music },
  { title: "Arah kerja", note: "Fokus pada budaya kerja dan jenis masalah, bukan jabatan semata.", items: curated.careers },
  { title: "Tempat untuk dijelajahi", note: "Rekomendasi pengalaman, bukan klaim tempat tinggal terbaik.", items: curated.destinations },
  { title: "Kosakata baru", note: "Cari maknanya lalu pakai untuk membaca pengalamanmu lebih presisi.", items: curated.words },
  { title: "Hadiah yang mungkin cocok", note: "Yang terasa personal biasanya lebih kuat daripada yang mahal.", items: curated.gifts },
  { title: "Sirkel yang sehat", note: "Bukan orang yang sama persis, tetapi orang yang melengkapi tanpa mengecilkanmu.", items: curated.circle },
  { title: "Eksperimen 7 hari", note: "Uji hasil ini di dunia nyata dan catat bukti yang mendukung maupun membantah.", items: curated.experiments },
];

export const buildResultExperience = (type: TIM, result: AssessmentResult): ResultExperience => {
  const model = TIM_MODELS[type];
  const profile = TIM_PROFILES[type];
  const editorial = TYPE_EDITORIAL[type];
  const curated = CURATED[type];
  const base = ELEMENT_LENS[model.positions.Base];
  const creative = ELEMENT_LENS[model.positions.Creative];
  const role = ELEMENT_LENS[model.positions.Role];
  const vulnerable = ELEMENT_LENS[model.positions.Vulnerable];
  const suggestive = ELEMENT_LENS[model.positions.Suggestive];
  const mobilizing = ELEMENT_LENS[model.positions.Mobilizing];
  const demonstrative = ELEMENT_LENS[model.positions.Demonstrative];
  const quadra = QUADRA_LENS[model.quadra];
  const tempo = TEMPERAMENT_LENS[model.temperament];
  const club = CLUB_LENS[model.club];

  const sections: ResultSection[] = [
    {
      id: "summary",
      kicker: "Profil utama",
      title: "Ringkasan inti",
      intro: "Bagian paling padat untuk memahami kecenderungan utama, kesan orang, dan stereotipe yang sering beredar.",
      cards: [
        {
          title: "Catatan ahli — ringkasan teori",
          expert: editorial.expert,
          simple: editorial.simple,
          stereotype: editorial.stereotype,
          misunderstood: editorial.misunderstood,
        },
        {
          title: "Cara orang sering membaca kamu",
          expert: `${profile.description} Pola ini paling masuk akal bila terlihat lintas situasi, bukan hanya saat kamu sedang stres atau menjalankan peran tertentu.`,
          simple: `Kesan terkuatmu biasanya datang dari kombinasi ${model.positions.Base} dan ${model.positions.Creative}: ${base.algorithm}, lalu ${creative.gift.toLowerCase()}.`,
          warning: "Kesan orang tidak selalu sama dengan motif batinmu. Gunakan contoh perilaku nyata sebelum menerima atau menolak bagian ini.",
        },
      ],
    },
    {
      id: "thinking",
      kicker: "Proses informasi",
      title: "Cara berpikir dan mengambil keputusan",
      intro: "Bukan soal pintar atau tidak. Ini tentang informasi apa yang paling cepat kamu percaya dan bagaimana kamu mengubahnya menjadi keputusan.",
      cards: [
        {
          title: `Fokus utama: ${model.positions.Base}`,
          expert: `Base ${model.positions.Base} membuat perhatianmu cenderung ${base.algorithm}. ${base.sees}.`,
          simple: editorial.simple,
          misunderstood: `Orang bisa hanya melihat hasil akhirnya, padahal orientasi dasarnya adalah: ${profile.orientasiBase}`,
          warning: base.blindSpot,
        },
        {
          title: `Alat fleksibel: ${model.positions.Creative}`,
          expert: `Creative ${model.positions.Creative} biasanya menjadi alat yang mudah kamu sesuaikan untuk membantu tujuan fungsi Base.`,
          simple: profile.caraCreative,
          warning: `Kekuatan ini bisa berlebihan kalau kamu merasa harus selalu memperbaiki keadaan untuk orang lain.`,
          actions: ["Tanya apa tujuan sebenarnya sebelum bergerak.", "Pisahkan kemampuan yang kamu punya dari hal yang memang perlu kamu kerjakan."],
        },
        {
          title: "Aturan dan keputusan",
          expert: `${base.rules}. Creative-mu menambah filter: ${creative.rules.toLowerCase()}.`,
          simple: `Kamu tidak sekadar pro atau anti aturan. Kamu menilai apakah aturan sesuai dengan jenis informasi yang paling kamu percaya.`,
          warning: "Waspadai saat filter pribadi terasa seperti satu-satunya bentuk kewarasan.",
        },
        {
          title: "Ritme kerja dan belajar",
          expert: `Temperamen ${model.temperament} cenderung ${tempo.pace}. Dalam kelompok ${model.club}, kekuatan umumnya muncul pada ${club.strengths}.`,
          simple: club.work,
          warning: `${tempo.stress}. ${club.risk}.`,
          actions: [tempo.advice],
        },
      ],
    },
    {
      id: "emotions",
      kicker: "Pemicu dan regulasi",
      title: "Emosi yang paling mudah aktif",
      intro: "Ini bukan diagnosis. Bagian ini membaca kemungkinan pemicu, pola reaksi, dan kebutuhan yang sering tersembunyi di balik emosi.",
      cards: [
        {
          title: "Pola emosi umum",
          expert: editorial.emotionalPattern,
          simple: `Emosimu cenderung lebih kuat saat orientasi ${model.positions.Base} terhambat atau kebutuhan ${model.positions.Suggestive} terlalu lama tidak terpenuhi.`,
          warning: `Kalau emosi menetap, ekstrem, atau mengganggu hidup sehari-hari, tipologi tidak menggantikan bantuan profesional.`,
        },
        {
          title: "Marah dan defensif",
          expert: `${base.blocked}. Tekanan pada Vulnerable ${model.positions.Vulnerable} juga dapat membuatmu kaku, malu, atau ingin menghindar.`,
          simple: profile.tuntutanPolr,
          misunderstood: "Respons defensif tidak selalu berarti kamu tidak peduli. Kadang kamu tidak punya cara yang cukup fleksibel untuk menghadapi tuntutan itu.",
          actions: ["Tunda respons saat harga diri sedang panas.", "Sebut kebutuhan atau batas dalam satu kalimat konkret."],
        },
        {
          title: "Takut, malu, dan rasa tidak cukup",
          expert: `Role ${model.positions.Role} sering menjadi area performa sosial, sedangkan Vulnerable ${model.positions.Vulnerable} lebih mudah terasa seperti titik yang tidak boleh disentuh.`,
          simple: profile.roleTampilan,
          warning: role.blocked,
          actions: ["Bedakan tidak terlatih dengan tidak mampu.", "Minta instruksi atau dukungan spesifik, bukan menutupi semua kebingungan."],
        },
        {
          title: "Cinta, lega, dan rasa diterima",
          expert: `Kamu cenderung memberi lewat Creative ${model.positions.Creative}, tetapi merasa sangat terbantu saat Suggestive ${model.positions.Suggestive} datang dari orang yang dipercaya.`,
          simple: profile.bantuanSuggestive,
          actions: ["Jelaskan bentuk bantuan yang terasa melegakan.", "Jangan menguji kasih sayang lewat tebakan atau situasi buatan."],
        },
        {
          title: "Iri dan ambisi tersembunyi",
          expert: `Mobilizing ${model.positions.Mobilizing} sering menjadi area yang ingin berkembang dan mudah tersentuh oleh pengakuan yang tepat.`,
          simple: profile.areaMobilizing,
          warning: mobilizing.blindSpot,
          actions: ["Ubah iri menjadi daftar kemampuan yang ingin dilatih.", "Cari mentor, bukan hanya pembanding."],
        },
        {
          title: "Cara pulih",
          expert: suggestive.restored,
          simple: `Sebelum membuat kesimpulan besar, cek tidur, makan, kondisi tubuh, tekanan sosial, dan apakah kamu sudah mendapat dukungan yang sebenarnya kamu butuhkan.`,
          actions: ["Kurangi stimulasi selama 20 menit.", "Pilih satu tindakan fisik sederhana.", "Hubungi satu orang yang tidak membuatmu perlu tampil sempurna."],
        },
      ],
    },
    {
      id: "relationships",
      kicker: "Relasi dan sirkel",
      title: "Cara kamu dekat, menjauh, dan memilih orang",
      intro: "Relasi sehat tidak ditentukan oleh tipe. Bagian ini membantu membaca kebutuhan komunikasi, pola kedekatan, dan orang yang mungkin melengkapi kamu.",
      cards: [
        {
          title: "Gaya pertemanan",
          expert: editorial.relationshipStyle,
          simple: `Sirkel yang paling sehat biasanya memberi ruang pada ${model.positions.Base}, sekaligus membantu kebutuhan ${model.positions.Suggestive} tanpa membuatmu merasa tidak kompeten.`,
          stereotype: `Stereotipe internet untuk ${type}: ${editorial.stereotype}`,
          misunderstood: editorial.misunderstood,
        },
        {
          title: "Gaya cinta",
          expert: editorial.loveStyle,
          simple: `Kamu cenderung memberi perhatian lewat ${model.positions.Creative} dan paling lega saat menerima dukungan ${model.positions.Suggestive}.`,
          warning: "Chemistry, rasa aman, dan kompatibilitas hidup adalah hal berbeda. Tipe tidak menggantikan komunikasi dan batas.",
        },
        {
          title: "Konflik",
          expert: `Saat tertekan, kamu bisa kembali pada pola ${model.positions.Base} secara berlebihan atau menjadi defensif pada tuntutan ${model.positions.Vulnerable}.`,
          simple: editorial.emotionalPattern,
          actions: ["Jelaskan masalah tanpa menebak motif.", "Tentukan apakah kamu ingin dipahami, mencari solusi, atau memasang batas."],
        },
        {
          title: "Sirkel yang mendorong pertumbuhan",
          expert: quadra.circle,
          simple: curated.circle.join("; "),
          actions: ["Cari orang yang menghargai kekuatanmu tetapi tidak ikut membenarkan blind spot-mu."],
        },
      ],
    },
    {
      id: "worldview",
      kicker: "Aturan dan masyarakat",
      title: "Cara melihat dunia, politik, agama, ekonomi, dan sosial",
      intro: "Socionics tidak menentukan ideologi, agama, atau pilihan politik. Yang dibaca hanyalah aspek yang mungkin lebih cepat menarik perhatianmu.",
      cards: [
        {
          title: "Aturan dan institusi",
          expert: `${base.rules}. ${creative.rules}.`,
          simple: "Kamu cenderung menerima aturan yang lolos filter perhatian utamamu dan lebih skeptis pada aturan yang hanya meminta kepatuhan tanpa alasan yang kamu percaya.",
          warning: "Pendidikan, budaya, pengalaman kekuasaan, dan kondisi hidup jauh lebih besar pengaruhnya daripada tipe.",
        },
        {
          title: "Politik dan kekuasaan",
          expert: `${quadra.politics}. Dari lensa Base, ${base.politics.toLowerCase()}.`,
          simple: "Ini bukan prediksi partai. Ini hanya memperkirakan isu apa yang mungkin lebih cepat kamu notice dalam percakapan politik.",
          warning: quadra.tension,
        },
        {
          title: "Agama dan hal yang dianggap sakral",
          expert: `${quadra.sacred}. Dari lensa Base, ${base.religion.toLowerCase()}.`,
          simple: "Tipe tidak menentukan apakah kamu religius, spiritual, agnostik, atau ateis. Ia hanya memberi dugaan tentang cara kamu memahami makna.",
        },
        {
          title: "Ekonomi dan kerja",
          expert: `${quadra.economy}. Base-mu juga membuatmu ${base.economy.toLowerCase()}.`,
          simple: `Dalam kerja, ${club.work}.`,
          warning: club.risk,
        },
        {
          title: "Masyarakat dan kontribusi",
          expert: `${base.society}. Iklim ${model.quadra} biasanya menilai hidup lewat gagasan bahwa ${quadra.world.toLowerCase()}.`,
          simple: `Kontribusi publikmu cenderung kuat saat ${base.gift.toLowerCase()} dan ${creative.gift.toLowerCase()}.`,
        },
      ],
    },
    {
      id: "blindspots",
      kicker: "Bagian yang perlu dijaga",
      title: "Blind spot dan pola sabotase diri",
      intro: "Bagian ini sengaja tidak dibuat manis. Gunakan sebagai daftar hipotesis yang perlu diuji lewat kejadian nyata.",
      cards: [
        {
          title: "Blind spot utama",
          expert: editorial.blindspot,
          simple: base.blindSpot,
          warning: profile.tuntutanPolr,
        },
        {
          title: "Topeng sosial",
          expert: `Role ${model.positions.Role} dapat membuatmu terlihat lebih nyaman pada area ini daripada yang sebenarnya kamu rasakan.`,
          simple: profile.roleTampilan,
          warning: `Kalau dipertahankan terlalu lama, performa ini bisa berubah menjadi lelah, kaku, atau mudah tersinggung.`,
        },
        {
          title: "Kekuatan yang sering kamu remehkan",
          expert: `Demonstrative ${model.positions.Demonstrative} biasanya berjalan cukup otomatis tetapi tidak selalu dianggap penting oleh pemiliknya.`,
          simple: profile.kemampuanDemonstrative,
          actions: ["Catat pujian yang sering kamu anggap berlebihan.", "Gunakan kemampuan ini sebagai dukungan, bukan identitas yang harus dibuktikan."],
        },
        {
          title: "Nasihat paling praktis",
          expert: `Pertumbuhan bukan mengganti tipe. Tujuannya adalah memakai kekuatan tanpa membiarkannya mengambil semua keputusan.`,
          simple: editorial.advice.join(" "),
          actions: editorial.advice,
        },
        {
          title: "Bukti yang dapat menyangkal hasil",
          expert: profile.buktiMenyangkal,
          simple: profile.refleksi,
          warning: "Kalau bukti lawan lebih kuat dan konsisten lintas konteks, pertahankan kandidat kedua atau ulangi observasi sebelum menetapkan tipe.",
        },
      ],
    },
    {
      id: "recommendations",
      kicker: "Daftar pilihan personal",
      title: "Rekomendasi setelah tes",
      intro: "Bukan resep hidup dan bukan bukti tipe. Pilih yang terasa berguna, abaikan yang tidak cocok, lalu buat versimu sendiri.",
      cards: [],
      recommendations: recommendationGroups(curated),
    },
  ];

  return {
    title: editorial.title,
    subtitle: editorial.subtitle,
    tags: editorial.tags,
    expertSnapshot: editorial.expert,
    internetSnapshot: editorial.stereotype,
    observedSignals: strongestObservedSignals(result),
    sections,
  };
};
