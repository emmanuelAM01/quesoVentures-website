import type { Metadata } from "next";
import NotFoundContent from "components/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found | Queso Ventures",
  description: "This page melted off the map. Let's get you back to Queso Ventures.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
