// POST /api/newsletter — pedido de inscrição. Envia um e-mail com link de confirmação
// (dupla confirmação): o contato só entra na lista depois do clique.
import {
  type Ctx,
  FROM_NEWSLETTER,
  assinar,
  clean,
  isBot,
  isEmail,
  json,
  resend,
} from '../../server/shared'

const FALHA = 'Não foi possível concluir a inscrição agora. Tente novamente mais tarde.'

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Requisição inválida.' })
  }

  if (isBot(body)) return json(200, { ok: true })

  const email = clean(body.email, 254).toLowerCase()
  const origem = clean(body.origem, 60) || 'site'
  if (!isEmail(email)) return json(422, { error: 'Informe um e-mail válido.' })
  if (body.consentimento !== true) {
    return json(422, { error: 'É preciso concordar com a Política de Privacidade.' })
  }

  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID || !env.NEWSLETTER_SECRET) {
    return json(503, { error: FALHA })
  }

  const token = await assinar(env.NEWSLETTER_SECRET, { e: email, o: origem, ts: Date.now() })
  const link = `${new URL(request.url).origin}/api/newsletter/confirmar?t=${encodeURIComponent(token)}`

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0D0D0D;max-width:560px">
      <h2 style="color:#091D39;margin:0 0 12px">Confirme sua inscrição</h2>
      <p>Recebemos um pedido para inscrever <b>${email.replace(/</g, '&lt;')}</b> na newsletter da Andrade Gestão Integrada: conteúdo quinzenal sobre sistemas de gestão, normas ISO e conformidade.</p>
      <p style="margin:24px 0">
        <a href="${link}" style="background:#091D39;color:#CFAE70;text-decoration:none;padding:12px 24px;border-radius:4px;font-weight:bold">Confirmar inscrição</a>
      </p>
      <p style="font-size:13px;color:#555">O link vale por 7 dias. Se você não fez este pedido, ignore este e-mail: nada será cadastrado.</p>
      <p style="font-size:12px;color:#888;margin-top:24px">Andrade Gestão Integrada e Treinamento · www.andradegestaointegrada.com.br</p>
    </div>`

  const r = await resend(env, '/emails', {
    from: FROM_NEWSLETTER,
    to: [email],
    subject: 'Confirme sua inscrição na newsletter da AGI',
    html,
  })

  if (!r.ok) {
    console.error('Resend falhou', r.status, JSON.stringify(r.data))
    return json(502, { error: FALHA })
  }
  return json(200, { ok: true })
}
