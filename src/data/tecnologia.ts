// Camada tecnológica: catálogo da Cyber Consulting ofertado também pela AGI (decisão de 06/11/2026).
// Regras (plano do site, 2.12): texto próprio, sem preço, sem logo EXIN, quem entrega explícito.
// Fonte dos nomes e escopos: site da Cyber (cyberconsulting.com.br) e da Galáxia (cyberconsulting.ia.br), 06/11/2026.
// Os textos sobre 27001, 27701, 42001 e LGPD passam pela revisão da Cyber (o dono da norma revisa).

export const CYBER_URL =
  'https://www.cyberconsulting.com.br/?utm_source=agi&utm_medium=site&utm_campaign=integracao'
export const GALAXIA_URL =
  'https://www.cyberconsulting.ia.br/?utm_source=agi&utm_medium=site&utm_campaign=integracao'

export interface FrenteTech {
  id: string
  codigo: string
  nome: string
  normas: string[]
  resumo: string
  entregas: string[]
  /** Página da AGI que aprofunda a frente, quando existe. */
  pagina?: string
}

export const FRENTES_TECH: FrenteTech[] = [
  {
    id: 'seguranca-da-informacao',
    codigo: '01',
    nome: 'Segurança da informação',
    normas: ['ISO/IEC 27001', 'ISO/IEC 27002', 'ISO/IEC 27005', 'NIST', 'CIS Controls', 'SOC 2'],
    resumo:
      'Maturidade de segurança medida, riscos cibernéticos mapeados e controles com evidência, até a certificação ISO/IEC 27001 ou o relatório SOC 2, amarrados ao sistema de gestão que a empresa já tem.',
    entregas: [
      'Diagnóstico de maturidade, mapa de riscos e plano de ação',
      'Preparação para a ISO/IEC 27001 e o SOC 2',
      'Gestão contínua de riscos cibernéticos',
      'CISO como serviço e auditorias internas',
    ],
  },
  {
    id: 'governanca-de-ia',
    codigo: '02',
    nome: 'Governança de IA',
    normas: ['ISO/IEC 42001', 'ISO/IEC 23894', 'NIST AI RMF', 'Lei de IA da UE'],
    resumo:
      'Inteligência artificial com responsáveis definidos, riscos avaliados e controles auditáveis, sem travar a inovação. A ISO/IEC 42001 usa a mesma estrutura de cláusulas da ISO 9001 e entra no SGI sem sistema paralelo.',
    entregas: [
      'Inventário e classificação de risco dos sistemas de IA',
      'Política de IA responsável e sistema de gestão de IA',
      'Due diligence de fornecedores de IA',
      'Adequação à Lei de IA da União Europeia',
    ],
    pagina: '/servicos/iso-42001',
  },
  {
    id: 'privacidade-de-dados',
    codigo: '03',
    nome: 'Privacidade de dados',
    normas: ['LGPD', 'GDPR', 'ISO/IEC 27701'],
    resumo:
      'Programa de privacidade que funciona na rotina e se sustenta em auditoria, inclusive para os dados de saúde que o sistema de SSO já trata, como ASO e PCMSO.',
    entregas: [
      'Adequação à LGPD e ao GDPR',
      'Preparação para a ISO/IEC 27701',
      'Relatórios de impacto (RIPD) e avaliação de legítimo interesse',
      'Encarregado de dados (DPO) como serviço',
    ],
  },
  {
    id: 'governanca-riscos-e-conformidade',
    codigo: '04',
    nome: 'Governança, riscos e conformidade (GRC)',
    normas: ['ISO 31000', 'ISO 22301', 'ISO/IEC 27031'],
    resumo:
      'Governança, riscos e conformidade (compliance) num só modelo: papéis e políticas definidos, riscos corporativos tratados, obrigações regulatórias acompanhadas e a continuidade do negócio preparada, ligados aos riscos e oportunidades que o SGI já registra.',
    entregas: [
      'Estrutura de governança: papéis, alçadas e políticas',
      'Gestão de riscos corporativos com a ISO 31000',
      'Conformidade regulatória (compliance) e auditorias',
      'Continuidade de negócios com a ISO 22301 e a ISO/IEC 27031',
    ],
  },
]

export interface Constelacao {
  nome: string
  dominio: string
  texto: string
}

/** Galáxia: plataforma de GRC da Cyber Consulting, com oito sistemas integrados. */
export const GALAXIA: Constelacao[] = [
  {
    nome: 'Orion',
    dominio: 'Governança de IA',
    texto:
      'Casos de uso de IA, riscos, sistema de gestão ISO/IEC 42001 e Lei de IA da UE, do diagnóstico à auditoria.',
  },
  {
    nome: 'Sirius',
    dominio: 'Segurança da informação',
    texto:
      'Maturidade, riscos, controles, planos de ação e evidências alinhados à ISO/IEC 27001 e ao NIST.',
  },
  {
    nome: 'Lyra',
    dominio: 'Privacidade de dados',
    texto:
      'Mapa de dados, registros de tratamento, RIPD, direitos dos titulares e rotina do encarregado.',
  },
  {
    nome: 'Polaris',
    dominio: 'Governança corporativa',
    texto: 'Estruturas, papéis, comitês, processos decisórios e controles internos.',
  },
  {
    nome: 'Cefeu',
    dominio: 'Políticas, normas e procedimentos',
    texto:
      'Ciclo de vida dos documentos normativos: redação com IA, aprovação rastreável, publicação e vigência.',
  },
  {
    nome: 'Cassiopeia',
    dominio: 'Gestão de riscos',
    texto:
      'Riscos corporativos e por domínio com um só método, de segurança e privacidade a terceiros e IA.',
  },
  {
    nome: 'Delphinus',
    dominio: 'Gestão de terceiros',
    texto:
      'Due diligence, avaliação de riscos e monitoramento de fornecedores, da contratação ao encerramento.',
  },
  {
    nome: 'Andrômeda',
    dominio: 'Cultura e treinamentos',
    texto:
      'Trilhas de conscientização, ambiente de acesso para as pessoas e evidência de treinamento.',
  },
]

