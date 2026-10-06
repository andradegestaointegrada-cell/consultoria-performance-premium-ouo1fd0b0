// Endereço único: o domínio sem "www" redireciona para o www (evita site duplicado no Google).
export const onRequest = async ({ request, next }: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(request.url)
  if (url.hostname === 'andradegestaointegrada.com.br') {
    url.hostname = 'www.andradegestaointegrada.com.br'
    return Response.redirect(url.toString(), 301)
  }
  return next()
}
