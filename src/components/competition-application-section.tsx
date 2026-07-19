"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { SectionIntro } from "@/components/section-intro";
import type { Locale } from "@/components/site-types";
import { candidateTypeOptions, programmeOptions, qualificationOptions } from "@/lib/competition-application";

type SubmissionState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

const copy = {
  fr: {
    eyebrow: "Inscription en ligne",
    title: "Déposez votre demande de candidature.",
    lead: "Renseignez vos informations et vos choix de filière. L'équipe des admissions de l'IFCPA recevra immédiatement votre demande par email et pourra vous recontacter.",
    notice: "Cette demande en ligne ne remplace pas le dossier physique exigé par l'arrêté. Elle permet à l'IFCPA de vous identifier et de vous accompagner dans la suite de l'inscription.",
    identity: "Informations personnelles",
    application: "Choix de candidature",
    firstName: "Prénom(s)",
    lastName: "Nom",
    birthDate: "Date de naissance",
    nationality: "Nationalité",
    city: "Ville de résidence",
    email: "Adresse email",
    phone: "Téléphone / WhatsApp",
    candidateType: "Statut du candidat",
    qualification: "Diplôme ou niveau obtenu",
    firstChoice: "Premier choix de filière",
    secondChoice: "Deuxième choix (facultatif)",
    noSecondChoice: "Aucun deuxième choix",
    message: "Précision utile (facultatif)",
    consent: "J'autorise la transmission de ces informations au service des admissions de l'IFCPA afin de traiter ma demande.",
    submit: "Envoyer ma demande d'inscription",
    sending: "Transmission en cours…",
    successTitle: "Votre demande a bien été transmise.",
    successBody: "Conservez cette référence et utilisez-la lors de vos échanges avec l'IFCPA :",
    retry: "Envoyer une autre demande",
    error: "Impossible de transmettre la demande pour le moment.",
    eligibility: "Le candidat doit avoir au moins 16 ans au 11 septembre 2026. Vérifiez dans l'arrêté que votre diplôme donne accès à la filière choisie.",
  },
  en: {
    eyebrow: "Online application",
    title: "Submit your application request.",
    lead: "Enter your details and programme choices. The IFCPA admissions team will immediately receive your request by email and can contact you.",
    notice: "This online request does not replace the physical application file required by the official notice. It allows IFCPA to identify you and guide you through the remaining steps.",
    identity: "Personal information",
    application: "Application choices",
    firstName: "First name(s)",
    lastName: "Last name",
    birthDate: "Date of birth",
    nationality: "Nationality",
    city: "City of residence",
    email: "Email address",
    phone: "Phone / WhatsApp",
    candidateType: "Applicant status",
    qualification: "Qualification or level obtained",
    firstChoice: "First programme choice",
    secondChoice: "Second choice (optional)",
    noSecondChoice: "No second choice",
    message: "Additional information (optional)",
    consent: "I authorise these details to be sent to the IFCPA admissions team for the purpose of processing my request.",
    submit: "Send my application request",
    sending: "Sending…",
    successTitle: "Your request has been sent.",
    successBody: "Keep this reference and use it when contacting IFCPA:",
    retry: "Send another request",
    error: "The request could not be sent at this time.",
    eligibility: "Applicants must be at least 16 years old on 11 September 2026. Check the official notice to ensure that your qualification grants access to your chosen programme.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function CompetitionApplicationSection({ locale }: { locale: Locale }) {
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const [qualification, setQualification] = useState("");
  const content = copy[locale];
  const eligibleProgrammes = programmeOptions.filter((option) => (option.qualifications as readonly string[]).includes(qualification));

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const firstChoice = String(formData.get("firstChoice") ?? "");
    const secondChoice = String(formData.get("secondChoice") ?? "");
    if (firstChoice === secondChoice && secondChoice) {
      setSubmission({ status: "error", message: locale === "fr" ? "Choisissez deux filières différentes." : "Choose two different programmes." });
      return;
    }

    setSubmission({ status: "sending" });
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          birthDate: formData.get("birthDate"),
          nationality: formData.get("nationality"),
          city: formData.get("city"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          candidateType: formData.get("candidateType"),
          qualification: formData.get("qualification"),
          firstChoice,
          secondChoice,
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
        }),
      });
      const result = await response.json() as { reference?: string; message?: string };
      if (!response.ok || !result.reference) throw new Error(result.message || content.error);
      form.reset();
      setQualification("");
      setSubmission({ status: "success", reference: result.reference });
    } catch (error) {
      setSubmission({ status: "error", message: error instanceof Error ? error.message : content.error });
    }
  }

  return (
    <section id="inscription-concours" className="scroll-mt-20 bg-white px-6 py-24 md:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <SectionIntro eyebrow={content.eyebrow} title={content.title} />
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--on-surface-variant)]">{content.lead}</p>
            <div className="mt-8 border-l-2 border-[var(--secondary)] bg-[var(--surface-container-low)] p-5 text-sm leading-6 text-[var(--on-surface-variant)]">{content.notice}</div>
            <p className="mt-5 text-xs leading-5 text-[var(--on-surface-variant)]">{content.eligibility}</p>
          </div>

          <div data-scroll-item className="border border-[var(--outline-variant)] bg-[var(--surface)] p-6 shadow-xl shadow-[var(--primary)]/[0.06] sm:p-9">
            {submission.status === "success" ? (
              <div role="status" className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#d9f7e8] text-3xl text-[#0a6b43]" aria-hidden="true">✓</span>
                <h3 className="mt-6 font-serif text-3xl font-semibold text-[var(--primary)]">{content.successTitle}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-[var(--on-surface-variant)]">{content.successBody}</p>
                <strong className="mt-5 bg-[var(--secondary-fixed)] px-5 py-3 font-mono text-sm tracking-[0.08em] text-[var(--on-secondary-fixed-variant)]">{submission.reference}</strong>
                <button type="button" onClick={() => setSubmission({ status: "idle" })} className="mt-8 text-sm font-semibold text-[var(--secondary)] underline underline-offset-4">{content.retry}</button>
              </div>
            ) : (
              <form onSubmit={submitApplication} noValidate>
                <FormGroup title={content.identity}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={content.firstName}><input required autoComplete="given-name" name="firstName" maxLength={80} /></Field>
                    <Field label={content.lastName}><input required autoComplete="family-name" name="lastName" maxLength={80} /></Field>
                    <Field label={content.birthDate}><input required name="birthDate" type="date" max="2010-09-11" /></Field>
                    <Field label={content.nationality}><input required autoComplete="country-name" name="nationality" maxLength={80} /></Field>
                    <Field label={content.city}><input required autoComplete="address-level2" name="city" maxLength={100} /></Field>
                    <Field label={content.phone}><input required autoComplete="tel" name="phone" type="tel" minLength={8} maxLength={30} /></Field>
                    <div className="sm:col-span-2"><Field label={content.email}><input required autoComplete="email" name="email" type="email" maxLength={160} /></Field></div>
                  </div>
                </FormGroup>

                <FormGroup title={content.application}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={content.candidateType}><select required name="candidateType" defaultValue=""><option value="" disabled>-</option>{candidateTypeOptions.map((option) => <option key={option.value} value={option.value}>{option[locale]}</option>)}</select></Field>
                    <Field label={content.qualification}><select required name="qualification" value={qualification} onChange={(event) => setQualification(event.target.value)}><option value="" disabled>-</option>{qualificationOptions.map((option) => <option key={option.value} value={option.value}>{option[locale]}</option>)}</select></Field>
                    <div className="sm:col-span-2"><Field label={content.firstChoice}><select key={`first-${qualification}`} required disabled={!qualification} name="firstChoice" defaultValue=""><option value="" disabled>-</option>{eligibleProgrammes.map((option) => <option key={option.value} value={option.value}>{option[locale]}</option>)}</select></Field></div>
                    <div className="sm:col-span-2"><Field label={content.secondChoice}><select key={`second-${qualification}`} disabled={!qualification} name="secondChoice" defaultValue=""><option value="">{content.noSecondChoice}</option>{eligibleProgrammes.map((option) => <option key={option.value} value={option.value}>{option[locale]}</option>)}</select></Field></div>
                    <div className="sm:col-span-2"><Field label={content.message}><textarea name="message" rows={3} maxLength={1000} /></Field></div>
                  </div>
                </FormGroup>

                <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--on-surface-variant)]">
                  <input required name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--secondary)]" />
                  <span>{content.consent}</span>
                </label>

                {submission.status === "error" && <p role="alert" className="mt-5 border-l-2 border-[var(--error)] bg-[#fff1f0] p-4 text-sm text-[var(--error)]">{submission.message}</p>}
                <button type="submit" disabled={submission.status === "sending"} className="group mt-7 flex w-full items-center justify-center gap-3 bg-[var(--error)] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[var(--error)]/20 disabled:cursor-wait disabled:opacity-65">
                  {submission.status === "sending" ? content.sending : content.submit}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormGroup({ title, children }: { title: string; children: ReactNode }) {
  return <fieldset className="border-0 p-0 [&+&]:mt-9"><legend className="mb-5 border-b border-[var(--outline-variant)] pb-3 font-serif text-xl font-semibold text-[var(--primary)]">{title}</legend>{children}</fieldset>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.09em] text-[var(--on-surface-variant)]">{label}</span>
      <span className="mt-2 block [&_input]:w-full [&_input]:border [&_input]:border-[var(--outline-variant)] [&_input]:bg-white [&_input]:px-3 [&_input]:py-3 [&_input]:text-[var(--primary)] [&_input]:outline-none [&_input:focus]:border-[var(--secondary)] [&_select]:w-full [&_select]:border [&_select]:border-[var(--outline-variant)] [&_select]:bg-white [&_select]:px-3 [&_select]:py-3 [&_select]:text-[var(--primary)] [&_select]:outline-none [&_select:focus]:border-[var(--secondary)] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border [&_textarea]:border-[var(--outline-variant)] [&_textarea]:bg-white [&_textarea]:px-3 [&_textarea]:py-3 [&_textarea]:text-[var(--primary)] [&_textarea]:outline-none [&_textarea:focus]:border-[var(--secondary)]">{children}</span>
    </label>
  );
}
