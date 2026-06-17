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
    gayaKomunikasi: "Tenang, artikulatif, menggunakan bahasa presisi, seringkali terdengar formal dan datar pada awalnya.",
    kebutuhanKelompok: "Sebagai pilar kejernihan logika, penilai objektif aturan, dan penyeimbang keadilan klasifikasi.",
    batasPerhatian: "Terlalu lama bergulat dalam teori murni sehingga melewatkan momentum bertindak secara taktis di dunia nyata.",
    CommonMistypes: ["INTJ (MBTI)", "ILE (Socionics - akibat ketajaman gagasan)", "ILI (akibat kesamaan sifat pendiam)"],
    refleksi: "Apakah ketakutanmu pada tekanan fisik membuatmu lari ke dunia aturan logis murni dan menolak menghadapi kompleksitas praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai aksi perebutan kekuasaan fisik di lapangan, lincah bertarung secara taktis demi material, dan benci aturan teoretis abstrak, Anda bukan LII."
  },
  SLE: {
    type: "SLE",
    description: "Panglima aksi taktis yang menguasai ruang fisik. Anda melihat hidup sebagai medan kekuatan yang harus dituntun secara strategis, mahir mengalokasikan sumber daya, menegakkan hierarki disiplin, dan mendobrak hambatan fisik langsung.",
    orientasiBase: "Kehendak baja, penguasaan ruang fisik taktis, kontrol wilayah, arah mobilisasi tim secara dominan.",
    caraCreative: "Membangun sistem klasifikasi, analisis hukum, dan aturan hierarki yang tegas untuk mengunci kekuasaan.",
    roleTampilan: "Berusaha tampil berwawasan konseptual unik, membaca kemungkinan alternatif di depan klien besar.",
    tuntutanPolr: "Sangat rapuh di wilayah kedekatan relasi emosional batin (Fi); takut disingkirkan secara etis atau dituduh tak tulus hatinya.",
    bantuanSuggestive: "Luar biasa ditenangkan ketika didampingi oleh figur bijak yang meramalkan tren masa depan, konsekuensi mistik jangka panjang, dan mengurai kecemasan batinnya.",
    areaMobilizing: "Mendambakan suasana sosial yang meriah penuh tawa riang, bangga jika diakui mampu membuat orang termotivasi gembira.",
    kompetensiIgnoring: "Sangat tangguh secara daya tahan tubuh dan kebugaran fisik rutin, tetapi melindas kenyamanan fisik demi meraih target kemenangan target.",
    kemampuanDemonstrative: "Secara instingtif membongkar inefisiensi administrasi proyek kerja pragmatis, langsung mengarahkan sumber daya secara instan.",
    polaSeimbang: "Mampu menyalurkan energi kepemimpinan secara adil, mendengarkan nasehat spiritual, dan melatih disiplin etis yang tulus.",
    polaTertekan: "Menjadi paranoid terhadap kesetiaan kawan sedekatnya, bertindak sangat agresif secara fisik untuk mempertahankan kontrol, atau jatuh dalam kemurungan batin.",
    gayaBelajar: "Studi kasus taktis, membedah struktur organisasi kekuasaan, menyukai pelatihan kepemimpinan militer/olahraga keras.",
    gayaKerja: "Eksekutor krisis murni, jenderal lapangan industri, pembangun infrastruktur berskala masif.",
    gayaKomunikasi: "Tegas, langsung to-the-point, berwibawa, menggunakan perintah verbal yang lugas.",
    kebutuhanKelompok: "Sebagai panglima pelaksana yang memastikan target tercapai melalui disiplin internal yang solid.",
    batasPerhatian: "Sering melindas ikatan relasi tulus kawan dekat demi tegaknya aturan taktis pencapaian target.",
    CommonMistypes: ["ESTP (MBTI)", "SEE (Socionics - sering dikacaukan karena sama-sama gigih secara fisik)", "LSI (akibat kesamaan ketatnya aturan logis)"],
    refleksi: "Apakah kekerasan lahiriahmu sebenarnya topeng untuk menyembunyikan ketakutan mendalam akan pengkhianatan emosional kawan dekat?",
    buktiMenyangkal: "Jika Anda terbiasa cemas secara fisik, sangat menghindari membebankan kehendak pada orang lain, dan menghargai kesantunan hubungan batin di atas segalanya, Anda bukan SLE."
  },
  IEI: {
    type: "IEI",
    description: "Penyair batin yang menavigasi arus waktu dan makna spiritual. Anda menangkap arah perkembangan zaman, mengurai emosi tersembunyi, dan membimbing jiwa-jiwa keras agar melunak melalui bahasa puitis yang menyentuh hati.",
    orientasiBase: "Aliran batiniah waktu, tren perkembangan visioner, firasat murni, dan makna eksistensial peristiwa.",
    caraCreative: "Memengaruhi dinamika emosi sekitar, mencairkan kemarahan dengan orkestrasi ekspresi yang santun bin bermelodi.",
    roleTampilan: "Tampil sangat peduli pada detail kenyamanan indrawi dan tata krama kerapian di lingkungan formal baru.",
    tuntutanPolr: "Merasa sangat tersiksa oleh instruksi bisnis yang garing teknis, fakta-fakta ekonomi kering, atau tuntutan efisiensi kerja tanpa jiwa kemanusiaan.",
    bantuanSuggestive: "Kemantapan hidupnya utuh di dekat pelindung tangguh yang berkehendak tegas, dominan secara taktis, dan membantunya bertindak di dunia nyata.",
    areaMobilizing: "Ingin dipuji sebagai pemikir analitis yang objektif dan konsisten dalam merumuskan teori terstruktur.",
    kompetensiIgnoring: "Sangat kreatif melahirkan ide-ide alternatif konseptual baru, tetapi mengabaikannya demi fokus pada ramalan tren utama yang ia yakini terjadi.",
    kemampuanDemonstrative: "Secara alami menjaga jarak psikologis etis yang tulus di balik layar dalam hubungan persahabatan sejati.",
    polaSeimbang: "Konsisten menulis karya sastra/seni, melatih logika teoretis, menetapkan batasan aksi taktis bersama mentor tepercaya.",
    polaTertekan: "Tergelincir menjadi pemimpi pasif yang menyalahkan realitas objektif, terjebak dalam delusi penganiayaan emosional, atau membelanjakan uang secara serampangan.",
    gayaBelajar: "Metafora imajinatif, menyukai pembelajaran sejarah, filsafat, sastra, psikologi naratif.",
    gayaKerja: "Inspirator spiritual tim, penasihat arah perubahan budaya, perancang naskah komunikasi visioner.",
    gayaKomunikasi: "Lembut, diplomatis, puitis, kaya metafora, menggunakan intonasi emosional yang menyentuh.",
    kebutuhanKelompok: "Sebagai jangkar visi masa depan yang membimbing moral pejuang kelompok lewat inspirasi emosional hangat.",
    batasPerhatian: "Seringkali mangkir dari kewajiban tugas praktis harian karena tenggelam dalam dunia imajinasi internal.",
    CommonMistypes: ["INFJ (MBTI)", "EII (Socionics - sering tertukar karena kelembutan batin)", "SEI (akibat kemiripan kenyamanan batin)"],
    refleksi: "Apakah pelarianmu ke dalam dimensi firasat masa depan sebenarnya cara menghindari realitas keras tanggung jawab hidup praktis?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai keteraturan data bisnis yang dingin, rajin menghitung laba-rugi operasional harian, dan benci metafora sastra mistis, Anda bukan IEI."
  },
  EIE: {
    type: "EIE",
    description: "Dramaturg perjuangan ideologis yang membakar gairah khalayak. Anda menerjemahkan visi jangka panjang menjadi histeria emosional massal demi menggerakkan roda perubahan sejarah kemanusiaan.",
    orientasiBase: "Ketenaran emosional, orkestrasi atmosfer sosial, membakar gairah kelompok demi keadilan ideologis.",
    caraCreative: "Membaca dinamika tren masa depan, meramalkan konsekuensi perubahan zaman bagi kehidupan spiritual.",
    roleTampilan: "Berusaha keras tampak sangat mahir mengurus bisnis administrasi praktis yang diatur rapi.",
    tuntutanPolr: "Sangat terancam oleh tuntutan mengurus detail perawatan fisik tubuh jasmani, sensasi indrawi rutin, atau memasak harian.",
    bantuanSuggestive: "Sangat terbantu oleh orang terstruktur yang membawakan keteraturan logika formal, penjelasan teoretis yang baku dinamis.",
    areaMobilizing: "Sangat ingin diakui sebagai pemimpin aksi taktis yang tegas dan pemberani di garis depan pertempuran fisik.",
    kompetensiIgnoring: "Sangat memahami ikatan kesetiaan moral etis personal, tetapi lebih memilih membakar emosi kelompok demi tujuan besar.",
    kemampuanDemonstrative: "Secara otomatis mendeteksi potensi tersembunyi gagasan ilmiah baru, melahirkan alternatif tak terduga secara cerdas harian.",
    polaSeimbang: "Teratur merawat kesehatan fisik bersama pasangannya, membina disiplin kaji teori, mengarahkan drama sosial demi kebaikan.",
    polaTertekan: "Mengalami ketakutan paranoid akan penyakit fisik di organ tubuhnya, melontarkan luapan emosi histeris merusak hubungan etis personal kawan dekat.",
    gayaBelajar: "Drama naratif historis, menyukai kuliah dengan dosen karismatik yang mendiskusikan visi kemanusiaan agung.",
    gayaKerja: "Komunikator masa depan, sutradara kreatif, aktor hubungan politik global, pembina ideologi perjuangan.",
    gayaKomunikasi: "Dramatis, teatral, berwibawa, sarat gairah emosional, piawai memikat hati pendengar dengan metafora dinamis.",
    kebutuhanKelompok: "Sebagai pembakar semangat juang ideologi kemanusiaan yang mempersatukan kelompok dalam batin perjuangan.",
    batasPerhatian: "Sering merusak kesehatan diri sendiri demi menjaga panggung pertunjukan emosi khalayak.",
    CommonMistypes: ["ENFJ (MBTI)", "ESE (Socionics - akibat kesamaan ekspresi sosial berpendar)", "LIE (akibat visi aksi yang menggebu)"],
    refleksi: "Apakah ledakan emosi panggungmu benar-benar memperjuangkan nilai tulus, atau sekadar ketakutan batinmu akan pengabaian khalayak?",
    buktiMenyangkal: "Jika Anda dingin secara sosial, sangat asik menghidupkan kenyamanan indrawi seperti memijat tubuh secara mandiri dengan teliti harian, serta benci panggung pembicara kelompok, Anda bukan EIE."
  },
  LSI: {
    type: "LSI",
    description: "Inspektur keteraturan sistem yang mengawal disiplin operasional. Anda adalah batu karang kestabilan, merapikan setiap sel regulasi, menegakkan keadilan klasifikasi logika murni, didukung pengawasan taktis yang presisi harian.",
    orientasiBase: "Klasifikasi logika terstruktur, hukum tertulis yang baku murni, keadilan regulasi dan keteraturan sistemik.",
    caraCreative: "Menerapkan kepemimpinan taktis fisik, menegakkan disiplin operasional di lapangan kerja.",
    roleTampilan: "Tampil sangat bersahabat secara moral interpersonal harian di lingkungan kerja baru untuk kenyamanan administratif.",
    tuntutanPolr: "Mengalami kelumpuhan aksi ketika menghadapi alternatif spekulatif yang berubah tanpa batas waktu, atau ide nirkabel nireguler.",
    bantuanSuggestive: "Hatinya tergetar melembut di dekat sosok karismatik yang membawakan gairah emosional membakar, keceriaan kelompok yang tulus berpendar.",
    areaMobilizing: "Sangat mendambakan bimbingan visi masa depan, mendambakan dipuji karena mampu menangkap tren mistis eksistensial.",
    kompetensiIgnoring: "Sangat mahir mengurus detail bisnis administrasi praktis, tetapi menundukkannya di bawah aturan logika filosofis prinsipil.",
    kemampuanDemonstrative: "Secara alami menjaga kerapian fisik, kebersihan ruang, dan keteraturan sensasi tubuh sehat harian di latar belakang.",
    polaSeimbang: "Secara sadar membuka ruang diskusi alternatif gagasan, rutin bersenang-senang menikmati orkestrasi seni teater yang hangat.",
    polaTertekan: "Menjadi birokrat luar biasa kaku yang menindas setiap ide unik, terobsesi membongkar persekongkolan fantasi fiktif yang dicurigai menyerangnya.",
    gayaBelajar: "Instruktif, terstruktur, menyetujui bagan diagram murni yang terbukti kokoh dan terdokumentasi rapi.",
    gayaKerja: "Administrator kepatuhan mutu harian, inspektur tata tertib kerja proyek fisik, pengelola operasional bersistem ketat.",
    gayaKomunikasi: "Komunikasi formal-monoton, presisi tinggi, lugas murni berpola deduktif.",
    kebutuhanKelompok: "Sebagai pengawal kedisiplinan regulasi internal dan penjamin kelancaran operasional taktis tim.",
    batasPerhatian: "Seringkali membunuh kreativitas ide-ide liar unik demi memaksakan kepatuhan terhadap regulasi tertulis lama.",
    CommonMistypes: ["ISTJ (MBTI)", "SLE (Socionics - sering dikacaukan karena ketegasan fisik)", "ESI (akibat kemiripan menjaga etika hukum batin)"],
    refleksi: "Apakah ketakutanmu menghadapi ketidakpastian ide baru memaksamu membangun tembok aturan hukum yang mengurung kebebasan sesama?",
    buktiMenyangkal: "Jika Anda terbukti sangat membenci aturan formal administrasi, lincah berspekulasi ide aneh yang berantakan, serta tidak peduli kerapian ruang, Anda bukan LSI."
  },
  SEE: {
    type: "SEE",
    description: "Wiraswasta kharisma yang menaklukkan tantangan hubungan interpersonal. Anda memiliki tekad beraksi yang berlimpah, memobilisasi orang demi target praktis menggunakan diplomasi pesona pribadi yang lincah berpendar.",
    orientasiBase: "Kehendak baja, taktis fisik penuh energi, penguasaan wilayah, pengaruh direktif lewat pesona kharisma.",
    caraCreative: "Membina kedekatan relasi etis personal, menyepakati nilai moral batin tulus demi mendulang loyalitas tim.",
    roleTampilan: "Tampil tampak ramah dengan berwawasan teoretis saat diskusi ilmiah, berusaha terlihat pintar akademis kaku.",
    tuntutanPolr: "Sangat menderita ketika dipaksa menganalisis teori matematika murni formal kering, atau bagan logika klasifikasi rumit.",
    bantuanSuggestive: "Lega luar biasa dibantu oleh analis visioner yang merangkum kalkulasi konsekuensi tren jangka panjang dan strategi bisnis.",
    areaMobilizing: "Ingin dipuji sebagai pekerja profesional yang berwawasan efisiensi bisnis pragmatis canggih tinggi praktis.",
    kompetensiIgnoring: "Sangat andal menjaga kegembiraan emosional kelompok berpendar, tetapi memprioritaskan ketulusan aliansi relasi batin harian.",
    kemampuanDemonstrative: "Secara instingtif mendeteksi kebugaran jasmani fisik kawan terdekatnya, menjaga keasrian tubuh alami harian secara otomatis.",
    polaSeimbang: "Aktif melatih kesabaran belajar teori prinsipil, merenungkan tren pembangunan zaman bersama penasihat spiritual tepercaya.",
    polaTertekan: "Menjadi curiga teoretis secara konyol, bertindak manipulatif lewat relasi personal untuk memukul lawan bisnis, jatuh dalam kecemasan target.",
    gayaBelajar: "Pembelajaran aktif interaktif penuh negosiasi, membedah dinamika kepemimpinan personal dan politik pragmatis.",
    gayaKerja: "Negosiator bisnis hebat, pemimpin aktivis pergerakan, penggalang loyalitas personal berskala akar rumput harian.",
    gayaKomunikasi: "Hangat-direktif, energetik pesona tinggi, lincah menggunakan humor personal mendekatkan jarak emosi.",
    kebutuhanKelompok: "Sebagai penggalang masa yang tangguh dan pembuka gerbang aliansi strategis bernuansa kekerabatan erat.",
    batasPerhatian: "Seringkali mengorbankan ketertiban aturan sistem hukum tertulis formal demi membela kawan relasi dekatnya.",
    CommonMistypes: ["ESFP (MBTI)", "SLE (Socionics - akibat dorongan fisik yang energetik)", "IEE (akibat kemiripan dalam kelincahan sosial)"],
    refleksi: "Apakah pesona diplomasi personalmu sebenarnya cara menghindari perenungan jernih akan kekosongan arah hidup jangka panjangmu?",
    buktiMenyangkal: "Jika Anda ternyata pendiam kaku, sangat asyik meneliti klasifikasi logika formal murni sepanjang hari, serta benci politik negosiasi personal praktis, Anda bukan SEE."
  },
  ILI: {
    type: "ILI",
    description: "Begawan analisis yang merenungkan konsekuensi waktu. Anda adalah kritikus objektif penyaring risiko jangka panjang, membedah inefisiensi bisnis murni pragmatis dibantu oleh visi masa depan yang tenang bin tajam.",
    orientasiBase: "Membaca arah tren jangka panjang, analisis konsekuensi waktu, pertapa batiniah menyaring risiko buruk.",
    caraCreative: "Merancang efisiensi praktis operasional bisnis, mengoptimalisasi sumber daya riil lewat fakta objektif harian.",
    roleTampilan: "Tampil bersikap sopan ramah rileks dengan menyapa tetangga, menunjukkan perawatan kenyamanan sosial formal.",
    tuntutanPolr: "Mengalami stres akut bila dipaksa menghidupkan keceriaan histeris emosional kelompok secara manipulatif harian.",
    bantuanSuggestive: "Merasa jiwanya dinyalakan berenergi ketika ditemani kawan bertekad baja energetik yang menggerakkannya masuk ke lapangan tindakan.",
    areaMobilizing: "Sangat mendambakan ketulusan hubungan etis personal yang setia, bangga dinilai sebagai kekasih yang tulus setia.",
    kompetensiIgnoring: "Sangat pandai menyusun klasifikasi logika teoritis murni, tetapi membuangnya sebagai kesenangan tak berguna tanpa hasil pragmatis.",
    kemampuanDemonstrative: "Secara alami memisahkan diri ke dalam prediksi spekulatif alternatif gagasan baru secara cerdas otomatis di belakang layar.",
    polaSeimbang: "Menjaga keontentikan hubungan batin dekatnya, teratur berolahraga aktif, dan mengekspresikan kritik secara konstruktif logis.",
    polaTertekan: "Menarik diri ke dalam isolasi batin dingin, menghujami setiap orang dengan pesimisme tajam perusak moral, serta jatuh dalam inersia pasif.",
    gayaBelajar: "Analitis komparatif mendalam, melahap buku ekonomi bisnis makro, fisika teori, sejarah ramalan peradaban.",
    gayaKerja: "Analis risiko keuangan global, kritikus kualitas sistem, arsitek strategi bisnis jangka panjang.",
    gayaKomunikasi: "Skeptis-tenang, satir hangat secara intelektual, datar, menggunakan analogi logis pragmatis ringkas.",
    kebutuhanKelompok: "Sebagai navigator arah jangka panjang penjamin keselamatan kelompok dari keputusan tergesa-gesa buruk.",
    batasPerhatian: "Kecenderungan menolak bertindak langsung di lapangan karena terlalu asyik menyaring cacat dan risiko teoretis.",
    CommonMistypes: ["INTJ (MBTI)", "LII (Socionics - akibat kemiripan sifat analitis akademis)", "SLI (akibat kesamaan pembawaan tenang rileks)"],
    refleksi: "Apakah kritisme satirmu sebenarnya cara bertahan dari ketakutanmu menghadapi ketidakmampuan bergaul ramah secara emosi hangat?",
    buktiMenyangkal: "Jika Anda terbukti sangat energetik bersosialisasi membakar emosi kelompok panggung sepanjang hari, dan benci kalkulasi risiko jangka panjang ekonomi, Anda bukan ILI."
  },
  LIE: {
    type: "LIE",
    description: "Wirausahawan dinamis yang mengejar realisasi target pragmatis. Anda mengawasi proses bisnis dengan lincah, memadukan riset pasar pragmatis dengan visi tren masa depan yang menguntungkan harian.",
    orientasiBase: "Efisiensi bisnis teoretis praktis, alokasi investasi sumber daya, aksi cepat melipatgandakan produktivitas empiris.",
    caraCreative: "Memetakan arah tren bisnis masa depan, memproyeksikan kalkulasi waktu jangka panjang secara visioner.",
    roleTampilan: "Mempresentasikan diri berpura-pura ramah sosial emosional hangat membara saat memikat penanam modal baru harian.",
    tuntutanPolr: "Mengalami depresi batin jika dipaksa menata estetik kenyamanan indrawi detail ruang hias, atau pijat santai relaks harian fisik.",
    bantuanSuggestive: "Jiwa batinnya tunduk melembut hormat di dekat pasangan setia bermoral batin tulus yang menjaga keaslian hubungan etis suci.",
    areaMobilizing: "Ingin diakui sebagai kesatria aksi fisik pemberani yang menguasai seni bela diri taktis atau olahraga ekstrem target fisik.",
    kompetensiIgnoring: "Sangat andal menyusun bagan logika konseptual sistem sains murni, tetapi segera mengabaikannya karena dirasakan tidak mendulang laba.",
    kemampuanDemonstrative: "Secara otomatis memancar ide-ide spekulatif inovasi baru bernilai bisnis cerdas tinggi di latar belakang.",
    polaSeimbang: "Secara berkala meditasi hening etis batin, rutin olahraga fisik aman, membina kesetiaan keluarga erat penuh kasih.",
    polaTertekan: "Jatuh dalam hipokondria cemas berlebihan akan penyakit fisik kecil, menuduh kawan dekatnya mengkhianati reputasinya secara moral batin.",
    gayaBelajar: "Studi kelayakan bisnis komparatif pragmatis, keuangan terapan, penerapan inovasi teknologi masa depan.",
    gayaKerja: "Pelopor industri rintisan, manajer investasi skala global, pendorong transformasi produktivitas proyek fisik.",
    gayaKomunikasi: "Cepat dinamis, penuh energi progresif, menggunakan humor candaan bisnis pragmatis produktif harian.",
    kebutuhanKelompok: "Sebagai motor penggerak keefektifan pencapaian kemakmuran ekonomi dan akselerasi visi ke depan tim.",
    batasPerhatian: "Seringkali melindas batas kebugaran fisik tubuh demi memacu ambisi produktivitas target bisnis harian.",
    CommonMistypes: ["ENTJ (MBTI)", "EIE (Socionics - akibat kesamaan dorongan aksi yang progresif keras)", "LSE (akibat kemiripan efisiensi kerja)"],
    refleksi: "Apakah ambisi akselerasi bisnis pragmatismu sebenarnya pelarian dari ketakutanmu untuk duduk diam merenungi kerentanan etis batinmu rasa bersalah?",
    buktiMenyangkal: "Jika Anda ternyata sangat menyukai bersantai rebahan sepanjang hari merawat dekorasi kamar tidur estetik dengan teliti, serta benci kalkulasi keuangan dinamis, Anda bukan LIE."
  },
  ESI: {
    type: "ESI",
    description: "Benteng penjaga kesucian moral batin dan integritas relasi. Anda mengamati ketulusan hati sesama secara hening, tegas memilah siapa yang layak dipercaya harian, didukung tekad pertahanan diri taktis yang kokoh teguh.",
    orientasiBase: "Ikatan etis moral interpersonal tulus, mendeteksi kepalsuan jarak hubungan, memegang janji integritas batin.",
    caraCreative: "Menerapkan perlindungan taktis fisik langsung, mempertahankan wilayah moral keluarga dekatnya dari perusak fisik luar.",
    roleTampilan: "Tampil tampak ramah dengan menerangkan bagan matematika teoritis kaku di ruang formal baru administratif harian.",
    tuntutanPolr: "Mengalami stres batin hebat saat dilemparkan ke dalam situasi ide konseptual acak perubahan yang serba teoritis liar nirkabel.",
    bantuanSuggestive: "Jiwa batinnya disegarkan ceria ketika ada penasihat profesional tepercaya membawakan solusi efisiensi bisnis operasional pragmatis.",
    areaMobilizing: "Sangat merindukan bimbingan visi tren masa depan, bangga jika pujian ditujukan atas kemampuannya meramal risiko zaman.",
    kompetensiIgnoring: "Sangat berbakat mengenali moral getaran emosional kelompok bersosialisasi hangat, tetapi memangkasnya demi kejujuran relasi dekat batin suci.",
    kemampuanDemonstrative: "Secara alami menjaga detail kebersihan rumah tangga, estetika kenyamanan indrawi jasmani sehat harian dalam keheningan.",
    polaSeimbang: "Teratur membaca perkembangan sejarah tren ke depan, rajin menyelaraskan bisnis karirnya, dan membuka batin terhadap alternatif ide hangat.",
    polaTertekan: "Menjadi hakim moral yang sangat kaku berpembawaan dingin memusuhi sekelompok besar orang luar, terjerembab curiga aneh-aneh tak rasional.",
    gayaBelajar: "Kesusastraan bernuansa etika perjuangan kemanusiaan, psikologi hubungan konseptual tulus pragmatis berkeluarga.",
    gayaKerja: "Pengawal kepatuhan kode etik industri, penjaga benteng operasional rahasia tim, psikolog klinis hubungan personal.",
    gayaKomunikasi: "Tenang berwibawa sekuriti batin tinggi, diplomatis jarak sosial teratur, tajam mengamati keontentikan gerak mata kawan.",
    kebutuhanKelompok: "Sebagai batu karang integritas etika internal pengaman moralitas kawan tim dekat pengusir pengkhianat.",
    batasPerhatian: "Cenderung terlalu cepat menghakimi dingin seseorang sebagai tidak tulus dan menutup pintu maaf selamanya.",
    CommonMistypes: ["ISFJ (MBTI)", "LSI (Socionics - akibat kesamaan kekristalan aturan dingin)", "EII (akibat kesamaan integritas etis batin)"],
    refleksi: "Apakah ketegasanmu memilah hubungan moral batin sebenarnya memenjarakanmu ke dalam ketakutan kesepian abadi menolak dimaafkan?",
    buktiMenyangkal: "Jika Anda sangat toleran terhadap kelonggaran moralitas batin, asyik berspekulatif teori kosmologi nirkabel liar semesta, serta mengabaikan janji setia personal, Anda bukan ESI."
  },
  IEE: {
    type: "IEE",
    description: "Penjelajah potensi kemanusiaan yang lincah menular pesona kehangatan. Anda menangkap bakat unik tersembunyi dalam diri setiap jiwa yang Anda temui, membimbing mereka menemukan jati diri sejati ditopang oleh diplomasi relasi personal etis yang luwes berpendar harian.",
    orientasiBase: "Mendeteksi potensi bakat unik murninya manusia, alternatif jalan hidup kreatif inovatif, keunikan esensi tersembunyi.",
    caraCreative: "Membangun ikatan relasi etis hangat dari hati ke hati, menavigasi keharmonisan moral persahabatan tulus personal.",
    roleTampilan: "Tampil bersikap seakan-akan petarung taktis fisik berwibawa militer energetik direktif di depan rapat umum birokrasi baru.",
    tuntutanPolr: "Sangat tidak nyaman dipaksa menelan klasifikasi logika teoretis formal baku kering yang membelenggu kreativitas batinnya.",
    bantuanSuggestive: "Luar biasa rileks tenang ketika pasangannya menatanya tidur di atas kamar estetik bersih, merawat kebugaran tubuh, serta memasakkannya makanan bergizi.",
    areaMobilizing: "Mendambakan pengakuan profesional akan kemampuan efisiensi kerja pragmatisnya, bangga dinilai lihai merancang bisnis.",
    kompetensiIgnoring: "Sangat peka terhadap tren masa depan batiniah, tetapi mengesampingkannya demi mengeksplorasi berlimpahnya kemungkinan ide aktif harian nyata.",
    kemampuanDemonstrative: "Secara alami mencairkan sengketa atmosfer emosional tim kelompok lewat humor ceria bersahabat otomatis dari belakang.",
    polaSeimbang: "Membina disiplin hidup operasional bisnis terencana, rutin pijat tubuh rileks sehat secara berkala, sabar mengkaji logika tertata.",
    polaTertekan: "Tiba-tiba meledak menuduh pembatasan teoretis kaku orang lain sebagai kejahatan, mencoba bertarung taktis agresif berlebihan fisik.",
    gayaBelajar: "Psikologi humanistik interaktif, karya sastra sastrawan eksentrik ide baru, diskusi pemikiran orisinalitas manusia.",
    gayaKerja: "Konsultan pencari bakat talenta, pembina pengembangan keunikan individu tim, manajer humas aliansi strategis hangat.",
    gayaKomunikasi: "Ekspresif simpatik, humoris personal hangat berpendar, menulari tawa riang mengikis jarak psikologis kaku.",
    kebutuhanKelompok: "Sebagai dinamisator moral persahabatan yang menyulut tumbuhnya keunikan bakat terpendam kawan kelompok.",
    batasPerhatian: "Terlalu mudah teralihkan oleh kemunculan ide manusia baru sehingga menelantarkan penyelesaian proyek administratif pragmatis lama.",
    CommonMistypes: ["ENFP (MBTI)", "ILE (Socionics - akibat kesamaan kelincahan berpikir)", "EII (akibat kesamaan sifat etis hangat tulus)"],
    refleksi: "Apakah doronganmu terus mencari keunikan potensi luar biasa manusia lain sebenarnya pelarian dari keheningan untuk mencintai kerapihan hidup pribadimu?",
    buktiMenyangkal: "Jika Anda ternyata berkarakter dingin kaku, sangat menyukai matematika teoritis formula kering harian, serta benci obrolan dari hati ke hati, Anda bukan IEE."
  },
  SLI: {
    type: "SLI",
    description: "Teknisi hening yang menyempurnakan kualitas indrawi praktis. Anda menciptakan keindahan kenyamanan fisik yang bermutu tinggi, menyusun efisiensi alat proyek nyata, bernuansa ketenangan rileks murni harian.",
    orientasiBase: "Kenyamanan indrawi jasmani murni sehat, relaksasi tubuh, keseimbangan estetika alam sekitar, hidup minimalis.",
    caraCreative: "Memperbaiki keefektifan sistem mekanik alat kerja harian, merancang operasi bisnis praktis pragmatis.",
    roleTampilan: "Berusaha menampilkan diri tampak visioner spiritual membaca ramalan masa depan tren waktu didepan keramaian publik.",
    tuntutanPolr: "Jiwa batinnya membeku panik bila dipukuli tuntutan performa panggung histeria keceriaan emosional kelompok manipulatif harian.",
    bantuanSuggestive: "Relief hidupnya utuh didapatkan tatkala kawan kreatif membawakannya petualangan ide baru spekulatif aneh unik yang segar murni.",
    areaMobilizing: "Sangat mendambakan ketulusan kasih batin dalam relasi suci personal setia, bangga dinilai penyayang berintegritas tulus batin.",
    kompetensiIgnoring: "Sangat andal menegakkan perlindungan taktis fisik langsung, tetapi memilih mundur tenang rileks menghindari sengketa kekuasaan.",
    kemampuanDemonstrative: "Secara bawah sadar menyusun logika pembuktian prinsip teori sains murni dalam operasi hening otomatis tanpa banyak bicara.",
    polaSeimbang: "Teratur bersosialisasi mengeksplorasi ide segar bersama komunitas kecil, hening melatih kepekaan rasa setia etis.",
    polaTertekan: "Mengisolasi diri total di kamar tidur mati rasa indrawi fisik, melontarkan penolakan dingin sinis teoretis, cemas akan visi masa depan.",
    gayaBelajar: "Keterampilan teknik terapan operasional mekanis fisik, desain arsitektur minimalis lingkungan, sains praktis nyata.",
    gayaKerja: "Perancang produk ergonomis fisik bermutu, manajer pemeliharaan aset infrastruktur rahasia, pengrajin kayu murni.",
    gayaKomunikasi: "Sangat ringkas tenang datar to-the-point, santun menghindari gesekan verbal berisik, bersuara emosi ramah lirih.",
    kebutuhanKelompok: "Sebagai penjamin mutlak berjalannya kenyamanan fisik peralatan teknis dan tatanan ergonomis tempat tinggal.",
    batasPerhatian: "Seringkali menolak berkomunikasi ekspresif emosional membuat kawan dekatnya merasa diabaikan ditinggal gersang.",
    CommonMistypes: ["ISTP (MBTI)", "ILI (Socionics - akibat kemiripan pembawaan menyendiri hening)", "SEI (akibat kesamaan merawat indrawi fisik)"],
    refleksi: "Apakah kedok minimalis tenang keheninganmu sebenarnya ketakutanmu berlarut menghadapi tantangan gejolak interaksi emosi hangat kelompok?",
    buktiMenyangkal: "Jika Anda terbukti sangat senang tampil berbicara histeris dipanggung drama emosional membakar khalayak luas harian, Anda bukan SLI."
  },
  LSE: {
    type: "LSE",
    description: "Sutradara profesionalisme kerja bermutu tinggi. Anda memadukan efisiensi industri operasional pragmatis dengan ketelitian detail rasa indrawi kenyamanan fisik harian demi mewujudkan tatanan produktivitas murni berstandar mutu tinggi.",
    orientasiBase: "Efisiensi industri pragmatis empiris objektif harian, optimalisasi proses kerja alat berdisiplin tinggi, produktivitas handal.",
    caraCreative: "Merawat kenyamanan fisik jasmani tempat kerja ergonomis sehat, kebersihan estetika ruang, ketelitian detail indrawi.",
    roleTampilan: "Berusaha tampil ekspresif emosional hangat berpendar ceria bagai pembawa acara ulung di pesta baru kelompok formal harian.",
    tuntutanPolr: "Mengalami depresi batin parah bila dipaksa menebak makna ramalan visi tren masa depan tanpa didukung fakta empiris.",
    bantuanSuggestive: "Jiwa batinnya luar biasa tenang teduh disembuhkan ketika pasangannya membimbing rasa batin kedekatan interpersonal etis tulus.",
    areaMobilizing: "Ingin dipuji sebagai konseptor inovasi yang kaya akan kemungkinan ide alternatif aneh unik sains berpikiran terbuka.",
    kompetensiIgnoring: "Sangat andal menegakkan konsistensi logika teoretis rumus formal murni, tetapi memilih membuangnya demi kepiawaian kerja operasional riil.",
    kemampuanDemonstrative: "Secara otomatis memasang kehendak baja perlindungan taktis disiplin operasional lapangan fisik tanpa teriak kasar.",
    polaSeimbang: "Teratur meluangkan waktu hening yoga batin menyepakati etika hati kesetiaan keluarga, sabar menyaring imajinasi alternatif liar segar.",
    polaTertekan: "Menjadi paranoid akan kehabisan waktu operasional bisnis yang dikejar kecemasan krisis, melontarkan kritik moral pedas merusak persahabatan.",
    gayaBelajar: "Manajemen manufaktur industri, sertifikasi standar mutu mutu internasional, penerapan mekanika praktis ergonomis lapangan.",
    gayaKerja: "Direktur pelaksana operasional, kepala penjamin mutu laboratorium harian, arsitek lanskap kota terpadu bernuansa rapi.",
    gayaKomunikasi: "Eksplosif berenergi profesional kerja, runut logis pragmatis, santun tegas berpostur tubuh tegap rapi.",
    kebutuhanKelompok: "Sebagai panglima jenderal keefektifan target produktivitas bermutu tinggi dan pengatur keasrian indrawi lingkungan.",
    batasPerhatian: "Seringkali mengabaikan kelembutan kesetiaan batin emosional pasangannya demi memacu penyempurnaan detail target proyek.",
    CommonMistypes: ["ESTJ (MBTI)", "LIE (Socionics - akibat kesamaan pengejaran aksi efisiensi)", "LSI (akibat kesamaan disiplin keteraturan kerja)"],
    refleksi: "Apakah tuntutan tanpa cela profesional standar mutumu harian sebenarnya pelampiasan rasa takutmu dituduh gagal secara etika moral batin?",
    buktiMenyangkal: "Jika Anda ternyata pemimpi mager, berantakan secara fisik indrawi harian, mengabaikan fakta keuangan, serta membenci operasional lapangan, Anda bukan LSE."
  },
  EII: {
    type: "EII",
    description: "Malaikat penasihat moral spiritual penata keheningan batin kemanusiaan. Anda berdiri teguh di atas kompas ketulusan etis persahabatan sejati, menumbuhkan bakat kreatif konseptor unik pada sesama, dibalut kesabaran batin hening tulus alami.",
    orientasiBase: "Integritas moral batin interpersonal suci, ikatan persahabatan etis tulus murni penuh kedekatan batin sunyi.",
    caraCreative: "Memprediksi kemungkinan bakat unik terpendam kemanusiaan, melahirkan alternatif jalan hidup kreatif orisinal harian sesama.",
    roleTampilan: "Tampil tampak sangat mahir berdebat regulasi hukum tertulis formal bagaikan profesor kaku tata tertib baru sanksi administratif harian.",
    tuntutanPolr: "Merasa jiwanya membeku ketakutan terancam bila dihadapkan pada kekerasan fisik agresif langsung taktis direktif ancaman wilayah.",
    bantuanSuggestive: "Merasa hidupnya kokoh aman terstruktur bila didampingi pemimpin profesional tangguh yang meluruskan tata kelola bisnis karirnya.",
    areaMobilizing: "Sangat mendambakan kenyamanan tubuh jasmani fisik yang teratur rapi ergonomis, bangga dinilai bersih sehat tubuh jasmani.",
    kompetensiIgnoring: "Sangat berbakat membaca aliran firasat makna batin trends masa depan, tetapi dikesampingkan demi fokus persahabatan tulus aktif riil kini.",
    kemampuanDemonstrative: "Secara alami mencairkan ketegangan kemarahan kelompok emosi sosial berpendar lewat tutur hening simpatik otomatis di belakang.",
    polaSeimbang: "Teratur olahraga fisik aman bersama pelindungnya, rajin menyelaraskan bisnis karir, sabar membuka pemahaman aturan logis.",
    polaTertekan: "Terpuruk pasif merasa menjadi martir penzaliman moral batin, melontarkan luapan kritik tertulis sanksi logis teoretis dingin kaku.",
    gayaBelajar: "Psikoanalisis kepribadian humanistik, filsafat etika kemanusiaan suar kasih, kesusastraan naratif spiritual batin pendamai.",
    gayaKerja: "Penasihat karir pengembangan kemanusiaan tim, psikolog terapi kedamaian batin, mediator sengketa komunikasi persahabatan tim.",
    gayaKomunikasi: "Sangat hening lembut santun simpatik tinggi, memilih jarak psikologis dekat rahasia satu-lawan-satu sarat cinta kasih.",
    kebutuhanKelompok: "Sebagai kompas penjaga muruah integritas kedamaian etis tim pengusir hawa permusuhan sengketa kotor.",
    batasPerhatian: "Terlalu takut berkonfrontasi fisik taktis direktif langsung sehingga membiarkan penindas menyiksa wilayah aslinya berlarut.",
    CommonMistypes: ["INFP (MBTI)", "IEI (Socionics - akibat kesamaan kelembutan pertapa hening batin)", "ESI (akibat kesamaan menjaga kesucian moral batin)"],
    refleksi: "Apakah pengorbanan batinmu sebagai martir moral sebenarnya bentuk ketakutanmu menegakkan kekuasaan taktis fisik bertahan membela diri?",
    buktiMenyangkal: "Jika Anda ternyata lincah bertarung fisik merebut aset kekuasaan wilayah secara taktis, dan benci refleksi etis, Anda bukan EII."
  }
};

