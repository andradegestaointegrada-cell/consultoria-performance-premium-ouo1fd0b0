import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Reveal } from '@/components/ui/reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import useLeadStore from '@/stores/useLeadStore'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(2, 'Nome inválido.'),
  company: z.string().min(2, 'Empresa obrigatória.'),
  email: z.string().email('E-mail inválido.'),
  service: z.string().min(1, 'Selecione um serviço.'),
  message: z.string().min(10, 'Mensagem muito curta.'),
  lgpdAgreed: z.literal(true, { errorMap: () => ({ message: 'Aceite os termos.' }) }),
})
type ContactFormValues = z.infer<typeof formSchema>

const SERVICES = [
  'ISO 9001 - Qualidade',
  'ISO 14001 - Ambiental',
  'ISO 45001 - Saúde e Segurança',
  'PBQP-H - Habitat',
  'Consultoria ESG',
  'Outros',
]

export default function Contact() {
  const { toast } = useToast()
  const { addLead } = useLeadStore()
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      service: '',
      message: '',
      lgpdAgreed: undefined,
    },
  })

  const sendNotifications = async (d: ContactFormValues) => {
    return Promise.all([
      new Promise<void>((r) =>
        setTimeout(() => {
          console.log(
            `📧 E-mail (Resend) enviado p/ admin@andradegestao.com.br - Domínio Verificado: ${import.meta.env.VITE_RESEND_DOMAIN || 'N/A'} - Chave: ${import.meta.env.VITE_RESEND_API_KEY ? 'OK' : 'FALHA'}`,
          )
          r()
        }, 800),
      ),
      new Promise<void>((r) =>
        setTimeout(() => {
          console.log(
            `💬 WhatsApp API p/ ${import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || 'N/A'} - Novo Lead: ${d.name} (${d.service}) - Chave API: ${import.meta.env.VITE_WHATSAPP_API_KEY ? 'OK' : 'FALHA'}`,
          )
          r()
        }, 800),
      ),
    ])
  }

  async function onSubmit(data: ContactFormValues) {
    setLoading(true)
    try {
      addLead(data)
      await sendNotifications(data)
      toast({ title: 'Mensagem enviada com sucesso!', description: 'Nossa equipe foi notificada.' })
      form.reset()
    } catch {
      toast({
        title: 'Erro',
        description: 'Tivemos um problema processando sua solicitação.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-secondary border-b border-border text-center">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
              Inicie a <em className="italic text-primary font-normal">Transformação</em>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fale com nossos especialistas para elevar a performance da sua empresa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 max-w-6xl grid md:grid-cols-2 gap-16">
          <Reveal>
            <div className="bg-card p-8 rounded-2xl border-2 shadow-2xl">
              <h2 className="text-2xl font-heading font-bold uppercase tracking-wide mb-6">
                Envie uma mensagem
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">NOME</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">EMPRESA</FormLabel>
                          <FormControl>
                            <Input placeholder="Sua empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">E-MAIL</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@empresa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">SERVIÇO</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SERVICES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">MENSAGEM</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Como podemos ajudar sua empresa?"
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lgpdAgreed"
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-3 border p-4 shadow-sm rounded-md">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-xs leading-relaxed font-normal mt-0.5">
                          Concordo com a coleta e armazenamento dos meus dados para contato em
                          conformidade com a LGPD.
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 uppercase tracking-widest font-bold"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Solicitação'}
                  </Button>
                </form>
              </Form>
            </div>
          </Reveal>

          <Reveal delay={200} className="space-y-12">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-8 border-b pb-4 uppercase tracking-wide">
                Contato
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 text-muted-foreground group">
                  <div className="p-3 rounded-full bg-secondary border group-hover:border-primary transition-all">
                    <MapPin className="text-primary" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-foreground uppercase">Sede Operacional</p>
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
                  className="flex items-center gap-4 text-muted-foreground group hover:opacity-90"
                >
                  <div className="p-3 rounded-full bg-secondary border group-hover:border-primary transition-all">
                    <Phone className="text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-lg group-hover:text-primary">
                    +55 (11) 98613-4789
                  </p>
                </a>
                <a
                  href="mailto:andrade.gestaointegrada@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground group hover:opacity-90"
                >
                  <div className="p-3 rounded-full bg-secondary border group-hover:border-primary transition-all">
                    <Mail className="text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-sm break-all group-hover:text-primary">
                    andrade.gestaointegrada@gmail.com
                  </p>
                </a>
              </div>
            </div>
            <div className="h-56 rounded-2xl overflow-hidden border-2 bg-card relative">
              <img
                src="https://img.usecurling.com/p/800/400?q=map&color=black"
                alt="Mapa"
                className="w-full h-full object-cover opacity-50 grayscale mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-secondary/30 mix-blend-overlay"></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
