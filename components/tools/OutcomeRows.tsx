"use client";

import Link from "next/link";
import { useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { actionLabel, packCount, packFor, productsFor, type Outcome, type Product } from "components/catalog";

/**
 * One outcome as a short list: its bundle as a single row, the tools folded
 * inside it.
 *
 * The bundle is named for the outcome ("Get people calling"), never "the
 * complete experience" six times over. The deal is said without words: the
 * one-at-a-time total struck through beside the bundle price, and when the
 * row opens, the tools inside with their own prices, which add up to exactly
 * the struck number. Each tool is still a row you can pick on its own.
 *
 * A tool that is not in its outcome's bundle (Outbound Calls, billed by the
 * minute) gets its own row after it, so the folded tools always sum right.
 *
 *   menu:  Get Started: one folded row per outcome, named for the outcome,
 *          its tools listed under the name until it opens.
 *   shelf: the home page, which has the room: the bundle shown open, as a
 *          receipt with the tools, a rule, and the total.
 */
export default function OutcomeRows({
  outcome,
  variant,
  onTool,
  onPack,
}: {
  outcome: Outcome;
  variant: "menu" | "shelf";
  /** Picks a tool. Without it, tools are links to their pages. */
  onTool?: (key: string) => void;
  onPack: (orderKey: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tools = productsFor(outcome.key);
  const pack = packFor(outcome.key);
  const inside = pack ? tools.filter((t) => pack.products.includes(t.key)) : [];
  const outside = pack ? tools.filter((t) => !pack.products.includes(t.key)) : tools;
  const separately = inside.reduce((n, t) => n + (t.list ?? 0), 0);

  const rowText = "text-[17px] font-light transition-colors group-hover:text-lightAccent dark:group-hover:text-darkAccent";
  const lone = !pack && outside.length === 1;

  // On the home page there is room to show the bundle open, as a receipt:
  // each tool and its price, a dashed rule, then the total struck beside the
  // one price for all of them. Nothing folded, nothing to decode.
  if (variant === "shelf" && pack) {
    return (
      <div>
        <ul className="divide-y divide-lightText/10 dark:divide-darkText/10">
          {inside.map((t) => (
            <li key={t.key}>
              <ToolRow tool={t} onTool={onTool} accent={outcome.accent} />
            </li>
          ))}
        </ul>
        <div className="border-t-2 border-dashed border-lightText/25 py-4 dark:border-darkText/25">
          <div className="flex items-baseline gap-3">
            <span className="flex-1 text-[17px] font-normal text-lightText dark:text-darkText">{packCount(pack)} together</span>
            <span className="shrink-0 text-sm tabular-nums text-lightTextMuted line-through decoration-1 dark:text-darkTextMuted">${separately}</span>
            <span className="shrink-0 tabular-nums text-lightText dark:text-darkText">
              <span className="text-[17px] font-normal">${pack.list}</span>
              <span className="text-xs text-lightTextMuted dark:text-darkTextMuted"> /mo</span>
            </span>
            <span aria-hidden className="w-3.5 shrink-0" />
          </div>
          <button
            type="button"
            onClick={() => onPack(`pack:${pack.key}`)}
            className="mt-3 inline-flex items-center rounded-full bg-lightButton px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
          >
            {actionLabel(pack)}
          </button>
        </div>
        {outside.length > 0 && (
          <ul className="divide-y divide-lightText/10 border-t border-lightText/10 dark:divide-darkText/10 dark:border-darkText/10">
            {outside.map((t) => (
              <li key={t.key}>
                <ToolRow tool={t} onTool={onTool} accent={outcome.accent} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-lightText/10 dark:divide-darkText/10">
      {pack && (
        <li>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="group flex w-full items-center gap-3 py-3 text-left"
          >
            <span aria-hidden className="h-[3px] w-3 shrink-0 rounded-full" style={{ backgroundColor: outcome.accent }} />
            <span className="min-w-0 flex-1">
              <span className={`block ${rowText} font-normal`}>{outcome.label}</span>
              {(
                <span
                  className={`block truncate text-sm text-lightTextMuted transition-opacity duration-300 dark:text-darkTextMuted ${
                    open ? "h-0 opacity-0" : "opacity-100"
                  }`}
                >
                  {inside.map((t) => t.name).join(", ")}
                </span>
              )}
            </span>
            {/* The struck total sits over the price rather than beside it, which
                leaves the outcome's name room on a narrow phone. */}
            <span className="flex shrink-0 flex-col items-end leading-tight tabular-nums">
              <span className="text-xs text-lightTextMuted line-through decoration-1 dark:text-darkTextMuted">${separately}</span>
              <span>
                <span className="text-[17px] font-normal">${pack.list}</span>
                <span className="text-xs text-lightTextMuted dark:text-darkTextMuted"> /mo</span>
              </span>
            </span>
            <PiCaretDownBold
              aria-hidden
              className={`h-3.5 w-3.5 shrink-0 text-lightTextMuted transition-transform duration-300 dark:text-darkTextMuted ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* The tools inside, indented under a rule in the outcome's colour. */}
          <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className="mb-4 ml-[5px] border-l-2 pl-5" style={{ borderColor: `${outcome.accent}66` }}>
                <ul>
                  {inside.map((t) => (
                    <li key={t.key}>
                      <ToolRow tool={t} onTool={onTool} small />
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onPack(`pack:${pack.key}`)}
                  tabIndex={open ? 0 : -1}
                  className="mt-3 inline-flex items-center rounded-full bg-lightButton px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
                >
                  {actionLabel(pack)}
                </button>
              </div>
            </div>
          </div>
        </li>
      )}

      {outside.map((t) => (
        <li key={t.key}>
          {lone && variant === "menu" ? (
            // The only tool on its shelf: the row is the outcome, like a bundle row.
            <ToolRow tool={t} onTool={onTool} label={outcome.label} sub={t.name} accent={outcome.accent} />
          ) : (
            <ToolRow tool={t} onTool={onTool} accent={outcome.accent} />
          )}
        </li>
      ))}
    </ul>
  );
}

function ToolRow({
  tool,
  onTool,
  small = false,
  label,
  sub,
  accent,
}: {
  tool: Product;
  onTool?: (key: string) => void;
  small?: boolean;
  label?: string;
  sub?: string;
  accent?: string;
}) {
  const body = (
    <>
      {accent && <span aria-hidden className="h-[3px] w-3 shrink-0 self-center rounded-full" style={{ backgroundColor: accent }} />}
      <span className="min-w-0 flex-1">
        <span
          className={`block font-light transition-colors group-hover:text-lightAccent dark:group-hover:text-darkAccent ${
            small ? "text-[15px]" : "text-[17px]"
          } ${label ? "font-normal" : ""}`}
        >
          {label ?? tool.name}
        </span>
        {sub && <span className="block text-sm text-lightTextMuted dark:text-darkTextMuted">{sub}</span>}
      </span>
      {tool.list != null && (
        <span className="shrink-0 tabular-nums text-lightTextMuted dark:text-darkTextMuted">
          <span className={small ? "text-sm" : "text-[15px]"}>${tool.list}</span>
          <span className="text-xs opacity-70"> /mo</span>
        </span>
      )}
      {/* Room for the caret column, so every price lines up. */}
      <span aria-hidden className="w-3.5 shrink-0" />
    </>
  );
  const cls = `group flex w-full items-baseline gap-3 text-left ${small ? "py-2" : "py-3"}`;
  return onTool ? (
    <button type="button" onClick={() => onTool(tool.key)} className={cls}>
      {body}
    </button>
  ) : (
    <Link href={`/tools/${tool.slug}`} className={cls}>
      {body}
    </Link>
  );
}
