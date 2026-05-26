'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  spring?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

export default function MagneticButton({
  children,
  className,
}: MagneticButtonProps) {
  return <div className={cn('relative inline-block', className)}>{children}</div>
}
