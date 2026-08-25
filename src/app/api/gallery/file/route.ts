import { get } from '@vercel/blob'
import { NextResponse, type NextRequest } from 'next/server'
import { getBlobAccess, isAllowedGalleryPath } from '@/lib/blob-gallery'

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get('pathname')
    if (!pathname) {
      return NextResponse.json({ error: 'Missing pathname' }, { status: 400 })
    }

    if (!isAllowedGalleryPath(pathname)) {
      return new NextResponse('Not found', { status: 404 })
    }

    const result = await get(pathname, {
      access: getBlobAccess(),
      ifNoneMatch: request.headers.get('if-none-match') ?? undefined,
    })

    if (result === null) {
      return new NextResponse('Not found', { status: 404 })
    }

    if (result.statusCode === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: result.blob.etag,
        },
      })
    }

    return new NextResponse(result.stream, {
      headers: {
        'Cache-Control': 'private, no-cache',
        'Content-Type': result.blob.contentType,
        'X-Content-Type-Options': 'nosniff',
        ETag: result.blob.etag,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load blob' },
      { status: 403 }
    )
  }
}
