/**
 * A section's title, in the About page's voice: large, light, tight, with an
 * optional line under it. Every h2 on a book style page goes through here so
 * the pages keep one type scale.
 */
export default function SectionHeading({
  children,
  sub,
  tone = "light",
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
  /** "dark" for a section on the ink ground, whatever the theme. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const ink = tone === "dark" ? "text-[#F5F7FA]" : "text-lightText dark:text-darkText";
  const muted = tone === "dark" ? "text-[#B7C0C8]" : "text-lightTextMuted dark:text-darkTextMuted";
  const centre = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`${centre} ${className}`}>
      <h2 className={`text-4xl sm:text-5xl xl:text-6xl font-light leading-[1.05] tracking-tight text-balance ${ink}`}>
        {children}
      </h2>
      {sub && (
        <p
          className={`mt-6 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed ${muted} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
