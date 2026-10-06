// Chamadas às funções do Cloudflare Pages (pasta functions/).

export const EMAIL_CONTATO = 'alexandre@andradegestaointegrada.com.br'
export const WHATSAPP = '+55 (11) 98613-4789'
export const WHATSAPP_URL = 'https://wa.me/5511986134789'

export async function postApi(path: string, body: Record<string, unknown>) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(
      data.error ||
        `Não foi possível enviar agora. Escreva para ${EMAIL_CONTATO} ou chame no WhatsApp ${WHATSAPP}.`,
    )
  }
  return data
}
