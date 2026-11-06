// Formas da malha 3D (pontos e arestas) desenhadas pelo motor.ts.
// Coordenadas em unidades da forma (raio ~1,5); y para cima, z para longe da câmera.
// Cores: 0 = ouro (núcleo AGI), 1 = platina fria (camada tecnológica).

export interface Grupo {
  /** Giro contínuo em torno do eixo vertical (rad/s). */
  giro?: number
  /** Balanço de um lado para o outro (rad/s) e sua amplitude (rad). */
  balanco?: number
  amplitude?: number
  /** Inclinação fixa em torno do eixo horizontal (rad). */
  inclinacao?: number
}

export interface Rotulo {
  i: number
  texto: string
  cor: number
}

export interface Forma {
  grupos: Grupo[]
  p: Float32Array
  g: Uint8Array
  c: Uint8Array
  s: Float32Array
  f: Float32Array
  e: Uint32Array
  rotulos: Rotulo[]
  /** Meia largura e meia altura do que precisa caber na tela. */
  raioX: number
  raioY: number
  /** Velocidade do pulso de luz que percorre os pontos com fase (rad/s). */
  pulso: number
  /** Brilho dos pontos com fase fora do pulso (0 a 1). */
  pulsoBase: number
}

export interface OpcoesForma {
  densidade: number
  rotulos?: string[]
  texto?: string
}

type V3 = [number, number, number]

/** Gerador pseudoaleatório com semente, para a forma sair igual a cada visita. */
export function aleatorio(semente: number) {
  let a = semente >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rad = (g: number) => (g * Math.PI) / 180

function girar([x, y, z]: V3, ax: number, az = 0): V3 {
  // em torno de x
  const y1 = y * Math.cos(ax) - z * Math.sin(ax)
  const z1 = y * Math.sin(ax) + z * Math.cos(ax)
  // em torno de z
  const x2 = x * Math.cos(az) - y1 * Math.sin(az)
  const y2 = x * Math.sin(az) + y1 * Math.cos(az)
  return [x2, y2, z1]
}

function esfera(n: number, r: number): V3[] {
  const out: V3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const raio = Math.sqrt(1 - y * y)
    const th = phi * i
    out.push([Math.cos(th) * raio * r, y * r, Math.sin(th) * raio * r])
  }
  return out
}

interface OpcoesPonto {
  g?: number
  c?: number
  s?: number
  f?: number
}

class Construtor {
  p: number[] = []
  g: number[] = []
  c: number[] = []
  s: number[] = []
  f: number[] = []
  e: number[] = []
  rotulos: Rotulo[] = []

  ponto([x, y, z]: V3, o: OpcoesPonto = {}) {
    this.p.push(x, y, z)
    this.g.push(o.g ?? 0)
    this.c.push(o.c ?? 0)
    this.s.push(o.s ?? 1)
    this.f.push(o.f ?? Number.NaN)
    return this.g.length - 1
  }

  aresta(i: number, j: number) {
    this.e.push(i, j)
  }

  cadeia(ids: number[], fechar = false) {
    for (let k = 1; k < ids.length; k++) this.aresta(ids[k - 1], ids[k])
    if (fechar && ids.length > 2) this.aresta(ids[ids.length - 1], ids[0])
  }

  /** Liga cada ponto aos k vizinhos mais próximos do mesmo conjunto (malha). */
  vizinhos(ids: number[], k: number) {
    const vistos = new Set<number>()
    const n = this.g.length
    for (const i of ids) {
      const d: [number, number][] = []
      for (const j of ids) {
        if (j === i) continue
        const dx = this.p[i * 3] - this.p[j * 3]
        const dy = this.p[i * 3 + 1] - this.p[j * 3 + 1]
        const dz = this.p[i * 3 + 2] - this.p[j * 3 + 2]
        d.push([dx * dx + dy * dy + dz * dz, j])
      }
      d.sort((a, b) => a[0] - b[0])
      for (let m = 0; m < Math.min(k, d.length); m++) {
        const j = d[m][1]
        const chave = Math.min(i, j) * n + Math.max(i, j)
        if (vistos.has(chave)) continue
        vistos.add(chave)
        this.aresta(i, j)
      }
    }
  }

  segmento(a: V3, b: V3, n: number, o: OpcoesPonto = {}) {
    const ids: number[] = []
    for (let k = 0; k <= n; k++) {
      const t = k / n
      ids.push(this.ponto([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], o))
    }
    this.cadeia(ids)
    return ids
  }

