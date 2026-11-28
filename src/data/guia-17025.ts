// Bloco "resposta primeiro" da página de ISO/IEC 17025.
// Antes de editar, conferir revisões e valores no índice de documentos da Cgcre e na NIE-CGCRE-140 vigente.
import type { Guia } from '@/data/services'

export const GUIA_17025: Guia = {
  h1: 'Consultoria ISO/IEC 17025',
  resumo:
    'A AGI prepara laboratórios de ensaio e de calibração para a acreditação na ABNT NBR ISO/IEC 17025:2017: diagnóstico, documentos e registros técnicos, treinamento e auditoria interna. Quem concede a acreditação é a Cgcre/Inmetro, para um escopo definido. A AGI não acredita nem certifica. Atendimento em São Paulo e em todo o Brasil.',
  secoes: [
    {
      q: 'Meu laboratório precisa de acreditação ou de certificação?',
      a: 'Se a exigência é demonstrar competência para um ensaio ou uma calibração, o que se pede é acreditação. A certificação ISO 9001 avalia o sistema de gestão e não comprova a competência técnica. A acreditação vale para o escopo concedido, não para todos os serviços do laboratório. Antes de decidir, confira o que o cliente, o edital ou o órgão regulador exigem.',
    },
    {
      q: 'Quais são as etapas até a acreditação?',
      a: 'A preparação acontece no laboratório; a solicitação, a avaliação e a decisão correm na Cgcre.',
      passos: [
        'Definir o escopo: ensaios e métodos, ou serviços e faixas de calibração.',
        'Implementar os requisitos e gerar os registros que demonstram competência.',
        'Cadastrar o laboratório no Orquestra, sistema do Inmetro com acesso pela conta gov.br, e solicitar a acreditação.',
        'Passar pela análise da solicitação e dos documentos.',
        'Receber a avaliação da equipe da Cgcre, presencial ou remota.',
        'Tratar as não conformidades apontadas.',
        'Aguardar a decisão da Cgcre e a publicação do escopo.',
      ],
    },
    {
      q: 'Quais documentos da Cgcre se aplicam além da norma?',
      a: 'Os principais estão abaixo. Conforme o tipo de laboratório e o escopo, há outros no índice de documentos da Cgcre.',
      tabela: {
        colunas: ['Documento', 'Revisão', 'Assunto'],
        linhas: [
          ['NIT-DICLA-031', '27 (nov/2026)', 'Regulamento da acreditação de laboratórios'],
          ['NIT-DICLA-030', '15 (nov/2024)', 'Rastreabilidade metrológica'],
          ['NIT-DICLA-026', '15 (abr/2021)', 'Participação em ensaios de proficiência'],
          ['NIE-CGCRE-140', '38 (jul/2026)', 'Preços dos serviços de acreditação'],
        ],
      },
      nota: 'Revisões conforme o índice da Cgcre consultado em 28/11/2026.',
    },
    {
      q: 'Quanto custam as taxas da Cgcre?',
      a: 'Há cobrança para solicitar, para avaliar e para manter a acreditação.',
      tabela: {
        colunas: ['Cobrança', 'Valor'],
        linhas: [
          ['Solicitação de acreditação inicial, por processo', 'R$ 1.700,00'],
          ['Verificação da documentação e análise da solicitação', '0,5 homem/dia'],
          ['Homem/dia nacional de profissional da equipe de avaliação', 'R$ 813,59'],
          ['Anuidade de manutenção, por norma de acreditação', 'R$ 943,16'],
          ['Anuidade por classe de ensaio ou grupo de serviço de calibração', 'R$ 330,11'],
        ],
      },
      nota: 'Valores da NIE-CGCRE-140, revisão 38 (julho de 2026). A avaliação gera outras cobranças conforme o escopo e a equipe. A tabela não inclui honorários de consultoria, calibrações nem ensaios de proficiência. Confirme a composição com a Cgcre antes de fechar o orçamento.',
    },
    {
      q: 'Quanto tempo leva?',
      a: 'Não há prazo total oficial: a carta de serviço do governo federal registra a duração como não estimada. O prazo de preparo sai do diagnóstico e depende do escopo, dos métodos, dos equipamentos e da disponibilidade da equipe.',
    },
    {
      q: 'O que fica com a consultoria e o que fica com o laboratório?',
      a: 'A AGI faz o diagnóstico, estrutura documentos e registros técnicos, treina a equipe, monta o plano de ensaios de proficiência, conduz a auditoria interna e prepara a proposta de escopo. O laboratório executa os ensaios ou calibrações, mantém as evidências de competência, toma as decisões técnicas e conduz a relação com a Cgcre.',
    },
  ],
  fontes: [
    {
      t: 'Carta de serviço: solicitar acreditação de laboratórios (gov.br)',
      url: 'https://www.gov.br/pt-br/servicos/solicitar-acreditacao-de-laboratorios',
    },
    {
      t: 'Cgcre: índice de documentos para laboratórios de ensaio e de calibração',
      url: 'http://www.inmetro.gov.br/credenciamento/organismos/doc_organismos.asp?tOrganismo=CalibEnsaios',
    },
    {
      t: 'NIE-CGCRE-140, revisão 38: preços dos serviços de acreditação',
      url: 'http://www.inmetro.gov.br/sidoq/Arquivos/Cgcre/NIE/NIE-Cgcre-140_38.pdf',
    },
  ],
  autor:
    'Alexandre Andrade, auditor líder em ISO/IEC 17025 e 17020, com 17 anos em implantação e auditoria de sistemas de gestão.',
  atualizado: '2026-11-28',
}
