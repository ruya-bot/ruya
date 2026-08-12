import { useState } from "react";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgClosing1 from "@/assets/bg-closing-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-copper";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="veil relative isolate border-t border-border px-5 py-[11vh] sm:px-6 md:py-[16vh] pb-safe"
    >
      <Backdrop layers={[{ src: bgClosing1 }, { src: bgLayers2 }]} intensity={0.7} />
      <div className="mx-auto max-w-3xl space-y-10">
        <Reveal>
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              Get in Touch
            </span>
            <h2 className="display-xl text-balance text-[clamp(2.1rem,7.5vw,4.2rem)] leading-none text-foreground">
              Let's build something <span className="text-copper-gradient">intelligent</span>.
            </h2>
            <p className="max-w-[50ch] text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Whether you're exploring AI research, building an intelligent product, or looking for
              technical collaboration, we'd love to hear about your project.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            className="space-y-7 rounded-3xl border border-border bg-surface/90 p-8 sm:p-12 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
              <div>
                <label
                  htmlFor="company"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Company / Organization
                </label>
                <input
                  id="company"
                  name="company"
                  className={fieldClass}
                  placeholder="Company name"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="ai-product">AI Product Build</option>
                  <option value="computer-vision">Computer Vision</option>
                  <option value="generative-ai">Generative AI</option>
                  <option value="ai-agent">Autonomous AI Agent</option>
                  <option value="research-prototype">Research / Prototype</option>
                  <option value="other">Other Collaboration</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Tell us about the project
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`${fieldClass} resize-none`}
                placeholder="What are you trying to build?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-xl bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] active:scale-95 sm:w-auto shadow-sm"
            >
              Start the Conversation
            </button>

            {submitted && (
              <p role="status" className="text-sm font-medium text-copper pt-2">
                Thank you — your project details have been received. Ru’ya Studio will reach out shortly.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border gap-2">
            <p className="font-semibold text-foreground">Ru'ya Studio</p>
            <p>AI Engineering · Product Development · Research</p>
            <p>India · Working Globally</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
