import fs from 'fs'
import path from 'path'

export type Post = {
  slug: string
  title: string
  date: string
  readingTime: string
  category: string
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const metaMatch = fileContents.match(/export const meta = ({[\s\S]*?})/m)
      if (!metaMatch) {
        return null
      }
      
      const metaString = metaMatch[1]
      const titleMatch = metaString.match(/title:\s*['"](.+?)['"]/m)
      const dateMatch = metaString.match(/date:\s*['"](.+?)['"]/m)
      const readingTimeMatch = metaString.match(/readingTime:\s*['"](.+?)['"]/m)
      const categoryMatch = metaString.match(/category:\s*['"](.+?)['"]/m)
      
      if (!titleMatch || !dateMatch || !readingTimeMatch || !categoryMatch) {
        return null
      }
      
      return {
        slug,
        title: titleMatch[1],
        date: dateMatch[1],
        readingTime: readingTimeMatch[1],
        category: categoryMatch[1],
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
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
}
