import Link from "next/link";
import LavaLamp from "components/LavaLamp";
import Reveal from "components/Reveal";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import GetIt from "components/tools/GetIt";
import HeroSearch from "components/home/HeroSearch";
import WebsiteChart from "components/home/WebsiteChart";
import { SERIES } from "components/home/series";
import { houseGradient } from "components/livery";
import { formatGrowth } from "components/formatGrowth";
import type { ReportCard } from "lib/reportCard";

/**
 * The home, as the company's front page: what this is, how it gets made
 * (Receipt), what is on the shelf (Shelf), proof it works, who is behind it. Each section answers
 * one question and hands off to the page that answers it in full, so nothing
 * here is said twice on the site.
 */

/**
 * What this is, in one line, and the joke the name was always making.
 * The search beside it is the picture: one business, many tools at work.
 */
export function CompanyHero() {
  return (
    <section data-dark-section className="relative -mt-[76px] flex min-h-[100svh] items-center overflow-hidden bg-[#0B0D12] pt-[76px]">
      <LavaLamp scrim={0.55} />
      <div className="container relative mx-auto px-4 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-5xl font-extralight leading-[0.98] tracking-tight text-balance text-white sm:text-7xl xl:text-8xl">
              Software for small businesses.
            </h1>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 text-3xl font-light leading-tight tracking-tight text-white/90 sm:text-4xl">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: houseGradient() }}>
                Ventures is plural for a reason.
              </span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <GetIt label="Get Started" from="home" tone="dark" size="lg" />
              <Link href="/tools" className={arrowTone("dark")}>
                <ArrowMark tone="dark" size="sm" label="Every tool" />
              </Link>
            </div>
          </div>
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}

/**
 * Proof, live, and labelled as what it is: the Website's numbers, the
 * average client's three lines off the Report Card. With no card (the portal
 * is down, or no PORTAL_URL) the band keeps its heading and links and shows
 * no figures, rather than inventing any.
 */
export function ProofBand({ card }: { card: ReportCard | null }) {
  const all = card?.groups.find((g) => g.slug === "all") ?? card?.groups[0];
  const metrics = all?.metrics ?? {};
  const figures = SERIES.map((m) => ({ ...m, figure: metrics[m.key] })).filter((m) => m.figure);
  // Months still ahead this year are projected; in December there are none.
  const projected = figures.some((m) => m.figure?.line.some((p) => p.projected));

  return (
    <section data-dark-section className="relative overflow-hidden bg-[#0B0D12]">
      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-5xl font-extralight leading-[1.02] tracking-tight text-white sm:text-6xl">
              Let's talk websites
            </h2>
            {figures.length > 0 && (
              <p className="mt-6 text-lg font-light text-white/55">
                The average Queso Ventures website client growth.
              </p>
            )}
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            {figures.length > 0 && (
              <dl className="mt-10 space-y-5">
                {figures.map((m) => (
                  <div key={m.key} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-4">
                    <dt className="flex items-center gap-3 text-lg font-light text-white/70">
                      <span aria-hidden className="h-[3px] w-5 rounded-full" style={{ backgroundColor: m.color }} />
                      {m.label}
                    </dt>
                    <dd className="text-4xl font-extralight tabular-nums tracking-tight text-white">{formatGrowth(m.figure!.growth)}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href="/tools/website" className={arrowTone("dark")}>
                <ArrowMark tone="dark" size="sm" label="The Website" />
              </Link>
              <Link href="/report-card" className={arrowTone("dark")}>
                <ArrowMark tone="dark" size="sm" label="The Report Card" />
              </Link>
            </div>
          </div>
          {figures.length > 0 && <WebsiteChart figures={metrics} />}
        </div>
      </div>
    </section>
  );
}

/** Who is behind it. His line from the old home, word for word. */
export function FounderLine() {
  return (
    <section className="container mx-auto px-4 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-3xl font-light leading-tight tracking-tight text-balance text-lightText sm:text-4xl md:text-5xl dark:text-darkText">
          Industry-trained software engineer, working for the businesses that rarely get one.
        </p>
        <span aria-hidden className="mx-auto mt-9 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
        <Link href="/about" className={`${arrowTone("light")} mt-10`}>
          <ArrowMark label="Meet the founder" />
        </Link>
      </Reveal>
    </section>
  );
}
