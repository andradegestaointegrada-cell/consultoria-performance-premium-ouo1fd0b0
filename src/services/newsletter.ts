import pb from '@/lib/pocketbase/client'

export interface Subscriber {
  id: string
  email: string
  source: string
  lgpdAgreed: boolean
  active: boolean
  created: string
}

export interface Newsletter {
  id: string
  subject: string
  content: string
  edition?: string
  period?: string
  main_title?: string
  sections?: any
  cta_text?: string
  cta_url?: string
  recipient_count: number
  status: string
  created: string
}

export interface StructuredNewsletterData {
  subject: string
  edition: string
  period: string
  main_title: string
  sections: { title: string; content: string }[]
  cta_text?: string
  cta_url?: string
}

export interface DeliveryLog {
  id: string
  newsletter_id: string
  recipient_email: string
  status: string
  error_message: string
  created: string
}

export const getSubscribers = () =>
  pb.collection('subscribers').getFullList<Subscriber>({ sort: '-created' })
export const createSubscriber = (data: Partial<Subscriber>) =>
  pb.collection('subscribers').create(data)

export const getNewsletters = () =>
  pb.collection('newsletters').getFullList<Newsletter>({ sort: '-created' })
export const getDeliveryLogs = (newsletterId: string) =>
  pb
    .collection('delivery_logs')
    .getFullList<DeliveryLog>({ filter: `newsletter_id="${newsletterId}"`, sort: '-created' })

export const sendNewsletter = (data: StructuredNewsletterData & { content: string }) =>
  pb.send('/backend/v1/newsletter/send', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const sendTestNewsletter = (
  email: string,
  data: StructuredNewsletterData & { content: string },
) =>
  pb.send('/backend/v1/newsletter/test', {
    method: 'POST',
    body: JSON.stringify({ email, ...data }),
  })
