/**
 * ProblemsWeSolve — premium interactive section
 *
 * Chapter 01 — Four intelligence directions
 *   Desktop : horizontal accordion — hover to expand one column
 *   Mobile  : vertical accordion — tap to expand one row
 *
 * Chapter 02 — System construction pipeline
 *   Desktop : horizontal nodes + scroll-driven connecting line
 *   Mobile  : vertical scroll-driven timeline
 *
 * Closing  : large quiet statement
 */
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { Reveal } from "./Reveal";
import { EASE, DUR } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INTELLIGENCE = [
  {
    id: "see",
    num: "01",
    code: "SEE",
    title: "Visual Intelligence",
    description: "Understand the physical and visual world.",
    sub: "Computer vision · Image analysis · Video intelligence",
  },
  {
    id: "understand",
    num: "02",
    code: "UNDERSTAND",
    title: "Generative Intelligence",
    description: "Turn complex information into useful understanding.",
    sub: "Generative AI · Multimodal systems · Knowledge intelligence",
  },
  {
    id: "act",
    num: "03",
    code: "ACT",
    title: "Autonomous Intelligence",
    description: "Move from AI that answers to AI that does.",
    sub: "Agents · Automation · Decision systems",
  },
  {
    id: "predict",
    num: "04",
    code: "PREDICT",
    title: "Predictive Intelligence",
    description: "Turn data into better decisions about what comes next.",
    sub: "Forecasting · Predictive models · Analytics",
  },
] as const;

const BUILD_STEPS = [
  { num: "01", title: "Problem",      desc: "Understand what actually needs solving." },
  { num: "02", title: "Research",     desc: "Find where AI can make a difference." },
  { num: "03", title: "Intelligence", desc: "Design the right models, data, and logic." },
  { num: "04", title: "Product",      desc: "Connect intelligence to a usable system." },
  { num: "05", title: "Impact",       desc: "Put it into the real world." },
] as const;

// ─── Chapter 01 — Desktop horizontal accordion ────────────────────────────────

function DesktopIntelligenceColumn({
  item,
  isActive,
  isAnyActive,
  onEnter,
  onLeave,
}: {
  item: (typeof INTELLIGENCE)[number];
  isActive: boolean;
  isAnyActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      animate={{ flex: isActive ? "3 3 0%" : "1 1 0%" }}
      transition={{ duration: 0.62, ease: EASE.inOutQuart }}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={item.code}
      className="relative overflow-hidden border-r border-border/40 last:border-r-0
        focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-copper/50
        cursor-default"
      style={{ minWidth: 0 }}
    >
      <div className="flex h-full flex-col justify-between px-8 py-10 xl:px-10 xl:py-12">

        {/* top */}
        <div className="space-y-5">
          {/* number */}
          <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-copper/60">
            {item.num}
          </span>

          {/* code word */}
          <h3
            className="font-black leading-none tracking-tight transition-colors duration-500"
            style={{
              fontSize: isActive
                ? "clamp(1.6rem, 3vw, 2.4rem)"
                : "clamp(1.2rem, 2vw, 1.8rem)",
              color: isActive
                ? "oklch(0.56 0.12 48)"
                : isAnyActive
                ? "oklch(0.18 0.012 60 / 0.35)"
                : "oklch(0.18 0.012 60 / 0.75)",
              transition: "color 0.5s, font-size 0.6s cubic-bezier(0.76,0,0.24,1)",
            }}
          >
            {item.code}
          </h3>

          {/* expanded: title + description */}
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.38, ease: EASE.outExpo, delay: 0.08 }}
                className="space-y-3"
              >
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-[28ch]">
                  {item.description}
                </p>
                <p className="text-[10px] text-muted-foreground/55 font-medium pt-1">
                  {item.sub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* bottom — plus rotates */}
        <div className="flex items-end justify-between">
          <motion.div
            className="h-px bg-copper origin-left"
            animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 0.7 : 0 }}
            transition={{ duration: 0.55, ease: EASE.outExpo }}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <motion.span
            animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 0.9 : 0.3 }}
            transition={{ duration: DUR.fast, ease: EASE.inOutQuart }}
            className="shrink-0 ml-4 text-xl font-light text-foreground leading-none select-none"
            aria-hidden
          >
            +
          </motion.span>
        </div>
      </div>

      {/* subtle radial glow behind active */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 80%, oklch(0.56 0.12 48 / 0.05), transparent 80%)",
        }}
      />
    </motion.div>
  );
}

