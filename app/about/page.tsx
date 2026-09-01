import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "components/Header";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutPortrait from "components/AboutPortrait";
import { liveryAt, PAINT } from "components/livery";
import Glow from "components/Glow";
import CallLink from "components/CallLink";
import { PRICING } from "components/pricingCopy";
import NicheCtaButton from "components/NicheCtaButton";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  POSTAL_ADDRESS,
  breadcrumbSchema,
} from "components/businessInfo";

export const metadata: Metadata = {
  title: "About Emmanuel | Queso Ventures",
  description:
    "Seven years building software for startups, fintech, and venture backed AI products. Now I help local businesses get found online. Meet the person behind Queso Ventures.",
  alternates: { canonical: "https://www.quesoventures.com/about" },
  openGraph: {
    title: "About Emmanuel | Queso Ventures",
    description:
      "Seven years building software for startups, fintech, and venture backed AI products. Now I help local businesses get found online.",
    url: "https://www.quesoventures.com/about",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Emmanuel | Queso Ventures",
    description:
      "Seven years building software for startups, fintech, and venture backed AI products. Now I help local businesses get found online.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "Person",
      "@id": `${BUSINESS.url}/about#person`,
      name: "Emmanuel Mendieta",
      jobTitle: "Founder",
      url: `${BUSINESS.url}/about`,
      image: `${BUSINESS.url}/about.JPEG`,
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      worksFor: { "@id": `${BUSINESS.url}/#localbusiness` },
      address: POSTAL_ADDRESS,
      knowsAbout: [
        "Web Design",
        "Local SEO",
        "Google Business Profile Optimization",
        "Software Engineering",
      ],
    },
    breadcrumbSchema([{ name: "About", path: "/about" }]),
  ],
};

