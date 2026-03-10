import { useMemo, useState, useRef } from 'react'
import useLeadStore, { LeadStatus } from '@/stores/useLeadStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Download, Users, TrendingUp, Inbox, FileText } from 'lucide-react'
import { DashboardCharts } from '@/components/admin/DashboardCharts'
import { DashboardTable } from '@/components/admin/DashboardTable'
import { exportToCSV, exportToPDF } from '@/lib/export-utils'

export default function Dashboard() {
  const { leads, updateLeadStatus } = useLeadStore()
  const [filter, setFilter] = useState<LeadStatus | 'Todos'>('Todos')
  const chartsRef = useRef<HTMLDivElement>(null)

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

  const filteredLeads = useMemo(
    () => (filter === 'Todos' ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter],
  )

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground uppercase tracking-wide">
                Dashboard Executivo
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestão de leads e métricas de alta performance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => exportToCSV(leads)}
                variant="outline"
                className="gap-2 font-bold uppercase tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="w-4 h-4" /> CSV
              </Button>
              <Button
                onClick={() => exportToPDF(stats, filteredLeads, filter, chartsRef)}
                className="gap-2 font-bold uppercase tracking-wider bg-gradient-to-r from-accent to-primary text-primary-foreground hover:opacity-90 border-none"
              >
                <FileText className="w-4 h-4" /> Exportar PDF
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Total Leads
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-foreground">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Novos
                </CardTitle>
                <Inbox className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-accent">{stats.novos}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-secondary-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-foreground">{stats.taxa}%</div>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <DashboardCharts leads={leads} ref={chartsRef} />
        </Reveal>

        <Reveal delay={200}>
          <DashboardTable
            leads={filteredLeads}
            filter={filter}
            setFilter={setFilter}
            onUpdateStatus={updateLeadStatus}
          />
        </Reveal>
      </div>
    </div>
  )
}
