import Link from "next/link";

const industries = [
  {
    label: "Food Trucks",
    href: "/website-for-food-trucks-houston",
    tagline: "Get a website and Google Maps presence for your food truck.",
  },
  {
    label: "Smoke & Vape Shops",
    href: "/website-for-smoke-shops-houston",
    tagline: "Show up first when customers search nearby.",
  },
  {
    label: "Contractors & Trades",
    href: "/seo-for-contractors-houston",
    tagline: "Get more calls from homeowners searching online.",
  },
  {
    label: "Med Spas & Salons",
    href: "/seo-for-med-spas-houston",
    tagline: "Fill your appointment book with clients from Google.",
  },
];

interface Props {
  current: string;
}

export default function IndustryLinks({ current }: Props) {
  const others = industries.filter((i) => i.href !== current).slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-3 text-center">
          Not your industry?
        </p>
        <h2 className="text-2xl sm:text-3xl text-lightText dark:text-darkText mb-8 text-center">
          I work with other Houston businesses too
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 transition-colors hover:border-lightButton dark:hover:border-darkButton"
            >
              <p className="text-base font-semibold text-lightText dark:text-darkText mb-1 group-hover:text-lightButton dark:group-hover:text-darkButton transition-colors">
                {item.label}
              </p>
              <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                {item.tagline}
              </p>
              <p className="mt-3 text-sm font-semibold text-lightButton dark:text-darkButton">
                See how →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
