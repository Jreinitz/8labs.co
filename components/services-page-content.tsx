"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedNoise } from "@/components/animated-noise"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { GlobalNav } from "@/components/global-nav"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    category: "Product",
    title: "Digital Products",
    description:
      "End-to-end product development from concept to launch. We design and build web applications, mobile apps, SaaS platforms, and custom software solutions that solve real problems.",
    capabilities: ["Web Applications", "Mobile Apps", "SaaS Platforms", "MVP Development", "Product Strategy"],
  },
  {
    category: "Intelligence",
    title: "AI Integrations",
    description:
      "Leverage the power of artificial intelligence in your existing systems. From chatbots and recommendation engines to custom LLM implementations and workflow automation.",
    capabilities: [
      "Custom LLM Solutions",
      "AI Chatbots",
      "Recommendation Systems",
      "Document Processing",
      "Predictive Analytics",
    ],
  },
  {
    category: "Automation",
    title: "Automated Tools",
    description:
      "Eliminate repetitive tasks and scale your operations. We build custom automation pipelines that connect your tools, process data, and execute complex workflows autonomously.",
    capabilities: [
      "Workflow Automation",
      "Data Pipelines",
      "API Integrations",
      "Scheduled Tasks",
      "Process Optimization",
    ],
  },
  {
    category: "Engineering",
    title: "Custom Development",
    description:
      "When off-the-shelf won't cut it. Our engineering team builds custom solutions tailored to your exact specifications—from complex backend systems to specialized front-end experiences.",
    capabilities: [
      "Full-Stack Development",
      "API Design",
      "Database Architecture",
      "Cloud Infrastructure",
      "Performance Optimization",
    ],
  },
  {
    category: "Growth",
    title: "Marketing Solutions",
    description:
      "Complete marketing agency services powered by modern tools. Strategy, content creation, campaign management, and analytics—everything you need to grow your brand.",
    capabilities: ["Brand Strategy", "Content Creation", "Social Media", "Paid Advertising", "Analytics & Reporting"],
  },
  {
    category: "Design",
    title: "UX & Interface Design",
    description:
      "Beautiful, functional design that converts. User research, wireframing, prototyping, and high-fidelity interfaces crafted with precision and purpose.",
    capabilities: ["User Research", "Wireframing", "Prototyping", "UI Design", "Design Systems"],
  },
]

export function ServicesPageContent() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".service-card")
        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          })
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
            What We Offer
          </span>
          <h1 className="animate-in mt-6 font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight">
            EVERYTHING
            <br />
            YOU NEED
          </h1>
          <p className="animate-in mt-8 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
            From concept to launch and beyond. We offer comprehensive digital services—product development, AI
            integration, automation, custom engineering, and full-service marketing. One partner for all your digital
            needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">How We Work</span>
            <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight">STREAMLINED DELIVERY</h2>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {["Discovery", "Wireframe", "Testing", "Build", "Launch"].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-full aspect-square border border-border/30 flex items-center justify-center mb-3 relative">
                  <span className="font-[var(--font-bebas)] text-3xl text-foreground/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < 4 && <div className="absolute -right-2 top-1/2 w-4 h-px bg-border/40 -translate-y-1/2" />}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center font-mono text-xs text-muted-foreground">
            Average project delivery: 2-4 weeks from kickoff to launch.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">LET'S BUILD TOGETHER</h2>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Tell us about your project and we'll show you what's possible.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 mt-8 border border-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ScrambleTextOnHover text="Get in Touch" as="span" duration={0.6} />
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

function ServiceCard({
  service,
  index,
}: {
  service: {
    category: string
    title: string
    description: string
    capabilities: string[]
  }
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article
      className={cn(
        "service-card group relative border border-border/30 p-8 transition-all duration-500 cursor-pointer",
        isExpanded && "border-foreground/40 bg-foreground/5",
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{service.category}</span>
        <span className="font-mono text-[10px] text-muted-foreground/40">{String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* Title */}
      <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">{service.description}</p>

      {/* Capabilities */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pt-4 border-t border-border/20">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-3 block">
            Capabilities
          </span>
          <ul className="grid grid-cols-2 gap-2">
            {service.capabilities.map((cap, i) => (
              <li key={i} className="font-mono text-[10px] text-foreground/80 flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expand indicator */}
      <div className="absolute bottom-4 right-4">
        <span className="font-mono text-[9px] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
          {isExpanded ? "Less" : "More"}
        </span>
      </div>

      {/* Corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-8 h-8 transition-opacity duration-300",
          isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
