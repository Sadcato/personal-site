export type ProjectCategory = 'Design' | 'Development' | 'Motion'

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  year: string
  description: string
  tech: string[]
  image: string
  link: string
}

export const projects: Project[] = [
  {
    id: 'apollo-01',
    title: 'Apollo Commerce',
    category: 'Development',
    year: '2025',
    description: 'A high-performance storefront with refined motion and editorial layout.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    image: 'https://picsum.photos/seed/apollo/1600/900',
    link: 'https://example.com',
  },
  {
    id: 'glass-02',
    title: 'Glass Notes',
    category: 'Design',
    year: '2025',
    description: 'Apple-inspired design system primitives with strict spacing and typography rules.',
    tech: ['Figma', 'Design System', 'Tokens'],
    image: 'https://picsum.photos/seed/glass/1600/900',
    link: 'https://example.com',
  },
  {
    id: 'motion-03',
    title: 'Kinetic Intro',
    category: 'Motion',
    year: '2024',
    description: 'A motion-first landing experience built with Framer Motion and scroll transforms.',
    tech: ['Framer Motion', 'Next.js', 'Rive'],
    image: 'https://picsum.photos/seed/kinetic/1600/900',
    link: 'https://example.com',
  },
  {
    id: 'editorial-04',
    title: 'Editorial Bio',
    category: 'Design',
    year: '2024',
    description: 'An executive bio page layout with restraint, hierarchy, and clarity.',
    tech: ['Typography', 'Layout', 'Content'],
    image: 'https://picsum.photos/seed/editorial/1600/900',
    link: 'https://example.com',
  },
  {
    id: 'studio-05',
    title: 'Studio Scheduler',
    category: 'Development',
    year: '2024',
    description: 'A scheduling dashboard with clean information density and fast interactions.',
    tech: ['React', 'Server Actions', 'Postgres'],
    image: 'https://picsum.photos/seed/scheduler/1600/900',
    link: 'https://example.com',
  },
  {
    id: 'reel-06',
    title: 'Motion Reel',
    category: 'Motion',
    year: '2023',
    description: 'A lightweight reel layout with subtle hover and drag interactions.',
    tech: ['CSS', 'Framer Motion', 'Video'],
    image: 'https://picsum.photos/seed/reel/1600/900',
    link: 'https://example.com',
  },
]

export const workFilters: Array<{ label: string; value: 'All' | ProjectCategory }> = [
  { label: 'All', value: 'All' },
  { label: 'Design', value: 'Design' },
  { label: 'Development', value: 'Development' },
  { label: 'Motion', value: 'Motion' },
]
