export type GalleryCategory = 'People' | 'Animals' | 'Landscapes'

export type GalleryItem = {
  key: string
  url: string
  category: GalleryCategory
  width?: number
  height?: number
}

export const galleryCategories: Array<{
  label: string
  value: 'All' | GalleryCategory
  prefixEnv: string
}> = [
  { label: '全部', value: 'All', prefixEnv: '' },
  { label: '人物', value: 'People', prefixEnv: 'GALLERY_PREFIX_PEOPLE' },
  { label: '动物', value: 'Animals', prefixEnv: 'GALLERY_PREFIX_ANIMALS' },
  { label: '风光', value: 'Landscapes', prefixEnv: 'GALLERY_PREFIX_LANDSCAPES' },
]

