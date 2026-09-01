"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { BUSINESS } from "./businessInfo";
import CallLink from "./CallLink";

export default function ContactModal() {
  const [prefillMessage, setPrefillMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Get in Touch");
  const [business, setBusiness] = useState("");
  const [placeId, setPlaceId] = useState("");

  const close = () => {
    window.dispatchEvent(new CustomEvent("modal:close", { detail: { id: "contact-popup" } }));
  };

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const ce = e as CustomEvent<{
        message?: string;
        title?: string;
        business?: string;
        placeId?: string;
      }>;
      if (ce.detail?.message) setPrefillMessage(ce.detail.message);
      // Sent by the hero demo, so nobody types their business name twice.
      setBusiness(ce.detail?.business ?? "");
      setPlaceId(ce.detail?.placeId ?? "");

      // The heading echoes the button that opened it, so the modal never
      // looks like a different, more formal ask than the one just clicked.
      setModalTitle(ce.detail?.title || "Get in Touch");
    };

    window.addEventListener("contact:prefill", onPrefill as EventListener);
    return () => window.removeEventListener("contact:prefill", onPrefill as EventListener);
  }, []);

  return (
    <Modal id="contact-popup" title={modalTitle}>
      <ContactForm
        prefillMessage={prefillMessage}
        prefillBusiness={business}
        prefillPlaceId={placeId}
        onSuccess={() => setTimeout(close, 5000)}
      />

      <div className="mt-5 flex items-center justify-center gap-2 text-sm">
        <span className="text-lightTextMuted dark:text-darkTextMuted">
          Prefer to talk first?
        </span>
        <CallLink
          from="contact_modal"
          className="font-semibold text-lightButton dark:text-darkButton hover:opacity-70 transition-opacity"
        >
          Call {BUSINESS.phone} →
        </CallLink>
      </div>
    </Modal>
  );
}
