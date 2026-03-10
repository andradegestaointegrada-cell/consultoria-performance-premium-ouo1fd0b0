import { useMemo, useState } from 'react'
import useLeadStore, { LeadStatus } from '@/stores/useLeadStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Download, Users, TrendingUp, Inbox, Filter, FileText } from 'lucide-react'
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
import { Bar, BarChart, CartesianGrid, XAxis, PieChart, Pie, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const COLORS = {
  Novo: '#334155', // slate-700
  'Em Atendimento': '#1e293b', // slate-800
  Concluído: '#0f172a', // slate-900
}

export default function Dashboard() {
  const { leads, updateLeadStatus } = useLeadStore()
  const [filter, setFilter] = useState<LeadStatus | 'Todos'>('Todos')

  const stats = useMemo(
    () => ({
      total: leads.length,
      novos: leads.filter((l) => l.status === 'Novo').length,
      taxa: leads.length
        ? Math.round((leads.filter((l) => l.status === 'Concluído').length / leads.length) * 100)
        : 0,
    }),
    [leads],
  )

  const chartDataStatus = useMemo(
    () =>
      ['Novo', 'Em Atendimento', 'Concluído']
        .map((status) => ({
          name: status,
          count: leads.filter((l) => l.status === status).length,
          fill: COLORS[status as keyof typeof COLORS],
        }))
        .filter((i) => i.count > 0),
    [leads],
  )

  const chartDataServices = useMemo(() => {
    const counts = leads.reduce(
      (acc, l) => {
        const name = l.service.split('-')[0].trim()
        acc[name] = (acc[name] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [leads])

  const filteredLeads = useMemo(
    () => (filter === 'Todos' ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter],
  )

  const handleExportCSV = () => {
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString('pt-BR'),
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.email}"`,
      `"${l.service}"`,
      `"${l.status}"`,
      l.lgpdAgreed ? 'Sim' : 'Não',
    ])
    const csvContent = [
      'Data,Nome,Empresa,Email,Serviço,Status,LGPD',
      ...rows.map((r) => r.join(',')),
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Por favor, permita pop-ups no seu navegador para gerar o relatório em PDF.')
      return
    }

    const date = new Date().toLocaleDateString('pt-BR')
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Relatório de Performance - ${date}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; max-width: 1000px; margin: 0 auto; }
            h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 32px; font-size: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .metrics { display: flex; gap: 24px; margin-bottom: 40px; }
            .metric-card { border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; flex: 1; background: #f8fafc; }
            .metric-title { font-size: 13px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; font-weight: 600; letter-spacing: 0.05em; }
            .metric-value { font-size: 32px; font-weight: 700; color: #0f172a; }
            h2 { color: #0f172a; font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
            th, td { text-align: left; padding: 16px; border-bottom: 1px solid #e2e8f0; }
            th { background-color: #f1f5f9; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: #e2e8f0; color: #334155; }
            @media print {
              body { padding: 0; }
              .metric-card { border: 1px solid #cbd5e1 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              th { background-color: #f1f5f9 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .status-badge { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <h1>Relatório de Performance - Consultoria Premium</h1>
          
          <div class="metrics">
            <div class="metric-card">
              <div class="metric-title">Total Leads</div>
              <div class="metric-value">${stats.total}</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Novos Leads</div>
              <div class="metric-value">${stats.novos}</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Taxa de Conversão</div>
              <div class="metric-value">${stats.taxa}%</div>
            </div>
          </div>

          <h2>Listagem de Leads (${filter})</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Serviço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredLeads
                .map(
                  (l) => `
                <tr>
                  <td>${new Date(l.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td><strong>${l.name}</strong></td>
                  <td>${l.company}</td>
                  <td>${l.service}</td>
                  <td><span class="status-badge">${l.status}</span></td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
  }

  const getBadge = (s: LeadStatus) => (
    <Badge variant={s === 'Novo' ? 'default' : s === 'Em Atendimento' ? 'warning' : 'success'}>
      {s}
    </Badge>
  )

  return (
    <div className="pt-24 pb-20 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground uppercase tracking-wide">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Gestão de leads e métricas de conversão.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="gap-2 font-bold uppercase tracking-wider border-2"
              >
                <Download className="w-4 h-4" /> CSV
              </Button>
              <Button
                onClick={handleExportPDF}
                className="gap-2 font-bold uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" /> Exportar PDF
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  Total Leads
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
                  Novos
                </CardTitle>
                <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-primary">{stats.novos}</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                  Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-green-500">{stats.taxa}%</div>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-heading uppercase text-sm text-muted-foreground tracking-wide">
                  Distribuição por Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ count: { label: 'Leads' } }} className="h-[250px] w-full">
                  <PieChart>
                    <Pie
                      data={chartDataStatus}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {chartDataStatus.map((e, i) => (
                        <Cell key={i} fill={e.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend
                      content={<ChartLegendContent />}
                      className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-heading uppercase text-sm text-muted-foreground tracking-wide">
                  Interesse por Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ count: { label: 'Leads', color: '#1e293b' } }}
                  className="h-[250px] w-full"
                >
                  <BarChart data={chartDataServices} margin={{ top: 20 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => (v.length > 10 ? v.slice(0, 10) + '...' : v)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <Card className="bg-card">
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle className="font-heading uppercase tracking-wide">Funil de Leads</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(val: any) => setFilter(val)}>
                  <SelectTrigger className="w-full sm:w-[190px] [&>span]:flex-1 [&>span]:text-center">
                    <SelectValue placeholder="Filtrar Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos os Status</SelectItem>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Em Atendimento">Em Atendimento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Nenhum lead encontrado para este filtro.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(l.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold">{l.name}</div>
                          <div className="text-sm text-muted-foreground">{l.company}</div>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={l.service}>
                          {l.service}
                        </TableCell>
                        <TableCell>{getBadge(l.status)}</TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={l.status}
                            onValueChange={(v: LeadStatus) => updateLeadStatus(l.id, v)}
                          >
                            <SelectTrigger className="w-[150px] ml-auto [&>span]:flex-1 [&>span]:text-center">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Novo">Novo</SelectItem>
                              <SelectItem value="Em Atendimento">Em Atendimento</SelectItem>
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
