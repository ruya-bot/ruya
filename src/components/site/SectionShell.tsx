import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * Cinematic section wrapper: each section eases in from slightly below and
 * recedes (scale + blur + fade) as the next one takes over — the Apple
 * "one thing at a time" scroll feel.
 */
export function SectionShell({
  children,
  className = "",
  id,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  const opacity = useTransform(p, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    p,
    [0, 0.18, 0.82, 1],
    [1 - 0.06 * intensity, 1, 1, 1 - 0.05 * intensity],
  );
  const y = useTransform(p, [0, 0.18, 0.82, 1], [60 * intensity, 0, 0, -50 * intensity]);
  const blurAmt = useTransform(p, [0, 0.18, 0.82, 1], [10 * intensity, 0, 0, 8 * intensity]);
  const filter = useTransform(blurAmt, (v) => `blur(${v.toFixed(2)}px)`);

  if (reduced) {
    return (
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ opacity, scale, y, filter, willChange: "transform, opacity, filter" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
