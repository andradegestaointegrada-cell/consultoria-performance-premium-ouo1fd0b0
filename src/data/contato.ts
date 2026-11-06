// Opções do campo "Serviço" do formulário de contato. Links podem pré-selecionar uma opção
// com /contato?servico=<texto exato>. Os temas da Cyber Consulting ficam marcados para o
// aviso de repasse (política de privacidade, seção de compartilhamento).
export const SERVICOS_CONTATO = [
  'ISO 9001 - Qualidade',
  'ISO 14001 - Ambiental',
  'ISO 45001 - Saúde e Segurança',
  'SGI integrado',
  'ISO 17020',
  'ISO 17025',
  'SASSMAQ',
  'IATF',
  'PBQP-H - Habitat',
  'Consultoria ESG',
  'ISO 37001 - Antissuborno',
  'ISO 42001 - Inteligência Artificial',
  'Segurança da informação (ISO 27001)',
  'Privacidade de dados (LGPD)',
  'Governança, riscos e continuidade',
  'Plataforma Galáxia',
  'Certificações EXIN e cursos',
  'Auditoria Interna',
  'Treinamentos',
  'Outros',
] as const

export function linkContato(servico: (typeof SERVICOS_CONTATO)[number]) {
  return `/contato?servico=${encodeURIComponent(servico)}#formulario`
}
