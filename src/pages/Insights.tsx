import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { getArticles, type Article } from '@/services/articles'
import pb from '@/lib/pocketbase/client'
import { ArrowRight } from 'lucide-react'

export default function Insights() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const featured = articles.length > 0 ? articles[0] : null
  const rest = articles.length > 1 ? articles.slice(1) : []

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section
        className="py-32 relative bg-fixed bg-cover bg-center border-b border-border"
        style={{ backgroundImage: `url('https://i.postimg.cc/Y2vzQnbp/BLOG_PAGE.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0D0D0D]/85" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg break-words">
              Blog Técnico & Inteligência
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-sans">
              Artigos, análises e tendências sobre alta performance empresarial e certificações
              internacionais.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {featured && (
                <Reveal>
                  <div className="mb-20">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-8 border-b border-border pb-4 uppercase tracking-wide">
                      Destaque
                    </h2>
                    <Link
                      to={`/insights/${featured.slug}`}
                      className="relative rounded-2xl overflow-hidden flex flex-col justify-end min-h-[450px] md:min-h-[500px] border-2 border-border hover:border-primary transition-colors duration-500 group block"
                    >
                      <img
                        src={
                          featured.image
                            ? pb.files.getUrl(featured, featured.image)
                            : 'https://img.usecurling.com/p/1200/600?q=corporate%20strategy&color=black'
                        }
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                      <div className="relative z-10 p-6 md:p-10 max-w-4xl">
                        <div className="text-primary font-bold text-xs md:text-sm uppercase tracking-widest mb-3 font-sans">
                          {featured.category || 'Estratégia'}
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors uppercase tracking-wide leading-tight">
                          {featured.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-lg line-clamp-3 md:line-clamp-2 font-sans mb-6">
                          {featured.summary}
                        </p>
                        <span className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                          Ler Artigo Completo <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </Reveal>
              )}

              {rest.length > 0 && (
                <>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-8 border-b border-border pb-4 uppercase tracking-wide">
                    Últimos Artigos
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((article, i) => (
                      <Reveal key={article.id} delay={i * 100}>
                        <Link
                          to={`/insights/${article.slug}`}
                          className="group h-full bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-colors duration-300 flex flex-col block"
                        >
                          <div className="aspect-video overflow-hidden relative">
                            <img
                              src={
                                article.image
                                  ? pb.files.getUrl(article, article.image)
                                  : `https://img.usecurling.com/p/600/400?q=business&color=black&seed=${i}`
                              }
                              alt={article.title}
                              className="w-full h-full object-cover object-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                          </div>
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3 font-sans">
                              {article.category || 'Insights'}
                            </div>
                            <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide leading-tight mb-4">
                              {article.title}
                            </h4>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                              {article.summary}
                            </p>
                            <span className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm mt-auto">
                              Ler Mais <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </>
              )}

              {!featured && !rest.length && (
                <div className="text-center py-20 text-muted-foreground">
                  Nenhum artigo publicado ainda.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
