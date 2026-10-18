"use client";

import { useEffect, useRef, useState } from "react";
import { PiArrowLeftBold, PiArrowUpRightBold, PiXBold } from "react-icons/pi";
import ContactForm from "components/ContactForm";
import OutcomeRows from "components/tools/OutcomeRows";
import { trackCtaClick, type Placement } from "components/analytics";
import { houseGradient } from "components/livery";
import { OUTCOMES, orderable, priceLabel, type Orderable } from "components/catalog";

/**
 * Get Started: the one button in the bar, and the one way anything on the
 * site is bought.
 *
 * It opens the catalog as a short order list. Pick the website and the panel
 * turns into the free report form, because the website starts with a look at
 * where you show up, not a checkout. Pick any other tool and it goes to its
 * Stripe checkout; until that tool has one, the same report form opens with
 * the tool named, so the ask still lands as a lead with a report attached.
 *
 * Every Get it button on the site opens this same panel at its tool, by
 * dispatching `getstarted:open` with the tool's key (see openGetStarted). One
 * buying flow, so a price or a checkout link can never differ between pages.
 *
 * Under the bar on a desktop, a full screen sheet on a phone.
 */

type View = { kind: "menu" } | { kind: "tool"; key: string };

/**
 * A business already named somewhere on the page (the home hero's search).
 * It rides along to whichever tool gets picked, so nobody types it twice.
 */
export type StartedBusiness = { label: string; name: string; address: string; placeId: string };

type OpenDetail = { key?: string; business?: StartedBusiness };

/** Open the panel from anywhere, at a tool or at the list. */
export function openGetStarted(key?: string, from: Placement = "get_started", business?: StartedBusiness) {
  trackCtaClick(from);
  window.dispatchEvent(new CustomEvent<OpenDetail>("getstarted:open", { detail: { key, business } }));
}

/**
 * The button. Anywhere on the site; it only asks the one panel to open.
 * Clicking it again while the panel is open lands on the dim behind the panel,
 * which closes it.
 */
export function GetStartedButton({ from = "header", label = "Get Started" }: { from?: Placement; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => openGetStarted(undefined, from)}
      aria-haspopup="dialog"
      className="inline-flex items-center whitespace-nowrap rounded-full bg-lightButton px-4 py-2 text-[15px] font-semibold text-lightBG transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
    >
      {label}
    </button>
  );
}

