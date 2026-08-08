const INDUSTRIES = [
  "Mechanics",
  "Mobile mechanics",
  "Vehicle wraps",
  "Detailers",
  "Roofers",
  "Construction",
  "Flooring",
  "Landscapers",
  "Cleaning services",
  "Carpet cleaning",
  "Med spas",
  "Med clinics",
  "Dentists",
  "Event venues",
  "Music schools",
  "Bands",
  "Food trucks",
  "Restaurants",
  "Donut shops",
  "Online shops",
  "and everything in between",
];

export default function IndustriesMarquee() {
  const items = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section className="py-14">
      <div
        className="marquee relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track items-center">
          {items.map((label, i) => (
            <span
              key={i}
              className={`flex items-center whitespace-nowrap text-xl sm:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted ${
                label.startsWith("and ") ? "italic" : ""
              }`}
            >
              {label}
              <span
                aria-hidden="true"
                className="mx-8 text-[8px] text-lightAccent dark:text-darkAccent"
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
