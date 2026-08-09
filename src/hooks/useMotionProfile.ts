import { useEffect, useState } from "react";

export type MotionProfile = {
  /** User asked for reduced motion. */
  reducedMotion: boolean;
  /** Device looks low-powered (few cores, little RAM, data saver). */
  lowPower: boolean;
  /** Safe to run scroll-linked parallax / continuous transforms. */
  parallax: boolean;
  /** Safe to run entrance choreography (stagger, blur, translate). */
  choreography: boolean;
  /** Small / touch-first viewport. */
  compact: boolean;
  /** Resolved once on the client — false during SSR/first paint. */
  ready: boolean;
};

const SSR_PROFILE: MotionProfile = {
  reducedMotion: false,
  lowPower: false,
  parallax: false,
  choreography: true,
  compact: false,
  ready: false,
};

function detectLowPower(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData === true;
  const slowNet = /(^|[^4])2g/.test(nav.connection?.effectiveType ?? "");

  // Modern phones handle spring parallax fine — only bail on genuinely weak
  // hardware or constrained networks.
  return (cores <= 4 && memory <= 4) || saveData || slowNet;
}

function detectCompact(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Single source of truth for motion capability.
 *
 * - `prefers-reduced-motion: reduce` removes all choreography and parallax.
 * - Low-end devices (<=4 cores / <=4GB RAM / data saver / slow network /
 *   small touch screens) keep entrance fades but drop scroll-linked
 *   transforms, which are the expensive part.
 */
export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(SSR_PROFILE);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resolve = () => {
      const reducedMotion = mq.matches;
      const lowPower = detectLowPower();
      setProfile({
        reducedMotion,
        lowPower,
        parallax: !reducedMotion && !lowPower,
        choreography: !reducedMotion,
        compact: detectCompact(),
        ready: true,
      });
    };

    resolve();
    mq.addEventListener("change", resolve);
    window.addEventListener("resize", resolve);
    return () => {
      mq.removeEventListener("change", resolve);
      window.removeEventListener("resize", resolve);
    };
  }, []);

  return profile;
}
