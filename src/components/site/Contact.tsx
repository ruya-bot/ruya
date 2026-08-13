/**
 * Contact — production contact form
 *
 * - Client-side validation (name, email format, company, message, required)
 * - Honeypot anti-spam field (hidden from humans, visible to bots)
 * - Loading / success / error states
 * - Submits via sendContact() server function — no credentials in browser
 * - Success only shown after server confirmation
 * - Form data preserved on error so the visitor can retry
 */
import { useState, useId } from "react";
import { Reveal } from "./Reveal";
import { Backdrop } from "./Backdrop";
import bgClosing1 from "@/assets/bg-closing-1.jpg";
import bgLayers2 from "@/assets/bg-layers-2.jpg";
import { sendContact } from "@/lib/sendContact";

// ─── Field styling (unchanged from original) ──────────────────────────────────
const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-copper";

const errorClass = "mt-1.5 text-[11px] font-medium text-red-500";

// ─── Email regex ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

interface Fields {
  name:    string;
  email:   string;
  company: string;
  message: string;
}

interface FieldErrors {
  name?:    string;
  email?:   string;
  company?: string;
  message?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(f: Fields): FieldErrors {
  const err: FieldErrors = {};
  if (!f.name.trim())         err.name    = "Name is required.";
  if (!f.email.trim())        err.email   = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim()))
                              err.email   = "Please enter a valid email address.";
  if (!f.company.trim())      err.company = "Company is required.";
  if (!f.message.trim())      err.message = "Tell us about the problem you're solving.";
  return err;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function Contact() {
  const uid = useId();

  const [fields, setFields] = useState<Fields>({
    name: "", email: "", company: "", message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors]     = useState<FieldErrors>({});
  const [state, setState]        = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    // clear individual error on change
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;

    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setState("loading");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    fields.name.trim(),
          email:   fields.email.trim(),
          company: fields.company.trim(),
          project: fields.message.trim(),
          _hp:     honeypot,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (res.ok && data.success === true) {
        setState("success");
        setFields({ name: "", email: "", company: "", message: "" });
        return;
      }

      setState("error");
      if (res.status === 429) {
        setServerError("Too many requests. Please wait a moment and try again.");
      } else if (data.error && data.error.toLowerCase().includes("not configured")) {
        setServerError("Email service not configured. Please contact ruya.connect@gmail.com.");
      } else {
        setServerError(data.error ?? null);
      }
    } catch {
      setState("error");
      setServerError(null);
    }
  };

  return (
    <section
      id="contact"
      className="veil relative isolate border-t border-border px-5 py-[11vh] sm:px-6 md:py-[16vh] pb-safe"
    >
      <Backdrop layers={[{ src: bgClosing1 }, { src: bgLayers2 }]} intensity={0.7} />
      <div className="mx-auto max-w-3xl space-y-10">
        <Reveal>
          <div className="space-y-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
              LET'S TALK
            </p>
            <h2 className="display-xl text-balance text-[clamp(2.1rem,7.5vw,4.2rem)] leading-none text-foreground font-extrabold">
              Let's build something intelligent.
            </h2>
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              From focused prototypes to complete AI products and long-term engineering partnerships.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {/* ── Success state ── */}
          {state === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-border/40 bg-surface/50 backdrop-blur-md p-8 sm:p-12 shadow-2xs
                flex flex-col items-center justify-center text-center gap-5 min-h-[280px]"
            >
              <div className="h-10 w-10 rounded-full border border-copper/50 flex items-center justify-center">
                <span className="text-copper text-lg" aria-hidden>✓</span>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-foreground">Message received.</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thanks — we've received your project details.
                  <br />
                  We'll get back to you shortly.
                </p>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form
              className="space-y-7 rounded-3xl border border-border/40 bg-surface/50 backdrop-blur-md p-8 sm:p-12 shadow-2xs"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* ── Honeypot — hidden from real users ── */}
              <div aria-hidden style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                <label htmlFor={`${uid}-hp`}>Leave blank</label>
                <input
                  id={`${uid}-hp`}
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Name + Email row */}
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
                <div>
                  <label
                    htmlFor={`${uid}-name`}
                    className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                    className={`${fieldClass} ${errors.name ? "border-red-400" : ""}`}
                    placeholder="Your name"
                    value={fields.name}
                    onChange={set("name")}
                    disabled={state === "loading"}
                  />
                  {errors.name && (
                    <p id={`${uid}-name-err`} role="alert" className={errorClass}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-email`}
                    className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                    className={`${fieldClass} ${errors.email ? "border-red-400" : ""}`}
                    placeholder="you@company.com"
                    value={fields.email}
                    onChange={set("email")}
                    disabled={state === "loading"}
                  />
                  {errors.email && (
                    <p id={`${uid}-email-err`} role="alert" className={errorClass}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor={`${uid}-company`}
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Company
                </label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? `${uid}-company-err` : undefined}
                  className={`${fieldClass} ${errors.company ? "border-red-400" : ""}`}
                  placeholder="Your company"
                  value={fields.company}
                  onChange={set("company")}
                  disabled={state === "loading"}
                />
                {errors.company && (
                  <p id={`${uid}-company-err`} role="alert" className={errorClass}>
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor={`${uid}-message`}
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  What are you building?
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                  className={`${fieldClass} resize-none ${errors.message ? "border-red-400" : ""}`}
                  placeholder="Tell us about the problem or what you're building."
                  value={fields.message}
                  onChange={set("message")}
                  disabled={state === "loading"}
                />
                {errors.message && (
                  <p id={`${uid}-message-err`} role="alert" className={errorClass}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={state === "loading"}
                  aria-disabled={state === "loading"}
                  className="inline-flex w-full justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.02] active:scale-95 sm:w-auto shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {state === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-background/30 border-t-background animate-spin" aria-hidden />
                      Sending…
                    </span>
                  ) : (
                    "Start the Conversation"
                  )}
                </button>

                {/* Server error */}
                {state === "error" && (
                  <p role="alert" aria-live="assertive" className="text-sm text-red-500 leading-relaxed">
                    {serverError ?? "Something went wrong."}{" "}
                    {!serverError && (
                      <>
                        Please try again or email us at{" "}
                        <a
                          href="mailto:ruya.connect@gmail.com"
                          className="font-semibold underline underline-offset-2"
                        >
                          ruya.connect@gmail.com
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.14}>
          <div className="flex justify-center text-xs text-muted-foreground pt-4 border-t border-border">
            <a
              href="mailto:ruya.connect@gmail.com"
              className="hover:text-foreground font-semibold text-foreground"
            >
              ruya.connect@gmail.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
