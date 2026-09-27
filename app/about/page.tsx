import type { Metadata } from "next";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutHero from "components/AboutHero";
import AboutLinks from "components/AboutLinks";
import AboutDeck, { type DeckCard } from "components/AboutDeck";
import AboutChapters, { type Chapter } from "components/AboutChapters";
import { PAINT } from "components/livery";
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
  The story, oldest first, one screen per year.

  Copy marked DRAFT was written from Emmanuel's notes as a placeholder; he
  rewrites it in his own words. 2022, 2024 and 2025 are his already.
  Still to fold in, in his words: 2024 was four promotions in six months, and
  leaving that job for a startup that actually got funded.

  Photos are his, chosen per year; several make a carousel. A chapter with no
  photo draws a field of its colour instead, so a gap never leaves a hole.
  The camera shot closes 2026 as the easter egg.

  Layout keeps the rhythm: splits that swap sides, broken by a full screen.
*/
const why: Chapter[] = [
  {
    // DRAFT. The camp story is his to tell.
    mark: "2008",
    title: "One time at computer camp",
    body: "My parents enrolled me in a free computer camp. I spent it taking computers apart and putting them back together.",
    photos: [
      {
        src: "/about/2008.jpg",
        alt: "Emmanuel Mendieta as a kid, wearing a red paper crown",
        position: "50% 30%",
      },
    ],
    layout: "left",
  },
  {
    // DRAFT
    mark: "2010s",
    title: "School, and a lot of messing around",
    body: "Edited my grades on the page before I showed my parents. Edited webpages as pranks.",
    story:
      "Built websites for fake businesses I thought were cool. Then real ones, for friends and family.",
    photos: [
      {
        src: "/about/2010s-box.jpg",
        alt: "Emmanuel Mendieta as a kid, sitting in a cardboard box at home",
        position: "50% 45%",
      },
      {
        src: "/about/2010s-boat.jpg",
        alt: "Emmanuel Mendieta sitting in a boat at a hilltop overlook at night",
        position: "70% 50%",
      },
      {
        src: "/about/2010s-skyline.jpg",
        alt: "A selfie of Emmanuel Mendieta in front of a city skyline at night",
      },
    ],
    layout: "right",
  },
  {
    // DRAFT
    mark: "2020",
    title: "Staring down unemployment",
    body: "I had to make money somehow. So I started making money off my hobby.",
    photos: [
      {
        src: "/about/2020-laptop.jpg",
        alt: "Emmanuel Mendieta resting his head beside a laptop full of code",
        position: "35% 50%",
      },
      {
        src: "/about/2020-brooklyn.jpg",
        alt: "Emmanuel Mendieta in Brooklyn at night, the Manhattan Bridge behind him",
        position: "50% 60%",
      },
    ],
    layout: "left",
  },
  {
    mark: "2022",
    title: "First startups",
    body: "Built two apps in college. Y Combinator never answered. Alliance DAO passed on the idea, not on me.",
    story:
      "Still in college, I helped build a stablecoin savings app. Then crypto crashed and took the idea with it. Next came a crime reporting app for Latin America, the first product I built on my own. Y Combinator never answered. Alliance DAO interviewed me three times between cupcake shop shifts, then passed on the idea. Never on whether I could build it.",
    photos: [
      {
        src: "/about/2022-mountain.jpg",
        alt: "Emmanuel Mendieta standing on a snowy mountain pass",
        position: "50% 62%",
      },
      {
        src: "/about/2022-terrace.jpg",
        alt: "Emmanuel Mendieta at a table on a terrace above a city at night",
        position: "50% 62%",
      },
    ],
    layout: "full",
  },
  {
    // DRAFT
    mark: "2023",
    title: "Graduated, got a regular job",
    body: "Computer Science at the University of Houston (what a surprise).",
    story: "Then a regular job, because those were the rules of life. Or so I thought.",
    photos: [
      {
        src: "/hero/aboutHills.jpg",
        alt: "Emmanuel Mendieta squinting into the sun on a green hillside",
        position: "50% 45%",
      },
    ],
    layout: "right",
  },
  {
    mark: "2024",
    title: "QA hire to tech lead",
    body: "Hired at MARA for QA. Two months later I was leading six developers.",
    story:
      "Took a pay cut to join MARA as a contractor, hired for QA. There was no QA work my first week, so I built the frontend for their Bitcoin transaction accelerator and shipped it in days. Two months later I was leading six developers and a designer.",
    photos: [
      {
        src: "/hero/aboutTokyo.jpg",
        alt: "Emmanuel Mendieta on an observation deck above Tokyo",
        position: "50% 30%",
      },
    ],
    layout: "full",
  },
  {
    mark: "2025",
    title: "CTO, raised $250K",
    body: "An app full of AI agents. A whole bunch of technical jazz, but no users. Lesson learned: talk to people first.",
    story:
      "We raised $250K for Bitcoin backed lending. As CTO I built every pivot: trucking finance, logistics software, then an AI language coach on WhatsApp. One version paid truck drivers for texting a photo of their paperwork. It worked perfectly. Nobody signed up.",
    photos: [
      {
        src: "/about/2025-mugello.jpg",
        alt: "Emmanuel Mendieta in the grandstand at Mugello",
        position: "50% 45%",
      },
      {
        src: "/hero/aboutColosseum.jpg",
        alt: "Emmanuel Mendieta inside the Colosseum in Rome",
        position: "50% 55%",
      },
    ],
    layout: "left",
  },
  {
    // DRAFT
    mark: "2026",
    title: "Queso Ventures",
    body: "Learned that lesson a little too late. So I started Queso Ventures.",
    story: "Everything I have learned, and everything I am still learning, in one place.",
    photos: [
      {
        src: "/hero/aboutClouds.JPEG",
        alt: "Pine trees and clouds over the Alps",
      },
      {
        src: "/about.JPEG",
        alt: "Portrait of Emmanuel Mendieta, founder of Queso Ventures",
        position: "45% 30%",
      },
      {
        src: "/hero/aboutCamera.jpg",
        alt: "Emmanuel Mendieta holding the camera behind the photos on this site",
        position: "50% 28%",
        caught: true,
      },
    ],
    layout: "right",
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
        <AboutHero
          title="More customers, less busywork and guessing."
          sub="Queso Ventures builds the tools local businesses need to grab more customers and keep them coming back."
          next="what"
        />

        {/* What Queso Ventures is */}
        <section id="what" className="container mx-auto px-4 py-24 sm:py-32 lg:py-0">
          <div className="max-w-6xl mx-auto">
            <AboutDeck cards={what}>
              <Reveal>
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight text-balance text-lightText dark:text-darkText">
                  What Queso Ventures is
                </h2>
              </Reveal>
            </AboutDeck>
          </div>
        </section>

        {/*
          The story needs its heading for readers and crawlers, but on screen
          the chapters open straight after the deck: a title page between them
          only broke the flow.
        */}
        <h2 className="sr-only">Why I&apos;m doing this</h2>
        <AboutChapters
          chapters={why}
          coda={
            // Right after the résumé, where someone checking up on me looks next.
            <AboutLinks github={GITHUB} linkedin={LINKEDIN} />
          }
        />

        {/*
          The last page. After Ferrari's centred blocks: one statement, one
          rule, one line, one way forward, and a lot of room around them.
        */}
        <section className="bg-panelLight dark:bg-panelDark">
          <div className="container mx-auto px-4 py-28 sm:py-40">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl font-light tracking-tight text-balance text-lightText dark:text-darkText">
                Outcomes, not words
              </h2>
              <span
                aria-hidden
                className="mx-auto mt-9 block h-1 w-24 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to right, ${PAINT.rossoCorsa.hex}, ${PAINT.gialloOrion.hex}, ${PAINT.gialloModena.hex})`,
                }}
              />
              <p className="mx-auto mt-9 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                Anyone can say &ldquo;I build websites&rdquo; now. I sell the
                result: more calls, more walk ins, more orders.
              </p>
              <div className="mt-12 flex justify-center">
                <NicheCtaButton
                  from="about"
                  variant="arrow"
                  message="I want to see what my business could look like online."
                  label="Get My Free Report"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
