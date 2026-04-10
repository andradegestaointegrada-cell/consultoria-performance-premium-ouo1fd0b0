migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('newsletters')

    if (!col.fields.getByName('edition')) col.fields.add(new TextField({ name: 'edition' }))
    if (!col.fields.getByName('period')) col.fields.add(new TextField({ name: 'period' }))
    if (!col.fields.getByName('main_title')) col.fields.add(new TextField({ name: 'main_title' }))
    if (!col.fields.getByName('sections')) col.fields.add(new JSONField({ name: 'sections' }))
    if (!col.fields.getByName('cta_text')) col.fields.add(new TextField({ name: 'cta_text' }))
    if (!col.fields.getByName('cta_url')) col.fields.add(new TextField({ name: 'cta_url' }))

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('newsletters')

    col.fields.removeByName('edition')
    col.fields.removeByName('period')
    col.fields.removeByName('main_title')
    col.fields.removeByName('sections')
    col.fields.removeByName('cta_text')
    col.fields.removeByName('cta_url')

    app.save(col)
  },
)