/** The panel. Mounted once, in the root layout. */
export default function GetStartedPanel() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>({ kind: "menu" });
  const [business, setBusiness] = useState<StartedBusiness | undefined>();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { key, business: named } = (e as CustomEvent<OpenDetail>).detail ?? {};
      // A plain Get Started keeps a name picked earlier in the visit.
      if (named) setBusiness(named);
      setView(key && orderable(key) ? { kind: "tool", key } : { kind: "menu" });
      setOpen(true);
    };
    window.addEventListener("getstarted:open", onOpen as EventListener);
    return () => window.removeEventListener("getstarted:open", onOpen as EventListener);
  }, []);

  // Escape closes; while open, the page underneath does not scroll (same
  // listener approach as the phone menu, for the same reason: an overflow
  // lock on the root breaks the sticky bar).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const block = (e: Event) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("wheel", block, { passive: false });
    document.addEventListener("touchmove", block, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("wheel", block);
      document.removeEventListener("touchmove", block);
    };
  }, [open]);

  const close = () => setOpen(false);
  const tool = view.kind === "tool" ? orderable(view.key) : undefined;

  return (
    <>
      {/* The dim behind the panel. A click on it closes. */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Get started"
        className={[
          "fixed z-[61] overflow-y-auto overscroll-contain bg-panelLight text-lightText shadow-2xl shadow-black/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-panelDark dark:text-darkText dark:shadow-black/50",
          // A sheet on a phone, a panel under the bar from lg up.
          "inset-x-0 bottom-0 top-0 lg:inset-auto lg:right-[max(1rem,calc((100vw-1536px)/2+1rem))] lg:top-[5.25rem] lg:max-h-[calc(100dvh-6.5rem)] lg:w-[31rem] lg:rounded-3xl lg:border lg:border-lightBorder lg:dark:border-darkBorder",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <span aria-hidden className="absolute inset-x-8 top-0 h-[2px] rounded-full" style={{ backgroundImage: houseGradient() }} />

        <div className="flex items-center justify-between px-6 pt-6 sm:px-7">
          {view.kind === "tool" ? (
            <button
              type="button"
              onClick={() => setView({ kind: "menu" })}
              className="inline-flex items-center gap-2 text-sm font-medium text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
            >
              <PiArrowLeftBold aria-hidden className="h-3.5 w-3.5" />
              Every tool
            </button>
          ) : (
            <p className="text-2xl font-light tracking-tight">{business ? `What does ${business.name} need?` : "What do you need?"}</p>
          )}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-lightTextMuted transition-colors hover:bg-black/5 hover:text-lightText dark:text-darkTextMuted dark:hover:bg-white/10 dark:hover:text-darkText"
          >
            <PiXBold aria-hidden className="h-4 w-4" />
          </button>
        </div>

        <div key={view.kind === "tool" ? view.key : "menu"} className="animate-fadeIn px-6 pb-8 pt-4 sm:px-7">
          {tool ? <ToolStep tool={tool} business={business} /> : <Menu onPick={(key) => setView({ kind: "tool", key })} />}
        </div>
      </div>
    </>
  );
}

/**
 * The catalog as an order list, one outcome to a row. Each bundle is a
 * single row named for its outcome; it opens to the tools inside, each of
 * which can be picked on its own (see OutcomeRows).
 */
function Menu({ onPick }: { onPick: (key: string) => void }) {
  return (
    <div className="divide-y divide-lightText/10 border-y border-lightText/10 dark:divide-darkText/10 dark:border-darkText/10">
      {OUTCOMES.map((o) => (
        <OutcomeRows key={o.key} outcome={o} variant="menu" onTool={onPick} onPack={onPick} />
      ))}
    </div>
  );
}

/**
 * One tool, picked. The website goes to the free report; a tool with a
 * checkout link goes to Stripe; anything else asks for the business and a way
 * to reach them, with the tool named in the message.
 */
function ToolStep({ tool, business }: { tool: Orderable; business?: StartedBusiness }) {
  const { isWebsite } = tool;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-3xl font-light tracking-tight">
          {isWebsite ? "Your free report" : tool.buyUrl || tool.contents ? tool.name : `Want ${tool.name}?`}
        </p>
        <span aria-hidden className="h-[3px] w-10 shrink-0 rounded-full" style={{ backgroundColor: tool.accent }} />
      </div>
      <p className="mt-2 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
        {isWebsite
          ? "Where you show up on Google, on Maps, and in AI answers. Then we talk website."
          : tool.contents && !tool.buyUrl
            ? `${tool.contents}, ${priceLabel(tool).replace(" / ", " a ")}. Leave your business and how to reach you.`
            : tool.buyUrl
            ? tool.line
            : "Leave your business and how to reach you. Your free report comes with it."}
      </p>

      {tool.buyUrl ? (
        <div className="mt-6">
          <p className="text-2xl font-light tabular-nums">{priceLabel(tool)}</p>
          {tool.usage && <p className="mt-1 text-sm text-lightTextMuted dark:text-darkTextMuted">{tool.usage}</p>}
          <a
            href={tool.buyUrl}
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-lightButton px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
          >
            Subscribe
            <PiArrowUpRightBold aria-hidden className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div className="mt-6">
          <ContactForm
            prefillMessage={isWebsite ? "" : tool.contents ? `I want ${tool.name}, all of it: ${tool.contents}.` : `I want ${tool.name}.`}
            prefillBusiness={business?.label}
            prefillBusinessName={business?.name}
            prefillBusinessAddress={business?.address}
            prefillPlaceId={business?.placeId}
            submitLabel={isWebsite ? "Send My Report" : "Inquire"}
          />
        </div>
      )}
    </div>
  );
}
