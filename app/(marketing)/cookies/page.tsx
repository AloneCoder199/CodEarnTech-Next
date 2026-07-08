import CookiePolicy from "@/components/sections/cookies/cookie";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | How We Use Cookies | CodEarn",
  description: "Learn about how CodEarn uses cookies to enhance your browsing experience. Understand what cookies we use and how you can manage your preferences.",
  keywords: [
    "cookie policy",
    "cookies usage",
    "website cookies",
    "cookie consent",
    "tracking cookies",
    "CodEarn cookies",
    "browser cookies",
    "cookie settings",
    "privacy cookies",
    "cookie management"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/cookies",
  },
};

export default function Cookies() {
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
                name: "Cookie Policy",
                item: "https://www.codearntech.cloud/cookies",
              },
            ],
          }),
        }}
      />
      
      <CookiePolicy />
    </>
  );
}