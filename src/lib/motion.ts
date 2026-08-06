import type { Transition } from "framer-motion";

/** Apple-style deceleration curves. Nothing bounces, nothing wobbles. */
export const EASE = {
  /** Primary entrance curve — fast start, long settle. */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Toggles and reversible state changes. */
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  /** Hover / press feedback. */
  outQuint: [0.22, 1, 0.36, 1] as const,
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
  /** Hero / large parallax masses. */
  heavy: { stiffness: 62, damping: 24, mass: 0.6, restDelta: 0.001 },
  /** Section-level visuals. */
  base: { stiffness: 80, damping: 26, mass: 0.42, restDelta: 0.001 },
  /** Chrome, progress bars, small accents. */
  light: { stiffness: 140, damping: 30, mass: 0.28, restDelta: 0.001 },
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
