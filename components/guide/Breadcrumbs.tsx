import Link from "next/link";
import type { Crumb } from "lib/guide/jsonld";

/** Guide / City / Category / Business. The last crumb is the current page. */
export default function Breadcrumbs({ trail, tone = "light" }: { trail: Crumb[]; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "text-white/70" : "text-lightTextMuted dark:text-darkTextMuted";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-lightText dark:hover:text-darkText";
  const current = tone === "dark" ? "text-white" : "text-lightText dark:text-darkText";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={`font-medium ${current}`}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className={`py-1 transition-colors ${hover}`}>
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
