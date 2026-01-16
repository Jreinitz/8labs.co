"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GlitchImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function GlitchImage({ src, alt, width, height, className }: GlitchImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)
    }
  }, [src])

  useEffect(() => {
    if (!imageLoaded) return

    const triggerGlitch = () => {
      setIsGlitching(true)

      // Glitch duration varies
      const glitchDuration = 150 + Math.random() * 200
      setTimeout(() => {
        setIsGlitching(false)
      }, glitchDuration)
    }

    // Random interval between glitches (3-8 seconds)
    const scheduleNextGlitch = () => {
      const delay = 3000 + Math.random() * 5000
      return setTimeout(() => {
        triggerGlitch()
        timeoutId = scheduleNextGlitch()
      }, delay)
    }

    let timeoutId = scheduleNextGlitch()

    return () => clearTimeout(timeoutId)
  }, [imageLoaded])

  useEffect(() => {
    if (!isGlitching || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current
    let animationId: number

    const pixelate = () => {
      // Random pixelation intensity
      const pixelSize = Math.floor(4 + Math.random() * 12)

      // Draw scaled down
      const scaledWidth = Math.ceil(canvas.width / pixelSize)
      const scaledHeight = Math.ceil(canvas.height / pixelSize)

      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw to small size
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight)

      // Scale back up with pixelation
      ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, canvas.width, canvas.height)

      // Add scanline effect
      ctx.fillStyle = "rgba(0, 255, 100, 0.03)"
      for (let i = 0; i < canvas.height; i += 2) {
        ctx.fillRect(0, i, canvas.width, 1)
      }

      // Random RGB shift
      if (Math.random() > 0.5) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        const shift = Math.floor(Math.random() * 10) - 5

        for (let i = 0; i < data.length; i += 4) {
          // Shift red channel
          if (i + shift * 4 >= 0 && i + shift * 4 < data.length) {
            data[i] = data[i + shift * 4] || data[i]
          }
        }
        ctx.putImageData(imageData, 0, 0)
      }

      // Add random horizontal displacement
      if (Math.random() > 0.6) {
        const sliceY = Math.floor(Math.random() * canvas.height)
        const sliceHeight = 5 + Math.floor(Math.random() * 20)
        const displacement = Math.floor(Math.random() * 20) - 10

        const slice = ctx.getImageData(0, sliceY, canvas.width, sliceHeight)
        ctx.putImageData(slice, displacement, sliceY)
      }

      animationId = requestAnimationFrame(pixelate)
    }

    pixelate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isGlitching])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Normal image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover grayscale transition-opacity duration-100",
          isGlitching ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Glitch canvas overlay */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-100",
          isGlitching ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Subtle scan lines always visible */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
    </div>
  )
}
