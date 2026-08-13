import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgApproach2 from "@/assets/bg-approach-2.jpg";
import bgClosing1 from "@/assets/bg-closing-1.jpg";


const clientPrinciples = [
  {
    title: "Clarity",
    description: "You always know what is being built, why technical decisions were made, and how progress is measured.",
  },
  {
    title: "Communication",
    description: "Regular progress updates, live prototype demos, and direct collaboration with engineering.",
  },
  {
    title: "Transparency",
    description: "Clear scope, defined milestones, explicit technical tradeoffs, and honest model feasibility guidance.",
  },
  {
    title: "Ownership",
    description: "The final system, architecture, and code assets are built specifically around your organization's goals.",
  },
  {
    title: "Long-Term Thinking",
    description: "Build for real-world production evolution rather than fragile, disposable technology demos.",
  },
];

export function ClientExperience() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] border-y border-border">
      <Backdrop layers={[{ src: bgApproach2 }, { src: bgClosing1 }]} intensity={0.35} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Client Experience
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              Built collaboratively.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              The best products aren't built behind closed doors. Clients stay involved from defining
              the problem to reviewing functional prototypes and shaping the final system.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientPrinciples.map((cp, i) => (
            <Reveal key={cp.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                  VALUE 0{i + 1}
                </span>
                <h3 className="display-xl text-lg font-bold text-foreground">
                  {cp.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cp.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
