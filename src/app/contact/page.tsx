import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ContactForm from '@/components/contact/ContactForm'

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-hero mb-20">Let&apos;s build something together</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/40">Location</h3>
                  <p className="text-2xl md:text-3xl font-display font-medium">Las Vegas · UTC-8</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/40">Social</h3>
                  <div className="flex flex-col">
                    <a href="https://github.com" target="_blank" className="group flex items-center justify-between py-5 border-b border-black/5 dark:border-white/10">
                      <span className="text-xl md:text-2xl font-display font-medium">GitHub</span>
                      <span className="text-foreground/40 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" className="group flex items-center justify-between py-5 border-b border-black/5 dark:border-white/10">
                      <span className="text-xl md:text-2xl font-display font-medium">Twitter / X</span>
                      <span className="text-foreground/40 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" className="group flex items-center justify-between py-5 border-b border-black/5 dark:border-white/10">
                      <span className="text-xl md:text-2xl font-display font-medium">LinkedIn</span>
                      <span className="text-foreground/40 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a href="mailto:hello@example.com" className="group flex items-center justify-between py-5 border-b border-black/5 dark:border-white/10">
                      <span className="text-xl md:text-2xl font-display font-medium">Email</span>
                      <span className="text-foreground/40 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-10 bg-apple-gray/60 dark:bg-zinc-900/50 p-10 md:p-12 rounded-apple border border-black/5 dark:border-white/10">
                <h2 className="text-2xl md:text-3xl font-display font-semibold">Start a project</h2>
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
