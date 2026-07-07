const INDUSTRIES = [
  "Mechanics",
  "Vehicle wraps",
  "Contractors",
  "Restaurants",
  "Food trucks",
  "Med spas",
  "Salons",
  "Barbershops",
  "Event venues",
  "Carpet cleaning",
  "Detailers",
  "Landscapers",
  "Cleaning services",
  "Online shops",
  "Consultants",
  "and everything in between",
];

export default function IndustriesMarquee() {
  const items = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section className="py-14">
      <p className="container mx-auto px-4 max-w-6xl text-xs font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-8">
        Trusted by Houston area business owners
      </p>
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
