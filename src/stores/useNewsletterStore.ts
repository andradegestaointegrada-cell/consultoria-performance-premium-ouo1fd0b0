import { useState, useEffect } from 'react'

export interface Subscriber {
  id: string
  email: string
  source: string
  lgpdAgreed: boolean
  createdAt: string
}

export interface Campaign {
  id: string
  subject: string
  content: string
  sendDate: string
  status: 'Scheduled' | 'Sent'
}

const STORAGE_KEY = '@ag-consultoria/newsletter'

const defaultData = {
  subscribers: [
    {
      id: '1',
      email: 'contato@empresa-exemplo.com.br',
      source: 'Acesso Antecipado',
      lgpdAgreed: true,
      createdAt: new Date().toISOString(),
    },
  ] as Subscriber[],
  campaigns: [] as Campaign[],
}

const getInitialData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultData
  } catch {
    return defaultData
  }
}

let memoryData = getInitialData()
const listeners = new Set<() => void>()

const emitChange = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryData))
  } catch (error) {
    console.error('Failed to save newsletter data to localStorage', error)
  }
  listeners.forEach((l) => l())
}

export default function useNewsletterStore() {
  const [data, setData] = useState(memoryData)

  useEffect(() => {
    const listener = () => setData({ ...memoryData })
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const addSubscriber = (sub: Omit<Subscriber, 'id' | 'createdAt'>) => {
    const newSub: Subscriber = {
      ...sub,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    }
    memoryData = { ...memoryData, subscribers: [newSub, ...memoryData.subscribers] }
    emitChange()
  }

  const addCampaign = (camp: Omit<Campaign, 'id'>) => {
    const newCamp: Campaign = {
      ...camp,
      id: Math.random().toString(36).substring(2, 9),
    }
    memoryData = { ...memoryData, campaigns: [newCamp, ...memoryData.campaigns] }
    emitChange()
  }

  return { ...data, addSubscriber, addCampaign }
}