  rotulo(i: number, texto: string | undefined, cor = 0) {
    if (texto) this.rotulos.push({ i, texto: texto.toUpperCase(), cor })
  }

  fechar(grupos: Grupo[], raioX: number, raioY: number, pulso = 1.1, pulsoBase = 0.55): Forma {
    return {
      grupos,
      p: Float32Array.from(this.p),
      g: Uint8Array.from(this.g),
      c: Uint8Array.from(this.c),
      s: Float32Array.from(this.s),
      f: Float32Array.from(this.f),
      e: Uint32Array.from(this.e),
      rotulos: this.rotulos,
      raioX,
      raioY,
      pulso,
      pulsoBase,
    }
  }
}

/** Caixa em malha (uma barra do logo), com anéis horizontais a cada nível. */
function barra(b: Construtor, xc: number, y0: number, h: number, cor: number, dens: number) {
  const w = 0.11
  const niveis = Math.max(3, Math.round((h / 0.12) * Math.min(1, dens + 0.2)))
  const cantos = (y: number): V3[] => [
    [xc - w, y, -w],
    [xc + w, y, -w],
    [xc + w, y, w],
    [xc - w, y, w],
  ]
  const porLado = 3
  let anterior: number[] | null = null
  for (let k = 0; k <= niveis; k++) {
    const y = y0 + (h * k) / niveis
    const cs = cantos(y)
    const anel: number[] = []
    for (let lado = 0; lado < 4; lado++) {
      const a = cs[lado]
      const z = cs[(lado + 1) % 4]
      for (let m = 0; m < porLado; m++) {
        const t = m / porLado
        anel.push(b.ponto([a[0] + (z[0] - a[0]) * t, y, a[2] + (z[2] - a[2]) * t], { c: cor, s: k === niveis ? 1.6 : 1.1 }))
      }
    }
    b.cadeia(anel, true)
    if (anterior) for (let lado = 0; lado < 4; lado++) b.aresta(anterior[lado * porLado], anel[lado * porLado])
    anterior = anel
  }
}

// ---------------------------------------------------------------------------
// Home: o símbolo da AGI (anel, três barras e seta) dentro de uma casca tecnológica.
function logo({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Qualidade · ISO 9001',
    'Meio ambiente · ISO 14001',
    'Saúde e segurança · ISO 45001',
    'Segurança da informação · ISO/IEC 27001',
    'Governança de IA · ISO/IEC 42001',
    'Privacidade · LGPD',
  ]

  // Anel aberto no alto, à direita, por onde a seta sai.
  const N = Math.round(150 * d)
  const anel: number[] = []
  for (let k = 0; k <= N; k++) {
    const a = rad(62 + (k / N) * 326)
    anel.push(b.ponto([Math.cos(a), Math.sin(a), 0], { s: 1.8, f: -a }))
    if (k % 2 === 0) {
      b.ponto([Math.cos(a) * 0.95, Math.sin(a) * 0.95, 0.08], { s: 0.8 })
      b.ponto([Math.cos(a) * 1.05, Math.sin(a) * 1.05, -0.08], { s: 0.8 })
    }
  }
  b.cadeia(anel)
  const noAnel = (graus: number) => anel[Math.round(((graus - 62) / 326) * N)]
  b.rotulo(noAnel(160), r[0], 0)
  b.rotulo(noAnel(235), r[1], 0)
  b.rotulo(noAnel(305), r[2], 0)

  // Três barras crescentes: ouro, platina (a do meio é azul no logo) e ouro.
  barra(b, -0.4, -0.62, 0.42, 0, d)
  barra(b, -0.08, -0.62, 0.6, 1, d)
  barra(b, 0.24, -0.62, 0.84, 0, d)

  // Seta em curva, que cruza o anel e sai pelo alto.
  const P0: V3 = [-0.78, -0.22, 0.04]
  const P1: V3 = [0.2, -0.16, 0.04]
  const P2: V3 = [1.12, 0.98, 0.04]
  const bez = (t: number): V3 => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
    (1 - t) ** 2 * P0[2] + 2 * (1 - t) * t * P1[2] + t * t * P2[2],
  ]
  const M = Math.round(56 * d)
  const seta: number[] = []
  for (let k = 0; k <= M; k++) seta.push(b.ponto(bez(k / M), { s: 1.8 + (k / M) * 1.2, f: -(k / M) * 4 }))
  b.cadeia(seta)
  const ponta = bez(1)
  const antes = bez(0.93)
  const ang = Math.atan2(ponta[1] - antes[1], ponta[0] - antes[0])
  for (const lado of [1, -1]) {
    const a = ang + Math.PI - lado * rad(30)
    const fim: V3 = [ponta[0] + Math.cos(a) * 0.24, ponta[1] + Math.sin(a) * 0.24, ponta[2]]
    b.segmento(ponta, fim, 6, { s: 2.4 })
  }

  // Casca tecnológica: esfera em malha que gira por fora, com as normas da Cyber em órbita.
  const casca = esfera(Math.round(190 * d), 1.4).map((p) => b.ponto(p, { g: 1, c: 1, s: 0.7 }))
  b.vizinhos(casca, 2)
  b.rotulo(casca[Math.round(casca.length * 0.3)], r[3], 1)
  b.rotulo(casca[Math.round(casca.length * 0.52)], r[4], 1)
  b.rotulo(casca[Math.round(casca.length * 0.74)], r[5], 1)

  return b.fechar(
    [
      { balanco: 0.3, amplitude: 0.5, inclinacao: 0.06 },
      { giro: 0.09, inclinacao: 0.32 },
    ],
    1.42,
    1.42,
    1.3,
    0.78,
  )
}

