import { Reveal } from '@/components/ui/reveal'
import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-secondary border-b border-border text-center">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4 text-[#091D39]">
              Inicie a <em className="italic text-[#CFAE70] font-normal">Transformação</em>
            </h1>
            <p className="text-xl text-[#2C2C2C]">
              Fale com nossos especialistas para elevar a performance da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-[#E8E8E8]">
        <div className="container px-4 max-w-6xl grid md:grid-cols-2 gap-16">
          <Reveal>
            <div className="bg-white p-8 rounded-2xl border border-[#2C2C2C]/10 shadow-xl">
              <h2 className="text-2xl font-heading font-bold uppercase tracking-wide mb-6 text-[#091D39]">
                Envie uma mensagem
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={200} className="space-y-12">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-8 border-b border-[#CFAE70]/30 pb-4 uppercase tracking-wide text-[#091D39]">
                Contato Premium
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 text-[#2C2C2C] group">
                  <div className="p-3 rounded-full bg-white border border-[#2C2C2C]/20 group-hover:border-[#CFAE70] transition-all">
                    <MapPin className="text-[#091D39] group-hover:text-[#CFAE70] transition-colors" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-[#091D39] uppercase">Sede Operacional</p>
                    <p className="text-sm">
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
                  className="flex items-center gap-4 text-[#2C2C2C] group hover:opacity-90"
                >
                  <div className="p-3 rounded-full bg-white border border-[#2C2C2C]/20 group-hover:border-[#CFAE70] transition-all">
                    <Phone className="text-[#091D39] group-hover:text-[#CFAE70] transition-colors" />
                  </div>
                  <p className="font-bold text-[#091D39] text-lg group-hover:text-[#CFAE70] transition-colors">
                    +55 (11) 98613-4789
                  </p>
                </a>
                <a
                  href="mailto:andrade.gestaointegrada@gmail.com"
                  className="flex items-center gap-4 text-[#2C2C2C] group hover:opacity-90"
                >
                  <div className="p-3 rounded-full bg-white border border-[#2C2C2C]/20 group-hover:border-[#CFAE70] transition-all">
                    <Mail className="text-[#091D39] group-hover:text-[#CFAE70] transition-colors" />
                  </div>
                  <p className="font-bold text-[#091D39] text-sm break-all group-hover:text-[#CFAE70] transition-colors">
                    andrade.gestaointegrada@gmail.com
                  </p>
                </a>
              </div>
            </div>
            <div className="h-56 rounded-2xl overflow-hidden border border-[#2C2C2C]/20 bg-white relative shadow-lg">
              <img
                src="https://img.usecurling.com/p/800/400?q=map&color=black"
                alt="Mapa"
                className="w-full h-full object-cover opacity-60 grayscale mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091D39]/30 to-transparent mix-blend-overlay"></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
