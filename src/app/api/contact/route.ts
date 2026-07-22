import { NextRequest } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxBodySize = 10_000;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > maxBodySize) {
    return Response.json({ message: "Le message est trop volumineux." }, { status: 413 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "Les données du formulaire sont invalides." }, { status: 400 });
  }

  if (!input || typeof input !== "object") {
    return Response.json({ message: "Les données du formulaire sont invalides." }, { status: 400 });
  }

  const body = input as Record<string, unknown>;
  const name = clean(body.name, 100);
  const email = clean(body.email, 160).toLowerCase();
  const subject = clean(body.subject, 100);
  const message = clean(body.message, 2000);

  if (!name || !email || !message) {
    return Response.json({ message: "Veuillez remplir tous les champs obligatoires." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ message: "Veuillez indiquer une adresse email valide." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.APPLICATION_RECIPIENT_EMAIL ?? "admissions@ifcpa-crtv.com";

  if (!apiKey || !senderEmail) {
    console.error("Contact email is not configured.");
    return Response.json({ message: "Le service de messagerie est momentanément indisponible." }, { status: 503 });
  }

  const ticketRef = `CONTACT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demande de contact IFCPA</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f9;padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);border:1px solid #e2e8f0">
          <tr>
            <td style="background-color:#06395f;padding:28px 32px;color:#ffffff">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#f59e0b">IFCPA / CRTV - Support & Contact</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff">Nouvelle Demande d'Information</h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.15);color:#ffffff;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600">${escapeHtml(ticketRef)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px">
              <div style="margin-bottom:24px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">👤 Expéditeur</h2>
                <table width="100%" cellspacing="0" cellpadding="8" style="font-size:14px;border-collapse:collapse">
                  <tr>
                    <td width="35%" style="color:#64748b;font-weight:600">Nom & Prénom :</td>
                    <td style="color:#0f172a;font-weight:700">${escapeHtml(name)}</td>
                  </tr>
                  <tr style="background-color:#f8fafc">
                    <td style="color:#64748b;font-weight:600">Adresse Email :</td>
                    <td style="color:#0284c7;font-weight:600">${escapeHtml(email)}</td>
                  </tr>
                  <tr>
                    <td style="color:#64748b;font-weight:600">Sujet / Formation :</td>
                    <td style="color:#0f172a;font-weight:700">${escapeHtml(subject || "General")}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom:24px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">💬 Message transmise</h2>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;padding:16px;border-radius:8px;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
              </div>

              <div style="text-align:center;margin:32px 0 16px 0">
                <a href="mailto:${escapeHtml(email)}?subject=Re:%20[${escapeHtml(ticketRef)}]%20Reponse%20IFCPA" style="display:inline-block;background-color:#06395f;color:#ffffff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none">✉️ Répondre directement</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b">
              <p style="margin:0;font-weight:600;color:#06395f">Institut de Formation de la CRTV (IFCPA)</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { accept: "application/json", "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Contact Site IFCPA", email: senderEmail },
        to: [{ email: recipientEmail, name: "Support IFCPA" }],
        replyTo: { email, name },
        subject: `[${ticketRef}] Message de ${name} (${subject || "Contact"})`,
        htmlContent,
        tags: ["contact-ifcpa"],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Brevo rejected contact email.", response.status);
      return Response.json({ message: "La transmission a échoué. Réessayez dans quelques instants." }, { status: 502 });
    }

    return Response.json({ success: true, ticketRef }, { status: 200 });
  } catch (error) {
    console.error("Contact email failed.", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "Une erreur est survenue lors de l'envoi du message." }, { status: 502 });
  }
}
