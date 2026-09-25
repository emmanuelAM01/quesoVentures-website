import Breadcrumbs from "components/guide/Breadcrumbs";
import type { Crumb } from "lib/guide/jsonld";

/**
 * The top of every hub: an ink band, like the full-contrast statement sections
 * on the rest of the site. It tucks under the sticky bar the same way the
 * page heroes do.
 */
export default function GuideHeader({
  title,
  intro,
  trail,
  children,
}: {
  title: string;
  intro?: string;
  trail?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section data-dark-section className="relative -mt-[76px] bg-inkLight pt-[76px]">
      <div className="container mx-auto px-4 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          {trail && trail.length > 1 ? <Breadcrumbs trail={trail} tone="dark" /> : null}
          <h1 className="mt-6 max-w-4xl text-4xl tracking-tight text-balance text-white sm:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/75 sm:text-xl">
              {intro}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
