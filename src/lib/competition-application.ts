export const qualificationOptions = [
  { value: "bepc-gce-ol", fr: "BEPC / GCE O/L", en: "BEPC / GCE O/L" },
  { value: "cap", fr: "CAP", en: "CAP" },
  { value: "probatoire", fr: "Probatoire", en: "Probatoire" },
  { value: "baccalaureat-gce-al", fr: "Baccalauréat / GCE A/L", en: "Baccalaureate / GCE A/L" },
] as const;

export const programmeOptions = [
  { value: "technicien-audiovisuel", qualifications: ["bepc-gce-ol", "cap"], fr: "Technicien audiovisuel (image, son et montage)", en: "Audiovisual technician (image, sound and editing)" },
  { value: "infographiste", qualifications: ["bepc-gce-ol", "cap"], fr: "Infographiste", en: "Graphic designer" },
  { value: "regie-maintenance", qualifications: ["cap", "probatoire"], fr: "Technicien de régie et maintenance audiovisuelle", en: "Audiovisual control-room and maintenance technician" },
  { value: "journaliste-reporter-images", qualifications: ["baccalaureat-gce-al"], fr: "Journaliste reporter d'images", en: "Video journalist" },
  { value: "operateur-prise-vues", qualifications: ["baccalaureat-gce-al"], fr: "Opérateur de prise de vues", en: "Camera operator" },
  { value: "operateur-prise-son", qualifications: ["baccalaureat-gce-al"], fr: "Opérateur de prise de son", en: "Sound operator" },
  { value: "monteur-video", qualifications: ["baccalaureat-gce-al"], fr: "Monteur vidéo", en: "Video editor" },
  { value: "realisateur-tv", qualifications: ["baccalaureat-gce-al"], fr: "Réalisateur TV", en: "Television director" },
  { value: "motion-graphic-designer", qualifications: ["baccalaureat-gce-al"], fr: "Motion and graphic designer", en: "Motion and graphic designer" },
  { value: "marketing-digital", qualifications: ["baccalaureat-gce-al"], fr: "Marketing digital", en: "Digital marketing" },
  { value: "technicien-equipements", qualifications: ["baccalaureat-gce-al"], fr: "Technicien d'exploitation des équipements audiovisuels", en: "Audiovisual equipment operations technician" },
  { value: "technicien-informatique-reseaux", qualifications: ["baccalaureat-gce-al"], fr: "Technicien informatique et réseaux", en: "IT and network technician" },
  { value: "animateur-2d", qualifications: ["baccalaureat-gce-al"], fr: "Animateur 2D", en: "2D animator" },
] as const;

export const candidateTypeOptions = [
  { value: "externe", fr: "Candidat externe", en: "External applicant" },
  { value: "personnel-crtv", fr: "Personnel CRTV", en: "CRTV staff member" },
] as const;

export type CompetitionApplication = {
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  city: string;
  email: string;
  phone: string;
  candidateType: string;
  qualification: string;
  firstChoice: string;
  secondChoice: string;
  message: string;
  consent: boolean;
  website: string;
};

export function optionLabel(options: ReadonlyArray<{ value: string; fr: string }>, value: string) {
  return options.find((option) => option.value === value)?.fr ?? value;
}

export function isProgrammeEligible(programme: string, qualification: string) {
  return programmeOptions.some((option) => option.value === programme && (option.qualifications as readonly string[]).includes(qualification));
}
