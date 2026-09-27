import PageHero from "components/PageHero";

/**
 * The About page opens on Mugello, full screen.
 *
 * Emmanuel's favourite photograph, and not decoration: a pit wall with a
 * factory operation behind it is the whole argument of the page. This is where
 * the site's hero was first drawn; it now lives in PageHero, shared by every
 * page but the homepage, and this is that hero with the photograph fixed.
 */
export default function AboutHero({
  title,
  sub,
}: {
  title: string;
  sub: string;
  /** Kept so the page's call site still fits; the scroll cue finds the next section itself. */
  next?: string;
}) {
  return (
    <PageHero
      headline={title}
      sub={sub}
      image={{
        src: "/hero/aboutMotoGP.JPEG",
        alt: "The pit straight at Mugello during a MotoGP session",
        position: "50% 60%",
      }}
    />
  );
}
