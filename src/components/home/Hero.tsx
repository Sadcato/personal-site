'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const magneticX = useSpring(rawX, { stiffness: 70, damping: 26, mass: 0.7 })
  const magneticY = useSpring(rawY, { stiffness: 70, damping: 26, mass: 0.7 })

  const appears = useMemo(
    () => ({
      badge: { delay: 0 },
      l1: { delay: 0.2 },
      l2: { delay: 0.4 },
      p: { delay: 0.6 },
      cta: { delay: 0.8 },
    }),
    []
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let raf = 0
    const handleMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const t = titleRef.current
        if (!t) return
        const r = t.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const distance = Math.hypot(dx, dy)
        const max = 260
        if (distance > max) {
          rawX.set(0)
          rawY.set(0)
          return
        }
        const strength = (1 - distance / max) * 10
        rawX.set((dx / max) * strength)
        rawY.set((dy / max) * strength)
      })
    }

    const handleLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [rawX, rawY])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] text-foreground overflow-hidden py-0"
    >
      <div className="container-custom relative z-10 h-full flex items-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: appears.badge.delay }}
            className="inline-flex items-center gap-3 rounded-pill bg-foreground/5 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34C759]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
              Available for Work · 2025
            </span>
          </motion.div>

          <div className="mt-10 max-w-5xl">
            <motion.div ref={titleRef} style={{ x: magneticX, y: magneticY }}>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: appears.l1.delay, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-[clamp(4rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] font-sans font-thin"
              >
                Crafting Digital
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: appears.l2.delay, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-[clamp(4rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] font-display italic text-[var(--accent)]"
              >
                Experiences
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: appears.p.delay }}
                className="mt-8 text-[17px] text-foreground/60 max-w-2xl"
            >
              Senior full-stack engineer & UI/UX designer building calm, fast, Apple-level interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: appears.cta.delay }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <MagneticButton>
                <Link
                  href="/work"
                  className="inline-flex h-12 items-center justify-center rounded-pill px-7 text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                >
                  View Gallery
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/cv.pdf"
                  className="inline-flex h-12 items-center justify-center rounded-pill px-7 text-sm font-semibold border border-foreground/15 text-foreground hover:bg-foreground/10 transition-colors"
                >
                  Download CV
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
