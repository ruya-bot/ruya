import { Reveal } from "./Reveal";

const principles = [
  {
    title: "AI-first thinking",
    description: "Determine when AI is actually useful — and when simple engineering is better.",
  },
  {
    title: "End-to-end execution",
    description: "Connect research, infrastructure, APIs, data, deployment, and product experience.",
  },
  {
    title: "Built around real problems",
    description: "Every system begins with a real user, workflow, business constraint, or measurable goal.",
  },
  {
    title: "Fast experimentation",
    description: "Move quickly from initial problem statement to tangible, functional prototype.",
  },
  {
    title: "Human-centered AI",
    description: "Technology should augment people rather than make products unnecessarily complicated.",
  },
  {
    title: "Designed for the future",
    description: "Build with extensibility, maintainability, and future AI capabilities in mind.",
  },
];

export function WhyRuya() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Why Ru'ya Studio
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Research depth. Product thinking. Engineering discipline.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 space-y-3 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                  PRINCIPLE 0{i + 1}
                </span>
                <h3 className="display-xl text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
