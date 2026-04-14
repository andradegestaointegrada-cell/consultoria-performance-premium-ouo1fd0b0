const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mftirdjnmkegomoirmcc.supabase.co'
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZAXR7qW-S290nU3FP1hMPQ_VYWQPgIG'

export const supabaseFetch = async (path: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(SUPABASE_ANON_KEY ? { apikey: SUPABASE_ANON_KEY } : {}),
    ...(options.headers as Record<string, string>),
  }

  const token = localStorage.getItem('sb-token')
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  } else if (!headers['Authorization'] && SUPABASE_ANON_KEY) {
    headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers })

  if (!response.ok) {
    const text = await response.text()
    let err
    try {
      err = JSON.parse(text)
    } catch {
      err = { message: text }
    }
    throw new Error(err.message || err.error_description || err.error || `Error ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}
