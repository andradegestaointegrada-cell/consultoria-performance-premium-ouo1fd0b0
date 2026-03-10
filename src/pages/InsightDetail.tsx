import { Link, useParams, Navigate } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react'
import { insightsData } from '@/data/insights'

export default function InsightDetail() {
  const { slug } = useParams()

  // Fallback to the first article (ISO 9001) if the specific slug is not defined in our detailed data yet
  const article =
    slug && insightsData[slug] ? insightsData[slug] : insightsData['o-futuro-da-qualidade']

  if (!article) return <Navigate to="/insights" replace />

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
                {article.category}
              </span>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                {article.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide leading-tight">
              {article.title}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 border-2 border-border">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
            <p className="text-xl md:text-2xl text-foreground font-medium mb-10 leading-relaxed">
              {article.intro}
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              {article.pillarsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {article.pillars.map((pillar: any, i: number) => (
                <div
                  key={i}
                  className="bg-card p-6 md:p-8 rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <h3 className="text-primary font-bold text-xl mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              {article.tableTitle}
            </h2>
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-primary text-foreground uppercase tracking-wider text-sm">
                    {article.tableHeaders.map((header: string, i: number) => (
                      <th key={i} className="py-4 px-4 font-bold w-1/3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {article.tableRows.map((row: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-foreground">{row.label}</td>
                      <td className="py-4 px-4">{row.old}</td>
                      <td className="py-4 px-4 font-semibold text-primary">{row.new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              {article.conclusionTitle}
            </h2>
            <p className="mb-8">{article.conclusionText}</p>
            <ul className="space-y-4 my-8">
              {article.bullets.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-8 md:p-12 my-16 text-center shadow-[0_0_30px_rgba(207,174,112,0.15)]">
              <div className="text-6xl md:text-8xl font-heading font-bold text-primary mb-6 drop-shadow-sm">
                {article.statsNumber}
              </div>
              <p className="text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                {article.statsTitle}
              </p>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">{article.statsDesc}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-20 p-8 md:p-16 bg-card rounded-2xl border-2 border-primary text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                {article.ctaTitle}
              </h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {article.ctaText}
              </p>
              <Button
                size="lg"
                asChild
                className="h-14 px-10 text-base uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(207,174,112,0.3)]"
              >
                {article.ctaLink.startsWith('mailto:') ? (
                  <a href={article.ctaLink}>
                    {article.ctaBtnText}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </a>
                ) : (
                  <Link to={article.ctaLink}>
                    {article.ctaBtnText}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  )
}
