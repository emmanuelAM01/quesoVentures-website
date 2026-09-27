import type { Metadata } from "next";
import Footer from "components/Footer";
import ContactForm from "components/ContactForm";
import LavaLamp from "components/LavaLamp";
import Reveal from "components/Reveal";
import { houseGradient } from "components/livery";
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
        {/*
          As a full screen spread: the ask on the left, over the blob field,
          set the way every hero on the site is set (title, the house rule,
          the line under it, bottom left); the form on the right, on white,
          with nothing around it. On a phone the ask comes first and the form
          follows.
        */}
        <section className="-mt-[76px] grid lg:min-h-[100svh] lg:grid-cols-2">
          <div
            data-dark-section
            className="relative flex min-h-[70svh] items-end overflow-hidden lg:min-h-0"
          >
            <LavaLamp scrim={0.5} />
            <div className="relative w-full px-6 pb-14 pt-40 sm:px-12 lg:px-16 lg:pb-20 xl:px-24">
              <Reveal>
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.02] tracking-tight text-balance text-white">
                  Tell me about your business.
                </h1>
                <span
                  aria-hidden
                  className="mt-8 block h-1 w-24 rounded-full"
                  style={{ backgroundImage: houseGradient() }}
                />
                <p className="mt-8 max-w-md text-xl sm:text-2xl font-light leading-relaxed text-white/85">
                  I&apos;ll look at where you show up today and get back to you.
                  Free either way.
                </p>
                <p className="mt-10 text-base font-light text-white/60">
                  Or write to{" "}
                  <a
                    href={BUSINESS.emailHref}
                    className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {BUSINESS.email}
                  </a>
                </p>
              </Reveal>
            </div>
          </div>

          <div className="flex items-center bg-panelLight px-6 py-16 dark:bg-panelDark sm:px-12 lg:px-16 lg:pt-32 xl:px-24">
            <Reveal delay={150} className="mx-auto w-full max-w-lg">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
