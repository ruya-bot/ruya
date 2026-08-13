import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgClosing1 from "@/assets/bg-closing-1.jpg";
import bgWork1 from "@/assets/bg-work-1.jpg";

export function FinalCTA() {
  return (
    <section className="relative isolate px-5 py-[12vh] sm:px-6 md:py-[16vh]">
      <Backdrop layers={[{ src: bgClosing1 }, { src: bgWork1 }]} intensity={0.4} />
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <Reveal delay={0.06}>
          <h2 className="display-xl text-balance text-[clamp(2.4rem,8.5vw,4.8rem)] leading-[0.94] text-foreground font-extrabold">
            Have a problem <span className="text-copper-gradient">worth solving?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            Bring the problem. We'll explore what AI can do with it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              Start a Project →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
