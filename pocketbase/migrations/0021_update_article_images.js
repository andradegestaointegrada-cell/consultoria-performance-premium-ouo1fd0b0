migrate(
  (app) => {
    const map = {
      'LIDERANÇA E SEGURANÇA: PILARES DA EFICIÊNCIA OPERACIONAL':
        'https://img.usecurling.com/p/800/600?q=leadership',
      'MAPEAMENTO DE PROCESSOS: O PIT STOP ESTRATÉGICO PARA A ALTA PERFORMANCE':
        'https://img.usecurling.com/p/800/600?q=business%20process',
      'PIT STOP: ALINHAMENTO ESTRATÉGICO EM ALTA VELOCIDADE':
        'https://img.usecurling.com/p/800/600?q=pit%20stop',
      'ISO 9001:2026: O SGQ DA SUA EMPRESA ESTÁ PREPARADO PARA O QUE VEM A SEGUIR?':
        'https://img.usecurling.com/p/800/600?q=quality%20management',
      'O FUTURO DA QUALIDADE ISO 9001:2026': 'https://img.usecurling.com/p/800/600?q=technology',
    }

    // We bypass the file constraint by utilizing a raw query to populate the
    // `image` column with the direct thematic URLs as requested.
    for (const [title, url] of Object.entries(map)) {
      app
        .db()
        .newQuery('UPDATE articles SET image = {:url} WHERE title = {:title}')
        .bind({ url, title })
        .execute()
    }
  },
  (app) => {
    // To revert, we can just clear the image field for the affected records.
    const titles = [
      'LIDERANÇA E SEGURANÇA: PILARES DA EFICIÊNCIA OPERACIONAL',
      'MAPEAMENTO DE PROCESSOS: O PIT STOP ESTRATÉGICO PARA A ALTA PERFORMANCE',
      'PIT STOP: ALINHAMENTO ESTRATÉGICO EM ALTA VELOCIDADE',
      'ISO 9001:2026: O SGQ DA SUA EMPRESA ESTÁ PREPARADO PARA O QUE VEM A SEGUIR?',
      'O FUTURO DA QUALIDADE ISO 9001:2026',
    ]

    for (const title of titles) {
      app
        .db()
        .newQuery("UPDATE articles SET image = '' WHERE title = {:title} AND image LIKE 'http%'")
        .bind({ title })
        .execute()
    }
  },
)
