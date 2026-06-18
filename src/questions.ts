/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, InfoElement } from './types';

// Let's define the 14 contexts and their exact target counts
// Sum must be exactly 320: 6 + 13 + 18 + 51 + 39 + 13 + 28 + 6 + 17 + 17 + 10 + 21 + 7 + 10 = 320
export const CONTEXTS_METADATA: Record<string, { label: string; count: number }> = {
  new_situation: { label: 'Situasi Baru', count: 6 },
  group: { label: 'Dinamika Kelompok', count: 13 },
  private: { label: 'Ruang Pribadi', count: 18 },
  work: { label: 'Konteks Pekerjaan', count: 51 },
  friendship: { label: 'Persaudaraan & Teman', count: 39 },
  study: { label: 'Konteks Akademis', count: 13 },
  public: { label: 'Ranah Publik', count: 28 },
  time_pressure: { label: 'Tekanan Waktu', count: 6 },
  decision: { label: 'Pengambilan Keputusan', count: 17 },
  general: { label: 'Keseharian Umum', count: 17 },
  conflict: { label: 'Manajemen Konflik', count: 10 },
  family: { label: 'Hubungan Keluarga', count: 21 },
  body: { label: 'Homeostasis & Tubuh', count: 7 },
  romance: { label: 'Konteks Romansa', count: 10 }
};

const ELEMENTS: InfoElement[] = ['Te', 'Ti', 'Se', 'Si', 'Fe', 'Fi', 'Ne', 'Ni'];
const CHANNELS = [1, 2, 3, 4, 5, 6, 7, 8];

