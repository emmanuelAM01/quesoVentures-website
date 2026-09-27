# START HERE

Handoff from the laptop session (2026-09-27). Branch `dev`. Run `git pull` first.

Delete this file once everything below is done.

## What was just built: the About page (`/about`, commit 5dd5d82)

- **Hero:** "More customers, less busywork." with the flipping portrait (`components/AboutPortrait.tsx`).
- **"What Queso Ventures is":** a deck of 4 cards (`components/AboutDeck.tsx`), modelled on the portal free report's PillarDeck. The chosen card is in front, the rest stack behind it in reading order, hover lifts a card, click, arrows, pips or arrow keys page through. Below lg they stack. The copy is Emmanuel's: keep it word for word.
- **Photo band:** `components/AboutPhotoRoll.tsx`. Tokyo, Colosseum, hills, camera. Clicking onto the camera photo opens the contact modal titled "You caught me", once per visit.
- **"Why I'm doing this":** a Ferrari history style timeline (`components/AboutTimeline.tsx`): one huge year, the words beside it, a rail of all 8 years underneath. Paint warms from blue (2008) to Rosso Corsa (2026). Phones get a vertical timeline, all open. Entries are `why` in `app/about/page.tsx`.
- **Links:** GitHub and LinkedIn under the timeline (`components/AboutLinks.tsx`), with a "private client repos" thought bubble on GitHub.
- **Closing band:** the MotoGP "Outcomes, not words" band with the Free Report CTA.
- **JSON-LD:** AboutPage + Person (sameAs: LinkedIn, GitHub, Instagram, YouTube), pointing at the `#localbusiness` schema by `@id`.

## Open items

1. **Timeline copy.** Entries marked `// DRAFT` in `app/about/page.tsx` (2008, 2010s, 2020, 2023, 2026) were written from Emmanuel's notes as placeholders; he rewrites them himself. The 2008 camp story is still his to tell. Not yet in the copy: 2024 was four promotions in six months, then leaving for a startup that got funded.
2. **GPS EXIF** is still in `public/hero/businessCard.JPEG`, `servicesMain.JPEG` and `ctaHero.JPEG` (used on other pages). Strip only the GPS tag (tag 34853) with Python PIL. MPO files can't use `quality='keep'`, so re-encode them at quality 92.
3. **Next up after the About page:** the Queso Studios page needs conversion work, and the main site pricing needs work (the price stays $500).

## Copy rules for anything on the site

- No dashes of any kind, no exclamation points, no emojis, no eyebrow labels.
- Short statements, not paragraphs.
- Never mention Emmanuel's brother or a cofounder by name.
- Never state client counts or a fixed price on the About page.
- When Emmanuel edits copy, keep his wording byte for byte.

## Git

Commit on `dev`. Only push when Emmanuel explicitly says so, because a push deploys on Vercel.
