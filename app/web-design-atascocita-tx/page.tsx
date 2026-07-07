import type { Metadata } from "next";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

export const metadata: Metadata = {
  title: "Web Design & Local SEO in Atascocita, TX | Queso Ventures",
  description:
    "Websites and local search for Atascocita businesses, Eagle Springs, The Groves, Walden, and beyond. Simple $300/ month plans. Start with a free audit.",
  alternates: { canonical: "https://www.quesoventures.com/web-design-atascocita-tx" },
  openGraph: {
    title: "Web Design & Local SEO in Atascocita, TX | Queso Ventures",
    description:
      "Websites and local search for Atascocita businesses, Eagle Springs, The Groves, Walden, and beyond. Simple $300/ month plans. Start with a free audit.",
    url: "https://www.quesoventures.com/web-design-atascocita-tx",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Local SEO in Atascocita, TX | Queso Ventures",
    description:
      "Websites and local search for Atascocita businesses, Eagle Springs, The Groves, Walden, and beyond. Simple $300/ month plans. Start with a free audit.",
    images: ["/logo.png"],
  },
};

const data: GeoPageData = {
  city: "Atascocita",
  slug: "/web-design-atascocita-tx",
  headline: "Atascocita Is Searching for a Business Like Yours. Show Up First.",
  subline:
    "Websites and local search for Atascocita businesses, Eagle Springs, The Groves, Walden on Lake Houston, Kings River. Built by someone local who actually visits your shop.",
  prefill:
    "I run a business in Atascocita and want more customers finding me online. Here's my current situation:",
  painPoints: [
    {
      heading: "Neighbors search online before they drive anywhere",
      body: "Atascocita is a community of commuters and busy families. Before anyone drives down FM 1960 or West Lake Houston Parkway, they've already searched, compared the top results, and picked. If you're not in that first screen, you were never in the running.",
    },
    {
      heading: "The Facebook groups only reach people already paying attention",
      body: "Neighborhood groups and NextDoor are useful, but they're word of mouth with extra steps. The families moving into Eagle Springs and The Groves every month aren't in those groups yet, they're on Google.",
    },
    {
      heading: "You're competing with Humble and Kingwood businesses too",
      body: "Atascocita customers will happily drive 10 minutes for the right business. That cuts both ways: businesses one town over are winning searches that should be yours. A locally-tuned website flips that back in your favor.",
    },
  ],
  whatChanges: [
    {
      title: "You show up when Atascocita searches for what you do",
      body: "I build your website and Google Business Profile around the searches your neighbors actually type, your service plus 'Atascocita,' plus 'near me', so you're in the top results they see.",
    },
    {
      title: "Your website makes people act, not just look",
      body: "Clear message, obvious next step, fast on a phone. I rework your site so the person who finds you actually calls, books, or messages instead of hitting the back button.",
    },
    {
      title: "AI assistants recommend you by name",
      body: "When someone asks ChatGPT or their phone for a recommendation in Atascocita, those tools scan websites to pick an answer. I structure yours so you're the business they cite.",
    },
    {
      title: "You work with a local, not a ticket queue",
      body: "I'm in the area. I'll meet you at your business, understand what makes it different, and be a text away, for a simple monthly price, not agency retainers.",
    },
  ],
  faqItems: [
    {
      q: "Atascocita isn't technically a city. Does local search still work here?",
      a: "Yes, Google treats Atascocita as its own local area, and people here search 'Atascocita' by name constantly. Most businesses never optimize for it specifically, which is exactly why the opportunity is wide open.",
    },
    {
      q: "I get some business from neighborhood Facebook groups. Isn't that enough?",
      a: "Groups reach people who already know the area. Google reaches everyone, including the new families moving into Eagle Springs, The Groves, and Balmoral every month. The businesses that show up in search get the newcomers by default.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $300 a month. Far below the $1,500+ agencies charge, and unlike most of them I set you up for AI search too. You'll know your exact number before anything starts.",
    },
    {
      q: "What kinds of businesses do you work with?",
      a: "Local service businesses across Atascocita and Northeast Houston, auto and wrap shops, contractors, salons and med spas, food trucks, event venues, cleaning services, and more. If customers search for what you do, we're a fit.",
    },
    {
      q: "How does this start?",
      a: "I take a free look at where you stand, your site, your Google profile, and who currently outranks you in Atascocita, and build a preview of what your business could look like online. Then you decide. No pressure.",
    },
  ],
};

export default function AtascocitaPage() {
  return <GeoPageTemplate data={data} />;
}
