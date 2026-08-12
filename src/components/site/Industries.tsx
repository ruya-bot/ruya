import { Reveal } from "./Reveal";

const industriesList = [
  {
    title: "Mobility & Transportation",
    description: "Traffic intelligence, fleet analytics, route intelligence, and predictive systems.",
  },
  {
    title: "Healthcare",
    description: "Prediction systems, health analytics, intelligent workflows, and decision support.",
  },
  {
    title: "Enterprise",
    description: "Internal AI tools, workflow automation, knowledge systems, and intelligent business applications.",
  },
  {
    title: "SaaS & Startups",
    description: "AI-native products, MVPs, intelligent features, and scalable AI infrastructure.",
  },
  {
    title: "Retail & Sustainability",
    description: "Computer vision, recommendation systems, forecasting, and intelligent operational tools.",
  },
  {
    title: "Research & Innovation",
    description: "AI prototypes, experimental systems, technical research, and proof-of-concept development.",
  },
];

export function Industries() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Industry Focus
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Intelligence without industry boundaries.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              We work across domains where intelligent systems can create measurable value.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industriesList.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                  0{i + 1} DOMAIN
                </span>
                <h3 className="display-xl text-lg font-bold text-foreground">
                  {ind.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {ind.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
