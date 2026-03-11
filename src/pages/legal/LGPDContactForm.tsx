import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Send } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Insira um e-mail válido.'),
  subject: z.string().min(2, 'O assunto deve ter pelo menos 2 caracteres.'),
  message: z.string().min(10, 'A mensagem deve ser detalhada (mín. 10 caracteres).'),
})

export function LGPDContactForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, you'd send this data to your backend
    console.log('LGPD Form Submission:', values)
    toast({
      title: 'Solicitação enviada com sucesso',
      description: 'Nossa equipe de DPO analisará seu pedido e retornará em breve.',
    })
    form.reset()
  }

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-xl mt-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
        <Badge
          variant="default"
          className="w-fit uppercase tracking-wider py-1.5 px-3 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Atendimento Prioritário
        </Badge>
        <p className="text-sm text-muted-foreground m-0 leading-none">
          Suporte direto com nosso DPO.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" className="bg-background/50 h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      className="bg-background/50 h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Assunto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Solicitação de exclusão de dados"
                    className="bg-background/50 h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva detalhadamente sua solicitação referente aos seus dados pessoais..."
                    className="min-h-[140px] resize-y bg-background/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto font-bold uppercase tracking-wide group h-12 px-8"
          >
            <span>Entre em Contato</span>
            <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
