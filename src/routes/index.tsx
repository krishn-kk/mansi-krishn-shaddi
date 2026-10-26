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
      { property: "og:url", content: "https://mansi-krishn-shaddi.lovable.app/" },
      { property: "og:image", content: "https://mansi-krishn-shaddi.lovable.app/wedding-preview.jpg" },
      { property: "og:image:secure_url", content: "https://mansi-krishn-shaddi.lovable.app/wedding-preview.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Illustration of Krishn proposing to Mansi beneath a floral arch" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mansi-krishn-shaddi.lovable.app/wedding-preview.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://mansi-krishn-shaddi.lovable.app/" }],
  }),
});

function Index() {
  return <WeddingInvitation />;
}