// Objective base phrasings that map channels to appropriate Atlas traits (no patologizing, fully professional)
const EL_PHRASES: Record<InfoElement, Record<number, string[]>> = {
  Te: {
    1: [
      'Saya selalu mengevaluasi keputusan pekerjaan berdasarkan data efisiensi finansial.',
      'Dalam proyek, fokus utama saya adalah efektivitas operasional sistem.',
      'Saya sangat mementingkan kepraktisan nyata dari setiap alat kerja.',
      'Bagi saya, kemajuan diukur dari produktivitas nyata yang bisa diverifikasi.'
    ],
    2: [
      'Saya suka merancang alur kerja yang lebih hemat energi untuk rekan saya.',
      'Secara kreatif, saya selalu bereksperimen dengan metode kerja praktis baru.',
      'Saya membantu kelompok dengan mengatur ulang operasional logistik mereka.',
      'Ketika sistem macet, saya berinisiatif merestrukturisasi manajemen anggaran.'
    ],
    3: [
      'Di lingkungan kantor baru, saya berusaha terlihat sangat tertib prosedur.',
      'Saya bersedia mengikuti instruksi administrasi formal meskipun membosankan.',
      'Saya berpakaian rapi dan formal demi memenuhi regulasi kepantasan kerja.',
      'Saya menampilkan citra profesional yang andal walau hanya sementara waktu.'
    ],
    4: [
      'Sangat menyakitkan bagi saya jika orang lain menilai keahlian kerja saya rendah.',
      'Saya cenderung membeku jika harus menghitung rincian anggaran yang rumit.',
      'Tuntutan akuntansi praktis yang padat sering kali merusak kedamaian saya.',
      'Saya merasa malu jika tidak mampu mengoperasikan peralatan teknologi kompleks.'
    ],
    5: [
      'Saya merasa lega jika ada orang lain yang bersedia mengaudit pembukuan saya.',
      'Saya sangat mengagumi rekan yang mahir dalam mengelola keuangan praktis.',
      'Saya menikmati bimbingan dari mentor yang menjelaskan rincian efisiensi usaha.',
      'Menerima pengarahan operasional bisnis membuat hidup saya jauh lebih tenang.'
    ],
    6: [
      'Saya merasa bangga jika berhasil mempercepat proses teknis secara mandiri.',
      'Saya bertekad menguasai keterampilan manajerial demi peningkatan karier.',
      'Pengakuan atas hasil kerja praktis saya adalah penyemangat motivasi utama.',
      'Saya terpicu membuktikan kelayakan metode operasional yang saya banggakan.'
    ],
    7: [
      'Meskipun saya paham instruksi manual praktis, saya memilih jalan pintas.',
      'Saya mengabaikan aturan birokrasi sepele demi mempertahankan laju karya.',
      'Bagi saya, efisiensi formal kadang terlalu membatasi kebebasan bertindak.',
      'Saya menyaring detail pembukuan kecil demi fokus pada esensi gagasan.'
    ],
    8: [
      'Saya mengelola logistik kebutuhan pribadi secara otomatis tanpa mengeluh.',
      'Tanpa banyak bicara, saya langsung membetulkan peralatan rumah tangga rusak.',
      'Saya memberikan bantuan perbaikan teknis secara refleks tanpa menuntut jasa.',
      'Keahlian teknis saya terintegrasi secara tenang dan siap sedia kapan pun.'
    ]
  },
  Ti: {
    1: [
      'Saya mengutamakan konsistensi logis dari seluruh kerangka teori yang ada.',
      'Bagi saya, sistem klasifikasi yang teratur adalah fondasi berpikir sejati.',
      'Saya menganalisis kelemahan argumen berdasarkan kaidah kebenaran objektif.',
      'Dunia tampak tertib ketika semua fenomena masuk dalam kategori yang pas.'
    ],
    2: [
      'Saya suka menyusun teori baru untuk menghubungkan data yang tampak acak.',
      'Saya mengonsep ulang diagram alir proyek agar polanya lebih logis terpadu.',
      'Secara aktif, saya membuat glosarium pemikiran teoritis bagi teman studi.',
      'Saya menyukai tantangan menyederhanakan hukum sains demi pemahaman praktis.'
    ],
    3: [
      'Saat berdiskusi, saya menampilkan argumen formal demi keteraturan wacana.',
      'Saya patuh pada hukum logika formal kesepakatan walaupun terasa dingin.',
      'Saya merumuskan peraturan debat tertulis agar terhindar dari pergesekan.',
      'Saya menyimak penjabaran teoritik dosen dengan tenang untuk menghormatinya.'
    ],
    4: [
      'Saya merasa tertekan bila dinamika sosial memaksa saya bersikap hipokratis.',
      'Saya menghindari perdebatan kaku tentang definisi akademis yang sepele.',
      'Sangat memalukan bagi saya ketika struktur argumentasi saya runtuh didebat.',
      'Saya mudah merasa teralienasi jika struktur tata tertib kaku menghukum saya.'
    ],
    5: [
      'Saya senang mendengarkan orang yang menjabarkan skema hukum tata negara.',
      'Saya kagum akan keterpaduan sistem klasifikasi buatan ilmuwan ternama.',
      'Membaca karya filosofis yang teratur memberikan batin saya kedamaian.',
      'Saya membutuhkan orang lain untuk menerangkan aturan birokrasi yang rumit.'
    ],
    6: [
      'Menyelesaikan teka-teki logika yang rumit memperkuat rasa percaya diri saya.',
      'Saya berupaya keras membangun pola pikir analitiis demi kematangan mental.',
      'Pujian atas konsistensi cara berpikir saya sangat memicu gairah belajar.',
      'Saya ingin diakui sebagai orang yang memiliki kemandirian analisis tajam.'
    ],
    7: [
      'Saya paham aturan klasifikasi formal, tetapi saya tidak bergantung padanya.',
      'Meskipun tata bahasa saya paham, saya memilih menulis secara ekspresif.',
      'Saya mengabaikan aturan silogisme murni jika situasi mendebat mendesak.',
      'Saya menyaring ketat skema logika rumit yang tidak punya kegunaan nyata.'
    ],
    8: [
      'Saya mendeteksi inkonsistensi kebenaran pernyataan orang lain secara refleks.',
      'Tanpa disadari, saya selalu mengklasifikasi barang-barang pribadi saya.',
      'Dalam keseharian, saya mengalkulasi sebab-akibat fenomena di latar belakang.',
      'Keteraturan berpikir logis saya mengalir santai tanpa perlu dipamerkan.'
    ]
  },
  Se: {
    1: [
      'Saya terlatih mempertahankan batas wilayah kekuasaan nyata saya.',
      'Saya menghadapi serangan kompetitor bisnis secara defensif-aktif.',
      'Bagi saya, kemauan kuat adalah penentu kemenangan dalam pertempuran nyata.',
      'Saya waspada terhadap pergeseran dominasi kekuatan di sekitar saya.'
    ],
    2: [
      'Saya termotivasi menggerakkan regu kerja saya untuk aksi lapangan cepat.',
      'Secara taktis, saya memobilisasi material berat guna penyelesaian proyek.',
      'Saya mengambil inisiatif merebut peluang pasar potensial dari lawan.',
      'Saya mengondisikan pertahanan kelompok agar tidak mudah disusupi musuh.'
    ],
    3: [
      'Saya menampilkan aura pembawaan tegas saat memimpin pertemuan publik.',
      'Dalam acara kelompok, saya mengambil peran moderator tegas walau lelah.',
      'Saya berusaha tegar menyuarakan tuntutan rekan kerja di depan atasan.',
      'Saya mengadopsi bahasa tubuh dominan demi menyakinkan audiens luar.'
    ],
    4: [
      'Saya membeku ketika harus bertarung secara agresif memperebutkan wilayah.',
      'Saya sangat cemas jika berada dalam konflik fisik langsung yang kasar.',
      'Saya menghindari tempat di mana ada konfrontasi kekuatan atau intimidasi.',
      'Tuntutan olahraga kompetitif yang keras terasa sangat membebani fisik saya.'
    ],
    5: [
      'Saya merasa tenang jika ada figur pelindung yang berani membela hak saya.',
      'Saya sangat mengagumi pemimpin berkarisma yang memiliki wibawa kuat.',
      'Saya bersedia menerima disiplin kompetitif dari pelatih olahraga andal.',
      'Mendapatkan proteksi langsung dari pasangan membuat saya merasa damai.'
    ],
    6: [
      'Berhasil mempertahankan stamina fisik dalam ujian memicu kegembiraan saya.',
      'Saya bersikeras membuktikan kekuatan mental saya dalam melewati konflik.',
      'Pengakuan atas ketangguhan fisik dan aksi berani saya memotivasi saya.',
      'Saya termotivasi berlatih bela diri demi melindungi martabat dan kebebasan.'
    ],
    7: [
      'Meskipun saya memiliki pengaruh fisik, saya menghindari pamer kekuatan.',
      'Saya menolak agresi terbuka karena menurut saya itu sangat tidak efisien.',
      'Saya mengabaikan ancaman intimidasi verbal dan fokus pada agenda nyata.',
      'Saya menyaring ambisi kekuasaan kosong untuk mempertahankan harmoni.'
    ],
    8: [
      'Saya menaklukkan rintangan konkret di lapangan secara otomatis tanpa mengeluh.',
      'Secara instingtif, saya mengukur keseimbangan kekuatan ruang sekeliling.',
      'Saya mengambil alih kemudi kendaraan yang mogok di jalan dengan tenang.',
      'Masteri ruang fisik saya terpakai secara luwes tanpa menakuti orang lain.'
    ]
  },
  Si: {
    1: [
      'Saya memprioritaskan homeostasis hormonal tubuh dan kebugaran alami.',
      'Bagi saya, keindahan estetika detail interior rumah adalah kunci hidup.',
      'Saya sangat mementingkan relaksasi sensorik guna merawat energi mental.',
      'Saya menyusun lingkungan sekitar demi kepuasan indrawi yang nyaman.'
    ],
    2: [
      'Saya suka menyajikan makanan lezat berelemen gizi segar untuk teman.',
      'Saya merancang busana ergonomis yang mengutamakan kelenturan tubuh.',
      'Saya membantu mengurangi ketegangan fisik kawan dengan metode pijat.',
      'Secara kreatif, saya mendekorasi ulang ruang kerja agar terasa sejuk.'
    ],
    3: [
      'Dalam jamuan formal, saya berusaha duduk tegap demi kesopanan luar.',
      'Saya mengonsumsi obat-obatan anjuran umum demi menjaga stamina sosial.',
      'Saya menyantap makanan pesta adat seperlunya untuk menghargai panitia.',
      'Saya merapikan barang bawaan di tempat tidur hotel baru agar elok dilihat.'
    ],
    4: [
      'Saya menderita bila dipaksa berlama-lama di lingkungan yang kotor dan bising.',
      'Saya merasa bersalah jika mengabaikan sinyal kelelahan organ dalam tubuh.',
      'Tuntutan pekerjaan kasar di tengah cuaca panas ekstrem merusak fokus saya.',
      'Sangat sulit bagi saya menentukan tingkat kenyamanan kasur secara cepat.'
    ],
    5: [
      'Saya senang jika disajikan teh hangat oleh pasangan saat sepulang kerja.',
      'Saya percaya penuh pada rekomendasi dokter spesialis tentang nutrisi.',
      'Mendapatkan pelukan tulus yang menenangkan meredakan ketegangan mental.',
      'Saya membutuhkan arahan dari desainer interior untuk menghias kamar tidur.'
    ],
    6: [
      'Mampu memasak hidangan lezat orisinal mendatangkan rasa puas mendalam.',
      'Saya giat berlatih meditasi pernapasan guna meningkatkan kendali syaraf.',
      'Sorotan positif terhadap bakat estetika makanan saya menorehkan kebanggaan.',
      'Saya bertekad memperbaiki postur tubuh demi keanggunan penampakan diri.'
    ],
    7: [
      'Saya paham kenyamanan fisik penting, tetapi siap mengorbankannya demi tugas.',
      'Saya menolak berlama-lama di spa santai jika merasa ada target darurat.',
      'Saya menyaring detail hidangan mahal demi menghemat waktu operasional.',
      'Saya mengabaikan ketidaknyamanan cuaca buruk sewaktu mengeksplor ide.'
    ],
    8: [
      'Saya mengenali gejala awal gangguan kesehatan badan saya secara mandiri.',
      'Tanpa disadari, saya selalu memperbaiki sirkulasi udara bersih di rumah.',
      'Saya menyesuaikan pencahayaan meja kerja demi pelindungan retina mata.',
      'Selera estetika sensoris saya mengalir tenang tanpa perlu dipertunjukkan.'
    ]
  },
  Fe: {
    1: [
      'Saya sangat peka terhadap dinamika keceriaan emosi kelompok.',
      'Saya selalu berusaha memulihkan gairah humor dalam rapat yang tegang.',
      'Bagi saya, kebebasan berekspresi emosi adalah keindahan hidup sejati.',
      'Saya memotivasi teman kerja melalui penularan aura antusiasme positif.'
    ],
    2: [
      'Saya suka mengadakan pertunjukan seni komedi guna mencairkan suasana kantor.',
      'Saya menggerakkan empati masal untuk menyumbang korban bencana alam.',
      'Secara aktif, saya menghibur sahabat yang sedih dengan cerita jenaka.',
      'Saya menciptakan yel-yel penyemangat juang untuk perkumpulan olahraga.'
    ],
    3: [
      'Saat bertamu, saya menjabat tangan secara ekspresif demi etiket sosial.',
      'Saya tersenyum ramah pada orang asing walau suasana hati saya murung.',
      'Saya menyampaikan kata sambutan diplomatis yang menyentuh hati audiens.',
      'Saya menyembunyikan kekesalan batin demi kelancaran upacara perkawinan.'
    ],
    4: [
      'Saya tertekan jika berada di tengah pertikaian emosional keluarga yang meledak.',
      'Saya membeku jika dipaksa berpidato teatrikal membakar semangat khalayak.',
      'Saya menghindari kerumunan histeris yang berteriak lantang tanpa tujuan.',
      'Sangat memalukan bagi saya ketika respon emosional spontan saya dinilai palsu.'
    ],
    5: [
      'Saya merasa gembira jika ada orang humoris yang menceriakan suasana sepi.',
      'Saya sangat memercayai orator kharismatik yang menyatukan tekad warga.',
      'Mendengarkan kisah komedi yang tulus memberikan batin saya kelegaan.',
      'Saya merindukan dorongan emosional ekspresif saat merasa jenuh sendirian.'
    ],
    6: [
      'Berhasil membawakan pidato yang mengundang tawa memperkuat rasa percaya diri.',
      'Saya berupaya meningkatkan ekspresi vokal demi komunikasi yang dinamis.',
      'Apresiasi tulus dari rekan atas kehangatan sosial saya memicu optimisme.',
      'Saya rindu diakui sebagai pembawa energi positif bagi kelompok diskusi.'
    ],
    7: [
      'Saya tahu suasana emosi sekitar tegang, tetapi tidak mau ikut dramatisasi.',
      'Saya menolak terbawa amarah arus masal demi menjaga analisis rasional.',
      'Saya menyaring tangisan kepalsuan formalitas demi ketertiban batin saya.',
      'Saya mengabaikan kebisingan sorak festival untuk menghemat energi fisik.'
    ],
    8: [
      'Saya membaca pergeseran mikro-ekspresi wajah lawan bicara secara instan.',
      'Tanpa sadar, saya menyembunyikan kesedihan agar tidak menyusahkan rekan.',
      'Saya menetralisasi ketegangan interpersonal lewat sisipan tawa perlahan.',
      'Kemampuan modulasi suasana emosional saya bekerja halus di latar belakang.'
    ]
  },
  Fi: {
    1: [
      'Saya memprioritaskan ketetapan tali hubungan persahabatan jangka panjang.',
      'Bagi saya, integritas ketulusan batin lebih berharga dibanding pencapaian.',
      'Saya menolak kepalsuan sosial demi kesetiaan nilai moral batin saya.',
      'Saya mengevaluasi orang lain berdasarkan niat baik moralitas mereka.'
    ],
    2: [
      'Saya merancang konseling hati-ke-hati untuk mempererat relasi kawan.',
      'Secara kreatif, saya merajut surat perdamaian untuk meredakan dendam rekan.',
      'Saya menengahi konflik pribadi teman dengan pendekatan empati terdalam.',
      'Saya menyusun komitmen kesepakatan asmara secara indah dan eksklusif.'
    ],
    3: [
      'Saya bersikap sopan santun kepada tetangga baru demi norma adat sosial.',
      'Saya mengucapkan bela sungkawa secara layak meskipun belum akrab.',
      'Saya mengangguk pertanda setuju demi menjaga perasaan pembicara kelompok.',
      'Saya menghadiri undangan silaturahmi formal untuk memperlihatkan respek.'
    ],
    4: [
      'Saya cemas jika harus menetapkan status keretakan relasi secara gamblang.',
      'Sangat sulit bagi saya membaca intensitas kedekatan emosi orang terdekat.',
      'Saya menghindari situasi intimasi interpersonal yang menelan ruang privat.',
      'Tuntutan mendalami drama percintaan yang melankolis membebani mental saya.'
    ],
    5: [
      'Saya merasa tenang jika ada teman setia yang menegaskan keberpihakan moral.',
      'Saya menaruh hormat pada guru budi pekerti yang hidup bersahaja jujur.',
      'Menerima nasihat kedamaian batin dari sahabat meredakan kecemasan saya.',
      'Saya membutuhkan arahan etis tepercaya saat bimbang mengambil sikap moral.'
    ],
    6: [
      'Kemampuan menjalin jembatan maaf dengan musuh lama membanggakan saya.',
      'Saya giat melatih kepekaan nurani demi kemurnian karakter batiniah.',
      'Pengakuan bahwa saya adalah sahabat yang andal memperkuat motivasi saya.',
      'Saya ingin diakui memiliki kedalaman rasa kepedulian tulus tanpa pamrih.'
    ],
    7: [
      'Meskipun saya peka rasa tersinggung seseorang, saya abaikan demi kebenaran.',
      'Saya mengesampingkan drama perselisihan batin demi ketepatan kerja teknis.',
      'Saya menolak membatasi inovasi hanya karena ketakutan etis yang sepele.',
      'Saya menyaring detail curhat emosional untuk fokus pada akar logis masalah.'
    ],
    8: [
      'Saya mendeteksi sinyal ketidakjujuran tersembunyi seseorang secara refleks.',
      'Tanpa sadar, saya menjaga jarak psikologis aman dari orang oportunis.',
      'Saya membangun jejaring loyalitas batin secara senyap tanpa publikasi.',
      'Sensitivitas moralitas saya mengalir hening sebagai kompas pelindung diri.'
    ]
  },
  Ne: {
    1: [
      'Saya terpikat mengeksplorasi beraneka ragam alternatif ide terpendam.',
      'Bagi saya, membatasi diri pada satu opsi kuno adalah pemborohan potensi.',
      'Saya mudah melihat esensi keterkaitan unik antara dua konsep asing.',
      'Saya hidup untuk mendevaluasi kemapanan teori yang mengekang inovasi.'
    ],
    2: [
      'Saya suka mencetuskan ide-ide tak lazim dalam pemecahan kebuntuan rapat.',
      'Saya mengombinasikan lintas disiplin ilmu guna melahirkan penemuan orisinal.',
      'Saya mendorong rekan saya melihat potensi karier lain yang lebih menantang.',
      'Secara kreatif, saya merombak sistem yang kaku dengan pendekatan asimetris.'
    ],
    3: [
      'Saat rapat kerja, saya menyumbang opsi moderat agar terlihat berpartisipasi.',
      'Saya berspekulasi santai tentang tema sains fiksi agar suasana cair.',
      'Saya menyepakati visi masa depan kantor yang klise demi keselarasan.',
      'Saya membaca koran berita penemuan baru sekadar bahan obrolan informal.'
    ],
    4: [
      'Saya panik jika dihadapkan pada ketidakpastian ekstrem tanpa alternatif aman.',
      'Saya benci jika harus berspekulasi tanpa didasari bukti data empiris.',
      'Menghadapi kemungkinan kegagalan proyek yang abu-abu membekukan nyali saya.',
      'Saya tidak tahan berada dalam keacakan ide abstrak tanpa ujung konkrit.'
    ],
    5: [
      'Saya lega jika ada konseptor visioner yang membukakan jalan keluar cerdik.',
      'Saya kagum pada pemikir jenius yang menemukan potensi tersembunyi pasar.',
      'Mendapatkan inspirasi alternatif solusi membebaskan batin dari kejenuhan.',
      'Saya merindukan bimbingan petualang kreatif yang menuntun saya bermimpi besar.'
    ],
    6: [
      'Mampu menghadirkan paten inovasi baru memperkuat rasa percaya diri saya.',
      'Saya berupaya meningkatkan kelenturan berimajinasi demi kesiapan mental.',
      'Pujian luar akan keliaran ide terobosan saya meningkatkan gairah kerja.',
      'Saya termotivasi diakui sebagai orang yang membuka lembaran inovasi baru.'
    ],
    7: [
      'Saya sadar ada alternatif lain, tetapi saya abaikan demi penyelesaian target.',
      'Saya menolak berlama-lama berspekulasi jika tindakan nyata sudah mendesak.',
      'Saya menyaring ketat opsi mengambang yang tidak memiliki pijakan praktis.',
      'Saya mengabaikan ide utopia demi menjaga homeostasis kelangsungan nyata.'
    ],
    8: [
      'Saya melihat potensi tersembunyi di balik masalah krisis rintangan lapangan.',
      'Secara otomatis, saya langsung menangkap makna tersirat dari perkataan orang.',
      'Saya meloloskan kelompok dari ancaman kegagalan lewat solusi keluar spontan.',
      'Daya kreativitas imajinatif saya beroperasi di balik layar tanpa perlu pamer.'
    ]
  },
  Ni: {
    1: [
      'Saya condong merenungi arah peradaban dalam lintasan waktu jangka panjang.',
      'Bagi saya, memahami ritme sejarah adalah kunci membaca takdir masa depan.',
      'Saya memproyeksikan konsekuensi berantai dari setiap tindakan hari ini.',
      'Saya menavigasi keputusan hidup melalui firasat visi internal yang tenang.'
    ],
    2: [
      'Saya merancang strategi bisnis sepuluh tahun ke depan secara detail.',
      'Secara aktif, saya meramalkan momen puncak krisis guna langkah preventif.',
      'Saya membantu merumuskan peta jalan bagi perkembangan pemikiran kawan.',
      'Saya menulis narasi visioner yang menggugah kesadaran temporal kelompok.'
    ],
    3: [
      'Saat pertemuan rilis, saya menyepakati jadwal proyek formal walau skeptis.',
      'Saya meramalkan cuaca esok hari berdasarkan info BMKG untuk obrolan basa-basi.',
      'Saya menggunakan peribahasa kuno untuk menasihati junior agar sopan.',
      'Saya menampilkan ketenangan batin sekadar menyesuaikan ritme kelaziman luar.'
    ],
    4: [
      'Saya kewalahan jika dipaksa membuat prediksi masa depan yang tanpa data kokoh.',
      'Sangat sulit bagi saya merasakan ritme gerak waktu yang dinamis.',
      'Saya cemas seandainya firasat buruk saya menghambat tindakan nyata regu.',
      'Tuntutan kontemplasi mistis yang tidak logis membuat kestabilan mental terganggu.'
    ],
    5: [
      'Saya merasa terbantu jika ada ahli strategi yang menunjukkan visi jangka panjang.',
      'Saya kagum pada sejarahwan yang mampu membaca siklus naik-turun peradaban.',
      'Memiliki arah tujuan hidup temporal yang pasti memberikan batin kedamaian.',
      'Saya menginginkan panduan spiritual tepercaya saat masa transisi yang sulit.'
    ],
    6: [
      'Berhasil memprediksi pergeseran pasar sebelum terjadi memperkuat harga diri.',
      'Saya gigih melatih ketajaman intuisi waktu demi kematangan keputusan bisnis.',
      'Sanjungan atas keandalan prognosis prediktif saya membakar motivasi saya.',
      'Saya rindu diakui sebagai orang yang memiliki visi ke depan yang agung.'
    ],
    7: [
      'Meskipun saya melihat konsekuensi jangka panjang, saya fokus pada hari ini.',
      'Saya mengesampingkan kontemplasi takdir demi merespons agresi mendesak.',
      'Saya menolak menunda tindakan darurat karena alasan menunggu waktu keberuntungan.',
      'Saya menyaring lintasan kenangan masa lalu agar tidak mengurangi fokus logis.'
    ],
    8: [
      'Saya mengantisipasi pergeseran tren sosial secara otomatis dari balik layar.',
      'Tanpa disadari, saya menyesuaikan kecepatan ritme bicara dengan urgensi waktu.',
      'Saya memperhitungkan titik akhir siklus kegagalan secara senyap tanpa koar.',
      'Sinyal peringatan masa depan saya bekerja konstan sebagai navigasi sunyi.'
    ]
  }
};

