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
  if (origin && origin !== request.nextUrl.origin) return Response.json({ message: "Origine de la demande non autorisée." }, { status: 403 });
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
  const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:10px 12px;text-align:left;border-bottom:1px solid #dce5ee;color:#06395f">${escapeHtml(label)}</th><td style="padding:10px 12px;border-bottom:1px solid #dce5ee">${escapeHtml(value)}</td></tr>`).join("");

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { accept: "application/json", "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Inscription concours IFCPA", email: senderEmail },
        to: [{ email: recipientEmail, name: "Service des admissions IFCPA" }],
        replyTo: { email: application.email, name: `${application.firstName} ${application.lastName}` },
        subject: `[${reference}] Nouvelle préinscription au concours IFCPA 2026`,
        htmlContent: `<html><body style="font-family:Arial,sans-serif;color:#20242a"><h1 style="color:#06395f">Nouvelle préinscription - Concours IFCPA 2026</h1><table style="border-collapse:collapse;width:100%;max-width:760px">${htmlRows}</table><p style="margin-top:24px;color:#59636f">Cette demande provient du formulaire d'inscription en ligne du site IFCPA/CRTV. Répondez directement à cet email pour contacter le candidat.</p></body></html>`,
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
