export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-[16px] font-extrabold tracking-tight text-foreground">
              Ru'ya Studio<span className="text-copper">.</span>
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Intelligent Systems. Designed with Purpose.
            </p>
            <p className="text-[11px] text-muted-foreground pt-2">
              Research deeply. Build deliberately. Ship intelligently.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-xs space-y-3">
            <p className="font-bold uppercase tracking-wider text-foreground">Studio</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#capabilities" className="hover:text-foreground">Capabilities</a></li>
              <li><a href="#work" className="hover:text-foreground">Work</a></li>
              <li><a href="#process" className="hover:text-foreground">Process</a></li>
              <li><a href="#research" className="hover:text-foreground">Research</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="text-xs space-y-3">
            <p className="font-bold uppercase tracking-wider text-foreground">Capabilities</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Computer Vision</li>
              <li>Generative AI</li>
              <li>Autonomous AI Agents</li>
              <li>Predictive Intelligence</li>
              <li>Product Engineering</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="text-xs space-y-3">
            <p className="font-bold uppercase tracking-wider text-foreground">Connect</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="mailto:contact@ruyastudio.com" className="hover:text-foreground">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-[11px] text-muted-foreground gap-2">
          <p>© 2026 Ru'ya Studio. All rights reserved.</p>
          <p>Built with intelligence for the real world.</p>
        </div>
      </div>
    </footer>
  );
}
