import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

export function Hero() {
  const bgImage =
    'https://img.usecurling.com/p/1920/1080?q=corporate%20strategy%20office&color=black'

  return (
    <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden group">
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={bgImage}
          alt="Performance Background"
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity grayscale transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-primary/30 text-primary text-sm font-bold mb-6 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Excelência Operacional
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1] uppercase">
              Estratégia, Conformidade e{' '}
              <em className="font-heading italic text-primary font-normal">Performance</em>.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              Consultoria especializada em normas ISO para empresas que buscam a LIDERANÇA no
              mercado. Metodologia precisa, resultados mensuráveis.
            </p>
          </Reveal>

          <Reveal delay={300} className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-base rounded-full uppercase tracking-wider font-bold"
            >
              <Link to="/contato">
                Inicie sua Jornada <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-14 px-8 text-base rounded-full uppercase tracking-wider font-bold border-white/20 text-white hover:bg-white hover:text-black"
            >
              <Link to="/servicos">Conheça Nossas Soluções</Link>
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary opacity-80" />
      </div>
    </section>
  )
}
