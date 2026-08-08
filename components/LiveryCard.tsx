import Glow from "components/Glow";
import type { Paint } from "components/livery";

interface Props {
  title: string;
  body: React.ReactNode;
  paint: Paint;
  href?: string;
  /** Dashed outline + tinted ground, for the open-ended "and more" card. */
  open?: boolean;
}

/** One card, used across every grid on the site. */
export default function LiveryCard({
  title,
  body,
  paint,
  href,
  open = false,
}: Props) {
  const surface = open
    ? "border-dashed border-gialloOrion/60 bg-gialloOrion/[0.08] dark:bg-gialloOrion/[0.07]"
    : "border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark";

  return (
    <Glow color={paint.hex} href={href} lift={Boolean(href)}>
      <div className={`relative flex h-full flex-col rounded-2xl border p-7 ${surface}`}>
        <span
          className="block h-1 w-10 rounded-full mb-6 transition-all duration-300 group-hover:w-20"
          style={{ backgroundColor: paint.hex }}
        />
        <p className="text-xl font-semibold text-lightText dark:text-darkText mb-2.5 leading-snug">
          {title}
        </p>
        <p className="text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
          {body}
        </p>
      </div>
    </Glow>
  );
}
