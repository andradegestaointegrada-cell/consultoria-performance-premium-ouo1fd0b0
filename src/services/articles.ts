export interface Article {
  id: string
  collectionId?: string
  collectionName?: string
  created?: string
  updated?: string
  expand?: Record<string, unknown>
  title: string
  slug: string
  summary: string
  content: string
  category: string
  image: string
  published_date: string
  is_highlighted: boolean
}

const STATIC_ARTICLES: Article[] = [
  {
    id: 'art-001',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-04-24 21:19:04.319Z',
    updated: '2026-04-24 21:19:04.319Z',
    expand: {},
    title: `Liderança e Segurança: Pilares da Eficiência Operacional`,
    slug: 'lideranca-e-seguranca',
    summary: `Descubra como integrar liderança e gestão de riscos para construir uma cultura de segurança robusta e alcançar eficiência operacional.`,
    content: `<h2>Liderança na Gestão de Riscos</h2><p>A liderança desempenha um papel fundamental na construção de uma cultura de segurança robusta. Organizações que integram práticas de gestão de riscos à liderança estratégica alcançam níveis mais elevados de eficiência operacional.</p><h2>Pilares da Segurança Operacional</h2><p>Os pilares essenciais incluem: comprometimento da alta direção, comunicação eficaz, treinamento contínuo e monitoramento proativo de indicadores de segurança.</p><h2>Resultados Mensuráveis</h2><p>Empresas que adotam essa abordagem integrada reportam redução significativa de acidentes, melhoria do clima organizacional e aumento da produtividade.</p>`,
    category: `Liderança`,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-24 21:19:04.319Z',
    is_highlighted: false,
  },
  {
    id: 'art-002',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-04-24 21:19:04.319Z',
    updated: '2026-04-24 21:19:04.319Z',
    expand: {},
    title: `Mapeamento de Processos: O Pit Stop Estratégico para a Alta Performance`,
    slug: 'mapeamento-processos-pit-stop-performance',
    summary: `Aprenda como o mapeamento de processos funciona como um pit stop estratégico, acelerando a performance e eliminando desperdícios na sua organização.`,
    content: `<h2>ISO 14001:2026 e a Cultura de Performance</h2><p>No mundo das corridas de alta performance, um pit stop não é apenas uma troca de pneus; é um momento de precisão técnica onde cada segundo conta. Da mesma forma, o mapeamento de processos na sua organização é uma pausa estratégica que pode determinar a diferença entre vencer e perder no mercado competitivo.</p><h2>O Poder do Mapeamento</h2><p>Quando líderes mapeiam seus processos, ganham visibilidade sobre o que funciona, onde há desperdício e onde melhorias podem ser feitas. Essa clareza leva a decisões mais rápidas e execução mais eficaz.</p><h2>Implementação Prática</h2><p>Comece pelos processos core, identifique gargalos e elimine desperdícios. O resultado é uma organização mais enxuta, rápida e competitiva, pronta para crescimento sustentável.</p>`,
    category: `Performance`,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-24 21:19:04.319Z',
    is_highlighted: false,
  },
  {
    id: 'art-003',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-04-24 21:07:53.165Z',
    updated: '2026-04-24 21:07:53.165Z',
    expand: {},
    title: `Pit Stop: Alinhamento Estratégico em Alta Velocidade`,
    slug: 'pit-stop',
    summary: `Como o conceito de pit stop da Fórmula 1 pode transformar o alinhamento estratégico da sua empresa e acelerar resultados.`,
    content: `<h1>O Conceito de Pit Stop: Alinhamento Estratégico em Alta Velocidade</h1><p>No universo do automobilismo e, mais especificamente, na Fórmula 1, um Pit Stop perfeito pode determinar a diferença entre a vitória e a derrota. Em segundos, uma equipe altamente treinada executa trocas de pneus, ajustes aerodinâmicos e reabastecimentos com precisão cirúrgica.</p><h2>A Metáfora Corporativa</h2><p>Essa metáfora se aplica diretamente ao mundo corporativo. Assim como as equipes de F1 param estrategicamente para otimizar o desempenho do carro, as organizações precisam de momentos estruturados de revisão e alinhamento estratégico.</p><h2>Elementos do Pit Stop Corporativo</h2><p>Um pit stop corporativo eficaz envolve: análise de indicadores de performance, revisão de metas, realinhamento de equipes e ajuste de estratégias. Quando executado com precisão, permite que a organização retome sua trajetória com mais velocidade e eficiência.</p><h2>Implementando o Método</h2><p>A metodologia AGI de alinhamento estratégico incorpora esses princípios, criando rituais periódicos de revisão que mantêm as equipes focadas e as organizações ágeis diante das mudanças do mercado.</p>`,
    category: `Metodologia`,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-24 21:07:53.165Z',
    is_highlighted: false,
  },
  {
    id: 'art-004',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-04-24 21:04:10.116Z',
    updated: '2026-04-24 21:04:10.116Z',
    expand: {},
    title: `ISO 9001:2026: O SGQ da Sua Empresa Está Preparado para o Que Vem a Seguir?`,
    slug: 'iso-9001-2026-sgq-preparado',
    summary: `A ISO 9001:2026 está chegando com atualizações cruciais. Descubra o que muda e como preparar seu SGQ para os novos requisitos de qualidade.`,
    content: `<p>A revisão da norma ISO 9001 para a versão 2026 já está em andamento, trazendo atualizações cruciais para alinhar os Sistemas de Gestão da Qualidade (SGQ) aos desafios contemporâneos do mercado global.</p><h2>Principais Mudanças Esperadas</h2><p>As atualizações previstas incluem maior ênfase em gestão de riscos e oportunidades, integração com tecnologias digitais e sustentabilidade, além de requisitos mais robustos para a cadeia de suprimentos.</p><h2>Como se Preparar</h2><p>Organizações que antecipam as mudanças saem na frente. O caminho inclui: auditoria do SGQ atual, identificação de gaps em relação aos novos requisitos, capacitação das equipes e implementação gradual das melhorias necessárias.</p><h2>O Papel da Consultoria AGI</h2><p>A AGI acompanha de perto o processo de revisão da ISO 9001:2026 e está preparada para guiar sua organização na transição, garantindo conformidade e aproveitando as oportunidades de melhoria que a nova versão oferece.</p>`,
    category: `Qualidade`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-24 21:04:10.116Z',
    is_highlighted: false,
  },
  {
    id: 'art-005',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-04-20 10:00:00.000Z',
    updated: '2026-04-20 10:00:00.000Z',
    expand: {},
    title: `ISO 14001:2026: A Janela de Oportunidade que Gestores Visionários Não Podem Ignorar`,
    slug: 'iso-14001-2026-janela-oportunidade',
    summary: `A nova ISO 14001:2026 trará mudanças significativas na gestão ambiental. Descubra como se preparar e transformar conformidade em vantagem competitiva.`,
    content: `<h2>A gestão ambiental está prestes a dar um passo importante.</h2><p>A nova ISO 14001:2026 trará mudanças significativas. É essencial que líderes e gestores se preparem agora para aproveitar as oportunidades que essa transição oferece.</p><h2>O Que Muda com a ISO 14001:2026</h2><p>A revisão prevista para 2026 deve incorporar requisitos mais rigorosos sobre economia circular, gestão de recursos hídricos e alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU.</p><h2>Transformando Conformidade em Vantagem Competitiva</h2><p>Empresas que antecipam as mudanças não apenas garantem conformidade, mas também se posicionam como líderes em sustentabilidade, atraindo clientes, investidores e talentos comprometidos com um futuro mais sustentável.</p><h2>Próximos Passos</h2><p>Realize um diagnóstico ambiental completo, identifique os gaps em relação aos novos requisitos esperados e desenvolva um plano de ação robusto. A AGI está pronta para apoiar sua organização nessa jornada.</p>`,
    category: `Sustentabilidade Corporativa`,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-20 10:00:00.000Z',
    is_highlighted: true,
  },
  {
    id: 'art-006',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-03-15 14:00:00.000Z',
    updated: '2026-03-15 14:00:00.000Z',
    expand: {},
    title: `O Futuro da Qualidade ISO 9001:2026`,
    slug: 'o-futuro-da-qualidade',
    summary: `Antecipar-se à transição para a ISO 9001:2026 é uma vantagem competitiva. Saiba como empresas líderes estão se preparando para o futuro da qualidade.`,
    content: `<h2>O Caminho para a Excelência</h2><p>Antecipar-se à transição não é apenas uma questão de conformidade, mas sim uma vantagem competitiva. Empresas que adotam precocemente os novos requisitos se destacam no mercado e fortalecem a confiança de clientes e partes interessadas.</p><h2>Tendências para 2026</h2><p>A versão 2026 da ISO 9001 deve trazer maior integração com ferramentas digitais, ênfase em resiliência organizacional e foco na experiência do cliente como driver de qualidade.</p><h2>Estratégia de Transição</h2><p>Uma transição bem-sucedida requer planejamento, engajamento da liderança e uma abordagem sistemática de implementação. A AGI oferece suporte completo nesse processo, desde o diagnóstico inicial até a certificação.</p>`,
    category: `ISO Standards`,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-03-15 14:00:00.000Z',
    is_highlighted: false,
  },
]

export async function getArticles(): Promise<Article[]> {
  return Promise.resolve(
    [...STATIC_ARTICLES].sort(
      (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
    )
  )
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const article = STATIC_ARTICLES.find((a) => a.slug === slug)
  if (!article) throw new Error(`Artigo não encontrado: ${slug}`)
  return Promise.resolve(article)
}

export function getArticleImage(article: Article): string {
  if (!article.image) return 'https://i.postimg.cc/Y2vzQnbp/BLOG_PAGE.jpg'
  return article.image
}
