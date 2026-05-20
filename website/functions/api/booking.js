// Cloudflare Pages Function — POST /api/booking
//
// Receives the booking enquiry form from the Live page and emails it to
// management@longspaces.com via Resend (https://resend.com).
//
// Environment variables to set on the Cloudflare Pages project:
//   RESEND_API_KEY  — get from resend.com (free tier: 3000 emails / month)
//   BOOKING_TO      — destination email (defaults to management@longspaces.com)
//   BOOKING_FROM    — sender, must be on a verified Resend domain
//                     (defaults to "bookings@cw-collective.uk")
//
// See DEPLOY.md in this folder for the full setup.

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const { name, email, venue, when, message } = body || {};

  if (!name || !email) {
    return json({ error: "Name and email are required" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Invalid email" }, 400);
  }

  // Very light bot guard — drop submissions that look spammy.
  if ((message || "").length > 5000 || (name || "").length > 200) {
    return json({ error: "Too long" }, 400);
  }

  const to   = env.BOOKING_TO   || "management@longspaces.com";
  const from = env.BOOKING_FROM || "bookings@cw-collective.uk";

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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
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

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return json({ error: "Email failed", detail }, 502);
  }
  return json({ ok: true });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
