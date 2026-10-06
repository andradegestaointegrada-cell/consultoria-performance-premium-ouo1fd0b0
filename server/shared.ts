// Código compartilhado pelas funções do Cloudflare Pages (pasta functions/).
// Fica fora de functions/ para não virar rota.

export interface Env {
  RESEND_API_KEY?: string
  RESEND_SEGMENT_ID?: string
  NEWSLETTER_SECRET?: string
  CONTACT_TO?: string
}

export interface Ctx {
  request: Request
  env: Env
}

export const CONTACT_TO_DEFAULT = 'alexandre@andradegestaointegrada.com.br'
export const FROM_SITE = 'Site AGI <site@andradegestaointegrada.com.br>'
export const FROM_NEWSLETTER = 'Newsletter AGI <newsletter@andradegestaointegrada.com.br>'

export const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

export const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const clean = (s: unknown, max: number) =>
  typeof s === 'string' ? s.replace(/\s+$/g, '').trim().slice(0, max) : ''

export const isEmail = (s: string) =>
  s.length <= 254 && /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i.test(s)

// Formulário preenchido por robô: campo escondido preenchido ou envio rápido demais.
export const isBot = (body: Record<string, unknown>) => {
  if (typeof body.website === 'string' && body.website.trim() !== '') return true
  const elapsed = Number(body.elapsed)
  return Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2000
}

export const agoraSP = () =>
  new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

export async function resend(env: Env, path: string, body?: unknown, method = 'POST') {
  const res = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

// Token assinado (HMAC-SHA256) para o link de confirmação da newsletter.
const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  let s = ''
  bytes.forEach((b) => (s += String.fromCharCode(b)))
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromB64url = (s: string) => {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)
  return new TextDecoder().decode(Uint8Array.from(atob(pad), (c) => c.charCodeAt(0)))
}

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return b64url(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)))
}

export async function assinar(secret: string, payload: Record<string, unknown>) {
  const p = b64url(new TextEncoder().encode(JSON.stringify(payload)))
  return `${p}.${await hmac(secret, p)}`
}

export async function verificar(secret: string, token: string) {
  const [p, sig] = token.split('.')
  if (!p || !sig || (await hmac(secret, p)) !== sig) return null
  try {
    return JSON.parse(fromB64url(p)) as Record<string, unknown>
  } catch {
    return null
  }
}
