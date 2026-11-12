"use client";

import { PiCaretRightBold } from "react-icons/pi";
import { openGetStarted } from "components/GetStarted";
import type { Placement } from "components/analytics";
import { OUTCOMES, packCount, packFor, productByKey, productsFor, type Outcome, type Product } from "components/catalog";

/**
 * Every tool, on one screen.
 *
 * Six things an owner wants, and under each the tools that do it: a name, a
 * price, and a tap. The tap opens the tool in the Get Started panel, where
 * the tool runs, says what you get, and is bought. Nothing here needs
 * reading twice, and nothing leads to a page you have to come back from.
 *
 * It stands in for the home page's deck (ToolDeck) when the visitor has
 * asked for reduced motion: the same tools, nothing pinned, nothing moving.
 *
 * Each row is a real link to the tool's address, so it works without
 * JavaScript and can be shared; with it, the click opens the panel instead.
 *
 *   detail: a line under each name, and the bundle price.
 */
export default function Lineup({ detail = false, from = "tools" }: { detail?: boolean; from?: Placement }) {
  return (
    <div className={`grid gap-x-14 gap-y-14 sm:grid-cols-2 ${detail ? "" : "lg:grid-cols-3"}`}>
      {OUTCOMES.map((o) => (
        <OutcomeBlock key={o.key} outcome={o} detail={detail} from={from} />
      ))}
    </div>
  );
}

function OutcomeBlock({ outcome, detail, from }: { outcome: Outcome; detail: boolean; from: Placement }) {
  const tools = productsFor(outcome.key);
  const pack = packFor(outcome.key);
  const separately = pack ? pack.products.reduce((n, k) => n + (productByKey(k)?.list ?? 0), 0) : 0;

  return (
    <section id={outcome.key} className="scroll-mt-28">
      <span aria-hidden className="block h-[3px] w-8 rounded-full" style={{ backgroundColor: outcome.accent }} />
      <h3 className="mt-4 text-2xl font-light tracking-tight text-lightText sm:text-[1.7rem] dark:text-darkText">{outcome.label}</h3>

      <ul className="mt-4 divide-y divide-lightText/10 border-y border-lightText/10 dark:divide-darkText/10 dark:border-darkText/10">
        {tools.map((t) => (
          <li key={t.key}>
            <Row tool={t} detail={detail} from={from} />
          </li>
        ))}
        {detail && pack && (
          <li>
            <a
              href="/#tools"
              onClick={(e) => {
                e.preventDefault();
                openGetStarted(`pack:${pack.key}`, from);
              }}
              className="group flex min-h-[3.25rem] items-center gap-3 py-3"
            >
              <span className="min-w-0 flex-1 text-[17px] font-normal text-lightText transition-colors group-hover:text-lightAccent dark:text-darkText dark:group-hover:text-darkAccent">
                {packCount(pack)} together
              </span>
              <span className="shrink-0 text-sm tabular-nums text-lightTextMuted line-through decoration-1 dark:text-darkTextMuted">
                ${separately}
              </span>
              <Price amount={pack.list} strong />
              <Caret />
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}

function Row({ tool, detail, from }: { tool: Product; detail: boolean; from: Placement }) {
  return (
    <a
      href={`/tools/${tool.slug}`}
      onClick={(e) => {
        // A new tab, a new window: let the link be a link.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openGetStarted(tool.key, from);
      }}
      className="group flex min-h-[3.25rem] items-center gap-3 py-3"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-light text-lightText transition-colors group-hover:text-lightAccent dark:text-darkText dark:group-hover:text-darkAccent">
          {tool.name}
        </span>
        {detail && <span className="mt-0.5 block text-sm font-light leading-snug text-lightTextMuted dark:text-darkTextMuted">{tool.line}</span>}
      </span>
      {tool.list != null && <Price amount={tool.list} />}
      <Caret />
    </a>
  );
}

function Price({ amount, strong = false }: { amount: number; strong?: boolean }) {
  return (
    <span className={`shrink-0 tabular-nums ${strong ? "text-lightText dark:text-darkText" : "text-lightTextMuted dark:text-darkTextMuted"}`}>
      <span className={strong ? "text-[17px] font-normal" : "text-[15px]"}>${amount}</span>
      <span className="text-xs opacity-70"> /mo</span>
    </span>
  );
}

function Caret() {
  return (
    <PiCaretRightBold
      aria-hidden
      className="h-3.5 w-3.5 shrink-0 text-lightTextMuted/60 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-darkTextMuted/60"
    />
  );
}