// ISO 9001: roda PDCA sobre a espiral da melhoria contínua.
function pdca({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['Planejar', 'Fazer', 'Checar', 'Agir', 'Melhoria contínua']

  const N = Math.round(170 * d)
  const espiral: number[] = []
  for (let k = 0; k <= N; k++) {
    const t = k / N
    const a = t * Math.PI * 2 * 2.5
    const raio = 0.7 + t * 0.3
    espiral.push(b.ponto([Math.cos(a) * raio, -1.1 + t * 1.35, Math.sin(a) * raio], { c: 1, s: 0.8, f: -t * 9 }))
  }
  b.cadeia(espiral)
  b.rotulo(espiral[Math.round(N * 0.55)], r[4], 1)

  const yRoda = 0.48
  b.ponto([0, yRoda, 0], { s: 1.6 })
  for (let q = 0; q < 4; q++) {
    const a0 = rad(q * 90 + 6)
    const a1 = rad(q * 90 + 84)
    const M = Math.round(28 * d) + 6
    const arco: number[] = []
    for (let k = 0; k <= M; k++) {
      const a = a0 + ((a1 - a0) * k) / M
      arco.push(b.ponto([Math.cos(a), yRoda, Math.sin(a)], { s: 1.4, f: -a }))
    }
    b.cadeia(arco)
    // ponta de seta no fim do arco
    const fim: V3 = [Math.cos(a1), yRoda, Math.sin(a1)]
    const tangente = a1 + Math.PI / 2
    for (const lado of [1, -1]) {
      const dir = tangente + Math.PI + lado * rad(28)
      b.segmento(fim, [fim[0] + Math.cos(dir) * 0.16, yRoda, fim[2] + Math.sin(dir) * 0.16], 3, { s: 1.4 })
    }
    // raio da roda e rótulo no meio do arco
    const meio = (a0 + a1) / 2
    b.segmento([0, yRoda, 0], [Math.cos(meio) * 0.92, yRoda, Math.sin(meio) * 0.92], 6, { s: 0.55 })
    b.rotulo(arco[Math.round(M / 2)], r[q], 0)
  }
  b.segmento([0, -1.1, 0], [0, yRoda, 0], 14, { s: 0.6 })

  return b.fechar([{ giro: 0.2, inclinacao: 0.42 }], 1.15, 1.25, 1.6, 0.68)
}

// ISO 14001: o planeta em malha com o ciclo de vida em órbita.
function globo({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['Aspectos e impactos', 'Ciclo de vida', 'Requisitos legais', 'Recursos e resíduos']

  const planeta = esfera(Math.round(320 * d), 0.95).map((p) => b.ponto(p, { c: 1, s: 0.75 }))
  b.vizinhos(planeta, 2)

  // paralelos em ouro, finos
  for (const lat of [-0.5, 0, 0.5]) {
    const raio = Math.sqrt(1 - lat * lat) * 0.97
    const M = Math.round(60 * d)
    const anel: number[] = []
    for (let k = 0; k < M; k++) {
      const a = (k / M) * Math.PI * 2
      anel.push(b.ponto([Math.cos(a) * raio, lat * 0.97, Math.sin(a) * raio], { s: 0.55 }))
    }
    b.cadeia(anel, true)
  }

  // órbita do ciclo de vida, com o pulso de luz correndo
  const N = Math.round(130 * d)
  const orbita: number[] = []
  for (let k = 0; k < N; k++) {
    const a = (k / N) * Math.PI * 2
    orbita.push(b.ponto(girar([Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42], rad(-14), rad(16)), { s: 1.2, f: -a * 2 }))
  }
  b.cadeia(orbita, true)
  ;[0.08, 0.33, 0.58, 0.83].forEach((t, q) => {
    const i = orbita[Math.round(t * N) % N]
    b.s[i] = 2.8
    b.rotulo(i, r[q], 0)
  })

  return b.fechar([{ giro: 0.15, inclinacao: 0.28 }], 1.45, 1.2, 1.4)
}

// ISO 45001: domo de proteção sobre o piso de trabalho, com a linha de pulso da saúde.
function pulso({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['Identificação de perigos', 'Avaliação de riscos', 'Participação dos trabalhadores', 'Saúde ocupacional']
  const piso = -0.78

  const G = d < 1 ? 7 : 11
  const grade: number[][] = []
  for (let a = 0; a < G; a++) {
    grade.push([])
    for (let c = 0; c < G; c++) {
      const x = -1.3 + (2.6 * a) / (G - 1)
      const z = -1.3 + (2.6 * c) / (G - 1)
      grade[a].push(b.ponto([x, piso, z], { s: 0.6 }))
    }
  }
  for (let a = 0; a < G; a++) {
    b.cadeia(grade[a])
    b.cadeia(grade.map((linha) => linha[a]))
  }

  const R = 1.08
  const aneis: number[][] = []
  for (const lat of [0, 18, 36, 54, 72]) {
    const raio = R * Math.cos(rad(lat))
    const y = piso + R * Math.sin(rad(lat))
    const M = Math.round(40 * d * Math.cos(rad(lat))) + 6
    const anel: number[] = []
    for (let k = 0; k < M; k++) {
      const a = (k / M) * Math.PI * 2
      anel.push(b.ponto([Math.cos(a) * raio, y, Math.sin(a) * raio], { c: 1, s: 0.8 }))
    }
    b.cadeia(anel, true)
    aneis.push(anel)
  }
  const topo = b.ponto([0, piso + R, 0], { c: 1, s: 1.2 })
  for (let m = 0; m < 12; m++) {
    const a = (m / 12) * Math.PI * 2
    const meridiano: number[] = []
    for (let k = 0; k <= 8; k++) {
      const lat = rad((k / 8) * 90)
      meridiano.push(b.ponto([Math.cos(a) * R * Math.cos(lat), piso + R * Math.sin(lat), Math.sin(a) * R * Math.cos(lat)], { c: 1, s: 0.6 }))
    }
    b.cadeia(meridiano)
    b.aresta(meridiano[meridiano.length - 1], topo)
  }
  const anel36 = aneis[2]
  b.rotulo(anel36[Math.round(anel36.length * 0.08)], r[0], 1)
  b.rotulo(anel36[Math.round(anel36.length * 0.42)], r[1], 1)
  b.rotulo(anel36[Math.round(anel36.length * 0.72)], r[2], 1)

  // eletrocardiograma
  const gauss = (x: number, m: number, s: number) => Math.exp(-((x - m) ** 2) / (2 * s * s))
  const ecg = (x: number) =>
    0.08 * gauss(x, -0.42, 0.06) - 0.1 * gauss(x, -0.08, 0.025) + 0.62 * gauss(x, 0, 0.028) - 0.24 * gauss(x, 0.08, 0.025) + 0.16 * gauss(x, 0.44, 0.08)
  const N = Math.round(150 * d)
  const linha: number[] = []
  let pico = 0
  for (let k = 0; k <= N; k++) {
    const x = -1.45 + (2.9 * k) / N
    const i = b.ponto([x, -0.12 + ecg(x), 0.02], { s: 2, f: -x * 2.4 })
    if (Math.abs(x) < 2.9 / N) pico = i
    linha.push(i)
  }
  b.cadeia(linha)
  b.rotulo(pico || linha[Math.round(N / 2)], r[3], 0)

  return b.fechar([{ balanco: 0.26, amplitude: 0.5, inclinacao: 0.26 }], 1.45, 1.1, 1.5, 0.72)
}

// Tecnologia (e ISO 42001): o núcleo do sistema de gestão envolto pela rede das normas da Cyber.
function rede({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Sistema de gestão',
    'ISO/IEC 27001',
    'ISO/IEC 42001',
    'LGPD · ISO/IEC 27701',
    'ISO 22301',
    'ISO 31000',
    'NIST AI RMF',
    'SOC 2',
  ]

  const nucleo = esfera(Math.max(30, Math.round(60 * d)), 0.34).map((p) => b.ponto(p, { s: 1.05 }))
  b.vizinhos(nucleo, 3)
  b.rotulo(nucleo[2], r[0], 0)
  const centro = b.ponto([0, 0, 0], { s: 0 })

  const planos: [number, number][] = [
    [rad(18), rad(10)],
    [rad(72), rad(-24)],
    [rad(-38), rad(58)],
  ]
  const raios = [0.86, 1.16, 1.46]
  const posNos: [number, number][] = [
    [0, 40],
    [0, 215],
    [1, 100],
    [1, 285],
    [2, 15],
    [2, 150],
    [2, 300],
  ]
  const anel: number[][] = []
  planos.forEach(([ax, az], q) => {
    const N = Math.round(96 * d)
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(b.ponto(girar([Math.cos(a) * raios[q], 0, Math.sin(a) * raios[q]], ax, az), { c: 1, s: 0.7, f: -a * 2 + q * 2 }))
    }
    b.cadeia(ids, true)
    anel.push(ids)
  })
  let anterior = -1
  posNos.forEach(([q, graus], k) => {
    const ids = anel[q]
    const i = ids[Math.round((graus / 360) * ids.length) % ids.length]
    b.s[i] = 2.6
    b.aresta(i, centro)
    if (anterior >= 0) b.aresta(anterior, i)
    anterior = i
    b.rotulo(i, r[k + 1], 1)
  })

  return b.fechar([{ giro: 0.12, inclinacao: 0.26 }], 1.5, 1.5, 1.2)
}

// Demais serviços: o número da norma em pontos, extrudado, dentro da casca.
async function numero({ densidade: d, texto = 'ISO' }: OpcoesForma): Promise<Forma> {
  const b = new Construtor()
  const fonte = '700 160px "Playfair Display Variable", "Playfair Display", Georgia, serif'
  try {
    await document.fonts.load(fonte, texto)
  } catch {
    /* segue com a fonte de reserva */
  }
  const tela = document.createElement('canvas')
  const ctx = tela.getContext('2d', { willReadFrequently: true })!
  ctx.font = fonte
  const largura = Math.ceil(ctx.measureText(texto).width) + 24
  tela.width = largura
  tela.height = 220
  ctx.font = fonte
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(texto, largura / 2, 112)
  const dados = ctx.getImageData(0, 0, largura, 220).data

  const meia = 1.5
  const escala = (meia * 2) / largura
  const passo = Math.max(3, Math.round(largura / (d < 1 ? 70 : 110)))
  const mapa = new Map<number, number>()
  const chave = (gx: number, gy: number) => gy * 10000 + gx
  const rnd = aleatorio(29)
  for (let py = 0; py < 220; py += passo) {
    for (let px = 0; px < largura; px += passo) {
      if (dados[(py * largura + px) * 4 + 3] < 128) continue
      const x = (px - largura / 2) * escala
      const y = -(py - 112) * escala
      const i = b.ponto([x, y, (rnd() - 0.5) * 0.08], { s: 1.05, f: -x * 1.8 })
      mapa.set(chave(px / passo, py / passo), i)
      if ((px / passo + py / passo) % 2 === 0) b.ponto([x, y, 0.2], { c: 1, s: 0.55 })
    }
  }
  for (const [k, i] of mapa) {
    const gx = k % 10000
    const gy = Math.floor(k / 10000)
    const dir = mapa.get(chave(gx + 1, gy))
    const baixo = mapa.get(chave(gx, gy + 1))
    if (dir !== undefined) b.aresta(i, dir)
    if (baixo !== undefined) b.aresta(i, baixo)
  }

  const casca = esfera(Math.round(110 * d), 1.75).map((p) => b.ponto(p, { g: 1, c: 1, s: 0.6 }))
  b.vizinhos(casca, 2)

  const altura = (220 / 2) * escala
  return b.fechar(
    [
      { balanco: 0.28, amplitude: 0.34, inclinacao: 0.04 },
      { giro: 0.07, inclinacao: 0.3 },
    ],
    meia + 0.08,
    Math.max(altura, 0.9),
    1.4,
  )
}

export const FORMAS: Record<string, (o: OpcoesForma) => Forma | Promise<Forma>> = {
  logo,
  pdca,
  globo,
  pulso,
  rede,
  numero,
}
