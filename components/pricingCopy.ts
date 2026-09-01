import { BUSINESS } from "components/businessInfo";

/**
 * Every number and sentence about price, in one place.
 *
 * These used to live as literal strings inside each city and industry page,
 * which meant a rate change was a twenty file find and replace. New pages read
 * from here so the next change is one edit.
 *
 * The existing pages still carry their own copies. Retrofitting them is a
 * separate, deliberate pass.
 */
/**
 * The portal is the source of truth, always. `@quesoventures/billing` in the
 * quesoVentures-portal repo generates the terms a client actually agrees to and
 * `terms.test.ts` asserts the stored version matches. Nothing can import across
 * the two repos, so this is a hand-kept copy and the portal wins every
 * disagreement.
 *
 * Most of these never render. They are here so that nothing on the site can
 * contradict the contract, not so the site can recite it: billing dates, notice
 * periods, late fees and exit options belong in the conversation and in
 * onboarding, and a landing page that leads with the rules loses the reader
 * before the rules matter.
 *
 * Checked against packages/billing/src/{terms,status}.ts on 2026-08-31.
 */
export const PRICING = {
  monthly: 500,
  monthlyLabel: "$500",
  /** What traditional agencies charge. The anchor in every comparison. */
  agencyAnchor: "$1,500",
  /** MINIMUM_MONTHS */
  minimumMonths: 4,
  /** NOTICE_DAYS. Runs from the end of the minimum, not from the request. */
  noticeDays: 30,
  /** GRACE_DAYS: days after a failed payment before anything happens. */
  graceDays: 3,
  /** LATE_FEE_RATE, once, never compounding. */
  lateFeePct: "10%",
  /** PAUSE_DAYS: days unpaid before the work and the site pause. */
  pauseDays: 5,
  /** HOSTING_ONLY_PRICE: keeping the site up after the plan ends. */
  hostingOnly: "$20",
} as const;

/**
 * Tech help, priced so it stops being free.
 *
 * Deliberately not advertised anywhere above the FAQ. It exists to answer
 * "will you fix my printer" with a number rather than a favour, and a landing
 * page that sells IT support to someone searching "web designer" reprices the
 * whole offer downward. Boundary, not a service line.
 */
export const TECH_HELP = {
  hourly: "$75",
  hourlyMinimum: "1 hour",
  monthly: "$200",
  monthlyHours: 4,
} as const;

/** The price sentence, as it appears in body copy. */
export const PRICING_LINE = `Simple monthly plans at ${PRICING.monthlyLabel} a month.`;

/**
 * The comparison. Deliberately pairs the price gap with the capability gap:
 * leading on cheapness alone recruits price shoppers.
 */
export const AGENCY_LINE = `Agencies charge ${PRICING.agencyAnchor} or more and still have no answer for customers who ask an AI assistant who to call.`;

/** The "What does it cost?" answer, identical wherever it is asked. */
export const PRICING_FAQ = {
  q: "What does it cost?",
  a: `${PRICING_LINE} ${AGENCY_LINE} You'll know your exact number before anything starts.`,
} as const;

/** Tail fragment for meta descriptions. Reads the phone from BUSINESS. */
export const PRICING_META = `${PRICING.monthlyLabel} a month. Call ${BUSINESS.phone}.`;

/**
 * The monthly plan as schema.org, so the price is a machine-readable fact.
 *
 * This is what lets the visible page state the number twice instead of five
 * times. An AI assistant answering "what do they charge" reads this; a visitor
 * reads the hero and the pricing block. Repeating it in prose a third time
 * serves neither.
 *
 * Lives here rather than in businessInfo so the import stays one-directional:
 * pricingCopy reads businessInfo, never the other way around.
 */
export const MONTHLY_PLAN_OFFER = {
  "@type": "Offer" as const,
  name: "Monthly Web Design & Local SEO Plan",
  availability: "https://schema.org/InStock",
  priceCurrency: "USD",
  price: String(PRICING.monthly),
  priceSpecification: {
    "@type": "UnitPriceSpecification" as const,
    price: PRICING.monthly,
    priceCurrency: "USD",
    /** UN/CEFACT code for month. Reads as "$500 per month". */
    unitCode: "MON",
    referenceQuantity: {
      "@type": "QuantitativeValue" as const,
      value: 1,
      unitCode: "MON",
    },
  },
  eligibleDuration: {
    "@type": "QuantitativeValue" as const,
    minValue: PRICING.minimumMonths,
    unitCode: "MON",
    description: `${PRICING.minimumMonths} month minimum, then month to month.`,
  },
  description: `Website design, hosting, local SEO, Google Business Profile management, AI assistant visibility, and custom tools built for the business over time. ${PRICING.monthlyLabel} a month with no setup fee, ${PRICING.minimumMonths} month minimum, then month to month.`,
};
