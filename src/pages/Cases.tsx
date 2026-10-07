import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Target } from 'lucide-react'
import heroImg from '@/assets/cases/cases-hero.webp'
import setecImg from '@/assets/cases/cases-setec.webp'
import msanImg from '@/assets/cases/cases-msan.webp'
import eptImg from '@/assets/cases/cases-ept.webp'
import inspecaoImg from '@/assets/cases/cases-inspecao.webp'
import transporteImg from '@/assets/cases/cases-transporte.webp'

interface Caso {
  cliente: string
  setor: string
  imagem: string
  imagemAlt: string
  foco: string
  normas: string[]
  status: string
  desafio: string
  entregas: string[]
  marcos: { quando: string; oque: string }[]
  nota?: string
}

const CASOS: Caso[] = [
  {
    cliente: 'SETEC Hidrobrasileira',
    setor: 'Engenharia consultiva · equipes em São Paulo e Fortaleza',
    imagem: setecImg,
    imagemAlt: 'Engenheiros de capacete e colete revisam um projeto diante de uma usina hidrelétrica',
    foco: 'center 60%',
    normas: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
    status: 'Relacionamento contínuo desde 2019',
    desafio:
      'A SETEC já tinha o sistema da qualidade certificado e precisava incorporar meio ambiente e saúde e segurança ocupacional sem criar um segundo sistema paralelo, com equipes de projeto em duas cidades.',
    entregas: [
      'Implantação da ISO 14001 e da ISO 45001: aspectos e impactos ambientais, perigos e riscos ocupacionais, requisitos legais, indicadores e auditorias internas.',
      'Integração das três normas num único sistema de gestão, com procedimentos e registros comuns.',
      'Acompanhamento das auditorias externas de certificação e de recertificação.',
      'Manutenção contínua: auditorias internas, análise crítica pela direção, tratamento de não conformidades e revisão de documentos.',
    ],
    marcos: [
      { quando: '2019', oque: 'Início da consultoria no sistema de gestão' },
      { quando: 'Dez/2021', oque: 'Certificação ISO 14001 e ISO 45001' },
      { quando: 'Mar/2024', oque: 'Recertificação integrada ISO 9001, 14001 e 45001' },
      { quando: '2026–2027', oque: 'Transição para a ISO 9001:2026 e preparação da recertificação' },
    ],
    nota: 'Atuação de Alexandre Andrade desde 2019; pela AGI desde 2022.',
  },
  {
    cliente: 'Organismo de inspeção',
    setor: 'Empresa de engenharia e controle tecnológico de grande porte',
    imagem: inspecaoImg,
    imagemAlt: 'Inspetor de capacete e colete mede um pilar de concreto em uma obra',
    foco: 'center 20%',
    normas: ['ISO/IEC 17020'],
    status: 'Concluído em 2022',
    desafio:
      'O organismo de inspeção da empresa precisava da acreditação da Cgcre na ISO/IEC 17020, o que exige demonstrar imparcialidade, competência dos inspetores e métodos de inspeção controlados, do planejamento ao relatório.',
    entregas: [
      'Implantação completa do sistema de gestão do organismo de inspeção conforme a ISO/IEC 17020.',
      'Procedimentos e registros de inspeção, com critérios de imparcialidade e de competência dos inspetores.',
      'Formação de auditores internos na ISO/IEC 17020.',
      'Preparação para a avaliação da Cgcre, até a acreditação.',
    ],
    marcos: [
      { quando: 'Jun/2021', oque: 'Formação de auditores internos na ISO/IEC 17020' },
      { quando: '2022', oque: 'Acreditação Cgcre ISO/IEC 17020' },
    ],
    nota: 'Projeto conduzido por Alexandre Andrade antes da fundação da AGI.',
  },
  {
    cliente: 'MSan Engenharia',
    setor: 'Obras e serviços em plantas industriais',
    imagem: msanImg,
    imagemAlt: 'Soldador e técnicos com EPI trabalhando em uma planta industrial',
    foco: 'center 55%',
    normas: ['ISO 9001', 'ISO 45001'],
    status: 'Em andamento · certificação prevista para dez/2026',
    desafio:
      'Estruturar um sistema de gestão da qualidade e de saúde e segurança ocupacional para uma empresa que executa obras dentro de plantas industriais com exigências rigorosas de segurança, com equipes divididas entre a sede e as frentes de trabalho.',
    entregas: [
      'Diagnóstico e mapeamento dos processos, da proposta comercial à execução em campo.',
      'Informações documentadas: procedimentos, instruções de trabalho e formulários, com mais de 120 documentos vigentes sob controle.',
      'Gestão de riscos de SSO: análise preliminar de risco (APR) e matriz de riscos e oportunidades.',
      'Painéis de indicadores por processo, alimentados por formulários digitais.',
      'Comparação técnica e comercial dos organismos certificadores.',
    ],
    marcos: [
      { quando: 'Mar/2026', oque: 'Início do projeto' },
      { quando: '2026', oque: 'Documentação do sistema e implantação nas frentes de trabalho' },
      { quando: 'Dez/2026', oque: 'Auditoria de certificação prevista' },
    ],
  },
  {
    cliente: 'Transportadora de produtos químicos',
    setor: 'Transporte rodoviário de cargas, inclusive produtos químicos · pequeno porte',
    imagem: transporteImg,
    imagemAlt: 'Motorista e técnico de segurança inspecionam um caminhão-tanque antes da viagem',
    foco: 'center 60%',
    normas: ['SASSMAQ', 'ISO 9001'],
    status: 'Concluído em 2021',
    desafio:
      'A transportadora precisava atender ao SASSMAQ, a avaliação de segurança, saúde, meio ambiente e qualidade exigida pela indústria química, e certificar a ISO 9001, com equipe enxuta e a operação rodando.',
    entregas: [
      'Implantação integrada do SASSMAQ e da ISO 9001, com procedimentos e registros comuns aos dois sistemas.',
      'Gestão de riscos de segurança, saúde e meio ambiente no transporte de produtos químicos.',
      'Preparação para a avaliação SASSMAQ e para a auditoria de certificação ISO 9001.',
    ],
    marcos: [{ quando: '2021', oque: 'Certificação SASSMAQ e ISO 9001, 11 meses após o início' }],
    nota: 'Projeto conduzido por Alexandre Andrade, com mais um consultor, antes da fundação da AGI.',
  },
  {
    cliente: 'EPT Engenharia',
    setor: 'Engenharia consultiva multidisciplinar',
    imagem: eptImg,
    imagemAlt: 'Consultor revisa um checklist de auditoria diante de projetos estruturais na tela',
    foco: 'center 15%',
    normas: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
    status: 'Concluído em 2025',
    desafio:
      'Com o sistema de gestão integrado já certificado, a EPT precisava de uma auditoria interna independente nas três normas antes da auditoria externa.',
    entregas: [
      'Preparação e condução da auditoria interna do sistema de gestão integrado.',
      'Relatório com constatações e oportunidades de melhoria por requisito.',
      'Apoio na preparação para a auditoria externa.',
    ],
    marcos: [{ quando: '2025', oque: 'Auditoria interna integrada ISO 9001, 14001 e 45001' }],
  },
]

