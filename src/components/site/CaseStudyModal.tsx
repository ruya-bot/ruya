import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudy } from "@/types/caseStudy";
import { EASE } from "@/lib/motion";

type Props = {
  study: CaseStudy | null;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
};

export function CaseStudyModal({ study, onClose, onSelectNext, onSelectPrev }: Props) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (study) {
      document.body.style.overflow = "hidden";
      setActiveNodeId(study.architecture[0]?.id ?? null);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [study]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSelectNext();
      if (e.key === "ArrowLeft") onSelectPrev();
    };
    if (study) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [study, onClose, onSelectNext, onSelectPrev]);

  if (!study) return null;

  const activeNode = study.architecture.find((n) => n.id === activeNodeId) ?? study.architecture[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 isolate">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE.outExpo }}
          onClick={onClose}
          className="fixed inset-0 bg-foreground/40 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.4, ease: EASE.outExpo }}
          className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden bg-background shadow-2xl sm:h-[92vh] sm:rounded-3xl border border-border"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border bg-surface/80 px-6 py-4 backdrop-blur pt-safe">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.24em] text-copper uppercase">
                SYSTEM {study.number}
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {study.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSelectPrev}
                aria-label="Previous Case Study"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-sm font-medium transition-colors hover:bg-surface active:scale-95"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onSelectNext}
                aria-label="Next Case Study"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-sm font-medium transition-colors hover:bg-surface active:scale-95"
              >
                →
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Case Study"
                className="ml-2 grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background transition-transform active:scale-90"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Main Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-12 space-y-12">
            {/* Title & One-Liner */}
            <div className="space-y-4 max-w-3xl">
              <span className="inline-block rounded-md border border-copper/30 bg-copper/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-copper uppercase">
                {study.currentState}
              </span>
              <h1 id="case-study-title" className="display-xl text-[clamp(2rem,6vw,3.6rem)] leading-none text-foreground">
                {study.name}
              </h1>
              <p className="text-lg font-medium text-foreground/90 leading-snug">
                {study.title}
              </p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {study.description}
              </p>
            </div>

            {/* Visual Header Banner */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <img
                src={study.visual}
                alt={`${study.name} visual`}
                className="h-64 sm:h-80 w-full object-cover mix-blend-multiply opacity-90"
              />
            </div>

            {/* Problem & Challenge */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                  THE CHALLENGE
                </span>
                <h2 className="text-lg font-bold text-foreground leading-snug">
                  {study.challenge.headline}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {study.challenge.description}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                  SYSTEM FOCUS
                </span>
                <h2 className="text-lg font-bold text-foreground leading-snug">
                  {study.category}
                </h2>
                <div className="flex flex-wrap gap-2 pt-2">
                  {study.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive System Architecture Diagram */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                    SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="display-xl mt-1 text-2xl">
                    End-to-End Pipeline Architecture
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click or tap any node to inspect data layer responsibilities.
                </p>
              </div>

              {/* Horizontal / Vertical Diagram Pipeline Nodes */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 pt-2">
                {study.architecture.map((node, i) => {
                  const isActive = node.id === activeNode?.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 ${
                        isActive
                          ? "border-copper bg-background shadow-md scale-[1.03]"
                          : "border-border bg-background/60 hover:border-copper/40 hover:bg-background"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        0{i + 1}
                      </span>
                      <p className="mt-2 text-xs font-bold leading-tight text-foreground">
                        {node.label}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground truncate">
                        {node.sublabel}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Detail Card */}
              {activeNode && (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-copper/30 bg-background p-5 space-y-1"
                >
                  <p className="text-xs font-semibold tracking-wider text-copper uppercase">
                    Node Detail — {activeNode.label} ({activeNode.sublabel})
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {activeNode.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* What We Built Components */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                  ENGINEERING BREAKDOWN
                </span>
                <h2 className="display-xl mt-1 text-2xl">
                  What We Engineered & Built
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {study.built.map((item, i) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-surface p-5 space-y-2"
                  >
                    <span className="text-[10px] font-bold text-copper uppercase">
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Stack */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2.5">
                {study.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom System Flow & Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border pt-8 pb-safe">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  SYSTEM PIPELINE
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {study.systemPipeline.join(" → ")}
                </p>
              </div>

              <button
                type="button"
                onClick={onSelectNext}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-xs font-semibold text-background transition-transform active:scale-95"
              >
                Next System ({study.id === "freshness-passport" ? "GridPulse" : "Next"}) →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
