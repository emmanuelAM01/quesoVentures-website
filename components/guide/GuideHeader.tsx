import Breadcrumbs from "components/guide/Breadcrumbs";
import PageHero from "components/PageHero";
import type { Crumb } from "lib/guide/jsonld";

/**
 * The top of every guide page that is not an article: the site's hero, over
 * the blob field. Full screen like every other hero, with the breadcrumb in
 * the small slot above the title, the intro under the house rule, and the
 * page's own controls (filters, category chips) under that.
 *
 * `tall` is kept so older call sites still fit; every hero is full screen now.
 */
export default function GuideHeader({
  title,
  intro,
  trail,
  aside,
  children,
}: {
  title: string;
  intro?: string;
  trail?: Crumb[];
  tall?: boolean;
  /** Beside the words from lg up, where the scroll cue would be. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <PageHero
      headline={title}
      sub={intro}
      above={trail && trail.length > 1 ? <Breadcrumbs trail={trail} tone="dark" /> : undefined}
      aside={aside}
    >
      {children}
    </PageHero>
  );
}
