import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";
import { HOUSTON } from "content/houston";

const { title: TITLE, description: DESCRIPTION } = metaFor("Houston", {
  title: "Web Design & Local SEO Across the Houston Area",
  description:
    "Web design and local SEO for Houston businesses, neighborhood by neighborhood. More first-time customers, more repeat customers. Free report, no commitment.",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.quesoventures.com${HOUSTON.slug}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://www.quesoventures.com${HOUSTON.slug}`,
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

/**
 * The metro hub. Every town page links up to this one.
 *
 * DRAFT PROSE — rewrite in your own voice. The structure is what matters here
 * and it is what the rest of the cluster hangs off; the words below are a
 * placeholder that says the right things rather than the final copy.
 *
 * Two rules this page has to keep, whoever writes it:
 *
 * 1. It must not read as a longer version of a town page. It is the answer to
 *    "web design houston", which is a harder, broader query than "web design
 *    kingwood tx", and a page that just says Houston in Kingwood's sentences
 *    competes with its own children and loses.
 * 2. Trades get named here, at metro level, and nowhere per town. That is the
 *    whole reason there is no auto-shops-in-Kingwood page.
 */
const data: GeoPageData = {
  city: "Houston",
  slug: HOUSTON.slug,
  headline: "Houston is a big place to be invisible in.",
  intro:
    "Web design and local SEO for Houston businesses, from the Loop out to the towns most agencies have never driven to. Seven million people, and the only ones who matter are the few thousand near enough to actually walk in.",
  prefill:
    "I run a business in the Houston area and want more customers finding me online.",
  painPoints: [
    {
      heading: "You are competing with the whole metro instead of your corner of it",
      body: "Ranking for 'web design Houston' means fighting agencies downtown with staff and budgets. Ranking for the four ZIP codes your customers actually live in is a different, much winnable fight. Most of the businesses beating you have not worked that out either.",
    },
    {
      heading: "Your customers search by neighborhood, not by city",
      body: "Nobody types 'Houston mechanic' when their car is making a noise in Kingwood. They type Kingwood, or they type 'near me' and let the phone decide. A single Houston page cannot answer both, which is why this one has towns under it.",
    },
    {
      heading: "The chains show up because their sites are built for machines",
      body: "The franchise three miles away is not better than you. Its website states plainly what it does, where, and for whom, in a structure Google and the AI assistants can read. Yours probably reads beautifully to a person and says almost nothing to a crawler.",
    },
  ],
  whatChanges: [
    {
      title: "You own your corner first, then widen",
      body: "I start with the towns and ZIP codes closest to you, where the competition is thin and the intent is highest, and expand outward from a position that already ranks. Chasing the metro term first is how people spend a year going nowhere.",
    },
    {
      title: "Your site answers the question people actually typed",
      body: "Service plus town, service plus 'near me', and the specific problems people describe in their own words. That is what gets tapped, and it is almost never what a brochure site is written around.",
    },
    {
      title: "AI assistants name you when someone asks",
      body: "When somebody asks their phone who to call in Houston, those tools read websites to pick an answer. I structure yours so it is legible to them, which is a different job from looking good and almost nobody local is doing it yet.",
    },
    {
      title: "You deal with the person who built it",
      body: "No account manager, no ticket queue. I am a software engineer in Northeast Houston, the site is code I wrote, and the tools built for your business over time are part of the plan rather than an upsell.",
    },
  ],
  faqItems: [
    {
      q: "Can you actually rank me for 'Houston' anything?",
      a: "Sometimes, and it is rarely the right first goal. Houston is seven million people and the metro terms are contested by agencies with real budgets. The money is in the searches happening two miles from your door, which almost nobody has bothered to compete for. We take those first, and the broader terms follow from a site that is already winning.",
    },
    {
      q: "Which Houston areas do you cover?",
      a: `I am headquartered in Northeast Houston and there are pages for the towns I work most: ${HOUSTON.neighborhoods.map((n) => n.name).join(", ")}. Anywhere else in the metro is the same work, and I will still come see the business in person.`,
    },
    {
      q: "Do you specialize in my trade?",
      a: "I build for local businesses whose customers find them by searching, which covers most trades. What changes between an auto shop and a med spa is the vocabulary people search with and what makes them call, not the method.",
    },
    {
      q: "What does it cost?",
      a: "$500 a month for the website, the search and AI visibility, and the tools I build for your business. No setup fee. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. We go through the details together before anything starts.",
    },
    {
      q: "How does this start?",
      a: "Send me your business name. I send back what someone searching for you right now actually finds, and what an AI assistant says when asked to recommend someone like you. If it looks worth fixing, I build a preview before we ever talk numbers.",
    },
  ],
  heroImage: { src: "/hero/houston.jpg", alt: "Downtown Houston skyline" },
};

export default function HoustonPage() {
  return <GeoPageTemplate data={data} />;
}
