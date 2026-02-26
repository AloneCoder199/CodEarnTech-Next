import BookCallPage from "@/components/sections/bookCall/bookCallmain";
import type { Metadata } from "next";

// ✅ BOOK CALL PAGE SEO - High Conversion Intent
export const metadata: Metadata = {
  title: "Book Free Consultation | Schedule a Call with CodEarn Tech",
  description: "Schedule a free 30-minute consultation with our experts. Discuss your SaaS idea, web application requirements, or training needs. No obligation, pure value!",
  keywords: [
    "book consultation",
    "schedule call software company",
    "free consultation Pakistan",
    "SaaS consultation",
    "web development consultation",
    "software project discussion",
    "hire developers consultation",
    "free strategy call",
    "project planning session",
    "tech consultation Pakistan"
  ],
  openGraph: {
    title: "Book Free Consultation | CodEarn Tech",
    description: "Ready to start your project? Book a free 30-minute call with our experts. Let's discuss your ideas!",
    url: "https://www.codearntech.cloud/book-call",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/book-call",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookCall() {
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
                name: "Book a Call",
                item: "https://www.codearntech.cloud/book-call",
              },
            ],
          }),
        }}
      />
      
      <BookCallPage />
    </>
  );
}