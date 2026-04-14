const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mftirdjnmkegomoirmcc.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_SECRET_KEY

export const supabaseFetch = async (path: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(SUPABASE_KEY ? { apikey: SUPABASE_KEY } : {}),
    ...(options.headers as Record<string, string>),
  }

  const token = localStorage.getItem('sb-token')
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  } else if (!headers['Authorization'] && SUPABASE_KEY) {
    headers['Authorization'] = `Bearer ${SUPABASE_KEY}`
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
