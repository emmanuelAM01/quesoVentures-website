import type { Metadata } from "next";
import { metaForIndustry } from "components/siteCopy";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaForIndustry("auto shops and mobile mechanics", "Auto Shop");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/seo-for-auto-shops-houston" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/seo-for-auto-shops-houston",
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
  "industry": "Auto Shops & Mobile Mechanics",
  "slug": "/seo-for-auto-shops-houston",
  "headline": "Beat the dealership",
  "intro": "Websites, SEO, and AI-SEO for auto shops and mobile mechanics across Northeast Houston. When somebody's check engine light comes on, they search once and call the first shop that looks trustworthy. That should be you.",
  "prefill": "I run an auto shop or mobile mechanic business and want more customers finding me online.",
  "serviceName": "Websites, SEO & AI-SEO for Auto Shops and Mobile Mechanics",
  "painPoints": [
    {
      "heading": "Emergencies do not scroll",
      "body": "Stranded on the shoulder, they call one of the first three and never look again."
    },
    {
      "heading": "The dealership has a team doing this",
      "body": "What they do not have is the owner answering the phone."
    },
    {
      "heading": "Mobile mechanics are invisible without an address",
      "body": "Google has nothing to pin you to, so most never show up at all."
    }
  ],
  "whatChanges": [
    {
      "title": "You show up for the searches that end in a call",
      "body": "Brake repair, check engine, AC, transmission, and every near me version."
    },
    {
      "title": "Mobile service gets found too",
      "body": "The listing gets set up for the area you cover, which almost nobody here does."
    },
    {
      "title": "Your number works with one tap",
      "body": "At the top of a page that loads on one bar of signal in a parking lot."
    },
    {
      "title": "AI assistants send drivers your way",
      "body": "When someone asks their phone for a good mechanic nearby, it is you."
    }
  ],
  "faqItems": [
    {
      "q": "I'm a mobile mechanic with no shop address. Can I still rank?",
      "a": "Yes, and almost nobody sets this up right. Google lets you hide the address and show a coverage area instead."
    },
    {
      "q": "I have a Google listing and still don't show up. Why?",
      "a": "Having a listing and having a good one are different things. Categories, photos, reviews, and the site behind it decide the top three."
    },
    {
      "q": "Most of my work is repeat customers. Is this worth it?",
      "a": "Repeat customers are the foundation. They also move away and their cars age out, and search is how you replace them."
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
  heroImage: { src: "/hero/mechanic.jpg", alt: "A mechanic at work in the shop" },
};

export default function AutoShopsPage() {
  return <IndustryPageTemplate data={data} />;
}
