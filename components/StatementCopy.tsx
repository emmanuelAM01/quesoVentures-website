import type { Paint } from "components/livery";

interface Props {
  text: string;
  /** Dark grounds get the light type scale. */
  tone?: "light" | "dark";
  /** Accent rule above the lead. */
  paint?: Paint;
  className?: string;
}

/**
 * Turns a paragraph into a lead line plus supporting columns.
 *
 * A six sentence block set at one size is a wall nobody finishes. Promoting
 * the first sentence to headline scale and flowing the remainder into two
 * newspaper columns gives the eye an entry point and halves the apparent
 * length, without cutting a word.
 */
export default function StatementCopy({
  text,
  tone = "light",
  paint,
  className = "",
}: Props) {
  // First sentence becomes the lead. These strings are hand written prose with
  // no abbreviations, so a boundary match is safe here.
  // [\s\S] rather than the dotAll flag — this tsconfig targets below es2018.
  const match = text.match(/^([\s\S]*?[.!?])\s+([\s\S]*)$/);
  const lead = match ? match[1] : text;
  const rest = match ? match[2] : "";

  const leadColor = tone === "dark" ? "text-[#F5F7FA]" : "text-lightText dark:text-darkText";
  const restColor =
    tone === "dark" ? "text-[#B7C0C8]" : "text-lightTextMuted dark:text-darkTextMuted";

  return (
    <div className={className}>
      {paint && (
        <span
          className="block h-1 w-14 rounded-full mb-8"
          style={{ backgroundColor: paint.hex }}
        />
      )}

      <p
        className={`text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-balance ${leadColor}`}
      >
        {lead}
      </p>

      {rest && (
        <div
          className={`mt-8 text-lg sm:text-xl font-light leading-relaxed ${restColor} ${
            // Only break into columns when there is genuinely enough text to
            // fill them. Below this, CSS columns splits a single sentence down
            // the middle and leaves a ragged hole where the break lands.
            rest.length >= 260 ? "md:columns-2 md:gap-12" : "max-w-3xl"
          }`}
        >
          <p>{rest}</p>
        </div>
      )}
    </div>
  );
}
