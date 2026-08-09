import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import { EASE, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import vision from "@/assets/vision.jpg";
import layers from "@/assets/layers.jpg";
import bgApproach1 from "@/assets/bg-approach-1.jpg";
import bgApproach2 from "@/assets/bg-approach-2.jpg";
import bgLayers1 from "@/assets/bg-layers-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";
import bgWork1 from "@/assets/bg-work-1.jpg";
import bgWork2 from "@/assets/bg-work-2.jpg";
import bgStack1 from "@/assets/bg-stack-1.jpg";
import bgClosing1 from "@/assets/bg-closing-1.jpg";
import bgHero2 from "@/assets/bg-hero-2.jpg";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
      {children}
    </p>
  );
}

/**
 * Hairline that draws itself as one section hands off to the next.
 * Gives the page a continuous rhythm instead of hard section edges.
 */
function SectionSeam() {
  const { choreography } = useMotionProfile();
  if (!choreography) {
    return <div aria-hidden className="mx-auto h-px max-w-6xl bg-border" />;
  }
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: EASE.outExpo }}
      className="mx-auto h-px max-w-6xl origin-center bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}

/* ---------------------------------------------------------------- Studio */

function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax, compact } = useMotionProfile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.base);
  const scale = useTransform(smooth, [0, 0.5, 1], compact ? [0.97, 1, 0.99] : [0.92, 1, 0.95]);
  const y = useTransform(smooth, [0, 1], compact ? ["2%", "-2%"] : ["5%", "-5%"]);

  return (
    <section id="about" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgApproach1 }, { src: bgApproach2 }]} intensity={0.9} />
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div
            style={parallax ? { scale, y } : {}}
            className="overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <img
              src={vision}
              alt="Wireframe mesh scanning a sculptural form"
              loading="lazy"
              width={1600}
              height={1008}
              className="w-full"
            />
          </motion.div>
          <Reveal>
            <Kicker>Studio Thesis</Kicker>
            <h2 className="display-xl mt-4 text-balance text-[clamp(1.85rem,7vw,3.2rem)] sm:mt-5 md:text-[clamp(2rem,4.2vw,3.2rem)]">
              AI research, built into products.
            </h2>
            <div className="mt-5 max-w-[46ch] space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-[17px]">
              <p>
                Ru'ya is the creative and engineering studio behind Mohammed
                Sanin's AI research, product experiments, and production-ready
                systems.
              </p>
              <p>
                From multimodal intelligence and deepfake detection to autonomous
                traffic analytics, healthcare prediction, and AI-powered
                productivity software, every project begins with one question:
              </p>
              <p className="font-medium text-foreground">
                How can artificial intelligence solve problems people actually
                face?
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-[9vh] md:mt-[12vh]">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="display-xl text-balance text-[clamp(1.5rem,6vw,2.8rem)] md:text-[clamp(1.7rem,3.6vw,2.8rem)]">
              Intelligence should feel invisible.
              <span className="text-copper-gradient">
                {" "}
                The best AI disappears into the experience.
              </span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Founder */

const timeline = [
  ["AI Research Intern", "Centre of Excellence in AI, NIT Calicut"],
  ["Research", "Traffic Intelligence · Computer Vision"],
  ["Generative AI Engineer", "Multimodal & agentic systems"],
  ["AI Product Builder", "End-to-end shipped products"],
  ["Final-year", "Artificial Intelligence & Machine Learning"],
];

