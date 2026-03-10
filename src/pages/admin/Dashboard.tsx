import { useMemo, useState } from 'react'
import useLeadStore, { LeadStatus } from '@/stores/useLeadStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Download, Users, TrendingUp, Inbox, Filter } from 'lucide-react'
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
  ChartConfig,
} from '@/components/ui/chart'

const COLORS = { Novo: 'hsl(var(--primary))', 'Em andamento': '#eab308', Concluído: '#22c55e' }

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
      ['Novo', 'Em andamento', 'Concluído']
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

  const getBadge = (s: LeadStatus) => (
    <Badge variant={s === 'Novo' ? 'default' : s === 'Em andamento' ? 'warning' : 'success'}>
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
            <Button onClick={handleExportCSV} className="gap-2 font-bold uppercase tracking-wider">
              <Download className="w-4 h-4" /> Exportar
            </Button>
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
                    <ChartLegend content={<ChartLegendContent />} />
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
                  config={{ count: { label: 'Leads', color: 'hsl(var(--primary))' } }}
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
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos os Status</SelectItem>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
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
                            <SelectTrigger className="w-[140px] ml-auto">
                              <SelectValue />
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
