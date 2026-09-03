/**
 * The tools, as a visitor meets them.
 *
 * This is the part of the pitch that has never been on the site: the plan does
 * not stop at a website, and a shop owner has no way to guess that from a page
 * about web design. Each entry gets one panel in the carousel on the homepage.
 *
 * Deliberately says nothing about what any of it costs. The plan is to sell
 * tools the way AWS sells services — separately, added as a business needs them
 * — so a page that implies the $500 covers all of them would have to be corrected
 * later. Describe what they do; price them in conversation.
 *
 * Order is the order they appear. Lead with the two a local business pictures
 * instantly and end on the one that needs the most explaining.
 */
export interface Tool {
  /** Keys the mock panel in ToolCarousel. */
  id:
    | "rewards"
    | "checkin"
    | "chat"
    | "frontdesk"
    | "booking"
    | "invoicing"
    | "qrs"
    | "next";
  /** The caption over the line. Short enough to sit on one line. */
  name: string;
  /**
   * Spelled out, when the name is an abbreviation. QRS is the only one, and it
   * needs this: a bare three-letter acronym on a card teaches nobody anything.
   */
  full?: string;
  /** Under the panel. How the tool actually works, in the owner's words. */
  line: string;
}

export const TOOLS: Tool[] = [
  {
    id: "rewards",
    name: "Rewards",
    line: "A virtual punch card that lives on their phone, and a text when they are close to earning something.",
  },
  {
    id: "checkin",
    name: "Memberships",
    line: "A code by the register opens your own page of deals and store news. Every scan tells you who came back.",
  },
  /*
    Placed before the phone agent on purpose. Everyone has used a chat box on
    a website, so this is the cheapest one to picture, and picturing it makes
    the phone agent on the next panel obvious instead of far-fetched.
  */
  {
    id: "chat",
    name: "AI chat",
    line: "It reads your own policies and answers the same five questions all day, right on your site.",
  },
  {
    id: "frontdesk",
    name: "AI front desk",
    line: "Answers the questions or books slots while your hands are busy running your business.",
  },
  {
    id: "booking",
    name: "Booking",
    line: "They pick a time and get a confirmation. You are updated every step of the way.",
  },
  {
    id: "invoicing",
    name: "Invoicing",
    line: "Ask for it in plain English. It builds the invoice and sends it before you put the phone down.",
  },
  {
    id: "qrs",
    name: "QRS",
    full: "Queso Revenue System",
    line: "Upload your numbers. It finds what is working, what is leaking, and what to do about it.",
  },
  /*
    Last on purpose. Everything above is a thing that exists; this one is the
    promise that the list is not finished, and it only means anything once
    someone has seen what the finished ones look like.
  */
  {
    id: "next",
    name: "What's next",
    line: "The list keeps growing. What gets built next is whatever we work out when we sit down and talk.",
  },
];

/**
 * The asks that cycle on the "What's next" panel.
 *
 * Every one of these is a thing an owner has actually wanted, phrased the way
 * they said it, and the reply is the length of a real reply. They rotate, so
 * the panel is never the same twice and the range shows: retention, money,
 * scheduling, getting paid. That range is the argument — the point is not that
 * one clever tool exists, it is that whatever you name gets built.
 *
 * Keep the ask under about seventy characters and the reply under thirty, or
 * the bubbles wrap to three lines and the panel outgrows its box. Add freely;
 * the rotation takes any length of list.
 */
export interface Ask {
  ask: string;
  reply: string;
}

export const ASKS: Ask[] = [
  {
    ask: "Could it text people when their tires are due?",
    reply: "Let's build that one next.",
  },
  {
    ask: "Can it tell me which jobs actually made money?",
    reply: "That's a report. Give me a week.",
  },
  {
    ask: "Can it chase the invoices nobody paid?",
    reply: "Politely. Every Friday.",
  },
  {
    ask: "Can it tell me who hasn't come back in six months?",
    reply: "And text them a reason to.",
  },
  {
    ask: "Can it take a deposit so nobody ghosts me?",
    reply: "Card on file. Done.",
  },
  {
    ask: "Can it stop double-booking my Saturdays?",
    reply: "That one's easy.",
  },
  {
    ask: "Can it text them when I'm on the way?",
    reply: "With a map. Cuts the no-shows.",
  },
  {
    ask: "Can it quote a wrap from a photo?",
    reply: "Now that one is fun.",
  },
];
