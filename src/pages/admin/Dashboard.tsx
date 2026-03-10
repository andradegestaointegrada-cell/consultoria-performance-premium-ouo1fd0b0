import { useMemo } from 'react'
import useLeadStore, { LeadStatus } from '@/stores/useLeadStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Download, Users, TrendingUp, Inbox } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Dashboard() {
  const { leads, updateLeadStatus } = useLeadStore()

  const stats = useMemo(() => {
    const total = leads.length
    const newLeads = leads.filter((l) => l.status === 'Novo').length
    const inProgress = leads.filter((l) => l.status === 'Em andamento').length
    const completed = leads.filter((l) => l.status === 'Concluído').length
    const conversionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, newLeads, inProgress, completed, conversionRate }
  }, [leads])

  const handleExportCSV = () => {
    const headers = ['Data', 'Nome', 'Empresa', 'Email', 'Serviço', 'Status', 'Mensagem', 'LGPD']
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString('pt-BR'),
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.email}"`,
      `"${l.service}"`,
      `"${l.status}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      l.lgpdAgreed ? 'Sim' : 'Não',
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'Novo':
        return <Badge variant="default">Novo</Badge>
      case 'Em andamento':
        return <Badge variant="warning">Em andamento</Badge>
      case 'Concluído':
        return <Badge variant="success">Concluído</Badge>
    }
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground uppercase tracking-wide">
                Dashboard Administrativo
              </h1>
              <p className="text-muted-foreground mt-1">Gestão de leads e métricas de conversão.</p>
            </div>
            <Button onClick={handleExportCSV} className="gap-2 font-bold uppercase tracking-wider">
              <Download className="w-4 h-4" /> Exportar CSV
            </Button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  Total de Leads
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  Novos (Caixa de Entrada)
                </CardTitle>
                <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-primary">{stats.newLeads}</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  Taxa de Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-green-500">
                  {stats.conversionRate}%
                </div>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-heading uppercase tracking-wide">Funil de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Status Atual</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Nenhum lead encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-foreground">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.company}</div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={lead.service}>
                          {lead.service}
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={lead.status}
                            onValueChange={(val: LeadStatus) => updateLeadStatus(lead.id, val)}
                          >
                            <SelectTrigger className="w-[140px] ml-auto">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Novo">Novo</SelectItem>
                              <SelectItem value="Em andamento">Em andamento</SelectItem>
                              <SelectItem value="Concluído">Concluído</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
