import { useState, useEffect } from 'react'

export type LeadStatus = 'Novo' | 'Em andamento' | 'Concluído'

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  service: string
  message: string
  lgpdAgreed: boolean
  status: LeadStatus
  createdAt: string
}

// Global in-memory state
let memoryLeads: Lead[] = [
  {
    id: '1',
    name: 'Carlos Almeida',
    company: 'Tech Solutions',
    email: 'carlos@techsolutions.com',
    service: 'ISO 9001',
    message: 'Gostaria de um orçamento para certificação inicial.',
    lgpdAgreed: true,
    status: 'Novo',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    name: 'Ana Nogueira',
    company: 'Indústria Verde',
    email: 'ana.nogueira@verde.ind.br',
    service: 'ISO 14001',
    message: 'Precisamos de consultoria para auditoria de manutenção.',
    lgpdAgreed: true,
    status: 'Em andamento',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'Roberto Dias',
    company: 'Construtora Horizonte',
    email: 'roberto@horizonte.com.br',
    service: 'PBQP-H',
    message: 'Implementação do programa de qualidade na construção civil.',
    lgpdAgreed: true,
    status: 'Concluído',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
]

const listeners = new Set<() => void>()

const emitChange = () => {
  for (const listener of listeners) {
    listener()
  }
}

export default function useLeadStore() {
  const [leads, setLeads] = useState<Lead[]>(memoryLeads)

  useEffect(() => {
    const listener = () => setLeads([...memoryLeads])
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const addLead = (leadData: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'Novo',
      createdAt: new Date().toISOString(),
    }
    memoryLeads = [newLead, ...memoryLeads]
    emitChange()
  }

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    memoryLeads = memoryLeads.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    emitChange()
  }

  return { leads, addLead, updateLeadStatus }
}
