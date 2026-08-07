import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GalleryClient from './gallery-client'
import { listGalleryItems } from '@/lib/s3-gallery'
import type { GalleryItem } from '@/lib/gallery'

export default function Work() {
  // Server Component: fetch from S3-compatible storage
  const flatBucket =
    (process.env.GALLERY_PREFIX_PEOPLE ?? '') === '' &&
    (process.env.GALLERY_PREFIX_ANIMALS ?? '') === '' &&
    (process.env.GALLERY_PREFIX_LANDSCAPES ?? '') === ''

  const itemsPromise = flatBucket
    ? listGalleryItems('People', 200)
    : Promise.all([
        listGalleryItems('People', 48),
        listGalleryItems('Animals', 48),
        listGalleryItems('Landscapes', 48),
      ]).then((all) => all.flat())

  return (
    <main className="min-h-screen">
      <Navbar />
      <GallerySection itemsPromise={itemsPromise} />
      <Footer />
    </main>
  )
}

async function GallerySection({ itemsPromise }: { itemsPromise: Promise<GalleryItem[]> }) {
  const items = await itemsPromise.catch(() => [])
  const showFilters =
    (process.env.GALLERY_PREFIX_PEOPLE ?? '') !== '' ||
    (process.env.GALLERY_PREFIX_ANIMALS ?? '') !== '' ||
    (process.env.GALLERY_PREFIX_LANDSCAPES ?? '') !== ''
  return <GalleryClient initialItems={items} showFilters={showFilters} />
}
