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
  const { parallax, choreography } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.heavy);
  const objectY = useTransform(smooth, [0, 1], ["0%", "18%"]);
  const objectScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const objectBlur = useTransform(smooth, [0, 1], ["blur(0px)", "blur(6px)"]);
  const textY = useTransform(smooth, [0, 1], ["0%", "-26%"]);
  const fade = useTransform(smooth, [0, 0.72], [1, 0]);
  const cueFade = useTransform(smooth, [0, 0.25], [1, 0]);

  const step = (i: number) => (choreography ? 0.2 + i * 0.12 : 0);
  const anim = (delay: number, duration = DUR.hero) =>
    choreography
      ? { delay, duration, ease: EASE.outExpo }
      : { duration: 0.01 };

  return (
    <section ref={ref} id="top" className="veil relative isolate h-[112vh] overflow-hidden">
      <Backdrop layers={[{ src: bgHero1 }, { src: bgHero2 }]} intensity={0.5} />

      <motion.div
        style={parallax ? { y: objectY, scale: objectScale, filter: objectBlur } : undefined}
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[2vh]"
      >
        <motion.img
          src={heroObject}
          alt="Abstract frosted glass form representing layered intelligent systems"
          width={1408}
          height={1408}
          initial={choreography ? { opacity: 0, scale: 1.05, filter: "blur(20px)" } : false}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={anim(0, 1.5)}
          className="w-[min(44vh,440px)] max-w-none select-none opacity-90 [mask-image:radial-gradient(70%_70%_at_50%_60%,#000_55%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        style={parallax ? { y: textY, opacity: fade } : undefined}
        className="relative z-10 mx-auto flex h-screen max-w-5xl flex-col items-center justify-start px-6 pt-[17vh] text-center"
      >
        <motion.p
          initial={choreography ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(step(0), DUR.slow)}
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.34em] text-muted-foreground"
        >
          Ru'ya Studio
        </motion.p>

        <h1 className="display-xl text-[clamp(2.2rem,6.2vw,5rem)]">
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
          className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground"
        >
          AI Engineer specializing in Computer Vision, Generative AI, Deep
          Learning, Autonomous Agents and end-to-end AI products.
        </motion.p>

        <motion.div
          initial={choreography ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={anim(step(5), DUR.slow + 0.2)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.99]"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-xl border border-border bg-background/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-copper hover:text-copper"
          >
            Let's Build Together
          </a>
        </motion.div>
      </motion.div>

      {choreography && (
        <motion.div
          style={parallax ? { opacity: cueFade } : undefined}
          className="absolute inset-x-0 bottom-[12vh] z-10 flex justify-center"
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
