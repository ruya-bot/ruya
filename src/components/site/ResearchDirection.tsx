import { Reveal } from "./Reveal";

const researchThemes = [
  {
    title: "Computer Vision",
    description: "Teaching machines to observe and interpret complex visual environments.",
  },
  {
    title: "Generative Intelligence",
    description: "Building useful systems around foundation models and multimodal AI.",
  },
  {
    title: "Agentic Systems",
    description: "Moving from AI that answers questions to AI that accomplishes tasks.",
  },
  {
    title: "Predictive Intelligence",
    description: "Using historical and time-series data to anticipate outcomes and support decisions.",
  },
  {
    title: "Human-AI Interaction",
    description: "Designing interfaces where intelligence feels natural rather than intrusive.",
  },
  {
    title: "Spatial Computing",
    description: "Exploring intelligent systems operating within physical and spatial environments.",
  },
  {
    title: "AI for Social Impact",
    description: "Applying AI to mobility, healthcare, education, sustainability, and public infrastructure.",
  },
];

export function ResearchDirection() {
  return (
    <section id="research" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] border-y border-border">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Research Frontiers
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Where Ru’ya is heading.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Exploring emerging paradigms in perception, reasoning, and product interaction.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchThemes.map((theme, i) => (
            <Reveal key={theme.title} delay={i * 0.04}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1 shadow-xs">
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
