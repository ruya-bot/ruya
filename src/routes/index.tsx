import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Sections } from "@/components/site/Sections";

const title = "Mohammed Sanin — AI/ML Engineer & Product Builder";
const description =
  "Portfolio of Mohammed Sanin: AR retail, computer vision and applied ML, designed and shipped end to end.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
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
