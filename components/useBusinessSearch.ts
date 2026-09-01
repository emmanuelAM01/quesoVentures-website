"use client";

import { useEffect, useRef, useState } from "react";
import type { PlaceSuggestion } from "app/api/places/route";
import { trackCtaClick, type Placement } from "./analytics";

/**
 * The search that takes itself over.
 *
 * Two places on the homepage run this: the hero demo and the left card of the
 * showcase. Both start as a reel of hardcoded queries, both stop the moment
 * someone clicks in, both become a real Google Places lookup, and both carry
 * the chosen place_id into the contact form so nobody retypes their own name.
 *
 * It lives in a hook because the second one arrived by copy-paste first, and
 * two copies of a debounced fetch with an abort controller is two places to
 * fix when the API changes. What differs between the two is only what they
 * draw, so that stays in the components.
 */
export function useBusinessSearch({
  queries,
  from,
  /** How long the finished result sits before the reel moves on. */
  holdMs = 2800,
}: {
  queries: string[];
  from: Placement;
  holdMs?: number;
}) {
  /** The reel: a hardcoded query typing itself, before anyone interferes. */
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const queryIndex = useRef(0);

  /** The visitor has taken the wheel; the reel never restarts. */
  const [live, setLive] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [chosen, setChosen] = useState<PlaceSuggestion | null>(null);
  /** Committed a typed name without picking one off the list. */
  const [entered, setEntered] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(queries[0]);
      setShowResults(true);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = (q: string, pos: number) => {
      if (cancelled) return;
      setTyped(q.slice(0, pos));
      if (pos < q.length) {
        timer = setTimeout(() => type(q, pos + 1), 55);
        return;
      }
      timer = setTimeout(() => {
        if (cancelled) return;
        setShowResults(true);
        timer = setTimeout(() => {
          if (cancelled) return;
          setShowResults(false);
          queryIndex.current = (queryIndex.current + 1) % queries.length;
          timer = setTimeout(() => type(queries[queryIndex.current], 0), 400);
        }, holdMs);
      }, 250);
    };

    type(queries[0], 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // `queries` is a module constant at every call site; listing it would
    // restart the reel on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, holdMs]);

  // Live lookup, through the proxy so the API key stays on the server.
  useEffect(() => {
    if (!live || chosen || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`, {
          signal: ctrl.signal,
        });
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
      } catch {
        /* Aborted or offline. The demo just shows nothing. */
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, live, chosen]);

  /**
   * Focus after the input exists, not at the click.
   *
   * The input only mounts once `live` is true, so focusing inside the click
   * handler aimed at a ref that was still null. The box lit up and the first
   * thing anyone typed went to the page instead — a space scrolled it.
   */
  useEffect(() => {
    if (live) inputRef.current?.focus();
  }, [live]);

  const takeOver = () => {
    if (live) return;
    setLive(true);
    setTyped("");
    setShowResults(false);
  };

  const pick = (s: PlaceSuggestion) => {
    setChosen(s);
    setEntered("");
    setSuggestions([]);
    setQuery(s.name);
    setShowResults(true);
  };

  /** Typing over a committed answer clears it, so the card never lies. */
  const edit = (value: string) => {
    setQuery(value);
    if (chosen || entered) {
      setChosen(null);
      setEntered("");
      setShowResults(false);
    }
  };

  /**
   * Commit whatever is typed, for a business Google does not list.
   *
   * Same destination as picking off the list, minus the place_id.
   */
  const commit = () => {
    const name = query.trim();
    if (!name || chosen) return;
    setEntered(name);
    setSuggestions([]);
    setShowResults(true);
  };

  const requestReport = () => {
    const name = chosen?.name ?? entered;
    if (!name) return;
    trackCtaClick(from);
    window.dispatchEvent(
      new CustomEvent("contact:prefill", {
        detail: {
          title: "Get My Free Report",
          business:
            chosen && chosen.address ? `${chosen.name}, ${chosen.address}` : name,
          placeId: chosen?.placeId ?? "",
          message: `I'd like the free report for ${name}.`,
        },
      })
    );
    window.dispatchEvent(
      new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
    );
  };

  /** Whose name the mock result carries. */
  const named = chosen?.name ?? entered;

  return {
    typed,
    showResults,
    live,
    takeOver,
    query,
    edit,
    suggestions,
    chosen,
    entered,
    pick,
    commit,
    requestReport,
    inputRef,
    named,
    bizName: named || "Your Business",
    bizWhere: chosen?.address ?? "Houston, TX",
    /** A result standing in for a real business needs saying so. */
    isTheirs: Boolean(named),
    /** Fade-and-rise for anything that appears once the search resolves. */
    resultStyle: (delay = 0) => ({
      opacity: showResults ? 1 : 0,
      transform: showResults ? "none" : "translateY(10px)",
      transitionDelay: delay ? `${delay}ms` : undefined,
    }),
  };
}
