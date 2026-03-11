import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useNewsletterStore from '@/stores/useNewsletterStore'

export function NewsletterManager() {
  const { subscribers, campaigns, addCampaign } = useNewsletterStore()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSchedule = async () => {
    if (!date || !subject || !content) {
      return toast({
        title: 'Dados Incompletos',
        description: 'Preencha o assunto, conteúdo e selecione uma data.',
        variant: 'destructive',
      })
    }
    setLoading(true)

    try {
      const resendKey = import.meta.env.VITE_RESEND_API_KEY
      const resendDomain = import.meta.env.VITE_RESEND_DOMAIN || 'andradegestao.com.br'

      if (resendKey && resendKey !== 're_valid_api_key_mock_999') {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `Newsletter Insights <newsletter@${resendDomain}>`,
            to: ['test-audience@example.com'], // In a real scenario, this goes to the subscriber list
            subject: subject,
            html: content,
          }),
        })
      } else {
        await new Promise((res) => setTimeout(res, 800)) // Mock delay
      }

      addCampaign({
        subject,
        content,
        sendDate: date.toISOString(),
        status: date > new Date() ? 'Scheduled' : 'Sent',
      })

      toast({
        title: 'Campanha Cadastrada',
        description: `Agendada com sucesso para ${format(date, 'dd/MM/yyyy')}.`,
      })
      setSubject('')
      setContent('')
    } catch (e) {
      toast({
        title: 'Erro no Agendamento',
        description: 'Não foi possível se comunicar com o servidor de emails.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const selectedDateCampaigns = campaigns.filter(
    (c) => format(new Date(c.sendDate), 'yyyy-MM-dd') === format(date || new Date(), 'yyyy-MM-dd'),
  )

  const scheduledDates = campaigns.map((c) => new Date(c.sendDate))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-foreground">
              Calendário de Distribuição
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-border shadow-sm p-3 bg-background"
              modifiers={{ scheduled: scheduledDates }}
              modifiersStyles={{
                scheduled: {
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
              {date ? `Agendar Disparo: ${format(date, 'dd/MM/yyyy')}` : 'Selecione uma data'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Assunto do E-mail"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background border-border"
            />
            <Textarea
              placeholder="Conteúdo Estratégico (Texto ou HTML)"
              className="min-h-[160px] bg-background border-border resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              onClick={handleSchedule}
              disabled={loading || !date}
              className="w-full bg-[#091D39] text-[#E8E8E8] hover:bg-[#091D39]/90 dark:bg-[#CFAE70] dark:text-[#0D0D0D] dark:hover:bg-[#CFAE70]/90 uppercase tracking-widest font-bold h-12"
            >
              {loading ? 'Processando...' : 'Programar Campanha'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-foreground text-lg">
              Campanhas do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateCampaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm italic">
                Nenhuma comunicação programada para esta data.
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
                          c.status === 'Sent'
                            ? 'border-green-500 text-green-500'
                            : 'border-yellow-500 text-yellow-600'
                        }
                      >
                        {c.status === 'Sent' ? 'Enviado' : 'Agendado'}
                      </Badge>
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
              Base de Inscritos
            </CardTitle>
            <Badge className="bg-[#CFAE70] text-[#0D0D0D]">{subscribers.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-2">
              {subscribers.length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhum inscrito até o momento.</p>
              )}
              {subscribers.map((s) => (
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
