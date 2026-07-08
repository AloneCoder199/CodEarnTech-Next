import AcademyComparison from "@/components/sections/academy/academy-comparison";
import AcademyCourses from "@/components/sections/academy/academy-courses";
import AcademyHero from "@/components/sections/academy/academy-hero";
import AcademyRoadmap from "@/components/sections/academy/academy-roadmap";
import CoursesSection from "@/components/sections/academy/CoursesSection";
import FAQSection from "@/components/sections/academy/FAQSection";
import FinalCTA from "@/components/sections/academy/FinalCTA";
// import {CourseDetailModal} from "@/components/sections/traning/traningmain";
import type { Metadata } from "next";

// ✅ TRAINING PAGE SEO - Education Keywords
export const metadata: Metadata = {
  title: "Programming Courses & Internship Training | CodEarn",
  description: "Learn Full Stack Development, Backend & Data Modeling with guaranteed internship. Practical training in Samundri, Pakistan. Job placement assistance included. Enroll now!",
  keywords: [
    "programming courses Pakistan",
    "web development training",
    "software engineering internship",
    "learn coding Samundri",
    "backend development course",
    "data modeling training",
    "full stack developer course",
    "programming training with job guarantee",
    "software development internship",
    "coding bootcamp Pakistan",
    "practical programming training",
    "computer courses with internship"
  ],
  openGraph: {
    title: "Learn Programming with Guaranteed Internship | CodEarn",
    description: "Master Full Stack Development, Backend & Data Modeling. 4+ years experienced mentors, real projects, and job placement support.",
    url: "https://www.codearntech.cloud/training",
    type: "website",
    images: [
      {
        url: "/training-og.png",
        width: 1200,
        height: 630,
        alt: "CodEarn Training - Programming Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programming Training with Internship | CodEarn",
    description: "Learn to code and get guaranteed internship. Start your tech career today!",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/training",
  },
};

// ✅ Course Schema Data
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Full Stack Development Training",
  description: "Comprehensive programming training covering frontend, backend, data modeling, and system architecture with guaranteed internship",
  provider: {
    "@type": "Organization",
    name: "CodEarn",
    sameAs: "https://www.codearntech.cloud",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: "PT20H",
      inLanguage: ["en", "ur"],
      location: {
        "@type": "Place",
        name: "CodEarn Training Center",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Samundri",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
      },
    },
  ],
  teaches: [
    "Full Stack Web Development",
    "Backend Development (Node.js)",
    "Database Design & Data Modeling",
    "System Architecture",
    "Version Control (Git/GitHub)",
    "Deployment & DevOps Basics",
  ],
  educationalLevel: "Beginner to Advanced",
  timeRequired: "P3M", // 3 months
  occupationalCredentialAwarded: {
    "@type": "DefinedTerm",
    name: "Internship Certificate",
    description: "3-month project completion certificate with job placement assistance",
  },
  offers: {
    "@type": "Offer",
    category: "Paid",
    price: "Contact for pricing",
    priceCurrency: "PKR",
  },
};

export default function Training() {
  return (
    <div>
      {/* ✅ Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
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
                name: "Training",
                item: "https://www.codearntech.cloud/training",
              },
            ],
          }),
        }}
      />
      
      <AcademyHero/>
      <AcademyComparison/>
      <CoursesSection/>
      <AcademyRoadmap/>
      <FAQSection/>
      {/* <AcademyCourses/> */}
      <FinalCTA/>
    </div>
  );
}