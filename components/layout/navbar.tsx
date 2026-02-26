"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

/* -------------------- NAV LINKS -------------------- */
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Training", href: "/training" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
] as const

/* -------------------- DESKTOP NAV LINK -------------------- */
const NavLink = memo(
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
      className="relative px-4 py-2 text-sm font-medium group"
    >
      <span
        className={`relative z-10 transition-colors ${
          isActive
            ? "text-primary"
            : "text-foreground/70 group-hover:text-foreground"
        }`}
      >
        {name}
      </span>

      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute inset-0 bg-primary/10 rounded-lg"
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}

      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-linear-to-r from-codearn-blue to-codearn-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  )
)

NavLink.displayName = "NavLink"

/* -------------------- NAVBAR -------------------- */
export function Navbar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.9)"]
  )
  const blur = useTransform(scrollY, [0, 100], [0, 12])
  const backdropBlur = useTransform(blur, (v) => `blur(${v}px)`)

  useEffect(() => setIsMounted(true), [])
  useEffect(() => setIsMobileMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  if (!isMounted) return null

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <motion.div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundColor,
            backdropFilter: backdropBlur,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        />

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* -------- LOGO -------- */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-codearn-blue to-codearn-purple rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition" />

                <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                  <Image
  src="/logo.webp"
  alt="CodEarn Tech Logo"
  fill
  // ✅ Ye line add karein: 
  // Iska matlab hai: mobile par 100px aur desktop par bhi 150px approx
  sizes="(max-width: 768px) 100px, 150px" 
  className="object-contain"
  priority // ✅ Logo ke liye priority zaroori hai taake FCP behtar ho
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

            {/* -------- DESKTOP NAV -------- */}
            <div className="hidden lg:flex items-center gap-1 bg-background/60 backdrop-blur rounded-full px-2 py-1.5 border border-border/50">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  {...link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            {/* -------- DESKTOP ACTIONS -------- */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              {/* Get Started Button - Linked to Signup */}
              <Link href="/register" passHref>
                <Button className="rounded-full px-6 bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* -------- MOBILE BUTTON -------- */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ---------------- MOBILE MENU ---------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-[85%] max-w-90 bg-background z-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-codearn-blue to-codearn-purple rounded-xl flex items-center justify-center shadow">
                    <Image
                      src="/logo.webp"
                      alt="CodEarn"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg">CodEarn Tech</span>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X />
                </Button>
              </div>

              <div className="p-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block p-5 rounded-xl font-medium transition ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Get Started - Linked to Signup */}
                <Link 
                  href="/register" 
                  passHref
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full mt-6 py-6 text-lg bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan hover:shadow-lg hover:shadow-primary/25 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}