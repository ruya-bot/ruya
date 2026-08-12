import { Reveal } from "./Reveal";

const techGroups = [
  {
    discipline: "AI / ML",
    items: ["Python", "PyTorch", "TensorFlow", "OpenCV", "Scikit-learn"],
  },
  {
    discipline: "Generative AI",
    items: ["LLMs", "RAG Systems", "Multimodal Models", "Agentic Workflows", "Vertex AI"],
  },
  {
    discipline: "Product Engineering",
    items: ["React", "React Native", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    discipline: "Backend & Storage",
    items: ["FastAPI", "Node.js", "REST APIs", "PostgreSQL", "Supabase"],
  },
  {
    discipline: "Infrastructure & Data",
    items: ["Google Cloud", "Docker", "Cloud Storage", "Model Deployment", "Data Pipelines"],
  },
];

export function Technology() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Technology Stack
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Modern tools. Serious engineering.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <Reveal key={group.discipline} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1 shadow-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                    0{i + 1} DISCIPLINE
                  </span>
                  <h3 className="display-xl text-base font-bold text-foreground">
                    {group.discipline}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
