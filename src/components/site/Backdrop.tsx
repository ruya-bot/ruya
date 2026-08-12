import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

type Layer = { src: string; alt?: string };

/**
 * Ambient, low-opacity backdrop for a section. Renders 2–3 generated
 * textures at different parallax speeds behind the content. Purely
 * decorative — never blocks pointer events, masked into the white canvas.
 *
 * Reduced motion / low-end devices get a single static layer: no
 * scroll listeners driving transforms, no compositing of 3 large images.
 */
export function Backdrop({
  layers,
  intensity = 1,
}: {
  layers: Layer[];
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax, compact } = useMotionProfile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.base);

  const y0 = useTransform(smooth, [0, 1], compact ? ["-4%", "4%"] : ["-8%", "8%"]);
  const y1 = useTransform(smooth, [0, 1], compact ? ["6%", "-6%"] : ["12%", "-12%"]);
  const y2 = useTransform(smooth, [0, 1], compact ? ["-2%", "8%"] : ["-4%", "16%"]);
  const s0 = useTransform(smooth, [0, 0.5, 1], compact ? [1.08, 1.02, 1.08] : [1.14, 1.04, 1.14]);
  const fade = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const o0 = useTransform(fade, (v) => v * 0.6 * intensity);
  const o1 = useTransform(fade, (v) => v * 0.38 * intensity);
  const o2 = useTransform(fade, (v) => v * 0.24 * intensity);

  const ys = [y0, y1, y2];
  const os = [o0, o1, o2];
  const staticOpacity = [0.5, 0.32, 0.2];

  const visible = parallax
    ? compact
      ? layers.slice(0, 2)
      : layers.slice(0, 3)
    : layers.slice(0, 1);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {visible.map((layer, i) => (
        <motion.img
          key={layer.src}
          src={layer.src}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1200}
          style={
            parallax
              ? {
                  y: ys[i] ?? y0,
                  scale: i === 0 ? s0 : 1.06,
                  opacity: os[i] ?? o2,
                  willChange: "transform, opacity",
                }
              : {
                  scale: 1.04,
                  opacity: (staticOpacity[i] ?? 0.2) * intensity,
                }
          }
          className="gpu-layer absolute inset-0 h-full w-full select-none object-cover mix-blend-multiply [mask-image:radial-gradient(75%_65%_at_50%_50%,#000_0%,transparent_100%)]"
        />
      ))}
    </div>
  );
}

