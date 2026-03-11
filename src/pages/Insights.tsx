import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'

const articles = [
  {
    title: 'O Futuro da Qualidade',
    slug: 'o-futuro-da-qualidade',
    category: 'ISO Standards',
    img: 'https://img.usecurling.com/p/600/400?q=future%20technology&color=black',
  },
  {
    title: 'Sustentabilidade Corporativa',
    slug: 'sustentabilidade-corporativa',
    category: 'Engineering Certifications',
    img: 'https://img.usecurling.com/p/600/400?q=green%20city&color=black',
  },
  {
    title: 'Liderança e Segurança',
    slug: 'lideranca-e-seguranca',
    category: 'ISO Standards',
    img: 'https://img.usecurling.com/p/600/400?q=construction%20leadership&color=black',
  },
  {
    title: 'A Metáfora do Pit Stop',
    slug: 'a-metafora-do-pit-stop',
    category: 'Performance Management',
    img: 'https://i.postimg.cc/fWxG1CV5/PIT-STOP-01.jpg',
  },
]

export default function Insights() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Blog Técnico & Inteligência
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Artigos, análises e tendências sobre alta performance empresarial e certificações
              internacionais.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8 border-b border-border pb-4 uppercase tracking-wide">
                Destaque
              </h2>
              <Link
                to="/insights/a-metafora-do-pit-stop"
                className="relative rounded-2xl overflow-hidden flex flex-col justify-end min-h-[450px] md:min-h-[500px] border-2 border-border hover:border-primary transition-colors duration-500 group cursor-pointer block"
              >
                <img
                  src="https://i.postimg.cc/fWxG1CV5/PIT-STOP-01.jpg"
                  alt="Pitstop"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent md:via-background/70" />
                <div className="relative z-10 p-6 md:p-10 max-w-4xl">
                  <div className="text-primary font-bold text-xs md:text-sm uppercase tracking-widest mb-3">
                    Performance Management
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors uppercase tracking-wide leading-tight">
                    A Metáfora do Pit Stop na Otimização de Processos Empresariais
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-lg line-clamp-3 md:line-clamp-2">
                    Como aplicar a precisão milimétrica e o trabalho em equipe do automobilismo de
                    elite para reduzir gargalos e aumentar a eficiência operacional.
                  </p>
                </div>
              </Link>
            </div>
          </Reveal>

          <h2 className="text-2xl font-heading font-bold text-foreground mb-8 border-b border-border pb-4 uppercase tracking-wide">
            Últimos Artigos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link
                  to={`/insights/${article.slug}`}
                  className="group cursor-pointer h-full bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-colors duration-300 flex flex-col block"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                      {article.category}
                    </div>
                    <h4 className="text-xl md:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide leading-tight mt-auto">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
