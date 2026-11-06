// Cases reais (clientes citados com autorização) e frentes de atuação da página /cases.
import type { ImageMetadata } from 'astro'
import setecImg from '@/assets/cases/cases-setec.webp'
import msanImg from '@/assets/cases/cases-msan.webp'
import eptImg from '@/assets/cases/cases-ept.webp'
import inspecaoImg from '@/assets/cases/cases-inspecao.webp'
import transporteImg from '@/assets/cases/cases-transporte.webp'
import construcaoImg from '@/assets/frentes/frente-construcao.webp'
import automotivoImg from '@/assets/frentes/frente-automotivo.webp'
import esgImg from '@/assets/frentes/frente-esg.webp'
import laboratorioImg from '@/assets/frentes/frente-laboratorio.webp'

export interface Frente {
  setor: string
  norma: string
  texto: string
  base: string
  servico: string
  imagem: ImageMetadata
  imagemAlt: string
  foco: string
}

export const FRENTES: Frente[] = [
  {
    setor: 'Construtoras e incorporadoras',
    norma: 'PBQP-H · SiAC',
    texto:
      'Implantação do SiAC por níveis, com documentação enxuta, controle de serviços e de materiais no canteiro e preparação para a auditoria de certificação, requisito frequente em financiamentos habitacionais da Caixa.',
    base: 'Metodologia própria para construtoras na primeira certificação.',
    servico: 'pbqp-h',
    imagem: construcaoImg,
    imagemAlt: 'Engenheiros de capacete conferem a planta sobre a laje de um edifício em construção',
    foco: 'center 50%',
  },
  {
    setor: 'Indústria automotiva',
    norma: 'IATF 16949',
    texto:
      'Diagnóstico frente à IATF 16949 e aos requisitos específicos dos clientes, core tools (APQP, PPAP, FMEA, MSA e CEP), auditorias de processo e de produto e preparação para a certificação.',
    base: '16 anos de atuação na indústria automotiva e credencial de auditor líder IATF 16949.',
    servico: 'iatf-16949',
    imagem: automotivoImg,
    imagemAlt: 'Engenheiro da qualidade mede uma peça usinada com paquímetro em uma fábrica de autopeças',
    foco: 'center 75%',
  },
  {
    setor: 'Sustentabilidade e governança',
    norma: 'ESG · Dupla materialidade',
    texto:
      'Avaliação de dupla materialidade, de impacto e financeira, com escuta das partes interessadas, matriz de temas materiais e base para o relato de sustentabilidade (GRI e SASB).',
    base: 'Auditor líder ISO 14001 e ISO 45001, com sistemas ambientais e de SSO implantados até a certificação.',
    servico: 'esg',
    imagem: esgImg,
    imagemAlt: 'Vista aérea de uma fábrica com painéis solares cercada de mata nativa e de um rio',
    foco: 'center 20%',
  },
  {
    setor: 'Laboratórios de ensaio e calibração',
    norma: 'ISO/IEC 17025',
    texto:
      'Implantação da ISO/IEC 17025 com validação de métodos, incerteza de medição, rastreabilidade metrológica e garantia da validade dos resultados, até a avaliação da Cgcre.',
    base: 'Auditor líder ISO/IEC 17025 e experiência em acreditação Cgcre na ISO/IEC 17020.',
    servico: 'iso-17025',
    imagem: laboratorioImg,
    imagemAlt: 'Técnica de laboratório calibra uma balança analítica com pesos-padrão',
    foco: 'center 30%',
  },
]

export interface Caso {
  cliente: string
  setor: string
  imagem: ImageMetadata
  imagemAlt: string
  foco: string
  normas: string[]
  status: string
  desafio: string
  entregas: string[]
  marcos: { quando: string; oque: string }[]
  nota?: string
}

export const CASOS: Caso[] = [
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
