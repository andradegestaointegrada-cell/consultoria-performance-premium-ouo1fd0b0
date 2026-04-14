import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabaseFetch } from '@/lib/supabase/client'

interface AuthContextType {
  user: any
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sb-token')
    if (token) {
      supabaseFetch('/auth/v1/user')
        .then((userData) => {
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem('sb-token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const data = await supabaseFetch('/auth/v1/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (data && data.session) {
        localStorage.setItem('sb-token', data.session.access_token)
        setUser(data.user)
      }
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await supabaseFetch('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (data && data.access_token) {
        localStorage.setItem('sb-token', data.access_token)
        setUser(data.user)
      }
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = () => {
    localStorage.removeItem('sb-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
