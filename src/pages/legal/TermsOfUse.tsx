import { Reveal } from '@/components/ui/reveal'

export default function TermsOfUse() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 uppercase tracking-wide border-b border-border pb-4">
            Termos e Condições de Uso
          </h1>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground font-sans max-w-none">
            <p>
              Bem-vindo ao site da Andrade Gestão Integrada. Ao acessar e utilizar este site, você
              concorda em cumprir os seguintes termos e condições de uso, que, juntamente com nossa
              política de privacidade, regem o relacionamento da Andrade Gestão Integrada com você
              em relação a este site.
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              1. Aceitação dos Termos
            </h2>
            <p>
              O uso deste site está sujeito às seguintes condições de uso: O conteúdo das páginas
              deste site é para sua informação geral e uso exclusivo. Ele está sujeito a alterações
              sem aviso prévio.
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              2. Propriedade Intelectual
            </h2>
            <p>
              Este site contém material que é de nossa propriedade ou licenciado para nós. Esse
              material inclui, mas não se limita a, design, layout, aparência e gráficos. A
              reprodução é proibida, exceto de acordo com o aviso de direitos autorais, que faz
              parte destes termos e condições.
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              3. Uso Autorizado
            </h2>
            <p>
              Você não deve usar este site de nenhuma forma que cause, ou possa causar, danos ao
              site ou o comprometimento da disponibilidade ou acessibilidade do mesmo; ou de
              qualquer forma que seja ilícita, ilegal, fraudulenta ou prejudicial, ou em conexão com
              qualquer propósito ou atividade ilícita, ilegal, fraudulenta ou prejudicial.
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              4. Limitação de Responsabilidade
            </h2>
            <p>
              Nem nós nem terceiros fornecemos qualquer garantia quanto à precisão, pontualidade,
              desempenho, integridade ou adequação das informações e materiais encontrados ou
              oferecidos neste site para qualquer finalidade específica.
            </p>
            <p className="mt-12 text-sm font-bold">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
