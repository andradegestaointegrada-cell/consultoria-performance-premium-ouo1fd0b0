migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('articles')

    const articles = [
      {
        title: 'Liderança e Segurança: Pilares da Eficiência Operacional',
        slug: 'lideranca-e-seguranca',
        summary:
          'A importância da liderança na gestão de riscos e como isso impulsiona a eficiência operacional e técnica.',
        content:
          '<h2>Liderança na Gestão de Riscos</h2><p>A liderança desempenha um papel fundamental na construção de uma cultura de segurança robusta. Organizações que integram práticas de gestão de riscos à liderança técnica não apenas protegem seus colaboradores, mas também otimizam seus processos e resultados.</p><h3>Pilares da Eficiência</h3><ul><li><strong>Visão Estratégica:</strong> Antecipação de cenários e mitigação de vulnerabilidades.</li><li><strong>Engajamento:</strong> Equipes alinhadas com os protocolos de segurança.</li><li><strong>Melhoria Contínua:</strong> Avaliação constante de métricas e indicadores.</li></ul><p>Investir em liderança é o primeiro passo para garantir operações livres de falhas e com alta performance.</p>',
        category: 'Liderança',
        published_date: new Date().toISOString(),
        is_highlighted: false,
      },
      {
        title: 'Pit Stop de Performance: Auditoria de Prontidão e Resultados',
        slug: 'pit-stop-performance',
        summary:
          'Metodologia de diagnóstico rápido para otimizar processos e alavancar resultados organizacionais.',
        content:
          '<h2>Diagnóstico Rápido e Preciso</h2><p>O Pit Stop de Performance é uma metodologia focada em diagnósticos rápidos e precisos para otimização de processos. Semelhante ao que ocorre no automobilismo, a ideia é realizar paradas estratégicas para avaliar o desempenho, ajustar engrenagens e retornar à operação com máxima eficiência.</p><h3>Vantagens do Pit Stop</h3><ul><li><strong>Agilidade:</strong> Identificação rápida de gargalos operacionais.</li><li><strong>Precisão:</strong> Foco nas áreas de maior impacto nos resultados.</li><li><strong>Ação:</strong> Implementação imediata de melhorias práticas.</li></ul><p>Com essa abordagem, sua empresa ganha fôlego para superar metas e manter a excelência.</p>',
        category: 'Performance',
        published_date: new Date().toISOString(),
        is_highlighted: false,
      },
    ]

    for (const data of articles) {
      try {
        const existing = app.findFirstRecordByData('articles', 'slug', data.slug)
        existing.set('title', data.title)
        existing.set('summary', data.summary)
        existing.set('content', data.content)
        existing.set('category', data.category)
        app.save(existing)
      } catch (_) {
        const record = new Record(col)
        record.set('title', data.title)
        record.set('slug', data.slug)
        record.set('summary', data.summary)
        record.set('content', data.content)
        record.set('category', data.category)
        record.set('published_date', data.published_date)
        record.set('is_highlighted', data.is_highlighted)
        app.save(record)
      }
    }
  },
  (app) => {
    const slugs = ['lideranca-e-seguranca', 'pit-stop-performance']
    for (const slug of slugs) {
      try {
        const record = app.findFirstRecordByData('articles', 'slug', slug)
        app.delete(record)
      } catch (_) {}
    }
  },
)
