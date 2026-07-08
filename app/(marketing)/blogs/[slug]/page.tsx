import BlogPostPage from "@/components/sections/blogs/blogID";
import { getPostBySlug } from "@/lib/blogData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ✅ Updated Type for Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ DYNAMIC METADATA GENERATION (Fixed with await)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // 👈 Next.js 15 Fix
  
  // TODO: Fetch actual blog data
  // const blog = await getBlogPost(slug);
  
  const blogTitle = "Building Scalable SaaS Architecture in 2024: A Complete Guide";
  const blogDescription = "Learn the modern patterns and best practices for building SaaS applications.";
  const blogImage = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200";
  
  return {
    title: `${blogTitle} | CodEarn Blog`,
    description: blogDescription,
    keywords: ["software development", "programming", "tech article", "CodEarn"],
    openGraph: {
      title: blogTitle,
      description: blogDescription,
      url: `https://www.codearntech.cloud/blogs/${slug}`,
      type: "article",
      images: [{ url: blogImage, width: 1200, height: 630, alt: blogTitle }],
      publishedTime: new Date().toISOString(),
      authors: ["CodEarn"],
    },
    twitter: {
      card: "summary_large_image",
      title: blogTitle,
      description: blogDescription,
      images: [blogImage],
    },
    alternates: {
      canonical: `https://www.codearntech.cloud/blogs/${slug}`,
    },
  };
}

// ✅ Static Params Fetching
export async function generateStaticParams() {
  // return blogs.map((blog) => ({ slug: blog.slug }));
  return [];
}

// ✅ MAIN PAGE COMPONENT (Fixed with await)
export default async function BlogPost({ params }: Props) {
  const { slug } = await params; // 👈 Next.js 15 Fix

  // Check if post exists
  if (!getPostBySlug(slug)) {
    notFound();
  }

  // Article Schema (Dynamic)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Blog Post Title",
    description: "Blog description",
    image: "https://www.codearntech.cloud/blog-image.jpg",
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "CodEarn",
      url: "https://www.codearntech.cloud",
    },
    publisher: {
      "@type": "Organization",
      name: "CodEarn",
      logo: {
        "@type": "ImageObject",
        url: "https://www.codearntech.cloud/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.codearntech.cloud/blogs/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.codearntech.cloud" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.codearntech.cloud/blogs" },
      { "@type": "ListItem", position: 3, name: "Article", item: `https://www.codearntech.cloud/blogs/${slug}` },
    ],
  };

  return (
    <div>
      {/* ✅ Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* ✅ Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Pass slug as prop if your BlogPostPage needs it */}
      <BlogPostPage />
    </div>
  );
}