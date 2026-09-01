# Optimization Backlog — quesoventures.com

Outstanding work on the site, grouped by workstream.
Last updated: 2026-08-31 (second pass)

**Status tags:** `[BUILD]` ready to implement · `[DECIDE]` needs Emmanuel's call · `[DATA]` check analytics first

---

## 1. Tighten the copy

**Shipped 2026-08-31.** Cards across the site went 536 to 312 (-42%); words went 15,645 to 14,310 (-9%). Card count is the number that mattered: the homepage carried 54 card blocks and now carries 22.

What changed, and why:

- Two card grids no longer sit back to back. `HowItWorks` is a numbered strip, not three glowing panels under three glowing panels. Same information, a third of the height.
- The 13-card industry grid, the 7-card "Not in {city}?" grid, and the industry grid at the bottom of every trade page are gone. The footer and the header dropdown already carried every one of those links on every page, so they were duplicating navigation that was two inches below them. Open-endedness moved into the footer columns ("and plenty more", "and wherever you are").
- Every template now closes on the call to action. The order was FAQ, CTA, objection, link grid; it is now FAQ, objection, CTA.
- Price appears twice on the homepage instead of four times. It is a machine-readable `Offer` on every Service node, so an assistant can still answer "what do they charge."

Remaining:

- [ ] `[DATA]` **Pull call-click data for `why_local`** — it now sits directly above the CTA on every geo and industry page. If it draws no clicks there either, cut it. → `components/analytics.ts`
- [ ] `[DECIDE]` **Em dashes in `/privacy` and `/terms`** — swept out of every marketing page. The legal pages still have ~20 and were left alone, since that text is written for SMS-carrier compliance rather than for reading.

---

## 2. Close the audit trap

Shared facts are baked into per-page prose strings. This is exactly why raising the price meant editing twenty files instead of one. `components/pricingCopy.ts` and `components/cityMetadata.ts` already exist — nothing but new pages uses them yet.

- [x] **Homepage and `/services` read from `pricingCopy.ts`** — price, agency anchor, and minimum term. `MONTHLY_PLAN_OFFER` added there too, so the schema price cannot drift from the prose.
- [ ] `[BUILD]` **Point the 11 geo and industry pages at `pricingCopy.ts`** — their FAQ answers and meta descriptions still spell out $500 and $1,500 by hand. → `app/web-design-*/page.tsx`, `app/seo-for-*/page.tsx`
- [ ] `[BUILD]` **Replace hardcoded phone literals with `BUSINESS.phone`** — every geo and industry `DESCRIPTION` spells the number out by hand. → `components/businessInfo.ts`
- [ ] `[BUILD]` **Point geo pages at `cityMetadata()`** — each repeats ~25 lines of title/openGraph/twitter boilerplate with the domain hardcoded twice. → `components/cityMetadata.ts`

---

## 3. Ship the city pages

Template, type, metadata helper, and remote proof block are built and typecheck clean. Everything here is blocked on which cities.

Purpose: QR landing from business cards, **not** local search. Someone in another city scans the card and needs to land somewhere that names their city instead of Houston.

- [ ] `[DECIDE]` **Name the cities** — card landings need 6 fields each; a page meant to rank needs the `seo` block on top.
- [ ] `[BUILD]` **Write one data file per city** — set `proof: "remote"` for anywhere outside the drive. It swaps `WhyLocal` for `WhyRemote` and drops the Houston suburb links, which undercut the one thing a card landing exists to say. → `components/cityPageData.ts`
- [ ] `[BUILD]` **Register each page in `CITY_PAGES`** — the sitemap reads that array and includes only pages carrying an `seo` block. → `app/sitemap.ts`
- [ ] `[BUILD]` **Verify card pages emit `noindex, follow` and stay out of sitemap.xml** — thin near-duplicate location pages, if indexed, dilute the Houston local signal rather than adding to it. → `components/cityMetadata.ts`

---

## 4. Houston SEO deep dive

The `*-houston` routes are all **industry** pages (auto shops, contractors, med spas, wrap shops, food trucks). There is no general Houston city page today.

