import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "components/Header";
import AboutModal from "components/AboutModal";
import ContactModal from "components/ContactModal";
import ConsoleEasterEgg from "components/ConsoleEasterEgg";
import { getPublished } from "lib/guide/queries";

/**
 * The Guide joins the nav once it has enough in it to be worth a click. An
 * empty guide one tap from every page reads as unfinished to a prospect; the
 * footer link keeps it discoverable to crawlers until then. The count is a
 * cached read tagged `guide`, so publishing the third entry turns the link on
 * through the same webhook that publishes it.
 */
const GUIDE_NAV_MIN = 3;


import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quesoventures.com"),

  // No canonical here on purpose. A canonical in the root layout is inherited
  // by every page that doesn't set its own, which quietly tells Google those
  // pages are all duplicates of the homepage. Each page declares its own.

  title: "Websites, SEO & AI-SEO in Atascocita, Humble & Kingwood TX",
  description: "Websites, SEO, and AI-SEO for businesses in Atascocita, Humble, Kingwood, and Northeast Houston. Simple plans at $500 a month, not agency prices.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites, SEO & AI-SEO in Atascocita, Humble & Kingwood TX",
    description: "Websites, SEO, and AI-SEO for businesses in Atascocita, Humble, Kingwood, and Northeast Houston. Simple plans at $500 a month, not agency prices.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const guideInNav = (await getPublished()).length >= GUIDE_NAV_MIN;
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
          {/*
            The header lives here, not in each page.

            It used to be rendered by every page and every template, which meant
            every navigation unmounted it and built a new one. Nothing in it
            could ever carry across a route change — so the nav could not slide
            from centred to right when you picked a trade, it could only appear
            already moved. One instance above the router makes the bar a fixed
            piece of furniture the pages move underneath.

            Two routes opt out inside the component: /studios brings its own
            chrome and /foundCode uses SimpleHeader.
          */}
          {/*
            The site ground, behind the bar as well as the page.

            body is painted house red so an overscroll bounce shows paint rather
            than white. That was invisible while every page wrapped its own
            header in its own background; with the bar hoisted up here, the strip
            around it went red on any page whose first section does not tuck
            under it. Heroes that do tuck under still cover this.
          */}
          <div className="bg-lightBG dark:bg-darkBG">
            <Header guideInNav={guideInNav} />
            {children}
          </div>
          <AboutModal />
          <ContactModal />
          <ConsoleEasterEgg />
        </ThemeProvider>
        {/*
          Page views and the custom conversion events in components/analytics.ts.
          Both need Web Analytics enabled on the project, which it is.
        */}
        <Analytics />
        {/*
          Core Web Vitals from real visitors, per route.

          This is field data, not a Lighthouse score: it is what Google actually
          measures this site on, and it is the only way to see that one city page
          is slow because of its hero photograph while the rest are fine.

          Speed Insights is a PAID add-on, not part of the Pro plan. It was
          enabled on this project on 2026-09-12; check the billing page before
          assuming it is free. Removing this component stops the data being
          sent, but does not disable the feature on the project.
        */}
        <SpeedInsights />
      </body>
    </html>
  );
}