export const INTERTYPE_RELATIONS_METADATA: Record<string, { name: string; description: string; impact: string }> = {
  duality: {
    name: "Duality (Dualitas)",
    description: "Hubungan komplementer sempurna dalam Socionics Model A.",
    impact: "Elemen dasar Anda adalah informasi Suggestive pasangan, sementara elemen kreatif Anda adalah Mobilizing mereka. Interaksi terasa sangat aman, meredakan kecemasan PoLR masing-masing tanpa kata-kata, mengungkit produktivitas dan menyembuhkan batin secara timbal balik."
  },
  activation: {
    name: "Activation (Aktivasi)",
    description: "Hubungan penguat energi saling merangsang aksi aktif.",
    impact: "Kompatibel tinggi dalam quadra yang sama. Anggota saling menyalakan energi aksi cepat (Mobilizing terisi oleh Base). Sangat menyenangkan untuk kolaborasi cepat jangka pendek, namun rentan menimbulkan kelelahan fisik jika berlarut tanpa jeda hening."
  },
  mirror: {
    name: "Mirror (Cermin)",
    description: "Saling merefleksikan ide intelektual dari sudut pandang yang berbeda.",
    impact: "Sama-sama dalam satu blok Ego yang dihargai (Base satu adalah Creative lainnya). Hubungan dipenuhi diskusi konseptual yang tajam dan konstruktif, saling mengoreksi detail implementasi gagasan, sangat cocok untuk kemitraan ilmiah."
  },
  identity: {
    name: "Identity (Identitas)",
    description: "Melihat cerminan persis diri sendiri dalam orang lain.",
    impact: "Memiliki struktur Model A yang identik. Pemahaman instan tanpa perlu penjelasan panjang lebar. Sangat baik untuk proses belajar awal bersama, namun rentan mandek karena memiliki kelemahan yang persis sama di area PoLR tanpa ada saling menutupi."
  },
  kindred: {
    name: "Kindred (Sekerabat)",
    description: "Memiliki dasar orientasi hidup sama namun jalan kreasi berbeda.",
    impact: "Sama-sama memiliki elemen Base yang persis sama, namun elemen kreatif berbeda (misal Ne-Ti ILE vs Ne-Fi IEE). Terlihat sangat mirip di permukaan, namun sering berselisih paham saat menentukan metode praktis penyelesaian masalah."
  },
  business: {
    name: "Business (Mitra Bisnis)",
    description: "Hubungan kerja sama profesional yang pragmatis dinamis.",
    impact: "Memiliki elemen kreatif yang sama namun elemen base berbeda (misal ILE Ti-creative vs SLE Ti-creative). Sangat andal untuk bersinergi menyelesaikan tugas pragmatis operasional di kantor, namun gersang secara kedalaman emosional dan spiritual batin."
  },
  semi_duality: {
    name: "Semi-Duality (Semi-Dualitas)",
    description: "Dualitas yang belum tuntas atau setengah jalan.",
    impact: "Elemen Suggestive terpenuhi oleh Base pasangan, namun elemen Creative tidak menyokong Mobilizing (atau PoLR bergeser tidak terproteksi sempurna). Terasa sangat memikat di awal, namun rentan memicu kesalahpahaman tak terduga harian."
  },
  mirage: {
    name: "Mirage (Fatamorgana)",
    description: "Hubungan rileks yang menenangkan namun rentan melempem.",
    impact: "Interaksi terasa sangat nyaman, santai, dan damai untuk liburan bersama. Namun, ketika dipaksa bekerja serius mengejar target bisnis keras, fokus tim hancur karena saling membiarkan kemalasan atau kurang koordinasi logis praktis."
  },
  contrary: {
    name: "Contrary (Kontras / Pemadam)",
    description: "Saling memadamkan orientasi batin akibat arah ekstratim-introtim terbalik.",
    impact: "Memiliki elemen yang sama namun terbalik arah mental-vitalnya (misal Ne-Ti ILE vs Ni-Te ILI). Saat berdiskusi berdua, terasa ada benturan senyap di mana argumen yang satu seolah menihilkan makna orientasi dasar yang dipegang pihak lainnya."
  },
  quasi_identity: {
    name: "Quasi-Identity (Identitas Semu)",
    description: "Kemiripan aktivitas konseptual luar yang menyembunyikan perbedaan batin murni.",
    impact: "Merasa sangat mirip secara profesi luar (misal LII arsitek logika vs ILI arsitek risiko), mendiskusikan topik serupa. Namun sesungguhnya menyembunyikan perbedaan visi quadra yang sangat bertolak belakang, membuat penyebutan definisi sering bergeser kaku."
  },
  superego: {
    name: "Super-Ego",
    description: "Hubungan penghormatan formal yang melelahkan akibat ketiadaan kecocokan nilai batin.",
    impact: "Blok Ego Anda adalah blok Super-Ego mereka (Base Anda adalah elemen Role mereka, PoLR Anda adalah Creative mereka). Selalu merasa harus tampil sempurna dan sopan kaku demi menjaga gengsi sosial, namun sangat menguras batin jika tinggal bersama harian."
  },
  conflict: {
    name: "Conflict (Konflik)",
    description: "Hubungan gesekan permanen tak terselesaikan dalam Socionics.",
    impact: "Base Anda adalah PoLR pasangan, sementara Creative Anda menyerang rasa aman batin mereka, begitu pula sebaliknya. Hubungan dipenuhi salah tafsir konstan yang melelahkan batin. Membutuhkan kedewasaan spiritual raksasa untuk tidak saling melukai wilayah intim batin harian."
  },
  benefit: {
    name: "Benefit (Pemberi Manfaat - Penerima Manfaat)",
    description: "Hubungan asimetris di mana energi mengalir satu arah.",
    impact: "Hubungan asimetris. Benefactor (Pemberi) diposisikan di atas Beneficiary (Penerima). Beneficiary memandang Benefactor dengan kekaguman konseptual tinggi dan selalu berusaha mendapatkan persetujuan mereka, sementara Benefactor menganggap Beneficiary menarik namun kurang mumpuni."
  },
  supervision: {
    name: "Supervision (Pengawasan - Terawas)",
    description: "Hubungan koreksi asimetris di mana PoLR salah satu diawasi langsung pihak lain.",
    impact: "Hubungan asimetris paling tajam. Supervisor (Pengawas) mengamati elemen PoLR Supervisee (Terawas) memakai elemen Base mereka yang kuat. Supervisee terus-menerus merasa dikoreksi, diaudit, atau dicari-cari kesalahannya tanpa ampun di wilayah batin ringkihnya."
  }
};