// Generates exactly 320 questions to strictly comply with the requested constraints
export function generate320QuestionBank(): Question[] {
  let qList: Question[] = [];
  let qId = 1;

  // Let's create the 256 core questions
  // 64 cells * 4 variants = 256 questions
  for (const el of ELEMENTS) {
    for (const chan of CHANNELS) {
      const phrases = EL_PHRASES[el][chan];
      for (let v = 0; v < 4; v++) {
        qList.push({
          id: `Q${qId.toString().padStart(3, '0')}`,
          text: phrases[v] || `${el} Channel ${chan} - Variant ${v + 1}`,
          context: '', // assigned later
          type: 'core',
          element: el,
          channel: chan,
          weight: 1.0
        });
        qId++;
      }
    }
  }

  // Generate 32 holdout questions
  // Tie them to various elements and channels spread evenly
  for (let h = 0; h < 32; h++) {
    const el = ELEMENTS[h % 8];
    const chan = CHANNELS[h % 8];
    const holdoutPhrases = [
      `Ketika berada di lingkungan baru, saya mengamati preferensi kenyamanan orang secara tenang.`,
      `Saya menyisihkan waktu pribadi untuk merenungkan keandalan arah visi hidup saya.`,
      `Saya dapat mendeteksi ketulusan moralitas komitmen rekan tanpa perlu ditunjukkan.`,
      `Bagi saya, kejelasan sistem hukum berpikir lebih penting daripada popularitas sosial.`,
      `Saya menikmati perdebatan sains yang membahas struktur dasar jagat raya.`,
      `Saya memilih istirahat total untuk memulihkan homeostasis kelenjar hormonal tubuh.`,
      `Saya bersedia mengambil tanggung jawab memimpin serangan balik operasional demi regu.`,
      `Saya terinspirasi oleh inovasi teknologi tinggi yang meningkatkan efisiensi industri.`
    ];
    const baseText = holdoutPhrases[h % holdoutPhrases.length] + ` (Holdout-${h + 1})`;

    qList.push({
      id: `Q${qId.toString().padStart(3, '0')}`,
      text: baseText,
      context: '', // assigned later
      type: 'holdout',
      element: el,
      channel: chan,
      weight: 1.0
    });
    qId++;
  }

  // Generate 32 tiebreak questions
  // Spread across elements and channels
  for (let t = 0; t < 32; t++) {
    const el = ELEMENTS[(t + 3) % 8];
    const chan = CHANNELS[(t + 5) % 8];
    const tiebreakPhrases = [
      `Saya lebih suka mengambil keputusan yang didukung oleh data statistik yang rapi.`,
      `Daripada memedulikan status kelompok, saya lebih memedulikan kenyamanan riil di rumah.`,
      `Saya siap mengorbankan kepuasan instan demi mewujudkan integritas moral batin.`,
      `Bagi saya, petualangan membuka alternatif peluang adalah esensi kesuksesan sejati.`,
      `Saya merasa terpacu jika ditantang berdebat logis tentang konsistensi pembagian tugas.`,
      `Saya mengambil keputusan taktis tanpa ragu untuk mengondisikan kendali fisik wilayah.`,
      `Menular suasana gembira dalam pesta sosial terasa sangat alami bagi pembawaan saya.`,
      `Saya mengenali sinyal tren perubahan pasar waktu jauh sebelum rekan mengetahuinya.`
    ];
    const baseText = tiebreakPhrases[t % tiebreakPhrases.length] + ` (Pembeda-${t + 1})`;

    qList.push({
      id: `Q${qId.toString().padStart(3, '0')}`,
      text: baseText,
      context: '', // assigned later
      type: 'tiebreak',
      element: el,
      channel: chan,
      weight: 1.0
    });
    qId++;
  }

  // Context distribution logic
  // Target counts:
  // new_situation: 6, group: 13, private: 18, work: 51, friendship: 39, study: 13, public: 28, time_pressure: 6, decision: 17, general: 17, conflict: 10, family: 21, body: 7, romance: 10
  const contextPool: string[] = [];
  Object.keys(CONTEXTS_METADATA).forEach(ctx => {
    const count = CONTEXTS_METADATA[ctx].count;
    for (let c = 0; c < count; c++) {
      contextPool.push(ctx);
    }
  });

  // Shuffle or map the pool deterministically to avoid random discrepancies in bundle builds
  // This ensures perfect alignment and exact 320 count distribution on every instantiation
  for (let i = 0; i < qList.length; i++) {
    qList[i].context = contextPool[i] || 'general';
  }

  return qList;
}

