import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Item = { label: string; detail: string };

const RINGS: Array<{ id: string; radius: number; duration: number; dir: 1 | -1; items: Item[] }> = [
  {
    id: "Experience",
    radius: 176,
    duration: 46,
    dir: 1,
    items: [
      { label: "AR Retail", detail: "Virtual try-on pipelines shipped to production" },
      { label: "Computer Vision", detail: "Detection & tracking models at the edge" },
      { label: "Applied ML", detail: "From dataset design to deployed inference" },
    ],
  },
  {
    id: "Projects",
    radius: 254,
    duration: 62,
    dir: -1,
    items: [
      { label: "Mirror", detail: "Real-time AR fitting room" },
      { label: "Signal", detail: "Vision QA for manufacturing lines" },
      { label: "Atlas", detail: "Retrieval-augmented product search" },
      { label: "Fold", detail: "On-device pose estimation" },
    ],
  },
  {
    id: "Stack",
    radius: 330,
    duration: 80,
    dir: 1,
    items: [
      { label: "PyTorch", detail: "Training & fine-tuning" },
      { label: "TypeScript", detail: "Product surface" },
      { label: "Three.js", detail: "Realtime 3D" },
      { label: "Python", detail: "Data & services" },
      { label: "ONNX", detail: "Edge deployment" },
    ],
  },
];

function Tag({
  item,
  onHover,
  counterDuration,
  dir,
}: {
  item: Item;
  onHover: (d: string | null) => void;
  counterDuration: number;
  dir: 1 | -1;
}) {
  return (
    <motion.span
      className="pointer-events-auto inline-flex cursor-default items-center rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[11px] font-medium tracking-wide text-foreground/80 backdrop-blur-md transition-colors hover:border-copper/50 hover:text-copper"
      style={{ boxShadow: "var(--shadow-glass)" }}
      animate={{ rotate: dir * -360 }}
      transition={{ duration: counterDuration, ease: "linear", repeat: Infinity }}
      onHoverStart={() => onHover(item.detail)}
      onHoverEnd={() => onHover(null)}
      onFocus={() => onHover(item.detail)}
      onBlur={() => onHover(null)}
      tabIndex={0}
    >
      {item.label}
    </motion.span>
  );
}

export function OrbitRings({ reducedMotion }: { reducedMotion: boolean }) {
  const [detail, setDetail] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const flat = RINGS.flatMap((r) => r.items);

  useEffect(() => {
    if (!mobile || reducedMotion) return;
    const id = setInterval(() => setCycle((c) => (c + 1) % flat.length), 2600);
    return () => clearInterval(id);
  }, [mobile, reducedMotion, flat.length]);

  if (reducedMotion) {
    return (
      <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-2">
        {flat.map((i) => (
          <span
            key={i.label}
            className="rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[11px] font-medium text-foreground/80"
          >
            {i.label}
          </span>
        ))}
      </div>
    );
  }

  if (mobile) {
    const item = flat[cycle % flat.length]!;
    return (
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.span
          key={item.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[11px] font-medium text-copper backdrop-blur-md"
        >
          {item.label}
        </motion.span>
        <span className="max-w-[16rem] text-center text-[11px] text-muted-foreground">
          {item.detail}
        </span>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
      onMouseOver={() => setPaused(true)}
      onMouseOut={() => setPaused(false)}
    >
      {RINGS.map((ring) => (
        <motion.div
          key={ring.id}
          className="absolute rounded-full border border-glass-border/70"
          style={{ width: ring.radius * 2, height: ring.radius * 2 }}
          animate={{ rotate: ring.dir * 360 }}
          transition={{
            duration: ring.duration,
            ease: "linear",
            repeat: Infinity,
          }}
          {...(paused && detail ? { style: { width: ring.radius * 2, height: ring.radius * 2, animationPlayState: "paused" } } : {})}
        >
          {ring.items.map((item, i) => {
            const angle = (i / ring.items.length) * Math.PI * 2;
            return (
              <span
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${Math.cos(angle) * ring.radius}px, ${
                    Math.sin(angle) * ring.radius
                  }px)`,
                }}
              >
                <Tag item={item} onHover={setDetail} counterDuration={ring.duration} dir={ring.dir} />
              </span>
            );
          })}
        </motion.div>
      ))}
      <motion.p
        className="absolute bottom-24 text-xs text-muted-foreground"
        animate={{ opacity: detail ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {detail}
      </motion.p>
    </div>
  );
}