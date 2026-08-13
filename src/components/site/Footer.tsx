/**
 * Footer — "Final Chapter"
 *
 * Structure:
 *  1. Large brand moment — logo + statement + tagline
 *  2. Oversized aperture watermark (architectural, low-contrast)
 *  3. Thin divider
 *  4. Horizontal nav + CONNECT + conversion CTA
 *  5. Bottom bar — capability line + copyright
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// ─── Aperture watermark ───────────────────────────────────────────────────────
// A minimal camera-aperture ring rendered as SVG. Extremely low contrast.
// The small filled segment uses Ru'ya gold.
function ApertureWatermark() {
  const [pulsed, setPulsed] = useState(false);

  const trigger = () => {
    setPulsed(true);
    setTimeout(() => setPulsed(false), 900);
  };

  // Outer ring radius
  const R = 220;
  const CX = 260;
  const CY = 260;
  // Small gold arc — from 315° to 345° (30° slice)
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcStart = toRad(315);
  const arcEnd   = toRad(345);
  const x1 = CX + R * Math.cos(arcStart);
  const y1 = CY + R * Math.sin(arcStart);
  const x2 = CX + R * Math.cos(arcEnd);
  const y2 = CY + R * Math.sin(arcEnd);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 translate-x-[28%] translate-y-[28%] select-none"
      style={{ width: "clamp(320px, 45vw, 560px)", opacity: 0.055 }}
      onMouseEnter={trigger}
    >
      <svg
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* outer ring */}
        <circle cx={CX} cy={CY} r={R} stroke="currentColor" strokeWidth="1.5" />
        {/* inner ring */}
        <circle cx={CX} cy={CY} r={R * 0.55} stroke="currentColor" strokeWidth="0.8" />
        {/* spoke lines — aperture blades */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const a = toRad(deg);
          return (
            <line
              key={deg}
              x1={CX + R * 0.55 * Math.cos(a)}
              y1={CY + R * 0.55 * Math.sin(a)}
              x2={CX + R * Math.cos(a)}
              y2={CY + R * Math.sin(a)}
              stroke="currentColor"
              strokeWidth="0.7"
              strokeOpacity="0.6"
            />
          );
        })}
        {/* gold accent arc */}
        <motion.path
          d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
          stroke="oklch(0.56 0.12 48)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ opacity: 1 }}
          animate={pulsed ? { strokeWidth: [3, 5, 3], opacity: [1, 1, 1] } : {}}
          transition={{ duration: 0.7, ease: EASE.inOutQuart }}
        />
      </svg>
    </div>
  );
}

// ─── Nav link ─────────────────────────────────────────────────────────────────
function NavLink({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-0.5 text-xs font-semibold
        text-muted-foreground transition-colors duration-300 hover:text-copper
        focus-visible:outline-none focus-visible:text-copper"
    >
      {children}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background">

      {/* ── Aperture watermark ── */}
      <ApertureWatermark />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">

        {/* ══ 1. BRAND MOMENT ══ */}
        <div className="pt-20 pb-16 md:pt-28 md:pb-20 space-y-8">

          {/* logo */}
          <div className="flex items-center gap-2.5">
            <img
              src="/lgo.png"
              alt="Ru'ya Studio"
              className="h-7 w-auto object-contain opacity-90"
            />
            <span className="text-sm font-bold tracking-tight text-foreground/80">
              Ru'ya Studio.
            </span>
          </div>

          {/* large statement */}
          <div className="space-y-1">
            <h2
              className="display-xl font-extrabold tracking-tight text-foreground leading-[0.96]"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5.2rem)" }}
            >
              Intelligent Systems.
            </h2>
            <h2
              className="display-xl font-extrabold tracking-tight leading-[0.96]"
              style={{
                fontSize: "clamp(2.4rem, 7vw, 5.2rem)",
                color: "oklch(0.56 0.12 48 / 0.55)",
              }}
            >
              Designed with Purpose.
            </h2>
          </div>

          {/* tagline */}
          <p className="text-xs font-medium text-muted-foreground/70 tracking-wide max-w-xs">
            Research deeply.&nbsp;&nbsp;Build deliberately.&nbsp;&nbsp;Ship intelligently.
          </p>
        </div>

        {/* ══ 2. DIVIDER ══ */}
        <div className="h-px bg-border/50" />

        {/* ══ 3. NAV + CONNECT + CTA ══ */}
        <div className="py-12 md:py-14">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:items-start sm:gap-16">

            {/* main nav */}
            <nav aria-label="Footer navigation">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
                Navigate
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2.5">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#capabilities">Capabilities</NavLink>
                <NavLink href="#work">Work</NavLink>
                <NavLink href="#process">Process</NavLink>
                <NavLink href="#contact">
                  Contact&nbsp;<span className="opacity-60">↗</span>
                </NavLink>
              </div>
            </nav>

            {/* connect */}
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
                Connect
              </p>
              <div className="flex flex-col gap-2.5">
                <NavLink href="https://linkedin.com" isExternal>LinkedIn ↗</NavLink>
                <NavLink href="https://github.com" isExternal>GitHub ↗</NavLink>
                <NavLink href="mailto:ruya.connect@gmail.com">Email ↗</NavLink>
              </div>
            </div>

            {/* conversion */}
            <div className="sm:text-right">
              <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
                Have a problem worth solving?
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 text-sm font-bold
                  text-foreground transition-colors duration-300 hover:text-copper
                  focus-visible:outline-none focus-visible:text-copper"
              >
                Start a Project
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.25, ease: EASE.outExpo }}
                  aria-hidden
                >
                  →
                </motion.span>
              </a>
            </div>
          </div>
        </div>

        {/* ══ 4. BOTTOM BAR ══ */}
        <div className="border-t border-border/40 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* capability signature */}
            <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground/50 uppercase">
              AI · Computer Vision · Generative AI · Intelligent Products
            </p>

            {/* copyright + signed */}
            <div className="flex items-center gap-5 text-[10px] text-muted-foreground/40">
              <span>© 2026 Ru'ya Studio</span>
              <span aria-hidden className="h-3 w-px bg-border/60" />
              <span className="italic">Built with intelligence.</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
