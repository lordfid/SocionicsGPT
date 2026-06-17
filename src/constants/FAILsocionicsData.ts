/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIM, TIMModel, TIMProfile, InformationElement, Quadra, Club, Temperament } from "../types/socionics";

export const ELEMENTS_METADATA: Record<InformationElement, { name: string; symbol: string; description: string; coreConcept: string }> = {
  Ne: {
    name: "Extraverted Intuition",
    symbol: "Ne",
    description: "Visi peluang, potensi tersembunyi, alternatif gagasan, gagasan inventif, dan esensi laten dari suatu hal.",
    coreConcept: "Mengeksplorasi kemungkinan baru dan melihat apa yang bisa dikembangkan secara kreatif."
  },
  Ni: {
    name: "Introverted Intuition",
    symbol: "Ni",
    description: "Tren historis, perubahan waktu, firasat batin, visi masa depan, sinkronitas peristiwa, dan konsekuensi jangka panjang.",
    coreConcept: "Membayangkan bagaimana peristiwa berkembang seiring berjalannya waktu dan menangkap makna tersembunyi."
  },
  Se: {
    name: "Extraverted Sensing",
    symbol: "Se",
    description: "Kehendak, kekuasaan fisik, wilayah kekuasaan, batas taktis, mobilisasi aksi langsung, pengaruh, dan estetika eksternal.",
    coreConcept: "Menguasai atau menaklukkan ruang fisik secara energetik dan melatih kepemimpinan direktif."
  },
  Si: {
    name: "Introverted Sensing",
    symbol: "Si",
    description: "Kenyamanan fisik, keadaan jasmani, kesehatan, keharmonisan estetika lingkungan sekitar, dan relaksasi internal.",
    coreConcept: "Menjaga keseimbangan kenyamanan internal, kebersihan, dan sensasi fisik yang damai."
  },
  Te: {
    name: "Extraverted Logic (Thinking)",
    symbol: "Te",
    description: "Efisiensi praktis, logika utilitas, fakta empiris, pengoptimalan proses kerja, dan alokasi sumber daya finansial/alat.",
    coreConcept: "Meningkatkan produktivitas kerja dan mengambil tindakan berdasarkan data realitas yang objektif."
  },
  Ti: {
    name: "Introverted Logic (Thinking)",
    symbol: "Ti",
    description: "Konsistensi teori, klasifikasi logis, bagan sistematis, keteraturan hukum, analisis terstruktur, dan pembuktian prinsip.",
    coreConcept: "Membangun keteraturan logis, struktur teoretis, dan mematuhi definisi konsep secara murni."
  },
  Fe: {
    name: "Extraverted Ethics (Feeling)",
    symbol: "Fe",
    description: "Ekspresi emosional, atmosfer kelompok, gelora perasaan, keterlibatan sosial, dan memengaruhi emosi audiens.",
    coreConcept: "Mengekspresikan gairah emosional dan menjaga orkestrasi getaran emosi sosial."
  },
  Fi: {
    name: "Introverted Ethics (Feeling)",
    symbol: "Fi",
    description: "Ikatan moral batin, hubungan kedekatan interpersonal, rasa suka/benci personal, ketulusan hati, kesetiaan, dan jarak psikologis.",
    coreConcept: "Menjaga keontentikan hubungan batin antar-manusia dan memegang prinsip etis pribadi."
  }
};

