migrate(
  (app) => {
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2560&auto=format&fit=crop' 
    WHERE title LIKE '%ISO 14001%' OR slug LIKE '%iso-14001%'
  `)
      .execute()
  },
  (app) => {
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = '' 
    WHERE title LIKE '%ISO 14001%' OR slug LIKE '%iso-14001%'
  `)
      .execute()
  },
)
