import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import FeaturedWork from '@/components/home/FeaturedWork'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 hero-mesh opacity-75" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-x-0 top-0 h-[45rem] bg-gradient-to-b from-background/20 to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturedWork />
        <Testimonials />
        <Footer />
      </div>
    </main>
  )
}
