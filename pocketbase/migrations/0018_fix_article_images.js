migrate(
  (app) => {
    // 1. Force update the PIT STOP article to the specifically requested image
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = 'https://i.postimg.cc/rssF4qN2/Gemini-Generated-Image-xp0i0jxp0i0jxp0i.png' 
    WHERE title LIKE '%PIT STOP%' OR slug LIKE '%pit-stop%'
  `)
      .execute()

    // 2. Restore the ISO 14001 article image (unconditionally, to fix previous accidental removal)
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = 'https://img.usecurling.com/p/800/600?q=environmental&color=green' 
    WHERE title LIKE '%14001%' OR slug LIKE '%14001%'
  `)
      .execute()

    // 3. Restore ISO 9001 image if it was also accidentally cleared
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = 'https://img.usecurling.com/p/800/600?q=quality&color=blue' 
    WHERE (title LIKE '%9001%' OR slug LIKE '%9001%') 
    AND (image = '' OR image IS NULL OR image = 'null' OR image = 'undefined')
  `)
      .execute()

    // 4. Global catch-all: ensure no article is left without an image to maintain visual integrity
    app
      .db()
      .newQuery(`
    UPDATE articles 
    SET image = 'https://i.postimg.cc/Y2vzQnbp/BLOG_PAGE.jpg' 
    WHERE image = '' OR image IS NULL OR image = 'null' OR image = 'undefined'
  `)
      .execute()
  },
  (app) => {
    // Down migration not applicable
  },
)
