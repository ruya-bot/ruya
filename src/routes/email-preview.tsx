/**
 * /email-preview
 *
 * Developer route to preview the animated Ru'ya Studio Project Inquiry confirmation email.
 */
import { createFileRoute } from "@tanstack/react-router";
import { getAutoReplyHtml } from "@/lib/emailTemplate";
import { useState } from "react";

export const Route = createFileRoute("/email-preview")({
  component: EmailPreviewPage,
});

function EmailPreviewPage() {
  const [key, setKey] = useState(0);

  const sampleData = {
    name: "Alex Vance",
    email: "alex@acme.com",
    company: "Acme Mobility",
    message: "We're building an autonomous fleet routing network and need a real-time computer vision and predictive traffic congestion pipeline.",
  };

  const html = getAutoReplyHtml(sampleData);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 p-6 space-y-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Ru'ya Studio — Email Motion Preview</h1>
          <p className="text-xs text-neutral-400">Subject: We received your project — Ru'ya Studio</p>
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors"
        >
          Replay Motion ↺
        </button>
      </div>

      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-neutral-800 bg-[#FAF9F6] shadow-2xl">
        <iframe
          key={key}
          title="Email Preview"
          srcDoc={html}
          className="w-full min-h-[780px] border-0"
        />
      </div>
    </div>
  );
}
