// Foto de fundo dos heros das páginas internas. Ela fica sob um véu escuro de 80–85%,
// então um WebP mais comprimido e limitado a 1280px não muda o que se vê e chega antes.
import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'

export async function fundoHero(img: ImageMetadata) {
  const r = await getImage({
    src: img,
    width: Math.min(img.width, 1280),
    format: 'webp',
    quality: 35,
  })
  return r.src
}
