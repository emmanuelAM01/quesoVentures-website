import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Kingwood");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-kingwood-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-kingwood-tx",
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
  city: "Kingwood",
  slug: "/web-design-kingwood-tx",
  postalCode: "77339",
  headline: "Be who Kingwood finds.",
  intro: "Word of mouth got you here. Kingwood searches for the rest.",
  prefill:
    "I run a business in Kingwood and want more customers finding me online.",
  painPoints: [
    {
      heading: "Loyalty is real. Getting discovered is the hard part",
      body: "Once a Kingwood family picks you they stay for years. That first pick happens on Google."
    },
    {
      heading: "New families arrive every month knowing nobody",
      body: "Their first mechanic, salon, or contractor is whoever comes up first."
    },
    {
      heading: "Your website looks fine and does nothing",
      body: "It does not rank, it is slow on a phone, and nothing on it asks for the call."
    }
  ],
  whatChanges: [
    {
      title: "Kingwood finds you first",
      body: "Your site and Google profile get built around what neighbors actually type."
    },
    {
      title: "Your site asks for the call",
      body: "Clear message, obvious next step, fast on a phone."
    },
    {
      title: "AI assistants name you",
      body: "When someone asks their phone for a recommendation in Kingwood, you are the answer."
    },
    {
      title: "You get a person, not a queue",
      body: "One monthly price, and I answer my own messages."
    }
  ],
  faqItems: [
    {
      q: "My business runs on referrals from Kingwood neighbors. Why change?",
      a: "Referrals are the best customers you get. They are also the ones you cannot schedule."
    },
    {
      q: "I'm in a shopping center off Kingwood Drive. Won't people just see me?",
      a: "Driving past you is not the same as looking for you. Most people decide before they leave the house."
    },
    {
      q: "What does it cost?",
      a: "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      q: "What kinds of businesses do you work with?",
      a: "Local businesses whose customers find them by searching. Auto shops, contractors, salons, cleaners, food trucks, and plenty more."
    },
    {
      q: "How does this start?",
      a: "Send your business name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/kingwood.jpg", alt: "Kingwood, Texas" },
};

export default function KingwoodPage() {
  return <GeoPageTemplate data={data} />;
}
