"use client"

import { useRef, useEffect } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">03 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">LET&apos;S BUILD</h2>
      </div>

      {/* CTA Content */}
      <div ref={contentRef} className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24">
        <div>
          <p className="font-mono text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
            Ready to transform your idea into reality? We&apos;re here to help you build the digital products and AI
            solutions that will define your future.
          </p>
          <a
            href="mailto:hello@8labs.co"
            className="group inline-flex items-center gap-3 border border-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ScrambleTextOnHover text="Start a Conversation" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Services */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="font-mono text-xs text-foreground/80">Digital Products</li>
              <li className="font-mono text-xs text-foreground/80">AI Integrations</li>
              <li className="font-mono text-xs text-foreground/80">Automation Tools</li>
              <li className="font-mono text-xs text-foreground/80">Custom Development</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@8labs.co"
                  className="font-mono text-xs text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  hello@8labs.co
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-mono text-xs text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-mono text-xs text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div
        ref={footerRef}
        className="pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Image src="/8labs-icon.svg" alt="8 Labs" width={24} height={24} className="opacity-60" />
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2025 8 Labs. All rights reserved.
          </p>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">Built with precision. Delivered with excellence.</p>
      </div>
    </section>
  )
}
