# START HERE

Handoff from the laptop session (2026-09-27). Branch `dev`. Run `git pull` first.

Delete this file once everything below is done.

## What was just built: the About page (`/about`)

Rebuilt on 2026-09-27 as a book, after Ferrari's pages: full width screens mixed with split ones.

- **Hero:** `components/AboutHero.tsx`. Mugello MotoGP photo, full screen, headline bottom left, slow settle on load, parallax on scroll.
- **"What Queso Ventures is":** `components/AboutDeck.tsx`. Heading and an index on the left, a deck of 4 cards on the right (modelled on the portal free report's PillarDeck). On desktop the section pins and scrolling deals the cards. No numbering anywhere (Emmanuel dislikes it). The card copy is Emmanuel's: keep it word for word.
- The story follows the deck directly; "Why I'm doing this" is an sr-only heading. The old title page and `AboutPortrait` (cheese easter egg) were removed at Emmanuel's request.
- **The story:** `components/AboutChapters.tsx`, one screen per year (`why` in `app/about/page.tsx`). Each has a `layout` of left, right (split) or full (photo behind the words), and `photos`: several make a carousel with subtle dots. No photos draws a colour field instead. The camera shot at the end of 2026 is the "Gotcha" easter egg (`caught: true`). A year rail pins to the left edge while the chapters are on screen. GitHub and LinkedIn sit under the last chapter.
- **Closing:** centred "Outcomes, not words" with the Free Report CTA.
- **Buttons:** `components/ArrowMark.tsx`, the label plus circled arrow. `NicheCtaButton` has an `arrow` variant.
- **JSON-LD:** AboutPage + Person, unchanged.

## Open items

1. **Photos.** Emmanuel's photos are in `public/about/` (converted from HEIC where needed, rotated upright, all metadata including GPS stripped, long edge 2400px). 2020 has no photo yet. The Colosseum shot was put in 2025 (same Italy trip as Mugello?) without being asked: confirm. Alt texts on his new photos are guesses: have him check them.
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
