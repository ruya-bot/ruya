import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Backdrop } from "./Backdrop";
import { EASE, DUR, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import heroObject from "@/assets/hero-object.jpg";
import bgHero1 from "@/assets/bg-hero-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";

const lines = ["Designing Intelligent Systems", "for Real-World Problems."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { parallax, choreography, compact } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.heavy);
  const objectY = useTransform(smooth, [0, 1], ["0%", compact ? "12%" : "18%"]);
  const objectScale = useTransform(smooth, [0, 1], [1, compact ? 1.07 : 1.12]);
  const objectBlur = useTransform(smooth, [0, 1], ["blur(0px)", compact ? "blur(3px)" : "blur(6px)"]);
  const textY = useTransform(smooth, [0, 1], ["0%", compact ? "-14%" : "-26%"]);
  const fade = useTransform(smooth, [0, 0.72], [1, 0]);
  const cueFade = useTransform(smooth, [0, 0.25], [1, 0]);

  const step = (i: number) => (choreography ? 0.2 + i * 0.12 : 0);
  const anim = (delay: number, duration = DUR.hero) =>
    choreography
      ? { delay, duration, ease: EASE.outExpo }
      : { duration: 0.01 };

  return (
    <section
      ref={ref}
      id="top"
      className="veil relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden py-12 sm:py-16 md:min-h-[100vh]"
    >
      <Backdrop layers={[{ src: bgHero1 }, { src: bgHero2 }]} intensity={0.5} />

      <motion.div
        style={parallax ? { y: objectY, scale: objectScale, filter: objectBlur } : {}}
        className="pointer-events-none absolute inset-0 flex items-center justify-center pt-6 md:pt-10 gpu-layer"
      >
        <motion.img
          src={heroObject}
          alt="Abstract frosted glass form representing layered intelligent systems"
          width={1408}
          height={1408}
          initial={choreography ? { opacity: 0, scale: 1.05, filter: "blur(20px)" } : false}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={anim(0, 1.5)}
          className="w-[min(42vh,86vw,460px)] max-w-none select-none opacity-85 gpu-layer [mask-image:radial-gradient(70%_70%_at_50%_50%,#000_58%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        style={parallax ? { y: textY, opacity: fade } : {}}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-5 text-center pt-safe pb-safe sm:px-6 my-auto"
      >
        <motion.p
          initial={choreography ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(step(0), DUR.slow)}
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:mb-6 sm:text-[11px] sm:tracking-[0.34em]"
        >
          Ru'ya Studio
        </motion.p>

        <h1 className="display-xl text-balance text-[clamp(2.1rem,8.6vw,5rem)] md:text-[clamp(2.2rem,6.2vw,5rem)]">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              initial={
                choreography
                  ? { opacity: 0, y: "0.28em", filter: "blur(10px)" }
                  : false
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={anim(step(1) + i * 0.1)}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={choreography ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(step(4), DUR.slow + 0.2)}
          className="mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:mt-7 sm:text-[17px]"
        >
          AI Engineer specializing in Computer Vision, Generative AI, Deep
          Learning, Autonomous Agents and end-to-end AI products.
        </motion.p>

        <motion.div
          initial={choreography ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(step(5), DUR.slow + 0.2)}
          className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <a
            href="#projects"
            className="inline-flex justify-center rounded-xl bg-foreground px-7 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] active:scale-[0.95] active:opacity-90 sm:py-3.5 shadow-sm"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="inline-flex justify-center rounded-xl border border-border bg-background/70 px-7 py-4 text-sm font-semibold backdrop-blur touch-manipulation transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-copper hover:text-copper active:scale-[0.95] active:opacity-90 sm:py-3.5"
          >
            Let's Build Together
          </a>
        </motion.div>
      </motion.div>

      {choreography && !compact && (
        <motion.div
          style={parallax ? { opacity: cueFade } : {}}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center pb-safe"
        >
          <div className="h-9 w-[22px] rounded-full border border-border" aria-hidden="true">
            <motion.span
              animate={{ y: [4, 14, 4], opacity: [1, 0.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: EASE.inOutQuart }}
              className="mx-auto block h-1.5 w-1.5 rounded-full bg-copper"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
