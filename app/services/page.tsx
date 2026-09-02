import type { Metadata } from "next";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import Reveal from "components/Reveal";
import PageHero from "components/PageHero";
import IndustryLinks from "components/IndustryLinks";
import FaqDeck from "components/FaqDeck";
import { MONTHLY_PLAN_OFFER, PRICING } from "components/pricingCopy";
import { liveryAt } from "components/livery";
import Glow from "components/Glow";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaWrench,
  FaMobileAlt,
} from "react-icons/fa";

const SERVICES_TITLE = "Websites, SEO, AI-SEO & Google Business Profile";
const SERVICES_DESCRIPTION =
  "What I actually do: build the website, run your Google and Maps presence, and get you named by AI assistants. More customers, and more of them coming back.";

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description:
    SERVICES_DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/services" },
  openGraph: {
    title: SERVICES_TITLE,
    description:
      SERVICES_DESCRIPTION,
    url: "https://www.quesoventures.com/services",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_TITLE,
    description:
      SERVICES_DESCRIPTION,
    images: ["/logo.png"],
  },
};

/**
 * The FAQ that /services never had.
 *
 * This page has been "Discovered - currently not indexed" since launch and has
 * never been crawled: Google found the URL, judged it not worth the fetch, and
 * moved on. Thin content is the usual cause. Question and answer pairs are also
 * the format AI assistants extract cleanest, which is the whole point of a page
 * that explains the service rather than a place.
 *
 * Written around what people actually search: "web development", "website
 * designer", "local seo", "seo services" all rank here already and take no
 * clicks.
 */
const faqItems = [
  {
    title: "What is the difference between a website, SEO, and AI-SEO?",
    content:
      "The website is what people see when they arrive. SEO is what gets them there from Google. AI-SEO is what gets you named when someone asks ChatGPT or Siri instead. You need all three, so all three are in one plan.",
  },
  {
    title: "Do you build the website yourself, or use a template?",
    content:
      "I build it. Seven years writing software, not a theme with your logo dropped on it. That is also why custom tools come with the plan instead of as an upsell.",
  },
  {
    title: "What is AI SEO, and is it different from normal SEO?",
    content:
      "Google ranks pages. ChatGPT and Siri read your site and decide whether to name you in an answer. Getting named takes a structure a machine can read, and most sites do not have one.",
  },
  {
    title: "Do you handle my Google Maps listing too?",
    content:
      "Yes, and it often matters more than the website. Most people pick from the first three on Maps and never scroll.",
  },
  {
    title: "What tools do I get?",
    content:
      "Loyalty rewards, an AI front desk that answers after hours, booking, invoicing, and a read on your own numbers. Added as your business needs them.",
  },
  {
    title: "How do I know if my website is the problem?",
    content:
      "Send me your business name. The free report shows where you turn up today and what is most likely costing you calls.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "Service",
      "@id": `${BUSINESS.url}/services#service`,
      name: "Websites, SEO & AI-SEO, Northeast Houston TX",
      provider: { "@id": `${BUSINESS.url}/#localbusiness` },
      serviceType: [
        "Web Design",
        "Local SEO",
        "Google Business Profile Optimization",
        "Lead Generation",
      ],
      areaServed: AREA_SERVED_SCHEMA,
      description:
        "Website design, local SEO, and Google Business Profile work for service businesses in Atascocita, Humble, Kingwood, and the rest of Northeast Houston.",
      offers: [
        MONTHLY_PLAN_OFFER,
        {
          "@type": "Offer",
          name: "Free Visibility Audit",
          price: "0",
          priceCurrency: "USD",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${BUSINESS.url}/services#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: { "@type": "Answer", text: item.content },
      })),
    },
    breadcrumbSchema([{ name: "Services", path: "/services" }]),
  ],
};

/*
  Four cards, four different needs.

  It was website, Google, Maps, AI — which is one need said four ways. A reader
  three cards in has learned nothing new since the first, and the page reads
  like padding. Google and Maps are the same behaviour and the same visit, so
  they are one card now, and the slot they freed goes to the thing this page
  was missing entirely: the tools.

  Kept as "you need", dropped the "we". Every other word on this site is written
  by one person, and "we build it" turns that into a nameless agency of the
  exact kind these headings are meant to beat. The search terms stay where they
  were — web design, local SEO, Google Business Profile, Google Maps, AI-SEO.
  What changed is who is speaking, and how many times.
*/
const services = [
  {
    icon: FaMobileAlt,
    heading: "You need a website",
    body: "I build it around what your customers are already searching for. Fast on a phone, and clear enough that visitors actually call.",
  },
  {
    icon: FaMapMarkerAlt,
    heading: "You need to come up on Google",
    body: "SEO for the search results, and your Google listing for the map. Most people pick from the first three on Maps and never scroll.",
  },
  {
    icon: FaGlobe,
    heading: "You need to be found on AI search too",
    body: "When someone asks ChatGPT or Siri who to call, AI-SEO is what makes your business the answer they get.",
  },
  {
    icon: FaWrench,
    heading: "Grab some tools to help you grow",
    body: "Rewards, an AI front desk, booking, invoicing, a read on your own numbers. Software built for your business, not rented from somebody else.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <PageHero
          headline="From invisible to obvious."
          prefill="I want to see what my website could look like."
          image={{
            src: "/hero/servicesMain.JPEG",
            alt: "Binoculars looking out across the ground at Verdun",
          }}
        />

        {/* Services */}
        <section className="bg-panelLight dark:bg-panelDark border-y border-lightBorder dark:border-darkBorder">
          <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 120}>
                  <Glow color={liveryAt(i).hex} radius="rounded-3xl" lift={false}>
                  <div className="relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG p-8 pt-10">
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: liveryAt(i).hex }}
                    />
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                      style={{
                        backgroundColor: `${liveryAt(i).hex}1A`,
                        color: liveryAt(i).ink,
                      }}
                    >
                      <Icon size={22} />
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-lightText dark:text-darkText leading-snug mb-3">
                      {svc.heading}
                    </h2>
                    <p className="text-lg leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light">
                      {svc.body}
                    </p>
                  </div>
                  </Glow>
                </Reveal>
              );
            })}
          </div>

          {/*
            The price, once, quietly, under the four things it buys.

            This page lost its only visible figure when the tools block came
            out, which left the schema saying $500 and the page itself saying
            nothing — fine for a machine, useless for the person reading it.

            "Yours for" and not "all of this for": the plan is to sell tools
            separately later, the way AWS sells services, so nothing here
            promises the four cards are the whole of what exists.
          */}
          <p className="mx-auto mt-10 max-w-6xl text-center text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
            Yours for{" "}
            <span className="font-semibold text-lightText dark:text-darkText">
              {PRICING.monthlyLabel} a month
            </span>
          </p>
          </div>
        </section>

        <FaqDeck items={faqItems} heading="Common Questions" />
        <IndustryLinks />
        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
