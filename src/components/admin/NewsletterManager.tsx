import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRealtime } from '@/hooks/use-realtime'
import {
  getSubscribers,
  getNewsletters,
  createSubscriber,
  Subscriber,
  Newsletter,
} from '@/services/newsletter'
import { NewsletterForm } from './NewsletterForm'

export function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [date, setDate] = useState<Date | undefined>(new Date())

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

  const selectedDateCampaigns = newsletters.filter(
    (c) =>
      format(new Date(c.created_at || c.created || new Date()), 'yyyy-MM-dd') ===
      format(date || new Date(), 'yyyy-MM-dd'),
  )

  const sentDates = newsletters.map((c) => new Date(c.created_at || c.created || new Date()))

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

        <NewsletterForm />
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