// ─── Chapter 01 — Mobile vertical accordion ───────────────────────────────────

function MobileIntelligenceRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof INTELLIGENCE)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-5 py-5 text-left focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.25em] text-copper/60">
          {item.num}
        </span>
        <span
          className="flex-1 font-black tracking-tight transition-colors duration-400"
          style={{
            fontSize: "clamp(1.3rem, 5vw, 1.9rem)",
            color: isOpen ? "oklch(0.56 0.12 48)" : "oklch(0.18 0.012 60 / 0.75)",
          }}
        >
          {item.code}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: DUR.fast, ease: EASE.inOutQuart }}
          className="shrink-0 text-lg font-light text-muted-foreground/50"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE.inOutQuart }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pb-6 pl-9 pr-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <p className="text-[10px] text-muted-foreground/55 font-medium pt-1">{item.sub}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chapter 02 — Desktop horizontal pipeline ─────────────────────────────────

function DesktopPipeline({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 40%"],
  });

  // line draws left→right as user scrolls
  const lineScaleX = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // each node lights up at its own scroll threshold
  const nodeThresholds = [0, 0.18, 0.38, 0.58, 0.78];

  return (
    <div ref={ref} className="relative">
      {/* connecting track */}
      <div className="relative mb-8 h-px w-full bg-border/30">
        {/* animated fill */}
        {!reduced && (
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-border/60 via-copper/50 to-copper/20"
            style={{ scaleX: lineScaleX, transformOrigin: "left", width: "100%" }}
          />
        )}

        {/* center glow — Intelligence → Product junction */}
        <div
          aria-hidden
          className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2
            w-16 h-4 rounded-full blur-md"
          style={{ background: "oklch(0.56 0.12 48 / 0.18)" }}
        />
      </div>

      {/* nodes row */}
      <div className="grid grid-cols-5 gap-0">
        {BUILD_STEPS.map((step, i) => {
          const threshold = nodeThresholds[i] ?? 0;
          // eslint-disable-next-line react-hooks/rules-of-hooks -- safe: array is const-length
          const nodeOpacity = useTransform(
            scrollYProgress,
            [Math.max(0, threshold - 0.05), threshold + 0.12],
            [0.18, 1]
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks -- safe: array is const-length
          const ringOpacity = useTransform(
            scrollYProgress,
            [threshold, threshold + 0.15],
            [0, 1]
          );

          const isCenterJunction = i === 2; // Intelligence node

          return (
            <motion.div
              key={step.num}
              style={{ opacity: reduced ? 1 : nodeOpacity }}
              className="flex flex-col items-center gap-5 px-3"
            >
              {/* node circle */}
              <div className="relative">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background
                    ${isCenterJunction ? "border-copper/50" : "border-border/50"}`}
                >
                  <span className="font-mono text-[11px] font-bold tracking-wider text-copper">
                    {step.num}
                  </span>
                </div>

                {/* gold ring pulse on activation */}
                {!reduced && (
                  <motion.div
                    style={{ opacity: ringOpacity }}
                    className="absolute inset-0 rounded-full ring-1 ring-copper/35"
                    aria-hidden
                  />
                )}

                {/* extra glow on center junction — single merged style */}
                {isCenterJunction && !reduced && (
                  <motion.div
                    style={{
                      opacity: ringOpacity,
                      background:
                        "radial-gradient(circle, oklch(0.56 0.12 48 / 0.14) 0%, transparent 70%)",
                    }}
                    className="absolute -inset-3 rounded-full"
                    aria-hidden
                  />
                )}
              </div>

              {/* title + desc */}
              <div className="text-center space-y-1.5">
                <p className="text-sm font-bold text-foreground">{step.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-[16ch] mx-auto">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chapter 02 — Mobile vertical timeline ────────────────────────────────────

function MobileTimelineNode({
  step,
  isLast,
}: {
  step: (typeof BUILD_STEPS)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div ref={ref} className="flex gap-5">
      {/* left spine */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ opacity: isInView ? 1 : 0.15, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.5, ease: EASE.outExpo }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background"
          style={{
            borderColor: isInView ? "oklch(0.56 0.12 48 / 0.5)" : undefined,
          }}
        >
          <span className="font-mono text-[8px] font-bold tracking-wider text-copper">
            {step.num}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE.outExpo }}
            className="mt-1 w-px flex-1 bg-gradient-to-b from-copper/30 to-border/20 origin-top"
            style={{ minHeight: "2.5rem" }}
          />
        )}
      </div>

      {/* content */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0.2, x: isInView ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE.outExpo, delay: 0.08 }}
        className="pb-8 pt-0.5 space-y-1"
      >
        <p className="text-sm font-bold text-foreground">{step.title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
      </motion.div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function ProblemsWeSolve() {
  const [desktopActiveId, setDesktopActiveId] = useState<string | null>(null);
  const [mobileOpenId, setMobileOpenId]       = useState<string | null>(null);
  const { reducedMotion } = useMotionProfile();

  const toggleMobile = (id: string) =>
    setMobileOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="philosophy" className="relative isolate">

      {/* faint warm bg — no images */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, oklch(0.96 0.008 75 / 0.45), transparent 65%)," +
            "radial-gradient(ellipse 45% 40% at 85% 75%, oklch(0.97 0.006 80 / 0.35), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        {/* ══════════════════════════════════════════════════
            INTRO
        ══════════════════════════════════════════════════ */}
        <div className="pt-[10vh] pb-16 md:pt-[14vh] md:pb-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:items-end">
            <div className="space-y-4">
              <Reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper">
                  THE PROBLEMS WE SOLVE
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  className="display-xl font-extrabold leading-[0.97] tracking-tight text-foreground text-balance"
                  style={{ fontSize: "clamp(2.2rem, 7vw, 4.2rem)" }}
                >
                  Technology is only useful
                  <br />
                  when it solves something.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="space-y-4 text-muted-foreground max-w-prose">
                <p className="text-base leading-relaxed font-medium sm:text-lg text-foreground/80">
                  We start with the problem, not the technology.
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                  We understand what is difficult today, find where intelligence
                  can create an advantage, and build the system around it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            CHAPTER 01 — INTELLIGENCE DIRECTIONS
        ══════════════════════════════════════════════════ */}

        {/* Desktop — horizontal accordion */}
        <div className="hidden md:block">
          <Reveal>
            <div
              className="flex border border-border/40 rounded-2xl overflow-hidden"
              style={{ minHeight: "clamp(260px, 34vh, 400px)" }}
              onMouseLeave={() => setDesktopActiveId(null)}
            >
              {INTELLIGENCE.map((item) => (
                <DesktopIntelligenceColumn
                  key={item.id}
                  item={item}
                  isActive={desktopActiveId === item.id}
                  isAnyActive={desktopActiveId !== null}
                  onEnter={() => setDesktopActiveId(item.id)}
                  onLeave={() => {}}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mobile — vertical accordion */}
        <div className="md:hidden border-t border-border/40">
          {INTELLIGENCE.map((item) => (
            <MobileIntelligenceRow
              key={item.id}
              item={item}
              isOpen={mobileOpenId === item.id}
              onToggle={() => toggleMobile(item.id)}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            CHAPTER 02 — HOW WE BUILD
        ══════════════════════════════════════════════════ */}
        <div className="pt-24 pb-0 md:pt-32">

          {/* chapter header */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-end mb-16 md:mb-20">
            <div className="space-y-3">
              <Reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper">
                  HOW WE BUILD
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  className="display-xl font-extrabold leading-[0.97] tracking-tight text-foreground"
                  style={{ fontSize: "clamp(2rem, 6vw, 3.8rem)" }}
                >
                  From problem
                  <br />
                  to something real.
                </h2>
              </Reveal>
            </div>
            {/* intentionally empty right column — breathing room */}
          </div>

          {/* Desktop pipeline */}
          <div className="hidden md:block pb-0">
            <DesktopPipeline reduced={reducedMotion} />
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden pt-2">
            {BUILD_STEPS.map((step, i) => (
              <MobileTimelineNode
                key={step.num}
                step={step}
                isLast={i === BUILD_STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            CLOSING STATEMENT
        ══════════════════════════════════════════════════ */}
        <div className="py-24 md:py-36">
          <Reveal y={16}>
            <div className="space-y-3 text-center md:text-left md:max-w-3xl">
              <p
                className="display-xl font-extrabold tracking-tight text-foreground leading-[0.97]"
                style={{ fontSize: "clamp(2rem, 6.5vw, 4rem)" }}
              >
                We don't stop at the model.
              </p>
              <p
                className="font-extrabold tracking-tight leading-[0.97]"
                style={{
                  fontSize: "clamp(2rem, 6.5vw, 4rem)",
                  color: "oklch(0.56 0.12 48 / 0.6)",
                }}
              >
                We build the system around it.
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
