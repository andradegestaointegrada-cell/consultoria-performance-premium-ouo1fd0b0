routerAdd('POST', '/backend/v1/newsletter/test', (e) => {
  const supabaseKey = $secrets.get('SUPABASE_SECRET_KEY') || $os.getenv('SUPABASE_SECRET_KEY')
  if (!supabaseKey) {
    throw new BadRequestError('Supabase configuration is missing')
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

  const recipientEmail = 'alexandre@andradegestaointegrada.com.br'

  const nlPayload = {
    subject: '[TEST] ' + body.subject,
    content: body.content,
    is_raw_html: !!body.is_raw_html,
    edition: body.edition || '',
    period: body.period || '',
    main_title: body.main_title || '',
    sections: body.sections || null,
    cta_text: body.cta_text || '',
    cta_url: body.cta_url || '',
    recipient_count: 1,
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
      throw new Error(`Failed to create newsletter in Supabase: ${res.statusCode} ${res.body}`)
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
      console.log('Failed to update newsletter status:', e.message)
    }
  }

  const logDelivery = (status, error_message = '') => {
    try {
      $http.send({
        url: `${supabaseUrl}/rest/v1/delivery_logs`,
        method: 'POST',
        headers: sbHeaders,
        body: JSON.stringify({
          newsletter_id: nlRecordId,
          recipient_email: recipientEmail,
          status,
          error_message,
        }),
        timeout: 10,
      })
    } catch (e) {
      console.log('Failed to log delivery:', e.message)
    }
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

        const msg = resData && resData.id ? `Resend ID: ${resData.id}` : ''
        logDelivery('delivered', msg)
        updateStatus('sent')

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

        logDelivery('failed', errorMsg)
        updateStatus('failed')

        throw new BadRequestError(`Failed to send test email: ${errorMsg}`)
      }
    } catch (err) {
      console.log('Resend fetch exception:', err.message)
      logDelivery('failed', err.message)
      updateStatus('failed')

      throw new BadRequestError(`Failed to send test email: ${err.message}`)
    }
  } else {
    console.log('RESEND_API_KEY is missing')
    const msg = 'RESEND_API_KEY is not detected in the environment'
    logDelivery('failed', msg)
    updateStatus('failed')

    throw new BadRequestError(msg)
  }
})
