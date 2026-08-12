import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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

  const blur = useTransform(scrollY, [0, 120], [0, 18]);
  const bg = useTransform(scrollY, [0, 120], [0, 0.72]);
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px) saturate(180%)`);
  const backgroundColor = useTransform(bg, (a) => `rgba(255,255,255,${a})`);
  const borderColor = useTransform(bg, (a) => `rgba(0,0,0,${a * 0.08})`);
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
          className="rounded-sm text-[13px] font-extrabold tracking-tight touch-manipulation transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:opacity-70 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          Ru'ya<span className="text-copper">.</span>
        </a>
        <ul className="hidden gap-8 text-[13px] text-muted-foreground sm:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative rounded-sm transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground hover:after:origin-left hover:after:scale-x-100 active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

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
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: EASE.outQuint }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg shadow-[var(--shadow-soft)] sm:hidden pb-safe"
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
                    className="block border-b border-border/60 py-4 text-[17px] font-semibold tracking-tight touch-manipulation transition-all duration-150 active:translate-x-1 active:text-copper last:border-0"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {choreography && (
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-copper/60"
        />
      )}
    </motion.header>
  );
}
