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
  const { choreography, lowPower } = useMotionProfile();

  if (!choreography) {
    return <div className={className}>{children}</div>;
  }

  // Low-end devices keep the fade but drop blur (expensive) and shorten stagger.
  const useBlur = !lowPower && blur > 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: lowPower ? Math.min(y, 12) : y,
        ...(useBlur ? { filter: `blur(${blur}px)` } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(useBlur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
      transition={{
        delay: lowPower ? delay * 0.5 : delay,
        duration: lowPower ? DUR.base : DUR.slow + 0.18,
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
