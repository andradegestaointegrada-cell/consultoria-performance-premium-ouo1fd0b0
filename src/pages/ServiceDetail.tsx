import { useParams, Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

export default function ServiceDetail() {
  const { id } = useParams()
  const title = id ? id.replace('-', ' ').toUpperCase() : 'Serviço'

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
            <p className="text-xl text-muted-foreground max-w-2xl">
              Implementação completa e estratégica da norma {title}, focada em trazer resultados
              reais para a operação da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-20">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                O que entregamos
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>
                  Nossa abordagem vai além do certificado na parede. Entregamos um sistema de gestão
                  vivo, integrado à cultura da empresa e focado em gerar valor através da otimização
                  de recursos e redução de riscos operacionais.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                Como funciona (Pit Stop)
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Diagnóstico',
                    desc: 'Mapeamento profundo da operação atual.',
                  },
                  {
                    step: '2',
                    title: 'Implementação',
                    desc: 'Ajustes ágeis e treinamento da equipe.',
                  },
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

            <Reveal delay={200}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
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
                    carga operacional é absorvida por nossos especialistas e multiplicadores
                    internos.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>

            <Reveal
              delay={300}
              className="p-10 bg-secondary border-l-4 border-l-primary rounded-r-2xl text-left shadow-2xl"
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
    </div>
  )
}
