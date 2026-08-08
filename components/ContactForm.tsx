"use client";

import { useState } from "react";
import { BUSINESS } from "./businessInfo";
import { trackContactSubmit } from "./analytics";
import CallLink from "./CallLink";

const inputClass =
  "w-full rounded-xl border border-transparent bg-black/[0.04] dark:bg-white/[0.06] px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/50 dark:placeholder:text-darkTextMuted/50 focus:outline-none focus:border-lightAccent/40 dark:focus:border-darkAccent/40 focus:bg-white dark:focus:bg-transparent transition-colors";

const labelClass = "text-sm font-medium text-lightText dark:text-darkText";

interface Props {
  /** Pre-written opening line, set by whichever CTA opened the form. */
  prefillMessage?: string;
  /** Fired after a successful send — the modal uses it to auto-close. */
  onSuccess?: () => void;
  submitLabel?: string;
}

export default function ContactForm({
  prefillMessage = "",
  onSuccess,
  submitLabel = "Send Message",
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
          business: formData.get("info"),
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
          Message sent
        </div>
        <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted">
          We&apos;ll get back to you within 24 hours. In a hurry? Call{" "}
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Your name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Email</label>
          <input
            name="contact"
            type="email"
            required
            placeholder="john@yourbusiness.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Your website{" "}
          <span className="text-lightTextMuted dark:text-darkTextMuted font-normal">
            (if you have one)
          </span>
        </label>
        <input
          name="info"
          type="text"
          placeholder="yourbusiness.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>What do you need help with?</label>
        <textarea
          name="message"
          required
          rows={4}
          defaultValue={prefillMessage}
          placeholder="Tell us about your business and what you're trying to achieve..."
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
