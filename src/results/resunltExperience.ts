import { TIM_MODELS, TIM_PROFILES } from "../constants/socionicsData";
import type {
  AssessmentResult,
  Club,
  InformationElement,
  Quadra,
  Temperament,
  TIM,
} from "../types/socionics";

export interface ExperienceCard {
  title: string;
  vibe: string;
  meaning: string;
  body: string;
  edge?: string;
  practice?: string;
}

export interface RecommendationGroup {
  title: string;
  vibe: string;
  meaning: string;
  items: string[];
}

export interface ExperienceDoor {
  id: "A" | "B" | "C" | "D";
  label: string;
  title: string;
  subtitle: string;
  cards: ExperienceCard[];
  recommendations?: RecommendationGroup[];
}

export interface ResultExperience {
  portalName: string;
  portalTagline: string;
  opening: string;
  observedSignals: string[];
  doors: ExperienceDoor[];
}

type ElementLens = {
  vibe: string;
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
    vibe: "jendela yang terus membuka jendela lain",
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
    vibe: "lorong waktu dengan lampu redup yang pelan-pelan membentuk satu arah",
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
    vibe: "ruang yang langsung punya garis, berat, jarak, dan pusat gravitasi",
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
    vibe: "kamar yang temperaturnya pas, kainnya lembut, dan tidak ada suara yang menusuk",
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
    vibe: "meja kerja dengan data terbuka, alat yang berfungsi, dan langkah berikutnya yang jelas",
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
    vibe: "perpustakaan sunyi dengan rak yang akhirnya tersusun menurut hukum yang masuk akal",
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
    vibe: "panggung hidup tempat emosi punya volume, ritme, warna, dan arah gerak",
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
    vibe: "ruang kecil dengan dua kursi, percakapan pelan, dan batas yang tidak perlu diumumkan keras-keras",
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
  vibe: string;
  world: string;
  circle: string;
  politics: string;
  sacred: string;
  economy: string;
  tension: string;
};

