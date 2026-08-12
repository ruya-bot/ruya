import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import { SCROLL_SPRING } from "@/lib/motion";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgApproach2 from "@/assets/bg-approach-2.jpg";

const pipelineStages = [
  {
    step: "01",
    label: "Problem",
    description: "Identify human, operational, or technical bottlenecks worth solving.",
  },
  {
    step: "02",
    label: "Research",
    description: "Evaluate model architectures, data requirements, and feasibility.",
  },
  {
    step: "03",
    label: "Intelligence",
    description: "Design custom neural pipelines, agent logic, and inference APIs.",
  },
  {
    step: "04",
    label: "Product",
    description: "Craft intuitive interfaces, resilient backends, and user workflows.",
  },
  {
    step: "05",
    label: "Deployment",
    description: "Deploy production infrastructure with monitoring and continuous evolution.",
  },
];

export function StudioThesis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.base);
  const lineScale = useTransform(smooth, [0.15, 0.75], [0, 1]);

  return (
    <section id="about" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgApproach1 }, { src: bgApproach2 }]} intensity={0.8} />

      <div className="mx-auto max-w-6xl space-y-16">
        {/* Editorial Heading */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Studio Thesis
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-xl text-balance text-[clamp(2.1rem,7.5vw,4.2rem)] leading-[0.96]">
              We don't just build AI models.{" "}
              <span className="text-copper-gradient">We build systems around them.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              Artificial intelligence is only valuable when it solves something real. Ru’ya works
              at the intersection of AI research, software engineering, and product design —
              transforming emerging technologies into systems people can actually use.
            </p>
          </Reveal>
        </div>

        {/* Visual System Pipeline Assembly */}
        <div ref={ref} className="relative rounded-3xl border border-border bg-surface p-6 sm:p-10 md:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-copper uppercase">
                THE SYSTEM PIPELINE
              </span>
              <h3 className="display-xl mt-1 text-2xl">
                End-to-End System Assembly
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              From raw problem definition to deployed intelligence.
            </p>
          </div>

          {/* Animated Connecting Line on Desktop */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 origin-left bg-copper md:block"
            />

            {/* Stages Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5 relative z-10">
              {pipelineStages.map((stage, i) => (
                <Reveal key={stage.step} delay={i * 0.08}>
                  <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-background p-5 shadow-xs transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-copper">{stage.step}</span>
                        <span className="h-2 w-2 rounded-full bg-copper/60" />
                      </div>
                      <h4 className="display-xl mt-3 text-lg font-bold text-foreground">
                        {stage.label}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
