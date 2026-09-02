import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutPortrait from "components/AboutPortrait";
import { liveryAt, PAINT } from "components/livery";
import Glow from "components/Glow";
import CallLink from "components/CallLink";
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
    "Seven years building software for startups, fintech, and venture backed AI products. Now I help local businesses get found online.",
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
    label: "Started at 18",
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
                <Fragment key={i}>
                <Reveal delay={i * 120}>
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

                {/*
                  The degree, between the rows rather than in a card of its own.

                  It belongs on the timeline and it is the one beat that is not
                  a chapter: nothing changed about the work in 2023, the paper
                  just caught up with it. A card would give it the same weight
                  as becoming a CTO. A line across the gap gives it the weight
                  it has, and the joke lands better in an aside than in a
                  headline.
                */}
                {i === 1 && (
                  <Reveal className="sm:col-span-2">
                    {/*
                      Arancio Xanto, and not by coincidence.

                      Red and yellow are already spoken for by the two cards it
                      sits between, so the divider needed a paint that reads as
                      house livery without echoing either neighbour. The rules
                      run out of it and fade to nothing at both ends, which is
                      the only ornament here: everything else is the sentence.

                      Two values from the same paint. The ink is the darkened
                      variant, the only one legible setting type on cream; the
                      factory hex is far too bright there and exactly right on
                      the dark panel. Passed as custom properties so the palette
                      module stays the single source for both.
                    */}
                    <div
                      className="flex items-center gap-5 py-2"
                      style={
                        {
                          "--paint": PAINT.arancioXanto.hex,
                          "--paint-ink": PAINT.arancioXanto.ink,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 sm:block"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, transparent, var(--paint))",
                        }}
                      />
                      <p className="text-center text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                        <span className="font-semibold text-[color:var(--paint-ink)] dark:text-[color:var(--paint)]">
                          2023
                        </span>{" "}
                        &middot; Graduated from the University of Houston,
                        majoring in Computer Science (what a surprise).
                      </p>
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 sm:block"
                        style={{
                          backgroundImage:
                            "linear-gradient(to left, transparent, var(--paint))",
                        }}
                      />
                    </div>
                  </Reveal>
                )}
                </Fragment>
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

                {/*
                  The resting title, centred in the card rather than sitting on
                  top of it.

                  The copy underneath keeps its space while hidden, so an
                  in-flow heading is pinned to the top of a very tall card with
                  a photograph running past it — which is why it read as a
                  caption. This layer is centred in the box and fades out as the
                  argument fades in, so the two never occupy the middle at once.
                  It duplicates the words in the h2 below it and is therefore
                  aria-hidden: the real heading is the one that stays in the
                  document.

                  White, not the house ramp. Red-to-yellow letters over this
                  photograph lose their second half against the sand and the
                  Brembo boards, which is the one place on the site where the
                  gradient actively costs legibility. The warm tint at the tail
                  of the type is as far as it goes, and the full ramp appears
                  underneath as a rule, where nothing has to be read through it.
                */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-100 transition-opacity duration-500 group-focus-within:opacity-0 group-hover:opacity-0 [@media(hover:none)]:opacity-0"
                >
                  <span
                    className="absolute h-[48%] w-[92%] max-w-4xl rounded-full blur-3xl"
                    style={{ background: "rgba(16,18,22,0.66)" }}
                  />
                  <p className="relative bg-gradient-to-b from-white from-[55%] to-[#FFE0A0] bg-clip-text text-4xl font-light leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
                    Why Queso Ventures exists
                  </p>
                  <span
                    className="relative mt-7 block h-1 w-24 rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${PAINT.rossoCorsa.hex}, ${PAINT.gialloOrion.hex}, ${PAINT.gialloModena.hex})`,
                    }}
                  />
                </div>

                <div
                  className="relative mx-auto max-w-3xl text-center"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}
                >

                  <div className="opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                    <span
                      className="mx-auto mt-7 block h-1 w-14 rounded-full"
                      style={{ backgroundColor: PAINT.gialloOrion.hex }}
                    />

                    <p className="mt-8 text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-balance text-[#F5F7FA]">
                      Big brands have dedicated engineers 
                    </p>

                    {/*
                      One paragraph, one column. StatementCopy split this into
                      newspaper columns, which is right for a wall of text at the
                      top of a page and wrong here: two ragged columns under a
                      centred lead read as a layout accident.
                    */}
                    {/*
                      Three sentences, down from five.

                      The cut ones were the agency swipe and the sentence
                      explaining that AI is changing search — both true, both
                      already made by the headline above and the whole page
                      below. What is left is the only part nobody else on this
                      market can say: I built the thing, and you get me.

                      The price went with them. It is on the pricing card, the
                      services page and this page's own schema; a fourth
                      appearance inside the emotional beat was the one place it
                      was doing no work.
                    */}
                    {/*
                      Houston is written out, not interpolated.

                      ${city} inside JSX text prints the dollar sign and the
                      braces exactly as typed — JSX needs {city}, and there is
                      no `city` here to reach for anyway. This page is the
                      flagship About page rather than one of the city-templated
                      geo pages, so the name is simply the name. If Queso
                      Ventures ever gets a second About page per metro, this is
                      the line that becomes a prop.
                    */}
                    <p className="mx-auto mt-7 max-w-2xl text-xl font-light leading-relaxed text-[#B7C0C8]">
                      The local places that Houston is built on do not. I built
                      Queso Ventures to help level the playing field with
                      technology.
                    </p>

                    <div className="mt-10 flex justify-center">
                      <NicheCtaButton
                        from="about"
                        variant="onDark"
                        message="I want to see what my business could look like online."
                        label="Get My Free Report"
                      />
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