const QUADRA_LENS: Record<Quadra, QuadraLens> = {
  Alpha: {
    vibe: "salon ide, humor cerdas, rasa ingin tahu, dan ruang yang tidak cepat menghakimi",
    world: "hidup terasa sehat ketika orang bisa bertukar ide, bermain dengan konsep, dan menikmati kenyamanan tanpa terlalu banyak drama status",
    circle: "sirkel terbaikmu memberi ruang untuk bertanya aneh, tertawa, mengoreksi tanpa mempermalukan, dan tidak memaksa semua orang tampil keras",
    politics: "cenderung menghargai akses pengetahuan, keterbukaan diskusi, inovasi sosial, dan institusi yang tidak mematikan rasa ingin tahu",
    sacred: "makna tumbuh lewat dialog, keajaiban keseharian, pertanyaan filosofis, dan pengalaman komunitas yang hangat",
    economy: "lebih mudah tertarik pada ekonomi kreatif, pendidikan, teknologi terbuka, kesejahteraan, dan cara membuat sistem terasa lebih manusiawi",
    tension: "bisa meremehkan konflik kekuasaan nyata karena berharap percakapan rasional dan suasana baik cukup untuk menyelesaikannya",
  },
  Beta: {
    vibe: "teater besar, misi bersama, loyalitas, simbol kuat, dan ritme yang menggerakkan banyak orang",
    world: "hidup terasa bermakna ketika ada arah besar, peran yang jelas, keberanian, dan sesuatu yang layak diperjuangkan bersama",
    circle: "sirkel terbaikmu punya loyalitas, humor internal, keberanian saling mengingatkan, dan rasa bahwa semua orang benar-benar hadir ketika krisis datang",
    politics: "cenderung peka pada kepemimpinan, stabilitas, mobilisasi, legitimasi, keamanan, dan kekuatan narasi kolektif",
    sacred: "makna tumbuh lewat ritual, sejarah, pengorbanan, panggilan, simbol, dan pengalaman menjadi bagian dari sesuatu yang lebih besar",
    economy: "mudah melihat pentingnya infrastruktur, koordinasi besar, disiplin, kapasitas negara atau organisasi, dan pengorbanan jangka pendek untuk tujuan kolektif",
    tension: "bisa terlalu memuliakan intensitas, loyalitas, atau hierarki sampai kritik tenang dianggap kurang berkomitmen",
  },
  Gamma: {
    vibe: "kota malam, keputusan tajam, hubungan selektif, konsekuensi nyata, dan ambisi yang tidak perlu dipamerkan",
    world: "hidup terasa jujur ketika orang bertanggung jawab atas pilihan, mampu membaca kekuasaan, dan tidak berlindung di balik idealisme tanpa biaya",
    circle: "sirkel terbaikmu kecil tetapi kuat: orang kompeten, tidak palsu, tahan tekanan, menghormati privasi, dan muncul saat benar-benar dibutuhkan",
    politics: "cenderung peka pada akuntabilitas, kepentingan nyata, korupsi kekuasaan, daya tawar, risiko, dan siapa yang membayar keputusan buruk",
    sacred: "makna sering terasa personal, intens, dan dibuktikan lewat pilihan hidup, bukan sekadar pernyataan publik",
    economy: "mudah tertarik pada investasi, strategi, kemandirian, kepemilikan, efisiensi, daya tahan, dan hasil yang tetap bernilai ketika suasana berubah",
    tension: "bisa terlalu curiga, terlalu transaksional, atau sulit menerima kelembutan yang tidak datang bersama bukti kuat",
  },
  Delta: {
    vibe: "studio kerja tenang, hubungan tulus, keterampilan nyata, pertumbuhan perlahan, dan hidup yang bisa dipertahankan",
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
  portalName: string;
  tagline: string;
  opening: string;
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
    portalName: "Laboratorium Kemungkinan",
    tagline: "Pintu yang terbuka ke lima pintu lain sebelum gagang pertama sempat dingin.",
    opening: "Kamu tidak datang untuk menerima satu jawaban final. Kamu datang untuk menemukan berapa banyak dunia yang masih mungkin dibangun dari satu pertanyaan.",
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
    portalName: "Rumah dengan Cahaya Sore",
    tagline: "Pintu yang tidak berisik, tetapi membuat tubuhmu sadar bahwa kamu akhirnya aman.",
    opening: "Kamu membaca hidup dari kualitas rasa: apakah suasana ini manusiawi, apakah tubuh bisa bernapas, dan apakah orang-orang di sini masih punya kelembutan.",
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
    portalName: "Ruang Perayaan",
    tagline: "Pintu yang terbuka sambil menyalakan lampu, musik, dan rasa bahwa semua orang masih bisa disatukan.",
    opening: "Kamu punya bakat membuat kehidupan bersama terasa hidup. Tantangannya bukan belajar memberi lebih banyak, tetapi tahu kapan cintamu tidak harus berbentuk kerja tanpa akhir.",
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
    portalName: "Arsip Hukum Tersembunyi",
    tagline: "Pintu yang hanya terbuka setelah semua istilah didefinisikan dengan benar.",
    opening: "Kamu mencari struktur yang tidak runtuh ketika diuji dari banyak sisi. Di balik ketenanganmu ada kebutuhan besar agar dunia masuk akal dan tidak memaksa orang tunduk pada aturan yang kontradiktif.",
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
    portalName: "Benteng Gerak",
    tagline: "Pintu berat yang terbuka sekali doronganmu punya arah.",
    opening: "Kamu membaca realitas lewat kekuatan, posisi, dan apa yang benar-benar bisa dilakukan. Kedalamanmu muncul ketika keberanianmu tidak hanya memenangkan ruang, tetapi juga melindungi sesuatu yang layak.",
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
    portalName: "Teater Waktu",
    tagline: "Pintu beludru yang membuka masa lalu, kemungkinan akhir, dan emosi yang belum sempat diberi nama.",
    opening: "Kamu hidup dekat dengan arus makna. Kamu bisa merasakan arah cerita sebelum orang lain mengakui bahwa ceritanya sedang berubah.",
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
    portalName: "Menara Suara",
    tagline: "Pintu yang terbuka ketika satu emosi pribadi berubah menjadi cerita yang bisa menggerakkan banyak orang.",
    opening: "Kamu bisa memberi bahasa pada ketegangan yang orang lain rasakan tetapi tidak berani ucapkan. Kekuatanmu besar; begitu juga tanggung jawab untuk tidak menjadikan setiap rasa sebagai panggung darurat.",
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
    portalName: "Ruang Komando Sunyi",
    tagline: "Pintu baja yang terbuka setelah aturan, posisi, dan risiko diperiksa satu per satu.",
    opening: "Kamu mencari struktur yang bisa bertahan ketika keadaan menjadi berat. Kepercayaanmu tidak murah, tetapi ketika sudah diberikan, kamu ingin sistem dan orang sama-sama menunjukkan integritas.",
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
    portalName: "Salon Daya Tarik",
    tagline: "Pintu yang terbuka karena kamu tahu siapa yang harus diajak, kapan harus mendekat, dan batas mana yang tidak boleh disentuh.",
    opening: "Kamu membaca manusia dan kekuasaan sekaligus. Kamu tahu bahwa hubungan tidak hidup di ruang hampa; ia punya daya tarik, risiko, loyalitas, dan harga.",
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
    portalName: "Observatorium Konsekuensi",
    tagline: "Pintu gelap dengan jendela jauh: kamu melihat apa yang akan jatuh sebelum bunyinya terdengar.",
    opening: "Kamu punya radar terhadap risiko, tren, dan optimisme yang terlalu mahal. Kekuatanmu bukan pesimisme, melainkan kemampuan memberi waktu pada kenyataan untuk menunjukkan harga sebenarnya.",
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
    portalName: "Mesin Horizon",
    tagline: "Pintu yang langsung membuka jalan, target, dan pertanyaan: seberapa jauh ini bisa dibawa?",
    opening: "Kamu melihat waktu sebagai modal dan realitas sebagai sesuatu yang bisa dibangun. Bahayanya muncul ketika tubuh, hubungan, dan rasa cukup diperlakukan seperti hambatan produksi.",
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
    portalName: "Ruang Sumpah",
    tagline: "Pintu yang hanya terbuka bagi orang yang niatnya terbukti, bukan sekadar terdengar manis.",
    opening: "Kamu menjaga kualitas ikatan dan batas moral dengan serius. Kamu tahu bahwa satu pengkhianatan kecil bisa mengubah seluruh makna hubungan.",
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
    portalName: "Taman Identitas",
    tagline: "Pintu yang terbuka ke versi dirimu yang belum pernah mendapat izin hidup.",
    opening: "Kamu menangkap kemungkinan manusia sebelum mereka sendiri berani mengakuinya. Kamu hidup dari percikan: satu percakapan bisa mengubah arah hidup seseorang.",
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
    portalName: "Bengkel Tenang",
    tagline: "Pintu yang terbuka tanpa suara dan menunjukkan bahwa hidup bisa bekerja lebih baik tanpa menjadi lebih ribut.",
    opening: "Kamu punya kecerdasan terhadap kualitas, alat, ritme, dan perbaikan yang tidak dramatis. Kamu sering menyelamatkan keadaan dengan sesuatu yang begitu praktis sampai orang lupa itu membutuhkan keahlian.",
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
    portalName: "Kota yang Berfungsi",
    tagline: "Pintu yang membuka gudang, jadwal, sistem, dan rasa lega karena semuanya akhirnya berada di tangan yang kompeten.",
    opening: "Kamu ingin dunia bisa diandalkan. Bagimu, kepedulian sering berbentuk sistem yang bekerja, kebutuhan yang terpenuhi, dan orang yang tidak dibiarkan menanggung kekacauan sendirian.",
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
    portalName: "Perpustakaan Hati",
    tagline: "Pintu yang terbuka pelan dan menyimpan nama-nama orang yang pernah kamu coba pahami dengan sungguh-sungguh.",
    opening: "Kamu memandang manusia sebagai cerita moral yang belum selesai. Kamu bisa melihat kemungkinan baik tanpa sepenuhnya menutup mata terhadap luka.",
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

const emotionLabel = (emotion: string, meaning: string, body: string): ExperienceCard => ({
  title: emotion,
  vibe: `emosi sebagai sinyal, bukan vonis`,
  meaning,
  body,
});

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
      const direction = entry.score >= 0 ? "menguat" : "melemah";
      return `${entry.element} pada kanal ${entry.channel} terlihat ${direction} (${entry.score.toFixed(2)}). Ini sinyal pola jawaban, bukan label mutlak.`;
    });
};

