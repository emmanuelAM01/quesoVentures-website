import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Channelview");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-channelview-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-channelview-tx",
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
  city: "Channelview",
  slug: "/web-design-channelview-tx",
  postalCode: "77530",
  headline: "Channelview searches first.",
  intro: "Channelview finds you on a phone, or not at all.",
  prefill:
    "I run a business in Channelview and want more customers finding me online.",
  painPoints: [
    {
      heading: "Everybody knows you, and everybody is not enough",
      body: "The people who moved in this year have never heard your name."
    },
    {
      heading: "Houston results bury you",
      body: "Search Houston anything and you are on page four. Search Channelview and it is wide open."
    },
    {
      heading: "Your competition has a real website",
      body: "Not a better shop. A better first impression."
    }
  ],
  whatChanges: [
    {
      title: "Channelview finds you first",
      body: "Built for people who add their own town, because out here they do."
    },
    {
      title: "Your site asks for the call",
      body: "Clear message, obvious next step, fast on a phone."
    },
    {
      title: "AI assistants name you",
      body: "Structured so a phone asked for a recommendation here says your name."
    },
    {
      title: "You get a person, not a queue",
      body: "One monthly price, and I answer my own messages."
    }
  ],
  faqItems: [
    {
      q: "Do people really search Channelview instead of Houston?",
      a: "Yes. When someone wants a shop close to home they add their own town, and out here that matters."
    },
    {
      q: "I've been here for years and everybody knows me. Why bother?",
      a: "Everyone who has been here knows you. The people who just moved in do not, and they are searching."
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
  heroImage: { src: "/hero/chanelview.avif", alt: "Channelview, Texas" },
};

export default function ChannelviewPage() {
  return <GeoPageTemplate data={data} />;
}
