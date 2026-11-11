// Leitura da coleção de artigos (src/content/artigos), na mesma ordem do site anterior.
import { getCollection, type CollectionEntry } from 'astro:content'

export type Artigo = CollectionEntry<'artigos'>

/** Publicados, do mais recente para o mais antigo. */
export async function listarArtigos(): Promise<Artigo[]> {
  const todos = await getCollection('artigos', ({ data }) => !data.draft)
  // Artigo revisto sobe na lista: vale a data da última atualização.
  const data = (a: (typeof todos)[number]) => (a.data.updated_date ?? a.data.published_date).getTime()
  return todos.sort((a, b) => data(b) - data(a))
}

/** Data por extenso no fuso de São Paulo (ex.: 07 de outubro de 2026). */
export function dataPorExtenso(d: Date) {
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
}
