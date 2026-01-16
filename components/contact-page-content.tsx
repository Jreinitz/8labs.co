"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedNoise } from "@/components/animated-noise"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { GlobalNav } from "@/components/global-nav"
import gsap from "gsap"

export function ContactPageContent() {
  const formRef = useRef<HTMLFormElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

      if (formRef.current) {
        gsap.from(formRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatedNoise opacity={0.02} />

      {/* Navigation */}
      <GlobalNav />

      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Header & Info */}
          <div ref={headerRef}>
            <span className="animate-in font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Get in Touch
            </span>
            <h1 className="animate-in mt-6 font-[var(--font-bebas)] text-5xl md:text-6xl lg:text-7xl tracking-tight">
              LET'S BUILD
              <br />
              SOMETHING
              <br />
              GREAT
            </h1>
            <p className="animate-in mt-8 font-mono text-sm text-muted-foreground leading-relaxed">
              Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24
              hours.
            </p>

            {/* Contact Info */}
            <div className="animate-in mt-12 space-y-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">Email</span>
                <a
                  href="mailto:hello@8labs.co"
                  className="block mt-1 font-mono text-sm text-foreground hover:text-accent transition-colors"
                >
                  hello@8labs.co
                </a>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                  Connect
                </span>
                <div className="mt-2 flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/joshua-reinitz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-xs text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <ScrambleTextOnHover text="LinkedIn" as="span" duration={0.4} />
                    <BitmapChevron className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 font-mono text-xs text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <ScrambleTextOnHover text="Twitter/X" as="span" duration={0.4} />
                    <BitmapChevron className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                  Response Time
                </span>
                <p className="mt-1 font-mono text-sm text-foreground">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border border-accent rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-[var(--font-bebas)] text-3xl tracking-tight">MESSAGE SENT</h2>
                <p className="mt-2 font-mono text-sm text-muted-foreground">We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormState({
                      name: "",
                      email: "",
                      company: "",
                      projectType: "",
                      budget: "",
                      message: "",
                    })
                  }}
                  className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border/40 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border/40 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-border/40 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                {/* Project Type & Budget */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      className="w-full bg-background border border-border/40 px-4 py-3 font-mono text-sm text-foreground focus:border-foreground focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select type</option>
                      <option value="digital-product">Digital Product</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="automation">Automation Tool</option>
                      <option value="custom-development">Custom Development</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full bg-background border border-border/40 px-4 py-3 font-mono text-sm text-foreground focus:border-foreground focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select range</option>
                      <option value="5k-15k">$5K - $15K</option>
                      <option value="15k-50k">$15K - $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k+">$100K+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-transparent border border-border/40 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors resize-none"
                    placeholder="Describe your project, goals, and timeline..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 border border-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <ScrambleTextOnHover text="Send Message" as="span" duration={0.6} />
                      <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

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
