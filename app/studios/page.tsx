import type { Metadata } from "next";
import StudiosExperience from "components/StudiosExperience";

export const metadata: Metadata = {
  title: "Queso Studios | Software for Local Businesses",
  description:
    "Ventures is plural for a reason. Tools that bring your customers back and keep your business running, like Queso Rewards.",
  alternates: { canonical: "https://www.quesoventures.com/studios" },
  openGraph: {
    title: "Queso Studios | Software for Local Businesses",
    description:
      "Ventures is plural for a reason. Tools that bring your customers back and keep your business running, like Queso Rewards.",
    url: "https://www.quesoventures.com/studios",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queso Studios | Software for Local Businesses",
    description:
      "Ventures is plural for a reason. Tools that bring your customers back and keep your business running, like Queso Rewards.",
    images: ["/logo.png"],
  },
};

// This page is a deliberate departure from the rest of the site: no Header,
// no Footer, dark only. The whole experience lives in StudiosExperience.
export default function StudiosPage() {
  return <StudiosExperience />;
}
