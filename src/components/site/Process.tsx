import { Reveal } from "./Reveal";

const processSteps = [
  {
    num: "01",
    title: "Discover",
    description:
      "We begin with the problem, not the technology. Understand users, workflows, constraints, data, objectives, and success criteria.",
    output: "Problem definition + technical direction",
  },
  {
    num: "02",
    title: "Research",
    description:
      "Determine where AI actually creates value. Evaluate models, architectures, datasets, APIs, infrastructure, and technical approaches.",
    output: "AI strategy + technical roadmap",
  },
  {
    num: "03",
    title: "Prototype",
    description:
      "Turn the concept into something tangible. Validate the experience, intelligence, and technical feasibility.",
    output: "Functional AI prototype",
  },
  {
    num: "04",
    title: "Engineer",
    description:
      "Transform the prototype into a real product. Frontend, backend, AI infrastructure, databases, APIs, integrations, and supporting systems.",
    output: "Production-ready system",
  },
  {
    num: "05",
    title: "Deploy",
    description:
      "Prepare the system for real-world usage. Deployment, optimization, monitoring, and scalable cloud infrastructure.",
    output: "Deployed AI system",
  },
  {
    num: "06",
    title: "Evolve",
    description:
      "Analyze performance and feedback. Continuously retrain models and optimize system responsiveness.",
    output: "Intelligence that gets better over time",
  },
];

export function Process() {
  return (
    <section id="process" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] border-y border-border">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              How We Work
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              From problem to intelligence.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              A disciplined, engineering-first methodology designed to take complex problems from
              research to production deployment.
            </p>
          </div>
        </Reveal>

        {/* Process Horizontal/Vertical Scroll Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-copper tracking-widest">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      STAGE {step.num}
                    </span>
                  </div>
                  <h3 className="display-xl text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background p-3.5 space-y-1">
                  <p className="text-[10px] font-bold tracking-wider text-copper uppercase">
                    DELIVERABLE OUTPUT
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    {step.output}
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