- [ ] `[DECIDE]` **Is a general `/web-design-houston-tx` page wanted?** — new build, not an edit, and a much harder ranking target than the suburb pages.
- [ ] `[DECIDE]` **Plan the internal-link hierarchy first if it goes ahead** — a Houston page competes with Atascocita, Humble, and Kingwood for overlapping queries. Decide which page wins which query before writing either. → `components/serviceAreas.ts`
- [ ] `[BUILD]` **Keep expanding the FaqDeck pattern** — structured Q&A with FAQPage schema is the strongest asset on the site for getting cited by AI assistants. It extracts cleanly; prose doesn't. → `components/FaqDeck.tsx`

---

## 5. Make the price raise actually work

$500 filters on *ability to pay*. It does nothing about seriousness, and nothing at all about non-payment — someone who ghosts a $300 invoice ghosts a $500 one. These are the levers that actually do the filtering.

- [x] **Scope bounded in three places** — the Features billing card became "You stay ahead" (updates, profile, competitor tracking); "direct support, a text away" became "monthly updates to your site and your Google profile"; the hero's "Everything handled" became "I build the site, run your Google presence, and get you named when someone asks an AI who to call." Every open-ended promise is now a named deliverable.
- [ ] `[DECIDE]` **Publish the payment terms** — autopay, card on file, 4-month minimum. **This is the one that actually stops non-payers**, and stating it publicly repels the flaky client before they book a call instead of after the work is done. → `components/Pricing.tsx`
- [x] **Agency comparison demoted** — it was the 20px line under the price; it is now a clause in the small terms line, and still the full argument in the FAQ.
- [ ] `[DECIDE]` **Demote the agency comparison from lead argument** (superseded, kept for the reasoning) — leading on cheap recruits price shoppers, and price shoppers are the ones who churn and don't pay. Lead on what they get; let $500 sort the room. Keep the $1,500 figure in the FAQ, where someone already sold is checking they're not overpaying. → `components/Pricing.tsx`

---

## 6. Converge the voice

Rules already decided, not yet enforced everywhere.

- [x] **Converged on "I"** — it was already the majority voice (hero, geo pages, both proof blocks), so "we" was the outlier. Homepage FAQ, `HowItWorks`, and the FaqDeck button ("Ask Me Anything") converted. `/services` still says "we" in its four service cards.
- [x] **Em dashes swept from marketing copy** — three left, all in geo page intros, all replaced with colons.
- [ ] `[BUILD]` **Convert the four `/services` cards to "I"** — the last "we" on a marketing page. → `app/services/page.tsx`

---

## Already shipped

### 2026-08-31 — footer information architecture, and the Why block

- [x] **The footer was four nav columns, one of which was not a nav column.** "Get in touch" carried a phone number, an email, a locality, two legal links and the social icons — five unrelated kinds of thing stacked to fill a slot, which is why "Northeast Houston, TX" landed between an email address and a privacy policy and read as noise. Now: identity and contact on the left, three genuine nav groups on the right, legal and social in the bottom bar with the copyright. A column exists because its contents belong together.
- [x] **"All of Houston" added to Areas**, so the footer reflects the metro tree rather than listing the towns as peers.
- [x] **The Why block is centred and is one paragraph.** `StatementCopy` splits prose into newspaper columns, which is right for a wall of text at the top of a page and wrong under a centred lead, where two ragged columns read as a layout accident. The eyebrow is now small caps, the lead is the big line, the body is one column, and the CTA sits on the centre axis with everything else.

---

### 2026-08-31 — the footer

- [x] **"HQ in 77346" → "Northeast Houston, TX".** The ZIP was never doing work in visible copy: nobody thinks in ZIP codes, and the one that matters is `postalCode` inside `POSTAL_ADDRESS`, which is on every page and is what Google reads against the Business Profile. Verified after the change: absent from the visible page, still in schema.
- [x] **The footer is dark in both themes.** The close is now a dark photograph and the footer was white, so every page ended on a hard bounce. One continuous dark field reads far more expensive. Carries `data-dark-section` so the sticky header inverts correctly over it.
- [x] **The house ramp across the top edge** — Rosso Corsa, Rosso Scuderia, Arancio Xanto, Giallo Orion, Giallo Modena, in chips. Every card on the site wears one stripe of factory paint; this is the only place several appear together, so the last thing on the page is the signature rather than a horizontal rule. The full ten-paint spread was tried first and read as a rainbow.

