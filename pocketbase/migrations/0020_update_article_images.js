migrate(
  (app) => {
    const updates = [
      {
        title: 'Liderança e Segurança: Pilares da Eficiência Operacional',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Mapeamento de Processos: O Pit Stop Estratégico para a Alta Performance',
        url: 'https://img.usecurling.com/p/1200/800?q=race%20pit%20stop&color=gray',
      },
      {
        title: 'Pit Stop: Alinhamento Estratégico em Alta Velocidade',
        url: 'https://img.usecurling.com/p/1200/800?q=race%20pit%20stop&color=gray',
      },
      {
        title: 'ISO 9001:2026: O SGQ da Sua Empresa Está Preparado para o Que Vem a Seguir?',
        url: 'https://img.usecurling.com/p/1200/800?q=quality%20control&color=blue',
      },
      {
        title: 'O Futuro da Qualidade ISO 9001:2026',
        url: 'https://img.usecurling.com/p/1200/800?q=quality%20control&color=blue',
      },
    ]

    for (const update of updates) {
      app
        .db()
        .newQuery(
          "UPDATE articles SET image = {:url} WHERE title = {:title} OR title LIKE '%' || {:title} || '%'",
        )
        .bind({ url: update.url, title: update.title })
        .execute()
    }
  },
  (app) => {
    // Safe down migration (no-op as we don't store previous image urls)
  },
)