export const QUADRA_DATA: Record<Quadra, { name: string; valuedElements: InformationElement[]; atmosphere: string; description: string }> = {
  Alpha: {
    name: "Alpha",
    valuedElements: ["Ne", "Ti", "Fe", "Si"],
    atmosphere: "Demokratis-Kolektif, Santai, Menghargai Ide Baru dan Kenyamanan bersama.",
    description: "Quadra Alpha berfokus pada eksplorasi gagasan demi kesenangan intelektual (Ne, Ti) dipadukan dengan kesenangan bersosialisasi yang hangat dan kenyamanan fisik (Fe, Si). Menghindari ketegangan kekuasaan atau ambisi materialistis."
  },
  Beta: {
    name: "Beta",
    valuedElements: ["Se", "Ti", "Fe", "Ni"],
    atmosphere: "Aristokratis-Kolektif, Bergelora, Terstruktur, Berorientasi pada Visi Bersama.",
    description: "Quadra Beta memadukan kehendak aksi taktis (Se, Ti) demi mewujudkan visi atau makna historis yang agung (Ni), didorong oleh orkestrasi emosional kelompok yang kuat (Fe). Menghargai hierarki, kepemimpinan, kompetisi, dan loyalitas kelompok."
  },
  Gamma: {
    name: "Gamma",
    valuedElements: ["Se", "Fi", "Te", "Ni"],
    atmosphere: "Demokratis-Individualis, Kompetitif, Pragmatis, Fokus pada Hubungan Setia.",
    description: "Quadra Gamma berfokus pada aksi bisnis pragmatis (Te) dan kehendak tekad mandiri (Se) dipadukan dengan kesetiaan batin interpersonal yang kuat (Fi) serta kalkulasi risiko jangka panjang (Ni). Menghargai kemandirian ekonomi dan kompetensi nyata."
  },
  Delta: {
    name: "Delta",
    atmosphere: "Aristokratis-Individualis, Tenang, Produktif, Peduli Pengembangan Manusia.",
    valuedElements: ["Ne", "Fi", "Te", "Si"],
    description: "Quadra Delta menyeimbangkan produktivitas kerja berkualitas tinggi (Te) dengan pemenuhan kenyamanan dan estetika hidup sehari-hari (Si), serta pengembangan potensi unik individu (Ne) dalam ikatan relasi tulus yang mendalam (Fi). Menghindari drama emosional ekstrem."
  }
};

