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
  "headline": "Be the shop they call.",
  "intro": "Websites and local search for auto shops and mobile mechanics across Northeast Houston. When somebody's check engine light comes on, they search once and call the first shop that looks trustworthy. That should be you.",
  "prefill": "I run an auto shop or mobile mechanic business and want more customers finding me online.",
  "serviceName": "Web Design & Local SEO for Auto Shops and Mobile Mechanics",
  "painPoints": [
    {
      "heading": "A breakdown is an emergency, and emergencies don't scroll",
      "body": "Somebody stranded on the shoulder searches 'mechanic near me' and calls one of the first three results. There is no second look, no comparison shopping, no coming back later. If you are not in that group you never existed."
    },
    {
      "heading": "The dealership and the chains outrank you on everything",
      "body": "They have marketing budgets and hundreds of reviews. What they do not have is a local owner who answers the phone. Local searches are exactly where an independent shop can beat them, but only if the profile and the site are set up for it."
    },
    {
      "heading": "Mobile mechanics are invisible without an address",
      "body": "No storefront means Google has nothing obvious to anchor you to, so most mobile mechanics never rank at all. A properly configured service-area profile fixes that, and almost nobody in this market has done it."
    }
  ],
  "whatChanges": [
    {
      "title": "You show up for the searches that end in a phone call",
      "body": "Brake repair, check engine, AC, transmission, pre-purchase inspection, and every 'near me' variation. I structure your site and Google profile around what drivers actually type when something is wrong."
    },
    {
      "title": "Mobile service gets its own visibility",
      "body": "If you come to the customer, your profile needs to say so in the way Google understands. I set up the service area properly so you appear for the neighborhoods you actually cover."
    },
    {
      "title": "Your phone number works with one tap",
      "body": "Most shop websites bury the number in a footer. Yours goes at the top, tappable, on a page that loads fast on a phone with one bar of signal in a parking lot."
    },
    {
      "title": "AI assistants send drivers your way",
      "body": "When someone asks their phone for a good mechanic nearby, those tools read websites to decide who to name. I structure yours so you are the recommendation."
    }
  ],
  "faqItems": [
    {
      "q": "I'm a mobile mechanic with no shop address. Can I still rank?",
      "a": "Yes, and you have an advantage because so few mobile mechanics set this up correctly. Google supports service-area businesses that hide their address and show a coverage radius instead. Configured right, you appear across every neighborhood you serve."
    },
    {
      "q": "I already have a Google listing and I'm still not showing up. Why?",
      "a": "Having a listing and having an optimized listing are different things. Categories, services, photos, reviews, and a website that backs it all up are what decide whether Google puts you in the top three. I fix all of it together."
    },
    {
      "q": "Most of my work is repeat customers and referrals. Is this worth it?",
      "a": "Repeat customers are the foundation, but they move, their cars age out, and they retire. Search is how you replace them without waiting for somebody to mention you at a barbecue."
    },
    {
      "q": "What does it cost?",
      "a": "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You will know your exact number before anything starts."
    },
    {
      "q": "How does this start?",
      "a": "Send your shop's name through the form. I look at what someone searching for a mechanic near you actually finds right now, and what an AI assistant says when asked to recommend one, then I get in touch with what I found. We go from there. Nothing to pay to have that conversation."
    }
  ],
  heroImage: { src: "/hero/mechanic.jpg", alt: "A mechanic at work in the shop" },
};

export default function AutoShopsPage() {
  return <IndustryPageTemplate data={data} />;
}
