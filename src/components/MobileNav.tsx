// Ilha React: tema + menu lateral do celular (hidratada só em telas menores que lg).
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

interface Props {
  links: { name: string; path: string }[]
  pathname: string
}

export default function MobileNav({ links, pathname }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ThemeToggle />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menu de navegação"
            className="text-foreground hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-card border-l-border">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <nav className="flex flex-col gap-6 mt-12">
            {links.map((link) => {
              const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
              return (
                <a
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'text-lg font-bold uppercase tracking-wider transition-colors duration-300 hover:text-primary',
                    isActive ? 'text-primary' : 'text-foreground/80',
                  )}
                >
                  {link.name}
                </a>
              )
            })}
            <Button
              asChild
              className="w-full mt-4 uppercase tracking-wider font-bold bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(207,174,112,0.4)] transition-all"
            >
              <a href="/contato">Fale com um Especialista</a>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
