migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('newsletters')
    if (!col.fields.getByName('is_raw_html')) {
      col.fields.add(new BoolField({ name: 'is_raw_html' }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('newsletters')
    col.fields.removeByName('is_raw_html')
    app.save(col)
  },
)
