import iso9001Hero from '@/assets/servicos/9001-hero.webp'
import iso9001Conteudo from '@/assets/servicos/9001-conteudo.webp'
import iso14001Hero from '@/assets/servicos/14001-hero.webp'
import iso14001Conteudo from '@/assets/servicos/14001-conteudo.webp'
import pbqphHero from '@/assets/servicos/pbqph-hero.webp'
import pbqphConteudo from '@/assets/servicos/pbqph-conteudo.webp'
import iso17020Hero from '@/assets/servicos/17020-hero.webp'
import iso17020Conteudo from '@/assets/servicos/17020-conteudo.webp'
import sassmaqHero from '@/assets/servicos/sassmaq-hero.webp'
import sassmaqConteudo from '@/assets/servicos/sassmaq-conteudo.webp'
import automotivo from '@/assets/frentes/frente-automotivo.webp'
import esgFrente from '@/assets/frentes/frente-esg.webp'
import laboratorio from '@/assets/frentes/frente-laboratorio.webp'
import iso45001Hero from '@/assets/servicos/45001-hero.webp'
import iso45001Conteudo from '@/assets/servicos/45001-conteudo.webp'
import sgiHero from '@/assets/servicos/sgi-hero.webp'
import sgiConteudo from '@/assets/servicos/sgi-conteudo.webp'
import iatfHero from '@/assets/servicos/iatf-hero.webp'
import esgHero from '@/assets/servicos/esg-hero.webp'
import iso17025Hero from '@/assets/servicos/17025-hero.webp'
import iso42001Hero from '@/assets/servicos/42001-hero.webp'
import iso42001Conteudo from '@/assets/servicos/42001-conteudo.webp'
import iso37001Hero from '@/assets/servicos/37001-hero.webp'
import iso37001Conteudo from '@/assets/servicos/37001-conteudo.webp'

import type { ImageMetadata } from 'astro'

export interface ServiceData {
  t: string
  d: string
  hi: ImageMetadata
  ci: ImageMetadata
  w: string
  methodologyDetails: string
  trainingPillars: string[]
  deliverablesText: string
  /** Perguntas frequentes próprias do serviço (viram FAQPage no JSON-LD). */
  faq: { q: string; a: string }[]
}

