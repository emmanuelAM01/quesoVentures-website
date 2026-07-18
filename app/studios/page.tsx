import type { Metadata } from "next";
import StudiosExperience from "components/StudiosExperience";

export const metadata: Metadata = {
  title: "Queso Studios | Software Built for Local Businesses | Queso Ventures",
  description:
    "Queso Studios is the software arm of Queso Ventures. Tools we design, build, and run for local businesses, starting with Queso Rewards.",
  alternates: { canonical: "https://www.quesoventures.com/studios" },
  openGraph: {
    title: "Queso Studios | Software Built for Local Businesses",
    description:
      "Queso Studios is the software arm of Queso Ventures. Tools we design, build, and run for local businesses, starting with Queso Rewards.",
    url: "https://www.quesoventures.com/studios",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queso Studios | Software Built for Local Businesses",
    description:
      "Queso Studios is the software arm of Queso Ventures. Tools we design, build, and run for local businesses, starting with Queso Rewards.",
    images: ["/logo.png"],
  },
};

// This page is a deliberate departure from the rest of the site: no Header,
// no Footer, dark only. The whole experience lives in StudiosExperience.
export default function StudiosPage() {
  return <StudiosExperience />;
}
