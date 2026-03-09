import { Reveal } from '@/components/ui/reveal'

const team = [
  {
    name: 'Alexandre Costa',
    role: 'Diretor de Performance',
    img: 'https://img.usecurling.com/ppl/large?gender=male&seed=1',
  },
  {
    name: 'Carolina Neves',
    role: 'Lead Auditor ISO',
    img: 'https://img.usecurling.com/ppl/large?gender=female&seed=2',
  },
  {
    name: 'Roberto Silva',
    role: 'Especialista em Cultura',
    img: 'https://img.usecurling.com/ppl/large?gender=male&seed=3',
  },
]

export default function About() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              A Engenharia da{' '}
              <em className="font-heading italic font-normal text-primary">Excelência</em>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nascemos da crença de que a conformidade não é um fim, mas o ponto de partida para a
              verdadeira performance empresarial. Inspirados na precisão do automobilismo de elite,
              entregamos resultados incontestáveis.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <Reveal className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/50 to-transparent rounded-2xl blur-lg opacity-30"></div>
                <img
                  src="https://img.usecurling.com/p/800/600?q=office%20strategy%20dark&color=black"
                  alt="Estratégia"
                  className="relative rounded-2xl border-2 border-border shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2" delay={100}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 uppercase tracking-wide">
                Nossa Metodologia
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Assim como um carro de F1 é ajustado para cada pista, adaptamos nossa abordagem à
                realidade única da sua empresa. Utilizamos dados precisos para eliminar gargalos e
                garantir que cada processo opere em sua máxima eficiência.
              </p>
              <ul className="space-y-4">
                {[
                  'Diagnóstico Preciso (Telemetria)',
                  'Ajuste de Processos (Setup)',
                  'Implementação Ágil (Pit Stop)',
                  'Melhoria Contínua (Volta Mais Rápida)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground font-medium">
                    <span className="h-2 w-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(207,174,112,0.8)]"></span>
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
              <p className="text-muted-foreground">
                Especialistas com vivência executiva e foco em resultados.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-background border-2 border-border rounded-xl p-6 text-center group hover:border-primary transition-colors duration-300">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-border mb-6 group-hover:border-primary transition-colors duration-300">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1 uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">
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
