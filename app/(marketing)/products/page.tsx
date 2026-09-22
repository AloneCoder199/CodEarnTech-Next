import  ProductsHero  from "@/components/sections/products/ProductHero";
import type { Metadata } from "next";
import LiveProduct from "@/components/sections/products/live-product";
import Problem from "@/components/sections/products/problem";
import ProductFlow from "@/components/sections/products/product-flow";
import HowItWorks from "@/components/sections/products/how-it-works";
import Capabilities from "@/components/sections/products/capabilities";
import ProductExperience from "@/components/sections/products/product-experience";
import WhoItsFor from "@/components/sections/products/who-its-for";
import WhyWeBuilt from "@/components/sections/products/why-we-built";
import ProductStatus from "@/components/sections/products/product-status";
import WhatsNext from "@/components/sections/products/whats-next";
import FinalCTA from "@/components/sections/products/final-cta";

// ✅ PRODUCTS PAGE SEO
export const metadata: Metadata = {
  title: "Our SaaS Products | Innovative Software Solutions",
  description: "Explore CodEarn's SaaS products and software solutions. Built with cutting-edge technology to solve real business problems. Discover our product roadmap and upcoming features.",
  keywords: [
    "SaaS products Pakistan",
    "software products",
    "business automation tools",
    "cloud based solutions",
    "enterprise software products",
    "SaaS platform",
    "software innovation",
    "digital products",
    "tech products Pakistan",
    "software solutions"
  ],
  openGraph: {
    title: "CodEarn Products | Innovative SaaS Solutions",
    description: "Discover our portfolio of SaaS products built to transform businesses. See our roadmap and upcoming innovations.",
    url: "https://www.codearntech.cloud/products",
    type: "website",
    images: [
      {
        url: "/products-og.png",
        width: 1200,
        height: 630,
        alt: "CodEarn SaaS Products",
      },
    ],
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/products",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ✅ Software Application Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodEarn SaaS Products",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "14 Days Free Trial", // Free trial ya contact pricing
    priceCurrency: "PKR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "50",
  },
  description: "Suite of SaaS products for business automation and digital transformation",
  url: "https://www.codearntech.cloud/products",
  author: {
    "@type": "Organization",
    name: "CodEarn",
  },
};

export default function ProductsPage() {
  return (
    <>
      {/* ✅ Software Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
                name: "Products",
                item: "https://www.codearntech.cloud/products",
              },
            ],
          }),
        }}
      />
      
      <ProductsHero />
      <LiveProduct/>
      <Problem/>
      <ProductFlow/>
      <HowItWorks/>
      <Capabilities/>
      <ProductExperience/>
      <WhoItsFor/>
      <WhyWeBuilt/>
      <ProductStatus/>
      <WhatsNext/>
      <FinalCTA/>
    </>
  );
}