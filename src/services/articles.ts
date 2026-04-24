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
  pb.collection('articles').getFullList<Article>({ sort: '-created' })

export const getArticleBySlug = (slug: string) =>
  pb.collection('articles').getFirstListItem<Article>(`slug="${slug}"`)

export const getArticleImage = (article: Article) => {
  if (article.image) return pb.files.getUrl(article, article.image)

  if (article.slug.includes('14001')) {
    return 'https://img.usecurling.com/p/1200/600?q=environment%20corporate&color=black'
  }
  if (article.slug.includes('9001')) {
    return 'https://img.usecurling.com/p/1200/600?q=quality%20management&color=black'
  }
  if (article.slug.includes('lideranca')) {
    return 'https://img.usecurling.com/p/1200/600?q=corporate%20leadership&color=black'
  }
  if (article.slug.includes('pit-stop')) {
    return 'https://img.usecurling.com/p/1200/600?q=f1%20pit%20stop&color=black'
  }

  return `https://img.usecurling.com/p/1200/600?q=business&color=black&seed=${article.id}`
}
