"use client";

import { useEffect, useRef, useState } from "react";
import type { PlaceSuggestion } from "app/api/places/route";

interface Props {
  inputClass: string;
  labelClass: string;
  /** Handed over by the hero demo when the visitor already picked themselves. */
  initialName?: string;
  initialPlaceId?: string;
}

/**
 * Pick your business, rather than describe it.
 *
 * Choosing your own shop out of a dropdown — right name, right street — is the
 * moment the form stops feeling like a contact form and starts feeling like
 * something already knows about you. It also hands over a place_id, which is
 * what makes the report automatable: the Business Profile, the rating, the
 * review count and the category all hang off it.
 *
 * Three states, in order of preference: pick from the list, type it in because
 * the list was wrong, or type it in because there is no list at all. The last
 * one is not an error path — with no API key configured it is simply how the
 * field works, and a lead is never lost to a third party being down.
 */
export default function BusinessPicker({
  inputClass,
  labelClass,
  initialName = "",
  initialPlaceId = "",
}: Props) {
  const [query, setQuery] = useState(initialName);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [placeId, setPlaceId] = useState(initialPlaceId);
  const [manual, setManual] = useState(false);
  /** Null until the first lookup answers, so nothing flashes on load. */
  const [configured, setConfigured] = useState<boolean | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manual || query.trim().length < 3 || placeId) {
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`, {
          signal: ctrl.signal,
        });
        const data = await res.json();
        setConfigured(data.configured);
        setSuggestions(data.suggestions ?? []);
        setOpen((data.suggestions ?? []).length > 0);
        setActive(-1);
      } catch {
        /* Aborted or offline. The typed value still submits. */
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, manual, placeId]);

  // The modal stays mounted between opens, so a later prefill has to land.
  useEffect(() => {
    if (initialName) setQuery(initialName);
    if (initialPlaceId) setPlaceId(initialPlaceId);
  }, [initialName, initialPlaceId]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (s: PlaceSuggestion) => {
    setQuery(s.address ? `${s.name}, ${s.address}` : s.name);
    setPlaceId(s.placeId);
    setOpen(false);
    setSuggestions([]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && active >= 0) {
      // Only swallow Enter when a suggestion is highlighted, so the form can
      // still be submitted from this field the rest of the time.
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showEscapeHatch = configured === true && !manual && !placeId;

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass} htmlFor="business-name">
        {manual || configured === false
          ? "Your business name"
          : "Find your business"}
      </label>

      <div ref={boxRef} className="relative">
        <input
          id="business-name"
          name="name"
          type="text"
          required
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls="business-options"
          aria-autocomplete="list"
          placeholder={
            manual || configured === false
              ? "Snowflake Donuts, or snowflakedonuts.com"
              : "Start typing your business name"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // Editing after a pick means the place_id no longer describes it.
            if (placeId) setPlaceId("");
          }}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className={inputClass}
        />
        <input type="hidden" name="placeId" value={placeId} />

        {open && suggestions.length > 0 && (
          <ul
            id="business-options"
            role="listbox"
            className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-lightBorder bg-white shadow-lg dark:border-darkBorder dark:bg-panelDark"
          >
            {suggestions.map((s, i) => (
              <li key={s.placeId} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(s)}
                  className={`block w-full px-4 py-3 text-left transition-colors ${
                    i === active
                      ? "bg-lightAccent/10 dark:bg-darkAccent/10"
                      : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="block text-base font-medium text-lightText dark:text-darkText">
                    {s.name}
                  </span>
                  {s.address && (
                    <span className="block text-sm text-lightTextMuted dark:text-darkTextMuted">
                      {s.address}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showEscapeHatch && (
        <button
          type="button"
          onClick={() => {
            setManual(true);
            setOpen(false);
          }}
          className="self-start text-sm text-lightTextMuted underline underline-offset-4 transition-opacity hover:opacity-70 dark:text-darkTextMuted"
        >
          Can&apos;t find it? Type it in instead.
        </button>
      )}
    </div>
  );
}
