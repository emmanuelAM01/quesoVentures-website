import nodemailer from "nodemailer";

function isNonEmpty(v: unknown) {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const contact = typeof body?.contact === "string" ? body.contact.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const website = typeof body?.website === "string" ? body.website.trim() : "";

    // honeypot triggered
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    if (!isNonEmpty(name) || !isNonEmpty(contact) || !isNonEmpty(message)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
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
      `Name: ${name}`,
      `Contact: ${contact}`,
      "",
      message,
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
