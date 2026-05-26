'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { sendContact } from '@/app/contact/actions'
import { cn } from '@/lib/utils'

type ContactState =
  | { status: 'idle' | 'success'; message?: string }
  | { status: 'error'; message: string }

const initialState: ContactState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'w-full h-12 rounded-pill bg-[var(--accent)] text-white font-semibold transition-opacity',
        pending ? 'opacity-70' : 'hover:opacity-90'
      )}
    >
      {pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

export default function ContactForm() {
  const [state, action] = useActionState(sendContact, initialState)

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="h-10 w-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center"
          >
            <div className="h-4 w-4 rounded-full bg-[var(--accent)]" />
          </motion.div>
          <div className="text-lg font-semibold">Thanks.</div>
        </div>
        <p className="text-foreground/60">{state.message ?? '已收到你的消息。'}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="h-11 px-5 rounded-pill border border-black/10 dark:border-white/10 text-sm font-semibold"
        >
          Send another
        </button>
      </motion.div>
    )
  }

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Project Type</label>
        <select
          name="projectType"
          className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Motion">Motion</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm text-red-500 font-semibold">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  )
}
