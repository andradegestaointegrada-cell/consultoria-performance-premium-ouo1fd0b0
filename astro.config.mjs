// Site da AGI — Astro estático publicado pela Cloudflare Pages (pasta dist).
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.andradegestaointegrada.com.br',
  output: 'static',
  // /sobre em vez de /sobre/: mantém as URLs do site anterior.
  trailingSlash: 'never',
  // CSS (≈13 KB comprimido) embutido no HTML: tira uma ida ao servidor do caminho crítico.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
})
