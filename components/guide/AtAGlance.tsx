import type { GuideEntry } from "lib/guide/queries";
import { addressLine, displayUrl, hoursLines, telHref } from "lib/guide/format";

/**
 * The facts box. Sticky beside the article on a wide screen, directly under
 * the header on a phone. Renders only what is filled in: an empty "Parking"
 * row says less than no row at all.
 */
export default function AtAGlance({ entry }: { entry: GuideEntry }) {
  const address = addressLine(entry);
  const hours = hoursLines(entry.hours ?? []);

  const rows: { label: string; value: React.ReactNode }[] = [];
  if (address)
    rows.push({
      label: "Address",
      value: entry.maps_url ? (
        <a href={entry.maps_url} target="_blank" rel="noopener" className={LINK}>
          {address}
        </a>
      ) : (
        address
      ),
    });
  if (hours.length)
    rows.push({
      label: "Hours",
      value: (
        <ul className="space-y-1">
          {hours.map((h, i) => (
            <li key={i}>
              <span className="text-lightText dark:text-darkText">{h.days}</span>
              <br />
              {h.time}
            </li>
          ))}
        </ul>
      ),
    });
  if (entry.phone)
    rows.push({
      label: "Phone",
      value: (
        <a href={telHref(entry.phone)} className={LINK}>
          {entry.phone}
        </a>
      ),
    });
  if (entry.website_url)
    rows.push({
      label: "Website",
      value: (
        <a href={entry.website_url} target="_blank" rel="noopener" className={`${LINK} break-all`}>
          {displayUrl(entry.website_url)}
        </a>
      ),
    });
  if (entry.price_range) rows.push({ label: "Price", value: entry.price_range });
  if (entry.known_for) rows.push({ label: "Known for", value: entry.known_for });
  if (entry.how_to_order) rows.push({ label: "How to order", value: entry.how_to_order });
  if (entry.catering_info) rows.push({ label: "Catering", value: entry.catering_info });
  if (entry.parking) rows.push({ label: "Parking", value: entry.parking });

  if (!rows.length) return null;

  return (
    <section
      aria-labelledby="at-a-glance"
      className="rounded-3xl border border-lightBorder bg-panelLight p-6 dark:border-darkBorder dark:bg-panelDark sm:p-7"
    >
      <h2 id="at-a-glance" className="text-xl font-semibold tracking-tight text-lightText dark:text-darkText">
        At a Glance
      </h2>
      <dl className="mt-5 divide-y divide-lightBorder dark:divide-darkBorder">
        {rows.map((r) => (
          <div key={r.label} className="py-3 first:pt-0 last:pb-0">
            <dt className="text-sm font-semibold text-lightText dark:text-darkText">{r.label}</dt>
            <dd className="mt-1 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const LINK =
  "text-lightAccent underline decoration-1 underline-offset-4 hover:decoration-2 dark:text-darkAccent";
