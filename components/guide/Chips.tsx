import Link from "next/link";

/** A row of links styled as chips. Used for the categories inside a city. */
export default function Chips({ items }: { items: { href: string; label: string; current?: boolean }[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {items.map((c) => (
        <li key={c.href}>
          <Link
            href={c.href}
            aria-current={c.current ? "page" : undefined}
            className={`inline-block rounded-full border px-4 py-2 text-base transition-colors ${
              c.current
                ? "border-darkAccent bg-darkAccent text-[#101216]"
                : "border-white/20 text-white/85 hover:border-white/60 hover:text-white"
            }`}
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
