import { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Compass,
  Film,
  Gift,
  Globe2,
  HeartHandshake,
  Landmark,
  LibraryBig,
  Lightbulb,
  Music,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import { TIM_MODELS } from "../constants/socionicsData";
import { buildResultExperience, type ResultSectionId } from "../results/resultExperience";
import type { AssessmentResult, TIM } from "../types/socionics";
import { polishEditorialList, polishEditorialText } from "../utils/editorialText";

type Props = {
  primaryType: TIM;
  result: AssessmentResult;
  theme: "dark" | "light";
};

const SECTION_ICONS: Record<ResultSectionId, typeof Brain> = {
  summary: Sparkles,
  thinking: Brain,
  emotions: HeartHandshake,
  relationships: Users,
  worldview: Landmark,
  blindspots: ShieldAlert,
  recommendations: Compass,
};

const recommendationIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("buku")) return BookOpen;
  if (lower.includes("film") || lower.includes("series")) return Film;
  if (lower.includes("musik")) return Music;
  if (lower.includes("pekerjaan")) return Compass;
  if (lower.includes("tempat") || lower.includes("negara") || lower.includes("kota")) return Globe2;
  if (lower.includes("kosakata")) return Lightbulb;
  if (lower.includes("hadiah")) return Gift;
  if (lower.includes("sirkel") || lower.includes("circle")) return Users;
  return HeartHandshake;
};

