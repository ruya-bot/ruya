import { Reveal } from "./Reveal";

const capabilitiesList = [
  {
    num: "01",
    title: "AI Product Development",
    tagline: "From concept to working product.",
    description:
      "We design and engineer complete AI-powered applications including interfaces, backend infrastructure, model integration, APIs, databases, and deployment.",
    tags: ["Full-Stack AI", "Backend Infrastructure", "Model Integration", "Custom Interfaces", "Deployment"],
  },
  {
    num: "02",
    title: "Computer Vision",
    tagline: "Making software understand the visual world.",
    description:
      "Transforming raw video feeds, images, and spatial sensors into real-time perceptual intelligence for mobility, media verification, and retail.",
    tags: [
      "Object Detection",
      "Image Classification",
      "Video Intelligence",
      "Visual Anomaly Detection",
      "OCR",
      "Image Analysis",
      "Traffic Intelligence",
      "Deepfake Detection",
      "Real-Time Vision",
    ],
  },
  {
    num: "03",
    title: "Generative AI",
    tagline: "Turning language models into useful systems.",
    description:
      "Building structured generation systems, domain RAG pipelines, and intelligent assistants that execute complex enterprise workflows.",
    tags: [
      "LLM Applications",
      "RAG Systems",
      "AI Assistants",
      "Document Intelligence",
      "Multimodal AI",
      "AI Search",
      "Knowledge Systems",
      "Structured Generation",
      "Workflow Automation",
    ],
  },
  {
    num: "04",
    title: "Autonomous AI Agents",
    tagline: "AI that can reason, decide, and act.",
    description:
      "Designing multi-agent orchestration frameworks capable of multi-step reasoning, decision support, and intelligent data collection.",
    tags: [
      "Business Automation",
      "Research Agents",
      "AI Assistants",
      "Decision Support",
      "Workflow Orchestration",
      "Multi-Step Reasoning",
      "Intelligent Data Collection",
    ],
  },
  {
    num: "05",
    title: "Predictive Intelligence",
    tagline: "Turning historical data into better decisions.",
    description:
      "Engineering time-series forecasting, demand estimation, and risk analysis models that turn operational data into proactive decisions.",
    tags: [
      "Time-Series Forecasting",
      "Demand Prediction",
      "Behavioral Prediction",
      "Risk Analysis",
      "Recommendation Systems",
      "Operational Intelligence",
    ],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Core Capabilities
            </p>
            <h2 className="display-xl text-balance text-[clamp(2rem,7vw,3.6rem)] leading-none">
              AI systems for problems worth solving.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Ru’ya partners with organizations that want to use AI meaningfully — not simply add
              an AI feature because it is trending.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilitiesList.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 touch-manipulation transition-all duration-300 hover:border-copper/40 hover:-translate-y-1 active:scale-[0.985] shadow-xs">
                <div>
                  <span className="text-xs font-bold tracking-widest text-copper">
                    {cap.num}
                  </span>
                  <h3 className="display-xl mt-3 text-xl font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-copper">
                    {cap.tagline}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
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
