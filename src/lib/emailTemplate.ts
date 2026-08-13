/**
 * Ru'ya Studio — Ultra-Premium Email Template
 *
 * Designed as a boutique studio dispatch letter:
 * - Warm porcelain background (#FBF9F5)
 * - Custom cubic-bezier (outExpo) motion curves
 * - Hairline borders & subtle Ru'ya gold accents
 * - Monospace micro-labels and serif brand quotes
 * - 100% static fallback for non-animating email clients
 */

export interface EmailParams {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function getAutoReplyHtml({ name, email, company, message }: EmailParams): string {
  const n   = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const e   = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const co  = company.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const msg = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>We received your project — Ru'ya Studio</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width:600px) {
      .outer  { padding: 24px 12px !important; }
      .inner  { padding: 36px 20px !important; }
      .h1     { font-size: 27px !important; line-height: 1.12 !important; }
    }

    /* ── Ultra-Fluid Out-Expo Keyframes ── */
    @keyframes animAperture {
      0%   { opacity: 0; transform: scale(0.88) rotate(-12deg); }
      100% { opacity: 1; transform: scale(1) rotate(0deg); }
    }
    @keyframes animBrandText {
      0%   { opacity: 0; transform: translateY(3px); letter-spacing: 0.42em; }
      100% { opacity: 1; transform: translateY(0); letter-spacing: 0.32em; }
    }
    @keyframes animGoldLine {
      0%   { width: 0px; opacity: 0; }
      100% { width: 36px; opacity: 1; }
    }
    @keyframes animFadeUp {
      0%   { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes animHeadline {
      0%   { opacity: 0; transform: translateY(16px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes animBorderExpand {
      0%   { width: 0%; opacity: 0; }
      100% { width: 100%; opacity: 1; }
    }
    @keyframes animCardFade {
      0%   { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Animation Classes */
    .anim-aperture   { animation: animAperture 800ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards; }
    .anim-brand-txt  { animation: animBrandText 750ms cubic-bezier(0.16, 1, 0.3, 1) 100ms 1 normal forwards; }
    .anim-gold-rule  { animation: animGoldLine 600ms cubic-bezier(0.16, 1, 0.3, 1) 220ms 1 normal forwards; }
    .anim-eyebrow    { animation: animFadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms 1 normal forwards; }
    .anim-headline   { animation: animHeadline 850ms cubic-bezier(0.16, 1, 0.3, 1) 320ms 1 normal forwards; }
    .anim-dispatch   { animation: animCardFade 700ms cubic-bezier(0.16, 1, 0.3, 1) 480ms 1 normal forwards; }
    .anim-divider    { animation: animBorderExpand 800ms cubic-bezier(0.16, 1, 0.3, 1) 620ms 1 normal forwards; }
    .anim-proj-hdr   { animation: animFadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) 700ms 1 normal forwards; }
    .anim-item-1     { animation: animFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 800ms 1 normal forwards; }
    .anim-item-2     { animation: animFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 920ms 1 normal forwards; }
    .anim-item-3     { animation: animFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 1040ms 1 normal forwards; }
    .anim-closing    { animation: animFadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 1160ms 1 normal forwards; }
    .anim-sig        { animation: animFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 1280ms 1 normal forwards; }

    /* Interactive Email Link */
    .email-link {
      color: #716D68;
      text-decoration: none;
      transition: color 300ms ease, border-color 300ms ease;
      border-bottom: 1px solid rgba(184, 137, 69, 0.2);
      padding-bottom: 1px;
    }
    .email-link:hover {
      color: #B88945 !important;
      border-bottom-color: #B88945 !important;
    }

    /* Accessibility / Reduced Motion Fallback */
    @media (prefers-reduced-motion: reduce) {
      *, ::before, ::after {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FBF9F5;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;">

<!-- Preheader (hidden) -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
  Your project details are safely with us.&nbsp;&#847;&nbsp;
</div>

<!-- Main Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FBF9F5;">
<tr><td class="outer" align="center" style="padding:60px 24px 80px;">

  <!-- Main Canvas Card -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="max-width:580px;background-color:#FAF8F4;border:1px solid rgba(23,21,19,0.07);border-radius:16px;box-shadow:0 4px 24px rgba(23,21,19,0.02);overflow:hidden;">
  <tr><td class="inner" style="padding:52px 48px;">

    <!-- ── 01. BRAND HEADER ── -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:44px;">
      <tr>
        <td>
          <div style="display:flex;align-items:center;justify-between;">
            <div style="display:flex;align-items:center;gap:12px;">
              <!-- Official Ru'ya Studio Logo Mark -->
              <div class="anim-aperture" style="display:inline-block;vertical-align:middle;">
                <!-- HTML / Web Preview image -->
                <img src="/lgo.png" alt="Ru'ya Studio Logo" width="28" height="28"
                     style="display:block;height:28px;width:28px;object-fit:contain;"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
                <!-- SVG fallback for clients where image fails -->
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                  <g clip-path="url(#ruya-logo-clip)">
                    <circle cx="50" cy="50" r="50" fill="#FAF8F4"/>
                    <!-- Top-Right Gold Blade -->
                    <path d="M 50 0 C 77.6 0 100 22.4 100 50 L 50 50 Z" fill="#D49B2A"/>
                    <!-- Top-Left Dark Blade -->
                    <path d="M 0 50 C 0 22.4 22.4 0 50 0 L 55 35 L 0 35 Z" fill="#171513"/>
                    <!-- Left Dark Blade -->
                    <path d="M 0 50 L 35 50 L 35 100 C 15.7 100 0 84.3 0 65 Z" fill="#171513"/>
                    <!-- Bottom Right Dark Blade -->
                    <path d="M 50 50 L 100 50 L 100 100 Z" fill="#171513"/>
                    <!-- White R cutout -->
                    <path d="M 35 35 L 60 35 C 68.3 35 75 41.7 75 50 C 75 58.3 68.3 65 60 65 L 50 65 L 75 100 L 55 100 L 35 70 Z" fill="#FAF8F4"/>
                  </g>
                  <defs>
                    <clipPath id="ruya-logo-clip">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p class="anim-brand-txt" style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.32em;text-transform:uppercase;color:#B88945;line-height:1;display:inline-block;vertical-align:middle;">
                RU'YA STUDIO
              </p>
              <span class="anim-gold-rule" style="display:inline-block;height:1px;width:36px;background-color:#B88945;vertical-align:middle;"></span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- ── 02. INQUIRY HEADER ── -->
    <div style="margin-bottom:36px;">
      <p class="anim-eyebrow" style="margin:0 0 16px;font-family:'Inter',system-ui,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#8E8882;">
        ● &nbsp;PROJECT DISPATCH
      </p>
      <h1 class="h1 anim-headline" style="margin:0;font-family:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:36px;font-weight:800;color:#171513;letter-spacing:-0.035em;line-height:1.08;">
        Your idea is with us.
      </h1>
    </div>

    <!-- ── 03. STUDIO DISPATCH LETTER CARD ── -->
    <div class="anim-dispatch" style="margin-bottom:40px;background-color:#F4F0EA;border:1px solid rgba(23,21,19,0.06);border-left:3px solid #B88945;border-radius:8px;padding:24px 28px;">
      <p style="margin:0 0 12px;font-family:'Inter',system-ui,sans-serif;font-size:15px;font-weight:600;color:#171513;line-height:1.5;">
        Hi ${n},
      </p>
      <p style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:14.5px;color:#4A4540;line-height:1.75;">
        Thank you for reaching out to Ru'ya Studio.<br/><br/>
        We've received the details of your project and will take a look at what you're building, where intelligence can help, and what the right next step could be.
      </p>
    </div>

    <!-- ── 04. DIVIDER ── -->
    <div className="anim-divider" style="height:1px;width:100%;background-color:rgba(23,21,19,0.08);margin-bottom:36px;"></div>

    <!-- ── 05. PROJECT SUMMARY ── -->
    <div style="margin-bottom:40px;">
      <p class="anim-proj-hdr" style="margin:0 0 24px;font-family:'Inter',system-ui,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#8E8882;">
        YOUR PROJECT
      </p>

      <!-- Project detail block -->
      <table class="anim-item-1" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
          <td style="padding:16px 20px;background-color:#F4F0EA;border-radius:8px;border:1px solid rgba(23,21,19,0.04);">
            <p style="margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9E9893;">PROJECT</p>
            <p style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:14.5px;color:#171513;line-height:1.65;white-space:pre-wrap;">${msg}</p>
          </td>
        </tr>
      </table>

      <!-- Company & Email Row -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="anim-item-2" width="48%" style="padding:16px 20px;background-color:#F4F0EA;border-radius:8px;border:1px solid rgba(23,21,19,0.04);vertical-align:top;">
            <p style="margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9E9893;">COMPANY</p>
            <p style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:14px;font-weight:600;color:#171513;line-height:1.5;">${co}</p>
          </td>
          <td width="4%"></td>
          <td class="anim-item-3" width="48%" style="padding:16px 20px;background-color:#F4F0EA;border-radius:8px;border:1px solid rgba(23,21,19,0.04);vertical-align:top;">
            <p style="margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9E9893;">EMAIL</p>
            <p style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:14px;font-weight:600;color:#171513;line-height:1.5;">${e}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- ── 06. BRAND CLOSING ── -->
    <div class="anim-closing" style="padding-top:28px;border-top:1px solid rgba(23,21,19,0.08);margin-bottom:36px;">
      <p style="margin:0 0 18px;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#3A3632;line-height:1.6;">
        "Good ideas deserve thoughtful engineering."
      </p>
      <p style="margin:0 0 4px;font-family:'Inter',system-ui,sans-serif;font-size:13px;font-weight:800;color:#171513;letter-spacing:0.02em;">
        Ru'ya Studio
      </p>
      <p style="margin:0 0 12px;font-family:'Inter',system-ui,sans-serif;font-size:12px;color:#716D68;">
        Intelligent Systems. Designed with Purpose.
      </p>
      <a href="mailto:ruya.connect@gmail.com" class="email-link"
         style="font-family:'Inter',system-ui,sans-serif;font-size:12px;font-weight:500;">
        ruya.connect@gmail.com
      </a>
    </div>

    <!-- ── 07. FOOTER SIGNATURE ── -->
    <div class="anim-sig" style="padding-top:24px;border-top:1px stroke rgba(23,21,19,0.06);">
      <p style="margin:0 0 12px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10.5px;color:#9E9893;line-height:1.9;letter-spacing:0.04em;">
        Research deeply. &nbsp;·&nbsp; Build deliberately. &nbsp;·&nbsp; Ship intelligently.
      </p>
      <p style="margin:0;font-family:'Inter',system-ui,sans-serif;font-size:10.5px;color:#C4BFBA;">
        © 2026 Ru'ya Studio. All rights reserved.
      </p>
    </div>

  </td></tr>
  </table>

</td></tr>
</table>

</body>
</html>`;
}
