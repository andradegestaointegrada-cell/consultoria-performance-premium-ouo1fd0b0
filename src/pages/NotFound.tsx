import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => (
  <div className="pt-40 pb-32 bg-background min-h-[70vh]">
    <div className="container mx-auto px-4 max-w-2xl text-center">
      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Erro 404</p>
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground uppercase tracking-wide mb-6">
        Página não encontrada
      </h1>
      <p className="text-muted-foreground text-lg mb-10">
        O endereço pode ter mudado ou não existir mais.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="uppercase font-bold tracking-wider">
          <Link to="/">Ir para a página inicial</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="uppercase font-bold tracking-wider">
          <Link to="/insights">Ver o blog</Link>
        </Button>
      </div>
    </div>
  </div>
)

export default NotFound
