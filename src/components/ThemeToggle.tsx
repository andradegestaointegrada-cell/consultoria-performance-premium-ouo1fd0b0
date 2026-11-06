// Ilha React: escolha de tema (claro, escuro ou o do sistema).
// O tema inicial é aplicado antes da pintura por um script no <head> do layout (sem piscar).
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Tema = 'light' | 'dark' | 'system'

function aplicarTema(tema: Tema) {
  try {
    localStorage.setItem('theme', tema)
  } catch {
    /* navegação privada sem armazenamento: aplica só nesta página */
  }
  const escuro =
    tema === 'dark' || (tema === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  const raiz = document.documentElement
  raiz.classList.toggle('dark', escuro)
  raiz.style.colorScheme = escuro ? 'dark' : 'light'
}

export default function ThemeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => aplicarTema('light')}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => aplicarTema('dark')}>Escuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => aplicarTema('system')}>Sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
