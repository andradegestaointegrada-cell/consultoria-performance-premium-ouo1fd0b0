migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    try {
      app.findAuthRecordByEmail('users', 'andrade.gestaointegrada@gmail.com')
      return
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('andrade.gestaointegrada@gmail.com')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Admin Andrade')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'andrade.gestaointegrada@gmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
