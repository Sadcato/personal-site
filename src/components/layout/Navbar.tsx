'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

const navLinks = [
  { name: 'Gallery', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const emptySubscribe = () => () => undefined

function useMounted() {
  return React.useSyncExternalStore(emptySubscribe, () => true, () => false)
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

function ThemeToggleButton({ className }: { className?: string }) {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'h-10 w-10 items-center justify-center rounded-full hover:bg-foreground/[0.06] transition-colors',
        className
      )}
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <span className="inline-flex h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrolled(20)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6',
        'transition-[background-color,backdrop-filter] duration-300',
        'backdrop-blur-2xl bg-background/80 text-foreground',
        scrolled ? '' : ''
      )}
    >
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <MagneticButton strength={0.25}>
          <Link
            href="/"
            className="relative font-display text-sm tracking-[0.2em] uppercase"
            aria-label="Home"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground/[0.03] hover:bg-foreground/[0.06] transition-colors">
              <span className="font-semibold">SD.</span>
            </span>
          </Link>
        </MagneticButton>

        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggleButton className="hidden md:inline-flex" />

          <MagneticButton className="hidden md:inline-block" strength={0.3}>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-pill px-5 text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            >
              Hire Me
            </Link>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-foreground/[0.06] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0 backdrop-blur-2xl bg-background/95 text-foreground"
            >
              <div className="px-6 pt-6 flex items-center justify-between">
                <span className="font-display text-sm tracking-[0.2em] uppercase">SD.</span>
                <div className="flex items-center gap-3">
                  <ThemeToggleButton className="inline-flex" />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-foreground/[0.06] transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="px-6 pt-12 flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + idx * 0.06, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-display font-semibold tracking-tight"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute left-6 right-6 bottom-10">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full h-12 items-center justify-center rounded-pill bg-[var(--accent)] text-white font-semibold"
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
