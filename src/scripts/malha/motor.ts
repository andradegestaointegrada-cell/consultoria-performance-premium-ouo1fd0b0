// Motor da malha 3D: desenha as formas de formas.ts em <canvas data-malha>.
// Regras (plano do site, 2.4): o conteúdo nunca espera a animação; ela começa
// depois da carga, pausa fora da tela e vira imagem parada com movimento reduzido.
import { FORMAS, aleatorio, type Forma } from './formas'

const CORES = ['207, 174, 112', '220, 228, 240'] // ouro AGI · platina fria (camada tecnológica)
const NIVEIS = [0.07, 0.14, 0.24, 0.36, 0.52] // opacidade das arestas, em faixas
const FATOR_ARESTA = [0.66, 0.4] // o ouro (núcleo) aparece mais que a casca
const CAMERA = 4.2
const MONTAGEM = 1.1 // segundos de voo de cada ponto até o lugar

const limitar = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v)

class Malha {
  private ctx: CanvasRenderingContext2D
  private forma!: Forma
  private n = 0
  private ini!: Float32Array
  private atraso!: Float32Array
  private px!: Float32Array
  private py!: Float32Array
  private alfa!: Float32Array
  private persp!: Float32Array
  private prof!: Float32Array
  private seg: Float32Array[] = []
  private segN: number[] = []
  private w = 0
  private h = 0
  private dpr = 1
  private t0 = -1
  private ultimo = 0
  private visivel = false
  private raf = 0
  private mx = 0
  private my = 0
  private alvoX = 0
  private alvoY = 0
  private reduzido: boolean
  private compacto: boolean
  private comRotulos: boolean

  constructor(
    private tela: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) {
    this.ctx = ctx
    this.reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches
    this.compacto = matchMedia('(max-width: 1023px)').matches
    this.comRotulos = !this.compacto || tela.dataset.rotulosCompacto === 'sim'
  }

