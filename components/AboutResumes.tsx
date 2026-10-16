"use client";

import { useEffect, useRef, useState } from "react";

/*
  The paths are rewrites in next.config.js onto the PDFs in public/resumes, so
  the link someone pastes into a form reads as a name, not a file dump. Keep
  RESUME_ROLES there in step with this list.
*/
const RESUMES = [
  { role: "FDE", label: "Forward Deployed Engineer" },
  { role: "Founding", label: "Founding Engineer" },
  { role: "GTM", label: "GTM Engineer" },
  { role: "Product", label: "Technical Product Manager" },
];

/** A quiet pill in the bottom right corner that opens the resume list. */
export default function AboutResumes() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <ul
          id="resume-list"
          className="w-64 overflow-hidden rounded-2xl border border-lightBorder bg-lightBG shadow-lg dark:border-darkBorder dark:bg-darkBG"
        >
          {RESUMES.map((r) => (
            <li key={r.role}>
              <a
                href={`/emmanuelMendietaResume/${r.role}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm text-lightText transition-colors hover:bg-panelLight dark:text-darkText dark:hover:bg-panelDark"
              >
                {r.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="resume-list"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-lightBorder bg-lightBG px-4 py-2 text-sm text-lightText shadow-sm transition-colors hover:bg-panelLight dark:border-darkBorder dark:bg-darkBG dark:text-darkText dark:hover:bg-panelDark"
      >
        Resumes
      </button>
    </div>
  );
}
