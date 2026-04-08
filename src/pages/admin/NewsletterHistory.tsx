import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getNewsletters, getDeliveryLogs, Newsletter, DeliveryLog } from '@/services/newsletter'
import { useRealtime } from '@/hooks/use-realtime'

export default function NewsletterHistory() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null)
  const [deliveryLogs, setDeliveryLogs] = useState<DeliveryLog[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)

  const loadData = async () => {
    try {
      const data = await getNewsletters()
      setNewsletters(data)
    } catch (e) {
      console.error('Failed to load newsletters', e)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('newsletters', loadData)

  useRealtime(
    'delivery_logs',
    () => {
      if (selectedNewsletter) {
        getDeliveryLogs(selectedNewsletter.id).then(setDeliveryLogs).catch(console.error)
      }
    },
    !!selectedNewsletter,
  )

  const handleViewLogs = async (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter)
    setLoadingLogs(true)
    try {
      const logs = await getDeliveryLogs(newsletter.id)
      setDeliveryLogs(logs)
    } catch (error) {
      console.error('Failed to load logs', error)
    } finally {
      setLoadingLogs(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-heading font-bold uppercase tracking-wide">
          Histórico de Campanhas
        </h1>
        <Button variant="outline" asChild className="uppercase tracking-widest text-xs font-bold">
          <Link to="/admin/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="uppercase tracking-wide">Comunicações Enviadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assunto</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsletters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground italic">
                    Nenhuma campanha enviada ainda.
                  </TableCell>
                </TableRow>
              ) : (
                newsletters.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell className="font-medium text-foreground">{n.subject}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(n.created), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </TableCell>
                    <TableCell className="font-bold">{n.recipient_count}</TableCell>
                    <TableCell>
                      <Badge
                        variant={n.status === 'sent' ? 'default' : 'destructive'}
                        className={n.status === 'sent' ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {n.status === 'sent'
                          ? 'Enviado'
                          : n.status === 'failed'
                            ? 'Erro'
                            : 'Processando'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewLogs(n)}
                        title="Ver Detalhes de Envio"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">Ver Detalhes</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedNewsletter}
        onOpenChange={(open) => !open && setSelectedNewsletter(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading uppercase tracking-wide">
              Detalhes de Envio
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden flex flex-col gap-4 mt-2">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm bg-muted/50 p-4 rounded-md">
              <div>
                <span className="text-muted-foreground font-semibold">Assunto:</span>{' '}
                <span className="font-medium">{selectedNewsletter?.subject}</span>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Destinatários:</span>{' '}
                <span className="font-medium">{selectedNewsletter?.recipient_count}</span>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Status:</span>{' '}
                <Badge
                  variant={selectedNewsletter?.status === 'sent' ? 'default' : 'secondary'}
                  className={selectedNewsletter?.status === 'sent' ? 'bg-green-600' : ''}
                >
                  {selectedNewsletter?.status === 'sent'
                    ? 'Enviado'
                    : selectedNewsletter?.status === 'failed'
                      ? 'Falhou'
                      : 'Processando'}
                </Badge>
              </div>
            </div>

            <ScrollArea className="flex-1 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status Resend</TableHead>
                    <TableHead>Resposta da API</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingLogs ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Carregando logs...
                      </TableCell>
                    </TableRow>
                  ) : deliveryLogs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-8 text-muted-foreground italic"
                      >
                        Nenhum log de entrega encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    deliveryLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.recipient_email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={log.status === 'delivered' ? 'default' : 'destructive'}
                            className={log.status === 'delivered' ? 'bg-green-600' : ''}
                          >
                            {log.status === 'delivered' ? 'Enviado' : 'Erro'}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className="max-w-[300px] truncate text-xs text-muted-foreground"
                          title={log.error_message}
                        >
                          {log.error_message || '-'}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(log.created), 'dd/MM/yyyy HH:mm:ss')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
