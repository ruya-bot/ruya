import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

/**
 * Scroll-triggered entrance. Fires once, at ~22% visibility, never replays.
 * Reduced motion renders the content immediately with no transform or blur.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
  blur = 8,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  blur?: number;
}) {
  const { choreography, lowPower, compact } = useMotionProfile();

  if (!choreography) {
    return <div className={className}>{children}</div>;
  }

  // Low-end / mobile devices drop heavy blur filter repaints and use responsive offsets.
  const useBlur = !lowPower && !compact && blur > 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: compact || lowPower ? Math.min(y, 10) : y,
        ...(useBlur ? { filter: `blur(${blur}px)` } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(useBlur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{
        once: true,
        amount: compact ? 0.14 : 0.22,
        margin: compact ? "0px 0px -4% 0px" : "0px 0px -10% 0px",
      }}
      transition={{
        delay: lowPower ? delay * 0.5 : delay,
        duration: lowPower ? DUR.base : compact ? DUR.base + 0.1 : DUR.slow + 0.18,
        ease: EASE.outExpo,
        opacity: {
          delay: lowPower ? delay * 0.5 : delay,
          duration: lowPower ? DUR.base : DUR.slow,
          ease: EASE.linear,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

