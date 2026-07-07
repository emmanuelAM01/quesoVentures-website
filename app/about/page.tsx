import type { Metadata } from "next";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";
import Reveal from "components/Reveal";
import AboutPortrait from "components/AboutPortrait";
import NicheCtaButton from "components/NicheCtaButton";

export const metadata: Metadata = {
  title: "About Emmanuel | Queso Ventures, Houston, TX",
  description:
    "Seven years building software for startups, the crypto industry, and venture backed AI products. Now I help Houston businesses get found online. Meet the person behind Queso Ventures.",
  alternates: { canonical: "https://www.quesoventures.com/about" },
  openGraph: {
    title: "About Emmanuel | Queso Ventures, Houston, TX",
    description:
      "Seven years building software for startups, the crypto industry, and venture backed AI products. Now I help Houston businesses get found online.",
    url: "https://www.quesoventures.com/about",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Emmanuel | Queso Ventures, Houston, TX",
    description:
      "Seven years building software for startups, the crypto industry, and venture backed AI products. Now I help Houston businesses get found online.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.quesoventures.com/about#person",
  name: "Emmanuel Mendieta",
  jobTitle: "Founder",
  url: "https://www.quesoventures.com/about",
  image: "https://www.quesoventures.com/about.JPEG",
  worksFor: {
    "@type": "Organization",
    name: "Queso Ventures",
    url: "https://www.quesoventures.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Houston",
    addressRegion: "TX",
    addressCountry: "US",
  },
  knowsAbout: [
    "Web Design",
    "Local SEO",
    "AI Search Optimization",
    "Software Engineering",
  ],
};

const chapters = [
  {
    label: "Started at 18",
    body: "COVID closed every job in town, so I taught myself web development and started freelancing. First client at $15 an hour. I've been building for people ever since.",
  },
  {
    label: "Went deep",
    body: "Engineer to tech lead in the crypto industry. I know it has its flaws, but the engineering is just as hard as anywhere else. I shipped products end to end and led a dev team of my own.",
  },
  {
    label: "Became an AI engineer",
    body: "I co-founded a venture backed company and built the entire product myself. AI agents, voice pipelines, the works. The same kind of AI that now decides which businesses get recommended, I have built with my own hands.",
  },
  {
    label: "Came home",
    body: "Queso Ventures is where all of it lands. Enterprise grade engineering for the businesses in my own backyard, serving owners across the Houston area.",
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
              <p className="max-w-xl text-lg sm:text-xl font-light text-lightTextMuted dark:text-darkTextMuted">
                AI engineer, software engineer, fintech engineer, and all the way to the crypto industry. <br /><br />
                I&apos;ve been around and built a lot of stuff. <br /><br />
                Now, it&apos;s time to apply everything I have learned to the local businesses back home in Houston.
              </p>
            </div>
            <AboutPortrait />
          </div>
        </section>

        {/* Chapters */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            {chapters.map((chapter, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="h-full rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-lightAccent dark:text-darkAccent mb-4">
                    {chapter.label}
                  </p>
                  <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                    {chapter.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div data-dark-section className="rounded-3xl bg-[#101216] p-8 sm:p-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#F5F7FA] mb-6">
                  Why Queso Ventures exists
                </h2>
                <p className="max-w-3xl text-lg sm:text-xl font-light text-[#B7C0C8] leading-relaxed">
                  Every big brand has a team of engineers making sure you find
                  them first. The shops that keep Houston running do not. AI
                  is changing how customers find businesses, and most agencies
                  are still selling the old playbook. I helped build the new
                  tools, so I know the new rules. Queso Ventures brings that
                  edge to local businesses for $300 a month. I&apos;ll come
                  see your shop in person, and when you text, it&apos;s me who
                  answers.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <NicheCtaButton
                    message="I want to see what my business could look like online. Here's my situation:"
                    label="See What Your Website Could Look Like"
                  />
                  <Link
                    href="https://calendar.app.google/DTrFqJ9XjEuTNmfr6"
                    target="_blank"
                    className="text-center sm:text-left text-base font-semibold text-[#F5F7FA] hover:opacity-70 transition-opacity"
                  >
                    Book a call instead →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
