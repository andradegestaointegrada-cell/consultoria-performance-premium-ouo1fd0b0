migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('articles')

    // Seed ISO 9001:2026 Article
    try {
      app.findFirstRecordByData('articles', 'slug', 'iso-9001-2026-sgq-preparado')
    } catch (_) {
      const record = new Record(col)
      record.set(
        'title',
        'ISO 9001:2026: O SGQ da Sua Empresa Está Preparado para o Que Vem a Seguir?',
      )
      record.set('slug', 'iso-9001-2026-sgq-preparado')
      record.set(
        'summary',
        'A nova versão da ISO 9001 traz mudanças significativas focadas em sustentabilidade, mudanças climáticas, digitalização e ética. Prepare seu Sistema de Gestão da Qualidade.',
      )
      record.set(
        'content',
        `
      <p>A revisão da norma ISO 9001 para a versão 2026 já está em andamento, trazendo atualizações cruciais para alinhar os Sistemas de Gestão da Qualidade (SGQ) aos desafios contemporâneos do mercado global. Não é apenas uma mudança burocrática, mas uma evolução estratégica.</p>

      <h3>5 Pontos Técnicos Críticos da Atualização</h3>
      <ol>
        <li><strong>Integração com ASG (ESG):</strong> Maior alinhamento com as práticas Ambientais, Sociais e de Governança, exigindo que a qualidade do produto ou serviço reflita impactos sustentáveis e responsabilidade corporativa.</li>
        <li><strong>Gestão de Mudanças Climáticas:</strong> Seguindo a emenda de 2024, haverá incorporação mandatória e aprofundada das diretrizes climáticas, exigindo que as empresas avaliem como as mudanças climáticas afetam sua capacidade de fornecer produtos e serviços conformes.</li>
        <li><strong>Digitalização e Inteligência Artificial:</strong> Foco ampliado na gestão da informação documentada em ambientes digitais, segurança cibernética e o impacto do uso de IA e automação avançada nos processos produtivos.</li>
        <li><strong>Cadeia de Suprimentos Resiliente:</strong> Aprofundamento considerável nas exigências de avaliação e monitoramento de fornecedores em cenários de alta volatilidade, visando mitigar riscos de interrupção na cadeia.</li>
        <li><strong>Foco Aprimorado em Ética e Integridade:</strong> Integração de requisitos de compliance mais rigorosos dentro do SGQ para evitar desvios éticos e promover uma cultura organizacional transparente e segura.</li>
      </ol>

      <h3>Sua Empresa Está Preparada?</h3>
      <p>Antecipar essas mudanças não é apenas uma questão de manter o certificado na parede, mas sim uma estratégia fundamental de competitividade. Empresas que começam a adaptar seus processos desde já evitam a correria de última hora, custos adicionais e possíveis não-conformidades críticas na transição para a nova versão da norma.</p>
      
      <p><strong>Ação Recomendada:</strong> Entre em contato com nossos especialistas da Andrade Gestão Integrada e realize um diagnóstico preliminar do seu Sistema de Gestão da Qualidade atual em relação às diretrizes projetadas para a ISO 9001:2026.</p>
    `,
      )
      record.set('category', 'Qualidade')
      record.set('published_date', new Date().toISOString())
      record.set('is_highlighted', false)
      app.save(record)
    }

    // Highlight existing ISO 14001:2026 Article
    try {
      const iso14001 = app.findFirstRecordByData(
        'articles',
        'slug',
        'iso-14001-2026-janela-oportunidade',
      )
      iso14001.set('is_highlighted', true)
      app.save(iso14001)
    } catch (_) {
      // Silently ignore if not found
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData('articles', 'slug', 'iso-9001-2026-sgq-preparado')
      app.delete(record)
    } catch (_) {}

    try {
      const iso14001 = app.findFirstRecordByData(
        'articles',
        'slug',
        'iso-14001-2026-janela-oportunidade',
      )
      iso14001.set('is_highlighted', false)
      app.save(iso14001)
    } catch (_) {}
  },
)
