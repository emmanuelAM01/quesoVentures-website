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
  "intro": "Websites, SEO, and AI-SEO for vehicle wrap, tint, and detail shops across Northeast Houston. You already have the portfolio. Instagram is where people browse it. A website is where they book.",
  "prefill": "I run a wrap, tint, or detail shop and want more customers finding me online.",
  "serviceName": "Websites, SEO & AI-SEO for Vehicle Wrap and Detail Shops",
  "painPoints": [
    {
      "heading": "They browse on Instagram. They book on a website",
      "body": "Your grid does the convincing. It is just not where somebody searching car wrap near me ends up."
    },
    {
      "heading": "Every quote starts from zero",
      "body": "No finished work, no price range, no turnaround. So every lead asks the same five questions."
    },
    {
      "heading": "Fleet work never finds you",
      "body": "Fleet buyers search deliberately, on a laptop, in business hours. Not through a hashtag."
    }
  ],
  "whatChanges": [
    {
      "title": "Your work becomes searchable",
      "body": "A gallery Google can actually read, with the vehicle and the service in the words."
    },
    {
      "title": "Each service shows up on its own",
      "body": "Full wraps, color change, tint, PPF, fleet. Different searches, different pages."
    },
    {
      "title": "Fleet buyers can vet you",
      "body": "A page written for the person spending twelve thousand dollars, not twelve hundred."
    },
    {
      "title": "AI assistants name your shop",
      "body": "When someone asks their phone for a good wrap shop nearby, it is you."
    }
  ],
  "faqItems": [
    {
      "q": "I get all my work from Instagram. Why do I need a website?",
      "a": "Instagram is doing its job, and doing it well. It is where people browse and decide they like your work. A website is how they find you before that, and how they book after."
    },
    {
      "q": "Will you use my existing photos?",
      "a": "Yes. Your work is the best thing you have, so the site gets built around it."
    },
    {
      "q": "Can this help me get commercial fleet jobs?",
      "a": "Yes. Fleet buyers start with a search and a laptop, and almost no wrap shop has written a page for them."
    },
    {
      "q": "What does it cost?",
      "a": "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      "q": "How does this start?",
      "a": "Send your shop's name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/wrapShops.jpg", alt: "A vehicle wrap being applied" },
};

export default function WrapShopsPage() {
  return <IndustryPageTemplate data={data} />;
}
