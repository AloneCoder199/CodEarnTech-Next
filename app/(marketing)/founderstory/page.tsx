import HeroSection from "@/components/sections/founder/founderHero";
import { FounderMessage } from "@/components/sections/founder/FounderMessage";
import { IntroductionSection } from "@/components/sections/founder/Introduction";
import { ProblemSection } from "@/components/sections/founder/TheProblem";
import type { Metadata } from "next";

// ✅ FOUNDER STORY PAGE SEO - Personal Branding
export const metadata: Metadata = {
  title: "Founder Story | The Journey Behind CodEarn Tech",
  description: "Discover the inspiring journey of CodEarn Tech's founder. From humble beginnings in Samundri to building a leading software company. Learn about our mission and vision.",
  keywords: [
    "founder story",
    "CodEarn Tech founder",
    "software company journey",
    "tech startup Pakistan",
    "entrepreneur story",
    "Samundri success story",
    "software company origin",
    "founder vision",
    "company history",
    "inspiring tech story"
  ],
  openGraph: {
    title: "The Story Behind CodEarn Tech | From Vision to Reality",
    description: "Discover how a small idea from Samundri grew into a leading software company. The journey, challenges, and vision behind CodEarn Tech.",
    url: "https://www.codearntech.cloud/founderstory",
    type: "article",
    images: [
      {
        url: "/founder-og.png",
        width: 1200,
        height: 630,
        alt: "CodEarn Tech Founder Story",
      },
    ],
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/founderstory",
  },
};

// ✅ Founder Profile Schema
const founderSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Muhammad Bilal", // Update with actual name
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: "CodEarn Tech",
      url: "https://www.codearntech.cloud",
    },
    description: "Founder of CodEarn Tech, leading software development and training initiatives in Pakistan",
    url: "https://www.codearntech.cloud/founderstory",
    sameAs: [
      // Social profiles add karein
      "https://linkedin.com/in/founder-profile",
      "https://twitter.com/founder-handle",
    ],
  },
};

export default function FounderStoryPage() {
  return (
    <>
      {/* ✅ Founder Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
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
                name: "Founder Story",
                item: "https://www.codearntech.cloud/founderstory",
              },
            ],
          }),
        }}
      />
      
      <HeroSection />
      <IntroductionSection />
      <ProblemSection />
      <FounderMessage />
    </>
  );
}