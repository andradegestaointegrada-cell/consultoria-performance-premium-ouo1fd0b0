// Ilha React: perguntas frequentes das páginas de serviço (acordeão).
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function ServiceFaq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-border/50">
        <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider text-left">
          Prazo de implementação?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground text-base leading-relaxed">
          Reduzimos o tempo padrão de mercado em até 30% com nossa metodologia ágil, garantindo
          entregas rápidas sem perder a excelência técnica.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-border/50">
        <AccordionTrigger className="text-foreground hover:text-primary font-bold uppercase tracking-wider text-left">
          Envolvimento da diretoria?
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground text-base leading-relaxed">
          Requeremos alinhamento estratégico nas fases de planejamento e revisão executiva. A carga
          operacional é absorvida pelos nossos especialistas.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
