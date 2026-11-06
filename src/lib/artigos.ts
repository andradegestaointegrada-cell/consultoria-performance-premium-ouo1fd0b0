// Leitura da coleção de artigos (src/content/artigos), na mesma ordem do site anterior.
import { getCollection, type CollectionEntry } from 'astro:content'

export type Artigo = CollectionEntry<'artigos'>

/** Publicados, do mais recente para o mais antigo. */
export async function listarArtigos(): Promise<Artigo[]> {
  const todos = await getCollection('artigos', ({ data }) => !data.draft)
  return todos.sort((a, b) => b.data.published_date.getTime() - a.data.published_date.getTime())
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
