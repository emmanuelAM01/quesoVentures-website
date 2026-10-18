import Link from "next/link";
import LavaLamp from "components/LavaLamp";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import NicheCtaButton from "components/NicheCtaButton";
import { houseGradient } from "components/livery";
import { EVEN_GRID, evenSpan } from "components/tools/evenGrid";
import ProductShot from "components/tools/ProductShot";
import PriceTag from "components/tools/PriceTag";
import GetIt from "components/tools/GetIt";
import {
  OUTCOMES,
  PACKS,
  PRODUCTS,
  departmentNumber,
  itemNumber,
  actionLabel,
  outcomeBy,
  packCount,
  packFor,
  packTitle,
  productByKey,
  productsFor,
  type Outcome,
  type Pack,
  type Product,
} from "components/catalog";

/**
 * The Tools page, dressed as a catalogue.
 *
 * A cover with a masthead and an issue line, cover lines that are the
 * contents, then a spread per department: its number set huge in outline, its
 * lead item shot large across the spread, the rest of the shelf beneath, and
 * the bundle at the foot as a coupon. The early 2000s are in the gloss of the
 * product shots, the outlined numerals and the dashed coupon edge; the type,
 * the colours and the spacing are the house's, so it reads as this brand
 * remembering a catalogue rather than a theme from one.
 */

const ISSUE = "Vol. 01 · Fall 2026";

/** Three products fanned like a catalogue shot. The cover's, and the home's. */
export function ShotFan() {
  const cover = ["rewards", "website", "revenue"].map((k) => productByKey(k)!);
  return (
    <>
      <div className="relative hidden h-[32rem] lg:block">
        <div className="absolute -left-4 top-32 w-[55%] -rotate-[8deg] opacity-80 blur-[0.4px]">
          <ProductShot product={cover[0]} size="sm" />
        </div>
        <div className="absolute -right-4 top-40 w-[55%] rotate-[8deg] opacity-80 blur-[0.4px]">
          <ProductShot product={cover[2]} size="sm" />
        </div>
        <div className="absolute left-1/2 top-0 w-[74%] -translate-x-1/2">
          <ProductShot product={cover[1]} size="md" />
        </div>
      </div>
      <div className="lg:hidden">
        <ProductShot product={cover[1]} size="md" />
      </div>
    </>
  );
}

