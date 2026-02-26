import { Hero } from "@/components/sections/home/hero"
import { Services } from "@/components/sections/home/services"
import { Features } from "@/components/sections/home/features"
import { Training } from "@/components/sections/home/training"
import { CTA } from "@/components/sections/home/cta"
import type { Metadata } from "next"
import SubscribeSection from "@/components/layout/subscription"
// ✅ PAGE-SPECIFIC METADATA
export const metadata: Metadata = {
  title: "CodEarn Tech | SaaS Development & Software Solutions in Pakistan",
  description: "Leading software company in Samundri, Pakistan specializing in SaaS development, custom web apps, and practical training with guaranteed internships. 4+ years experience, 3-month project support.",
  keywords: [
    "SaaS development Pakistan",
    "software company Samundri",
    "web development services",
    "programming training internship",
    "custom software solutions",
    "backend development courses"
  ],
  openGraph: {
    title: "CodEarn Tech | Transform Ideas Into Digital Reality",
    description: "SaaS development, custom web apps, and practical training with guaranteed internships. Start your journey today!",
    url: "https://www.codearntech.cloud",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud",
  },
}

export default function Home() {
  return (
    <>
      {/* ✅ Add structured data for homepage if needed */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CodEarn Tech - Home",
            description: "Leading software development company in Pakistan",
            url: "https://www.codearntech.cloud",
            mainEntity: {
              "@type": "Organization",
              name: "CodEarn Tech",
            },
          }),
        }}
      />
      <Hero />
      <Services />
      <Features />
      <Training />
      <CTA />
      <SubscribeSection/>
    </>
  )
}