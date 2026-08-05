import { motion, useReducedMotion } from "framer-motion";
import LottieImport from "lottie-react";
import { useEffect, useRef, useState } from "react";

import { HeroScene } from "./HeroScene";
import { OrbitRings } from "./OrbitRings";
import loadingPulse from "@/lottie/loading-pulse.json";
import scrollCue from "@/lottie/scroll-cue.json";
import ctaArrow from "@/lottie/cta-arrow.json";

// lottie-react is CJS; interop can hand back the module namespace object.
const Lottie = ((LottieImport as any)?.default ?? LottieImport) as typeof LottieImport;

export function Hero() {
  const prefersReduced = !!useReducedMotion();
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hoverCta, setHoverCta] = useState(false);
  const ctaLottie = useRef<any>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", on);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Entrance timing is relative to the 3D canvas being ready (or immediate
  // when reduced motion is on).
  const base = prefersReduced ? 0 : 2.0;
  const show = prefersReduced || ready;
  const rise = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 14 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, delay: prefersReduced ? 0 : base + delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const scrollToWork = () => {
    document
      .getElementById("work")
      ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-background">
      <HeroScene onReady={() => setReady(true)} reducedMotion={prefersReduced} mobile={mobile} />

      {!prefersReduced && !ready && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Lottie animationData={loadingPulse} loop className="h-20 w-20" />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <OrbitRings reducedMotion={prefersReduced} />

        <motion.h1
          {...rise(0)}
          className="relative text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mohammed&nbsp;Sanin
        </motion.h1>

        <motion.p {...rise(0.4)} className="relative mt-4 text-lg text-foreground/85 sm:text-xl">
          AI/ML engineer &amp; product builder.
        </motion.p>

        <motion.p {...rise(0.55)} className="relative mt-2 max-w-md text-sm text-muted-foreground">
          AR retail, computer vision, applied ML — shipped end to end.
        </motion.p>

        {mobile && <OrbitRings reducedMotion={prefersReduced} />}

        <motion.div {...rise(1.2)} className="relative mt-8">
          <button
            type="button"
            onClick={scrollToWork}
            onMouseEnter={() => {
              setHoverCta(true);
              ctaLottie.current?.goToAndPlay?.(0, true);
            }}
            onMouseLeave={() => setHoverCta(false)}
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-glass px-6 py-3 text-sm font-medium text-copper backdrop-blur-md transition-colors hover:bg-copper hover:text-background"
            style={{ boxShadow: "var(--shadow-glass)" }}
          >
            See the work
            {prefersReduced ? (
              <span aria-hidden="true">↓</span>
            ) : (
              <Lottie
                lottieRef={ctaLottie}
                animationData={ctaArrow}
                loop={false}
                autoplay={false}
                className="h-4 w-4"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">{hoverCta ? "" : ""}</span>
          </button>
        </motion.div>
      </div>

      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: show && !pastHero ? 1 : 0 }}
          transition={{ duration: 0.6, delay: show && !pastHero ? base + 1.5 : 0 }}
        >
          <Lottie animationData={scrollCue} loop className="h-12 w-9" aria-hidden="true" />
        </motion.div>
      )}
    </section>
  );
}