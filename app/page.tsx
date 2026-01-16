import { HeroSection } from "@/components/hero-section"
import { WhySection } from "@/components/why-section"
import { ProjectsSection } from "@/components/projects-section"
import { ProcessSection } from "@/components/process-section"
import { ContactSection } from "@/components/contact-section"
import { SideNav } from "@/components/side-nav"
import { GlobalNav } from "@/components/global-nav"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <GlobalNav />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <WhySection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </div>
    </main>
  )
}
