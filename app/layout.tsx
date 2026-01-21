import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "8 Labs — Digital Products & AI Solutions",
  description:
    "We build digital products and AI integrations that transform your vision into reality. From concept to launch in weeks, not months. Premium development agency focused on innovation.",
  generator: "v0.app",
  keywords: ["digital products", "AI development", "product design", "software development", "AI integrations", "automation", "UX design", "marketing automation"],
  authors: [{ name: "Joshua Reinitz", url: "https://linkedin.com/in/joshua-reinitz" }],
  creator: "8 Labs",
  publisher: "8 Labs",
  metadataBase: new URL("https://8labs.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://8labs.co",
    siteName: "8 Labs",
    title: "8 Labs — Digital Products & AI Solutions",
    description: "We build digital products and AI integrations that transform your vision into reality. From concept to launch in weeks, not months.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "8 Labs - Digital Products & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "8 Labs — Digital Products & AI Solutions",
    description: "We build digital products and AI integrations that transform your vision into reality. From concept to launch in weeks, not months.",
    images: ["/og-image.jpg"],
    creator: "@8labs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