const recommendationGroups = (curated: CuratedProfile): RecommendationGroup[] => [
  {
    title: "Buku yang mungkin membuka ruangan baru",
    vibe: "bukan daftar wajib; ini pintu baca yang seirama dengan cara pikirmu",
    meaning: "Judul-judul ini dipilih untuk memberi cermin, perlawanan, atau bahasa baru bagi kecenderungan tipe ini.",
    items: curated.books,
  },
  {
    title: "Film untuk merasakan strukturmu dalam bentuk cerita",
    vibe: "menonton sebagai observasi diri",
    meaning: "Film tidak mewakili tipe secara literal. Gunakan tokoh, konflik, dan atmosfernya untuk melihat bagian dirimu yang biasanya sulit dijelaskan.",
    items: curated.films,
  },
  {
    title: "Lanskap musik",
    vibe: "soundtrack yang mungkin cocok dengan ritme batinmu",
    meaning: "Rekomendasi ini berfungsi sebagai moodboard, bukan klaim bahwa semua orang bertipe sama punya selera identik.",
    items: curated.music,
  },
  {
    title: "Arah pekerjaan",
    vibe: "tempat kemampuanmu punya fungsi nyata",
    meaning: "Carilah bentuk pekerjaan dan budaya tim yang memberi ruang pada kekuatanmu tanpa terus-menerus menekan fungsi rentanmu.",
    items: curated.careers,
  },
  {
    title: "Tempat yang layak dijelajahi",
    vibe: "perjalanan sebagai eksperimen identitas",
    meaning: "Bukan negara yang pasti cocok untuk hidup, melainkan tempat yang menawarkan kontras, atmosfer, atau sistem yang bisa memperluas cara pandangmu.",
    items: curated.destinations,
  },
  {
    title: "Kosakata baru untuk dirimu",
    vibe: "kata-kata adalah alat untuk melihat hal yang sebelumnya kabur",
    meaning: "Pilih satu kata, cari maknanya, lalu gunakan selama seminggu untuk membaca pengalamanmu dengan lebih presisi.",
    items: curated.words,
  },
  {
    title: "Hadiah yang kemungkinan terasa personal",
    vibe: "hadiah sebagai bukti bahwa seseorang benar-benar memperhatikan",
    meaning: "Hadiah terbaik bukan yang paling mahal, tetapi yang menyentuh cara tipe ini menerima perhatian, ruang, kualitas, atau kemungkinan.",
    items: curated.gifts,
  },
  {
    title: "Sirkel yang membuatmu bertumbuh",
    vibe: "bukan mencari orang identik; mencari ekosistem yang sehat",
    meaning: "Sirkel yang baik menguatkan fungsi utamamu sekaligus memberi apa yang sulit kamu produksi sendirian.",
    items: curated.circle,
  },
  {
    title: "Eksperimen kecil setelah tes",
    vibe: "hasil tes baru berarti ketika diuji di kehidupan nyata",
    meaning: "Pilih satu eksperimen selama tujuh hari. Catat apa yang terasa hidup, apa yang terasa dipaksakan, dan bukti apa yang justru menyangkal hasil ini.",
    items: curated.experiments,
  },
];

