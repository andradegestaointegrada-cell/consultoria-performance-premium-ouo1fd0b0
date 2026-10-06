import { Link, useSearchParams } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const RETORNOS: Record<string, { titulo: string; texto: string }> = {
  confirmada: {
    titulo: 'Inscrição confirmada',
    texto: 'Você vai receber a próxima edição no seu e-mail. Todo envio traz o link para cancelar.',
  },
  expirado: {
    titulo: 'Link expirado',
    texto: 'O link de confirmação vale por 7 dias. Faça a inscrição de novo abaixo.',
  },
  invalido: {
    titulo: 'Link inválido',
    texto: 'Não reconhecemos este link de confirmação. Faça a inscrição de novo abaixo.',
  },
  erro: {
    titulo: 'Não foi possível confirmar agora',
    texto: 'Tente o link do e-mail mais tarde ou faça a inscrição de novo abaixo.',
  },
}

export default function Newsletter() {
  const [params] = useSearchParams()
  const retorno = RETORNOS[params.get('status') || '']

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Reveal>
          {retorno && (
            <div
              className="mb-12 rounded-xl border-2 border-primary bg-card p-6 md:p-8"
              role="status"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground uppercase tracking-wide mb-2">
                {retorno.titulo}
              </h2>
              <p className="text-muted-foreground">{retorno.texto}</p>
              {params.get('status') === 'confirmada' && (
                <Link
                  to="/insights"
                  className="inline-block mt-4 text-primary font-bold uppercase tracking-wider text-sm hover:underline"
                >
                  Enquanto isso, leia o blog →
                </Link>
              )}
            </div>
          )}

          {params.get('status') !== 'confirmada' && (
            <>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 uppercase tracking-wide">
                Newsletter da AGI
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                A cada quinze dias, um tema de sistemas de gestão explicado para quem decide: o que
                muda nas normas ISO e nas NRs, como isso afeta a operação e o que fazer primeiro.
              </p>
              <p className="text-muted-foreground mb-10">
                Sem propaganda disfarçada. Cancelamento em um clique, em qualquer envio.
              </p>
              <NewsletterSignup origem="pagina-newsletter" id="pagina-newsletter" />
            </>
          )}
        </Reveal>
      </div>
    </div>
  )
}
