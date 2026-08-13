/**
 * SelectedWork — "Three Systems / One Canvas"
 *
 * Staggered horizontal panels on desktop with continuous subtle drift motion.
 * Hovering a panel activates it, recedes others, and smoothly transitions
 * the TRUSTED COLLABORATION founder story directly tied to that project.
 *
 * 01 — GridPulse          (Traffic Intelligence)
 * 02 — Crewly             (Enterprise Intelligence)
 * 03 — Freshness Passport (Food Intelligence)
 *
 * Mobile: Vertical interactive storytelling sequence.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";
import { CaseStudyModal } from "./CaseStudyModal";
import { EASE } from "@/lib/motion";

// ─── Shelf metadata ──────────────────────────────────────────────────────────
const SHELF: Record<
  string,
  { field: string; tag: string; offset: number }
> = {
  gridpulse: {
    field: "Traffic Intelligence",
    tag: "Mobility AI",
    offset: 0,
  },
  crewly: {
    field: "Enterprise Intelligence",
    tag: "Workspace AI",
    offset: 40,
  },
  "freshness-passport": {
    field: "Food Intelligence",
    tag: "Retail AI",
    offset: 80,
  },
};

// ─── Founder & Collaboration stories tied to each project ────────────────────
interface CollaborationStory {
  id: string;
  project: string;
  context: string;
  quote: string;
  attribution: string;
  role: string;
  isNeutral?: boolean;
}

const STORIES: Record<string, CollaborationStory> = {
  gridpulse: {
    id: "gridpulse",
    project: "GRIDPULSE",
    context: "AI traffic intelligence for smarter mobility.",
    quote:
      "GridPulse transforms visual traffic streams into real-time congestion intelligence, enabling automated monitoring and predictive decision support for urban mobility.",
    attribution: "Ru'ya Research & Engineering",
    role: "System Architecture & AI Intelligence",
    isNeutral: true,
  },
  crewly: {
    id: "crewly",
    project: "CREWLY",
    context: "From idea to intelligent workspace.",
    quote:
      "Ru'ya turned the idea behind Crewly into a complete product experience — from the workspace itself to the systems, interactions, and intelligence that make it feel like a real product.",
    attribution: "Mohammed Sanin",
    role: "Founder, Crewly",
  },
  "freshness-passport": {
    id: "freshness-passport",
    project: "FRESHNESS PASSPORT",
    context: "From concept to product.",
    quote:
      "Ru'ya took the idea I had for Freshness Passport and turned it into something far beyond the initial concept. From shaping the product to creating the product-related visuals and videos, they brought the whole idea to life brilliantly.",
    attribution: "Abdul Varis",
    role: "Founder, Freshness Passport",
  },
};

// ─── Abstract Visual Representations ─────────────────────────────────────────
function AbstractVisual({ projectId, isActive }: { projectId: string; isActive: boolean }) {
  if (projectId === "gridpulse") {
    // Traffic network / road intelligence
    return (
      <div className="relative h-20 w-full overflow-hidden rounded-lg bg-surface/40 p-3 border border-border/30">
        <svg className="h-full w-full opacity-60" viewBox="0 0 200 60" fill="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-foreground/30" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-foreground/30" />
          <line x1="60" y1="0" x2="60" y2="60" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
          <line x1="140" y1="0" x2="140" y2="60" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
          {/* Nodes */}
          <circle cx="60" cy="20" r="3.5" className={isActive ? "fill-copper" : "fill-foreground/40"} />
          <circle cx="140" cy="20" r="3" className="fill-foreground/40" />
          <circle cx="60" cy="40" r="3" className="fill-foreground/40" />
          <circle cx="140" cy="40" r="3.5" className={isActive ? "fill-copper" : "fill-foreground/40"} />
          {/* Signal path */}
          <motion.path
            d="M 20 20 L 60 20 L 140 40 L 180 40"
            stroke={isActive ? "oklch(0.56 0.12 48)" : "currentColor"}
            strokeWidth="1.5"
            className={isActive ? "" : "text-foreground/50"}
            initial={{ pathLength: 0.8 }}
            animate={{ pathLength: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  }

  if (projectId === "crewly") {
    // Abstract workspace system — task nodes & connected panels
    return (
      <div className="relative h-20 w-full overflow-hidden rounded-lg bg-surface/40 p-3 border border-border/30 flex items-center justify-around">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="h-2 w-12 rounded-full bg-foreground/20" />
            <motion.div
              className={`h-2 rounded-full ${isActive ? "bg-copper" : "bg-foreground/30"}`}
              style={{ width: isActive ? "45%" : "30%" }}
              animate={isActive ? { width: ["35%", "55%", "35%"] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-sm ${isActive ? "bg-copper/80" : "bg-foreground/25"}`} />
            <div className="h-1.5 w-24 rounded bg-foreground/15" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-foreground/25" />
            <div className="h-1.5 w-16 rounded bg-foreground/15" />
          </div>
        </div>
      </div>
    );
  }

  // Freshness Passport — circular lifecycle ring
  return (
    <div className="relative h-20 w-full overflow-hidden rounded-lg bg-surface/40 p-3 border border-border/30 flex items-center justify-center">
      <svg className="h-14 w-14" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="18" stroke="currentColor" strokeWidth="1" className="text-foreground/20" />
        <motion.circle
          cx="25"
          cy="25"
          r="18"
          stroke={isActive ? "oklch(0.56 0.12 48)" : "currentColor"}
          strokeWidth="1.8"
          strokeDasharray="113"
          strokeDashoffset="35"
          strokeLinecap="round"
          className={isActive ? "" : "text-foreground/50"}
          animate={isActive ? { rotate: [0, 360] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "25px 25px" }}
        />
        <circle cx="25" cy="25" r="6" className={isActive ? "fill-copper/80" : "fill-foreground/30"} />
      </svg>
    </div>
  );
}

// ─── Trusted Collaboration Display Component ──────────────────────────────────
function TrustedCollaborationSection({ activeId }: { activeId: string }) {
  const story = STORIES[activeId] ?? STORIES["crewly"]!;

  return (
    <div className="mx-auto max-w-6xl py-14 md:py-20">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-start border-t border-border/40 pt-12">
          {/* Left column: Section label + active project info */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper">
              TRUSTED COLLABORATION
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={story.id + "-meta"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: EASE.outExpo }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/70">
                    {story.project}
                  </p>
                </div>
                <p className="text-xs font-medium text-muted-foreground">{story.context}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column: Dynamic quote / story transition */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={story.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.55, ease: EASE.outExpo }}
                className="space-y-5"
              >
                {!story.isNeutral && (
                  <span
                    className="block font-serif leading-none text-copper/35 select-none"
                    style={{ fontSize: "3.8rem", lineHeight: 0.8 }}
                    aria-hidden
                  >
                    "
                  </span>
                )}

                <p
                  className={`text-base sm:text-lg font-medium text-foreground leading-relaxed ${
                    !story.isNeutral ? "-mt-2" : ""
                  }`}
                >
                  {story.quote}
                </p>

                <footer className="flex items-center gap-3 pt-1">
                  <div className="h-px w-8 bg-border shrink-0" />
                  <cite className="not-italic text-xs font-semibold text-muted-foreground tracking-wide">
                    — {story.attribution} · {story.role}
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ─── Desktop Panel Component ──────────────────────────────────────────────────
function DesktopPanel({
  study,
  isActive,
  onHover,
  onOpen,
}: {
  study: CaseStudy;
  isActive: boolean;
  onHover: () => void;
  onOpen: () => void;
}) {
  const { field, offset } = SHELF[study.id]!;

  return (
    <motion.div
      style={{ marginTop: `${offset}px` }}
      animate={{
        y: isActive ? -4 : 0,
        scale: isActive ? 1.02 : 0.98,
        opacity: isActive ? 1 : 0.65,
      }}
      transition={{ duration: 0.45, ease: EASE.outExpo }}
      className="w-full"
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={onHover}
        className={`group relative text-left w-full rounded-2xl border transition-all duration-400
          ${
            isActive
              ? "border-copper/60 bg-surface/80 shadow-md"
              : "border-border/50 bg-background hover:border-border/80"
          }
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-copper/50`}
      >
        {/* Top gold accent line */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
          animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0.2 }}
          transition={{ duration: 0.4, ease: EASE.outExpo }}
          style={{ background: "oklch(0.56 0.12 48)", transformOrigin: "left" }}
        />

        <div
          className="flex flex-col justify-between p-8 xl:p-9 space-y-6"
          style={{ minHeight: "clamp(260px, 34vh, 360px)" }}
        >
          {/* Top header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-copper">
                {study.number}
              </span>
              {/* Cursor indicator label */}
              <motion.span
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                transition={{ duration: 0.3 }}
                className="text-[9px] font-bold uppercase tracking-widest text-copper bg-copper/10 px-2 py-0.5 rounded-full"
              >
                EXPLORE →
              </motion.span>
            </div>

            <div className="space-y-1">
              <h3
                className={`font-black tracking-tight leading-[1.0] transition-colors duration-300 ${
                  isActive ? "text-copper" : "text-foreground"
                }`}
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)" }}
              >
                {study.name.toUpperCase()}
              </h3>
              <p className="text-xs font-semibold text-muted-foreground">{field}</p>
            </div>
          </div>

          {/* Abstract system visual */}
          <AbstractVisual projectId={study.id} isActive={isActive} />

          {/* Card footer arrow */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
              {study.currentState}
            </span>
            <motion.span
              animate={{ x: isActive ? 3 : 0, y: isActive ? -3 : 0, opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.3, ease: EASE.outExpo }}
              className="text-sm font-light text-foreground"
              aria-hidden
            >
              ↗
            </motion.span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

// ─── Main Section Component ──────────────────────────────────────────────────
export function SelectedWork() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>("crewly");
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);

  const handleSelectNext = () => {
    if (!selectedStudy) return;
    const i = caseStudies.findIndex((c) => c.id === selectedStudy.id);
    setSelectedStudy(caseStudies[(i + 1) % caseStudies.length] ?? null);
  };
  const handleSelectPrev = () => {
    if (!selectedStudy) return;
    const i = caseStudies.findIndex((c) => c.id === selectedStudy.id);
    setSelectedStudy(
      caseStudies[(i - 1 + caseStudies.length) % caseStudies.length] ?? null
    );
  };

  return (
    <section id="work" className="relative isolate px-5 sm:px-6">

      {/* ── Section Header ── */}
      <div className="mx-auto max-w-6xl pt-[10vh] pb-10 md:pt-[14vh] md:pb-14">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper mb-4">
            WORK
          </p>
          <h2
            className="display-xl font-extrabold tracking-tight text-foreground leading-[0.97]"
            style={{ fontSize: "clamp(2.4rem, 7.5vw, 5rem)" }}
          >
            What we're building.
          </h2>
        </Reveal>
      </div>

      {/* ── Desktop Horizontal Shelf ── */}
      <div
        className="mx-auto max-w-6xl hidden md:grid grid-cols-3 gap-6 items-start"
        onMouseEnter={() => setIsUserHovering(true)}
        onMouseLeave={() => setIsUserHovering(false)}
      >
        {/* Continuous drift container wrapper */}
        {caseStudies.map((study, idx) => {
          const isActive = activeProjectId === study.id;
          return (
            <motion.div
              key={study.id}
              animate={
                !isUserHovering
                  ? {
                      y: [0, idx % 2 === 0 ? -4 : 4, 0],
                    }
                  : { y: 0 }
              }
              transition={{
                duration: 6 + idx,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <DesktopPanel
                study={study}
                isActive={isActive}
                onHover={() => setActiveProjectId(study.id)}
                onOpen={() => setSelectedStudy(study)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Mobile Vertical Interactive Sequence ── */}
      <div className="md:hidden mx-auto max-w-6xl space-y-8">
        {caseStudies.map((study) => {
          const story = STORIES[study.id]!;
          const isActive = activeProjectId === study.id;

          return (
            <Reveal key={study.id}>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveProjectId(study.id);
                    setSelectedStudy(study);
                  }}
                  className={`group w-full text-left rounded-2xl border p-7 transition-all duration-300
                    ${
                      isActive
                        ? "border-copper/60 bg-surface/80"
                        : "border-border/50 bg-background hover:border-copper/40"
                    }
                    focus-visible:outline-none active:scale-[0.99]`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-copper">
                        {study.number}
                      </span>
                      <h3 className="text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-copper">
                        {study.name.toUpperCase()}
                      </h3>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {SHELF[study.id]!.field}
                      </p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-copper bg-copper/10 px-2 py-1 rounded-full">
                      EXPLORE →
                    </span>
                  </div>

                  <AbstractVisual projectId={study.id} isActive={isActive} />
                </button>

                {/* Mobile story card directly below */}
                <div className="rounded-xl border border-border/30 bg-surface/30 p-6 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-copper">
                    TRUSTED COLLABORATION — {story.project}
                  </p>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {story.quote}
                  </p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    — {story.attribution} · {story.role}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ── Desktop Dynamic Trusted Collaboration ── */}
      <div className="hidden md:block">
        <TrustedCollaborationSection activeId={activeProjectId} />
      </div>

      {/* ── Section Footer ── */}
      <div className="mx-auto max-w-6xl pb-[10vh] md:pb-[14vh]">
        <div className="border-t border-border/40 pt-7 flex items-center justify-between">
          <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">
            03 systems · built end-to-end
          </p>
          <a
            href="#contact"
            className="text-xs font-semibold text-foreground transition-colors hover:text-copper"
          >
            Start a project →
          </a>
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      <CaseStudyModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </section>
  );
}
