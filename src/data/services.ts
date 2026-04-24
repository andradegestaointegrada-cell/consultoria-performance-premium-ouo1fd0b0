export interface ServiceData {
  t: string
  d: string
  hi: string
  ci: string
  w: string
  methodologyDetails: string
  trainingPillars: string[]
  deliverablesText: string
}

export const S_DATA: Record<string, ServiceData> = {
  'iso-9001': {
    t: 'ISO 9001',
    d: 'A Andrade Gestão Integrada implementa Sistemas de Gestão da Qualidade com foco na excelência.',
    hi: 'https://i.postimg.cc/t4Z2xNx0/BANNER_9001.jpg',
    ci: 'https://i.postimg.cc/15YvXjfS/9001_DESCRIÇÃO_SERVIÇO.jpg',
    w: 'Processos robustos que garantem a padronização e a alta performance contínua.',
    methodologyDetails:
      'Nossa metodologia para a ISO 9001 baseia-se na imersão profunda nos processos da sua empresa. Através de um diagnóstico gap-analysis rigoroso, desenvolvemos planos de ação customizados para fechar lacunas de conformidade, garantindo uma transição fluida e certificação sem surpresas.',
    trainingPillars: [
      'Conscientização da Qualidade e Política Interna',
      'Mapeamento de Processos e KPIs',
      'Formação de Auditores Internos ISO 9001',
      'Tratamento de Não Conformidades (MASP/8D)',
    ],
    deliverablesText:
      'Implementamos soluções de alta performance onde a certificação atua como uma alavanca estratégica para a eficiência operacional e a redução de desperdícios. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Operacionais, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando operações robustas e previsíveis.',
  },
  'iso-14001': {
    t: 'ISO 14001',
    d: 'Transformamos a gestão ambiental em um diferencial competitivo sustentável.',
    hi: 'https://i.postimg.cc/bwD3t9tz/14001_BANNER.jpg',
    ci: 'https://i.postimg.cc/yYrLxbk7/14001_DESCRIÇÃO_SERVIÇO.jpg',
    w: 'Estratégias sustentáveis integradas ao negócio, mitigando impactos ambientais.',
    methodologyDetails:
      'Nossa abordagem para a ISO 14001 foca na identificação assertiva de aspectos e impactos ambientais. Estruturamos controles operacionais eficazes e promovemos o engajamento da liderança para assegurar a sustentabilidade das operações e o compliance legal.',
    trainingPillars: [
      'Conscientização e Política Ambiental',
      'Levantamento de Aspectos e Impactos',
      'Gestão de Resíduos e Efluentes',
      'Auditoria Interna Ambiental',
    ],
    deliverablesText:
      'Implementamos soluções de alta performance onde a certificação atua como uma alavanca estratégica para a eficiência ambiental e otimização de recursos, mitigando passivos e focando na redução de desperdícios. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Ambientais, Estruturação de Indicadores de Desempenho (KPIs) de Sustentabilidade e Auditoria de Prontidão, consolidando operações sustentáveis e em total compliance.',
  },
  'iso-45001': {
    t: 'ISO 45001',
    d: 'Estruturamos sistemas robustos de Saúde e Segurança Ocupacional para eliminar riscos.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=engineer%20safety%20helmet%20factory&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=industrial%20workers%20safety%20gear&dpr=2',
    w: 'Criação de um ambiente seguro, reduzindo acidentes e fortalecendo a cultura de segurança.',
    methodologyDetails:
      'Para a ISO 45001, priorizamos a mitigação de riscos e a promoção de uma cultura de segurança proativa. Realizamos o levantamento de perigos e estruturamos programas de saúde e segurança robustos e integrados ao dia a dia dos colaboradores.',
    trainingPillars: [
      'Cultura de Segurança e Comportamento Seguro',
      'Identificação de Perigos e Avaliação de Riscos',
      'Investigação de Acidentes e Incidentes',
      'Formação de Auditores Internos ISO 45001',
    ],
    deliverablesText:
      'Implementamos soluções focadas na mitigação de perigos e na resiliência operacional, onde a certificação atua como alavanca estratégica para a máxima eficiência e redução de desperdícios ligados a incidentes. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Ocupacionais, Estruturação de KPIs de Segurança e Auditoria de Prontidão, consolidando um ambiente de trabalho seguro e produtivo.',
  },
  sgi: {
    t: 'SGI (Sistema de Gestão Integrada)',
    d: 'Sinergia e máxima eficiência através da integração de múltiplas normas em um único sistema.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=integrated%20management%20system&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=business%20process%20integration&dpr=2',
    w: 'Eliminação de redundâncias operacionais e visão unificada dos resultados.',
    methodologyDetails:
      'Nossa abordagem para o SGI foca na eliminação de redundâncias e na criação de sinergia entre normas (como ISO 9001, 14001 e 45001). Harmonizamos a base documental e os ciclos de auditoria para potencializar os resultados integrados da organização.',
    trainingPillars: [
      'Interpretação Integrada de Requisitos (Anexo SL)',
      'Auditoria Interna de SGI',
      'Tratamento de Não Conformidades Sistêmicas',
      'Gestão de Indicadores Integrados',
    ],
    deliverablesText:
      'Implementamos soluções de alta performance focadas na eliminação de redundâncias e na sinergia entre normas, onde o sistema atua como alavanca estratégica para a eficiência operacional e a redução de desperdícios. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Integrados, Estruturação de KPIs Multidimensionais e Auditoria de Prontidão, consolidando uma gestão corporativa unificada e de excelência.',
  },
  'pbqp-h': {
    t: 'PBQP-H',
    d: 'Programa de Qualidade do Habitat focado na melhoria e sustentabilidade da construção civil.',
    hi: 'https://i.postimg.cc/bY3NWQFL/PBQP_H_BANNER.jpg',
    ci: 'https://i.postimg.cc/vHTHscJB/PBQP_H_DESCRIÇÃO.jpg',
    w: 'Aumento de produtividade, compliance setorial e redução de desperdícios em obras.',
    methodologyDetails:
      'Para o PBQP-H, a metodologia integra as exigências específicas do SiMAC com a dinâmica do canteiro de obras. Realizamos auditorias de qualificação de fornecedores, avaliação de materiais e controle tecnológico in-loco para assegurar a conformidade desde a fundação até o acabamento.',
    trainingPillars: [
      'Interpretação dos Requisitos do SiMAC',
      'Controle Tecnológico e Recebimento de Materiais',
      'Gestão de Resíduos na Construção Civil',
      'Indicadores de Produtividade e Desperdício',
    ],
    deliverablesText:
      'Implementamos soluções direcionadas ao canteiro de obras, onde a certificação atua como alavanca estratégica para a eficiência construtiva e a redução de desperdícios de materiais. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Construtivos, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando projetos rentáveis e em conformidade com o SiMAC.',
  },
  'iatf-16949': {
    t: 'IATF 16949',
    d: 'Gestão da qualidade rigorosa para a cadeia de suprimentos da indústria automotiva.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=automotive%20manufacturing%20robotics&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=car%20assembly%20line%20factory&dpr=2',
    w: 'Prevenção de defeitos, redução de variação e desperdício na cadeia automotiva.',
    methodologyDetails:
      'A implementação da IATF 16949 exige rigor técnico e foco na prevenção de defeitos. Nossa metodologia aborda de forma aprofundada o core tools automotivo garantindo a aprovação nas rigorosas auditorias do setor automotivo.',
    trainingPillars: [
      'Interpretação dos Requisitos IATF 16949',
      'Core Tools Automotivo (APQP, FMEA, PPAP, MSA, SPC)',
      'Resolução de Problemas (8D/MASP)',
      'Auditoria de Processo e Produto (VDA 6.3)',
    ],
    deliverablesText:
      'Implementamos soluções de alta performance para a cadeia automotiva, onde a certificação atua como alavanca estratégica para a eficiência operacional, prevenção de defeitos e redução de desperdícios. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Automotivos, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando a confiabilidade do fornecimento.',
  },
  'iso-17020': {
    t: 'ISO/IEC 17020',
    d: 'Critérios rigorosos para garantir a competência e imparcialidade de organismos de inspeção.',
    hi: 'https://i.postimg.cc/NG6BvRJk/17020_BANNER.png',
    ci: 'https://i.postimg.cc/52jhyzgY/17000.png',
    w: 'Confiabilidade atestada nas inspeções, garantindo credibilidade no mercado.',
    methodologyDetails:
      'Para organismos de inspeção, a ISO 17020 demanda garantia de imparcialidade e competência técnica. Mapeamos os processos de inspeção, implementamos controles de confidencialidade e garantimos a rastreabilidade técnica dos laudos.',
    trainingPillars: [
      'Requisitos de Imparcialidade e Confidencialidade',
      'Gestão de Qualidade em Inspeções',
      'Critérios de Competência Técnica',
      'Formação de Auditores ISO 17020',
    ],
    deliverablesText:
      'Implementamos soluções para organismos de inspeção, onde a acreditação atua como alavanca estratégica para a eficiência técnica e a redução de desperdícios operacionais. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos de Imparcialidade, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando operações precisas e processos imparciais.',
  },
  'iso-17025': {
    t: 'ISO/IEC 17025',
    d: 'Competência técnica e resultados consistentes para laboratórios de ensaio e calibração.',
    hi: 'https://i.postimg.cc/xdBnn5VF/17025_BANNER.png',
    ci: 'https://i.postimg.cc/Sx3KVCx0/17025-DESCRICAO.png',
    w: 'Padronização internacional e reconhecimento da qualidade dos seus laudos e ensaios.',
    methodologyDetails:
      'Laboratórios de ensaio e calibração necessitam de confiabilidade inquestionável. Estruturamos a ISO 17025 com foco na validação de métodos, cálculo de incerteza de medição e garantia da validade dos resultados através de ensaios de proficiência.',
    trainingPillars: [
      'Validação de Métodos e Rastreabilidade Metrológica',
      'Cálculo de Incerteza de Medição',
      'Garantia da Validade dos Resultados',
      'Auditoria Interna ISO 17025',
    ],
    deliverablesText:
      'Implementamos soluções para laboratórios, onde a acreditação atua como alavanca estratégica para a eficiência analítica e a redução de desperdícios de recursos. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Laboratoriais, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando a validade técnica de ensaios e calibrações.',
  },
  sassmaq: {
    t: 'SASSMAQ',
    d: 'Avaliação de segurança, saúde, meio ambiente e qualidade no transporte de químicos.',
    hi: 'https://i.postimg.cc/8CfxBr7N/SASSMAQ_BANNER.png',
    ci: 'https://i.postimg.cc/wjvCMrHv/SASSMAQ_DESCRIÇÃO.png',
    w: 'Minimização de riscos operacionais e adequação às exigências da indústria química.',
    methodologyDetails:
      'O SASSMAQ é vital para o transporte rodoviário de produtos químicos. Focamos no gerenciamento de riscos no transporte, resposta a emergências e qualificação de motoristas, garantindo que as exigências da indústria sejam atendidas na íntegra.',
    trainingPillars: [
      'Gerenciamento de Riscos no Transporte de Químicos',
      'Atendimento a Emergências Químicas',
      'Comportamento Seguro e Direção Defensiva',
      'Inspeção e Manutenção de Frota',
    ],
    deliverablesText:
      'Implementamos soluções logísticas, onde a avaliação SASSMAQ atua como alavanca estratégica para a eficiência no transporte e a redução de desperdícios operacionais. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos no Transporte, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando operações logísticas seguras e preparadas para emergências.',
  },
  esg: {
    t: 'Consultoria ESG',
    d: 'Guiamos sua empresa na jornada ESG, alinhando propósito e governança sólida.',
    hi: 'https://img.usecurling.com/p/1920/1080?q=sustainable%20corporate%20wind%20energy&dpr=2',
    ci: 'https://img.usecurling.com/p/800/600?q=environmental%20social%20governance%20business&dpr=2',
    w: 'Apoiamos na estruturação completa de práticas alinhadas às exigências dos investidores.',
    methodologyDetails:
      'A jornada ESG requer alinhamento estratégico e ações tangíveis. Avaliamos a maturidade da empresa nos pilares ambiental, social e de governança, estruturando um plano de ação claro para reportar resultados e atrair investimentos responsáveis.',
    trainingPillars: [
      'Fundamentos ESG e Sustentabilidade Corporativa',
      'Engajamento de Stakeholders e Materialidade',
      'Governança, Ética e Compliance',
      'Relatórios de Sustentabilidade (GRI/SASB)',
    ],
    deliverablesText:
      'Implementamos soluções corporativas integradas, onde a jornada ESG atua como alavanca estratégica para a eficiência do negócio e a redução de desperdícios ao longo de toda a cadeia de valor. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Corporativos (ESG), Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando práticas transparentes e sustentáveis.',
  },
}

