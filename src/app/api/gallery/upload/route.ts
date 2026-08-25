import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { getGalleryRootPrefix, isAllowedGalleryPath } from '@/lib/blob-gallery'
import { assertGalleryUploadAuthorized } from '@/lib/gallery-auth'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        assertGalleryUploadAuthorized(request)

        const root = getGalleryRootPrefix()
        if (!pathname.startsWith(root) || !isAllowedGalleryPath(pathname)) {
          throw new Error(`Uploads must use the ${root} prefix`)
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: false,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('gallery upload completed', blob.pathname)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 }
    )
  }
}
