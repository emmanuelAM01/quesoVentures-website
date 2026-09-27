# START HERE

Handoff from the laptop session (2026-09-27). Branch `dev`. Run `git pull` first.

Delete this file once everything below is done.

## What was just built: the About page (`/about`, commit 5dd5d82)

- **Hero:** "More customers, less busywork." with the flipping portrait (`components/AboutPortrait.tsx`).
- **"What Queso Ventures is":** a fanned hand of 4 cards (`components/AboutHand.tsx`). On desktop the cards deal in on scroll and a card lifts when hovered. Below the lg breakpoint they stack. The copy is Emmanuel's: keep it word for word.
- **Photo band:** `components/AboutPhotoRoll.tsx`. Tokyo, Colosseum, hills, camera. Clicking onto the camera photo opens the contact modal titled "You caught me", once per visit.
- **"Why I'm doing this":** flip cards (`components/StoryCards.tsx`). Each card has a front (year, bold line, one sentence) and a back (the `story` field, about 50 words). Hover flips on desktop, tap on phones. A "2023 graduated UH Computer Science (what a surprise)" divider sits between the rows.
- **Links:** GitHub and LinkedIn under the timeline (`components/AboutLinks.tsx`), with a "private client repos" thought bubble on GitHub.
- **Closing band:** the MotoGP "Outcomes, not words" band with the Free Report CTA.
- **JSON-LD:** AboutPage + Person (sameAs: LinkedIn, GitHub, Instagram, YouTube), pointing at the `#localbusiness` schema by `@id`.

## Open items

1. **2008 card is unfinished.** "One time at computer camp" has the body "My parents enrolled me in a free computer ". Emmanuel will tell you the camp story. Write a short front line and a ~50 word `story` so it flips like the others.
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