export default function Cases() {
  return (
    <div className="pt-20">
      <section
        className="py-32 relative bg-fixed bg-cover bg-center border-b border-border"
        style={{ backgroundImage: `url('${heroImg}')` }}
      >
        <div className="absolute inset-0 bg-[#091D39]/85" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg break-words">
              Cases
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-md font-sans">
              Trabalhos reais, com escopo, normas e marcos verificáveis. Clientes citados com
              autorização.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-16 md:space-y-20">
          {CASOS.map((c, idx) => (
            <Reveal key={c.cliente} delay={80 * idx}>
              <Card className="bg-card border-border shadow-xl border-t-4 border-t-primary overflow-hidden">
                <div className="relative h-56 sm:h-72 md:h-96">
                  <img
                    src={c.imagem}
                    alt={c.imagemAlt}
                    width={1536}
                    height={864}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: c.foco }}
                  />
                  <span className="absolute bottom-3 right-3 rounded bg-black/55 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/80">
                    Imagem ilustrativa
                  </span>
                </div>
                <CardContent className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide">
                        {c.cliente}
                      </h2>
                      <p className="text-muted-foreground mt-2">{c.setor}</p>
                    </div>
                    <span className="self-start shrink-0 text-xs font-bold uppercase tracking-widest text-primary border border-primary/60 rounded-full px-3 py-1.5">
                      {c.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {c.normas.map((n) => (
                      <span
                        key={n}
                        className="text-sm font-bold bg-secondary text-foreground rounded-md px-3 py-1"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-3 space-y-8">
                      <div>
                        <h3 className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-3">
                          <Target className="h-5 w-5" /> Desafio
                        </h3>
                        <p className="text-foreground leading-relaxed">{c.desafio}</p>
                      </div>
                      <div>
                        <h3 className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-3">
                          <CheckCircle2 className="h-5 w-5" /> O que foi feito
                        </h3>
                        <ul className="space-y-3">
                          {c.entregas.map((e) => (
                            <li key={e} className="flex gap-3 text-muted-foreground leading-relaxed">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-5">
                        Marcos
                      </h3>
                      <ol className="relative border-l-2 border-border ml-2 space-y-6">
                        {c.marcos.map((m) => (
                          <li key={m.quando + m.oque} className="pl-6 relative">
                            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                            <p className="text-sm font-bold text-foreground uppercase tracking-wider">
                              {m.quando}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1">{m.oque}</p>
                          </li>
                        ))}
                      </ol>
                      {c.nota && <p className="text-xs text-muted-foreground mt-8">{c.nota}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide mb-6">
              O próximo sistema pode ser o seu
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Implantação, integração de normas, auditoria interna ou manutenção do sistema: conte
              o seu cenário e receba uma proposta de caminho.
            </p>
            <Button asChild size="lg" className="h-14 px-10 uppercase font-bold tracking-widest">
              <Link to="/contato">
                Fale com um especialista <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
