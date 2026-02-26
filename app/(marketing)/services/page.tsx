import { WhyChooseUsSection } from "@/components/sections/About/WhyChooseUs";
import { ServicesSection } from "@/components/sections/Services/OutcomeBasedServices";
import { ProblemAwarenessSection } from "@/components/sections/Services/problemAwareness";
import { ProcessSection } from "@/components/sections/Services/ProcessSection";
import { ServicesHeroSection } from "@/components/sections/Services/ServicesHero";
import { PricingSection } from "@/components/sections/Services/OptimizedPricing";
import { FinalCTASection } from "@/components/sections/Services/ServisesCta";
import type { Metadata } from "next";
import SubscribeSection from "@/components/layout/subscription";

// ✅ SERVICES PAGE SEO - High Commercial Intent Keywords
export const metadata: Metadata = {
  title: "Our Services | SaaS Development, Web Apps & Software Solutions",
  description: "Professional SaaS development, custom web applications, and system software services in Pakistan. End-to-end solutions with 3-month free support. Get free consultation today!",
  keywords: [
    "SaaS development services Pakistan",
    "custom web application development",
    "software development company",
    "system software solutions",
    "web app development Samundri",
    "hire software developers Pakistan",
    "SaaS product development",
    "business automation software",
    "enterprise software solutions",
    "affordable software development"
  ],
  openGraph: {
    title: "Professional SaaS & Web Development Services | CodEarn Tech",
    description: "Transform your business with custom SaaS products and web applications. 4+ years experience, 3-month support included.",
    url: "https://www.codearntech.cloud/services",
    type: "website",
    images: [
      {
        url: "/services-og.png", // Create karein ya /og-image.jpg use karein
        width: 1200,
        height: 630,
        alt: "CodEarn Tech Services - SaaS Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Development Services | CodEarn Tech",
    description: "Custom software solutions for your business growth",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ✅ Service Schema Data
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: {
    "@type": "Organization",
    name: "CodEarn Tech",
    url: "https://www.codearntech.cloud",
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS Product Development",
          description: "End-to-end SaaS platform development with scalable cloud architecture",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Application Development",
          description: "Tailored web applications for business automation and growth",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "System Software Solutions",
          description: "Enterprise-grade system software for operational efficiency",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description: "Professional business websites and e-commerce solutions",
        },
      },
    ],
  },
  termsOfService: "https://www.codearntech.cloud/terms",
  priceRange: "$$",
};

export default function Services() {
  return (
    <div>
      {/* ✅ Services Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      
      {/* ✅ Breadcrumbs Schema */}
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
                name: "Services",
                item: "https://www.codearntech.cloud/services",
              },
            ],
          }),
        }}
      />
      
      <ServicesHeroSection />
      <ProblemAwarenessSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <PricingSection />
      <FinalCTASection />
      <SubscribeSection/>
    </div>
  );
}