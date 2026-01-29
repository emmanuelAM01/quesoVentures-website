"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function ContactModal() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const close = () => {
    window.dispatchEvent(new CustomEvent("modal:close", { detail: { id: "contact-popup" } }));
  };

  const [prefillMessage, setPrefillMessage] = useState("");

useEffect(() => {
  const onPrefill = (e: Event) => {
    const ce = e as CustomEvent<{ message?: string }>;
    if (ce.detail?.message) setPrefillMessage(ce.detail.message);
  };

  window.addEventListener("contact:prefill", onPrefill as EventListener);
  return () => window.removeEventListener("contact:prefill", onPrefill as EventListener);
}, []);


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
          message: formData.get("message"),
          website: formData.get("website"), // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data?.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setTimeout(close, 5000);
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <Modal id="contact-popup" title="Contact">
      {status === "success" ? (
        <div className="text-center py-6">
          <div className="text-xl font-semibold text-lightText dark:text-darkText">
            Message sent
          </div>
          <p className="mt-2 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
            I’ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* honeypot */}
          <div className="hidden">
            <label>Website</label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-lightText dark:text-darkText">Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-3 py-2 text-sm text-lightText dark:text-darkText placeholder:text-lightTextMuted dark:placeholder:text-darkTextMuted focus:outline-none focus:ring-2 focus:ring-button/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-lightText dark:text-darkText">
              Email
            </label>
            <input
              name="contact"
              type="text"
              required
              placeholder="you@email.com"
              className="w-full rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-3 py-2 text-sm text-lightText dark:text-darkText placeholder:text-lightTextMuted dark:placeholder:text-darkTextMuted focus:outline-none focus:ring-2 focus:ring-button/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-lightText dark:text-darkText">
              What do you need help with
            </label>
            <textarea
            name="message"
            required
            rows={3}
            defaultValue={prefillMessage}
            placeholder="A website, redesign, updates, or something else"
              className="w-full resize-none rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-3 py-2 text-sm text-lightText dark:text-darkText placeholder:text-lightTextMuted dark:placeholder:text-darkTextMuted focus:outline-none focus:ring-2 focus:ring-button/40"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-6 py-3 text-base font-semibold text-lightBG dark:text-darkBG transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

        </form>
      )}
    </Modal>
  );
}
