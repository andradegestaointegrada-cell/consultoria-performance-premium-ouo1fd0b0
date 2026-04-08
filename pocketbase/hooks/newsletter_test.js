routerAdd(
  'POST',
  '/backend/v1/newsletter/test',
  (e) => {
    const body = e.requestInfo().body
    if (!body.subject || !body.content) {
      throw new BadRequestError('Subject and content are required')
    }

    const resendKey = $secrets.get('RESEND_API_KEY') || $os.getenv('VITE_RESEND_API_KEY')
    const recipientEmail = 'alexandre@andradegestaointegrada.com.br'

    const nlCollection = $app.findCollectionByNameOrId('newsletters')
    const nlRecord = new Record(nlCollection)
    nlRecord.set('subject', '[TEST] ' + body.subject)
    nlRecord.set('content', body.content)
    nlRecord.set('recipient_count', 1)
    nlRecord.set('status', 'processing')
    $app.save(nlRecord)

    const logsCollection = $app.findCollectionByNameOrId('delivery_logs')
    const log = new Record(logsCollection)
    log.set('newsletter_id', nlRecord.id)
    log.set('recipient_email', recipientEmail)

    if (resendKey) {
      const payload = {
        from: 'Alexandre Andrade <alexandre@andradegestaointegrada.com.br>',
        to: [recipientEmail],
        subject: '[TEST] ' + body.subject,
        html: body.content,
      }

      try {
        const res = $http.send({
          url: 'https://api.resend.com/emails',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify(payload),
          timeout: 15,
        })

        if (res.statusCode >= 200 && res.statusCode < 300) {
          log.set('status', 'delivered')
          $app.save(log)

          nlRecord.set('status', 'sent')
          $app.save(nlRecord)

          return e.json(200, { success: true, message: 'Test email sent successfully' })
        } else {
          let errorMsg = 'Unknown error'
          try {
            errorMsg = JSON.parse(res.body).message || res.statusCode.toString()
          } catch (err) {}

          log.set('status', 'failed')
          log.set('error_message', errorMsg)
          $app.save(log)

          nlRecord.set('status', 'failed')
          $app.save(nlRecord)

          throw new BadRequestError(`Failed to send test email: ${errorMsg}`)
        }
      } catch (err) {
        log.set('status', 'failed')
        log.set('error_message', err.message)
        $app.save(log)

        nlRecord.set('status', 'failed')
        $app.save(nlRecord)

        throw new BadRequestError(`Failed to send test email: ${err.message}`)
      }
    } else {
      log.set('status', 'failed')
      log.set('error_message', 'No API key configured')
      $app.save(log)

      nlRecord.set('status', 'failed')
      $app.save(nlRecord)

      throw new BadRequestError('No API key configured')
    }
  },
  $apis.requireAuth(),
)
