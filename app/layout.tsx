import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo-schemas";
import SecurityGuard from "@/components/SecurityGuard";
// 1. Font Optimization: display: 'swap' zaroori hai layout shift rokne ke liye
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};


export const metadata: Metadata = {
  metadataBase: new URL("https://www.codearntech.cloud"),
  
  // Basic SEO
  title: {
    default: "CodEarn Tech | SaaS Development & Software Solutions in Pakistan",
    template: "%s | CodEarn Tech",
  },
  description: "Leading software company in Samundri, Pakistan. We build scalable SaaS products, custom web applications, and provide practical training with guaranteed internships. 4+ years experience, 3-month project support included.",
  
  // Keywords (Search engines ignore but some use)
  keywords: [
    "SaaS development Pakistan",
    "software company Samundri",
    "web application development",
    "custom software solutions",
    "programming training Pakistan",
    "internship guaranteed courses",
    "CodEarn Tech",
    "backend development",
    "data modeling courses",
    "software training institute"
  ],
  
  // Authors & Creators
  authors: [{ name: "CodEarn Tech", url: "https://www.codearntech.cloud" }],
  creator: "CodEarn Tech",
  publisher: "CodEarn Tech",
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical & Alternates
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "ur-PK": "/ur-PK",
    },
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ur_PK",
    url: "https://www.codearntech.cloud",
    siteName: "CodEarn Tech",
    title: "CodEarn Tech | SaaS Development & Software Solutions",
    description: "Transform your ideas into scalable SaaS products. 4+ years experience, practical training with internships, and 3-month project support.",
    images: [
      {
        url: "/og-image.webp", // Aapko yeh image banana hai (1200x630)
        width: 1200,
        height: 630,
        alt: "CodEarn Tech - Software Development Company",
        type: "image/jpeg",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "CodEarn Tech | SaaS Development & Software Solutions",
    description: "Transform your ideas into scalable SaaS products. Practical training with guaranteed internships.",
    images: ["/twitter-image.jpg"], // Same as OG image
    creator: "@codearntech", // Agar Twitter handle hai toh
  },
  
  // Verification (Jab Google Search Console setup karein)
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Baad mein add karein
    yandex: "YOUR_YANDEX_CODE",
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0f172a",
      },
    ],
  },
  
  // Manifest
  manifest: "/site.webmanifest",
  
  // Archives & Categories
  archives: ["https://www.codearntech.cloud/blogs"],
  category: "technology",
  classification: "Software Development, Education, Technology",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 2. SEO Schemas: Inhe ek hi script tag mein merge karein taake parsing fast ho */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([organizationSchema, websiteSchema, localBusinessSchema]) 
          }}
        />
        
        {/* 3. Performance: Preconnects are good, but Next/Font handles Google Fonts better automatically */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* 4. Optimization: Check karein agar QueryProvider ya AuthProvider ko 'client component' mein move kar sakein */}
          <AuthProvider>
            <QueryProvider>
              <SecurityGuard/>
              <LayoutWrapper>{children}</LayoutWrapper>
              {/* 5. Toaster: Isay 'lazy' load hona chahiye, ye TBT barhata hai */}
               <Toaster position="top-center" richColors closeButton />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}



