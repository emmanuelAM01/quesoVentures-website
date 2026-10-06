import type { DemoId } from "components/StudiosDemos";

/**
 * The Queso Studios catalogue, as the Studios page sells it.
 *
 * The source of truth is the portal's product catalogue
 * (queso-portal, packages/products/src/index.ts): names, prices and packs
 * there are what clients see in their portal and what they are billed. The
 * shop does not sell the portal's every-tool bundle. This repo cannot import that package, so it is mirrored here. When
 * a price or a name changes there, change it here in the same breath, or the
 * shop and the portal will quote a client two different numbers.
 *
 * Laid out by outcome, not by tool. Owners do not shop for "booking" or
 * "invoicing"; they shop for more calls, regulars coming back, new customers,
 * a business that is straightened out, and real numbers instead of napkin
 * math. Each outcome is a chapter on the page and its tools are the shelf.
 *
 * `list` is what anybody pays; `client` is the Queso client price. `built`
 * false is still sold honestly: the page says it is built to order, and an
 * ask is what gets it built.
 */

export type OutcomeKey = "calling" | "returning" | "leads" | "organized" | "numbers";

export type Outcome = {
  key: OutcomeKey;
  label: string;
  line: string;
  accent: string;
};

export const OUTCOMES: Outcome[] = [
  {
    key: "calling",
    label: "Get people calling",
    line: "Every call answered, every question on your site answered, every open time on the calendar filled.",
    accent: "#C4161C",
  },
  {
    key: "returning",
    label: "Get people walking back in",
    line: "Give regulars a reason to come back, and tell them what is on the week it is on.",
    accent: "#FEA700",
  },
  {
    key: "leads",
    label: "Find new customers",
    line: "The people who should be buying from you, found for you every week.",
    accent: "#FF2800",
  },
  {
    key: "organized",
    label: "Get everything straightened out",
    line: "Every customer, lead, vendor, form and invoice in one place, and chased when it needs chasing.",
    accent: "#7DC23B",
  },
  {
    key: "numbers",
    label: "Ditch the napkin math",
    line: "Real prices and real numbers instead of a guess on the back of a receipt.",
    accent: "#E64A37",
  },
];

export type Product = {
  key: string;
  name: string;
  outcome: OutcomeKey;
  /** Running for clients today. False is sold as built to order. */
  built: boolean;
  /** Monthly, for anybody. Null when it is not sold by the month. */
  list: number | null;
  /** Monthly, for a Queso client. Null with a `clientNote` when it is included. */
  client: number | null;
  /** Said where a client price would go, when there is none. */
  clientNote?: string;
  /** Said where a price would go, for anything quoted per job. */
  priceNote?: string;
  /** For the tools billed by use: what the monthly price covers. */
  usage?: string;
  accent: string;
  demo: DemoId;
  /** One line, on the shelf. */
  line: string;
  /** What you get, in the popup. Short, and in the owner's words. */
  points: string[];
  href?: string;
  linkLabel?: string;
};

