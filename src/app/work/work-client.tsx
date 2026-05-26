'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects, workFilters, type ProjectCategory } from '@/lib/projects'

type FilterValue = 'All' | ProjectCategory

export default function WorkClient() {
  const [filter, setFilter] = React.useState<FilterValue>('All')

  const filtered = React.useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <section className="pt-40">
      <div className="container-custom">
        <div className="mb-16">
          <h1 className="text-hero">Work</h1>
          <div className="mt-10 flex flex-wrap gap-2">
            {workFilters.map((t) => {
              const active = t.value === filter
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setFilter(t.value)}
                  className={cn(
                    'h-11 px-5 rounded-pill text-sm font-semibold transition-colors border',
                    active
                      ? 'bg-[var(--accent)] text-white border-transparent'
                      : 'bg-transparent border-black/10 dark:border-white/10 text-foreground/70 hover:text-foreground'
                  )}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.03, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative overflow-hidden rounded-apple border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="inline-flex h-11 items-center rounded-pill px-5 text-sm font-semibold bg-white text-black"
                      >
                        Open Project
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-display font-semibold tracking-tight">{project.title}</h3>
                      <p className="mt-2 text-sm text-foreground/60 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground/50">{project.year}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