export const DEF: ServiceData = {
  t: '',
  d: 'Soluções estratégicas focadas em trazer resultados reais para a operação da sua empresa.',
  hi: 'https://img.usecurling.com/p/1920/1080?q=business%20strategy%20corporate&dpr=2',
  ci: 'https://img.usecurling.com/p/800/600?q=corporate%20planning%20team%20meeting&dpr=2',
  w: 'Entregamos um sistema focado em gerar valor e reduzir riscos.',
  methodologyDetails:
    'Nossa metodologia adapta-se à realidade da sua empresa. Através de diagnósticos precisos e planos de ação direcionados, implementamos melhores práticas de gestão que garantem conformidade, mitigam riscos e impulsionam resultados expressivos.',
  trainingPillars: [
    'Conscientização e Engajamento Estratégico',
    'Mapeamento e Otimização de Processos',
    'Gestão de Indicadores de Performance (KPIs)',
    'Formação de Multiplicadores Internos',
  ],
  deliverablesText:
    'Implementamos soluções de alta performance onde a nossa consultoria atua como uma alavanca estratégica para a eficiência operacional e a severa redução de desperdícios. Nosso escopo técnico e analítico inclui Mapeamento Avançado de Processos, Gestão de Riscos Operacionais, Estruturação de Indicadores de Desempenho (KPIs) e Auditoria de Prontidão, consolidando operações robustas, seguras e altamente previsíveis.',
}

export const STEPS = [
  {
    step: '1',
    title: 'Diagnóstico',
    desc: 'Mapeamento da operação e identificação de gaps estratégicos.',
  },
  {
    step: '2',
    title: 'Implementação',
    desc: 'Ajustes ágeis, criação de processos customizados e treinamento.',
  },
  { step: '3', title: 'Auditoria', desc: 'Validação final de conformidade para a certificação.' },
]
