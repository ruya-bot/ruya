import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgLayers1 from "@/assets/bg-layers-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";


const capabilitiesList = [
  {
    num: "01",
    title: "AI Products",
    tagline: "Intelligent products from idea to deployment.",
    description: "",
    tags: [],
  },
  {
    num: "02",
    title: "Computer Vision",
    tagline: "Systems that understand the visual world.",
    description: "",
    tags: [],
  },
  {
    num: "03",
    title: "Generative AI",
    tagline: "Useful intelligence beyond chat.",
    description: "",
    tags: [],
  },
  {
    num: "04",
    title: "AI Agents",
    tagline: "Systems that reason, decide, and act.",
    description: "",
    tags: [],
  },
  {
    num: "05",
    title: "Predictive AI",
    tagline: "Turning data into better decisions.",
    description: "",
    tags: [],
  },
  {
    num: "06",
    title: "AI Research & Prototyping",
    tagline: "Exploring what intelligent systems can become.",
    description: "",
    tags: [],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgLayers1 }, { src: bgLayers2 }]} intensity={0.4} />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              CAPABILITIES
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              What we build.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilitiesList.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-md p-6 sm:p-8 touch-manipulation transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-copper/45 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-copper/[0.02] active:scale-[0.985] shadow-2xs">
                <div>
                  <span className="text-xs font-bold tracking-widest text-copper">
                    {cap.num}
                  </span>
                  <h3 className="display-xl mt-3 text-xl font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                    {cap.tagline}
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
