migrate(
  (app) => {
    app
      .db()
      .newQuery(
        "UPDATE articles SET image = {:img} WHERE title LIKE '%Pit Stop%' OR slug = 'mapeamento-de-processos'",
      )
      .bind({ img: 'https://i.postimg.cc/fWxG1CV5/PIT-STOP-01.jpg' })
      .execute()
  },
  (app) => {
    app
      .db()
      .newQuery("UPDATE articles SET image = '' WHERE image = {:img}")
      .bind({ img: 'https://i.postimg.cc/fWxG1CV5/PIT-STOP-01.jpg' })
      .execute()
  },
)
