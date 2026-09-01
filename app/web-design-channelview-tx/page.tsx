import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Channelview");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-channelview-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-channelview-tx",
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

const data: GeoPageData = {
  city: "Channelview",
  slug: "/web-design-channelview-tx",
  postalCode: "77530",
  headline: "Channelview searches first.",
  intro:
    "Websites and local search for Channelview businesses, from Sheldon Road and Market Street out to Woodforest and the Beltway. I'm up the road, and I answer my own phone.",
  prefill:
    "I run a business in Channelview and want more customers finding me online.",
  painPoints: [
    {
      heading: "Channelview gets treated like an afterthought of Houston",
      body: "Most web designers sell you a 'Houston' website and call it done. But nobody here searches 'Houston auto shop.' They search Channelview, or Sheldon, or just 'near me' while sitting on I-10. A page built for a metro of seven million does not win those searches.",
    },
    {
      heading: "The plants keep the area busy, but busy is not the same as found",
      body: "Steady industrial work and steady traffic along the ship channel means real demand. It also means workers and families who are new to the area, do not know anybody yet, and pick whoever comes up first on their phone.",
    },
    {
      heading: "You're losing searches to businesses in Baytown and East Houston",
      body: "Customers here will drive fifteen minutes without thinking about it. If a shop in Baytown ranks for the search and you don't, that's your customer in their parking lot.",
    },
  ],
  whatChanges: [
    {
      title: "You show up when Channelview searches for what you do",
      body: "I build your website and Google Business Profile around what people here actually type, your service plus 'Channelview,' plus 'near me,' so you land in the top results instead of page three.",
    },
    {
      title: "Your website turns a visit into a phone call",
      body: "Clear message, phone number that works with one tap, fast on mobile. Most local sites look fine and convert nobody. I fix the part that costs you money.",
    },
    {
      title: "AI assistants name your business",
      body: "When somebody asks ChatGPT or their phone for a recommendation in Channelview, those tools read websites to decide who to name. I structure yours so it's you.",
    },
    {
      title: "You deal with one person, start to finish",
      body: "I'm in Atascocita, twenty minutes up the road. I'll come to your shop, learn how the business actually works, and you'll always have my direct number. $500 a month, no agency retainer.",
    },
  ],
  faqItems: [
    {
      q: "Do people really search 'Channelview' instead of 'Houston'?",
      a: "Constantly, and that's the whole opportunity. Almost nobody builds pages targeting Channelview specifically, so the competition is a fraction of what it is for Houston. Same effort, far better odds of landing on the first screen.",
    },
    {
      q: "I've been here for years and everybody knows me. Why bother?",
      a: "Your regulars are not the problem. The problem is the family that moved in last month, the worker on a new contract, the person whose usual shop just closed. They have nobody to ask, so they search. Whoever shows up gets the call.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $500 a month. Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call. You'll know your exact number before anything starts.",
    },
    {
      q: "What kinds of businesses do you work with?",
      a: "Local service businesses across Channelview and Northeast Houston, auto and wrap shops, contractors and trades, salons and med spas, food trucks, cleaning services, event venues, and local retailers. If customers find you by searching, we're a fit.",
    },
    {
      q: "How does this start?",
      a: "I take a free look at where you stand, your site, your Google profile, and whoever currently outranks you in Channelview, then build a preview of what your business could look like online. Then you decide. Call (281) 203-4531 or send a message.",
    },
  ],
  heroImage: { src: "/hero/chanelview.avif", alt: "Channelview, Texas" },
};

export default function ChannelviewPage() {
  return <GeoPageTemplate data={data} />;
}
