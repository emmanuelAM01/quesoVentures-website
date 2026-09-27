"use client";

import { useState } from "react";
import { BUSINESS } from "./businessInfo";
import { trackContactSubmit } from "./analytics";
import CopyEmail from "./CopyEmail";
import BusinessPicker from "./BusinessPicker";
import { formatContactInput } from "./phone";
import ArrowMark, { arrowTone } from "./ArrowMark";
import { PiCaretRightBold } from "react-icons/pi";

const inputClass =
  "w-full rounded-xl border border-transparent bg-black/[0.04] dark:bg-white/[0.06] px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/50 dark:placeholder:text-darkTextMuted/50 focus:outline-none focus:border-lightAccent/40 dark:focus:border-darkAccent/40 focus:bg-white dark:focus:bg-transparent transition-colors";

const labelClass = "text-sm font-medium text-lightText dark:text-darkText";

interface Props {
  /** Pre-written opening line, set by whichever CTA opened the form. */
  prefillMessage?: string;
  /** Set when the hero demo already identified the business. */
  prefillBusiness?: string;
  /** The same pick in pieces, so a prefill submits what a fresh pick would. */
  prefillBusinessName?: string;
  prefillBusinessAddress?: string;
  prefillPlaceId?: string;
  /**
   * Closes the surface this form is sitting in, when there is one.
   *
   * Replaces an onSuccess that existed only to start a five second timer. The
   * success panel is the one place the form tells somebody what happens next —
   * whether a report is already on its way or whether I am replying by hand —
   * and it was deleting itself while they were still reading it. Nothing on a
   * confirmation should be on a countdown.
   *
   * Absent on /contact, which is a page rather than a modal and has nothing to
   * close, so the button simply is not rendered there.
   */
  onClose?: () => void;
  submitLabel?: string;
}

export default function ContactForm({
  prefillMessage = "",
  prefillBusiness = "",
  prefillBusinessName = "",
  prefillBusinessAddress = "",
  prefillPlaceId = "",
  onClose,
  submitLabel = "Send My Report",
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  // Whether a confirmation actually reached them, which decides which promise
  // the success panel is allowed to make. A phone-only lead, or a portal that
  // could not be reached, gets the honest "I'll be in touch" instead.
  const [acknowledged, setAcknowledged] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          placeId: formData.get("placeId"),
          // Split at the source rather than unpicked later. `name` is now the
          // business name on its own; this is the rest of what was chosen.
          businessAddress: formData.get("businessAddress"),
          message: formData.get("message"),
          // Which page the form was opened from, so a lead arrives saying
          // where it came from rather than just when.
          sourcePage: window.location.pathname,
          website: formData.get("website"), // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        trackContactSubmit("error");
        setError(data?.error || "Something went wrong. Try again.");
        return;
      }

      setAcknowledged(!!data?.acknowledged);
      setStatus("success");
      trackContactSubmit("success");
      form.reset();
    } catch {
      setStatus("error");
      trackContactSubmit("error");
      setError("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lightAccent/10 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent text-2xl">
          ✓
        </div>
        <div className="text-2xl font-semibold text-lightText dark:text-darkText mb-2">
          {acknowledged ? "Check your email" : "Message received"}
        </div>
        {/* Two paragraphs, not one.
            These were adjacent lines in a single <p>, and JSX collapses the
            newline between them into a space — so they rendered as one run-on
            sentence that went from "it is already in your inbox" straight into
            "if it never arrives", which are opposite messages. They are also
            doing different jobs: the first is reassurance, the second is the
            escape hatch, and the second only matters to someone the first one
            failed. */}
        {acknowledged ? (
          <div className="space-y-3 text-base font-light text-lightTextMuted dark:text-darkTextMuted">
            <p>
              Check your email, you should have gotten something. High chance your report is already in your inbox too. (Be sure to check spam/junk)
            </p>
            <p>
              If nothing shows up for over 24 hours, send an email here:{" "}
              <CopyEmail />
            </p>
          </div>
        ) : (
          /* The portal did not take this one, so nothing has been sent to them
             and nothing is coming automatically. That makes this the branch
             where a way to reach me matters most, and it was the one branch
             that had none. */
          <div className="space-y-3 text-base font-light text-lightTextMuted dark:text-darkTextMuted">
            <p>Thank you for reaching out and wanting to be part of the Queso Network.</p>
            <p>
              I will get back to you shortly. If you would rather not wait:{" "}
              <CopyEmail />
            </p>
          </div>
        )}
        {onClose && (
          <button type="button" onClick={onClose} className={`${arrowTone("light")} mt-8`}>
            <ArrowMark label="Close" />
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* honeypot */}
      <div className="hidden">
        <label>Website</label>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Two required fields, no essay.
          The old form asked for name, email, and a required paragraph
          describing the problem — which is the thing they are hiring someone
          to work out, typed on a phone between jobs. The offer is a free
          report, and the only thing that actually needs is enough to find the
          business and a way to reply. */}
      <BusinessPicker
        inputClass={inputClass}
        labelClass={labelClass}
        initialName={prefillBusiness}
        initialPlaceId={prefillPlaceId}
        initialBusinessName={prefillBusinessName}
        initialBusinessAddress={prefillBusinessAddress}
      />

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Email or phone</label>
        <input
          name="contact"
          type="text"
          required
          inputMode="email"
          placeholder="you@yourbusiness.com or (281) 555-0100"
          className={inputClass}
          // Formatted in place rather than through state: the field is
          // uncontrolled and read with FormData on submit, and adding state
          // for a cosmetic shape would be the tail wagging the dog. The
          // formatter refuses to touch anything holding a letter or an '@',
          // so an address typed here is never mangled on its way in.
          onChange={(e) => {
            e.target.value = formatContactInput(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Anything I should know?{" "}
          <span className="font-normal text-lightTextMuted dark:text-darkTextMuted">
            (optional)
          </span>
        </label>
        <textarea
          name="message"
          rows={3}
          defaultValue={prefillMessage}
          placeholder="Skip this if you'd rather just talk."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/*
        The one filled button on the site: a form needs its way forward to be
        unmistakable. It still speaks the house language, spaced capitals and
        a caret that slides through on hover like the circled arrows do.
      */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-lightButton px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-lightButtonHover disabled:cursor-not-allowed disabled:opacity-60 dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
      >
        {status === "sending" ? "Sending" : submitLabel}
        <span aria-hidden className="relative h-4 w-4 overflow-hidden">
          <PiCaretRightBold className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5" />
          <PiCaretRightBold className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
        </span>
      </button>
    </form>
  );
}
