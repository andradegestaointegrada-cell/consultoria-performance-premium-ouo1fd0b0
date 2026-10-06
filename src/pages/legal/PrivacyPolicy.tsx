import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { EMAIL_CONTATO } from '@/lib/api'

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-foreground font-heading uppercase tracking-wide mt-10">{children}</h2>
)

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide border-b border-border pb-4">
            Política de Privacidade
          </h1>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground font-sans max-w-none">
            <p>
              Esta política explica quais dados pessoais o site andradegestaointegrada.com.br
              coleta, para que são usados e como você exerce seus direitos, conforme a Lei Geral de
              Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>

            <H2>1. Quem é o controlador</H2>
            <p>
              ALEXANDRE FERREIRA DE ANDRADE LTDA, nome fantasia Andrade Gestão Integrada e
              Treinamento (AGI), CNPJ 66.060.174/0001-58, Rua Pais Leme, 215, conj. 1713,
              Pinheiros, São Paulo/SP, CEP 05424-150.
            </p>
            <p>
              Encarregado pelo tratamento de dados: Alexandre Andrade —{' '}
              <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>.
            </p>

            <H2>2. Dados que coletamos</H2>
            <ul>
              <li>
                <strong>Formulário de contato:</strong> nome, empresa, e-mail, serviço de interesse
                e a mensagem que você escrever.
              </li>
              <li>
                <strong>Newsletter:</strong> e-mail, origem da inscrição e data da confirmação.
              </li>
              <li>
                <strong>Portal LGPD:</strong> nome, e-mail e o conteúdo da sua solicitação.
              </li>
              <li>
                <strong>WhatsApp:</strong> ao clicar no botão, a conversa acontece no próprio
                aplicativo do WhatsApp, sujeita à política da Meta.
              </li>
            </ul>
            <p>
              O site não usa cookies de publicidade nem ferramentas de rastreamento. O navegador
              guarda apenas a sua escolha de tema (claro ou escuro).
            </p>

            <H2>3. Para que usamos e com qual base legal</H2>
            <ul>
              <li>
                Responder ao seu contato e preparar propostas: procedimentos preliminares a um
                contrato, a seu pedido (art. 7º, V).
              </li>
              <li>Enviar a newsletter: seu consentimento (art. 7º, I), que você pode revogar.</li>
              <li>
                Atender solicitações de titulares: cumprimento de obrigação legal (art. 7º, II).
              </li>
            </ul>
            <p>Não vendemos nem cedemos seus dados para fins comerciais de terceiros.</p>

            <H2>4. Com quem os dados são compartilhados</H2>
            <p>
              Apenas com os prestadores que operam o site e o e-mail, na medida do necessário:
              Cloudflare (hospedagem do site), Resend (envio de e-mails e lista da newsletter) e
              Locaweb (caixa de e-mail da AGI). Cloudflare e Resend podem processar dados fora do
              Brasil, com as garantias previstas no art. 33 da LGPD. O site também carrega fontes do
              Google Fonts e imagens de bancos de imagens, o que envolve a comunicação do seu
              endereço IP com esses serviços.
            </p>

            <H2>5. Por quanto tempo guardamos</H2>
            <ul>
              <li>Mensagens de contato: até 2 anos após o último contato, salvo se virar contrato.</li>
              <li>Newsletter: até você cancelar a inscrição (link em todo e-mail enviado).</li>
              <li>Solicitações LGPD: pelo prazo necessário para comprovar o atendimento.</li>
            </ul>

            <H2>6. Seus direitos</H2>
            <p>
              Você pode pedir confirmação de tratamento, acesso, correção, anonimização, bloqueio ou
              eliminação, portabilidade, informação sobre compartilhamento e revogação do
              consentimento (art. 18). Use o <Link to="/portal-lgpd">Portal LGPD</Link> ou escreva
              para <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>. Respondemos em até 15
              dias.
            </p>

            <H2>7. Segurança</H2>
            <p>
              O site trafega apenas por conexão criptografada (HTTPS), as chaves de acesso aos
              serviços ficam no servidor, e o acesso às mensagens é restrito à AGI.
            </p>

            <H2>8. Alterações</H2>
            <p>
              Esta política pode ser atualizada. A data abaixo indica a versão em vigor.
            </p>
            <p className="mt-12 text-sm font-bold">Última atualização: 6 de outubro de 2026</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