function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax, compact } = useMotionProfile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.base);
  const y = useTransform(smooth, [0, 1], compact ? ["2%", "-2%"] : ["5%", "-5%"]);
  const scale = useTransform(smooth, [0, 0.5, 1], compact ? [0.98, 1, 0.99] : [0.94, 1, 0.97]);

  return (
    <section className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgLayers1 }, { src: bgLayers2 }]} intensity={0.7} />
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <Kicker>Founder</Kicker>
            <h2 className="display-xl mt-4 text-[clamp(1.85rem,7vw,3.2rem)] sm:mt-5 md:text-[clamp(2rem,4.2vw,3.2rem)]">
              Mohammed Sanin
            </h2>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              AI Research Engineer · Founder, Ru'ya Studio
            </p>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-[17px]">
              Mohammed Sanin is an AI & Machine Learning Engineer focused on
              designing intelligent systems that combine research with practical
              impact. His work spans computer vision, deep learning, multimodal
              AI, autonomous agents, and full-stack AI products. He has
              contributed to research initiatives at the Centre of Excellence in
              Artificial Intelligence, NIT Calicut, while building products that
              bridge AI innovation with real-world applications.
            </p>
          </Reveal>

          <motion.div style={parallax ? { y, scale } : {}} className="md:order-first">
            <ol className="relative space-y-6 border-l border-border pl-7">
              {timeline.map((t, i) => (
                <Reveal key={t[0]} delay={i * 0.05}>
                  <li className="relative">
                    <span className="absolute -left-[33px] top-2 h-1.5 w-1.5 rounded-full bg-copper" />
                    <p className="text-[15px] font-semibold">{t[0]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t[1]}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Expertise */

const expertise = [
  "Computer Vision",
  "Deep Learning",
  "Generative AI",
  "Large Language Models",
  "Autonomous AI Agents",
  "Predictive Analytics",
  "Multimodal AI",
  "End-to-End AI Products",
];

function Expertise() {
  return (
    <section className="relative isolate px-5 py-[9vh] sm:px-6 md:py-[12vh]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Core Expertise</Kicker>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-10 lg:grid-cols-4">
          {expertise.map((e, i) => (
            <Reveal key={e} delay={i * 0.05} className="bg-background">
              <div className="h-full px-4 py-6 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface sm:px-6 sm:py-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[14px] font-semibold leading-snug sm:text-[15px]">{e}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Signals */

const signals = [
  { value: 12, suffix: "+", label: "AI Projects" },
  { value: 3, suffix: "+", label: "Research & Industry Internships" },
  { value: 10, suffix: "+", label: "Professional Certifications" },
  { value: 2, suffix: "", label: "National Hackathon Runner-up Awards" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { choreography } = useMotionProfile();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (!choreography) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, choreography]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Signals() {
  return (
    <section className="relative isolate border-y border-border px-5 py-[9vh] sm:px-6 md:py-[12vh]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
        {signals.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <p className="display-xl text-[clamp(2rem,9vw,3.6rem)] md:text-[clamp(2.4rem,5vw,3.6rem)]">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 max-w-[18ch] text-[13px] text-muted-foreground sm:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Projects */

const projects = [
  {
    name: "DeepTrace",
    line: "AI-powered multimodal deepfake detection platform.",
    status: "Research Prototype",
    tags: [
      "CNN-based audio analysis",
      "CNN + BiLSTM video detection",
      "Mel Spectrogram pipeline",
      "FastAPI backend",
      "React frontend",
    ],
  },
  {
    name: "GridPulse",
    line: "AI Traffic Intelligence Platform.",
    status: "Research Project",
    tags: [
      "Google Maps Traffic Analysis",
      "Computer Vision",
      "Congestion Prediction",
      "Traffic Density Analytics",
      "AI Decision Support",
    ],
  },
  {
    name: "Eventia",
    line: "Agentic AI Event Management Platform.",
    status: "Hackathon Project",
    tags: [
      "Venue Recommendation",
      "Budget Planning",
      "Weather Intelligence",
      "Vertex AI",
      "Autonomous AI Agents",
    ],
  },
  {
    name: "ovAI",
    line: "Women's Health Intelligence Platform.",
    status: "Product Prototype",
    tags: [
      "LSTM Cycle Prediction",
      "Health Analytics",
      "React Native",
      "Personalized AI",
    ],
  },
];

function ProjectCard({
  p,
  i,
}: {
  p: (typeof projects)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax, compact } = useMotionProfile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.base);
  // Outgoing card recedes slightly as the next one slides over it.
  const scale = useTransform(smooth, [0, 1], [1, compact ? 0.98 : 0.96]);
  const opacity = useTransform(smooth, [0, 0.85, 1], [1, 1, compact ? 0.75 : 0.55]);

  return (
    <div
      ref={ref}
      className="md:sticky"
      style={{ top: `calc(14vh + ${i * 18}px)` }}
    >
      <Reveal delay={i * 0.04}>
        <motion.article
          style={parallax ? { scale, opacity } : {}}
          className="group grid gap-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-copper/40 hover:shadow-[var(--shadow-float)] sm:p-8 md:grid-cols-[1fr_1.5fr] md:gap-6 md:rounded-3xl md:p-12"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-copper">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="display-xl mt-3 text-[clamp(1.6rem,7vw,2.6rem)] transition-colors duration-300 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-copper sm:mt-4 md:text-[clamp(1.8rem,3.2vw,2.6rem)]">
              {p.name}
            </h3>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:mt-4 sm:text-[11px]">
              {p.status}
            </p>
          </div>
          <div>
            <p className="text-[16px] font-medium sm:text-lg">{p.line}</p>
            <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border border-border px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-copper/50 hover:text-foreground sm:px-3 sm:text-[13px]"
                >
                  {t}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper sm:mt-8">
              View
              <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </motion.article>
      </Reveal>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative isolate px-5 py-[10vh] sm:px-6 md:py-[14vh]">
      <Backdrop layers={[{ src: bgWork1 }, { src: bgWork2 }]} intensity={0.8} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Featured Projects</Kicker>
          <h2 className="display-xl mt-4 text-balance text-[clamp(1.85rem,7.4vw,3.4rem)] sm:mt-5 md:text-[clamp(2rem,4.6vw,3.4rem)]">
            Systems built <span className="text-copper-gradient">end to end</span>.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Also built */

const alsoBuilt = [
  ["NeuroBlocks", "Visual drag-and-drop machine learning workflow builder."],
  ["ForecastFusion", "Time-series forecasting platform supporting multiple predictive models."],
  ["TalkEasy", "AI-assisted language learning platform built during a national hackathon."],
  [
    "Traffic Analysis System",
    "Computer vision system for vehicle counting and congestion estimation using Google Maps imagery.",
  ],
  ["Crewly", "Modern AI-powered workflow and task management platform for collaborative teams."],
  ["Freshness Passport", "AI-powered food freshness and waste management solution for retail."],
  ["Rumours", "AI platform that aggregates and analyzes football transfer rumours using LLMs."],
  [
    "Namma-Raste Health",
    "Road maintenance reporting platform built with Android and AI-assisted workflows.",
  ],
];

function AlsoBuilt() {
  return (
    <section className="relative isolate px-6 py-[12vh]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Also Built</Kicker>
        </Reveal>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {alsoBuilt.map(([name, line], i) => (
            <Reveal key={name} delay={Math.min(i, 5) * 0.04}>
              <li className="grid gap-2 py-6 transition-colors duration-200 hover:text-foreground md:grid-cols-[240px_1fr] md:items-baseline">
                <p className="text-[15px] font-semibold">{name}</p>
                <p className="text-[15px] text-muted-foreground">{line}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Research + tech */

const interests = [
  "Computer Vision",
  "Generative AI",
  "Deep Learning",
  "Agentic AI",
  "Human-AI Interaction",
  "Predictive Intelligence",
  "Spatial Computing",
  "AI for Social Impact",
];

const technologies = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "FastAPI",
  "React",
  "TypeScript",
  "Supabase",
  "Google Cloud",
  "Vertex AI",
  "Docker",
  "PostgreSQL",
];

function ResearchAndTech() {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax } = useMotionProfile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING.light);
  const y = useTransform(smooth, [0, 1], ["4%", "-4%"]);

  return (
    <section id="research" className="relative isolate px-6 py-[14vh]">
      <Backdrop layers={[{ src: bgStack1 }, { src: bgHero2 }]} intensity={0.35} />
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <Reveal>
              <Kicker>Research Interests</Kicker>
              <h2 className="display-xl mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Where the work is heading.
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {interests.map((s, i) => (
                <Reveal key={s} delay={i * 0.035}>
                  <span className="inline-block rounded-xl border border-border px-4 py-2 text-sm font-medium transition-[color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-copper hover:text-copper">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <motion.div style={parallax ? { y } : {}}>
            <Reveal>
              <Kicker>Technologies</Kicker>
              <h2 className="display-xl mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)]">
                The working toolkit.
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {technologies.map((s, i) => (
                <Reveal key={s} delay={i * 0.03}>
                  <span className="inline-block rounded-xl border border-border px-4 py-2 text-sm font-medium transition-[color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-copper hover:text-copper">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </motion.div>
        </div>

        <Reveal className="mt-[12vh]">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={layers}
              alt="Layered translucent glass panes with warm rim light"
              loading="lazy"
              width={1600}
              height={1008}
              className="w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-copper";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="veil relative isolate border-t border-border px-6 py-[16vh]"
    >
      <Backdrop layers={[{ src: bgClosing1 }, { src: bgLayers2 }]} intensity={0.7} />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="display-xl text-[clamp(2.2rem,5.4vw,4rem)]">
            Let's build something{" "}
            <span className="text-copper-gradient">intelligent</span>.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground">
            Whether you're exploring AI research, building an intelligent
            product, or looking for technical collaboration, I'd love to hear
            about it.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            className="mt-14 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Name
                </label>
                <input id="name" name="name" required className={fieldClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </label>
                <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </label>
              <textarea id="message" name="message" rows={4} required className={`${fieldClass} resize-none`} placeholder="Tell me about the project" />
            </div>
            <button
              type="submit"
              className="inline-flex rounded-xl bg-foreground px-8 py-4 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.02]"
            >
              Start the Conversation
            </button>
            {sent && (
              <p role="status" className="text-sm text-copper">
                Thanks — your message is ready to send. I'll be in touch shortly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-[13px] font-extrabold tracking-tight">
            Ru'ya Studio<span className="text-copper">.</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            AI Systems. Designed with Purpose.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            © 2026 Mohammed Sanin
          </p>
        </div>
        <div className="text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Research
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Computer Vision</li>
            <li>Generative AI</li>
            <li>Deep Learning</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Sections() {
  return (
    <>
      <Studio />
      <SectionSeam />
      <Founder />
      <SectionSeam />
      <Expertise />
      <Signals />
      <Projects />
      <SectionSeam />
      <AlsoBuilt />
      <SectionSeam />
      <ResearchAndTech />
      <Contact />
      <Footer />
    </>
  );
}
