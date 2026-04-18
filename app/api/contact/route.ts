import { NextRequest, NextResponse } from "next/server";

// ============================================
// CUSTOMIZE PER CLIENT
// Update field names to match your contact form
// Create a new Discord webhook per client:
// Server Settings → Integrations → Webhooks
// Add DISCORD_WEBHOOK_URL to Vercel env vars
// ============================================

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, restaurant, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: `New Inquiry — ${subject || "General"}`,
          color: 0xc9a85c,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Restaurant", value: restaurant || "N/A", inline: true },
            { name: "Message", value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
