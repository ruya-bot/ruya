import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgStack1 from "@/assets/bg-stack-1.jpg";
import bgLayers1 from "@/assets/bg-layers-1.jpg";


const principles = [
  {
    title: "Research",
    description: "We go deep before we build.",
  },
  {
    title: "Product",
    description: "We think beyond the model.",
  },
  {
    title: "Engineering",
    description: "We build the complete system.",
  },
  {
    title: "Purpose",
    description: "We solve problems that matter.",
  },
];

export function WhyRuya() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh] bg-surface/50 border-y border-border">
      <Backdrop layers={[{ src: bgStack1 }, { src: bgLayers1 }]} intensity={0.3} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none text-foreground">
              Research depth. <span className="text-copper-gradient">Product thinking. Engineering discipline.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 space-y-3 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1">
                <span className="text-[10px] font-bold tracking-widest text-copper uppercase">
                  0{i + 1}
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
