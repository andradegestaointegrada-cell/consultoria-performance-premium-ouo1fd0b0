import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
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
import { getNewsletters, Newsletter } from '@/services/newsletter'
import { useRealtime } from '@/hooks/use-realtime'

export default function NewsletterHistory() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsletters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground italic">
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
