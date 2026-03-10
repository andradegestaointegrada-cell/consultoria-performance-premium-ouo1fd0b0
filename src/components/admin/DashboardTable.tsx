import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Lead, LeadStatus } from '@/stores/useLeadStore'
import { Filter } from 'lucide-react'

interface Props {
  leads: Lead[]
  filter: LeadStatus | 'Todos'
  setFilter: (f: LeadStatus | 'Todos') => void
  onUpdateStatus: (id: string, status: LeadStatus) => void
}

export function DashboardTable({ leads, filter, setFilter, onUpdateStatus }: Props) {
  const getBadge = (s: LeadStatus) => {
    if (s === 'Novo') {
      return (
        <Badge style={{ backgroundColor: '#091D39', color: '#E8E8E8' }} className="border-none">
          {s}
        </Badge>
      )
    }
    if (s === 'Em Atendimento') {
      return (
        <Badge style={{ backgroundColor: '#CFAE70', color: '#0D0D0D' }} className="border-none">
          {s}
        </Badge>
      )
    }
    return (
      <Badge style={{ backgroundColor: '#2C2C2C', color: '#E8E8E8' }} className="border-none">
        {s}
      </Badge>
    )
  }

  return (
    <Card className="bg-white border-[#2C2C2C]/10 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <CardTitle className="font-heading uppercase tracking-wide text-[#091D39]">
          Funil de Leads
        </CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#2C2C2C]" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[190px] border-[#2C2C2C]/20 text-[#2C2C2C]">
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
            <TableRow className="border-[#E8E8E8]">
              <TableHead className="text-[#2C2C2C]">Data</TableHead>
              <TableHead className="text-[#2C2C2C]">Lead</TableHead>
              <TableHead className="text-[#2C2C2C]">Serviço</TableHead>
              <TableHead className="text-[#2C2C2C]">Status</TableHead>
              <TableHead className="text-right text-[#2C2C2C]">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-[#2C2C2C]/70">
                  Nenhum lead encontrado para este filtro.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id} className="border-[#E8E8E8] hover:bg-[#E8E8E8]/50">
                  <TableCell className="whitespace-nowrap text-[#2C2C2C]">
                    {new Date(l.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-[#091D39]">{l.name}</div>
                    <div className="text-sm text-[#2C2C2C]/80">{l.company}</div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate text-[#2C2C2C]" title={l.service}>
                    {l.service}
                  </TableCell>
                  <TableCell>{getBadge(l.status)}</TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={l.status}
                      onValueChange={(v: LeadStatus) => onUpdateStatus(l.id, v)}
                    >
                      <SelectTrigger className="w-[150px] ml-auto border-[#2C2C2C]/20 text-[#2C2C2C]">
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
  )
}
