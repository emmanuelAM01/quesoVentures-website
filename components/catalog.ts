import type { DemoId } from "components/StudiosDemos";

/**
 * The Queso catalog: every tool Queso Ventures sells, the website included.
 *
 * The website used to be the whole business on this site and the tools an
 * afterthought behind a second brand (Queso Studios). It is now item No. 01
 * of one catalog, and every tool has a page of its own at /tools/{slug}.
 *
 * Source of truth for names and prices is the portal's product catalogue
 * (queso-portal, packages/products/src/index.ts): what clients see in their
 * portal and what they are billed. This repo cannot import that package, so it
 * is mirrored here. Change a price there, change it here in the same breath.
 *
 * Laid out by outcome, not by tool. Owners do not shop for "booking"; they
 * shop for more calls, regulars coming back, new customers, a business that
 * is straightened out, and real numbers instead of napkin math. Each outcome
 * is a department of the catalog.
 *
 * `list` is what anybody pays a month; `client` is the Queso client price.
 * `built` false is still sold honestly: the page says it is built to order,
 * and an ask is what gets it built.
 *
 * `questions` are the questions an owner actually types into Google, answered
 * on the tool's page (and in its FAQ schema). Nobody searches for a tool by
 * its name; they search for the problem. Drafts, in Emmanuel's voice; he
 * rewrites them.
 */

/**
 * Checkout lives on the portal, which knows who is asking: a signed-in Queso
 * client gets their price, anybody else the list price, and paying switches
 * the tool on with nobody in the loop. Only built tools and bundles of built
 * tools have a `buyUrl`; everything else keeps the ask. The keys are the
 * portal's product keys (Deliveries is delivery_fee_calculator there).
 */
const CHECKOUT = "https://portal.quesoventures.com/api/checkout";

export type OutcomeKey = "found" | "calling" | "returning" | "leads" | "organized" | "numbers";

export type Outcome = {
  key: OutcomeKey;
  label: string;
  line: string;
  accent: string;
};

