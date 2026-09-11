import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getPost, getPostContent, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = getPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const content = await getPostContent(slug)
  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n\n/, '')
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="space-y-8 mb-20">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground/40">
                  {post.date}
                </span>
                <span className="text-sm font-semibold uppercase tracking-widest text-apple-blue">
                  {post.category}
                </span>
              </div>
              <h1 className="text-hero text-5xl md:text-7xl">{post.title}</h1>
              <p className="text-sm text-foreground/40">
                {post.readingTime}
              </p>
            </div>

            <article className="prose prose-xl prose-zinc dark:prose-invert max-w-none">
              <MDXRemote source={contentWithoutFrontmatter} />
            </article>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
