import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Humble");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-humble-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-humble-tx",
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
  city: "Humble",
  slug: "/web-design-humble-tx",
  postalCode: "77338",
  headline: "Humble is searching right now.",
  intro: "Humble searches first, then drives.",
  prefill:
    "I run a business in Humble and want more customers finding me online.",
  painPoints: [
    {
      heading: "FM 1960 traffic is not the same as customers",
      body: "Thousands drive past. The ones who stop searched first."
    },
    {
      heading: "Deerbrook shoppers decide before they park",
      body: "They compare on a phone in the lot, and pick from the top few."
    },
    {
      heading: "The chains out here have marketing teams",
      body: "What they do not have is the owner answering the phone."
    }
  ],
  whatChanges: [
    {
      title: "Humble finds you first",
      body: "Built around the searches your neighbors actually type, not industry jargon."
    },
    {
      title: "Your site asks for the call",
      body: "Clear message, obvious next step, fast on a phone."
    },
    {
      title: "AI assistants name you",
      body: "Structured so ChatGPT and Siri cite you when someone asks in Humble."
    },
    {
      title: "You get a person, not a queue",
      body: "One monthly price, and I answer my own messages."
    }
  ],
  faqItems: [
    {
      q: "I have a Google listing already. Why am I still not showing up?",
      a: "Having a listing and having a good one are different things. Categories, photos, reviews, and the site behind it decide the top three."
    },
    {
      q: "My customers mostly come from word of mouth. Is this worth it?",
      a: "Word of mouth brings the best customers and the slowest growth. Search fills the weeks in between."
    },
    {
      q: "What does it cost?",
      a: "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      q: "Do you only work with certain types of businesses?",
      a: "Local businesses whose customers find them by searching. Auto shops, contractors, salons, cleaners, food trucks, and plenty more."
    },
    {
      q: "How does this start?",
      a: "Send your business name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/humble.JPG", alt: "Humble, Texas" },
};

export default function HumblePage() {
  return <GeoPageTemplate data={data} />;
}
