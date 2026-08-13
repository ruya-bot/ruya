import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgApproach2 from "@/assets/bg-approach-2.jpg";

export function StudioThesis() {
  return (
    <section id="about" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgApproach1 }, { src: bgApproach2 }]} intensity={0.8} />

      <div className="mx-auto max-w-4xl text-center space-y-6">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
            ABOUT RU’YA
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display-xl text-balance text-[clamp(2.1rem,7.5vw,4.2rem)] leading-[0.96] font-extrabold text-foreground">
            AI that becomes useful.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            Ru’ya is an AI engineering studio building intelligent products across computer vision, generative AI, autonomous systems, and predictive intelligence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
