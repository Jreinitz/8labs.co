"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ScrambleTextOnHover } from "@/components/scramble-text"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
]

export function GlobalNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="flex items-center justify-between py-6 md:py-8">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image src="/8labs-logo.svg" alt="8 Labs" width={140} height={70} className="h-auto w-24 md:w-32" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ScrambleTextOnHover text={link.label} as="span" duration={0.4} />
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-foreground/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ScrambleTextOnHover text="Start a Project" as="span" duration={0.4} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-sm md:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-[var(--font-bebas)] text-4xl uppercase tracking-wider transition-all duration-300 ${
                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`mt-4 border border-foreground px-8 py-3 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-500 ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </nav>
  )
}
