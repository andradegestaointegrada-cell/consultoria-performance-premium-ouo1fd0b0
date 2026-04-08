migrate(
  (app) => {
    const subscribers = new Collection({
      name: 'subscribers',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'source', type: 'text' },
        { name: 'lgpdAgreed', type: 'bool' },
        { name: 'active', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_subscribers_email ON subscribers (email)'],
    })
    app.save(subscribers)

    const newsletters = new Collection({
      name: 'newsletters',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'subject', type: 'text', required: true },
        { name: 'content', type: 'editor', required: true },
        { name: 'recipient_count', type: 'number' },
        { name: 'status', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(newsletters)

    const delivery_logs = new Collection({
      name: 'delivery_logs',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'newsletter_id',
          type: 'relation',
          required: true,
          collectionId: newsletters.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'recipient_email', type: 'email', required: true },
        { name: 'status', type: 'text' },
        { name: 'error_message', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(delivery_logs)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('delivery_logs'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('newsletters'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('subscribers'))
    } catch (_) {}
  },
)
