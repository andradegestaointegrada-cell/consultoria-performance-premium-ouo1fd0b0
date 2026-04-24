migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('articles')
    if (!col.fields.getByName('is_highlighted')) {
      col.fields.add(new BoolField({ name: 'is_highlighted' }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('articles')
    col.fields.removeByName('is_highlighted')
    app.save(col)
  },
)
