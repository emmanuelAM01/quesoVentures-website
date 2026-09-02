"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

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
    </Modal>
  );
}