export const buildResultExperience = (type: TIM, result: AssessmentResult): ResultExperience => {
  const model = TIM_MODELS[type];
  const profile = TIM_PROFILES[type];
  const curated = CURATED[type];
  const base = ELEMENT_LENS[model.positions.Base];
  const creative = ELEMENT_LENS[model.positions.Creative];
  const role = ELEMENT_LENS[model.positions.Role];
  const vulnerable = ELEMENT_LENS[model.positions.Vulnerable];
  const suggestive = ELEMENT_LENS[model.positions.Suggestive];
  const mobilizing = ELEMENT_LENS[model.positions.Mobilizing];
  const ignoring = ELEMENT_LENS[model.positions.Ignoring];
  const demonstrative = ELEMENT_LENS[model.positions.Demonstrative];
  const quadra = QUADRA_LENS[model.quadra];
  const tempo = TEMPERAMENT_LENS[model.temperament];
  const club = CLUB_LENS[model.club];

  const doorA: ExperienceDoor = {
    id: "A",
    label: "Pintu A",
    title: "Ruang Cermin: Mesin Batinmu",
    subtitle: "Cara perhatianmu memilih apa yang terasa nyata, penting, dan layak ditanggapi.",
    cards: [
      {
        title: "Algoritma inti",
        vibe: base.vibe,
        meaning: `Fungsi Base ${model.positions.Base} bukan sekadar kemampuan. Ia adalah kecenderungan untuk ${base.algorithm}.`,
        body: `${base.sees}. ${profile.orientasiBase}`,
        edge: `Sisi tajamnya: ${base.blindSpot}.`,
        practice: `Pertanyaan editor diri: kapan kekuatan ini membantu, dan kapan ia mengambil seluruh ruangan?`,
      },
      {
        title: "Cara kamu mengubah dunia",
        vibe: creative.vibe,
        meaning: `Fungsi Creative ${model.positions.Creative} adalah alat fleksibel yang paling mudah kamu pakai untuk mewujudkan orientasi utama.`,
        body: `${creative.gift}. ${profile.caraCreative}`,
        edge: `Saat terlalu aktif, alat ini bisa dipakai untuk memperbaiki semua hal bahkan ketika orang lain hanya ingin ditemani.`,
      },
      {
        title: "Topeng sosial yang terlihat rapi",
        vibe: role.vibe,
        meaning: `Fungsi Role ${model.positions.Role} adalah bagian yang bisa kamu tampilkan karena merasa seharusnya mampu, bukan karena selalu terasa alami.`,
        body: `${profile.roleTampilan}`,
        edge: `Tanda kelelahan biasanya muncul ketika kamu harus mempertahankan performa ini terlalu lama tanpa kembali ke ritme asli.`,
      },
      {
        title: "Kekuatan diam-diam",
        vibe: demonstrative.vibe,
        meaning: `Fungsi Demonstrative ${model.positions.Demonstrative} sering bekerja sangat kompeten di latar, tetapi tidak selalu kamu anggap identitas utama.`,
        body: `${profile.kemampuanDemonstrative}`,
        practice: `Perhatikan pujian yang membuatmu bingung karena bagimu hal itu terasa biasa saja. Di sana sering ada kompetensi latar.`,
      },
      {
        title: "Ritme hidup",
        vibe: `tempo ${model.temperament}: bukan cepat atau lambat, tetapi cara energi berubah menjadi gerak`,
        meaning: `Temperamen ${model.temperament} menggambarkan pola umum bagaimana kamu merespons perubahan dan menggerakkan proses.`,
        body: `Kamu cenderung ${tempo.pace}.`,
        edge: tempo.stress,
        practice: tempo.advice,
      },
      {
        title: "Bukti yang bisa menyangkal hasil",
        vibe: "cermin yang sehat juga menunjukkan retakan pada teorinya sendiri",
        meaning: "Hasil terbaik bukan hasil yang terdengar paling indah, tetapi yang tetap bertahan setelah dibandingkan dengan bukti lawan.",
        body: profile.buktiMenyangkal,
        practice: profile.refleksi,
      },
    ],
  };

  const doorB: ExperienceDoor = {
    id: "B",
    label: "Pintu B",
    title: "Ruang Cuaca: Peta Emosi dan Pemicu",
    subtitle: "Emosi dibaca sebagai sinyal kebutuhan, batas, aspirasi, atau tekanan—bukan diagnosis.",
    cards: [
      emotionLabel(
        "Sukacita",
        `Kegembiraan paling hidup sering muncul ketika ${base.algorithm} bisa mengalir dan ${creative.gift}.`,
        `Kamu terasa lebih hidup saat lingkungan memberi ruang pada ${base.sees.toLowerCase()} dan usahamu langsung punya bentuk yang terasa milikmu.`,
      ),
      emotionLabel(
        "Marah",
        `Kemarahan sering menjadi alarm bahwa orientasi Base-mu dihalangi, diremehkan, atau ruang geraknya direbut.`,
        `${base.blocked}. Saat matang, marahmu bisa berubah menjadi batas atau keputusan; saat kewalahan, ia bisa berubah menjadi tekanan berlebih atau penarikan tajam.`,
      ),
      emotionLabel(
        "Takut",
        `Ketakutan paling spesifik sering berkaitan dengan tuntutan fungsi Vulnerable ${model.positions.Vulnerable}.`,
        `${vulnerable.blocked}. ${profile.tuntutanPolr}`,
      ),
      emotionLabel(
        "Sedih",
        `Kesedihan bisa muncul ketika kebutuhan Suggestive ${model.positions.Suggestive} lama tidak hadir: kamu diminta terus memberi sesuatu yang justru ingin kamu terima dari dunia.`,
        `${suggestive.restored}. Ketika kebutuhan ini tidak dipenuhi, hidup bisa terasa kering, terlalu berat, atau seperti harus kamu pecahkan sendirian.`,
      ),
      emotionLabel(
        "Malu",
        `Malu sering menempel pada fungsi Role ${model.positions.Role}: bagian yang ingin terlihat pantas tetapi takut ketahuan tidak seluwes kelihatannya.`,
        `${role.blocked}. Responsnya bisa berupa overpreparing, membela diri, pura-pura tidak peduli, atau menghindari situasi yang akan menguji performa itu.`,
      ),
      emotionLabel(
        "Iri",
        `Iri tidak selalu buruk; kadang ia menunjukkan area Mobilizing ${model.positions.Mobilizing} yang sangat ingin berkembang dan diakui.`,
        `${mobilizing.gift}. ${profile.areaMobilizing}`,
      ),
      emotionLabel(
        "Muak",
        `Rasa muak sering muncul ketika lingkungan memaksa nilai yang berlawanan dengan iklim quadra atau memakai informasi secara terasa palsu.`,
        `Kamu cenderung menolak suasana yang berlawanan dengan kebutuhan ini: ${quadra.world.toLowerCase()}.`,
      ),
      emotionLabel(
        "Cinta",
        `Kamu cenderung memberi cinta lewat Creative ${model.positions.Creative}, tetapi menerima cinta paling dalam lewat Suggestive ${model.positions.Suggestive}.`,
        `Cara memberimu: ${creative.gift}. Cara yang sering membuatmu benar-benar lega: ${profile.bantuanSuggestive}`,
      ),
      emotionLabel(
        "Bosan",
        `Kebosanan muncul ketika Base ${model.positions.Base} tidak punya objek hidup untuk diproses.`,
        `Kamu bukan hanya kekurangan aktivitas; kamu kekurangan jenis informasi yang membuat perhatianmu merasa berguna: ${base.algorithm}.`,
      ),
      {
        title: "Cara kembali ke tubuh",
        vibe: "regulasi sebelum interpretasi",
        meaning: "Ketika emosi terlalu penuh, jangan langsung menjadikannya kebenaran tentang dirimu atau orang lain.",
        body: `${suggestive.restored}. Mulai dari tidur, makan, gerak, napas, jarak, atau bantuan konkret sebelum menyusun teori besar.`,
        edge: `Jika emosi terasa ekstrem, menetap, atau mengganggu fungsi harian, hasil tipologi tidak menggantikan bantuan profesional.`,
      },
    ],
  };

  const doorC: ExperienceDoor = {
    id: "C",
    label: "Pintu C",
    title: "Observatorium Dunia: Aturan, Politik, Agama, Ekonomi, Sosial",
    subtitle: "Bukan ramalan ideologi. Ini lensa tentang aspek apa yang lebih cepat menarik perhatianmu.",
    cards: [
      {
        title: "Cara melihat aturan",
        vibe: `aturan sebagai sesuatu yang harus melewati filter ${model.positions.Base}–${model.positions.Creative}`,
        meaning: "Kamu tidak otomatis menerima atau menolak aturan. Kamu menilai aturan lewat jenis informasi yang paling kamu percaya.",
        body: `${base.rules}. Dalam praktiknya, ${creative.rules.toLowerCase()}.`,
        edge: `Waspadai saat kamu menganggap filter pribadimu sebagai satu-satunya bentuk rasionalitas.`,
      },
      {
        title: "Lensa politik",
        vibe: quadra.vibe,
        meaning: "Socionics tidak menentukan partai, pilihan kandidat, atau ideologi. Ia hanya bisa memberi hipotesis tentang dimensi politik yang lebih cepat kamu notice.",
        body: `${quadra.politics}. Pada level fungsi, ${base.politics.toLowerCase()}.`,
        edge: quadra.tension,
      },
      {
        title: "Lensa agama dan yang sakral",
        vibe: "keyakinan sebagai cara memberi bentuk pada makna, batas, komunitas, atau tindakan",
        meaning: "Tipe tidak menentukan apakah seseorang religius, agnostik, spiritual, atau ateis. Yang mungkin berbeda adalah pintu masuk ke pengalaman makna.",
        body: `${quadra.sacred}. Secara fungsi, ${base.religion.toLowerCase()}.`,
      },
      {
        title: "Lensa ekonomi",
        vibe: "nilai bukan hanya uang; nilai adalah apa yang dianggap layak dipertukarkan, dipelihara, dan dikembangkan",
        meaning: "Cara memandang ekonomi dapat dipengaruhi pendidikan, kelas sosial, budaya, dan pengalaman hidup. Tipe hanya memberi satu sudut kecil.",
        body: `${quadra.economy}. Kecenderungan Base-mu juga membuatmu ${base.economy.toLowerCase()}.`,
      },
      {
        title: "Cara membaca masyarakat",
        vibe: "siapa yang terlihat, siapa yang tidak terlihat, dan informasi apa yang dianggap penting",
        meaning: "Setiap tipe cenderung menangkap masalah sosial melalui saluran informasi yang berbeda.",
        body: `${base.society}. Dalam iklim ${model.quadra}, ${quadra.world.toLowerCase()}.`,
      },
      {
        title: "Kekuasaan dan batas",
        vibe: `Se berada di posisi ${Object.entries(model.positions).find(([, element]) => element === "Se")?.[0] ?? "tidak diketahui"}`,
        meaning: "Cara berhubungan dengan kekuasaan tidak sama dengan agresivitas. Ia bisa muncul sebagai produksi tekanan, kebutuhan akan perlindungan, performa, penghindaran, atau kompetensi latar.",
        body: ELEMENT_LENS.Se.politics,
        edge: `Periksa apakah kamu terlalu cepat menganggap tekanan sebagai solusi, atau terlalu lama menunggu orang lain memasang batas untukmu.`,
      },
      {
        title: "Pekerjaan dan kontribusi publik",
        vibe: `${model.club}: cara kecerdasanmu ingin berguna`,
        meaning: `Club ${model.club} adalah pengelompokan luas tentang jenis masalah yang sering terasa menarik, bukan pembatas profesi.` ,
        body: `Kamu cenderung cocok dengan ${club.work}. Kekuatan yang mungkin tampak: ${club.strengths}.`,
        edge: club.risk,
      },
      {
        title: "Pertanyaan etis untuk dibawa pulang",
        vibe: "dunia tidak hanya dibaca; dunia juga ikut dibentuk oleh kebiasaan perhatianmu",
        meaning: "Setiap lensa membantu melihat sesuatu sekaligus membuat hal lain lebih mudah luput.",
        body: `Apa yang selalu cepat kamu lihat dalam konflik publik? Siapa yang biasanya tidak masuk ke dalam modelmu? Data, aturan, kekuasaan, rasa, tubuh, waktu, kemungkinan, atau hubungan mana yang perlu sengaja kamu undang?`,
      },
    ],
  };

  const doorD: ExperienceDoor = {
    id: "D",
    label: "Pintu D",
    title: "Laboratorium Hidup: Sirkel, Nasihat, Hadiah, dan Rekomendasi",
    subtitle: "Bukan resep hidup. Anggap sebagai rak kemungkinan yang bisa kamu coba, tolak, atau ubah.",
    cards: [
      {
        title: "Nasihat paling penting",
        vibe: "pertumbuhan bukan menjadi tipe lain; pertumbuhan adalah memakai tipemu tanpa diperbudak olehnya",
        meaning: "Kekuatan utama perlu wadah, fungsi rentan perlu dukungan, dan aspirasi perlu latihan yang tidak mempermalukan.",
        body: `${profile.polaSeimbang}`,
        edge: `${profile.polaTertekan}`,
        practice: `${tempo.advice}`,
      },
      {
        title: "Sirkel yang terasa seperti pulang",
        vibe: quadra.circle,
        meaning: "Sirkel terbaik tidak selalu berisi tipe yang sama. Ia memberi campuran validasi, koreksi, ketegasan, kehangatan, dan kompetensi.",
        body: `${quadra.circle}`,
        practice: `Cari orang yang bisa memberi Suggestive ${model.positions.Suggestive} tanpa merendahkanmu, dan menghargai Base ${model.positions.Base} tanpa menjadikannya mesin gratis.`,
      },
      {
        title: "Apa yang perlu kamu hentikan",
        vibe: "melepaskan strategi lama yang dulu menyelamatkan tetapi sekarang mengurung",
        meaning: "Pola stres sering terlihat seperti versi ekstrem dari kekuatan atau performa berlebihan pada area yang rapuh.",
        body: `${profile.batasPerhatian}`,
        practice: `Tandai satu perilaku yang kamu sebut “memang aku begini” padahal sebenarnya hanya respons kelelahan.`,
      },
      {
        title: "Apa yang perlu kamu izinkan",
        vibe: "menerima bukan berarti lemah; menerima adalah bagian dari Model A",
        meaning: `Suggestive ${model.positions.Suggestive} menunjukkan jenis bantuan yang dapat terasa melegakan ketika datang dengan cara yang tepat.`,
        body: profile.bantuanSuggestive,
        practice: `Coba minta bantuan itu dengan kalimat konkret, bukan menunggu orang menebaknya.`,
      },
      {
        title: "Kalimat penutup pintu",
        vibe: curated.tagline,
        meaning: "Hasil ini seharusnya memperluas bahasa tentang dirimu, bukan mempersempit pilihan hidupmu.",
        body: curated.opening,
        practice: `Simpan yang terasa benar, uji yang terasa meragukan, dan buang bagian yang tidak didukung kehidupanmu.`,
      },
    ],
    recommendations: recommendationGroups(curated),
  };

  return {
    portalName: curated.portalName,
    portalTagline: curated.tagline,
    opening: curated.opening,
    observedSignals: strongestObservedSignals(result),
    doors: [doorA, doorB, doorC, doorD],
  };
};
