'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryItem } from '@/lib/gallery'

interface ImageViewerProps {
  items: GalleryItem[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageViewer({ items, initialIndex, isOpen, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [loadedIndexes, setLoadedIndexes] = React.useState<Set<number>>(new Set([initialIndex]))

  React.useEffect(() => {
    setCurrentIndex(initialIndex)
    setLoadedIndexes(new Set([initialIndex]))
  }, [initialIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? items.length - 1 : prev - 1
      preloadImages(newIndex)
      return newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === items.length - 1 ? 0 : prev + 1
      preloadImages(newIndex)
      return newIndex
    })
  }

  const preloadImages = (index: number) => {
    setLoadedIndexes((prev) => new Set(prev).add(index))
    // 预加载相邻的图片
    const nextIndex = (index + 1) % items.length
    const prevIndex = (index - 1 + items.length) % items.length
    setLoadedIndexes((prev) => {
      const updated = new Set(prev)
      updated.add(nextIndex)
      updated.add(prevIndex)
      return updated
    })
  }

  React.useEffect(() => {
    if (isOpen) {
      preloadImages(currentIndex)
    }
  }, [isOpen, currentIndex])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const currentItem = items[currentIndex]
  const nextItem = items[(currentIndex + 1) % items.length]
  const prevItem = items[(currentIndex - 1 + items.length) % items.length]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        >
          {/* 隐藏的预加载图片 */}
          <div className="hidden">
            {nextItem && <Image src={nextItem.url} alt="" width={1} height={1} />}
            {prevItem && <Image src={prevItem.url} alt="" width={1} height={1} />}
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image with fade transition */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh]"
            >
              <Image
                src={currentItem.url}
                alt={currentItem.key}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                quality={90}
              />
            </motion.div>

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              {currentIndex + 1} / {items.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