export const S_DATA: Record<string, ServiceData> = {
  'iso-9001': {
    t: 'ISO 9001',
    d: 'A Andrade Gestão Integrada implementa Sistemas de Gestão da Qualidade com foco na excelência.',
    hi: iso9001Hero,
    ci: iso9001Conteudo,
    w: 'Processos robustos que garantem a padronização e a alta performance contínua.',
    methodologyDetails:
      'A AGI parte do diagnóstico contra a ISO 9001:2026, com análise de lacunas e plano de ação. Em seguida, estruturamos processos, indicadores e controles com a equipe do cliente, aproveitando os documentos e registros que a operação já usa. A auditoria interna segue a ISO 19011:2026, com tratamento das constatações. A certificação fica com o organismo acreditado que você escolher.',
    trainingPillars: [
      'Conscientização da Qualidade e Política Interna',
      'Mapeamento de Processos e KPIs',
      'Formação de Auditores Internos ISO 9001',
      'Tratamento de Não Conformidades (MASP/8D)',
    ],
    deliverablesText:
      'O cliente recebe o relatório de diagnóstico com plano de ação priorizado, procedimentos e registros alinhados à ISO 9001:2026, o tratamento de riscos e oportunidades, indicadores por processo, controle de documentos, plano de treinamento aplicado à equipe e relatório de auditoria interna com constatações e ações. A documentação que o organismo certificador vai avaliar sai organizada.',
    faq: [
      {
        q: 'O que muda na ISO 9001:2026 em relação à edição 2015?',
        a: 'A edição 2026 foi publicada em 16/09/2026 e substitui a 2015. A transição dura cerca de três anos, até setembro de 2029, e os certificados emitidos na 2015 continuam válidos nesse período. Confirme o prazo final com o seu organismo certificador. A AGI avalia o impacto da mudança no seu sistema já no diagnóstico.',
      },
      {
        q: 'Quanto tempo leva a implementação?',
        a: 'Depende do porte da empresa, do número de unidades, da maturidade dos processos e da disponibilidade da equipe. Empresas com registros organizados avançam mais rápido. O prazo realista sai do diagnóstico, que mede as lacunas e prioriza as ações. Não fechamos número de meses antes dessa análise.',
      },
      {
        q: 'O que a empresa precisa ter antes de começar?',
        a: 'Nenhum pré-requisito formal. O diagnóstico parte da situação atual, com ou sem sistema estruturado. Ajuda ter as pessoas-chave identificadas, acesso aos processos e aos registros existentes e o apoio da direção. Durante a implementação, a AGI ajusta documentos, treina a equipe e valida os controles com quem executa o trabalho.',
      },
      {
        q: 'Quem emite o certificado ISO 9001?',
        a: 'Um organismo de certificação acreditado, escolhido pelo cliente. A AGI não certifica: implementamos, mantemos e auditamos o sistema para que ele sustente a avaliação externa. Também indicamos critérios para comparar organismos, e a decisão da contratação fica com a sua empresa.',
      },
      {
        q: 'Quais documentos e registros a norma exige?',
        a: 'A norma não prescreve formatos: cobra evidência de controle. Entram nesse conjunto o escopo, a política e os objetivos da qualidade, o tratamento de riscos e oportunidades, os indicadores, os registros de competência, de auditoria interna e de análise crítica pela direção. A lista para o seu contexto sai do diagnóstico.',
      },
    ],
  },
  'iso-14001': {
    t: 'ISO 14001',
    d: 'Transformamos a gestão ambiental em um diferencial competitivo sustentável.',
    hi: iso14001Hero,
    ci: iso14001Conteudo,
    w: 'Estratégias sustentáveis integradas ao negócio, mitigando impactos ambientais.',
    methodologyDetails:
      'Na ISO 14001:2026, o trabalho começa pelo diagnóstico: aspectos e impactos ambientais, requisitos legais e lacunas do sistema atual. Em seguida, a AGI estrutura controles operacionais, preparação para emergências e metas ambientais com a equipe do cliente. A auditoria interna segue a ISO 19011:2026, e as constatações são tratadas antes da avaliação do organismo certificador.',
    trainingPillars: [
      'Conscientização e Política Ambiental',
      'Levantamento de Aspectos e Impactos',
      'Gestão de Resíduos e Efluentes',
      'Auditoria Interna Ambiental',
    ],
    deliverablesText:
      'O cliente recebe o relatório de diagnóstico com plano de ação, a matriz de aspectos e impactos ambientais, o levantamento dos requisitos legais aplicáveis, procedimentos de controle operacional e de resposta a emergências, metas e indicadores ambientais, registros de treinamento da equipe e relatório de auditoria interna. Cada documento é construído com quem executa, para funcionar na prática.',
    faq: [
      {
        q: 'A ISO 14001:2026 já está valendo?',
        a: 'Sim. Publicada em abril de 2026, ela substitui a edição 2015. A transição dura três anos, e as empresas certificadas ajustam o sistema nesse intervalo. O calendário das auditorias depende do organismo certificador. A AGI avalia as mudanças no seu sistema e monta o plano de transição.',
      },
      {
        q: 'Do que depende o prazo da implementação?',
        a: 'Do porte, do número de unidades, da complexidade ambiental das operações, das licenças exigidas e da disponibilidade da equipe. Uma planta com poucos aspectos ambientais avança mais rápido que um site com efluentes, emissões e resíduos regulados. O prazo realista sai do diagnóstico.',
      },
      {
        q: 'Preciso resolver as licenças ambientais antes?',
        a: 'O sistema exige gestão de requisitos legais, e a situação das licenças é verificada no diagnóstico. A AGI não substitui o licenciamento: estruturamos a avaliação de conformidade, os controles e o registro de evidências que o organismo certificador vai cobrar. Pendências legais precisam de tratamento antes da auditoria externa.',
      },
      {
        q: 'Quem certifica a ISO 14001?',
        a: 'Um organismo de certificação acreditado, escolhido pela empresa. A AGI não certifica: conduz o sistema até a auditoria externa e segue como suporte depois dela. Definimos com você os critérios de escolha do organismo, como escopo, reconhecimento e prazos de auditoria.',
      },
      {
        q: 'Como a 14001 se conecta com a 9001 e a 45001?',
        a: 'As três normas seguem a Estrutura Harmonizada da ISO, com capítulos comuns: contexto, liderança, planejamento, apoio, operação, avaliação e melhoria. Isso permite política única, riscos consolidados e auditoria interna combinada. Se o seu sistema já tem a 9001, a 14001 entra sem refazer o que funciona.',
      },
    ],
  },
  'iso-45001': {
    t: 'ISO 45001',
    d: 'Estruturamos sistemas robustos de Saúde e Segurança Ocupacional para eliminar riscos.',
    hi: iso45001Hero,
    ci: iso45001Conteudo,
    w: 'Criação de um ambiente seguro, reduzindo acidentes e fortalecendo a cultura de segurança.',
    methodologyDetails:
      'A AGI diagnostica o sistema contra a ISO 45001:2018 com a Emenda 1:2024, que leva as mudanças climáticas para a análise de contexto e de partes interessadas. Estruturamos identificação de perigos, avaliação de riscos, controles operacionais, participação dos trabalhadores e resposta a emergências com a equipe do cliente. A auditoria interna segue a ISO 19011:2026, com plano de ação até a certificação.',
    trainingPillars: [
      'Cultura de Segurança e Comportamento Seguro',
      'Identificação de Perigos e Avaliação de Riscos',
      'Investigação de Acidentes e Incidentes',
      'Formação de Auditores Internos ISO 45001',
    ],
    deliverablesText:
      'O cliente recebe o relatório de diagnóstico com plano de ação, o inventário de perigos e a avaliação de riscos de SST, o levantamento dos requisitos legais aplicáveis, procedimentos e registros operacionais, o plano de preparação e resposta a emergências, indicadores de saúde e segurança, treinamentos registrados e relatório de auditoria interna com as ações tratadas com a liderança.',
    faq: [
      {
        q: 'O que é a Emenda 1:2024?',
        a: 'É a alteração que inclui as mudanças climáticas na ISO 45001:2018: a empresa passa a considerar se o tema é relevante no seu contexto (requisito 4.1) e para as partes interessadas (4.2). A edição vigente continua sendo a de 2018. A AGI verifica no diagnóstico se o seu sistema já responde à emenda e ajusta o que faltar.',
      },
      {
        q: 'A ISO 45001 vai ser revisada?',
        a: 'Sim. A revisão está em andamento, com publicação prevista para 2027. Até lá, a edição 2018 com a Emenda 1:2024 segue vigente e as certificações continuam válidas. Quando a nova edição sair, haverá período de transição. A AGI acompanha o processo e planeja a adaptação com antecedência.',
      },
      {
        q: 'Do que depende o prazo para ficar pronto?',
        a: 'Do porte, do número de unidades, da maturidade dos controles de segurança, do histórico de ocorrências e da disponibilidade da equipe. Sistema de SST envolve mudança de comportamento, não só papel. O diagnóstico mede o ponto de partida e define o plano com prazos realistas para cada frente.',
      },
      {
        q: 'A AGI pode me certificar na 45001?',
        a: 'Não. Nenhuma consultoria certifica: isso é papel de organismo acreditado, escolhido pela empresa. A AGI prepara o sistema, audita internamente e acompanha o tratamento das não conformidades apontadas pelo organismo até a emissão do certificado.',
      },
      {
        q: 'Que evidências de SST preciso manter?',
        a: 'Registros de identificação de perigos e avaliação de riscos, evidências de participação e consulta dos trabalhadores, treinamentos, inspeções de segurança, simulados de emergência, avaliação de conformidade legal, indicadores e as auditorias internas com suas ações. O diagnóstico aponta o que já existe e o que falta estruturar.',
      },
    ],
  },
  sgi: {
    t: 'SGI (Sistema de Gestão Integrada)',
    d: 'Sinergia e máxima eficiência através da integração de múltiplas normas em um único sistema.',
    hi: sgiHero,
    ci: sgiConteudo,
    w: 'Eliminação de redundâncias operacionais e visão unificada dos resultados.',
    methodologyDetails:
      'A AGI integra a 9001, a 14001 e a 45001 pela Estrutura Harmonizada da ISO, que dá aos sistemas de gestão capítulos comuns: contexto, liderança, planejamento, apoio, operação, avaliação e melhoria. O diagnóstico avalia os três referenciais de uma vez e separa o que já funciona do que precisa ser criado. Procedimentos, registros e auditorias internas são planejados em conjunto, sem controle duplicado.',
    trainingPillars: [
      'Interpretação Integrada de Requisitos (Anexo SL)',
      'Auditoria Interna de SGI',
      'Tratamento de Não Conformidades Sistêmicas',
      'Gestão de Indicadores Integrados',
    ],
    deliverablesText:
      'O cliente recebe um diagnóstico único dos três referenciais com plano de ação consolidado, política e objetivos integrados, procedimentos comuns e específicos por norma, matriz de riscos combinada, programa de auditoria interna que cobre o sistema inteiro e um conjunto único de indicadores. A empresa mantém um só sistema, sem três camadas paralelas de documentos.',
    faq: [
      {
        q: 'Vale mais a pena integrar ou certificar separado?',
        a: 'Depende da estrutura da empresa. A integração reduz duplicidade: uma política, um programa de auditoria interna, uma análise crítica. Se a empresa já tem certificados separados, a migração é planejada sem parar as operações. O diagnóstico compara o esforço das duas rotas no seu caso.',
      },
      {
        q: 'A certificação do SGI é um só certificado?',
        a: 'Pode ser um certificado com três escopos ou três certificados com auditorias combinadas. A decisão envolve o organismo certificador, o mercado em que você atua e o custo de auditoria. A AGI estrutura o sistema para funcionar nas duas formas e prepara a documentação para o formato escolhido.',
      },
      {
        q: 'Do que depende o prazo do SGI?',
        a: 'Da maturidade atual em cada norma, do número de unidades e da disponibilidade da equipe. Se a empresa já tem a 9001 consolidada, integrar a 14001 e a 45001 costuma ser mais rápido do que começar do zero. O prazo sai do diagnóstico, que mede cada pilar separadamente.',
      },
      {
        q: 'Preciso ter uma norma certificada antes de integrar?',
        a: 'Não. O SGI pode nascer integrado, com diagnóstico único e implementação combinada. Também é comum partir de um certificado existente e incorporar as outras normas sobre essa base. Nos dois casos, a auditoria interna e a análise crítica passam a cobrir o sistema completo.',
      },
      {
        q: 'Como fica a documentação: uma política só?',
        a: 'Uma política integrada, objetivos consolidados e procedimentos comuns onde os requisitos se sobrepõem, como competência, comunicação e ação corretiva. Os controles específicos de meio ambiente e de segurança ficam em procedimentos próprios. A AGI mapeia essa divisão no diagnóstico.',
      },
    ],
  },
  'pbqp-h': {
    t: 'PBQP-H',
    d: 'Programa de Qualidade do Habitat focado na melhoria e sustentabilidade da construção civil.',
    hi: pbqphHero,
    ci: pbqphConteudo,
    w: 'Aumento de produtividade, compliance setorial e redução de desperdícios em obras.',
    methodologyDetails:
      'A AGI trabalha com o Regimento do SiAC 2021, no nível B ou no nível A, conforme o perfil da construtora e a exigência das obras. O diagnóstico avalia os requisitos do regimento, que tem a ISO 9001:2015 como base, no escritório e no canteiro. Estruturamos com as equipes o plano da qualidade da obra, os serviços e materiais controlados e as fichas de verificação. A avaliação externa fica com o organismo acreditado.',
    trainingPillars: [
      'Interpretação dos Requisitos do SiAC',
      'Controle Tecnológico e Recebimento de Materiais',
      'Gestão de Resíduos na Construção Civil',
      'Indicadores de Produtividade e Desperdício',
    ],
    deliverablesText:
      'O cliente recebe o diagnóstico de conformidade com o Regimento do SiAC 2021, o manual e os procedimentos da construtora, o plano da qualidade da obra, a lista de serviços e materiais controlados, as fichas de verificação de serviços e de materiais (FVS e FVM), o treinamento das equipes de obra e de escritório e o relatório de auditoria interna alinhado aos critérios da avaliação externa.',
    faq: [
      {
        q: 'O SiAC continua baseado na ISO 9001:2015?',
        a: 'Sim. O Regimento do SiAC 2021 (Portaria nº 75/2021, alterada pela nº 577/2021) continua tendo a ISO 9001:2015 como base. Por ora, a construtora não precisa tratar a transição para a ISO 9001:2026 para atender o SiAC. A AGI acompanha as atualizações do programa e orienta quando houver mudança.',
      },
      {
        q: 'Nível B ou nível A: qual buscar?',
        a: 'Depende do porte da construtora, do tipo de obra e das exigências de contratos e financiadores. O nível B é a porta de entrada e o nível A tem requisitos ampliados. A escolha certa evita retrabalho de documentação. O diagnóstico indica o nível adequado ao seu plano comercial e operacional.',
      },
      {
        q: 'Do que depende o prazo para ficar pronto?',
        a: 'Do número de obras ativas, da maturidade dos controles em canteiro, do engajamento das equipes de obra e da disponibilidade do escritório técnico. O SiAC cobra evidência na obra, não só documento. O prazo sai do diagnóstico, que avalia como os controles funcionam hoje em campo.',
      },
      {
        q: 'Quem avalia a construtora no SiAC?',
        a: 'Um organismo de avaliação da conformidade acreditado pela Cgcre/Inmetro para o SiAC. A AGI não avalia: implementamos e mantemos o sistema, treinamos as equipes e fazemos a auditoria interna que antecede a avaliação externa. Assim, a construtora chega à avaliação com as evidências organizadas e os desvios tratados.',
      },
      {
        q: 'Para que o SiAC é exigido, na prática?',
        a: 'É requisito frequente para financiamento habitacional da Caixa e para programas públicos de habitação. Sem a qualificação, a construtora fica fora dessas linhas de crédito e das obras com essa exigência. O diagnóstico mostra o caminho até a avaliação e o que precisa existir de fato no canteiro e no escritório.',
      },
    ],
  },
  'iatf-16949': {
    t: 'IATF 16949',
    d: 'Gestão da qualidade rigorosa para a cadeia de suprimentos da indústria automotiva.',
    hi: iatfHero,
    ci: automotivo,
    w: 'Prevenção de defeitos, redução de variação e desperdício na cadeia automotiva.',
    methodologyDetails:
      'A AGI conduz o diagnóstico contra a IATF 16949:2016 e as Interpretações Sancionadas vigentes, considerando os requisitos específicos de cada montadora cliente (CSR). Estruturamos a aplicação das core tools APQP, FMEA, PPAP, MSA e CEP nos processos da fábrica. Quando o cliente exige, preparamos a empresa para a auditoria de processo VDA 6.3. A certificação cabe ao organismo reconhecido pela IATF.',
    trainingPillars: [
      'Interpretação dos Requisitos IATF 16949',
      'Core Tools Automotivo (APQP, FMEA, PPAP, MSA, SPC)',
      'Resolução de Problemas (8D/MASP)',
      'Auditoria de Processo e Produto (VDA 6.3)',
    ],
    deliverablesText:
      'O cliente recebe o diagnóstico frente aos requisitos da IATF e às CSRs aplicáveis, a análise de riscos do processo produtivo, PFMEA e planos de controle estruturados com a engenharia, pacotes PPAP organizados para a aprovação de peças, plano de calibração e estudos de MSA, treinamento da equipe nas core tools e os relatórios das auditorias internas de sistema, de processo e de produto.',
    faq: [
      {
        q: 'Preciso ter ISO 9001 certificada antes da IATF?',
        a: 'Não é preciso certificado separado. A IATF 16949 complementa a ISO 9001 e as duas são aplicadas juntas: o sistema atende aos dois conjuntos de requisitos desde o início, e o certificado emitido é o da IATF 16949. O diagnóstico mapeia o que já existe e o que precisa ser estruturado para o setor automotivo.',
      },
      {
        q: 'O que são as CSRs?',
        a: 'São os requisitos específicos de cliente: exigências que cada montadora publica e acrescenta à norma, com prazos, documentação e controles próprios. Não se confundem com as Interpretações Sancionadas, que a IATF publica para esclarecer a norma. A AGI monta a matriz de CSRs aplicáveis ao seu portfólio e garante que a auditoria interna as cubra.',
      },
      {
        q: 'Do que depende o prazo da implementação?',
        a: 'Da maturidade dos processos produtivos, do domínio das core tools pela equipe, do volume de produtos em aprovação e das pendências com os clientes. Fábrica com PPAP e FMEA vivos avança mais rápido. O prazo sai do diagnóstico, que mede a distância entre a prática atual e a norma.',
      },
      {
        q: 'Quem certifica a IATF 16949 e como a AGI se encaixa?',
        a: 'A certificação é emitida por organismo de certificação reconhecido pela IATF. A AGI não certifica: fazemos o diagnóstico, estruturamos processos e documentos, treinamos a equipe, conduzimos a auditoria interna e tratamos as constatações. A escolha do organismo é do cliente, e acompanhamos o trabalho até a avaliação.',
      },
      {
        q: 'Quais auditorias internas a norma exige?',
        a: 'Três tipos: auditoria do sistema de gestão da qualidade, auditoria do processo de fabricação e auditoria do produto, cada uma com objetivo e critérios próprios dentro do programa de auditoria. A AGI estrutura o programa, capacita os auditores internos, executa as auditorias ou orienta a equipe e acompanha as não conformidades até o fechamento.',
      },
    ],
  },
  'iso-17020': {
    t: 'ISO/IEC 17020',
    d: 'Critérios rigorosos para garantir a competência e imparcialidade de organismos de inspeção.',
    hi: iso17020Hero,
    ci: iso17020Conteudo,
    w: 'Confiabilidade atestada nas inspeções, garantindo credibilidade no mercado.',
    methodologyDetails:
      'Começamos pelo diagnóstico do organismo de inspeção: tipo A, B ou C, escopo de atuação e lacunas frente à ISO/IEC 17020:2026. Estruturamos o sistema de gestão com foco em independência, abordagem de risco e controle de dados, os pontos centrais da nova edição. Preparamos documentos, registros, treinamento e auditoria interna e acompanhamos o organismo até a acreditação ou a manutenção na Cgcre/Inmetro.',
    trainingPillars: [
      'Requisitos de Imparcialidade e Confidencialidade',
      'Gestão de Qualidade em Inspeções',
      'Critérios de Competência Técnica',
      'Formação de Auditores ISO 17020',
    ],
    deliverablesText:
      'O cliente recebe o relatório de diagnóstico com plano de ação, os documentos do sistema de gestão do organismo de inspeção (política, procedimentos e formulários), os registros das avaliações de risco e do controle de dados, os registros de competência e de treinamento dos inspetores e o relatório de auditoria interna com as constatações tratadas. Na transição, inclui o plano de migração para a edição 2026.',
    faq: [
      {
        q: 'O que muda na ISO/IEC 17020:2026 em relação à edição 2012?',
        a: 'A edição 2026 foi publicada em 27/03/2026, e a 2012 foi retirada. As mudanças principais são o modelo de independência dos organismos de inspeção (tipos A, B e C), a abordagem de risco e o controle de dados. A transição vai até março de 2029, e quem opera com a 2012 precisa ajustar o sistema nesse período.',
      },
      {
        q: 'Do que depende o prazo da implementação?',
        a: 'Do porte do organismo, do número de inspetores, da maturidade dos processos e da disponibilidade da equipe. Também conta o ponto de partida: um organismo acreditado que migra da edição 2012 tem caminho diferente de quem começa do zero. O prazo sai do diagnóstico, com etapas e responsáveis.',
      },
      {
        q: 'O que o organismo precisa ter antes de começar?',
        a: 'Ajuda ter definidos a atividade de inspeção, o escopo pretendido e a estrutura mínima de pessoal. Não é preciso ter o sistema de gestão pronto: ele é parte do trabalho. Se já existirem documentos, registros e auditorias anteriores, a AGI os aproveita no diagnóstico.',
      },
      {
        q: 'Quem concede a acreditação e como a AGI se encaixa?',
        a: 'No Brasil, a acreditação de organismos de inspeção é concedida pela Cgcre/Inmetro. A AGI não acredita: preparamos o organismo para a avaliação, estruturamos documentos e registros, treinamos a equipe e conduzimos a auditoria interna. A relação com a Cgcre é do cliente, com o nosso apoio técnico em todas as etapas.',
      },
      {
        q: 'Como a 17020 se integra às normas que a empresa já usa?',
        a: 'Treinamento, qualificação e auditoria interna podem convergir com o sistema que a empresa já tem. O que é específico da inspeção (independência, imparcialidade e controle dos dados) fica em documentos próprios. O diagnóstico marca o que se unifica e o que se mantém separado, sem duplicar documentos nem auditorias.',
      },
    ],
  },
  'iso-17025': {
    t: 'ISO/IEC 17025',
    d: 'Competência técnica e resultados consistentes para laboratórios de ensaio e calibração.',
    hi: iso17025Hero,
    ci: laboratorio,
    w: 'Padronização internacional e reconhecimento da qualidade dos seus laudos e ensaios.',
    methodologyDetails:
      'O diagnóstico mapeia o escopo de ensaios ou calibrações, os métodos, os equipamentos, o pessoal e as lacunas frente à ISO/IEC 17025:2017. Estruturamos a gestão técnica: validação de métodos, incerteza de medição, rastreabilidade metrológica e garantia da validade dos resultados. Depois preparamos documentos, registros, treinamento e auditoria interna para a avaliação da Cgcre/Inmetro.',
    trainingPillars: [
      'Validação de Métodos e Rastreabilidade Metrológica',
      'Cálculo de Incerteza de Medição',
      'Garantia da Validade dos Resultados',
      'Auditoria Interna ISO 17025',
    ],
    deliverablesText:
      'O laboratório recebe o relatório de diagnóstico, os procedimentos e registros técnicos (validação de métodos, cálculo de incerteza e rastreabilidade metrológica), o plano de participação em ensaios de proficiência, os registros de treinamento e autorização do pessoal técnico, o relatório de auditoria interna com as constatações tratadas e a proposta de escopo de acreditação para submissão à Cgcre/Inmetro.',
    faq: [
      {
        q: 'Quem acredita o laboratório e como a AGI participa?',
        a: 'No Brasil, a acreditação de laboratórios é concedida pela Cgcre/Inmetro. A AGI não acredita: preparamos o laboratório para a avaliação inicial e para as manutenções, estruturamos documentos e registros técnicos, treinamos a equipe e conduzimos a auditoria interna. A relação com a Cgcre é do cliente.',
      },
      {
        q: 'Que documentação e registros o laboratório precisa manter?',
        a: 'Os documentos do sistema de gestão e os registros técnicos: validação de métodos, cálculos de incerteza de medição, evidências de rastreabilidade metrológica, treinamento e autorização do pessoal e os dados que sustentam cada resultado emitido. A Cgcre verifica o sistema e esses registros, e a auditoria interna da AGI os verifica antes.',
      },
      {
        q: 'Quanto tempo leva o preparo para a acreditação?',
        a: 'Depende do escopo pretendido, do número de métodos, do estado dos equipamentos e da disponibilidade da equipe. O prazo sai do diagnóstico, que mapeia as lacunas técnicas e de gestão. Entram no cronograma também a agenda da Cgcre/Inmetro e a conclusão dos ensaios de proficiência.',
      },
      {
        q: 'O laboratório precisa participar de ensaios de proficiência?',
        a: 'A norma exige garantir a validade dos resultados, e os ensaios de proficiência são o mecanismo de referência: o laboratório compara o seu desempenho com o de outros. A AGI monta o plano de participação, define o que entra em cada ciclo e usa os resultados na auditoria interna e na análise crítica.',
      },
      {
        q: 'Já temos ISO 9001. Precisamos da 17025?',
        a: 'A ISO 9001 avalia o sistema de gestão da empresa e não comprova a competência técnica do laboratório. A 17025 acrescenta os requisitos técnicos: validação de métodos, incerteza, rastreabilidade e validade dos resultados. Quem exige laboratório acreditado (cliente, órgão ou licitação) pede a 17025, e as duas normas convivem no mesmo sistema.',
      },
    ],
  },
  sassmaq: {
    t: 'SASSMAQ',
    d: 'Avaliação de segurança, saúde, meio ambiente e qualidade no transporte de químicos.',
    hi: sassmaqHero,
    ci: sassmaqConteudo,
    w: 'Minimização de riscos operacionais e adequação às exigências da indústria química.',
    methodologyDetails:
      'O diagnóstico cobre a operação de transporte rodoviário de produtos químicos frente à 4ª edição do SASSMAQ, incluindo a nova área Base de Apoio quando ela se aplica. A partir das lacunas, estruturamos procedimentos, registros e controles, treinamos motoristas e equipes de apoio e conduzimos a auditoria interna. Antes da avaliação do organismo credenciado, revisamos o preparo com a empresa.',
    trainingPillars: [
      'Gerenciamento de Riscos no Transporte de Químicos',
      'Atendimento a Emergências Químicas',
      'Comportamento Seguro e Direção Defensiva',
      'Inspeção e Manutenção de Frota',
    ],
    deliverablesText:
      'A empresa recebe o relatório de diagnóstico com plano de ação, os procedimentos e registros da operação organizados frente à 4ª edição, o controle de treinamentos de motoristas e equipes de apoio e o relatório de auditoria interna com as constatações tratadas. Recebe também o plano de transição da 3ª para a 4ª edição, alinhado ao prazo de 11/03/2027, e, quando houver base de apoio, o tratamento dessa área nova.',
    faq: [
      {
        q: 'O que muda na 4ª edição do SASSMAQ?',
        a: 'A 4ª edição foi lançada pela Abiquim em 11/09/2026. A avaliação ganha a área Base de Apoio, e os temas de ESG e security ganham peso. Quem foi avaliado na 3ª edição faz a transição no período definido, e os certificados emitidos continuam válidos até o vencimento.',
      },
      {
        q: 'Quem avalia a empresa e como a AGI se encaixa?',
        a: 'A avaliação SASSMAQ é feita por organismo credenciado pela Abiquim. A AGI não avalia: preparamos a empresa, estruturamos o sistema, conduzimos a auditoria interna e tratamos as constatações antes do processo oficial. A escolha do organismo e o agendamento ficam com o cliente, com o nosso apoio.',
      },
      {
        q: 'O que a operação precisa ter organizado antes de começar?',
        a: 'Ajuda ter mapeados a operação, a frota, as rotas, os contratos com embarcadores e, quando houver, as estruturas de apoio. Com a 4ª edição, a Base de Apoio entra na avaliação, e essas estruturas passam a integrar o escopo. Não é preciso ter o sistema pronto: o diagnóstico define o que existe e o que falta.',
      },
      {
        q: 'Quais prazos a empresa precisa observar?',
        a: 'O prazo fixo é o da transição: 180 dias, até 11/03/2027. Certificados emitidos na 3ª edição valem até o vencimento. O tempo de preparo interno depende do tamanho da operação, da maturidade dos processos e da disponibilidade da equipe, e é definido no diagnóstico, antes de agendar a avaliação.',
      },
      {
        q: 'Como o SASSMAQ conversa com as normas que a empresa já tem?',
        a: 'Procedimentos, treinamentos e registros de um sistema ISO 9001 ou ISO 45001 atendem partes da avaliação, e as exigências específicas do transporte de produtos químicos ganham documentos próprios. O diagnóstico cruza os referenciais e mostra o que integra, o que fica separado e onde faltam controles.',
      },
    ],
  },
  esg: {
    t: 'Consultoria ESG',
    d: 'Guiamos sua empresa na jornada ESG, alinhando propósito e governança sólida.',
    hi: esgHero,
    ci: esgFrente,
    w: 'Apoiamos na estruturação completa de práticas alinhadas às exigências dos investidores.',
    methodologyDetails:
      'O ponto de partida é a avaliação de maturidade nos três pilares: ambiental, social e de governança. Em seguida, construímos com a liderança a matriz de dupla materialidade, cruzando impacto e relevância financeira para definir prioridades. Sobre elas, estruturamos plano de ação, indicadores e rotina de coleta de dados para o relatório, com GRI, SASB ou alinhamento às IFRS S1 e S2 quando aplicável.',
    trainingPillars: [
      'Fundamentos ESG e Sustentabilidade Corporativa',
      'Engajamento de Stakeholders e Materialidade',
      'Governança, Ética e Compliance',
      'Relatórios de Sustentabilidade (GRI/SASB)',
    ],
    deliverablesText:
      'O cliente recebe o relatório de maturidade nos pilares ambiental, social e de governança, a matriz de dupla materialidade construída com a liderança, o plano de ação priorizado com indicadores e responsáveis e a estrutura do relatório de sustentabilidade no referencial definido: GRI, SASB ou alinhamento às normas IFRS S1 e S2 do ISSB, quando aplicável. O material fica pronto para a diretoria, os clientes e os investidores.',
    faq: [
      {
        q: 'ESG da AGI é certificação?',
        a: 'Não. Consultoria ESG não é certificação ISO e não emite selo. É trabalho de avaliação e estruturação: a AGI mede a maturidade nos pilares ambiental, social e de governança, define prioridades com a matriz de dupla materialidade e organiza dados, indicadores e relatórios. Quem avalia o material depois são clientes, bancos e investidores.',
      },
      {
        q: 'O que é a matriz de dupla materialidade?',
        a: 'É a ferramenta que organiza o que importa sob duas óticas: o impacto das operações sobre o meio ambiente e as pessoas, e a relevância financeira de cada tema para o negócio. Cada assunto é avaliado nas duas dimensões, e o resultado ordena as prioridades, sem lista infinita de temas.',
      },
      {
        q: 'Com que referencial o relatório é feito?',
        a: 'Depende da demanda. A AGI estrutura o relatório com GRI ou SASB e, quando aplicável, com alinhamento às normas IFRS S1 e S2 do ISSB. A definição sai do diagnóstico, considerando o que exigem clientes, bancos e investidores e o setor da empresa. O que não se aplica fica registrado com justificativa.',
      },
      {
        q: 'Preciso ter relatório pronto ou equipe dedicada para começar?',
        a: 'Não. A avaliação de maturidade mede o ponto de partida. Ajuda ter mapeados os temas já tratados, os dados que a empresa consegue produzir e as demandas de clientes, bancos e investidores. Empresa com certificações ISO aproveita parte do sistema de gestão, e o diagnóstico mostra onde.',
      },
      {
        q: 'Quanto tempo dura o trabalho de ESG?',
        a: 'Depende da maturidade atual, dos dados disponíveis e da disponibilidade da equipe para responder e validar informações. Empresa organizada conclui a avaliação e a matriz em menos tempo do que quem parte do zero. O cronograma sai do diagnóstico, com etapas, responsáveis e entregas definidos com a liderança.',
      },
    ],
  },
  'iso-42001': {
    t: 'ISO/IEC 42001',
    d: 'Sistema de gestão de inteligência artificial com responsáveis, riscos e evidências definidos.',
    hi: iso42001Hero,
    ci: iso42001Conteudo,
    w: 'Uso de IA com responsáveis definidos, riscos avaliados e evidência pronta para auditoria.',
    methodologyDetails:
      'Começamos por um diagnóstico de prontidão e pelo inventário dos sistemas de IA que a empresa desenvolve, fornece ou utiliza. Em seguida, avaliamos riscos e impactos, montamos a Declaração de Aplicabilidade e integramos os controles aos sistemas que já existem, como ISO 9001, ISO/IEC 27001 e LGPD. Fechamos com auditoria interna e preparação para a certificação.',
    trainingPillars: [
      'Interpretação da ISO/IEC 42001',
      'Avaliação de Riscos e de Impacto de IA',
      'Declaração de Aplicabilidade (Anexo A)',
      'Auditoria Interna de Sistemas de IA',
    ],
    deliverablesText:
      'O cliente recebe o inventário dos sistemas de IA no escopo, a política de IA, a matriz de riscos e os registros da avaliação de impacto, a Declaração de Aplicabilidade com as justificativas de inclusão e exclusão de controles, os procedimentos integrados ao sistema de gestão existente, o plano de treinamento e o relatório de auditoria interna com o plano de ação para a certificação.',
    faq: [
      {
        q: 'Para que serve a ISO/IEC 42001?',
        a: 'É a norma internacional de sistema de gestão de inteligência artificial, publicada em 2023. Serve para organizações que desenvolvem, fornecem ou usam sistemas de IA e precisam governar esse uso: definir políticas e papéis, avaliar riscos, aplicar controles e demonstrar que a IA opera dentro do que a empresa decidiu.',
      },
      {
        q: 'A 42001 integra com as normas que a empresa já tem?',
        a: 'Sim. A ISO/IEC 42001 segue a Estrutura Harmonizada da ISO, com contexto, liderança, planejamento, apoio, operação, avaliação e melhoria em comum com as demais normas. Uma empresa com 9001, 27001 ou outro sistema integra a gestão de IA ao que já existe e acrescenta o que é específico, como avaliação de riscos e de impacto dos sistemas de IA.',
      },
      {
        q: 'Quem certifica a 42001 e como a AGI entra nesse processo?',
        a: 'A certificação é emitida por organismo de certificação acreditado, escolhido pelo cliente. A AGI não certifica: conduz o diagnóstico, a estruturação do sistema de gestão de IA, o treinamento, a auditoria interna e o tratamento das constatações, preparando a empresa para a auditoria do organismo.',
      },
      {
        q: 'O que a empresa precisa ter antes de começar?',
        a: 'O ponto de partida é saber onde a IA entra: sistemas em desenvolvimento, ferramentas em uso, dados que alimentam cada processo e quem responde por eles. Não é preciso ter política de IA pronta nem equipe dedicada. O diagnóstico organiza esse mapa e define o escopo.',
      },
      {
        q: 'Quanto tempo leva a implementação?',
        a: 'Depende de quantos sistemas de IA entram no escopo, da maturidade da gestão existente e da disponibilidade da equipe. Implementar sobre um sistema de gestão já consolidado é mais rápido do que partir do zero. O prazo sai do diagnóstico, que mede as lacunas e monta o plano de ação.',
      },
    ],
  },
  'iso-37001': {
    t: 'ISO 37001',
    d: 'Sistema de gestão antissuborno que transforma o programa de integridade em controles auditáveis.',
    hi: iso37001Hero,
    ci: iso37001Conteudo,
    w: 'Decisões sobre terceiros, pagamentos e brindes rastreáveis e prontas para uma due diligence.',
    methodologyDetails:
      'Partimos do diagnóstico do programa existente e da avaliação de risco de suborno por processo, contrato e parceiro de negócio. Estruturamos a política e a função de compliance antissuborno, a due diligence, os controles financeiros e não financeiros e o canal de denúncia. Fechamos com auditoria interna, análise crítica pela direção e preparação para a certificação.',
    trainingPillars: [
      'Interpretação da ISO 37001:2025',
      'Avaliação de Risco de Suborno',
      'Due Diligence de Terceiros',
      'Canal de Denúncia e Investigação',
    ],
    deliverablesText:
      'O cliente recebe a matriz de riscos de suborno aprovada pela direção, a política antissuborno, as regras de alçada e de presentes e hospitalidades, o procedimento e os registros de due diligence de parceiros de negócio, o fluxo do canal de denúncia e de investigação, o plano de treinamento por função e o relatório de auditoria interna. Para quem já é certificado na edição de 2016, inclui a análise de lacunas para a transição, que termina em fevereiro de 2027.',
    faq: [
      {
        q: 'Minha empresa tem certificado na edição 2016. O que precisa fazer?',
        a: 'A ISO 37001:2025 substitui a edição 2016, e a transição termina em fevereiro de 2027. Até lá, o sistema precisa ser ajustado e auditado na nova edição pelo organismo certificador. A AGI faz a análise de lacunas entre as duas edições e monta o plano de transição com responsáveis e prazos.',
      },
      {
        q: 'A ISO 37001 substitui o programa de integridade da Lei Anticorrupção?',
        a: 'Não substitui, complementa. O programa de integridade da Lei nº 12.846/2013, regulamentada pelo Decreto nº 11.129/2022, diz o que se espera da empresa. A ISO 37001 organiza esses elementos num sistema de gestão auditável, com riscos avaliados, controles definidos e evidências registradas.',
      },
      {
        q: 'O que a empresa precisa ter antes de começar?',
        a: 'Nenhum programa pronto. Ajuda ter mapeados os processos com mais exposição: contratos com o poder público, intermediários, pagamentos, brindes e hospitalidades, doações e patrocínios. Se já existem código de conduta, canal de denúncia ou políticas de compliance, a AGI os aproveita no diagnóstico.',
      },
      {
        q: 'Quem certifica e como a AGI se encaixa?',
        a: 'A certificação é emitida por organismo de certificação acreditado, escolhido pela empresa. A AGI não certifica: faz o diagnóstico, estrutura a política, a função de compliance e os controles, treina as pessoas por função e conduz a auditoria interna antes da auditoria do organismo.',
      },
      {
        q: 'Do que depende o prazo?',
        a: 'Do número de processos e parceiros de negócio expostos a risco, do que já existe de compliance, do volume de terceiros a passar por due diligence e da disponibilidade da equipe. O prazo realista sai do diagnóstico, que mede as lacunas e monta o plano de ação.',
      },
    ],
  },
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

/** Serviços listados em /servicos, na ordem da página. */
export const SERVICOS_LISTA = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    name: 'Gestão da Qualidade',
    desc: 'Excelência operacional e satisfação do cliente em todos os processos da organização.',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    name: 'Gestão Ambiental',
    desc: 'Sustentabilidade, compliance regulatório e redução de impactos ambientais.',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    name: 'Saúde e Segurança',
    desc: 'Ambiente de trabalho seguro, prevenção de acidentes e gestão de riscos ocupacionais.',
  },
  {
    id: 'pbqp-h',
    title: 'PBQP-H',
    name: 'Programa de Qualidade do Habitat',
    desc: 'Melhoria da qualidade, produtividade e sustentabilidade no setor da construção civil.',
  },
  {
    id: 'iatf-16949',
    title: 'IATF 16949',
    name: 'Gestão da Qualidade Automotiva',
    desc: 'Requisitos específicos e rigorosos para a cadeia de suprimentos da indústria automotiva.',
  },
  {
    id: 'iso-17020',
    title: 'ISO/IEC 17020',
    name: 'Organismos de Inspeção',
    desc: 'Critérios rigorosos para garantir a competência e imparcialidade dos organismos de inspeção.',
  },
  {
    id: 'iso-17025',
    title: 'ISO/IEC 17025',
    name: 'Laboratórios de Ensaio e Calibração',
    desc: 'Competência técnica para testes, calibração e resultados consistentes globalmente.',
  },
  {
    id: 'sassmaq',
    title: 'SASSMAQ',
    name: 'Logística Segura de Químicos',
    desc: 'Avaliação de segurança, saúde, meio ambiente e qualidade para o transporte de produtos químicos.',
  },
  {
    id: 'iso-42001',
    title: 'ISO/IEC 42001',
    name: 'Gestão de Inteligência Artificial',
    desc: 'Governança de IA com responsáveis definidos, avaliação de riscos e de impacto e controles auditáveis.',
  },
  {
    id: 'iso-37001',
    title: 'ISO 37001',
    name: 'Gestão Antissuborno',
    desc: 'Programa de integridade estruturado em controles auditáveis, da due diligence ao canal de denúncia.',
  },
]
