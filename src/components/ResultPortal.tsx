import { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  ChevronRight,
  CloudLightning,
  Compass,
  DoorOpen,
  Gift,
  Globe2,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { TIM_MODELS } from "../constants/socionicsData";
import { buildResultExperience } from "../results/resultExperience";
import type { AssessmentResult, TIM } from "../types/socionics";

type Props = {
  primaryType: TIM;
  result: AssessmentResult;
  theme: "dark" | "light";
};

const DOOR_ICONS = {
  A: Brain,
  B: CloudLightning,
  C: Landmark,
  D: DoorOpen,
} as const;

const recommendationIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("buku")) return BookOpen;
  if (lower.includes("film")) return Sparkles;
  if (lower.includes("musik")) return Music;
  if (lower.includes("pekerjaan")) return Compass;
  if (lower.includes("tempat")) return Globe2;
  if (lower.includes("kosakata")) return Lightbulb;
  if (lower.includes("hadiah")) return Gift;
  if (lower.includes("sirkel")) return Users;
  return HeartHandshake;
};

export default function ResultPortal({ primaryType, result, theme }: Props) {
  const experience = useMemo(
    () => buildResultExperience(primaryType, result),
    [primaryType, result],
  );
  const [activeDoor, setActiveDoor] = useState<"A" | "B" | "C" | "D">("A");
  const door = experience.doors.find((item) => item.id === activeDoor) ?? experience.doors[0];
  const model = TIM_MODELS[primaryType];
  const isDark = theme === "dark";

  return (
    <section className={`relative overflow-hidden rounded-3xl border p-4 sm:p-7 lg:p-10 ${
      isDark
        ? "border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_38%),linear-gradient(145deg,rgba(2,6,23,0.98),rgba(15,23,42,0.96))]"
        : "border-emerald-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_38%),linear-gradient(145deg,#ffffff,#f8fafc)] shadow-xl"
    }`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              <DoorOpen className="h-3.5 w-3.5" />
              Setelah tes, empat pintu terbuka
            </div>
            <div>
              <p className={`text-xs font-mono uppercase tracking-[0.22em] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                Portal hasil {primaryType} · {model.name}
              </p>
              <h3 className={`mt-2 text-3xl font-black tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
                {experience.portalName}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-400 sm:text-base">
                {experience.portalTagline}
              </p>
            </div>
            <p className={`max-w-3xl text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {experience.opening}
            </p>
          </div>

          <div className={`rounded-2xl border p-4 ${
            isDark ? "border-slate-800 bg-slate-950/55" : "border-slate-200 bg-white/80"
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
              <Sparkles className="h-4 w-4" />
              Sinyal dari jawabanmu
            </div>
            <div className="mt-3 space-y-2">
              {experience.observedSignals.map((signal) => (
                <p key={signal} className={`text-[11px] leading-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {signal}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {experience.doors.map((item) => {
            const Icon = DOOR_ICONS[item.id];
            const active = item.id === activeDoor;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveDoor(item.id)}
                className={`group relative min-h-28 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-emerald-400 bg-emerald-500 text-slate-950 shadow-[0_15px_45px_rgba(16,185,129,0.22)]"
                    : isDark
                      ? "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-emerald-500/40 hover:bg-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <Icon className={`h-5 w-5 ${active ? "text-slate-950" : "text-emerald-500"}`} />
                  <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${active ? "text-slate-800" : "text-slate-500"}`} />
                </div>
                <div className="mt-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">{item.label}</div>
                  <div className="mt-1 text-sm font-bold leading-tight">{item.title.replace(/^.*?:\s*/, "")}</div>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={door.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-7"
          >
            <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-500">
                {door.label} sedang terbuka
              </div>
              <h4 className={`text-2xl font-black sm:text-3xl ${isDark ? "text-white" : "text-slate-950"}`}>{door.title}</h4>
              <p className={`max-w-3xl text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{door.subtitle}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {door.cards.map((card) => (
                <article
                  key={`${door.id}-${card.title}`}
                  className={`rounded-2xl border p-5 ${
                    isDark
                      ? "border-slate-800 bg-slate-900/45 hover:border-emerald-500/25"
                      : "border-slate-200 bg-white/90 shadow-sm hover:border-emerald-300"
                  } transition-colors`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h5 className={`text-base font-black ${isDark ? "text-white" : "text-slate-950"}`}>{card.title}</h5>
                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-500">
                      Peta diri
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500">Vibe</div>
                      <p className={`mt-1 text-xs italic leading-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{card.vibe}</p>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Artinya</div>
                      <p className={`mt-1 text-xs leading-6 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{card.meaning}</p>
                    </div>
                    <p className={`text-sm leading-7 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{card.body}</p>
                    {card.edge && (
                      <div className={`rounded-xl border px-3 py-2 text-xs leading-5 ${
                        isDark ? "border-amber-500/20 bg-amber-500/5 text-amber-100" : "border-amber-200 bg-amber-50 text-amber-900"
                      }`}>
                        <strong>Sisi rawan:</strong> {card.edge}
                      </div>
                    )}
                    {card.practice && (
                      <div className={`rounded-xl border px-3 py-2 text-xs leading-5 ${
                        isDark ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-100" : "border-emerald-200 bg-emerald-50 text-emerald-900"
                      }`}>
                        <strong>Eksperimen:</strong> {card.practice}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {door.recommendations && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {door.recommendations.map((group) => {
                  const Icon = recommendationIcon(group.title);
                  return (
                    <article
                      key={group.title}
                      className={`rounded-2xl border p-5 ${
                        isDark ? "border-slate-800 bg-slate-950/45" : "border-slate-200 bg-white/90 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className={`text-sm font-black ${isDark ? "text-white" : "text-slate-950"}`}>{group.title}</h5>
                          <p className="mt-1 text-[10px] italic leading-4 text-teal-500">Vibe: {group.vibe}</p>
                        </div>
                      </div>
                      <p className={`mt-4 text-[11px] leading-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        <strong>Artinya:</strong> {group.meaning}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className={`flex gap-2 text-xs leading-5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={`rounded-2xl border p-4 text-[11px] leading-5 ${
          isDark ? "border-slate-800 bg-slate-950/55 text-slate-500" : "border-slate-200 bg-white/80 text-slate-500"
        }`}>
          <strong className={isDark ? "text-slate-300" : "text-slate-700"}>Batas interpretasi:</strong> bagian ini adalah pembacaan tipologi dan refleksi diri, bukan diagnosis psikologis, penentu pilihan politik atau agama, ramalan karier, maupun penilaian nilai manusia. Pengalaman hidup, budaya, trauma, kesehatan, kelas sosial, dan keadaan saat tes dapat mengubah pola jawaban.
        </div>
      </div>
    </section>
  );
}
