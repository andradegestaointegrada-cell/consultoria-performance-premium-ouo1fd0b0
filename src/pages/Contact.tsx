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
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  company: z.string().min(2, 'O nome da empresa é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  service: z.string().min(1, 'Selecione um serviço de interesse.'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
  lgpdAgreed: z.literal(true, {
    errorMap: () => ({ message: 'Você deve concordar com os termos da LGPD.' }),
  }),
})

type ContactFormValues = z.infer<typeof formSchema>

const SERVICES = [
  'ISO 9001 - Gestão da Qualidade',
  'ISO 14001 - Gestão Ambiental',
  'ISO 45001 - Saúde e Segurança',
  'PBQP-H - Qualidade do Habitat',
  'IATF 16949 - Qualidade Automotiva',
  'Consultoria ESG',
  'Outros Serviços',
]

export default function Contact() {
  const { toast } = useToast()
  const { addLead } = useLeadStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const mockSendResendEmail = async (data: ContactFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.group('[Resend Integration] Email Dispatch')
        console.log('To: admin@andradegestao.com.br')
        console.log(`Subject: Novo Lead Recebido - ${data.name}`)
        console.log('--- Body ---')
        console.log(`Name: ${data.name}`)
        console.log(`Email: ${data.email}`)
        console.log(`Selected Service: ${data.service}`)
        console.log(`Message: ${data.message}`)
        console.groupEnd()
        resolve()
      }, 1500)
    })
  }

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      // 1. Data Persistence Fix: Store lead in local storage state
      addLead({
        name: data.name,
        company: data.company,
        email: data.email,
        service: data.service,
        message: data.message,
        lgpdAgreed: data.lgpdAgreed,
      })

      // 2. Resend Email Notification (Mock implementation for integration)
      await mockSendResendEmail(data)

      // 3. Reliability: Toast ONLY after db insertion and email dispatch
      toast({
        title: 'Mensagem enviada com sucesso!',
        description: 'Seus dados foram registrados e o administrador foi notificado.',
      })

      form.reset()
    } catch (error) {
      toast({
        title: 'Erro ao enviar a mensagem',
        description: 'Tivemos um problema processando sua solicitação.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider font-bold">
                              Nome
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" className="h-12" {...field} />
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
                            <FormLabel className="uppercase tracking-wider font-bold">
                              Empresa
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Sua empresa" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider font-bold">
                              E-mail Corporativo
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@empresa.com"
                                className="h-12"
                                {...field}
                              />
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
                            <FormLabel className="uppercase tracking-wider font-bold">
                              Serviço de Interesse
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Selecione um serviço" />
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
                          <FormLabel className="uppercase tracking-wider font-bold">
                            Mensagem
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Como podemos ajudar sua empresa?"
                              className="resize-none min-h-[120px]"
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
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium leading-relaxed">
                              Concordo com a coleta e armazenamento dos meus dados para fins de
                              contato comercial, em conformidade com a Lei Geral de Proteção de
                              Dados (LGPD).
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-14 text-base uppercase tracking-widest font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                    </Button>
                  </form>
                </Form>
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
                      <p className="leading-relaxed uppercase text-sm">
                        Rua Olavo Gonçalves, 330 Sala 11.
                        <br />
                        São Bernardo do Campo - SP
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/5511986134789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 text-muted-foreground group hover:opacity-90"
                  >
                    <div className="p-4 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                      +55 (11) 98613-4789
                    </p>
                  </a>
                  <a
                    href="mailto:andrade.gestaointegrada@gmail.com"
                    className="flex items-center gap-6 text-muted-foreground group hover:opacity-90"
                  >
                    <div className="p-4 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors sm:text-lg text-sm break-all">
                      ANDRADE.GESTAOINTEGRADA@GMAIL.COM
                    </p>
                  </a>
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden border-2 border-border bg-card relative">
                <img
                  src="https://img.usecurling.com/p/800/400?q=clean%20city%20map&color=black"
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
