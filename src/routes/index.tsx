import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";

const title = "Mohammed Sanin — AI/ML Engineer & Product Builder";
const description =
  "AR retail, computer vision and applied ML — shipped end to end by Mohammed Sanin.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <section id="work" className="mx-auto max-w-3xl px-6 py-32">
        <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The projects section lands here next.
        </p>
      </section>
    </main>
  );
}
