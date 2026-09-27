import type { Metadata } from "next";
import Image from "next/image";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutPortrait from "components/AboutPortrait";
import AboutPhotoRoll from "components/AboutPhotoRoll";
import AboutLinks from "components/AboutLinks";
import AboutDeck, { type DeckCard } from "components/AboutDeck";
import AboutTimeline, { type TimelineEntry } from "components/AboutTimeline";
import { PAINT } from "components/livery";
import Glow from "components/Glow";
import NicheCtaButton from "components/NicheCtaButton";
import { BUSINESS, breadcrumbSchema } from "components/businessInfo";

const GITHUB = "https://github.com/emmanuelAM01";
const LINKEDIN = "https://www.linkedin.com/in/emmanuelmendieta/";

const TITLE = "About Queso Ventures | Founded by Emmanuel Mendieta";
const DESCRIPTION =
  "Why Queso Ventures exists and who built it. Emmanuel Mendieta has been building software since 2020 and now helps local businesses get found on Google, Maps, and AI search, bring customers back, and run smoothly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/about",
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

/*
  The business itself is not repeated here. LOCAL_BUSINESS_SCHEMA is emitted in
  full on the home, services, contact and every city and industry page, all
  under the same @id, so this page points at it rather than restating it.
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BUSINESS.url}/about#webpage`,
      url: `${BUSINESS.url}/about`,
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": `${BUSINESS.url}/#localbusiness` },
      mainEntity: { "@id": `${BUSINESS.url}/about#person` },
      breadcrumb: { "@id": `${BUSINESS.url}/about#breadcrumb` },
    },
    {
      "@type": "Person",
      "@id": `${BUSINESS.url}/about#person`,
      name: "Emmanuel Mendieta",
      givenName: "Emmanuel",
      familyName: "Mendieta",
      jobTitle: "Founder",
      description:
        "Founder of Queso Ventures and a software engineer since 2020. Former CTO of a venture backed startup and tech lead at MARA Digital Holdings. Builds the tools local businesses use to get found on Google, Maps, and AI search, bring customers back, and run smoothly.",
      url: `${BUSINESS.url}/about`,
      image: `${BUSINESS.url}/about.JPEG`,
      worksFor: { "@id": `${BUSINESS.url}/#localbusiness` },
      homeLocation: { "@type": "City", name: "Houston, Texas" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Houston",
        sameAs: "https://www.uh.edu",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Computer Science",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Houston" },
      },
      /*
        The facts people and answer engines check a founder against: who they
        built for before, and what they know. Each one is also on the page in
        plain text, which is what makes it citable rather than a claim.
      */
      knowsAbout: [
        "Local SEO",
        "AI Search Optimization",
        "Generative Engine Optimization",
        "Google Business Profile Optimization",
        "Web Design",
        "Web Development",
        "Software Engineering",
        "Full Stack Development",
        "AI Agents",
        "Blockchain",
      ],
      sameAs: [LINKEDIN, GITHUB, BUSINESS.instagram, BUSINESS.youtube],
    },
    breadcrumbSchema([{ name: "About", path: "/about" }]),
  ],
};

/*
  Cards are statements, not paragraphs. The bold line should land on its own;
  the body is one or two short sentences for whoever slows down.

  The order of the first row is the pitch: websites are how an owner meets
  Queso Ventures, the engineering is why it works, and the tools are where it
  is going. No client counts and no price here; the price varies and lives on
  the pricing pages, and a number of clients invites the wrong comparison.
*/

const what: DeckCard[] = [
  {
    mark: "Websites",
    icon: "browser",
    title: "How I got this ball rolling",
    body: "A site that brings in new business and keeps them coming back.",
  },
  {
    mark: "Overqualified",
    icon: "cpu",
    title: "I put the FUN in fundamentals",
    body: "Websites are just the beginning. Ventures is plural for a reason.",
  },
  {
    mark: "Helpful",
    icon: "puzzle",
    title: "Not just assuming",
    body: "Tools that are tailored for you to get more customers or to run your shop smarter.",
  },
  {
    mark: "Growing pretty fast",
    icon: "tools",
    title: "The real product",
    body: "Queso Studios. Loyalty rewards, an AI front desk, and more. Turn one on and it runs.",
    href: "/studios",
    cta: "See Queso Studios",
  },
];

