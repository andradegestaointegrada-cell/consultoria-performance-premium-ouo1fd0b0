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
    <div className="pt-24 pb-20 min-h-screen bg-[#E8E8E8]">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#CFAE70]/30 pb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[#091D39] uppercase tracking-wide">
                Dashboard Executivo
              </h1>
              <p className="text-[#2C2C2C] mt-1">Gestão de leads e métricas de alta performance.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => exportToCSV(leads)}
                variant="outline"
                className="gap-2 font-bold uppercase tracking-wider border-[#091D39] text-[#091D39] hover:bg-[#091D39] hover:text-[#E8E8E8]"
              >
                <Download className="w-4 h-4" /> CSV
              </Button>
              <Button
                onClick={() => exportToPDF(stats, filteredLeads, filter, chartsRef)}
                className="gap-2 font-bold uppercase tracking-wider bg-gradient-to-r from-[#CFAE70] to-[#091D39] text-white hover:opacity-90 border-none"
              >
                <FileText className="w-4 h-4" /> Exportar PDF
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-[#2C2C2C]/10 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#2C2C2C]">
                  Total Leads
                </CardTitle>
                <Users className="h-4 w-4 text-[#091D39]" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-[#091D39]">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#2C2C2C]/10 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#2C2C2C]">
                  Novos
                </CardTitle>
                <Inbox className="h-4 w-4 text-[#CFAE70]" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-[#CFAE70]">{stats.novos}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#2C2C2C]/10 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#2C2C2C]">
                  Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-[#2C2C2C]" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold text-[#2C2C2C]">{stats.taxa}%</div>
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
