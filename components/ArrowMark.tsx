import { PiCaretDownBold, PiCaretRightBold } from "react-icons/pi";

/**
 * The label and circled arrow every About page button is made of.
 *
 * After Ferrari's "Discover more": spaced capitals and a ring with a caret in
 * it. On hover the ring fills with house paint from the centre, and the caret
 * leaves out of the far side while a second one comes in behind it, so the
 * arrow reads as having gone somewhere rather than changed colour.
 *
 * Only the look lives here. Whatever wraps it (a Link, a button, an anchor)
 * brings the behaviour, and must carry `group` plus `arrowTone(tone)` so the
 * hover reaches in.
 */
export type ArrowTone = "light" | "dark";

const TONES = {
  // On the page ground, following the site theme.
  light: {
    text: "text-lightText dark:text-darkText",
    ring: "border-lightText/25 dark:border-darkText/30 group-hover:border-lightButton dark:group-hover:border-darkButton group-focus-visible:border-lightButton dark:group-focus-visible:border-darkButton",
    fill: "bg-lightButton dark:bg-darkButton",
    arrow: "text-white dark:text-darkBG",
  },
  // Over a photograph or the ink band, whatever the theme.
  dark: {
    text: "text-white",
    ring: "border-white/45 group-hover:border-darkButton group-focus-visible:border-darkButton",
    fill: "bg-darkButton",
    arrow: "text-darkBG",
  },
} as const;

export const arrowTone = (tone: ArrowTone) =>
  `group inline-flex items-center gap-4 focus:outline-none ${TONES[tone].text}`;

export default function ArrowMark({
  label,
  tone = "light",
  direction = "right",
  size = "md",
}: {
  /** Omit for a bare ring, like the hero's scroll cue. */
  label?: string;
  tone?: ArrowTone;
  direction?: "right" | "down";
  /** "sm" for a row in a list, where a full size ring would shout. */
  size?: "sm" | "md";
}) {
  const t = TONES[tone];
  const Caret = direction === "down" ? PiCaretDownBold : PiCaretRightBold;
  const out =
    direction === "down"
      ? "group-hover:translate-y-7 group-focus-visible:translate-y-7"
      : "group-hover:translate-x-7 group-focus-visible:translate-x-7";
  const inn =
    direction === "down"
      ? "-translate-y-7 group-hover:translate-y-0 group-focus-visible:translate-y-0"
      : "-translate-x-7 group-hover:translate-x-0 group-focus-visible:translate-x-0";

  return (
    <>
      {label && (
        <span className="text-[13px] font-semibold uppercase tracking-[0.22em] transition-[letter-spacing] duration-500 group-hover:tracking-[0.26em]">
          {label}
        </span>
      )}
      <span
        aria-hidden
        className={`relative grid ${size === "sm" ? "h-10 w-10" : "h-12 w-12"} flex-shrink-0 place-items-center overflow-hidden rounded-full border transition-colors duration-500 ${t.ring}`}
      >
        <span
          className={`absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-focus-visible:scale-100 ${t.fill}`}
        />
        <Caret
          className={`relative h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-visible:opacity-0 ${out}`}
        />
        <Caret
          className={`absolute h-4 w-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 ${inn} ${t.arrow}`}
        />
      </span>
    </>
  );
}
