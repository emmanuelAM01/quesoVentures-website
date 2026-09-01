import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Porter & New Caney");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-porter-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-porter-tx",
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
  city: "Porter & New Caney",
  slug: "/web-design-porter-tx",
  postalCode: "77365",
  headline: "Porter and New Caney are booming.",
  intro:
    "Websites and local search for businesses along the 59 corridor: Valley Ranch, Tavola, Northcrest, and Roman Forest. Thousands of new neighbors a year, and none of them know you yet.",
  prefill:
    "I run a business in Porter or New Caney and want more customers finding me online.",
  painPoints: [
    {
      heading: "Thousands of new rooftops, and none of them know you yet",
      body: "Valley Ranch, Tavola, Roman Forest. New neighborhoods are filling up every month with families who have no history here and nobody to ask for a recommendation. They open their phone. Whoever ranks gets the first call, and usually keeps the customer for years.",
    },
    {
      heading: "Everyone drives past you on 59 without knowing you exist",
      body: "Frontage road visibility used to be enough. Now people decide where they're going before they leave the house. If you're not in the search result, the sign on your building is decoration.",
    },
    {
      heading: "You're competing with Kingwood and Humble for the same customers",
      body: "Porter and New Caney customers happily drive south for the right business, and businesses down there are actively targeting your customers. Nobody is doing the same in the other direction. That's an opening.",
    },
  ],
  whatChanges: [
    {
      title: "You show up when Porter and New Caney search",
      body: "I build your site and Google Business Profile around what people up here actually type, your service plus the town, plus 'near me,' so you're in the results that get tapped.",
    },
    {
      title: "New arrivals find you first, not your competitor",
      body: "The families moving into Tavola and Valley Ranch are picking their auto shop, their salon, and their contractor right now. I make sure you're the name on the screen while they're still deciding.",
    },
    {
      title: "Your website makes people call",
      body: "One-tap phone number, clear message, fast on a phone in a truck. I fix the layout and the wording so a visitor knows in five seconds who you are and how to reach you.",
    },
    {
      title: "AI assistants recommend you by name",
      body: "When somebody asks their phone or ChatGPT who to call in New Caney, those tools scan websites to pick an answer. I structure yours so you're the business they cite.",
    },
  ],
  faqItems: [
    {
      q: "Should I target Porter, New Caney, or both?",
      a: "Both, and that's exactly why this page covers both. People here use the names interchangeably and the ZIP codes overlap. Targeting only one leaves half your customers finding somebody else.",
    },
    {
      q: "The area is booming. Won't customers find me anyway?",
      a: "Growth brings customers and competitors at the same rate. The businesses that set up their search presence early are the ones still on the first screen when the area fills in. The ones who wait spend years trying to climb past them.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You'll know your exact number before anything starts.",
    },
    {
      q: "Do you actually come out here?",
      a: "Yes. I'm in Atascocita, about twenty minutes south. I'll meet you at your business, see how it runs, and you'll have my direct number the whole time.",
    },
    {
      q: "How does this start?",
      a: "I take a free look at your site, your Google profile, and whoever currently outranks you in Porter and New Caney, then build a preview of what your business could look like online. Then you decide. Call (281) 203-4531 or send a message.",
    },
  ],
  heroImage: { src: "/hero/newCaneyPorter.jpg", alt: "Porter and New Caney, Texas" },
};

export default function PorterPage() {
  return <GeoPageTemplate data={data} />;
}
