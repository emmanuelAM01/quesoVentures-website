import Link from "next/link";
import LavaLamp from "components/LavaLamp";
import FaqDeck from "components/FaqDeck";
import Reveal from "components/Reveal";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { houseGradient } from "components/livery";
import ProductShot from "components/tools/ProductShot";
import PriceTag from "components/tools/PriceTag";
import GetIt from "components/tools/GetIt";
import { Coupon } from "components/tools/Catalog";
import { BUSINESS } from "components/businessInfo";
import { EVEN_GRID, evenSpan } from "components/tools/evenGrid";
import {
  actionLabel,
  departmentNumber,
  itemNumber,
  outcomeBy,
  packFor,
  productsFor,
  type Product,
} from "components/catalog";

/**
 * One tool's page: the same five beats for every tool, so the catalogue reads
 * as one company and not fifteen landing pages.
 *
 *   1. The shot, the name, the price, Get it. What it is in three seconds.
 *   2. What you get, as numbered points.
 *   3. The questions owners actually type into Google, answered. This is the
 *      part search engines and AI assistants read, and why each tool has a page.
 *   4. What goes with it: the bundle it belongs to, or its neighbours.
 *   5. Ready when you are.
 */

export function ToolHero({ product }: { product: Product }) {
  const dept = outcomeBy(product.outcome);
  return (
    <section data-dark-section className="relative -mt-[76px] flex min-h-[100svh] items-center overflow-hidden bg-[#0B0D12] pt-[76px]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 60% 70% at 78% 55%, ${product.accent}33, transparent 70%)` }}
      />
      <div className="container relative mx-auto px-4 pb-24 pt-14 sm:pb-28 sm:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-2">
          <div>
            <Link href={`/tools#${dept.key}`} className="inline-flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white">
              <span className="tabular-nums">No. {itemNumber(product)}</span>
              <span aria-hidden className="h-[3px] w-5 rounded-full" style={{ backgroundColor: dept.accent }} />
              <span>{dept.label}</span>
            </Link>
            <h1 className="mt-5 text-6xl font-extralight leading-[0.95] tracking-tight text-white sm:text-7xl xl:text-8xl">
              {product.name}
            </h1>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-xl text-2xl font-light leading-snug text-white/85">{product.line}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <PriceTag product={product} tone="dark" size="lg" />
              {!product.built && <span className="text-sm text-white/55">Made to order</span>}
            </div>
            {(product.usage || product.terms) && (
              <p className="mt-4 max-w-lg text-sm text-white/55">{product.usage ?? product.terms}</p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <GetIt orderKey={product.key} from="tool_page" tone="dark" size="lg" label={actionLabel(product, "Get my free report")} />
              <Link href="/tools" className={arrowTone("dark")}>
                <ArrowMark tone="dark" size="sm" label="Every tool" />
              </Link>
            </div>
          </div>

          <ProductShot product={product} size="lg" />
        </div>
      </div>
    </section>
  );
}

export function WhatYouGet({ product }: { product: Product }) {
  return (
    <section className="bg-lightBG dark:bg-darkBG">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-5xl font-extralight tracking-tight text-lightText sm:text-6xl dark:text-darkText">What you get</h2>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
          </Reveal>
          <ol className={`mt-16 ${EVEN_GRID} gap-x-14 gap-y-14`}>
            {product.points.map((point, i) => (
              <Reveal key={point} delay={i * 80} className={evenSpan(i, product.points.length)}>
                <li className="flex flex-col gap-5">
                  <span
                    aria-hidden
                    className="select-none text-6xl font-extralight leading-none tracking-tighter text-transparent"
                    style={{ WebkitTextStroke: `1.25px ${product.accent}` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-xl text-xl font-light leading-relaxed text-lightText dark:text-darkText">{point}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          {product.elsewhere && (
            <a href={product.elsewhere.href} target="_blank" rel="noopener noreferrer" className={`${arrowTone("light")} mt-14`}>
              <ArrowMark size="sm" label={product.elsewhere.label} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ToolQuestions({ product }: { product: Product }) {
  return (
    <FaqDeck items={product.questions.map((q) => ({ title: q.q, content: q.a }))} />
  );
}

/** The bundle this tool belongs to, or its neighbours on the shelf. */
export function GoesWellWith({ product }: { product: Product }) {
  const pack = packFor(product.outcome);
  const inPack = pack?.products.includes(product.key);
  const neighbours = productsFor(product.outcome).filter((p) => p.key !== product.key).slice(0, 3);
  if (!inPack && neighbours.length === 0) return null;
  const dept = outcomeBy(product.outcome);

  return (
    <section className="bg-bandLight dark:bg-bandDark">
      <div className="container mx-auto px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-extralight tracking-tight text-lightText sm:text-5xl dark:text-darkText">Goes well with</h2>
          {pack && inPack ? (
            <Coupon pack={pack} named current={product.key} />
          ) : (
            <div className={`mt-14 ${EVEN_GRID} gap-x-10 gap-y-14`}>
              {neighbours.map((n, i) =>
                neighbours.length === 1 ? (
                  // Alone, it lies on its side across the row instead of
                  // standing in a third of it.
                  <Link key={n.key} href={`/tools/${n.slug}`} className="group grid items-center gap-10 md:col-span-6 md:grid-cols-2">
                    <ProductShot product={n} size="md" />
                    <div>
                      <p className="text-sm tabular-nums text-lightTextMuted dark:text-darkTextMuted">No. {itemNumber(n)}</p>
                      <p className="mt-1 text-4xl font-extralight tracking-tight text-lightText transition-colors group-hover:text-lightAccent dark:text-darkText dark:group-hover:text-darkAccent">
                        {n.name}
                      </p>
                      <p className="mt-3 max-w-md text-lg font-light text-lightTextMuted dark:text-darkTextMuted">{n.line}</p>
                    </div>
                  </Link>
                ) : (
                  <Link key={n.key} href={`/tools/${n.slug}`} className={`group block ${evenSpan(i, neighbours.length)}`}>
                    <ProductShot product={n} size="sm" />
                    <p className="mt-8 text-sm tabular-nums text-lightTextMuted dark:text-darkTextMuted">No. {itemNumber(n)}</p>
                    <p className="mt-1 text-2xl font-extralight tracking-tight text-lightText transition-colors group-hover:text-lightAccent dark:text-darkText dark:group-hover:text-darkAccent">
                      {n.name}
                    </p>
                    <p className="mt-2 text-base font-light text-lightTextMuted dark:text-darkTextMuted">{n.line}</p>
                  </Link>
                )
              )}
            </div>
          )}
          <Link href={`/tools#${dept.key}`} className={`${arrowTone("light")} mt-14`}>
            <ArrowMark size="sm" label={`${departmentNumber(dept)} ${dept.label}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReadyWhenYouAre({ product }: { product: Product }) {
  return (
    <section data-dark-section className="relative overflow-hidden bg-[#0B0D12]">
      <LavaLamp scrim={0.55} />
      <div className="container relative mx-auto px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Ready when you are.
          </h2>
          <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-white/80 sm:text-2xl">{product.line}</p>
          <div className="mt-10">
            <GetIt orderKey={product.key} from="tool_page" tone="dark" size="lg" label={actionLabel(product, "Get my free report")} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The tool, its price, its questions and where it sits, for search and AI. */
export function toolJsonLd(product: Product) {
  const url = `${BUSINESS.url}/tools/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: product.name,
        description: product.line,
        url,
        provider: { "@id": `${BUSINESS.url}/#organization` },
        ...(product.list != null
          ? { offers: { "@type": "Offer", price: String(product.list), priceCurrency: "USD", url } }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: product.questions.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Tools", item: `${BUSINESS.url}/tools` },
          { "@type": "ListItem", position: 2, name: product.name, item: url },
        ],
      },
    ],
  };
}
