import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'

const SUFIXO = 'Andrade Gestão Integrada'

// Título da aba por página. Artigos e serviços definem o próprio título na página.
const TITULOS: Record<string, string> = {
  '/': `${SUFIXO} | Consultoria em Sistemas de Gestão ISO`,
  '/sobre': `Sobre | ${SUFIXO}`,
  '/servicos': `Serviços e normas | ${SUFIXO}`,
  '/metodologia': `Treinamentos | ${SUFIXO}`,
  '/cases': `Cases | ${SUFIXO}`,
  '/insights': `Blog | ${SUFIXO}`,
  '/contato': `Contato | ${SUFIXO}`,
  '/newsletter': `Newsletter | ${SUFIXO}`,
  '/politica-de-privacidade': `Política de Privacidade | ${SUFIXO}`,
  '/termos-de-uso': `Termos de Uso | ${SUFIXO}`,
  '/portal-lgpd': `Portal LGPD | ${SUFIXO}`,
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    const t = TITULOS[pathname]
    if (t) document.title = t
    else if (!pathname.startsWith('/insights/') && !pathname.startsWith('/servicos/'))
      document.title = `Página não encontrada | ${SUFIXO}`
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
