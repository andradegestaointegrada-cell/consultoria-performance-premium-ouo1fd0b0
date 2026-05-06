migrate(
  (app) => {
    app
      .db()
      .newQuery(
        "UPDATE articles SET image = {:img} WHERE slug LIKE '%14001%' OR title LIKE '%14001%'",
      )
      .bind({ img: 'https://i.postimg.cc/rssF4qN2/Gemini-Generated-Image-xp0i0jxp0i0jxp0i.png' })
      .execute()
  },
  (app) => {
    // Data update - no strict revert required
  },
)
