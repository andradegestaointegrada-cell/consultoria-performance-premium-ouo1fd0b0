// GET /api/newsletter/confirmar?t=<token> — clique no link do e-mail de confirmação.
// Grava o contato no segmento da newsletter no Resend e leva para a página de retorno.
import { type Ctx, resend, verificar } from '../../../server/shared'

const VALIDADE_MS = 7 * 24 * 60 * 60 * 1000

export const onRequestGet = async ({ request, env }: Ctx) => {
  const url = new URL(request.url)
  const voltar = (status: string) => Response.redirect(`${url.origin}/newsletter?status=${status}`, 303)

  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID || !env.NEWSLETTER_SECRET) return voltar('erro')

  const dados = await verificar(env.NEWSLETTER_SECRET, url.searchParams.get('t') || '')
  if (!dados || typeof dados.e !== 'string') return voltar('invalido')
  if (Date.now() - Number(dados.ts) > VALIDADE_MS) return voltar('expirado')

  const email = dados.e
  const segmento = env.RESEND_SEGMENT_ID

  const criado = await resend(env, '/contacts', {
    email,
    unsubscribed: false,
    properties: { origem: String(dados.o || 'site') },
    segments: [{ id: segmento }],
  })

  if (!criado.ok) {
    // Contato já existente (inclusive quem tinha se descadastrado): reativa e põe no segmento.
    const enc = encodeURIComponent(email)
    const atualizado = await resend(env, `/contacts/${enc}`, { unsubscribed: false }, 'PATCH')
    const noSegmento = await resend(env, `/contacts/${enc}/segments/${segmento}`)
    if (!atualizado.ok && !noSegmento.ok) {
      console.error('Resend falhou', criado.status, JSON.stringify(criado.data), noSegmento.status)
      return voltar('erro')
    }
  }

  return voltar('confirmada')
}