---

### 2026-08-31 — hero photography

- [x] **The Verdun trench behind the homepage close.** A path running into the treeline under "See what your customers see" — the customer's walk into the search. `object-position: center 72%` holds the crop on the path, because a wide short band throws away most of a 3:2 frame and the subject is in the lower third.
  - **Homepage only, on purpose.** Every other page opens on a photograph of its place or trade, so its close stays the pure blob field; the homepage opens on the blob field, so its close is the photograph. One of each per page, in the opposite order. It is a prop, so rolling it out sitewide is one line if that reads better later.
  - Parallax now measures against the section's own position rather than raw `scrollY`, so it works anywhere on a page instead of only at the top. Verified moving smoothly in both the close and the hero.
- [x] **Nine heroes wired** from `public/hero/`: Houston, Atascocita, Humble, Channelview, Porter & New Caney, plus mechanic, wrap shops, contractors and clinics. `/services` too.
- [x] **The lava lamp survived as an overlay.** `LavaLamp` gained an `overlay` mode: no ink base, and the blur moves from `backdrop-blur` onto the blobs themselves, because a backdrop blur would smear the photograph behind them. `mix-blend-soft-light` makes it read as coloured light crossing the scene rather than paint over it.
- [x] **Parallax**, 0.22 of scroll, image scaled 1.18 so the shift never uncovers an edge. Off below 1024px and off under `prefers-reduced-motion`: a transform fighting touch scroll is the difference between expensive and stuttering. Written straight onto the node from a rAF-throttled handler, never through state.
- [x] **The strip above the navbar is gone.** The header sits in flow, so every hero started 76px down the page (`pt-3` + an `h-16` bar). `PageHero` now pulls up by exactly that and pads it back.
- [x] **Mobile contrast.** The first pass was too light where the sub sits: a narrow frame leaves no dark band for the type the way a wide one does. Gradient tightened, plus `bg-black/25 sm:bg-black/10 lg:bg-transparent`, and the sub went from `white/75` to `white/85`.

Loose ends:

- [x] **Kingwood wired**, and `/services` with it — the services hero had silently failed to apply the first time because the prefill string carried a trailing space my match did not account for. Four other pages had the same leftover space, now trimmed.
- [x] **Text shadow over photographs.** Kingwood is a bright sky over water; the mechanic shot is a dark engine bay. A scrim heavy enough for the first turns the second to mud, so the contrast moved onto the glyphs, where it costs nothing on a dark image and saves a light one.
- [x] **The Why block reveals on hover.** At rest it is the Mugello photograph and the heading, nothing else; pointing at it fades the argument in and deepens the scrim to carry it. Touch (`hover: none`) and keyboard (`focus-within`) get the full card immediately, and the copy is hidden with opacity rather than `display`, so it stays in the DOM for crawlers and the card never resizes under the pointer.
  - **Known cost:** on desktop the "Get My Free Report" button is invisible until someone hovers. Acceptable on `/about`, which is not a conversion path, but it would not be on a page that is.
- [x] **`aboutMotoGP` behind the "Why Queso Ventures exists" block.** Not decoration: the paragraph argues that every big brand has a team of engineers behind it, and Mugello is a photograph of exactly that. Held at 22% under a gradient so it reads as texture.
- [x] **`aboutClouds` is the back face of the portrait**, and the card has two acts. Before the cheese is found: three second hold, auto-flip to the Alps, hover brings him back, leaving returns to the mountains. Clicking finds the cheese and **inverts the polarity** — from then on leaving shows him and arriving shows the cheese, so it reads as the card dodging you rather than obeying you. Clicking the cheese again shakes it. Verified end to end.
  - `prefers-reduced-motion` now skips **only** the unprompted three-second flip. Every hover, click and shake still runs: a setting about autoplay should not delete the easter egg, which is what the first version did.
- [ ] `[DECIDE]` **`businessCard.JPEG` unused.** `/foundCode` was explicitly out of scope.
- [ ] `[BUILD]` **Source files are heavy** — `aboutMotoGP` 10MB, `servicesMain` 7.8MB, `businessCard` 5MB, 37MB of originals in the repo. Next resizes them on request so visitors never download that, but it is in git forever. Worth downscaling to ~2500px before committing.

