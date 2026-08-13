import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgLayers1 from "@/assets/bg-layers-1.jpg";
import bgApproach2 from "@/assets/bg-approach-2.jpg";

export function Founder() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgLayers1 }, { src: bgApproach2 }]} intensity={0.35} />
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border/40 bg-surface/50 backdrop-blur-md p-8 sm:p-12 space-y-6 shadow-2xs">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              FOUNDER
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-xl text-balance text-[clamp(1.9rem,6vw,3.4rem)] leading-none text-foreground font-extrabold">
              Built by an engineer.{" "}
              <span className="text-copper-gradient">Designed as a studio.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Ru’ya was founded by Mohammed Sanin, an AI engineer working at the intersection of AI research and real-world products.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
