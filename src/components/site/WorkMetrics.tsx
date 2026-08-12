import { Reveal } from "./Reveal";

const metrics = [
  { value: "03", label: "Flagship AI Systems" },
  { value: "03", label: "Real-World Domains" },
  { value: "END-TO-END", label: "Research → Data → Models → APIs → Interfaces" },
  { value: "CORE", label: "Computer Vision & Multimodal Intelligence" },
];

export function WorkMetrics() {
  return (
    <section className="relative isolate border-y border-border px-5 py-[8vh] sm:px-6 md:py-[10vh]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.05}>
            <p className="display-xl text-[clamp(2.2rem,8vw,3.8rem)] leading-none text-foreground">
              {m.value}
            </p>
            <p className="mt-3 max-w-[20ch] text-[13px] font-medium text-muted-foreground sm:text-sm">
              {m.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
