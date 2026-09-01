import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import AboutModal from "components/AboutModal";
import ContactModal from "components/ContactModal";
import ConsoleEasterEgg from "components/ConsoleEasterEgg";


import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quesoventures.com"),

  // No canonical here on purpose. A canonical in the root layout is inherited
  // by every page that doesn't set its own, which quietly tells Google those
  // pages are all duplicates of the homepage. Each page declares its own.

  title: "Web Design & Local SEO in Atascocita, Humble & Kingwood TX",
  description: "Web design and local SEO for businesses in Atascocita, Humble, Kingwood, and Northeast Houston. Simple plans at $500 a month, not agency prices. Free audit first.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Local SEO in Atascocita, Humble & Kingwood TX",
    description: "Web design and local SEO for businesses in Atascocita, Humble, Kingwood, and Northeast Houston. Simple plans at $500 a month, not agency prices. Free audit first.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/about.JPEG" as="image" />
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-lightAccent dark:bg-darkAccent min-h-screen overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <AboutModal />
          <ContactModal />
          <ConsoleEasterEgg />
        </ThemeProvider>
        {/* Page views only. Custom events (e.g. call-button taps) need Pro. */}
        <Analytics />
      </body>
    </html>
  );
}
