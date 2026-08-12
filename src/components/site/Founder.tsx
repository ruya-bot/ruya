import { Reveal } from "./Reveal";

export function Founder() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 space-y-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Studio Leadership
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-xl text-balance text-[clamp(1.9rem,6vw,3.4rem)] leading-none text-foreground">
              Built by an engineer.{" "}
              <span className="text-copper-gradient">Designed as a studio.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              <p>
                Ru’ya Studio was founded by Mohammed Sanin, an AI Research & Product Engineer
                working across computer vision, deep learning, generative AI, multimodal intelligence,
                autonomous agents, and end-to-end AI systems.
              </p>
              <p>
                Ru’ya exists to explore the space between AI research and real-world product engineering.
                The goal is simple:
              </p>
              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background p-4 space-y-1">
                  <span className="text-[10px] font-bold text-copper uppercase">STEP 01</span>
                  <p className="text-sm font-bold text-foreground">Research deeply.</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4 space-y-1">
                  <span className="text-[10px] font-bold text-copper uppercase">STEP 02</span>
                  <p className="text-sm font-bold text-foreground">Build deliberately.</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4 space-y-1">
                  <span className="text-[10px] font-bold text-copper uppercase">STEP 03</span>
                  <p className="text-sm font-bold text-foreground">Ship intelligently.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
