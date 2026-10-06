import { Reveal } from '@/components/ui/reveal'
import { LGPDContactForm } from './LGPDContactForm'
import { EMAIL_CONTATO } from '@/lib/api'

export default function LGPDPortal() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide border-b border-border pb-4">
            Portal de LGPD
          </h1>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground font-sans max-w-none">
            <p className="lead text-xl">
              A Andrade Gestão Integrada está comprometida com o cumprimento rigoroso da Lei Geral
              de Proteção de Dados (Lei nº 13.709/2018).
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              Seus Direitos
            </h2>
            <p>
              De acordo com a LGPD, como titular dos dados, você tem os seguintes direitos em
              relação às suas informações pessoais:
            </p>
            <ul>
              <li>Confirmação da existência de tratamento de dados;</li>
              <li>Acesso aos dados pessoais que possuímos;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>Eliminação dos dados tratados com seu consentimento.</li>
            </ul>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              Contato do Encarregado de Dados (DPO)
            </h2>
            <p>
              Encarregado: Alexandre Andrade —{' '}
              <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>. Para exercer seus direitos ou
              tirar dúvidas sobre o tratamento dos seus dados, preencha o formulário abaixo ou
              escreva para esse e-mail. Respondemos em até 15 dias.
            </p>

            <LGPDContactForm />

            <p className="mt-12 text-sm font-bold">
              Última atualização: 6 de outubro de 2026
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
