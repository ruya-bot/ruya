import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroObject from "@/assets/hero-object.jpg";

const words = ["Mohammed", "Sanin"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const objectY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const objectScale = useTransform(smooth, [0, 1], [1, 1.18]);
  const textY = useTransform(smooth, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(smooth, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[112vh] overflow-hidden veil">
      <motion.div
        style={{ y: objectY, scale: objectScale }}
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[2vh]"
      >
        <motion.img
          src={heroObject}
          alt="Abstract frosted glass sculpture with copper edges"
          width={1408}
          height={1408}
          initial={{ opacity: 0, scale: 1.08, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[min(46vh,470px)] max-w-none select-none opacity-90 [mask-image:radial-gradient(70%_70%_at_50%_60%,#000_55%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-screen max-w-6xl flex-col items-center justify-start px-6 pt-[16vh] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground"
        >
          AI/ML Engineer · Product Builder
        </motion.p>

        <h1 className="display-xl text-[clamp(3rem,11vw,9rem)]">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mr-[0.22em] inline-block last:mr-0"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground"
        >
          AR retail, computer vision and applied ML — designed, engineered and
          shipped end to end.
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-semibold backdrop-blur transition-all hover:border-copper hover:text-copper"
        >
          See the work
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </motion.a>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-[14vh] z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="h-9 w-[22px] rounded-full border border-border"
        >
          <motion.span
            animate={{ y: [4, 14, 4], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="mx-auto block h-1.5 w-1.5 rounded-full bg-copper"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}