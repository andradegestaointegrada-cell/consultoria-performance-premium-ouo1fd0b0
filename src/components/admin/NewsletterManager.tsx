import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import {
  getSubscribers,
  getNewsletters,
  sendNewsletter,
  sendTestNewsletter,
  createSubscriber,
  Subscriber,
  Newsletter,
} from '@/services/newsletter'

export function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const loadData = async () => {
    try {
      const subs = await getSubscribers()
      const news = await getNewsletters()
      setSubscribers(subs)
      setNewsletters(news)
    } catch (e) {
      console.error('Failed to load data', e)
    }
  }

  useEffect(() => {
    const syncLocalStorage = async () => {
      try {
        const stored = localStorage.getItem('@ag-consultoria/newsletter')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed.subscribers && parsed.subscribers.length > 0) {
            const existing = await getSubscribers()
            const existingEmails = new Set(existing.map((s) => s.email))

            for (const sub of parsed.subscribers) {
              if (!existingEmails.has(sub.email)) {
                try {
                  await createSubscriber({
                    email: sub.email,
                    source: sub.source,
                    lgpdAgreed: sub.lgpdAgreed,
                    active: true,
                  })
                  existingEmails.add(sub.email)
                } catch (err) {
                  // ignore duplicates silently
                }
              }
            }
          }
          localStorage.removeItem('@ag-consultoria/newsletter')
        }
      } catch (e) {
        console.error('Failed to sync local storage', e)
      }
    }
    syncLocalStorage().then(loadData)
  }, [])

  useRealtime('subscribers', loadData)
  useRealtime('newsletters', loadData)

  const handleTestSend = async () => {
    if (!subject || !content) return
    setLoading(true)
    try {
      await sendTestNewsletter('alexandre@andradegestaointegrada.com.br', subject, content)
      toast({ title: 'Email de Teste Enviado para Alexandre' })
    } catch (e: any) {
      toast({
        title: 'Erro',
        description: e.message || 'Falha no envio do teste',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    if (!subject || !content) {
      return toast({
        title: 'Dados Incompletos',
        description: 'Preencha o assunto e conteúdo da campanha.',
        variant: 'destructive',
      })
    }
    setLoading(true)

    try {
      await sendNewsletter(subject, content)
      toast({
        title: 'Campanha Enviada',
        description: 'A comunicação foi disparada para toda a base ativa.',
      })
      setSubject('')
      setContent('')
    } catch (e: any) {
      toast({
        title: 'Erro no Envio',
        description: e.message || 'Falha na comunicação com o servidor de emails.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const selectedDateCampaigns = newsletters.filter(
    (c) => format(new Date(c.created), 'yyyy-MM-dd') === format(date || new Date(), 'yyyy-MM-dd'),
  )

  const sentDates = newsletters.map((c) => new Date(c.created))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-foreground">
              Calendário de Comunicações
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-border shadow-sm p-3 bg-background"
              modifiers={{ sent: sentDates }}
              modifiersStyles={{
                sent: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(207,174,112,0.15)',
                  color: '#CFAE70',
                  borderBottom: '2px solid #CFAE70',
                },
              }}
              locale={ptBR}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-foreground text-lg">
              Nova Campanha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Assunto do E-mail"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background border-border h-12"
            />
            <Textarea
              placeholder="Conteúdo Estratégico (Texto ou HTML suportado)"
              className="min-h-[160px] bg-background border-border resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border mt-2">
              <Button
                onClick={handleTestSend}
                disabled={loading || !subject || !content}
                variant="outline"
                className="w-full h-12 uppercase tracking-wider font-bold text-xs"
              >
                Testar Envio (alexandre@andradegestaointegrada.com.br)
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={loading || !subject || !content}
              className="w-full bg-[#091D39] text-[#E8E8E8] hover:bg-[#091D39]/90 dark:bg-[#CFAE70] dark:text-[#0D0D0D] dark:hover:bg-[#CFAE70]/90 uppercase tracking-widest font-bold h-12 mt-4"
            >
              {loading ? 'Processando...' : 'Disparar Campanha para Todos'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-foreground text-lg">
              Campanhas no Dia ({date ? format(date, 'dd/MM/yyyy') : ''})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateCampaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm italic">
                Nenhuma comunicação registrada para esta data.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedDateCampaigns.map((c) => (
                  <div key={c.id} className="p-4 border border-border rounded-lg bg-muted/20">
                    <h4 className="font-bold text-foreground mb-2">{c.subject}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          c.status === 'sent'
                            ? 'border-green-500 text-green-500'
                            : 'border-red-500 text-red-600'
                        }
                      >
                        {c.status === 'sent' ? 'Enviado' : 'Erro'}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium">
                        {c.recipient_count} destinos
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-heading uppercase tracking-wide text-foreground text-lg">
              Base de Inscritos Ativos
            </CardTitle>
            <Badge className="bg-[#CFAE70] text-[#0D0D0D] font-bold">
              {subscribers.filter((s) => s.active).length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-2">
              {subscribers.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Nenhum inscrito processado até o momento.
                </p>
              )}
              {subscribers
                .filter((s) => s.active)
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-sm text-foreground break-all">{s.email}</span>
                    <Badge variant="secondary" className="text-[10px] w-fit">
                      {s.source}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
