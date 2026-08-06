import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/motion";
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

  const blur = useTransform(scrollY, [0, 120], [0, 18]);
  const bg = useTransform(scrollY, [0, 120], [0, 0.72]);
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px) saturate(180%)`);
  const backgroundColor = useTransform(bg, (a) => `rgba(255,255,255,${a})`);
  const borderColor = useTransform(bg, (a) => `rgba(0,0,0,${a * 0.08})`);
  const progress = useSpring(scrollYProgress, SCROLL_SPRING.light);

  return (
    <motion.header
      style={{ backdropFilter, backgroundColor, borderColor }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="rounded-sm text-[13px] font-extrabold tracking-tight transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          Ru'ya<span className="text-copper">.</span>
        </a>
        <ul className="hidden gap-8 text-[13px] text-muted-foreground sm:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative rounded-sm transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground hover:after:origin-left hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
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
