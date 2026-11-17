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

export const cleanLine = (s: unknown, max: number) =>
  typeof s === 'string'
    ? s.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max)
    : ''

export const isEmail = (s: string) =>
  s.length <= 254 && /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i.test(s)

// Valida que o POST partiu do próprio site (produção, prévia da Cloudflare ou dev local).
export const isSameOrigin = (request: Request) => {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    const { hostname } = new URL(origin)
    return (
      hostname === 'www.andradegestaointegrada.com.br' ||
      hostname === 'andradegestaointegrada.com.br' ||
      hostname.endsWith('.consultoria-performance-premium-ouo1fd0b0.pages.dev') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1'
    )
  } catch {
    return false
  }
}

// Formulário preenchido por robô: campo escondido preenchido ou tempo ausente/inválido (< 2s ou > 24h).
export const isBot = (body: Record<string, unknown>) => {
  if (typeof body.website === 'string' && body.website.trim() !== '') return true
  const elapsed = Number(body.elapsed)
  return !Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 86_400_000
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

const bytesFromB64url = (s: string) => {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)
  return Uint8Array.from(atob(pad), (c) => c.charCodeAt(0))
}

async function hmacKey(secret: string, usages: KeyUsage[]) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usages,
  )
}

export async function assinar(secret: string, payload: Record<string, unknown>) {
  const p = b64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await hmacKey(secret, ['sign'])
  const sig = b64url(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(p)))
  return `${p}.${sig}`
}

export async function verificar(secret: string, token: string) {
  const [p, sig] = token.split('.')
  if (!p || !sig) return null
  try {
    const key = await hmacKey(secret, ['verify'])
    const valido = await crypto.subtle.verify(
      'HMAC',
      key,
      bytesFromB64url(sig),
      new TextEncoder().encode(p),
    )
    if (!valido) return null
    return JSON.parse(new TextDecoder().decode(bytesFromB64url(p))) as Record<string, unknown>
  } catch {
    return null
  }
}
