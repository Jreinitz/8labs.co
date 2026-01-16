"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "why", label: "Why" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
]

const pageLinks = [
  { href: "/story", label: "Story" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (!isHomePage) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isHomePage])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-between py-8 border-r border-border/30 bg-background/80 backdrop-blur-sm">
      {/* Logo at top */}
      <Link href="/" className="flex justify-center">
        <Image src="/8labs-icon.svg" alt="8 Labs" width={32} height={32} className="opacity-80" />
      </Link>

      {/* Nav items centered */}
      <div className="flex flex-col gap-6 px-4">
        {isHomePage ? (
          // Section navigation for homepage
          navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  activeSection === id
                    ? "bg-foreground scale-125"
                    : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                )}
              />
              <span
                className={cn(
                  "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                  activeSection === id ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          ))
        ) : (
          // Page links for subpages
          <>
            <Link href="/" className="group relative flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-foreground/60 transition-all duration-300" />
              <span className="absolute left-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap">
                Home
              </span>
            </Link>
            {pageLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="group relative flex items-center gap-3">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    pathname === href
                      ? "bg-foreground scale-125"
                      : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                    pathname === href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* Empty space at bottom for balance */}
      <div className="h-8" />
    </nav>
  )
}
