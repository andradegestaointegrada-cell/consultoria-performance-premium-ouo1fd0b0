import { supabaseFetch } from '@/lib/supabase/client'

export interface Subscriber {
  id: string
  email: string
  source: string
  lgpdAgreed: boolean
  active: boolean
  created?: string
  created_at?: string
}

export interface Newsletter {
  id: string
  subject: string
  content: string
  is_raw_html?: boolean
  edition?: string
  period?: string
  main_title?: string
  sections?: any
  cta_text?: string
  cta_url?: string
  recipient_count: number
  status: string
  created?: string
  created_at?: string
}

export interface StructuredNewsletterData {
  subject: string
  is_raw_html?: boolean
  edition?: string
  period?: string
  main_title?: string
  sections?: { title: string; content: string }[]
  cta_text?: string
  cta_url?: string
}

export interface DeliveryLog {
  id: string
  newsletter_id: string
  recipient_email: string
  status: string
  error_message: string
  created?: string
  created_at?: string
}

export const getSubscribers = () => supabaseFetch('/rest/v1/subscribers?order=created_at.desc')

export const createSubscriber = async (data: Partial<Subscriber>) => {
  const res = await fetch(import.meta.env.VITE_POCKETBASE_URL + '/backend/v1/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Erro ao processar sua inscrição')
  }
  return res.json()
}

export const getNewsletters = () => supabaseFetch('/rest/v1/newsletters?order=created_at.desc')

export const getDeliveryLogs = (newsletterId: string) =>
  supabaseFetch(`/rest/v1/delivery_logs?newsletter_id=eq.${newsletterId}&order=created_at.desc`)

export const sendNewsletter = async (data: StructuredNewsletterData & { content: string }) => {
  const token = localStorage.getItem('sb-token')
  const res = await fetch(import.meta.env.VITE_POCKETBASE_URL + '/backend/v1/newsletter/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to send')
  }
  return res.json()
}

export const sendTestNewsletter = async (
  email: string,
  data: StructuredNewsletterData & { content: string },
) => {
  const token = localStorage.getItem('sb-token')
  const res = await fetch(import.meta.env.VITE_POCKETBASE_URL + '/backend/v1/newsletter/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ email, ...data }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to send test email')
  }
  return res.json()
}
