import { Link } from 'react-router-dom'
import { Linkedin, Facebook, Mail, Phone } from 'lucide-react'
import { EMAIL_CONTATO, WHATSAPP, WHATSAPP_URL } from '@/lib/api'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import logoLight from '@/assets/logo-fundo-branco-7d1af.png'
import logoDark from '@/assets/logo-fundo-azul-petroleo-29887.png'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex flex-col justify-center mb-6 group">
              <div className="flex items-center gap-3">
                <img
                  src={logoLight}
                  alt="Andrade Gestão Integrada"
                  className="h-14 dark:hidden group-hover:opacity-80 transition-opacity"
                />
                <img
                  src={logoDark}
                  alt="Andrade Gestão Integrada"
                  className="h-14 hidden dark:block rounded-md overflow-hidden group-hover:opacity-80 transition-opacity"
                />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-heading mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                Estratégia, Conformidade e Performance
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Estruturamos sistemas de gestão que alinham estratégia organizacional, garantem
              conformidade normativa e impulsionam a performance das empresas.
            </p>
            <div className="mb-8">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                Sede Operacional
              </p>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                Rua Pais Leme, 215, conj. 1713
                <br />
                Pinheiros, São Paulo/SP · CEP 05424-150
              </address>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href={`mailto:${EMAIL_CONTATO}`}
                    className="inline-flex items-center gap-2 hover:text-primary transition-colors break-all"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    {EMAIL_CONTATO}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    {WHATSAPP}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/andrade-gest%C3%A3o-integrada-treinamento/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Página da AGI no LinkedIn"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100077658203124"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Página da AGI no Facebook"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Navegação
            </h2>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              <li>
                <Link to="/sobre" className="hover:text-primary transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-primary transition-colors duration-300">
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/metodologia"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Metodologia
                </Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-primary transition-colors duration-300">
                  Cases de Sucesso
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-primary transition-colors duration-300">
                  Blog Técnico
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Legal
            </h2>
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
            <h2 className="font-heading font-bold text-xl text-foreground mb-6 uppercase tracking-wide">
              Newsletter
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Conteúdo quinzenal sobre sistemas de gestão, normas ISO e conformidade.
            </p>
            <NewsletterSignup origem="rodape" id="footer-newsletter" />
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} Andrade Gestão Integrada e Treinamento · CNPJ
            66.060.174/0001-58
          </p>
          <p className="mt-4 md:mt-0 text-primary">Desenvolvido com precisão.</p>
        </div>
      </div>
    </footer>
  )
}
