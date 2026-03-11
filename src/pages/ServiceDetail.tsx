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
import { S_DATA, DEF, STEPS } from '@/data/services'

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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg break-words">
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

          {svc.methodologyDetails && svc.trainingPillars && (
            <Reveal delay={150}>
              <div className="pt-10 border-t border-border">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                  Metodologia de Implementação
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                  {svc.methodologyDetails}
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                  Processos de Treinamento
                </h3>
                <ul className="flex flex-col gap-4">
                  {svc.trainingPillars.map((tp, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 bg-secondary p-5 md:p-6 rounded-xl border border-border/50 shadow-sm transition-all hover:border-primary/50"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                      <span className="text-foreground font-bold text-base md:text-lg">{tp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

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