export const OUTCOMES: Outcome[] = [
  {
    key: "found",
    label: "Get found",
    line: "A website that brings in new business, on Google, on Maps, and in the AI people ask now.",
    accent: "#0690FF",
  },
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

export type Question = { q: string; a: string };

export type Product = {
  key: string;
  /** The page: /tools/{slug}. */
  slug: string;
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
  /** For the tools billed by use: what the monthly price covers. */
  usage?: string;
  /** The small print under a price, when there is some. */
  terms?: string;
  accent: string;
  demo: DemoId;
  /** One line, on the shelf. */
  line: string;
  /** What you get. Short, and in the owner's words. */
  points: string[];
  questions: Question[];
  /** The page title, written the way the problem is searched. */
  seoTitle: string;
  seoDescription: string;
  /** Somewhere else this tool lives, like quesorewards.com. */
  elsewhere?: { href: string; label: string };
  /**
   * Stripe Payment Link. Until a tool has one, Get it opens the free report
   * form with the tool named in the message, so the ask still lands with a
   * report attached. The website never gets one: it starts with a talk.
   */
  buyUrl?: string;
};

export const PRODUCTS: Product[] = [
  // ── Get found ──────────────────────────────────────────────────────────────
  {
    key: "website",
    slug: "website",
    name: "Website",
    outcome: "found",
    built: true,
    list: 500,
    client: null,
    terms: "No setup fee. 4 month minimum, then month to month.",
    accent: "#0690FF",
    demo: "website",
    line: "A website that brings in new business, kept working every month.",
    points: [
      "A website built for your business, hosted, and sharpened every month.",
      "Found on Google, on Maps, and in ChatGPT and Siri answers.",
      "A report every month in plain words, with what to do next.",
      "Every form on it goes to your inbox and your phone.",
    ],
    // His eight, from the old homepage, word for word: the website's own
    // page carries them now.
    questions: [
      {
        q: "People visit my site but nobody calls. Why?",
        a: "Usually the site is slow on a phone, or what to do next isn't obvious. I find which one it is and fix that first.",
      },
      {
        q: "My competitor shows up on Google and I don't. Why?",
        a: "Google trusts them more: a stronger profile, more reviews, better pages. I build you the same foundation, starting with whatever moves fastest.",
      },
      {
        q: "How do I show up when someone asks ChatGPT or Siri who to call?",
        a: "Those tools read your website before they recommend anyone. Yours has to say plainly who you are, what you do, and where you do it. That is what I set up.",
      },
      {
        q: "How fast will I see more calls?",
        a: "Some changes show up within a few weeks. Search results take eight to twelve. I run both at the same time so you are not waiting on one.",
      },
      {
        q: "Do I need a whole new website?",
        a: "Usually not. If what you have works, I fix what is losing you calls instead of starting over.",
      },
      {
        q: "Who do you work with?",
        a: "Local businesses whose customers find them by searching. Auto shops, contractors, roofers, cleaners, med spas, bakeries, and plenty more.",
      },
      {
        q: "What does it cost?",
        a: "$500 a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee.",
      },
      {
        q: "How does this start?",
        a: "Send me your business name. I look at where you show up today and get in touch with what I found. Free either way.",
      },
    ],
    seoTitle: "Websites for Small Businesses | Queso Ventures",
    // The snippet that ran on the old homepage, word for word: the first line
    // of the Google Business Profile, so Maps and search sound like the same
    // person. No price in it; at position 4 a price disqualifies the reader
    // before the page can argue for itself (Search Console, 2026-05 to 2026-10).
    seoDescription:
      "Need more business? Start with a website. I build it, put you on Google and Maps, and keep it working. Free report.",
  },

  // ── Get people calling ────────────────────────────────────────────────────
  {
    key: "frontdesk",
    slug: "inbound-calls",
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
    questions: [
      {
        q: "How do I stop missing calls when I am on a job?",
        a: "You let something pick up for you. Inbound Calls answers every call you cannot, knows your hours and prices, books the job and texts you what happened.",
      },
      {
        q: "Is an AI receptionist worth it for a small business?",
        a: "If a missed call is a missed job, yes. One booked job a month usually pays for it. It never replaces you, it just makes sure nobody hits a voicemail.",
      },
      {
        q: "Will customers know they are talking to AI?",
        a: "It sounds like your front desk and answers like you would. If someone wants a person, it takes a message and texts it to you.",
      },
    ],
    seoTitle: "AI Phone Answering for Small Businesses | Inbound Calls",
    seoDescription:
      "Answers your business phone when you cannot, books the job, and texts you the details. No more missed calls. $200 a month.",
  },
  {
    key: "chat",
    slug: "website-chat",
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
    questions: [
      {
        q: "Should I add a chat box to my small business website?",
        a: "Only one that actually knows your business. Website Chat answers from your own hours, prices and policies, and hands the conversation to you when it should.",
      },
      {
        q: "Can a website answer customer questions after hours?",
        a: "Yes. Website Chat answers at 2am the same way you would at 2pm, and you see every conversation the next morning.",
      },
    ],
    seoTitle: "AI Website Chat for Small Businesses | Website Chat",
    seoDescription:
      "A chat on your website that answers questions the way you would, from your own hours, prices and policies. $60 a month.",
  },
  {
    key: "booking",
    slug: "booking",
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
    questions: [
      {
        q: "How do I let customers book appointments online?",
        a: "Put a booking page on your website and your Google profile. They pick an open time, get a reminder, and show up. You stop playing phone tag.",
      },
      {
        q: "How do I cut down on no shows?",
        a: "Reminders. Booking sends them on its own before every appointment, so people actually remember they booked.",
      },
    ],
    seoTitle: "Online Booking for Small Businesses | Booking",
    seoDescription:
      "Customers pick a time online, get a reminder, and show up. Fewer no shows, no phone tag. $40 a month.",
  },
  {
    key: "quotes",
    buyUrl: `${CHECKOUT}/quotes`,
    slug: "instant-quotes",
    name: "Instant Quotes",
    outcome: "calling",
    built: true,
    list: 40,
    client: 20,
    accent: "#FEA700",
    demo: "quotes",
    line: "Customers see a price range and send you their info.",
    points: [
      "Your own link for your Google profile, Instagram and a QR code.",
      "They pick what they need and see your price range right away.",
      "They leave a name and number, and you get an email.",
      "Every request lands in your Organizer, marked Quoted.",
    ],
    questions: [
      {
        q: "Should I put prices on my website?",
        a: "A range, yes. People leave pages that make them call for a number. Instant Quotes shows your range up front and gets you their name and number in return.",
      },
      {
        q: "How do I get more quote requests?",
        a: "Make it take ten seconds. They pick what they need, see a price range, and leave their number. You get an email with all of it.",
      },
    ],
    seoTitle: "Instant Price Quotes for Your Website | Instant Quotes",
    seoDescription:
      "Customers pick what they need, see your price range right away, and send you their info. More quote requests, less back and forth. $40 a month.",
  },

  // ── Get people walking back in ─────────────────────────────────────────────
  {
    key: "rewards",
    buyUrl: `${CHECKOUT}/rewards`,
    slug: "customer-loyalty",
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
    questions: [
      {
        q: "How do I start a loyalty program for my small business?",
        a: "Print a QR code for the counter. Customers scan it, join with their phone number, and every visit fills their card. No app for them to download, no paper cards for you to lose.",
      },
      {
        q: "Is there a digital punch card that does not need an app?",
        a: "Yes, this one. It lives on their phone through a text and a link, and they show the reward at the counter when it is earned.",
      },
      {
        q: "How do I get customers to come back more often?",
        a: "Give them a reason and a reminder. The punch card is the reason, and the text when they are one visit away is the reminder.",
      },
    ],
    seoTitle: "Digital Punch Card Loyalty Program, No App | Customer Loyalty",
    seoDescription:
      "A punch card on your customers' phones. They join with a QR code, no app, and get a text when a reward is close. $100 a month.",
    elsewhere: { href: "https://www.quesorewards.com", label: "Visit quesorewards.com" },
  },
  {
    key: "email",
    buyUrl: `${CHECKOUT}/email`,
    slug: "email-newsletter",
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
    questions: [
      {
        q: "How do I send a newsletter for my small business?",
        a: "Get people on a list first: a QR code at the counter does that. Then write the week's special in a few minutes and send it, or schedule it.",
      },
      {
        q: "What should a small business email newsletter say?",
        a: "What is on this week. A deal, something new, a reason to come in. Short beats clever.",
      },
    ],
    seoTitle: "Email Newsletter for Small Businesses | Email Newsletter",
    seoDescription:
      "Customers sign up with a QR code at the counter. You write the week's deal in minutes and send it to everybody. $60 a month.",
  },

  // ── Find new customers ────────────────────────────────────────────────────
  {
    key: "leads",
    slug: "lead-finder",
    buyUrl: `${CHECKOUT}/leads`,
    name: "Lead Finder",
    outcome: "leads",
    built: true,
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
    questions: [
      {
        q: "How do I find new customers for my business?",
        a: "Start from your best customer and find more like them. Lead Finder does that every week and hands you each one with a way to reach them.",
      },
      {
        q: "Where do I get leads for a service business?",
        a: "The businesses and people who already need what you do are out there. Lead Finder finds them, about 250 a month, straight into your lead list.",
      },
    ],
    seoTitle: "Find New Customers Every Week | Lead Finder",
    seoDescription:
      "The businesses and people who should be buying from you, found every week, each with a way to reach them. $200 a month.",
  },

  // ── Get everything straightened out ───────────────────────────────────────
  {
    key: "organization",
    buyUrl: `${CHECKOUT}/organization`,
    slug: "queso-organizer",
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
    questions: [
      {
        q: "What is the easiest way to keep track of my customers?",
        a: "One list, in your words, that tells you who is due, who owes, and who went quiet. That is the Organizer. No training, no forty tabs.",
      },
      {
        q: "Do I need a CRM for a small business?",
        a: "You need the part of a CRM that matters: everybody in one place and where they stand. The Organizer is that part, without the enterprise software.",
      },
    ],
    seoTitle: "Simple Customer Tracker for Small Businesses | Queso Organizer",
    seoDescription:
      "Every customer, lead and vendor in one place: who is due, who owes, who went quiet. Set up in your words in minutes. $100 a month.",
  },
  {
    key: "forms",
    buyUrl: `${CHECKOUT}/forms`,
    slug: "forms",
    name: "Forms",
    outcome: "organized",
    built: true,
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
      "A reply drafted for you, ready to send.",
    ],
    questions: [
      {
        q: "How do I make a sign up form with a QR code?",
        a: "Tell me what you want to ask. You get a form, a link to share, and a QR code to print, and every answer goes to your email.",
      },
      {
        q: "How do I answer website form submissions faster?",
        a: "Forms drafts the reply for you from what you told me about your business. You read it, change what you want, and send.",
      },
    ],
    seoTitle: "Online Forms with a QR Code for Small Businesses | Forms",
    seoDescription:
      "Sign ups, quotes, waivers and applications. A form, a link and a QR code, every answer in your email, a reply drafted for you. $20 a month.",
  },
  {
    key: "invoicing",
    slug: "invoicing",
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
    questions: [
      {
        q: "How do I get customers to pay their invoices on time?",
        a: "Send it the same day, by email and text, and follow up until it is paid. Invoicing does the following up so you do not have to.",
      },
      {
        q: "What is the simplest invoicing for a small business?",
        a: "One sentence: send the invoice for last week's job. It sends it, and chases it when nobody pays.",
      },
    ],
    seoTitle: "Simple Invoicing That Chases Payment | Invoicing",
    seoDescription:
      "Send an invoice in a sentence, by email and text, and let it chase payment when nobody pays. $50 a month.",
  },
  {
    // Calls to people who already know the business. Cold calls to new leads
    // by a robot do not land and cost the owner their name, so this is not a
    // Find new customers tool.
    key: "outreach",
    slug: "outbound-calls",
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
    questions: [
      {
        q: "Can AI make confirmation calls for my business?",
        a: "Yes. Outbound Calls confirms appointments, orders and deliveries ahead of time and writes up every call for you.",
      },
      {
        q: "How do I stop spending my day on the phone with vendors?",
        a: "Hand those calls off. It calls about prices, stock and ship dates, and sends you what they said.",
      },
    ],
    seoTitle: "AI Calls for Confirmations and Vendors | Outbound Calls",
    seoDescription:
      "Makes the calls you keep putting off: confirmations, vendors, missing details. Every call written up and sent to you. $200 a month.",
  },

  // ── Ditch the napkin math ─────────────────────────────────────────────────
  {
    key: "revenue",
    buyUrl: `${CHECKOUT}/revenue`,
    slug: "queso-revenue-system",
    name: "Queso Revenue System",
    outcome: "numbers",
    built: true,
    list: 100,
    client: 50,
    usage: "Up to 15 bank connections. Past that, $10 a month for every 2 more ($5 for Queso clients).",
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
    questions: [
      {
        q: "What is a simple alternative to QuickBooks for a small business?",
        a: "If you just need to know what came in, what went out and where it went, connect your bank once and let QRS sort it month by month. No accounting degree required.",
      },
      {
        q: "How do I see where my business money is going?",
        a: "Connect every account and card in one place. Every charge comes in on its own, and you tag it business or personal once.",
      },
      {
        q: "Is it safe to connect my bank account?",
        a: "It signs in through Plaid, the same secure screen a lot of finance apps use, and it only reads. Nothing in it can move your money.",
      },
    ],
    seoTitle: "See Where Your Business Money Goes | Queso Revenue System",
    seoDescription:
      "Every bank account and card in one place, sorted month by month, and what your month really looks like. Read only. $100 a month.",
  },
  {
    key: "delivery",
    buyUrl: `${CHECKOUT}/delivery_fee_calculator`,
    slug: "deliveries",
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
    questions: [
      {
        q: "How much should I charge for delivery?",
        a: "What it actually costs you, plus your margin. Deliveries works that out per address, with traffic, weather and the time of day in it, instead of one flat guess.",
      },
      {
        q: "How do I calculate a delivery fee by distance?",
        a: "Type the address. You get a real price, the route, and a link to text your driver. No napkin math.",
      },
    ],
    seoTitle: "Delivery Fee Calculator for Small Businesses | Deliveries",
    seoDescription:
      "Type an address and get a real delivery price with traffic, weather and time of day in it, the route, and the driver's link. $50 a month.",
  },
];

