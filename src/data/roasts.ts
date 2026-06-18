/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocionicsRoast {
  id: string;
  name: string;
  quadra: string;
  ego: string;
  alias: string;
  stereotip: string;
  aura: string;
  kebiasaan: string[];
  isiKepala: string[];
  bicara: string;
  perhatian: string;
  bangga: string;
  menyinggung: string;
  caraMarah: string;
  menyukai: string;
  berbohong: string;
  kontradiksi: string[];
  sehat: string;
  tidakSehat: string;
  redFlags: string[];
  greenFlags: string[];
  superior: string;
  insecure: string;
  penampilan: string;
  kalimatKhas: string[];
  roastShort: string;
  kesimpulanBrutal: string;
}

export const socionicsRoasts: SocionicsRoast[] = [
  {
    id: "ILE",
    name: "ILE (Intuitive Logical Extratim)",
    quadra: "Alpha",
    ego: "Ne-Ti",
    alias: "The Inventor / Penggagas Eksentrik",
    stereotip: "ILE adalah orang yang memulai percakapan tentang cuaca, lalu dua puluh menit kemudian sudah menjelaskan kemungkinan adanya kota terapung, ekonomi berbasis reputasi, dan alasan manusia seharusnya mengganti kalender. Masalahnya bukan kekurangan ide, melainkan ide-ide itu berkembang biak tanpa pengawasan orang dewasa.",
    aura: "Matanya bergerak seperti sedang mencari pintu rahasia yang orang lain belum sadari. Bahasa tubuhnya bisa canggung, terlalu santai, atau tiba-tiba hidup ketika mendengar topik menarik. Ia tidak selalu menjadi orang paling berisik, namun jika mendapat satu celah untuk bicara, topik ruangan akan kehilangan hak asuh.",
    kebiasaan: [
      "Membuka sebelas artikel internet hanya untuk menjawab satu pertanyaan sederhana.",
      "Mengirim ide proyek luar biasa saat tengah malam, lalu lupa menanyakannya lagi esok hari.",
      "Mencari celah pengecualian setiap kali seseorang membuat aturan mutlak.",
      "Menjelaskan sesuatu memakai analogi yang membuat pembicaraannya semakin bercabang.",
      "Menyimpan barang secara acak, tetapi yakin dirinya mengetahui 'kira-kira wilayahnya'."
    ],
    isiKepala: [
      "Itu ide buruk. Tapi buruk dengan cara yang menarik.",
      "Aku bisa menyelesaikannya. Aku hanya sedang menunggu munculnya minat nyata.",
      "Jangan tutup kemungkinan itu hanya karena kemungkinan tersebut terkesan bodoh."
    ],
    bicara: "Bicaranya melompat, bercabang, dan sesekali meninggalkan pendengar di sebuah paragraf yang tidak pernah memperoleh kalimat penutup. Ketika percaya diri, ia terdengar seperti penemu yang baru menerima wahyu. Ketika ragu, ia menambahkan semakin banyak teori agar tidak perlu memilih satu kesimpulan.",
    perhatian: "Bukan selalu dengan tampil paling menawan, melainkan menjadi orang yang membawa kemungkinan paling menarik. ILE ingin dikenal sebagai orang yang melihat pintu ketika semua orang hanya melihat dinding.",
    bangga: "Daya cipta tanpa batas, keluwesan berpikir lateral, dan kemampuan alami menemukan celah sistemik.",
    menyinggung: "Paling tertusuk ketika dianggap tidak punya gagasan asli, pikirannya dituduh dangkal, atau potensinya dianggap tidak akan pernah menjadi karya nyata di dunia riil.",
    caraMarah: "Tanda awal: lebih banyak menyela, memperbaiki kata, dan menertawakan argumen lawan. Saat memuncak: melemparkan lima kemungkinan sekaligus agar lawan tak sempat berdiri di satu posisi. Setelah konflik: bisa kembali bicara santai seolah tidak terjadi apa-apa karena baginya konflik tadi adalah sekadar eksperimen gagasan.",
    menyukai: "Menjadi sangat penasaran. Menanyakan gagasan, kebiasaan, masa kecil, teori hidup, dan pendapat tentang hal yang bahkan belum pernah dipikirkan orang itu. Mengirim tautan aneh dan menawarkan pengalaman eksperimental.",
    berbohong: "Cenderung berbohong melalui kemungkinan ambigu, perubahan definisi kata secara sepihak, penghilangan detail praktis, atau optimisme buta.",
    kontradiksi: [
      "Ingin bebas mengeksplorasi secara total, tetapi kesal ketika orang lain tidak mengikuti idenya.",
      "Mengaku tidak menyukai batasan fisis, tetapi membangun kerangka teori kognitif sendiri dengan sangat kaku.",
      "Merasa sangat terbuka terhadap koreksi, tetapi akan memperdebatkan koreksi tersebut selama empat puluh menit."
    ],
    sehat: "Kreatif tanpa memaksa semua orang hidup dalam eksperimennya. Bisa mendisiplinkan diri memilih satu gagasan, menyelesaikannya, dan menerima bahwa detail praktis bukanlah bentuk penghinaan pribadi.",
    tidakSehat: "Menghasilkan ratusan teori mentah hanya untuk menghindari komitmen nyata. Menjadikan kebosanan sebagai alasan mutlak untuk melarikan diri dari tanggung jawab moral.",
    redFlags: [
      "Membuat janji besar saat antusias, lalu menghilang tanpa kabar ketika beralih minat.",
      "Mengubah kritik terhadap perilakunya menjadi perdebatan terminologi dan semantik.",
      "Memulai proyek bersama sebelum memeriksa kapasitas waktu yang dimilikinya.",
      "Sengaja menguji batas kesabaran orang lain hanya untuk memeriksa apakah batas itu nyata."
    ],
    greenFlags: [
      "Sangat toleran dan tidak mudah menghakimi gagasan atau keanehan perilaku orang lain.",
      "Mampu menemukan solusi kreatif saat semua jalan taktis tampak buntu.",
      "Mendorong sesama untuk melihat potensi terpendam yang belum mereka sadari.",
      "Berani mempertanyakan tradisi kuno atau dogma yang tidak masuk akal sehat."
    ],
    superior: "Mengajukan pertanyaan tajam yang sengaja membuat lawan bicara terlihat belum berpikir cukup mendalam. Senyum kecil seorang penemu yang baru mendeteksi lubang di lambung kapal orang lain.",
    insecure: "Meningkatkan bercandaan intelektual, memproduksi semakin banyak ide, dan memamerkan keluasan wawasannya agar tidak ada yang menanyakan mengapa proyeknya tak pernah tuntas.",
    penampilan: "Pakaian fungsional yang sering asal-asalan. Meja kerja tampak seperti situs ekskavasi kuno yang penuh kertas dan gadget. Profil medsos dipenuhi meme absurd dan klaim proyek baru yang mendadak sunyi.",
    kalimatKhas: [
      "Aku belum sepenuhnya setuju, tapi tolong lanjutkan dulu.",
      "Secara teknis, skenario itu masih sangat mungkin terjadi.",
      "Tunggu dulu, aku baru saja kepikiran sebuah kemungkinan gila."
    ],
    roastShort: "ILE: Seratus ide brilian, tetapi satu-satunya pengisi daya laptopnya hilang entah ke mana.",
    kesimpulanBrutal: "ILE adalah tipe orang yang menemukan dua puluh jalan keluar inovatif, memilih ketiganya sekaligus, lalu lupa sebenarnya ia ingin pergi ke mana."
  },
  {
    id: "SEI",
    name: "SEI (Sensory Ethical Introtim)",
    quadra: "Alpha",
    ego: "Si-Fe",
    alias: "The Mediator / Harmonisator Teduh",
    stereotip: "SEI adalah manusia yang sanggup menemukan kursi paling nyaman dalam radius lima puluh meter di tempat pengap mana pun, lalu menciptakan suasana santai tanpa perlu mengumumkan manifesto kesepakatan. Kelihatannya pasif, padahal diam-diam mengatur seluruh suhu fisik dan emosi ruangan.",
    aura: "Lembut, tidak mengancam, sangat mudah didekati. Wajahnya sering terlihat rileks atau sedikit geli melihat kekacauan drama manusia di sekitarnya. Mengubah suasana agar tidak menggigit penghuninya.",
    kebiasaan: [
      "Memilih tempat duduk berdasarkan tingkat kenyamanan dan sirkulasi AC, bukan gengsi sosial.",
      "Menawarkan camilan atau minuman lezat saat pembicaraan mulai terasa kaku.",
      "Menunda balasan pesan penting sampai suasana hatinya benar-benar stabil.",
      "Menghindari jadwal yang terlalu padat seolah jadwal itu adalah wabah penyakit menular.",
      "Menyampaikan ketidaksukaan fisis secara terselubung lewat perubahan mikro pada ekspresi wajah."
    ],
    isiKepala: [
      "Kalian bisa melanjutkan perdebatan rasional itu nanti. Makanannya sudah telanjur dingin.",
      "Aku tidak malas. Cara kalian menjalani hidup yang terlalu tergesa-gesa dan melelahkan.",
      "Aku sudah menolak lewat bahasa gerak tubuhku. Mengapa kalian masih menuntut kata-kata formal?"
    ],
    bicara: "Santai, personal, hangat, penuh komentar ringan tentang suasana sekitar, cita rasa, atau perilaku lucu orang lain. Tidak tertarik memberikan ceramah konseptual kecuali topiknya benar-benar menyenangkan untuk dirasakan.",
    perhatian: "Melalui pesona lembut, humor ringan, sediaan rasa nyaman harian, dan kemampuan membuat orang lain betah berada di dekatnya tanpa harus berpura-pura tangguh.",
    bangga: "Kepekaan estetika rasa dan kebutuhan raga, serta kemampuan membaca suasana hati orang lain secara presisi.",
    menyinggung: "Paling tertusuk ketika dituduh sebagai sosok tidak berguna atau malas hanya karena ia tidak terlihat terburu-buru mengejar target efisiensi.",
    caraMarah: "Tanda awal: respons pesan memendek, senyum menghilang secara bertahap, gerakan tubuh melambat. Saat memuncak: melontarkan sindiran halus dan menarik total kehangatan sosial. Setelah konflik: menjaga jarak fisis yang dingin dan berharap orang lain cukup peka membaca kesalahannya.",
    menyukai: "Menyediakan bantal empuk, menyajikan makanan favorit, memberikan sentuhan fisik lembut, dan membantu urusan domestik kecil. Mengubah lingkungan agar objek sayangnya terbebas dari stres.",
    berbohong: "Berkata 'tidak apa-apa' dengan nada datar padahal tubuhnya sudah memberi isyarat tidak nyaman. Menyamarkan penolakan sosial dengan alasan kelelahan fisik.",
    kontradiksi: [
      "Menginginkan keterbukaan emosional yang tulus, tetapi selalu melarikan diri dari percakapan berat yang menegangkan.",
      "Kelihatan pasif dan penurut, tetapi sebenarnya sangat keras kepala mempertahankan wilayah kenyamanannya.",
      "Mengaku sangat fleksibel, tetapi langsung menderita jika letak barang kesayangannya bergeser beberapa senti."
    ],
    sehat: "Hangat, peka, sangat menghargai batas ketahanan tubuh orang lain, serta mampu mengutarakan ketidaknyamanan fisiknya secara tegas tanpa harus bersikap manipulatif.",
    tidakSehat: "Menghindari tanggung jawab hidup dengan kedok kedamaian batin. Membiarkan masalah besar menumpuk subur asalkan dirinya tetap dikelilingi kenyamanan mikro.",
    redFlags: [
      "Berkata iya saat dipaksa, tetapi sama sekali tidak melaksanakannya di dunia nyata.",
      "Memakai keramahan manis untuk menghindari pemberian komitmen atau jawaban yang tegas.",
      "Sengaja memanjakan orang lain agar orang tersebut menjadi ketergantungan dan mudah dikendalikan.",
      "Menarik kehangatan secara tiba-tiba tanpa bersedia memberikan kejelasan letak kesalahan."
    ],
    greenFlags: [
      "Sangat peka terhadap kebutuhan fisik orang lain yang sering diabaikan kelompok.",
      "Sanggup meredakan eskalasi konflik yang memanas lewat humor ringan pengalihan.",
      "Membuat kebersamaan terasa damai, membumi, dan memanusiakan kembali jiwa yang lelah.",
      "Menunjukkan rasa cinta melalui pelayanan fisik yang konkret, bukan janji verbal."
    ],
    superior: "Memandang orang-orang ambisius yang stres dan kelelahan dengan pandangan iba, seolah melihat makhluk malang yang gagal memahami betapa agungnya fungsi sebuah bantal.",
    insecure: "Menjadi semakin manis, humoris, dan mengakomodasi semua kemauan orang lain agar keberadaannya dirasa aman tanpa berisiko menerima penolakan.",
    penampilan: "Pakaian bertekstur nyaman dengan warna lembut. Kamarnya dipenuhi benda fungsional estetik, aroma lilin terapi, dan pencahayaan yang memanjakan mata.",
    kalimatKhas: [
      "Santai saja dulu, tidak usah terburu-buru diselesaikan.",
      "Kamu kelihatan lelah sekali hari ini.",
      "Mengapa hidup harus dibuat serumit itu?"
    ],
    roastShort: "SEI: Ahli menghindari konfrontasi tingkat tinggi dengan aroma lilin terapi vanila.",
    kesimpulanBrutal: "SEI adalah tipe orang yang lihai menyelamatkan semua orang dari kepanikan mental, kecuali kepanikan akibat mereka tak kunjung memberikan kepastian tindakan."
  },
  {
    id: "ESE",
    name: "ESE (Ethical Sensory Extratim)",
    quadra: "Alpha",
    ego: "Fe-Si",
    alias: "The Provider / Panitia Suasana Alami",
    stereotip: "ESE adalah panitia suasana yang tidak pernah dipilih secara resmi, tetapi memiliki tanggung jawab moral mutlak agar tidak ada satu pun orang di ruangan yang terlihat menyedihkan atau diabaikan. Ia datang, menata kudapan, mengenalkan semua orang, dan memotong keheningan.",
    aura: "Sangat terlihat, terdengar, dan terasa. Ekspresi wajah dan reaksi emosionalnya sangat hidup serta mudah dibaca oleh seluruh penjuru ruangan. Melakukan renovasi emosi kelompok tanpa izin bangunan.",
    kebiasaan: [
      "Sengaja menghampiri dan menanyakan alasan seseorang terlihat diam atau murung.",
      "Mengubah urusan makan bersama menjadi ritual perayaan sosial yang ramai.",
      "Memberikan respons ekspresi wajah yang dramatis untuk setiap cerita yang didengarnya.",
      "Menghubungi banyak orang sekaligus demi memastikan rencana berkumpul berjalan lancar.",
      "Merasa bersalah secara pribadi jika sebuah acara bernada dingin atau kaku."
    ],
    isiKepala: [
      "Aku tidak sedang memaksa mereka bersenang-senang. Aku hanya menyelamatkan acara ini dari kehancuran.",
      "Jika aku tidak berinisiatif bergerak mengurus semuanya, siapa lagi yang peduli?",
      "Bagaimana ia bisa mengklaim baik-baik saja dengan wajah muram seperti upacara pemakaman?"
    ],
    bicara: "Sangat ekspresif, cepat, penuh penekanan emosional, efek suara tiruan, dan gerakan tangan. Sebuah kejadian biasa di tangannya akan berubah menjadi kisah petualangan seru dengan tokoh antagonis yang jelas.",
    perhatian: "Melalui pelayanan konkret, pujian verbal yang konsisten, sediaan makanan, dan pelibatan orang tersebut ke dalam pusat interaksi sosial.",
    bangga: "Kemampuan hebat menghidupkan suasana kelompok dan kepekaan praktis menjaga kesejahteraan fisis orang sekitarnya.",
    menyinggung: "Tersinggung berat ketika bantuan fisisnya dianggap berlebihan, kehangatannya dibalas dengan dingin, atau dituduh dangkal hanya karena bersikap ekspresif.",
    caraMarah: "Tanda awal: nada bicara menajam tajam dan pertanyaan yang diajukan terdengar seperti surat dakwaan pengadilan. Saat memuncak: emosi meledak secara terbuka di ruang publik agar semua orang sadar adanya ketidakadilan. Setelah konflik: menuntut penjelasan verbal mendalam dan bukti konkret bahwa kehangatan hubungan telah pulih total.",
    menyukai: "Mengurusi seluruh detail kenyamanan fisik objek sayangnya, mengingat hari penting, memberikan hadiah bernilai fisis, dan melindungi dari ketidaknyamanan luar.",
    berbohong: "Melebih-lebihkan fakta cerita agar efek emosional yang dirasakan pendengar lebih dramatis. Berkata menolong tanpa pamrih padahal sangat membutuhkan apresiasi batin.",
    kontradiksi: [
      "Menuntut orang lain bersikap jujur secara emosional, tetapi tidak siap mendengar kejujuran yang berpotensi merusak keharmonisan suasana.",
      "Mengaku sangat spontan, tetapi diam-diam memiliki ekspektasi kaku tentang bagaimana orang lain seharusnya merespons tindakannya.",
      "Sangat bersemangat merawat semua orang, lalu mengeluh kelelahan akibat tidak ada yang sanggup membaca kebutuhan dirinya sendiri."
    ],
    sehat: "Sangat murah hati, hangat, menjadi perekat komunitas yang luar biasa, dan sanggup membiarkan orang lain murung tanpa menganggapnya sebagai kegagalan pribadi.",
    tidakSehat: "Menuntut partisipasi emosional kelompok secara paksa. Menyamarkan kontrol pribadi atas nama bentuk kepedulian sosial.",
    redFlags: [
      "Memaksa orang lain berbicara atau bercerita sebelum mereka siap secara mental.",
      "Menilai kedalaman sebuah hubungan murni dari seberapa ekspresif respons wajah mereka.",
      "Menyebutkan seluruh daftar pengorbanan masa lalunya di tengah pertengkaran.",
      "Memperlakukan batasan pribadi orang lain sebagai bentuk penolakan terhadap dirinya."
    ],
    greenFlags: [
      "Membuat pendatang baru langsung merasa diterima dengan hangat hangat.",
      "Sangat cepat mendeteksi dan merangkul orang yang terpinggirkan di pojokan.",
      "Menunjukkan rasa cinta sejati tanpa permainan tebakan atau taktik manipulasi.",
      "Sanggup mengembalikan energi positif dalam kelompok yang sedang dilanda stres."
    ],
    superior: "Membicarakan seseorang yang bersikap tidak sopan dengan ekspresi seorang duta besar yang baru saja menyaksikan pelanggaran konvensi internasional etiket.",
    insecure: "Menjadi semakin cerewet, semakin sering menghubungi orang lain, dan menyajikan makanan berlebihan untuk memastikan dirinya tidak kehilangan fungsi sosial.",
    penampilan: "Rapi, terkoordinasi dengan baik, dan menarik perhatian secara estetis tanpa terkesan aneh. Tasnya penuh barang darurat yang mungkin dibutuhkan orang lain.",
    kalimatKhas: [
      "Aku melakukan ini semua hanya karena aku mengkhawatirkan kondisimu.",
      "Mengapa kamu tidak menceritakan hal ini sejak awal?",
      "Jangan membuat suasana di sini menjadi aneh dan dingin."
    ],
    roastShort: "ESE: Polisi moralitas suasana hati yang mendefinisikan diam sebagai keadaan darurat emosional.",
    kesimpulanBrutal: "ESE adalah tipe orang yang akan memastikan semua orang merasa dilibatkan secara hangat, termasuk mereka yang sengaja bersembunyi di toilet agar tidak dilibatkan."
  },
  {
    id: "LII",
    name: "LII (Logical Intuitive Introtim)",
    quadra: "Alpha",
    ego: "Ti-Ne",
    alias: "The Analyst / Arsitek Logika",
    stereotip: "LII sanggup mendengarkan kisah perselingkuhan yang tragis, lalu tiba-tiba memotong cerita hanya untuk mengoreksi bahwa penggunaan kata 'selalu' oleh pencerita secara logis tidak konsisten dengan garis waktu kejadian.",
    aura: "Tenang, berjarak, mengamati dari sudut ruangan. Ekspresi wajahnya netral dan terlihat sedang mengevaluasi secara klinis apakah percakapan yang berlangsung layak untuk dimasuki.",
    kebiasaan: [
      "Menuntut definisi kata yang disepakati bersama sebelum menjawab pertanyaan.",
      "Mengoreksi inkonsistensi logika kecil yang dianggap tidak penting oleh semua orang lain.",
      "Menyusun struktur argumen dalam pikiran berjam-jam setelah perdebatan selesai.",
      "Lebih memilih diam total daripada melontarkan pernyataan yang belum teruji kebenarannya.",
      "Mengategorikan data acak ke dalam bagan sistematis tanpa diminta."
    ],
    isiKepala: [
      "Aku memahami maksud emosionalmu. Namun kesimpulan faktualmu tetap sepenuhnya keliru.",
      "Perasaanmu mungkin valid sebagai reaksi biologis, tetapi argumenmu tidak memiliki dasar logis.",
      "Mengapa manusia gemar sekali menggunakan istilah-istilah ilmiah secara sembarangan?"
    ],
    bicara: "Sangat terukur, konseptual, objektif, dan dipenuhi kalimat bersyarat. Mampu membangun kerangka berpikir abstrak yang runtut dari bawah hingga semua orang lupa apa topik awalnya.",
    perhatian: "Melalui kesediaan berdiskusi secara mendalam tentang gagasan abstrak, membagikan analisis teoritis, dan memberikan solusi pemecahan masalah yang objektif.",
    bangga: "Konsistensi berpikir tegar, kemandirian analisis dari bias sosial, dan ketepatan presisi definisi.",
    menyinggung: "Tersinggung berat ketika argumen logisnya diabaikan hanya karena disampaikan dengan nada datar tanpa luapan emosi, atau dituduh berpikiran sempit.",
    caraMarah: "Tanda awal: sikap verbal berubah menjadi sangat formal, kaku, dan berjarak. Saat memuncak: membedah seluruh argumen lawan secara analitis dan tenang hingga lawan terlihat konyol. Setelah konflik: meninjau seluruh data sengketa dan mungkin kembali membawa draf argumen perbaikan.",
    menyukai: "Mengajjak berdiskusi tentang konsep rumit yang disukainya, menyisihkan waktu berkualitas untuk bersama, dan membuka rahasia arsitektur pikirannya.",
    berbohong: "Menyusun kalimat yang secara teknis sepenuhnya benar dan akurat, tetapi membuang konteks emosional asli untuk mengarahkan kesimpulan.",
    kontradiksi: [
      "Menuntut kejelasan dan ketegasan dari orang lain, tetapi sangat lambat dan kesulitan mengekspresikan perasaannya sendiri secara verbal.",
      "Membenci dogmatisme sosial, tetapi memperlakukan model teoritis pribadinya seolah-olah itu adalah hukum alam yang tidak boleh dilanggar.",
      "Mengaku sangat terbuka terhadap segala kemungkinan baru, asalkan kemungkinan tersebut sudah mengisi draf administrasi logika miliknya."
    ],
    sehat: "Sangat adil, objektif, berkepala dingin, mampu menerangkan hal-hal teoritis rumit secara sederhana tanpa merendahkan kecerdasan orang lain.",
    tidakSehat: "Terperangkap dalam kelumpuhan analisis (analysis paralysis) tanpa mengambil tindakan nyata. Memakai akurasi logika murni sebagai senjata pelindung diri untuk menghindari relasi intim.",
    redFlags: [
      "Sengaja memutus curahan hati emosional pasangan hanya untuk memperbaiki premis argumennya.",
      "Menganggap ekspresi emosi manusia murni sebagai bukti irasionalitas kognitif tingkat rendah.",
      "Menunda eksekusi tindakan praktis sampai model konseptualnya dinilai benar-benar sempurna.",
      "Menyembunyikan penilaian subjektifnya yang tajam di balik topeng sikap netral yang dingin."
    ],
    greenFlags: [
      "Sama sekali tidak goyah oleh tekanan kelompok atau manipulasi emosi massa.",
      "Sangat berbesar hati mengakui kekeliruan argumennya ketika disajikan bukti objektif yang valid.",
      "Memiliki integritas prinsip yang sangat kokoh dan konsisten dalam perilaku nyata.",
      "Membantu sesama mengurai kekeruhan masalah emosional menjadi peta solusi yang jernih."
    ],
    superior: "Mengajukan satu pertanyaan dasar yang sangat elegan, yang didesain khusus untuk meruntuhkan seluruh asumsi bangunan argumen lawan bicaranya dari dalam.",
    insecure: "Memperketat parameter definisi dan mengasingkan diri untuk mengumpulkan data teoritis agar tidak ada celah baginya untuk ditolak atau didebat.",
    penampilan: "Sederhana, praktis, fungsional, dan tidak peduli dengan tren mode fisik. Meja kerjanya penuh buku dan skema diagram yang hanya dipahami dirinya sendiri.",
    kalimatKhas: [
      "Mari kita definisikan draf istilah tersebut secara jernih terlebih dahulu.",
      "Ada inkonsistensi yang fatal dalam alur penalaranmu tadi.",
      "Secara prinsip dasar, kedua hal tersebut tidak dapat dicampuradukkan."
    ],
    roastShort: "LII: Korektor tata bahasa dan inkonsistensi logika teoretis saat kapal penyeberangan sedang tenggelam.",
    kesimpulanBrutal: "LII adalah tipe orang yang kalah dalam dinamika sosial seketika, tetapi memenangkan perdebatan konseptual dalam kepalanya tiga hari kemudian."
  },
  {
    id: "SLE",
    name: "SLE (Sensory Logical Extratim)",
    quadra: "Beta",
    ego: "Se-Ti",
    alias: "The Conqueror / Panglima Taktis",
    stereotip: "SLE memasuki ruangan dan langsung memetakan siapa yang memegang otoritas nyata, siapa yang hanya sok berkuasa, siapa yang mudah digerakkan sebagai bidak, dan aset fisik apa saja yang bisa dikuasai sebelum jam makan siang.",
    aura: "Sangat kuat, mendominasi ruang fisis secara riil, tak kenal takut, dan memancarkan kesadaran taktis yang tajam. Sulit diabaikan bahkan ketika sedang diam total.",
    kebiasaan: [
      "Langsung mengambil alih keputusan taktis saat kelompok sedang ragu dan berputar-putar.",
      "Menguji keteguhan mental orang lain secara langsung lewat tantangan fisis atau debat.",
      "Lebih mempercayai hasil pembuktian tindakan nyata daripada janji tertulis.",
      "Sengaja menyela penjelasan teoritis yang dirasanya terlalu berbelit-belit.",
      "Menggerakkan seluruh sumber daya fisis sekitar demi mencapai target objektif cepat."
    ],
    isiKepala: [
      "Jika tidak ada satu pun orang idiot di ruangan ini yang berani memimpin, maka aku yang ambil alih.",
      "Jangan berani mengklaim sesuatu tidak bisa dilakukan sebelum kamu mencobanya di depanku.",
      "Orang ini terlalu banyak berteori. Mari kita lihat apakah ia tetap kokoh saat aku beri tekanan fisik nyata."
    ],
    bicara: "Lansung pada sasaran, tegas, bernada menantang, bernada final, dan memiliki daya dorong yang kuat. Jika ia ragu, ia akan berbicara lebih keras untuk membungkam keraguan tersebut.",
    perhatian: "Melalui perlindungan fisik yang nyata dari ancaman luar, pembelaan posisi, pemberian akses sumber daya, dan pembuktian kekuatan nyata.",
    bangga: "Ketahanan fisis, keteguhan sikap dalam krisis, dan kemampuan menaklukkan rintangan konkret.",
    menyinggung: "Tersinggung berat jika dituduh lemah, dikendalikan secara sembunyi-sembunyi oleh pihak lain, atau ketika pengaruh kekuasaannya tidak diperhitungkan kelompok.",
    caraMarah: "Tanda awal: pandangan mata menajam, tubuh menegang mengambil posisi dominan. Saat memuncak: konfrontasi langsung tanpa sensor emosional. Setelah konflik: menganggap masalah selesai seketika setelah ada pemenang yang jelas secara objektif; membenci drama yang menggantung.",
    menyukai: "Mengajak berkompetisi sehat, menantang target, memberikan perlindungan absolut dari gangguan sosial, dan melancarkan manuver taktis bersama.",
    berbohong: "Menyederhanakan detail situasi taktis secara agresif untuk membuat tindakan dominasinya terkesan sebagai satu-satunya jalan keluar logis.",
    kontradiksi: [
      "Sangat menghormati keberanian orang lain untuk menentang, tetapi sering langsung menghancurkan siapa pun yang berani menentang keputusannya.",
      "Menuntut kejujuran langsung tanpa basa-basi, tetapi tindakannya sendiri sering membuat orang lain takut untuk berkata jujur di depannya.",
      "Mengaku sangat praktis dan realistis, tetapi sering memperbesar masalah sepele menjadi medan perang harga diri yang tidak perlu."
    ],
    sehat: "Pemimpin yang luar biasa andal dalam situasi badai krisis, tangguh, sangat protektif terhadap kelompoknya, dan mampu menggunakan kekuatannya secara bijaksana.",
    tidakSehat: "Mengintimidasi siapa pun yang dianggap lemah. Memperakukan ruang sosial murni sebagai arena pertarungan kekuasaan yang harus dimenangkannya.",
    redFlags: [
      "Tetap melanggar batasan fisis orang lain meski sudah diberi jawaban tidak secara tegas.",
      "Mengambil keputusan penting bagi hidup orang lain tanpa meminta izin terlebih dahulu.",
      "Membuat candaan merendahkan yang sebenarnya adalah kedok tes hierarki dominasi.",
      "Sangat sulit meminta maaf secara tulus tanpa menyisipkan pembenaran logis tindakannya."
    ],
    greenFlags: [
      "Sanggup bergerak cepat melindungi bawahan atau teman dalam situasi bahaya nyata.",
      "Tidak mudah panik atau lumpuh saat dihadapkan pada ancaman risiko fisis yang tinggi.",
      "Berani menghadapi masalah interpersonal secara jernih dan terbuka di depan umum.",
      "Memastikan semua rencana teoritis memiliki draf eksekusi konkret yang menghasilkan nilai."
    ],
    superior: "Membiarkan orang lain mempresentasikan strategi rumit, lalu menyelesaikan masalah tersebut lewat satu keputusan taktis cepat agar semua tahu siapa penguasa lapangan sebenarnya.",
    insecure: "Menjadi semakin kompetitif secara agresif, menantang friksi dengan orang lain, dan memamerkan kekuatan fisis/asetnya demi menutupi kecemasan internal.",
    penampilan: "Tegas, rapi, bernuansa kuat, fungsional, dan menonjol. Membawa barang berharga atau bernilai tinggi sebagai penanda status kekuasaannya.",
    kalimatKhas: [
      "Jangan beri aku alasan klise, beri aku hasil konkret sekarang.",
      "Serahkan urusan lapangan ini kepadaku, biar cepat selesai.",
      "Buktikan argumenmu itu di dunia nyata sekarang juga."
    ],
    roastShort: "SLE: Menganggap seluruh interaksi sosial harian sebagai pertandingan kompetisi fisis olahraga tandang.",
    kesimpulanBrutal: "SLE adalah tipe orang yang tidak akan membuang waktu mengetuk pintu karena ia sudah mengukur kekuatan engsel pintu tersebut untuk didobrak fisis."
  },
  {
    id: "IEI",
    name: "IEI (Intuitive Ethical Introtim)",
    quadra: "Beta",
    ego: "Ni-Fe",
    alias: "The Lyricist / Penyair Mistis",
    stereotip: "IEI terlihat hadir fisis di ruangan, tetapi sebagian besar kesadarannya sebenarnya sedang mengembara di masa depan yang jauh sambil memutar lagu pengiring yang melodramatis tentang kehancuran dunia.",
    aura: "Misterius, melayang, anggun, dan sulit didekati secara langsung. Pandangan matanya seolah menembus realitas fisis, membuat orang merasa ada rahasia kosmis yang diketahuinya secara sunyi.",
    kebiasaan: [
      "Menghubungkan suasana emosi ruangan secara langsung dengan karya musik atau puisi tertentu.",
      "Sengaja menunda tindakan praktis hingga hari esok demi menunggu 'momen emosi yang matang'.",
      "Sangat peka membaca perubahan mikro pada intonasi suara dan tatapan mata orang.",
      "Menghilang dari perbincangan fisis tanpa ada satu pun orang menyadari keputusannya pergi.",
      "Memberikan peringatan firasat yang sangat samar, lalu menyalahkan orang lain karena tidak mengerti."
    ],
    isiKepala: [
      "Aku sudah melihat dengan sangat jelas ke mana akhir tragis drama hubungan ini akan bermuara.",
      "Aku tidak ingin membicarakan rencana taktis sekarang. Momen waktu emosionalnya belum berselaras.",
      "Kalian mengira aku tidak berdaya karena diam. Aku hanya sedang menunggu waktu yang tepat untuk bergerak."
    ],
    bicara: "Berlapis, sarat metafora puitis, halus, dan sangat dipengaruhi intonasi suara. Kalimatnya sering menyimpan makna kedua atau ketiga yang baru akan dibongkar saat konflik memuncak.",
    perhatian: "Melalui sediaan pemahaman emosi tersirat yang mendalam, penciptaan karya estetis pribadi, dan pemberian rasa istimewa yang eksklusif.",
    bangga: "Ketajaman prediksi arah masa depan kelompok, pemahaman emosi terdalam, serta kelenturan adaptasi batin.",
    menyinggung: "Tersinggung berat ketika firasat batinnya ditertawakan sebagai takhayul, atau dipaksa melakukan tindakan taktis fisis yang dinilai terburu-buru.",
    caraMarah: "Tanda awal: menarik diri secara total dan mengubah atmosfer sekitar menjadi suram. Saat memuncak: menyemburkan sindiran verbal yang sangat tajam yang menyerang motif batin lawan paling sensitif. Setelah konflik: memproses seluruh rasa sakit hati di kamarnya menggunakan karya seni atau tulisan naratif puitis.",
    menyukai: "Membagi karya seni favorit, mengirim pesan puitis larut malam, merancang liburan dunia batin bersama, dan membuka pintu rahasia fantasi jiwanya.",
    berbohong: "Menyamarkan informasi asli di balik kabut atmosfer emosi, berkata 'aku tidak tahu' demi menghindari keharusan menjelaskan motif personalnya yang rumit.",
    kontradiksi: [
      "Sangat merindukan hubungan batin yang mendalam, tetapi menolak memberikan petunjuk instruksi praktis bagi pasangannya untuk mendekat.",
      "Mengaku murni mengikuti aliran takdir hidup tanpa rencana, tetapi diam-diam lihai mengompensasi suasana emosi sekitar demi tujuannya.",
      "Terlihat sangat rapuh, sensitif, dan penurut fisis, tetapi bisa sangat tegar menolak bergerak jika dipaksa bertindak di luar kehendak batinnya."
    ],
    sehat: "Sangat visioner, imajinatif, penuh empati, memiliki ketepatan waktu sosial yang sangat anggun, dan mampu menerjemahkan firasatnya menjadi komunikasi berharga.",
    tidakSehat: "Meromantisasi penderitaan hidup (martyrdom) tanpa berniat memperbaikinya. Ketidakjelasan strategis yang sengaja dipelihara agar terbebas dari tanggung jawab taktis.",
    redFlags: [
      "Menjajah emosi pasangan lewat perubahan mood pasif-agresif tanpa pernah mau bicara langsung.",
      "Sengaja menghilang dari peredaran fisis murni hanya untuk menguji siapa yang akan mencarinya.",
      "Mengklaim asumsi pribadinya sebagai ramalan kebenaran mutlak yang tidak boleh dipertanyakan.",
      "Membiarkan orang lain memikul seluruh tanggung jawab fisisnya sementara dirinya sibuk bermimpi."
    ],
    greenFlags: [
      "Sanggup mendeteksi badai emosi atau potensi konflik sebelum riak pertamanya muncul ke permukaan.",
      "Membuat pengalaman hidup harian yang biasa terasa memiliki makna eksistensial yang luhur.",
      "Memiliki kepekaan luar biasa terhadap waktu yang tepat (momentum) untuk membuat keputusan sosial.",
      "Menyampaikan kritik atau masukan emosional tanpa memicu rasa bersalah yang defensif."
    ],
    superior: "Menyaksikan orang-orang sekitar panik dilanda krisis, lalu tersenyum tipis karena dirinya telah meramalkan kehancuran tersebut lewat draf prediksi lamanya.",
    insecure: "Sengaja menjauhkan diri secara fisis, berpura-pura rapuh secara dramatis, atau mempertebal topeng misterius agar tidak dihukum oleh realitas riil yang kasar.",
    penampilan: "Estetis, bernuansa klasik, lembut, puitis, dan sering menggunakan warna gelap. Kamarnya dipenuhi pernak-pernik sentimental yang menyimpan memori batin.",
    kalimatKhas: [
      "Aku sudah merasakan kejanggalan ini sejak lama sekali sebelum terjadi.",
      "Biarkan saja dulu keadaan ini bergulir mencari muaranya sendiri.",
      "Sudahlah, kamu tidak akan pernah sanggup memahami kedalaman rasa ini."
    ],
    roastShort: "IEI: Subtitel emosional dan instruksi operasional tindakan tidak pernah tersedia bagi umum.",
    kesimpulanBrutal: "IEI adalah tipe orang yang tampak sangat misterius hanya karena separuh dari pesan komunikasinya dikirim melalui cuaca batin rahasianya."
  },
  {
    id: "EIE",
    name: "EIE (Ethical Intuitive Extratim)",
    quadra: "Beta",
    ego: "Fe-Ni",
    alias: "The Mentor / Sutradara Tragis",
    stereotip: "EIE tidak pernah sekadar mengalami hari yang buruk. Ia sedang mementaskan babak kedua dari naskah drama kolosal agung tentang kesetiaan kelompok, pengkhianatan nilai, dan konsekuensi tragis bagi peradaban.",
    aura: "Sangat magnetis, penuh ekspresi intens, karismatik, atau sengaja menyelimuti diri dalam aura dingin yang agung. Kehadirannya fisisnya langsung menyerap perhatian ruangan.",
    kebiasaan: [
      "Menghubungkan kejadian kecil harian dengan narasi filosofis perjuangan yang kolosal.",
      "Membaca makna konseptual terselubung di balik pilihan kata sederhana lawan bicaranya.",
      "Mengatur nada suara dan volume secara dramatis demi memengaruhi kondisi emosi massa.",
      "Menceritakan perdebatan pribadi menggunakan sudut pandang narasi moral kepahlawanan.",
      "Menyimpan draf kalimat puitis tajam untuk dilontarkan pada momen puncak konflik."
    ],
    isiKepala: [
      "Ini bukan sekadar masalah keterlambatan waktu pesanbalas. Ini adalah simbol dari runtuhnya pilar rasa hormat.",
      "Aku tahu persis ada api emosi besar di dalam jiwanya. Ia hanya belum memiliki keberanian untuk mengakuinya.",
      "Jika sekelilingku tetap bersikap tenang dalam situasi gila ini, artinya mereka belum memiliki kecerdasan membaca bahaya."
    ],
    bicara: "Sarat emosi, puitis, metaforis, bergerak dinamis menuju klimaks pesan. Bahkan penyajian data angka fisis pun di tangannya akan terdengar seperti draf pidato menjelang perang besar.",
    perhatian: "Melalui komitmen emosional yang total, pembelaan moral yang gigih, penciptaan visi masa depan inspiratif, dan pelibatan orang ke dalam gerakan penting.",
    bangga: "Kedalaman rasa kemanusiaan, kemampuan membaca perkembangan tren sosial makro, dan daya pengaruh kepemimpinan emosional.",
    menyinggung: "Tersinggung berat ketika ekspresi emosinya dianggap sebagai melodrama palsu, dituduh tidak tulus, atau ketika visinya dianggap khayalan belaka.",
    caraMarah: "Tanda awal: nada suara beralih menggunakan kosa kata simbolis yang dingin dan menusuk. Saat memuncak: konfrontasi moral terbuka di depan kelompok, menetapkan siapa pahlawan dan siapa penghianat utama. Setelah konflik: merenungkan arti batin dari pengkhianatan tersebut dan membuat jarak formal.",
    menyukai: "Mengirimkan karya seni yang mengguncang jiwa, mendedikasikan waktu diskusi filosofis mendalam di malam suntuk, dan merancang masa depan visi bersama.",
    berbohong: "Menyusun ulang struktur cerita interpersonal demi memperkuat pesan moral atau efek emosional yang ingin ditanamkannya pada pendengar.",
    kontradiksi: [
      "Sangat menuntut ketulusan emosional murni, tetapi dirinya sendiri lihai mengemas ekspresi emosinya secara teatrikal demi kepentingan visi.",
      "Sangat mendambakan pemahaman dari orang lain, tetapi terus menyampaikan pemikirannya menggunakan simbol rumit yang sulit diterjemahkan fisis.",
      "Mengklaim dirinya menghargai kompleksitas jiwa manusia, tetapi sangat cepat melabeli orang lain sebagai sosok protagonis atau antagonis."
    ],
    sehat: "Sangat visioner, inspiratif, karismatik, berani menyuarakan kebenaran sulit di depan umum, dan bertanggung jawab penuh atas arah pengemasan emosinya.",
    tidakSehat: "Sengaja menciptakan konflik interpersonal murni agar dirinya merasa hidup dan penting. Menguji loyalitas orang sekitar secara manipulatif.",
    redFlags: [
      "Menggunakan aksi diam (silent treatment) sebagai dekorasi panggung pertunjukan amarahnya.",
      "Menganggap ketidaksetujuan rasional orang lain terhadap idenya sebagai bentuk pengkhianatan nilai moral.",
      "Menuntut orang lain membuktikan kesetiaan fisik secara konstan lewat ujian emosional.",
      "Sengaja menyebarkan atmosfer panik dan kegentingan sebelum data fakta diverifikasi lengkap."
    ],
    greenFlags: [
      "Berani melisankan ketegangan batin kelompok yang selama ini dihindari semua orang.",
      "Mampu menularkan api keberanian moral dan antusiasme tinggi kepada anggota tim.",
      "Mengubah konsep filosofis teoretis abstrak menjadi narasi perjuangan konkret yang menarik.",
      "Memiliki kepekaan tajam terhadap pergeseran arah kualitas hubungan interpersonal."
    ],
    superior: "Berbicara di depan umum seolah-olah ia adalah satu-satunya entitas kognitif yang memahami arah peradaban sejarah ini secara historis dan kosmis.",
    insecure: "Meningkatkan ekspresi dramatis secara eksentrik atau bersembunyi di balik misteri dingin yang rumit demi menghindari diabaikan kelompok.",
    penampilan: "Dramatis, elegan, terkadang menggunakan siluet tegas dengan warna kontras yang dramatis. Profil medsos disunting seperti arsip karya seni.",
    kalimatKhas: [
      "Ada pergeseran atmosfer batin yang sangat berbahaya di ruangan ini.",
      "Kamu tidak akan pernah mengerti betapa besarnya pengorbanan masa depan yang sedang kita siapkan.",
      "Jangan pernah berani bertingkah seolah-olah kamu tidak merasakan ketegangan moral ini."
    ],
    roastShort: "EIE: Sutradara teater emosional yang sanggup mengemas belanja bulanan biasa menjadi tragedi kemanusiaan.",
    kesimpulanBrutal: "EIE adalah tipe orang yang tidak akan sekadar melangkah pergi meninggalkan ruangan, ia akan membanting pintu tepat pada bait terakhir musik pengiring drama."
  },
  {
    id: "LSI",
    name: "LSI (Logical Sensory Introtim)",
    quadra: "Beta",
    ego: "Ti-Se",
    alias: "The Inspector / Penjaga Ordo",
    stereotip: "LSI menganggap draf kesepakatan tertulis yang dirumuskan tiga bulan lalu tetap sepenuhnya berlaku aktif tanpa pengecualian fisis, bahkan ketika semua anggota kelompok mengira pembicaraan itu hanyalah obrolan santai.",
    aura: "Sangat terkendali, kokoh, berwibawa, dan memancarkan disiplin baja yang sulit digeser fisis. Tatapan matanya lurus, mengevaluasi kepatuhan operasional.",
    kebiasaan: [
      "Secara konsisten meletakkan semua barang pribadinya pada tempat fisis yang dinilaas benar.",
      "Merekam dan mencatat dengan detail siapa saja yang tidak menepati kesepakatan draf waktu.",
      "Memisahkan prosedur utama operasional secara kaku dari pengecualian kondisional.",
      "Melakukan pemeriksaan ulang apakah instruksinya sudah dipahami secara presisi oleh bawahan.",
      "Menahan diri tidak berkomentar sampai ketidakteraturan fisis sekeliling melewati ambang batas."
    ],
    isiKepala: [
      "Mengapa prosedur keselamatan kerja yang sangat sederhana ini masih harus dijelaskan kembali kepada manusia dewasa?",
      "Aku sudah memberikan batas toleransi fisis. Mereka malah menyebutnya sebagai kesempatan untuk melanggar kembali.",
      "Jika semua rincian taktis dilakukan sesuka hati tanpa disiplin, jangan pernah berani terkejut melihat hasil akhir berantakan."
    ],
    bicara: "Sangat runtut, formal, tegas, jelas, menggunakan kalimat instruktif yang ringkas. Menyampaikan hasil evaluasi batin seolah-olah itu adalah undang-undang tertulis.",
    perhatian: "Melalui sediaan keamanan fisik pelindung yang terstruktur, bantuan penertiban birokrasi, pengerjaan tugas yang akurat, dan kepatuhan janji.",
    bangga: "Disiplin diri yang ketat, konsistensi perilaku yang kokoh, dan keteguhan memegang aturan dalam keadaan tersulit.",
    menyinggung: "Tersinggung berat ketika aturan yang dijaganya diremehkan kelompok, dituduh kaku tanpa alasan logis, atau ketika otoritas penertibannya ditentang.",
    caraMarah: "Tanda awal: rahang mengeras, intonasi suara memendek tajam dan menusuk. Saat memuncak: mengeluarkan instruksi tertib operasional yang mutlak disertai ancaman sanksi nyata. Setelah konflik: dapat langsung bertindak normal setelah masalah dinilai tuntas fisis, tetapi catatan pelanggaran tidak otomatis terhapus dari berkas memorinya.",
    menyukai: "Mengambil alih urusan keselamatan pasangannya, menertibkan jadwal harian mereka demi efisiensi, dan memberikan perlindungan fisik total.",
    berbohong: "Mengklaim bahwa tindakan kontrol personalnya yang keras murni didasarkan atas 'poros prosedur keselamatan objektif'.",
    kontradiksi: [
      "Sangat memuja ketertiban dan kedamaian sosial, tetapi sanggup memicu konflik interpersonal yang sangat besar demi menegakkan aturan mainnya.",
      "Mengklaim dirinya bertindak objektif murni secara logika, tetapi sebenarnya sangat subjektif personal terhadap siapa pun yang melanggar wilayah kekuasannya.",
      "Menuntut orang lain bersikap jujur tanpa ditutup-tutupi, tetapi dirinya sendiri tidak pernah memberi tahu apakah tanggapan jujur tersebut aman dari sanksi."
    ],
    sehat: "Sangat dapat diandalkan, tegar, pelindung keadilan yang konsisten, sanggup menegakkan standar tinggi operasional sambil tetap memanusiakan kesalahan subordinat.",
    tidakSehat: "Melakukan mikromanajemen yang berlebihan pada hidup orang lain. Menjadikan hukuman fisis atau verbal sebagai metode menegakkan ketertiban kognitifnya.",
    redFlags: [
      "Sengaja merumuskan aturan main baru secara mendadak setelah mendeteksi kesalahan orang lain.",
      "Sengaja menguji kepatuhan kognitif pasangan melalui rincian perkara domestik yang tidak esensial.",
      "Memperlakukan setiap pertanyaan penjelasan rasional sebagai bentuk tindakan pembangkangan hierarki.",
      "Menyimpan draf rekaman kesalahan orang lain dalam folder mental jangka panjang."
    ],
    greenFlags: [
      "Selalu menempati draf janji dan kewajiban fisisnya secara tepat waktu tanpa banyak dalih.",
      "Memiliki keberanian tinggi untuk memikul tanggung jawab operasional tim di masa krisis.",
      "Sanggup menjaga ketenangan pikiran dan konsistensi kinerja di bawah tekanan berat.",
      "Memberikan kejelasan struktur tugas yang sangat rapi saat organisasi sedang dilanda kekacauan."
    ],
    superior: "Nada suaranya berubah menjadi draf instruksi penggunaan alat berat: lambat, sangat terperinci, didasarkan pada asumsi logis bahwa pendengar adalah entitas ceroboh.",
    insecure: "Meningkatkan pengawasan fisis sekeliling secara drastis, merapikan letak perabot berkali-kali, atau memaksakan rutinitas olahraga kaku demi meredam gejolak emosi.",
    penampilan: "Sangat rapi, tajam, bersih, fungsional, menggunakan pakaian berpotongan tegas atau setelan formal. Meja kerjanya steril dari dekorasi tidak fungsional.",
    kalimatKhas: [
      "Segala hal di dunia ini ada batas operasionalnya yang mutlak.",
      "Aku sudah menjelaskan rincian pembagian tugas ini secara tertulis.",
      "Lakukan saja draf langkah tersebut dengan benar sesuai instruksi awal."
    ],
    roastShort: "LSI: Konstitusi berjalan yang mengenakan jas rapi dan sepatu mengilap yang tidak mengizinkan pengecualian.",
    kesimpulanBrutal: "LSI adalah tipe orang yang sanggup mengubah kesepakatan makan malam santai biasa menjadi draf pasal undang-undang konstitusi lengkap dengan sanksi pidana."
  },
  {
    id: "SEE",
    name: "SEE (Sensory Ethical Extratim)",
    quadra: "Gamma",
    ego: "Se-Fi",
    alias: "The Politician / Arsitektur Aliansi",
    stereotip: "SEE sanggup masuk ke dalam kelompok pertemanan baru, lalu dalam waktu sepuluh menit sudah memetakan siapa yang memegang pengaruh, siapa yang sedang bermusuhan secara terselubung, siapa yang haus validasi, dan siapa yang diam-diam tertarik padanya.",
    aura: "Sangat hidup, memancar rasa percaya diri tinggi, hangat secara personal, dan sangat sadar akan daya tarik fisisnya. Memperkecil jarak sosial dengan cepat.",
    kebiasaan: [
      "Mengingat seluk-beluk gosip hubungan antarmanusia jauh lebih baik daripada jadwal kerja formal.",
      "Menyesuaikan gaya pendekatan fisis dan intonasi secara dinamis berdasarkan target lawan bicaranya.",
      "Langsung mendeteksi aliansi terselubung kelompok bahkan di balik senyuman etiket formal.",
      "Membela teman dekatnya secara agresif di depan publik tanpa memedulikan argumen logika keruntuhan kasus.",
      "Mengambil keputusan sosial penting jauh lebih cepat sebelum orang lain menyadari adanya masalah."
    ],
    isiKepala: [
      "Aku tahu persis siapa saja manusia munafik di ruangan ini yang sedang berpura-pura baik.",
      "Jika seseorang sungguh-sungguh peduli padaku, pembuktian tindakannya akan segera terlihat fisis.",
      "Aku tidak sedang berupaya mengendalikan mereka. Aku hanya sedang memastikan posisiku aman di atas."
    ],
    bicara: "Sangat personal, langsung, persuasif, tak segan menggunakan daya tarik fisis atau intonasi menggoda. Sanggup berubah dari sangat hangat menjadi sangat tajam seketika tanpa canggung.",
    perhatian: "Melalui pelibatan orang ke dalam lingkaran pengaruhnya secara eksklusif, pembelaan posisi kelompok secara agresif, dan pemberian hadiah bernilai estetika tinggi.",
    bangga: "Daya pengaruh sosialnya yang luas, kesetiaan batin, serta ketajaman instingnya membaca motif manusia.",
    menyinggung: "Tersinggung berat ketika komitmen kedekatannya dianggap remeh, ketika pasangannya bersikap dekat dengan musuh politiknya, atau ketika pengaruh kekuasaannya digeser.",
    caraMarah: "Tanda awal: pandangan matanya yang semula hangat berubah menjadi sangat tajam mengintimidasi. Saat memuncak: konfrontasi personal terbuka mengenai posisi loyalitas lawan bicara. Setelah konflik: memutuskan secara strategis apakah relasi tersebut masih bernilai; jika tidak, pintu akses ditutup mati.",
    menyukai: "Membawa orang tersebut masuk ke dalam lingkar kekuasaan sosialnya, melindunginya secara fisis, dan memberikan validasi emosional yang intens dan intim.",
    berbohong: "Mengemas citra diri dan memoles alur cerita interpersonal secara dinamis agar posisinya di mata kelompok tetap terlihat sebagai korban yang dikhianati.",
    kontradiksi: [
      "Sangat mengagungkan hubungan emosional yang tulus dan jujur, tetapi gerak-gerik interpersonalnya dipenuhi manuver politik pengaruh.",
      "Sangat menuntut kebebasan batin pribadi, tetapi tidak tahan membiarkan status hubungannya dengan pasangan berada dalam ketidakpastian.",
      "Mengaku bertindak spontan murni berdasarkan kata hati, tetapi sebenarnya sangat cepat menghitung konsekuensi politis tindakannya."
    ],
    sehat: "Sangat hangat, berani, protektif, pemimpin kharismatik yang lihai membangun aliansi kuat tanpa harus memanfaatkan kelemahan emosional orang sekitarnya.",
    tidakSehat: "Sangat posesif, transaksional dalam hubungan intim, gemar melakukan tes kesetiaan yang melelahkan pada teman, dan suka menyebarkan draf rahasia pribadi pembangkang.",
    redFlags: [
      "Memaksa orang lain untuk memilih kubu aliansi di tengah perselisihan kelompok.",
      "Menganggap kedekatan emosional masa lalu sebagai hak akses permanen untuk mengatur hidup pasangan.",
      "Memakai pemberian fisisnya untuk memicu rasa utang budi emosional pada teman.",
      "Sengaja membocorkan rahasia intim lawan bicaranya ke publik saat merasa dikhianati."
    ],
    greenFlags: [
      "Sanggup pasang badan membela teman dekatnya secara konkret dari penindasan kelompok luar.",
      "Sangat cepat mengendus tindak eksploitasi atau perlakuan tidak adil dalam hubungan interpersonal.",
      "Memiliki keberanian tinggi menyatakan ketertarikan fisis dan emosional secara jujur.",
      "Tidak akan pernah meninggalkan kawannya yang sedang jatuh terpuruk dalam kesulitan keuangan."
    ],
    superior: "Tersenyum sinis menyaksikan orang lain mendiskusikan teori sosial, sementara dirinya sudah memegang kendali kesetiaan orang-orang penting di balik layar.",
    insecure: "Meningkatkan intensitas pamer pesonanya secara agresif, gemar menciptakan kompetisi sosial, atau berupaya mengontrol ketat wilayah pergaulan pasangannya.",
    penampilan: "Menarik perhatian fisis, berani mengenakan potongan pakaian modis yang sensual namun berkelas, serta memancarkan karisma magnetis yang hidup.",
    kalimatKhas: [
      "Tunjukkan kepadaku sekarang, sebenarnya kamu berada di pihak siapa.",
      "Aku sanggup melihat langsung isi motif batismu di balik senyuman palsu itu.",
      "Jangan pernah berani meremehkan daya pengaruh sosial yang kumiliki."
    ],
    roastShort: "SEE: Jaringan intelijen geopolitik domestik yang mengenakan parfum harum bermerek mahal.",
    kesimpulanBrutal: "SEE adalah tipe orang yang sanggup membuat semua orang merasa menjadi sosok terpilih dalam hidupnya, sebelum diam-diam mencatat siapa yang tidak memilihnya kembali."
  },
  {
    id: "ILI",
    name: "ILI (Intuitive Logical Introtim)",
    quadra: "Gamma",
    ego: "Ni-Te",
    alias: "The Critic / Peramal Keruntuhan",
    stereotip: "ILI sudah mengetahui dengan sangat presisi bahwa draf rencana bisnismu akan hancur lebur dalam waktu enam bulan, namun ia sengaja memilih diam tidak menghentikanmu karena ia tahu manusia terkadang memang layak mendapatkan edukasi rasa sakit langsung dari realitas harian.",
    aura: "Sangat tenang, skeptis, dingin, sulit dibuat terkesan, dan memancarkan atmosfer batin seperti makhluk purba yang baru bangun dari tidur panjang setelah menyaksikan keruntuhan tiga dinasti besar.",
    kebiasaan: [
      "Sangat lihai mendeteksi titik risiko kegagalan saat semua orang sedang dilaa euforia.",
      "Sengaja menunda tindakan jangka panjang demi menyimpan energi fisisnya secara efisien.",
      "Melontarkan ramalan kegagalan singkat yang baru disadari kebenarannya setelah musibah terjadi.",
      "Secara konsisten mengamati kesenjangan antara janji verbal orang dengan pembuktian hasil nyata.",
      "Hanya bersedia menggunakan energinya untuk urusan yang dinilainya benar-benar memberi manfaat jangka panjang."
    ],
    isiKepala: [
      "Aku bisa saja menguraikan kesalahan draf rencanamu sekarang. Namun kalian terlalu bodoh untuk bersedia mendengarnya.",
      "Optimisme buta dan motivasi berapi-api itu bukanlah sebuah cetak biru draf rencana taktis.",
      "Mari kita duduk manis menyaksikan berapa lama energi antusiasme kanak-kanak mereka akan bertahan."
    ],
    bicara: "Amat hemat kata, kering, tajam, menggunakan nada sarkasme yang datar. Kalimat humornya bisa sangat dingin hingga orang baru menyadari bahwa mereka dihina setelah beberapa menit berlalu.",
    perhatian: "Melalui sediaan analisis risiko jangka panjang yang akurat, pembagian informasi teoretis yang sangat bernilai fisis, dan pemberian solusi pragmatis kritis.",
    bangga: "Ketajaman pandangan jauhnya mendeteksi bahaya sistemik, realisme berpikir yang dingin, dan kemandirian dari bias emosi kelompok.",
    menyinggung: "Tersinggung berat ketika draf prediksi risikonya diabaikan kelompok, lalu sekelompok orang tersebut datang merengek menuntut bantuannya saat musibah benar-benar terjadi.",
    caraMarah: "Tanda awal: komentar sarkasmenya berubah menjadi sangat dingin dan memotong pembicaraan. Saat memuncak: membeberkan kronologis kesalahan draf berpikir lawan secara kronologis dan telak. Setelah konflik: menjauhkan diri secara fisis dan pasif menunggu kenyataan menyelesaikan pekerjaannya menghukum lawan.",
    menyukai: "Menyediakan waktu eksklusif yang langka baginya, menyajikan data analisis berharga untuk menyelamatkan pasangan dari keruntuhan finansial, dan menjadi pendengar setia tanpa intervensi emosi.",
    berbohong: "Menyembunyikan seberapa besar dirinya sebenarnya peduli pada keselamatan fisik pasangannya dengan memakai topeng apatisme kognitif.",
    kontradiksi: [
      "Menuntut hasil praktis nyata secepatnya dari orang sekitar, tetapi dirinya sendiri lihai menunda tindakan fisis berbulan-bulan demi melakukan pengamatan teoritis.",
      "Sangat bangga akan kemampuannya melihat bahaya risiko hidup, tetapi sering mengabaikan peluang emas karena terlalu fokus pada titik cacat model taktis.",
      "Mengklaim dirinya sama sekali tidak peduli pada evaluasi sosial orang lain, tetapi sangat kesal jika draf ramalan risikonya tidak diakui kelompok."
    ],
    sehat: "Arsitek strategi jangka panjang yang luar biasa tenang, pragmatis, andal menganalisis data tren makro, dan mampu bertindak tepat sebelum musibah melanda.",
    tidakSehat: "Sangat sinis, pasif, fatalistis, dan gemar menggunakan kegagalan atau penderitaan hidup orang sekitar sebagai bahan tertawaan intelektual yang edukatif.",
    redFlags: [
      "Hanya gemar mengkritik tajam draf rencana orang lain tanpa pernah mau menyajikan draf solusi alternatif konkret.",
      "Sengaja menunggu musibah menimpa tim hanya demi mendapatkan hak verbal untuk berkata 'sudah kubilang sejak awal'.",
      "Menyamarkan ketakutannya untuk bersaing di dunia nyata sebagai dalih sikap 'realisme pragmatis'.",
      "Sengaja membiarkan peluang bisnis emas lewat begitu saja murni karena malas mengeluarkan energi fisisnya."
    ],
    greenFlags: [
      "Mampu mendeteksi konsekuensi buruk tersembunyi dari draf kebijakan finansial tim jauh sebelum dilaksanakan.",
      "Sama sekali tidak bergeming oleh manipulasi emosi kelompok atau euforia tren pasar yang semu.",
      "Memberikan pasokan data informasi teoretis yang dijamin akurat dan luput dari bias sosial.",
      "Tetap berkepala dingin, tenang, dan mampu berpikir jernih saat sekelilingnya sedang dilanda kepanikan bencana."
    ],
    superior: "Memandang para motivator atau optimis dengan tatapan seorang ahli geologi senior yang sedang menyaksikan wisatawan mendirikan tenda fisis tepat di bibir kawah gunung berapi aktif.",
    insecure: "Meningkatkan benteng sinisme intelektualnya, bersikap dingin seolah tidak membutuhkan bantuan satu pun manusia, demi menutupi rasa takut ditolak rasa sayangnya.",
    penampilan: "Sangat minimalis, bernuansa gelap, mengutamakan kenyamanan fisis mutlak daripada gaya. Meja kerjanya steril dari barang hiasan fungsional.",
    kalimatKhas: [
      "Skenario buruk itu sudah sangat mudah diperkirakan sejak awal draf dirumuskan.",
      "Jangan membiasakan diri menaruh harapan terlalu tinggi pada sistem yang rapuh ini.",
      "Apa hasil nyata konkret yang bisa kamu buktikan hari ini di luar draf kata-katamu?"
    ],
    roastShort: "ILI: Peramal malapetaka profesional yang beroperasi menggunakan mode hemat daya fisis tubuh.",
    kesimpulanBrutal: "ILI adalah tipe orang yang sengaja membawa payung tebal saat langit cerah benderang, lalu terlihat kecewa saat hujan badai tidak kunjung turun untuk membuktikan ramalannya."
  },
  {
    id: "LIE",
    name: "LIE (Logical Intuitive Extratim)",
    quadra: "Gamma",
    ego: "Te-Ni",
    alias: "The Entrepreneur / Dinamo Efisiensi",
    stereotip: "LIE tidak pernah memiliki konsep 'waktu luang'. Baginya, waktu luang hanyalah istilah bodoh untuk menyebut sisa waktu produktif harian yang belum dioptimalkan secara strategis demi akumulasi hasil nyata.",
    aura: "Sangat dinamis, bergerak cepat, terarah, sibuk, dipenuhi energi eksekutif yang tinggi, dan seolah selalu dikejar oleh draf tenggat waktu proyek besar yang harus diselesaikannya.",
    kebiasaan: [
      "Mengubah gagasan teoretis abstrak menjadi cetak biru draf langkah bisnis konkret secepatnya.",
      "Mengevaluasi setiap proyek berdasarkan perhitungan rasio biaya, hasil nyata, dan efisiensi waktu.",
      "Secara konsisten mengumpulkan informasi atau alat kerja yang dinilai potensial berguna di masa depan.",
      "Membicarakan rincian peluang pertumbuhan bisnis saat orang lain sedang sibuk mengeluhkan masalah.",
      "Dirundung rasa bersalah emosional yang tinggi jika membiarkan dirinya menganggur tanpa bekerja."
    ],
    isiKepala: [
      "Sistem operasional ini masih bisa dipangkas langkahnya agar menghasilkan draf keuntungan ganda.",
      "Aku akan menjadwalkan istirahat fisis tubuhku tepat setelah draf target kuartal ini tercapai penuh.",
      "Ide jenius tanpa eksekusi lapangan yang efisien hanyalah dekorasi sampah kertas dalam laci."
    ],
    bicara: "Sangat cepat, padat data taktis, berorientasi hasil, informatif, dan pragmatis. Sanggup melompat membahas masa depan jangka panjang ketika tim masih kebingungan menyelesaikan masalah hari ini.",
    perhatian: "Melalui pembukaan akses peluang finansial konkret bagi kawannya, penyediaan sumber daya alat taktis, pengajaran kompetensi kerja, dan pengerjaan tugas.",
    bangga: "Daya tahan kerjanya yang luar biasa tinggi, efisiensi sistem pelakunya, dan ketetapan presisi visinya membangun masa depan finansial.",
    menyinggung: "Tersinggung berat ketika hasil kerja kerasnya dituduh murni akibat faktor keberuntungan semata, atau ketika draf langkah efisiensinya dihambat birokrasi lambat.",
    caraMarah: "Tanda awal: menunjukkan ketidaksabaran verbal secara terbuka, mengetuk jari fisis secara konstan. Saat memuncak: menyemburkan rincian kegagalan kinerja bawahannya secara objektif disertai draf kerugian finansial konkret yang ditimbulkan. Setelah konflik: menuntut solusi perbaikan praktis terjadwal secepatnya.",
    menyukai: "Mengajak pasangannya berdiskusi mengenai draf proposal investasi jangka panjang bersama, mendukung total proses pengembangan karier mereka, dan menyediakan seluruh infrastruktur logistik.",
    berbohong: "Melebih-lebihkan proyeksi keuntungan taktis demi meminimalkan ketakutan risiko pemodal. Berkata tubuhnya baik-baik saja padahal sirkulasi fisiknya hampir tumbang akibat disiksa kerja.",
    kontradiksi: [
      "Mengejar kebebasan hidup secara total bagi dirinya, tetapi secara sukarela memperbudak dirinya sendiri di bawah cambuk target kerja kaku harian.",
      "Sangat menghargai efisiensi taktis kalkulatif, tetapi sanggup mengambil risiko bisnis yang sangat spekulatif dan ekstrem murni demi menguji visinya.",
      "Mendambakan hubungan asmara yang intim dan hangat, tetapi hanya meluangkan sisa waktu setelah seluruh komitmen proyeknya tuntas penuh."
    ],
    sehat: "Pemimpin bisnis yang luar biasa produktif, visioner, adaptif terhadap perubahan pasar, tangguh menghadapi badai finansial, dan mampu memanusiakan sistem.",
    tidakSehat: "Workaholic yang kejam pada tubuh sendiri dan bawahan. Memperlakukan manusia di sekitarnya murni sebagai mesin produksi atau angka statistik modal.",
    redFlags: [
      "Mengukur harga diri dan kelayakan moral seseorang murni berdasarkan tingkat produktivitas kerja mereka.",
      "Mengubah hubungan intim pernikahan menjadi draf proyek evaluasi perbaikan kinerja pasangannya secara konstan.",
      "Sengaja mengabaikan sinyal rasa sakit dari organ tubuhnya sampai sirkulasi fisiknya ambruk total fisis.",
      "Menyajikan risiko investasi spekulatif tingkat tinggi sebagai 'peluang aman' demi menarik minat mitra."
    ],
    greenFlags: [
      "Mampu mengonversi gagasan abstrak menjadi mesin penghasil nilai konkret di dunia riil dengan cepat.",
      "Membuka jalan lebar dan membangun tangga karier bagi orang lain yang memiliki kompetensi kerja.",
      "Memiliki keberanian tinggi menanggung risiko finansial di bawah perhitungan taktis yang jernih.",
      "Sangat cepat mengevaluasi dan belajar dari kegagalan operasional untuk draf strategi baru."
    ],
    superior: "Menyodorkan draf peta solusi masalah praktis lengkap dengan jadwal eksekusi kepada teman yang sebenarnya murni hanya ingin didengar kesedihannya.",
    insecure: "Bekerja semakin gila, membeli gadget kerja terbaru secara impulsif, atau mengevaluasi ketat akun keuangannya demi mematikan rasa cemas ditolak.",
    penampilan: "Rapi, fungsional, dinamis bergerak fisis, selalu membawa gadget kerja lengkap beserta baterai cadangan. Profil medsos dipenuhi draf pencapaian akademis/bisnis.",
    kalimatKhas: [
      "Mari kita segera beralih membahas draf langkah perbaikan operasional konkret berikutnya.",
      "Kita tidak memiliki banyak waktu luang untuk disia-siakan dalam perdebatan rasa ini.",
      "Berapa rasio draf keuntungan riil yang bisa kita amankan dari manuver taktis ini?"
    ],
    roastShort: "LIE: Dinamo produktivitas tanpa rem yang mengonsumsi pemilik tubuhnya sendiri demi target diagram.",
    kesimpulanBrutal: "LIE adalah tipe orang yang sanggup mengubah badai bencana besar menjadi peluang bisnis baru, lalu segera mengubah peluang tersebut menjadi draf kerjaan baru yang kembali memicu krisis."
  },
  {
    id: "ESI",
    name: "ESI (Ethical Sensory Introtim)",
    quadra: "Gamma",
    ego: "Fi-Se",
    alias: "The Guardian / Penjaga Gerbang Moral",
    stereotip: "ESI mungkin terlihat diam membisu di tengah percakapan, tetapi dalam kepalanya ia sedang menyelenggarakan sidang peradilan rahasia untuk menilai karakter motismu dari cara kamu berinteraksi dengan pelayan.",
    aura: "Tertahan, formal, serius, tajam, meluncurkan pandangan mata selektif, dan memancarkan batas pertahanan batin yang sulit ditembus. Kehangatannya tersimpan eksklusif.",
    kebiasaan: [
      "Mengingat dengan sangat detail setiap riwayat perubahan kecil pada perilaku orang sekitarnya.",
      "Menilai kualitas karakter moral seseorang murni melalui pembuktian tindakan taktis fisis kecil.",
      "Sanggup pasang badan melindungi orang terdekatnya dari ancaman luar secara total.",
      "Memutus total akses komunikasi secara permanen seketika setelah kepercayaannya dirusak.",
      "Mengeluarkan peringatan moralitas yang sangat ringkas namun sarat akan bobot sanksi batin."
    ],
    isiKepala: [
      "Aku melihat dengan mata kepalaku sendiri bagaimana ia bertindak saat tidak ada keuntungan interpersonal.",
      "Kata maaf murni yang diucapkan lewat bibir tidak akan pernah otomatis menghapus draf kesalahan perilaku lalu.",
      "Aku sengaja diam membisu sekarang karena ingin melihat seberapa jauh kebusukan motifnya akan berjalan."
    ],
    bicara: "Sangat personal, tegas, lurus, tidak bertele-tele, dipenuhi kosa kata penegasan sikap moral batin. Bobot suaranya terasa berat karena didasarkan atas keputusan matang.",
    perhatian: "Melalui perlindungan fisik nyata dari gangguan luar, kesetiaan batin yang tidak pernah goyah oleh badai, dan kehadiran yang konsisten membela.",
    bangga: "Keutuhan prinsip moralitasnya yang tidak bisa dibeli, loyalitas abadi, and ketajamannya menyaring ketulusan.",
    menyinggung: "Tersinggung berat ketika loyalitas batinnya diragukan kelompok, ketika ia dipaksa memaafkan pelanggaran moral sebelum ia menilai adanya perbaikan nyata.",
    caraMarah: "Tanda awal: diam membisu seketika sambil mengirimkan tatapan mata dingin menusuk fisis. Saat memuncak: konfrontasi moral tajam membongkar seluruh daftar kesalahan karakter lawan secara spesifik. Setelah konflik: memutus total hubungan; pemulihan akses hanya bisa dibeli lewat pembuktian tindakan bertahun-tahun.",
    menyukai: "Menjaga ketat keselamatan pasangannya, memberikan kesetiaan tanpa batas dari godaan luar, membantu urusan domestik, dan membuka tirai rahasia hatinya.",
    berbohong: "Menyembunyikan dengan rapat kedalaman luka batinnya dari luar, berkata 'semuanya sudah tuntas' padahal arsip kesalahan moral lawan belum sepenuhnya dihapus.",
    kontradiksi: [
      "Sangat menuntut kejujuran dan ketulusan emosi dari orang lain, tetapi dirinya sendiri gemar melakukan tes kepatuhan karakter diam-diam tanpa memberitahu pasangannya.",
      "Menuntut pembuktian tindakan nyata yang konkret untuk setiap komitmen, tetapi keputusan penilaian batinnya sendiri sering kali tersembunyi tanpa argumen.",
      "Sangat setia menjaga relasi intim dengan pasangannya, tetapi sanggup memutus tali hubungan tersebut secara sepihak dan abadi dalam satu detik konflik."
    ],
    sehat: "Sangat loyal, memiliki kompas moralitas batin yang kokoh dan tegar, pelindung tangguh bagi orang yang ditindas, serta mampu menakar keadilan secara jernih.",
    tidakSehat: "Sangat gemar menghakimi moralitas sesama secara subjektif. Mengawetkan satu kesalahan kecil masa lalu orang lain sebagai label identitas busuk permanen mereka.",
    redFlags: [
      "Sengaja menjebak karakter orang lain lewat skenario interpersonal buatan untuk menguji draf loyalitas mereka.",
      "Mengungkit kembali seluruh daftar dosa moralitas pasangan masa lalu di tengah perdebatan baru.",
      "Menganggap firasat buruk batinnya murni sebagai kebenaran objektif mutlak tentang motif busuk lawan.",
      "Menutup rapat saluran komunikasi fisis secara sepihak lalu menuntut pasangan untuk memahami letak kesalahannya."
    ],
    greenFlags: [
      "Tidak akan pernah meninggalkan sahabatnya sendirian di tengah amukan badai gosip massa.",
      "Sangat andal mengendus motif eksploitasi terselubung dalam hubungan interpersonal rekan kerjanya.",
      "Memiliki ketegasan luar biasa dalam menjaga dan mempertahankan batas privasi dirinya.",
      "Menunjukkan komitmen loyalitasnya melalui serangkaian tindakan konkret nyata harian."
    ],
    superior: "Mengirimkan satu pandangan mata dingin yang bermakna, 'Aku mungkin bukan orang tersukses, tetapi setidaknya aku tidak menjual harga diri moralitas jiwaku seperti manusia itu'.",
    insecure: "Mempertebal dinding isolasi diri fisisnya, mencurigai motif setiap orang yang mendekat, demi menutupi rasa takut dikhianati rasa sayangnya.",
    penampilan: "Klasik, rapi, bernuansa tegas, bersih, dan menggunakan pakaian potongan rapi minimalis. Menjaga ketat kerapian barang pribadi kesayangannya.",
    kalimatKhas: [
      "Aku merekam dengan sangat jelas apa saja tindakan nyata yang sudah kamu lakukan.",
      "Kepercayaan itu tidak bisa dipulihkan murni menggunakan draf permohonan maaf verbal.",
      "Ada garis pembatas moralitas yang sangat krusial yang sudah berani kamu langgar."
    ],
    roastShort: "ESI: Pengelola museum arsip kesalahan moralitas sesama lengkap dengan draf kronologis kejadian.",
    kesimpulanBrutal: "ESI adalah tipe orang yang sanggup memberikan pengampunan tulus atas draf kesalahan masa lalumu, namun draf berkas kasusnya tetap disimpan rapi di dalam lici sebagai bukti cadangan."
  },
  {
    id: "LSE",
    name: "LSE (Logical Sensory Extratim)",
    quadra: "Delta",
    ego: "Te-Si",
    alias: "The Administrator / Jangkar Kompetensi",
    stereotip: "LSE melihat ketidakpraktisan perabot fisis yang selama ini diterima pasrah oleh semua orang sekitar, lalu bertanya dengan nada kesal mengapa belum ada satu pun manusia dewasa cerdas yang menginisiasi langkah perbaikan.",
    aura: "Sangat aktif, berwibawa, rapi secara fisis, memancarkan kompetensi praktis yang tinggi, bergerak gesit, dan selalu siap menangani kericuhan operasional lapangan harian.",
    kebiasaan: [
      "Langsung memperbaiki kerusakan perabot fisis sekitar sambil menguliahi cara pemeliharaan yang benar.",
      "Secara konstan menuntut laporan jadwal, draf progres tugas harian, dan ketetapan waktu.",
      "Menyiapkan seluruh logistik kebutuhan praktis harian jauh lebih awal sebelum perjalanan dimulai.",
      "Mengambil alih pekerjaan tim murni karena tidak tahan melihat prosesnya dikerjakan secara seroboh.",
      "Menunjukkan kasih sayang lewat sediaan pelayanan domestik konkret yang disampaikan mirip instruksi komandan."
    ],
    isiKepala: [
      "Jika aku tidak bersedia mengorbankan energi taktis menanganinya sendiri, draf tugas ini tidak akan pernah selesai dengan layak.",
      "Mereka melabeliku cerewet di belakang, padahal mereka kenyataannya menikmati seluruh kenyamanan hasil kerjaku.",
      "Skenario perbaikan fisis ini sama sekali tidak sulit. Hanya membutuhkan sedikit disiplin pengerjaan."
    ],
    bicara: "Praktis, sarat data kenyamanan fisis lapangan, tegas, lurus, dan berfokus penuh pada tindakan konkret secepatnya. Pujian terbaiknya berbunyi, 'Nah, kali ini kualitas kerjamu sudah memenuhi standar kualifikasiku'.",
    perhatian: "Melalui sediaan kenyamanan fisis harian yang berstandar tinggi, pembersihan ruangan, perbaikan gadget yang rusak, dan perlindungan dari kekacauan logistik luar.",
    bangga: "Keahlian kompetensi praktisnya yang teruji, ketahanan kerja fisisnya yang tegar, and standar kerapian birokrasi penatanya.",
    menyinggung: "Tersinggung berat ketika rancangan pelayanan taktisnya dianggap tidak dihargai, saran kenyamanan fisisnya diabaikan, atau dituduh dingin hanya karena bertindak praktis.",
    caraMarah: "Tanda awal: meluncurkan rangkaian koreksi operasional secara beruntun dengan nada suara menegang. Saat memuncak: kemarahan eksekutif berupa pemaparan daftar kegagalan praktis lawan disertai instruksi kerja paksa. Setelah konflik: menuntut perubahan perilaku nyata di lapangan lapangan.",
    menyukai: "Mengorganisasi seluruh jadwal hidup pasangannya agar terbebas dari stres praktis harian, menyediakan alat penunjang hobi premium, and menjaga sirkulasi kesehatan mereka.",
    berbohong: "Menyamarkan sediaan pelayanan kasih sayangnya demi keselamatan kelompok sebagai 'manuver efisiensi taktis murni'.",
    kontradiksi: [
      "Sangat merindukan apresiasi hangat atas seluruh pengorbanan praktisnya, tetapi bertindak kaku menolak bantuan fisis dari orang sekitar saat ditawarkan.",
      "Menuntut kemandirian penuh dari anggota tim di lapangan, tetapi langsung merebut kasar pekerjaan tersebut sebelum bawahannya sempat belajar dari kesalahan.",
      "Mengklaim dirinya murni mengejar kenyamanan dan relaksasi fisis kehidupan, tetapi secara konstan menyiksa fisiknya dengan draf kerja harian yang tiada akhir."
    ],
    sehat: "Tulang punggung organisasi yang luar biasa andal, peduli harian pada kesejahteraan fisik tim, pelaksana draf operasional yang presisi, dan toleran terhadap metode orang.",
    tidakSehat: "Mikromanager yang sangat mengontrol dan represif fisis. Menganggap dirinya satu-satunya entitas kognitif dewasa di tim, memperlakukan sekelilingnya seperti bocah.",
    redFlags: [
      "Meluncurkan bantuan domestik tanpa diminta murni demi mendapatkan hak verbal mengontrol perilaku penerimanya.",
      "Sengaja merombak total metode kerja orang lain di tengah-tengah proses pengerjaan tanpa diskusi.",
      "Menganggap tidur siang atau istirahat fisis santai sebagai bentuk kemunduran moralitas kognitif.",
      "Menumpuk rasa kelelahan fisik tubuhnya sendiri diam-diam demi mengumpulkannya sebagai bahan ceramah pengorbanan."
    ],
    greenFlags: [
      "Selalu menyelesaikan seluruh draf komitmen tertulis dan lisan secara tuntas tanpa menyisakan sengketa.",
      "Sangat andal menjaga sirkulasi kesehatan fisis dan kebersihan lingkungan kerja secara konsisten harian.",
      "Mampu merancang alur operasional kerja yang menjamin produktivitas dan kenyamanan fisis pekerja.",
      "Tetap setia hadir mendampingi di lapangan saat pekerjaan yang dinilai membosankan dan kasar dimulai."
    ],
    superior: "Membereskan kekacauan logistik yang gagal ditangani tim dalam waktu sepuluh menit, lalu menghela nafas panjang fisis seolah baru mencegah keruntuhan peradaban.",
    insecure: "Menjadi semakin sibuk bertindak di lapangan, merapikan letak barang fisis secara agresif, untuk membuktikan ke sekeliling bahwa dirinya sangat dibutuhkan.",
    penampilan: "Rapi, bersih, menggunakan pakaian berkualitas premium yang kokoh fungsional, bernuansa tangguh. Tasnya dipenuhi obat darurat dan peralatan praktis multifungsi.",
    kalimatKhas: [
      "Selesaikan draf tugas praktismu sekarang, jangan membiasakan diri menundanya sebentar pun.",
      "Sudah pernah kujelaskan draf tata cara pengoperasian alat fisis ini berulang kali dengan jernih.",
      "Mari kita segera beralih menggunakan draf prosedur kerja yang jauh lebih efektif ini."
    ],
    roastShort: "LSE: Malaikat penolong kiriman surga yang melampirkan berkas faktur sanksi emosional atas ketidakkompetenanmu.",
    kesimpulanBrutal: "LSE adalah tipe orang yang secara sukarela mengambil seluruh beban pekerjaan kelompok murni karena tidak percaya pada kemampuan orang lain, lalu marah besar karena harus mengerjakan semuanya sendirian."
  },
  {
    id: "EII",
    name: "EII (Ethical Intuitive Introtim)",
    quadra: "Delta",
    ego: "Fi-Ne",
    alias: "The Empath / Penyembuh Sunyi",
    stereotip: "EII menyaksikan seseorang bertindak sangat menyebalkan di depannya, lalu dalam kepalanya ia segera merumuskan analisis, 'Perilakunya kasar, namun pastilah ada luka batin masa lalu yang belum diproses secara tulus dalam jiwanya'.",
    aura: "Sangat lembut, penuh kedamaian batin, hati-hati bertindak, memancarkan atmosfer ketulusan suci yang tenang, and seolah sanggup membaca draf kepalsuan batinmu tanpa mempermalukanmu di publik.",
    kebiasaan: [
      "Selalu berupaya menyusun pemenaran moral positif demi membela niat buruk orang lain.",
      "Mengingat draf ucapan masa lalu orang sekitarnya tentang ketakutan batin terdalam mereka.",
      "Merancang visualisasi perkembangan karakter masa depan bagi teman dekatnya secara konsisten batin.",
      "Menunda konfrontasi interpersonal berhari-hari demi menyusun kalimat yang dijamin tidak melukai batin lawan.",
      "Menjaga privasi batas dirinya dengan sangat rapat dan mencabut perlahan akses pertemanan tanpa keributan."
    ],
    isiKepala: [
      "Aku memahami latar belakang trauma psikologis yang memicu tindakannya. Namun secara moral perilakunya tetap salah.",
      "Mungkin dengan memberikan satu draf kesempatan emas lagi, ia akan mulai bergerak bertransformasi positif.",
      "Aku ingin menyampaikan draf evaluasi perilaku ini secara jujur, tanpa memicu rasa tidak layak dalam jiwanya."
    ],
    bicara: "Lembut, lambat, bernada menenangkan, dipenuh kosa kata reflektif tentang keadilan emosi dan hak batin manusia. Sangat tegar memeluk prinsip moralitasnya tanpa perlu berteriak.",
    perhatian: "Melalui sediaan pendengar setia keluh kesah jiwa, pemberian penerimaan batin secara total tanpa syarat sosial, dan dukungan bimbingan mental.",
    bangga: "Keutuhan integritas prinsip setianya, kapasitas empati batinnya yang luas, and kemampuannya merajut harmoni batin kemanusiaan.",
    menyinggung: "Tersinggung berat ketika keikhlasan batinnya dituduh sebagai kepalsuan naif murni, atau ketika ia dipaksa mengkhianati draf prinsip integritasnya demi materi.",
    caraMarah: "Tanda awal: diam membisu secara sedih, menarik kontak mata fisis. Saat memuncak: menyampaikan kekecewaan moralitas secara tulus yang menusuk langsung ke pusat rasa bersalah kesadaran lawan. Setelah konflik: merenung sendirian di kamar menganalisis arah perkembangan hubungan.",
    menyukai: "Menjadi penyembuh batin pasangannya, mendengarkan draf rahasia jiwa mereka tanpa menghakimi, and memberikan surat batin pengakuan yang ditulis tangan fisis.",
    berbohong: "Menyensor total kebutuhan fisis aslinya dan mengeklaim dirinya baik-baik saja demi membebaskan pasangan dari beban rasa bersalah kognitif.",
    kontradiksi: [
      "Sangat menjunjung tinggi otonomi keaslian batin, tetapi secara konstan melakukan sensor kaku terhadap seluruh kebutuhan emosional aslinya demi harmoni teman.",
      "Sangat lihai memetakan potensi luhur masa depan seseorang, tetapi kerap buta mengabaikan fakta kebusukan perilaku riil orang tersebut saat ini.",
      "Menghormati kebebasan batin pasangannya, tetapi diam-diam merawat draf gambaran ideal tentang bagaimana pasangannya seharusnya berkembang moral."
    ],
    sehat: "Sangat tulus, berjiwa lapang, jembatan perdamaian interpersonal yang luar biasa hangat, teguh memegang draf nilai kemanusiaan tanpa berisiko terjebak manipulasi.",
    tidakSehat: "Terjebak dalam romantisasi peran martir penanggung dosa kelompok. Menggunakan rasa kecewa moralnya untuk memicu rasa bersalah konstan pada penerima kasihnya.",
    redFlags: [
      "Sengaja memberikan belas kasih tanpa batas fisis yang malah merusak proses pendewasaan mental pasangannya.",
      "Sengaja membiarkan dirinya dieksploitasi terus-menerus demi mempertahankan citra diri sebagai 'sosok penyabar suci'.",
      "Menyimpan seluruh draf kekecewaan interpersonalnya di dalam batin sekian lama hingga menjadi bara kebencian pasif.",
      "Menjadikan diam membisunya sebagai instrumen komunikasi hukuman yang menuntut orang membaca pikiran sucinya."
    ],
    greenFlags: [
      "Sanggup mendengarkan curahan draf luka batin manusia terbuang secara tulus tanpa meluncurkan penghakiman sosial.",
      "Sangat menghormati seluruh keunikan kepribadian manusia tanpa menuntut draf konformitas standar kelompok.",
      "Sanggup menyimpan rahasia batin rekan kerjanya dengan keandalan integritas setingkat brankas baja.",
      "Mendorong sesama rekan untuk berani beralih dari jurang keputusasaan menuju draf peradaban harapan."
    ],
    superior: "Melihat orang lain bertikai berebut materi fisis dengan senyuman kesabaran hampir suci, seolah melihat jiwa-jiwa malang yang 'belum mencapai tahap pencerahan moral'.",
    insecure: "Menjadi semakin baik hati secara ekstrem, mengorbankan seluruh energi fisiknya demi membantu domestik, agar kehadirannya tidak dicap merepotkan.",
    penampilan: "Bersih, minimalis, berpotongan sederhana, membumi, sering bernuansa alam atau vintage klasik. Kamarnya penuh buku catatan harian dan hadiah sentimental kecil.",
    kalimatKhas: [
      "Aku sepenuhnya memahami kesengsaraan batin yang memicumu berbuat demikian.",
      "Yang paling kita butuhkan dalam hidup harian ini adalah kejujuran batin murni.",
      "Ada cara penyelesaian masalah interpersonal yang jauh lebih manusiawi dan tulus."
    ],
    roastShort: "EII: Pusat rehabilitasi kejiwaan gratis bagi manusia toxic yang bahkan tidak pernah mendaftarkan diri.",
    kesimpulanBrutal: "EII adalah tipe orang yang secara konstan memberikan ratusan draf kesempatan emas kepada seseorang untuk bertransformasi luhur, hingga orang tersebut tumbuh sangat nyaman mengecewakannya kembali."
  },
  {
    id: "IEE",
    name: "IEE (Intuitive Ethical Extratim)",
    quadra: "Delta",
    ego: "Ne-Fi",
    alias: "The Envoy / Magnet Inspirasi",
    stereotip: "IEE bertemu dengan orang asing di kereta komuter selama dua puluh menit, lalu sesampainya di stasiun tujuan sudah memetakan lima skenario masa depan kehidupan orang tersebut, tiga draf luka masa kecil mereka, and satu draf nama bakat terpendam yang luput dari pengawasan orang tua mereka.",
    aura: "Sangat terbuka, hangat, ceria, bersahabat dekat seketika, agak sedikit berantakan secara fisik fungsional, and memancarkan angin segar inspirasi kemungkinan baru.",
    kebiasaan: [
      "Merajut hubungan pertemanan antar-rekan kerjanya yang dinilainya akan melahirkan draf kolaborasi hebat.",
      "Sangat cepat menangkap dan memicu percikan minat teoritis baru dalam diri orang sekitarnya.",
      "Meluncurkan pertanyaan interpersonal mendalam secara spontan di tengah obrolan santai biasa.",
      "Merumuskan draf rencana petualangan secara impulsif didasarkan atas letupan inspirasi sesaat.",
      "Menjanjikan draf pertemuan lanjutan dengan kejujuran tulus seketika, namun ingatan taktisnya melarut cepat berniat."
    ],
    isiKepala: [
      "Sosok manusia ini sangat unik dan menarik. Aku harus segera mengurai seluruh struktur cerita hidupnya.",
      "Hidupnya akan mengalami lompatan transformasi yang luar biasa jika ia berani mencoba opsi petualangan baru ini.",
      "Aku sungguh-sungguh menyayangi mereka secara tulus. Kebetulan hari ini aku sedang sibuk mengurusi tujuh urusan baru lainnya."
    ],
    bicara: "Amat hangat, melompat dinamis antar topik, bercabang, bernuansa antusias tinggi, and penuh muatan validasi personal. Membuat lawan bicaranya merasa menjadi sosok paling istimewa di bumi saat itu.",
    perhatian: "Melalui sediaan validasi keunikan psikologis orang sekitar, pembukaan akses jaringan pertemanan inspiratif baru, and penyalaan nyala harapan.",
    bangga: "Keterbukaan jiwanya yang luas tanpa batas kelas, ketajaman membidik potensi luhur manusia, and kelenturannya membangun relasi hangat.",
    menyinggung: "Tersinggung berat ketika draf ketulusan perhatiannya dilabeli sebagai kepalsuan genit manipulatif, dituduh bermulut manis saja, atau dikurasi kaku.",
    caraMarah: "Tanda awal: meluncurkan serangkaian penjelasan teoritis panjang lebar tentang dinamika relasi moralitas. Saat memuncak: konfrontasi tajam membongkar ketidakautentikan karakter lawan bicaranya secara blak-blakan. Setelah konflik: berpindah fokus mencari orang baru.",
    menyukai: "Menggali seluruh detail psikologis pasangannya, merancang skenario petualangan bersama, and membagikan cetak biru impian masa depan mereka.",
    berbohong: "Melontarkan janji-janji masa depan yang muluk didasarkan atas gejolak antusiasme emosionalnya saat itu, tanpa memiliki kapasitas fisis melaksanakannya.",
    kontradiksi: [
      "Sangat mendambakan hubungan interpersonal intim yang mendalam jangka panjang, tetapi sangat mudah terdistraksi dan jatuh cinta pada pesona orang baru.",
      "Sangat menjunjung tinggi keaslian batin (authenticity), tetapi sangat lihai memoles perilakunya agar selaras dengan atmosfer pergaulan kelompok mana pun.",
      "Membenci segala bentuk pembatasan komitmen dari luar, tetapi sangat kecewa ketika pasangannya tidak memberi kepastian arah hubungan."
    ],
    sehat: "Inspirator ulung yang sangat peka, kaya akan kemungkinan kreatif sosial, hangat, bertanggung jawab atas tindak lanjut janji verbalnya, and menjaga kedekatan.",
    tidakSehat: "Penumpuk draf janji palsu yang mengambang. Gemar melakukan lompatan relasi impulsif tanpa pernah menyelesaikan draf tanggung jawab interpersonal masa lalu.",
    redFlags: [
      "Sengaja memberikan keintiman emosional yang intens di awal relasi, lalu mendadak menarik total kehangatannya tanpa kejelasan.",
      "Sengaja merancang draf kolaborasi kerja besar saat sedang bersemangat, lalu kabur saat proses pengerjaan taktis membosankan dimulai.",
      "Sangat senang mendeteksi ribuan potensi luhur pada diri orang asing, tetapi mengabaikan cacat karakter moral nyata di depannya.",
      "Menjadikan bosan sebagai dalih absolut untuk melarikan diri dari komitmen pernikahan."
    ],
    greenFlags: [
      "Membuat setiap orang di dekatnya merasa bahwa seluruh potensi luhur dan kemungkinan impiannya dihargai penuh.",
      "Sanggup menerima keunikan dan keanehan aneh perilaku sesama tanpa menuntut syarat kualifikasi sosial.",
      "Sangat andal membangun jembatan pertemanan yang luas antarkelompok sosial yang berbeda.",
      "Menyajikan sediaan energi optimisme segar yang luar biasa menginspirasi di tengah situasi mandek terpuruk."
    ],
    superior: "Membicarakan seseorang yang dinilainya terlalu kaku dan sempit pikirannya, sambil mengklaim kemampuannya mengenal manusia sebagai pemahaman psikologis terdalam.",
    insecure: "Membuka sebanyak mungkin pintu pergaulan baru secara impulsif, meluncurkan ribuan rencana proyek acak harian harian demi menolak satu penolakan riil.",
    penampilan: "Eklektik, penuh warna yang berani, menarik, santai, terkadang sedikit tidak konsisten tata gayanya. Profil medsos dipenuhi draf perjalanan baru.",
    kalimatKhas: [
      "Aku menangkap sebuah percikan potensi keindahan yang sangat luar biasa di dalam dirimu.",
      "Kita tidak perlu membatasi pilihan arah hidup kita secara kaku sekaran juga.",
      "Selalu ada draf jalan keluar kreatif lain yang melampaui aturan kaku operasional ini."
    ],
    roastShort: "IEE: Pengumpul komitmen interpersonal jangka pendek yang memiliki draf waktu kedaluwarsa dua minggu.",
    kesimpulanBrutal: "IEE adalah tipe orang yang sanggup membuka lebar pintu hati kesadaran pasangannya, lalu lupa bahwa ia pernah berjanji datang fisis membantu merapikan letak furnitur."
  },
  {
    id: "SLI",
    name: "SLI (Sensory Logical Introtim)",
    quadra: "Delta",
    ego: "Si-Te",
    alias: "The Craftsman / Teknisi Sunyi",
    stereotip: "SLI terlihat sama sekali tidak memiliki draf ambisi menguasai panggung dunia fisis, murni karena setelah ia menganalisisnya secara mendalam, ia menilai dunia ini terlalu bising,Merepotkan, dan tidak sepadan dengan energi jasmatinya.",
    aura: "Sangat rileks, tenang, berjarak, nyaman secara fisis fungsional, sulit dibuat terkesan oleh kemewahan palsu, and memancarkan sinyal batin, 'Tolong jangan undang aku ke acara sosial bisingmu'.",
    kebiasaan: [
      "Memilih peralatan kerja murni berdasarkan draf kualitas material fisisnya, bukan tren pasar.",
      "Secara konsisten menjauhkan diri dari proses operasional yang dinilai terlalu bising tanpa nilai manfaat.",
      "Memilih diam mengamati fisis sampai situasi dinilai benar-benar membutuhkan intervensi energinya.",
      "Memperbaiki kerusakan mekanis perabot domestik secara diam-diam tanpa memerlukan pengakuan pidato.",
      "Melontarkan draf argumen praktis yang sangat ringkas namun terbukti jauh lebih akurat daripada rapat tim."
    ],
    isiKepala: [
      "Urusan tata perabot fisis ini sebenarnya bisa diselesaikan secara jauh lebih sederhana tanpa drama birokrasi bising.",
      "Aku tahu persis bagaimana draf metode eksekusi taktisnya. Aku hanya sedang mengevaluasi apakah proyek ini layak menggunakan energiku.",
      "Mereka gemar sekali menciptakan masalah logistik bodoh sendiri, lalu sibuk menyelenggarakan rapat nasional membahas solusi masalah ciptaannya."
    ],
    bicara: "Sangat ringkas, praktis, kering, didasarkan atas fakta fisis riil, sarat akan muatan humor datar yang sarkastis. Tidak tertarik memamerkan keluasan wawasan teoritis.",
    perhatian: "Melalui pemeliharaan kenyamanan fisis pasangannya, perbaikan mesin yang rusak, berbagi makanan lezat bertekstur premium, and penghargaan ruang privasi.",
    bangga: "Kemandirian fisisnya yang kokoh dari ketergantungan sosial, keahlian mekanis praktisnya, and cita rasa fisisnya.",
    menyinggung: "Tersinggung berat ketika keahlian praktisnya diragukan, batas wilayah privasi fisisnya dilanggar kasar, atau dipaksa mengekspresikan gembira secara teatrikal.",
    caraMarah: "Tanda awal: menarik total seluruh bantuan fisisnya dan membisu lebih kaku. Saat memuncak: melontarkan satu atau dua kalimat sarkasme yang sangat menusuk fisis operasional lawan. Setelah konflik: menjauh secara total demi memulihkan sirkulasi energi fisiknya.",
    menyukai: "Mengundang pasangannya masuk berkunjung ke dalam wilayah privasi fisisnya yang nyaman harian, berbagi selimut tebal harian, and menyajikan kopi premiun buatan sendiri.",
    berbohong: "Menyamarkan rasa ketersinggungan batinnya yang mendalam di balik dalih 'tubuhku sedang merasa sangat lelah harian'.",
    kontradiksi: [
      "Sangat menuntut dan menghargai kenyamanan fisis harian, tetapi sanggup membiarkan kerusakan perabot domestik menumpuk subur demi menghindari keharusan bergerak.",
      "Mengklaim dirinya sebagai sosok paling fleksibel di tim, tetapi mendadak menderita jika letak kemiringan bantal tidurnya bergeser satu centi pun.",
      "Menginginkan apresiasi atas sediaan bantuannya, tetapi menolak secara kaku memberikan penjelasan apa saja kontribusi yang telah ia siapkan."
    ],
    sehat: "Sangat tenang, kompeten, mandiri secara fisis kognitif, memiliki selera kualitas material yang sangat tinggi, and andal mengurai kekusutan praktis operasional.",
    tidakSehat: "Terperangkap dalam jurang apatisme kognitif jangka panjang. Menjadikan tameng 'menolak drama sosial' sebagai dalih mutlak untuk tidak pernah mau membicarakan masalah hubungan intim.",
    redFlags: [
      "Menarik total seluruh sediaan bantuan taktisnya secara sepihak tanpa pernah bersedia memberikan draf kejelasan alasan.",
      "Sengaja pasif menyaksikan orang sekitar melakukan kesalahan operasional murni demi membuktikan bahwa metodenya yang terbaik.",
      "Menganggap seluruh percakapan tentang resolusi konflik emosional sebagai ' drama kosong tak berguna'.",
      "Sengaja mereduksi interaksi sosialnya dengan pasangan sampai tingkat minimal."
    ],
    greenFlags: [
      "Tidak mudah panik atau goyah saat infrastruktur kerja tim dilanda kekacauan parah.",
      "Sangat menghormati batas wilayah privasi fisis dan otonomi kognitif rekan kerjanya harian.",
      "Menyajikan draf solusi praktis operasional yang sangat sederhana, minim biaya fisis, and efektif.",
      "Menilai cita rasa kualitas benda, bahan kain, and makanan secara akurat bersandarkan homeostasis."
    ],
    superior: "Menyaksikan tim sedang sibuk berdebat sengit membahas metode teoritis, sementara dirinya sudah merampungkan tugas fisik tersebut secara sunyi di pojokan.",
    insecure: "Menolak dihubungi secara fisis, mempertebal sikap dingin apatisnya, demi memastikan benteng otonomi energinya tidak dijajah oleh tuntutan sosial luar.",
    penampilan: "Nyaman, sederhana namun berkualitas tinggi material, fungsional, bernuansa santai. Unit tidurnya, kasur, kursi kerjanya dirancang menggunakan anggaran pertahanan.",
    kalimatKhas: [
      "Tidak perlu mempersulit urusan praktis dasar yang sebenarnya sangat sederhana ini.",
      "Aku sedang tidak berminat mengeluarkan energiku untuk skenario bising tersebut.",
      "Bisa kuselesaikan perombakannya, tapi nanti setelah sirkulasi energiku pulih."
    ],
    roastShort: "SLI: Sangat terampil, kompeten fisis, and sepenuhnya tidak tertarik memberikan penjelasan verbal kepadamu.",
    kesimpulanBrutal: "SLI adalah tipe orang yang sanggup merampungkan pemecahan kemacetan masalah mekanis harian apa pun, setelah lebih dulu menyelenggarakan sidang batin menilai apakah masalah itu pantas mengusik kenyamanannya."
  }
];
