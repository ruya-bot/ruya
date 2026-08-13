import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";

const teamsList = [
  "Startups",
  "Businesses",
  "Research Teams",
  "Innovation Teams",
];

export function Industries() {
  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgApproach1 }, { src: bgLayers2 }]} intensity={0.35} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              WHO WE WORK WITH
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none text-foreground font-extrabold">
              Built for teams solving real problems.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {teamsList.map((team, i) => (
            <Reveal key={team} delay={i * 0.05}>
              <div className="flex flex-col justify-center items-center h-28 rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-md p-6 text-center touch-manipulation transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-copper/45 hover:-translate-y-1 hover:shadow-lg hover:shadow-copper/[0.02]">
                <h3 className="display-xl text-md font-bold text-foreground">
                  {team}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
