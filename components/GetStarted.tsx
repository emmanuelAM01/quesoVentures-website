"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiArrowLeftBold, PiArrowRightBold, PiArrowUpRightBold, PiCaretDownBold, PiCaretRightBold, PiXBold } from "react-icons/pi";
import ProductShot from "components/tools/ProductShot";
import ContactForm from "components/ContactForm";
import { trackCtaClick, type Placement } from "components/analytics";
import { houseGradient } from "components/livery";
import {
  OUTCOMES,
  hasFullPage,
  orderable,
  packCount,
  packFor,
  priceLabel,
  productByKey,
  productsFor,
  type Orderable,
} from "components/catalog";

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

/**
 * Three screens, each with one job. The list: pick a tool. The tool: see it,
 * and one button. The form: say who you are. `asking` is the form for a
 * tool; "ask" is the form with no tool, for somebody who is not sure yet.
 */
type View = { kind: "menu" } | { kind: "tool"; key: string; asking?: boolean } | { kind: "ask" };

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

  // Going to another page closes it, so a link inside the panel lands on the
  // page rather than under the panel.
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setOpen(false);
  }, [pathname]);

  // Scrolled back to the top whenever what it shows changes.
  useEffect(() => {
    panelRef.current?.scrollTo(0, 0);
  }, [view, open]);

  const tool = view.kind === "tool" ? orderable(view.key) : undefined;
  const asking = view.kind === "tool" && view.asking;

  // One step back, and the button says where that is.
  const back =
    view.kind === "menu"
      ? null
      : asking && tool
        ? { label: tool.name, to: { kind: "tool", key: view.key } as View }
        : { label: "Every tool", to: { kind: "menu" } as View };

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
          {back ? (
            <button
              type="button"
              onClick={() => setView(back.to)}
              className="inline-flex items-center gap-2 text-sm font-medium text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
            >
              <PiArrowLeftBold aria-hidden className="h-3.5 w-3.5" />
              {back.label}
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

        <div
          key={view.kind === "tool" ? `${view.key}:${asking ? "ask" : "see"}` : view.kind}
          className="animate-fadeIn px-6 pb-8 pt-4 sm:px-7"
        >
          {view.kind === "ask" ? (
            <AskStep business={business} onClose={close} />
          ) : tool && asking ? (
            <AskStep tool={tool} business={business} onClose={close} />
          ) : tool ? (
            <ToolStep tool={tool} onAsk={() => setView({ kind: "tool", key: tool.key, asking: true })} onLeave={close} />
          ) : (
            <Menu onPick={(key) => setView({ kind: "tool", key })} onAsk={() => setView({ kind: "ask" })} />
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Every tool, as one flat list under what it is for: a name, a price, a tap.
 * A need with more than one tool ends on its bundle, the same row with the
 * one at a time total struck beside it.
 *
 * It used to be six folded rows named for the needs, each priced as a bundle,
 * with the tools hidden inside until you opened one. Nobody tapping Get
 * Started was looking for a row to unfold. This is also the whole catalogue
 * now; there is no Tools page beside it.
 */
function Menu({ onPick, onAsk }: { onPick: (key: string) => void; onAsk: () => void }) {
  const row = "group flex min-h-[3rem] w-full items-center gap-3 py-2.5 text-left";
  const name = "min-w-0 flex-1 text-[17px] transition-colors group-hover:text-lightAccent dark:group-hover:text-darkAccent";
  const caret = (
    <PiCaretRightBold aria-hidden className="h-3.5 w-3.5 shrink-0 text-lightTextMuted/60 dark:text-darkTextMuted/60" />
  );
  const price = (n: number) => (
    <span className="shrink-0 tabular-nums text-lightTextMuted dark:text-darkTextMuted">
      <span className="text-[15px]">${n}</span>
      <span className="text-xs opacity-70"> /mo</span>
    </span>
  );

  return (
    <div className="space-y-7 pt-2">
      {OUTCOMES.map((o) => {
        const pack = packFor(o.key);
        const separately = pack ? pack.products.reduce((n, k) => n + (productByKey(k)?.list ?? 0), 0) : 0;
        return (
          <section key={o.key}>
            <p className="flex items-center gap-2.5 text-sm text-lightTextMuted dark:text-darkTextMuted">
              <span aria-hidden className="h-[3px] w-3 rounded-full" style={{ backgroundColor: o.accent }} />
              {o.label}
            </p>
            <ul className="mt-1.5 divide-y divide-lightText/10 border-y border-lightText/10 dark:divide-darkText/10 dark:border-darkText/10">
              {productsFor(o.key).map((t) => (
                <li key={t.key}>
                  <button type="button" onClick={() => onPick(t.key)} className={row}>
                    <span className={`${name} font-light`}>{t.name}</span>
                    {t.list != null && price(t.list)}
                    {caret}
                  </button>
                </li>
              ))}
              {pack && (
                <li>
                  <button type="button" onClick={() => onPick(`pack:${pack.key}`)} className={row}>
                    <span className={`${name} font-normal`}>{packCount(pack)} together</span>
                    <span className="shrink-0 text-sm tabular-nums text-lightTextMuted line-through decoration-1 dark:text-darkTextMuted">
                      ${separately}
                    </span>
                    {price(pack.list)}
                    {caret}
                  </button>
                </li>
              )}
            </ul>
          </section>
        );
      })}

      {/* The way out for anybody who read the list and is still not sure. */}
      <button
        type="button"
        onClick={onAsk}
        className="group flex w-full items-center gap-3 rounded-2xl bg-black/[0.04] px-5 py-4 text-left transition-colors hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[17px] font-normal">Don&apos;t see it? Ask for it.</span>
          <span className="block text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
            Tell me what slows your week down.
          </span>
        </span>
        <PiArrowRightBold aria-hidden className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

const primaryButton =
  "group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-lightButton px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover";

/**
 * One tool, picked: the tool running, what it is, what it costs, and one
 * button, all before any scrolling. What you get and the questions are under
 * the button for anybody who wants them.
 *
 * The button is the only decision on the screen, and it says what happens:
 * Subscribe goes to checkout, Get my free report and Ask about it open the
 * form on its own screen. The form used to sit at the foot of this one, under
 * everything else, where it was easy to miss and easier to misread.
 */
function ToolStep({ tool, onAsk, onLeave }: { tool: Orderable; onAsk: () => void; onLeave: () => void }) {
  const { isWebsite, product } = tool;
  const smallPrint = product?.usage ?? product?.terms ?? tool.usage;

  return (
    <div>
      {product && (
        <div className="mb-6 mt-2">
          <ProductShot product={product} size="md" />
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <p className="text-3xl font-light tracking-tight">{tool.name}</p>
        <span aria-hidden className="h-[3px] w-10 shrink-0 rounded-full" style={{ backgroundColor: tool.accent }} />
      </div>
      <p className="mt-2 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">{tool.line}</p>
      {tool.contents && <p className="mt-3 text-base font-light text-lightText dark:text-darkText">{tool.contents}.</p>}

      <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-light tabular-nums">{priceLabel(tool)}</span>
        {product && !product.built && <span className="text-sm text-lightTextMuted dark:text-darkTextMuted">Made to order</span>}
      </p>
      {smallPrint && <p className="mt-1 text-sm text-lightTextMuted dark:text-darkTextMuted">{smallPrint}</p>}

      {tool.buyUrl ? (
        <a href={tool.buyUrl} className={primaryButton}>
          Subscribe
          <PiArrowUpRightBold aria-hidden className="h-4 w-4" />
        </a>
      ) : (
        <button type="button" onClick={onAsk} className={primaryButton}>
          {isWebsite ? "Get my free report" : "Ask about it"}
          <PiArrowRightBold aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      )}
      {/* A question before paying is still one tap away. */}
      {tool.buyUrl && (
        <button
          type="button"
          onClick={onAsk}
          className="mt-3 w-full py-2 text-center text-sm font-medium text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
        >
          Ask a question first
        </button>
      )}

      {product && (
        <ul className="mt-7 space-y-3 border-t border-lightText/10 pt-6 dark:border-darkText/10">
          {product.points.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] font-light leading-relaxed">
              <span aria-hidden className="mt-[0.6em] h-[3px] w-3 shrink-0 rounded-full" style={{ backgroundColor: tool.accent }} />
              {point}
            </li>
          ))}
        </ul>
      )}

      {product && product.questions.length > 0 && (
        <div className="mt-8 border-t border-lightText/10 dark:border-darkText/10">
          {product.questions.map((q) => (
            <details key={q.q} className="group border-b border-lightText/10 dark:border-darkText/10">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-[15px] font-normal [&::-webkit-details-marker]:hidden">
                {q.q}
                <PiCaretDownBold aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-lightTextMuted transition-transform duration-300 group-open:rotate-180 dark:text-darkTextMuted" />
              </summary>
              <p className="pb-4 text-[15px] font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">{q.a}</p>
            </details>
          ))}
        </div>
      )}

      {product && hasFullPage(product) && (
        <Link
          href={`/tools/${product.slug}`}
          onClick={onLeave}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lightTextMuted transition-colors hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
        >
          The full page
          <PiArrowRightBold aria-hidden className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

/**
 * The form, on a screen of its own: what you are asking for as the heading,
 * one line on what comes back, then three fields. With a tool, the tool rides
 * along as a line at the top of the form (see ContactForm's `topic`); without
 * one it is the open ask from the foot of the list.
 */
function AskStep({ tool, business, onClose }: { tool?: Orderable; business?: StartedBusiness; onClose: () => void }) {
  const isWebsite = tool?.isWebsite ?? false;
  return (
    <div>
      <p className="text-3xl font-light tracking-tight">
        {isWebsite ? "Your free report" : tool ? `Ask about ${tool.name}` : "Ask for it"}
      </p>
      <p className="mb-6 mt-2 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
        {isWebsite
          ? "Where you show up on Google, on Maps, and in AI answers. Then we talk website."
          : tool
            ? "Tell me where to reach you. I reply with how it would work for your business, and a free report on where you show up today."
            : "Tell me what slows your week down. Every tool here started that way."}
      </p>
      <ContactForm
        topic={tool && !isWebsite ? (tool.contents ? `${tool.name} (${tool.contents})` : tool.name) : undefined}
        prefillBusiness={business?.label}
        prefillBusinessName={business?.name}
        prefillBusinessAddress={business?.address}
        prefillPlaceId={business?.placeId}
        submitLabel={isWebsite ? "Send My Report" : "Send"}
        onClose={onClose}
      />
    </div>
  );
}
