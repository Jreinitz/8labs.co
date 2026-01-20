"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Affilify",
    category: "Marketing Automation",
    description:
      "Automated content generation and marketing empire builder. Users sign up, pick a niche, and we handle the rest—automating content creation across Facebook, Instagram, TikTok, and YouTube.",
    status: "In Development",
    span: "col-span-2 row-span-2",
    logo: "/affilify-logo.svg",
    url: "https://affilify.co",
  },
  {
    title: "Unifyed",
    category: "Live Commerce",
    description:
      "Multi-platform live shopping solution enabling concurrent streaming across Instagram, TikTok, Twitch, Poshmark, and more.",
    status: "Active",
    span: "col-span-2 row-span-1",
    logo: "/unifyed-logo.svg",
    url: "https://unifyed.io",
  },
  {
    title: "Ageos",
    category: "Agentic OS",
    description:
      "The future of personal computing. An agent operating system layer that manages autonomous agents across all facets of your digital life.",
    status: "Stealth",
    span: "col-span-2 row-span-1",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">01 / Projects</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHAT WE BUILD</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Transformative digital products and AI-powered solutions for forward-thinking companies.
        </p>
      </div>

      {/* Projects grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string
    category: string
    description: string
    status: string
    span: string
    logo?: string
    url?: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer",
        project.span,
        isHovered ? "border-foreground/60 z-20 overflow-visible" : "z-10 overflow-hidden",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-foreground/5 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.category}
          </span>
          <span
            className={cn(
              "font-mono text-[9px] uppercase tracking-widest px-2 py-1 border",
              project.status === "Stealth"
                ? "border-muted-foreground/30 text-muted-foreground/60"
                : project.status === "Active"
                  ? "border-foreground/30 text-foreground/80"
                  : "border-muted-foreground/30 text-muted-foreground",
            )}
          >
            {project.status}
          </span>
        </div>
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight transition-colors duration-300",
            isHovered ? "text-foreground" : "text-foreground/90",
          )}
        >
          {project.title}
        </h3>
        {project.logo && (
          <div className="mt-3 opacity-60">
            <Image
              src={project.logo || "/placeholder.svg"}
              alt={`${project.title} logo`}
              width={40}
              height={45}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {project.description}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground border border-foreground/40 px-3 py-2 transition-all duration-300 hover:bg-foreground hover:text-background",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        )}
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isHovered ? "text-foreground" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-foreground" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-foreground" />
      </div>
    </article>
  )
}
