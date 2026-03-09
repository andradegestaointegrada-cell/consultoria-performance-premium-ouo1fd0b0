import { Link } from 'react-router-dom'
import { Hexagon, Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Hexagon className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-white">Performance.</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Consultoria premium focada em alta performance e certificações ISO para líderes de
              mercado.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Receba insights exclusivos sobre excelência corporativa.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-background border-border text-white"
              />
              <Button type="submit">Assinar</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} Consultoria Performance Premium. Todos os direitos
            reservados.
          </p>
          <p className="mt-2 md:mt-0">Desenvolvido com precisão.</p>
        </div>
      </div>
    </footer>
  )
}
