import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";
import { HOUSTON } from "content/houston";

const { title: TITLE, description: DESCRIPTION } = metaFor("Houston", {
  title: "Websites, SEO & AI-SEO Across the Houston Area",
  description:
    "Websites, SEO, and AI-SEO for Houston businesses, neighborhood by neighborhood. More first-time customers, more repeat customers. Free report.",
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
    "Seven million people. The only ones who matter live close enough to walk in.",
  prefill:
    "I run a business in the Houston area and want more customers finding me online.",
  painPoints: [
    {
      heading: "You are competing with the whole metro instead of your corner",
      body: "Downtown agencies own the word Houston. The four ZIP codes your customers live in are wide open."
    },
    {
      heading: "People search by neighborhood, not by city",
      body: "Nobody types Houston mechanic when the noise starts in Kingwood. They type Kingwood."
    },
    {
      heading: "The chains come up because their sites are written to be read",
      body: "The franchise down the road is not better than you. Its website just says what it does, where, and for whom."
    }
  ],
  whatChanges: [
    {
      title: "You own your corner first",
      body: "Start where the competition is thin and the intent is highest, then widen from a spot that already ranks."
    },
    {
      title: "Your site answers what people actually typed",
      body: "Service plus town, service plus near me, and the problems people describe in their own words."
    },
    {
      title: "AI assistants name you",
      body: "When someone asks their phone who to call in Houston, it reads websites to pick. Yours gets written so it is you."
    },
    {
      title: "You deal with the person who built it",
      body: "No account manager, no ticket queue. The site is code I wrote, and the tools come with it."
    }
  ],
  faqItems: [
    {
      q: "Can you actually rank me for Houston anything?",
      a: "Rarely for the whole city, and you would not want it. The searches that turn into customers have a neighborhood in them."
    },
    {
      q: "Which Houston areas do you cover?",
      a: "There are pages for the towns I work most. Anywhere else in the metro is the same work."
    },
    {
      q: "Do you specialize in my trade?",
      a: "I build for local businesses whose customers find them by searching. The trade changes the words on the page, not the work."
    },
    {
      q: "What does it cost?",
      a: "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee."
    },
    {
      q: "How does this start?",
      a: "Send your business name through the form. I look at where you show up today and get in touch with what I found. Free either way."
    }
  ],
  heroImage: { src: "/hero/houston.jpg", alt: "Downtown Houston skyline" },
};

export default function HoustonPage() {
  return <GeoPageTemplate data={data} />;
}