export const TIM_MODELS: Record<TIM, TIMModel> = {
  ILE: { type: "ILE", name: "Don Quixote", fullName: "Intuitive Logical Extratim", quadra: "Alpha", club: "Researchers", temperament: "EP", dual: "SEI", positions: { Base: "Ne", Creative: "Ti", Role: "Se", Vulnerable: "Fi", Suggestive: "Si", Mobilizing: "Fe", Ignoring: "Ni", Demonstrative: "Te" } },
  SEI: { type: "SEI", name: "Dumas", fullName: "Sensory Ethical Introtim", quadra: "Alpha", club: "Socials", temperament: "IP", dual: "ILE", positions: { Base: "Si", Creative: "Fe", Role: "Ni", Vulnerable: "Te", Suggestive: "Ne", Mobilizing: "Ti", Ignoring: "Se", Demonstrative: "Fi" } },
  ESE: { type: "ESE", name: "Hugo", fullName: "Ethical Sensory Extratim", quadra: "Alpha", club: "Socials", temperament: "EJ", dual: "LII", positions: { Base: "Fe", Creative: "Si", Role: "Te", Vulnerable: "Ni", Suggestive: "Ti", Mobilizing: "Ne", Ignoring: "Fi", Demonstrative: "Se" } },
  LII: { type: "LII", name: "Robespierre", fullName: "Logical Intuitive Introtim", quadra: "Alpha", club: "Researchers", temperament: "IJ", dual: "ESE", positions: { Base: "Ti", Creative: "Ne", Role: "Fi", Vulnerable: "Se", Suggestive: "Fe", Mobilizing: "Si", Ignoring: "Te", Demonstrative: "Ni" } },
  
  SLE: { type: "SLE", name: "Zhukov", fullName: "Sensory Logical Extratim", quadra: "Beta", club: "Pragmatists", temperament: "EP", dual: "IEI", positions: { Base: "Se", Creative: "Ti", Role: "Ne", Vulnerable: "Fi", Suggestive: "Ni", Mobilizing: "Fe", Ignoring: "Si", Demonstrative: "Te" } },
  IEI: { type: "IEI", name: "Yesenin", fullName: "Intuitive Ethical Introtim", quadra: "Beta", club: "Humanitarians", temperament: "IP", dual: "SLE", positions: { Base: "Ni", Creative: "Fe", Role: "Si", Vulnerable: "Te", Suggestive: "Se", Mobilizing: "Ti", Ignoring: "Ne", Demonstrative: "Fi" } },
  EIE: { type: "EIE", name: "Hamlet", fullName: "Ethical Intuitive Extratim", quadra: "Beta", club: "Humanitarians", temperament: "EJ", dual: "LSI", positions: { Base: "Fe", Creative: "Ni", Role: "Te", Vulnerable: "Si", Suggestive: "Ti", Mobilizing: "Se", Ignoring: "Fi", Demonstrative: "Ne" } },
  LSI: { type: "LSI", name: "Maxim Gorky", fullName: "Logical Sensory Introtim", quadra: "Beta", club: "Pragmatists", temperament: "IJ", dual: "EIE", positions: { Base: "Ti", Creative: "Se", Role: "Fi", Vulnerable: "Ne", Suggestive: "Fe", Mobilizing: "Ni", Ignoring: "Te", Demonstrative: "Si" } },
  
  SEE: { type: "SEE", name: "Napoleon", fullName: "Sensory Ethical Extratim", quadra: "Gamma", club: "Socials", temperament: "EP", dual: "ILI", positions: { Base: "Se", Creative: "Fi", Role: "Ne", Vulnerable: "Ti", Suggestive: "Ni", Mobilizing: "Te", Ignoring: "Si", Demonstrative: "Fe" } },
  ILI: { type: "ILI", name: "Balzac", fullName: "Intuitive Logical Introtim", quadra: "Gamma", club: "Researchers", temperament: "IP", dual: "SEE", positions: { Base: "Ni", Creative: "Te", Role: "Si", Vulnerable: "Fe", Suggestive: "Se", Mobilizing: "Fi", Ignoring: "Ne", Demonstrative: "Ti" } },
  LIE: { type: "LIE", name: "Jack London", fullName: "Logical Intuitive Extratim", quadra: "Gamma", club: "Researchers", temperament: "EJ", dual: "ESI", positions: { Base: "Te", Creative: "Ni", Role: "Fe", Vulnerable: "Si", Suggestive: "Fi", Mobilizing: "Se", Ignoring: "Ti", Demonstrative: "Ne" } },
  ESI: { type: "ESI", name: "Dreiser", fullName: "Ethical Sensory Introtim", quadra: "Gamma", club: "Socials", temperament: "IJ", dual: "LIE", positions: { Base: "Fi", Creative: "Se", Role: "Ti", Vulnerable: "Ne", Suggestive: "Te", Mobilizing: "Ni", Ignoring: "Fe", Demonstrative: "Si" } },
  
  IEE: { type: "IEE", name: "Huxley", fullName: "Intuitive Ethical Extratim", quadra: "Delta", club: "Humanitarians", temperament: "EP", dual: "SLI", positions: { Base: "Ne", Creative: "Fi", Role: "Se", Vulnerable: "Ti", Suggestive: "Si", Mobilizing: "Te", Ignoring: "Ni", Demonstrative: "Fe" } },
  SLI: { type: "SLI", name: "Gabin", fullName: "Sensory Logical Introtim", quadra: "Delta", club: "Pragmatists", temperament: "IP", dual: "IEE", positions: { Base: "Si", Creative: "Te", Role: "Ni", Vulnerable: "Fe", Suggestive: "Ne", Mobilizing: "Fi", Ignoring: "Se", Demonstrative: "Ti" } },
  LSE: { type: "LSE", name: "Sherlock Holmes", fullName: "Logical Sensory Extratim", quadra: "Delta", club: "Pragmatists", temperament: "EJ", dual: "EII", positions: { Base: "Te", Creative: "Si", Role: "Fe", Vulnerable: "Ni", Suggestive: "Fi", Mobilizing: "Ne", Ignoring: "Ti", Demonstrative: "Se" } },
  EII: { type: "EII", name: "Dostoevsky", fullName: "Ethical Intuitive Introtim", quadra: "Delta", club: "Humanitarians", temperament: "IJ", dual: "LSE", positions: { Base: "Fi", Creative: "Ne", Role: "Ti", Vulnerable: "Se", Suggestive: "Te", Mobilizing: "Si", Ignoring: "Fe", Demonstrative: "Ni" } }
};

