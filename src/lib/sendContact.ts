/**
 * sendContact — TanStack Start server function
 *
 * Runs exclusively on the server. Credentials are never sent to the browser.
 * Uses Nodemailer with Gmail SMTP + App Password.
 *
 * Required environment variables (set in .env, never commit to git):
 *   GMAIL_USER     — the Gmail address used to SEND (e.g. ruya.connect@gmail.com)
 *   GMAIL_APP_PASS — 16-character App Password from Google Account → Security
 */
import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getAutoReplyHtml } from "./emailTemplate";

// ─── Validation schema (server-side, duplicates client checks) ─────────────────
const schema = z.object({
  name:    z.string().min(1).max(200),
  email:   z.string().email().max(320),
  company: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  // honeypot — bots fill this; humans don't
  _hp:     z.string().max(0, "spam"),
});

// ─── Rate limiting — very light in-memory store ────────────────────────────────
const WINDOW_MS  = 60_000; // 1 minute
const MAX_HITS   = 3;
const rateMap    = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_HITS) return true;
  entry.count++;
  return false;
}

// ─── Simple sanitiser — strip HTML tags ───────────────────────────────────────
function sanitize(s: string): string {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}

// ─── Server function ──────────────────────────────────────────────────────────
export const sendContact = createServerFn({ method: "POST" })
  .validator((raw: unknown) => schema.parse(raw))
  .handler(async ({ data, context }) => {
    // Rate limit by IP (header set by Nitro / cloud proxy)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req = (context as any)?.request as Request | undefined;
    const ip  = req?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      throw new Error("TOO_MANY_REQUESTS");
    }

    // Honeypot filled → silently succeed (don't tell bots they were caught)
    if (data._hp.length > 0) {
      return { ok: true };
    }

    // Read credentials from environment (server-only — never exposed to browser)
    const user    = process.env["GMAIL_USER"];
    const appPass = process.env["GMAIL_APP_PASS"]?.replace(/\s/g, ""); // spaces OK — stripped automatically

    if (!user || !appPass) {
      console.error("[sendContact] Missing GMAIL_USER or GMAIL_APP_PASS env vars");
      throw new Error("EMAIL_NOT_CONFIGURED");
    }

    const n    = sanitize(data.name);
    const e    = sanitize(data.email);
    const co   = sanitize(data.company);
    const msg  = sanitize(data.message);
    const ts   = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";

    const transporter = nodemailer.createTransport({
      host:   "smtp.gmail.com",
      port:   465,
      secure: true,
      auth: { user, pass: appPass },
    });

    // ── Notification to Ru'ya ──
    await transporter.sendMail({
      from:    `"Ru'ya Studio" <${user}>`,
      to:      "ruya.connect@gmail.com",
      replyTo: data.email,
      subject: "New Project Inquiry — Ru'ya Studio",
      text: [
        "Ru'ya Studio — New Project Inquiry",
        "─".repeat(40),
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        `Company: ${data.company}`,
        `Project: ${data.message}`,
        `Date:    ${ts}`,
      ].join("\n"),
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:system-ui,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="540" cellpadding="0" cellspacing="0"
             style="max-width:540px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e3dc;">
        <!-- header -->
        <tr><td style="background:#f4f0ea;padding:28px 36px;border-bottom:1px solid #e8e3dc;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#b08a5a;">
            Ru'ya Studio
          </p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#1a1714;letter-spacing:-0.02em;">
            New Project Inquiry
          </h1>
        </td></tr>
        <!-- body -->
        <tr><td style="padding:36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe4;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9e9189;">Name</p>
              <p style="margin:4px 0 0;font-size:15px;color:#1a1714;">${n}</p>
            </td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe4;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9e9189;">Email</p>
              <p style="margin:4px 0 0;font-size:15px;color:#1a1714;">${e}</p>
            </td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe4;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9e9189;">Company</p>
              <p style="margin:4px 0 0;font-size:15px;color:#1a1714;">${co}</p>
            </td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe4;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9e9189;">Project</p>
              <p style="margin:4px 0 0;font-size:15px;color:#1a1714;white-space:pre-wrap;">${msg}</p>
            </td></tr>
            <tr><td style="padding:10px 0;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9e9189;">Submitted</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b6560;">${ts}</p>
            </td></tr>
          </table>
        </td></tr>
        <!-- footer -->
        <tr><td style="background:#f4f0ea;padding:20px 36px;border-top:1px solid #e8e3dc;">
          <p style="margin:0;font-size:11px;color:#9e9189;">Reply directly to this email to respond to ${n}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `.trim(),
    });

    // ── Auto-reply to visitor — premium studio letter ──
    try {
      await transporter.sendMail({
        from:    `"Ru'ya Studio" <${user}>`,
        to:      data.email,
        replyTo: "ruya.connect@gmail.com",
        subject: "We received your project — Ru'ya Studio",
        text: [
          `PROJECT INQUIRY`,
          `Your idea is with us.`,
          ``,
          `Hi ${data.name},`,
          ``,
          `Thank you for reaching out to Ru'ya Studio.`,
          ``,
          `We've received the details of your project and will take a look at what`,
          `you're building, where intelligence can help, and what the right next`,
          `step could be.`,
          ``,
          `─────────────────`,
          `YOUR PROJECT`,
          ``,
          `Project`,
          data.message,
          ``,
          `Company`,
          data.company,
          ``,
          `Email`,
          data.email,
          ``,
          `─────────────────`,
          ``,
          `Good ideas deserve thoughtful engineering.`,
          ``,
          `Ru'ya Studio`,
          `Intelligent Systems. Designed with Purpose.`,
          `ruya.connect@gmail.com`,
          ``,
          `─────────────────`,
          `Research deeply. Build deliberately. Ship intelligently.`,
          ``,
          `© 2026 Ru'ya Studio`,
        ].join("\n"),
        html: getAutoReplyHtml({
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
        }),
      });
    } catch (err) {
      // Auto-reply failure is non-fatal — log and continue
      console.warn("[sendContact] Auto-reply failed:", err);
    }

    return { ok: true };
  });
