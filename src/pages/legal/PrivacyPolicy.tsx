import { Reveal } from '@/components/ui/reveal'

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
              Esta política de privacidade define como a Andrade Gestão Integrada usa e protege
              qualquer informação que você nos fornece quando usa este site. Estamos empenhados em
              garantir que sua privacidade seja protegida.
            </p>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              O Que Coletamos
            </h2>
            <p>
              Podemos coletar as seguintes informações através do nosso formulário de contato ou
              newsletter:
            </p>
            <ul>
              <li>Nome e cargo</li>
              <li>Informações de contato, incluindo endereço de e-mail</li>
              <li>Informações demográficas, como preferências e interesses de serviço</li>
            </ul>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">
              O Que Fazemos com a Informação
            </h2>
            <p>
              Exigimos essas informações para entender suas necessidades e fornecer-lhe um serviço
              melhor, e em particular pelas seguintes razões:
            </p>
            <ul>
              <li>Manutenção de registros internos.</li>
              <li>Podemos usar as informações para melhorar nossos produtos e serviços.</li>
              <li>Podemos enviar periodicamente e-mails promocionais sobre novos serviços.</li>
            </ul>
            <h2 className="text-foreground font-heading uppercase tracking-wide mt-8">Segurança</h2>
            <p>
              Estamos empenhados em garantir que suas informações estejam seguras. Para evitar
              acesso ou divulgação não autorizada, implementamos procedimentos físicos, eletrônicos
              e gerenciais adequados para proteger as informações.
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
