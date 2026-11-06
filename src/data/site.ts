// Dados fixos do site: endereço, contatos, menu e dados estruturados da empresa.
import { EMAIL_CONTATO } from '@/lib/api'

export const SITE_URL = 'https://www.andradegestaointegrada.com.br'
export const SITE_NOME = 'Andrade Gestão Integrada'
export const SITE_NOME_COMPLETO = 'Andrade Gestão Integrada e Treinamento'
export const WHATSAPP_NUMERO = '5511986134789'

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Metodologia', path: '/metodologia' },
  { name: 'Cases', path: '/cases' },
  { name: 'Blog', path: '/insights' },
  { name: 'Contato', path: '/contato' },
]

export const WHATSAPP_MSG_PADRAO =
  'Olá! Gostaria de solicitar um orçamento e tirar algumas dúvidas sobre os serviços da AGI.'

/** Mensagem pronta do WhatsApp citando a página de origem (atribuição do contato). */
export function mensagemWhatsApp(pagina?: string) {
  if (!pagina) return WHATSAPP_MSG_PADRAO
  return `Olá! Vim pela página "${pagina}" do site da AGI e gostaria de conversar sobre os serviços.`
}

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}

export const ORG_ID = `${SITE_URL}/#organizacao`
export const ALEXANDRE_ID = `${SITE_URL}/sobre#alexandre-andrade`

export const ORGANIZACAO = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NOME_COMPLETO,
  alternateName: 'AGI',
  legalName: 'ALEXANDRE FERREIRA DE ANDRADE LTDA',
  taxID: '66.060.174/0001-58',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  email: EMAIL_CONTATO,
  telephone: '+55-11-98613-4789',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Pais Leme, 215, conj. 1713',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '05424-150',
    addressCountry: 'BR',
  },
  founder: { '@id': ALEXANDRE_ID },
  areaServed: 'BR',
  knowsAbout: [
    'ISO 9001',
    'ISO 14001',
    'ISO 45001',
    'PBQP-H',
    'IATF 16949',
    'SASSMAQ',
    'ISO/IEC 17020',
    'ISO/IEC 17025',
    'ISO/IEC 42001',
    'ISO 37001',
  ],
  sameAs: [
    'https://www.linkedin.com/company/andrade-gest%C3%A3o-integrada-treinamento/',
    'https://www.facebook.com/profile.php?id=100077658203124',
  ],
}

export const ALEXANDRE = {
  '@type': 'Person',
  '@id': ALEXANDRE_ID,
  name: 'Alexandre Andrade',
  jobTitle: 'Diretor e Consultor Principal',
  worksFor: { '@id': ORG_ID },
  sameAs: ['https://www.linkedin.com/in/alexandreandradegestaodeprojetos'],
}
