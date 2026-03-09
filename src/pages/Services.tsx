import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Card, CardContent } from '@/components/ui/card'

const allServices = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    name: 'Gestão da Qualidade',
    desc: 'Excelência operacional e satisfação do cliente em todos os processos da organização.',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    name: 'Gestão Ambiental',
    desc: 'Sustentabilidade, compliance regulatório e redução de impactos ambientais.',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    name: 'Saúde e Segurança',
    desc: 'Ambiente de trabalho seguro, prevenção de acidentes e gestão de riscos ocupacionais.',
  },
  {
    id: 'iso-17020',
    title: 'ISO/IEC 17020',
    name: 'Organismos de Inspeção',
    desc: 'Critérios rigorosos para garantir a competência e imparcialidade dos organismos de inspeção.',
  },
  {
    id: 'iso-17025',
    title: 'ISO/IEC 17025',
    name: 'Laboratórios de Ensaio e Calibração',
    desc: 'Competência técnica para testes, calibração e resultados consistentes globalmente.',
  },
  {
    id: 'iatf-16949',
    title: 'IATF 16949',
    name: 'Gestão da Qualidade Automotiva',
    desc: 'Requisitos específicos e rigorosos para a cadeia de suprimentos da indústria automotiva.',
  },
  {
    id: 'pbqp-h',
    title: 'PBQP-H',
    name: 'Programa de Qualidade do Habitat',
    desc: 'Melhoria da qualidade, produtividade e sustentabilidade no setor da construção civil.',
  },
  {
    id: 'sassmaq',
    title: 'SASSMAQ',
    name: 'Logística Segura de Químicos',
    desc: 'Avaliação de segurança, saúde, meio ambiente e qualidade para o transporte de produtos químicos.',
  },
]

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Especialidades e{' '}
              <em className="font-heading italic font-normal text-primary">Certificações</em>
            </h1>
            <p className="text-xl text-muted-foreground">
              Com flexibilidade operacional, adaptamos nossas soluções em sistemas de gestão para
              oferecer desde suporte técnico colaborativo até o gerenciamento completo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 50}>
                <Link to={`/servicos/${svc.id}`} className="block h-full group">
                  <Card className="h-full bg-card hover:bg-card/90 border-2 border-border hover:border-primary transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary rounded-bl-[100px] transition-transform duration-500 group-hover:scale-150 opacity-50" />
                    <CardContent className="p-8 relative z-10 flex flex-col h-full">
                      <div className="text-primary font-bold text-sm mb-2 tracking-widest uppercase">
                        {svc.title}
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors uppercase tracking-wide">
                        {svc.name}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-grow">{svc.desc}</p>
                      <div className="mt-8 flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                        Ver Mais{' '}
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
