// Diretiva client:depoisdacarga — hidrata a ilha só depois do evento "load" e de um momento
// ocioso, para o JavaScript das ilhas não disputar banda com a foto do hero (LCP).
export default (load) => {
  const hidratar = () => {
    const ocioso = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))
    ocioso(async () => {
      const hydrate = await load()
      await hydrate()
    })
  }
  if (document.readyState === 'complete') hidratar()
  else window.addEventListener('load', hidratar, { once: true })
}
