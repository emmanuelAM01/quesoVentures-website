import type { Metadata } from "next";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutHero from "components/AboutHero";
import AboutDeck, { type DeckCard } from "components/AboutDeck";
import AboutChapters, { type Chapter } from "components/AboutChapters";
import { PAINT } from "components/livery";
import NicheCtaButton from "components/NicheCtaButton";
import { BUSINESS, breadcrumbSchema } from "components/businessInfo";

const GITHUB = "https://github.com/emmanuelAM01";
const LINKEDIN = "https://www.linkedin.com/in/emmanuelmendieta/";

const TITLE = "About Queso Ventures | Founded by Emmanuel Mendieta";
const DESCRIPTION =
  "Staring down unemployment, I started making money off my hobby. Software engineer since 2019, now building the websites and tools local businesses run on.";

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
        "Founder of Queso Ventures and a software engineer since 2019. Former CTO of a venture backed startup and tech lead at MARA Digital Holdings. Builds the tools local businesses use to get found on Google, Maps, and AI search, bring customers back, and run smoothly.",
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
    body: "Software that gets people calling, gets them walking back in, and ends the napkin math. Turn it on and it runs.",
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
    /*
      DRAFT. 2008 and the 2010s are one chapter: the point of those years is
      that he built sites for fun and messed with technology, and 2020 is when
      he started doing it for people. No year on it, on purpose: it is a
      stretch of growing up, not a date.
    */
    title: "The younger years",
    body: "Started out by taking computers apart and putting them back together. 75% success rate overall.",
    story:
      "Edited my grades and webpages online to prank my friends. Built sites for fake businesses I thought were cool, then real ones for friends and family. As most kids don't, I did not realize how important this hobby would be.",
    photos: [
      {
        src: "/about/2008.jpg",
        alt: "Emmanuel Mendieta as a kid, king of Fogo de Chão",
        position: "50% 30%",
      },
      {
        src: "/about/2010s-box.jpg",
        alt: "Emmanuel Mendieta as a kid, sitting in a cardboard box at home",
        position: "50% 45%",
      },
      {
        src: "/about/2010s-skyline.jpg",
        alt: "A selfie of Emmanuel Mendieta and his brother in front of a city skyline at night",
      },
      {
        src: "/about/2010s-boat.jpg",
        alt: "Emmanuel Mendieta sitting in a boat at a hilltop overlook at night",
        position: "70% 50%",
      },
    ],
    layout: "right",
  },
  {
    // DRAFT
    mark: "2020",
    title: "Staring down unemployment",
    body: "I had to make money somehow. So I started making money off my hobby.",
    story: "In college and Covid just closed every store that was hiring. The bills were still coming so I had to think fast. I don't know why it did not occur to me earlier to make websites for money, but I went all in on freelancing. $15/hour, then it doubled and grew from there.",
    photos: [
      {
        src: "/about/2020-laptop.jpg",
        alt: "Emmanuel Mendieta resting his head beside a laptop full of code",
        position: "35% 50%",
      },
    ],
    layout: "left",
  },
  {
    mark: "2022",
    title: "First startups",
    body: "Built apps in college alongside my brother. Y Combinator were not feeling it, and investor conversations did not work out.",
    story:
      "I helped build a stablecoin savings app. Then crypto crashed and took the idea with it. Next came a crime reporting app for Latin America. Had investor calls in between school and cupcake shop shifts (progress isn't linear). Things fell through in the end, I thought it was because I did not build it correctly, I had not learned my lesson yet though.",
    photos: [
      {
        src: "/about/2022-mountain.jpg",
        alt: "Emmanuel Mendieta standing on a snowy mountain pass near Tbilisi, Georgia",
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
    story: "After the ups and downs of freelance work and trying to create a company in college, I was relieved that I had an engineering job lined up for me immediately out of college. For 6 months I was reminded why working a regular job and carrying out the plan of life (college -> job -> vacations to break up the mundane) was not for me.",
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
    title: "Better engineering job ",
    body: "This job operated like a startup. I was hired for a specific role and within 2 months I was leading the team.",
    story:
      "Took a gamble and a paycut to join this company. Went from cushy W2 to unstable 1099 with the hopes of creating something real. The story of this job was that I was always avaiable and I grew pretty rapidly. Issue is i grew a bit too fast, there is only so much you can do when the company is not yours.",
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
    title: "Back to startups",
    body: "My brother and I did it, we got funding.",
    story:
      "We raised for Bitcoin backed lending: think a high yield savings account that puts your deposits to work in an industry that needs the money. Real estate, movies, and AI datacenters all came up before we settled on logistics, because it is real and always moving. We dropped the crypto, built logistics finance software, and gave that industry everything we had. It gave back hardly anything. The final form was a WhatsApp language tutor that graded your voice notes on grammar, authenticity, relevance, and accuracy, then kept the conversation going. My biggest technical feat, yet we burnt out building it instead of talking to the people it was for.",
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
    body: "Everything I have learned, and everything I am still learning.",
    story:
      "The common theme in every year before this: I like to build stuff, but nobody really uses it. So I did the inverse, talk then build stuff. It worked, and it is still how Queso Ventures operates today. I only build what people actually need, and the only way to know that is to talk to them, not guess.",
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
        <AboutChapters chapters={why} />

        {/*
          The last page. After Ferrari's centred blocks: one statement, one
          rule, one line, one way forward, and a lot of room around them.
        */}
        <section className="bg-panelLight dark:bg-panelDark">
          <div className="container mx-auto px-4 py-28 sm:py-40">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl font-light tracking-tight text-balance text-lightText dark:text-darkText">
                Your turn
              </h2>
              <span
                aria-hidden
                className="mx-auto mt-9 block h-1 w-24 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to right, ${PAINT.rossoCorsa.hex}, ${PAINT.gialloOrion.hex}, ${PAINT.gialloModena.hex})`,
                }}
              />
              <p className="mx-auto mt-9 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                I have built software for my own startups, for a publicly traded
                company, and for everything in between. Now I build it for the
                ones who deserve it most: you. Let&apos;s get you overengineered.
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
