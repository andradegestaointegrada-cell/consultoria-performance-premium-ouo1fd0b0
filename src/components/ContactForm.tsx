import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useToast } from '@/hooks/use-toast'
import { postApi } from '@/lib/api'

const formSchema = z.object({
  name: z.string().min(2, 'Nome inválido.'),
  company: z.string().min(2, 'Empresa obrigatória.'),
  email: z.string().email('E-mail inválido.'),
  service: z.string().min(1, 'Selecione um serviço.'),
  message: z.string().min(10, 'Mensagem muito curta.'),
  lgpdAgreed: z.literal(true, { message: 'Aceite para enviarmos a resposta.' }),
  newsletterAgreed: z.boolean().optional(),
})

type ContactFormValues = z.infer<typeof formSchema>

const SERVICES = [
  'ISO 9001 - Qualidade',
  'ISO 14001 - Ambiental',
  'ISO 45001 - Saúde e Segurança',
  'ISO 17020',
  'ISO 17025',
  'SASSMAQ',
  'IATF',
  'PBQP-H - Habitat',
  'Consultoria ESG',
  'Auditoria Interna',
  'Treinamentos',
  'Outros',
]

export function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [website, setWebsite] = useState('')
  const inicio = useRef(Date.now())

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      service: '',
      message: '',
      lgpdAgreed: undefined as unknown as true,
      newsletterAgreed: false,
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setLoading(true)
    const elapsed = Date.now() - inicio.current
    try {
      await postApi('/api/contato', {
        tipo: 'contato',
        nome: data.name,
        empresa: data.company,
        email: data.email,
        servico: data.service,
        mensagem: data.message,
        website,
        elapsed,
      })

      let newsletterMsg = ''
      if (data.newsletterAgreed) {
        try {
          await postApi('/api/newsletter', {
            email: data.email,
            consentimento: true,
            origem: 'formulario-contato',
            website,
            elapsed,
          })
          newsletterMsg = ' Para concluir a inscrição na newsletter, confirme pelo link que enviamos ao seu e-mail.'
        } catch {
          newsletterMsg = ' A inscrição na newsletter não foi concluída; tente pelo rodapé do site.'
        }
      }

      toast({
        title: 'Mensagem enviada',
        description: `Recebemos seu contato e retornaremos em breve.${newsletterMsg}`,
      })
      form.reset()
    } catch (err) {
      toast({
        title: 'Mensagem não enviada',
        description: (err as Error).message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Site
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-foreground">NOME</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
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
                <FormLabel className="font-bold text-foreground">EMPRESA</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sua empresa"
                    className="border-border bg-background text-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-foreground">E-MAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@empresa.com"
                    className="border-border bg-background text-foreground"
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
                <FormLabel className="font-bold text-foreground">SERVIÇO</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-border bg-background text-foreground">
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
              <FormLabel className="font-bold text-foreground">MENSAGEM</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Como podemos ajudar sua empresa?"
                  className="min-h-[100px] resize-none border-border bg-background text-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="lgpdAgreed"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 border border-border p-4 shadow-sm rounded-md bg-muted/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-primary data-[state=checked]:bg-primary mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs leading-relaxed font-normal text-muted-foreground">
                    Concordo com o uso dos meus dados para que a AGI responda a este contato,
                    conforme a Política de Privacidade.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newsletterAgreed"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 border border-border p-4 shadow-sm rounded-md bg-muted/10">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-primary data-[state=checked]:bg-primary mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs leading-relaxed font-normal text-muted-foreground">
                    Quero receber a newsletter quinzenal da AGI (posso cancelar a qualquer
                    momento).
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full h-12 uppercase tracking-widest font-bold bg-primary hover:bg-accent hover:text-accent-foreground transition-colors text-primary-foreground"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Solicitação'}
        </Button>
      </form>
    </Form>
  )
}
