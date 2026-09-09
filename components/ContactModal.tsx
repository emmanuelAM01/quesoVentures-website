"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const [prefillMessage, setPrefillMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Get in Touch");
  const [business, setBusiness] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
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
        businessName?: string;
        businessAddress?: string;
        placeId?: string;
      }>;
      if (ce.detail?.message) setPrefillMessage(ce.detail.message);
      // Sent by the hero demo, so nobody types their business name twice.
      setBusiness(ce.detail?.business ?? "");
      setBusinessName(ce.detail?.businessName ?? "");
      setBusinessAddress(ce.detail?.businessAddress ?? "");
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
        prefillBusinessName={businessName}
        prefillBusinessAddress={businessAddress}
        prefillPlaceId={placeId}
        // No timer. The confirmation stays until it is dismissed — by this
        // button, the ✕, Escape, or the backdrop — because it is the only
        // place the visitor is told whether a report is already coming.
        onClose={close}
      />
    </Modal>
  );
}