---

### 2026-08-31 — pricing copy stops foreclosing the roadmap

The plan is to sell tools separately later — loyalty, invoicing, whatever follows — the way AWS sells services on top of an account. Two headings in a row promised the opposite.

- [x] **"One plan. Everything in it." → "What $500 covers."** A scope statement, not a totality claim. "One plan. One price." had the same fault and was replaced by a rewording of the same fault, so the reasoning is now a doc comment in `siteCopy.ts` with an explicit **do not reintroduce "one plan", "everything", or "all included"**.
- [x] **"everything included" removed** from the cost FAQ on the homepage and the Houston hub, replaced with what the money actually buys.
- [x] Nothing about future tools was added. Advertising a catalogue that does not exist yet is a different mistake; the copy just stops ruling it out.

**Standing rule:** pricing copy names what the fee covers and never claims it is all there is to buy.

---

### 2026-08-31 — the geography, restructured

**See `SCALING-GUIDE.md`.** That is the document to follow when adding places; this is the record of what changed.

- [x] **Metro tree replaces the flat town list.** `components/places.ts` holds the structure, `content/houston.ts` holds Houston and its towns. Adding a metro is a new file in `content/` plus one line in `CITIES` — sitemap, footer, nav, breadcrumbs and cluster links all read from it.
- [x] **Breadcrumbs are hierarchical.** `Home > Houston > Kingwood`, verified in the built HTML. That is what tells Google these are one cluster rather than six unrelated town pages.
- [x] **`/web-design-houston-tx` created** as the hub every town links up to. **Its prose is a draft and is marked as such in the file** — the structure is the part that matters. Two rules for whoever rewrites it are in the file's doc comment.
- [x] **Summerwood & Fall Creek retired.** Zero impressions in three months and functionally Humble to anyone searching. 308 permanent redirect to the Humble page, verified.
- [x] **`WhyLocal` deleted.** Its CTA was a phone call, and the question it answered ("why is this page about one corner of Texas") is now answered structurally by the breadcrumb and the cluster block. `WhyRemote` survives for the QR landing pages, with its phone CTA swapped for the report.
- [x] **Trade pages link down to the towns** via `PlaceLinks`, so a trade page reaches Kingwood without there being an auto-shops-in-Kingwood page.

**No trade × neighborhood grid, ever.** Thirty pages differing by two nouns is a doorway network and Google discounts the domain, not just the pages. The data agrees: geo pages took 64 impressions in three months, trade pages took 4. Reasoning is in the guide and in `places.ts`.

- [ ] `[BUILD]` **Show the pulled Google data back to the visitor** — Place Details returns rating, review count, category and city (confirmed live: Snowflake Donuts, 4.8, 355 reviews, Donut Shop, Westview Dr). Rendering it in the demo card and the form is how someone confirms it grabbed the right shop, and it belongs in the lead email for triage. Note it is a second, more expensive call than autocomplete, so fire it only on pick, never per keystroke.

---

### 2026-08-31 — the demo you can take over

- [x] **Split hero restored.** The search demo is back beside the copy, over the blob field. Putting it in its own band below the fold was the wrong call: it is the only thing on the page that shows rather than tells.
- [x] **"Soon to be reality" label + explicit Enter button.** The mock puts whoever is named at number one with five stars. Against "Your Business" that reads as the illustration it is; against a real name and a real street it edges toward a claim about where they rank today. The label appears only once the card is about someone, and never during the idle reel. A typed name Google does not list can now be committed with a visible **Enter** button (the key works too) and lands in the same place, minus the place_id.
  - The modal is **not** auto-opened on Enter. Seeing your own shop at number one is the moment the page is built around, and covering it with a form the instant it lands throws that away. The button underneath is one click and keeps the moment.
