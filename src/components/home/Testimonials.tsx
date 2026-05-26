'use client'

import React from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    content: '“他不仅拥有极高的设计审美，更具备强大的工程实现能力。在与他合作的过程中，我们成功打造了一款前所未有的产品。”',
    author: 'Steve Jobs (Demo)',
    title: 'Apple CEO (Demo)',
  },
  {
    content: '“与他合作是一种享受，他对细节的追求近乎执着，这正是我们需要的。”',
    author: 'Tim Cook (Demo)',
    title: 'Apple CEO (Demo)',
  },
]

export default function Testimonials() {
  return (
    <section className="relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl mb-6">合作伙伴</h2>
              <p className="text-xl text-foreground/60">
                我曾与世界上最顶尖的品牌和初创公司合作，共同打造卓越体验。
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.2}>
              <div className="flex flex-col space-y-12">
                <p className="text-3xl md:text-4xl font-display font-medium leading-relaxed italic text-foreground/80">
                  {testimonial.content}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full bg-apple-gray dark:bg-zinc-800" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold font-display">{testimonial.author}</span>
                    <span className="text-sm uppercase tracking-widest text-foreground/40">
                      {testimonial.title}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