/*
  The story, oldest first. Drafts from Emmanuel's notes are marked DRAFT: he
  rewrites those in his own words. 2022, 2024 and 2025 are his already.

  Still to fold in, in his words: 2024 was four promotions in six months, and
  leaving that job for a startup that actually got funded.
*/
const why: TimelineEntry[] = [
  {
    // DRAFT. The camp story is his to tell.
    mark: "2008",
    title: "One time at computer camp",
    body: "My parents enrolled me in a free computer camp. I spent it taking computers apart and putting them back together.",
  },
  {
    // DRAFT
    mark: "2010s",
    title: "School, and a lot of messing around",
    body: "Edited my grades on the page before I showed my parents. Edited webpages as pranks.",
    story:
      "Built websites for fake businesses I thought were cool. Then real ones, for friends and family.",
  },
  {
    // DRAFT
    mark: "2020",
    title: "Staring down unemployment",
    body: "I had to make money somehow. So I started making money off my hobby.",
  },
  {
    mark: "2022",
    title: "First startups",
    body: "Built two apps in college. Y Combinator never answered. Alliance DAO passed on the idea, not on me.",
    story:
      "Still in college, I helped build a stablecoin savings app. Then crypto crashed and took the idea with it. Next came a crime reporting app for Latin America, the first product I built on my own. Y Combinator never answered. Alliance DAO interviewed me three times between cupcake shop shifts, then passed on the idea. Never on whether I could build it.",
  },
  {
    // DRAFT
    mark: "2023",
    title: "Graduated, got a regular job",
    body: "Computer Science at the University of Houston (what a surprise).",
    story: "Then a regular job, because those were the rules of life. Or so I thought.",
  },
  {
    mark: "2024",
    title: "QA hire to tech lead",
    body: "Hired at MARA for QA. Two months later I was leading six developers.",
    story:
      "Took a pay cut to join MARA as a contractor, hired for QA. There was no QA work my first week, so I built the frontend for their Bitcoin transaction accelerator and shipped it in days. Two months later I was leading six developers and a designer.",
  },
  {
    mark: "2025",
    title: "CTO, raised $250K",
    body: "An app full of AI agents. A whole bunch of technical jazz, but no users. Lesson learned: talk to people first.",
    story:
      "We raised $250K for Bitcoin backed lending. As CTO I built every pivot: trucking finance, logistics software, then an AI language coach on WhatsApp. One version paid truck drivers for texting a photo of their paperwork. It worked perfectly. Nobody signed up.",
  },
  {
    // DRAFT
    mark: "2026",
    title: "Queso Ventures",
    body: "Learned that lesson a little too late. So I started Queso Ventures.",
    story: "Everything I have learned, and everything I am still learning, in one place.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip bg-lightBG dark:bg-darkBG">
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
                More customers, less busywork and guessing.
              </h1>
              <p className="max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                Queso Ventures builds the tools local businesses need to grab more customers and keep them coming back.
              </p>
            </div>
            <AboutPortrait />
          </div>
        </section>

        {/* What Queso Ventures is */}
        <section className="container mx-auto px-4 py-12">
          <Reveal className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText mb-8 text-balance">
              What Queso Ventures is
            </h2>
          </Reveal>
          <div className="max-w-6xl mx-auto">
            <AboutDeck cards={what} />
          </div>
        </section>

        {/* The camera roll. Tokyo at rest, the rest of the roll on click. */}
        <section className="container mx-auto px-4 py-8">
          <Reveal className="max-w-6xl mx-auto">
            <AboutPhotoRoll />
          </Reveal>
        </section>

        {/* Why I'm doing this */}
        <section className="container mx-auto px-4 py-12">
          <Reveal className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText mb-8 text-balance">
              Why I&apos;m doing this
            </h2>
          </Reveal>
          <div className="max-w-6xl mx-auto">
            <AboutTimeline entries={why} />
            {/* Right after the résumé, where someone checking up on me looks next. */}
            <AboutLinks github={GITHUB} linkedin={LINKEDIN} />
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
                    Outcomes, not words
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

                    {/*
                      The real heading. The centred title above is aria-hidden
                      and fades out as this fades in, so the words live in the
                      document once, here.
                    */}
                    <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-balance text-[#F5F7FA]">
                      Outcomes, not words
                    </h2>

                    <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
                      Anyone can say &ldquo;I build websites&rdquo; now. I sell
                      the result: more calls, more walk ins, more orders.
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
