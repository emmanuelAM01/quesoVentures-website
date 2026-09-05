import nodemailer from "nodemailer";

/**
 * The "get free report" form.
 *
 * This used to be the whole pipeline: compose a Gmail message to Emmanuel and
 * stop. The person who asked got a page saying their report was coming "within
 * 24 hours", and whether one ever arrived depended on him seeing that mail and
 * finding an evening. Now the portal does it — it records the lead, reads their
 * Google listing, writes the report, sends it, and tells Emmanuel it happened —
 * all before this handler returns.
 *
 * Gmail stays as the fallback and is not going anywhere. A marketing site must
 * never lose a lead because another service was slow, redeploying, or missing
 * an environment variable, and that is exactly what happens to a form whose
 * only path out is a POST to somewhere else. So: try the portal, and if it does
 * not answer cleanly, mail it the old way and tell the visitor nothing went
 * wrong — because from their side, nothing did.
 */

function isNonEmpty(v: unknown) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Hand the lead to the portal.
 *
 * The secret is read here, on the server, and never reaches the browser — the
 * same header the client form routes already use, so there is one secret to
 * rotate rather than two.
 *
 * The timeout is generous because the portal is doing real work inside this
 * request: a Places lookup, a fetch of the visitor's own website, and two
 * emails. It is still a timeout, because a visitor watching a spinner is not
 * waiting on us to be thorough.
 */
async function sendToPortal(payload: {
  business_name: string;
  contact: string;
  place_id: string | null;
  message: string | null;
  source_page: string | null;
}): Promise<boolean> {
  const portal = process.env.PORTAL_URL;
  if (!portal) return false;

  try {
    const res = await fetch(`${portal.replace(/\/$/, "")}/api/website-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.QUESO_FORMS_SECRET
          ? { "x-queso-secret": process.env.QUESO_FORMS_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      console.error("Portal lead intake failed", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Portal lead intake error", err);
    return false;
  }
}

/** The old path, now only used when the portal could not take it. */
async function mailEmmanuel(info: {
  name: string;
  contact: string;
  message: string;
  placeId: string;
}): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!user || !pass) return false;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Queso Ventures Website" <${user}>`,
      to,
      replyTo: info.contact.includes("@") ? info.contact : undefined,
      // Says out loud that the automatic report did not go, so this is not
      // mistaken for the ordinary copy of a lead that was already handled.
      subject: `Website lead (no auto-report): ${info.name}`,
      text: [
        "The portal did not take this one, so no report was sent automatically.",
        "",
        `Business: ${info.name}`,
        `Contact: ${info.contact}`,
        ...(info.placeId
          ? [
              `Place ID: ${info.placeId}`,
              `Profile: https://www.google.com/maps/place/?q=place_id:${info.placeId}`,
            ]
          : []),
        "",
        info.message || "(no message left)",
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("Fallback mail failed", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // `name` is the business name or its website — enough to look them up.
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const contact = typeof body?.contact === "string" ? body.contact.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    // Set when they picked their business off the Google dropdown rather than
    // typing it. Worth carrying: the Business Profile, rating, review count and
    // category all hang off this, which is most of the report already.
    const placeId = typeof body?.placeId === "string" ? body.placeId.trim() : "";
    // Which page they were reading when they asked. Not required, and only
    // ever used to say where a lead came from.
    const sourcePage = typeof body?.sourcePage === "string" ? body.sourcePage.trim() : "";
    // Honeypot. Never rendered to a human, so any value means a bot.
    const website = typeof body?.website === "string" ? body.website.trim() : "";

    // honeypot triggered
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    // The message is optional now. Requiring a paragraph before anyone could
    // ask for a preview was the single biggest piece of friction on the site.
    if (!isNonEmpty(name) || !isNonEmpty(contact)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // One required field fewer means one less thing a naive bot has to get
    // right, so check the contact actually looks reachable. Deliberately
    // loose: it rejects junk, not unusual formatting.
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const looksPhone = (contact.match(/\d/g) || []).length >= 10;
    if (!looksEmail && !looksPhone) {
      return Response.json(
        { error: "Add an email or a phone number so I can reply." },
        { status: 400 }
      );
    }

    const handled = await sendToPortal({
      business_name: name,
      contact,
      place_id: placeId || null,
      message: message || null,
      source_page: sourcePage || null,
    });

    if (!handled && !(await mailEmmanuel({ name, contact, message, placeId }))) {
      // Both paths gone. This is the only case the visitor is told about,
      // because it is the only one where their lead really is nowhere.
      return Response.json(
        { error: "Could not send that. Give me a call instead and I'll sort it out." },
        { status: 500 }
      );
    }

    // Whether the report went out decides which sentence the form shows next:
    // "check your email" is a promise, and it is only made when it is true.
    return Response.json({ ok: true, reportSent: handled && looksEmail }, { status: 200 });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
