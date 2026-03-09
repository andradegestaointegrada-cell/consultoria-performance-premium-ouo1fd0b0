import { Reveal } from '@/components/ui/reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Contact() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Mensagem enviada com sucesso',
      description: 'Nossa equipe entrará em contato em breve.',
    })
  }

  return (
    <div className="pt-20">
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
              Inicie a{' '}
              <em className="font-heading italic font-normal text-primary">Transformação</em>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fale com nossos especialistas e descubra como elevar a performance da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div className="bg-card p-10 rounded-2xl border-2 border-border shadow-2xl">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide">
                  Envie uma mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-foreground font-bold uppercase tracking-wider">
                        Nome
                      </label>
                      <Input
                        required
                        className="bg-background border-border text-foreground focus-visible:ring-primary h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-foreground font-bold uppercase tracking-wider">
                        Empresa
                      </label>
                      <Input
                        required
                        className="bg-background border-border text-foreground focus-visible:ring-primary h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-foreground font-bold uppercase tracking-wider">
                      E-mail corporativo
                    </label>
                    <Input
                      type="email"
                      required
                      className="bg-background border-border text-foreground focus-visible:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-foreground font-bold uppercase tracking-wider">
                      Mensagem
                    </label>
                    <Textarea
                      required
                      className="bg-background border-border text-foreground min-h-[120px] focus-visible:ring-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-base uppercase tracking-widest font-bold mt-4"
                  >
                    Enviar Solicitação
                  </Button>
                </form>
              </div>
            </Reveal>

            <Reveal delay={200} className="space-y-12">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-8 border-b border-border pb-4 uppercase tracking-wide">
                  Informações de Contato
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 text-muted-foreground group">
                    <div className="p-4 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-foreground mb-1 uppercase tracking-wider">
                        Sede Operacional
                      </p>
                      <p className="leading-relaxed">
                        Av. Paulista, 1000 - Bela Vista
                        <br />
                        São Paulo, SP - Brasil
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-muted-foreground group">
                    <div className="p-4 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                      +55 (11) 3000-0000
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-muted-foreground group">
                    <div className="p-4 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                      contato@performancepremium.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-64 rounded-2xl overflow-hidden border-2 border-border bg-card relative">
                <img
                  src="https://img.usecurling.com/p/800/400?q=map%20dark&color=black"
                  alt="Mapa"
                  className="w-full h-full object-cover opacity-50 grayscale"
                />
                <div className="absolute inset-0 bg-secondary/30 mix-blend-overlay"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
