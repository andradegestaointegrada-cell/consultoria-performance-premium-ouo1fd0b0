import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary border-t border-border">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-wide text-foreground">
            Inicie a <span className="text-primary">TRANSFORMAÇÃO</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Fale com nossos especialistas para elevar a performance da sua empresa.
          </p>
          <Button
            size="lg"
            asChild
            className="h-14 px-10 text-lg rounded-full font-bold uppercase tracking-wider"
          >
            <Link to="/contato">Fale com um Especialista</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
