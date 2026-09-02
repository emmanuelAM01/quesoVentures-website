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

const TITLE = "Contact Queso Ventures | Houston TX";
const DESCRIPTION =
  "Send your business name and I reply within 24 hours. Websites, SEO, and AI-SEO for Houston area businesses, built by a software engineer.";

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
        {/*
          The form is the page now, and the phone is a detail on it.

          It used to open with "You call, I answer." over a 48px phone number,
          with the form off to one side under the heading "Rather write it
          out?" — which made the form the fallback. That is backwards on every
          count: every unqualified call this number has produced has been spam,
          the form is what the entire site drives to, and a page that leads with
          a number is asking to be phoned by the wrong people.

          One column, centred, because that is how every other call to action on
          this site is built. The details sit underneath in one quiet row for
          the person who already decided and is just looking for the address.
        */}
        {/*
          Centred in what is left of the screen after the bar.

          The block is shorter than a viewport, so pinning it to the top left a
          field of cream under it and pushed the headline up under the sticky
          header. min-h is the viewport minus the bar's 76px, so the whole thing
          sits in the middle of the space it actually has, and py-24 keeps it
          clear of the bar on a short screen where the content wins.
        */}
        <section className="container mx-auto flex min-h-[calc(100svh-76px)] items-center px-4 py-24">
          <div className="mx-auto w-full max-w-xl">
            <div className="text-center">
              <h1 className="font-sans text-4xl sm:text-5xl tracking-tight text-balance text-lightText dark:text-darkText">
                Tell me about your business.
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-xl font-light text-lightTextMuted dark:text-darkTextMuted">
                I&apos;ll look at where you show up today and get back to you.
                Free either way.
              </p>
            </div>

            <Glow color={PAINT.rossoCorsa.hex} radius="rounded-3xl" lift={false} spread={480}>
            <div className="relative mt-12 rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark p-8 sm:p-10">
              <ContactForm />
            </div>
            </Glow>


            <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base">
              <div className="flex gap-2">
                <dt className="font-semibold text-lightText dark:text-darkText">
                  Email
                </dt>
                <dd>
                  <a
                    href={BUSINESS.emailHref}
                    className="inline-block py-1.5 font-light text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
                  >
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-lightText dark:text-darkText">
                  Phone
                </dt>
                <dd>
                  <CallLink
                    from="contact_page"
                    className="inline-block py-1.5 font-light text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
                  />
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
