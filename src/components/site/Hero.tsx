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
  const objectY = useTransform(smooth, [0, 1], ["0%", compact ? "10%" : "16%"]);
  const objectRotate = useTransform(smooth, [0, 1], [0, compact ? 12 : 22]);
  const objectScale = useTransform(smooth, [0, 1], [1, compact ? 1.06 : 1.12]);
  const objectBlur = useTransform(smooth, [0, 1], ["blur(0px)", compact ? "blur(2px)" : "blur(5px)"]);
  const textY = useTransform(smooth, [0, 1], ["0%", compact ? "-10%" : "-20%"]);
  const fade = useTransform(smooth, [0, 0.75], [1, 0]);

  const anim = (delay: number, duration = DUR.hero) =>
    choreography
      ? { delay, duration, ease: EASE.outExpo }
      : { duration: 0.01 };

  return (
    <section
      ref={ref}
      id="top"
      className="veil relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden py-14 sm:py-20 md:min-h-[100vh]"
    >
      <Backdrop layers={[{ src: bgHero1 }, { src: bgHero2 }]} intensity={0.45} />

      {/* Abstract AI System Object Visual */}
      <motion.div
        style={parallax ? { y: objectY, rotate: objectRotate, scale: objectScale, filter: objectBlur } : {}}
        className="pointer-events-none absolute inset-0 flex items-center justify-center pt-8 md:pt-12 gpu-layer"
      >
        <motion.img
          src={heroObject}
          alt="Abstract computational system structure representing infrastructure"
          width={1408}
          height={1408}
          initial={choreography ? { opacity: 0, scale: 1.05, filter: "blur(20px)" } : false}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={anim(0, 1.4)}
          className="w-[min(42vh,88vw,460px)] max-w-none select-none opacity-85 gpu-layer [mask-image:radial-gradient(70%_70%_at_50%_50%,#000_55%,transparent_100%)]"
        />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={parallax ? { y: textY, opacity: fade } : {}}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-5 text-center pt-safe pb-safe my-auto"
      >
        <motion.p
          initial={choreography ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.1, DUR.slow)}
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-copper sm:mb-6 sm:text-[11px]"
        >
          Ru'ya Studio · AI Engineering & Intelligent Products
        </motion.p>

        <h1 className="display-xl text-balance text-[clamp(2.3rem,9vw,5.4rem)] leading-[0.94] text-foreground tracking-tight">
          <motion.span
            initial={choreography ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={anim(0.2, DUR.hero)}
            className="block"
          >
            Intelligent Systems.
          </motion.span>
          <motion.span
            initial={choreography ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={anim(0.32, DUR.hero)}
            className="block text-copper-gradient"
          >
            Built for the Real World.
          </motion.span>
        </h1>

        <motion.p
          initial={choreography ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.44, DUR.slow + 0.2)}
          className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:mt-8 sm:text-[17px]"
        >
          Ru'ya is an AI engineering and product studio building intelligent software
          for businesses, startups, and organizations. We combine AI research, product
          engineering, and thoughtful design to turn complex problems into useful systems.
        </motion.p>

        <motion.div
          initial={choreography ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(0.56, DUR.slow + 0.2)}
          className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <a
            href="#contact"
            className="inline-flex justify-center rounded-xl bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] active:scale-[0.95] sm:py-3.5 shadow-sm"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="inline-flex justify-center rounded-xl border border-border bg-background/80 px-8 py-4 text-sm font-semibold backdrop-blur touch-manipulation transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-copper hover:text-copper active:scale-[0.95] sm:py-3.5"
          >
            Explore Our Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
