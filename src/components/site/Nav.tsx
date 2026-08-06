import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [0, 18]);
  const bg = useTransform(scrollY, [0, 120], [0, 0.72]);
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px) saturate(180%)`);
  const backgroundColor = useTransform(bg, (a) => `rgba(255,255,255,${a})`);
  const borderColor = useTransform(bg, (a) => `rgba(0,0,0,${a * 0.08})`);

  return (
    <motion.header
      style={{ backdropFilter, backgroundColor, borderColor }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-[13px] font-extrabold tracking-tight">
          Ru'ya<span className="text-copper">.</span>
        </a>
        <ul className="hidden gap-8 text-[13px] text-muted-foreground sm:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
