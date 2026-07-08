import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AboutModal from "components/AboutModal";
import ContactModal from "components/ContactModal";
import ConsoleEasterEgg from "components/ConsoleEasterEgg";


import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quesoventures.com"),

  alternates: {
    canonical: "https://www.quesoventures.com/",
  },

  title: "Web Design & Local SEO for Houston Businesses | Queso Ventures",
  description: "Web design and local SEO that gets Houston businesses found on Google and AI search. Simple monthly plans at $300/ month, not agency prices. Free audit first.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Local SEO for Houston Businesses | Queso Ventures",
    description: "Web design and local SEO that gets Houston businesses found on Google and AI search. Simple monthly plans at $300/ month, not agency prices. Free audit first.",
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
      </body>
    </html>
  );
}
