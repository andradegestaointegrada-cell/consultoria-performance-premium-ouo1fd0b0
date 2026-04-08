migrate(
  (app) => {
    const deliveryLogs = app.findCollectionByNameOrId('delivery_logs')
    deliveryLogs.addIndex('idx_delivery_logs_newsletter', false, 'newsletter_id', '')
    app.save(deliveryLogs)

    const subscribers = app.findCollectionByNameOrId('subscribers')
    subscribers.addIndex('idx_subscribers_email', true, 'email', '')
    app.save(subscribers)
  },
  (app) => {
    const deliveryLogs = app.findCollectionByNameOrId('delivery_logs')
    deliveryLogs.removeIndex('idx_delivery_logs_newsletter')
    app.save(deliveryLogs)

    const subscribers = app.findCollectionByNameOrId('subscribers')
    subscribers.removeIndex('idx_subscribers_email')
    app.save(subscribers)
  },
)