export const PRODUCTS: Product[] = [
  // Get people calling
  {
    key: "frontdesk",
    name: "Inbound Calls",
    outcome: "calling",
    built: false,
    list: 200,
    client: 150,
    usage: "300 call minutes a month, then 50 cents a minute.",
    accent: "#C4161C",
    demo: "frontdesk",
    line: "Answers your phone when you cannot, and books the job.",
    points: [
      "Picks up every call, nights and weekends included.",
      "Knows your hours, prices and policies, and sounds like your front desk.",
      "Books the appointment and texts you the details.",
      "Nobody reaches a voicemail again.",
    ],
  },
  {
    key: "chat",
    name: "Website Chat",
    outcome: "calling",
    built: false,
    list: 60,
    client: 30,
    accent: "#A855F7",
    demo: "chat",
    line: "Answers questions on your site the way you would, at 2am.",
    points: [
      "Knows your policies, hours, menu and prices.",
      "Only answers the way you would answer.",
      "Hands the conversation to you when it should.",
    ],
  },
  {
    key: "booking",
    name: "Booking",
    outcome: "calling",
    built: false,
    list: 40,
    client: 20,
    accent: "#0690FF",
    demo: "booking",
    line: "They pick a time, get a reminder, and show up.",
    points: [
      "Customers book without calling you.",
      "Reminders go out on their own, so fewer no shows.",
      "Inbound Calls and Website Chat book straight into it.",
    ],
  },

  // Get people walking back in
  {
    key: "rewards",
    name: "Customer Loyalty",
    outcome: "returning",
    built: true,
    list: 100,
    client: 50,
    accent: "#FEA700",
    demo: "rewards",
    line: "A punch card on their phone, and a text when a reward is close.",
    points: [
      "Customers join by scanning a QR code at the counter. No app to download.",
      "Every visit fills the card, and a text lands when they are one away.",
      "They show the reward on their phone, and you hand it over.",
      "You see who comes back, and how often.",
    ],
    href: "https://www.quesorewards.com",
    linkLabel: "Visit quesorewards.com",
  },
  {
    key: "email",
    name: "Email Newsletter",
    outcome: "returning",
    built: true,
    list: 60,
    client: 30,
    accent: "#7DC23B",
    demo: "newsletter",
    line: "Deals and news, sent to everybody who signed up.",
    points: [
      "People sign up by scanning a QR code at the counter.",
      "Write the week's special in a few minutes, send now or schedule it.",
      "Your logo, your address, your reply to.",
      "See who signed up and when.",
    ],
  },

  // Find new customers
  {
    key: "leads",
    name: "Lead Finder",
    outcome: "leads",
    built: false,
    list: 200,
    client: 150,
    usage: "About 250 new leads a month.",
    accent: "#FF2800",
    demo: "leads",
    line: "The businesses and people who should be buying from you, found every week.",
    points: [
      "Tell it who your best customer is, once.",
      "It finds more of them, each with a way to reach them.",
      "Every lead lands in your lead list, ready to work.",
    ],
  },

  // Get everything straightened out
  {
    key: "organization",
    name: "Queso Organizer",
    outcome: "organized",
    built: true,
    list: 100,
    client: 50,
    accent: "#7692A5",
    demo: "organization",
    line: "Every customer, lead and vendor in one place, and where each one stands.",
    points: [
      "Everybody at once: who is due, who owes, who went quiet.",
      "Notes and history on every one of them.",
      "Customers and the vendors you buy from, each in their own list.",
      "Set up in your words in a few minutes, and your numbers on one page.",
    ],
  },
  {
    key: "forms",
    name: "Forms",
    outcome: "organized",
    built: false,
    list: 20,
    client: null,
    clientNote: "Included for Queso clients",
    accent: "#7DC23B",
    demo: "forms",
    line: "A form and a QR code. Every answer lands in your email.",
    points: [
      "Sign ups, quotes, waivers, applications.",
      "A QR code to print and a link to share.",
      "Every answer goes to your email and your customer list.",
    ],
  },
  {
    key: "invoicing",
    name: "Invoicing",
    outcome: "organized",
    built: false,
    list: 50,
    client: 30,
    accent: "#FFD100",
    demo: "invoicing",
    line: "Sends the bill, and chases it when nobody pays.",
    points: [
      "Ask for it in a sentence: send the invoice for last week's job.",
      "Sends it by email and text.",
      "Chases it until it is paid. (Because this part is never fun.)",
    ],
  },
  {
    // Calls to people who already know the business. Cold calls to new leads
    // by a robot do not land and cost the owner their name, so this is not
    // a Find new customers tool.
    key: "outreach",
    name: "Outbound Calls",
    outcome: "organized",
    built: false,
    list: 200,
    client: 150,
    usage: "300 call minutes a month, then 50 cents a minute.",
    accent: "#0690FF",
    demo: "outreach",
    line: "Makes the calls you keep putting off. Confirmations, vendors, missing details.",
    points: [
      "Confirms appointments, orders and deliveries ahead of time.",
      "Calls vendors about prices, stock and when things ship.",
      "Every call written up and sent to you.",
    ],
  },

  // Ditch the napkin math
  {
    key: "delivery",
    name: "Deliveries",
    outcome: "numbers",
    built: true,
    list: 50,
    client: 30,
    accent: "#E64A37",
    demo: "delivery",
    line: "A real delivery price, the route, and the link the driver gets.",
    points: [
      "Type an address and get a real price, with traffic, weather and the time of day in it.",
      "Plans the route.",
      "Texts your driver the link they drive from.",
    ],
  },
  {
    // The old Revenue System (numbers read by hand, quoted per case) is gone.
    // This one is the Economics screen from the admin, the one Emmanuel runs
    // his own books on, made for a client. Its own page is /studios/qrs.
    key: "revenue",
    name: "Queso Revenue System",
    outcome: "numbers",
    built: false,
    list: 100,
    client: 50,
    usage: "Up to 5 bank connections. Past that, $10 a month for every 2 more ($5 for Queso clients).",
    accent: "#7692A5",
    demo: "qrs",
    line: "Every account in one place, and what your month really looks like.",
    points: [
      "Connect your bank accounts and cards once. Every charge comes in on its own.",
      "Tag a charge business or personal once, and it remembers.",
      "What came in, what went out, and where it went, month by month.",
      "What is left over in a typical month, and what it takes to hit a goal.",
      "It only reads. Nothing in it can move your money.",
    ],
    href: "/studios/qrs",
    linkLabel: "How it works",
  },
];

export type Pack = {
  key: string;
  outcome: OutcomeKey;
  line: string;
  products: string[];
  list: number;
  client: number;
};

/**
 * The complete experience for an outcome: every tool on its shelf, for less
 * than buying them one at a time. One per outcome that can have one; Ditch the
 * napkin math has none yet, and
 * Find new customers has none since Lead Finder is alone on that shelf. Nothing
 * is given away inside a pack: each is priced as a discount on exactly the
 * tools in it. Mirrors PACKS in the portal.
 */
export const PACKS: Pack[] = [
  {
    key: "calling",
    outcome: "calling",
    line: "Every call picked up, every question on your site answered, and all of it booked onto one calendar.",
    products: ["frontdesk", "chat", "booking"],
    // $300 one at a time, $200 for a client.
    list: 250,
    client: 170,
  },
  {
    key: "regulars",
    outcome: "returning",
    line: "Punch cards and the emails, to the same list of regulars.",
    products: ["rewards", "email"],
    // $160 one at a time, $80 for a client.
    list: 120,
    client: 60,
  },
  {
    key: "organized",
    outcome: "organized",
    line: "Everyone you do business with in one place, the forms that fill it, and the invoices that get you paid.",
    products: ["organization", "forms", "invoicing"],
    // $170 one at a time, $80 for a client (Forms is included for clients).
    list: 140,
    client: 70,
  },
];

/** "The complete experience to find new customers." */
export function packTitle(pack: Pack): string {
  const outcome = OUTCOMES.find((o) => o.key === pack.outcome);
  return outcome ? `The complete experience to ${outcome.label.charAt(0).toLowerCase()}${outcome.label.slice(1)}` : "The complete experience";
}

export const productsFor = (outcome: OutcomeKey) => PRODUCTS.filter((p) => p.outcome === outcome);
export const packFor = (outcome: OutcomeKey) => PACKS.find((p) => p.outcome === outcome);
