routerAdd('POST', '/backend/v1/subscribe', (e) => {
  const body = e.requestInfo().body
  const email = body.email

  if (!email) {
    throw new BadRequestError('Email is required')
  }

  const url = 'https://mftirdjnmkegomoirmcc.supabase.co'
  const key = $secrets.get('SUPABASE_SECRET_KEY')

  if (!key) {
    throw new InternalServerError('Supabase secret key not configured')
  }

  const res = $http.send({
    url: url + '/rest/v1/subscribers',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: 'Bearer ' + key,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      email: email,
      source: 'footer_form',
      lgpdAgreed: true,
      active: true,
    }),
    timeout: 15,
  })

  if (res.statusCode >= 400) {
    let err = {}
    try {
      err = JSON.parse(res.body)
    } catch (_) {}

    if (err.code === '23505' || (err.message && err.message.includes('duplicate'))) {
      throw new BadRequestError('Este e-mail já está cadastrado')
    }

    throw new BadRequestError('Erro ao processar sua inscrição')
  }

  let data = {}
  try {
    data = JSON.parse(res.body)
  } catch (_) {}

  return e.json(200, data)
})