export type Pack = {
  key: string;
  outcome: OutcomeKey;
  line: string;
  products: string[];
  list: number;
  client: number;
  buyUrl?: string;
};

/**
 * The complete experience for an outcome: every tool on its shelf, for less
 * than buying them one at a time. Mirrors PACKS in the portal.
 *
 * It leads its outcome everywhere it shows (the Tools page, Get Started, the
 * portal): owners buy the result, and the tools are how. Every tool is still
 * sold on its own, cheap enough to switch on without a conversation.
 */
export const PACKS: Pack[] = [
  {
    key: "calling",
    outcome: "calling",
    line: "Every call picked up, every question on your site answered, every price quoted, and all of it booked onto one calendar.",
    // Every tool on the shelf, so the struck one-at-a-time total is exactly
    // the prices listed under it ($340, $220 for a client).
    products: ["frontdesk", "chat", "booking", "quotes"],
    list: 270,
    client: 180,
  },
  {
    key: "regulars",
    buyUrl: `${CHECKOUT}/regulars`,
    outcome: "returning",
    line: "Punch cards and the emails, to the same list of regulars.",
    products: ["rewards", "email"],
    list: 120,
    client: 60,
  },
  {
    key: "organized",
    outcome: "organized",
    line: "Everyone you do business with in one place, the forms that fill it, and the invoices that get you paid.",
    products: ["organization", "forms", "invoicing"],
    list: 140,
    client: 70,
  },
  {
    key: "numbers",
    buyUrl: `${CHECKOUT}/numbers`,
    outcome: "numbers",
    line: "Where your money goes every month, and a real price on every delivery.",
    products: ["revenue", "delivery"],
    list: 120,
    client: 60,
  },
];

