import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="https://skip-assets.s3.amazonaws.com/1741530985860-icon_b.png"
                alt="Andrade Gestão Integrada"
                className="h-8 w-8 object-contain"
              />
              <span className="font-heading font-bold text-xl text-foreground uppercase tracking-wide">
                Andrade Gestão Integrada
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Andrade Gestão Integrada. Consultoria premium focada em alta performance,
              flexibilidade operacional e certificações (ISO 9001, 14001, 45001, 17020, 17025, IATF
              16949, PBQP-H, SASSMAQ).
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
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
                <Link to="/sobre" className="hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-primary transition-colors">
                  Nossos Serviços
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-primary transition-colors">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-primary transition-colors">
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
                <Link to="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
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
                className="bg-card border-border text-foreground h-12"
              />
              <Button type="submit" className="h-12 uppercase font-bold tracking-widest">
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
