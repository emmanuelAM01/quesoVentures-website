"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";

export default function ContactModal() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [prefillMessage, setPrefillMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Get in Touch");

  const close = () => {
    window.dispatchEvent(new CustomEvent("modal:close", { detail: { id: "contact-popup" } }));
  };

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const ce = e as CustomEvent<{ message?: string; title?: string }>;
      if (ce.detail?.message) setPrefillMessage(ce.detail.message);
      
      // Set dynamic title based on context
      if (ce.detail?.message?.toLowerCase().includes("audit")) {
        setModalTitle("Request Your Free Audit");
      } else if (ce.detail?.title) {
        setModalTitle(ce.detail.title);
      } else {
        setModalTitle("Get in Touch");
      }
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
          business: formData.get("info"),
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
    <Modal id="contact-popup" title={modalTitle}>
      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-2xl font-semibold text-lightText dark:text-darkText mb-3">
            Message sent ✓
          </div>
          <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted">
            I'll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* honeypot */}
            <div className="hidden">
              <label>Website</label>
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-lightText dark:text-darkText">
                Your Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Smith"
                className="w-full rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/60 dark:placeholder:text-darkTextMuted/60 focus:outline-none focus:ring-2 focus:ring-lightButton/40 dark:focus:ring-darkButton/40 transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-lightText dark:text-darkText">
                Email
              </label>
              <input
                name="contact"
                type="email"
                required
                placeholder="john@yourbusiness.com"
                className="w-full rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/60 dark:placeholder:text-darkTextMuted/60 focus:outline-none focus:ring-2 focus:ring-lightButton/40 dark:focus:ring-darkButton/40 transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-lightText dark:text-darkText">
                Your Website <span className="text-lightTextMuted dark:text-darkTextMuted font-normal">(if you have one)</span>
              </label>
              <input
                name="info"
                type="text"
                placeholder="yourbusiness.com"
                className="w-full rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/60 dark:placeholder:text-darkTextMuted/60 focus:outline-none focus:ring-2 focus:ring-lightButton/40 dark:focus:ring-darkButton/40 transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-lightText dark:text-darkText">
                What do you need help with?
              </label>
              <textarea
                name="message"
                required
                rows={4}
                defaultValue={prefillMessage}
                placeholder="Tell me about your business and what you're trying to achieve..."
                className="w-full resize-none rounded-lg border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent px-4 py-3 text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/60 dark:placeholder:text-darkTextMuted/60 focus:outline-none focus:ring-2 focus:ring-lightButton/40 dark:focus:ring-darkButton/40 transition-shadow"
              />
            </div>

            {status === "error" && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-8 py-4 text-lg font-semibold text-lightBG dark:text-darkBG transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-lightBorder dark:border-darkBorder">
            <div className="text-center">
              <p className="text-sm text-lightTextMuted dark:text-darkTextMuted mb-3">
                Prefer to talk first?
              </p>
              <Link
                href="https://calendar.app.google/DTrFqJ9XjEuTNmfr6"
                target="_blank"
                className="
                  inline-flex items-center justify-center
                  text-lightButton dark:text-darkButton
                  hover:text-lightButtonHover dark:hover:text-darkButtonHover
                  text-base font-semibold
                  transition-colors
                "
              >
                Schedule a call instead →
              </Link>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}