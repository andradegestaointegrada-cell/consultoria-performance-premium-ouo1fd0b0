import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { createSubscriber } from '@/services/newsletter'
import logoLight from '@/assets/logo-fundo-branco-7d1af.png'
import logoDark from '@/assets/logo-fundo-azul-petroleo-29887.png'

export function Footer() {
  const [email, setEmail] = useState('')
  const [lgpd, setLgpd] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!lgpd) {
      toast({
        title: 'Atenção Necessária',
        description: 'Por favor, aceite os termos da LGPD para assinar nossa newsletter.',
        variant: 'destructive',
      })
      return
    }

    try {
      await createSubscriber({
        email,
        lgpdAgreed: true,
      })
      toast({
        title: 'Inscrição Confirmada!',
        description: 'Obrigado por se inscrever!',
      })
      setEmail('')
      setLgpd(false)
    } catch (err: any) {
      toast({
        title: 'Erro na Inscrição',
        description: err.message || 'Erro ao processar sua inscrição',
        variant: 'destructive',
      })
    }
  }

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
              <p className="text-sm text-muted-foreground">Rua Pais Leme 215, Conj 1713</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/alexandreandradegestaodeprojetos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
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
            <form className="flex flex-col gap-4" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail profissional"
                className="bg-card border-border text-foreground h-12 focus-visible:ring-primary"
              />
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="footer-lgpd"
                  checked={lgpd}
                  onCheckedChange={(v) => setLgpd(v === true)}
                  className="border-primary data-[state=checked]:bg-primary mt-0.5"
                />
                <label
                  htmlFor="footer-lgpd"
                  className="text-xs text-muted-foreground leading-snug cursor-pointer"
                >
                  Concordo com os Termos de Serviço e política de privacidade (LGPD).
                </label>
              </div>
              <Button
                type="submit"
                className="h-12 uppercase font-bold tracking-widest bg-primary text-primary-foreground hover:bg-primary/80 transition-colors mt-2"
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
