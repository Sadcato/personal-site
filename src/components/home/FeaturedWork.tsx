'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const projects = [
  {
    title: 'Apollo Commerce',
    category: 'Development',
    year: '2025',
    image: 'https://picsum.photos/seed/featured-1/2000/1200',
    href: '/work',
  },
  {
    title: 'Glass Notes',
    category: 'Design',
    year: '2025',
    image: 'https://picsum.photos/seed/featured-2/1600/1000',
    href: '/work',
  },
  {
    title: 'Kinetic Intro',
    category: 'Motion',
    year: '2024',
    image: 'https://picsum.photos/seed/featured-3/1600/1000',
    href: '/work',
  },
]

export default function FeaturedWork() {
  return (
    <section className="relative text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex items-center justify-between gap-8 mb-16 rounded-[28px] border border-foreground/10 bg-background/35 px-6 py-5 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">Featured Photos</div>
            </div>
            <Link href="/work" className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">
              View gallery
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-6">
          <ScrollReveal className="col-span-12">
            <ProjectCard project={projects[0]} heightClass="h-[600px]" />
          </ScrollReveal>
          <ScrollReveal className="col-span-12 md:col-span-7" delay={0.1}>
            <ProjectCard project={projects[1]} heightClass="h-[400px]" />
          </ScrollReveal>
          <ScrollReveal className="col-span-12 md:col-span-5" delay={0.2}>
            <ProjectCard project={projects[2]} heightClass="h-[400px]" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  heightClass,
}: {
  project: (typeof projects)[number]
  heightClass: string
}) {
  return (
    <Link
      href={project.href}
      className="group relative block overflow-hidden rounded-[24px]"
    >
      <div className={`relative ${heightClass}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent dark:from-black/70 dark:via-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {project.category} · {project.year}
              </div>
              <div className="mt-3 text-[28px] font-semibold tracking-tight text-white">{project.title}</div>
            </div>
            <div className="relative overflow-hidden h-6">
              <div className="translate-y-7 opacity-0 text-white group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-sm font-semibold">
                View Case Study →
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
