"use client";

import { useEffect, useState } from "react";

type ModalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ id, title, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  // Sync open state from hash or custom event
  useEffect(() => {
    const syncFromHash = () => {
      setOpen(window.location.hash === `#${id}`);
    };

    syncFromHash();

    const onHashChange = () => syncFromHash();

    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ id: string }>;
      if (ce.detail?.id !== id) return;

      // update hash for deep link support
      if (window.location.hash !== `#${id}`) {
        history.pushState(null, "", `#${id}`);
      }

      setOpen(true);
    };

    const onClose = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      if (ce.detail?.id && ce.detail.id !== id) return;
      close();
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("modal:open", onOpen as EventListener);
    window.addEventListener("modal:close", onClose as EventListener);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("modal:open", onOpen as EventListener);
      window.removeEventListener("modal:close", onClose as EventListener);
    };
  }, [id]);

  // Lock scroll + ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

const close = () => {
  const newUrl = window.location.pathname + window.location.search;
  window.history.replaceState(null, "", newUrl);
  setOpen(false);
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close modal"
        onClick={close}
        className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-lg
            rounded-3xl
            border border-lightBorder dark:border-white/10
            bg-white dark:bg-[#151618]
            shadow-2xl shadow-black/20
            p-6 sm:p-8
            max-h-[85svh] overflow-hidden
            animate-scaleIn
          "
        >
          <div className="flex items-start justify-between gap-4">
            <h2
              id={`${id}-title`}
              className="text-2xl sm:text-3xl tracking-tight font-semibold text-lightText dark:text-darkText"
            >
              {title}
            </h2>

            <button
              type="button"
              onClick={close}
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-full
                text-lightTextMuted dark:text-darkTextMuted
                hover:bg-black/5 dark:hover:bg-white/10
                transition-colors
              "
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 sm:mt-6 overflow-y-auto max-h-[calc(85svh-110px)] sm:max-h-[calc(85svh-130px)] pr-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}