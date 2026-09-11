import fs from 'fs'
import path from 'path'

export type Post = {
  slug: string
  title: string
  date: string
  readingTime: string
  category: string
}

function parseFrontmatter(text: string): Record<string, string> | null {
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1)
    }
    meta[key] = value
  }
  return meta
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const meta = parseFrontmatter(fileContents)

      if (!meta?.title || !meta?.date || !meta?.readingTime || !meta?.category) {
        return null
      }

      return {
        slug,
        title: meta.title,
        date: meta.date,
        readingTime: meta.readingTime,
        category: meta.category,
      }
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPost(slug: string) {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug)
}

export async function getPostContent(slug: string) {
  const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
  return fs.readFileSync(fullPath, 'utf8')
}
