import type { ScaleType, SocionicsQuestion } from "../types/socionics";

export interface OptionDetail {
  artinya: string;
  reaksi: string;
}

const lowerFirst = (value: string): string => value.length > 0
  ? value.charAt(0).toLocaleLowerCase("id-ID") + value.slice(1)
  : value;

const atScenario = (question: SocionicsQuestion): string => `Saat ${lowerFirst(question.scenario)}`;
const focus = (question: SocionicsQuestion): string => question.responseFocus.replace(/[.]$/, "");

const details: Record<ScaleType, (question: SocionicsQuestion, value: number) => OptionDetail> = {
  automaticity: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Dorongan untuk ${f} hampir tidak pernah menjadi respons awalmu. Biasanya perhatianmu bergerak ke cara lain yang terasa lebih langsung atau lebih akrab.`,
        reaksi: `${scene}, kamu tidak otomatis melakukan hal itu dan mungkin menunggu petunjuk, mengikuti cara yang sudah ada, atau baru memikirkannya setelah orang lain menyinggungnya.`,
      },
      {
        artinya: `Kamu bisa ${f}, tetapi biasanya perlu berhenti dan menyusun pikiran terlebih dahulu. Respons ini lebih terasa sebagai usaha sadar daripada refleks.`,
        reaksi: `${scene}, kamu mengambil jeda, menimbang apa yang perlu dilakukan, lalu baru mencoba respons tersebut jika memang dibutuhkan.`,
      },
      {
        artinya: `Respons ini muncul pada sebagian keadaan, tetapi tidak cukup konsisten untuk disebut kebiasaan otomatis. Kedekatan konteks, energi, dan tuntutan saat itu cukup menentukan.`,
        reaksi: `${scene}, kadang kamu langsung ${f}; pada kesempatan lain, kamu memakai cara berbeda atau membiarkannya lewat.`,
      },
      {
        artinya: `Dorongan untuk ${f} cukup sering datang dengan cepat. Kamu biasanya tidak membutuhkan persiapan panjang untuk mulai merespons dengan cara ini.`,
        reaksi: `${scene}, kamu segera menangkap apa yang perlu dilakukan dan mulai bergerak sebelum orang lain memberi arahan rinci.`,
      },
      {
        artinya: `Ini sangat dekat dengan respons default-mu. Dalam banyak situasi yang relevan, ${f} muncul hampir bersamaan dengan kamu menyadari apa yang sedang terjadi.`,
        reaksi: `${scene}, respons itu keluar begitu saja—cepat, lancar, dan terasa biasa bagimu meskipun orang lain mungkin perlu memikirkannya lebih lama.`,
      },
    ][value - 1];
  },

  frequency: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Pola ${f} hampir tidak pernah menggambarkan kebiasaanmu. Kalau pernah terjadi, itu lebih berupa pengecualian daripada cara yang biasa kamu pilih.`,
        reaksi: `${scene}, kamu umumnya mengambil jalan lain dan tidak merasa perlu merespons dengan pola tersebut.`,
      },
      {
        artinya: `Pola ini sesekali muncul, biasanya karena tuntutan yang cukup jelas. Tanpa alasan khusus, kamu cenderung tidak memilihnya.`,
        reaksi: `${scene}, kamu mungkin melakukannya sekali-sekali, tetapi setelah kebutuhan lewat kamu segera kembali ke cara yang lebih natural bagimu.`,
      },
      {
        artinya: `Kebiasaan ini muncul dengan frekuensi sedang. Ia cukup nyata dalam dirimu, tetapi masih sangat bergantung pada konteks dan orang yang terlibat.`,
        reaksi: `${scene}, ada kalanya kamu ${f}, sementara pada kesempatan lain kamu menilai respons itu tidak diperlukan.`,
      },
      {
        artinya: `Pola ${f} cukup sering terlihat dalam keseharianmu. Dalam banyak situasi yang relevan, respons ini termasuk pilihan yang mudah kamu ambil.`,
        reaksi: `${scene}, kamu biasanya melakukan hal tersebut tanpa perlu didesak berkali-kali, meskipun tidak selalu pada setiap kesempatan.`,
      },
      {
        artinya: `Pola ini sangat konsisten menggambarkan dirimu. Hampir setiap kali konteksnya muncul, kamu cenderung merespons dengan cara yang serupa.`,
        reaksi: `${scene}, kamu hampir selalu ${f}, sampai-sampai orang dekat mungkin sudah dapat menebak reaksimu.`,
      },
    ][value - 1];
  },

  comfort: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Melakukan ${f} terasa sangat menguras. Kamu mungkin tetap mampu menjalaninya, tetapi perlu banyak kendali diri dan biasanya ingin segera berhenti setelah tuntutan selesai.`,
        reaksi: `${scene}, kamu merasa tegang, terus mengawasi langkah sendiri, dan setelahnya membutuhkan waktu untuk memulihkan tenaga.`,
      },
      {
        artinya: `Respons ini masih terasa agak canggung atau melelahkan. Kamu dapat melakukannya, tetapi tidak ingin mempertahankannya terlalu lama.`,
        reaksi: `${scene}, kamu menjalankannya seperlunya sambil berharap situasi segera kembali ke cara yang lebih nyaman bagimu.`,
      },
      {
        artinya: `Tingkat kenyamananmu berada di tengah. Ada situasi ketika ${f} terasa lancar, tetapi ada juga keadaan ketika respons yang sama cukup menguras.`,
        reaksi: `${scene}, kenyamananmu bergantung pada tekanan, orang yang terlibat, dan seberapa jelas tujuan yang ingin dicapai.`,
      },
      {
        artinya: `Kamu cukup nyaman ${f}. Respons ini biasanya dapat dipakai tanpa ketegangan besar dan bisa kamu sesuaikan ketika keadaan berubah.`,
        reaksi: `${scene}, kamu menjalankannya dengan tenang, memperhatikan hasilnya, lalu mengubah kadar respons jika diperlukan.`,
      },
      {
        artinya: `Respons ini terasa sangat natural dan mudah diatur. Kamu dapat ${f} tanpa merasa sedang memainkan peran yang asing.`,
        reaksi: `${scene}, kamu bergerak dengan lancar, tetap fleksibel, dan masih memiliki tenaga untuk memperhatikan kebutuhan lain di sekitarmu.`,
      },
    ][value - 1];
  },

  threat: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Tuntutan untuk ${f} hampir tidak mengganggumu. Kamu dapat menghadapi tekanan ini tanpa merasa harga diri atau rasa amanmu sedang diserang.`,
        reaksi: `${scene}, kamu tetap tenang, memikirkan langkah yang tersedia, dan tidak merasa perlu membela diri secara berlebihan.`,
      },
      {
        artinya: `Ada sedikit rasa tidak nyaman, tetapi tekanannya masih mudah dikelola. Keraguan muncul sebentar lalu biasanya mereda.`,
        reaksi: `${scene}, kamu mungkin berhenti sejenak atau merasa agak jengkel, namun tetap dapat melanjutkan tanpa kehilangan kendali.`,
      },
      {
        artinya: `Tuntutan ini mulai terasa menekan. Kamu masih mampu merespons, tetapi perlu usaha nyata untuk mengatasi tegang, ragu, atau takut dinilai salah.`,
        reaksi: `${scene}, pikiranmu melambat, kamu menjadi lebih hati-hati, dan sesekali mencari kepastian sebelum bertindak.`,
      },
      {
        artinya: `Tekanan untuk ${f} terasa berat dan mudah menyentuh titik sensitifmu. Kamu dapat menjadi sangat tegang, defensif, atau kehilangan keluwesan.`,
        reaksi: `${scene}, kamu kesulitan berpikir bebas, takut membuat kesalahan, dan sangat ingin tuntutan itu dialihkan atau dipersempit.`,
      },
      {
        artinya: `Ini termasuk tuntutan yang paling mudah membuatmu beku, malu, defensif, atau ingin menghindar. Reaksinya dapat terasa jauh lebih besar daripada situasinya sendiri.`,
        reaksi: `${scene}, kamu bisa nge-blank, menutup percakapan, membalas dengan ketus, atau mencari jalan keluar karena tekanan terasa terlalu dekat dengan titik rawanmu.`,
      },
    ][value - 1];
  },

  relief: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Bantuan untuk ${f} tidak banyak mengubah keadaanmu. Kamu mungkin lebih suka mengurusnya sendiri atau membutuhkan bentuk dukungan yang berbeda.`,
        reaksi: `${scene}, kamu menghargai niat orang tersebut, tetapi tidak merasa lebih tenang atau lebih mampu setelah bantuan diberikan.`,
      },
      {
        artinya: `Bantuan ini memberi sedikit kemudahan, tetapi bukan hal yang benar-benar kamu cari. Efeknya cepat lewat atau hanya berguna pada bagian kecil.`,
        reaksi: `${scene}, kamu menerima satu-dua bagian yang berguna lalu tetap mengandalkan cara sendiri untuk menyelesaikan sisanya.`,
      },
      {
        artinya: `Dukungan tersebut cukup membantu, terutama ketika keadaan sedang sulit. Namun, kamu tidak selalu membutuhkannya untuk merasa aman atau mampu.`,
        reaksi: `${scene}, kamu merasa beban sedikit berkurang dan dapat melanjutkan dengan lebih tenang, meski tidak sepenuhnya bergantung pada bantuan itu.`,
      },
      {
        artinya: `Bantuan untuk ${f} terasa sangat berguna. Kehadiran orang yang tepat dapat membuat situasi yang tadinya berat menjadi jauh lebih sederhana.`,
        reaksi: `${scene}, kamu cepat merasa tenang, mempercayai arah yang diberikan, dan lebih mudah bergerak setelah mendapat dukungan tersebut.`,
      },
      {
        artinya: `Bentuk bantuan ini memberi kelegaan yang sangat dalam. Rasanya seperti seseorang akhirnya menangani bagian yang selama ini sulit kamu pegang sendirian.`,
        reaksi: `${scene}, keteganganmu turun dengan jelas, kamu membiarkan orang yang kompeten membantu, dan keadaan terasa jauh lebih aman atau mudah dijalani.`,
      },
    ][value - 1];
  },

  recognition: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      {
        artinya: `Pengakuan mengenai kemampuan untuk ${f} hampir tidak menyentuh kebutuhan pribadimu. Pujian itu mungkin terdengar baik, tetapi tidak banyak mengubah semangatmu.`,
        reaksi: `${scene}, kamu menerima komentar tersebut dengan biasa saja lalu kembali fokus pada hal lain yang lebih berarti bagimu.`,
      },
      {
        artinya: `Pujian di area ini cukup menyenangkan, tetapi bukan sesuatu yang kamu kejar. Efeknya ringan dan tidak bertahan lama.`,
        reaksi: `${scene}, kamu tersenyum atau mengucapkan terima kasih, namun tidak merasa perlu membuktikannya lagi.`,
      },
      {
        artinya: `Pengakuan ini memiliki arti sedang. Pada waktu tertentu ia dapat menambah semangat, tetapi tidak selalu menjadi sumber kebanggaan utama.`,
        reaksi: `${scene}, kamu merasa senang dan mungkin mencoba mengulang keberhasilan itu, tergantung seberapa penting konteksnya.`,
      },
      {
        artinya: `Pujian tentang kemampuan untuk ${f} terasa sangat berarti. Ia dapat membuatmu merasa dilihat dan mendorongmu berkembang lebih jauh.`,
        reaksi: `${scene}, kamu mengingat komentar itu, menjadi lebih percaya diri, dan terdorong menunjukkan bahwa kemampuan tersebut memang dapat kamu bangun.`,
      },
      {
        artinya: `Pengakuan di area ini menyentuh bagian diri yang sangat ingin tumbuh dan dibenarkan. Pujian yang tepat dapat bertahan lama dalam ingatanmu.`,
        reaksi: `${scene}, kamu merasa sangat tersentuh, ingin segera mengembangkan kemampuan itu, dan mungkin mengulang komentar tersebut di kepala selama berhari-hari.`,
      },
    ][value - 1];
  },

  competence: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      { artinya: `Kamu merasa sangat kesulitan ${f}, terutama ketika situasinya baru atau kompleks.`, reaksi: `${scene}, kamu mudah kehilangan arah dan membutuhkan bantuan yang sangat konkret.` },
      { artinya: `Kemampuanmu di area ini masih terbatas. Kamu bisa melakukannya jika ada contoh, aturan, atau orang yang mendampingi.`, reaksi: `${scene}, kamu bergerak hati-hati dan sering mengecek apakah langkahmu sudah benar.` },
      { artinya: `Kamu cukup mampu ${f} dalam kondisi yang mendukung, tetapi kualitasnya belum selalu stabil.`, reaksi: `${scene}, kamu dapat menyelesaikannya dengan hasil wajar selama tekanan tidak terlalu tinggi.` },
      { artinya: `Kamu cukup terampil ${f} dan biasanya dapat bekerja mandiri dalam situasi yang umum.`, reaksi: `${scene}, kamu tahu harus mulai dari mana dan dapat memperbaiki kesalahan tanpa banyak bantuan.` },
      { artinya: `Kemampuan ini terasa sangat kuat dan luas. Kamu dapat ${f} bahkan ketika konteks berubah atau masalah menjadi rumit.`, reaksi: `${scene}, kamu bergerak mantap, melihat beberapa tingkat persoalan, dan masih mampu membantu orang lain.` },
    ][value - 1];
  },

  importance: (question, value) => {
    const f = focus(question);
    const scene = atScenario(question);
    return [
      { artinya: `Aspek ${f} hampir tidak masuk dalam pertimbangan pentingmu.`, reaksi: `${scene}, kamu mudah mengesampingkannya demi hal lain yang terasa lebih utama.` },
      { artinya: `Aspek ini memiliki bobot kecil dan biasanya hanya dipertimbangkan jika ada alasan praktis.`, reaksi: `${scene}, kamu menaruhnya sebagai prioritas tambahan, bukan penentu keputusan.` },
      { artinya: `Pentingnya aspek ini berubah sesuai konteks.`, reaksi: `${scene}, kadang kamu menjadikannya pertimbangan utama, kadang hampir tidak memakainya.` },
      { artinya: `Aspek ${f} termasuk pertimbangan penting yang sering memengaruhi pilihanmu.`, reaksi: `${scene}, kamu rela mengubah rencana agar bagian ini tetap terjaga.` },
      { artinya: `Aspek ini berada sangat dekat dengan prioritas inti dan sulit kamu tukar dengan pertimbangan lain.`, reaksi: `${scene}, kamu cenderung mempertahankannya meskipun pilihan itu menuntut biaya atau penyesuaian besar.` },
    ][value - 1];
  },

  comparison: (question, value) => {
    const scene = atScenario(question);
    return [
      {
        artinya: `Bagian setelah kata “daripada” jauh lebih menggambarkan respons naturalmu dibanding bagian pertama.`,
        reaksi: `${scene}, kamu dengan jelas bergerak menuju sisi kedua dari perbandingan dalam kalimat tersebut.`,
      },
      {
        artinya: `Kedua sisi mungkin ada, tetapi sisi kedua terasa lebih sering atau lebih natural bagimu.`,
        reaksi: `${scene}, kamu cenderung memilih pola kedua meskipun sesekali tetap menggunakan sisi pertama.`,
      },
      {
        artinya: `Kedua sisi terasa hampir sama dekat, atau pilihanmu sangat bergantung pada keadaan.`,
        reaksi: `${scene}, kamu bisa bergerak ke salah satu sisi tanpa merasa ada kecenderungan yang benar-benar dominan.`,
      },
      {
        artinya: `Kedua sisi mungkin ada, tetapi bagian pertama lebih sering terasa natural bagimu.`,
        reaksi: `${scene}, kamu cenderung memilih pola pertama meskipun masih dapat memakai sisi kedua ketika dibutuhkan.`,
      },
      {
        artinya: `Bagian pertama jauh lebih menggambarkan respons naturalmu dibanding bagian setelah kata “daripada”.`,
        reaksi: `${scene}, pilihanmu dengan jelas mengikuti sisi pertama dari perbandingan tersebut.`,
      },
    ][value - 1];
  },
};

export function getOptionDetail(question: SocionicsQuestion, value: number): OptionDetail {
  const safeValue = Math.min(5, Math.max(1, Math.round(value)));
  return details[question.scaleType](question, safeValue);
}
