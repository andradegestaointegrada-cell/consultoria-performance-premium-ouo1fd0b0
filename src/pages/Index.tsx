import { Hero } from './home/Hero'
import { Pillars } from './home/Pillars'
import { Stats } from './home/Stats'
import { ServicesOverview } from './home/ServicesOverview'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Pillars />
      <Stats />
      <ServicesOverview />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-secondary border-t border-border">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1920/600?q=luxury%20pattern&color=black')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Pronto para acelerar seus resultados?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Junte-se às empresas líderes que já transformaram suas operações com nossa consultoria
              de <em className="font-heading italic font-normal text-primary">alta performance</em>.
            </p>
            <Button
              size="lg"
              asChild
              className="h-14 px-10 text-lg rounded-full font-bold uppercase tracking-wider"
            >
              <Link to="/contato">Agende uma Avaliação Gratuita</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