export const outcomeBy = (key: OutcomeKey) => OUTCOMES.find((o) => o.key === key)!;
export const productsFor = (outcome: OutcomeKey) => PRODUCTS.filter((p) => p.outcome === outcome);
export const packFor = (outcome: OutcomeKey) => PACKS.find((p) => p.outcome === outcome);
export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productByKey = (key: string) => PRODUCTS.find((p) => p.key === key);

/** "No. 04": a product's place in the catalog, the way a catalogue numbers its items. */
export const itemNumber = (p: Product) => String(PRODUCTS.indexOf(p) + 1).padStart(2, "0");

/** "04": a department's place, for the contents page. */
export const departmentNumber = (o: Outcome) => String(OUTCOMES.indexOf(o) + 1).padStart(2, "0");

/**
 * What a buy button says. Built and sold by checkout: Subscribe, and paying
 * switches it on. Not built yet: Inquire, which opens the ask (how a tool
 * earns being built). The website starts with the free report instead.
 */
export function actionLabel(item: { key?: string; buyUrl?: string }, website = "Free report"): string {
  if (item.key === "website") return website;
  return item.buyUrl ? "Subscribe" : "Inquire";
}

/** "$100 / month", or the note that stands in for a number. */
export function priceLabel(p: { list: number | null }) {
  return p.list != null ? `$${p.list} / month` : "";
}

