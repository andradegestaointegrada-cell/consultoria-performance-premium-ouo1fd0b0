routerAdd(
  'POST',
  '/backend/v1/newsletter/send',
  (e) => {
    const body = e.requestInfo().body
    if (!body.subject || !body.content) {
      throw new BadRequestError('Subject and content are required')
    }

    const resendKey =
      $secrets.get('RESEND_API_KEY') ||
      $os.getenv('RESEND_API_KEY') ||
      $os.getenv('VITE_RESEND_API_KEY')

    const subs = $app.findRecordsByFilter('subscribers', 'active = true', '', 0, 0)

    const nlCollection = $app.findCollectionByNameOrId('newsletters')
    const nlRecord = new Record(nlCollection)
    nlRecord.set('subject', body.subject)
    nlRecord.set('content', body.content)
    nlRecord.set('recipient_count', subs.length)
    nlRecord.set('status', 'processing')
    $app.save(nlRecord)

    let successCount = 0
    let failCount = 0

    const logsCollection = $app.findCollectionByNameOrId('delivery_logs')

    if (subs.length > 0 && resendKey) {
      const BATCH_SIZE = 100

      for (let i = 0; i < subs.length; i += BATCH_SIZE) {
        const batchSubs = subs.slice(i, i + BATCH_SIZE)
        const payload = batchSubs.map((s) => ({
          from: 'Alexandre Andrade <alexandre@andradegestaointegrada.com.br>',
          to: [s.get('email')],
          subject: body.subject,
          html: body.content,
        }))

        try {
          const res = $http.send({
            url: 'https://api.resend.com/emails/batch',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendKey}`,
            },
            body: JSON.stringify(payload),
            timeout: 30,
          })

          if (res.statusCode >= 200 && res.statusCode < 300) {
            let resData = {}
            try {
              resData = JSON.parse(res.body)
            } catch (e) {}

            batchSubs.forEach((s, idx) => {
              const log = new Record(logsCollection)
              log.set('newsletter_id', nlRecord.id)
              log.set('recipient_email', s.get('email'))

              if (resData && resData.data && resData.data[idx]) {
                if (resData.data[idx].error) {
                  log.set('status', 'failed')
                  log.set('error_message', resData.data[idx].error.message || 'Error')
                } else {
                  log.set('status', 'delivered')
                  log.set('error_message', `Resend ID: ${resData.data[idx].id}`)
                }
              } else {
                log.set('status', 'delivered')
              }
              $app.save(log)
            })
            successCount += batchSubs.length
          } else {
            let errorMsg = `HTTP ${res.statusCode}`
            try {
              const parsed = JSON.parse(res.body)
              errorMsg = `${res.statusCode} ${parsed.name || 'Error'}: ${parsed.message || JSON.stringify(parsed)}`
            } catch (err) {
              errorMsg = `HTTP ${res.statusCode}: ${res.body ? String(res.body) : 'Unknown error'}`
            }

            batchSubs.forEach((s) => {
              const log = new Record(logsCollection)
              log.set('newsletter_id', nlRecord.id)
              log.set('recipient_email', s.get('email'))
              log.set('status', 'failed')
              log.set('error_message', errorMsg)
              $app.save(log)
            })
            failCount += batchSubs.length
          }
        } catch (err) {
          batchSubs.forEach((s) => {
            const log = new Record(logsCollection)
            log.set('newsletter_id', nlRecord.id)
            log.set('recipient_email', s.get('email'))
            log.set('status', 'failed')
            log.set('error_message', err.message)
            $app.save(log)
          })
          failCount += batchSubs.length
        }
      }

      if (failCount === 0) {
        nlRecord.set('status', 'sent')
      } else if (successCount === 0) {
        nlRecord.set('status', 'failed')
      } else {
        nlRecord.set('status', 'partial')
      }
    } else {
      nlRecord.set('status', 'failed')
      failCount = subs.length

      if (!resendKey && subs.length > 0) {
        subs.forEach((s) => {
          const log = new Record(logsCollection)
          log.set('newsletter_id', nlRecord.id)
          log.set('recipient_email', s.get('email'))
          log.set('status', 'failed')
          log.set('error_message', 'RESEND_API_KEY is not detected in the environment')
          $app.save(log)
        })
      }
    }

    $app.save(nlRecord)

    return e.json(200, {
      message: 'Newsletter processed',
      newsletterId: nlRecord.id,
      successCount,
      failCount,
    })
  },
  $apis.requireAuth(),
)
