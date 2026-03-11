import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logoLight from '@/assets/logo-fundo-branco-7d1af.png'
import logoDark from '@/assets/logo-fundo-azul-petroleo-29887.png'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img
                src={logoLight}
                alt="Andrade Gestão Integrada"
                className="h-12 dark:hidden group-hover:opacity-80 transition-opacity"
              />
              <img
                src={logoDark}
                alt="Andrade Gestão Integrada"
                className="h-12 hidden dark:block rounded-md overflow-hidden group-hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Andrade Gestão Integrada. Consultoria premium focada em alta performance,
              flexibilidade operacional e certificações ISO.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              <li>
                <Link to="/sobre" className="hover:text-primary transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-primary transition-colors duration-300">
                  Nossos Serviços
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-primary transition-colors duration-300">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-primary transition-colors duration-300">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              <li>
                <Link
                  to="/termos-de-uso"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/portal-lgpd"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Portal de LGPD
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-6">
              Receba insights exclusivos sobre excelência corporativa.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-card border-border text-foreground h-12 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="h-12 uppercase font-bold tracking-widest bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
              >
                Assinar
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Andrade Gestão Integrada.</p>
          <p className="mt-4 md:mt-0 text-primary">Desenvolvido com precisão.</p>
        </div>
      </div>
    </footer>
  )
}
