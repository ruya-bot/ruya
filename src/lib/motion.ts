import type { Transition } from "framer-motion";

/** Apple-style deceleration curves. Nothing bounces, nothing wobbles. */
export const EASE = {
  /** Primary entrance curve — fast start, long settle. */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Toggles and reversible state changes. */
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  /** Hover / press feedback. */
  outQuint: [0.22, 1, 0.36, 1] as const,
  /** Mobile smooth touch curve. */
  smoothTouch: [0.2, 0.8, 0.2, 1] as const,
  /** Scroll-linked mapping — near-linear so it tracks the finger. */
  linear: [0.25, 0.25, 0.75, 0.75] as const,
};

export const DUR = {
  instant: 0.12,
  fast: 0.22,
  base: 0.42,
  slow: 0.72,
  hero: 1.1,
};

/** Critically-damped springs used for scroll smoothing (no overshoot). */
export const SCROLL_SPRING = {
  /** Hero / large parallax masses — snappy yet fluid on mobile GPUs. */
  heavy: { stiffness: 75, damping: 28, mass: 0.5, restDelta: 0.001 },
  /** Section-level visuals. */
  base: { stiffness: 95, damping: 28, mass: 0.38, restDelta: 0.001 },
  /** Chrome, progress bars, small accents. */
  light: { stiffness: 160, damping: 32, mass: 0.24, restDelta: 0.001 },
} as const;

export const enter = (delay = 0, duration = DUR.slow): Transition => ({
  delay,
  duration,
  ease: EASE.outExpo,
});

/** Subtle spring for interactive feedback — settles without overshoot. */
export const feedback: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/** Snappy mobile tap spring response. */
export const tapSpring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.4,
};

