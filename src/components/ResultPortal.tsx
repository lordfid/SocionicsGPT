import { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
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
  const experience = useMemo(
    () => buildResultExperience(primaryType, result),
    [primaryType, result],
  );
  const [activeSection, setActiveSection] = useState<ResultSectionId>("summary");
  const active = experience.sections.find((section) => section.id === activeSection) ?? experience.sections[0];
  const model = TIM_MODELS[primaryType];
  const isDark = theme === "dark";

  return (
    <section className={`library-result-shell ${isDark ? "library-result-dark" : "library-result-light"}`}>
      <div className="library-ambient library-ambient-one" />
      <div className="library-ambient library-ambient-two" />

      <div className="relative space-y-8">
        <div className="library-catalog-hero">
          <div className="library-catalog-ribbon">Katalog hasil</div>
          <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr] xl:items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="library-tag">
                  <LibraryBig className="mr-1.5 h-3.5 w-3.5" />
                  {primaryType} · {model.name}
                </span>
                {experience.tags.map((tag) => (
                  <span key={tag} className="library-tag">{tag}</span>
                ))}
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#d5b07b]">
                  Ringkasan editorial
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-[#241915] sm:text-5xl dark:text-[#fff7ea]">
                  {experience.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f4a3d] dark:text-[#ddc9b0]">
                  {experience.subtitle}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="library-note-card">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8c5a34] dark:text-[#ddb175]">
                    Pendapat ahli singkat
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#2d221d] dark:text-[#f4e7d4]">
                    {experience.expertSnapshot}
                  </p>
                </div>
                <div className="library-note-card library-note-purple">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#7a4f74] dark:text-[#ddb5ee]">
                    Stereotipe internet
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#2d221d] dark:text-[#f4e7d4]">
                    {experience.internetSnapshot}
                  </p>
                </div>
              </div>
            </div>

            <div className="library-signal-strip">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                Sinyal yang kelihatan dari jawabanmu
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.observedSignals.map((signal) => (
                  <span key={signal} className="library-signal-chip">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <aside className="library-floating-nav xl:sticky xl:top-6">
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                Daftar bab hasil
              </div>
              <p className="text-xs leading-5 text-[#6d584b] dark:text-[#cbb89e]">
                Baca hasilmu seperti katalog. Klik bab yang ingin kamu buka lebih dulu.
              </p>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-2 xl:overflow-visible">
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
                    <Icon className="h-4 w-4" />
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                        {section.kicker}
                      </span>
                      <span className="block truncate text-sm font-extrabold">
                        {section.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="space-y-6">
            <div className="library-section-heading">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                {active.kicker}
              </div>
              <h4 className="mt-2 text-2xl font-black text-[#251a15] sm:text-3xl dark:text-[#fff5e6]">
                {active.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-[#5f4a3d] dark:text-[#d8c3aa]">
                {active.intro}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {active.cards.map((card) => (
                <article key={`${active.id}-${card.title}`} className="library-insight-card">
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-lg font-black text-[#241915] dark:text-[#fff3e3]">{card.title}</h5>
                    <span className="library-tag whitespace-nowrap">{active.kicker}</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                        Pendapat ahli
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-[#2f241f] dark:text-[#f4e8d7]">
                        {card.expert}
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7a4f74] dark:text-[#d7b0ea]">
                        Versi gampangnya
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-[#5b473b] dark:text-[#d5c0a5]">
                        {card.simple}
                      </p>
                    </div>

                    {card.stereotype && (
                      <div className="rounded-2xl border border-[rgba(122,79,116,0.18)] bg-[rgba(248,239,250,0.8)] p-3 text-sm leading-6 text-[#4f3b48] dark:border-[rgba(215,176,234,0.14)] dark:bg-[rgba(57,38,59,0.72)] dark:text-[#e7d6f0]">
                        <strong className="font-extrabold">Stereotipe internet:</strong> {card.stereotype}
                      </div>
                    )}

                    {card.misunderstood && (
                      <div className="rounded-2xl border border-[rgba(146,95,53,0.18)] bg-[rgba(255,249,237,0.8)] p-3 text-sm leading-6 text-[#4a382f] dark:border-[rgba(223,184,126,0.12)] dark:bg-[rgba(60,43,34,0.72)] dark:text-[#e8d7bf]">
                        <strong className="font-extrabold">Yang sering bikin orang salah paham:</strong> {card.misunderstood}
                      </div>
                    )}

                    {card.warning && (
                      <div className="rounded-2xl border border-[rgba(138,70,45,0.22)] bg-[rgba(172,93,55,0.08)] p-3 text-sm leading-6 text-[#623f2b] dark:border-[rgba(239,160,94,0.16)] dark:bg-[rgba(97,53,30,0.26)] dark:text-[#f4d0a2]">
                        <strong className="font-extrabold">Yang perlu kamu waspadai:</strong> {card.warning}
                      </div>
                    )}

                    {card.actions && card.actions.length > 0 && (
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                          Saran praktis
                        </div>
                        <ul className="mt-2 space-y-2">
                          {card.actions.map((action) => (
                            <li key={action} className="flex gap-2 text-sm leading-6 text-[#312620] dark:text-[#f2e6d5]">
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
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8c5a34] dark:text-[#ddb175]">
                  Rak rekomendasi untukmu
                </div>
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {active.recommendations.map((group) => {
                    const Icon = recommendationIcon(group.title);
                    return (
                      <article key={group.title} className="library-shelf-card">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-[rgba(146,95,53,0.24)] bg-[rgba(255,246,228,0.72)] p-2.5 text-[#8c5a34] shadow-sm dark:border-[rgba(223,184,126,0.16)] dark:bg-[rgba(57,41,33,0.72)] dark:text-[#e6c58f]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-base font-extrabold text-[#2b201a] dark:text-[#fbf2e2]">{group.title}</h5>
                            <p className="mt-1 text-xs leading-5 text-[#6f5948] dark:text-[#cbb89e]">{group.note}</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {group.items.map((item) => (
                            <div key={item} className="library-book-spine">
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
          </div>
        </div>

        <div className="library-boundary-note">
          <strong>Batas interpretasi:</strong> hasil ini adalah pembacaan tipologi dan refleksi diri. Ini bukan diagnosis psikologis, bukan penentu ideologi atau agama, dan bukan pengganti penilaian profesional.
        </div>
      </div>
    </section>
  );
}
