import pb from '@/lib/pocketbase/client'

export interface Article {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  category: string
  image: string
  is_highlighted?: boolean
  published_date: string
  created: string
  updated: string
}

export const getArticles = () =>
  pb.collection('articles').getFullList<Article>({ sort: '-published_date' })

export const getArticleBySlug = (slug: string) =>
  pb.collection('articles').getFirstListItem<Article>(`slug="${slug}"`)
