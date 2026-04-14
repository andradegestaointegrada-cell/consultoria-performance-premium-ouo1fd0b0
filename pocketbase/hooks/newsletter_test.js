routerAdd(
  'POST',
  '/backend/v1/newsletter/test',
  (e) => {
    const body = e.requestInfo().body
    if (!body.subject || !body.content) {
      throw new BadRequestError('Subject and content are required')
    }

    const resendKey =
      $secrets.get('RESEND_API_KEY') ||
      $os.getenv('RESEND_API_KEY') ||
      $os.getenv('VITE_RESEND_API_KEY')
    const recipientEmail = 'alexandre@andradegestaointegrada.com.br'

    // Create newsletter record
    const newslettersCol = $app.findCollectionByNameOrId('newsletters')
    const nlRecord = new Record(newslettersCol)
    nlRecord.set('subject', '[TEST] ' + body.subject)
    nlRecord.set('content', body.content)
    nlRecord.set('is_raw_html', !!body.is_raw_html)
    nlRecord.set('edition', body.edition || '')
    nlRecord.set('period', body.period || '')
    nlRecord.set('main_title', body.main_title || '')
    nlRecord.set('sections', body.sections || null)
    nlRecord.set('cta_text', body.cta_text || '')
    nlRecord.set('cta_url', body.cta_url || '')
    nlRecord.set('recipient_count', 1)
    nlRecord.set('status', 'processing')
    $app.save(nlRecord)

    const deliveryLogsCol = $app.findCollectionByNameOrId('delivery_logs')

    if (resendKey) {
      const payload = {
        from: 'Newsletter AGI <newsletter@andradegestaointegrada.com.br>',
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

          const log = new Record(deliveryLogsCol)
          log.set('newsletter_id', nlRecord.id)
          log.set('recipient_email', recipientEmail)
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
            errorMsg = `Resend API Error (${res.statusCode}): ${JSON.stringify(parsed)}`
          } catch (err) {
            errorMsg = `Resend API Error (${res.statusCode}): ${res.body ? String(res.body) : 'Unknown error'}`
          }
          console.log('Resend API Error Details:', errorMsg)

          const log = new Record(deliveryLogsCol)
          log.set('newsletter_id', nlRecord.id)
          log.set('recipient_email', recipientEmail)
          log.set('status', 'failed')
          log.set('error_message', errorMsg)
          $app.save(log)

          nlRecord.set('status', 'failed')
          $app.save(nlRecord)

          throw new BadRequestError(`Failed to send test email: ${errorMsg}`)
        }
      } catch (err) {
        console.log('Resend fetch exception:', err.message)
        const log = new Record(deliveryLogsCol)
        log.set('newsletter_id', nlRecord.id)
        log.set('recipient_email', recipientEmail)
        log.set('status', 'failed')
        log.set('error_message', err.message)
        $app.save(log)

        nlRecord.set('status', 'failed')
        $app.save(nlRecord)

        throw new BadRequestError(`Failed to send test email: ${err.message}`)
      }
    } else {
      console.log('RESEND_API_KEY is missing')
      const log = new Record(deliveryLogsCol)
      log.set('newsletter_id', nlRecord.id)
      log.set('recipient_email', recipientEmail)
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
