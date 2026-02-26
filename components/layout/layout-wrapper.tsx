"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Is array mein wo saaray paths likhein jahan Navbar/Footer nahi chahiye
  const hideLayout = pathname.startsWith("/student/dashboard");

  return (
    <div className="relative min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
