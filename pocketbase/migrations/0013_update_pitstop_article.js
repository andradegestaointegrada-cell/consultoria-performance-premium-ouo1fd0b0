migrate(
  (app) => {
    let article
    try {
      article = app.findFirstRecordByData(
        'articles',
        'title',
        'Pit Stop de Performance: Auditoria de Prontidão e Resultados',
      )
    } catch (_) {
      try {
        const records = app.findRecordsByFilter('articles', "title ~ 'Pit Stop'", '', 1, 0)
        if (records.length > 0) {
          article = records[0]
        }
      } catch (_) {}
    }

    if (article) {
      article.set(
        'title',
        'Mapeamento de Processos: O Pit Stop Estratégico para a Alta Performance',
      )
      article.set('slug', 'mapeamento-processos-pit-stop-performance')
      article.set('category', 'Performance')
      article.set(
        'summary',
        "Transforme sua operação com o Mapeamento Avançado de Processos. Descubra como o método 'Pit Stop' da AGI identifica gargalos, mitiga riscos operacionais e estrutura KPIs para resultados exponenciais.",
      )

      const content = `<h2>ISO 14001:2026 e a Cultura de Performance</h2>
<p>In the world of high-performance racing, a pit stop is not just a tire change; it is a moment of technical precision where every second counts toward victory. At AGI, we apply this same mindset to <strong>Advanced Process Mapping</strong>.</p>
<h3>Deliverables</h3>
<ul>
  <li><strong>Mapeamento Avançado de Processos:</strong> Elimination of redundancies and workflow optimization.</li>
  <li><strong>Gestão de Riscos Operacionais:</strong> Proactive identification of critical points to ensure business continuity.</li>
  <li><strong>Estruturação de Indicadores de Desempenho (KPIs):</strong> Precise dashboards for data-driven decisions.</li>
  <li><strong>Auditoria de Prontidão:</strong> Technical validation to ensure teams and processes are ready for scale.</li>
</ul>
<p>Through this methodology, the certification leverages operational efficiency and reduces waste, ensuring your business stays on the fast track to sustained high performance.</p>`

      article.set('content', content)
      app.save(article)
    }
  },
  (app) => {
    try {
      const article = app.findFirstRecordByData(
        'articles',
        'slug',
        'mapeamento-processos-pit-stop-performance',
      )
      article.set('title', 'Pit Stop de Performance: Auditoria de Prontidão e Resultados')
      article.set('slug', 'pit-stop-performance')
      article.set('summary', 'Auditoria de prontidão e resultados utilizando o método Pit Stop.')

      const oldContent = `<h2>Metodologia Pit Stop</h2>
<p>A auditoria de prontidão e resultados focada em identificar gargalos rapidamente e voltar para a pista.</p>`
      article.set('content', oldContent)
      app.save(article)
    } catch (_) {}
  },
)
