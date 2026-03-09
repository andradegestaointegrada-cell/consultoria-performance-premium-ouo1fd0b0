import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Card, CardContent } from '@/components/ui/card'

const allServices = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    name: 'Gestão da Qualidade',
    desc: 'Excelência operacional e satisfação do cliente.',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    name: 'Gestão Ambiental',
    desc: 'Sustentabilidade e compliance regulatório.',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    name: 'Saúde e Segurança',
    desc: 'Ambiente de trabalho seguro e prevenção de riscos.',
  },
  {
    id: 'iso-17020',
    title: 'ISO 17020',
    name: 'Inspeção',
    desc: 'Critérios rigorosos para organismos de inspeção.',
  },
  {
    id: 'iso-17025',
    title: 'ISO 17025',
    name: 'Laboratórios',
    desc: 'Competência técnica para testes e calibração.',
  },
  {
    id: 'consultoria-estrategica',
    title: 'Consultoria',
    name: 'Estratégica',
    desc: 'Mentoria executiva e planejamento de alto nível.',
  },
]

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Catálogo de <em className="font-heading italic font-normal text-primary">Serviços</em>
            </h1>
            <p className="text-xl text-muted-foreground">
              Soluções projetadas para elevar sua empresa aos padrões globais de excelência, com
              precisão técnica e foco no negócio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 100}>
                <Link to={`/servicos/${svc.id}`} className="block h-full group">
                  <Card className="h-full bg-card hover:bg-card/90 border-2 border-border hover:border-primary transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary rounded-bl-[100px] transition-transform duration-500 group-hover:scale-150 opacity-50" />
                    <CardContent className="p-8 relative z-10">
                      <div className="text-primary font-bold text-sm mb-2 tracking-widest uppercase">
                        {svc.title}
                      </div>
                      <h3 className="text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors uppercase tracking-wide">
                        {svc.name}
                      </h3>
                      <p className="text-muted-foreground">{svc.desc}</p>
                      <div className="mt-8 flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                        Explorar solução{' '}
                        <span className="ml-2 group-hover:translate-x-2 transition-transform">
                          →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
