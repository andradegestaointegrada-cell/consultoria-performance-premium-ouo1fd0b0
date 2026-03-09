import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    desc: 'Gestão da Qualidade',
    img: 'https://img.usecurling.com/p/600/400?q=precision%20engineering&color=black',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    desc: 'Gestão Ambiental',
    img: 'https://img.usecurling.com/p/600/400?q=sustainable%20technology&color=black',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    desc: 'Saúde e Segurança',
    img: 'https://img.usecurling.com/p/600/400?q=safety%20industry&color=black',
  },
]

export function ServicesOverview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Soluções de Ponta</h2>
            <p className="text-muted-foreground">
              Implementação ágil e precisa das principais normas internacionais, garantindo vantagem
              competitiva e conformidade global.
            </p>
          </div>
          <Button variant="outline" asChild className="rounded-full border-border">
            <Link to="/servicos">
              Ver todos os serviços <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 150}>
              <Link to={`/servicos/${svc.id}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 border border-border">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{svc.title}</h3>
                    <p className="text-primary font-medium">{svc.desc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
