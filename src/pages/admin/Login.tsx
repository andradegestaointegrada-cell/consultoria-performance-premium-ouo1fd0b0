import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInWithPassword } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signInWithPassword(email, password)
    if (error) {
      toast({
        title: 'Acesso Negado',
        description: error.message || 'Credenciais inválidas ou sem privilégios de administração.',
        variant: 'destructive',
      })
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="container flex justify-center items-center min-h-[70vh] py-20">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-heading uppercase tracking-wide">
            Acesso Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              placeholder="E-mail admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
            <Button type="submit" className="w-full h-12 uppercase tracking-widest font-bold">
              Autenticar Sistema
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
