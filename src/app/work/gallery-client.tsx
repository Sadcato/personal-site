'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GalleryCategory, GalleryItem } from '@/lib/gallery'
import { galleryCategories } from '@/lib/gallery'
import { ImageViewer } from '@/components/gallery/ImageViewer'

type FilterValue = 'All' | GalleryCategory

export default function GalleryClient({
  initialItems,
  showFilters = true,
}: {
  initialItems: Array<GalleryItem>
  showFilters?: boolean
}) {
  const [filter, setFilter] = React.useState<FilterValue>('All')
  const [viewerOpen, setViewerOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const filtered = React.useMemo(() => {
    if (filter === 'All') return initialItems
    return initialItems.filter((i) => i.category === filter)
  }, [filter, initialItems])

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setViewerOpen(true)
  }

  return (
    <section className="pt-40">
      <div className="container-custom">
        <div className="mb-14">
          <h1 className="text-hero">Gallery</h1>
          <p className="mt-6 text-lg text-foreground/60 max-w-2xl">
            个人作品，按主题分类整理：人物、动物、风光。图片存储于 Vercel Blob。
          </p>

          {showFilters && (
            <div className="mt-10 flex flex-wrap gap-2">
              {galleryCategories.map((t) => {
                const active = t.value === filter
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setFilter(t.value)}
                    className={cn(
                      'h-11 px-5 rounded-pill text-sm font-semibold transition-colors',
                      active
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-foreground/[0.04] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]'
                    )}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.figure
                key={`${item.category}-${idx}`}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.45, delay: idx * 0.01, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative overflow-hidden rounded-apple bg-foreground/[0.03] cursor-pointer"
                onClick={() => handleImageClick(idx)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.url}
                    alt={item.key}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {showFilters && (
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                          {item.category}
                        </div>
                      )}
                      <div className="mt-2 text-sm text-white/70 line-clamp-1">{item.key.split('/').pop()}</div>
                    </div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <ImageViewer items={filtered} initialIndex={selectedIndex} isOpen={viewerOpen} onClose={() => setViewerOpen(false)} />

        {initialItems.length === 0 && (
          <div className="mt-16 rounded-apple bg-foreground/[0.03] p-10 text-foreground/70">
            目前没有加载到图片。请确认已配置 Vercel Blob，且文件在 `photos/` 前缀下。
          </div>
        )}
      </div>
    </section>
  )
}
