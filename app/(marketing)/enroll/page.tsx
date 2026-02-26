import EnrollPage from "@/components/sections/enroll/enrollpage";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageLoader from "@/components/ui/page-loader"
// ✅ ENROLL PAGE SEO - High Conversion for Students
export const metadata: Metadata = {
  title: "Enroll Now | Programming Courses with Internship Guarantee",
  description: "Enroll in CodEarn Tech's programming courses. Learn Full Stack Development, Backend & Data Modeling. Guaranteed internship + job placement support. Limited seats available!",
  keywords: [
    "enroll programming course",
    "join coding bootcamp",
    "programming course registration",
    "software training enrollment",
    "web development course apply",
    "coding course admission",
    "programming internship program",
    "learn coding Pakistan",
    "software course enrollment",
    "tech training registration"
  ],
  openGraph: {
    title: "Enroll Now | Start Your Coding Journey with Internship",
    description: "Limited seats available! Join our practical programming courses with guaranteed internship. Transform your career today.",
    url: "https://www.codearntech.cloud/enroll",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/enroll",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Enroll() {
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
                name: "Training",
                item: "https://www.codearntech.cloud/training",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Enroll",
                item: "https://www.codearntech.cloud/enroll",
              },
            ],
          }),
        }}
      />
      
      
       <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
        <EnrollPage />
          </Suspense>
      
    </>
  );
}