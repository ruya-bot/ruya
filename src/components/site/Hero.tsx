import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Backdrop } from "./Backdrop";
import heroObject from "@/assets/hero-object.jpg";
import bgHero1 from "@/assets/bg-hero-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";

const lines = ["Designing Intelligent Systems", "for Real-World Problems."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const objectY = useTransform(smooth, [0, 1], ["0%", "18%"]);
  const objectScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const textY = useTransform(smooth, [0, 1], ["0%", "-28%"]);
  const fade = useTransform(smooth, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="veil relative isolate h-[112vh] overflow-hidden">
      <Backdrop layers={[{ src: bgHero1 }, { src: bgHero2 }]} intensity={0.5} />
      <motion.div
        style={{ y: objectY, scale: objectScale }}
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[2vh]"
      >
        <motion.img
          src={heroObject}
          alt="Abstract frosted glass form representing layered intelligent systems"
          width={1408}
          height={1408}
          initial={{ opacity: 0, scale: 1.06, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[min(44vh,440px)] max-w-none select-none opacity-90 [mask-image:radial-gradient(70%_70%_at_50%_60%,#000_55%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-screen max-w-5xl flex-col items-center justify-start px-6 pt-[17vh] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.34em] text-muted-foreground"
        >
          Ru'ya Studio
        </motion.p>

        <h1 className="display-xl text-[clamp(2.2rem,6.2vw,5rem)]">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: "0.3em", filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground"
        >
          AI Engineer specializing in Computer Vision, Generative AI, Deep
          Learning, Autonomous Agents and end-to-end AI products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.02]"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-xl border border-border bg-background/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors duration-200 hover:border-copper hover:text-copper"
          >
            Let's Build Together
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-[12vh] z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="h-9 w-[22px] rounded-full border border-border"
          aria-hidden="true"
        >
          <motion.span
            animate={{ y: [4, 14, 4], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="mx-auto block h-1.5 w-1.5 rounded-full bg-copper"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
