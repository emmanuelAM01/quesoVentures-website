import type { Metadata } from "next";
import { metaForIndustry } from "components/siteCopy";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaForIndustry("contractors and roofers", "Contractor");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/seo-for-contractors-houston" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/seo-for-contractors-houston",
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
  "industry": "Construction, Roofing & Flooring Companies",
  "slug": "/seo-for-contractors-houston",
  "headline": "Referrals are not a plan.",
  "intro": "Websites, SEO, and AI-SEO for construction, roofing, and flooring companies across Northeast Houston, residential and commercial. A second pipeline that keeps producing when the referrals go quiet.",
  "prefill": "I run a construction, roofing, or flooring company and want my website to actually get me calls.",
  "serviceName": "Websites, SEO & AI-SEO for Construction, Roofing and Flooring Companies",
  "painPoints": [
    {
      "heading": "Some months are packed, some are dead",
      "body": "And you cannot predict which, because referrals arrive on their own schedule."
    },
    {
      "heading": "Homeowners call the first credible result",
      "body": "Then they stop calling. Third place gets a voicemail nobody returns."
    },
    {
      "heading": "Commercial buyers check you out first",
      "body": "They read your site before they ever pick up the phone."
    }
  ],
  "whatChanges": [
    {
      "title": "You show up for the work you want",
      "body": "Roofing, flooring, remodels, and the jobs worth driving for."
    },
    {
      "title": "Your site asks for the call",
      "body": "Clear message, real photos, obvious next step, fast on a phone."
    },
    {
      "title": "Commercial and residential split",
      "body": "Two very different buyers, two different pages. Most contractors build one."
    },
    {
      "title": "A pipeline that is not hostage to referrals",
      "body": "Something that keeps producing when the phone goes quiet."
    }
  ],
  "faqItems": [
    {
      "q": "I get plenty of work from referrals. Why bother with this?",
      "a": "Referrals dry up between seasons. Search is what fills the calendar when the phone goes quiet."
    },
    {
      "q": "I already have a Google listing. Why am I still not showing up?",
      "a": "Having a listing and having a good one are different things. Categories, photos, reviews, and the site behind it decide the top three."
    },
    {
      "q": "Do you handle commercial as well as residential?",
      "a": "Yes. They are different searches and different pages, and most contractors only ever build one."
    },
    {
      "q": "What does it cost?",
      "a": "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      "q": "How does this start?",
      "a": "Send your company name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/contractorsHero.jpg", alt: "A contractor on site" },
};

export default function ContractorsPage() {
  return <IndustryPageTemplate data={data} />;
}
