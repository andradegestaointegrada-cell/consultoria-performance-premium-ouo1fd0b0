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
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <Link
              to="/servicos"
              className="text-primary hover:underline text-sm font-medium mb-6 inline-block"
            >
              ← Voltar para Serviços
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
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
              <h2 className="text-3xl font-bold text-white mb-6">O que entregamos</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>
                  Nossa abordagem vai além do certificado na parede. Entregamos um sistema de gestão
                  vivo, integrado à cultura da empresa e focado em gerar valor através da otimização
                  de recursos e redução de riscos operacionais.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-3xl font-bold text-white mb-6">Como funciona (Pit Stop)</h2>
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
                    className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <div className="text-primary font-bold text-2xl mb-4">{s.step}.</div>
                    <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="text-3xl font-bold text-white mb-6">FAQ</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-white hover:text-primary">
                    Quanto tempo leva a implementação?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Depende do tamanho e maturidade da empresa, mas nossa metodologia ágil costuma
                    reduzir o tempo padrão do mercado em até 30%.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-white hover:text-primary">
                    Qual o envolvimento necessário da diretoria?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Requeremos alinhamento estratégico nas fases de planejamento e revisão, mas a
                    carga operacional é absorvida por nossos especialistas e multiplicadores
                    internos.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>

            <Reveal
              delay={300}
              className="p-8 bg-card border border-primary/30 rounded-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Pronto para a pole position?</h3>
              <p className="text-muted-foreground mb-6">
                Fale com um de nossos especialistas e descubra o impacto da {title} no seu negócio.
              </p>
              <Button asChild size="lg" className="rounded-full shadow-glow">
                <Link to="/contato">Agendar Reunião de Diagnóstico</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
