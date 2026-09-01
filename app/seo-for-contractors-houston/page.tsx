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
  "intro": "Websites and local search for construction, roofing, and flooring companies across Northeast Houston, residential and commercial. A second pipeline that keeps producing when the referrals go quiet.",
  "prefill": "I run a construction, roofing, or flooring company and want my website to actually get me calls.",
  "serviceName": "Web Design & Local SEO for Construction, Roofing and Flooring Companies",
  "painPoints": [
    {
      "heading": "Some months are packed, some are dead, and you can't predict which",
      "body": "Referrals arrive when they arrive. There is no dial to turn when the schedule opens up in three weeks and nothing is booked. Search is that dial, and it keeps working in the slow months."
    },
    {
      "heading": "Homeowners call the first credible result and stop",
      "body": "After a storm or a burst pipe, nobody collects five bids. They search, they call whoever looks real, and they hire. If you are not on that first screen you never got the chance to quote."
    },
    {
      "heading": "Commercial buyers vet you online before they ever call",
      "body": "A property manager awarding a flooring or re-roof contract will look you up first. If there is nothing to find, or what they find looks like a 2009 template, you are out before the conversation starts."
    }
  ],
  "whatChanges": [
    {
      "title": "You show up for the work you actually want",
      "body": "Roof replacement, storm damage, commercial re-roof, hardwood, tile, LVP, epoxy, remodels, additions. Each is a separate search with separate intent. Covering them individually is what multiplies the calls."
    },
    {
      "title": "Your website makes people call instead of comparing",
      "body": "Clear proof of work, service areas, licensing, and a tappable number at the top. Most contractor sites are hard to use on a phone, which is where nearly every one of these searches happens."
    },
    {
      "title": "Commercial and residential get separate paths",
      "body": "A homeowner and a property manager want completely different things. I build both so neither one has to dig through the other's content to find what they came for."
    },
    {
      "title": "You get a pipeline that isn't hostage to word of mouth",
      "body": "Referrals stay your best leads. Search becomes the floor underneath them, so a slow month for referrals is not a slow month for revenue."
    }
  ],
  "faqItems": [
    {
      "q": "I get plenty of work from referrals. Why bother with this?",
      "a": "Referrals are the best leads you will ever get, and they are completely outside your control. Search is the part you can control. Most contractors add it precisely so a quiet quarter stops being a crisis."
    },
    {
      "q": "I already have a Google listing. Why am I still not showing up?",
      "a": "A listing alone does very little. Categories, service descriptions, photos, reviews, and a website that reinforces all of it are what decide whether Google puts you in the top three. Those pieces have to work together."
    },
    {
      "q": "Do you handle commercial as well as residential?",
      "a": "Yes, and they need different pages. The searches, the proof, and the decision process are not the same. Building both is usually where the biggest untapped work is."
    },
    {
      "q": "What does it cost?",
      "a": "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You will know your exact number before anything starts."
    },
    {
      "q": "How does this start?",
      "a": "Send your company name through the form. I look at what a homeowner searching for your trade actually finds right now, and what an AI assistant says when asked to recommend someone, then I get in touch with what I found. We go from there. Nothing to pay to have that conversation."
    }
  ],
  heroImage: { src: "/hero/contractorsHero.jpg", alt: "A contractor on site" },
};

export default function ContractorsPage() {
  return <IndustryPageTemplate data={data} />;
}