- [x] **The demo is now the lead capture.** Click into the search box and the reel stops; type and it becomes a live Places lookup; pick yourself and the mock result stops saying "Your Business" and says your name, your street, your rating slot. The button under it carries the name *and* the place_id into the contact form, so nothing is retyped. This is the automation seed: the whole report hangs off that id.
- [x] **Pricing on the lava lamp.** Centred type on flat cream read as an undesigned slide. It is now a card over the blob field, matching the close.
- [x] **The close cut to a title and one line.** "Find out what your customers actually see" plus three lines of sub became "See what your customers see." / "A free report on where you show up today." Nothing on screen that is not the promise or the button.
- [x] **"Free. Takes about a minute." dropped** — unreadable at that weight and doing no work.
- [x] **Nav dropdown quieted.** Twelve links of identical weight on a dark slab, no hierarchy. Now two labelled columns, muted links, colour-change hover instead of fills.
- [x] **Food trucks and restaurants unlisted.** New `unlisted` flag on `Industry`: out of the nav, the footer, the on-page lists and the marquee, while the page stays live and **in the sitemap**. Inbound is still welcome; going after it is not.
- [x] **FAQ added to `/services`** with FAQPage schema — six entries built around the queries that already rank there and take no clicks. That page has been "Discovered - currently not indexed" since launch, which is what Google says about a page it judged not worth fetching. Thin content was the likely cause.
- [x] **Places radius bug fixed.** 100km was over the API's 50km ceiling, so every lookup was rejected with INVALID_ARGUMENT and my route swallowed it as "no matches". Failures now log the response body, because a rejected request and a genuine no-match render identically.

---

### 2026-08-31 — the offer, and what the site is allowed to say

**The portal is the source of truth.** `@quesoventures/billing` in quesoVentures-portal generates the terms clients agree to; `terms.test.ts` asserts the stored version matches. The site must never contradict it, and must never recite it. Those are different jobs: `pricingCopy.ts` mirrors the constants so nothing on the site can drift, but almost none of them render.

Rules pulled back off the site — they belong in the conversation and in onboarding:

- [x] Removed the failed-payment escalation, the exit options, and the tech-hours boundary from the FAQ
- [x] Pricing terms line back to the minimum a prospect needs before a call. No autopay, no notice period, no late fees.
- [x] `TECH_HELP` ($75/hr, 1 hr minimum, or $200/mo for 4 hours) stays in `pricingCopy.ts`, rendered nowhere, so the verbal quote is consistent

Kept, because these were the site *contradicting* the contract rather than reciting it:

- [x] "One plan. One price." → "One plan. Everything in it." The terms say clients upgrade.
- [x] "No hourly billing" removed from four places. False the moment tech help exists.
- [x] "Custom tools built for your business over time" added. It was in the contract and nowhere on the site, and it is the best reason to pick an engineer over an agency.
- [x] "a few weeks" → eight to twelve weeks, matching what onboarding tells them.

**The offer changed.** "See What I'd Build" promised something nobody could picture and quietly committed to building a website for every stranger who asked.

- [x] **"Get My Free Report"** — what someone searching right now actually finds, whether an AI assistant names them, and the first thing worth fixing. One hour instead of a week, automatable later without the button changing, and it demonstrates the service by performing it.
- [x] The hand-built preview moved to step three, after they reply. Still the strongest thing in the pitch; no longer a public promise to everyone.
- [x] Steps rewritten to the real sequence: send your business name, get your report, see your preview.

Competitor read — owner.com, the direct comparison:

- H1 "The AI platform restaurants use to grow online discovery." CTA **"Get my AI report"**, from a restaurant-name dropdown. **No price anywhere on the site.**
- "more traffic, more sales, more repeat customers" — near-identical to this site's headline, which is reassuring rather than a problem.
- Positioning as of Aug 2026 is "AI CMO and CTO for local businesses", on $240M raised. Their AI CTO is software. Ours is a person who builds custom tools, which is the wedge and is already in the contract.

- [x] **Google business picker on the form** — `components/BusinessPicker.tsx` + `app/api/places/route.ts`. Picking your own shop out of a dropdown, right name right street, is the moment the form stops feeling like a contact form. It also captures a `place_id`, which is what makes the report automatable: Business Profile, rating, review count and category all hang off it, and the lead email now carries a direct Maps link.
  - Needs `GOOGLE_PLACES_API_KEY` (Places API New) in the environment. **Without it the field is a plain text input and the form works exactly as before** — verified, along with the bad-key path, which falls through to "Can't find it? Type it in instead."
  - The key is proxied server-side, never shipped to the browser.
