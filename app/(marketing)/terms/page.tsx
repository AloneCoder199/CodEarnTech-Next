import TermsOfService from "@/components/sections/terms/terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CodEarn Tech User Agreement",
  description: "Read CodEarn Tech's Terms of Service. Understand the rules, regulations, and guidelines for using our software development services and training programs.",
  keywords: [
    "terms of service",
    "user agreement",
    "service terms",
    "CodEarn Tech terms",
    "software service agreement",
    "training terms",
    "user guidelines",
    "service conditions",
    "legal terms",
    "website terms"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/terms",
  },
};

export default function Terms() {
  return (
    <>
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
                name: "Terms of Service",
                item: "https://www.codearntech.cloud/terms",
              },
            ],
          }),
        }}
      />
      
      <TermsOfService />
    </>
  );
}