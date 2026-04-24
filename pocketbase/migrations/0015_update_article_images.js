migrate(
  (app) => {
    const updates = [
      {
        like: '%Pilares da Efici_ncia Operacional%',
        image:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      },
      {
        like: '%Alinhamento Estrat_gico em Alta Velocidade%',
        image:
          'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800',
      },
      {
        like: '%SGQ da sua empresa est_ preparado%',
        image:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      },
      {
        like: '%O Futuro da Qualidade ISO 9001:2026%',
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      },
    ]

    for (const u of updates) {
      app
        .db()
        .newQuery('UPDATE articles SET image = {:image} WHERE title LIKE {:like}')
        .bind({ image: u.image, like: u.like })
        .execute()
    }
  },
  (app) => {
    // Revert updates if necessary (setting back to previous state would require knowing previous URLs)
  },
)
