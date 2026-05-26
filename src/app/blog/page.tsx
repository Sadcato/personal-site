import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getAllPosts } from '@/lib/posts'

export default function Blog() {
  const posts = getAllPosts()
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-hero mb-20">博客</h1>
          </ScrollReveal>

          <div className="max-w-4xl space-y-20">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold uppercase tracking-widest text-foreground/40">
                          {post.date}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-widest text-apple-blue">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-4xl font-display font-semibold group-hover:text-apple-blue transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-foreground/40">
                        {post.readingTime}
                      </p>
                    </div>
                    <div className="text-apple-blue font-semibold group-hover:translate-x-2 transition-transform">
                      阅读更多 →
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
