import { useMemo, forwardRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, CartesianGrid, XAxis, PieChart, Pie, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Lead } from '@/stores/useLeadStore'

export const PREMIUM_COLORS = {
  Novo: '#091D39', // Azul Petróleo
  'Em Atendimento': '#CFAE70', // Ouro Imperial
  Concluído: '#2C2C2C', // Aço Sólido
}

const BAR_COLORS = ['#091D39', '#CFAE70', '#2C2C2C']

const chartConfigStatus = {
  Novo: { label: 'Novo', color: '#091D39' },
  'Em Atendimento': { label: 'Em Atendimento', color: '#CFAE70' },
  Concluído: { label: 'Concluído', color: '#2C2C2C' },
}

export const DashboardCharts = forwardRef<HTMLDivElement, { leads: Lead[] }>(({ leads }, ref) => {
  const chartDataStatus = useMemo(
    () =>
      ['Novo', 'Em Atendimento', 'Concluído']
        .map((status) => ({
          name: status,
          count: leads.filter((l) => l.status === status).length,
          fill: PREMIUM_COLORS[status as keyof typeof PREMIUM_COLORS],
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" ref={ref}>
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading uppercase text-sm text-foreground tracking-wide">
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigStatus} className="h-[250px] w-full">
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
                stroke="var(--background)"
                strokeWidth={2}
              >
                {chartDataStatus.map((e, i) => (
                  <Cell key={i} fill={e.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-foreground"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading uppercase text-sm text-foreground tracking-wide">
            Interesse por Serviço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ count: { label: 'Leads', color: '#091D39' } }}
            className="h-[250px] w-full"
          >
            <BarChart data={chartDataServices} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v.length > 15 ? v.slice(0, 15) + '...' : v)}
                tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 500 }}
              />
              <ChartTooltip
                cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chartDataServices.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
})
DashboardCharts.displayName = 'DashboardCharts'
