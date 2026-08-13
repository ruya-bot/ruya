/**
 * Ru'ya Studio — Cloudflare Worker Entry Point
 *
 * Handles:
 *  1. POST /api/contact -> Validation, Rate Limiting, Honeypot, Transactional Email via Resend API
 *  2. Static Assets & SPA Routing -> env.ASSETS.fetch(request)
 */

import { getAutoReplyHtml } from "./lib/emailTemplate";

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CONTACT_EMAIL?: string;
  PUBLIC_SITE_URL?: string;
  EMAIL_PROVIDER_API_KEY?: string;
}

// ── Rate Limiter ─────────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

// ── HTML Sanitizer ────────────────────────────────────────────────────────────
function sanitize(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Email Validator ───────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ── 1. API Route: /api/contact ───────────────────────────────────────────
    if (url.pathname === "/api/contact") {
      // Method check
      if (request.method !== "POST") {
        return Response.json(
          { success: false, error: "Method not allowed. Use POST." },
          { status: 405, headers: { Allow: "POST" } }
        );
      }

      // Rate limiting
      const ip =
        request.headers.get("cf-connecting-ip") ??
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown";

      if (isRateLimited(ip)) {
        return Response.json(
          { success: false, error: "Too many requests. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      // Parse JSON body
      let body: Record<string, unknown>;
      try {
        body = await request.json();
      } catch {
        return Response.json(
          { success: false, error: "Invalid JSON payload." },
          { status: 400 }
        );
      }

      const name    = typeof body["name"] === "string" ? body["name"].trim() : "";
      const email   = typeof body["email"] === "string" ? body["email"].trim() : "";
      const company = typeof body["company"] === "string" ? body["company"].trim() : "";
      const project = typeof body["project"] === "string"
        ? body["project"].trim()
        : typeof body["message"] === "string"
          ? body["message"].trim()
          : "";
      const honeypot = typeof body["_hp"] === "string" ? body["_hp"].trim() : "";

      // Honeypot check
      if (honeypot.length > 0) {
        return Response.json({ success: true }); // Silent success for bots
      }

      // Validation
      if (!name || name.length > 200) {
        return Response.json({ success: false, error: "Name is required." }, { status: 400 });
      }
      if (!email || !EMAIL_RE.test(email) || email.length > 320) {
        return Response.json({ success: false, error: "Please enter a valid email address." }, { status: 422 });
      }
      if (!company || company.length > 200) {
        return Response.json({ success: false, error: "Company is required." }, { status: 400 });
      }
      if (!project || project.length > 5000) {
        return Response.json({ success: false, error: "Project description is required." }, { status: 400 });
      }

      // Secrets & Env check
      const apiKey = env.EMAIL_PROVIDER_API_KEY;
      const targetEmail = env.CONTACT_EMAIL || "ruya.connect@gmail.com";

      if (!apiKey || apiKey === "[USER MUST ENTER THE REAL EMAIL PROVIDER API KEY]") {
        console.error("[Worker] EMAIL_PROVIDER_API_KEY secret is missing or unconfigured.");
        return Response.json(
          { success: false, error: "Email service not configured. Please contact ruya.connect@gmail.com." },
          { status: 503 }
        );
      }

      const ts = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";

      // ── Send Notification to Ru'ya Studio via Resend ───────────────────────
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Ru'ya Studio <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: email,
            subject: "New Project Inquiry — Ru'ya Studio",
            text: [
              "RU'YA STUDIO",
              "New Project Inquiry",
              "─".repeat(40),
              `Name:      ${name}`,
              `Email:     ${email}`,
              `Company:   ${company}`,
              `Project:   ${project}`,
              `Submitted: ${ts}`,
            ].join("\n"),
            html: `
              <div style="font-family:sans-serif;padding:24px;color:#171513;background:#FAF8F4;">
                <p style="font-size:11px;font-weight:700;letter-spacing:0.28em;color:#B88945;">RU'YA STUDIO</p>
                <h1 style="font-size:20px;font-weight:800;margin:12px 0 24px;">New Project Inquiry</h1>
                <p><strong>Name:</strong> ${sanitize(name)}</p>
                <p><strong>Email:</strong> ${sanitize(email)}</p>
                <p><strong>Company:</strong> ${sanitize(company)}</p>
                <p><strong>Project:</strong></p>
                <p style="white-space:pre-wrap;background:#F4F0EA;padding:16px;border-radius:8px;">${sanitize(project)}</p>
                <p style="font-size:12px;color:#716D68;margin-top:24px;">Submitted: ${ts}</p>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          console.error("[Worker] Resend API error:", resendRes.status, errText);
          return Response.json(
            { success: false, error: "Email provider dispatch failed." },
            { status: 500 }
          );
        }
      } catch (err) {
        console.error("[Worker] Failed to call email provider:", err);
        return Response.json(
          { success: false, error: "Network error sending inquiry." },
          { status: 500 }
        );
      }

      // ── Auto-reply to Visitor (Non-fatal) ───────────────────────────────────
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Ru'ya Studio <onboarding@resend.dev>",
            to: [email],
            reply_to: targetEmail,
            subject: "We received your project — Ru'ya Studio",
            html: getAutoReplyHtml({ name, email, company, message: project }),
          }),
        });
      } catch (err) {
        console.warn("[Worker] Auto-reply failed (non-fatal):", err);
      }

      return Response.json({ success: true });
    }

    // ── 2. Serve Static Assets / SPA Routing for all other requests ─────────
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  },
};
