"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  Home, 
  Layers, 
  Briefcase, 
  Box, 
  GraduationCap, 
  Info, 
  PhoneCall, 
  MoreHorizontal, 
  X, 
  CalendarCheck 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

/* -------------------- NAV LINKS DATA -------------------- */
const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Solutions", href: "/solutions", icon: Layers },
  { name: "Case Studies", href: "/case-studies", icon: Briefcase },
  { name: "Products", href: "/products", icon: Box },
  { name: "Academy", href: "/training", icon: GraduationCap },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: PhoneCall },
] as const

/* -------------------- DESKTOP NAV LINK -------------------- */
const DesktopNavLink = memo(
  ({
    href,
    name,
    isActive,
  }: {
    href: string
    name: string
    isActive: boolean
  }) => (
    <Link
      href={href}
      className="relative px-4 py-2 text-[13px] font-normal tracking-wide transition-colors duration-300 group"
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {name}
      </span>

      {isActive && (
        <motion.span
          layoutId="activeDesktopNav"
          className="absolute inset-0 bg-muted/60 rounded-full -z-0"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
)

DesktopNavLink.displayName = "DesktopNavLink"

/* -------------------- NAVBAR COMPONENT -------------------- */
export function Navbar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

  const { scrollY } = useScroll()
  
  // Apple Style Dynamic Transparency on Scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--background), 0)", "rgba(var(--background), 0.75)"]
  )
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(0, 0, 0, 0)", "1px solid var(--border)"]
  )

  useEffect(() => setIsMounted(true), [])
  useEffect(() => setIsMobileSheetOpen(false), [pathname])

  if (!isMounted) return null

  // Segregating tabs for native bottom navigation layout
  const primaryMobileTabs = navLinks.slice(0, 4) // Home, Solutions, Case Studies, Products
  const remainingMobileLinks = navLinks.slice(4) // Academy, About, Contact

  return (
    <>
      {/* ---------------- DESKTOP & MOBILE TOP HEADER ---------------- */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{ backgroundColor, borderBottom }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* -------- SAME EXACT ORIGINAL LOGO UNCHANGED -------- */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-codearn-blue to-codearn-purple rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition" />

                <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                  <Image
                    src="/logo.webp"
                    alt="CodEarn Tech Logo"
                    fill
                    sizes="(max-width: 768px) 100px, 150px" 
                    className="object-contain"
                    priority 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="text-gradient">CodEarn</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Tech
                </span>
              </div>
            </Link>

            {/* -------- DESKTOP MINIMAL CENTRAL LINKS -------- */}
            <div className="hidden lg:flex items-center gap-1 bg-muted/30 border border-border/40 rounded-full p-1.5 backdrop-blur-lg">
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.name}
                  {...link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            {/* -------- RIGHT SIDE CONTROLS -------- */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Premium Restyled Strategy Call Button */}
              <Link href="/book-call" className="hidden lg:block">
                <Button className="rounded-full px-6 text-xs font-medium  text-background  shadow-xs transition-all duration-200 bg-blue-400">
                  Book Strategy Call
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ---------------- MOBILE APP BOTTOM TABS NAVIGATION ---------------- */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-safe-bottom shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
          
          {/* Main Core 4 Tabs */}
          {primaryMobileTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="relative flex flex-col items-center justify-center flex-1 h-full text-center group"
              >
                <div className="relative flex flex-col items-center gap-1 py-1 w-full">
                  <Icon 
                    className={`h-[21px] w-[21px] transition-transform duration-200 group-active:scale-92 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`} 
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span className={`text-[10px] tracking-wide transition-colors ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground font-normal"
                  }`}>
                    {tab.name}
                  </span>
                  
                  {/* Apple Style Smooth Micro-Spring Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTabLine"
                      className="absolute bottom-[-4px] w-5 h-[3px] bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            )
          })}

          {/* "More" Trigger Button for Sheet Activation */}
          <button
            onClick={() => setIsMobileSheetOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 h-full text-center transition-colors group ${
              isMobileSheetOpen ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <MoreHorizontal className="h-[21px] w-[21px] group-active:scale-92 transition-transform duration-200" strokeWidth={1.8} />
              <span className="text-[10px] tracking-wide font-normal">More</span>
            </div>
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE INTERACTIVE ACTION DRAWER SHEET ---------------- */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <>
            {/* Blended Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            />

            {/* iOS Native System-Style Action Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 340 }}
              className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-[24px] border-t border-border px-6 pt-4 pb-10 shadow-2xl max-w-lg mx-auto"
            >
              {/* Top Drag Notch Handle */}
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Menu Links
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8 bg-muted/60"
                  onClick={() => setIsMobileSheetOpen(false)}
                >
                  <X className="h-4 w-4 text-foreground" />
                </Button>
              </div>

              {/* Sub-menu Grid Options */}
              <div className="grid grid-cols-1 gap-1.5 mb-6">
                {remainingMobileLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileSheetOpen(false)}
                      className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                        isActive 
                          ? "bg-muted text-foreground font-medium" 
                          : "hover:bg-muted/40 text-foreground/80"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.8} />
                      <span className="text-sm tracking-wide">{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Centered Premium Bottom Call-to-Action */}
              <Link href="/book-call" onClick={() => setIsMobileSheetOpen(false)}>
                <Button className="w-full py-6 rounded-xl text-sm font-medium text-background  shadow-xs flex items-center justify-center gap-2 bg-blue-400">
                  <CalendarCheck className="h-4 w-4" />
                  Book Strategy Call
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}