export const INTERTYPE_MAP: Record<TIM, Record<TIM, string>> = {
  ILE: { ILE: "identity", SEI: "duality", ESE: "activation", LII: "mirror", SLE: "business", IEI: "mirage", EIE: "benefit", LSI: "supervision", SEE: "benefit", ILI: "contrary", LIE: "semi_duality", ESI: "supervision", IEE: "kindred", SLI: "semi_duality", LSE: "supervision", EII: "conflict" },
  SEI: { ILE: "duality", SEI: "identity", ESE: "mirror", LII: "activation", SLE: "mirage", IEI: "business", EIE: "supervision", LSI: "benefit", SEE: "supervision", ILI: "semi_duality", LIE: "conflict", ESI: "benefit", IEE: "semi_duality", SLI: "kindred", LSE: "conflict", EII: "benefit" },
  ESE: { ILE: "activation", SEI: "mirror", ESE: "identity", LII: "duality", SLE: "semi_duality", IEI: "supervision", EIE: "kindred", LSI: "semi_duality", SEE: "semi_duality", ILI: "conflict", LIE: "benefit", ESI: "supervision", IEE: "supervision", SLI: "conflict", LSE: "business", EII: "mirage" },
  LII: { ILE: "mirror", SEI: "activation", ESE: "duality", LII: "identity", SLE: "supervision", IEI: "semi_duality", EIE: "semi_duality", LSI: "kindred", SEE: "conflict", ILI: "business", LIE: "mirage", ESI: "conflict", IEE: "conflict", SLI: "benefit", LSE: "mirage", EII: "business" },
  
  SLE: { ILE: "business", SEI: "mirage", ESE: "semi_duality", LII: "supervision", SLE: "identity", IEI: "duality", EIE: "activation", LSI: "mirror", SEE: "kindred", ILI: "semi_duality", LIE: "business", ESI: "contrary", IEE: "contrary", SLI: "business", LSE: "contrary", EII: "conflict" },
  IEI: { ILE: "mirage", SEI: "business", ESE: "supervision", LII: "semi_duality", SLE: "duality", IEI: "identity", EIE: "mirror", LSI: "activation", SEE: "semi_duality", ILI: "kindred", LIE: "contrary", ESI: "supervision", IEE: "semi_duality", SLI: "contrary", LSE: "conflict", EII: "contrary" },
  EIE: { ILE: "benefit", SEI: "supervision", ESE: "kindred", LII: "semi_duality", SLE: "activation", IEI: "mirror", EIE: "identity", LSI: "duality", SEE: "benefit", ILI: "conflict", LIE: "mirror", ESI: "semi_duality", IEE: "contrary", SLI: "conflict", LSE: "activation", EII: "contrary" },
  LSI: { ILE: "supervision", SEI: "benefit", ESE: "semi_duality", LII: "kindred", SLE: "mirror", IEI: "activation", EIE: "duality", LSI: "identity", SEE: "conflict", ILI: "semi_duality", LIE: "benefit", ESI: "mirror", IEE: "conflict", SLI: "benefit", LSE: "activation", EII: "mirror" },
  
  SEE: { ILE: "benefit", SEI: "supervision", ESE: "semi_duality", LII: "conflict", SLE: "kindred", IEI: "semi_duality", EIE: "benefit", LSI: "conflict", SEE: "identity", ILI: "duality", LIE: "activation", ESI: "mirror", IEE: "business", SLI: "mirage", LSE: "benefit", EII: "supervision" },
  ILI: { ILE: "contrary", SEI: "semi_duality", ESE: "conflict", LII: "business", SLE: "semi_duality", IEI: "kindred", EIE: "conflict", LSI: "semi_duality", SEE: "duality", ILI: "identity", LIE: "mirror", ESI: "activation", IEE: "mirage", SLI: "business", LSE: "benefit", EII: "supervision" },
  LIE: { ILE: "semi_duality", SEI: "conflict", ESE: "benefit", LII: "mirage", SLE: "business", IEI: "contrary", EIE: "mirror", LSI: "benefit", SEE: "activation", ILI: "mirror", LIE: "identity", ESI: "duality", IEE: "benefit", SLI: "supervision", LSE: "mirror", EII: "benefit" },
  ESI: { ILE: "supervision", SEI: "benefit", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "supervision", EIE: "semi_duality", LSI: "mirror", SEE: "mirror", ILI: "activation", LIE: "duality", ESI: "identity", IEE: "supervision", SLI: "benefit", LSE: "mirror", EII: "activation" },
  
  IEE: { ILE: "kindred", SEI: "semi_duality", ESE: "supervision", LII: "conflict", SLE: "contrary", IEI: "semi_duality", EIE: "contrary", LSI: "conflict", SEE: "business", ILI: "mirage", LIE: "benefit", ESI: "supervision", IEE: "identity", SLI: "duality", LSE: "activation", EII: "mirror" },
  SLI: { ILE: "semi_duality", SEI: "kindred", ESE: "conflict", LII: "benefit", SLE: "business", IEI: "contrary", EIE: "conflict", LSI: "benefit", SEE: "mirage", ILI: "business", LIE: "supervision", ESI: "benefit", IEE: "duality", SLI: "identity", LSE: "mirror", EII: "activation" },
  LSE: { ILE: "supervision", SEI: "conflict", ESE: "business", LII: "mirage", SLE: "contrary", IEI: "conflict", EIE: "activation", LSI: "activation", SEE: "benefit", ILI: "benefit", LIE: "mirror", ESI: "mirror", IEE: "activation", SLI: "mirror", LSE: "identity", EII: "duality" },
  EII: { ILE: "conflict", SEI: "benefit", ESE: "mirage", LII: "business", SLE: "conflict", IEI: "contrary", EIE: "contrary", LSI: "mirror", SEE: "supervision", ILI: "supervision", LIE: "benefit", ESI: "activation", IEE: "mirror", SLI: "activation", LSE: "duality", EII: "identity" }
};

