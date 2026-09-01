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
  "intro": "Websites and local search for food trucks and restaurants across Houston. Your regulars already know where you park. Everyone else is on their phone right now, deciding where to eat in the next few minutes.",
  "prefill": "I run a food truck or restaurant and want more customers finding me.",
  "serviceName": "Web Design & Local SEO for Food Trucks and Restaurants",
  "painPoints": [
    {
      "heading": "Nobody can tell where you are today",
      "body": "The single most common reason a food truck loses a customer is that the person wanted to come and could not confirm the location. If today's spot is buried in a story that expired, it does not exist."
    },
    {
      "heading": "Your menu lives in a photo Google can't read",
      "body": "A photographed menu is invisible to search. Someone craving birria at eight at night will never find you, because the only place that word appears on your site is inside a JPEG."
    },
    {
      "heading": "Catering and event bookings never find you",
      "body": "Catering is the highest-margin work in this business and it comes from deliberate searches during business hours. If there is no page aimed at it, those inquiries go to whoever built one."
    }
  ],
  "whatChanges": [
    {
      "title": "Your location and hours are always current and findable",
      "body": "One place to update, that feeds your site and your Google profile at once, so the answer to 'where are they today' takes one tap instead of three apps."
    },
    {
      "title": "Your menu becomes text a search engine can read",
      "body": "Every dish, written out, so you show up for the specific cravings people search. This is usually the single biggest unlock for a food business."
    },
    {
      "title": "Catering gets its own front door",
      "body": "A dedicated page with capacity, pricing signals, service area, and an inquiry form. It turns your highest-margin work into something people can find on purpose."
    },
    {
      "title": "AI assistants send hungry people to you",
      "body": "When someone asks their phone where to eat nearby, those tools read websites and profiles to decide what to name. I structure yours so you are in that answer."
    }
  ],
  "faqItems": [
    {
      "q": "I run everything from Instagram. Isn't that enough?",
      "a": "It reaches people who already follow you. It does nothing for the person who just searched 'tacos near me' and has never heard of you. Those are the customers you are not currently getting."
    },
    {
      "q": "My location changes constantly. Can a website keep up?",
      "a": "That is exactly what it should do. You update one place, and the site and your Google profile both reflect it. Changing locations is an advantage once people can reliably find where you are."
    },
    {
      "q": "Does this work for a brick-and-mortar restaurant too?",
      "a": "Yes, and the mechanics are nearly identical. Readable menu, accurate hours, strong Google profile, fast mobile pages, and a clear path to order or book."
    },
    {
      "q": "What does it cost?",
      "a": "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You will know your exact number before anything starts."
    },
    {
      "q": "How does this start?",
      "a": "I take a free look at your current setup and build a preview of what your business could look like online. Then you decide. Call (281) 203-4531."
    }
  ]
};

export default function FoodTrucksPage() {
  return <IndustryPageTemplate data={data} />;
}
