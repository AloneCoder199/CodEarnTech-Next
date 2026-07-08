import { WhatWeDo } from "@/components/sections/About/WhatWeDo"
import { AboutHero } from "../../../components/sections/About/abouthero"
import { WhoWeAre } from "../../../components/sections/About/WhoWeAre"
import { LearningApproach } from "@/components/sections/About/LearningApproach"
import { WhyChooseUsSection } from "@/components/sections/About/WhyChooseUs"
import { MissionVision } from "@/components/sections/About/MissionVision"
import { FinalCTA } from "@/components/sections/About/aboutCta"
import type { Metadata } from "next"
import SubscribeSection from "@/components/layout/subscription"

// ✅ ABOUT PAGE SEO
export const metadata: Metadata = {
  title: "About Us | CodEarn - Our Story & Mission",
  description: "Learn about CodEarn's journey. 4+ years of excellence in SaaS development, software solutions, and practical training. Discover our unique approach with guaranteed internships and 3-month project support.",
  keywords: [
    "about CodEarn",
    "software company Pakistan",
    "SaaS development team",
    "programming training institute",
    "internship guarantee",
    "Samundri tech company"
  ],
  openGraph: {
    title: "About CodEarn | Building Digital Futures Since 2021",
    description: "Discover our mission to transform ideas into reality. 4+ years, 5+ successful projects, and 100+ trained students.",
    url: "https://www.codearntech.cloud/about",
    type: "article",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/about",
  },
}

export default function AboutPage() {
  return (
    <div>
      {/* ✅ About Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About CodEarn",
            description: "Learn about our software development company and training programs",
            url: "https://www.codearntech.cloud/about",
            mainEntity: {
              "@type": "Organization",
              name: "CodEarn",
              foundingDate: "2021",
              description: "Software development and training company",
            },
          }),
        }}
      />
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <LearningApproach />
      <WhyChooseUsSection />
      <MissionVision />
      <SubscribeSection/>
      <FinalCTA />
    </div>
  )
}