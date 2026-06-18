/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ElementType = "Ne" | "Ni" | "Se" | "Si" | "Te" | "Ti" | "Fe" | "Fi";

export type ChannelType =
  | "producer"
  | "flexible"
  | "mask"
  | "threat"
  | "receiver"
  | "aspiration"
  | "dismissive"
  | "background";

export type ContextKey =
  | "kamar"
  | "rumah"
  | "keluarga"
  | "pertemanan"
  | "kelompok_baru"
  | "kerja_belajar"
  | "kendaraan"
  | "tempat_umum"
  | "ruang_tunggu"
  | "acara_ramai"
  | "aktivitas_panjang"
  | "pekerjaan_fisik_ringan"
  | "tugas_fokus"
  | "perjalanan"
  | "pemulihan"
  | "setelah_konflik"
  | "menerima_tamu"
  | "membantu_orang"
  | "sendirian"
  | "perubahan_cuaca"
  | "lingkungan_bising"
  | "ruang_penuh"
  | "jadwal_padat"
  | "aktivitas_lama";

export interface Question {
  id: string;
  scenario: string;
  statement: string;
  element: ElementType;
  channel: ChannelType;
  context: ContextKey;
  scaleType: string;
  isHoldout: boolean;
  isTieBreak: boolean;
  evidenceTags: string[];
  contradictionPairId?: string;
  replicationFamilyId?: string;
  contentVersion: string;
  calibrationStatus: "uncalibrated" | "calibrated";
  contentGeneration: "explicit-reviewed" | "legacy-template";
}
