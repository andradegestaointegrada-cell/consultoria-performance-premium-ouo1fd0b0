import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import logoLight from '@/assets/logo-fundo-branco-7d1af.png'
import logoDark from '@/assets/logo-fundo-azul-petroleo-29887.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Metodologia', path: '/metodologia' },
  { name: 'Cases', path: '/cases' },
  { name: 'Blog', path: '/insights' },
  { name: 'Contato', path: '/contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [location])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        isScrolled && 'bg-background/90 backdrop-blur-md border-border glass-panel',
      )}
    >
      <div className="container mx-auto px-4 h-28 flex items-center justify-between">
        <Link to="/" className="flex flex-col justify-center group py-2 flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-3">
            <img
              src={logoLight}
              alt="Andrade Gestão Integrada"
              className="h-10 md:h-14 dark:hidden transition-all duration-300 shrink-0 object-contain"
            />
            <img
              src={logoDark}
              alt="Andrade Gestão Integrada"
              className="h-10 md:h-14 hidden dark:block rounded-md overflow-hidden transition-all duration-300 shrink-0 object-contain"
            />
          </div>
          <span className="text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wider md:tracking-widest font-bold font-heading mt-1 opacity-80 group-hover:opacity-100 transition-opacity whitespace-normal break-words leading-tight max-w-[280px]">
            Estratégia, Conformidade e Performance
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path)

            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-primary relative group py-2',
                  isActive ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            )
          })}
          <ThemeToggle />
          <Button
            asChild
            className="rounded-full uppercase tracking-wider font-bold bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(207,174,112,0.4)] transition-all"
          >
            <Link to="/contato">Falar com Especialista</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-4 shrink-0">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card border-l-border">
              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path)

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        'text-lg font-bold uppercase tracking-wider transition-colors duration-300 hover:text-primary',
                        isActive ? 'text-primary' : 'text-foreground/80',
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                })}
                <Button
                  asChild
                  className="w-full mt-4 uppercase tracking-wider font-bold bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(207,174,112,0.4)] transition-all"
                >
                  <Link to="/contato">Fale com um Especialista</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
