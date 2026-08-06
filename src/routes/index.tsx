import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Sections } from "@/components/site/Sections";

const title = "Ru'ya — AI Systems. Designed with Purpose.";
const description =
  "Ru'ya is the AI engineering studio of Mohammed Sanin, building intelligent systems across computer vision, generative AI, deep learning, autonomous agents, and human-centered products.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ru'ya Studio",
          description,
          founder: { "@type": "Person", name: "Mohammed Sanin", jobTitle: "AI Research Engineer" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <Sections />
    </main>
  );
}
