import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const S_DATA: Record<string, { t?: string; d: string; hi: string; ci: string; w: string }> = {
  'iso-9001': {
    t: 'ISO 9001',
    d: 'A Andrade Gestão Integrada implementa Sistemas de Gestão da Qualidade com foco na excelência operacional e resultados consistentes.',
    hi: 'corporate%20office',
    ci: 'quality%20control',
    w: 'Processos robustos que garantem a padronização e a alta performance contínua da sua equipe.',
  },
  'iso-14001': {
    t: 'ISO 14001',
    d: 'Transformamos a gestão ambiental em um diferencial competitivo sustentável, com a expertise e autoridade da Andrade Gestão.',
    hi: 'sustainable%20business',
    ci: 'sustainability',
    w: 'Estratégias sustentáveis integradas ao negócio, otimizando recursos e mitigando impactos ambientais.',
  },
  'iso-45001': {
    t: 'ISO 45001',
    d: 'Proteja seu maior ativo. Estruturamos sistemas robustos de Saúde e Segurança Ocupacional para eliminar riscos.',
    hi: 'industrial%20safety',
    ci: 'safety%20engineering',
    w: 'Criação de um ambiente seguro, reduzindo acidentes e fortalecendo a cultura de segurança interna.',
  },
  'iso-27001': {
    t: 'ISO 27001',
    d: 'Segurança da informação levada a sério. Protegemos os dados da sua empresa contra ameaças com padrões globais de excelência.',
    hi: 'server%20room',
    ci: 'cybersecurity',
    w: 'Estabelecemos controles rigorosos garantindo confidencialidade, integridade e total conformidade.',
  },
  esg: {
    t: 'Consultoria ESG',
    d: 'Guiamos sua empresa na jornada ESG, alinhando propósito, governança sólida e impacto positivo na sociedade de forma integrada.',
    hi: 'corporate%20governance',
    ci: 'esg%20business',
    w: 'Apoiamos na estruturação completa de relatórios e práticas alinhadas às altas exigências dos investidores.',
  },
}

const DEF = {
  d: 'Soluções estratégicas da Andrade Gestão focadas em trazer resultados reais para a operação da sua empresa.',
  hi: 'business%20consulting',
  ci: 'strategy%20planning',
  w: 'Entregamos um sistema de gestão vivo, focado em gerar valor e reduzir riscos operacionais críticos.',
}

export default function ServiceDetail() {
  const { id } = useParams()
  const key = id?.toLowerCase() || ''
  const svc = S_DATA[key] || DEF
  const title = svc.t || (id ? id.replace('-', ' ').toUpperCase() : 'Serviço')

  return (
    <div className="pt-20">
      <section className="relative py-32 min-h-[60vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src={`https://img.usecurling.com/p/1920/1080?q=${svc.hi}&color=black`}
            alt={`${title} Background`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <Link
              to="/servicos"
              className="text-white/80 hover:text-white transition-colors text-sm font-bold mb-8 inline-flex items-center uppercase tracking-wider"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Voltar para Serviços
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-md font-light leading-relaxed">
              {svc.d}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                  O que entregamos
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{svc.w}</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card p-2 shadow-[0_0_30px_rgba(207,174,112,0.1)]">
                <div className="rounded-xl overflow-hidden bg-muted">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={`https://img.usecurling.com/p/800/600?q=${svc.ci}&color=black`}
                      alt={`Detalhes de ${title}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 uppercase tracking-wide text-center">
              Como funciona (Pit Stop)
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Diagnóstico',
                  desc: 'Mapeamento profundo da operação atual e identificação de gaps estratégicos.',
                },
                {
                  step: '2',
                  title: 'Implementação',
                  desc: 'Ajustes ágeis, criação de processos customizados e treinamento da equipe.',
                },
                {
                  step: '3',
                  title: 'Auditoria',
                  desc: 'Validação final de conformidade e suporte total para a certificação.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-primary font-heading font-bold text-5xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {s.step}.
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 uppercase tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide text-center">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/50">
                <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider text-left">
                  Quanto tempo leva a implementação da {title}?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  O prazo varia conforme o porte e maturidade da empresa. A metodologia ágil da
                  Andrade Gestão costuma reduzir o tempo padrão de mercado em até 30%, garantindo
                  entregas rápidas sem perder a excelência técnica.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/50">
                <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider text-left">
                  Qual o envolvimento necessário da nossa diretoria?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Requeremos alinhamento estratégico apenas nas fases de planejamento e revisão
                  executiva. A carga operacional pesada é totalmente absorvida pelos nossos
                  especialistas, liberando sua equipe para focar no core business.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>

          <Reveal delay={300}>
            <div className="p-10 md:p-12 bg-secondary border-l-4 border-l-primary rounded-r-2xl text-left shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
                  Pronto para a{' '}
                  <em className="font-heading italic font-normal text-primary">pole position</em>?
                </h3>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Fale com um consultor da Andrade Gestão Integrada e descubra o impacto real da{' '}
                  {title} no seu negócio.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-full uppercase tracking-wider font-bold shrink-0"
              >
                <Link to="/contato">Agendar Diagnóstico</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
