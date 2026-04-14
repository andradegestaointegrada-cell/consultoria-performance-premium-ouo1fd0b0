routerAdd('POST', '/backend/v1/newsletter/send', (e) => {
  let supabaseKey = $secrets.get('SUPABASE_SECRET_KEY') || $os.getenv('SUPABASE_SECRET_KEY') || ''
  supabaseKey = supabaseKey.replace(/^["']|["']$/g, '').trim()

  if (!supabaseKey) {
    throw new BadRequestError('Supabase configuration is missing')
  }

  const body = e.requestInfo().body
  if (!body.subject || !body.content) {
    throw new BadRequestError('Subject and content are required')
  }

  let resendKey =
    $secrets.get('RESEND_API_KEY') ||
    $os.getenv('RESEND_API_KEY') ||
    $os.getenv('VITE_RESEND_API_KEY') ||
    ''
  resendKey = resendKey.replace(/^["']|["']$/g, '').trim()

  let supabaseUrl = $secrets.get('SUPABASE_URL') || $os.getenv('VITE_SUPABASE_URL') || ''
  supabaseUrl = supabaseUrl
    .replace(/^["']|["']$/g, '')
    .trim()
    .replace(/\/+$/, '')

  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    throw new BadRequestError('Supabase URL configuration is missing or invalid')
  }

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
      const bodyStr = res.body ? String(res.body).trim() : ''
      if (bodyStr && bodyStr !== '<nil>' && bodyStr !== 'null') {
        try {
          const data = JSON.parse(bodyStr)
          if (Array.isArray(data) && data.length > 0) {
            nlRecordId = data[0].id
          } else if (data && data.id) {
            nlRecordId = data.id
          }
        } catch (parseErr) {
          console.log('Failed to parse POST response:', parseErr.message)
        }
      }

      if (!nlRecordId) {
        const fallbackRes = $http.send({
          url: `${supabaseUrl}/rest/v1/newsletters?order=created_at.desc&limit=1`,
          method: 'GET',
          headers: sbHeaders,
          timeout: 10,
        })
        if (fallbackRes.statusCode >= 200 && fallbackRes.statusCode < 300) {
          const fallbackBody = fallbackRes.body ? String(fallbackRes.body).trim() : ''
          if (fallbackBody && fallbackBody !== '<nil>' && fallbackBody !== 'null') {
            const fallbackData = JSON.parse(fallbackBody)
            if (Array.isArray(fallbackData) && fallbackData.length > 0) {
              nlRecordId = fallbackData[0].id
            }
          }
        }
      }

      if (!nlRecordId) {
        throw new Error('Failed to retrieve newsletter ID after creation')
      }
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