/** The cover. Dark, tucked under the bar, like every hero on the site. */
export function CatalogCover() {
  return (
    <section data-dark-section className="relative -mt-[76px] flex min-h-[100svh] items-center overflow-hidden bg-[#0B0D12] pt-[76px]">
      <LavaLamp scrim={0.62} />
      <div className="container relative mx-auto px-4 pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm tracking-wide text-white/55">{ISSUE}</p>
            <h1 className="mt-4 text-[5.5rem] font-extralight leading-[0.9] tracking-tighter text-white sm:text-[8rem] xl:text-[10rem]">
              Tools
            </h1>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-md text-2xl font-light leading-snug text-white/85">
              Go Shopping
            </p>

            {/* The cover lines are the contents. */}
            <ol className="mt-12 max-w-md divide-y divide-white/10 border-y border-white/10">
              {OUTCOMES.map((o) => (
                <li key={o.key}>
                  <a href={`#${o.key}`} className="group flex items-baseline gap-4 py-3">
                    <span className="w-8 text-sm tabular-nums text-white/45">{departmentNumber(o)}</span>
                    <span className="flex-1 text-lg font-light text-white transition-colors group-hover:text-darkAccent">
                      {o.label}
                    </span>
                    <span aria-hidden className="h-[3px] w-6 rounded-full transition-[width] duration-500 group-hover:w-10" style={{ backgroundColor: o.accent }} />
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <ShotFan />
        </div>
      </div>
    </section>
  );
}

/** One department: its number, its name, its complete experience, then its shelf. */
export function Department({ outcome, index }: { outcome: Outcome; index: number }) {
  const items = productsFor(outcome.key);
  const [lead, ...rest] = items;
  const pack = packFor(outcome.key);
  const band = index % 2 === 0 ? "bg-lightBG dark:bg-darkBG" : "bg-bandLight dark:bg-bandDark";

  return (
    <section id={outcome.key} className={`scroll-mt-24 ${band}`}>
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-wrap items-end gap-x-10 gap-y-4">
            <span
              aria-hidden
              className="select-none text-[6rem] font-extralight leading-none tracking-tighter text-transparent sm:text-[9rem]"
              style={{ WebkitTextStroke: `1.5px ${outcome.accent}` }}
            >
              {departmentNumber(outcome)}
            </span>
            {/* At least 15rem wide, so on a narrow phone the title drops under the
                number instead of squeezing beside it ("straightened" is wider
                than what is left next to an outlined 05 at 320px). */}
            <div className="min-w-[15rem] flex-1 pb-3">
              <h2 className="text-4xl font-extralight tracking-tight text-lightText sm:text-6xl dark:text-darkText">{outcome.label}</h2>
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                {outcome.line}
              </p>
            </div>
          </header>
          <span aria-hidden className="mt-10 block h-px w-full bg-lightText/10 dark:bg-darkText/10" />

          {/* The outcome, priced, before the tools that make it: owners buy
              the result. The tools below are each sold on their own too. */}
          {pack && <Coupon pack={pack} />}

          {lead && <ItemSpread product={lead} />}

          {/* A shelf of one more is its own spread, mirrored, rather than a
              lone card in half a row. */}
          {rest.length === 1 && <ItemSpread product={rest[0]} reverse />}

          {rest.length > 1 && (
            <div className={`mt-20 ${EVEN_GRID} gap-x-10 gap-y-20`}>
              {rest.map((p, i) => (
                <div key={p.key} className={evenSpan(i, rest.length)}>
                  <ItemCard product={p} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

/** "Made to order" for a tool not running yet: sold honestly, built on the ask. */
function Status({ product }: { product: Product }) {
  if (product.built) return null;
  return <span className="text-sm text-lightTextMuted dark:text-darkTextMuted">Made to order</span>;
}

function Actions({ product }: { product: Product }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
      <GetIt orderKey={product.key} label={actionLabel(product)} />
      <Link href={`/tools/${product.slug}`} className={arrowTone("light")}>
        <ArrowMark size="sm" label="See it" />
      </Link>
    </div>
  );
}

/** The lead item: shot and story side by side, across the spread. */
function ItemSpread({ product, reverse = false }: { product: Product; reverse?: boolean }) {
  return (
    <article className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "mt-28" : "mt-16"}`}>
      <Link href={`/tools/${product.slug}`} aria-label={product.name} className={`block ${reverse ? "lg:order-2" : ""}`}>
        <ProductShot product={product} size="lg" />
      </Link>
      <div>
        <p className="text-sm tabular-nums text-lightTextMuted dark:text-darkTextMuted">No. {itemNumber(product)}</p>
        <h3 className="mt-2 text-5xl font-extralight tracking-tight text-lightText sm:text-6xl dark:text-darkText">
          <Link href={`/tools/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="mt-5 max-w-lg text-xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">{product.line}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <PriceTag product={product} />
          <Status product={product} />
        </div>
        {(product.usage || product.terms) && (
          <p className="mt-4 text-sm text-lightTextMuted dark:text-darkTextMuted">{product.usage ?? product.terms}</p>
        )}
        <Actions product={product} />
      </div>
    </article>
  );
}

/** Every other item on the shelf: shot above, story below. */
function ItemCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link href={`/tools/${product.slug}`} aria-label={product.name} className="block">
        <ProductShot product={product} size="sm" />
      </Link>
      <p className="mt-10 text-sm tabular-nums text-lightTextMuted dark:text-darkTextMuted">No. {itemNumber(product)}</p>
      <h3 className="mt-1.5 text-3xl font-extralight tracking-tight text-lightText dark:text-darkText">
        <Link href={`/tools/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="mt-3 flex-1 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">{product.line}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <PriceTag product={product} />
        <Status product={product} />
      </div>
      <Actions product={product} />
    </article>
  );
}

/**
 * A bundle, as a coupon clipped to the top of its department: a dashed edge
 * and the saving said as a number.
 */
export function Coupon({
  pack,
  named = false,
  current,
}: {
  pack: Pack;
  /** Title it with the outcome too, for a page where the outcome is not already the heading. */
  named?: boolean;
  /** The tool whose page this is, picked out among the rest. */
  current?: string;
}) {
  const tools = pack.products.map((k) => productByKey(k)!).filter(Boolean);
  const separately = tools.reduce((n, t) => n + (t.list ?? 0), 0);
  return (
    <div className="relative mt-14">
      <div className="relative rounded-[2rem] border-2 border-dashed border-lightText/25 bg-panelLight/70 p-8 sm:p-12 dark:border-darkText/25 dark:bg-white/[0.03]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-3xl font-extralight tracking-tight text-lightText sm:text-4xl dark:text-darkText">
              {named ? `${outcomeBy(pack.outcome).label}, ${packCount(pack).toLowerCase()} together` : `${packCount(pack)} together`}
            </p>
            <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">{pack.line}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li
                  key={t.key}
                  aria-current={t.key === current ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm text-lightText dark:text-darkText ${
                    t.key === current
                      ? "border-transparent bg-white font-medium shadow-sm ring-2 dark:bg-white/10"
                      : "border-lightText/15 dark:border-darkText/15"
                  }`}
                  style={t.key === current ? ({ ["--tw-ring-color" as string]: t.accent } as React.CSSProperties) : undefined}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: t.accent }} />
                  {t.name}
                  <span className="tabular-nums text-lightTextMuted dark:text-darkTextMuted">${t.list}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:border-l lg:border-dashed lg:border-lightText/20 lg:pl-10 lg:dark:border-darkText/20">
            {/* The deal without words: one at a time, struck, is exactly the
                chips' prices added up; the bundle price beside it. */}
            <p className="flex flex-wrap items-baseline gap-x-3">
              {separately > pack.list && (
                <span className="text-2xl font-extralight tabular-nums text-lightTextMuted line-through decoration-1 dark:text-darkTextMuted">
                  ${separately}
                </span>
              )}
              <span className="text-6xl font-extralight tabular-nums text-lightText dark:text-darkText">${pack.list}</span>
              <span className="text-lg font-light text-lightTextMuted dark:text-darkTextMuted">/ month</span>
            </p>
            <div className="mt-7">
              <GetIt orderKey={`pack:${pack.key}`} label={actionLabel(pack)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The close: the catalogue is only what owners have asked for so far. */
export function AskForIt() {
  return (
    <section data-dark-section className="relative overflow-hidden bg-[#0B0D12]">
      <LavaLamp scrim={0.55} />
      <div className="container relative mx-auto px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Don&apos;t see it? Ask for it.
          </h2>
          <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-white/80 sm:text-2xl">
            Every tool in here started as an owner telling me what slows their week down. Yours could be next.
          </p>
          <div className="mt-10">
            <NicheCtaButton
              from="tools"
              variant="arrow"
              tone="dark"
              message="Here is what slows my week down: "
              label="Tell me what to build"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The catalogue as structured data: every complete experience, then every tool, as an offer. */
export function catalogJsonLd(url: string) {
  const packs = PACKS.map((pack) => ({
    "@type": "Offer",
    url: `${url}#${pack.outcome}`,
    price: String(pack.list),
    priceCurrency: "USD",
    itemOffered: { "@type": "Service", name: packTitle(pack), description: pack.line },
  }));
  const tools = PRODUCTS.map((p) => ({
    "@type": "Offer",
    url: `${url}/${p.slug}`,
    ...(p.list != null ? { price: String(p.list), priceCurrency: "USD" } : {}),
    itemOffered: { "@type": "Service", name: p.name, description: p.line },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Queso Ventures Tools",
    url,
    itemListElement: [...packs, ...tools].map((offer, i) => ({ ...offer, position: i + 1 })),
  };
}
