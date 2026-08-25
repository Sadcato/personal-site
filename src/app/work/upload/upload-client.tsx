'use client'

import { upload } from '@vercel/blob/client'
import { useRef, useState } from 'react'

const PREFIX = 'photos/'

export default function GalleryUploadClient() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [secret, setSecret] = useState('')
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedPath, setUploadedPath] = useState<string | null>(null)

  return (
    <section className="pt-40">
      <div className="container-custom max-w-xl">
        <h1 className="text-hero">Upload</h1>
        <p className="mt-6 text-lg text-foreground/60">
          图片会从浏览器直传到私有 Vercel Blob。需要配置 `GALLERY_UPLOAD_SECRET`。
        </p>

        <form
          className="mt-12 space-y-8"
          onSubmit={async (event) => {
            event.preventDefault()
            setError(null)
            setUploadedPath(null)

            const file = inputFileRef.current?.files?.[0]
            if (!file) {
              setError('请选择一张图片')
              return
            }

            try {
              setProgress(0)
              const blob = await upload(`${PREFIX}${file.name}`, file, {
                access: 'private',
                handleUploadUrl: '/api/gallery/upload',
                multipart: file.size > 4.5 * 1024 * 1024,
                headers: { 'x-gallery-secret': secret },
                onUploadProgress: ({ percentage }) => setProgress(percentage),
              })
              setUploadedPath(blob.pathname)
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Upload failed')
            } finally {
              setProgress(null)
            }
          }}
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
              Upload secret
            </label>
            <input
              type="password"
              autoComplete="off"
              required
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="w-full bg-transparent border-b border-foreground/10 py-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
              Photo
            </label>
            <input
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              required
              className="w-full py-4 text-sm"
            />
          </div>

          {progress !== null && (
            <p className="text-sm text-foreground/60">Uploading... {Math.round(progress)}%</p>
          )}
          {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
          {uploadedPath && (
            <p className="text-sm text-foreground/70">
              已上传：<span className="font-semibold">{uploadedPath}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={progress !== null}
            className="w-full h-12 rounded-pill bg-[var(--accent)] text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {progress !== null ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </section>
  )
}