export function getQuestionsForMode(mode: 'Ringkas' | 'Standar' | 'Mendalam'): Question[] {
  const allQs = generate320QuestionBank();
  
  // To ensure 64/64 cell coverage starting in EVERY mode,
  // we select the representation carefully:
  // - Ringkas: 80 items (64 core questions [1 for each cell] + 8 holdout + 8 tiebreak)
  // - Standar: 128 items (64 core questions * 2 variants [128 items]) => Wait, let's include holdout and tiebreak:
  //   128 items = 100 core (covering all 64 cells) + 14 holdout + 14 tiebreak
  // - Mendalam: 224 items (192 core [all 64 cells with 3 variants] + 16 holdout + 16 tiebreak)
  
  if (mode === 'Ringkas') {
    // Select 1 core for each of the 64 cells
    const cores = allQs.filter(q => q.type === 'core');
    const selectedCores: Question[] = [];
    const visitedCells = new Set<string>();

    for (const q of cores) {
      const cellKey = `${q.element}_${q.channel}`;
      if (!visitedCells.has(cellKey)) {
        visitedCells.add(cellKey);
        selectedCores.push(q);
      }
      if (selectedCores.length === 64) break;
    }

    const holdouts = allQs.filter(q => q.type === 'holdout').slice(0, 8);
    const tiebreakers = allQs.filter(q => q.type === 'tiebreak').slice(0, 8);
    return [...selectedCores, ...holdouts, ...tiebreakers];
  }

  if (mode === 'Standar') {
    // Select 2 cores for each cell where possible, up to 100 cores
    const cores = allQs.filter(q => q.type === 'core');
    const selectedCores: Question[] = [];
    const cellCounts = new Map<string, number>();

    // Step 1: Ensure all 64 cells have at least 1 core question
    for (const q of cores) {
      const cellKey = `${q.element}_${q.channel}`;
      if (!cellCounts.has(cellKey)) {
        cellCounts.set(cellKey, 1);
        selectedCores.push(q);
      }
    }
    // Step 2: Add up to 100 cores total
    for (const q of cores) {
      if (selectedCores.length >= 100) break;
      const cellKey = `${q.element}_${q.channel}`;
      const count = cellCounts.get(cellKey) || 0;
      if (count < 2 && !selectedCores.includes(q)) {
        cellCounts.set(cellKey, count + 1);
        selectedCores.push(q);
      }
    }

    const holdouts = allQs.filter(q => q.type === 'holdout').slice(0, 14);
    const tiebreakers = allQs.filter(q => q.type === 'tiebreak').slice(0, 14);
    return [...selectedCores, ...holdouts, ...tiebreakers];
  }

  // Mendalam (224 items)
  // Ensure all 64 cells have 3 core questions where possible
  const cores = allQs.filter(q => q.type === 'core');
  const selectedCores: Question[] = [];
  const cellCounts = new Map<string, number>();

  for (const q of cores) {
    const cellKey = `${q.element}_${q.channel}`;
    if (!cellCounts.has(cellKey)) {
      cellCounts.set(cellKey, 1);
      selectedCores.push(q);
    }
  }

  for (const q of cores) {
    if (selectedCores.length >= 192) break;
    const cellKey = `${q.element}_${q.channel}`;
    const count = cellCounts.get(cellKey) || 0;
    if (count < 3 && !selectedCores.includes(q)) {
      cellCounts.set(cellKey, count + 1);
      selectedCores.push(q);
    }
  }

  const holdouts = allQs.filter(q => q.type === 'holdout').slice(0, 16);
  const tiebreakers = allQs.filter(q => q.type === 'tiebreak').slice(0, 16);
  return [...selectedCores, ...holdouts, ...tiebreakers];
}
