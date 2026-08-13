import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgLayers2 from "@/assets/bg-layers-2.jpg";
import bgWork2 from "@/assets/bg-work-2.jpg";


const models = [
  {
    title: "AI Prototype",
    tagline: "For founders, researchers, and teams validating an idea.",
    deliverables: ["Proof of concepts", "AI experiments", "Functional MVPs", "Research prototypes"],
  },
  {
    title: "AI Product Build",
    tagline: "For teams ready to turn an idea into a complete product.",
    deliverables: ["Product architecture", "AI engineering", "Frontend & Backend", "Databases & APIs", "Deployment"],
  },
  {
    title: "AI Engineering Partnership",
    tagline: "For companies needing ongoing AI development.",
    deliverables: ["Ru’ya works as an extended engineering partner to research, build, ship, and evolve systems."],
  },
  {
    title: "Research & Innovation",
    tagline: "For organizations exploring emerging AI technologies.",
    deliverables: ["Technical research", "Architecture exploration", "Model experimentation", "Dataset strategy", "Evaluation"],
  },
];

export function EngagementModels() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgLayers2 }, { src: bgWork2 }]} intensity={0.35} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Engagement Models
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Different problems. Different ways of working.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1 shadow-xs">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                    MODEL 0{i + 1}
                  </span>
                  <h3 className="display-xl text-xl font-bold text-foreground">
                    {m.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                    {m.tagline}
                  </p>
                </div>

                <div className="space-y-2 border-t border-border/80 pt-4">
                  <p className="text-[10px] font-bold text-copper uppercase tracking-wider">
                    SCOPE INCLUDES
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground">
                    {m.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
