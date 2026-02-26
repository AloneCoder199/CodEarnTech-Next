import ContactPage from "@/components/sections/contect/contactmain";
import type { Metadata } from "next";

// ✅ CONTACT PAGE SEO
export const metadata: Metadata = {
  title: "Contact Us | Get Free Consultation - CodEarn Tech",
  description: "Contact CodEarn Tech for SaaS development, web applications, or training inquiries. Visit our Samundri office or reach us online. Free consultation available!",
  keywords: [
    "contact CodEarn Tech",
    "software company Samundri contact",
    "hire developers Pakistan",
    "web development consultation",
    "programming training inquiry",
    "SaaS development quote",
    "software services Pakistan",
    "tech company contact",
    "free consultation software",
    "Samundri software office"
  ],
  openGraph: {
    title: "Contact CodEarn Tech | Let's Build Something Amazing",
    description: "Ready to start your project? Contact us for free consultation. Visit our Samundri office or connect online.",
    url: "https://www.codearntech.cloud/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ✅ Contact Page Schema
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CodEarn Tech",
  description: "Contact information for CodEarn Tech software development company",
  url: "https://www.codearntech.cloud/contact",
  mainEntity: {
    "@type": "Organization",
    name: "CodEarn Tech",
    url: "https://www.codearntech.cloud",
    logo: "https://www.codearntech.cloud/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-321-9515138", // Update with your number
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
      areaServed: "PK",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Bazaar, Near City Center",
      addressLocality: "Samundri",
      addressRegion: "Punjab",
      postalCode: "37300",
      addressCountry: "PK",
    },
  },
};

export default function Contact() {
  return (
    <div>
      {/* ✅ Contact Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      {/* ✅ Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.codearntech.cloud",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: "https://www.codearntech.cloud/contact",
              },
            ],
          }),
        }}
      />
      
      <ContactPage />
    </div>
  );
}