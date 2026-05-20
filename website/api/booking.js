// Vercel Serverless Function — POST /api/booking
//
// Receives the booking enquiry form from the Live page and emails it to
// management@longspaces.com via Resend (https://resend.com).
//
// Environment variables to set on the Vercel project
// (Project → Settings → Environment Variables):
//   RESEND_API_KEY  — get from resend.com (free tier: 3000 emails / month)
//   BOOKING_TO      — destination email (defaults to management@longspaces.com)
//   BOOKING_FROM    — sender, must be on a verified Resend domain
//                     (defaults to "bookings@cw-collective.uk")
//
// See DEPLOY-VERCEL.md in this folder for the full setup.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel auto-parses JSON when Content-Type is application/json,
  // but be defensive in case a client sends a raw string.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }
  const { name, email, venue, when, message } = body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Very light bot guard — drop submissions that look spammy.
  if ((message || "").length > 5000 || (name || "").length > 200) {
    return res.status(400).json({ error: "Too long" });
  }

  const to   = process.env.BOOKING_TO   || "management@longspaces.com";
  const from = process.env.BOOKING_FROM || "bookings@cw-collective.uk";

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email is not configured (missing RESEND_API_KEY)" });
  }

  const subject = `Booking enquiry — ${name}${venue ? ` (${venue})` : ""}`;
  const text = [
    `From:  ${name} <${email}>`,
    venue ? `Venue: ${venue}` : null,
    when  ? `When:  ${when}`  : null,
    "",
    (message && message.trim()) || "(no additional message)",
    "",
    "—",
    "Sent from the booking form at cw-collective.uk",
  ].filter(x => x !== null).join("\n");

  const upstream = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: email,
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    return res.status(502).json({ error: "Email failed", detail });
  }
  return res.status(200).json({ ok: true });
}
