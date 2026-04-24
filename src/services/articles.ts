import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'

export interface Article extends RecordModel {
  title: string
  slug: string
  summary: string
  content: string
  category: string
  image: string
  published_date: string
  is_highlighted: boolean
}

export async function getArticles(): Promise<Article[]> {
  return pb.collection('articles').getFullList<Article>({
    sort: '-published_date',
  })
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  return pb.collection('articles').getFirstListItem<Article>(`slug="${slug}"`)
}

export function getArticleImage(article: Article): string {
  if (!article.image) {
    return 'https://i.postimg.cc/Y2vzQnbp/BLOG_PAGE.jpg'
  }

  if (article.image.startsWith('http://') || article.image.startsWith('https://')) {
    return article.image
  }

  return pb.files.getUrl(article, article.image)
}
