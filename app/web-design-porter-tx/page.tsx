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
  intro: "Porter and New Caney get thousands of new neighbors a year. None of them know you yet.",
  prefill:
    "I run a business in Porter or New Caney and want more customers finding me online.",
  painPoints: [
    {
      heading: "The 59 corridor fills up faster than word of mouth travels",
      body: "Thousands move in each year with no idea you exist."
    },
    {
      heading: "Valley Ranch and Tavola search for everything",
      body: "New builds mean a new everybody: mechanic, dentist, lawn crew, all decided by search."
    },
    {
      heading: "Kingwood and Conroe businesses are taking the calls",
      body: "Nobody minds driving twenty minutes. They mind not finding you."
    }
  ],
  whatChanges: [
    {
      title: "Porter and New Caney both find you",
      body: "One page that ranks for either name, because people use both."
    },
    {
      title: "Your site asks for the call",
      body: "Clear message, obvious next step, fast on a phone."
    },
    {
      title: "AI assistants name you",
      body: "Structured so a phone asked for a recommendation out here says your name."
    },
    {
      title: "You get a person, not a queue",
      body: "One monthly price, and I answer my own messages."
    }
  ],
  faqItems: [
    {
      q: "Should I target Porter, New Caney, or both?",
      a: "Both. People use either name depending on where they live, and one page can rank for both."
    },
    {
      q: "The area is booming. Won't customers find me anyway?",
      a: "Growth brings competition with it. New arrivals have no history here, so they pick whoever comes up first."
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
  heroImage: { src: "/hero/newCaneyPorter.jpg", alt: "Porter and New Caney, Texas" },
};

export default function PorterPage() {
  return <GeoPageTemplate data={data} />;
}
