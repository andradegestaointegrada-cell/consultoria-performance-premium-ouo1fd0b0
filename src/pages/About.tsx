import { Reveal } from '@/components/ui/reveal'

const team = [
  {
    name: 'Alexandre Andrade',
    role: 'Diretor e Consultor Principal',
    img: 'https://i.postimg.cc/sX63ZmpV/CONSULTOR_ALEXANDRE_ANDRADE_1.png',
  },
  {
    name: 'Thatiana Pidlepa Andrade',
    role: 'Auditora',
    img: 'https://i.postimg.cc/SsTmzdWq/CONSULTORA_THATIANA_PIDLEPA_ANDRADE_1.png',
  },
]

export default function About() {
  return (
    <div className="pt-20">
      <section
        className="py-32 relative bg-fixed bg-cover bg-center border-b border-border"
        style={{ backgroundImage: `url('https://i.postimg.cc/mgRhjk3p/SOBRE_BANNER.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0D0D0D]/85" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg">
              Andrade{' '}
              <em className="font-heading italic font-normal text-primary">Gestão Integrada</em>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-sans drop-shadow-md">
              Especialistas em sistemas de gestão com foco absoluto em resultados. Nossa consultoria
              se destaca pela flexibilidade operacional, adaptando-se integralmente à dinâmica e aos
              prazos da sua empresa, oferecendo desde o gerenciamento completo até o suporte técnico
              colaborativo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto bg-primary/5 border-l-4 border-primary p-8 md:p-12 mb-24 rounded-r-2xl shadow-sm">
              <h3 className="text-xl md:text-3xl font-heading font-bold text-foreground leading-relaxed uppercase tracking-wide text-center">
                "Diagnóstico, implementação e evolução de sistemas de gestão orientados à{' '}
                <em className="font-heading italic text-primary font-normal">estratégia</em> e à{' '}
                <em className="font-heading italic text-primary font-normal">performance</em>."
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <Reveal className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/50 to-transparent rounded-2xl blur-lg opacity-30"></div>
                <img
                  src="https://i.postimg.cc/HW8Qsh0g/HOME-NEW.jpg"
                  alt="Flexibilidade e Adaptação"
                  className="relative w-full aspect-[4/3] object-cover rounded-2xl border-2 border-border shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2" delay={100}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
                Flexibilidade e Adaptação
              </h2>
              <p className="text-muted-foreground text-lg mb-6 font-sans">
                Entendemos que cada organização possui seu próprio ritmo. Nosso diferencial é a
                flexibilidade operacional: atuamos conforme as suas necessidades, seja assumindo a
                gestão completa dos sistemas ou atuando de forma colaborativa com a sua equipe
                técnica.
              </p>
              <ul className="space-y-4 font-sans">
                {[
                  'Amplo Domínio: ISO 9001, 14001, 45001, 17020, 17025, IATF 16949, PBQP-H, SASSMAQ',
                  'Ajuste de Processos com Foco na Realidade do Cliente',
                  'Gestão Completa ou Suporte Colaborativo',
                  'Melhoria Contínua e Acompanhamento Ágil',
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground font-medium">
                    <span className="h-2 w-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(207,174,112,0.8)] min-w-[8px]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
                Nosso Time
              </h2>
              <p className="text-muted-foreground font-sans">
                Especialistas com vivência técnica e foco em resultados operacionais.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-background border-2 border-border rounded-xl p-6 text-center group hover:border-primary transition-colors duration-300">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-border mb-6 group-hover:border-primary transition-colors duration-300">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 object-top"
                    />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1 uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider font-sans">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
