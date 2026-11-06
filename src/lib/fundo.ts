// Foto de fundo dos heros das páginas internas. Ela fica sob um véu escuro de 80–85%,
// então um WebP mais comprimido, na mesma resolução, não muda o que se vê e chega antes.
import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'

export async function fundoHero(img: ImageMetadata) {
  const r = await getImage({ src: img, format: 'webp', quality: 40 })
  return r.src
}
