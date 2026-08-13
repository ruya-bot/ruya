import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgStack1 from "@/assets/bg-stack-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";


const techGroups = [
  {
    discipline: "AI & Machine Learning",
    items: ["Python", "PyTorch", "TensorFlow", "OpenCV"],
  },
  {
    discipline: "Product & APIs",
    items: ["React", "FastAPI", "TypeScript", "PostgreSQL"],
  },
  {
    discipline: "Cloud & Infrastructure",
    items: ["Google Cloud", "Vertex AI", "Docker"],
  },
];

export function Technology() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgStack1 }, { src: bgHero2 }]} intensity={0.4} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              THE TOOLKIT
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none text-foreground">
              Built with modern intelligence.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <Reveal key={group.discipline} delay={i * 0.05}>
              <div className="rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-md p-6 sm:p-8 space-y-4 touch-manipulation transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-copper/45 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-copper/[0.02]">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                    0{i + 1}
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
