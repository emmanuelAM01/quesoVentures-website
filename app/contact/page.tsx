import type { Metadata } from "next";
import Footer from "components/Footer";
import ContactForm from "components/ContactForm";
import Glow from "components/Glow";
import CallLink from "components/CallLink";
import { PAINT } from "components/livery";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";

const TITLE = "Contact Queso Ventures | Call (281) 203-4531";
const DESCRIPTION =
  "Send a message and I reply within 24 hours. Web design and local SEO for Houston area businesses, built by a software engineer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/contact",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "ContactPage",
      "@id": `${BUSINESS.url}/contact#contactpage`,
      url: `${BUSINESS.url}/contact`,
      name: "Contact Queso Ventures",
      mainEntity: { "@id": `${BUSINESS.url}/#localbusiness` },
    },
    breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
  ],
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Deliberately not a full-height hero. Everything worth knowing is
            one screen: how to reach me, when, and a box to type in. */}
        <section className="container mx-auto px-4 pt-36 pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight text-lightText dark:text-darkText">
                You call, I answer.
              </h1>
              <p className="mt-6 text-xl sm:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted">
                No account managers, no ticket queue, no phone tree.
              </p>

              <CallLink
                from="contact_page"
                className="mt-10 block text-4xl sm:text-5xl font-semibold tracking-tight text-lightText dark:text-darkText hover:text-lightButton dark:hover:text-darkButton transition-colors whitespace-nowrap"
              />

              <dl className="mt-10 space-y-5 text-lg">
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-lightText dark:text-darkText">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={BUSINESS.emailHref}
                      className="font-light text-lightTextMuted dark:text-darkTextMuted hover:text-lightText dark:hover:text-darkText transition-colors"
                    >
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-lightText dark:text-darkText">
                    Hours
                  </dt>
                  <dd className="font-light text-lightTextMuted dark:text-darkTextMuted">
                    Monday to Saturday, 8am to 7pm
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-lightText dark:text-darkText">
                    Based
                  </dt>
                  <dd className="font-light text-lightTextMuted dark:text-darkTextMuted">
                    {BUSINESS.addressLine}, working nationwide
                  </dd>
                </div>
              </dl>
            </div>

            <Glow color={PAINT.rossoCorsa.hex} radius="rounded-3xl" lift={false} spread={480}>
            <div className="relative rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl text-lightText dark:text-darkText mb-3">
                Rather write it out?
              </h2>
              <p className="text-lg font-light text-lightTextMuted dark:text-darkTextMuted mb-8">
                Tell me what you&apos;re working with and I&apos;ll take a free
                look at where you stand.
              </p>
              <ContactForm />
            </div>
            </Glow>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
