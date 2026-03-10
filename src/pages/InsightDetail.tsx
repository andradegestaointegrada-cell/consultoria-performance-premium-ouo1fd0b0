import { Link, useParams } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react'

export default function InsightDetail() {
  const { slug } = useParams()

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      <article className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <div className="mb-8 mt-8">
            <Link
              to="/insights"
              className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Insights
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                ISO 9001
              </span>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                Tempo de leitura: 5 min
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide leading-tight">
              O Futuro da Qualidade ISO 9001
            </h1>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 border-2 border-border">
            <img
              src="https://img.usecurling.com/p/1200/600?q=future%20technology&color=black"
              alt="O Futuro da Qualidade"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
            <p className="text-xl md:text-2xl text-foreground font-medium mb-10 leading-relaxed">
              A transição para a nova versão da norma ISO 9001:2026 traz mudanças significativas que
              redefinem o conceito de Gestão da Qualidade. Este artigo explora as principais
              alterações, oportunidades e a importância estratégica da atualização para o seu
              negócio.
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              Os 4 Pilares da Alta Performance
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: '1. Contexto',
                  desc: 'Compreensão profunda do ambiente de negócios e expectativas das partes interessadas.',
                },
                {
                  title: '2. Liderança',
                  desc: 'Engajamento total da alta direção e alinhamento com a estratégia corporativa.',
                },
                {
                  title: '3. Riscos',
                  desc: 'Gestão preditiva e preventiva, focada na mitigação de ameaças e captura de oportunidades.',
                },
                {
                  title: '4. Integração',
                  desc: 'Sinergia com tecnologias emergentes e outros sistemas de gestão.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="bg-card p-6 md:p-8 rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <h3 className="text-primary font-bold text-xl mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              Comparativo: ISO 9001:2015 vs ISO 9001:2026
            </h2>
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-primary text-foreground uppercase tracking-wider text-sm">
                    <th className="py-4 px-4 font-bold w-1/3">Critério</th>
                    <th className="py-4 px-4 font-bold w-1/3">ISO 9001:2015</th>
                    <th className="py-4 px-4 font-bold w-1/3">ISO 9001:2026</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground">Gestão de Mudanças</td>
                    <td className="py-4 px-4">Reativa e departamental</td>
                    <td className="py-4 px-4 font-semibold text-primary">
                      Ágil e integrada estrategicamente
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground">Foco Tecnológico</td>
                    <td className="py-4 px-4">Documentação digital</td>
                    <td className="py-4 px-4 font-semibold text-primary">
                      IA, Automação e Dados em tempo real
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground">Sustentabilidade</td>
                    <td className="py-4 px-4">Opcional/Implícita</td>
                    <td className="py-4 px-4 font-semibold text-primary">
                      Mandatória (ESG Integrado)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mt-16 mb-8 text-foreground border-b border-border pb-4 uppercase tracking-wide">
              O Caminho para a Excelência
            </h2>
            <p className="mb-8">
              Antecipar-se à transição não é apenas uma questão de conformidade, mas sim uma
              vantagem competitiva. Empresas que adotam precocemente os novos requisitos demonstram
              resiliência, visão de futuro e compromisso inabalável com a satisfação do cliente.
            </p>
            <ul className="space-y-4 my-8">
              {[
                'Avaliação de prontidão (Gap Analysis) especializada.',
                'Treinamento e capacitação de equipes chave.',
                'Atualização de documentação e processos.',
                'Auditorias internas de transição.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-8 md:p-12 my-16 text-center shadow-[0_0_30px_rgba(207,174,112,0.15)]">
              <div className="text-6xl md:text-8xl font-heading font-bold text-primary mb-6 drop-shadow-sm">
                99%
              </div>
              <p className="text-2xl font-bold text-foreground uppercase tracking-wide mb-4">
                Taxa de Sucesso
              </p>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Em projetos de implementação e certificação conduzidos pela nossa equipe de
                especialistas focados em resultados práticos.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-20 p-8 md:p-16 bg-card rounded-2xl border-2 border-primary text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                Pronto para a Transição ISO 9001:2026?
              </h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Não espere pelos prazos finais. Inicie hoje a jornada de atualização do seu Sistema
                de Gestão da Qualidade e coloque sua empresa na vanguarda do mercado.
              </p>
              <Button
                size="lg"
                asChild
                className="h-14 px-10 text-base uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(207,174,112,0.3)]"
              >
                <Link to="/contato">
                  Fale com um Especialista Agora
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  )
}
