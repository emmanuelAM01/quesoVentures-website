"use client";

import { useState } from "react";
import { BUSINESS } from "./businessInfo";
import { trackContactSubmit } from "./analytics";
import CallLink from "./CallLink";
import BusinessPicker from "./BusinessPicker";

const inputClass =
  "w-full rounded-xl border border-transparent bg-black/[0.04] dark:bg-white/[0.06] px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/50 dark:placeholder:text-darkTextMuted/50 focus:outline-none focus:border-lightAccent/40 dark:focus:border-darkAccent/40 focus:bg-white dark:focus:bg-transparent transition-colors";

const labelClass = "text-sm font-medium text-lightText dark:text-darkText";

interface Props {
  /** Pre-written opening line, set by whichever CTA opened the form. */
  prefillMessage?: string;
  /** Set when the hero demo already identified the business. */
  prefillBusiness?: string;
  prefillPlaceId?: string;
  /** Fired after a successful send — the modal uses it to auto-close. */
  onSuccess?: () => void;
  submitLabel?: string;
}

export default function ContactForm({
  prefillMessage = "",
  prefillBusiness = "",
  prefillPlaceId = "",
  onSuccess,
  submitLabel = "Send My Report",
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

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
          message: formData.get("message"),
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

      setStatus("success");
      trackContactSubmit("success");
      form.reset();
      onSuccess?.();
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
          Got it
        </div>
        <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted">
          Your report is on the way, within 24 hours. In a hurry? Call{" "}
          <CallLink
            from="contact_modal"
            className="font-semibold text-lightButton dark:text-darkButton"
          />
          .
        </p>
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 w-full inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-8 py-4 text-lg font-semibold text-lightBG dark:text-darkBG transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
