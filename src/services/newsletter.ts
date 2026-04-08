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
  recipient_count: number
  status: string
  created: string
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

export const sendNewsletter = (subject: string, content: string) =>
  pb.send('/backend/v1/newsletter/send', {
    method: 'POST',
    body: JSON.stringify({ subject, content }),
  })

export const sendTestNewsletter = (email: string, subject: string, content: string) =>
  pb.send('/backend/v1/newsletter/test', {
    method: 'POST',
    body: JSON.stringify({ email, subject, content }),
  })
