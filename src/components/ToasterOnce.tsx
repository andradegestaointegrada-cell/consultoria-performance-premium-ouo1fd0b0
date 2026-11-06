// Avisos (toasts) dos formulários. Cada formulário é uma ilha separada; quando há mais de um
// na página (ex.: contato + newsletter do rodapé), só o primeiro a montar exibe os avisos.
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

let dono: symbol | null = null

export function ToasterOnce() {
  const [eu] = useState(() => Symbol('toaster'))
  const [ativo, setAtivo] = useState(false)

  useEffect(() => {
    if (!dono) {
      dono = eu
      setAtivo(true)
    }
    return () => {
      if (dono === eu) dono = null
    }
  }, [eu])

  return ativo ? <Toaster /> : null
}
