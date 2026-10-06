// POST /api/contato — formulário de contato e canal do titular (LGPD).
// Envia um e-mail ao Alexandre pelo Resend, com "responder" direto para o visitante.
import {
  type Ctx,
  CONTACT_TO_DEFAULT,
  FROM_SITE,
  agoraSP,
  clean,
  esc,
  isBot,
  isEmail,
  json,
  resend,
} from '../../server/shared'

const FALHA = `Não foi possível enviar agora. Escreva para ${CONTACT_TO_DEFAULT} ou chame no WhatsApp (11) 98613-4789.`

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Requisição inválida.' })
  }

  // Robô: responde como se tivesse dado certo e descarta.
  if (isBot(body)) return json(200, { ok: true })

  const tipo = body.tipo === 'lgpd' ? 'lgpd' : 'contato'
  const nome = clean(body.nome, 120)
  const email = clean(body.email, 254).toLowerCase()
  const empresa = clean(body.empresa, 160)
  const servico = clean(body.servico, 80)
  const assunto = clean(body.assunto, 160)
  const mensagem = clean(body.mensagem, 5000)

  if (nome.length < 2) return json(422, { error: 'Informe seu nome.' })
  if (!isEmail(email)) return json(422, { error: 'Informe um e-mail válido.' })
  if (mensagem.length < 10) return json(422, { error: 'A mensagem está muito curta.' })

  if (!env.RESEND_API_KEY) return json(503, { error: FALHA })

  const linhas: [string, string][] = [
    ['Nome', nome],
    ['E-mail', email],
    ...(empresa ? [['Empresa', empresa] as [string, string]] : []),
    ...(servico ? [['Serviço', servico] as [string, string]] : []),
    ...(assunto ? [['Assunto', assunto] as [string, string]] : []),
    ['Recebido em', agoraSP()],
  ]

  const titulo = tipo === 'lgpd' ? 'Solicitação de titular de dados (LGPD)' : 'Nova mensagem pelo site'
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0D0D0D;max-width:640px">
      <h2 style="color:#091D39;margin:0 0 16px">${esc(titulo)}</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${linhas
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:4px 0">${esc(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:16px 0 4px;color:#555"><b>Mensagem</b></p>
      <div style="white-space:pre-wrap;border-left:3px solid #CFAE70;padding:8px 12px;background:#F7F5F0">${esc(mensagem)}</div>
      ${tipo === 'lgpd' ? '<p style="color:#A90000;font-size:13px">Prazo legal de resposta ao titular: até 15 dias (LGPD, art. 19, II).</p>' : ''}
      <p style="font-size:12px;color:#888;margin-top:24px">Responda este e-mail para falar direto com ${esc(nome)}.</p>
    </div>`

  const assuntoEmail =
    tipo === 'lgpd'
      ? `[LGPD] ${assunto || 'Solicitação de titular'} — ${nome}`
      : `Contato pelo site — ${nome}${empresa ? ` (${empresa})` : ''}`

  const r = await resend(env, '/emails', {
    from: FROM_SITE,
    to: [env.CONTACT_TO || CONTACT_TO_DEFAULT],
    reply_to: email,
    subject: assuntoEmail,
    html,
  })

  if (!r.ok) {
    console.error('Resend falhou', r.status, JSON.stringify(r.data))
    return json(502, { error: FALHA })
  }
  return json(200, { ok: true })
}
