import type { Metadata } from "next";
import IndustryPageTemplate, { IndustryPageData } from "components/IndustryPageTemplate";

const TITLE = "SEO & Web Design for Med Spas, Clinics & Dentists | Houston TX";
const DESCRIPTION = "Fill the appointment book from search. Websites and local search for Houston-area med spas, clinics, and dental practices. $300 a month. Call (281) 203-4531.";

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
  "intro": "Websites and local search for med spas, medical clinics, and dental practices across Northeast Houston. Your regulars keep coming back. The problem is the person who has never heard of you and is booking something this week.",
  "prefill": "I run a med spa, clinic, or dental practice and want more bookings from people searching online. Here's my current situation:",
  "serviceName": "Web Design & Local SEO for Med Spas, Clinics and Dental Practices",
  "painPoints": [
    {
      "heading": "New patients search, they don't ask around",
      "body": "Somebody deciding to finally get Botox, a cleaning, or a consult does not poll their friends. They search, they read a few reviews, and they book whoever looks credible and is close. That decision takes minutes."
    },
    {
      "heading": "Every treatment is its own search, and you rank for none of them",
      "body": "Botox, fillers, laser, microneedling, implants, whitening, Invisalign, weight management. Each one is a different search with different intent. A single page listing everything competes for nothing in particular."
    },
    {
      "heading": "Trust has to be visible before anyone books",
      "body": "This is a category where people are handing you their face or their teeth. Credentials, before-and-afters, real staff photos, and current reviews are not decoration, they are the entire decision."
    }
  ],
  "whatChanges": [
    {
      "title": "Each treatment gets its own way to be found",
      "body": "One page per service, written around how patients actually search rather than how the industry names things. More searches covered means more of the book filled."
    },
    {
      "title": "Booking becomes the obvious next step",
      "body": "Tappable phone number, clear pricing signals, and an online booking path that works on a phone. Most practice sites make people work to hand over money."
    },
    {
      "title": "Your credibility shows up before the visit",
      "body": "Credentials, results, and reviews arranged where a nervous first-time patient actually looks. That is what turns a page view into a booked appointment in this category."
    },
    {
      "title": "AI assistants recommend your practice",
      "body": "When somebody asks for a good med spa or dentist nearby, those tools read websites to decide who to name. I structure yours so you are the recommendation."
    }
  ],
  "faqItems": [
    {
      "q": "We're booked out already. Why would we need this?",
      "a": "Being booked is exactly when to build it, because you can be selective about which services fill up. Practices that wait until a slow quarter are starting from zero at the worst possible moment."
    },
    {
      "q": "Is medical or dental content different to handle?",
      "a": "Yes. Search engines hold health content to a higher standard, which means credentials, accurate service descriptions, and a clean technical setup matter more here than in most industries. It also means most competitors get it wrong."
    },
    {
      "q": "Can you work with our existing booking system?",
      "a": "Almost always. The goal is to remove steps between finding you and booking, not to replace software your front desk already knows."
    },
    {
      "q": "What does it cost?",
      "a": "Simple monthly plans at $300 a month. A fraction of the $1,500 or more agencies charge, and you will know your exact number before anything starts."
    },
    {
      "q": "How does this start?",
      "a": "I take a free look at your site, your Google profile, and whoever currently outranks you, then build a preview of what your practice could look like online. Then you decide. Call (281) 203-4531."
    }
  ]
};

export default function MedSpasPage() {
  return <IndustryPageTemplate data={data} />;
}
