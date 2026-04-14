routerAdd('POST', '/backend/v1/newsletter/send', (e) => {
  const body = e.requestInfo().body
  if (!body.subject || !body.content) {
    throw new BadRequestError('Subject and content are required')
  }

  const supabaseUrl = 'https://mftirdjnmkegomoirmcc.supabase.co'
  const supabaseKey =
    $secrets.get('SUPABASE_SECRET_KEY') ||
    $os.getenv('SUPABASE_SECRET_KEY') ||
    $os.getenv('VITE_SUPABASE_SECRET_KEY')

  const authHeader = e.request.header.get('Authorization')
  if (!authHeader) throw new UnauthorizedError('Missing Authorization header')
  const userRes = $http.send({
    url: `${supabaseUrl}/auth/v1/user`,
    method: 'GET',
    headers: { Authorization: authHeader, apikey: supabaseKey },
  })
  if (userRes.statusCode !== 200) throw new UnauthorizedError('Invalid Supabase Auth token')

  const resendKey =
    $secrets.get('RESEND_API_KEY') ||
    $os.getenv('RESEND_API_KEY') ||
    $os.getenv('VITE_RESEND_API_KEY')

  const subsRes = $http.send({
    url: `${supabaseUrl}/rest/v1/subscribers?active=eq.true&select=*`,
    method: 'GET',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })

  let subs = []
  if (subsRes.statusCode === 200) {
    subs = JSON.parse(subsRes.body)
  }

  const nlCreateRes = $http.send({
    url: `${supabaseUrl}/rest/v1/newsletters`,
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      subject: body.subject,
      content: body.content,
      is_raw_html: !!body.is_raw_html,
      edition: body.edition || null,
      period: body.period || null,
      main_title: body.main_title || null,
      sections: body.sections || null,
      cta_text: body.cta_text || null,
      cta_url: body.cta_url || null,
      recipient_count: subs.length,
      status: 'processing',
    }),
  })

  if (nlCreateRes.statusCode >= 300) {
    throw new InternalServerError('Failed to create newsletter in Supabase: ' + nlCreateRes.body)
  }
  const nlRecords = JSON.parse(nlCreateRes.body)
  const nlRecord = Array.isArray(nlRecords) ? nlRecords[0] : nlRecords

  let successCount = 0
  let failCount = 0

  if (subs.length > 0 && resendKey) {
    const BATCH_SIZE = 100

    for (let i = 0; i < subs.length; i += BATCH_SIZE) {
      const batchSubs = subs.slice(i, i + BATCH_SIZE)
      const payload = batchSubs.map((s) => ({
        from: 'Alexandre Andrade <alexandre@andradegestaointegrada.com.br>',
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

        const logsToInsert = []

        if (res.statusCode >= 200 && res.statusCode < 300) {
          let resData = {}
          try {
            resData = JSON.parse(res.body)
          } catch (e) {}

          batchSubs.forEach((s, idx) => {
            const log = {
              newsletter_id: nlRecord.id,
              recipient_email: s.email,
            }

            if (resData && resData.data && resData.data[idx]) {
              if (resData.data[idx].error) {
                log.status = 'failed'
                log.error_message = resData.data[idx].error.message || 'Error'
              } else {
                log.status = 'delivered'
                log.error_message = `Resend ID: ${resData.data[idx].id}`
              }
            } else {
              log.status = 'delivered'
            }
            logsToInsert.push(log)
          })
          successCount += batchSubs.length
        } else {
          let errorMsg = `HTTP ${res.statusCode}`
          try {
            const parsed = JSON.parse(res.body)
            errorMsg = `${res.statusCode} ${parsed.name || 'Error'}: ${
              parsed.message || JSON.stringify(parsed)
            }`
          } catch (err) {
            errorMsg = `HTTP ${res.statusCode}: ${res.body ? String(res.body) : 'Unknown error'}`
          }

          batchSubs.forEach((s) => {
            logsToInsert.push({
              newsletter_id: nlRecord.id,
              recipient_email: s.email,
              status: 'failed',
              error_message: errorMsg,
            })
          })
          failCount += batchSubs.length
        }

        if (logsToInsert.length > 0) {
          $http.send({
            url: `${supabaseUrl}/rest/v1/delivery_logs`,
            method: 'POST',
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(logsToInsert),
          })
        }
      } catch (err) {
        const logsToInsert = batchSubs.map((s) => ({
          newsletter_id: nlRecord.id,
          recipient_email: s.email,
          status: 'failed',
          error_message: err.message,
        }))
        $http.send({
          url: `${supabaseUrl}/rest/v1/delivery_logs`,
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logsToInsert),
        })
        failCount += batchSubs.length
      }
    }

    const finalStatus = failCount === 0 ? 'sent' : successCount === 0 ? 'failed' : 'partial'
    $http.send({
      url: `${supabaseUrl}/rest/v1/newsletters?id=eq.${nlRecord.id}`,
      method: 'PATCH',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: finalStatus }),
    })
  } else {
    failCount = subs.length

    if (!resendKey && subs.length > 0) {
      const logsToInsert = subs.map((s) => ({
        newsletter_id: nlRecord.id,
        recipient_email: s.email,
        status: 'failed',
        error_message: 'RESEND_API_KEY is not detected in the environment',
      }))
      $http.send({
        url: `${supabaseUrl}/rest/v1/delivery_logs`,
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logsToInsert),
      })
    }

    $http.send({
      url: `${supabaseUrl}/rest/v1/newsletters?id=eq.${nlRecord.id}`,
      method: 'PATCH',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'failed' }),
    })
  }

  return e.json(200, {
    message: 'Newsletter processed',
    newsletterId: nlRecord.id,
    successCount,
    failCount,
  })
})
