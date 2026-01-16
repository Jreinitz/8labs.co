"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col pl-6 md:pl-28 pr-6 md:pr-12 pt-24 md:pt-28"
    >
      <AnimatedNoise opacity={0.02} />

      {/* Main content - now vertically centered in remaining space */}
      <div ref={contentRef} className="flex-1 flex flex-col justify-center w-full max-w-6xl">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="8 LABS" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
          Digital Products & AI Solutions
        </h2>

        <p className="mt-12 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
          We transform your vision into reality. From digital products to AI integrations, we handle the complexity so
          you can focus on what matters—your business.
        </p>

        <div className="mt-16 flex items-center gap-8">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ScrambleTextOnHover text="View Our Work" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Premium Digital Agency
        </div>
      </div>
    </section>
  )
}
