import { Reveal } from '@/components/ui/reveal'
import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-secondary border-b border-border text-center group">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(207,174,112,0.6)] hover:brightness-125 cursor-default">
              Inicie a{' '}
              <em className="italic text-foreground font-normal transition-colors duration-300 hover:text-primary">
                Transformação
              </em>
            </h1>
            <p className="text-xl text-muted-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.4)]">
              Fale com nossos especialistas para elevar a performance da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 max-w-6xl grid md:grid-cols-2 gap-16">
          <Reveal>
            <div className="bg-card p-8 rounded-2xl border border-border shadow-xl hover:border-primary/50 transition-colors duration-500">
              <h2 className="text-2xl font-heading font-bold uppercase tracking-wide mb-6 text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(207,174,112,0.6)] hover:brightness-125 cursor-default">
                Envie uma mensagem
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={200} className="space-y-12">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-8 border-b border-primary/30 pb-4 uppercase tracking-wide text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(207,174,112,0.6)] hover:brightness-125 cursor-default">
                Contato Premium
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="p-3 rounded-full bg-card border border-border group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(207,174,112,0.4)]">
                    <MapPin className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.8)] group-hover:brightness-125 transition-all duration-300" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-primary uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.6)] group-hover:brightness-125">
                      Sede Operacional
                    </p>
                    <p className="text-sm text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.6)] group-hover:brightness-125 mt-1">
                      Rua Olavo Gonçalves, 330
                      <br />
                      São Bernardo do Campo - SP
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/5511986134789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-full bg-card border border-border group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(207,174,112,0.4)]">
                    <Phone className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.8)] group-hover:brightness-125 transition-all duration-300" />
                  </div>
                  <p className="font-bold text-primary text-lg transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.6)] group-hover:brightness-125">
                    +55 (11) 98613-4789
                  </p>
                </a>
                <a
                  href="mailto:andrade.gestaointegrada@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-full bg-card border border-border group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(207,174,112,0.4)]">
                    <Mail className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.8)] group-hover:brightness-125 transition-all duration-300" />
                  </div>
                  <p className="font-bold text-primary text-sm break-all transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.6)] group-hover:brightness-125">
                    andrade.gestaointegrada@gmail.com
                  </p>
                </a>
              </div>
            </div>
            <div className="h-56 rounded-2xl overflow-hidden border border-border group hover:border-primary transition-all duration-500 bg-card relative shadow-lg">
              <img
                src="https://img.usecurling.com/p/800/400?q=map&color=black"
                alt="Mapa"
                className="w-full h-full object-cover opacity-60 grayscale mix-blend-multiply dark:mix-blend-lighten group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay group-hover:from-primary/50 transition-all duration-500"></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
