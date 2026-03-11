import { Reveal } from '@/components/ui/reveal'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Briefcase, CheckCircle, BarChart } from 'lucide-react'

export default function Cases() {
  const casesData = [
    {
      title: 'Engenharia e Construção',
      scope: 'ISO 9001 e PBQP-H',
      details:
        'Implementação de sistema de gestão da qualidade robusto com foco em controle tecnológico de materiais, rastreabilidade no canteiro de obras e qualificação de fornecedores estratégicos.',
      results:
        'Redução de 30% no desperdício de materiais, homologação em licitações públicas de grande porte e certificação alcançada em um tempo recorde de 6 meses.',
      testimonial:
        'A Andrade Gestão transformou nossa operação. A clareza na metodologia e o acompanhamento próximo no canteiro de obras nos garantiram a certificação e uma economia real que impactou nossa margem de lucro diretamente.',
      image: 'https://img.usecurling.com/p/800/600?q=engineering%20construction&color=black',
    },
    {
      title: 'Logística e Distribuição',
      scope: 'ISO 14001 e ISO 45001',
      details:
        'Integração de práticas de sustentabilidade ambiental e segurança ocupacional, mapeamento completo de riscos nas rotas de transporte e reestruturação do plano de emergência ambiental.',
      results:
        'Zero acidentes de trabalho com afastamento em 12 meses, redução de 20% na pegada de carbono da frota e conformidade total com exigências de multinacionais parceiras.',
      testimonial:
        'Nossa cultura de segurança atingiu um novo patamar. O time da Andrade trouxe uma visão estratégica que não apenas garantiu as certificações, mas mudou o comportamento dos nossos motoristas e operadores de forma definitiva.',
      image: 'https://img.usecurling.com/p/800/600?q=logistics%20trucks&color=black',
    },
  ]

  return (
    <div className="pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Cases de <em className="font-heading italic font-normal text-primary">Sucesso</em>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Resultados reais e mensuráveis conquistados através de nossa metodologia de excelência
              e foco em performance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          {casesData.map((c, idx) => (
            <Reveal key={idx} delay={100 * idx}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="aspect-video rounded-2xl overflow-hidden border-2 border-border shadow-2xl relative">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wide drop-shadow-md">
                        Setor: <span className="text-primary">{c.title}</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className={idx % 2 !== 0 ? 'md:order-1' : ''}>
                  <Card className="bg-card border-border shadow-xl h-full border-t-4 border-t-primary">
                    <CardContent className="p-8 space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2 text-primary font-bold uppercase tracking-widest">
                          <Briefcase className="h-5 w-5" />
                          <span>Escopo</span>
                        </div>
                        <p className="text-foreground font-semibold text-lg">{c.scope}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-2 text-primary font-bold uppercase tracking-widest">
                          <CheckCircle className="h-5 w-5" />
                          <span>Detalhes</span>
                        </div>
                        <p className="text-muted-foreground">{c.details}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-2 text-primary font-bold uppercase tracking-widest">
                          <BarChart className="h-5 w-5" />
                          <span>Resultado</span>
                        </div>
                        <p className="text-muted-foreground">{c.results}</p>
                      </div>

                      <div className="bg-secondary p-6 rounded-xl border-l-4 border-primary relative mt-8">
                        <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                        <p className="text-foreground italic relative z-10 leading-relaxed">
                          "{c.testimonial}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
