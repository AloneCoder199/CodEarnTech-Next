
import type { Metadata } from "next";
import PrivacyPolicyContent from '@/components/sections/privacyPolicey/PrivacyPolicy'; 
// Note: Component import galat lag raha hai - PrivacyPolicy mein PricingSection?
// Aapko sahi component import karna hoga
// import { PrivacyPolicySection } from "@/components/sections/privacy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | How We Protect Your Data | CodEarn",
  description: "Read CodEarn's Privacy Policy to understand how we collect, use, and protect your personal information. Your data security is our priority.",
  keywords: [
    "privacy policy",
    "data protection",
    "user privacy",
    "CodEarn privacy",
    "personal data security",
    "GDPR compliance",
    "privacy practices",
    "data collection policy",
    "user data protection",
    "software company privacy"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/privacy-policy",
  },
};

export default function PrivacyPolicy() {
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
                name: "Privacy Policy",
                item: "https://www.codearntech.cloud/privacy-policy",
              },
            ],
          }),
        }}
      />
      
      {/* TODO: Replace with actual Privacy Policy component */}
      <PrivacyPolicyContent/>
        
    </>
  );
}