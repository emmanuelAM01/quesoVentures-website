# Manual steps — the part the code can't do

The site changes are done and deployed-ready. These are the off-site actions, in
priority order. Items 1–3 matter more for getting the phone to ring than
everything in the codebase combined.

---

## 1. Google Business Profile (do this first)

Your GBP, not your website, decides whether you appear in the map pack for
"web designer near me." The site now supports it — matching phone, matching
locality, `sameAs` pointing at your profile — but the profile has to be right.

- [ ] **Switch to a service-area business.** Remove the house address so it
      stops showing publicly. Set service areas to: Atascocita, Humble,
      Kingwood, Summerwood, Fall Creek, Porter, New Caney, Channelview,
      Crosby, Huffman.
- [ ] **Phone: (281) 203-4531.** Must match the site character for character —
      it now appears in the header, footer, hero, every geo page, and the
      `LocalBusiness` schema.
- [ ] **Website field: `https://www.quesoventures.com`** — the `www` version.
      Pointing it at the apex sends the signal to a URL that only redirects.
- [ ] **Primary category: Website Designer.** Secondary: Internet Marketing
      Service, Marketing Agency.
- [ ] **Business name: Queso Ventures.** Exactly that — no "| Web Design
      Houston" keyword stuffing, which risks suspension.
- [ ] Add photos: your work, your setup, you. Profiles with photos get
      meaningfully more calls than profiles without.

## 2. Reviews — your single biggest lever

Below roughly five reviews you are close to invisible in the local pack no
matter how good the site is. You have clients in Miami, Conroe, The Woodlands,
Rosenberg, Jordan Ranch, Madisonville, and Fort Worth.

- [ ] Ask five of them this week. Send the GBP review link directly — a link
      converts several times better than "look us up on Google."
- [ ] Reply to every review, including the good ones. Google reads the replies.

## 3. Search Console

- [ ] **Delete the apex sitemap.** Two are currently submitted:
      `quesoventures.com/sitemap.xml` (11 URLs, stale) and
      `www.quesoventures.com/sitemap.xml`. Keep only the `www` one. The apex
      copy just redirects and splits the signal.
- [ ] **Resubmit** `https://www.quesoventures.com/sitemap.xml` — it now has
      **18 URLs**, up from 13. Four blog URLs came out; `/contact`, three new
      towns, and two new industry pages went in.
- [ ] **Request Indexing** (URL Inspection → Request Indexing) on each of these.
      The first three were in the sitemap for a month and never crawled,
      because until now nothing linked to them:
  - [ ] `/seo-for-contractors-houston`
  - [ ] `/seo-for-med-spas-houston`
  - [ ] `/website-for-food-trucks-houston`
  - [ ] `/services`
  - [ ] `/contact` *(new)*
  - [ ] `/seo-for-auto-shops-houston` *(new)*
  - [ ] `/seo-for-wrap-shops-houston` *(new)*
  - [ ] `/web-design-channelview-tx` *(new)*
  - [ ] `/web-design-porter-tx` *(new)*
  - [ ] `/web-design-summerwood-tx` *(new)*
  - [ ] `/web-design-atascocita-tx` — **re-request this one specifically.**
        Google had clustered it against an unrelated spam domain
        (`747live.bet`). The page's own canonical was always correct; it now
        also has a ZIP, neighborhood names, inbound internal links, and
        breadcrumbs, which is what breaks a bad cluster.
- [ ] **The blog is gone.** `/blog` and its three posts now return 404. They
      were never indexed, so there is nothing to redirect and no ranking to
      lose — Google will simply drop them. Expect the "not indexed" count in
      Search Console to fall by four over the next few weeks. That is the
      cleanup working, not a problem.
- [ ] Ignore the "Redirect error" verdict on `https://quesoventures.com/`. That
      is Search Console noting the apex redirects to `www`. It is the correct
      end state, not a defect.

## 4. Replace the placeholder in the code

- [ ] `components/businessInfo.ts` → `BUSINESS.gbp` currently holds the
      `share.google` short link. Open your profile, copy the full
      `https://www.google.com/maps/place/...` URL, and paste it in. The
      canonical Maps URL is a stronger `sameAs` signal than a redirect.

## 5. What to watch, and when

Do **not** judge this by leads in week one. The order things move:

| When | What should change |
|---|---|
| 3–10 days | The 11 uncrawled URLs start showing as indexed |
| 2–4 weeks | Impressions appear for `atascocita`, `humble tx`, `channelview` queries |
| 4–8 weeks | CTR climbs — the titles now name the town instead of "Houston" |
| 6–12 weeks | Map pack positions move, *if* the reviews happened |

The leading indicator is **impressions on town-name queries**, not clicks.
Clicks follow titles; calls follow reviews.

One query to watch specifically: you already sit at **position 1 for
`seo channel view tx`** with 20 impressions and, until now, no page to send
them to. `/web-design-channelview-tx` exists now. That should be the first
thing that moves.