  async montar() {
    const nome = this.tela.dataset.malha ?? 'logo'
    const criar = FORMAS[nome] ?? FORMAS.logo
    let rotulos: string[] | undefined
    try {
      rotulos = this.tela.dataset.rotulos ? JSON.parse(this.tela.dataset.rotulos) : undefined
    } catch {
      rotulos = undefined
    }
    this.forma = await criar({
      densidade: this.compacto ? 0.55 : 1,
      rotulos,
      texto: this.tela.dataset.texto,
    })
    const n = (this.n = this.forma.g.length)
    this.ini = new Float32Array(n * 3)
    this.atraso = new Float32Array(n)
    this.px = new Float32Array(n)
    this.py = new Float32Array(n)
    this.alfa = new Float32Array(n)
    this.persp = new Float32Array(n)
    this.prof = new Float32Array(n)
    const ne = this.forma.e.length / 2
    for (let k = 0; k < CORES.length * NIVEIS.length; k++) {
      this.seg.push(new Float32Array(ne * 4))
      this.segN.push(0)
    }

    // Cada ponto parte de um lugar aleatório e chega de baixo para cima (da fundação ao topo).
    const rnd = aleatorio(17)
    const R = Math.max(this.forma.raioX, this.forma.raioY)
    for (let i = 0; i < n; i++) {
      const u = rnd() * 2 - 1
      const th = rnd() * Math.PI * 2
      const raio = R * (1.1 + rnd() * 0.9)
      const s = Math.sqrt(1 - u * u)
      this.ini[i * 3] = Math.cos(th) * s * raio
      this.ini[i * 3 + 1] = u * raio
      this.ini[i * 3 + 2] = Math.sin(th) * s * raio
      const y = this.forma.p[i * 3 + 1]
      this.atraso[i] = limitar((y + R) / (2 * R)) * 0.75 + rnd() * 0.3
    }

    this.medir()
    new ResizeObserver(() => {
      this.medir()
      if (this.reduzido && this.visivel) this.quadro(performance.now())
    }).observe(this.tela)

    new IntersectionObserver(
      ([entrada]) => {
        this.visivel = entrada.isIntersecting
        if (this.visivel) this.retomar()
      },
      { rootMargin: '80px' },
    ).observe(this.tela)

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.retomar()
    })

    if (!this.reduzido && matchMedia('(pointer: fine)').matches) {
      addEventListener(
        'pointermove',
        (ev) => {
          const r = this.tela.getBoundingClientRect()
          this.alvoX = limitar((ev.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1), -1, 1)
          this.alvoY = limitar((ev.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1), -1, 1)
        },
        { passive: true },
      )
    }
  }

  private medir() {
    const r = this.tela.getBoundingClientRect()
    this.w = Math.max(1, r.width)
    this.h = Math.max(1, r.height)
    this.dpr = Math.min(devicePixelRatio || 1, this.compacto ? 1.5 : 2)
    this.tela.width = Math.round(this.w * this.dpr)
    this.tela.height = Math.round(this.h * this.dpr)
  }

  private retomar() {
    if (this.raf || !this.visivel || document.hidden) return
    if (this.t0 < 0) this.t0 = performance.now()
    this.raf = requestAnimationFrame(this.laco)
  }

  private laco = (agora: number) => {
    this.raf = 0
    if (!this.visivel || document.hidden) return
    if (agora - this.ultimo >= 1000 / 50) {
      this.ultimo = agora
      this.quadro(agora)
      if (this.tela.style.opacity !== '1') this.tela.style.opacity = '1'
    }
    if (!this.reduzido) this.raf = requestAnimationFrame(this.laco)
  }

  private quadro(agora: number) {
    const { ctx, forma, n, w, h } = this
    const t = this.reduzido ? 60 : (agora - this.t0) / 1000
    this.mx += (this.alvoX - this.mx) * 0.04
    this.my += (this.alvoY - this.my) * 0.04

    const grupos = forma.grupos.map((g) => {
      const ay =
        (g.rumo ?? 0) +
        (g.giro ? t * g.giro : 0) +
        (g.balanco ? Math.sin(t * g.balanco) * (g.amplitude ?? 0.5) : 0) +
        this.mx * 0.35
      const ax = (g.inclinacao ?? 0) + this.my * 0.16
      const l = g.local
      const al = l
        ? l.amplitude
          ? Math.sin(t * l.vel + (l.fase ?? 0)) * l.amplitude
          : t * l.vel + (l.fase ?? 0)
        : 0
      return {
        cY: Math.cos(ay),
        sY: Math.sin(ay),
        cX: Math.cos(ax),
        sX: Math.sin(ax),
        l,
        cL: Math.cos(al),
        sL: Math.sin(al),
      }
    })

    const esc = Math.min(w / 2 / forma.raioX, h / 2 / forma.raioY) * 0.86
    const cx = w / 2
    const cy = h / 2
    const R = Math.max(forma.raioX, forma.raioY) * 1.2
    const montando = t < 2.4
    const { p, f, g } = forma

    for (let i = 0; i < n; i++) {
      let x = p[i * 3]
      let y = p[i * 3 + 1]
      let z = p[i * 3 + 2]
      const G = grupos[g[i]]
      if (G.l) {
        // giro próprio da peça (roda, engrenagem, grua) em torno do seu centro
        const [ox, oy, oz] = G.l.centro
        const dx = x - ox
        if (G.l.eixo === 'z') {
          const dy = y - oy
          x = ox + dx * G.cL - dy * G.sL
          y = oy + dx * G.sL + dy * G.cL
        } else {
          const dz = z - oz
          x = ox + dx * G.cL + dz * G.sL
          z = oz - dx * G.sL + dz * G.cL
        }
      }
      let aparece = 1
      if (montando) {
        const a = limitar((t - this.atraso[i]) / MONTAGEM)
        const e = 1 - (1 - a) ** 3
        x = this.ini[i * 3] + (x - this.ini[i * 3]) * e
        y = this.ini[i * 3 + 1] + (y - this.ini[i * 3 + 1]) * e
        z = this.ini[i * 3 + 2] + (z - this.ini[i * 3 + 2]) * e
        aparece = a
      }
      const { cY, sY, cX, sX } = G
      const x1 = x * cY + z * sY
      const z1 = -x * sY + z * cY
      const y1 = y * cX - z1 * sX
      const z2 = y * sX + z1 * cX
      const pe = CAMERA / (CAMERA + z2)
      this.px[i] = cx + x1 * esc * pe
      this.py[i] = cy - y1 * esc * pe
      this.persp[i] = pe
      let a = 0.2 + 0.8 * limitar(0.5 - z2 / (2 * R))
      this.prof[i] = a * aparece
      const fase = f[i]
      if (fase === fase)
        a *=
          forma.pulsoBase +
          (1 - forma.pulsoBase) * Math.max(0, Math.cos(t * forma.pulso + fase)) ** 10
      this.alfa[i] = a * aparece
    }

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    // Arestas, agrupadas por cor e faixa de opacidade (poucas chamadas de desenho).
    const fadeArestas = this.reduzido ? 1 : limitar((t - 1.5) / 1.0)
    if (fadeArestas > 0) {
      this.segN.fill(0)
      const e = forma.e
      for (let k = 0; k < e.length; k += 2) {
        const i = e[k]
        const j = e[k + 1]
        const a = Math.min(this.alfa[i], this.alfa[j]) * FATOR_ARESTA[forma.c[i]] * fadeArestas
        if (a < 0.03) continue
        let nivel = 0
        while (nivel < NIVEIS.length - 1 && a > NIVEIS[nivel] + 0.04) nivel++
        const b = forma.c[i] * NIVEIS.length + nivel
        const s = this.seg[b]
        const o = this.segN[b] * 4
        s[o] = this.px[i]
        s[o + 1] = this.py[i]
        s[o + 2] = this.px[j]
        s[o + 3] = this.py[j]
        this.segN[b]++
      }
      for (let b = 0; b < this.seg.length; b++) {
        const qtd = this.segN[b]
        if (!qtd) continue
        const s = this.seg[b]
        ctx.globalAlpha = NIVEIS[b % NIVEIS.length]
        ctx.strokeStyle = `rgb(${CORES[Math.floor(b / NIVEIS.length)]})`
        ctx.lineWidth = b < NIVEIS.length ? 1 : 0.75
        ctx.beginPath()
        for (let k = 0; k < qtd; k++) {
          ctx.moveTo(s[k * 4], s[k * 4 + 1])
          ctx.lineTo(s[k * 4 + 2], s[k * 4 + 3])
        }
        ctx.stroke()
      }
    }

    // Pontos.
    for (let cor = 0; cor < CORES.length; cor++) {
      ctx.fillStyle = `rgb(${CORES[cor]})`
      for (let i = 0; i < n; i++) {
        if (forma.c[i] !== cor) continue
        const a = this.alfa[i]
        const s = forma.s[i]
        if (a < 0.02 || s === 0) continue
        const tam = (0.9 + 0.95 * s) * this.persp[i]
        ctx.globalAlpha = a
        ctx.fillRect(this.px[i] - tam / 2, this.py[i] - tam / 2, tam, tam)
        if (a > 0.8 && s >= 1.3) {
          ctx.globalAlpha = (a - 0.8) * 0.6
          ctx.fillRect(this.px[i] - tam * 1.6, this.py[i] - tam * 1.6, tam * 3.2, tam * 3.2)
        }
      }
    }

    // Rótulos em órbita: aparecem depois da montagem e somem quando passam para trás.
    const fadeRotulos = this.reduzido ? 1 : limitar((t - 2.1) / 0.9)
    if (this.comRotulos && fadeRotulos > 0) {
      ctx.font = '600 10.5px "Inter Variable", Inter, system-ui, sans-serif'
      ctx.textBaseline = 'middle'
      if ('letterSpacing' in ctx)
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '1.6px'
      for (const r of forma.rotulos) {
        const a = limitar((this.prof[r.i] - forma.limiarRotulo) / 0.35) * fadeRotulos
        if (a <= 0.02) continue
        const x = this.px[r.i]
        const y = this.py[r.i]
        const larg = ctx.measureText(r.texto).width
        let dir = x >= cx ? 1 : -1
        if (dir > 0 && x + 34 + larg > w - 8) dir = -1
        else if (dir < 0 && x - 34 - larg < 28) dir = 1
        const yt = limitar(y - 12, 10, h - 10)
        const xt = x + dir * 34
        ctx.globalAlpha = a
        ctx.strokeStyle = `rgb(${CORES[r.cor]})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + dir * 14, yt)
        ctx.lineTo(xt - dir * 4, yt)
        ctx.stroke()
        ctx.fillStyle = 'rgba(9, 29, 57, 0.78)'
        ctx.fillRect(dir > 0 ? xt - 4 : xt - larg - 4, yt - 9, larg + 8, 18)
        ctx.fillStyle = `rgb(${CORES[r.cor]})`
        ctx.textAlign = dir > 0 ? 'left' : 'right'
        ctx.fillText(r.texto, xt, yt + 0.5)
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }
}

export function iniciarMalhas() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-malha]').forEach((tela) => {
    if (tela.dataset.malhaPronta) return
    tela.dataset.malhaPronta = 'sim'
    const ctx = tela.getContext('2d')
    if (!ctx) return
    new Malha(tela, ctx).montar().catch(() => {
      /* animação é decorativa: se falhar, a página segue igual */
    })
  })
}
