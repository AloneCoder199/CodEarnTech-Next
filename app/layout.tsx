import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; 
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo-schemas";
import SecurityGuard from "@/components/SecurityGuard";

// Font Optimization
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
  title: {
    default: "CodEarn Tech | SaaS Development & Software Solutions in Pakistan",
    template: "%s | CodEarn Tech",
  },
  description: "Leading software company in Samundri, Pakistan. We build scalable SaaS products, custom web applications, and provide practical training with guaranteed internships. 4+ years experience, 3-month project support included.",
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
  authors: [{ name: "CodEarn Tech", url: "https://www.codearntech.cloud" }],
  creator: "CodEarn Tech",
  publisher: "CodEarn Tech",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.codearntech.cloud",
    siteName: "CodEarn Tech",
    title: "CodEarn Tech | SaaS Development & Software Solutions",
    description: "Transform your ideas into scalable SaaS products. 4+ years experience, practical training with internships, and 3-month project support.",
    images: [
      {
        url: "/og-image.webp", 
        width: 1200,
        height: 630,
        alt: "CodEarn Tech - Software Development Company",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodEarn Tech | SaaS Development & Software Solutions",
    description: "Transform your ideas into scalable SaaS products. Practical training with guaranteed internships.",
    images: ["/og-image.webp"],
    creator: "@codearntech",
  },
  verification: {
    google: "_GZUOBwhCQ8T5t1ME4Xg46wwwo3o_WznYgcmBKM2PbY",
  },
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
    ],
    shortcut: ["/logo.webp"],
    apple: [
      { url: "/logo.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
  manifest: "/manifest.json",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([organizationSchema, websiteSchema, localBusinessSchema]) 
          }}
        />
        
        {/* SNAPCHAT PIXEL - NEXT.JS OPTIMIZED */}
        <Script id="snapchat-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u)})(window,document,
            'https://sc-static.net/scevent.min.js');

            snaptr('init', 'aeb326d3-6533-4cac-bc69-ba0c7f2f3fbf', {
              'user_email': '__INSERT_USER_EMAIL__'
            });

            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <SecurityGuard/>
              <LayoutWrapper>{children}</LayoutWrapper>
               <Toaster position="top-center" richColors closeButton />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
