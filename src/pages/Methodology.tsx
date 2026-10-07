import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Settings, ClipboardCheck, TrendingUp } from 'lucide-react'
import metodologiaHero from '@/assets/metodologia/metodologia-hero.webp'

const phases = [
  {
    number: '01',
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Diagnóstico',
    subtitle: 'Onde estamos e onde precisamos chegar',
    desc: 'Mapeamos o estado atual da organização frente aos requisitos da norma. Levantamos processos, documentos existentes, lacunas e riscos. O resultado é um plano de ação claro com prioridades, prazos e esforço estimado — sem surpresas durante a implementação.',
    items: [
      'Análise de gap contra os requisitos da norma',
      'Mapeamento de processos críticos e interfaces',
      'Levantamento de documentação existente',
      'Plano de ação priorizado com cronograma',
    ],
  },
  {
    number: '02',
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: 'Implementação',
    subtitle: 'Construindo o sistema que funciona na prática',
    desc: 'Desenvolvemos os procedimentos, registros e controles necessários em conjunto com sua equipe — não como pilha de documentos, mas como processos que realmente orientam o trabalho. Treinamos as pessoas envolvidas e acompanhamos a operação do sistema desde o primeiro dia.',
    items: [
      'Elaboração de procedimentos e registros',
      'Treinamentos técnicos e de sensibilização',
      'Configuração dos controles operacionais',
      'Acompanhamento da implantação no dia a dia',
    ],
  },
  {
    number: '03',
    icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    title: 'Auditoria Interna',
    subtitle: 'Verificando a eficácia antes do certificador',
    desc: 'Realizamos a auditoria interna com critério e independência. Identificamos não conformidades, oportunidades de melhoria e pontos fortes. Apoiamos o tratamento de cada constatação — análise de causa, ação corretiva e verificação de eficácia — para que a empresa chegue à auditoria de certificação com confiança.',
    items: [
      'Auditoria interna conforme a norma (ISO 19011)',
      'Relatório de constatações por processo',
      'Apoio na análise de causa e plano de ação',
      'Preparação para a auditoria externa',
    ],
  },
  {
    number: '04',
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Evolução Contínua',
    subtitle: 'Mantendo o sistema vivo e gerando valor',
    desc: 'Certificação não é o fim — é o início da manutenção. Acompanhamos os ciclos de análise crítica, monitoramos indicadores, ajudamos a tratar não conformidades e incorporamos mudanças de norma. O sistema evolui junto com a empresa.',
    items: [
      'Monitoramento de indicadores e objetivos',
      'Análise crítica pela direção',
      'Atualizações de norma e mudanças organizacionais',
      'Preparação para recertificações e auditorias de manutenção',
    ],
  },
]

export default function Methodology() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-32 relative bg-[#091D39] bg-fixed bg-cover bg-center border-b border-border overflow-hidden"
        style={{ backgroundImage: `url('${metodologiaHero}')` }}
      >
        <div className="absolute inset-0 bg-[#091D39]/85" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 70% 50%, #CFAE70 0%, transparent 60%)` }}
        />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 font-sans">
              Nossa Metodologia
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg break-words">
              Método{' '}
              <em className="font-heading italic font-normal text-primary">AGI</em>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans max-w-3xl mx-auto">
              Quatro fases que levam sua organização do diagnóstico à certificação — e mantêm o
              sistema vivo depois dela.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Phases */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-24">
            {phases.map((phase, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className={`grid md:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  {/* Number + Icon */}
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl md:text-8xl font-heading font-bold text-primary/20 leading-none select-none">
                        {phase.number}
                      </span>
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        {phase.icon}
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide mb-1">
                      {phase.title}
                    </h2>
                    <p className="text-primary font-sans font-semibold text-sm uppercase tracking-widest mb-6">
                      {phase.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {phase.desc}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    <ul className="space-y-5">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 font-sans text-foreground">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(207,174,112,0.6)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {idx < phases.length - 1 && (
                  <div className="hidden md:flex justify-center pt-12">
                    <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flexibility section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide mb-6">
              Gerenciamento Completo ou Suporte Colaborativo
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-sans mb-8 max-w-2xl mx-auto">
              Adaptamos nosso nível de atuação à realidade da sua empresa. Podemos assumir a gestão
              integral do sistema ou atuar lado a lado com a sua equipe técnica — a decisão é sua.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
              {[
                {
                  title: 'Gestão Completa',
                  desc: 'A AGI assume a coordenação e execução do SGI: documentação, treinamentos, auditorias, análise crítica e comunicação com o certificador.',
                },
                {
                  title: 'Suporte Técnico',
                  desc: 'Sua equipe conduz o sistema; a AGI orienta, revisa, audita e resolve os pontos de maior complexidade técnica e normativa.',
                },
              ].map((opt, i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-colors duration-300">
                  <h3 className="text-xl font-heading font-bold text-foreground uppercase tracking-wide mb-3">
                    {opt.title}
                  </h3>
                  <p className="text-muted-foreground font-sans leading-relaxed text-sm">{opt.desc}</p>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="rounded-full uppercase tracking-wider font-bold bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(207,174,112,0.4)] transition-all"
            >
              <Link to="/contato">
                Fale com um Especialista <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
