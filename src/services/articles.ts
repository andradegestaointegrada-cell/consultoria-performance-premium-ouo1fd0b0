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
    id: 'art-008',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-10-06 14:00:00.000Z',
    updated: '2026-10-06 14:00:00.000Z',
    expand: {},
    title: `PBQP-H e GERIC: O Que Toda Construtora Precisa Saber para Acessar o Crédito da Caixa`,
    slug: 'pbqp-h-geric-credito-caixa',
    summary: `Sem o PBQP-H, é impossível acessar o crédito habitacional da Caixa. Entenda o que é o programa, o que a análise GERIC avalia e o caminho completo para seu empreendimento ser aprovado.`,
    content: `<h2>A Certificação que Abre as Portas do Crédito Habitacional</h2><p>Se a sua construtora quer acessar financiamento habitacional pela Caixa Econômica Federal — seja pelo Minha Casa Minha Vida, pelo FGTS ou por outros programas habitacionais —, há um pré-requisito inegociável: o <strong>PBQP-H</strong>. Sem ele, o processo nem começa.</p><p>Mas o PBQP-H não está sozinho nessa equação. Existe um segundo filtro que muitas construtoras só descobrem quando já estão negociando com a Caixa: a <strong>análise GERIC</strong>. Entender os dois — e se preparar para os dois — é o que separa as construtoras que acessam crédito das que ficam de fora.</p><h2>O Que é o PBQP-H</h2><p>O <strong>Programa Brasileiro da Qualidade e Produtividade do Habitat</strong> é um programa do governo federal voltado para a melhoria da qualidade na cadeia produtiva da construção civil. Na prática, é um sistema de certificação que avalia o Sistema de Gestão da Qualidade (SGQ) das construtoras com base nos requisitos do SiAC — Sistema de Avaliação de Conformidade de Empresas de Serviços e Obras da Construção Civil.</p><p>O programa opera em dois níveis:</p><p><strong>Nível B (inicial):</strong> para empresas que estão começando a implantar o sistema de gestão. Já permite acessar programas habitacionais enquanto a empresa evolui. Prazo típico de implantação: 6 a 12 meses.</p><p><strong>Nível A (pleno):</strong> nível máximo, com requisitos equivalentes à ISO 9001 aplicados à construção civil. Exigido para contratos de maior porte e obrigatório após o prazo do Nível B. A ISO 9001 e o PBQP-H são compatíveis — empresas que já têm um aproveitam até 80% da estrutura do outro.</p><h2>GERIC: A Análise de Risco da Caixa</h2><p>Antes de contratar qualquer empreendimento, a Caixa Econômica Federal realiza uma análise rigorosa por meio da <strong>GERIC (Gerência de Risco de Crédito)</strong>. É o filtro pelo qual a Caixa avalia se a construtora tem capacidade técnica, financeira e de gestão para executar o que está propondo. Os critérios avaliados incluem: saúde financeira e patrimonial da empresa; situação contábil e regularidade fiscal e trabalhista; histórico jurídico (ações em andamento, passivos relevantes); capacidade técnica comprovada e portfólio de obras concluídas; e — item inegociável — <strong>comprovação do PBQP-H</strong>.</p><p>Uma construtora com situação financeira sólida mas sem o PBQP-H não passa pela análise GERIC. A certificação não é diferencial — é requisito de habilitação.</p><h2>O Caminho Completo: Da Adesão ao Recurso Liberado</h2><p>O fluxo para acessar o crédito habitacional segue uma sequência clara e sem atalhos:</p><p><strong>1. Adesão ao PBQP-H:</strong> a construtora formaliza a adesão com uma certificadora acreditada pelo Inmetro e registra junto ao Ministério das Cidades. Isso já garante acesso inicial aos programas enquanto o sistema de gestão é implantado.</p><p><strong>2. Análise GERIC:</strong> a Caixa avalia a empresa e exige o documento de adesão ou certificação do PBQP-H. Com a análise aprovada, a construtora está habilitada para submeter empreendimentos.</p><p><strong>3. Aprovação do empreendimento:</strong> cada projeto é avaliado individualmente — viabilidade econômica, localização, especificações técnicas, cronograma e orçamento.</p><p><strong>4. Liberação dos recursos:</strong> os recursos são liberados por medição de obra, com a manutenção do PBQP-H durante toda a execução como condição contratual. Perder a certificação no meio da obra significa risco de suspensão do repasse.</p><h2>Como a AGI Conduz a Implantação</h2><p>A AGI tem metodologia própria para implantação do PBQP-H, desenvolvida em projetos no setor da construção civil. O processo começa com um diagnóstico do estágio atual da empresa, passa pelo mapeamento dos processos de obra e projeto, estruturação do SGQ, treinamento das equipes de campo e escritório, e termina no acompanhamento até a auditoria de certificação.</p><p>Para construtoras que ainda não têm nenhum sistema de gestão, o PBQP-H é o ponto de partida mais direto para acessar o mercado habitacional. Para quem já tem ISO 9001, a integração é rápida. O que não é opção — se o seu mercado inclui a Caixa — é não ter.</p>`,
    category: `Qualidade`,
    image: 'https://generated-images.adapta.one/andrade.gestaointegrada%40gmail.com/01a1131c-e5d9-755f-8b53-0d5fc70f4039/2026-10-06T21-30-21-014Z_Original_user_intent_Professional_photograph_of_a.png',
    published_date: '2026-10-06 14:00:00.000Z',
    is_highlighted: false,
  },
  {
    id: 'art-007',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-10-06 10:00:00.000Z',
    updated: '2026-10-06 10:00:00.000Z',
    expand: {},
    title: `Pit Stop SGI: A Lógica da Fórmula 1 que Transforma Sistemas de Gestão em Máquinas de Alta Performance`,
    slug: 'pit-stop-sgi-formula-1',
    summary: `Em 2,2 segundos, uma equipe de F1 executa com precisão cirúrgica o que levou meses de treino para dominar. Descubra como essa lógica transforma sistemas de gestão em vantagem competitiva real.`,
    content: `<h2>2,2 Segundos. É Tudo Que Separa o Pódio da Derrota.</h2><p>No pit stop da Fórmula 1, uma equipe de 20 mecânicos executa, em menos de 3 segundos, uma operação que envolveria horas em qualquer outra realidade. Quatro pneus trocados, pressões verificadas, carro abastecido, ajustes realizados — tudo com precisão milimétrica. Sem improvisação. Sem hesitação.</p><p>O que você vê é o resultado de um Sistema de Gestão funcionando em seu mais alto nível. E é exatamente isso que a AGI constrói para sua empresa.</p><h2>A Equipe: Competência Não É Acidente</h2><p>Cada mecânico no pit stop tem uma função específica, um treinamento exaustivo e uma ferramenta calibrada. Não há generalistas em uma parada de 2 segundos. A ISO 9001, a ISO 45001 e a ISO 14001 exigem o mesmo da sua organização: que cada colaborador saiba exatamente o que fazer, quando fazer e por que isso importa.</p><p>Competência, conscientização e treinamento — cláusula 7.2 a 7.3 da ISO 9001 — não são burocracia. São o que diferencia uma equipe que executa de uma que improvisa.</p><h2>A Coreografia: O Poder dos Procedimentos Documentados</h2><p>Um pit stop perfeito é uma coreografia. Cada movimento foi ensaiado centenas de vezes. Cada posição, cada sequência, cada gesto tem um protocolo. Isso é o que a ISO chama de "informação documentada" — e o que muitas empresas tratam como papelada, as equipes campeãs tratam como vantagem competitiva.</p><p>Quando seus processos estão mapeados, padronizados e conhecidos pela equipe, sua empresa executa como uma equipe de pit stop. Quando não estão, cada operação é uma improvisação — e improvisação tem custo.</p><h2>A Telemetria: Indicadores que Revelam a Verdade</h2><p>O race director da Mercedes não toma decisões com base em feeling. Ele tem 300 sensores transmitindo dados em tempo real. A partir desses dados, ele decide: entrar no pit stop agora, ou esperar? Trocar o composto médio pelo duro? Arriscar o undercut?</p><p>Seus KPIs funcionam da mesma forma. Indicadores de qualidade, segurança, ambiental e financeiro são a telemetria da sua operação. Sem eles, você está dirigindo no escuro.</p><h2>O Debrief: Análise Crítica que Gera Evolução</h2><p>Depois de cada corrida, a equipe da F1 passa horas analisando cada dado, cada decisão, cada segundo perdido. Não para punir — para evoluir. A ISO 9001 chama isso de Análise Crítica pela Direção (cláusula 9.3). Na prática, é o momento onde a liderança olha para os números, identifica desvios e define ações de melhoria.</p><p>Empresas que fazem isso sistematicamente saem de cada "corrida" mais rápidas do que entraram.</p><h2>Sua Empresa Está Pronta para o Próximo GP?</h2><p>A diferença entre uma equipe de F1 campeã e uma que termina fora do pódio não é o carro — é o sistema. Procedimentos claros, equipe treinada, indicadores precisos e liderança comprometida com a melhoria contínua.</p><p>É isso que a AGI constrói com você: um sistema de gestão que não é burocracia, é vantagem competitiva. Da certificação ao pódio.</p>`,
    category: `Metodologia`,
    image: 'https://generated-images.adapta.one/andrade.gestaointegrada%40gmail.com/01a1125d-d27c-72fc-aa52-4bb69df71727/2026-10-06T18-07-19-982Z_Original_user_intent_Cinematic_Formula_1_pit_stop.png',
    published_date: '2026-10-06 10:00:00.000Z',
    is_highlighted: true,
  },
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
    image: 'https://images.unsplash.com/photo-1774599730806-61591b84280e?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-04-24 21:19:04.319Z',
    is_highlighted: false,
  },
  {
    id: 'art-002',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-10-06 12:00:00.000Z',
    updated: '2026-10-06 12:00:00.000Z',
    expand: {},
    title: `Dupla Materialidade: O Mapa Estratégico que Sua Empresa Precisa Ter`,
    slug: 'dupla-materialidade-esg',
    summary: `A análise de dupla materialidade deixou de ser exigência europeia e virou expectativa de bancos, investidores e grandes clientes no Brasil. Entenda o que é, por que importa e como estruturá-la.`,
    content: `<h2>Materialidade Simples Não Basta Mais</h2><p>Por anos, "materialidade" no ESG significava uma coisa: quais temas ambientais, sociais e de governança afetam financeiramente a empresa. Essa é a perspectiva do investidor — útil, mas incompleta.</p><p>A <strong>dupla materialidade</strong> adiciona um segundo eixo: como a empresa afeta o meio ambiente e a sociedade. É a diferença entre "o que o clima faz com o meu negócio" e "o que o meu negócio faz com o clima". A Diretiva Europeia CSRD tornou essa análise obrigatória para grandes empresas na UE, e sua rede de fornecedores e parceiros — inclusive no Brasil — já começa a ser cobrada.</p><h2>Os Dois Eixos da Análise</h2><p><strong>Materialidade de impacto:</strong> a empresa mapeia seus efeitos reais sobre pessoas e planeta — emissões, condições de trabalho na cadeia, consumo de recursos naturais, geração de resíduos. Esses impactos são avaliados por magnitude, abrangência e irreversibilidade.</p><p><strong>Materialidade financeira:</strong> o mercado mapeia os riscos e oportunidades ESG que podem afetar o desempenho do negócio — riscos físicos do clima, regulatórios, de reputação, de acesso a capital.</p><p>O cruzamento dos dois eixos gera a <strong>matriz de materialidade</strong>: os temas prioritários nos quais a empresa deve agir e reportar.</p><h2>Por Que PMEs Brasileiras Precisam Agir Agora</h2><p>Grandes construtoras, indústrias e empresas de serviços já recebem questionários ESG de clientes e bancos. Licitações públicas federais passam a exigir critérios de sustentabilidade. O mercado de seguros começa a precificar riscos climáticos e sociais. Estar preparado antes da exigência formal é vantagem competitiva — e reduz o custo da adequação.</p><h2>Como a AGI Conduz a Análise</h2><p>O processo parte do mapeamento das partes interessadas, levantamento de impactos e dependências, consulta às lideranças e, quando necessário, engajamento com stakeholders externos. O resultado é um relatório de materialidade auditável, integrado ao Sistema de Gestão existente (ISO 9001, 14001 ou 45001), com indicadores e plano de ação.</p><p>ESG não é relatório — é gestão. E gestão começa pelo mapa certo.</p>`,
    category: `ESG`,
    image: 'https://images.unsplash.com/photo-1764594589556-0d4f1a71a7ca?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-10-06 12:00:00.000Z',
    is_highlighted: false,
  },
  {
    id: 'art-003',
    collectionId: 'articles',
    collectionName: 'articles',
    created: '2026-10-06 11:00:00.000Z',
    updated: '2026-10-06 11:00:00.000Z',
    expand: {},
    title: `NR-01 e Riscos Psicossociais: A Atualização que Mudou a SST no Brasil`,
    slug: 'nr-01-riscos-psicossociais',
    summary: `Desde 2025, toda empresa no Brasil é obrigada a identificar e gerenciar riscos psicossociais no trabalho. Entenda o que a NR-01 exige, o que são esses riscos e como adequar sua organização.`,
    content: `<h2>A NR-01 Não É Mais Só Sobre Segurança Física</h2><p>A atualização da Norma Regulamentadora nº 1, publicada em 2024 e com vigência plena a partir de maio de 2025, ampliou o escopo do Gerenciamento de Riscos Ocupacionais (GRO) para incluir os <strong>riscos psicossociais</strong>. Pela primeira vez na regulamentação brasileira, estresse crônico, assédio, sobrecarga de trabalho e conflitos interpessoais passaram a ser tratados como riscos ocupacionais — com as mesmas obrigações de identificação, avaliação e controle que qualquer risco físico ou químico.</p><h2>O Que São Riscos Psicossociais</h2><p>São fatores do ambiente e da organização do trabalho que podem causar danos à saúde mental e física dos trabalhadores. Os mais comuns incluem: demandas excessivas sem recursos adequados, falta de autonomia e controle sobre o próprio trabalho, clima organizacional hostil, insegurança quanto ao emprego, jornadas prolongadas e ausência de suporte das lideranças.</p><p>Ignorar esses fatores tem custo real: absenteísmo, rotatividade, queda de produtividade, afastamentos por transtornos mentais (já a segunda maior causa de afastamento previdenciário no Brasil) e passivos trabalhistas.</p><h2>O Que a NR-01 Exige na Prática</h2><p>O Programa de Gerenciamento de Riscos (PGR) — obrigatório para todas as empresas — precisa agora contemplar: inventário dos perigos psicossociais, avaliação de risco por função e área, medidas de controle (hierarquia: eliminação → substituição → controles administrativos) e monitoramento contínuo.</p><p>Não existe um método único prescrito: a norma exige o resultado — identificação e controle —, não o processo. Isso dá flexibilidade, mas também exige competência técnica para não gerar apenas papelada sem efeito real.</p><h2>Como Adequar Sua Organização</h2><p>O ponto de partida é um diagnóstico: levantamento dos perigos psicossociais presentes, entrevistas e questionários validados com os trabalhadores, análise de dados de saúde e afastamentos. A seguir vem a atualização do PGR, a capacitação das lideranças e a implantação de medidas de controle rastreáveis.</p><p>Empresas com ISO 45001 têm vantagem: a norma já exige consideração de fatores psicossociais na avaliação de riscos (cláusula 6.1.2). A AGI integra a adequação à NR-01 ao SGI existente, evitando duplicação de esforços e documentação paralela.</p>`,
    category: `Saúde e Segurança`,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    published_date: '2026-10-06 11:00:00.000Z',
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
    category: `Meio Ambiente`,
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
    category: `Qualidade`,
    image: 'https://images.unsplash.com/photo-1655204903983-73007f15cb3e?auto=format&fit=crop&q=80&w=800',
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
