routerAdd('POST', '/backend/v1/newsletter/send', (e) => {
  const supabaseKey = $secrets.get('SUPABASE_SECRET_KEY') || $os.getenv('SUPABASE_SECRET_KEY')
  if (!supabaseKey) {
    throw new BadRequestError('Supabase configuration is missing')
  }

  const authHeader =
    e.request.header.get('Authorization') || e.requestInfo().headers['authorization'] || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()

  if (token !== supabaseKey) {
    throw new UnauthorizedError('Invalid or missing token')
  }

  const body = e.requestInfo().body
  if (!body.subject || !body.content) {
    throw new BadRequestError('Subject and content are required')
  }

  const resendKey =
    $secrets.get('RESEND_API_KEY') ||
    $os.getenv('RESEND_API_KEY') ||
    $os.getenv('VITE_RESEND_API_KEY')

  const supabaseUrl = $secrets.get('SUPABASE_URL') || $os.getenv('VITE_SUPABASE_URL')

  const sbHeaders = {
    'Content-Type': 'application/json',
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    Prefer: 'return=representation',
  }

  let subs = []
  try {
    const res = $http.send({
      url: `${supabaseUrl}/rest/v1/subscribers?active=eq.true&select=email`,
      method: 'GET',
      headers: sbHeaders,
      timeout: 10,
    })
    if (res.statusCode >= 200 && res.statusCode < 300) {
      subs = JSON.parse(res.body)
    } else {
      throw new Error(`Failed to fetch subscribers: ${res.statusCode} ${res.body}`)
    }
  } catch (err) {
    throw new BadRequestError('Supabase fetch error: ' + err.message)
  }

  const nlPayload = {
    subject: body.subject,
    content: body.content,
    is_raw_html: !!body.is_raw_html,
    edition: body.edition || '',
    period: body.period || '',
    main_title: body.main_title || '',
    sections: body.sections || null,
    cta_text: body.cta_text || '',
    cta_url: body.cta_url || '',
    recipient_count: subs.length,
    status: 'processing',
  }

  let nlRecordId = null
  try {
    const res = $http.send({
      url: `${supabaseUrl}/rest/v1/newsletters`,
      method: 'POST',
      headers: sbHeaders,
      body: JSON.stringify(nlPayload),
      timeout: 10,
    })
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const data = JSON.parse(res.body)
      nlRecordId = data[0].id
    } else {
      throw new Error(`Failed to create newsletter: ${res.statusCode} ${res.body}`)
    }
  } catch (err) {
    throw new BadRequestError('Supabase error: ' + err.message)
  }

  const updateStatus = (status) => {
    try {
      $http.send({
        url: `${supabaseUrl}/rest/v1/newsletters?id=eq.${nlRecordId}`,
        method: 'PATCH',
        headers: sbHeaders,
        body: JSON.stringify({ status }),
        timeout: 10,
      })
    } catch (e) {
      console.log('Failed to update status:', e.message)
    }
  }

  const logDeliveries = (logs) => {
    if (!logs || logs.length === 0) return
    try {
      $http.send({
        url: `${supabaseUrl}/rest/v1/delivery_logs`,
        method: 'POST',
        headers: sbHeaders,
        body: JSON.stringify(logs),
        timeout: 10,
      })
    } catch (e) {
      console.log('Failed to log deliveries:', e.message)
    }
  }

  let successCount = 0
  let failCount = 0

  if (subs.length > 0 && resendKey) {
    const BATCH_SIZE = 100

    for (let i = 0; i < subs.length; i += BATCH_SIZE) {
      const batchSubs = subs.slice(i, i + BATCH_SIZE)
      const payload = batchSubs.map((s) => ({
        from: 'Newsletter AGI <newsletter@andradegestaointegrada.com.br>',
        to: [s.email],
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

          const logs = batchSubs.map((s, idx) => {
            if (resData && resData.data && resData.data[idx]) {
              if (resData.data[idx].error) {
                return {
                  newsletter_id: nlRecordId,
                  recipient_email: s.email,
                  status: 'failed',
                  error_message: resData.data[idx].error.message || 'Error',
                }
              } else {
                return {
                  newsletter_id: nlRecordId,
                  recipient_email: s.email,
                  status: 'delivered',
                  error_message: `Resend ID: ${resData.data[idx].id}`,
                }
              }
            }
            return {
              newsletter_id: nlRecordId,
              recipient_email: s.email,
              status: 'delivered',
              error_message: '',
            }
          })
          logDeliveries(logs)
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

          const logs = batchSubs.map((s) => ({
            newsletter_id: nlRecordId,
            recipient_email: s.email,
            status: 'failed',
            error_message: errorMsg,
          }))
          logDeliveries(logs)
          failCount += batchSubs.length
        }
      } catch (err) {
        console.log('Resend fetch exception:', err.message)
        const logs = batchSubs.map((s) => ({
          newsletter_id: nlRecordId,
          recipient_email: s.email,
          status: 'failed',
          error_message: err.message,
        }))
        logDeliveries(logs)
        failCount += batchSubs.length
      }
    }

    const finalStatus = failCount === 0 ? 'sent' : successCount === 0 ? 'failed' : 'partial'
    updateStatus(finalStatus)
  } else {
    failCount = subs.length

    if (!resendKey && subs.length > 0) {
      console.log('RESEND_API_KEY is missing')
      const logs = subs.map((s) => ({
        newsletter_id: nlRecordId,
        recipient_email: s.email,
        status: 'failed',
        error_message: 'RESEND_API_KEY is not detected in the environment',
      }))
      logDeliveries(logs)
    }

    updateStatus('failed')
  }

  return e.json(200, {
    message: 'Newsletter processed',
    newsletterId: nlRecordId,
    successCount,
    failCount,
  })
})
