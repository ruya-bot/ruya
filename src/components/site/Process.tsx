import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgApproach2 from "@/assets/bg-approach-2.jpg";
import bgWork1 from "@/assets/bg-work-1.jpg";

const processSteps = [
  {
    num: "01",
    title: "Discover",
    description: "Understand the problem.",
  },
  {
    num: "02",
    title: "Build",
    description: "Design the intelligence.",
  },
  {
    num: "03",
    title: "Deploy",
    description: "Put it into the real world.",
  },
  {
    num: "04",
    title: "Evolve",
    description: "Make it better.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] border-y border-border">
      <Backdrop layers={[{ src: bgApproach2 }, { src: bgWork1 }]} intensity={0.4} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              PROCESS
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              From idea to product.
            </h2>
          </div>
        </Reveal>

        {/* Process Horizontal/Vertical Scroll Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-md p-6 sm:p-8 space-y-6 touch-manipulation transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-copper/45 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-copper/[0.02] active:scale-[0.985] shadow-2xs">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
