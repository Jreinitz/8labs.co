"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your vision, goals, and challenges. Understanding your business inside and out to craft the perfect solution.",
  },
  {
    number: "02",
    title: "Wireframing",
    description:
      "Architectural blueprints and user flows take shape. We map every interaction and feature before a single line of code is written.",
  },
  {
    number: "03",
    title: "Client Testing",
    description:
      "Interactive prototypes in your hands. Iterate, refine, and perfect the experience based on real feedback and insights.",
  },
  {
    number: "04",
    title: "High Fidelity",
    description:
      "Pixel-perfect designs and polished interfaces. Every detail refined to create an experience that exceeds expectations.",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Launch-ready product delivered with documentation, training, and ongoing support. Your vision, realized.",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !stepsRef.current) return

    const ctx = gsap.context(() => {
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

      const steps = stepsRef.current?.querySelectorAll(".process-step")
      steps?.forEach((step, index) => {
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveStep(index),
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">02 / Process</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HOW WE WORK</h2>
        <p className="mt-6 max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
          A refined process designed to transform complex ideas into exceptional digital products. Every step brings you
          closer to launch.
        </p>
      </div>

      {/* Process steps */}
      <div ref={stepsRef} className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[1px] bg-border/40" />

        <div className="space-y-16 md:space-y-24">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={cn("process-step relative pl-12 md:pl-16 transition-all duration-500")}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center transition-all duration-300",
                  activeStep === index
                    ? "border-foreground bg-foreground text-background"
                    : "border-border/60 bg-background text-muted-foreground",
                )}
              >
                <span className="font-mono text-xs">{step.number}</span>
              </div>

              {/* Content */}
              <div className="max-w-2xl">
                <h3
                  className={cn(
                    "font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight transition-colors duration-300",
                    activeStep === index ? "text-foreground" : "text-foreground/70",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "mt-4 font-mono text-sm leading-relaxed transition-colors duration-300",
                    activeStep === index ? "text-muted-foreground" : "text-muted-foreground/60",
                  )}
                >
                  {step.description}
                </p>
              </div>

              {/* Progress line */}
              <div
                className={cn(
                  "absolute left-[19px] md:left-[23px] top-10 md:top-12 w-[1px] transition-all duration-500",
                  activeStep >= index ? "bg-foreground" : "bg-transparent",
                )}
                style={{
                  height: index < processSteps.length - 1 ? "calc(100% + 4rem)" : "0",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
