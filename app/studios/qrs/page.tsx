import type { Metadata } from "next";
import QrsExperience from "components/QrsExperience";

const TITLE = "Queso Revenue System (QRS) | Queso Studios";
const DESCRIPTION =
  "Connect your bank accounts and cards once and see what came in, what went out, and where it went. Read only: nothing in it can move your money.";
const URL = "https://www.quesoventures.com/studios/qrs";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
};

// Like Studios: no Header, no Footer, dark only.
export default function QrsPage() {
  return <QrsExperience />;
}
