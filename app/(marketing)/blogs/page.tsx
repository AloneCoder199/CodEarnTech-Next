import BlogPage from "@/components/sections/blogs/blogmain";
import type { Metadata } from "next";

// ✅ BLOGS PAGE SEO
export const metadata: Metadata = {
  title: "Blog | Software Development Insights & Tech Tips",
  description: "Read expert articles on SaaS development, web technologies, programming tips, and industry insights. Learn from 4+ years of software development experience.",
  keywords: [
    "software development blog",
    "programming tips",
    "SaaS development guide",
    "web development tutorials",
    "tech blog Pakistan",
    "coding best practices",
    "software engineering insights",
    "backend development tips",
    "programming career advice",
    "technology trends 2024"
  ],
  openGraph: {
    title: "CodEarn Blog | Software Development Insights",
    description: "Expert insights on SaaS development, programming, and technology trends. Learn from industry professionals.",
    url: "https://www.codearntech.cloud/blogs",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.cloud/blogs",
  },
};

// ✅ Blog Schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "CodEarn Blog",
  description: "Software development insights, programming tips, and technology articles",
  url: "https://www.codearntech.cloud/blogs",
  publisher: {
    "@type": "Organization",
    name: "CodEarn",
    logo: {
      "@type": "ImageObject",
      url: "https://www.codearntech.cloud/logo.png",
    },
  },
};

export default function Blogs() {
  return (
    <div>
      {/* ✅ Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
                name: "Blog",
                item: "https://www.codearntech.cloud/blogs",
              },
            ],
          }),
        }}
      />
      
      <BlogPage />
    </div>
  );
}