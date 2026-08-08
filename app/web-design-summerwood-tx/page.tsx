import type { Metadata } from "next";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const TITLE = "Web Design & Local SEO in Summerwood & Fall Creek, TX";
const DESCRIPTION =
  "Websites and local search for Summerwood and Fall Creek businesses in 77396 and 77044, along West Lake Houston Parkway and Beltway 8. $300 a month. Call (281) 203-4531.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-summerwood-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-summerwood-tx",
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

const data: GeoPageData = {
  city: "Summerwood & Fall Creek",
  slug: "/web-design-summerwood-tx",
  postalCode: "77396",
  headline: "Your neighbors can't find you.",
  intro:
    "Websites and local search for businesses serving Summerwood, Fall Creek, Lakeshore, and Balmoral, along West Lake Houston Parkway and Beltway 8. They still can't find you.",
  prefill:
    "I run a business serving Summerwood or Fall Creek and want more customers finding me online. Here's my current situation:",
  painPoints: [
    {
      heading: "These neighborhoods search by name, and nobody targets them",
      body: "People here don't search 'Houston.' They search Summerwood, Fall Creek, Lakeshore, or just 'near me' from their driveway. Almost no business builds a page around those words, which means the first one that does tends to stay on top.",
    },
    {
      heading: "High-income households picking new providers constantly",
      body: "These are master-planned communities full of families who moved in recently and are still choosing their auto shop, their lawn service, their salon, their contractor. Every one of those decisions starts on a phone, and most of them get made in under a minute.",
    },
    {
      heading: "The HOA Facebook groups only reach people already settled in",
      body: "Neighborhood groups are great, but they reach the residents who already have opinions. The family closing on a house next week isn't in that group yet. They're on Google, and they'll have picked their favorites before they finish unpacking.",
    },
  ],
  whatChanges: [
    {
      title: "You show up for the neighborhood, not just the metro",
      body: "I build your website and Google Business Profile around Summerwood, Fall Creek, and the surrounding communities by name, so you appear for the searches your actual neighbors run.",
    },
    {
      title: "New residents find you while they're still deciding",
      body: "The window where a family picks their providers is short and it never reopens. I make sure you're visible during it instead of a year later.",
    },
    {
      title: "Your website earns the call",
      body: "One-tap phone number, a clear message, and a page that loads fast on a phone. I fix the part that turns a visitor into somebody who actually contacts you.",
    },
    {
      title: "AI assistants recommend you by name",
      body: "When someone asks their phone or ChatGPT for a recommendation around Lake Houston, those tools read websites to decide who to name. I structure yours so you're the answer.",
    },
  ],
  faqItems: [
    {
      q: "Summerwood and Fall Creek are neighborhoods, not cities. Does this still work?",
      a: "It works better. Google absolutely understands neighborhood-level searches, and the competition for them is close to zero because everyone else is fighting over 'Houston.' Fewer searches, but almost all of them are people who are ready to buy and live minutes from you.",
    },
    {
      q: "My business isn't physically in Summerwood. Can I still target it?",
      a: "Yes. Most businesses serving these neighborhoods sit on Beltway 8, West Lake Houston Parkway, or over in Humble and Atascocita. What matters is that Google understands you serve the area, which is exactly what a service-area profile and a page like this establish.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $300 a month. A fraction of the $1,500 or more agencies charge, and you'll know your exact number before anything starts.",
    },
    {
      q: "What kinds of businesses do you work with?",
      a: "Local service businesses around Lake Houston, auto and wrap shops, contractors and trades, salons and med spas, cleaning and lawn services, food trucks, event venues, and local retailers. If customers find you by searching, we're a fit.",
    },
    {
      q: "How does this start?",
      a: "I take a free look at your site, your Google profile, and whoever currently shows up for these neighborhoods, then build a preview of what your business could look like online. Then you decide. Call (281) 203-4531 or send a message.",
    },
  ],
};

export default function SummerwoodPage() {
  return <GeoPageTemplate data={data} />;
}
