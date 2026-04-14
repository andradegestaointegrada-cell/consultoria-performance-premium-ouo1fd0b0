routerAdd('POST', '/backend/v1/newsletter/test', (e) => {
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
  const recipientEmail = 'alexandre@andradegestaointegrada.com.br'

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
      subject: '[TEST] ' + body.subject,
      content: body.content,
      is_raw_html: !!body.is_raw_html,
      edition: body.edition || null,
      period: body.period || null,
      main_title: body.main_title || null,
      sections: body.sections || null,
      cta_text: body.cta_text || null,
      cta_url: body.cta_url || null,
      recipient_count: 1,
      status: 'processing',
    }),
  })

  if (nlCreateRes.statusCode >= 300) {
    throw new InternalServerError('Failed to create newsletter in Supabase: ' + nlCreateRes.body)
  }
  const nlRecords = JSON.parse(nlCreateRes.body)
  const nlRecord = Array.isArray(nlRecords) ? nlRecords[0] : nlRecords

  const log = {
    newsletter_id: nlRecord.id,
    recipient_email: recipientEmail,
  }

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

        log.status = 'delivered'
        if (resData && resData.id) {
          log.error_message = `Resend ID: ${resData.id}`
        }

        $http.send({
          url: `${supabaseUrl}/rest/v1/delivery_logs`,
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(log),
        })

        $http.send({
          url: `${supabaseUrl}/rest/v1/newsletters?id=eq.${nlRecord.id}`,
          method: 'PATCH',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'sent' }),
        })

        return e.json(200, { success: true, message: 'Test email sent successfully' })
      } else {
        let errorMsg = `HTTP ${res.statusCode}`
        try {
          const parsed = JSON.parse(res.body)
          errorMsg = `Resend API Error (${res.statusCode}): ${JSON.stringify(parsed)}`
        } catch (err) {
          errorMsg = `Resend API Error (${res.statusCode}): ${res.body ? String(res.body) : 'Unknown error'}`
        }

        log.status = 'failed'
        log.error_message = errorMsg
        $http.send({
          url: `${supabaseUrl}/rest/v1/delivery_logs`,
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(log),
        })

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

        throw new BadRequestError(`Failed to send test email: ${errorMsg}`)
      }
    } catch (err) {
      log.status = 'failed'
      log.error_message = err.message
      $http.send({
        url: `${supabaseUrl}/rest/v1/delivery_logs`,
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      })

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

      throw new BadRequestError(`Failed to send test email: ${err.message}`)
    }
  } else {
    log.status = 'failed'
    log.error_message = 'RESEND_API_KEY is not detected in the environment'
    $http.send({
      url: `${supabaseUrl}/rest/v1/delivery_logs`,
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    })

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

    throw new BadRequestError('RESEND_API_KEY is not detected in the environment')
  }
})
