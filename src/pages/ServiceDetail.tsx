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

const S_DATA: Record<string, { t: string; d: string; hi: string; ci: string; w: string }> = {
  'iso-9001': {
    t: 'ISO 9001',
    d: 'A Andrade Gestão Integrada implementa Sistemas de Gestão da Qualidade com foco na excelência.',
    hi: 'https://i.postimg.cc/t4Z2xNx0/BANNER_9001.jpg',
    ci: 'https://i.postimg.cc/15YvXjfS/9001_DESCRIÇÃO_SERVIÇO.jpg',
    w: 'Processos robustos que garantem a padronização e a alta performance contínua.',
  },
  'iso-14001': {
    t: 'ISO 14001',
    d: 'Transformamos a gestão ambiental em um diferencial competitivo sustentável.',
    hi: 'https://i.postimg.cc/bwD3t9tz/14001_BANNER.jpg',
    ci: 'https://i.postimg.cc/yYrLxbk7/14001_DESCRIÇÃO_SERVIÇO.jpg',
    w: 'Estratégias sustentáveis integradas ao negócio, mitigando impactos ambientais.',
  },
  'iso-45001': {
    t: 'ISO 45001',
    d: 'Estruturamos sistemas robustos de Saúde e Segurança Ocupacional para eliminar riscos.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=engineer%20safety%20helmet%20factory&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=industrial%20workers%20safety%20gear&dpr=2',
    w: 'Criação de um ambiente seguro, reduzindo acidentes e fortalecendo a cultura de segurança.',
  },
  'pbqp-h': {
    t: 'PBQP-H',
    d: 'Programa de Qualidade do Habitat focado na melhoria e sustentabilidade da construção civil.',
    hi: 'https://i.postimg.cc/bY3NWQFL/PBQP_H_BANNER.jpg',
    ci: 'https://i.postimg.cc/vHTHscJB/PBQP_H_DESCRIÇÃO.jpg',
    w: 'Aumento de produtividade, compliance setorial e redução de desperdícios em obras.',
  },
  'iatf-16949': {
    t: 'IATF 16949',
    d: 'Gestão da qualidade rigorosa para a cadeia de suprimentos da indústria automotiva.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=automotive%20manufacturing%20robotics&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=car%20assembly%20line%20factory&dpr=2',
    w: 'Prevenção de defeitos, redução de variação e desperdício na cadeia automotiva.',
  },
  'iso-17020': {
    t: 'ISO/IEC 17020',
    d: 'Critérios rigorosos para garantir a competência e imparcialidade de organismos de inspeção.',
    hi: 'https://i.postimg.cc/NG6BvRJk/17020_BANNER.png',
    ci: 'https://i.postimg.cc/52jhyzgY/17000.png',
    w: 'Confiabilidade atestada nas inspeções, garantindo credibilidade no mercado.',
  },
  'iso-17025': {
    t: 'ISO/IEC 17025',
    d: 'Competência técnica e resultados consistentes para laboratórios de ensaio e calibração.',
    hi: 'https://i.postimg.cc/xdBnn5VF/17025_BANNER.png',
    ci: 'https://i.postimg.cc/Sx3KVCx0/17025-DESCRICAO.png',
    w: 'Padronização internacional e reconhecimento da qualidade dos seus laudos e ensaios.',
  },
  sassmaq: {
    t: 'SASSMAQ',
    d: 'Avaliação de segurança, saúde, meio ambiente e qualidade no transporte de químicos.',
    hi: 'https://i.postimg.cc/8CfxBr7N/SASSMAQ_BANNER.png',
    ci: 'https://i.postimg.cc/wjvCMrHv/SASSMAQ_DESCRIÇÃO.png',
    w: 'Minimização de riscos operacionais e adequação às exigências da indústria química.',
  },
  esg: {
    t: 'Consultoria ESG',
    d: 'Guiamos sua empresa na jornada ESG, alinhando propósito e governança sólida.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=sustainable%20corporate%20wind%20energy&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=environmental%20social%20governance%20business&dpr=2',
    w: 'Apoiamos na estruturação completa de práticas alinhadas às exigências dos investidores.',
  },
}

const DEF = {
  t: '',
  d: 'Soluções estratégicas focadas em trazer resultados reais para a operação da sua empresa.',
  hi: 'https://img.usecurling.com/p/1920/1080?q=business%20strategy%20corporate&dpr=2',
  ci: 'https://img.usecurling.com/p/800/600?q=corporate%20planning%20team%20meeting&dpr=2',
  w: 'Entregamos um sistema focado em gerar valor e reduzir riscos.',
}

const STEPS = [
  {
    step: '1',
    title: 'Diagnóstico',
    desc: 'Mapeamento da operação e identificação de gaps estratégicos.',
  },
  {
    step: '2',
    title: 'Implementação',
    desc: 'Ajustes ágeis, criação de processos customizados e treinamento.',
  },
  { step: '3', title: 'Auditoria', desc: 'Validação final de conformidade para a certificação.' },
]

export default function ServiceDetail() {
  const { id } = useParams()
  const key = id?.toLowerCase() || ''
  const svc = S_DATA[key] || DEF
  const title = svc.t || (id ? id.replace('-', ' ').toUpperCase() : 'Serviço')

  return (
    <div className="pt-20">
      <section className="relative py-32 min-h-[60vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img src={svc.hi} alt={`${title} Background`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                      src={svc.ci}
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
              Como funciona
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {STEPS.map((s) => (
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
                  Prazo de implementação?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Reduzimos o tempo padrão de mercado em até 30% com nossa metodologia ágil,
                  garantindo entregas rápidas sem perder a excelência técnica.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/50">
                <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider text-left">
                  Envolvimento da diretoria?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Requeremos alinhamento estratégico nas fases de planejamento e revisão executiva.
                  A carga operacional é absorvida pelos nossos especialistas.
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
                  Fale com um consultor e descubra o impacto real da {title} no seu negócio.
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
