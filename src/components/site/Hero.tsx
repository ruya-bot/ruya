import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Backdrop } from "./Backdrop";
import { EASE, DUR, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import heroObject from "@/assets/hero-object.jpg";
import bgHero1 from "@/assets/bg-hero-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { parallax, choreography, compact } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.heavy);
  const objectY = useTransform(smooth, [0, 1], ["0%", compact ? "8%" : "14%"]);
  const objectRotate = useTransform(smooth, [0, 1], [0, compact ? 10 : 18]);
  const objectScale = useTransform(smooth, [0, 1], [1, compact ? 1.05 : 1.1]);
  const objectBlur = useTransform(smooth, [0, 1], ["blur(0px)", compact ? "blur(2px)" : "blur(4px)"]);
  const textY = useTransform(smooth, [0, 1], ["0%", compact ? "-8%" : "-18%"]);
  const fade = useTransform(smooth, [0, 0.75], [1, 0]);

  const anim = (delay: number, duration = DUR.hero) =>
    choreography
      ? { delay, duration, ease: EASE.outExpo }
      : { duration: 0.01 };

  return (
    <section
      ref={ref}
      id="top"
      className="veil relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden py-16 sm:py-24 md:min-h-[100vh]"
    >
      <Backdrop layers={[{ src: bgHero1 }, { src: bgHero2 }]} intensity={0.4} />

      {/* Abstract Floating AI System Computational Visual */}
      <motion.div
        style={parallax ? { y: objectY, rotate: objectRotate, scale: objectScale, filter: objectBlur } : {}}
        className="pointer-events-none absolute inset-0 flex items-center justify-center pt-10 md:pt-14 gpu-layer"
      >
        <motion.img
          src={heroObject}
          alt="Abstract computational system structure representing intelligent infrastructure"
          width={1408}
          height={1408}
          initial={choreography ? { opacity: 0, scale: 1.04, filter: "blur(18px)" } : false}
          animate={{ opacity: 0.85, scale: 1, filter: "blur(0px)" }}
          transition={anim(0, 1.4)}
          className="w-[min(40vh,86vw,440px)] max-w-none select-none gpu-layer [mask-image:radial-gradient(70%_70%_at_50%_50%,#000_56%,transparent_100%)]"
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={parallax ? { y: textY, opacity: fade } : {}}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-5 text-center pt-safe pb-safe my-auto"
      >
        {/* Minimal Badge */}
        <motion.div
          initial={choreography ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.1, DUR.slow)}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-background/80 px-4 py-1.5 backdrop-blur-md shadow-2xs"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-copper sm:text-[11px]">
            AI Engineering · Intelligent Products
          </span>
        </motion.div>

        {/* Master Headline */}
        <h1 className="display-xl text-balance text-[clamp(2.4rem,9.2vw,5.6rem)] leading-[0.93] text-foreground tracking-tight">
          <motion.span
            initial={choreography ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={anim(0.2, DUR.hero)}
            className="block font-extrabold"
          >
            Intelligent Systems.
          </motion.span>
          <motion.span
            initial={choreography ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={anim(0.32, DUR.hero)}
            className="block text-copper-gradient font-extrabold"
          >
            Built for the Real World.
          </motion.span>
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={choreography ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.44, DUR.slow + 0.2)}
          className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:mt-8 sm:text-[17px] font-normal"
        >
          We design and build intelligent products for real-world problems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={choreography ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.56, DUR.slow + 0.2)}
          className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3.5 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <a
            href="#contact"
            className="inline-flex justify-center rounded-xl bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] hover:bg-foreground/92 active:scale-[0.96] sm:py-3.5 shadow-sm"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="inline-flex justify-center rounded-xl border border-border bg-background/90 px-8 py-4 text-sm font-semibold backdrop-blur touch-manipulation transition-all duration-200 hover:border-copper hover:text-copper active:scale-[0.96] sm:py-3.5"
          >
            Explore Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
