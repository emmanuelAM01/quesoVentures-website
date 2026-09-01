import { PRICING } from "components/pricingCopy";

/**
 * Every word on the shared sections, in one place.
 *
 * The shared sections say the same thing on every page. What changes between
 * places is a handful of phrases: "nearby" becomes "in Fort Worth", "Houston
 * web design" becomes "Fort Worth web design". Rather than fork the components
 * per city, they take their copy as a prop and this function builds it.
 *
 *   <Features />
 *   <Features copy={siteCopy({ city: "Fort Worth" }).outcomes} />
 *
 * This is safe to interpolate because none of it is a ranking claim about a
 * place. The city and industry pages still hand-write their own prose —
 * swapping a city name through boilerplate is what a doorway page is, and
 * Google demotes it. Shared, honest, non-local copy is the only thing here.
 *
 * House style: short. Two sentences beats four. The reader is a shop owner on
 * a phone between jobs, not someone reading an article.
 */
export interface PlaceContext {
  /** "Kingwood", "Fort Worth". Omit for the flagship site. */
  city?: string;
}

export function siteCopy({ city }: PlaceContext = {}) {
  const where = city ?? "Houston";
  /** Mid-sentence, after a verb: "someone {nearYou} looks for what you do". */
  const nearYou = city ? `in ${city}` : "nearby";

  return {
    hero: {
      // The promise, not the mechanism. Both halves are things the current
      // client book can actually evidence, which is why they lead.
      headline: "More first-time customers. More repeat customers.",
      // Where the search terms live, since the headline carries none. Someone
      // who searched "website designer" needs to see the word on landing.
      sub: `${where} web design and local SEO, built by a software engineer.`,
      cta: "Get My Free Report",
      ctaPrefill:
        "I'd like the free report on where my business shows up.",
    },

    /** Three cards. Icons stay in the component and pair by index. */
    outcomes: {
      heading: "What you get",
      sub: "Three things, every month.",
      cards: [
        {
          title: "They find you",
          body: `Google, Maps, and AI assistants. When someone ${nearYou} looks for what you do, you're the one they see.`,
        },
        {
          title: "They call you",
          body: "A site that loads fast and makes calling the obvious next step, especially on a phone.",
        },
        {
          title: "They come back",
          body: "Reviews, repeat bookings, and a reason to return. Getting found is the start, not the finish.",
        },
      ],
    },

    steps: {
      heading: "How it works",
      items: [
        { title: "Send your business name", body: "That is the whole form." },
        { title: "Get your report", body: "Where you show up now, and what is costing you calls." },
        { title: "See your preview", body: "If it is worth fixing, I build it before you decide anything." },
      ],
    },

    pricing: {
      /**
       * A scope statement, not a totality claim, and that is deliberate.
       *
       * This has now been wrong twice in the same way. "One plan. One price."
       * and "One plan. Everything in it." both promise that $500 is the only
       * thing there is to buy. The onboarding terms already contradict it
       * (clients upgrade for priority builds), tech hours contradict it, and
       * the roadmap contradicts it hardest: the plan is to sell tools
       * separately — loyalty, invoicing, whatever comes after — the way AWS
       * sells services on top of an account.
       *
       * So the heading answers "what does the $500 buy" and says nothing about
       * what else exists. Adding a subscribable tool later is then an addition
       * to the page rather than a correction of it.
       *
       * Do not reintroduce "one plan", "everything", or "all included" here.
       */
      heading: "Your Queso Plan",
      amount: PRICING.monthlyLabel,
      period: "/ month",
      // "No hourly billing" had to go: tech help is billed hourly. It was
      // always true of the plan and never true of the business.
      /**
       * Has to stand on its own: the pricing card does not render it any more,
       * and /services uses it as a whole paragraph with nothing above it.
       */
      sub: `${PRICING.monthlyLabel} a month covers the website, your Google and AI visibility, and the tools I build for your business. No setup fee, no surprise invoices.`,
      included: [
        "Your website, built, hosted, and maintained",
        "Google and Maps presence that gets you found",
        "Set up so ChatGPT and Siri recommend you by name",
        // Straight out of the terms, and the single best reason to pick a
        // software engineer over an agency. It was in the contract and
        // nowhere on the site.
        "Custom tools built for your business over time",
        "A monthly note on what's ranking and what's next",
      ],
      cta: "Let's Talk First",
      ctaPrefill:
        "I want to talk about getting my business found online.",
      // The agency comparison sits here, small, rather than leading the
      // section. Leading on cheap recruits price shoppers.
      // Deliberately thin. Billing dates, notice periods, late fees and exit
      // options are all real and all live in the portal's onboarding terms,
      // which is where a client actually meets them. A landing page that opens
      // with the rules loses the reader before the rules matter.
      terms: `Nothing to pay until you've seen your report and what I'd build. ${PRICING.minimumMonths} month minimum, then month to month. Agencies charge ${PRICING.agencyAnchor} for less.`,
    },

    /**
     * The free thing, bounded.
     *
     * "See What I'd Build" promised something nobody could picture and quietly
     * committed to building a website for every stranger who asked. The offer
     * is now a report: what someone searching right now actually finds, whether
     * an AI assistant names the business, and the first thing worth fixing.
     * It costs an hour instead of a week, it can be automated later without the
     * button ever changing, and it demonstrates the service by performing it.
     *
     * The hand-built preview still happens — it is the strongest thing in the
     * pitch and no competitor at scale can match it — but it moves to the reply,
     * once someone has answered. At current volume that is affordable. As a
     * public promise to everyone, it was not.
     */
    audit: {
      heading: "See what your customers see.",
      sub: "A free report on where you show up today.",
      cta: "Get My Free Report",
      ctaPrefill:
        "I'd like the free report on where my business shows up.",
      reassurance: "",
    },
  };
}

