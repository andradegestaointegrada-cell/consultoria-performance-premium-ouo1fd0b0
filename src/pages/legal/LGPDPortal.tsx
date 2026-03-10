import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

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
              Se você deseja exercer qualquer um dos seus direitos ou tiver alguma dúvida sobre como
              processamos seus dados, entre em contato com nosso Encarregado de Proteção de Dados:
            </p>

            <div className="bg-card border border-border p-6 rounded-lg mt-6 flex items-center gap-4">
              <div className="p-3 bg-primary text-primary-foreground rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground font-bold m-0 uppercase tracking-wide">
                  E-mail para solicitações LGPD:
                </p>
                <a
                  href="mailto:andrade.gestaointegrada@gmail.com"
                  className="text-accent hover:underline m-0"
                >
                  andrade.gestaointegrada@gmail.com
                </a>
              </div>
            </div>

            <p className="mt-12 text-sm font-bold">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
