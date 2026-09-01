import nodemailer from "nodemailer";

function isNonEmpty(v: unknown) {
  return typeof v === "string" && v.trim().length > 0;
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

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO_EMAIL || user;

    if (!user || !pass) {
      return Response.json({ error: "Email not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const subject = `New website lead: ${name}`;
    const text = [
      `Business: ${name}`,
      `Contact: ${contact}`,
      ...(placeId
        ? [
            `Place ID: ${placeId}`,
            `Profile: https://www.google.com/maps/place/?q=place_id:${placeId}`,
          ]
        : []),
      "",
      message || "(no message left)",
    ].join("\n");

    await transporter.sendMail({
      from: `"Queso Ventures Website" <${user}>`,
      to,
      replyTo: contact.includes("@") ? contact : undefined,
      subject,
      text,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