/** The flagship site's copy. */
export const SITE_COPY = siteCopy();

export type SiteCopy = ReturnType<typeof siteCopy>;

/**
 * Titles and descriptions, by the numbers.
 *
 * Search Console, 2026-05-28 to 2026-08-28: 554 impressions, 9 clicks, 1.6%
 * CTR. The site sat at position 4.3 for "web development" (81 impressions),
 * 1.0 for "seo services", 1.0 for "web design", 2.1 for "local seo" — and took
 * zero clicks from any of them. Ranking was never the problem. The snippet was.
 *
 * Three things changed:
 *
 * 1. The price came out. "$500 a month" in a snippet at position 4 disqualifies
 *    the reader before the page gets to argue for itself. Price filters better
 *    on the page, after they have seen the work.
 * 2. The promise replaced the street names. Nobody searched "Sheldon Road".
 * 3. "Built by an engineer" went in the title. Every competing result on that
 *    page says web design; none of them say who is doing it.
 *
 * The phone number came out afterwards, for the same reason the price did.
 * Every call the number has produced so far has been spam, a number sitting in
 * a search snippet is trivially harvested, and it was spending twenty-two
 * characters that now sell the free preview instead. The number still appears
 * on the page and in the LocalBusiness schema, where it belongs.
 */
const META_PROMISE = "More first-time customers, more repeat customers.";

/**
 * Google truncates titles around 60 characters and descriptions around 155.
 * A cut-off snippet reads as carelessness, so both helpers fall back to a
 * shorter form rather than overrun — which also means a long city name added
 * later cannot silently break its own snippet.
 */
const TITLE_MAX = 60;
const DESC_MAX = 155;

export function metaFor(
  place: string,
  /**
   * Override when a page would otherwise collide with another.
   *
   * The homepage and the Houston hub both called `metaFor("Houston")` and
   * came out byte-identical, which is two pages bidding for one query with the
   * same snippet — Google picks one, and often not the one you wanted.
   */
  override: { title?: string; description?: string } = {}
) {
  const withHook = `${place} Web Design & SEO, Built by an Engineer`;
  const withPhone = `Web design and local SEO for ${place}. ${META_PROMISE} See a free preview of your site before you decide anything.`;
  return {
    title:
      override.title ??
      (withHook.length <= TITLE_MAX ? withHook : `${place} Web Design & Local SEO`),
    description:
      override.description ??
      (withPhone.length <= DESC_MAX
        ? withPhone
        : `Web design and local SEO for ${place}. ${META_PROMISE} Free preview, no commitment.`),
  };
}

/** For the industry pages, where the trade is the search term, not the town. */
export function metaForIndustry(trade: string, titleTrade: string) {
  const title = `${titleTrade} Web Design & SEO | Houston TX`;
  const withPhone = `Web design and local SEO for Houston area ${trade}. ${META_PROMISE} See a free preview before you decide anything.`;
  return {
    title,
    description:
      withPhone.length <= DESC_MAX
        ? withPhone
        : `Web design and local SEO for Houston area ${trade}. ${META_PROMISE} Free preview, no commitment.`,
  };
}
