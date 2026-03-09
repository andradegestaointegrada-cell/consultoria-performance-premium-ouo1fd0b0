import { useParams, Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const S_DATA: Record<string, { t?: string; d: string; i: string; w: string }> = {
  'iso-9001': {
    t: 'ISO 9001',
    d: 'Sistema de Gestão da Qualidade focado na excelência operacional e melhoria contínua.',
    i: 'quality%20control',
    w: 'Implementamos processos robustos que garantem a padronização e alta performance da sua equipe.',
  },
  'iso-14001': {
    t: 'ISO 14001',
    d: 'Sistema de Gestão Ambiental para empresas que buscam sustentabilidade e conformidade.',
    i: 'sustainability',
    w: 'Desenvolvemos estratégias sustentáveis integradas ao seu negócio, otimizando recursos.',
  },
  'iso-45001': {
    t: 'ISO 45001',
    d: 'Gestão de Saúde e Segurança Ocupacional para proteger colaboradores e mitigar riscos.',
    i: 'safety%20engineering',
    w: 'Criamos um ambiente seguro, reduzindo acidentes e fortalecendo a cultura de segurança.',
  },
  'iso-27001': {
    t: 'ISO 27001',
    d: 'Gestão da Segurança da Informação para proteger dados sensíveis contra ameaças.',
    i: 'cybersecurity',
    w: 'Estabelecemos controles rigorosos garantindo confidencialidade, integridade e conformidade.',
  },
  esg: {
    t: 'Consultoria ESG',
    d: 'Integração de práticas Ambientais, Sociais e de Governança para impulsionar sustentabilidade.',
    i: 'corporate%20governance',
    w: 'Apoiamos na estruturação de relatórios e práticas alinhadas às exigências dos investidores.',
  },
}

const DEF = {
  d: 'Implementação estratégica focada em trazer resultados reais para a operação da sua empresa.',
  i: 'business%20consulting',
  w: 'Entregamos um sistema de gestão vivo, focado em gerar valor através da otimização de recursos e redução de riscos operacionais.',
}

export default function ServiceDetail() {
  const { id } = useParams()
  const key = id?.toLowerCase() || ''
  const svc = S_DATA[key] || DEF
  const title = svc.t || (id ? id.replace('-', ' ').toUpperCase() : 'Serviço')

  return (
    <div className="pt-20">
      <section className="py-24 bg-card border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <Link
              to="/servicos"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-bold mb-6 inline-block uppercase tracking-wider"
            >
              ← Voltar para Serviços
            </Link>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{svc.d}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-24">
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
                        src={`https://img.usecurling.com/p/800/600?q=${svc.i}&color=black`}
                        alt={`Ilustração do serviço ${title}`}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide text-center">
                Como funciona (Pit Stop)
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'Diagnóstico', desc: 'Mapeamento da operação atual.' },
                  { step: '2', title: 'Implementação', desc: 'Ajustes ágeis e treinamento.' },
                  { step: '3', title: 'Auditoria', desc: 'Validação final e certificação.' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="p-6 bg-card border-2 border-border rounded-xl hover:border-primary transition-colors duration-300"
                  >
                    <div className="text-primary font-heading font-bold text-4xl mb-4">
                      {s.step}.
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2 uppercase tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200} className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide text-center">
                FAQ
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider">
                    Quanto tempo leva a implementação?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Depende do tamanho e maturidade da empresa, mas nossa metodologia ágil costuma
                    reduzir o tempo padrão do mercado em até 30%.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider">
                    Qual o envolvimento necessário da diretoria?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Requeremos alinhamento estratégico nas fases de planejamento e revisão, mas a
                    carga operacional é absorvida por nossos especialistas internamente.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>

            <Reveal
              delay={300}
              className="p-10 bg-secondary border-l-4 border-l-primary rounded-r-2xl text-left shadow-2xl max-w-4xl mx-auto"
            >
              <h3 className="text-3xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
                Pronto para a{' '}
                <em className="font-heading italic font-normal text-primary">pole position</em>?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Fale com um de nossos especialistas e descubra o impacto da {title} no seu negócio.
              </p>
              <Button asChild size="lg" className="rounded-full uppercase tracking-wider font-bold">
                <Link to="/contato">Agendar Reunião de Diagnóstico</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <Dialog>
        <DialogContent aria-describedby={undefined}>
          <VisuallyHidden>
            <DialogTitle>Detalhes de {title}</DialogTitle>
          </VisuallyHidden>
        </DialogContent>
      </Dialog>
    </div>
  )
}
