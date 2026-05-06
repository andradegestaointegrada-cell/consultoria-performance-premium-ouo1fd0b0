migrate(
  (app) => {
    const updates = [
      // General fallbacks based on standard themes
      {
        like: '%14001%',
        img: 'https://img.usecurling.com/p/1200/800?q=environmental%20management&color=green',
      },
      {
        like: '%9001%',
        img: 'https://img.usecurling.com/p/1200/800?q=quality%20control&color=blue',
      },
      {
        like: '%45001%',
        img: 'https://img.usecurling.com/p/1200/800?q=occupational%20safety&color=orange',
      },

      // Specific match overrides for better thematic representation
      {
        like: '%Compromisso%',
        img: 'https://img.usecurling.com/p/1200/800?q=sustainability%20nature&color=green',
      },
      {
        like: '%Nova ISO 9001%',
        img: 'https://img.usecurling.com/p/1200/800?q=business%20standards&color=blue',
      },
      {
        like: '%Pit Stop%',
        img: 'https://img.usecurling.com/p/1200/800?q=race%20pit%20stop&color=gray',
      },
    ]

    // Execute specific updates
    for (const u of updates) {
      app
        .db()
        .newQuery('UPDATE articles SET image = {:img} WHERE title LIKE {:like}')
        .bind({ img: u.img, like: u.like })
        .execute()
    }

    // Catch-all fallback for any articles that might not match the above patterns
    app
      .db()
      .newQuery("UPDATE articles SET image = {:img} WHERE image IS NULL OR image = ''")
      .bind({ img: 'https://img.usecurling.com/p/1200/800?q=corporate%20strategy&color=black' })
      .execute()
  },
  (app) => {
    // Revert is empty as we don't have the state of the previous URLs to roll back
  },
)
