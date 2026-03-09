import { Reveal } from '@/components/ui/reveal'

const stats = [
  { value: '99%', label: 'Taxa de Sucesso' },
  { value: '15+', label: 'Anos de Experiência' },
  { value: '100+', label: 'Certificações' },
  { value: '24/7', label: 'Suporte Dedicado' },
]

export function Stats() {
  return (
    <section className="py-20 border-y border-border bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/50 via-background to-background pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 100} className="text-center px-4">
              <div className="text-5xl md:text-7xl font-heading font-bold text-primary mb-2 drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
