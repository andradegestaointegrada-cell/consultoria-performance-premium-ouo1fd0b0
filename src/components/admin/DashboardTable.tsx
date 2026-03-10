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
import { Lead, LeadStatus, LeadFile } from '@/stores/useLeadStore'
import { Filter, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface Props {
  leads: Lead[]
  filter: LeadStatus | 'Todos'
  setFilter: (f: LeadStatus | 'Todos') => void
  onUpdateStatus: (id: string, status: LeadStatus) => void
  onAddFile: (id: string, file: LeadFile) => void
}

export function DashboardTable({ leads, filter, setFilter, onUpdateStatus, onAddFile }: Props) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null)

  const getBadge = (s: LeadStatus) => {
    if (s === 'Novo') {
      return <Badge className="bg-[#091D39] text-[#E8E8E8] hover:opacity-80 border-none">{s}</Badge>
    }
    if (s === 'Em Atendimento') {
      return <Badge className="bg-[#CFAE70] text-[#0D0D0D] hover:opacity-80 border-none">{s}</Badge>
    }
    return <Badge className="bg-[#2C2C2C] text-[#E8E8E8] hover:opacity-80 border-none">{s}</Badge>
  }

  const handleFileClick = (id: string) => {
    setActiveLeadId(id)
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeLeadId) {
      onAddFile(activeLeadId, { name: file.name, url: URL.createObjectURL(file) })
      toast({
        title: 'Arquivo anexado com sucesso',
        description: `O arquivo ${file.name} foi associado ao processo atual.`,
      })
      e.target.value = ''
      setActiveLeadId(null)
    }
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <CardTitle className="font-heading uppercase tracking-wide text-foreground">
          Funil de Leads
        </CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[190px] border-border text-foreground bg-background">
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
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Data</TableHead>
              <TableHead className="text-muted-foreground">Lead</TableHead>
              <TableHead className="text-muted-foreground">Serviço</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum lead encontrado para este filtro.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id} className="border-border hover:bg-muted/50">
                  <TableCell className="whitespace-nowrap text-foreground">
                    {new Date(l.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground">{l.name}</div>
                    <div className="text-sm text-muted-foreground">{l.company}</div>
                    {l.files && l.files.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {l.files.map((f, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-[10px] py-0 px-1.5 h-5 flex items-center gap-1 bg-muted/50 text-muted-foreground border-border"
                            title={f.name}
                          >
                            <Paperclip className="w-3 h-3" />
                            <span className="truncate max-w-[100px]">{f.name}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate text-foreground" title={l.service}>
                    {l.service}
                  </TableCell>
                  <TableCell>{getBadge(l.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {l.status === 'Em Atendimento' && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleFileClick(l.id)}
                          className="h-10 w-10 shrink-0 border-[#091D39] text-[#091D39] hover:bg-[#091D39] hover:text-[#E8E8E8] dark:border-[#CFAE70] dark:text-[#CFAE70] dark:hover:bg-[#CFAE70] dark:hover:text-[#0D0D0D] transition-colors"
                          title="Anexar Arquivo"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      )}
                      <Select
                        value={l.status}
                        onValueChange={(v: LeadStatus) => onUpdateStatus(l.id, v)}
                      >
                        <SelectTrigger className="w-[150px] border-border text-foreground bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novo">Novo</SelectItem>
                          <SelectItem value="Em Atendimento">Em Atendimento</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
