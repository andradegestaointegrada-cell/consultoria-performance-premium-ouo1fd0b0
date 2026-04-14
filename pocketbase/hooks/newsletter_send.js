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

    // Find active subscribers
    const subs = $app.findRecordsByFilter('subscribers', 'active = {:active}', '', 10000, 0, {
      active: true,
    })

    // Create newsletter record
    const newslettersCol = $app.findCollectionByNameOrId('newsletters')
    const nlRecord = new Record(newslettersCol)
    nlRecord.set('subject', body.subject)
    nlRecord.set('content', body.content)
    nlRecord.set('is_raw_html', !!body.is_raw_html)
    nlRecord.set('edition', body.edition || '')
    nlRecord.set('period', body.period || '')
    nlRecord.set('main_title', body.main_title || '')
    nlRecord.set('sections', body.sections || null)
    nlRecord.set('cta_text', body.cta_text || '')
    nlRecord.set('cta_url', body.cta_url || '')
    nlRecord.set('recipient_count', subs.length)
    nlRecord.set('status', 'processing')
    $app.save(nlRecord)

    let successCount = 0
    let failCount = 0

    const deliveryLogsCol = $app.findCollectionByNameOrId('delivery_logs')

    if (subs.length > 0 && resendKey) {
      const BATCH_SIZE = 100

      for (let i = 0; i < subs.length; i += BATCH_SIZE) {
        const batchSubs = subs.slice(i, i + BATCH_SIZE)
        const payload = batchSubs.map((s) => ({
          from: 'Newsletter AGI <newsletter@andradegestaointegrada.com.br>',
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
              const log = new Record(deliveryLogsCol)
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
              errorMsg = `Resend API Error (${res.statusCode}): ${JSON.stringify(parsed)}`
            } catch (err) {
              errorMsg = `Resend API Error (${res.statusCode}): ${res.body ? String(res.body) : 'Unknown error'}`
            }
            console.log('Resend API Error Details:', errorMsg)

            batchSubs.forEach((s) => {
              const log = new Record(deliveryLogsCol)
              log.set('newsletter_id', nlRecord.id)
              log.set('recipient_email', s.get('email'))
              log.set('status', 'failed')
              log.set('error_message', errorMsg)
              $app.save(log)
            })
            failCount += batchSubs.length
          }
        } catch (err) {
          console.log('Resend fetch exception:', err.message)
          batchSubs.forEach((s) => {
            const log = new Record(deliveryLogsCol)
            log.set('newsletter_id', nlRecord.id)
            log.set('recipient_email', s.get('email'))
            log.set('status', 'failed')
            log.set('error_message', err.message)
            $app.save(log)
          })
          failCount += batchSubs.length
        }
      }

      const finalStatus = failCount === 0 ? 'sent' : successCount === 0 ? 'failed' : 'partial'
      nlRecord.set('status', finalStatus)
      $app.save(nlRecord)
    } else {
      failCount = subs.length

      if (!resendKey && subs.length > 0) {
        console.log('RESEND_API_KEY is missing')
        subs.forEach((s) => {
          const log = new Record(deliveryLogsCol)
          log.set('newsletter_id', nlRecord.id)
          log.set('recipient_email', s.get('email'))
          log.set('status', 'failed')
          log.set('error_message', 'RESEND_API_KEY is not detected in the environment')
          $app.save(log)
        })
      }

      nlRecord.set('status', 'failed')
      $app.save(nlRecord)
    }

    return e.json(200, {
      message: 'Newsletter processed',
      newsletterId: nlRecord.id,
      successCount,
      failCount,
    })
  },
  $apis.requireAuth(),
)
