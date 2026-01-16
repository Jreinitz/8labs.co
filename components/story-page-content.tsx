"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedNoise } from "@/components/animated-noise"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { GlobalNav } from "@/components/global-nav"
import { GlitchImage } from "@/components/glitch-image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: "2018",
    title: "The Old World",
    description:
      "Product development meant 6-month discovery phases, endless stakeholder meetings, and waterfall timelines. A single feature could take quarters to ship.",
  },
  {
    year: "2020",
    title: "The Pandemic Pivot",
    description:
      "Remote work accelerated digital transformation. Companies that once hesitated now demanded rapid digital solutions. The pressure to move faster intensified.",
  },
  {
    year: "2023",
    title: "The AI Inflection",
    description:
      "Large language models and generative AI changed everything. What once took teams of engineers weeks could now be prototyped in hours. The rules were being rewritten.",
  },
  {
    year: "2024",
    title: "8 Labs is Born",
    description:
      "We founded 8 Labs to bridge the gap between what's possible and what companies can actually build. Armed with 17+ years of product experience and cutting-edge AI tools, we deliver in weeks what used to take months.",
  },
  {
    year: "Now",
    title: "The New Era",
    description:
      "Discovery happens in days. Prototypes ship in hours. Production-ready products launch in weeks. We're not just keeping pace with this change—we're defining it.",
  },
]

const credentials = [
  { label: "Years Experience", value: "17+" },
  { label: "Products Shipped", value: "50+" },
  { label: "Industries Served", value: "12" },
  { label: "Avg. Delivery Time", value: "3 wks" },
]

export function StoryPageContent() {
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const founderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll(".animate-in"), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        })
      }

      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item")
        items.forEach((item, index) => {
          gsap.from(item, {
            x: index % 2 === 0 ? -60 : 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
        })
      }

      if (founderRef.current) {
        gsap.from(founderRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: founderRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatedNoise opacity={0.02} />

      {/* Navigation */}
      <GlobalNav />

      {/* Hero */}
      <section ref={headerRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl">
          <span className="animate-in font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Our Story
          </span>
          <h1 className="animate-in mt-6 font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight">
            THE RULES
            <br />
            HAVE CHANGED
          </h1>
          <p className="animate-in mt-8 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
            Digital product development isn't what it was even a year ago. What once required months of discovery,
            armies of designers, and endless development cycles can now be accomplished in weeks—sometimes days. We
            built 8 Labs to meet this moment.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">The Evolution</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight">A PARADIGM SHIFT</h2>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

          {timeline.map((item, index) => (
            <div
              key={index}
              className={cn(
                "timeline-item relative grid md:grid-cols-2 gap-8 mb-16 last:mb-0",
                index % 2 === 0 ? "md:text-right" : "",
              )}
            >
              {/* Content */}
              <div className={cn("md:pr-12", index % 2 !== 0 && "md:col-start-2 md:pl-12 md:pr-0 md:text-left")}>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{item.year}</span>
                <h3 className="mt-2 font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight">{item.title}</h3>
                <p className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* Marker */}
              <div
                className={cn(
                  "absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full border-2 -translate-x-1/2",
                  item.year === "Now" || item.year === "2024"
                    ? "bg-accent border-accent"
                    : "bg-background border-border/60",
                )}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Bio text - left side */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                The Founder
              </span>
              <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight">JOSHUA REINITZ</h2>
              <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed">
                With 17+ years spanning marketing, UX design, and product development, I've built digital experiences
                across healthcare, fintech, e-commerce, and emerging tech. From leading product design at clinical trial
                startups to co-founding health tech companies, I've seen firsthand how the industry has evolved.
              </p>
              <p className="mt-4 font-mono text-sm text-muted-foreground leading-relaxed">
                The last year has changed everything. AI tools have compressed timelines that once stretched months into
                weeks. I founded 8 Labs to offer what I've learned to companies of any size—solving complex digital
                problems and building unique products at the speed this new era demands.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/joshua-reinitz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ScrambleTextOnHover text="LinkedIn" as="span" duration={0.4} />
                  <BitmapChevron className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right side - Image on top, stats below */}
            <div className="flex flex-col gap-8">
              {/* Photo with sci-fi glitch effect */}
              <div className="relative self-start">
                <GlitchImage
                  src="/joshua-reinitz.jpg"
                  alt="Joshua Reinitz"
                  width={320}
                  height={400}
                  className="w-full max-w-[320px] aspect-[4/5] border border-border/30"
                />
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-foreground/30" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-foreground/30" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-foreground/30" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-foreground/30" />
              </div>

              {/* Credentials grid below image */}
              <div className="grid grid-cols-2 gap-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="border border-border/30 p-5">
                    <span className="font-[var(--font-bebas)] text-3xl md:text-4xl text-foreground">{cred.value}</span>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {cred.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">READY TO BUILD?</h2>
          <p className="mt-4 font-mono text-sm text-muted-foreground">Let's turn your vision into reality.</p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 mt-8 border border-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ScrambleTextOnHover text="Start a Project" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-border/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/8labs-icon.svg" alt="8 Labs" width={20} height={20} className="opacity-60" />
            <span className="font-mono text-[10px] text-muted-foreground">© 2025 8 Labs</span>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  )
}
