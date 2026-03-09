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
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Inicie a Transformação
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
              <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Envie uma mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground font-medium">Nome</label>
                      <Input
                        required
                        className="bg-background border-border text-white focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground font-medium">Empresa</label>
                      <Input
                        required
                        className="bg-background border-border text-white focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">
                      E-mail corporativo
                    </label>
                    <Input
                      type="email"
                      required
                      className="bg-background border-border text-white focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-medium">Mensagem</label>
                    <Textarea
                      required
                      className="bg-background border-border text-white min-h-[120px] focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base shadow-glow mt-4 font-bold"
                  >
                    Enviar Solicitação
                  </Button>
                </form>
              </div>
            </Reveal>

            <Reveal delay={200} className="space-y-12">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-border pb-4">
                  Informações de Contato
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-muted-foreground group">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Sede Operacional</p>
                      <p className="leading-relaxed">
                        Av. Paulista, 1000 - Bela Vista
                        <br />
                        São Paulo, SP - Brasil
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground group">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                      +55 (11) 3000-0000
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground group">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                      contato@performancepremium.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-64 rounded-2xl overflow-hidden border border-border bg-muted relative">
                <img
                  src="https://img.usecurling.com/p/800/400?q=map%20dark&color=black"
                  alt="Mapa"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
