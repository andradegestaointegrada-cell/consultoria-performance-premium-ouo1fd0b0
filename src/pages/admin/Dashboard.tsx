import { useMemo, useState, useRef } from 'react'
import useLeadStore, { LeadStatus } from '@/stores/useLeadStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Users, TrendingUp, Inbox, FileText } from 'lucide-react'
import { DashboardCharts } from '@/components/admin/DashboardCharts'
import { DashboardTable } from '@/components/admin/DashboardTable'
import { NewsletterManager } from '@/components/admin/NewsletterManager'
import { exportToCSV, exportToPDF } from '@/lib/export-utils'

export default function Dashboard() {
  const { leads, updateLeadStatus, addFileToLead } = useLeadStore()
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
          <Tabs defaultValue="leads" className="w-full">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-border pb-6 mb-8">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground uppercase tracking-wide">
                  Painel Executivo
                </h1>
                <p className="text-muted-foreground mt-1">
                  Gestão estratégica de performance e marketing.
                </p>
              </div>
              <TabsList className="bg-muted p-1 h-12 w-full md:w-auto">
                <TabsTrigger
                  value="leads"
                  className="uppercase tracking-wider font-bold h-full px-6 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Gestão de Leads
                </TabsTrigger>
                <TabsTrigger
                  value="newsletter"
                  className="uppercase tracking-wider font-bold h-full px-6 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Newsletter
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="leads" className="space-y-8 mt-0 outline-none">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  onClick={() => exportToCSV(leads)}
                  variant="outline"
                  className="gap-2 font-bold uppercase tracking-wider border-[#091D39] text-[#091D39] dark:border-[#CFAE70] dark:text-[#CFAE70] hover:bg-[#091D39] hover:text-[#E8E8E8] dark:hover:bg-[#CFAE70] dark:hover:text-[#0D0D0D]"
                >
                  <Download className="w-4 h-4" /> CSV
                </Button>
                <Button
                  onClick={() => exportToPDF(stats, filteredLeads, filter, chartsRef)}
                  className="gap-2 font-bold uppercase tracking-wider bg-[#CFAE70] text-[#0D0D0D] hover:bg-[#CFAE70]/90 border-none"
                >
                  <FileText className="w-4 h-4" /> Exportar PDF
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Total Leads
                    </CardTitle>
                    <Users className="h-4 w-4 text-[#091D39] dark:text-[#E8E8E8]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-heading font-bold text-foreground">
                      {stats.total}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Novos
                    </CardTitle>
                    <Inbox className="h-4 w-4 text-[#CFAE70]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-heading font-bold text-[#CFAE70]">
                      {stats.novos}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Conversão
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-[#2C2C2C] dark:text-[#E8E8E8]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-heading font-bold text-foreground">
                      {stats.taxa}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DashboardCharts leads={leads} ref={chartsRef} />

              <DashboardTable
                leads={filteredLeads}
                filter={filter}
                setFilter={setFilter}
                onUpdateStatus={updateLeadStatus}
                onAddFile={addFileToLead}
              />
            </TabsContent>

            <TabsContent value="newsletter" className="mt-0 outline-none">
              <Reveal delay={100}>
                <NewsletterManager />
              </Reveal>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </div>
  )
}
