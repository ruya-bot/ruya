import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgWork1 from "@/assets/bg-work-1.jpg";


const researchThemes = [
  {
    title: "Computer Vision",
    description: "Visual understanding.",
  },
  {
    title: "Generative AI",
    description: "Intelligence beyond chat.",
  },
  {
    title: "Agentic Systems",
    description: "Autonomous task execution.",
  },
  {
    title: "Predictive Intelligence",
    description: "Data forecasting.",
  },
  {
    title: "Human-AI Interaction",
    description: "Natural interfaces.",
  },
  {
    title: "Spatial Computing",
    description: "Physical environments.",
  },
  {
    title: "AI for Social Impact",
    description: "Mobility and sustainability.",
  },
];

export function ResearchDirection() {
  return (
    <section id="research" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] border-y border-border">
      <Backdrop layers={[{ src: bgApproach1 }, { src: bgWork1 }]} intensity={0.45} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              RESEARCH
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none text-foreground">
              Where we're looking next.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchThemes.map((theme, i) => (
            <Reveal key={theme.title} delay={i * 0.04}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-md p-6 sm:p-8 space-y-4 touch-manipulation transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-copper/45 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-copper/[0.02]">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                    FIELD 0{i + 1}
                  </span>
                  <h3 className="display-xl mt-2 text-lg font-bold text-foreground">
                    {theme.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {theme.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
