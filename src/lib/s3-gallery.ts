import * as crypto from 'crypto'
import type { GalleryCategory, GalleryItem } from './gallery'

function requiredEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

function getPrefix(category: GalleryCategory) {
  const map: Record<GalleryCategory, string> = {
    People: process.env.GALLERY_PREFIX_PEOPLE ?? '',
    Animals: process.env.GALLERY_PREFIX_ANIMALS ?? '',
    Landscapes: process.env.GALLERY_PREFIX_LANDSCAPES ?? '',
  }
  return map[category]
}

const IMAGE_EXT = /\.(png|jpg|jpeg|webp|gif|avif)$/i

export async function listGalleryItems(category: GalleryCategory, limit = 60): Promise<GalleryItem[]> {
  try {
    const endpoint = requiredEnv('S3_ENDPOINT')
    const bucket = requiredEnv('S3_BUCKET')
    const accessKeyId = requiredEnv('S3_ACCESS_KEY_ID')
    const secretAccessKey = requiredEnv('S3_SECRET_ACCESS_KEY')
    const publicRead = (process.env.S3_PUBLIC_READ ?? 'false').toLowerCase() === 'true'

    const prefix = getPrefix(category)
    console.log(`[S3-FETCH] Listing ${category} from bucket="${bucket}", prefix="${prefix}", publicRead=${publicRead}`)

    // Build ListObjectsV2 request URL
    const listUrl = new URL(`${endpoint}/${bucket}`)
    listUrl.searchParams.set('list-type', '2')
    listUrl.searchParams.set('prefix', prefix)
    listUrl.searchParams.set('max-keys', String(Math.min(limit, 200)))

    // Sign the request with AWS Signature V4
    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]/g, '').replace(/\.\d{3}/, '')
    const dateStamp = amzDate.slice(0, 8)

    const headers: Record<string, string> = {
      Host: new URL(endpoint).hostname,
      'X-Amz-Date': amzDate,
      'X-Amz-Content-Sha256': 'UNSIGNED-PAYLOAD',
    }

    const canonicalQueryString = Array.from(listUrl.searchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    const canonicalRequest = [
      'GET',
      `/${bucket}`,
      canonicalQueryString,
      Object.entries(headers)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k.toLowerCase()}:${v}`)
        .join('\n'),
      '',
      Object.keys(headers)
        .sort()
        .map((k) => k.toLowerCase())
        .join(';'),
      'UNSIGNED-PAYLOAD',
    ].join('\n')

    const canonicalRequestHash = crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    const credentialScope = `${dateStamp}/us-east-1/s3/aws4_request`
    const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, canonicalRequestHash].join('\n')

    const kDate = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(dateStamp).digest()
    const kRegion = crypto.createHmac('sha256', kDate).update('us-east-1').digest()
    const kService = crypto.createHmac('sha256', kRegion).update('s3').digest()
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest()
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')

    headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${Object.keys(headers)
      .sort()
      .map((k) => k.toLowerCase())
      .join(';')}, Signature=${signature}`

    console.log(`[S3-FETCH] Sending ListObjectsV2 request...`)
    const response = await fetch(listUrl.toString(), { headers })

    if (!response.ok) {
      throw new Error(`S3 ListObjectsV2 failed: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()
    console.log(`[S3-FETCH] Got response, parsing XML...`)

    // Parse XML to extract keys
    const keyMatches = xml.match(/<Key>([^<]+)<\/Key>/g) || []
    const keys = keyMatches
      .map((m) => m.replace(/<\/?Key>/g, ''))
      .filter((k) => IMAGE_EXT.test(k))
      .slice(0, limit)

    console.log(`[S3-FETCH] Found ${keys.length} image files in ${category}`)

    // Generate URLs
    const urls = keys.map((key) => {
      if (publicRead) {
        // Direct public URL (no signature needed)
        return `${endpoint}/${bucket}/${key
          .split('/')
          .map(encodeURIComponent)
          .join('/')}`
      }

      // For private buckets, generate signed URL with fresh timestamp
      const getUrl = new URL(`${endpoint}/${bucket}/${key}`)
      const getAmzDate = new Date().toISOString().replace(/[:-]/g, '').replace(/\.\d{3}/, '')
      const getDateStamp = getAmzDate.slice(0, 8)

      const getHeaders: Record<string, string> = {
        Host: new URL(endpoint).hostname,
        'X-Amz-Date': getAmzDate,
        'X-Amz-Content-Sha256': 'UNSIGNED-PAYLOAD',
      }

      const getCanonicalRequest = [
        'GET',
        `/${bucket}/${key}`,
        '',
        Object.entries(getHeaders)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k.toLowerCase()}:${v}`)
          .join('\n'),
        '',
        Object.keys(getHeaders)
          .sort()
          .map((k) => k.toLowerCase())
          .join(';'),
        'UNSIGNED-PAYLOAD',
      ].join('\n')

      const getCanonicalRequestHash = crypto.createHash('sha256').update(getCanonicalRequest).digest('hex')
      const getCredentialScope = `${getDateStamp}/us-east-1/s3/aws4_request`
      const getStringToSign = ['AWS4-HMAC-SHA256', getAmzDate, getCredentialScope, getCanonicalRequestHash].join('\n')

      const getKDate = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(getDateStamp).digest()
      const getKRegion = crypto.createHmac('sha256', getKDate).update('us-east-1').digest()
      const getKService = crypto.createHmac('sha256', getKRegion).update('s3').digest()
      const getKSigning = crypto.createHmac('sha256', getKService).update('aws4_request').digest()
      const getSignature = crypto.createHmac('sha256', getKSigning).update(getStringToSign).digest('hex')

      getUrl.searchParams.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256')
      getUrl.searchParams.set('X-Amz-Credential', `${accessKeyId}/${getCredentialScope}`)
      getUrl.searchParams.set('X-Amz-Date', getAmzDate)
      getUrl.searchParams.set('X-Amz-Expires', '600')
      getUrl.searchParams.set(
        'X-Amz-SignedHeaders',
        Object.keys(getHeaders)
          .sort()
          .map((k) => k.toLowerCase())
          .join(';')
      )
      getUrl.searchParams.set('X-Amz-Signature', getSignature)

      return getUrl.toString()
    })

    console.log(`[S3-FETCH] Generated ${urls.length} URLs for ${category}`)

    return keys.map((key, i) => ({
      key,
      url: urls[i]!,
      category,
    }))
  } catch (error) {
    console.error(`[S3-FETCH] Error listing ${category}:`, error instanceof Error ? error.message : error)
    return []
  }
}
