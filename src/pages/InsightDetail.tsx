import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { getArticleBySlug, getArticleImage, type Article } from '@/services/articles'

export default function InsightDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    getArticleBySlug(slug)
      .then((data) => {
        setArticle(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !article) return <Navigate to="/insights" replace />

  const formattedDate = new Date(article.published_date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      <article className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <div className="mb-8 mt-8">
            <Link
              to="/insights"
              className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Insights
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                {article.category || 'Insight Estratégico'}
              </span>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formattedDate}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide leading-tight">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-10 leading-relaxed border-l-4 border-primary pl-6">
                {article.summary}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-16 border-2 border-border">
            <img
              src={getArticleImage(article)}
              alt={article.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* Custom scoped styling for raw HTML injected content without requiring Tailwind Typography plugin */}
          <div
            className="
              text-lg text-muted-foreground leading-relaxed mb-16
              [&>p]:mb-6
              [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-heading [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mb-6 [&>h2]:mt-16 [&>h2]:uppercase [&>h2]:tracking-wide [&>h2]:border-b [&>h2]:border-border [&>h2]:pb-4
              [&>h3]:text-2xl [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mb-4 [&>h3]:mt-10 [&>h3]:uppercase [&>h3]:tracking-wide
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-4
              [&>ul>li>strong]:text-primary [&>ul>li>strong]:font-bold
              [&>strong]:text-foreground [&>strong]:font-semibold
              [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80
              [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-xl
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-20 p-8 md:p-12 bg-card rounded-2xl border-2 border-primary text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                Diagnóstico Especializado
              </h3>
              <p className="text-lg md:text-xl text-foreground font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
                &rarr; Entre em contato com a AGI e descubra como conduzir a transição para a ISO
                14001:2026 de forma planejada, eficiente e alinhada aos objetivos do seu negócio.
              </p>
              <Button
                size="lg"
                asChild
                className="h-14 px-10 text-base uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(207,174,112,0.3)] hover:scale-105 transition-transform"
              >
                <Link to="/contato">
                  Fale com um Especialista
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  )
}