- [x] **Price out of the hero** — it sat under the button, above the fold, before the page had made a single argument. Full pricing section unchanged further down.
- [x] **"$0 until you've seen it"** — the referent was two sections away. Now "Nothing to pay until you've seen your report and what I'd build."
- [ ] `[BUILD]` **Automate the report.** It is the same analysis as the Site Sight doc. Automating it turns the funnel from hand-built previews, which cap out around five a month, into something that scales, and it is the AI-CTO proof by demonstration.
- [x] **Price stays on the site, but not at the top.** Revised recommendation: the filter argument for showing $500 assumed a quality problem, and the numbers say the problem is volume — 9 clicks in three months. Filtering the top of an empty funnel just empties it further. But hiding the price entirely would buy back the exact bad-lead problem the raise was meant to fix, and transparent pricing is the whole differentiator against agencies. So: gone from the hero and from every meta description, kept in full in the pricing section, where a reader who scrolled that far is looking for it.
- [ ] `[RULE]` **Never name a competitor on the site**, or describe what one does well. The audience has not heard of them and a curious reader is a lost reader. Competitor analysis lives in this file only.

---

### 2026-08-31 — the conversion-path pass

Every call the published number has produced has been spam. That kills the "maybe they're calling instead of clicking" reading of the Search Console data, and it makes the phone number a liability in two places at once.

- [x] **Phone out of every meta description** — added in the pass below, removed here. A number in a search snippet is trivially harvested, it produced nothing but spam, and it was spending twenty-two characters that now sell the free preview. It stays on the page and in the `LocalBusiness` schema, where NAP consistency with the Google Business Profile requires it.
- [x] **One CTA in the navbar.** The quiet phone link beside the pill came out, and the mobile drawer's filled "Call" button became an ordinary menu item — it was a second primary competing with the pill in the bar directly above it. The number stays in the footer of every page, in the mobile menu, on every hero, and in the `LocalBusiness` schema, which is what NAP consistency with the Google Business Profile actually requires.
- [x] **The header pill is the form, not the dialer** — the most valuable button on every page was a phone number working for nobody. The number stays beside it as a quiet text link. Mobile's always-visible tap target changed too.
- [x] **The form went from three required fields to two, and lost the essay** — it asked for name, email, and a *required* paragraph describing the problem, which is the thing they are hiring him to work out, typed on a phone between jobs. Now: business name or website, email or phone, and an optional note.
- [x] **`name` now carries the business, not the person** — enough to look them up, which is all the free-preview offer actually needs. Lead emails now subject-line the business.
- [x] **Prefills are complete sentences** — every one used to end "Here's my current situation:", an open colon demanding an essay. In a now-optional field that reads as homework.
- [x] **API: message optional, contact shape-checked** — one fewer required field is one less thing a naive bot has to get right, so the endpoint now rejects a contact that is neither an email nor ten digits. Honeypot unchanged.
- [x] **Modal title echoes the button that opened it** — clicking "Free Preview" no longer opens something headed "Get in Touch".

Still worth doing:

- [ ] `[DECIDE]` **The Google Business Profile is the likelier spam source** — the number is public there and that is what lead-gen scrapers mine hardest. Nothing in this repo can fix it. Google Voice in front of the published number, with the real one kept private, is the usual answer.
- [ ] `[DATA]` **Read `cta_click` and `contact_submit`, not `call_click`** — the analytics comment calling calls "the single most valuable signal on the site" has been corrected in place.

---

### 2026-08-31 — the CTR and layout pass

Driven by Search Console, 2026-05-28 to 2026-08-28: **554 impressions, 9 clicks, 1.6% CTR**, sitting at position 4.3 for "web development" (81 impressions), 1.0 for "seo services", 1.0 for "web design", 2.1 for "local seo" — and taking zero clicks from any of them. Ranking was never the problem.

