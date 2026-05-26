'use client'

import React from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const skills = [
  {
    category: '设计',
    items: ['UI/UX 设计', '视觉传达', '设计系统', 'Figma', '动画交互'],
  },
  {
    category: '前端',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: '后端',
    items: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'AWS / Vercel'],
  },
]

export default function Skills() {
  return (
    <section className="bg-apple-gray dark:bg-zinc-950">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl mb-6">核心技能</h2>
              <p className="text-xl text-foreground/60">
                我致力于在技术、设计与用户体验之间寻找平衡。
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.category} delay={index * 0.2}>
              <div className="space-y-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-[1px] bg-apple-blue" />
                  <h3 className="text-2xl font-display font-semibold uppercase tracking-widest text-apple-blue">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-col space-y-6">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="group flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4"
                    >
                      <span className="text-2xl md:text-3xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
