import GetIt from "components/tools/GetIt";
import { actionLabel, outcomeBy, packCount, productByKey, type Pack } from "components/catalog";

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
