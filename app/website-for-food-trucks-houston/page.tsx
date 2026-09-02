import type { Metadata } from "next";
import { metaForIndustry } from "components/siteCopy";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaForIndustry("food trucks and restaurants", "Restaurant");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/website-for-food-trucks-houston" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/website-for-food-trucks-houston",
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

const data: IndustryPageData = {
  "industry": "Food Trucks & Restaurants",
  "slug": "/website-for-food-trucks-houston",
  "headline": "Hungry people decide fast.",
  "intro": "Websites, SEO, and AI-SEO for food trucks and restaurants across Houston. Your regulars already know where you park. Everyone else is on their phone right now, deciding where to eat in the next few minutes.",
  "prefill": "I run a food truck or restaurant and want more customers finding me.",
  "serviceName": "Websites, SEO & AI-SEO for Food Trucks and Restaurants",
  "painPoints": [
    {
      "heading": "Nobody can tell where you are today",
      "body": "Your schedule is in a story that expired at midnight."
    },
    {
      "heading": "Your menu is a photo Google cannot read",
      "body": "So it never comes up when someone searches for what you sell."
    },
    {
      "heading": "Catering never finds you",
      "body": "The biggest tickets you get, and there is no page for them."
    }
  ],
  "whatChanges": [
    {
      "title": "Where you are today, findable",
      "body": "Your location and hours stay current on the site and on Google."
    },
    {
      "title": "Your menu becomes searchable text",
      "body": "Birria, boudin, whatever you are known for, in words a search engine reads."
    },
    {
      "title": "Catering gets its own front door",
      "body": "A page for the office manager feeding forty people on Thursday."
    },
    {
      "title": "AI assistants send hungry people",
      "body": "When someone asks their phone where to eat nearby, it is you."
    }
  ],
  "faqItems": [
    {
      "q": "I run everything from Instagram. Isn't that enough?",
      "a": "Instagram keeps your regulars, and that matters. It just does not come up when somebody nearby searches for what you sell."
    },
    {
      "q": "My location changes constantly. Can a website keep up?",
      "a": "Yes. The site shows where you are today and the Google profile moves with it."
    },
    {
      "q": "Does this work for a brick-and-mortar restaurant too?",
      "a": "Yes, same work. The searches change, the setup does not."
    },
    {
      "q": "What does it cost?",
      "a": "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      "q": "How does this start?",
      "a": "Send your business name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ]
};

export default function FoodTrucksPage() {
  return <IndustryPageTemplate data={data} />;
}
