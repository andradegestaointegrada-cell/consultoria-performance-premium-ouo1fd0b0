import { Reveal } from '@/components/ui/reveal'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, Zap, Users, LineChart } from 'lucide-react'

const pillars = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Conformidade',
    desc: 'Aderência estrita aos mais altos padrões globais de qualidade e segurança.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Performance',
    desc: 'Otimização contínua de processos para máxima eficiência operacional.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Cultura',
    desc: 'Engajamento e transformação cultural focada em excelência.',
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: 'Evidências',
    desc: 'Decisões baseadas em dados concretos e métricas de desempenho.',
  },
]

export function Pillars() {
  return (
    <section className="py-24 bg-card relative">
      <div className="container px-4 mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
              Nossos Pilares
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A fundação da nossa metodologia é construída sobre quatro princípios inegociáveis.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <Reveal key={i} delay={i * 100}>
              <Card className="bg-background border-border hover:border-primary transition-all duration-300 hover:-translate-y-2 h-full group">
                <CardContent className="p-8 flex flex-col items-start">
                  <div className="p-4 rounded-full bg-secondary border border-border mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
