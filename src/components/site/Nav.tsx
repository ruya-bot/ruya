import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const links = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Research", href: "#research" },
];

export function Nav() {
  const { choreography } = useMotionProfile();
  const { scrollY, scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const blur = useTransform(scrollY, [0, 100], [0, 16]);
  const bg = useTransform(scrollY, [0, 100], [0, 0.85]);
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px) saturate(180%)`);
  const backgroundColor = useTransform(bg, (a) => `rgba(250, 249, 246, ${a})`);
  const borderColor = useTransform(bg, (a) => `rgba(0, 0, 0, ${a * 0.08})`);
  const progress = useSpring(scrollYProgress, SCROLL_SPRING.light);

  return (
    <motion.header
      style={{ backdropFilter, backgroundColor, borderColor }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent pt-safe"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="rounded-sm text-[14px] font-extrabold tracking-tight touch-manipulation transition-opacity duration-150 hover:opacity-75 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          Ru'ya Studio<span className="text-copper">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-[13px] font-medium text-muted-foreground sm:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative rounded-sm transition-colors duration-200 hover:text-foreground active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background touch-manipulation transition-transform duration-150 hover:scale-[1.02] active:scale-95 sm:inline-flex"
          >
            Start a Project
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-xl touch-manipulation transition-transform duration-150 active:scale-90 active:bg-surface sm:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: EASE.inOutQuart }}
                className="absolute left-0 top-0 block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: EASE.inOutQuart }}
                className="absolute bottom-0 left-0 block h-px w-5 bg-foreground"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: EASE.outQuint }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg shadow-lg sm:hidden pb-safe"
          >
            <ul className="px-5 py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease: EASE.outExpo }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-3.5 text-[16px] font-semibold tracking-tight touch-manipulation transition-colors active:text-copper last:border-0"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full justify-center rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background active:scale-95"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {choreography && (
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-copper/50"
        />
      )}
    </motion.header>
  );
}
