import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE, SCROLL_SPRING } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const links = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { choreography } = useMotionProfile();
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const progress = useSpring(scrollYProgress, SCROLL_SPRING.light);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE.outExpo }}
      className="fixed inset-x-0 top-3 sm:top-5 z-50 px-4 sm:px-6 md:px-8 pointer-events-none"
    >
      <div className="mx-auto max-w-5xl pointer-events-auto flex justify-center">
        {/* Floating Custom Expanding Pill Container */}
        <motion.div
          ref={navRef}
          layout
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => {
            if (!open) setIsExpanded(false);
          }}
          onClick={() => setIsExpanded(true)}
          transition={{ duration: 0.45, ease: EASE.outExpo }}
          className="relative flex h-14 items-center justify-between rounded-full border border-border/40 bg-surface/80 px-4 sm:px-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-copper/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] cursor-pointer select-none"
        >
          {/* Brand Logo & Name */}
          <motion.div layout className="flex items-center gap-2 pr-2">
            <a
              href="#top"
              onClick={(e) => {
                // If collapsed, don't trigger top anchor immediately on mobile, toggle expansion instead
                if (!isExpanded) {
                  e.preventDefault();
                  setIsExpanded(true);
                } else {
                  setOpen(false);
                  setIsExpanded(false);
                }
              }}
              className="group flex items-center gap-2 rounded-full py-1 text-sm font-extrabold tracking-tight text-foreground touch-manipulation transition-all duration-150 hover:opacity-80 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            >
              <img
                src="/lgo.png"
                alt="Ru'ya Studio Logo"
                className="h-5 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span>Ru'ya Studio</span>
            </a>
          </motion.div>

          {/* Desktop Nav Links (Visible only when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: EASE.outExpo }}
                className="hidden items-center gap-7 overflow-hidden text-[13px] font-semibold text-muted-foreground sm:flex px-6 whitespace-nowrap"
              >
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setIsExpanded(false)}
                      className="relative px-1 py-1 transition-colors duration-200 hover:text-foreground active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Desktop & Mobile Actions */}
          <motion.div layout className="flex items-center gap-2 pl-1">
            <AnimatePresence>
              {isExpanded && (
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: EASE.outExpo }}
                  onClick={() => setIsExpanded(false)}
                  className="hidden rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background touch-manipulation transition-all duration-200 hover:scale-[1.03] hover:bg-foreground/90 active:scale-95 sm:inline-flex shadow-xs whitespace-nowrap"
                >
                  Start a Project
                </motion.a>
              )}
            </AnimatePresence>

            {/* Mobile Hamburger menu toggle (only shows when expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((v) => !v);
                  }}
                  className="-mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full touch-manipulation transition-transform duration-150 active:scale-90 active:bg-surface sm:hidden"
                >
                  <span className="relative block h-3 w-4">
                    <motion.span
                      animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.25, ease: EASE.inOutQuart }}
                      className="absolute left-0 top-0 block h-0.5 w-4 rounded-full bg-foreground"
                    />
                    <motion.span
                      animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.25, ease: EASE.inOutQuart }}
                      className="absolute bottom-0 left-0 block h-0.5 w-4 rounded-full bg-foreground"
                    />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {open && isExpanded && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE.outQuint }}
              className="absolute inset-x-0 top-16 overflow-hidden rounded-3xl border border-border/40 bg-surface/95 px-6 py-5 backdrop-blur-xl shadow-xl sm:hidden"
            >
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 + i * 0.03, duration: 0.35, ease: EASE.outExpo }}
                  >
                    <a
                      href={l.href}
                      onClick={() => {
                        setOpen(false);
                        setIsExpanded(false);
                      }}
                      className="block border-b border-border/30 py-3 text-[16px] font-semibold tracking-tight text-foreground touch-manipulation transition-colors active:text-copper"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <li className="pt-3">
                  <a
                    href="#contact"
                    onClick={() => {
                      setOpen(false);
                      setIsExpanded(false);
                    }}
                    className="flex w-full justify-center rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background active:scale-95 shadow-sm"
                  >
                    Start a Project
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}
