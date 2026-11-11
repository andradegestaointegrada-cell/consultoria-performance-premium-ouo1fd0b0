// Título da aba e do resultado do Google: o Google corta perto de 60 a 65 caracteres.
// Usa o nome completo da empresa quando cabe; senão a sigla; senão só o título.
const MAX = 65

export function tituloPagina(titulo: string): string {
  const completo = `${titulo} | Andrade Gestão Integrada`
  if (completo.length <= MAX) return completo
  const curto = `${titulo} | AGI`
  return curto.length <= MAX ? curto : titulo
}
