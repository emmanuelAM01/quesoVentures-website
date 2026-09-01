import type { Metadata } from "next";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import Reveal from "components/Reveal";
import PageHero from "components/PageHero";
import IndustryLinks from "components/IndustryLinks";
import FaqDeck from "components/FaqDeck";
import { SITE_COPY } from "components/siteCopy";
import { MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import { liveryAt, PAINT } from "components/livery";
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
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

const SERVICES_TITLE = "Web Design, Local SEO & Google Business Profile Services";
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
    title: "What is the difference between web design and local SEO?",
    content:
      "Web design is what people see once they arrive. Local SEO is what gets them there. A beautiful site nobody finds and a well ranked site nobody calls fail the same way, which is why both are in one plan rather than sold separately.",
  },
  {
    title: "Do you build the website yourself, or use a template?",
    content:
      "I build it. I have spent seven years writing software for startups, fintech, and AI products, and your site is code I wrote rather than a theme with your logo dropped in. That is also why custom tools for your business are part of the plan instead of an upsell.",
  },
  {
    title: "What is AI SEO, and is it different from normal SEO?",
    content:
      "It overlaps but it is not the same. Google ranks pages; an AI assistant reads your site and decides whether to name you in an answer. That means stating plainly who you are, what you offer, where you work, and who you serve, in a structure a machine can extract. Most sites are written only for people, so they get skipped.",
  },
  {
    title: "Do you manage my Google Business Profile too?",
    content:
      "Yes, and for a local business it often matters more than the website. Most people pick from the first three results on Maps and never scroll. Categories, service areas, hours, photos, and review responses all feed that ranking, and all of it is included.",
  },
  {
    title: "Do I have to be in Houston to work with you?",
    content:
      "No. I am headquartered in Northeast Houston and I will come to your business in person if you are nearby, which is genuinely useful. Outside the area the method is identical, there are just more calls and fewer drive-bys. I have clients from Conroe and Fort Worth out to Miami.",
  },
  {
    title: "How do I know if my current website is the problem?",
    content:
      "Send me your business name and I will tell you. The free report covers where you show up today, whether an AI assistant names you when asked to recommend someone like you, and what is most likely costing you calls. It is yours whether we work together or not.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "Service",
      "@id": `${BUSINESS.url}/services#service`,
      name: "Web Design & Local SEO, Northeast Houston TX",
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

const services = [
  {
    icon: FaMobileAlt,
    heading: "You need a website",
    body: "We build it around what your customers are already searching for. Fast on mobile, easy to find, and clear enough that visitors actually call.",
  },
  {
    icon: FaChartLine,
    heading: "You need to show up on Google",
    body: "When someone searches for your service in Houston, your name should be there. We build the pages and content that earn those rankings.",
  },
  {
    icon: FaMapMarkerAlt,
    heading: "You need to own your Google Maps listing",
    body: "Most customers pick from the first three businesses that show up on Maps. We get you into that group and keep you there.",
  },
  {
    icon: FaGlobe,
    heading: "You need customers to find you on AI search too",
    body: "When someone asks Siri or ChatGPT who to call, we make sure your business is the answer they get.",
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
          sub="What I actually do, and what it costs."
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
          </div>
        </section>

        {/* Pricing callout */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <Glow color={PAINT.rossoCorsa.hex} radius="rounded-3xl" lift={false} spread={420}>
              <div className="relative rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG p-8 sm:p-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-lightText dark:text-darkText mb-5">
                  How pricing works
                </h2>
                <p className="max-w-3xl text-xl leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light">
                  {SITE_COPY.pricing.sub} {SITE_COPY.pricing.terms}
                </p>
              </div>
              </Glow>
            </Reveal>
          </div>
        </section>

        <FaqDeck items={faqItems} heading="Questions about the work" />
        <IndustryLinks />
        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