export interface Trilha {
  nome: string
  itens: { sigla: string; nome: string; nota?: string }[]
}

/** Certificações EXIN, com cursos preparatórios da Cyber Cultura (parceira oficial EXIN desde 2019). */
export const TRILHAS_EXIN: Trilha[] = [
  {
    nome: 'Segurança da informação',
    itens: [
      { sigla: 'ISFS', nome: 'Information Security Foundation' },
      { sigla: 'ISMP', nome: 'Information Security Management Professional' },
      { sigla: 'ISO', nome: 'Information Security Officer', nota: 'Formação: ISFS, PDPF e ISMP' },
    ],
  },
  {
    nome: 'Privacidade e proteção de dados',
    itens: [
      { sigla: 'PDPE', nome: 'Privacy and Data Protection Essentials', nota: 'Com foco na LGPD' },
      { sigla: 'PDPF', nome: 'Privacy and Data Protection Foundation' },
      { sigla: 'PDPP', nome: 'Privacy and Data Protection Professional' },
      { sigla: 'DPO', nome: 'Data Protection Officer', nota: 'Formação: ISFS, PDPF e PDPP' },
    ],
  },
  {
    nome: 'Inteligência artificial',
    itens: [
      { sigla: 'AICP', nome: 'Artificial Intelligence Compliance Professional' },
      { sigla: 'AICO', nome: 'AI Compliance Officer', nota: 'Formação: ISFS, PDPF e AICP' },
      {
        sigla: 'AISP',
        nome: 'AI Security Professional',
        nota: 'Novo, baseado no OWASP AI Exchange',
      },
    ],
  },
]

export const APOIO_EXIN = [
  {
    nome: 'Vouchers de exame com desconto',
    texto: 'Compra do voucher de qualquer exame EXIN, intermediada pela parceira oficial.',
  },
  {
    nome: 'Mentoria pré-exame',
    texto: 'Uma hora com o professor do curso antes da prova, para dúvidas de conteúdo e do exame.',
  },
]

/** Cursos de normas da Cyber Cultura. */
export const CURSOS_NORMAS = [
  { norma: 'ISO/IEC 27001/27002', tema: 'Requisitos e controles de segurança' },
  { norma: 'ISO/IEC 27005', tema: 'Riscos de segurança da informação' },
  { norma: 'ISO/IEC 27701', tema: 'Gestão da privacidade da informação' },
  { norma: 'ISO/IEC 27031', tema: 'Prontidão de TI para continuidade' },
  { norma: 'ISO 22301', tema: 'Continuidade de negócios' },
  { norma: 'ISO 31000', tema: 'Riscos corporativos' },
  { norma: 'ISO/IEC 42001', tema: 'Sistema de gestão de IA' },
  { norma: 'ISO/IEC 23894', tema: 'Riscos de IA' },
  { norma: 'ISO/IEC TR 24368', tema: 'Ética e impactos sociais da IA' },
  { norma: 'NIST AI RMF', tema: 'Gestão de riscos de IA' },
  { norma: 'LGPD', tema: 'Práticas de adequação' },
  { norma: 'Cyber GRC', tema: 'Estrutura, processos e indicadores' },
  { norma: 'GRC para Vendas', tema: 'Venda consultiva de segurança' },
  { norma: 'Defesa em Profundidade', tema: 'Camadas de proteção, do perímetro aos dados' },
]

export const CULTURA = [
  {
    nome: 'Mentoria profissional',
    texto:
      'Acompanhamento individual para profissionais de segurança, privacidade e GRC que miram posições de liderança, com avaliação de perfil comportamental.',
  },
  {
    nome: 'Palestras corporativas',
    texto:
      'Encontros sob medida, presenciais ou online, sobre segurança da informação, privacidade, GRC e governança de IA, para equipes e lideranças.',
  },
  {
    nome: 'Programa de conscientização',
    texto:
      'Programa contínuo com diagnóstico, trilhas por perfil, campanhas e medição, para a cultura de segurança não depender de um treinamento anual.',
  },
]

/** Método comum dos projetos conjuntos (plano do site, 2.7). */
export const METODO_INTEGRADO = [
  {
    nome: 'Diagnóstico integrado',
    texto: 'Um só levantamento cobre o SGI e as frentes de segurança, privacidade e IA.',
  },
  {
    nome: 'Plano único',
    texto: 'Cronograma, responsáveis e entregas de todas as frentes no mesmo plano.',
  },
  {
    nome: 'Implantação por frente',
    texto: 'Cada empresa conduz o seu escopo, na mesma estrutura documental.',
  },
  {
    nome: 'Auditoria interna integrada',
    texto: 'Uma auditoria cobre todas as normas do sistema, com um relatório só.',
  },
  {
    nome: 'Sustentação',
    texto: 'Indicadores, análise crítica e melhoria contínua num ciclo comum.',
  },
]
