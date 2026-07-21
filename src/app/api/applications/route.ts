import { NextRequest } from "next/server";
import {
  candidateTypeOptions,
  isProgrammeEligible,
  optionLabel,
  programmeOptions,
  qualificationOptions,
  type CompetitionApplication,
} from "@/lib/competition-application";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{7,24}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const maxBodySize = 20_000;

function isAllowed(options: ReadonlyArray<{ value: string }>, value: string) {
  return options.some((option) => option.value === value);
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseApplication(input: unknown): { data?: CompetitionApplication; error?: string } {
  if (!input || typeof input !== "object") return { error: "Le formulaire est invalide." };
  const body = input as Record<string, unknown>;
  const data: CompetitionApplication = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    birthDate: clean(body.birthDate, 10),
    nationality: clean(body.nationality, 80),
    city: clean(body.city, 100),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 30),
    candidateType: clean(body.candidateType, 30),
    qualification: clean(body.qualification, 40),
    firstChoice: clean(body.firstChoice, 80),
    secondChoice: clean(body.secondChoice, 80),
    message: clean(body.message, 1_000),
    consent: body.consent === true,
    website: clean(body.website, 200),
  };

  if (data.website) return { error: "La demande n'a pas pu être traitée." };
  if (!data.firstName || !data.lastName || !data.nationality || !data.city) return { error: "Complétez toutes les informations personnelles obligatoires." };
  if (!datePattern.test(data.birthDate) || data.birthDate > "2010-09-11") return { error: "Le concours est ouvert aux candidats âgés d'au moins 16 ans au 11 septembre 2026." };
  if (!emailPattern.test(data.email) || !phonePattern.test(data.phone)) return { error: "Vérifiez l'adresse email et le numéro de téléphone." };
  if (!isAllowed(candidateTypeOptions, data.candidateType) || !isAllowed(qualificationOptions, data.qualification)) return { error: "Le statut ou le diplôme sélectionné est invalide." };
  if (!isAllowed(programmeOptions, data.firstChoice)) return { error: "Choisissez une première filière valide." };
  if (data.secondChoice && (!isAllowed(programmeOptions, data.secondChoice) || data.secondChoice === data.firstChoice)) return { error: "La deuxième filière doit être différente de la première." };
  if (!isProgrammeEligible(data.firstChoice, data.qualification) || (data.secondChoice && !isProgrammeEligible(data.secondChoice, data.qualification))) return { error: "Le diplôme indiqué ne donne pas accès à l'une des filières choisies selon l'arrêté 2026." };
  if (!data.consent) return { error: "Votre accord est nécessaire pour transmettre la demande à l'IFCPA." };
  return { data };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      const hostName = host.split(":")[0];
      if (originUrl.hostname !== hostName && originUrl.hostname !== "localhost" && originUrl.hostname !== "127.0.0.1") {
        return Response.json({ message: "Origine de la demande non autorisée." }, { status: 403 });
      }
    } catch {
      // Ignore URL parsing errors
    }
  }
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > maxBodySize) return Response.json({ message: "Le formulaire est trop volumineux." }, { status: 413 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "Le formulaire est invalide." }, { status: 400 });
  }

  const parsed = parseApplication(input);
  if (!parsed.data) return Response.json({ message: parsed.error }, { status: 400 });

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.APPLICATION_RECIPIENT_EMAIL ?? "ifcpa.crtv@gmail.com";
  if (!apiKey || !senderEmail) {
    console.error("Competition application email is not configured.");
    return Response.json({ message: "L'inscription en ligne est momentanément indisponible. Contactez l'IFCPA par téléphone ou par email." }, { status: 503 });
  }

  const application = parsed.data;
  const reference = `IFCPA-2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const rows = [
    ["Référence", reference],
    ["Nom complet", `${application.firstName} ${application.lastName}`],
    ["Date de naissance", application.birthDate],
    ["Nationalité", application.nationality],
    ["Ville de résidence", application.city],
    ["Téléphone", application.phone],
    ["Email", application.email],
    ["Statut", optionLabel(candidateTypeOptions, application.candidateType)],
    ["Diplôme", optionLabel(qualificationOptions, application.qualification)],
    ["Premier choix", optionLabel(programmeOptions, application.firstChoice)],
    ["Deuxième choix", application.secondChoice ? optionLabel(programmeOptions, application.secondChoice) : "Non renseigné"],
    ["Précision", application.message || "Aucune"],
  ];
  try {
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Préinscription Concours IFCPA 2026</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f9;padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);border:1px solid #e2e8f0">
          
          <!-- En-tête officiel -->
          <tr>
            <td style="background-color:#06395f;padding:28px 32px;color:#ffffff">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#f59e0b">IFCPA / CRTV - Concours 2026</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3">Nouvelle Préinscription en Ligne</h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.15);color:#ffffff;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600;letter-spacing:0.5px">${escapeHtml(reference)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenu principal -->
          <tr>
            <td style="padding:32px">

              <!-- Section 1 : Informations Candidat -->
              <div style="margin-bottom:28px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">👤 Informations du Candidat</h2>
                <table width="100%" cellspacing="0" cellpadding="8" style="font-size:14px;border-collapse:collapse">
                  <tr>
                    <td width="35%" style="color:#64748b;font-weight:600">Nom complet :</td>
                    <td style="color:#0f172a;font-weight:700">${escapeHtml(application.firstName)} ${escapeHtml(application.lastName)}</td>
                  </tr>
                  <tr style="background-color:#f8fafc">
                    <td style="color:#64748b;font-weight:600">Date de naissance :</td>
                    <td style="color:#0f172a">${escapeHtml(application.birthDate)}</td>
                  </tr>
                  <tr>
                    <td style="color:#64748b;font-weight:600">Nationalité :</td>
                    <td style="color:#0f172a">${escapeHtml(application.nationality)}</td>
                  </tr>
                  <tr style="background-color:#f8fafc">
                    <td style="color:#64748b;font-weight:600">Ville de résidence :</td>
                    <td style="color:#0f172a">${escapeHtml(application.city)}</td>
                  </tr>
                  <tr>
                    <td style="color:#64748b;font-weight:600">Statut actuel :</td>
                    <td style="color:#0f172a">${escapeHtml(optionLabel(candidateTypeOptions, application.candidateType))}</td>
                  </tr>
                  <tr style="background-color:#f8fafc">
                    <td style="color:#64748b;font-weight:600">Diplôme présenté :</td>
                    <td style="color:#0f172a">${escapeHtml(optionLabel(qualificationOptions, application.qualification))}</td>
                  </tr>
                </table>
              </div>

              <!-- Section 2 : Filières choisies -->
              <div style="margin-bottom:28px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">🎓 Filières Souhaitées</h2>
                <div style="background-color:#ecfdf5;border-left:4px solid #10b981;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:10px">
                  <p style="margin:0;font-size:12px;color:#047857;font-weight:700;text-transform:uppercase">Premier choix (Principal)</p>
                  <p style="margin:4px 0 0 0;font-size:16px;color:#064e3b;font-weight:700">${escapeHtml(optionLabel(programmeOptions, application.firstChoice))}</p>
                </div>
                ${application.secondChoice ? `
                <div style="background-color:#f1f5f9;border-left:4px solid #94a3b8;padding:10px 16px;border-radius:0 8px 8px 0">
                  <p style="margin:0;font-size:11px;color:#475569;font-weight:700;text-transform:uppercase">Deuxième choix (Optionnel)</p>
                  <p style="margin:2px 0 0 0;font-size:14px;color:#334155;font-weight:600">${escapeHtml(optionLabel(programmeOptions, application.secondChoice))}</p>
                </div>
                ` : ''}
              </div>

              <!-- Section 3 : Coordonnées de contact -->
              <div style="margin-bottom:28px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">📞 Coordonnées de Contact</h2>
                <table width="100%" cellspacing="0" cellpadding="8" style="font-size:14px;border-collapse:collapse">
                  <tr>
                    <td width="35%" style="color:#64748b;font-weight:600">Téléphone :</td>
                    <td style="color:#0f172a;font-weight:700">${escapeHtml(application.phone)}</td>
                  </tr>
                  <tr style="background-color:#f8fafc">
                    <td style="color:#64748b;font-weight:600">Email :</td>
                    <td style="color:#0284c7;font-weight:600">${escapeHtml(application.email)}</td>
                  </tr>
                </table>
              </div>

              ${application.message ? `
              <!-- Section 4 : Message du candidat -->
              <div style="margin-bottom:28px">
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#06395f;border-bottom:2px solid #e2e8f0;padding-bottom:6px">💬 Précisions / Message</h2>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;padding:14px 16px;border-radius:8px;font-size:14px;color:#334155;line-height:1.5;white-space:pre-wrap">${escapeHtml(application.message)}</div>
              </div>
              ` : ''}

              <!-- Bouton d'action -->
              <div style="text-align:center;margin:32px 0 16px 0">
                <a href="mailto:${escapeHtml(application.email)}?subject=Re:%20[${escapeHtml(reference)}]%20Votre%20préinscription%20au%20concours%20IFCPA" style="display:inline-block;background-color:#06395f;color:#ffffff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 2px 6px rgba(6,57,95,0.25)">✉️ Répondre au candidat</a>
              </div>

            </td>
          </tr>

          <!-- Pied de page -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b">
              <p style="margin:0 0 4px 0;font-weight:600;color:#06395f">Institut de Formation de la CRTV (IFCPA)</p>
              <p style="margin:0">Cet email a été envoyé automatiquement suite à une préinscription sur <a href="https://ifcpa-crtv.cm" style="color:#0284c7;text-decoration:none">ifcpa-crtv.cm</a>.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { accept: "application/json", "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Inscription concours IFCPA", email: senderEmail },
        to: [{ email: recipientEmail, name: "Service des admissions IFCPA" }],
        replyTo: { email: application.email, name: `${application.firstName} ${application.lastName}` },
        subject: `[${reference}] Nouvelle préinscription au concours IFCPA 2026`,
        htmlContent,
        tags: ["concours-ifcpa-2026"],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Brevo rejected competition application email.", response.status);
      return Response.json({ message: "La transmission a échoué. Réessayez dans quelques instants ou contactez l'IFCPA." }, { status: 502 });
    }
    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    console.error("Competition application email failed.", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "La transmission a échoué. Vérifiez votre connexion et réessayez." }, { status: 502 });
  }
}
