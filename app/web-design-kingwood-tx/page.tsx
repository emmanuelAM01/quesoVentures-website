import type { Metadata } from "next";
import GeoPageTemplate, { GeoPageData } from "components/GeoPageTemplate";

export const metadata: Metadata = {
  title: "Web Design & Local SEO in Kingwood, TX | Queso Ventures",
  description:
    "Websites and local search for Kingwood businesses — Town Center, Kings Harbor, and across the Livable Forest. Simple $300/month plans. Free audit first.",
  alternates: { canonical: "https://www.quesoventures.com/web-design-kingwood-tx" },
  openGraph: {
    title: "Web Design & Local SEO in Kingwood, TX | Queso Ventures",
    description:
      "Websites and local search for Kingwood businesses — Town Center, Kings Harbor, and across the Livable Forest. Simple $300/month plans. Free audit first.",
    url: "https://www.quesoventures.com/web-design-kingwood-tx",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Local SEO in Kingwood, TX | Queso Ventures",
    description:
      "Websites and local search for Kingwood businesses — Town Center, Kings Harbor, and across the Livable Forest. Simple $300/month plans. Free audit first.",
    images: ["/logo.png"],
  },
};

const data: GeoPageData = {
  city: "Kingwood",
  slug: "/web-design-kingwood-tx",
  headline: "Kingwood Trusts Its Own. Make Sure They Can Find You.",
  subline:
    "Websites and local search for businesses in the Livable Forest — from Town Center to Kings Harbor. Local service, simple monthly pricing, no agency games.",
  prefill:
    "I run a business in Kingwood and want more customers finding me online. Here's my current situation:",
  painPoints: [
    {
      heading: "Kingwood loyalty is real — but you have to get discovered first",
      body: "Once a Kingwood family finds a business they like, they stick with it for years and tell their neighbors. The hard part is that first discovery. Today, that moment happens on Google — and if you're not there, the loyalty goes to someone else.",
    },
    {
      heading: "New families arrive every month with zero connections",
      body: "People move to Kingwood for the schools and the trees, and they arrive knowing nobody. Their first mechanic, salon, contractor, or med spa is whoever shows up first when they search. That's a customer for a decade, decided in one search.",
    },
    {
      heading: "Your website looks fine but does nothing",
      body: "A lot of Kingwood businesses have a website that's essentially a business card. It doesn't rank, doesn't load fast on a phone, and doesn't push anyone to call. It exists — it just doesn't work.",
    },
  ],
  whatChanges: [
    {
      title: "You show up when Kingwood searches for what you do",
      body: "I tune your website and Google Business Profile to the searches people here actually type — your service plus 'Kingwood,' plus 'near me' — so you appear in the map results people pick from.",
    },
    {
      title: "Your website earns the call",
      body: "Kingwood customers do their homework. I make sure that when they land on your site, they see a credible, fast, clear presence that answers their questions and makes contacting you effortless.",
    },
    {
      title: "AI tools recommend you when neighbors ask",
      body: "More people every month ask ChatGPT or Siri who to hire instead of scrolling results. Those tools read your website to decide. I structure yours so your business is the recommendation.",
    },
    {
      title: "You deal directly with me, for a simple monthly price",
      body: "No account managers, no hourly billing, no thousand-dollar retainers. I'm local, I'll come see your business in person, and plans are a simple $300 a month.",
    },
  ],
  faqItems: [
    {
      q: "My business runs on referrals from Kingwood neighbors. Why change?",
      a: "Don't change it — add to it. Referrals reach people who already know your customers. Search reaches the new families arriving every month and everyone whose usual provider just retired, moved, or dropped the ball. It's a second pipeline, not a replacement.",
    },
    {
      q: "I'm in a shopping center off Kingwood Drive. Doesn't visibility handle itself?",
      a: "Drive-by visibility helps people who already pass you. But when someone at home searches for your service, Google decides who they see — and that's a completely separate contest. Plenty of tucked-away businesses outrank storefronts because their online presence is stronger.",
    },
    {
      q: "What does it cost?",
      a: "Simple monthly plans at $300 a month. That's a fraction of what agencies charge, and most of them aren't even touching AI search. You'll know your exact number before we start.",
    },
    {
      q: "What kinds of businesses do you work with?",
      a: "Local service businesses across Kingwood and Northeast Houston — contractors, auto shops, salons and med spas, event venues, food trucks, cleaning services, and more. If your customers search online for what you do, we're likely a fit.",
    },
    {
      q: "How does this start?",
      a: "I take a free look at your website, your Google profile, and who's outranking you in Kingwood — then I build a preview of what your business could look like online before we talk numbers. You see it first, then decide.",
    },
  ],
};

export default function KingwoodPage() {
  return <GeoPageTemplate data={data} />;
}
