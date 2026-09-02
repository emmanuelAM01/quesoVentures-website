import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Atascocita");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-atascocita-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-atascocita-tx",
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
  city: "Atascocita",
  slug: "/web-design-atascocita-tx",
  postalCode: "77346",
  headline: "Atascocita is already searching.",
  intro: "Atascocita looks you up before it drives anywhere.",
  prefill:
    "I run a business in Atascocita and want more customers finding me online.",
  painPoints: [
    {
      heading: "Neighbors search before they drive",
      body: "Nobody drives FM 1960 hoping to spot you. They searched, compared the top few, and picked."
    },
    {
      heading: "Facebook groups only reach people who already know you",
      body: "The families who moved in last month are not in those groups. They are on Google."
    },
    {
      heading: "Humble and Kingwood shops win searches that should be yours",
      body: "Ten minutes is nothing to an Atascocita customer, and that cuts both ways."
    }
  ],
  whatChanges: [
    {
      title: "Atascocita finds you first",
      body: "Your service plus Atascocita, plus every near me variation people actually use."
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
      q: "Atascocita isn't technically a city. Do people still search it by name?",
      a: "Yes. People search Atascocita by name every day, and almost nobody here is set up for it."
    },
    {
      q: "I get business from neighborhood Facebook groups. Isn't that enough?",
      a: "Those reach people who already know you. Google reaches the families in Eagle Springs and The Groves who moved in last month."
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
  heroImage: { src: "/hero/Atascocita-Texas.jpg", alt: "Atascocita, Texas" },
};

export default function AtascocitaPage() {
  return <GeoPageTemplate data={data} />;
}
