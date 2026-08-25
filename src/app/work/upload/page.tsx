import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GalleryUploadClient from './upload-client'

export const metadata: Metadata = {
  title: 'Upload gallery photos',
  robots: { index: false, follow: false },
}

export default function GalleryUploadPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <GalleryUploadClient />
      <Footer />
    </main>
  )
}
