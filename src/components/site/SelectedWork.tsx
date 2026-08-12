import { useState } from "react";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";
import { CaseStudyModal } from "./CaseStudyModal";
import bgWork1 from "@/assets/bg-work-1.jpg";
import bgWork2 from "@/assets/bg-work-2.jpg";

export function SelectedWork() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const handleSelectNext = () => {
    if (!selectedStudy) return;
    const currentIndex = caseStudies.findIndex((c) => c.id === selectedStudy.id);
    const nextIndex = (currentIndex + 1) % caseStudies.length;
    setSelectedStudy(caseStudies[nextIndex] ?? null);
  };

  const handleSelectPrev = () => {
    if (!selectedStudy) return;
    const currentIndex = caseStudies.findIndex((c) => c.id === selectedStudy.id);
    const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
    setSelectedStudy(caseStudies[prevIndex] ?? null);
  };

  return (
    <section id="work" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgWork1 }, { src: bgWork2 }]} intensity={0.7} />

      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Selected Work
            </p>
            <h2 className="display-xl text-balance text-[clamp(2.1rem,7.5vw,4.2rem)] leading-none">
              Three systems. <span className="text-copper-gradient">Three real-world problems.</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[18px]">
              Ru’ya builds AI systems where intelligence has a practical purpose — from
              understanding physical environments to detecting synthetic media and reducing food waste.
            </p>
          </div>
        </Reveal>

        {/* 3 Flagship Case Study Chapters */}
        <div className="space-y-12 sm:space-y-16">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.06}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10 md:p-12 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-copper/40 hover:shadow-[var(--shadow-float)]">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                  {/* Left Column Text & Pipeline */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.24em] text-copper">
                        CHAPTER {study.number}
                      </span>
                      <span className="h-3 w-px bg-border" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {study.label}
                      </span>
                    </div>

                    <div>
                      <h3 className="display-xl text-[clamp(1.8rem,5vw,3rem)] leading-tight text-foreground transition-colors duration-300 group-hover:text-copper">
                        {study.name}
                      </h3>
                      <p className="mt-2 text-base font-semibold text-foreground/90">
                        {study.title}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {study.description}
                      </p>
                    </div>

                    {/* System Pipeline pill flow */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-bold tracking-widest text-copper uppercase">
                        SYSTEM FLOW
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground">
                        {study.systemPipeline.map((step, idx) => (
                          <span key={step} className="flex items-center gap-2">
                            <span className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-semibold">
                              {step}
                            </span>
                            {idx < study.systemPipeline.length - 1 && (
                              <span className="text-muted-foreground/60">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Focus tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.focus.map((f) => (
                        <span
                          key={f}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Interactive CTA */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-xs font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
                      >
                        Explore {study.name} →
                      </button>
                    </div>
                  </div>

                  {/* Right Column Visual Card */}
                  <div
                    onClick={() => setSelectedStudy(study)}
                    className="cursor-pointer overflow-hidden rounded-2xl border border-border bg-background transition-transform duration-300 group-hover:scale-[1.01]"
                  >
                    <img
                      src={study.visual}
                      alt={study.name}
                      className="h-64 sm:h-80 w-full object-cover mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Case Study Philosophy Transition */}
        <Reveal className="pt-8">
          <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 text-center space-y-8">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
                Case Study Philosophy
              </span>
              <h3 className="display-xl text-[clamp(1.8rem,5vw,3rem)] leading-none">
                We don't showcase features.{" "}
                <span className="text-copper-gradient">We showcase systems.</span>
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-background p-5 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-copper uppercase">01 CONCEPT</span>
                <p className="text-sm font-bold text-foreground">The Problem</p>
                <p className="text-xs text-muted-foreground">What real-world problem existed?</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-copper uppercase">02 CONCEPT</span>
                <p className="text-sm font-bold text-foreground">The Intelligence</p>
                <p className="text-xs text-muted-foreground">Where does AI create value?</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-copper uppercase">03 CONCEPT</span>
                <p className="text-sm font-bold text-foreground">The Engineering</p>
                <p className="text-xs text-muted-foreground">How was the system actually built?</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-copper uppercase">04 CONCEPT</span>
                <p className="text-sm font-bold text-foreground">The Impact</p>
                <p className="text-xs text-muted-foreground">What does the system enable?</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modal / Drawer for detailed case study view */}
      <CaseStudyModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </section>
  );
}
