import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || user.email !== 'andrade.gestaointegrada@gmail.com')) {
      navigate('/admin/login')
    }
  }, [user, loading, navigate])

  if (loading || !user)
    return (
      <div className="p-10 flex justify-center text-muted-foreground font-medium uppercase tracking-widest text-sm">
        Validando Acesso Seguro...
      </div>
    )

  return <>{children}</>
}
