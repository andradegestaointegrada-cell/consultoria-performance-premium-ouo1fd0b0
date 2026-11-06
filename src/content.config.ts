// Coleção de artigos do blog: um arquivo Markdown por artigo em src/content/artigos/.
// O nome do arquivo é o endereço: artigos/iso-42001-governanca.md -> /insights/iso-42001-governanca
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const artigos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/artigos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.string(),
      image: image(),
      imageAlt: z.string().optional(),
      published_date: z.coerce.date(),
      updated_date: z.coerce.date().optional(),
      is_highlighted: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
})

export const collections = { artigos }
