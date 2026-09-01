import type { Metadata } from "next";
import { metaFor } from "components/siteCopy";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

const { title: TITLE, description: DESCRIPTION } = metaFor("Humble");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/web-design-humble-tx" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/web-design-humble-tx",
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
  city: "Humble",
  slug: "/web-design-humble-tx",
  postalCode: "77338",
  headline: "Humble is searching right now.",
  intro:
    "Websites and local search for businesses in Humble, from the FM 1960 corridor and Deerbrook out to Fall Creek. I'm local, I'll come to your shop, and I answer my own phone.",
  prefill:
    "I run a business in Humble and want more customers finding me online.",
  painPoints: [
    {
      heading: "You're on FM 1960 but invisible on Google Maps",
      body: "Thousands of people drive past your shop every day, but when they search for what you do, Google shows them three competitors, and you're not one of them. Foot traffic doesn't matter if search traffic goes elsewhere.",
    },
    {
      heading: "The chains near Deerbrook soak up all the searches",
      body: "Big brands have marketing teams. You have a business to run. But local searches like 'near me' and 'in Humble' are ones an independent shop can absolutely win, if your website and Google profile are set up right.",
    },
    {
      heading: "Your regulars love you, but new faces can't find you",
      body: "Humble is growing fast, Fall Creek, Summerwood, new families every month. Those newcomers don't know anybody yet. They pick whoever shows up first when they search. That should be you.",
    },
  ],
  whatChanges: [
    {
      title: "You show up when people in Humble search for what you do",
      body: "I structure your website and Google Business Profile around the exact searches people in Humble type, your service, your area, 'near me', so you appear before the shop down the road does.",
    },
    {
      title: "Your website turns visits into calls",
      body: "Most local sites look fine but don't make anyone act. I fix the layout and messaging so a visitor on their phone knows in five seconds who you are, what you do, and how to reach you.",
    },
    {
      title: "You get recommended by AI, not just Google",
      body: "When someone asks ChatGPT or Siri for the best shop in Humble, those tools read your website to decide if you're worth recommending. I set your site up so you're the answer they give.",
    },
    {
      title: "You get a neighbor, not an agency",
      body: "I'm based right here in the Houston area. I'll visit your location, learn how your business actually works, and you'll always talk to me directly, never an account manager.",
    },
  ],
  faqItems: [
    {
      q: "I have a Google listing already. Why am I still not showing up?",
      a: "Having a listing and having an optimized listing are very different. Categories, photos, reviews, service descriptions, and a website that backs it all up are what decide whether Google puts you in the top three map results for Humble searches. I fix all of it together.",
    },
    {
      q: "My customers mostly come from word of mouth. Is this worth it?",
      a: "Word of mouth is great, but Humble is adding new residents every month who don't know anyone to ask. They search. Showing up online is how you turn a growing town into growing revenue instead of watching new business go to whoever ranks first.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $500 a month. That's a fraction of the $1,500+ traditional agencies charge, and most of them aren't even touching AI search. You'll know your exact number before we start.",
    },
    {
      q: "Do you only work with certain types of businesses?",
      a: "I work with local service businesses of all kinds in the Humble area, auto shops, contractors, salons, food trucks, med spas, event venues, cleaning services. If your customers find you by searching online, we're likely a fit.",
    },
    {
      q: "How does this start?",
      a: "Send your business name through the form. I look at what someone searching in Humble right now actually finds, and who is outranking you, then I get in touch with what I found. We go from there. Nothing to pay to have that conversation.",
    },
  ],
  heroImage: { src: "/hero/humble.JPG", alt: "Humble, Texas" },
};

export default function HumblePage() {
  return <GeoPageTemplate data={data} />;
}
