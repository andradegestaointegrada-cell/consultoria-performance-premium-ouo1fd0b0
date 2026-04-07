import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

export function Hero() {
  const bgImage = 'https://i.postimg.cc/15Q4yB7x/home-page.jpg'

  return (
    <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden group">
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={bgImage}
          alt="Performance Background"
          className="w-full h-full object-cover object-[center_30%] md:object-center opacity-80 grayscale contrast-125 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/60 to-transparent" />
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1] uppercase break-words">
              Estratégia, Conformidade e{' '}
              <em className="font-heading italic text-primary font-normal">Performance</em>.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed font-sans drop-shadow-md">
              Consultoria especializada em normas ISO para empresas que buscam a LIDERANÇA no
              mercado. Metodologia precisa, resultados mensuráveis.
            </p>
          </Reveal>

          <Reveal delay={300} className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              asChild
              className="h-auto min-h-14 py-4 px-6 sm:px-8 text-sm sm:text-base rounded-full uppercase tracking-wider font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_14px_0_rgba(207,174,112,0.39)] w-full sm:w-auto text-center whitespace-normal"
            >
              <Link to="/contato" className="flex items-center justify-center">
                Inicie sua Jornada <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-auto min-h-14 py-4 px-6 sm:px-8 text-sm sm:text-base rounded-full uppercase tracking-wider font-bold border-white/20 text-white hover:bg-white hover:text-black w-full sm:w-auto text-center whitespace-normal"
            >
              <Link to="/servicos" className="flex items-center justify-center">
                Conheça Nossas Soluções
              </Link>
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