/** "$50 for Queso clients", or its stand in. Null when there is nothing to say. */
export function clientLabel(p: { client: number | null; clientNote?: string }) {
  if (p.client != null) return `$${p.client} for Queso clients`;
  return p.clientNote ?? null;
}

/**
 * A bundle is named for its outcome ("Get people calling"), and where the
 * outcome is already the heading, by its count ("All 4"). It used to be "The
 * complete experience to ...", which on a page of departments said the same
 * four words six times.
 */
export function packTitle(pack: Pack): string {
  return outcomeBy(pack.outcome).label;
}

/** "all 4", or "both" for two, which reads better than "all 2". Lowercase; capitalize at the start of a line. */
export const allOf = (n: number) => (n === 2 ? "both" : `all ${n}`);

/** "All 4": a bundle under its own outcome's heading. */
export const packCount = (pack: Pack) => {
  const s = allOf(pack.products.length);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** "Inbound Calls, Website Chat, Booking and Instant Quotes." */
export function packContents(pack: Pack): string {
  const names = pack.products.map((k) => productByKey(k)?.name).filter(Boolean) as string[];
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names.join("");
}

/**
 * Anything that can be ordered: a tool, or a bundle ("pack:calling"). What
 * the Get Started panel needs to show it and send it somewhere.
 */
export type Orderable = {
  key: string;
  name: string;
  line: string;
  list: number | null;
  usage?: string;
  accent: string;
  buyUrl?: string;
  isWebsite: boolean;
  /** A bundle: what is in it, said as a sentence. */
  contents?: string;
};

export function orderable(key: string): Orderable | undefined {
  if (key.startsWith("pack:")) {
    const pack = PACKS.find((p) => p.key === key.slice(5));
    if (!pack) return undefined;
    return {
      key,
      name: packTitle(pack),
      line: pack.line,
      list: pack.list,
      accent: outcomeBy(pack.outcome).accent,
      buyUrl: pack.buyUrl,
      isWebsite: false,
      contents: packContents(pack),
    };
  }
  const p = productByKey(key);
  if (!p) return undefined;
  return { key: p.key, name: p.name, line: p.line, list: p.list, usage: p.usage, accent: p.accent, buyUrl: p.buyUrl, isWebsite: p.key === "website" };
}
