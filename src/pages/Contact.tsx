import { Reveal } from '@/components/ui/reveal'
import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-secondary border-b border-border text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 uppercase tracking-wide text-foreground">
              Inicie a{' '}
              <b className="text-primary font-extrabold italic font-heading">TRANSFORMAÇÃO</b>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-sans">
              Fale com nossos especialistas para elevar a performance da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="py-24 relative bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.postimg.cc/HWykwTg6/CONTATO.png')` }}
      >
        <div className="absolute inset-0 bg-background/90 md:bg-background/80 backdrop-blur-[2px]" />

        <div className="container relative z-10 px-4 max-w-6xl grid md:grid-cols-2 gap-16">
          <Reveal>
            <div className="bg-card/95 backdrop-blur-md p-8 rounded-2xl border border-border shadow-xl hover:border-primary/50 transition-colors duration-500">
              <h2 className="text-2xl font-heading font-bold uppercase tracking-wide mb-6 text-foreground">
                Envie uma mensagem
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={200} className="space-y-12">
            <div className="bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-lg">
              <h3 className="text-2xl font-heading font-bold mb-8 border-b border-border pb-4 uppercase tracking-wide text-foreground">
                Contato Andrade Gestão Integrada
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary border border-border">
                    <MapPin className="text-primary" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-foreground uppercase tracking-wide font-sans">
                      Sede Operacional
                    </p>
                    <p className="text-sm text-foreground/80 mt-1 font-sans">
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
                  <div className="p-3 rounded-full bg-secondary border border-border group-hover:border-primary transition-colors duration-300">
                    <Phone className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.8)] transition-all" />
                  </div>
                  <p className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300 font-sans">
                    +55 (11) 98613-4789
                  </p>
                </a>
                <a
                  href="mailto:andrade.gestaointegrada@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-full bg-secondary border border-border group-hover:border-primary transition-colors duration-300">
                    <Mail className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(207,174,112,0.8)] transition-all" />
                  </div>
                  <p className="font-bold text-foreground text-sm break-all group-hover:text-primary transition-colors duration-300 font-sans">
                    andrade.gestaointegrada@gmail.com
                  </p>
                </a>
              </div>
            </div>

            <div className="h-56 rounded-2xl overflow-hidden border border-border bg-card relative shadow-lg group">
              <img
                src="https://img.usecurling.com/p/800/400?q=map&color=black"
                alt="Mapa"
                className="w-full h-full object-cover object-center opacity-80 grayscale mix-blend-multiply dark:mix-blend-lighten transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
