import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/WeddingInvitation";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Krishn & Mansi — Wedding Invitation" },
      { name: "description", content: "Join Krishn and Mansi for four joyful wedding celebrations, 22–26 November 2026." },
      { property: "og:title", content: "Krishn & Mansi — Wedding Invitation" },
      { property: "og:description", content: "Together with their families, Krishn and Mansi invite you to celebrate their wedding." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return <WeddingInvitation />;
}
