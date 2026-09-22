import Beliefs from "@/components/sections/founder/beliefs";
import Building from "@/components/sections/founder/building";
import FindOnline from "@/components/sections/founder/find-online";
import FounderLetter from "@/components/sections/founder/founder-letter";
import HeroSection from "@/components/sections/founder/founderHero";
import HumanStory from "@/components/sections/founder/human-story";
import Journey from "@/components/sections/founder/journey";
import KeepsMoving from "@/components/sections/founder/keeps-moving";
import LetsBuild from "@/components/sections/founder/lets-build";
import Shipped from "@/components/sections/founder/shipped";
import WhatsNext from "@/components/sections/founder/whats-next";
import WhyCodEarn from "@/components/sections/founder/why-codearn";
import type { Metadata } from "next";

// ✅ FOUNDER STORY PAGE SEO - Personal Branding
export const metadata: Metadata = {
  title: "Founder Story | The Journey Behind CodEarn",
  description: "Discover the inspiring journey of CodEarn's founder. From humble beginnings in Samundri to building a leading software company. Learn about our mission and vision.",
  keywords: [
    "founder story",
    "CodEarn founder",
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
    title: "The Story Behind CodEarn | From Vision to Reality",
    description: "Discover how a small idea from Samundri grew into a leading software company. The journey, challenges, and vision behind CodEarn.",
    url: "https://www.codearntech.cloud/founder",
    type: "article",
    images: [
      {
        url: "/founder-og.png",
        width: 1200,
        height: 630,
        alt: "CodEarn Founder Story",
      },
    ],
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/founder",
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
      name: "CodEarn",
      url: "https://www.codearntech.cloud",
    },
    description: "Founder of CodEarn, leading software development and training initiatives in Pakistan",
    url: "https://www.codearntech.cloud/founder",
    sameAs: [
      // Social profiles add karein
      "https://linkedin.com/in/founder-profile",
      "https://twitter.com/founder-handle",
    ],
  },
};

export default function founderPage() {
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
                item: "https://www.codearntech.cloud/founder",
              },
            ],
          }),
        }}
      />
      
      <HeroSection />
      <HumanStory/>
      <Journey/>
      <WhyCodEarn/>
      <Beliefs/>
      <Building/>
      <Shipped/>
      <FindOnline/>
      <FounderLetter/>
      <KeepsMoving/>
      <WhatsNext/>
      <LetsBuild/>
    </>
  );
}