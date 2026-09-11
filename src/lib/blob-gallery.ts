import { list } from '@vercel/blob'
import type { GalleryCategory, GalleryItem } from './gallery'

const IMAGE_EXT = /\.(png|jpg|jpeg|webp|gif|avif)$/i

export function getBlobAccess(): 'private' {
  return 'private'
}

export function getGalleryRootPrefix() {
  const prefix = process.env.GALLERY_BLOB_PREFIX ?? 'photos/'
  return prefix.endsWith('/') ? prefix : `${prefix}/`
}

function categoryPrefix(category: GalleryCategory) {
  const map: Record<GalleryCategory, string> = {
    People: process.env.GALLERY_PREFIX_PEOPLE ?? '',
    Animals: process.env.GALLERY_PREFIX_ANIMALS ?? '',
    Landscapes: process.env.GALLERY_PREFIX_LANDSCAPES ?? '',
  }
  return map[category]
}

export function isAllowedGalleryPath(pathname: string) {
  const root = getGalleryRootPrefix()
  if (pathname.startsWith(root) && !pathname.includes('..')) return true

  const prefixes = [
    process.env.GALLERY_PREFIX_PEOPLE,
    process.env.GALLERY_PREFIX_ANIMALS,
    process.env.GALLERY_PREFIX_LANDSCAPES,
  ].filter((p): p is string => Boolean(p))

  return prefixes.some((prefix) => pathname.startsWith(prefix) && !pathname.includes('..'))
}

function galleryUrl(pathname: string) {
  return `/api/gallery/file?pathname=${encodeURIComponent(pathname)}`
}

export async function listGalleryItems(category: GalleryCategory, limit = 60): Promise<GalleryItem[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL_OIDC_TOKEN) {
    // Silently skip when Blob is not configured (local dev)
    return []
  }

  try {
    const prefix = categoryPrefix(category) || getGalleryRootPrefix()
    const blobs: Awaited<ReturnType<typeof list>>['blobs'] = []
    let cursor: string | undefined

    do {
      const page = await list({
        prefix,
        limit: Math.min(limit, 1000),
        cursor,
      })
      blobs.push(...page.blobs)
      cursor = page.hasMore ? page.cursor : undefined
    } while (cursor && blobs.length < limit)

    return blobs
      .filter((blob) => IMAGE_EXT.test(blob.pathname))
      .slice(0, limit)
      .map((blob) => ({
        key: blob.pathname,
        url: galleryUrl(blob.pathname),
        category,
      }))
  } catch (error) {
    console.warn(
      `[BLOB-FETCH] Error listing ${category}:`,
      error instanceof Error ? error.message : error
    )
    return []
  }
}