- [x] **Every title and description rewritten** — `metaFor()` and `metaForIndustry()` in `siteCopy.ts`, length-aware so a long city name added later cannot break its own snippet. Price came out of every snippet, street names came out, "Built by an Engineer" went in.
- [x] **One centre axis, everywhere** — hero, credibility, outcomes, steps, price, close. The pricing block had five type sizes down its left edge with a button hanging off none of them; it is now one column.
- [x] **The lava lamp**, ported from the Queso Rewards landing page — `components/LavaLamp.tsx`. Behind the hero when a city has no photo, and behind the close on every page.
- [x] **`PageHero` takes a full-bleed background image** — Hero and PageHero are now the same component shape, so the homepage and every city page match.
- [x] **Header background fixed** — `bg-cheese-header-light`/`-dark` were never defined in `tailwind.config.js`, so the header pill had no background at all. Only visible once the hero went dark. Now `bg-headerLight dark:bg-headerDark`.
- [x] **Repositioned on the outcome** — "More first-time customers. More repeat customers." replaces "Your next customer is searching right now." Third outcome card is now "They come back."

**To give a city its photograph:** drop the file in `/public`, then add one line to that page's data object:

```ts
heroImage: { src: "/kingwood-pines.jpg", alt: "Pines along Kingwood Drive" },
```

Nothing else changes. Without it the hero falls back to the lava lamp, so no page is ever a blank screen waiting on a picture.

### Earlier that day — the tightening pass

- [x] **`components/siteCopy.ts`** — every word on the shared sections in one file, as `siteCopy({ city })`. Hero, outcomes, steps, pricing, and the close all take their copy as a prop. `siteCopy({ city: "Fort Worth" }).audit` produces a Fort Worth close with no component fork. This is the multi-city groundwork: the shared sections are now interchangeable, and the per-city prose still stays hand-written.
- [x] **-42% card blocks sitewide** — see workstream 1
- [x] **`MONTHLY_PLAN_OFFER`** — the plan as `UnitPriceSpecification` with `eligibleDuration`, on the Service node of all 13 pages that have one. AEO carried by structured data instead of repeated prose.
- [x] **Every template closes on the CTA**

### Earlier

- [x] **Price raised $300 → $500** — 20 files, verified zero occurrences left
- [x] **Agency comparison standardised** — 11 FAQ answers now pair the price gap with the capability gap ("Agencies charge $1,500 or more and still have no answer for customers who ask an AI assistant who to call")
- [x] **`CityPageTemplate` built** — one shape, two depths, gated on the optional `seo` block
- [x] **Supporting pieces** — `cityPageData.ts`, `cityMetadata.ts`, `WhyRemote.tsx`, `pricingCopy.ts`. All additive, typecheck clean, `why_remote` added to the `Placement` union
- [x] **Houston output proven untouched** — all 20 pages identical in visible text, meta tags, and JSON-LD

---

## How to verify a change didn't break Houston

1. Copy `.next/server/app/*.html` to a scratch folder **before** editing
2. Rebuild
3. Compare the two sets on **visible text, meta tags, and JSON-LD** — not raw bytes

A plain `diff` is useless here: every page renders as a single long line, so a changed build-chunk hash reports as a whole-file difference. Only the semantic comparison tells you whether a word actually moved.

---

## Architecture notes (context for future sessions)

- **Interchangeable per place:** `siteCopy.ts` holds the shared-section words as `siteCopy({ city })`. `Hero`, `Features`, `HowItWorks`, `Pricing`, and `FreeAudit` each take a `copy` prop defaulting to the flagship version, so a new city means one data object, not a component fork. Only two phrases actually vary ("nearby" / "in {city}", "local search" / "{city} search") — deliberately, since a page whose entire body is city-name substitution is a doorway page.
- **Centralized:** `GeoPageTemplate.tsx` (markup/layout/JSON-LD shape), `businessInfo.ts` (name/phone/address/priceRange/schema helpers), `serviceAreas.ts` (city + industry lists), `app/sitemap.ts` (auto-generates from those lists)
- **Per-city by design:** each `app/web-design-*/page.tsx` is one `GeoPageData` object, ~700 words of original local copy. **Do not templatize the words** — city-name-swapped boilerplate is a doorway page and gets demoted. The local specificity is the asset.
- **Two page types:** `GeoPageTemplate` (existing, Houston-area, proximity proof) and `CityPageTemplate` (new, additive, `proof: "local" | "remote"` + optional `seo` block)
- **Design system:** `components/livery.ts` (Ferrari factory paints as accents only, never surfaces) + `tailwind.config.js` (cream `#FFF8EC` / ink `#0B0D12`, Inter Tight)
