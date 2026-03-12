import { Reveal } from '@/components/ui/reveal'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldAlert, AlertTriangle, Users, Settings, Leaf, HardHat, GitMerge } from 'lucide-react'

export default function Methodology() {
  const trainingPillars = [
    {
      title: 'Gestão de Riscos e Oportunidades',
      icon: <ShieldAlert className="h-8 w-8 text-primary" />,
      desc: 'Mapeamento preditivo de cenários para mitigar ameaças operacionais e capturar vantagens competitivas no mercado.',
    },
    {
      title: 'Tratamento de Não Conformidades',
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      desc: 'Aplicação de metodologias ágeis (MASP/8D) para investigar causas raízes e implementar ações corretivas definitivas.',
    },
    {
      title: 'NR 05 (CIPA)',
      icon: <Users className="h-8 w-8 text-primary" />,
      desc: 'Formação e treinamento da Comissão Interna de Prevenção de Acidentes, promovendo uma cultura contínua de segurança.',
    },
    {
      title: 'NR 17 (Ergonomia)',
      icon: <Settings className="h-8 w-8 text-primary" />,
      desc: 'Avaliação ergonômica do trabalho para adequar as condições operacionais às características psicofisiológicas dos trabalhadores.',
    },
    {
      title: 'Levantamento de Aspectos e Impactos Ambientais',
      icon: <Leaf className="h-8 w-8 text-primary" />,
      desc: 'Identificação sistemática da interação das atividades da empresa com o meio ambiente para garantir conformidade sustentável.',
    },
    {
      title: 'Levantamento de Perigos e Riscos de SSO',
      icon: <HardHat className="h-8 w-8 text-primary" />,
      desc: 'Inventário rigoroso de riscos ocupacionais (GRO/PGR) visando a eliminação de acidentes e preservação da saúde.',
    },
    {
      title: 'Gestão de Mudanças',
      icon: <GitMerge className="h-8 w-8 text-primary" />,
      desc: 'Controle estruturado sobre alterações organizacionais, tecnológicas ou de processos para evitar quebras de performance.',
    },
  ]

  return (
    <div className="pt-20">
      <section
        className="py-32 relative bg-fixed bg-cover bg-center border-b border-border"
        style={{ backgroundImage: `url('https://i.postimg.cc/3wVpJ7pq/M451945treinamento.webp')` }}
      >
        <div className="absolute inset-0 bg-[#0D0D0D]/85" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg">
              Metodologia de{' '}
              <em className="font-heading italic font-normal text-primary">Treinamento</em>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md font-sans">
              Nossos pilares de capacitação técnica são estruturados para transferir conhecimento
              profundo à sua equipe, garantindo autonomia, segurança e aderência contínua às normas
              internacionais.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:-translate-y-2 h-full group">
                  <CardContent className="p-8 flex flex-col items-start h-full">
                    <div className="p-4 rounded-xl bg-secondary border border-border mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow font-sans">
                      {pillar.desc}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-20 p-10 bg-secondary rounded-2xl border border-border text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden transition-all duration-500 hover:shadow-glow hover:border-primary/50 hover:-translate-y-1 group cursor-default">
              <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1920/600?q=pattern&color=black')] opacity-5 mix-blend-overlay pointer-events-none group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary uppercase tracking-wide mb-4 drop-shadow-sm transition-colors duration-300">
                  Excelência Operacional Contínua
                </h3>
                <p className="text-muted-foreground text-lg font-sans transition-colors duration-300 group-hover:text-foreground/80">
                  Todos os treinamentos são documentados e ministrados por especialistas com
                  vivência prática de mercado, assegurando que a teoria se transforme em resultados
                  no dia a dia da sua organização.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
