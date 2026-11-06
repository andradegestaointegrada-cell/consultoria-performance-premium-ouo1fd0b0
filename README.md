# Site da Andrade Gestão Integrada (AGI)

Site institucional de www.andradegestaointegrada.com.br. Repositório e publicação próprios da AGI (GitHub + Cloudflare Pages).

## Base técnica

- **Astro 7**, saída estática em `dist/`: cada endereço tem o próprio HTML, com título, descrição, canônico, Open Graph e JSON-LD.
- **React só nas ilhas**: menu do celular, escolha de tema, formulários (contato, newsletter, Portal LGPD) e perguntas frequentes dos serviços.
- **Tailwind CSS 3** com o tema da marca (`tailwind.config.ts` e `src/styles/main.css`).
- **Fontes locais** (`@fontsource-variable`: Inter e Playfair Display) e **imagens no próprio site** (`src/assets/`, otimizadas no build).
- **Formulários** em Pages Functions (`functions/api/`), com código comum em `server/shared.ts` e envio pelo Resend. Variáveis no painel da Cloudflare: `RESEND_API_KEY`, `RESEND_SEGMENT_ID`, `NEWSLETTER_SECRET`.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Páginas e endereços | `src/pages/` (o nome do arquivo é o endereço) |
| Layout, SEO e scripts comuns | `src/layouts/BaseLayout.astro` |
| Serviços (`/servicos/<id>`) | `src/data/services.ts` |
| Cases | `src/data/cases.ts` |
| Artigos do blog (`/insights/<slug>`) | `src/content/artigos/<slug>.md` |
| Dados da empresa, menu e WhatsApp | `src/data/site.ts` |
| Redirecionamentos e cabeçalhos HTTP | `public/_redirects` e `public/_headers` |
| Resumo para assistentes de IA | `public/llms.txt` (atualizar à mão quando entrar serviço ou artigo) |

## Publicar um artigo novo

1. Criar `src/content/artigos/<slug>.md`. O nome do arquivo vira o endereço.
2. Colocar a capa em `src/assets/blog/` (WebP, cerca de 1600 px de largura).
3. Cabeçalho do arquivo:

   ```yaml
   ---
   title: "Título do artigo"
   summary: "Resumo de uma ou duas frases (vira a descrição da página)."
   category: "Qualidade"
   image: "../../assets/blog/<slug>-capa.webp"
   imageAlt: "Descrição da imagem"
   published_date: 2026-11-06T12:00:00.000Z
   is_highlighted: false
   ---
   ```

4. Texto em Markdown abaixo do cabeçalho (`##` para seções). Links externos abrem em nova aba sozinhos.
5. Acrescentar o artigo ao `public/llms.txt`.

O sitemap (`/sitemap-index.xml`) é gerado no build e já inclui o artigo novo.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:4321
npm run build      # gera dist/
npm run preview    # prévia com as funções da Cloudflare em http://127.0.0.1:8788
```

Para testar os formulários na prévia, criar `.dev.vars` (fora do git) com as mesmas variáveis do painel.

## Publicação

A Cloudflare Pages publica a branch `main` cerca de 1 a 2 minutos depois do push (comando `npm run build`, pasta `dist`, Node definido em `.nvmrc`). Outras branches geram prévia própria em `*.pages.dev`.
