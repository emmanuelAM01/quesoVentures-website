# Adding cities and neighborhoods

How the geography of this site is structured, and what to do when you add to it.
Last updated: 2026-08-31

---

## The shape

```
/                              the homepage
└── /web-design-houston-tx     PRIMARY  — the metro hub
    ├── /web-design-kingwood-tx      neighborhood
    ├── /web-design-humble-tx        neighborhood
    ├── /web-design-atascocita-tx    neighborhood
    ├── /web-design-porter-tx        neighborhood
    └── /web-design-channelview-tx   neighborhood

    /seo-for-auto-shops-houston      trade, METRO LEVEL
    /seo-for-contractors-houston     trade, METRO LEVEL
    ...
```

Every neighborhood links up to its metro. Every trade page links down to the
neighborhoods. The metro page is the only one that links to everything, which is
what makes it the hub rather than a sixth sibling.

Breadcrumbs follow the tree: `Home > Houston > Kingwood`. That is how Google is
told these are one cluster instead of six unrelated town pages.

## Where things live

| What | File |
|---|---|
| The tree, and the helpers that read it | `components/places.ts` |
| Houston's structure and link copy | `content/houston.ts` |
| Each page's long-form prose | `app/web-design-*/page.tsx` |
| The cluster link block | `components/PlaceLinks.tsx` |

`places.ts` is types and wiring; you should rarely touch it. `content/houston.ts`
is the file you edit. Adding a metro is a new file next to it.

---

## The rule that matters most

**There is no trade × neighborhood grid.** No auto-shops-in-Kingwood page, ever.

Six neighborhoods × five trades is thirty pages that differ by two nouns. That is
the textbook shape of a doorway network, and Google does not penalize just the
thirty pages, it discounts the domain that built them.

The numbers say you would not want them anyway. Search Console, 2026-05-28 to
2026-08-28:

| | impressions |
|---|---|
| Geo pages (5) | **64** — Kingwood 37, Atascocita 13, Humble 10, Porter 3, Channelview 1 |
| Trade pages (5) | **4** — auto shops 3, contractors 1, three at zero |

Sixteen to one. Nobody searches "kingwood mechanic website". They search
"web design kingwood texas". Place is the axis that carries this site.

So: **neighborhood pages name trades, they are not about trades.** A sentence in
the pain points saying who this is for is right. A section headed "auto shops in
Kingwood" is the beginning of the grid.

---

## Adding a neighborhood to an existing metro

1. Add it to `neighborhoods` in `content/houston.ts` — name, slug, tagline, ZIP.
2. Create `app/web-design-{town}-tx/page.tsx`. Copy the nearest existing page and
   replace **every** sentence.
3. That is it. Sitemap, footer, nav, breadcrumbs and cluster links all pick it up.

**Write it by hand.** The one thing that must never be templated is the prose. A
page that is another page with the town name swapped is a doorway page, and the
local specificity is the entire asset — it is why Kingwood ranks at all.

What makes a neighborhood page worth having:

- Named streets, subdivisions, corridors. "Valley Ranch, Tavola, Roman Forest",
  not "the local area".
- A reason this town is different from the one next to it. Porter is new rooftops;
  Kingwood is established word-of-mouth. If you cannot say what makes it
  different, it should not have a page.
- Questions people in *that* town would ask, in the FAQ.

**When not to add one.** If it is functionally the same place as a town you
already cover, skip it. Summerwood & Fall Creek was removed on 2026-08-31: zero
impressions in three months, and to anyone searching it is Humble. A town page
nobody searches is bloat, and enough of them make the whole cluster look padded.

---

## Adding a new primary city

1. `content/dallas.ts`, exporting a `PrimaryCity` shaped like `HOUSTON`.
2. Add it to `CITIES` in `components/places.ts`.
3. Create `app/web-design-dallas-tx/page.tsx` — the metro hub.
4. Add neighborhoods underneath as above, once you know which ones are worth it.

Start with the metro page alone. Neighborhoods earn their pages by being places
you can write two hundred specific words about; adding five thin ones on day one
is how a new city cluster starts life looking generated.

Note the metro page's own rule: it must not read as a longer neighborhood page.
"Web design Houston" is a harder, broader query than "web design kingwood tx",
and a hub that just says Houston in Kingwood's sentences competes with its own
children and loses to both.

---

## Retiring a page

Never just delete it. Add a permanent redirect in `next.config.js` pointing at
the nearest real page, so the equity moves and old links still land somewhere.
`/web-design-summerwood-tx` → `/web-design-humble-tx` is the worked example.

---

## Checklist before you ship a new place page

- [ ] Every sentence is original to this page
- [ ] Names at least three specific streets, subdivisions or corridors
- [ ] Says something true of this town and not the one next door
- [ ] Registered in `content/{metro}.ts`
- [ ] Breadcrumb shows `Home > Metro > Town`
- [ ] Appears in `sitemap.xml` after a build
- [ ] No trade-specific section headings