export function validateSocionicsData(): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  const TIM_TYPES = Object.keys(TIM_MODELS) as TIM[];
  if (TIM_TYPES.length !== 16) {
    errors.push(`Jumlah TIM tidak sama dengan 16, melainkan ${TIM_TYPES.length}`);
  }

  const allElements: InformationElement[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];

  for (const tim of TIM_TYPES) {
    const model = TIM_MODELS[tim];
    if (!model) {
      errors.push(`TIM ${tim} tidak memiliki konfigurasi model.`);
      continue;
    }

    const posMapped = Object.values(model.positions) as InformationElement[];
    if (posMapped.length !== 8) {
      errors.push(`TIM ${tim} tidak memiliki tepat 8 posisi fungsi, melainkan ${posMapped.length}`);
    }

    const uniqueElements = new Set(posMapped);
    if (uniqueElements.size !== 8) {
      errors.push(`TIM ${tim} memiliki posisi dengan elemen duplikat: ${posMapped.join(", ")}`);
    }

    for (const el of allElements) {
      if (!uniqueElements.has(el)) {
        errors.push(`TIM ${tim} kekurangan elemen ${el}`);
      }
    }

    const quadra = model.quadra;
    const valued = QUADRA_DATA[quadra].valuedElements;
    const base = model.positions.Base;
    const creative = model.positions.Creative;
    const suggestive = model.positions.Suggestive;
    const mobilizing = model.positions.Mobilizing;

    const valuesMapped = [base, creative, suggestive, mobilizing];
    for (const valEl of valuesMapped) {
      if (!valued.includes(valEl)) {
        errors.push(`TIM ${tim} berada di Quadra ${quadra} tetapi mengalirkan elemen ${valEl} yang tidak tercakup dalam valued quadra.`);
      }
    }

    const dualType = model.dual;
    const dualModel = TIM_MODELS[dualType];
    if (!dualModel) {
      errors.push(`TIM ${tim} memiliki dual ${dualType} yang tidak terdaftar di TIM_MODELS.`);
    } else {
      if (dualModel.dual !== tim) {
        errors.push(`Ketidakselarasan pasangan dual: ${tim} berteman dual ${dualType}, tapi ${dualType} berteman dual ${dualModel.dual}`);
      }
      if (dualModel.quadra !== quadra) {
        errors.push(`Ketidakselarasan quadra dual: ${tim} (${quadra}) berdual dengan ${dualType} (${dualModel.quadra})`);
      }
    }
  }

  return {
    success: errors.length === 0,
    errors
  };
}
