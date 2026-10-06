import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { postApi } from '@/lib/api'

// Inscrição com dupla confirmação: o contato só entra na lista depois do clique no e-mail.
export function NewsletterSignup({ origem, id = 'newsletter' }: { origem: string; id?: string }) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [lgpd, setLgpd] = useState(false)
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const inicio = useRef(Date.now())

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!lgpd) {
      toast({
        title: 'Falta o consentimento',
        description: 'Marque a concordância com a Política de Privacidade para assinar.',
        variant: 'destructive',
      })
      return
    }
    setLoading(true)
    try {
      await postApi('/api/newsletter', {
        email,
        consentimento: true,
        origem,
        website,
        elapsed: Date.now() - inicio.current,
      })
      setEnviado(true)
      setEmail('')
      setLgpd(false)
    } catch (err) {
      toast({
        title: 'Inscrição não concluída',
        description: (err as Error).message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (enviado) {
    return (
      <p className="text-sm text-foreground border-l-4 border-primary pl-4 py-2" role="status">
        Falta só confirmar: enviamos um e-mail com o link de confirmação. A inscrição vale depois
        do clique (confira também a caixa de spam).
      </p>
    )
  }

  return (
    <form className="flex flex-col gap-4 relative" onSubmit={onSubmit}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>
      <label htmlFor={`${id}-email`} className="sr-only">
        Seu e-mail
      </label>
      <Input
        id={`${id}-email`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail profissional"
        className="bg-card border-border text-foreground h-12 focus-visible:ring-primary"
      />
      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id={`${id}-lgpd`}
          checked={lgpd}
          onCheckedChange={(v) => setLgpd(v === true)}
          className="border-primary data-[state=checked]:bg-primary mt-0.5"
        />
        <label
          htmlFor={`${id}-lgpd`}
          className="text-xs text-muted-foreground leading-snug cursor-pointer"
        >
          Concordo com a{' '}
          <Link to="/politica-de-privacidade" className="underline hover:text-primary">
            Política de Privacidade
          </Link>{' '}
          e quero receber a newsletter (cancelamento a qualquer momento).
        </label>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="h-12 uppercase font-bold tracking-widest bg-primary text-primary-foreground hover:bg-primary/80 transition-colors mt-2"
      >
        {loading ? 'Enviando...' : 'Assinar'}
      </Button>
    </form>
  )
}
