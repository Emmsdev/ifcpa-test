import type { SiteCopy } from "@/components/site-types";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export function SeoStructuredData({ content }: { content: SiteCopy }) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;
  const courses = content.courses.groups.flatMap((group) =>
    group.courses.map((course) => ({ ...course, group: group.label })),
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": organizationId,
        name: "Institut de Formation et de Conservation du Patrimoine Audiovisuel de la CRTV",
        alternateName: [SITE_NAME, "IFCPA", "IFCPA/CRTV"],
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/ifcpa-logo.png"),
          width: 2024,
          height: 1442,
        },
        image: absoluteUrl("/ifcpa-campus.jpg"),
        foundingDate: "1983",
        email: "admissions@ifcpa-crtv.com",
        telephone: "+237656700852",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ekounou",
          addressLocality: "Yaoundé",
          addressRegion: "Centre",
          addressCountry: "CM",
        },
        areaServed: [
          { "@type": "Country", name: "Cameroun" },
          { "@type": "Place", name: "Afrique centrale" },
        ],
        knowsLanguage: ["fr", "en"],
        sameAs: ["https://www.facebook.com/ifcpacrtv/", "https://crtv.cm"],
        parentOrganization: {
          "@type": "Organization",
          name: "Cameroon Radio Television",
          url: "https://crtv.cm",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "Institut de Formation et de Conservation du Patrimoine Audiovisuel",
        description: SITE_DESCRIPTION,
        inLanguage: "fr-CM",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
        },
        inLanguage: "fr-CM",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/#contact`,
        inLanguage: "fr-CM",
        mainEntity: content.contact.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#formations`,
        name: "Formations audiovisuelles de l'IFCPA/CRTV",
        description: content.courses.lead,
        numberOfItems: courses.length,
        itemListElement: courses.map((course, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/#formation-${course.code}`,
          item: {
            "@type": "Course",
            "@id": `${SITE_URL}/#formation-${course.code}`,
            name: course.title,
            description: course.outcome,
            educationalLevel: course.group,
            provider: { "@id": organizationId },
            url: `${SITE_URL}/#formations`,
            inLanguage: "fr",
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