export const TIM_PROFILES: Record<TIM, TIMProfile> = {
  ILE: {
    type: "ILE",
    description: "Pendobrak sekat konseptual yang selalu mencari kemungkinan baru. Anda melihat dunia sebagai anyaman rahasia yang menunggu diuraikan lewat teori terstruktur. Anda senang menyatukan berbagai bidang ilmiah yang tampak tidak berhubungan menjadi gagasan baru.",
    orientasiBase: "Menangkap potensi tersembunyi, inovasi gagasan murni, dan hubungan spekulatif tanpa batas.",
    caraCreative: "Membangun penjelasan teoretis, diagram, dan keteraturan logis untuk mewujudkan alternatif baru.",
    roleTampilan: "Berusaha terlihat tegas dan siap beraksi taktis saat ditekan, namun menguras tenaga bila berkepanjangan.",
    tuntutanPolr: "Sangat tidak nyaman dengan keharusan menilai kesetiaan moral batin seseorang atau mengurus gosip emosional personal.",
    bantuanSuggestive: "Relief luar biasa didapat saat lingkungan sekitar merawat kenyamanan tubuh, memberi hidangan lezat, dan suasana rileks tanpa tuntutan.",
    areaMobilizing: "Sangat bersemangat menghidupkan keceriaan sosial, mendambakan dipuji karena mampu meramaikan suasana kelompok.",
    kompetensiIgnoring: "Sangat memahami visi masa depan yang abstrak atau ramalan tren, tetapi cenderung mengabaikannya karena lebih menyukai pilihan aktif yang ada di hadapan.",
    kemampuanDemonstrative: "Secara otomatis membagikan trik efisiensi praktis, merancang perbaikan alat bertenaga tinggi, tetapi enggan menyombongkannya.",
    polaSeimbang: "Aktif membangun teori, ramah mengobrol, sehat merawat tubuh secara berkala bersama lingkar dekatnya.",
    polaTertekan: "Menjadi defensif secara fisik, terobsesi dengan aturan formal yang kaku, atau merasa ditinggalkan secara emosional oleh kawan dekat.",
    gayaBelajar: "Eksploratif, menyukai pembelajaran konseptual tanpa sekat, membuat mind-map yang rumit.",
    gayaKerja: "Visioner, perancang sistem awal, pembongkar kemacetan ide lewat brainstorming tanpa batas.",
    gayaKomunikasi: "Argumentatif namun santai, dipenuhi kiasan analogi tak terduga, cepat berpindah topik.",
    kebutuhanKelompok: "Sebagai katalis ide-ide murni dan penyusun model teoritis awal yang fleksibel.",
    batasPerhatian: "Terlalu cepat bosan pada detail rutin dan cenderung mengabaikan keutuhan relasi emosional batin.",
    CommonMistypes: ["ENTP (MBTI)", "IEE (Socionics - akibat kemiripan sifat kreatif)", "LII (akibat fokus teori yang kuat)"],
    refleksi: "Apakah dorongan mengeksplorasi ide baru kadang menjauhkanmu dari memperhatikan kebutuhan tubuh sendiri dan perasaan orang-orang tercinta?",
    buktiMenyangkal: "Jika Anda ternyata sangat teliti menjaga detail kenyamanan fisik sehari-hari tanpa bantuan eksternal dan sangat sensitif terhadap keretakan relasi batin kawan dekat secara konstan, mungkin Anda tipe lain."
  },
  SEI: {
    type: "SEI",
    description: "Pemelihara keharmonisan indrawi dan kehangatan emosi. Anda bergerak di dunia berdasarkan kenyamanan lingkungan, merespons kebutuhan fisik secara rileks, dan mahir mencairkan suasana canggung melalui gurauan ringan bin lembut.",
    orientasiBase: "Sensasi kenyamanan indrawi, kesehatan fisik, detail estetika yang asri, dan kehidupan yang tenang.",
    caraCreative: "Menciptakan suasana sosial yang hangat, mengekspresikan keramahan emosi secara langsung untuk menyatukan orang.",
    roleTampilan: "Mempresentasikan diri sebagai orang yang visioner dan terencana di hadapan publik, padahal batinnya lebih suka mengikuti aliran momen.",
    tuntutanPolr: "Mengalami stres tinggi bila dipaksa bekerja di lingkungan berantakan dengan perdebatan efisiensi bisnis kering tanpa kehangatan.",
    bantuanSuggestive: "Sangat berterima kasih ketika ada orang lain yang datang membawa teori-teori baru yang jenius murni tanpa mengharapkan ia merancang teori itu.",
    areaMobilizing: "Ingin membuktikan diri mampu berpikir secara terstruktur dan logis, sangat menikmati pujian atas analisisnya.",
    kompetensiIgnoring: "Mampu menegaskan otoritas diri saat didesak, namun buru-buru meredakannya karena mengganggu kedamaian.",
    kemampuanDemonstrative: "Secara alami membaca nuansa emosi orang lain dan menjaga kedamaian batin dalam ikatan persahabatan sejati di balik layar.",
    polaSeimbang: "Mampu menyalurkan kreativitas seni, menjaga kepuasan pangan, teratur menyusun logika hidup yang jernih.",
    polaTertekan: "Mengisolasi diri secara fisik, menjadi terlalu sensitif terhadap ancaman dari luar, atau memaksakan keceriaan palsu yang melelahkan.",
    gayaBelajar: "Praktis bernuansa indrawi, menyukai contoh nyata yang nyaman dipahami, dibantu visual yang indah.",
    gayaKerja: "Menciptakan lingkungan kerja yang ramah emosi, kolaborator andal yang menjaga kebahagiaan tim pelaksana.",
    gayaKomunikasi: "Hangat, santun, penuh candaan bersahabat, menghindari konfrontasi langsung.",
    kebutuhanKelompok: "Sebagai perekat sosial yang merawat kenyamanan fisik dan kebersamaan kelompok secara nyata.",
    batasPerhatian: "Sering menunda-nunda keputusan penting karena enggan melangkah keluar dari situasi nyaman.",
    CommonMistypes: ["ISFP (MBTI)", "ESE (Socionics - akibat dorongan bersosialisasi hangat)", "IEI (akibat kemiripan sifat damai)"],
    refleksi: "Apakah keengganan berkonfrontasi membuatmu memendam banyak kekesalan fisik dan emosional hingga meracuni batinmu sendiri?",
    buktiMenyangkal: "Jika Anda terbukti sangat menyukai perdebatan konseptual abstrak yang rumit secara tiada henti dan mengabaikan tidur/pola makan dengan mudah demi produktivitas bisnis yang keras, Anda bukan SEI."
  },
  ESE: {
    type: "ESE",
    description: "Orkestrator kegembiraan sosial yang energetik. Anda memiliki radar tajam untuk membaca 'getaran emosi' ruangan dan dengan sigap menggelontorkan aksi kepedulian fisik bagi kenyamanan orang-orang di sekitar.",
    orientasiBase: "Mengekspresikan gairah emosional, menyebarkan kegembiraan, mendeteksi kelusuan atmosfer kelompok untuk diperbaiki.",
    caraCreative: "Menata estetika fisik, menyediakan makanan, kesehatan, dan keindahan detail ruang sekitar demi kebahagiaan sesama.",
    roleTampilan: "Berusaha tampil sangat produktif, logis, dan profesional secara administratif di tempat kerja ilmiah.",
    tuntutanPolr: "Sangat panik jika dihadapkan pada ketidakpastian waktu, keterlambatan kronis, atau tuntutan memetakan tren visioner abstrak.",
    bantuanSuggestive: "Lega sekali jika ada pasangan yang membantunya merapikan definisi konseptual, sistem administrasi, dan konsistensi hukum objektif.",
    areaMobilizing: "Sangat menyukai petualangan menemukan ide-ide baru, menggemari diskusi kemungkinan kreatif demi dinilai berpengetahuan luas.",
    kompetensiIgnoring: "Punya kepatuhan etis interpersonal yang kuat, namun emosi sponannya yang menyala di luar sering menutupi jarak psikologis yang murni.",
    kemampuanDemonstrative: "Secara bawah sadar lihai mengamankan perlindungan fisik dan menunjukkan tekad kepemimpinan taktis di saat krisis melanda kelompok.",
    polaSeimbang: "Teratur mengelola waktu dengan bantuan perencana, aktif membina relasi hangat, dan menjaga struktur administrasi rumah tangga.",
    polaTertekan: "Menjadi sangat cemas tentang masa depan, menuduh orang lain tidak menghargai pengorbanan emosinya, serta bertindak terburu-buru yang merusak fisik.",
    gayaBelajar: "Interaktif, menyukai demonstrasi langsung dengan dinamika vokal yang berenergi dan diskusi kelompok.",
    gayaKerja: "Penyelenggara acara utama, komunikator tim yang energik, memastikan semua orang terurus kebutuhannya.",
    gayaKomunikasi: "Ekspresif, bermelodi, menggunakan bahasa tubuh yang kaya, cenderung dominan dalam percakapan.",
    kebutuhanKelompok: "Pembangun moral perjuangan kelompok dan pelaksana urusan kenyamanan fisik yang super andal.",
    batasPerhatian: "Rentan kelelahan ekstrem karena memaksakan diri merawat emosi semua orang tanpa istirahat terjadwal.",
    CommonMistypes: ["ESFJ (MBTI)", "EIE (Socionics - sering dikacaukan karena sama-sama menyukai ekspresi sosial)", "SEE (akibat kesamaan energi dominan)"],
    refleksi: "Apakah ketakutanmu terhadap kesunyian atau situasi tak pasti memaksamu terus-menerus memicu aktivitas sosial tanpa arti?",
    buktiMenyangkal: "Jika Anda terbukti dingin secara emosional, sangat menikmati kesendirian yang sunyi sepanjang hari, dan lihai bersenang-senang mengonseptualisasikan tren abstrak tanpa peduli kenyamanan fisik orang sekitar, Anda bukan ESE."
  },
  LII: {
    type: "LII",
    description: "Arsitek sistem yang berdedikasi mencari esensi keadilan logis. Anda mengupas realitas hingga ke fondasi struktur teoretisnya, lalu merapikannya ke dalam klasifikasi murni yang konsisten.",
    orientasiBase: "Analisis logis murni, klasifikasi terstruktur, penegakan prinsip keadilan, ketertarikan teoritis.",
    caraCreative: "Menjelajahi alternatif konseptual, melahirkan gagasan spekulatif unik untuk memperluas cakrawala sistem.",
    roleTampilan: "Mempresentasikan diri sebagai sosok yang peduli hubungan etis dan ramah secara personal di lingkungan formal.",
    tuntutanPolr: "Merasa sangat terancam oleh desakan fisik yang agresif, intimidasi kekuasaan langsung, atau konfrontasi perebutan wilayah taktis.",
    bantuanSuggestive: "Jiwa batinnya dipenuhi kedamaian ketika berada di dekat orang yang membawa kegembiraan emosional murni, kehangatan atmosfer sosial, dan tawa tulus.",
    areaMobilizing: "Sangat mendambakan tubuhnya sehat dan hidupnya dipenuhi kenyamanan indrawi yang rapi, bangga jika dinilai terurus fisiknya.",
    kompetensiIgnoring: "Sangat andal dalam menyusun efisiensi bisnis pragmatis, namun mengabaikannya jika teori logis prinsipilnya tidak terpenuhi.",
    kemampuanDemonstrative: "Secara otomatis memprediksi skenario jangka panjang dari teori buatannya secara tajam tanpa perlu pamer keahlian visioner.",
    polaSeimbang: "Rutin berolahraga ringan, aktif berdiskusi gagasan baru, dan sesekali menikmati festival musik yang hangat.",
    polaTertekan: "Menarik diri ke dalam analisis teoretis obsesif yang paranoid, kehilangan rasa aman emosional, atau tiba-tiba meledak kasar menentang penindas kasar.",
    gayaBelajar: "Sains teoretis murni, menyukai buku rujukan tebal yang disusun sistematis dan objektif secara matematis.",
    gayaKerja: "Perancang skema algoritma, analis kebijakan berkeadilan sosial, penasihat murni yang independen.",
    gayaKomunikasi: "Tenang, artikulatif, menggunakan bahasa pres
