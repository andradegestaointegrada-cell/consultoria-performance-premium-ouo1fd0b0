// deploy: secret atualizado
routerAdd(
  'POST',
  '/backend/v1/newsletter/test',
  (e) => {
    const body = e.requestInfo().body
    if (!body.subject || !body.content) {
      throw new BadRequestError('Subject and content are required')
    }

    const resendKey = $secrets.get('RESEND_API_KEY')
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
          let resData = {}
          try {
            resData = JSON.parse(res.body)
          } catch (err) {}

          log.set('status', 'delivered')
          if (resData && resData.id) {
            log.set('error_message', `Resend ID: ${resData.id}`)
          }
          $app.save(log)

          nlRecord.set('status', 'sent')
          $app.save(nlRecord)

          return e.json(200, { success: true, message: 'Test email sent successfully' })
        } else {
          let errorMsg = `HTTP ${res.statusCode}`
          try {
            const parsed = JSON.parse(res.body)
            errorMsg = `${res.statusCode} ${parsed.name || 'Error'}: ${parsed.message || JSON.stringify(parsed)}`
          } catch (err) {
            errorMsg = `HTTP ${res.statusCode}: ${res.body ? String(res.body) : 'Unknown error'}`
          }

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
      log.set('error_message', 'RESEND_API_KEY is not detected in the environment')
      $app.save(log)

      nlRecord.set('status', 'failed')
      $app.save(nlRecord)

      throw new BadRequestError('RESEND_API_KEY is not detected in the environment')
    }
  },
  $apis.requireAuth(),
)
