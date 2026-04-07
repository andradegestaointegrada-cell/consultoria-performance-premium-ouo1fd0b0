import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

export function Cta() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20 border-t border-border">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-tight text-foreground break-words">
            Inicie a <span className="text-primary">TRANSFORMAÇÃO</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Fale com nossos especialistas para elevar a performance da sua empresa.
          </p>
          <Button
            size="lg"
            asChild
            className="h-auto min-h-14 py-4 px-6 sm:px-8 text-sm sm:text-base rounded-full uppercase tracking-wider font-bold whitespace-normal text-center w-full sm:w-auto"
          >
            <Link to="/contato" className="flex items-center justify-center">
              Fale com um Especialista
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
