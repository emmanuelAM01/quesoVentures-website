import PageHero from "./PageHero";
import SearchDemo from "./SearchDemo";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * The homepage hero: copy on the left, the search demo on the right, over the
 * blob field.
 *
 * The demo had a spell below the fold in its own band and it was the wrong
 * call. It is the only thing on the page that shows rather than tells, and a
 * white card against the dark ground is where it reads best.
 */
export default function Hero({
  copy = SITE_COPY.hero,
  image,
}: {
  copy?: SiteCopy["hero"];
  image?: { src: string; alt: string };
}) {
  return (
    <PageHero
      headline={copy.headline}
      sub={copy.sub}
      prefill={copy.ctaPrefill}
      ctaLabel={copy.cta}
      image={image}
      aside={<SearchDemo />}
    />
  );
}
