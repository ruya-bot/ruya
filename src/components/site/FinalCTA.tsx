import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative isolate px-5 py-[12vh] sm:px-6 md:py-[16vh]">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <Reveal>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
            Initiate Engagement
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display-xl text-balance text-[clamp(2.4rem,8.5vw,4.8rem)] leading-[0.94] text-foreground">
            Have a problem <span className="text-copper-gradient">worth solving?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            You don't need to have the entire solution figured out. Bring the problem. We'll explore
            what AI can do with it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto justify-center rounded-xl bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              Start a Project →
            </a>
            <a
              href="#work"
              className="inline-flex w-full sm:w-auto justify-center rounded-xl border border-border bg-surface px-8 py-4 text-sm font-semibold text-foreground touch-manipulation transition-all duration-200 hover:border-copper hover:text-copper active:scale-95"
            >
              Explore Our Work →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
