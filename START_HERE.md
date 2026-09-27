# START HERE

Handoff from the laptop session (2026-09-27). Branch `dev`. Run `git pull` first.

Delete this file once everything below is done.

## What was just built: the About page (`/about`)

Rebuilt on 2026-09-27 as a book, after Ferrari's pages: full width screens mixed with split ones.

- **Hero:** `components/AboutHero.tsx`. Mugello MotoGP photo, full screen, headline bottom left, slow settle on load, parallax on scroll.
- **"What Queso Ventures is":** `components/AboutDeck.tsx`. Heading and a numbered index on the left, a deck of 4 cards on the right (modelled on the portal free report's PillarDeck). Index and deck are one control. The card copy is Emmanuel's: keep it word for word.
- **"Why I'm doing this":** title page with the flipping portrait (`AboutPortrait`, cheese easter egg intact).
- **The story:** `components/AboutChapters.tsx`, one screen per year (`why` in `app/about/page.tsx`). Each has a `layout` of left, right (split) or full (photo behind the words), and an optional `image`. No image draws a colour field instead. A year rail pins to the left edge while the chapters are on screen. GitHub and LinkedIn sit under the last chapter.
- **Closing:** centred "Outcomes, not words" with the Free Report CTA.
- **Buttons:** `components/ArrowMark.tsx`, the label plus circled arrow. `NicheCtaButton` has an `arrow` variant.
- `AboutPhotoRoll` (the "You caught me" camera roll) is no longer on the page; the file is kept in case it comes back.
- **JSON-LD:** AboutPage + Person, unchanged.

## Open items

1. **Photos per year.** Emmanuel is finding one for each year. Drop them in `public/about/` and set `image` on the chapter. Photos marked `// STAND-IN` are borrowed from the old camera roll and should be replaced.
2. **Timeline copy.** Entries marked `// DRAFT` in `app/about/page.tsx` (2008, 2010s, 2020, 2023, 2026) were written from Emmanuel's notes as placeholders; he rewrites them himself. The 2008 camp story is still his to tell. Not yet in the copy: 2024 was four promotions in six months, then leaving for a startup that got funded.
3. **GPS EXIF** is still in `public/hero/businessCard.JPEG`, `servicesMain.JPEG` and `ctaHero.JPEG` (used on other pages). Strip only the GPS tag (tag 34853) with Python PIL. MPO files can't use `quality='keep'`, so re-encode them at quality 92.
4. **Next up after the About page:** the Queso Studios page needs conversion work, and the main site pricing needs work (the price stays $500).

## Copy rules for anything on the site

- No dashes of any kind, no exclamation points, no emojis, no eyebrow labels.
- Short statements, not paragraphs.
- Never mention Emmanuel's brother or a cofounder by name.
- Never state client counts or a fixed price on the About page.
- When Emmanuel edits copy, keep his wording byte for byte.

## Git

Commit on `dev`. Only push when Emmanuel explicitly says so, because a push deploys on Vercel.