export default function ResultPortal({ primaryType, result, theme }: Props) {
  const experience = useMemo(() => buildResultExperience(primaryType, result), [primaryType, result]);
  const [activeSection, setActiveSection] = useState<ResultSectionId>("summary");
  const active = experience.sections.find((section) => section.id === activeSection) ?? experience.sections[0];
  const activeIndex = Math.max(0, experience.sections.findIndex((section) => section.id === active.id));
  const nextSection = experience.sections[activeIndex + 1];
  const model = TIM_MODELS[primaryType];
  const isDark = theme === "dark";
  const candidateGap = Math.max(0, result.top3[0].fitScore - (result.top3[1]?.fitScore ?? 0));
  const coveragePercent = Math.round(result.coverage.ratio * 100);
  const consistencyPercent = Math.max(0, Math.min(100, Math.round(100 - result.responseQuality.inconsistencyScore * 45)));
  const holdoutPercent = Math.round(result.top3[0].holdoutScore);

  const shellClass = isDark ? "library-result-dark" : "library-result-light";
  const titleClass = isDark ? "text-[#fff5ea]" : "text-[#231914]";
  const bodyClass = isDark ? "text-[#dbc7ae]" : "text-[#5f4b3e]";
  const mutedClass = isDark ? "text-[#cbb69c]" : "text-[#6f5948]";
  const labelClass = isDark ? "text-[#ddb175]" : "text-[#8c5a34]";
  const accentLabelClass = isDark ? "text-[#ddb5ee]" : "text-[#7a4f74]";

  return (
    <section className={`library-result-shell ${shellClass}`}>
      <div className="library-ambient library-ambient-one" />
      <div className="library-ambient library-ambient-two" />

      <div className="relative space-y-8">
        <div className="library-catalog-hero">
          <div className="library-catalog-ribbon">Katalog hasil</div>
          <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr] xl:items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="library-tag">
                  <LibraryBig className="mr-1.5 h-3.5 w-3.5" />
                  {primaryType} · {model.name}
                </span>
                {experience.tags.map((tag) => (
                  <span key={tag} className="library-tag">
                    {polishEditorialText(tag)}
                  </span>
                ))}
              </div>

              <div>
                <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${labelClass}`}>
                  Ringkasan editorial
                </p>
                <h3 className={`mt-2 text-3xl font-black tracking-tight sm:text-5xl ${titleClass}`}>
                  {polishEditorialText(experience.title)}
                </h3>
                <p className={`mt-3 max-w-3xl text-sm leading-7 ${bodyClass}`}>
                  {polishEditorialText(experience.subtitle)}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="library-note-card">
                  <div className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${labelClass}`}>
                    Pendapat ahli singkat
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${titleClass}`}>
                    {polishEditorialText(experience.expertSnapshot)}
                  </p>
                </div>
                <div className="library-note-card library-note-purple">
                  <div className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${accentLabelClass}`}>
                    Stereotipe internet
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${titleClass}`}>
                    {polishEditorialText(experience.internetSnapshot)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="library-signal-strip">
                <div className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                  Sinyal yang kelihatan dari jawabanmu
                </div>
                <p className={`mt-2 text-xs leading-6 ${mutedClass}`}>
                  Ini bukan vonis, tapi jejak pola yang paling sering muncul dari jawabanmu.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.observedSignals.map((signal) => (
                    <span key={signal} className="library-signal-chip">
                      {polishEditorialText(signal)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="library-evidence-card">
                <div className="library-evidence-heading">
                  <BarChart3 className="h-4 w-4" />
                  <span>Kualitas bukti hasil</span>
                </div>
                <div className="library-evidence-grid">
                  <div>
                    <strong>{coveragePercent}%</strong>
                    <span>Cakupan jawaban</span>
                  </div>
                  <div>
                    <strong>{consistencyPercent}%</strong>
                    <span>Konsistensi respons</span>
                  </div>
                  <div>
                    <strong>{holdoutPercent}%</strong>
                    <span>Dukungan holdout</span>
                  </div>
                  <div>
                    <strong>{candidateGap.toFixed(1)}</strong>
                    <span>Jarak kandidat</span>
                  </div>
                </div>
                {result.unresolvedPair ? (
                  <p className="library-evidence-note">
                    Kandidat yang masih perlu dibedakan: <b>{result.unresolvedPair}</b>.
                  </p>
                ) : (
                  <p className="library-evidence-note">
                    Kandidat utama sudah memiliki jarak yang bisa dibaca, tetapi hasil tetap perlu diuji lewat perilaku nyata.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
          <aside className="library-floating-nav xl:sticky xl:top-6">
            <div className="space-y-1">
              <div className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                Daftar bab hasil
              </div>
              <p className={`text-xs leading-5 ${mutedClass}`}>
                Buka bagian yang paling ingin kamu baca dulu. Semua bab tetap saling melengkapi.
              </p>
            </div>
            <div className="library-nav-grid mt-4">
              {experience.sections.map((section) => {
                const Icon = SECTION_ICONS[section.id];
                const current = section.id === active.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`library-nav-tab ${current ? "library-nav-tab-active" : ""}`}
                  >
                    <span className="library-nav-icon-wrap">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">
                        {polishEditorialText(section.kicker)}
                      </span>
                      <span className="block text-sm font-extrabold leading-5 whitespace-normal break-words">
                        {polishEditorialText(section.title)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="space-y-6">
            <div className="library-section-heading block">
              <div className="library-chapter-progress">
                <span>Bab {activeIndex + 1} dari {experience.sections.length}</span>
                <div><i style={{ width: `${((activeIndex + 1) / experience.sections.length) * 100}%` }} /></div>
              </div>
              <div className={`mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                {polishEditorialText(active.kicker)}
              </div>
              <h4 className={`mt-2 text-2xl font-black sm:text-3xl ${titleClass}`}>
                {polishEditorialText(active.title)}
              </h4>
              <p className={`mt-3 max-w-4xl text-sm leading-7 ${bodyClass}`}>
                {polishEditorialText(active.intro)}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {active.cards.map((card) => (
                <article key={`${active.id}-${card.title}`} className="library-insight-card">
                  <div className="flex items-start justify-between gap-3">
                    <h5 className={`text-lg font-black leading-6 ${titleClass}`}>{polishEditorialText(card.title)}</h5>
                    <span className="library-tag whitespace-nowrap">{polishEditorialText(active.kicker)}</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <div className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                        Pendapat ahli
                      </div>
                      <p className={`mt-1.5 text-sm leading-6 ${titleClass}`}>
                        {polishEditorialText(card.expert)}
                      </p>
                    </div>

                    <div>
                      <div className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                        Versi gampangnya
                      </div>
                      <p className={`mt-1.5 text-sm leading-6 ${bodyClass}`}>
                        {polishEditorialText(card.simple)}
                      </p>
                    </div>

                    {card.stereotype && (
                      <div className="library-copy-block library-copy-block-purple">
                        <strong className="font-extrabold">Stereotipe internet:</strong>{" "}
                        {polishEditorialText(card.stereotype)}
                      </div>
                    )}

                    {card.misunderstood && (
                      <div className="library-copy-block library-copy-block-cream">
                        <strong className="font-extrabold">Yang sering bikin orang salah paham:</strong>{" "}
                        {polishEditorialText(card.misunderstood)}
                      </div>
                    )}

                    {card.warning && (
                      <div className="library-copy-block library-copy-block-warn">
                        <strong className="font-extrabold">Yang perlu kamu waspadai:</strong>{" "}
                        {polishEditorialText(card.warning)}
                      </div>
                    )}

                    {card.actions && card.actions.length > 0 && (
                      <div>
                        <div className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                          Saran praktis
                        </div>
                        <ul className="mt-2 space-y-2">
                          {polishEditorialList(card.actions).map((action) => (
                            <li key={action} className={`flex gap-2 text-sm leading-6 ${isDark ? "text-[#f2e6d5]" : "text-[#312620]"}`}>
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a56a3f]" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {active.recommendations && active.recommendations.length > 0 && (
              <div className="space-y-4">
                <div className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${labelClass}`}>
                  Rak rekomendasi untukmu
                </div>
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {active.recommendations.map((group) => {
                    const Icon = recommendationIcon(group.title);
                    return (
                      <article key={group.title} className="library-shelf-card">
                        <div className="flex items-start gap-3">
                          <div className="library-shelf-icon">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className={`text-base font-extrabold ${isDark ? "text-[#fbf2e2]" : "text-[#2b201a]"}`}>
                              {polishEditorialText(group.title)}
                            </h5>
                            <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                              {polishEditorialText(group.note)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {polishEditorialList(group.items).map((item, index) => (
                            <div key={item} className="library-book-spine" style={{ ["--spine-index" as string]: index }}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
            {nextSection && (
              <button
                type="button"
                className="library-next-chapter"
                onClick={() => {
                  setActiveSection(nextSection.id);
                  document.querySelector(".library-result-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span>
                  <small>Bab berikutnya</small>
                  <strong>{polishEditorialText(nextSection.title)}</strong>
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="library-boundary-note">
          <strong>Batas interpretasi:</strong> hasil ini adalah pembacaan tipologi dan refleksi diri. Ini bukan diagnosis psikologis, bukan penentu ideologi atau agama, dan bukan pengganti penilaian profesional.
        </div>
      </div>
    </section>
  );
}