const chapters = [
  {
    year: "2019",
    label: "Started at 18 (yes, I was born in 2001)",
    body: "COVID closed every job in town, so I taught myself web development and started freelancing. First client at $15 an hour. I've been building for people ever since.",
  },
  {
    year: "2022",
    label: "Rose to tech lead",
    body: "I joined a tech company as the newest engineer on the team. Within a year, I was leading it. When something needed to get built, I was the one who did it, and real people were using what I made.",
  },
  {
    year: "2024",
    label: "Became a CTO",
    body: "My brother and I started our own company, and investors put real money behind us. As CTO, I built the entire product myself, and that meant building the AI inside it: teaching it to think correctly, pull the right information, and answer questions plainly, the same way AI search does today. I know how it works because I built it from under the hood.",
  },
  {
    year: "Now",
    label: "Bringing it all together",
    body: "Queso Ventures is where all of it lands. Enterprise grade technology for the businesses in my own backyard, serving owners across the Houston area. The big companies already have engineers like me. The businesses that actually matter, the ones down the street, deserve one too.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Intro */}
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-lightText dark:text-darkText mb-6 text-balance">
                Hey, I&apos;m Emmanuel.
              </h1>
              <p className="max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                In my career I&apos;ve worn lots of hats: AI engineer, software
                engineer (there is a bit of a difference), blockchain engineer,
                all the way to CTO of a venture-backed startup.
              </p>
              <p className="mt-5 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                Now I&apos;m bringing it all together and applying it to the
                businesses back home.
              </p>
            </div>
            <AboutPortrait />
          </div>
        </section>

        {/* Chapters — read as a build sheet, not a brochure. Each chapter
            carries its own factory paint, a spec index, and a year. */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-5">
            {chapters.map((chapter, i) => {
              const paint = liveryAt(i);
              return (
                <Reveal key={i} delay={i * 120}>
                  <Glow color={paint.hex} radius="rounded-3xl" lift={false}>
                  <div className="relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark">
                    {/* Livery stripe across the top, full bleed. */}
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: paint.hex }}
                    />
                    <div className="p-8 pt-10">
                      <p
                        className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
                        style={{ color: paint.ink }}
                      >
                        {chapter.year}
                      </p>

                      <p className="text-2xl font-semibold text-lightText dark:text-darkText mb-4 tracking-tight">
                        {chapter.label}
                      </p>
                      <p className="text-lg font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                        {chapter.body}
                      </p>

                      <div className="mt-8 pt-5 border-t border-lightBorder dark:border-darkBorder">
                        <span
                          className="block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-24"
                          style={{ backgroundColor: paint.hex }}
                        />
                      </div>
                    </div>
                  </div>
                  </Glow>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Why */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <Glow color={PAINT.gialloOrion.hex} radius="rounded-3xl" lift={false} spread={460}>
              <div
                data-dark-section
                className="group relative overflow-hidden rounded-3xl bg-[#101216] p-8 sm:p-14"
              >
                {/*
                  Mugello, and it is not decoration. The paragraph's argument is
                  that every big brand has a team of engineers making sure you
                  find them first: this is a picture of exactly that, a pit wall
                  with a factory operation behind it and privateers on track.
                  It also happens to be the visual language the whole site is
                  already speaking, since the palette is factory paint.

                  Visibility here is a product, not a setting: the photo shows
                  through at roughly `opacity x (1 - scrim)`. An early attempt
                  ran 0.22 under a 0.85 gradient, which is 3% and invisible.

                  At rest only the heading shows and the scrim stays light, so
                  the photograph is the section. Pointing at it fades the
                  argument in and deepens the scrim to carry it. The copy never
                  leaves the DOM — it is opacity, not display — so it is still
                  read by crawlers and still occupies its space, which is what
                  stops the card from resizing under the pointer.

                  Anything without a pointer gets the full card immediately:
                  `(hover: none)` covers touch, and `focus-within` covers the
                  keyboard.
                */}
                <Image
                  src="/hero/aboutMotoGP.JPEG"
                  alt="The pit straight at Mugello during a MotoGP session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover"
                />
                {/* Base scrim: enough for the heading, light enough to see. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(16,18,22,0.55) 0%, rgba(16,18,22,0.42) 55%, rgba(16,18,22,0.28) 100%)",
                  }}
                />
                {/* Second scrim, only while the copy is showing. */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(16,18,22,0.6) 0%, rgba(16,18,22,0.52) 55%, rgba(16,18,22,0.38) 100%)",
                  }}
                />

                <div
                  className="relative mx-auto max-w-3xl text-center"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B7C0C8]">
                    Why Queso Ventures exists
                  </h2>

                  <div className="opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                    <span
                      className="mx-auto mt-7 block h-1 w-14 rounded-full"
                      style={{ backgroundColor: PAINT.gialloOrion.hex }}
                    />

                    <p className="mt-8 text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-balance text-[#F5F7FA]">
                      Every big brand has a team of engineers making sure you
                      find them first.
                    </p>

                    {/*
                      One paragraph, one column. StatementCopy split this into
                      newspaper columns, which is right for a wall of text at the
                      top of a page and wrong here: two ragged columns under a
                      centred lead read as a layout accident.
                    */}
                    <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
                      The shops that keep Houston running do not. AI is changing
                      how customers find businesses, and most agencies are still
                      selling the old playbook. I helped build the new tools, so
                      I know the new rules. Queso Ventures brings that edge to
                      local businesses for {PRICING.monthlyLabel} a month. I&apos;ll
                      come see your store in person, and when you reach out,
                      it&apos;s me who answers.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                      <NicheCtaButton
                        from="about"
                        variant="onDark"
                        message="I want to see what my business could look like online."
                        label="Get My Free Report"
                      />
                      <CallLink
                        from="about"
                        className="whitespace-nowrap text-lg font-semibold text-white/80 transition-opacity hover:opacity-70"
                      >
                        or call {BUSINESS.phone}
                      </CallLink>
                    </div>
                  </div>
                </div>
              </div>
              </Glow>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
