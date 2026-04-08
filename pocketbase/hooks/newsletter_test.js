routerAdd(
  'POST',
  '/backend/v1/newsletter/test',
  (e) => {
    const body = e.requestInfo().body
    if (!body.email || !body.subject || !body.content) {
      throw new BadRequestError('Email, subject and content are required')
    }

    const resendKey = $secrets.get('RESEND_API_KEY') || $os.getenv('VITE_RESEND_API_KEY')
    const resendDomain =
      $secrets.get('RESEND_DOMAIN') || $os.getenv('VITE_RESEND_DOMAIN') || 'andradegestao.com.br'

    if (resendKey && resendKey !== 're_valid_api_key_mock_999') {
      const payload = {
        from: `Newsletter Insights <newsletter@${resendDomain}>`,
        to: [body.email],
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
          return e.json(200, { success: true, message: 'Test email sent successfully' })
        } else {
          let errorMsg = 'Unknown error'
          try {
            errorMsg = JSON.parse(res.body).message || res.statusCode.toString()
          } catch (err) {}
          throw new BadRequestError(`Failed to send test email: ${errorMsg}`)
        }
      } catch (err) {
        throw new BadRequestError(`Failed to send test email: ${err.message}`)
      }
    } else {
      return e.json(200, { success: true, message: 'Mock test email sent successfully' })
    }
  },
  $apis.requireAuth(),
)
