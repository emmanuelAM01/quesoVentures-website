import type { Metadata } from "next";
import { metaForIndustry } from "components/siteCopy";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaForIndustry("med spas and clinics", "Med Spa");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/seo-for-med-spas-houston" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/seo-for-med-spas-houston",
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
  "industry": "Med Spas, Clinics & Dentists",
  "slug": "/seo-for-med-spas-houston",
  "headline": "Empty slots are a search problem.",
  "intro": "Websites, SEO, and AI-SEO for med spas, medical clinics, and dental practices across Northeast Houston. Your regulars keep coming back. The problem is the person who has never heard of you and is booking something this week.",
  "prefill": "I run a med spa, clinic, or dental practice and want more bookings from people searching online.",
  "serviceName": "Websites, SEO & AI-SEO for Med Spas, Clinics and Dental Practices",
  "painPoints": [
    {
      "heading": "New patients search. They do not ask around",
      "body": "Discretion is part of it. They look it up privately, then book."
    },
    {
      "heading": "Every treatment is its own search",
      "body": "Botox, fillers, laser, implants. You are competing for each one separately."
    },
    {
      "heading": "Trust has to show before anyone books",
      "body": "Nobody puts a needle near their face on a hunch."
    }
  ],
  "whatChanges": [
    {
      "title": "Each treatment gets found",
      "body": "Its own page, its own search, instead of one page trying to be everything."
    },
    {
      "title": "Booking is the obvious next step",
      "body": "Straight into whatever system you already use."
    },
    {
      "title": "Credibility shows up before the visit",
      "body": "Credentials, results, and reviews where a nervous first-timer will actually see them."
    },
    {
      "title": "AI assistants name your practice",
      "body": "When someone asks their phone for a good med spa nearby, it is you."
    }
  ],
  "faqItems": [
    {
      "q": "We're booked out already. Why would we need this?",
      "a": "Booked out today is not booked out in March. Search is what keeps next quarter full without discounting."
    },
    {
      "q": "Is medical or dental content different to handle?",
      "a": "Yes. Claims have to stay careful and Google is stricter about health pages. I write to that line, not over it."
    },
    {
      "q": "Can you work with our existing booking system?",
      "a": "Yes. The site sends people into whatever you already use rather than replacing it."
    },
    {
      "q": "What does it cost?",
      "a": "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      "q": "How does this start?",
      "a": "Send your practice name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/clinics.jpg", alt: "A clinic treatment room" },
};

export default function MedSpasPage() {
  return <IndustryPageTemplate data={data} />;
}
