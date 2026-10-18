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
      sub: `Websites, SEO, and AI-SEO for ${where}, built by a software engineer.`,
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

    /**
     * The two-card picture section on the homepage.
     *
     * Left card: getting found, shown with a live search of their own business.
     * Right card: what happens after, shown as a reel of the actual tools.
     *
     * Keep each title to one line at desktop width — the card puts it under a
     * graphic, and a third line pushes the graphic out of frame on a phone. The
     * right-hand body must stay neutral on billing: the plan is to sell tools
     * separately later, so "added as your business needs them" and never
     * "included".
     */
    showcase: {
      heading: "Queso Ventures Recipe",
      sub: "Measured for you",
      cards: [
        {
          title: "Apply a strong foundation layer.",
          body: `Google, Maps, and the AI chatbots people now ask instead. When someone ${nearYou} looks for what you do, they find you.`,
        },
        {
          title: "Then mix in some tweaks and optimizations to taste.",
          body: "I check the data, make the changes, and keep watching. Every week, not once.",
        },
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
      sub: `${PRICING.monthlyLabel} a month covers the foundation and the work that never stops: your website, your search rankings, and how AI tools find you. Then we sprinkle in the tools I build for your business.`,
      /*
        One line each, and that is a constraint rather than a preference: the
        card is 672px wide and anything past about sixty characters wraps, which
        turns a checklist into a paragraph with ticks down the side.

        Note the backticks. The city line was written with ${city} inside a
        plain double-quoted string, so it rendered the dollar sign and the
        braces literally on every page.
      */
      included: [
        "A website built, hosted, and sharpened every single day.",
        "SEO and AI-SEO: found on Google, Maps, ChatGPT, and Siri.",
        `Custom tools built for ${where} owners to keep earning dough.`,
        "Analysis with clear next steps, not weightless statements.",
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
      terms: `${PRICING.minimumMonths} month minimum, then we are month to month.`,
    },

    /**
     * The free thing, bounded.
     *
     * "See What I'd Build" promised something nobody could picture and quietly
     * committed to building a website for every stranger who asked. The offer
     * is now a report: what someone searching right now actually finds, whether
     * an AI assistant names the business, and the first thing worth fixing.
     * It costs an hour instead of a week, and it demonstrates the service by
     * performing it.
     *
     * It is now automated end to end — the form hands the lead to the portal,
     * which reads their listing and mails them the report before they have put
     * their phone down — and the button never changed, exactly as planned.
     *
     * The hand-built preview still happens — it is the strongest thing in the
     * pitch and no competitor at scale can match it — but it moves to the reply,
     * once someone has answered. At current volume that is affordable. As a
     * public promise to everyone, it was not.
     */
    audit: {
      /*
        A question, and the one the owner is already asking.

        "See what your customers see" asked the reader to picture themselves as
        somebody else looking for themselves, which is two hops of imagination
        standing between them and a button. This is one hop: you do not know
        where you come up, and the button tells you. It also names all three
        surfaces the report actually covers, which the old pair never did.
      */
      heading: "Where do you show up?",
      sub: "A free report on Google, Maps, and what AI tells people about you.",
      cta: "Get My Free Report",
      ctaPrefill:
        "I'd like the free report on where my business shows up.",
    },
  };
}

/** The flagship site's copy. */
export const SITE_COPY = siteCopy();

export type SiteCopy = ReturnType<typeof siteCopy>;
