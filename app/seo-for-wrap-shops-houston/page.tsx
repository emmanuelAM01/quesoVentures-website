import type { Metadata } from "next";
import { metaForIndustry } from "components/siteCopy";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaForIndustry("wrap and detail shops", "Wrap Shop");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/seo-for-wrap-shops-houston" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/seo-for-wrap-shops-houston",
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
  "industry": "Wrap & Detail Shops",
  "slug": "/seo-for-wrap-shops-houston",
  "headline": "Your work sells itself.",
  "intro": "Websites and local search for vehicle wrap, tint, and detail shops across Northeast Houston. You already have the portfolio. The problem is that it lives on Instagram, where only people who already follow you will ever find it.",
  "prefill": "I run a wrap, tint, or detail shop and want more customers finding me online.",
  "serviceName": "Web Design & Local SEO for Vehicle Wrap and Detail Shops",
  "painPoints": [
    {
      "heading": "Your portfolio is trapped on Instagram",
      "body": "Instagram shows your work to people who already follow you. Nobody searching 'car wrap near me' at nine at night is scrolling your grid. They are on Google, and Google cannot see a word of what is in your photos."
    },
    {
      "heading": "Every quote conversation starts from zero",
      "body": "Without a site that shows finished work, pricing ranges, and turnaround, every lead arrives asking the same five questions. A good site answers them before the phone rings, so the calls you get are from people ready to book."
    },
    {
      "heading": "Commercial fleet work never finds you",
      "body": "Fleet and van wrap jobs are the biggest tickets in this business, and the people buying them search deliberately, in business hours, on a laptop. They will not find you through a hashtag."
    }
  ],
  "whatChanges": [
    {
      "title": "Your work becomes searchable, not just scrollable",
      "body": "I build a gallery Google can actually read, with the vehicle, the service, and the location described in text alongside every image. That is the difference between a portfolio and a lead source."
    },
    {
      "title": "You show up for each service separately",
      "body": "Full wrap, partial wrap, color change, chrome delete, window tint, paint correction, ceramic coating, fleet graphics. Each one is its own search. Covering them individually multiplies the ways you get found."
    },
    {
      "title": "Fleet buyers can find and vet you",
      "body": "Commercial work needs proof: past fleet jobs, turnaround, insurance, capacity. I put that where a business buyer looks for it so you stop losing bids you never knew existed."
    },
    {
      "title": "AI assistants recommend your shop",
      "body": "When someone asks for a good wrap shop nearby, those tools read websites to pick who to name. I structure yours so you are the answer."
    }
  ],
  "faqItems": [
    {
      "q": "I get all my work from Instagram. Why do I need a website?",
      "a": "Instagram is great at showing work to people who already know you. It is terrible at reaching the person who decided this morning they want their truck wrapped and searched for it. Those are different customers, and the second group has their wallet out."
    },
    {
      "q": "Will you use my existing photos?",
      "a": "Yes. You already have the hardest part. What is missing is the structure around them, the descriptions, the service pages, and the technical setup that lets a search engine understand what it is looking at."
    },
    {
      "q": "Can this help me get commercial fleet jobs?",
      "a": "That is often the fastest win. Fleet buyers search deliberately and compare a few shops. Most wrap shops have nothing online aimed at them, so showing up with real fleet work and clear capacity information puts you in a very short list."
    },
    {
      "q": "What does it cost?",
      "a": "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You will know your exact number before anything starts."
    },
    {
      "q": "How does this start?",
      "a": "I take a free look at your current setup and build a preview of what your shop could look like online. Then you decide. Call (281) 203-4531."
    }
  ],
  heroImage: { src: "/hero/wrapShops.jpg", alt: "A vehicle wrap being applied" },
};

export default function WrapShopsPage() {
  return <IndustryPageTemplate data={data} />;
}
