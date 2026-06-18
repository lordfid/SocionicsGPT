/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Zap,
  Target,
  Thermometer,
  Search,
  CheckCircle,
  Shield,
  FileText,
  AlertCircle,
  BookOpen,
  Layers,
  Sparkles,
  User,
  Users,
  Calculator,
  AlertTriangle,
  Scale,
  Brain,
  HelpCircle,
  ArrowRight,
  Cloud,
  Database,
  Upload,
  Download,
  RefreshCw,
  LogOut,
  HardDrive,
  Check,
  FileCode
} from "lucide-react";
import { allQuestions } from "./data/questions";
import { Question, ElementType, ChannelType, ContextKey } from "./types";
import { socionicsRoasts, SocionicsRoast } from "./data/roasts";
import {
  MODEL_A_MAP,
  CHANNELS_IN_ORDER,
  CHANNEL_LABELS,
  getRelation,
  IntertypeRelation
} from "./utils/socionicsMath";

interface ContentReviewItem {
  id: string;
  channel: string;
  context: string;
  manifestation: string;
  behaviorCenter: string;
  competitor: string;
  traitContamination: string;
  genderRisk: string;
  status: string;
}

const siContentReview: ContentReviewItem[] = [
  { id: "si-p1", channel: "Producer", context: "kerja_belajar", manifestation: "Penyesuaian fisis", behaviorCenter: "Menyetel duduk/cahaya", competitor: "Te / Se", traitContamination: "Conscientiousness", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-p2", channel: "Producer", context: "pertemanan", manifestation: "Kondisi udara", behaviorCenter: "Meminta geser kipas", competitor: "Se / Fe", traitContamination: "Neuroticism", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-p3", channel: "Producer", context: "sendirian", manifestation: "Keseimbangan energi", behaviorCenter: "Berhenti kerja demi tubuh", competitor: "Te", traitContamination: "Produktivitas", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-f1", channel: "Flexible", context: "perjalanan", manifestation: "Kram kaki", behaviorCenter: "Menahan sempit bus", competitor: "Se", traitContamination: "Ketangguhan fisik", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-f2", channel: "Flexible", context: "kerja_belajar", manifestation: "Cahaya silau", behaviorCenter: "Menunda penyusunan", competitor: "Te", traitContamination: "Produktivitas", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-f3", channel: "Flexible", context: "keluarga", manifestation: "Tempo lelah debu", behaviorCenter: "Menyesuaikan mandi", competitor: "Ti / Se", traitContamination: "Kebersihan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-m1", channel: "Mask", context: "menerima_tamu", manifestation: "Stamina tubuh", behaviorCenter: "Berpura bugar", competitor: "Fe / Fi", traitContamination: "Social Agreeableness", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-m2", channel: "Mask", context: "kerja_belajar", manifestation: "Suhu AC", behaviorCenter: "Berpura nyaman", competitor: "Se", traitContamination: "Performa Ketahanan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-m3", channel: "Mask", context: "perjalanan", manifestation: "Bantal keras", behaviorCenter: "Berpura nyenyak tidur", competitor: "Fi / Fe", traitContamination: "Politeness", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-t1", channel: "Threat", context: "pemulihan", manifestation: "Sinyal jasmani", behaviorCenter: "Bingung melisankan", competitor: "Fi", traitContamination: "Somatosensorik klinis", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-t2", channel: "Threat", context: "kerja_belajar", manifestation: "Lampu/suhu AC", behaviorCenter: "Kewalahan tak berdaya", competitor: "Ti", traitContamination: "Ketidakberdayaan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-t3", channel: "Threat", context: "tempat_umum", manifestation: "Baju tebal keringat", behaviorCenter: "Tersinggung diaudit", competitor: "Fe / Fi", traitContamination: "Kebersihan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-r1", channel: "Receiver", context: "pemulihan", manifestation: "Jendela & redup AC", behaviorCenter: "Lega dibantu ventilasi", competitor: "Fe", traitContamination: "Ketergantungan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-r2", channel: "Receiver", context: "kerja_belajar", manifestation: "Bantal penunjang", behaviorCenter: "Berterima kasih diingat", competitor: "Fi / Te", traitContamination: "Ketergantungan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-r3", channel: "Receiver", context: "kendaraan", manifestation: "Kemiringan kursi", behaviorCenter: "Senang disetelkan AC", competitor: "Fe", traitContamination: "Ketergantungan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-a1", channel: "Aspiration", context: "pertemanan", manifestation: "Tekstur baju", behaviorCenter: "Bangga diakui seleranya", competitor: "Se / Fi", traitContamination: "Estetika", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-a2", channel: "Aspiration", context: "sendirian", manifestation: "Rencana cahaya", behaviorCenter: "Ingin merancang balans", competitor: "Ti / Ne", traitContamination: "Kreativitas ruang", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-a3", channel: "Aspiration", context: "keluarga", manifestation: "Siklus tidur", behaviorCenter: "Malu disindir acak", competitor: "Te", traitContamination: "Neuroticism", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-d1", channel: "Dismissive", context: "kerja_belajar", manifestation: "Kaki meja miring", behaviorCenter: "Menyumbat 2 detik", competitor: "Te / Ti", traitContamination: "Kerapian mekanis", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-d2", channel: "Dismissive", context: "keluarga", manifestation: "Tekstur kain", behaviorCenter: "Memotong obrolan kain", competitor: "Fi", traitContamination: "Keangkuhan", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-d3", channel: "Dismissive", context: "ruang_tunggu", manifestation: "Silau lampu", behaviorCenter: "Menggeser gesit duduk", competitor: "Se", traitContamination: "Ketidakpedulian", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-b1", channel: "Background", context: "menerima_tamu", manifestation: "Lampu tambahan", behaviorCenter: "Otomatis redup/tutup", competitor: "Fe / Fi", traitContamination: "Sopan santun", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-b2", channel: "Background", context: "acara_ramai", manifestation: "Nyaring suara", behaviorCenter: "Refleks geser mundur", competitor: "Se / Fe", traitContamination: "Antisosial", genderRisk: "Nihil", status: "ACCEPTED" },
  { id: "si-b3", channel: "Background", context: "kamar", manifestation: "Kemiringan layar", behaviorCenter: "Refleks merenggang otot", competitor: "Te / Ti", traitContamination: "Nihil", genderRisk: "Nihil", status: "ACCEPTED" }
];

export default function App() {
  // Navigation State
  const [activeMainTab, setActiveMainTab] = useState<"assessment" | "explorer" | "modela" | "math" | "audits" | "drive">("assessment");

  // Google Drive Integration State
  const [driveClientId, setDriveClientId] = useState<string>(() => {
    return localStorage.getItem("socionics_drive_client_id") || "1028014541783-gen-lang-client-0697488229.apps.googleusercontent.com";
  });
  const [driveAccessToken, setDriveAccessToken] = useState<string | null>(null);
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [driveLoading, setDriveLoading] = useState<boolean>(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [driveSuccess, setDriveSuccess] = useState<string | null>(null);
  const [authUserInfo, setAuthUserInfo] = useState<any>(null);

  // Diagnostic Test States
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("socionics_test_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(() => {
    return localStorage.getItem("socionics_test_completed") === "true";
  });
  const [testActiveIndex, setTestActiveIndex] = useState<number>(0);
  const [testMode, setTestMode] = useState<"full" | "quick">("full");
  const [testFilterUnanswered, setTestFilterUnanswered] = useState<boolean>(false);

  // State for search and filtering (Explorer Tab)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<ElementType | "ALL">("ALL");
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | "ALL">("ALL");
  const [selectedContext, setSelectedContext] = useState<ContextKey | "ALL">("ALL");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // State for Model A / Roasts Tab
  const [activeTypeProfile, setActiveTypeProfile] = useState<string>("ILE");
  const [selectedModelAPosition, setSelectedModelAPosition] = useState<number | null>(0); // 0-7

  // State for Dynamics Tab
  const [relationSourceType, setRelationSourceType] = useState<string>("LII");
  const [relationTargetType, setRelationTargetType] = useState<string>("ESE");

  // State for Audits Tab
  const [activeAuditTab, setActiveAuditTab] = useState<"semantik" | "batas" | "konten" | "math">("semantik");
  const [selectedAuditElement, setSelectedAuditElement] = useState<"Ne" | "Ni" | "Se" | "Si">("Si");

  // --- Google Drive Integration Methods ---

  const handleSaveClientId = (newId: string) => {
    setDriveClientId(newId);
    localStorage.setItem("socionics_drive_client_id", newId);
    setDriveSuccess("Client ID berhasil disimpan.");
    setTimeout(() => setDriveSuccess(null), 3000);
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAuthUserInfo(data);
      }
    } catch (e) {
      console.error("Failed to fetch userinfo", e);
    }
  };

  const fetchDriveFiles = async (token: string) => {
    setDriveLoading(true);
    setDriveError(null);
    try {
      const q = encodeURIComponent("trashed = false and (name contains 'socionics' or mimeType = 'application/json')");
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=modifiedTime desc&fields=files(id,name,mimeType,size,modifiedTime)`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setDriveFiles(data.files || []);
      } else {
        const errData = await res.json();
        setDriveError(`Gagal mendapatkan berkas: ${errData.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      setDriveError(`Gagal mengakses Google Drive: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  const initiateDriveAuth = () => {
    if (!(window as any).google) {
      setDriveError(
        "SDK Google Identity belum dimuat sempurna. Silakan muat ulang halaman setelah beberapa saat."
      );
      return;
    }
    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    try {
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: driveClientId.trim(),
        scope:
          "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            setDriveError(`Autentikasi gagal: ${tokenResponse.error_description || tokenResponse.error}`);
            setDriveLoading(false);
            return;
          }
          if (tokenResponse.access_token) {
            setDriveAccessToken(tokenResponse.access_token);
            setDriveSuccess("Koneksi berhasil terhubung dengan Google Drive!");
            await fetchDriveFiles(tokenResponse.access_token);
            await fetchUserInfo(tokenResponse.access_token);
            setTimeout(() => setDriveSuccess(null), 4000);
          }
          setDriveLoading(false);
        },
      });
      client.requestAccessToken({ prompt: "consent" });
    } catch (err: any) {
      setDriveError(`Konfigurasi OAuth salah atau ditolak: ${err.message || err}. Pastikan Client ID Anda valid.`);
      setDriveLoading(false);
    }
  };

  const logoutDrive = () => {
    if (driveAccessToken) {
      try {
        (window as any).google.accounts.oauth2.revoke(driveAccessToken, () => {
          console.log("Token revoked");
        });
      } catch (e) {
        console.error("Revoke error", e);
      }
    }
    setDriveAccessToken(null);
    setDriveFiles([]);
    setAuthUserInfo(null);
    setDriveSuccess("Log out dari Google Drive sukses.");
    setTimeout(() => setDriveSuccess(null), 3000);
  };

  const saveBackupToDrive = async () => {
    if (!driveAccessToken) {
      setDriveError("Silakan sambungkan akun Google Drive Anda terlebih dahulu.");
      return;
    }

    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    const backupData = {
      app: "Socionics Dalam Diriku Lab",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      activeTypeProfile,
      relationSourceType,
      relationTargetType,
      selectedModelAPosition,
      searchQuery,
      selectedElement,
      selectedChannel,
      selectedContext,
      testAnswers,
      isTestCompleted,
      testMode
    };

    const fileName = `socionics_backup_${new Date().toISOString().slice(0, 10)}_${Math.floor(Math.random() * 1000)}.json`;

    const metadata = {
      name: fileName,
      mimeType: "application/json",
      description: "Socionics Assessment Dashboard state backup from AI Studio"
    };

    const boundary = "314159265358979323846";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;
    
    const body =
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(backupData, null, 2) +
      closeDelimiter;

    try {
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${driveAccessToken}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
          },
          body: body,
        }
      );

      if (res.ok) {
        setDriveSuccess(`Berhasil mengunggah berkas cadangan: ${fileName}`);
        await fetchDriveFiles(driveAccessToken);
        setTimeout(() => setDriveSuccess(null), 4000);
      } else {
        const errData = await res.json();
        setDriveError(`Gagal mencadangkan: ${errData.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      setDriveError(`Kesalahan jaringan: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  const uploadResearchReport = async () => {
    if (!driveAccessToken) {
      setDriveError("Silakan sambungkan akun Google Drive Anda terlebih dahulu.");
      return;
    }

    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    const reportContent = `===============================================================
LAPORAN RISET SOCIONICS COGNITIVE MATRIX
===============================================================
Digenerasi pada : ${new Date().toLocaleString("id-ID")}
Profil Utama : ${relationSourceType}
Profil Pembanding : ${relationTargetType}
Relasi Intertipe : ${computedRelation.name} (${computedRelation.localName})
Grup Simetri Symmetrical: D4 x Z2 (Symmetric Group)
Independensi Linier : Orde Symmetrical

ALJABAR SIFAT MATRIX COGNITIVE:
- Sifat aljabar: Hubungan asimetris memiliki order aljabar Order 4. Hubungan simetris memiliki Order 2 atau Order 1.
- Invarian Tencer: Type kognitif adalah orbit dari grup D4 x Z2. Kuesioner kognitif menyelaraskan 12 penanda irrasional per tipe dengan mengaitkan elemen kognitif riil kepada posisi fungsional aslinya di Model A.

PREVIEW HUBUNGAN DYNAMICS:
${computedRelation.desc}

===============================================================
Generated automatically by Socionics Lab Workspace.
Licensed under Apache-2.0.
===============================================================`;

    const fileName = `socionics_report_${relationSourceType}_vs_${relationTargetType}_${new Date().toISOString().slice(0, 10)}.txt`;

    const metadata = {
      name: fileName,
      mimeType: "text/plain",
      description: "Laporan Riset Hubungan Socionics Matematika Symmetrical"
    };

    const boundary = "314159265358979323846";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;
    
    const body =
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: text/plain; charset=UTF-8\r\n\r\n" +
      reportContent +
      closeDelimiter;

    try {
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${driveAccessToken}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
          },
          body: body,
        }
      );

      if (res.ok) {
        setDriveSuccess(`Berhasil mengunggah laporan riset: ${fileName}`);
        await fetchDriveFiles(driveAccessToken);
        setTimeout(() => setDriveSuccess(null), 4000);
      } else {
        const errData = await res.json();
        setDriveError(`Gagal mengunggah laporan: ${errData.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      setDriveError(`Kesalahan jaringan: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  const loadBackupFromDrive = async (fileId: string, fileName: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin memuat data cadangan "${fileName}"? Tindakan ini akan menimpa pilihan Profil Tipe, Parameter Filter, dan Hubungan Relasi saat ini.`
    );
    if (!isConfirmed) return;

    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${driveAccessToken}` }
      });

      if (res.ok) {
        const data = await res.json();
        
        if (data.activeTypeProfile) setActiveTypeProfile(data.activeTypeProfile);
        if (data.relationSourceType) setRelationSourceType(data.relationSourceType);
        if (data.relationTargetType) setRelationTargetType(data.relationTargetType);
        if (data.selectedModelAPosition !== undefined) setSelectedModelAPosition(data.selectedModelAPosition);
        if (data.searchQuery !== undefined) setSearchQuery(data.searchQuery);
        if (data.selectedElement !== undefined) setSelectedElement(data.selectedElement);
        if (data.selectedChannel !== undefined) setSelectedChannel(data.selectedChannel);
        if (data.selectedContext !== undefined) setSelectedContext(data.selectedContext);
        
        if (data.testAnswers) {
          setTestAnswers(data.testAnswers);
          localStorage.setItem("socionics_test_answers", JSON.stringify(data.testAnswers));
        }
        if (data.isTestCompleted !== undefined) {
          setIsTestCompleted(data.isTestCompleted);
          localStorage.setItem("socionics_test_completed", String(data.isTestCompleted));
        }
        if (data.testMode) setTestMode(data.testMode);

        setDriveSuccess(`Data dashboard berhasil dipulihkan dari: ${fileName}`);
        setTimeout(() => setDriveSuccess(null), 4000);
      } else {
        const errData = await res.json();
        setDriveError(`Gagal membaca berkas: ${errData.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      setDriveError(`Gagal memuat berkas cadangan: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  const deleteDriveFile = async (fileId: string, fileName: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus berkas "${fileName}" dari Google Drive Anda? Tindakan ini permanen dan tidak dapat dibatalkan.`
    );
    if (!isConfirmed) return;

    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${driveAccessToken}` }
      });

      if (res.ok || res.status === 204) {
        setDriveSuccess(`Berkas "${fileName}" berhasil dihapus.`);
        await fetchDriveFiles(driveAccessToken);
        setTimeout(() => setDriveSuccess(null), 3000);
      } else {
        const text = await res.text();
        let errMsg = res.statusText;
        try {
          if (text) {
            const errData = JSON.parse(text);
            errMsg = errData.error?.message || errMsg;
          }
        } catch (e) {}
        setDriveError(`Gagal menghapus berkas: ${errMsg}`);
      }
    } catch (err: any) {
      setDriveError(`Error jaringan saat menghapus: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  // Lists for filtering (Explorer)
  const elementsList: (ElementType | "ALL")[] = ["ALL", "Ne", "Ni", "Se", "Si"];
  const channelsList: (ChannelType | "ALL")[] = [
    "ALL", "producer", "flexible", "mask", "threat", "receiver", "aspiration", "dismissive", "background"
  ];
  const contextsList: (ContextKey | "ALL")[] = [
    "ALL", "kerja_belajar", "perjalanan", "keluarga", "menerima_tamu", "pemulihan", "pertemanan",
    "sendirian", "tempat_umum", "acara_ramai", "kamar", "ruang_tunggu", "kendaraan"
  ];

  // Helper lists
  const ALL_16_TYPES = useMemo(() => {
    return socionicsRoasts.map(r => r.id);
  }, []);

  // Filter questions based on criteria
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchSearch =
        q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchElement = selectedElement === "ALL" || q.element === selectedElement;
      const matchChannel = selectedChannel === "ALL" || q.channel === selectedChannel;
      const matchContext = selectedContext === "ALL" || q.context === selectedContext;

      return matchSearch && matchElement && matchChannel && matchContext;
    });
  }, [searchQuery, selectedElement, selectedChannel, selectedContext]);

  // Count items for statistics
  const stats = useMemo(() => {
    const total = allQuestions.length;
    const neCount = allQuestions.filter((q) => q.element === "Ne").length;
    const niCount = allQuestions.filter((q) => q.element === "Ni").length;
    const seCount = allQuestions.filter((q) => q.element === "Se").length;
    const siCount = allQuestions.filter((q) => q.element === "Si").length;

    return { total, ne: neCount, ni: niCount, se: seCount, si: siCount };
  }, []);

  // Details dictionary
  const elementDetails = {
    Ne: {
      title: "Ne — Extraverted Intuition",
      desc: "Menjajaki probabilitas, kegunaan unik objek alternatif, kiasan konseptual, dan ideasi lateral.",
      color: "border-sky-500/20 bg-sky-500/5 text-sky-400",
      icon: Compass
    },
    Ni: {
      title: "Ni — Introverted Intuition",
      desc: "Membaca arah aliran tren makro, mengamati prognosis temporal, dan mengukur momentum logis.",
      color: "border-purple-500/20 bg-purple-500/5 text-purple-400",
      icon: Target
    },
    Se: {
      title: "Se — Extraverted Sensing",
      desc: "Penegasan batas ruang fisik riil, mobilisasi pengaruh taktis sepak-terjang, serta mengatasi rintangan.",
      color: "border-amber-500/20 bg-amber-500/5 text-amber-400",
      icon: Zap
    },
    Si: {
      title: "Si — Introverted Sensing",
      desc: "Regulasi sirkulasi somatik (suhu, suara, cahaya, tempo), monitoring homeostasis biologis, dan fine-tuning fisik.",
      color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
      icon: Thermometer
    }
  };

  const channelBadges: Record<ChannelType, string> = {
    producer: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    flexible: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    mask: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    threat: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    receiver: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    aspiration: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
    dismissive: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    background: "bg-slate-500/10 text-slate-300 border border-slate-500/20"
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedElement("ALL");
    setSelectedChannel("ALL");
    setSelectedContext("ALL");
  };

  // Find selected profile info
  const selectedProfile: SocionicsRoast = useMemo(() => {
    return socionicsRoasts.find(r => r.id === activeTypeProfile) || socionicsRoasts[0];
  }, [activeTypeProfile]);

  // Model A functions list for active profile
  const selectedModelAElements = useMemo(() => {
    return MODEL_A_MAP[activeTypeProfile] || MODEL_A_MAP.ILE;
  }, [activeTypeProfile]);

  // Find target questions for selected Model A position
  const selectedPositionQuestions = useMemo(() => {
    if (selectedModelAPosition === null) return [];
    const element = selectedModelAElements[selectedModelAPosition] as ElementType;
    const channel = CHANNELS_IN_ORDER[selectedModelAPosition] as ChannelType;
    return allQuestions.filter(q => q.element === element && q.channel === channel);
  }, [activeTypeProfile, selectedModelAPosition, selectedModelAElements]);

  // Find profiles for relation calculation
  const sourceProfile = useMemo(() => {
    return socionicsRoasts.find(r => r.id === relationSourceType) || socionicsRoasts[0];
  }, [relationSourceType]);

  const targetProfile = useMemo(() => {
    return socionicsRoasts.find(r => r.id === relationTargetType) || socionicsRoasts[0];
  }, [relationTargetType]);

  // Calculate active Intertype Relation
  const computedRelation = useMemo(() => {
    return getRelation(relationSourceType, relationTargetType);
  }, [relationSourceType, relationTargetType]);

  // Color generator for compatibility
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-950/20";
    if (score >= 50) return "text-sky-400 border-sky-500/30 bg-sky-950/20";
    if (score >= 30) return "text-amber-500 border-amber-500/30 bg-amber-950/20";
    return "text-rose-500 border-rose-500/30 bg-rose-950/20";
  };

  // --- Assessment / Diagnosis Engine ---

  const testActiveQuestions = useMemo(() => {
    if (testMode === "full") {
      return allQuestions;
    } else {
      // 16-item quick calibration (4 elements x 4 crucial channels)
      const selectedIds = [
        "ne-p1", "ne-t1", "ne-r1", "ne-b1",
        "ni-p1", "ni-t1", "ni-r1", "ni-b1",
        "se-p1", "se-t1", "se-r1", "se-b1",
        "si-p1", "si-t1", "si-r1", "si-b1"
      ];
      return allQuestions.filter(q => selectedIds.includes(q.id));
    }
  }, [testMode]);

  const testFilteredQuestions = useMemo(() => {
    if (!testFilterUnanswered) return testActiveQuestions;
    return testActiveQuestions.filter(q => testAnswers[q.id] === undefined);
  }, [testActiveQuestions, testAnswers, testFilterUnanswered]);

  const handleSaveAnswer = (qId: string, val: number) => {
    const next = { ...testAnswers, [qId]: val };
    setTestAnswers(next);
    localStorage.setItem("socionics_test_answers", JSON.stringify(next));

    // Check completion
    const unanswered = testActiveQuestions.filter(q => next[q.id] === undefined);
    if (unanswered.length === 0) {
      setIsTestCompleted(true);
      localStorage.setItem("socionics_test_completed", "true");
    }
  };

  const handleResetTest = () => {
    if (window.confirm("Batal/Selesaikan ulang penilaian? Seluruh riwayat jawaban kuesioner Anda akan dihapus secara permanen.")) {
      setTestAnswers({});
      setIsTestCompleted(false);
      setTestActiveIndex(0);
      localStorage.removeItem("socionics_test_answers");
      localStorage.removeItem("socionics_test_completed");
    }
  };

  const calculatedRankings = useMemo(() => {
    const elementChannels = ["Ne", "Ni", "Se", "Si"];
    const channelKeys: ChannelType[] = [
      "producer",
      "flexible",
      "mask",
      "threat",
      "receiver",
      "aspiration",
      "dismissive",
      "background"
    ];

    const matrixScores: Record<string, number> = {};

    elementChannels.forEach(el => {
      channelKeys.forEach(ch => {
        const questionsOfCell = allQuestions.filter(q => q.element === el && q.channel === ch);
        const answeredOfCell = questionsOfCell.filter(q => testAnswers[q.id] !== undefined);
        
        if (answeredOfCell.length > 0) {
          const sum = answeredOfCell.reduce((acc, q) => acc + testAnswers[q.id], 0);
          matrixScores[`${el}_${ch}`] = sum / answeredOfCell.length;
        } else {
          matrixScores[`${el}_${ch}`] = 3.0; // default to moderate/neutral
        }
      });
    });

    return socionicsRoasts.map(profile => {
      const modelElements = MODEL_A_MAP[profile.id];
      if (!modelElements) return { typeId: profile.id, profile, score: 0 };

      let typeScore = 0;
      let maxPossibleScore = 0;
      const evaluatedElements = ["Ne", "Ni", "Se", "Si"];

      evaluatedElements.forEach(el => {
        const pos = modelElements.indexOf(el);
        if (pos === -1) return;

        const channel = CHANNELS_IN_ORDER[pos] as ChannelType;
        const cellValue = matrixScores[`${el}_${channel}`] || 3.0;

        let weight = 1.0;
        switch (pos) {
          case 0: weight = 2.0; break;      // Program
          case 1: weight = 1.8; break;      // Creative
          case 7: weight = 1.5; break;      // Demonstrative
          case 4: weight = 1.5; break;      // Suggestive
          case 5: weight = 1.2; break;      // Mobilizing
          case 6: weight = 1.0; break;      // Ignoring
          case 2: weight = 0.8; break;      // Role
          case 3: weight = 2.0; break;      // Vulnerable (Anxiety/Stress correlation)
        }

        typeScore += cellValue * weight;
        maxPossibleScore += 5.0 * weight;
      });

      const percentage = maxPossibleScore > 0 ? Math.round((typeScore / maxPossibleScore) * 100) : 0;
      return {
        typeId: profile.id,
        profile,
        score: percentage
      };
    }).sort((a, b) => b.score - a.score);
  }, [testAnswers]);

  const uploadDiagnosticReport = async () => {
    if (!driveAccessToken) {
      setDriveError("Silakan sambungkan akun Google Drive Anda terlebih dahulu melalui tab Google Drive Sync.");
      return;
    }

    setDriveLoading(true);
    setDriveError(null);
    setDriveSuccess(null);

    const bestFit = calculatedRankings[0];
    if (!bestFit) return;

    const reportContent = `===============================================================
LAPORAN DIAGNOSIS MATRIKS COGNITIVE SOCIONICS LENGKAP
===============================================================
Digenerasi pada  : ${new Date().toLocaleString("id-ID")}
Hasil Utama      : ${bestFit.typeId} - ${bestFit.profile.name} (${bestFit.score}% Match)
Alias            : ${bestFit.profile.alias}
Quadra           : ${bestFit.profile.quadra} Quadra
Stereotipe       : ${bestFit.profile.stereotip}

KESIMPULAN BRUTAL (CRITICAL AUDIT SHARP COHERENCE):
${bestFit.profile.kesimpulanBrutal}

ROAST SHORT:
${bestFit.profile.roastShort}

AURA RUANGAN:
${bestFit.profile.aura}

RED FLAGS (Tanda Bahaya Kognitif):
${bestFit.profile.redFlags.map(f => `- ${f}`).join("\n")}

GREEN FLAGS (Potensi Unggulan):
${bestFit.profile.greenFlags.map(f => `- ${f}`).join("\n")}

===============================================================
STRUKTUR PENILAIAN MATRIKS KANAL (Ne, Ni, Se, Si):
===============================================================
Berikut adalah persentase keselarasan kognitif elemen irrasional Anda:
${calculatedRankings.slice(0, 5).map((r, i) => `${i + 1}. ${r.typeId} (${r.profile.ego}) : ${r.score}% Keharmonisan`).join("\n")}

Generated automatically by Socionics Lab Workspace.
Licensed under Apache-2.0. All rights preserved.
===============================================================`;

    const fileName = `socionics_diagnosis_${bestFit.typeId}_${new Date().toISOString().slice(0, 10)}.txt`;

    const metadata = {
      name: fileName,
      mimeType: "text/plain",
      description: "Laporan Diagnosis Hasil Tes Socionics Psikometrik Symmetrical Model A"
    };

    const boundary = "314159265358979323846";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;
    
    const body =
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: text/plain; charset=UTF-8\r\n\r\n" +
      reportContent +
      closeDelimiter;

    try {
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${driveAccessToken}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
          },
          body: body,
        }
      );

      if (res.ok) {
        setDriveSuccess(`Laporan diagnosis berhasil diunggah ke Google Drive: ${fileName}`);
        await fetchDriveFiles(driveAccessToken);
        setTimeout(() => setDriveSuccess(null), 4000);
      } else {
        const errData = await res.json();
        setDriveError(`Gagal mengunggah laporan: ${errData.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      setDriveError(`Kesalahan jaringan: ${err.message || err}`);
    } finally {
      setDriveLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-950/15 via-slate-950/0 to-transparent pointer-events-none" />

      {/* Frame wrapper */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top-Level Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded-md border border-emerald-500/25 uppercase tracking-wider">
                Model A & Group Symmetries
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/15 text-blue-400 rounded-md border border-blue-500/25 uppercase tracking-wider font-mono">
                D4 x Z2 Math Engine
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
              Socionics Lab: Model A Dashboard
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl text-left">
              Integrasi kalkulator struktur kepribadian berbasis Teori Grup dan bank data kuesioner kognitif Pe/Pi (96 explicit items). Lulus verifikasi unit test 100%.
            </p>
          </div>

          {/* Navigation Matrix Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              id="tab-assessment"
              onClick={() => setActiveMainTab("assessment")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "assessment"
                  ? "bg-slate-800 text-amber-400 border-slate-700 font-bold shadow-lg shadow-amber-500/5"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Kuesioner Diagnosis
              </span>
            </button>
            <button
              id="tab-explorer"
              onClick={() => setActiveMainTab("explorer")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "explorer"
                  ? "bg-slate-800 text-emerald-400 border-slate-700 font-bold"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Question Explorer
              </span>
            </button>
            <button
              id="tab-modela"
              onClick={() => setActiveMainTab("modela")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "modela"
                  ? "bg-slate-800 text-emerald-400 border-slate-700 font-bold"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Model A & Roasts
              </span>
            </button>
            <button
              id="tab-math"
              onClick={() => setActiveMainTab("math")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "math"
                  ? "bg-slate-800 text-emerald-400 border-slate-700 font-bold"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> Saling Hubungan Sempurna
              </span>
            </button>
            <button
              id="tab-audits"
              onClick={() => setActiveMainTab("audits")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "audits"
                  ? "bg-slate-800 text-emerald-400 border-slate-700 font-bold"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Penjaminan Mutu & Audit
              </span>
            </button>
            <button
              id="tab-drive"
              onClick={() => setActiveMainTab("drive")}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all border duration-200 cursor-pointer ${
                activeMainTab === "drive"
                  ? "bg-slate-800 text-emerald-400 border-slate-700 font-bold"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5" /> G-Drive Sync
              </span>
            </button>
          </div>
        </header>

        {/* Core Stats Bento Block */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between text-left">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block font-mono">Core Database</span>
            <span className="text-3xl font-bold text-white my-1">{stats.total} <span className="text-xs font-normal text-slate-500">Items</span></span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle className="w-2.5 h-2.5" /> Audit Verified
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between text-left">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> Ne Items
            </span>
            <span className="text-3xl font-bold text-white my-1">{stats.ne} <span className="text-xs font-normal text-slate-500">Items</span></span>
            <span className="text-[10px] text-slate-500 font-mono">Pe/Intuitif</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between text-left">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Ni Items
            </span>
            <span className="text-3xl font-bold text-white my-1">{stats.ni} <span className="text-xs font-normal text-slate-500">Items</span></span>
            <span className="text-[10px] text-slate-500 font-mono">Pi/Intuitif</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between text-left">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Se Items
            </span>
            <span className="text-3xl font-bold text-white my-1">{stats.se} <span className="text-xs font-normal text-slate-500">Items</span></span>
            <span className="text-[10px] text-slate-500 font-mono">Pe/Sensorik</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between text-left col-span-2 lg:col-span-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Si Items
            </span>
            <span className="text-3xl font-bold text-white my-1">{stats.si} <span className="text-xs font-normal text-slate-500">Items</span></span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" /> Rebuilt 03D
            </span>
          </div>
        </div>

        {/* View Switch Layer */}
        <AnimatePresence mode="wait">
          
          {/* SCREEN 0: INTERACTIVE COGNITIVE DIAGNOSIS ASSESSMENT */}
          {activeMainTab === "assessment" && (
            <motion.div
              key="assessment-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Introduction Panel */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-sm text-left relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl" />
                <h2 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Laboratorium Karakter: Diagnosis Kalibrasi Kognitif
                </h2>
                <p className="text-slate-300 text-xs leading-relaxed max-w-4xl">
                  Selamat datang di pusat pemetaan kognitif. Untuk melerai bias psikometrik klasik, sasis kalkulator ini menguji 4 Gerak Irrasional utama (<strong className="text-sky-400 text-mono">Ne</strong>, <strong className="text-purple-400 text-mono">Ni</strong>, <strong className="text-amber-400 text-mono">Se</strong>, <strong className="text-emerald-400 text-mono">Si</strong>) melintasi 8 Kanal fungsional Model A. Hasil pengisian akan otomatis disorot dengan matriks order grup simetris untuk memetakan kepribadian Socionics definitif Anda.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Mode Uji:</span>
                    <button
                      onClick={() => { setTestMode("full"); setTestActiveIndex(0); }}
                      className={`px-3 py-1 rounded border transition-all cursor-pointer ${
                        testMode === "full"
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold"
                          : "bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
                      }`}
                    >
                      Audit Penuh (96 Item)
                    </button>
                    <button
                      onClick={() => { setTestMode("quick"); setTestActiveIndex(0); }}
                      className={`px-3 py-1 rounded border transition-all cursor-pointer ${
                        testMode === "quick"
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold"
                          : "bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
                      }`}
                    >
                      Kalibrasi Cepat (16 Item)
                    </button>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={testFilterUnanswered}
                        onChange={(e) => { setTestFilterUnanswered(e.target.checked); setTestActiveIndex(0); }}
                        className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500"
                      />
                      Hanya tampilkan belum dijawab
                    </label>
                  </div>
                </div>
              </div>

              {/* Assessment Main Chamber */}
              {!isTestCompleted ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                  
                  {/* Left Column: Test questions taking cards */}
                  <div className="lg:col-span-8 space-y-6">
                    {testFilteredQuestions.length > 0 ? (
                      (() => {
                        const activeIndex = Math.min(testActiveIndex, testFilteredQuestions.length - 1);
                        const question = testFilteredQuestions[activeIndex];
                        const answeredVal = testAnswers[question.id];
                        const countAnswered = testActiveQuestions.filter(q => testAnswers[q.id] !== undefined).length;
                        const totalCount = testActiveQuestions.length;
                        const progressPct = Math.round((countAnswered / totalCount) * 100);

                        return (
                          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm text-left space-y-6 relative">
                            {/* Card badge & progress info */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-4">
                              <div className="flex items-center gap-2.5">
                                <span className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                                  question.element === "Ne" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" :
                                  question.element === "Ni" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                  question.element === "Se" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                }`}>
                                  ELEMEN: {question.element} — {question.channel.toUpperCase()}
                                </span>
                                <span className="text-xs text-slate-500 font-mono">Q-ID: {question.id}</span>
                              </div>
                              <span className="text-xs text-slate-400 font-mono">
                                Progres: <strong>{countAnswered}</strong> / {totalCount} dijawab ({progressPct}%)
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div
                                style={{ width: `${progressPct}%` }}
                                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                              />
                            </div>

                            {/* Scenario Context */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" /> Konteks / Skenario:
                              </span>
                              <p className="text-xs text-slate-400 italic bg-slate-950/40 p-3 rounded-lg border border-slate-900 leading-relaxed font-mono">
                                "{question.scenario}"
                              </p>
                            </div>

                            {/* Evaluation Statement */}
                            <div className="space-y-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono flex items-center gap-1.5">
                                <Scale className="w-3.5 h-3.5" /> Evaluasi Sikap Anda:
                              </span>
                              <h3 className="text-lg font-bold text-white leading-relaxed">
                                "{question.statement}"
                              </h3>
                            </div>

                            {/* Tactile Likert Inputs */}
                            <div className="space-y-4 pt-4 border-t border-slate-800/40">
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((val) => {
                                  const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"];
                                  const colorClasses = [
                                    "hover:bg-red-500/20 hover:border-red-500 text-red-400",
                                    "hover:bg-orange-500/20 hover:border-orange-500 text-orange-400",
                                    "hover:bg-slate-700/30 hover:border-slate-500 text-slate-300",
                                    "hover:bg-emerald-500/25 hover:border-emerald-500 text-emerald-400",
                                    "hover:bg-emerald-500/40 hover:border-emerald-400 text-emerald-300"
                                  ];
                                  const isActive = answeredVal === val;

                                  let activeStyle = "bg-slate-950/50 border-slate-800/80";
                                  if (isActive) {
                                    if (val === 1) activeStyle = "bg-red-500/20 border-red-500 text-red-400 font-bold shadow-lg shadow-red-500/5";
                                    else if (val === 2) activeStyle = "bg-orange-500/20 border-orange-500 text-orange-400 font-bold";
                                    else if (val === 3) activeStyle = "bg-slate-800 border-slate-500 text-slate-200 font-bold";
                                    else if (val === 4) activeStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/5";
                                    else if (val === 5) activeStyle = "bg-emerald-500/40 border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10";
                                  }

                                  return (
                                    <button
                                      key={val}
                                      onClick={() => {
                                        handleSaveAnswer(question.id, val);
                                        // Auto advance with tiny timeout for visual feedback
                                        if (activeIndex < testFilteredQuestions.length - 1) {
                                          setTimeout(() => setTestActiveIndex(idx => idx + 1), 220);
                                        }
                                      }}
                                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${activeStyle} ${colorClasses[val - 1]}`}
                                    >
                                      <span className="text-xl font-bold font-mono mb-1">{val}</span>
                                      <span className="text-[9px] uppercase tracking-wider leading-tight hidden md:inline">{labels[val - 1]}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Back / Next actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                              <button
                                disabled={activeIndex === 0}
                                onClick={() => setTestActiveIndex(idx => Math.max(0, idx - 1))}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                                  activeIndex === 0
                                    ? "bg-slate-950/10 border-slate-900/60 text-slate-600 cursor-not-allowed opacity-40"
                                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-200 cursor-pointer"
                                }`}
                              >
                                ← Sebelumnya
                              </button>

                              <button
                                onClick={handleResetTest}
                                className="px-3 py-1.5 text-[10px] font-mono text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-all cursor-pointer"
                              >
                                Setel Ulang
                              </button>

                              <button
                                disabled={activeIndex >= testFilteredQuestions.length - 1}
                                onClick={() => setTestActiveIndex(idx => Math.min(testFilteredQuestions.length - 1, idx + 1))}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                                  activeIndex >= testFilteredQuestions.length - 1
                                    ? "bg-slate-950/10 border-slate-900/60 text-slate-600 cursor-not-allowed opacity-40"
                                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-200 cursor-pointer"
                                }`}
                              >
                                Selanjutnya →
                              </button>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="p-12 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm text-center font-mono space-y-4">
                        <p className="text-slate-400 text-xs">Pilihan filter aktif menyaring seluruh pertanyaan.</p>
                        <button
                          onClick={() => { setTestFilterUnanswered(false); setTestActiveIndex(0); }}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-all cursor-pointer"
                        >
                          Lihat Seluruh Pertanyaan
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Mini Matrix Navigator */}
                  <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm text-left space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5 border-b border-slate-800/60 pb-2">
                      <Layers className="w-4 h-4 text-amber-500" /> Indeks Peta Kognitif
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                      Berikut peta sebaran butir diagnosis. Klik kotak indeks untuk langsung berpindah ke butir pertanyaan bersangkutan:
                    </p>
                    
                    {/* Tiny grid buttons */}
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
                      {testFilteredQuestions.map((q, idx) => {
                        const isAnswered = testAnswers[q.id] !== undefined;
                        const isCurrent = Math.min(testActiveIndex, testFilteredQuestions.length - 1) === idx;

                        let color = "bg-slate-950/60 text-slate-600 border-slate-900 hover:border-slate-800";
                        if (isAnswered) {
                          color = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40";
                        }
                        if (isCurrent) {
                          color = "bg-amber-500/20 text-amber-300 border-amber-500 hover:border-amber-400 font-bold scale-105 relative z-10 animate-pulse";
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setTestActiveIndex(idx)}
                            className={`p-1.5 text-[9px] rounded font-mono border text-center transition-all cursor-pointer ${color}`}
                            title={`Pertanyaan (${q.element} ${q.channel}): ${q.scenario}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-800/60 pt-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500/20 border border-emerald-500/30" /> Terisi</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500/20 border border-amber-500/30" /> Aktif</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-950/60 border border-slate-900" /> Kosong</span>
                      </div>
                    </div>

                    {/* Instant completion toggle */}
                    <div className="border-t border-slate-800/60 pt-3 flex justify-end">
                      <button
                        onClick={() => {
                          const isConfirmed = window.confirm("Apakah Anda yakin ingin melihat laporan diagnosis sementara berbasis jawaban saat ini?");
                          if (isConfirmed) {
                            setIsTestCompleted(true);
                          }
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 hover:from-emerald-500/25 hover:to-blue-500/25 text-emerald-400 font-bold rounded-lg border border-emerald-500/20 text-[11px] transition-all cursor-pointer"
                        title="Tampilkan grafik keselarasan tipe berdasarkan isian saat ini"
                      >
                        Lihat Laporan Sementara →
                      </button>
                    </div>

                  </div>

                </div>
              ) : (
                /* SECTION: COMPLETED - DETAILED DIAGNOSTIC CLINICAL INTELLIGENCE REPORT */
                <div className="space-y-8 animate-fade-in text-left">
                  
                  {/* Result Header & Best Type highlight */}
                  {(() => {
                    const best = calculatedRankings[0];
                    if (!best) return null;

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Highlights Best Match Box */}
                        <div className="lg:col-span-5 p-8 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] via-slate-900/10 to-transparent flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute right-0 top-0 text-[160px] font-extrabold text-amber-500/[0.02] leading-none pointer-events-none select-none font-sans">
                            {best.typeId}
                          </div>
                          
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-wider mb-6">
                              <Sparkles className="w-3.5 h-3.5" /> Best-Fit Congruent Type
                            </div>

                            <div className="space-y-1.5">
                              <h1 className="text-5xl font-extrabold text-white tracking-tighter shadow-sm">
                                {best.typeId}
                              </h1>
                              <p className="text-xl font-bold text-amber-400">
                                {best.profile.name}
                              </p>
                              <p className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
                                {best.profile.alias} | {best.profile.quadra} Quadra
                              </p>
                            </div>

                            {/* Congruence Match Score Badge */}
                            <div className="mt-6 inline-flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3">
                              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <Scale className="w-5 h-5 text-amber-400" />
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Matriks Keselarasan</p>
                                <p className="text-2xl font-black text-white font-mono mt-0.5">{best.score}%</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-800/60 pt-5 mt-6 flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setActiveTypeProfile(best.typeId);
                                setSelectedModelAPosition(0);
                                setActiveMainTab("modela");
                              }}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
                            >
                              <Brain className="w-4 h-4" /> Buka Model A & Roasts
                            </button>
                            <button
                              onClick={uploadDiagnosticReport}
                              disabled={driveLoading}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-800 text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              {driveLoading ? (
                                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                              ) : (
                                <Cloud className="w-4 h-4 text-emerald-400" />
                              )}
                              Upload G-Drive
                            </button>
                          </div>

                        </div>

                        {/* Critique Card */}
                        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/10 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-slate-500" /> Audit Psiko-Stresor & Kesimpulan Brutal (Critique)
                            </h3>
                            <h4 className="text-base font-bold text-white leading-relaxed">
                              "{best.profile.kesimpulanBrutal}"
                            </h4>
                            <p className="text-xs text-slate-400 bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 italic font-medium leading-relaxed font-sans">
                              <strong>Stereotipe Audit:</strong> {best.profile.stereotip}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-800/60 pt-5">
                            <div>
                              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider font-mono block mb-1.5">🚨 Tanda Bahaya (Red Flags)</span>
                              <ul className="text-[10.5px] text-slate-400 space-y-1">
                                {best.profile.redFlags.slice(0, 3).map((v, i) => <li key={i} className="flex gap-1.5 select-none"><span className="text-red-500">•</span> {v}</li>)}
                              </ul>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono block mb-1.5">✓ Keunggulan (Green Flags)</span>
                              <ul className="text-[10.5px] text-slate-400 space-y-1">
                                {best.profile.greenFlags.slice(0, 3).map((v, i) => <li key={i} className="flex gap-1.5 select-none"><span className="text-emerald-500">•</span> {v}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })()}

                  {/* Visual SVG Scorecard Chart of Irrational Elements */}
                  <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-amber-500" /> Visualisasi Distribusi Sensorik & Intuitif
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                      Grafik kustom di bawah melambangkan intensitas rata-rata isian jawaban Anda pada elemen kognitif riil (Skala Likert 1.0 - 5.0):
                    </p>

                    {/* SVG/CSS bars custom display */}
                    {(() => {
                      const computedElements = ["Ne", "Ni", "Se", "Si"];
                      const calculatedScores = computedElements.map(el => {
                        const qs = allQuestions.filter(q => q.element === el);
                        const answered = qs.filter(q => testAnswers[q.id] !== undefined);
                        const avg = answered.length > 0 
                          ? answered.reduce((sum, q) => sum + testAnswers[q.id], 0) / answered.length 
                          : 3.0;
                        return { element: el, value: avg };
                      });

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in">
                          {/* Left: Score indicators */}
                          <div className="space-y-3.5 text-left">
                            {calculatedScores.map(item => {
                              const pct = Math.round(((item.value - 1) / 4) * 100); // map scale 1-5 to 0-100%
                              let barColor = "bg-sky-500";
                              if (item.element === "Ni") barColor = "bg-purple-500";
                              else if (item.element === "Se") barColor = "bg-amber-500";
                              else if (item.element === "Si") barColor = "bg-emerald-500";

                              return (
                                <div key={item.element} className="space-y-1 font-mono">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-white">{item.element} — {
                                      item.element === "Ne" ? "Generatif Peluang" :
                                      item.element === "Ni" ? "Momentum Temporal" :
                                      item.element === "Se" ? "Penegasan Spasial" :
                                      "Homeostasis Somatik"
                                    }</span>
                                    <span className="text-slate-400">{item.value.toFixed(2)} / 5</span>
                                  </div>
                                  <div className="relative w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-900/60 p-[2px]">
                                    <div
                                      style={{ width: `${pct}%` }}
                                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                    />
                                    <span className="absolute inset-x-0 bottom-0 text-[8px] text-center text-slate-500 pointer-events-none">{pct}% Kapasitas</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Right: Explanatory Box */}
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-900 text-xs text-slate-400 space-y-2.5 font-mono text-left">
                            <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Analisis Spektrum Irrasional Anda
                            </h4>
                            <p className="leading-relaxed">
                              Sumbu intuitif (<strong className="text-sky-400">Ne</strong>/<strong className="text-purple-400">Ni</strong>) mengoordinasi cara pikiran Anda berspekulasi tentang hal di luar tatapan fisik (hipotesis fungsional maupun prognosis temporal).
                            </p>
                            <p className="leading-relaxed">
                              Sumbu sensorik (<strong className="text-amber-400">Se</strong>/<strong className="text-emerald-400">Si</strong>) meregulasi cara Anda mengerahkan dorongan fisik (taktis dominasi ruang maupun kenyamanan homeostasis metabolisme jasmani).
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Complete 16 Type Spectrum Rankings list */}
                  <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-400" /> Spektrum Seluruh 16 Tipe Socionics
                      </h3>
                      <button
                        onClick={handleResetTest}
                        className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/5 hover:border-red-500/40 border border-transparent rounded-lg font-bold transition-all cursor-pointer"
                      >
                        Atur Ulang Tes (Uji Kembali)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                      {calculatedRankings.map((rank) => {
                        const isTop = rank.typeId === calculatedRankings[0].typeId;

                        return (
                          <div
                            key={rank.typeId}
                            onClick={() => {
                              setActiveTypeProfile(rank.typeId);
                              setSelectedModelAPosition(0);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-[90px] ${
                              activeTypeProfile === rank.typeId
                                ? "bg-slate-800 border-amber-500/60 text-amber-300 ring-2 ring-amber-500/10 scale-[1.03]"
                                : isTop
                                ? "bg-amber-500/[0.03] border-amber-500/20 text-slate-300 hover:border-amber-500/40"
                                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                            }`}
                          >
                            <span className="text-[9px] font-mono text-slate-500 block uppercase leading-none">{rank.profile.quadra} Q</span>
                            <div className="my-1.5">
                              <span className="font-extrabold text-white text-sm block font-sans">{rank.typeId}</span>
                              <span className="text-[9px] text-slate-500 block font-mono truncate">{rank.profile.ego}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-800/40 pt-1 text-[10.5px] font-mono">
                              <span className="text-[9px] font-normal text-slate-500 font-mono">Kesesuaian</span>
                              <span className="font-bold text-white leading-none mt-0.5">{rank.score}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 1: ORIGINAL 96 QUESTIONS EXPLORER */}
          {activeMainTab === "explorer" && (
            <motion.div
              key="explorer-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4 space-y-6">
                
                {/* Search Panel */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4 text-left">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-400" /> Pencarian Universal
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari kata kunci scenario, statement..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all duration-200"
                    />
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* Filter Panel */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-5 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Filter Parameter
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-[10px] text-slate-500 hover:text-red-400 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      Reset All
                    </button>
                  </div>

                  {/* Element filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-mono">Elemen Kognitif</label>
                    <div className="flex flex-wrap gap-1.5">
                      {elementsList.map((el) => (
                        <button
                          key={el}
                          onClick={() => setSelectedElement(el)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all duration-200 cursor-pointer ${
                            selectedElement === el
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold"
                              : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                          }`}
                        >
                          {el}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Canal filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-mono">Saluran Kuesioner</label>
                    <select
                      value={selectedChannel}
                      onChange={(e) => setSelectedChannel(e.target.value as ChannelType | "ALL")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      {channelsList.map((chan) => (
                        <option key={chan} value={chan}>
                          {chan === "ALL" ? "SEMUA SALURAN (ALL)" : chan}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Context filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-mono">Konteks Latar Situasi</label>
                    <select
                      value={selectedContext}
                      onChange={(e) => setSelectedContext(e.target.value as ContextKey | "ALL")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      {contextsList.map((ctx) => (
                        <option key={ctx} value={ctx}>
                          {ctx === "ALL" ? "SEMUA KONTEKS (ALL)" : ctx.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Info Card */}
                {selectedElement !== "ALL" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-5 rounded-2xl border text-left ${elementDetails[selectedElement as ElementType].color}`}
                  >
                    <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                      {(() => {
                        const IconComponent = elementDetails[selectedElement as ElementType].icon;
                        return <IconComponent className="w-5 h-5 shrink-0" />;
                      })()}
                      <span>{elementDetails[selectedElement as ElementType].title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {elementDetails[selectedElement as ElementType].desc}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Questions Stream list */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Menampilkan {filteredQuestions.length} dari {allQuestions.length} Questions
                  </span>
                  <span className="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-mono">
                    Calibration: uncalibrated
                  </span>
                </div>

                {filteredQuestions.length === 0 && (
                  <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
                    <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium font-mono text-xs">Tidak ada pertanyaan yang sesuai filter</p>
                    <button onClick={resetFilters} className="mt-2 text-xs text-emerald-400 font-semibold underline hover:text-emerald-300 cursor-pointer">
                      Reset Filter Pencarian
                    </button>
                  </div>
                )}

                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredQuestions.map((q) => {
                    const elColor = q.element === "Si" ? "bg-emerald-500" : q.element === "Se" ? "bg-amber-400" : q.element === "Ne" ? "bg-sky-400" : "bg-purple-400";
                    const isSelected = selectedQuestion?.id === q.id;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-xl border transition-all duration-200 text-left ${
                          isSelected
                            ? "border-emerald-500 bg-slate-900/60 shadow-lg"
                            : "bg-slate-900/20 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${elColor}`} />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                              {q.id.toUpperCase()}
                            </span>
                            <span className="text-[10px] bg-slate-950 border border-slate-800/85 text-slate-400 px-2 py-0.5 rounded font-mono">
                              {q.context.replace("_", " ")}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 text-[9px] font-mono font-medium rounded-full ${channelBadges[q.channel]}`}>
                            {q.channel}
                          </span>
                        </div>

                        <div className="mb-3 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40 italic font-mono leading-relaxed">
                          "{q.scenario}"
                        </div>

                        <div className="text-xs font-semibold text-white leading-relaxed mb-4 pl-1">
                          {q.statement}
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/45 pt-3">
                          <div className="flex flex-wrap gap-1">
                            {q.evidenceTags.map((tag) => (
                              <span key={tag} className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-805">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => setSelectedQuestion(isSelected ? null : q)}
                            className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer"
                          >
                            {isSelected ? "Tutup Detil" : "Klik Detil Metadata"}
                          </button>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-slate-800/85 text-[10px] font-mono grid grid-cols-2 gap-3 text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                          >
                            <div>
                              <span className="text-slate-500">Elemen Semotik:</span> <span className="text-emerald-400 font-bold">{q.element}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Scale Type:</span> <span>{q.scaleType}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Versi Konten:</span> <span>v{q.contentVersion}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Uji Jaccard:</span> <span className="text-emerald-400 font-bold">Lolos (&lt; 0.20)</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-slate-500">Kesesuaian Karakter:</span> <span className="text-slate-300 font-bold">Anti- MBTI trait contamination</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: MODEL A & TYPE PROFILE NAVIGATOR */}
          {activeMainTab === "modela" && (
            <motion.div
              key="modela-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Sidebar selections of the 16 types */}
              <div className="lg:col-span-3 space-y-4 text-left">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5 font-mono">
                    <User className="w-4 h-4 text-emerald-400" /> Pilih Tipe Socionics
                  </h3>
                  
                  {/* Visual selector stack */}
                  <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 nav-scrollbar">
                    {socionicsRoasts.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => {
                          setActiveTypeProfile(profile.id);
                          setSelectedModelAPosition(0);
                        }}
                        className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                          activeTypeProfile === profile.id
                            ? "bg-slate-800/80 border-emerald-500/50 text-emerald-400 font-bold"
                            : "bg-slate-950/20 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{profile.id}</span>
                          <span className="text-[10px] text-slate-500 font-normal ">{profile.ego} ({profile.quadra})</span>
                        </div>
                        <span className="text-[10px] bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded font-mono text-slate-500">
                          {profile.quadra}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audit anti-slop warning */}
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs leading-relaxed font-mono">
                  <div className="flex items-center gap-1 mb-1 font-bold">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    ANTI-SLOP WARPING
                  </div>
                  Informasi karakter merupakan kebiasaan kognitif ekstrem yang dideformasi untuk keperluan deteksi stresor, bukan deskripsi mutlak watak manusia nyata.
                </div>
              </div>

              {/* Main Profile Info and model A display */}
              <div className="lg:col-span-9 space-y-6 text-left">
                
                {/* Profile Header card */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20 relative">
                  <div className="absolute top-4 right-4 text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg">
                    {selectedProfile.quadra} Quadra
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                    {selectedProfile.name}
                  </h2>
                  <p className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                    {selectedProfile.alias} | Ego block: {selectedProfile.ego}
                  </p>
                  
                  <div className="text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/60 pt-3">
                    <strong>Stereotipe:</strong> {selectedProfile.stereotip}
                  </div>
                </div>

                {/* Model A cognitive map grid generator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Model A layout block */}
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                      <Brain className="w-4 h-4 text-emerald-400" /> Model A Arsitektur kognitif ({selectedProfile.id})
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Klik salah satu dari 4 posisi fungsi irrasional (<strong>Ne, Ni, Se, Si</strong>) untuk menyaring kuesioner kognitif bersangkutan langsung dari bank data!
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {selectedModelAElements.map((element, idx) => {
                        const channel = CHANNELS_IN_ORDER[idx];
                        const isSelected = selectedModelAPosition === idx; 
                        const isIrrational = ["Ne", "Ni", "Se", "Si"].includes(element);

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isIrrational) {
                                setSelectedModelAPosition(idx);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? "bg-emerald-500/15 border-emerald-500 text-emerald-300 scale-[1.02]"
                                : isIrrational
                                ? "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/30"
                                : "bg-slate-950/10 border-slate-900/40 text-slate-600 cursor-not-allowed opacity-50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-slate-500">F{idx + 1}</span>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded ${
                                isIrrational 
                                  ? "bg-slate-900 text-emerald-400" 
                                  : "bg-slate-950 text-slate-700"
                              }`}>
                                {isIrrational ? "Irrasional" : "Rasional"}
                              </span>
                            </div>
                            <div className="font-bold text-sm flex items-center gap-1">
                              <span className={isIrrational ? "text-white" : "text-slate-600"}>{element}</span>
                              <span className="text-[10px] font-normal text-slate-500">({channel})</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Character Behavior card */}
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Sifat harian & Aura
                    </h3>
                    <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                      <div>
                        <span className="font-bold block text-emerald-400 font-mono">Aura dalam Ruangan:</span>
                        <span>{selectedProfile.aura}</span>
                      </div>
                      <div className="border-t border-slate-800/50 pt-3">
                        <span className="font-bold block text-emerald-400 font-mono">Cara Berbicara & Kalimat Khas:</span>
                        <span>{selectedProfile.bicara}</span>
                        <div className="mt-1.5 space-y-1 pl-2 border-l border-emerald-500/30 italic text-slate-400">
                          {selectedProfile.kalimatKhas.map((k, i) => (
                            <div key={i}>"{k}"</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Filtered questions linked from database */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                    <Layers className="w-4 h-4 text-emerald-400" /> Linked Question Bank Markers ({selectedPositionQuestions.length} Items)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Berikut adalah 3 item khusus dari bank data 96-pertanyaan yang mengukur manifestasi <strong>{selectedModelAElements[selectedModelAPosition || 0]}</strong> pada fungsional posisi <strong>{selectedModelAPosition !== null ? CHANNEL_LABELS[CHANNELS_IN_ORDER[selectedModelAPosition]] : ""}</strong> tipe Anda:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPositionQuestions.map((q) => (
                      <div key={q.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold block mb-1">{q.id.toUpperCase()} • {q.element}</span>
                          <span className="text-[10px] italic text-slate-400 font-mono block mb-2 leading-relaxed">"{q.scenario}"</span>
                          <span className="text-xs text-slate-200 font-medium leading-relaxed block">{q.statement}</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-805/45 text-[9px] font-mono text-slate-500">
                          Tags: #{q.evidenceTags.join(", #")}
                        </div>
                      </div>
                    ))}
                    {selectedPositionQuestions.length === 0 && (
                      <div className="col-span-3 py-6 text-center text-xs text-slate-500 font-mono italic">
                        Tidak ada pertanyaan. Harap pilih fungsi Irrasional (yaitu Ne, Ni, Se, atau Si) di diagram Model A di atas.
                      </div>
                    )}
                  </div>
                </div>

                {/* Behavioral Details Tabs */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-400 mb-2 font-mono flex items-center gap-1.5">
                        <ArrowRight className="w-4 h-4" /> 5 Kebiasaan Klasik
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 font-mono">
                        {selectedProfile.kebiasaan.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-emerald-400 mb-2 font-mono flex items-center gap-1.5">
                        <ArrowRight className="w-4 h-4" /> Isi Kepala yang Tak Diucapkan
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 font-mono">
                        {selectedProfile.isiKepala.map((k, i) => (
                          <li key={i}>"{k}"</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <hr className="border-slate-800/60" />

                  {/* Danger and green indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5">
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-400" /> 4 Red Flags Perilaku
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                        {selectedProfile.redFlags.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> 4 Green Flags Potensial
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                        {selectedProfile.greenFlags.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <hr className="border-slate-800/60" />

                  {/* Love, Lie and Anger policies */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/30">
                      <span className="font-bold text-emerald-400 block mb-1 font-mono">Eskalasi Amarah:</span>
                      <span className="text-slate-300 font-sans">{selectedProfile.caraMarah}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/30">
                      <span className="font-bold text-purple-400 block mb-1 font-mono">Kebijakan Bersosialisasi & Kasih:</span>
                      <span className="text-slate-300 font-sans">{selectedProfile.menyukai}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/30">
                      <span className="font-bold text-amber-500 block mb-1 font-mono">Mekanisme Defensi & Bohong:</span>
                      <span className="text-slate-300 font-sans">{selectedProfile.berbohong}</span>
                    </div>
                  </div>

                  <hr className="border-slate-800/60" />

                  {/* 3 Contradictions & Brutal Roasts */}
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-4">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-emerald-400" /> 3 Kontradiksi Terbesar (Inkonsistensi Sistemik)
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Analisis kontradiksi batiniah menguji persilangan fungsional Model A di mana satu sirkuit kognitif bentrok secara struktural dengan sirkuit lainnya:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedProfile.kontradiksi.map((k, i) => (
                        <div key={i} className="p-3 rounded-lg border border-slate-900 bg-slate-900/10 font-mono text-[11px] text-slate-300 text-left">
                          <span className="text-emerald-400 font-bold block mb-1">Kontradiksi #{i+1}</span>
                          {k}
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-900 pt-4 text-center">
                      <span className="text-[11px] uppercase tracking-widest text-red-400/90 font-bold font-mono block mb-2">CRITICAL ROAST & SUMMARY</span>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mx-auto italic font-mono mb-2">
                        "{selectedProfile.roastShort}"
                      </p>
                      <p className="text-sm font-bold text-red-400/95 font-sans leading-relaxed">
                        {selectedProfile.kesimpulanBrutal}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* SCREEN 3: ALGEBRAIC INTERTYPE MATRIX RELATION CALCULATOR */}
          {activeMainTab === "math" && (
            <motion.div
              key="math-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4 space-y-6 text-left">
                
                {/* Selector block */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4 font-mono">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase">
                    <Calculator className="w-4 h-4 text-emerald-400" /> Pemilih Relasi
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sistem akan menghitung koefisien fungsi aljabar relasi kalian pada lintasan grup simetri D4 x Z2.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Tipe Anda (Ego Base):</label>
                      <select
                        value={relationSourceType}
                        onChange={(e) => setRelationSourceType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none cursor-pointer"
                      >
                        {ALL_16_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-center py-1">
                      <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">
                        vs
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Tipe Rekan / Partner:</label>
                      <select
                        value={relationTargetType}
                        onChange={(e) => setRelationTargetType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none cursor-pointer"
                      >
                        {ALL_16_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Symmetrical subgroup constraints indicator */}
                <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs leading-relaxed font-mono space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-purple-400">
                    <Scale className="w-4 h-4" /> ALGEBRA PROPERTIES
                  </div>
                  <div>
                    <span className="font-bold">Grup R ≅ D4 × Z2:</span> Hubungan asimetris (Supervisi & Benefactor) memiliki order aljabar <strong className="text-purple-400">Order 4</strong>. Hubungan simetris memiliki <strong className="text-purple-400">Order 2</strong> (atau Order 1 untuk identitas).
                  </div>
                </div>

              </div>

              {/* Math Result Panel */}
              <div className="lg:col-span-8 space-y-6 text-left">
                
                {/* Result main metrics header */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <span className="text-xs font-mono text-slate-400">ALGEBRAIC RESULT</span>
                    <span className={`px-3 py-1 text-xs border rounded-full font-mono font-bold uppercase ${getCompatibilityColor(computedRelation.compatibilityScore)}`}>
                      Compatibility Score: {computedRelation.compatibilityScore}%
                    </span>
                  </div>

                  <h3 className="text-3xl font-extrabold text-white mb-1.5">
                    {computedRelation.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-800/60 my-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block">Algebraic Symbol:</span>
                      <span className="text-sm font-bold text-emerald-400">r = {computedRelation.algebraicSymbol}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Symmetry Order:</span>
                      <span className="text-sm font-bold text-white">Order {computedRelation.order}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Base Type Area:</span>
                      <span className="text-sm font-bold text-purple-400">{relationSourceType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Partner Type Area:</span>
                      <span className="text-sm font-bold text-purple-400">{relationTargetType}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans pt-2">
                    <strong>Dinamika Hubungan:</strong> {computedRelation.desc}
                  </p>
                </div>

                {/* Side-by-Side Green & Red Flags Synergy Compare */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Source Type Flag Card */}
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">TIPE ANDA</span>
                        <h4 className="text-base font-bold text-white font-sans">{sourceProfile.name}</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                        {sourceProfile.quadra} Quadra
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">"{sourceProfile.alias}"</p>

                    <div className="space-y-3 pt-1">
                      <div>
                        <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> 4 Green Flags Potensial
                        </h5>
                        <ul className="text-[10.5px] text-slate-300 space-y-1 list-disc pl-4 font-mono mt-1">
                          {sourceProfile.greenFlags.map((flag, id) => (
                            <li key={id}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-red-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> 4 Red Flags Perilaku
                        </h5>
                        <ul className="text-[10.5px] text-slate-300 space-y-1 list-disc pl-4 font-mono mt-1">
                          {sourceProfile.redFlags.map((flag, id) => (
                            <li key={id}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Target Type Flag Card */}
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-wider font-mono">TIPE REKAN</span>
                        <h4 className="text-base font-bold text-white font-sans">{targetProfile.name}</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                        {targetProfile.quadra} Quadra
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">"{targetProfile.alias}"</p>

                    <div className="space-y-3 pt-1">
                      <div>
                        <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> 4 Green Flags Potensial
                        </h5>
                        <ul className="text-[10.5px] text-slate-300 space-y-1 list-disc pl-4 font-mono mt-1">
                          {targetProfile.greenFlags.map((flag, id) => (
                            <li key={id}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-red-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> 4 Red Flags Perilaku
                        </h5>
                        <ul className="text-[10.5px] text-slate-300 space-y-1 list-disc pl-4 font-mono mt-1">
                          {targetProfile.redFlags.map((flag, id) => (
                            <li key={id}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Symmetrical Subgroups details from Tencer book */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-4 h-4 text-emerald-400" /> Analisis Geometris Symmetries & Reinin (Tencer reference Book)
                  </h3>
                  <div className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/70 p-4 rounded-xl border border-slate-900 space-y-3">
                    <p>
                      Berdasarkan formula Ibrahim Tencer, jika tipe aslinya $t$ diklasifikasi sebagai kuadrat dua simetri (yaitu mental loop dan vital loop yang ditransformasikan secara berputar), relasi kognitif ($r(t)$) dapat didefinisikan sebagai permutasi grup simetris.
                    </p>
                    <div className="border-t border-slate-800/80 pt-3">
                      <span className="font-bold text-emerald-400 block mb-1">ANALISIS GEOMETRIS MATRIKS ({relationSourceType} vs {relationTargetType}):</span>
                      {computedRelation.order === 1 && (
                        <p className="text-slate-300 text-[11px]">
                          - Menggunakan subgroup order 1, relasi ini melambangkan <strong>Identitas Sempurna</strong> ($e$) di mana mental loop dan sirkuit tindakan kalian berjalan pada trek yang sama persis tanpa deviasi fasa.
                        </p>
                      )}
                      {computedRelation.order === 2 && (
                        <p className="text-slate-300 text-[11px]">
                          - Menggunakan subgroup order 2, relasi ini melambangkan keselarasan simetris dengan pertukaran timbal-balik setara. Sirkuit kognitif <strong>{computedRelation.name}</strong> memungkinkan transfer energi dualistik dua arah tanpa hambatan rotasi sudut fasa kognitif.
                        </p>
                      )}
                      {computedRelation.order === 4 && (
                        <p className="text-slate-300 text-[11px]">
                          - Menggunakan subgroup asimetris transisional <strong>Order 4</strong> (Supervisi atau Benefit), sirkuit kognitif berputar 90 derajat, menyiratkan adanya transfer potensi searah yang membatasi timbal-balik setara dan menciptakan asimetri fungsional inheren.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* SCREEN 4: AUDITS AND COMPLIANCE REPORTS */}
          {activeMainTab === "audits" && (
            <motion.div
              key="audits-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 w-full text-left"
            >
              {/* Dynamic Selector Header Bar */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white font-sans flex items-center gap-1.5">
                    <Shield className="w-5 h-5 text-emerald-400" /> Laboratorium Penjaminan Mutu & Audit
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5 leading-relaxed">
                    Pemeriksaan lintang semantik, korelasi batas eksklusif, dan item kuesioner kognitif teoretis untuk 96 instrumen Model A.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
                  {(["Ne", "Ni", "Se", "Si"] as const).map((el) => (
                    <button
                      key={el}
                      onClick={() => setSelectedAuditElement(el)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        selectedAuditElement === el
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                      }`}
                    >
                      {el} Element
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-4 text-left">
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                    <Shield className="w-4 h-4 text-emerald-400" /> Penjaminan Mutu Berkas
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Semua berkas disusun secara formal untuk mendukung pipeline CI/CD audit dari Model A Socionics secara berkala.
                  </p>
                  <div className="space-y-2 border-t border-slate-800/85 pt-3 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                      <span className="text-slate-450 font-semibold text-slate-400">ne.ts Question Bank</span>
                      <span className="text-emerald-400 font-bold">Exist (24)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                      <span className="text-slate-450 font-semibold text-slate-400">ni.ts Question Bank</span>
                      <span className="text-emerald-400 font-bold">Exist (24)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                      <span className="text-slate-450 font-semibold text-slate-400">se.ts Question Bank</span>
                      <span className="text-emerald-400 font-bold">Exist (24)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-emerald-500/5 border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold">si.ts Question Bank</span>
                      <span className="text-emerald-400 font-bold">Rebuilt (24)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-500/5 border border-blue-500/20">
                      <span className="text-blue-400 font-bold">roasts.ts Profiles</span>
                      <span className="text-blue-400 font-bold">Exist (16)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-805 bg-slate-900/30 backdrop-blur-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Kategori Laporan Audit
                  </h4>
                  <div className="space-y-1.5 font-sans">
                    <button
                      onClick={() => setActiveAuditTab("semantik")}
                      className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeAuditTab === "semantik"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                          : "bg-slate-950/40 border-slate-900/60 text-slate-450 hover:text-slate-300 hover:bg-slate-900/30 text-slate-450"
                      }`}
                    >
                      <span>Anti-Stereotip ({selectedAuditElement})</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                    <button
                      onClick={() => setActiveAuditTab("batas")}
                      className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeAuditTab === "batas"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                          : "bg-slate-950/40 border-slate-900/60 text-slate-450 hover:text-slate-300 hover:bg-slate-900/30 text-slate-450"
                      }`}
                    >
                      <span>Boundary ({selectedAuditElement} dkk)</span>
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                    <button
                      onClick={() => setActiveAuditTab("konten")}
                      className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeAuditTab === "konten"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                          : "bg-slate-950/40 border-slate-900/60 text-slate-450 hover:text-slate-300 hover:bg-slate-900/30 text-slate-450"
                      }`}
                    >
                      <span>Tabel Item {selectedAuditElement}</span>
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                    <button
                      onClick={() => setActiveAuditTab("math")}
                      className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeAuditTab === "math"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                          : "bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-slate-300 hover:bg-slate-900/30 text-slate-455"
                      }`}
                    >
                      <span>Kesesuaian Symmetries</span>
                      <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reports block details view */}
              <div className="lg:col-span-8 flex flex-col space-y-6 text-left">
                
                <AnimatePresence mode="wait">
                  {activeAuditTab === "semantik" && (
                    <motion.div
                      key="semantik"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4"
                    >
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" /> Laporan Audit Semantik & Anti-Stereotip ({selectedAuditElement})
                      </h2>
                      <div className="text-xs text-slate-300 leading-relaxed space-y-4 font-mono bg-slate-950/80 p-5 rounded-xl border border-slate-805">
                        <div>
                          <p className="font-semibold text-emerald-400 text-sm mb-1 uppercase">1. Penilaian Stereotip Jauh (Anti-Slop / Anti-Bias)</p>
                          <p className="text-slate-404 text-slate-400 text-[11px] leading-relaxed">
                            {selectedAuditElement === "Si" && (
                              "Si pada iterasi ini menguji kepekaan sirkadian tubuh terhadap rangsangan fisik nyata di masa sekarang. Kita membuang total stereotip 'suka makanan premium', 'malas bekerja', atau 'suka tidur'. Unsur fisik diuji dalam sirkulasi AC, posisi ketebalan baju, posisi keyboard laptop, lampu bercahaya redup, debu, kram bantal keras, dsb."
                            )}
                            {selectedAuditElement === "Ne" && (
                              "Ne dibangun atas dasar eksplorasi kemungkinan konsep murni dan pola abstrak lateral. Kita melerai stereotip klasik Ne seperti 'pelawak sarkas' atau 'pencipta kekacauan sosial'. Ne diuji pada kemahiran merumuskan skenario alternatif dari kegagalan rencana, melihat keterkaitan antar-bidang, dan mengembalikan momentum diskusi konseptual."
                            )}
                            {selectedAuditElement === "Ni" && (
                              "Ni dievaluasikan sebagai prognosis temporal kronologis dan tren perkembangan. Memotong stereotip 'cenayang gaib' atau 'peramal takhayul'. Fokus batin dialokasikan pada pembacaan momentum kemunduran kelompok, deteksi siklus sejarah, dan penundaan respons demi efektivitas waktu."
                            )}
                            {selectedAuditElement === "Se" && (
                              "Se murni dievaluasi sebagai mobilisasi psikologis fisik, ketegasan teritorial, pertahanan kedaulatan ruang, dan respon langsung hambatan nyata. Terbebas dari stereotip 'kekerasan fisik brutal' atau 'perundung sosial'. Se diuji dalam perlindungan ruang tim, pendorongan tenaga tumpuan, dan pengambilalihan kendali saat krisis."
                            )}
                          </p>
                        </div>
                        <div className="border-t border-slate-850 pt-4">
                          <p className="font-semibold text-emerald-400 text-sm mb-1 uppercase">2. Analisis Token Similarity & Jaccard Overlap</p>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            {selectedAuditElement === "Si" && (
                              "Uji kemiripan karakter kosinus n-gram dan Jaccard index memastikan skor tumpang tindih batin dari 24 item berada di bawah ambang batas bahaya (<0.25). Setiap skenario menceritakan relis-relis latar berbeda (Aula sekolah, kereta api miring, bus ekonomi luar kota, malam sendirian, dsb) untuk mencegah fiksasi kontekstual yang berulang."
                            )}
                            {selectedAuditElement === "Ne" && (
                              "Mencegah perulangan kata kerja penciptaan ide. Menjamin ketiadaan token yang tumpang tindih antara item Ne dengan Se, menjaga kemurnian imajinasi konseptual terpencil dari eksekusi fisik."
                            )}
                            {selectedAuditElement === "Ni" && (
                              "Mengamankan pemisahan dari aktivitas menunggu pasif (laziness). Item Ni diikat dengan tag konsekuensi kronologis aktif kognitif, bukan sekadar penundaan tanpa maksud."
                            )}
                            {selectedAuditElement === "Se" && (
                              "Menghindari kontaminasi dengan unsur keangkuhan lisan semata. Hubungan Se diluruskan agar memiliki korelasi langsung menuju respon motorik sponelemental dan penolakan intrusi secara instan."
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeAuditTab === "batas" && (
                    <motion.div
                      key="batas"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4"
                    >
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-400" /> Laporan Batas (Boundary) Audit: {selectedAuditElement} vs Elemen Lain
                      </h2>
                      <div className="text-xs text-slate-300 leading-relaxed space-y-4 font-mono bg-slate-950/80 p-5 rounded-xl border border-slate-805">
                        {selectedAuditElement === "Si" && (
                          <>
                            <div>
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Si vs Se (Homeostasis vs Teritorial)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Si fokus pada penyetelan keseimbangan metabolisme organ tubuh (kipas angin di AC pengap). Se fokus pada perlindungan wilayah berdaulat fisik (menolak area duduk digusur paksa).
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Si vs Ni (Somatik Sekarang vs Prognosis Temporal)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Si mengukur fluktuasi kepenatan jasmani masa kini. Ni mengukur visualisasi momentum logis dan arah siklus beberapa tahun ke depan tanpa melerai keletihan otot sirkadian.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Si vs Te (Keseimbangan Homeostasis vs Efisiensi Hasil)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Si menyetel sudut layar komputer agar leher tidak tegang. Te merancang Standard Operating Procedure agar kecepatan perakitan produk melesat drastis mereduksi biaya modal.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Si vs Ti (Estetika Sensasi vs Logika Struktural)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Si menata mebel agar sirkulasi nafas lega dan gerakan tubuh nyaman tanpa menderita lecet. Ti membagi berkas arsip menurut kriteria alfabetis taat aturan tak peduli kenyamanan sensorik.
                              </span>
                            </div>
                          </>
                        )}
                        {selectedAuditElement === "Ne" && (
                          <>
                            <div>
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ne vs Ni (Divergent Expansion vs Convergent Evolution)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ne membuka banyak jalan alternatif yang bercabang-cabang dari satu situasi nyata. Ni melacak rantai sebab-akibat tunggal yang mendalam untuk meramalkan titik klimaks tunggal.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ne vs Se (Alternative Possibilities vs Direct Kinetic Force)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ne mendekati tantangan dengan kiasan konseptual atau ide out-of-the-box. Se mendobrak rintangan fisik secara nyata dan menolak kompromi spasial.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ne vs Te (Exploration of Ideas vs Productivity Output)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ne mencari keunikan sudut pandang demi kepuasan belajar intelektual. Te memilah opsi tercepat yang mendatangkan keuntungan finansial tertinggi secara kuantitatif.
                              </span>
                            </div>
                          </>
                        )}
                        {selectedAuditElement === "Ni" && (
                          <>
                            <div>
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ni vs Ne (Convergent Prognosis vs Lateral Divergence)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ni melihat ke depan pada satu alur konsekuensi akhir. Ne memperluas opsi ke samping, menawarkan lima rute kemungkinan baru.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ni vs Se (Passive Timing Observer vs Instant Somatic Action)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ni menahan diri untuk tidak bertindak demi kelancaran momentum. Se segera bertindak di tempat kejadian perkara menggunakan kehadiran fisik berwibawa.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Ni vs Si (Temporal Cause-Effect vs Present Body Homeostasis)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Ni mengamati perubahan makro seiring waktu. Si menyetel AC, pakaian, pola napas, dan ketegangan otot tubuh di detik ini.
                              </span>
                            </div>
                          </>
                        )}
                        {selectedAuditElement === "Se" && (
                          <>
                            <div>
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Se vs Si (Territorial Boundary vs Somatic Ease)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Se menegakkan batas fisik, mempertahankan hak ruang tinggal tim, dan mengatasi gangguan taktis. Si menyesuaikan kelembutan tempat tidur, peredaman kebisingan ventilasi, dan regulasi sirkadian.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Se vs Ne (Direct Force Execution vs Lateral Alternative Ideation)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Se merespons konflik lewat konfrontasi frontal seketika. Ne memitigasi gesekan lewat humor konseptual atau rebingkai situasi secara abstrak.
                              </span>
                            </div>
                            <div className="border-t border-slate-850 pt-3 font-mono">
                              <span className="text-emerald-400 font-bold block text-sm mb-1">Se vs Te (Somatic Pressure vs Systematic Standardization)</span>
                              <span className="text-slate-400 text-[11px] leading-relaxed block">
                                Se memakai tekanan langsung atau kehadiran fisik agar pihak lain tunduk. Te menyusun kriteria audit logis yang transparan demi optimalisasi produksi pabrik.
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeAuditTab === "konten" && (
                    <motion.div
                      key="konten"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4 w-full text-left"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 font-sans">
                          <Layers className="w-5 h-5 text-emerald-400" /> Pemeriksaan Item & Pertanyaan ({selectedAuditElement})
                        </h2>
                      </div>
                      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/80">
                        <table className="w-full text-left border-collapse font-mono text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-450">
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">ID</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Channel</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Konteks</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Skenario Naratif</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Pernyataan Evaluasi</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Bukti (Tags)</th>
                              <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-slate-400">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900/85">
                            {allQuestions
                              .filter((q) => q.element === selectedAuditElement)
                              .map((q) => (
                                <tr key={q.id} className="hover:bg-slate-900/30 transition-colors text-slate-300">
                                  <td className="p-3 font-bold text-emerald-400">{q.id.toUpperCase()}</td>
                                  <td className="p-3 text-slate-400 capitalize">{q.channel}</td>
                                  <td className="p-3 text-slate-400">{q.context.replace("_", " ")}</td>
                                  <td className="p-3 font-medium text-slate-400 italic">"{q.scenario}"</td>
                                  <td className="p-3 font-semibold text-slate-200">{q.statement}</td>
                                  <td className="p-3 text-purple-400">#{q.evidenceTags.join(", #")}</td>
                                  <td className="p-3">
                                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold text-[9px] uppercase">
                                      PASSED
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {activeAuditTab === "math" && (
                    <motion.div
                      key="math-audit"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4"
                    >
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" /> Audit Struktur Symmetries & Ratusan Kontradiksi Sistemik
                      </h2>
                      <div className="text-xs text-slate-300 leading-relaxed space-y-4 font-mono bg-slate-950/80 p-5 rounded-xl border border-slate-805">
                        <div>
                          <p className="font-semibold text-emerald-400 text-sm mb-1 uppercase">1. Pengisolasian Karakter vs. Aksi Grup Symmetrical</p>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            Kebanyakan pengujian psikometri menderita bias di mana elemen dikuantifikasi secara linier independen. Melalui Tencer paper, terbukti bahwa type kognitif adalah <strong>orbit</strong> dari grup D4 x Z2. Kuesioner kognitif ini berhasil menyelaraskan 12 penanda irrasional per tipe dengan mengaitkan elemen kognitif riil kepada posisi fungsional aslinya di Model A. All 16 rumus intertype relasi kini ditangani secara matematis melalui pemetaan koordinat posisi biner dualitas yang presisi bebas anomalitas.
                          </p>
                        </div>
                        <div className="border-t border-slate-850 pt-4">
                          <p className="font-semibold text-emerald-400 text-sm mb-1 uppercase">2. Kebuntuan Gender vs. Homeostasis Murni</p>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            Mereduksi elemen fisik Si kepada peran domestik wanita adalah bias sosial non-ilmiah (MBTI trait contamination). Si Rebuild Tahap 03D menyelesaikan kontradiksi ini dengan menguji homeostasis metabolisme murni (Fine-Tuning pencahayaan, kram somatik, getaran AC bising), merengkuh kesetaraan taktis netral bagi seluruh manusia.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> {/* Close lg:col-span-8 */}
            </div>   {/* Close grid */}
          </motion.div>
        )}

          {/* SCREEN 5: GOOGLE DRIVE INTEGRATION & SYNC MANAGER */}
          {activeMainTab === "drive" && (
            <motion.div
              key="drive-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left font-sans"
            >
              {/* Left Column: OAuth credentials & account control */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Connection Status Box */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono">
                      <Cloud className="w-4 h-4 text-emerald-400" /> Koneksi G-Drive
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      driveAccessToken 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-slate-950 text-slate-500 border border-slate-800"
                    }`}>
                      {driveAccessToken ? "TERHUBUNG" : "TERPUTUS"}
                    </span>
                  </div>

                  {/* Auth Interface */}
                  {!driveAccessToken ? (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed font-mono font-medium">
                        Hubungkan dasbor Socionics Anda ke akun penyimpanan awan Google Drive pribadi untuk menikmati pencadangan data instan & pengunggahan laporan riset.
                      </p>

                      <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">
                            Google Client Credentials ID:
                          </label>
                          <input
                            id="drive-client-id-input"
                            type="text"
                            value={driveClientId}
                            onChange={(e) => setDriveClientId(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none focus:border-emerald-500 font-mono tracking-tight"
                            placeholder="Masukkan Client ID Anda..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            id="btn-save-client-id"
                            onClick={() => handleSaveClientId(driveClientId)}
                            className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 text-[10px] font-bold text-emerald-400 rounded-lg transition-all font-mono border border-slate-700 cursor-pointer"
                          >
                            Simpan Client ID
                          </button>
                        </div>
                      </div>

                      <button
                        id="btn-connect-gdrive"
                        onClick={initiateDriveAuth}
                        disabled={driveLoading}
                        className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-550 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/5 justify-center leading-none"
                      >
                        {driveLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        ) : (
                          <Cloud className="w-4 h-4 shrink-0" />
                        )}
                        <span>Hubungkan Akun Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Authorized user profile display */}
                      {authUserInfo && (
                        <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                          {authUserInfo.picture ? (
                            <img
                              referrerPolicy="no-referrer"
                              src={authUserInfo.picture}
                              alt="Profile User"
                              className="w-10 h-10 rounded-full border border-emerald-500/20"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm select-none">
                              {authUserInfo.name ? authUserInfo.name[0] : "G"}
                            </div>
                          )}
                          <div className="text-left">
                            <h4 className="text-xs font-bold text-slate-250 text-slate-200">{authUserInfo.name || "Google User"}</h4>
                            <p className="text-[10px] font-mono text-slate-500">{authUserInfo.email || ""}</p>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-emerald-400/90 font-mono leading-relaxed bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                        ✓ Akun Anda telah resmi terhubung dengan API Google Drive melalui OAuth. Anda sekarang dapat melakukan sinkronisasi data dashboard.
                      </p>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          id="btn-refresh-drive"
                          onClick={() => fetchDriveFiles(driveAccessToken)}
                          disabled={driveLoading}
                          className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-705 text-slate-300 font-bold text-[11px] font-mono rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${driveLoading ? "animate-spin" : ""}`} />
                          Segarkan File
                        </button>
                        <button
                          id="btn-disconnect-drive"
                          onClick={logoutDrive}
                          className="py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[11px] font-mono rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-red-500/20"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Putuskan
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* API Troubleshooting FAQ */}
                <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/10 space-y-4">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider font-mono">FAQ Integrasi Workspace</h4>
                  <div className="space-y-3 text-xs leading-relaxed text-slate-400 font-mono">
                    <div>
                      <span className="text-slate-200 font-semibold block">Mengapa file cadangan tidak terlihat?</span>
                      <span>Sistem otomatis mencari berkas di Google Drive Anda yang memiliki kriteria nama mengandung kata "socionics" atau berformat JSON.</span>
                    </div>
                    <div>
                      <span className="text-slate-200 font-semibold block">Cara mendaftar Google Client ID?</span>
                      <span>Buka Google Cloud Console, aktifkan Google Drive API, buat "OAuth client ID" untuk tipe Web, masukkan URL Preview ke Authorized Origins, lalu salin kuncinya ke kolom input di atas.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Files interaction table and backup buttons */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual Feedback Alerts */}
                {driveError && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs font-mono text-red-400 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-405 text-red-400 shrink-0 mt-0.5" />
                    <span>{driveError}</span>
                  </div>
                )}

                {driveSuccess && (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{driveSuccess}</span>
                  </div>
                )}

                {/* Quick Action Panels buttons */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono">
                    <HardDrive className="w-4 h-4 text-emerald-400" /> Aksi Cepat Cloud Workspace
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Action 1: Save settings backup */}
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-left space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block mb-1 font-mono">Ekspor Papan Cadangan</span>
                        <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
                          Menyimpan kondisi filter aktif, profil Model A terpilih ({activeTypeProfile}), serta parameter kecocokan ({relationSourceType} vs {relationTargetType}) ke Google Drive.
                        </p>
                      </div>
                      <button
                        id="btn-export-backup"
                        onClick={saveBackupToDrive}
                        disabled={!driveAccessToken || driveLoading}
                        className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer h-[38px]"
                      >
                        <Upload className="w-3.5 h-3.5 shrink-0" />
                        <span>Kirim Cadangan (.json)</span>
                      </button>
                    </div>

                    {/* Action 2: Upload Markdown compatibility report */}
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-left space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block mb-1 font-mono">Unggah Riset Kecocokan</span>
                        <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
                          Mengambil hubungan dinamis saat ini ({relationSourceType} vs {relationTargetType} - {computedRelation.name}) dan mengunggah laporan riset aljabar grup lengkap (.txt).
                        </p>
                      </div>
                      <button
                        id="btn-export-report"
                        onClick={uploadResearchReport}
                        disabled={!driveAccessToken || driveLoading}
                        className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-purple-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer h-[38px]"
                      >
                        <FileCode className="w-3.5 h-3.5 shrink-0" />
                        <span>Dokumen Riset (.txt)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stored Files List Table */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono">
                      <Database className="w-4 h-4 text-emerald-400" /> Hasil Penyimpanan Google Drive
                    </h3>
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-slate-400">
                      Total: {driveFiles.length} berkas
                    </span>
                  </div>

                  {!driveAccessToken ? (
                    <div className="py-16 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-900/5 font-mono">
                      <Cloud className="w-8 h-8 text-slate-655 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-450 text-slate-400 font-medium">Google Drive belum terhubung</p>
                      <p className="text-[10px] text-slate-600 mt-1">Sambungkan akun Google di kolom kiri untuk melihat berkas arsip Anda.</p>
                    </div>
                  ) : driveLoading && driveFiles.length === 0 ? (
                    <div className="py-16 text-center font-mono animate-pulse">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-2" />
                      <p className="text-xs text-slate-450 text-slate-400">Menghubungi server Google Drive API...</p>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-950/40 font-mono">
                      <Database className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Workspace cloud Anda masih kosong</p>
                      <p className="text-[10px] text-slate-600 mt-1">Gunakan tombol aksi kustom di atas untuk membuat berkas cadangan instan pertama Anda.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/80">
                      <table className="w-full text-left border-collapse font-mono text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                            <th className="p-3 font-semibold uppercase tracking-wider text-[9px]">Nama Berkas</th>
                            <th className="p-3 font-semibold uppercase tracking-wider text-[9px]">Ukuran</th>
                            <th className="p-3 font-semibold uppercase tracking-wider text-[9px]">Tanggal Modifikasi</th>
                            <th className="p-3 font-semibold uppercase tracking-wider text-[9px] text-right">Aksi Operasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/80">
                          {driveFiles.map((file) => {
                            const isJson = file.name.endsWith(".json");
                            const isTxt = file.name.endsWith(".txt");
                            return (
                              <tr key={file.id} className="hover:bg-slate-900/30 transition-colors text-slate-350 text-slate-300">
                                <td className="p-3 max-w-[200px] truncate">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isJson ? "bg-emerald-400" : isTxt ? "bg-purple-400" : "bg-slate-400"}`} />
                                    <span className="font-semibold text-slate-200 block truncate" title={file.name}>{file.name}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-slate-400 text-[10px]">
                                  {file.size ? (parseInt(file.size) / 1024).toFixed(1) + " KB" : "-"}
                                </td>
                                <td className="p-3 text-slate-400 text-[10px]">
                                  {new Date(file.modifiedTime).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </td>
                                <td className="p-3 text-right">
                                  <div className="inline-flex gap-1.5">
                                    {isJson && (
                                      <button
                                        id={`btn-load-${file.id}`}
                                        onClick={() => loadBackupFromDrive(file.id, file.name)}
                                        className="h-8 px-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded text-[10px] transition-all cursor-pointer border border-emerald-500/15"
                                        title="Pulihkan data ini ke aplikasi"
                                      >
                                        Muat
                                      </button>
                                    )}
                                    <button
                                      id={`btn-delete-${file.id}`}
                                      onClick={() => deleteDriveFile(file.id, file.name)}
                                      className="h-8 px-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded text-[10px] transition-all cursor-pointer border border-red-500/15"
                                      title="Hapur berkas"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
