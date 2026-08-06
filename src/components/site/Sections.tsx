import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import vision from "@/assets/vision.jpg";
import layers from "@/assets/layers.jpg";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgApproach2 from "@/assets/bg-approach-2.jpg";
import bgLayers1 from "@/assets/bg-layers-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";
import bgWork1 from "@/assets/bg-work-1.jpg";
import bgWork2 from "@/assets/bg-work-2.jpg";
import bgStack1 from "@/assets/bg-stack-1.jpg";
import bgClosing1 from "@/assets/bg-closing-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";

function PinnedVisual({
  src,
  alt,
  kicker,
  title,
  body,
  id,
  flip,
  backdrop,
}: {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  body: string;
  id: string;
  flip?: boolean;
  backdrop: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <section id={id} className="relative isolate px-6 py-[14vh]">
      <Backdrop layers={backdrop.map((src) => ({ src }))} intensity={0.9} />
      <div className="mx-auto max-w-6xl">
      <div
        ref={ref}
        className={`grid items-center gap-12 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <motion.div style={{ scale, y, opacity }} className="overflow-hidden rounded-[2rem]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            width={1600}
            height={1008}
            className="w-full"
          />
        </motion.div>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
            {kicker}
          </p>
          <h2 className="display-xl mt-5 text-[clamp(2rem,4.4vw,3.4rem)]">{title}</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            {body}
          </p>
        </Reveal>
      </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "Mirror",
    line: "Real-time AR try-on for retail floors",
    detail: "Pose-aware garment fitting at 60fps on commodity hardware.",
  },
  {
    name: "Fold",
    line: "Vision pipeline for shelf intelligence",
    detail: "Detection, tracking and planogram compliance in one pass.",
  },
  {
    name: "Atlas",
    line: "Applied ML platform, model to product",
    detail: "Training, evaluation and on-device inference, shipped together.",
  },
];

function Projects() {
  return (
    <section id="work" className="relative isolate px-6 py-[10vh]">
      <Backdrop layers={[{ src: bgWork1 }, { src: bgWork2 }]} intensity={0.8} />
      <div className="mx-auto max-w-6xl">
      <Reveal>
        <h2 className="display-xl text-[clamp(2.4rem,6vw,5rem)]">
          Selected <span className="text-copper-gradient">work</span>
        </h2>
      </Reveal>
      <div className="mt-14 space-y-6">
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="sticky"
            style={{ top: `calc(18vh + ${i * 22}px)` }}
          >
            <Reveal delay={i * 0.05}>
              <article className="group grid gap-4 rounded-[2rem] border border-border bg-surface p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] md:grid-cols-[1fr_1.4fr] md:p-12">
                <h3 className="display-xl text-[clamp(1.8rem,3.4vw,2.8rem)]">{p.name}</h3>
                <div>
                  <p className="text-lg font-medium">{p.line}</p>
                  <p className="mt-2 text-muted-foreground">{p.detail}</p>
                  <span className="mt-6 inline-block text-sm font-semibold text-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Case study →
                  </span>
                </div>
              </article>
            </Reveal>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

const stack = [
  "PyTorch",
  "ONNX",
  "Three.js",
  "TypeScript",
  "Computer Vision",
  "ARKit",
  "React",
  "CUDA",
];

function Stack() {
  return (
    <section id="stack" className="relative isolate px-6 py-[14vh]">
      <Backdrop layers={[{ src: bgStack1 }, { src: bgHero2 }]} intensity={0.55} />
      <div className="mx-auto max-w-6xl">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
          The complete package
        </p>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        {stack.map((s, i) => (
          <Reveal key={s} delay={i * 0.04}>
            <span className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-copper hover:text-copper">
              {s}
            </span>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section
      id="contact"
      className="veil relative isolate border-t border-border px-6 py-[18vh] text-center"
    >
      <Backdrop layers={[{ src: bgClosing1 }, { src: bgLayers2 }]} intensity={0.7} />
      <Reveal>
        <h2 className="display-xl mx-auto max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          Let's build something
          <span className="text-copper-gradient"> uncommonly good</span>.
        </h2>
        <a
          href="mailto:hello@sanin.dev"
          className="mt-10 inline-flex rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          hello@sanin.dev
        </a>
        <p className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mohammed Sanin
        </p>
      </Reveal>
    </section>
  );
}

export function Sections() {
  return (
    <>
      <PinnedVisual
        id="approach"
        src={vision}
        alt="Copper wireframe scanning a sculptural white form"
        kicker="Approach"
        title="Systems that see."
        body="Computer vision models tuned for the messy real world — retail lighting, occlusion, motion — then compressed until they run anywhere."
        backdrop={[bgApproach1, bgApproach2]}
      />
      <Projects />
      <PinnedVisual
        id="layers"
        src={layers}
        alt="Layered translucent glass panes with copper rim light"
        kicker="End to end"
        title="Model, product, polish."
        body="Research isn't the finish line. Every layer — data, inference, interface — is designed as one continuous product."
        flip
        backdrop={[bgLayers1, bgLayers2]}
      />
      <Stack />
      <Closing />
    </>
  );
}