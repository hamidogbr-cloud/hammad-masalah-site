export default async function handler(req, res) {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "HAMMAD WHATSAPP";

  // Meta webhook verification
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // Acknowledge valid webhook payloads and process messages.
  // AI + WhatsApp sending will be enabled after the required API keys are added.
  try {
    console.log("WhatsApp webhook:", JSON.stringify(req.body));
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ ok: false });
  }
}
