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
  /** Giro fixo inicial em torno do eixo vertical (rad): vista de três quartos. */
  rumo?: number
  /**
   * Giro próprio da peça em torno de um eixo que passa por `centro` (rodas, engrenagens, grua),
   * aplicado antes do movimento do conjunto. Com `amplitude`, vai e volta em vez de girar sempre.
   */
  local?: {
    eixo: 'y' | 'z'
    vel: number
    centro: [number, number, number]
    amplitude?: number
    fase?: number
  }
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
  /** Profundidade a partir da qual o rótulo começa a aparecer (menor = aparece mais). */
  limiarRotulo: number
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
  /** Fase calculada pela posição (para o pulso de luz correr numa direção). */
  fase?: (x: number, y: number, z: number) => number
}

class Construtor {
  p: number[] = []
  g: number[] = []
  c: number[] = []
  s: number[] = []
  f: number[] = []
  e: number[] = []
  rotulos: Rotulo[] = []
  /** Soma a todo ponto criado com ponto() (para centralizar a forma sem refazer as contas). */
  origem: V3 = [0, 0, 0]
  /** Formas chatas ou compridas pedem limiar menor, senão os rótulos ficam apagados. */
  limiarRotulo = 0.5

  ponto([x, y, z]: V3, o: OpcoesPonto = {}) {
    return this.bruto(x + this.origem[0], y + this.origem[1], z + this.origem[2], o)
  }

  private bruto(x: number, y: number, z: number, o: OpcoesPonto) {
    this.p.push(x, y, z)
    this.g.push(o.g ?? 0)
    this.c.push(o.c ?? 0)
    this.s.push(o.s ?? 1)
    this.f.push(o.fase ? o.fase(x, y, z) : (o.f ?? Number.NaN))
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
      ids.push(
        this.ponto(
          [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
          o,
        ),
      )
    }
    this.cadeia(ids)
    return ids
  }

  /** Liga dois pontos já criados com n trechos (n - 1 pontos novos no meio). */
  entre(i: number, j: number, n: number, o: OpcoesPonto = {}) {
    const ids = [i]
    const p = this.p
    for (let k = 1; k < n; k++) {
      const t = k / n
      ids.push(
        this.bruto(
          p[i * 3] + (p[j * 3] - p[i * 3]) * t,
          p[i * 3 + 1] + (p[j * 3 + 1] - p[i * 3 + 1]) * t,
          p[i * 3 + 2] + (p[j * 3 + 2] - p[i * 3 + 2]) * t,
          o,
        ),
      )
    }
    ids.push(j)
    this.cadeia(ids)
    return ids
  }

  /** Quantos trechos cabem entre dois pontos já criados, no passo dado. */
  trechos(i: number, j: number, passo: number) {
    const p = this.p
    const d = Math.hypot(
      p[i * 3] - p[j * 3],
      p[i * 3 + 1] - p[j * 3 + 1],
      p[i * 3 + 2] - p[j * 3 + 2],
    )
    return Math.max(1, Math.round(d / passo))
  }

  /** Liga dois pontos já criados, com pontos intermediários a cada `passo`. */
  ligar(i: number, j: number, passo: number, o: OpcoesPonto = {}) {
    return this.entre(i, j, this.trechos(i, j, passo), o)
  }

  /** Linha poligonal amostrada no passo dado; devolve os pontos dos vértices. */
  linha(pts: V3[], passo: number, o: OpcoesPonto = {}, fechar = false) {
    const cantos = pts.map((v) => this.ponto(v, o))
    const n = fechar ? cantos.length : cantos.length - 1
    for (let k = 0; k < n; k++) this.ligar(cantos[k], cantos[(k + 1) % cantos.length], passo, o)
    return cantos
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
      limiarRotulo: this.limiarRotulo,
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
        anel.push(
          b.ponto([a[0] + (z[0] - a[0]) * t, y, a[2] + (z[2] - a[2]) * t], {
            c: cor,
            s: k === niveis ? 1.6 : 1.1,
          }),
        )
      }
    }
    b.cadeia(anel, true)
    if (anterior)
      for (let lado = 0; lado < 4; lado++) b.aresta(anterior[lado * porLado], anel[lado * porLado])
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
  for (let k = 0; k <= M; k++)
    seta.push(b.ponto(bez(k / M), { s: 1.8 + (k / M) * 1.2, f: -(k / M) * 4 }))
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
    espiral.push(
      b.ponto([Math.cos(a) * raio, -1.1 + t * 1.35, Math.sin(a) * raio], {
        c: 1,
        s: 0.8,
        f: -t * 9,
      }),
    )
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
      b.segmento(fim, [fim[0] + Math.cos(dir) * 0.16, yRoda, fim[2] + Math.sin(dir) * 0.16], 3, {
        s: 1.4,
      })
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
  const r = rotulos ?? [
    'Aspectos e impactos',
    'Ciclo de vida',
    'Requisitos legais',
    'Recursos e resíduos',
  ]

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
    orbita.push(
      b.ponto(girar([Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42], rad(-14), rad(16)), {
        s: 1.2,
        f: -a * 2,
      }),
    )
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
  const r = rotulos ?? [
    'Identificação de perigos',
    'Avaliação de riscos',
    'Participação dos trabalhadores',
    'Saúde ocupacional',
  ]
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
      meridiano.push(
        b.ponto(
          [
            Math.cos(a) * R * Math.cos(lat),
            piso + R * Math.sin(lat),
            Math.sin(a) * R * Math.cos(lat),
          ],
          { c: 1, s: 0.6 },
        ),
      )
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
    0.08 * gauss(x, -0.42, 0.06) -
    0.1 * gauss(x, -0.08, 0.025) +
    0.62 * gauss(x, 0, 0.028) -
    0.24 * gauss(x, 0.08, 0.025) +
    0.16 * gauss(x, 0.44, 0.08)
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
      ids.push(
        b.ponto(girar([Math.cos(a) * raios[q], 0, Math.sin(a) * raios[q]], ax, az), {
          c: 1,
          s: 0.7,
          f: -a * 2 + q * 2,
        }),
      )
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

// ---------------------------------------------------------------------------
// Peças comuns aos veículos e estruturas.

/** Caixa em arame: 8 cantos e 12 arestas amostradas. */
function caixa(
  b: Construtor,
  [x0, y0, z0]: V3,
  [x1, y1, z1]: V3,
  passo: number,
  o: OpcoesPonto = {},
) {
  const c = [
    b.ponto([x0, y0, z0], o),
    b.ponto([x1, y0, z0], o),
    b.ponto([x1, y0, z1], o),
    b.ponto([x0, y0, z1], o),
    b.ponto([x0, y1, z0], o),
    b.ponto([x1, y1, z0], o),
    b.ponto([x1, y1, z1], o),
    b.ponto([x0, y1, z1], o),
  ]
  for (let k = 0; k < 4; k++) {
    b.ligar(c[k], c[(k + 1) % 4], passo, o)
    b.ligar(c[4 + k], c[4 + ((k + 1) % 4)], passo, o)
    b.ligar(c[k], c[4 + k], passo, o)
  }
  return c
}

/** Roda de frente para z: pneu (uma ou duas faces), aro e raios em ouro na face de fora. Devolve o cubo. */
function roda(
  b: Construtor,
  [x, y, z]: V3,
  r: number,
  largura: number,
  d: number,
  g: number,
  duasFaces = true,
) {
  const N = Math.max(10, Math.round(24 * d * Math.sqrt(r / 0.3)))
  const faces: number[][] = []
  for (const lado of duasFaces ? [-1, 1] : [z >= 0 ? 1 : -1]) {
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(
        b.ponto([x + Math.cos(a) * r, y + Math.sin(a) * r, z + (lado * largura) / 2], {
          g,
          c: 1,
          s: 0.85,
        }),
      )
    }
    b.cadeia(ids, true)
    faces.push(ids)
  }
  if (duasFaces) for (let k = 0; k < N; k += 2) b.aresta(faces[0][k], faces[1][k])
  const zf = z + (z >= 0 ? 1 : -1) * (largura / 2) * 1.05
  const M = Math.max(8, Math.round(N * 0.6))
  const aro: number[] = []
  for (let k = 0; k < M; k++) {
    const a = (k / M) * Math.PI * 2
    aro.push(b.ponto([x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62, zf], { g, s: 0.9 }))
  }
  b.cadeia(aro, true)
  const cubo = b.ponto([x, y, zf], { g, s: 1.7 })
  for (let k = 0; k < 5; k++) b.aresta(cubo, aro[Math.round((k / 5) * M) % M])
  return cubo
}

/** Pista sob o veículo: as faixas acendem e correm para trás, como se ele andasse. */
function pista(
  b: Construtor,
  y: number,
  x0: number,
  x1: number,
  zs: number[],
  passo: number,
  k: number,
) {
  for (const z of zs) {
    const centro = Math.abs(z) < 1e-6
    const ids: number[] = []
    for (let x = x0; x <= x1 + 1e-6; x += passo) {
      ids.push(
        b.ponto([x, y, z], {
          c: centro ? 0 : 1,
          s: centro ? 1.2 : 0.5,
          f: x * k + (centro ? 0 : 1.4),
        }),
      )
    }
    if (!centro) b.cadeia(ids)
  }
}

// PBQP-H: a estrutura de um prédio em obra (pilares, vigas e lajes), com a grua ao lado.
function predio({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'SiAC · PBQP-H',
    'Controle tecnológico',
    'Recebimento de materiais',
    'Gestão de resíduos',
  ]
  const passo = 0.085 / d
  b.origem = [0.08, -0.06, 0]
  const X = [-1.0, -0.64, -0.28, 0.08]
  const Z = [-0.34, 0, 0.34]
  const y0 = -1.0
  const hp = 0.24
  const prontos = 6 // pavimentos com laje; o sétimo está em execução
  const sobe = { fase: (_x: number, y: number) => -y * 4 }

  const nos = new Map<string, number>()
  const no = (k: number, a: number, c: number) => {
    const chave = `${k}.${a}.${c}`
    let i = nos.get(chave)
    if (i === undefined) {
      i = b.ponto([X[a], y0 + k * hp, Z[c]], { s: k === 0 ? 1.1 : 1.45, ...sobe })
      nos.set(chave, i)
    }
    return i
  }

  // Pilares: a luz sobe por eles, como a obra.
  for (let a = 0; a < X.length; a++) {
    for (let c = 0; c < Z.length; c++) {
      for (let k = 0; k < prontos; k++)
        b.ligar(no(k, a, c), no(k + 1, a, c), passo, { s: 1, ...sobe })
      if (a < 3) {
        b.ligar(no(prontos, a, c), no(prontos + 1, a, c), passo, { s: 1, ...sobe })
        // esperas de aço no topo dos pilares em execução
        if (a === 2)
          b.segmento(
            [X[a], y0 + (prontos + 1) * hp, Z[c]],
            [X[a], y0 + (prontos + 1) * hp + 0.09, Z[c]],
            2,
            { s: 0.6 },
          )
      }
    }
  }

  // Vigas e lajes de cada pavimento pronto.
  for (let k = 1; k <= prontos; k++) {
    for (let c = 0; c < Z.length; c++)
      for (let a = 0; a < 3; a++) b.ligar(no(k, a, c), no(k, a + 1, c), passo, { s: 0.85 })
    for (let a = 0; a < X.length; a++)
      for (let c = 0; c < 2; c++) b.ligar(no(k, a, c), no(k, a, c + 1), passo, { s: 0.85 })
    const y = y0 + k * hp
    for (const z of [-0.17, 0.17])
      b.linha(
        [
          [X[0], y, z],
          [X[3], y, z],
        ],
        passo * 1.3,
        { c: 1, s: 0.5 },
      )
  }
  // fôrmas do pavimento em execução: só parte das vigas
  for (let c = 0; c < 2; c++)
    for (let a = 0; a < 2; a++)
      b.ligar(no(prontos + 1, a, c), no(prontos + 1, a + 1, c), passo, { s: 0.85 })

  // Terreno do canteiro (platina, bem fino).
  const terreno: number[][] = []
  for (let a = 0; a < 8; a++) {
    terreno.push([])
    for (let c = 0; c < 6; c++)
      terreno[a].push(b.ponto([-1.36 + a * 0.33, y0 - 0.005, -0.75 + c * 0.3], { c: 1, s: 0.5 }))
  }
  for (let a = 0; a < 8; a++) b.cadeia(terreno[a])
  for (let c = 0; c < 6; c++) b.cadeia(terreno.map((l) => l[c]))

  // Grua: mastro treliçado, lança sobre o prédio e contralança; gira devagar, para lá e para cá.
  const g = 1
  const gx = 0.52
  const gz = -0.05
  const lado = 0.055
  const yTopo = 1.0
  const niveis = Math.max(10, Math.round(((yTopo - y0) / 0.1) * Math.min(1, d + 0.3)))
  const cantos = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]
  let anterior: number[] | null = null
  for (let k = 0; k <= niveis; k++) {
    const y = y0 + ((yTopo - y0) * k) / niveis
    const anel = cantos.map(([sx, sz]) =>
      b.ponto([gx + sx * lado, y, gz + sz * lado], { g, c: 1, s: 0.7 }),
    )
    b.cadeia(anel, true)
    if (anterior)
      for (let q = 0; q < 4; q++) {
        b.aresta(anterior[q], anel[q])
        b.aresta(anterior[q], anel[(q + 1) % 4])
      }
    anterior = anel
  }
  const yj = yTopo + 0.02
  const trelica = (xFim: number, alto: boolean) => {
    const n = Math.max(4, Math.round(Math.abs(xFim - gx) / 0.1))
    const nosJ: number[] = []
    let ant: number[] | null = null
    for (let k = 0; k <= n; k++) {
      const x = gx + ((xFim - gx) * k) / n
      const tri = [
        b.ponto([x, yj, gz - 0.04], { g, c: 1, s: 0.75 }),
        b.ponto([x, yj, gz + 0.04], { g, c: 1, s: 0.75 }),
      ]
      if (alto) tri.push(b.ponto([x, yj + 0.08, gz], { g, c: 1, s: 0.75 }))
      b.cadeia(tri, alto)
      if (ant) {
        for (let q = 0; q < tri.length; q++) b.aresta(ant[q], tri[q])
        b.aresta(ant[0], tri[1])
        if (alto) b.aresta(ant[1], tri[2])
      }
      ant = tri
      nosJ.push(tri[alto ? 2 : 0])
    }
    return nosJ
  }
  const lanca = trelica(-1.25, true)
  const contra = trelica(gx + 0.5, false)
  caixa(b, [gx + 0.34, yj - 0.12, gz - 0.07], [gx + 0.5, yj - 0.01, gz + 0.07], passo, {
    g,
    s: 0.8,
  })
  const apice = b.ponto([gx, yj + 0.27, gz], { g, c: 1, s: 1 })
  b.ligar(apice, lanca[Math.round(lanca.length * 0.62)], passo * 1.4, { g, c: 1, s: 0.45 })
  b.ligar(apice, contra[contra.length - 1], passo * 1.4, { g, c: 1, s: 0.45 })
  b.ligar(apice, lanca[0], passo, { g, c: 1, s: 0.6 })
  // carro, cabo e a carga içada (ouro)
  const xc = -0.56
  b.segmento([xc, yj, gz], [xc, 0.86, gz], Math.max(3, Math.round(0.16 / (passo * 0.5))), {
    g,
    c: 1,
    s: 0.55,
  })
  const carga = caixa(b, [xc - 0.15, 0.78, gz - 0.05], [xc + 0.15, 0.85, gz + 0.05], passo * 0.7, {
    g,
    s: 0.95,
  })

  b.rotulo(no(prontos, 0, 0), r[0], 0)
  b.rotulo(no(3, 3, 0), r[1], 0)
  b.rotulo(carga[4], r[2], 0)
  b.rotulo(terreno[0][0], r[3], 1)

  const corpo: Grupo = { rumo: -0.34, balanco: 0.2, amplitude: 0.36, inclinacao: 0.2 }
  return b.fechar(
    [
      corpo,
      {
        ...corpo,
        local: { eixo: 'y', vel: 0.22, amplitude: 0.42, centro: [gx + b.origem[0], 0, gz] },
      },
    ],
    1.22,
    1.2,
    1.3,
    0.68,
  )
}

/** Curva suave (Catmull-Rom) que passa pelos pontos dados. */
function suave2d(P: [number, number][], fechada = false, n = 10): [number, number][] {
  const m = P.length
  const em = (i: number) => (fechada ? P[(i + m) % m] : P[Math.max(0, Math.min(m - 1, i))])
  const out: [number, number][] = []
  const trechos = fechada ? m : m - 1
  for (let i = 0; i < trechos; i++) {
    const [p0, p1, p2, p3] = [em(i - 1), em(i), em(i + 1), em(i + 2)]
    for (let k = 0; k < n; k++) {
      const t = k / n
      const t2 = t * t
      const t3 = t2 * t
      const c = (q: 0 | 1) =>
        0.5 *
        (2 * p1[q] +
          (-p0[q] + p2[q]) * t +
          (2 * p0[q] - 5 * p1[q] + 4 * p2[q] - p3[q]) * t2 +
          (-p0[q] + 3 * p1[q] - 3 * p2[q] + p3[q]) * t3)
      out.push([c(0), c(1)])
    }
  }
  if (!fechada) out.push(P[m - 1])
  return out
}

/** Reamostra uma linha poligonal em passos iguais. */
function reamostrar(pts: V3[], passo: number, fechar = false): V3[] {
  const P = fechar ? [...pts, pts[0]] : pts
  const acum = [0]
  for (let i = 1; i < P.length; i++) {
    acum.push(
      acum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1], P[i][2] - P[i - 1][2]),
    )
  }
  const L = acum[acum.length - 1]
  const n = Math.max(2, Math.round(L / passo))
  const out: V3[] = []
  let j = 0
  for (let k = 0; k < (fechar ? n : n + 1); k++) {
    const s = (k / n) * L
    while (j < P.length - 2 && acum[j + 1] < s) j++
    const t = (s - acum[j]) / (acum[j + 1] - acum[j] || 1)
    out.push([
      P[j][0] + (P[j + 1][0] - P[j][0]) * t,
      P[j][1] + (P[j + 1][1] - P[j][1]) * t,
      P[j][2] + (P[j + 1][2] - P[j][2]) * t,
    ])
  }
  return out
}

/** Roda esportiva: pneu de perfil baixo (duas faces), aro grande e raios em turbina. Devolve o cubo. */
function rodaEsportiva(
  b: Construtor,
  [x, y, z]: V3,
  r: number,
  largura: number,
  d: number,
  g: number,
  distante = false,
) {
  if (distante) {
    // lado de lá: só o contorno do pneu, bem leve, para não embaralhar a silhueta
    const N = Math.max(12, Math.round(22 * d))
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(b.ponto([x + Math.cos(a) * r, y + Math.sin(a) * r, z], { g, c: 1, s: 0.5 }))
    }
    b.cadeia(ids, true)
    return b.ponto([x, y, z], { g, s: 0 })
  }
  const N = Math.max(14, Math.round(30 * d))
  const faces: number[][] = []
  for (const lado of [-1, 1]) {
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(
        b.ponto([x + Math.cos(a) * r, y + Math.sin(a) * r, z + (lado * largura) / 2], {
          g,
          c: 1,
          s: 0.8,
        }),
      )
    }
    b.cadeia(ids, true)
    faces.push(ids)
  }
  for (let k = 0; k < N; k += 2) b.aresta(faces[0][k], faces[1][k])
  const zf = z + (z >= 0 ? 1 : -1) * (largura / 2) * 1.04
  const M = Math.max(12, Math.round(N * 0.8))
  const aro: number[] = []
  for (let k = 0; k < M; k++) {
    const a = (k / M) * Math.PI * 2
    aro.push(b.ponto([x + Math.cos(a) * r * 0.76, y + Math.sin(a) * r * 0.76, zf], { g, s: 1 }))
  }
  b.cadeia(aro, true)
  const H = 6
  const miolo: number[] = []
  for (let k = 0; k < H; k++) {
    const a = (k / H) * Math.PI * 2
    miolo.push(b.ponto([x + Math.cos(a) * r * 0.16, y + Math.sin(a) * r * 0.16, zf], { g, s: 0.8 }))
  }
  b.cadeia(miolo, true)
  // dez raios torcidos (turbina): cada um sai do miolo e chega ao aro adiantado
  for (let k = 0; k < 10; k++) {
    b.aresta(miolo[Math.floor((k * H) / 10)], aro[(Math.round((k * M) / 10) + 2) % M])
  }
  return b.ponto([x, y, zf], { g, s: 1.6 })
}

// IATF 16949: carro elétrico moderno. Chassi tipo skate (bateria entre os eixos, um motor por eixo)
// em ouro, dentro da carroceria de linhas fluidas em platina; rodas girando sobre a pista.
function chassi({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['APQP', 'PPAP', 'FMEA', 'MSA · CEP', 'VDA 6.3']
  const passo = 0.065 / d
  b.origem = [0, 0.13, 0]
  const yR = -0.42
  const xR = 0.92
  const rR = 0.31
  const zR = 0.5
  const kPista = 3
  const pulsoForma = 1.2
  const vel = -pulsoForma / kPista / rR // a roda gira na velocidade em que a pista corre
  const lim = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

  // Carroceria: perfil lateral suave (bico, capô, para-brisa inclinado, teto em arco e traseira fastback).
  const topo = suave2d(
    [
      [1.4, -0.3],
      [1.45, -0.18],
      [1.37, -0.08],
      [1.0, -0.02],
      [0.62, 0.04],
      [0.12, 0.34],
      [-0.25, 0.38],
      [-0.75, 0.3],
      [-1.2, 0.11],
      [-1.38, 0.08],
      [-1.41, -0.12],
      [-1.35, -0.3],
    ],
    false,
    8,
  )
  const ra = rR + 0.05
  const t0 = Math.asin(0.12 / ra)
  const arco = (xc: number): [number, number][] => {
    const pts: [number, number][] = []
    for (let k = 0; k <= 10; k++) {
      const a = Math.PI - t0 - (k / 10) * (Math.PI - 2 * t0)
      pts.push([xc + Math.cos(a) * ra, yR + Math.sin(a) * ra])
    }
    return pts
  }
  const perfil: [number, number][] = [...topo, ...arco(-xR), ...arco(xR)]
  // laterais mais estreitas no alto (a cabine recolhe) e nas pontas
  const meia = (x: number, y: number) =>
    0.56 - 0.16 * lim((y - 0.06) / 0.34) - 0.08 * lim((Math.abs(x) - 1.15) / 0.3)
  // o lado voltado para a câmera (z negativo) é o desenho principal; o de lá fica leve
  const lados = [-1, 1].map((lado) => {
    const pts = reamostrar(
      perfil.map(([x, y]) => [x, y, lado * meia(x, y)] as V3),
      lado < 0 ? passo : passo * 1.6,
      true,
    )
    const ids = pts.map((p) => b.ponto(p, lado < 0 ? { c: 1, s: 0.9 } : { c: 1, s: 0.45 }))
    b.cadeia(ids, true)
    return { pts, ids }
  })
  const perto = (l: { pts: V3[]; ids: number[] }, x: number, y: number) => {
    let melhor = 0
    let dm = Infinity
    l.pts.forEach((p, k) => {
      const dd = (p[0] - x) ** 2 + (p[1] - y) ** 2
      if (dd < dm) {
        dm = dd
        melhor = k
      }
    })
    return l.ids[melhor]
  }
  const chaves: [number, number][] = [
    [1.4, -0.3],
    [1.45, -0.18],
    [1.37, -0.08],
    [0.62, 0.04],
    [0.12, 0.34],
    [-0.25, 0.38],
    [-0.75, 0.3],
    [-1.2, 0.11],
    [-1.41, -0.12],
    [-1.35, -0.3],
    [0, -0.3],
  ]
  for (const [x, y] of chaves)
    b.ligar(perto(lados[0], x, y), perto(lados[1], x, y), passo * 1.6, { c: 1, s: 0.4 })

  // Vidros laterais (uma linha contínua, sem coluna aparente) e teto panorâmico.
  const janela = suave2d(
    [
      [0.5, 0.08],
      [0.14, 0.3],
      [-0.25, 0.335],
      [-0.68, 0.27],
      [-0.98, 0.15],
      [-0.3, 0.1],
    ],
    true,
    8,
  )
  for (const lado of [-1]) {
    const pts = reamostrar(
      janela.map(([x, y]) => [x, y, lado * (meia(x, y) - 0.012)] as V3),
      passo * 0.9,
      true,
    )
    b.cadeia(
      pts.map((p) => b.ponto(p, { c: 1, s: 0.65 })),
      true,
    )
  }
  const yTeto = (x: number) => {
    let melhor = topo[0]
    for (const p of topo) if (p[1] > 0.2 && Math.abs(p[0] - x) < Math.abs(melhor[0] - x)) melhor = p
    return melhor[1]
  }
  const vidroTeto: V3[] = []
  for (const z of [-0.26, 0.26]) {
    const ida = z < 0 ? [0.02, -0.62] : [-0.62, 0.02]
    for (let k = 0; k <= 8; k++) {
      const x = ida[0] + ((ida[1] - ida[0]) * k) / 8
      vidroTeto.push([x, yTeto(x) + 0.004, z])
    }
  }
  const vt = reamostrar(vidroTeto, passo, true)
  b.cadeia(
    vt.map((p) => b.ponto(p, { c: 1, s: 0.5 })),
    true,
  )

  // Barras de luz de ponta a ponta, na frente (branca) e atrás (ouro).
  const farol = b.segmento([1.43, -0.11, -0.42], [1.43, -0.11, 0.42], Math.round(16 * d) + 4, {
    c: 1,
    s: 1.8,
  })
  const lanterna = b.segmento([-1.405, 0.0, -0.44], [-1.405, 0.0, 0.44], Math.round(16 * d) + 4, {
    s: 1.8,
  })

  // Chassi tipo skate (ouro): bateria entre os eixos com os módulos, um motor por eixo,
  // longarinas de impacto até os para-choques, braços e amortecedores.
  const bateria = caixa(b, [-0.66, -0.5, -0.42], [0.66, -0.38, 0.42], passo, { s: 0.85 })
  const energia = { fase: (x: number) => -x * 3 }
  for (const x of [-0.44, -0.22, 0, 0.22, 0.44]) {
    b.segmento([x, -0.38, -0.42], [x, -0.38, 0.42], Math.round(10 * d) + 3, { s: 0.6, ...energia })
  }
  b.segmento([-0.66, -0.38, 0], [0.66, -0.38, 0], Math.round(18 * d) + 4, { s: 0.6, ...energia })
  for (const xw of [-xR, xR]) {
    const sx = Math.sign(xw)
    caixa(b, [xw - 0.12, yR - 0.09, -0.17], [xw + 0.12, yR + 0.09, 0.17], passo * 0.8, { s: 0.85 })
    for (const lado of [-1, 1]) {
      const manga = b.ponto([xw, yR, lado * (zR - 0.1)], { s: 1.3 })
      b.ligar(b.ponto([xw, yR, lado * 0.17], { s: 0.9 }), manga, passo, { s: 0.85 }) // semieixo
      b.ligar(b.ponto([xw - 0.16, -0.46, lado * 0.3], { s: 0.9 }), manga, passo, { s: 0.75 })
      b.ligar(b.ponto([xw + 0.16, -0.46, lado * 0.3], { s: 0.9 }), manga, passo, { s: 0.75 })
      b.ligar(manga, b.ponto([xw, -0.1, lado * 0.36], { s: 1 }), passo * 0.8, { s: 0.8 }) // amortecedor
      // longarina de impacto, da bateria ao para-choque
      b.linha(
        [
          [sx * 0.66, -0.44, lado * 0.3],
          [sx * 1.33, -0.27, lado * 0.3],
        ],
        passo,
        { s: 0.8 },
      )
      // pinça de freio (fica parada enquanto a roda gira)
      const zp = lado * (zR + 0.01)
      const pinca: V3[] = []
      for (let k = 0; k <= 4; k++) {
        const a = rad(sx > 0 ? 120 + k * 12 : 20 + k * 12)
        pinca.push([xw + Math.cos(a) * rR * 0.6, yR + Math.sin(a) * rR * 0.6, zp])
      }
      b.cadeia(pinca.map((p) => b.ponto(p, { s: 1.3 })))
    }
    b.segmento([sx * 1.36, -0.24, -0.4], [sx * 1.36, -0.24, 0.4], Math.round(12 * d) + 3, {
      s: 0.75,
    }) // viga do para-choque
  }

  // Rodas (giram) e pista.
  const cubos: number[] = []
  for (const xw of [-xR, xR]) {
    for (const lado of [-1, 1])
      cubos.push(rodaEsportiva(b, [xw, yR, lado * zR], rR, 0.17, d, xw < 0 ? 1 : 2, lado > 0))
  }
  pista(b, -0.74, -1.62, 1.62, [-0.9, 0, 0.9], passo, kPista)

  b.rotulo(perto(lados[0], 0.12, 0.34), r[0], 1)
  b.rotulo(lanterna[0], r[1], 0)
  b.rotulo(bateria[1], r[2], 0)
  b.rotulo(farol[0], r[3], 1)
  b.rotulo(cubos[0], r[4], 0)

  const corpo: Grupo = { rumo: 0.14, balanco: 0.2, amplitude: 0.2, inclinacao: 0.13 }
  b.limiarRotulo = 0.36
  const yc = yR + b.origem[1]
  return b.fechar(
    [
      corpo,
      { ...corpo, local: { eixo: 'z', vel, centro: [-xR, yc, 0] } },
      { ...corpo, local: { eixo: 'z', vel, centro: [xR, yc, 0] } },
    ],
    1.5,
    0.72,
    pulsoForma,
    0.5,
  )
}

// ISO/IEC 17020: um grande viaduto, com vias em quatro níveis que se cruzam e o tráfego correndo.
function viaduto({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Organismo de inspeção',
    'Imparcialidade',
    'Competência técnica',
    'Rastreabilidade dos laudos',
  ]
  const passo = 0.06 / d
  const chao = -0.78
  b.origem = [0, 0.32, 0]

  // Terreno: grade fina, só dentro do círculo (o conjunto gira sem sair da tela).
  const G = d < 1 ? 7 : 9
  const grade: (number | undefined)[][] = []
  for (let a = 0; a < G; a++) {
    grade.push([])
    for (let c = 0; c < G; c++) {
      const x = -1.5 + (3 * a) / (G - 1)
      const z = -1.5 + (3 * c) / (G - 1)
      grade[a].push(
        Math.hypot(x, z) <= 1.56 ? b.ponto([x, chao - 0.005, z], { c: 1, s: 0.45 }) : undefined,
      )
    }
  }
  for (let a = 0; a < G; a++) {
    for (let c = 0; c < G - 1; c++) {
      const [p, q, u, v] = [grade[a][c], grade[a][c + 1], grade[c][a], grade[c + 1][a]]
      if (p !== undefined && q !== undefined) b.aresta(p, q)
      if (u !== undefined && v !== undefined) b.aresta(u, v)
    }
  }

  const suave = (e0: number, e1: number, x: number) => {
    const t = limitar01((x - e0) / (e1 - e0))
    return t * t * (3 - 2 * t)
  }
  const bezier =
    (P: [number, number][]) =>
    (u: number): [number, number] => {
      const v = 1 - u
      return [
        v * v * v * P[0][0] +
          3 * v * v * u * P[1][0] +
          3 * v * u * u * P[2][0] +
          u * u * u * P[3][0],
        v * v * v * P[0][1] +
          3 * v * v * u * P[1][1] +
          3 * v * u * u * P[2][1] +
          u * u * u * P[3][1],
      ]
    }
  // sobe nos primeiros 30%, corre em patamar e desce nos últimos 30%, como uma alça de verdade
  const elevada =
    (pico: number, sobe = 0.3) =>
    (u: number) =>
      chao + pico * suave(0, sobe, u) * suave(1, 1 - sobe, u)

  // Uma via: duas bordas em ouro, travessas do tabuleiro, duas faixas de tráfego e pilares até o chão.
  const via = (
    xz: (u: number) => [number, number],
    h: (u: number) => number,
    largura: number,
    fase0: number,
  ) => {
    const A = 240
    const acum = [0]
    let [px, pz] = xz(0)
    for (let k = 1; k <= A; k++) {
      const [x, z] = xz(k / A)
      acum.push(acum[k - 1] + Math.hypot(x - px, z - pz, h(k / A) - h((k - 1) / A)))
      px = x
      pz = z
    }
    const L = acum[A]
    const n = Math.max(10, Math.round(L / passo))
    const esq: number[] = []
    const dir: number[] = []
    let j = 0
    let viga = -1
    let ultimoPilar = -1
    for (let k = 0; k <= n; k++) {
      const s = (k / n) * L
      while (j < A - 1 && acum[j + 1] < s) j++
      const u = (j + limitar01((s - acum[j]) / (acum[j + 1] - acum[j] || 1))) / A
      const [x, z] = xz(u)
      const y = h(u)
      const [xa, za] = xz(Math.max(0, u - 0.002))
      const [xb, zb] = xz(Math.min(1, u + 0.002))
      const tl = Math.hypot(xb - xa, zb - za) || 1
      const nx = -(zb - za) / tl
      const nz = (xb - xa) / tl
      const w = largura / 2
      esq.push(b.ponto([x + nx * w, y, z + nz * w], { s: 0.85 }))
      dir.push(b.ponto([x - nx * w, y, z - nz * w], { s: 0.85 }))
      if (k % 3 === 0) b.aresta(esq[k], dir[k])
      // viga-caixão sob o tabuleiro: dá volume à via elevada
      if (y > chao + 0.06) {
        const v = b.ponto([x, y - 0.06, z], { c: 1, s: 0.5 })
        if (viga >= 0) b.aresta(viga, v)
        if (k % 3 === 0) {
          b.aresta(v, esq[k])
          b.aresta(v, dir[k])
        }
        viga = v
      } else viga = -1
      if (k % 2 === 0) {
        b.ponto([x + nx * w * 0.45, y + 0.006, z + nz * w * 0.45], {
          c: 1,
          s: 1.5,
          f: -s * 5.5 + fase0,
        })
        b.ponto([x - nx * w * 0.45, y + 0.006, z - nz * w * 0.45], {
          c: 1,
          s: 1.5,
          f: s * 5.5 + fase0 + 2,
        })
      }
      if (y > chao + 0.1 && s - ultimoPilar >= 0.24) {
        ultimoPilar = s
        // pilar com travessa (o "T" que segura o tabuleiro)
        const topo = b.ponto([x, y - 0.08, z], { c: 1, s: 1 })
        b.ligar(b.ponto([x, chao, z], { c: 1, s: 1 }), topo, passo * 1.1, { c: 1, s: 0.75 })
        const ce = b.ponto([x + nx * w * 1.15, y - 0.07, z + nz * w * 1.15], { c: 1, s: 0.7 })
        const cd = b.ponto([x - nx * w * 1.15, y - 0.07, z - nz * w * 1.15], { c: 1, s: 0.7 })
        b.aresta(ce, topo)
        b.aresta(topo, cd)
      }
    }
    b.cadeia(esq)
    b.cadeia(dir)
    return esq
  }

  // de uma altura a outra (alças que ligam vias de níveis diferentes)
  const transicao = (h0: number, h1: number) => (u: number) =>
    chao + h0 + (h1 - h0) * suave(0, 1, u)

  // o grande viaduto: reto, alto e cheio de pilares
  const vP = via(
    (u) => [-1.62 + 3.24 * u, 0],
    () => chao + 0.56,
    0.26,
    0,
  )
  // avenida no chão e via no segundo nível, cruzando por baixo dele
  via(
    (u) => [0.38, -1.55 + 3.1 * u],
    () => chao + 0.01,
    0.2,
    1,
  )
  const vM = via((u) => [-0.55, -1.55 + 3.1 * u], elevada(0.26, 0.24), 0.18, 2)
  // alças entre o viaduto e as vias de baixo
  via(
    bezier([
      [-1.42, 0.22],
      [-0.92, 0.22],
      [-0.68, 0.48],
      [-0.68, 1.25],
    ]),
    transicao(0.56, 0.26),
    0.14,
    3,
  )
  const a2 = via(
    bezier([
      [1.45, -0.22],
      [0.86, -0.22],
      [0.5, -0.48],
      [0.5, -1.3],
    ]),
    transicao(0.56, 0.01),
    0.14,
    4,
  )
  // e o elevado mais alto, que passa por cima de tudo em curva
  const vE = via(
    bezier([
      [1.55, 1.0],
      [0.3, 0.5],
      [-0.2, -0.3],
      [-1.0, -1.5],
    ]),
    elevada(0.94, 0.32),
    0.16,
    5,
  )

  const meio = (ids: number[], t: number) => ids[Math.round((ids.length - 1) * t)]
  b.rotulo(meio(vE, 0.5), r[0], 0)
  b.rotulo(meio(vP, 0.2), r[1], 0)
  b.rotulo(meio(a2, 0.55), r[2], 0)
  b.rotulo(meio(vM, 0.85), r[3], 0)
  b.limiarRotulo = 0.34

  return b.fechar(
    [{ rumo: 0.5, balanco: 0.16, amplitude: 0.3, inclinacao: 0.3 }],
    1.62,
    0.8,
    1.6,
    0.3,
  )
}

// SASSMAQ: cavalo mecânico com semirreboque tanque, placas de risco e as rodas girando.
function caminhao({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Segurança e saúde',
    'Meio ambiente',
    'Qualidade',
    'Atendimento a emergências',
    'Inspeção de frota',
  ]
  const passo = 0.065 / d
  b.origem = [-0.04, 0.08, 0]
  const rr = 0.17
  const yr = -0.53
  const zr = 0.34
  const kPista = 3
  const pulsoForma = 1.2
  const vel = -pulsoForma / kPista / rr
  const eixos = [1.22, 0.6, 0.36, -0.72, -0.96, -1.2]

  // Tanque: anéis (ouro e platina alternados), geratrizes e calotas.
  const yt = 0.06
  const ry = 0.33
  const rz = 0.36
  const x0 = -1.26
  const x1 = 0.5
  const nA = Math.max(14, Math.round(24 * d))
  const nAneis = Math.max(5, Math.round((x1 - x0) / 0.2))
  const anel = (x: number, f: number, o: OpcoesPonto) => {
    const ids: number[] = []
    for (let m = 0; m < nA; m++) {
      const a = (m / nA) * Math.PI * 2
      ids.push(b.ponto([x, yt + Math.cos(a) * ry * f, Math.sin(a) * rz * f], o))
    }
    b.cadeia(ids, true)
    return ids
  }
  const aneis: number[][] = []
  for (let k = 0; k <= nAneis; k++) {
    const forte = k % 2 === 0
    aneis.push(anel(x0 + ((x1 - x0) * k) / nAneis, 1, forte ? { s: 0.95 } : { c: 1, s: 0.65 }))
  }
  for (let k = 0; k < nAneis; k++)
    for (let m = 0; m < nA; m += 3) b.aresta(aneis[k][m], aneis[k + 1][m])
  const calotas: number[] = []
  for (const [xBase, sentido] of [
    [x0, -1],
    [x1, 1],
  ] as const) {
    let ant = aneis[sentido < 0 ? 0 : nAneis]
    for (const [dx, f] of [
      [0.07, 0.8],
      [0.12, 0.48],
    ]) {
      const novo = anel(xBase + sentido * dx, f, { c: 1, s: 0.6 })
      for (let m = 0; m < nA; m += 3) b.aresta(ant[m], novo[m])
      ant = novo
    }
    const ponta = b.ponto([xBase + sentido * 0.145, yt, 0], { s: 1.4 })
    for (let m = 0; m < nA; m += 3) b.aresta(ant[m], ponta)
    calotas.push(ponta)
  }
  // passarela e corrimão no alto, bocas de visita
  const yTopo = yt + ry
  for (const z of [-0.1, 0.1]) {
    b.linha(
      [
        [-1.1, yTopo + 0.08, z],
        [0.36, yTopo + 0.08, z],
      ],
      passo * 1.5,
      { c: 1, s: 0.55 },
    )
    for (let x = -1.1; x <= 0.37; x += 0.36)
      b.segmento([x, yTopo, z], [x, yTopo + 0.08, z], 2, { c: 1, s: 0.5 })
  }
  const bocas: number[] = []
  for (const x of [-0.85, -0.35, 0.15]) {
    const ids: number[] = []
    for (let m = 0; m < 9; m++) {
      const a = (m / 9) * Math.PI * 2
      ids.push(b.ponto([x + Math.cos(a) * 0.07, yTopo + 0.02, Math.sin(a) * 0.07], { s: 0.95 }))
    }
    b.cadeia(ids, true)
    bocas.push(ids[0])
  }
  // placas: rótulo de risco (losango) e painel de segurança, nos dois lados; piscam juntos
  const losangos: number[] = []
  for (const lado of [-1, 1]) {
    const z = lado * (rz + 0.012)
    const alerta = { s: 1.25, f: 0 }
    const l = b.linha(
      [
        [-0.42, yt + 0.13, z],
        [-0.29, yt, z],
        [-0.42, yt - 0.13, z],
        [-0.55, yt, z],
      ],
      passo * 0.75,
      alerta,
      true,
    )
    b.linha(
      [
        [-0.42, yt + 0.08, z],
        [-0.34, yt, z],
        [-0.42, yt - 0.08, z],
        [-0.5, yt, z],
      ],
      passo * 0.9,
      { s: 0.7, f: 0 },
      true,
    )
    b.linha(
      [
        [-0.86, yt + 0.06, z],
        [-0.64, yt + 0.06, z],
        [-0.64, yt - 0.06, z],
        [-0.86, yt - 0.06, z],
      ],
      passo * 0.75,
      alerta,
      true,
    )
    losangos.push(l[0])
  }

  // Chassi do semirreboque e do cavalo, quinta roda e pés de apoio.
  for (const lado of [-1, 1]) {
    b.linha(
      [
        [-1.38, -0.38, lado * 0.25],
        [0.56, -0.38, lado * 0.25],
      ],
      passo,
      { s: 0.9 },
    )
    b.linha(
      [
        [0.2, -0.43, lado * 0.25],
        [1.46, -0.43, lado * 0.25],
      ],
      passo,
      { s: 0.9 },
    )
    for (const x of [-1.1, -0.5, 0.2])
      b.segmento([x, yt - ry * 0.92, lado * 0.16], [x, -0.38, lado * 0.25], 3, { s: 0.6 })
    b.segmento([0.12, -0.38, lado * 0.25], [0.12, -0.64, lado * 0.25], 4, { c: 1, s: 0.6 })
  }
  for (const x of [-1.38, -0.5, 0.56])
    b.segmento([x, -0.38, -0.25], [x, -0.38, 0.25], 5, { s: 0.7 })
  for (const x of [0.2, 0.9, 1.46]) b.segmento([x, -0.43, -0.25], [x, -0.43, 0.25], 5, { s: 0.7 })
  const quinta: number[] = []
  for (let m = 0; m < 10; m++) {
    const a = (m / 10) * Math.PI * 2
    quinta.push(b.ponto([0.48 + Math.cos(a) * 0.12, -0.4, Math.sin(a) * 0.12], { s: 0.8 }))
  }
  b.cadeia(quinta, true)
  b.segmento([-1.42, -0.5, -0.32], [-1.42, -0.5, 0.32], 6, { s: 0.8 }) // para-choque traseiro

  // Cabine avançada (platina), com janelas, grade, faróis e escapamento.
  const perfilCab: [number, number][] = [
    [0.95, -0.38],
    [1.48, -0.38],
    [1.51, -0.12],
    [1.48, 0.22],
    [1.4, 0.48],
    [0.95, 0.5],
  ]
  const opCab = { c: 1, s: 0.7 }
  const cab = [-0.42, 0.42].map((z) =>
    b.linha(
      perfilCab.map(([x, y]) => [x, y, z] as V3),
      passo,
      opCab,
      true,
    ),
  )
  for (let k = 0; k < perfilCab.length; k++)
    b.ligar(cab[0][k], cab[1][k], passo * 1.2, { c: 1, s: 0.55 })
  for (const z of [-0.43, 0.43]) {
    b.linha(
      [
        [1.12, 0.18, z],
        [1.38, 0.18, z],
        [1.36, 0.42, z],
        [1.12, 0.42, z],
      ],
      passo * 0.8,
      { c: 1, s: 0.5 },
      true,
    )
    b.segmento([1.08, -0.3, z], [1.08, 0.44, z], 6, { c: 1, s: 0.4 })
  }
  for (const y of [-0.27, -0.2, -0.13]) b.segmento([1.505, y, -0.3], [1.505, y, 0.3], 8, { s: 0.7 })
  for (const z of [-0.32, 0.32]) b.ponto([1.51, -0.3, z], { s: 2.4 })
  b.segmento([0.9, -0.3, 0.36], [0.9, 0.66, 0.36], 9, { c: 1, s: 0.75 })

  // Rodas e pista.
  const cubos: number[] = []
  eixos.forEach((x, q) => {
    for (const lado of [-1, 1]) cubos.push(roda(b, [x, yr, lado * zr], rr, 0.11, d, q + 1, false))
  })
  pista(b, -0.71, -1.72, 1.72, [-0.72, 0, 0.72], passo * 1.4, kPista)

  b.rotulo(cab[0][4], r[0], 1)
  b.rotulo(bocas[1], r[1], 0)
  b.rotulo(calotas[0], r[2], 0)
  b.rotulo(losangos[0], r[3], 0)
  b.rotulo(cubos[6], r[4], 0)

  const corpo: Grupo = { rumo: 0.3, balanco: 0.2, amplitude: 0.26, inclinacao: 0.17 }
  b.limiarRotulo = 0.3
  const yc = yr + b.origem[1]
  return b.fechar(
    [
      corpo,
      ...eixos.map(
        (x): Grupo => ({ ...corpo, local: { eixo: 'z', vel, centro: [x + b.origem[0], yc, 0] } }),
      ),
    ],
    1.66,
    0.72,
    pulsoForma,
    0.5,
  )
}

// ---------------------------------------------------------------------------
// Metodologia: uma forma por fase.

// 01 Diagnóstico: radar que varre os processos; os pinos em ouro são as lacunas encontradas.
function radar({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Análise de gap',
    'Processos críticos',
    'Documentação existente',
    'Plano de ação',
  ]
  const pulsoForma = 0.9
  const yd = -0.3
  const R = 1.35
  b.origem = [0, 0.12, 0]

  for (const raio of [0.34, 0.68, 1.02, R]) {
    const N = Math.round((40 + 70 * raio) * d)
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(
        b.ponto([Math.cos(a) * raio, yd, Math.sin(a) * raio], {
          c: 1,
          s: raio === R ? 0.95 : 0.6,
          f: -a,
        }),
      )
    }
    b.cadeia(ids, true)
  }
  for (let m = 0; m < 12; m++) {
    const a = (m / 12) * Math.PI * 2
    b.segmento(
      [Math.cos(a) * 0.12, yd, Math.sin(a) * 0.12],
      [Math.cos(a) * R, yd, Math.sin(a) * R],
      Math.round(10 * d) + 3,
      {
        c: 1,
        s: 0.4,
        f: -a,
      },
    )
  }
  // o feixe que gira (grupo 1), com um rastro que vai apagando
  ;[
    [0, 1.6],
    [-0.09, 1.0],
    [-0.18, 0.7],
    [-0.27, 0.45],
  ].forEach(([a, s]) =>
    b.segmento(
      [0, yd + 0.005, 0],
      [Math.cos(a) * R, yd + 0.005, Math.sin(a) * R],
      Math.round(22 * d) + 4,
      { g: 1, s },
    ),
  )
  const nucleo = esfera(Math.round(22 * d) + 10, 0.09).map((p) =>
    b.ponto([p[0], p[1] + yd + 0.09, p[2]], { s: 1.2 }),
  )
  b.vizinhos(nucleo, 3)

  // processos levantados: pinos de alturas diferentes, que acendem quando o feixe passa
  const pino = (a: number, raio: number, h: number, lacuna: boolean) => {
    const x = Math.cos(a) * raio
    const z = Math.sin(a) * raio
    const base = b.ponto([x, yd, z], { c: 1, s: 0.8, f: -a })
    const topo = b.ponto([x, yd + h, z], { c: lacuna ? 0 : 1, s: lacuna ? 2.6 : 1.6, f: -a })
    b.entre(base, topo, 4, { c: lacuna ? 0 : 1, s: 0.6, f: -a })
    return { topo, a }
  }
  const fixos = [
    pino(rad(28), 1.05, 0.52, true),
    pino(rad(122), 0.95, 0.36, false),
    pino(rad(212), 1.1, 0.44, false),
    pino(rad(302), 0.9, 0.3, true),
  ]
  const rnd = aleatorio(7)
  const pinos = [...fixos]
  const Np = Math.round(22 * Math.min(1, d + 0.25))
  for (let q = 0; q < Np; q++)
    pinos.push(
      pino(rnd() * Math.PI * 2, 0.22 + rnd() * (R - 0.36), 0.12 + rnd() * 0.5, q % 4 === 0),
    )
  // o mapa de processos liga os pinos, na ordem em que o feixe os encontra
  b.cadeia(
    pinos
      .slice()
      .sort((p, q) => p.a - q.a)
      .filter((_, k) => k % 2 === 0)
      .map((p) => p.topo),
    true,
  )
  fixos.forEach((p, k) => b.rotulo(p.topo, r[k], k === 0 || k === 3 ? 0 : 1))
  b.limiarRotulo = 0.32

  const base: Grupo = { giro: 0.05, inclinacao: 0.6 }
  return b.fechar(
    [base, { ...base, local: { eixo: 'y', vel: -pulsoForma, centro: [0, 0, 0] } }],
    1.42,
    0.9,
    pulsoForma,
    0.42,
  )
}

/** Engrenagem no plano xy (dente centrado em alfa0); devolve o centro. */
function engrenagem(
  b: Construtor,
  cx: number,
  cy: number,
  N: number,
  m: number,
  alfa0: number,
  g: number,
  cor: number,
  d: number,
) {
  const R = (m * N) / 2
  const Ro = R + m * 0.9
  const Ri = R - m * 1.1
  const p = (2 * Math.PI) / N
  const esp = 0.07
  const perfil: [number, number, number][] = []
  for (let k = 0; k < N; k++) {
    const a = alfa0 + k * p
    perfil.push(
      [a - 0.3 * p, Ri, NaN],
      [a - 0.15 * p, Ro, -k * p * 2],
      [a + 0.15 * p, Ro, -k * p * 2],
      [a + 0.3 * p, Ri, NaN],
      [a + 0.5 * p, Ri, NaN],
    )
  }
  const faces: number[][] = []
  for (const z of [-esp, esp]) {
    const ids = perfil.map(([a, raio, f]) =>
      b.ponto([cx + Math.cos(a) * raio, cy + Math.sin(a) * raio, z], {
        g,
        c: cor,
        s: raio === Ro ? 1.25 : 0.75,
        f: z < 0 ? f : NaN,
      }),
    )
    b.cadeia(ids, true)
    faces.push(ids)
  }
  for (let q = 0; q < perfil.length; q++) if (q % 5 !== 4) b.aresta(faces[0][q], faces[1][q])
  const Ra = Ri * 0.74
  const M = Math.max(12, Math.round(N * 1.5 * d))
  const aro: number[] = []
  for (let k = 0; k < M; k++) {
    const a = alfa0 + (k / M) * Math.PI * 2
    aro.push(b.ponto([cx + Math.cos(a) * Ra, cy + Math.sin(a) * Ra, -esp], { g, c: cor, s: 0.55 }))
  }
  b.cadeia(aro, true)
  const Rh = Math.max(0.06, Ra * 0.3)
  const cubo: number[] = []
  for (let k = 0; k < 10; k++) {
    const a = alfa0 + (k / 10) * Math.PI * 2
    cubo.push(b.ponto([cx + Math.cos(a) * Rh, cy + Math.sin(a) * Rh, -esp], { g, c: cor, s: 0.7 }))
  }
  b.cadeia(cubo, true)
  const raios = N >= 16 ? 6 : 5
  for (let q = 0; q < raios; q++)
    b.ligar(
      cubo[Math.round((q / raios) * 10) % 10],
      aro[Math.round((q / raios) * M) % M],
      0.08 / d,
      { g, c: cor, s: 0.6 },
    )
  b.ponto([cx, cy, -esp], { g, c: cor, s: 2 })
  return b.ponto([cx, cy, -0.45], { g, c: cor, s: 0 }) // âncora do rótulo, à frente
}

// 02 Implementação: três engrenagens que se movem juntas sobre a planta do sistema.
function engrenagens({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['Procedimentos e registros', 'Treinamentos', 'Controles operacionais']
  b.origem = [-0.06, 0.05, 0]
  const m = 0.062
  const [NA, NB, NC] = [18, 12, 9]
  const [RA, RB, RC] = [NA, NB, NC].map((n) => (m * n) / 2)
  const phi = rad(18)
  const A: [number, number] = [-0.42, -0.1]
  const B: [number, number] = [A[0] + (RA + RB) * Math.cos(phi), A[1] + (RA + RB) * Math.sin(phi)]
  const alfaA = phi
  const alfaB = phi + Math.PI - Math.PI / NB
  const psi = alfaB + 4 * ((2 * Math.PI) / NB) // um dente de B aponta para C
  const C: [number, number] = [B[0] + (RB + RC) * Math.cos(psi), B[1] + (RB + RC) * Math.sin(psi)]
  const alfaC = psi + Math.PI - Math.PI / NC

  // planta ao fundo (grupo 0)
  const cols = d < 1 ? 7 : 10
  const lins = d < 1 ? 5 : 7
  const planta: number[][] = []
  for (let a = 0; a < cols; a++) {
    planta.push([])
    for (let c = 0; c < lins; c++)
      planta[a].push(
        b.ponto([-1.15 + (2.3 * a) / (cols - 1), -0.75 + (1.5 * c) / (lins - 1), 0.32], {
          c: 1,
          s: 0.45,
        }),
      )
  }
  for (let a = 0; a < cols; a++) b.cadeia(planta[a])
  for (let c = 0; c < lins; c++) b.cadeia(planta.map((l) => l[c]))

  const cA = engrenagem(b, A[0], A[1], NA, m, alfaA, 1, 0, d)
  const cB = engrenagem(b, B[0], B[1], NB, m, alfaB, 2, 1, d)
  const cC = engrenagem(b, C[0], C[1], NC, m, alfaC, 3, 0, d)
  b.rotulo(cA, r[0], 0)
  b.rotulo(cB, r[1], 1)
  b.rotulo(cC, r[2], 0)
  b.limiarRotulo = 0.34

  const base: Grupo = { balanco: 0.3, amplitude: 0.5, inclinacao: 0.14 }
  const wA = 0.32
  const wB = (-wA * NA) / NB
  const wC = (-wB * NB) / NC
  const centro = (P: [number, number]): [number, number, number] => [
    P[0] + b.origem[0],
    P[1] + b.origem[1],
    0,
  ]
  return b.fechar(
    [
      base,
      { ...base, local: { eixo: 'z', vel: wA, centro: centro(A) } },
      { ...base, local: { eixo: 'z', vel: wB, centro: centro(B) } },
      { ...base, local: { eixo: 'z', vel: wC, centro: centro(C) } },
    ],
    1.18,
    0.78,
    1.1,
    0.7,
  )
}

// 03 Auditoria interna: camadas de processo varridas de baixo para cima, com a lupa em volta.
function auditoria({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? ['ISO 19011', 'Constatações', 'Análise de causa', 'Ação corretiva']
  const G = d < 1 ? 5 : 6
  const L = 0.74
  const camadas = [-0.6, -0.1, 0.4]
  const varre = { fase: (_x: number, y: number) => -y * 3.2 }
  const rnd = aleatorio(11)
  const achados = new Set(['1.2.3', '0.4.1', '2.1.1', '1.0.4', '2.4.4'])
  const grades: number[][][] = []
  camadas.forEach((y, q) => {
    const grade: number[][] = []
    for (let a = 0; a < G; a++) {
      grade.push([])
      for (let c = 0; c < G; c++) {
        const achado = achados.has(`${q}.${a}.${c}`)
        grade[a].push(
          b.ponto([-L + (2 * L * a) / (G - 1), y, -L + (2 * L * c) / (G - 1)], {
            c: achado ? 0 : 1,
            s: achado ? 2.3 : 0.8,
            ...varre,
          }),
        )
      }
    }
    for (let a = 0; a < G; a++) {
      b.cadeia(grade[a])
      b.cadeia(grade.map((l) => l[a]))
    }
    // moldura da camada em ouro, para cada nível de processo se ler como uma placa
    const borda = { s: 0.75, ...varre }
    b.linha(
      [
        [-L - 0.06, y, -L - 0.06],
        [L + 0.06, y, -L - 0.06],
        [L + 0.06, y, L + 0.06],
        [-L - 0.06, y, L + 0.06],
      ],
      0.07 / d,
      borda,
      true,
    )
    grades.push(grade)
  })
  const ult = G - 1
  for (let q = 0; q < camadas.length - 1; q++) {
    for (const [a, c] of [
      [0, 0],
      [ult, 0],
      [ult, ult],
      [0, ult],
    ])
      b.ligar(grades[q][a][c], grades[q + 1][a][c], 0.09 / d, { s: 0.75, ...varre })
    for (let k = 0; k < 5; k++) {
      const a = Math.floor(rnd() * G)
      const c = Math.floor(rnd() * G)
      b.aresta(grades[q][a][c], grades[q + 1][Math.min(ult, a + (rnd() < 0.5 ? 0 : 1))][c])
    }
  }

  // a lupa (grupo 1) dá a volta no conjunto
  const g = 1
  const xl = 1.12
  const yl = 0.02
  for (const [raio, s] of [
    [0.3, 1.5],
    [0.26, 0.9],
  ]) {
    const N = Math.round(46 * d) + 10
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(b.ponto([xl, yl + Math.sin(a) * raio, Math.cos(a) * raio], { g, s }))
    }
    b.cadeia(ids, true)
  }
  const vidro: number[] = []
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * Math.PI * 2
    vidro.push(b.ponto([xl, yl + Math.sin(a) * 0.14, Math.cos(a) * 0.14], { g, c: 1, s: 0.45 }))
  }
  b.cadeia(vidro, true)
  const dirC = [-Math.SQRT1_2, -Math.SQRT1_2]
  for (const off of [-0.022, 0.022]) {
    const ox = -dirC[1] * off
    const oz = dirC[0] * off
    b.segmento(
      [xl, yl + dirC[0] * 0.3 + ox, dirC[1] * 0.3 + oz],
      [xl, yl + dirC[0] * 0.68 + ox, dirC[1] * 0.68 + oz],
      Math.round(8 * d) + 3,
      { g, s: 1.2 },
    )
  }

  b.rotulo(grades[2][0][0], r[0], 1)
  b.rotulo(grades[1][2][3], r[1], 0)
  b.rotulo(grades[0][ult][0], r[2], 1)
  b.rotulo(grades[2][ult][ult], r[3], 1)

  const base: Grupo = { rumo: 0.5, balanco: 0.18, amplitude: 0.3, inclinacao: 0.5 }
  b.limiarRotulo = 0.34
  return b.fechar(
    [base, { ...base, local: { eixo: 'y', vel: 0.4, centro: [0, 0, 0] } }],
    1.5,
    1.05,
    1.4,
    0.5,
  )
}

/** Roda PDCA no plano xy: quadrantes alternados em ouro e platina. Devolve o centro. */
function rodaPdca(b: Construtor, cx: number, cy: number, raio: number, g: number, d: number) {
  const esp = 0.08
  const N = Math.round((50 + 60 * raio) * d)
  const faces: number[][] = []
  for (const z of [-esp, esp]) {
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(
        b.ponto([cx + Math.cos(a) * raio, cy + Math.sin(a) * raio, z], {
          g,
          c: Math.floor(a / (Math.PI / 2)) % 2,
          s: z < 0 ? 1.25 : 0.7,
        }),
      )
    }
    b.cadeia(ids, true)
    faces.push(ids)
  }
  for (let k = 0; k < N; k += 3) b.aresta(faces[0][k], faces[1][k])
  const centro = b.ponto([cx, cy, -esp], { g, s: 2 })
  for (let q = 0; q < 4; q++)
    b.ligar(centro, faces[0][Math.round((q * N) / 4) % N], 0.07 / d, { g, s: 0.8 })
  const ancora = b.ponto([cx, cy, -0.4], { g, s: 0 })
  const M = Math.round(N * 0.5)
  const miolo: number[] = []
  for (let k = 0; k < M; k++) {
    const a = (k / M) * Math.PI * 2
    miolo.push(
      b.ponto([cx + Math.cos(a) * raio * 0.5, cy + Math.sin(a) * raio * 0.5, -esp], {
        g,
        c: 1,
        s: 0.5,
      }),
    )
  }
  b.cadeia(miolo, true)
  return ancora
}

// 04 Evolução contínua: rodas PDCA subindo a rampa, cada uma travada pelo calço da padronização.
function evolucao({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Indicadores e objetivos',
    'Análise crítica',
    'Recertificação',
    'Padronização',
  ]
  const passo = 0.075 / d
  b.origem = [0, -0.06, 0]
  const inc = 0.4
  const xa = -1.45
  const xb = 1.45
  const ya = -0.92
  const yRampa = (x: number) => ya + (x - xa) * inc
  const al = Math.atan(inc)
  const tx = Math.cos(al)
  const ty = Math.sin(al)
  const nx = -Math.sin(al)
  const ny = Math.cos(al)
  const Z = 0.42

  // rampa em grade (platina) com as laterais em triângulo
  const zs = d < 1 ? [-Z, 0, Z] : [-Z, -Z / 2, 0, Z / 2, Z]
  const n = Math.max(8, Math.round((xb - xa) / tx / passo))
  const rampa = zs.map((z) => {
    const ids: number[] = []
    for (let k = 0; k <= n; k++) {
      const x = xa + ((xb - xa) * k) / n
      ids.push(b.ponto([x, yRampa(x), z], { c: 1, s: 0.55 }))
    }
    b.cadeia(ids)
    return ids
  })
  for (let k = 0; k <= n; k += 3) b.cadeia(rampa.map((l) => l[k]))
  for (const z of [-Z, Z])
    b.linha(
      [
        [xa, ya, z],
        [xb, ya, z],
        [xb, yRampa(xb), z],
      ],
      passo,
      { c: 1, s: 0.45 },
    )

  const centros: number[] = []
  const grupos: Grupo[] = []
  const base: Grupo = { rumo: -0.28, balanco: 0.2, amplitude: 0.3, inclinacao: 0.12 }
  grupos.push(base)
  let calcoRotulo = -1
  ;[
    [-0.75, 0.27],
    [0.05, 0.31],
    [0.85, 0.35],
  ].forEach(([xc, raio], q) => {
    const yc = yRampa(xc)
    const cx = xc + nx * raio
    const cy = yc + ny * raio
    centros.push(rodaPdca(b, cx, cy, raio, q + 1, d))
    grupos.push({
      ...base,
      local: { eixo: 'z', vel: -0.45, centro: [cx + b.origem[0], cy + b.origem[1], 0] },
    })
    // calço: triângulo encostado na roda, do lado de baixo da rampa
    const ub = -0.845 * raio
    const ua = ub - 0.5 * raio
    const h = 0.45 * raio
    const P = (u: number, v: number, z: number): V3 => [
      xc + tx * u + nx * v,
      yc + ty * u + ny * v,
      z,
    ]
    const tri = (z: number) =>
      b.linha([P(ua, 0, z), P(ub, 0, z), P(ub, h, z)], passo * 0.6, { s: 1 }, true)
    const t1 = tri(-0.14)
    const t2 = tri(0.14)
    for (let k = 0; k < 3; k++) b.ligar(t1[k], t2[k], passo, { s: 0.8 })
    if (q === 2) calcoRotulo = t1[2]
  })

  // tendência: a seta que sobe por cima das rodas, com a luz correndo para o alto
  const P0: V3 = [-1.35, -0.25, 0.3]
  const P1: V3 = [0.2, -0.05, 0.3]
  const P2: V3 = [1.25, 1.0, 0.3]
  const bez = (t: number): V3 => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
    0.3,
  ]
  const M = Math.round(60 * d) + 10
  const seta: number[] = []
  for (let k = 0; k <= M; k++)
    seta.push(b.ponto(bez(k / M), { s: 1.2 + (k / M) * 0.8, f: -(k / M) * 6 }))
  b.cadeia(seta)
  const ponta = bez(1)
  const antes = bez(0.95)
  const ang = Math.atan2(ponta[1] - antes[1], ponta[0] - antes[0])
  for (const lado of [1, -1]) {
    const a = ang + Math.PI - lado * rad(28)
    b.segmento(ponta, [ponta[0] + Math.cos(a) * 0.2, ponta[1] + Math.sin(a) * 0.2, 0.3], 5, {
      s: 2,
    })
  }

  centros.forEach((c, k) => b.rotulo(c, r[k], k === 1 ? 1 : 0))
  if (calcoRotulo >= 0) b.rotulo(calcoRotulo, r[3], 0)

  b.limiarRotulo = 0.32
  return b.fechar(grupos, 1.62, 1.1, 1.3, 0.6)
}

// ISO/IEC 17025: ambiente de laboratório de ensaio e calibração (bancada técnica,
// microscópio óptico, balança analítica de precisão com capela, vidraria graduada e curva metrológica).
function laboratorio({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Rastreabilidade metrológica',
    'Incerteza de medição',
    'Ensaio e calibração',
    'Validação de métodos',
    'RBC · Cgcre · Inmetro',
  ]
  const passo = 0.07 / d
  b.origem = [0, -0.04, 0]
  const yBancada = -0.48

  // 1. Bancada técnica de laboratório (tampo em grade, borda reforçada e módulos inferiores).
  const gx = d < 1 ? 9 : 13
  const gz = d < 1 ? 5 : 7
  const tampo: number[][] = []
  for (let a = 0; a < gx; a++) {
    tampo.push([])
    for (let c = 0; c < gz; c++) {
      const x = -1.52 + (3.04 * a) / (gx - 1)
      const z = -0.62 + (1.24 * c) / (gz - 1)
      tampo[a].push(b.ponto([x, yBancada, z], { c: 1, s: 0.55 }))
    }
  }
  for (let a = 0; a < gx; a++) b.cadeia(tampo[a])
  for (let c = 0; c < gz; c++) b.cadeia(tampo.map((l) => l[c]))
  caixa(b, [-1.54, yBancada - 0.07, -0.64], [1.54, yBancada, 0.64], passo * 1.2, { s: 0.9 })
  for (const x of [-1.46, -0.52, 0.52, 1.46]) {
    for (const z of [-0.58, 0.58]) {
      b.segmento([x, -0.92, z], [x, yBancada - 0.07, z], 4, { c: 1, s: 0.7 })
    }
  }
  b.segmento([-1.46, -0.84, -0.58], [1.46, -0.84, -0.58], Math.round(18 * d) + 4, { c: 1, s: 0.6 })

  // 2. Painel de controle metrológico ao fundo (curva de calibração + faixas de incerteza).
  const zPainel = 0.52
  caixa(b, [-1.38, -0.32, zPainel], [1.38, 0.88, zPainel + 0.02], passo * 1.4, { c: 1, s: 0.55 })
  const nCurva = Math.round(68 * d) + 16
  const curvaCal: number[] = []
  const limSup: number[] = []
  const limInf: number[] = []
  for (let k = 0; k <= nCurva; k++) {
    const t = k / nCurva
    const x = -1.26 + 2.52 * t
    const yBase = 0.28 + 0.28 * Math.sin(t * Math.PI * 2.2) * Math.exp(-((t - 0.5) ** 2) * 2.0)
    curvaCal.push(b.ponto([x, yBase, zPainel - 0.01], { s: 1.45, f: -t * 7 }))
    if (k % 2 === 0) {
      limSup.push(b.ponto([x, yBase + 0.12, zPainel - 0.01], { c: 1, s: 0.6 }))
      limInf.push(b.ponto([x, yBase - 0.12, zPainel - 0.01], { c: 1, s: 0.6 }))
    }
  }
  b.cadeia(curvaCal)
  b.cadeia(limSup)
  b.cadeia(limInf)

  // 3. À esquerda (x = -0.98): Microscópio Óptico de Precisão.
  const xm = -0.98
  const zm = -0.1
  caixa(b, [xm - 0.28, yBancada, zm - 0.24], [xm + 0.28, yBancada + 0.08, zm + 0.24], passo, {
    s: 1.05,
  })
  const arcoBraco = suave2d(
    [
      [xm - 0.18, yBancada + 0.08],
      [xm - 0.31, yBancada + 0.38],
      [xm - 0.26, yBancada + 0.76],
      [xm - 0.04, yBancada + 0.94],
    ],
    false,
    6,
  )
  for (const dz of [-0.055, 0.055]) {
    const ids = arcoBraco.map(([x, y]) => b.ponto([x, y, zm + dz], { c: 1, s: 0.95 }))
    b.cadeia(ids)
  }
  for (let k = 0; k < arcoBraco.length; k += 3) {
    const [ax, ay] = arcoBraco[k]
    b.segmento([ax, ay, zm - 0.055], [ax, ay, zm + 0.055], 2, { c: 1, s: 0.75 })
  }
  // Platina (stage) porta-amostra e feixe óptico
  caixa(
    b,
    [xm - 0.16, yBancada + 0.38, zm - 0.19],
    [xm + 0.22, yBancada + 0.43, zm + 0.19],
    passo * 0.85,
    { s: 0.95 },
  )
  const amostra = b.ponto([xm + 0.05, yBancada + 0.44, zm], { s: 2.8, f: 0 })
  b.segmento([xm + 0.05, yBancada + 0.09, zm], [xm + 0.05, yBancada + 0.74, zm], 9, {
    s: 1.5,
    f: -1.5,
  })
  // Revólver porta-objetivas e 3 lentes
  const nRev = 12
  const revIds: number[] = []
  for (let k = 0; k < nRev; k++) {
    const a = (k / nRev) * Math.PI * 2
    revIds.push(
      b.ponto([xm + 0.05 + Math.cos(a) * 0.1, yBancada + 0.72, zm + Math.sin(a) * 0.1], {
        s: 1.1,
      }),
    )
  }
  b.cadeia(revIds, true)
  for (const angObj of [0, 2.1, 4.2]) {
    const ox = xm + 0.05 + Math.cos(angObj) * 0.065
    const oz = zm + Math.sin(angObj) * 0.065
    b.segmento([ox, yBancada + 0.72, oz], [ox, yBancada + 0.54, oz], 4, { s: 1.25 })
  }
  // Cabeçote binocular inclinado
  for (const dz of [-0.045, 0.045]) {
    b.segmento([xm - 0.02, yBancada + 0.86, zm + dz], [xm + 0.22, yBancada + 1.18, zm + dz], 6, {
      s: 1.1,
    })
  }
  const ancoraMic = b.ponto([xm + 0.12, yBancada + 1.16, zm - 0.18], { s: 0 })

  // 4. Ao centro (x = -0.02): Balança Analítica de Calibração com Capela de Vidro e Travessão Dinâmico (Grupo 1).
  const xb = -0.02
  const zb = -0.1
  caixa(b, [xb - 0.38, yBancada, zb - 0.34], [xb + 0.38, yBancada + 0.15, zb + 0.34], passo, {
    s: 1.1,
  })
  b.segmento([xb - 0.25, yBancada + 0.08, zb - 0.345], [xb + 0.25, yBancada + 0.08, zb - 0.345], 9, {
    s: 1.9,
    f: 0,
  })
  const capela = caixa(
    b,
    [xb - 0.36, yBancada + 0.15, zb - 0.31],
    [xb + 0.36, yBancada + 1.02, zb + 0.31],
    passo * 1.05,
    { c: 1, s: 0.85 },
  )
  b.segmento([xb, yBancada + 0.15, zb], [xb, yBancada + 0.82, zb], 10, { s: 1.4 })
  b.ponto([xb, yBancada + 0.82, zb], { s: 2.4 })

  const gBal = 1
  const yTrav = yBancada + 0.82
  b.segmento([xb - 0.25, yTrav, zb], [xb + 0.25, yTrav, zb], 10, { g: gBal, s: 1.55 })
  for (const lado of [-1, 1]) {
    const xp = xb + lado * 0.23
    const yp = yBancada + 0.36
    for (const [dx, dz] of [
      [-0.075, -0.075],
      [0.075, -0.075],
      [0, 0.085],
    ]) {
      b.segmento([xp, yTrav, zb], [xp + dx, yp, zb + dz], 5, { g: gBal, c: 1, s: 0.75 })
    }
    const prato: number[] = []
    for (let k = 0; k < 14; k++) {
      const a = (k / 14) * Math.PI * 2
      prato.push(
        b.ponto([xp + Math.cos(a) * 0.095, yp, zb + Math.sin(a) * 0.095], { g: gBal, s: 1.15 }),
      )
    }
    b.cadeia(prato, true)
    // Pesos-padrão de calibração em ouro nos pratos
    const hPeso = lado < 0 ? 0.11 : 0.07
    for (const dy of [0.02, hPeso]) {
      const anelP: number[] = []
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2
        anelP.push(
          b.ponto([xp + Math.cos(a) * 0.048, yp + dy, zb + Math.sin(a) * 0.048], {
            g: gBal,
            s: 1.4,
          }),
        )
      }
      b.cadeia(anelP, true)
    }
    b.ponto([xp, yp + hPeso + 0.02, zb], { g: gBal, s: 2.2 })
  }
  const ancoraBal = b.ponto([xb - 0.22, yBancada + 0.48, zb - 0.32], { s: 0 })

  // 5. À direita (x = 0.82): Erlenmeyer Graduado + Bureta de Titulação + Estante de Tubos.
  const xq = 0.78
  const zq = -0.12
  const niveisFrasco: [number, number, number][] = [
    [0.0, 0.22, 1],
    [0.09, 0.205, 0],
    [0.2, 0.155, 0],
    [0.32, 0.1, 1],
    [0.44, 0.06, 1],
    [0.58, 0.06, 1],
    [0.62, 0.078, 0],
  ]
  const nFrasco = 14
  let anelAnt: number[] | null = null
  niveisFrasco.forEach(([dy, raio, cor]) => {
    const anel: number[] = []
    for (let k = 0; k < nFrasco; k++) {
      const a = (k / nFrasco) * Math.PI * 2
      const id = b.ponto([xq + Math.cos(a) * raio, yBancada + dy, zq + Math.sin(a) * raio], {
        c: cor,
        s: cor === 0 ? 1.25 : 0.85,
        f: cor === 0 ? -dy * 8 : NaN,
      })
      anel.push(id)
    }
    b.cadeia(anel, true)
    if (anelAnt) {
      for (let k = 0; k < nFrasco; k += 2) b.aresta(anelAnt[k], anel[k])
    }
    anelAnt = anel
  })

  const xHaste = 1.06
  b.segmento([xHaste, yBancada, zq], [xHaste, yBancada + 1.2, zq], 12, { c: 1, s: 0.9 })
  b.segmento([xHaste, yBancada + 1.06, zq], [xq, yBancada + 1.06, zq], 5, { c: 1, s: 0.9 })
  for (const dx of [-0.024, 0.024]) {
    b.segmento([xq + dx, yBancada + 0.74, zq], [xq + dx, yBancada + 1.16, zq], 7, {
      c: 1,
      s: 0.8,
    })
  }
  b.segmento([xq, yBancada + 0.12, zq], [xq, yBancada + 0.74, zq], 10, {
    s: 1.6,
    f: 2.5,
  })
  const ancoraFrasco = b.ponto([xq + 0.14, yBancada + 0.34, zq - 0.24], { s: 0 })

  // Estante com 3 tubos de ensaio
  caixa(
    b,
    [1.14, yBancada, zq - 0.13],
    [1.46, yBancada + 0.28, zq + 0.13],
    passo * 1.05,
    { c: 1, s: 0.75 },
  )
  for (const xt of [1.2, 1.3, 1.4]) {
    for (const dy of [0.05, 0.22, 0.42]) {
      const anelT: number[] = []
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2
        anelT.push(
          b.ponto([xt + Math.cos(a) * 0.035, yBancada + dy, zq + Math.sin(a) * 0.035], {
            c: dy === 0.22 ? 0 : 1,
            s: dy === 0.22 ? 1.3 : 0.75,
          }),
        )
      }
      b.cadeia(anelT, true)
    }
  }

  const ancoraBalTopo = b.ponto([-0.04, yBancada + 1.04, zb - 0.31], { s: 0 })
  const ancoraCurva = b.ponto([0.64, 0.58, -0.2], { s: 0 })
  const ancoraMicEsq = b.ponto([-1.06, yBancada + 0.92, zm - 0.22], { s: 0 })
  const ancoraFrascoDir = b.ponto([0.92, yBancada + 0.22, zq - 0.26], { s: 0 })
  const ancoraInmetroBase = b.ponto([-0.52, yBancada - 0.08, -0.62], { s: 0 })

  b.rotulo(ancoraBalTopo, r[0], 0)
  b.rotulo(ancoraCurva, r[1], 1)
  b.rotulo(ancoraMicEsq, r[2], 0)
  b.rotulo(ancoraFrascoDir, r[3], 0)
  b.rotulo(ancoraInmetroBase, r[4], 1)
  b.limiarRotulo = 0.24

  const base: Grupo = { rumo: 0.16, balanco: 0.2, amplitude: 0.26, inclinacao: 0.2 }
  return b.fechar(
    [
      base,
      {
        ...base,
        local: {
          eixo: 'z',
          vel: 1.1,
          amplitude: 0.09,
          centro: [xb + b.origem[0], yTrav + b.origem[1], zb],
        },
      },
    ],
    1.56,
    0.96,
    1.3,
    0.48,
  )
}

// ISO/IEC 42001: robô humanoide moderno inspirado no design Unitree G1
// (capacete oval vazado com anel de LED, barra óptica horizontal, peitoral monobloco com check central,
// cintura cilíndrica estreita, juntas circulares nos ombros/quadril e braços articulados).
function humanoide({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Sistema de gestão de IA',
    'Inventário de IA',
    'Avaliação de impacto',
    'ISO/IEC 23894',
    'NIST AI RMF',
    'Lei de IA da UE',
    'Supervisão humana',
    'ISO 9001',
  ]
  const passo = 0.065 / d
  b.origem = [0, -0.02, 0]

  const anelH = (
    [cx, cy, cz]: V3,
    rx: number,
    rz: number,
    n: number,
    o: OpcoesPonto = {},
  ) => {
    const ids: number[] = []
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2
      ids.push(b.ponto([cx + Math.cos(a) * rx, cy, cz + Math.sin(a) * rz], o))
    }
    b.cadeia(ids, true)
    return ids
  }

  const discoPlano = (
    [cx, cy, cz]: V3,
    raio: number,
    eixoNormal: 'z' | 'x',
    n: number,
    o: OpcoesPonto = {},
  ) => {
    const ids: number[] = []
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2
      if (eixoNormal === 'z') {
        ids.push(b.ponto([cx + Math.cos(a) * raio, cy + Math.sin(a) * raio, cz], o))
      } else {
        ids.push(b.ponto([cx, cy + Math.sin(a) * raio, cz + Math.cos(a) * raio], o))
      }
    }
    b.cadeia(ids, true)
    return ids
  }

  // 1. Cabeça Unitree G1 (Grupo 1): moldura oval vazada com anel de LED, barra horizontal e câmera central.
  const gCab = 1
  const cyCab = 0.81
  const nHalo = Math.max(24, Math.round(36 * d))
  // Perfil oval da face (mais largo na têmpora, queixo estreito arredondado)
  const posHalo = (a: number, escala: number): V3 => {
    const sen = Math.sin(a)
    const cos = Math.cos(a)
    const larg = (0.165 + 0.025 * sen) * escala
    const alt = 0.235 * escala
    return [cos * larg, cyCab + sen * alt, -0.145 - 0.015 * Math.cos(a * 2)]
  }
  const haloExt: number[] = []
  const haloInt: number[] = []
  for (let k = 0; k < nHalo; k++) {
    const a = (k / nHalo) * Math.PI * 2
    haloExt.push(b.ponto(posHalo(a, 1.0), { g: gCab, s: 1.9, f: -a * 1.5 }))
    haloInt.push(b.ponto(posHalo(a, 0.82), { g: gCab, c: 1, s: 0.95 }))
  }
  b.cadeia(haloExt, true)
  b.cadeia(haloInt, true)
  for (let k = 0; k < nHalo; k += 3) b.aresta(haloExt[k], haloInt[k])

  // Calota craniana 3D atrás do anel facial
  for (const [fatorZ, escala] of [
    [-0.06, 0.96],
    [0.04, 0.88],
    [0.13, 0.68],
  ] as const) {
    const anelC: number[] = []
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2
      const [hx, hy] = posHalo(a, escala)
      anelC.push(b.ponto([hx, hy, fatorZ], { g: gCab, c: 1, s: 0.7 }))
    }
    b.cadeia(anelC, true)
  }

  // Barra de LED horizontal (visor superior) + câmera/LiDAR semiesférica abaixo da barra
  b.segmento([-0.115, cyCab + 0.055, -0.155], [0.115, cyCab + 0.055, -0.155], 12, {
    g: gCab,
    s: 2.3,
    f: 0,
  })
  b.segmento([-0.11, cyCab + 0.07, -0.15], [0.11, cyCab + 0.07, -0.15], 10, {
    g: gCab,
    c: 1,
    s: 1.1,
  })
  const podCam = esfera(14, 0.042).map((p) =>
    b.ponto([p[0], cyCab + 0.015 + p[1], -0.135 + p[2]], { g: gCab, s: 1.4, f: 0 }),
  )
  b.vizinhos(podCam, 2)

  // 2. Pescoço Cônico Escuro + Colarinho com Alças Metálicas.
  for (const [y, rPes, cor] of [
    [0.56, 0.068, 1],
    [0.5, 0.078, 1],
    [0.44, 0.13, 0],
  ] as const) {
    anelH([0, y, -0.02], rPes, rPes * 0.9, 12, { c: cor, s: cor === 0 ? 1.05 : 0.8 })
  }
  // Alças metálicas em U nas extremidades do colarinho
  for (const lado of [-1, 1]) {
    b.linha(
      [
        [lado * 0.14, 0.42, -0.05],
        [lado * 0.16, 0.46, -0.02],
        [lado * 0.14, 0.42, 0.03],
      ],
      passo * 0.6,
      { c: 1, s: 1.0 },
    )
  }

  // 3. Peitoral Monobloco Esculpido (largo em cima, chanfrado, afunilado até a cintura).
  const fatiasPeito: [number, number, number, number][] = [
    [0.41, 0.22, 0.14, 0], // gola / topo do peitoral
    [0.35, 0.34, 0.19, 1], // linha alta dos ombros
    [0.24, 0.33, 0.21, 1], // peitoral médio
    [0.12, 0.3, 0.2, 1], // centro do torso (onde fica o emblema check)
    [0.0, 0.27, 0.18, 1], // costelas inferiores
    [-0.11, 0.23, 0.15, 0], // borda inferior reta da couraça torácica
  ]
  const nPeito = 20
  const aneisPeito: number[][] = []
  fatiasPeito.forEach(([y, rx, rz, cor]) => {
    // Superelipse para dar o formato de couraça plana na frente e arredondada nos cantos
    const ids: number[] = []
    for (let k = 0; k < nPeito; k++) {
      const a = (k / nPeito) * Math.PI * 2
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      const mod = 1 - 0.12 * Math.cos(a * 4)
      ids.push(
        b.ponto([ca * rx * mod, y, sa * rz * mod], {
          c: cor,
          s: cor === 0 ? 1.15 : 0.85,
        }),
      )
    }
    b.cadeia(ids, true)
    aneisPeito.push(ids)
  })
  for (let k = 0; k < aneisPeito.length - 1; k++) {
    for (let m = 0; m < nPeito; m += 2) b.aresta(aneisPeito[k][m], aneisPeito[k + 1][m])
  }

  // Detalhes frontais do peito (inspirados na foto):
  // a) Pequeno triângulo invertido no alto do peito (y = 0.31)
  b.linha(
    [
      [-0.032, 0.32, -0.198],
      [0.032, 0.32, -0.198],
      [0, 0.275, -0.202],
    ],
    passo * 0.5,
    { s: 1.3 },
    true,
  )
  // b) Os 4 sensores circulares brancos/platina nos cantos da couraça frontal
  for (const [sx, sy, sz] of [
    [-0.085, 0.31, -0.192],
    [0.085, 0.31, -0.192],
    [-0.075, -0.03, -0.172],
    [0.075, -0.03, -0.172],
  ] as const) {
    discoPlano([sx, sy, sz], 0.022, 'z', 8, { c: 1, s: 1.0 })
  }
  // c) Grande Emblema Circular com Check (✓) de Conformidade no centro do peito!
  const yBadge = 0.14
  const zBadge = -0.206
  discoPlano([0, yBadge, zBadge], 0.115, 'z', 20, { s: 1.65, f: 0 })
  discoPlano([0, yBadge, zBadge], 0.092, 'z', 16, { c: 1, s: 0.9 })
  // O "Check" (✓) em ouro dentro do círculo central
  b.linha(
    [
      [-0.048, yBadge - 0.005, zBadge - 0.005],
      [-0.012, yBadge - 0.042, zBadge - 0.005],
      [0.055, yBadge + 0.038, zBadge - 0.005],
    ],
    passo * 0.45,
    { s: 2.3, f: 0 },
  )
  const centroPeito = b.ponto([0, yBadge, zBadge - 0.01], { s: 0 })

  // 4. Cintura Cilíndrica Estreita (o atuador central característico entre o tórax e a pelve).
  for (const [y, rCint, cor] of [
    [-0.14, 0.115, 1],
    [-0.19, 0.105, 0],
    [-0.24, 0.12, 1],
    [-0.28, 0.145, 0],
  ] as const) {
    anelH([0, y, 0], rCint, rCint, 14, { c: cor, s: cor === 0 ? 1.15 : 0.85 })
  }
  for (let m = 0; m < 6; m++) {
    const a = (m / 6) * Math.PI * 2
    b.segmento(
      [Math.cos(a) * 0.11, -0.12, Math.sin(a) * 0.11],
      [Math.cos(a) * 0.13, -0.28, Math.sin(a) * 0.13],
      3,
      { c: 1, s: 0.8 },
    )
  }

  // 5. Bloco Pélvico Compacto + Coxas Cilíndricas com Disco Circular no Quadril.
  const fatiasPelve: [number, number, number, number][] = [
    [-0.3, 0.21, 0.15, 0],
    [-0.38, 0.22, 0.16, 1],
    [-0.46, 0.14, 0.13, 1],
    [-0.52, 0.08, 0.1, 0],
  ]
  const aneisPelve: number[][] = []
  fatiasPelve.forEach(([y, rx, rz, cor]) => {
    aneisPelve.push(anelH([0, y, 0], rx, rz, 14, { c: cor, s: 0.9 }))
  })
  for (let k = 0; k < aneisPelve.length - 1; k++) {
    for (let m = 0; m < 14; m += 2) b.aresta(aneisPelve[k][m], aneisPelve[k + 1][m])
  }

  for (const lado of [-1, 1]) {
    const xc = lado * 0.225
    // Disco circular frontal da junta do quadril/coxa (muito visível na foto!)
    discoPlano([xc, -0.47, -0.125], 0.082, 'z', 14, { s: 1.3 })
    const aneisCoxa: number[][] = []
    for (const [y, rCoxa, cor] of [
      [-0.44, 0.115, 0],
      [-0.56, 0.12, 1],
      [-0.7, 0.11, 1],
      [-0.83, 0.1, 0],
      [-0.95, 0.095, 1],
    ] as const) {
      aneisCoxa.push(anelH([xc, y, 0], rCoxa, rCoxa, 12, { c: cor, s: cor === 0 ? 1.1 : 0.8 }))
    }
    for (let k = 0; k < aneisCoxa.length - 1; k++) {
      for (let m = 0; m < 12; m += 2) b.aresta(aneisCoxa[k][m], aneisCoxa[k + 1][m])
    }
  }

  // 6. Ombros com Disco Circular + Braços Cilíndricos Segmentados + Mãos Robóticas.
  for (const lado of [-1, 1]) {
    // Bloco do ombro + disco circular frontal/lateral
    const xo = lado * 0.43
    const yo = 0.32
    discoPlano([xo, yo, -0.105], 0.075, 'z', 12, { s: 1.35 })
    discoPlano([xo + lado * 0.085, yo, 0], 0.075, 'x', 12, { c: 1, s: 0.95 })

    // Articulações do braço seguindo o ângulo natural da foto
    const nosBraco: [V3, number, number][] = [
      [[lado * 0.44, 0.34, 0.0], 0.092, 0], // topo do ombro
      [[lado * 0.47, 0.2, 0.0], 0.082, 1], // anel de giro do bíceps Superior
      [[lado * 0.49, 0.12, 0.0], 0.078, 0], // bíceps inferior (anel escuro/ouro)
      [[lado * 0.52, -0.01, -0.01], 0.082, 1], // cotovelo mecânico
      [[lado * 0.55, -0.14, -0.03], 0.074, 0], // antebraço superior (anel de giro)
      [[lado * 0.58, -0.28, -0.05], 0.062, 1], // antebraço inferior cônico
      [[lado * 0.6, -0.39, -0.07], 0.048, 0], // punho
    ]
    let ant: number[] | null = null
    nosBraco.forEach(([pos, raio, cor], idx) => {
      const anel = anelH(pos, raio, raio, 10, {
        c: cor,
        s: cor === 0 ? 1.15 : 0.85,
      })
      if (ant) {
        for (let m = 0; m < 10; m += 2) b.aresta(ant[m], anel[m])
      }
      // Disco circular na junta do cotovelo
      if (idx === 3) {
        discoPlano([pos[0], pos[1], pos[2] - 0.085], 0.055, 'z', 10, { s: 1.25 })
      }
      ant = anel
    })

    // Mão robótica esbelta (palma + polegar interno + dedos levemente curvados)
    const [px, py, pz] = nosBraco[nosBraco.length - 1][0]
    // Polegar apontando levemente para dentro
    b.linha(
      [
        [px - lado * 0.03, py, pz - 0.02],
        [px - lado * 0.055, py - 0.07, pz - 0.04],
        [px - lado * 0.045, py - 0.12, pz - 0.04],
      ],
      passo * 0.7,
      { s: 1.05 },
    )
    // 4 dedos curvados para dentro como na foto
    for (let dIdx = 0; dIdx < 4; dIdx++) {
      const dz = -0.03 + dIdx * 0.02
      b.linha(
        [
          [px + lado * 0.02, py, pz + dz],
          [px + lado * 0.035, py - 0.09, pz + dz - 0.01],
          [px + lado * 0.01, py - 0.16, pz + dz - 0.02],
        ],
        passo * 0.7,
        { s: 1.0 },
      )
    }
  }

  // 7. Plataforma Base e 2 Anéis Orbitais de Governança de IA (ISO/IEC 42001).
  const anelBase = anelH([0, -0.96, 0], 1.12, 1.12, Math.round(60 * d), {
    c: 1,
    s: 0.75,
    f: -2,
  })
  anelH([0, -0.96, 0], 0.76, 0.76, Math.round(42 * d), { s: 0.95 })

  const planosOrbita: [number, number, number][] = [
    [rad(20), rad(-16), 1.34],
    [rad(-24), rad(22), 1.42],
  ]
  planosOrbita.forEach(([ax, az, raio], q) => {
    const N = Math.round(72 * d)
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      const pt = girar([Math.cos(a) * raio, 0.04, Math.sin(a) * raio], ax, az)
      ids.push(
        b.ponto(pt, {
          c: q === 0 ? 0 : 1,
          s: 0.7,
          f: -a * 2 + q * 3,
        }),
      )
    }
    b.cadeia(ids, true)
  })

  // Âncoras frontais bem distribuídas para os 8 rótulos
  const ancTopo = b.ponto([0.14, 0.96, -0.22], { g: gCab, s: 0 })
  const ancOmbroDir = b.ponto([0.52, 0.36, -0.2], { s: 0 })
  const ancOmbroEsq = b.ponto([-0.52, 0.34, -0.2], { s: 0 })
  const ancMaoDir = b.ponto([0.64, -0.24, -0.22], { s: 0 })
  const ancMaoEsq = b.ponto([-0.64, -0.22, -0.22], { s: 0 })
  const ancBaseEsq = b.ponto([-0.74, -0.84, -0.4], { s: 0 })
  const ancBaseDir = b.ponto([0.74, -0.78, -0.4], { s: 0 })

  b.rotulo(ancTopo, r[0], 0)
  b.rotulo(ancOmbroDir, r[1], 1)
  b.rotulo(centroPeito, r[2], 0)
  b.rotulo(ancMaoDir, r[3], 0)
  b.rotulo(ancBaseEsq, r[4], 1)
  b.rotulo(ancBaseDir, r[5], 1)
  b.rotulo(ancOmbroEsq, r[6], 0)
  if (r[7]) b.rotulo(anelBase[Math.round(anelBase.length * 0.75)], r[7], 1)
  b.limiarRotulo = 0.24

  const corpo: Grupo = { rumo: -0.14, balanco: 0.22, amplitude: 0.28, inclinacao: 0.12 }
  return b.fechar(
    [
      corpo,
      {
        ...corpo,
        local: {
          eixo: 'y',
          vel: 0.65,
          amplitude: 0.22,
          centro: [0, cyCab + b.origem[1], 0],
        },
      },
    ],
    1.48,
    1.14,
    1.35,
    0.58,
  )
}

// ESG: Turbinas de energia eólica com grandes hélices girando na parte superior +
// Usina de placas solares fotovoltaicas inclinadas na parte inferior, no mesmo Canva.
function esg({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Geração eólica · Energia limpa',
    'Sistema solar fotovoltaico',
    'Descarbonização · Escopos 1, 2 e 3',
    'Dupla materialidade',
    'GRI · SASB · IFRS S1/S2',
  ]
  const passo = 0.075 / d
  b.origem = [0, -0.06, 0]
  const ySolo = -0.82

  // 1. Terreno em malha + Linhas Coletoras de Energia Limpa.
  const gx = d < 1 ? 9 : 13
  const gz = d < 1 ? 6 : 8
  const terreno: number[][] = []
  for (let a = 0; a < gx; a++) {
    terreno.push([])
    for (let c = 0; c < gz; c++) {
      const x = -1.56 + (3.12 * a) / (gx - 1)
      const z = -0.78 + (1.56 * c) / (gz - 1)
      terreno[a].push(b.ponto([x, ySolo, z], { c: 1, s: 0.45 }))
    }
  }
  for (let a = 0; a < gx; a++) b.cadeia(terreno[a])
  for (let c = 0; c < gz; c++) b.cadeia(terreno.map((l) => l[c]))

  // 2. Na parte de baixo (z frontal): Usina de Placas Solares Fotovoltaicas (2 fileiras x 4 trackers).
  const fileirasZ = [-0.52, -0.14]
  const modulosX = [-1.14, -0.38, 0.38, 1.14]
  const largM = 0.31
  const profM = 0.14
  const dyInc = 0.095 // inclinação dos módulos fotovoltaicos voltados para o sol
  let ancoraSolar = 0

  fileirasZ.forEach((zc, fIdx) => {
    // Barramento coletor sob a fileira de placas solares (com pulso de energia correndo)
    b.segmento([-1.42, ySolo + 0.02, zc], [1.42, ySolo + 0.02, zc], Math.round(28 * d) + 6, {
      s: 1.15,
      f: -fIdx * 2,
    })

    modulosX.forEach((xc, mIdx) => {
      const yFrente = ySolo + 0.08
      const yTras = yFrente + dyInc * 2
      const zFrente = zc - profM
      const zTras = zc + profM

      // Pés de fixação metálica da estrutura solar no solo
      for (const sx of [-0.22, 0.22]) {
        b.segmento([xc + sx, ySolo, zFrente + 0.02], [xc + sx, yFrente, zFrente + 0.02], 2, {
          c: 1,
          s: 0.65,
        })
        b.segmento([xc + sx, ySolo, zTras - 0.02], [xc + sx, yTras, zTras - 0.02], 3, {
          c: 1,
          s: 0.65,
        })
      }

      // Moldura externa do módulo fotovoltaico em ouro
      const c0 = b.ponto([xc - largM, yFrente, zFrente], { s: 1.2 })
      const c1 = b.ponto([xc + largM, yFrente, zFrente], { s: 1.2 })
      const c2 = b.ponto([xc + largM, yTras, zTras], { s: 1.2 })
      const c3 = b.ponto([xc - largM, yTras, zTras], { s: 1.2 })
      b.ligar(c0, c1, passo * 0.9, { s: 1.05 })
      b.ligar(c1, c2, passo * 0.9, { s: 1.05 })
      b.ligar(c2, c3, passo * 0.9, { s: 1.05 })
      b.ligar(c3, c0, passo * 0.9, { s: 1.05 })

      // Malha interna das células solares fotovoltaicas (busbars longitudinais e transversais)
      for (const fracX of [-0.5, 0, 0.5]) {
        const xm = xc + fracX * largM * 2
        b.segmento([xm, yFrente, zFrente], [xm, yTras, zTras], 4, {
          c: 1,
          s: 0.65,
          f: -xm * 2,
        })
      }
      for (const fracZ of [0.33, 0.67]) {
        const ym = yFrente + (yTras - yFrente) * fracZ
        const zm = zFrente + (zTras - zFrente) * fracZ
        b.segmento([xc - largM, ym, zm], [xc + largM, ym, zm], 6, {
          c: fIdx === 0 && fracZ === 0.33 ? 0 : 1,
          s: 0.7,
          f: -xc * 2,
        })
      }

      if (fIdx === 0 && mIdx === 1) ancoraSolar = c3
    })
  })

  // 3. Na parte de cima (z posterior): 3 Turbinas Eólicas com Grandes Hélices de 3 Pás Girando.
  const turbinas: [number, number, number, number, number][] = [
    [-0.92, 0.34, 0.44, 0.52, 1], // turbina esquerda (x, z, yCubo, raioHelice, grupo)
    [0.0, 0.42, 0.62, 0.62, 2], // turbina central principal (bem alta e hélice grande!)
    [0.92, 0.34, 0.44, 0.52, 3], // turbina direita
  ]

  const grupos: Grupo[] = []
  const base: Grupo = { rumo: 0.14, balanco: 0.18, amplitude: 0.24, inclinacao: 0.24 }
  grupos.push(base)

  let cuboCentral = 0
  let cuboEsq = 0
  let cuboDir = 0

  turbinas.forEach(([xt, zt, yTopo, rPas, gIdx], idx) => {
    // Base de fundação e Torre tubular cônica esbelta (anéis horizontais + geratrizes)
    const nNiveis = 7
    const rBase = idx === 1 ? 0.085 : 0.072
    const rTopo = idx === 1 ? 0.042 : 0.036
    let anelAnt: number[] | null = null
    for (let k = 0; k <= nNiveis; k++) {
      const t = k / nNiveis
      const y = ySolo + (yTopo - ySolo) * t
      const rT = rBase + (rTopo - rBase) * t
      const nA = 8
      const anel: number[] = []
      for (let m = 0; m < nA; m++) {
        const a = (m / nA) * Math.PI * 2
        anel.push(
          b.ponto([xt + Math.cos(a) * rT, y, zt + Math.sin(a) * rT], {
            c: k === 0 || k === nNiveis ? 0 : 1,
            s: k === 0 ? 1.0 : 0.75,
            f: -t * 5,
          }),
        )
      }
      b.cadeia(anel, true)
      if (anelAnt) {
        for (let m = 0; m < nA; m += 2) b.aresta(anelAnt[m], anel[m])
      }
      anelAnt = anel
    }

    // Nacele aerodinâmica no topo da torre
    caixa(
      b,
      [xt - rTopo * 1.3, yTopo - 0.04, zt - 0.1],
      [xt + rTopo * 1.3, yTopo + 0.05, zt + 0.14],
      passo,
      { s: 1.05 },
    )

    // Rotor e 3 Grandes Pás Aerodinâmicas no grupo local `gIdx` (giram continuamente no eixo Z)
    const zRotor = zt - 0.12
    const cubo = b.ponto([xt, yTopo, zRotor - 0.02], { g: gIdx, s: 2.6, f: 0 })
    if (idx === 1) cuboCentral = cubo
    if (idx === 0) cuboEsq = cubo
    if (idx === 2) cuboDir = cubo

    // Anel do spinner (nariz do rotor)
    const spinner: number[] = []
    for (let m = 0; m < 10; m++) {
      const a = (m / 10) * Math.PI * 2
      spinner.push(
        b.ponto([xt + Math.cos(a) * 0.048, yTopo + Math.sin(a) * 0.048, zRotor], {
          g: gIdx,
          s: 1.2,
        }),
      )
    }
    b.cadeia(spinner, true)

    // 3 Pás bem grandes com perfil de aerofólio (bordo de ataque, bordo de fuga curvo e nervuras)
    for (let pIdx = 0; pIdx < 3; pIdx++) {
      const angBase = rad(pIdx * 120 + idx * 25)
      const ca = Math.cos(angBase)
      const sa = Math.sin(angBase)
      const nx = -sa
      const ny = ca

      const nSeg = 9
      const bordoAtaque: number[] = []
      const bordoFuga: number[] = []
      for (let k = 1; k <= nSeg; k++) {
        const u = k / nSeg
        const dist = 0.05 + (rPas - 0.05) * u
        // Largura da pá (corda do aerofólio): máxima em u=0.28 e afila até a ponta
        const corda = rPas * 0.13 * Math.sin(Math.pow(u, 0.65) * Math.PI)
        const pA: V3 = [
          xt + ca * dist + nx * corda * 0.35,
          yTopo + sa * dist + ny * corda * 0.35,
          zRotor - 0.005 * u,
        ]
        const pF: V3 = [
          xt + ca * dist - nx * corda * 0.85,
          yTopo + sa * dist - ny * corda * 0.85,
          zRotor + 0.015 * (1 - u),
        ]
        const idA = b.ponto(pA, { g: gIdx, s: u > 0.85 ? 1.6 : 1.15, f: -u * 3 })
        const idF = b.ponto(pF, { g: gIdx, c: 1, s: 0.85 })
        bordoAtaque.push(idA)
        bordoFuga.push(idF)
        if (k % 2 === 1 || k === nSeg) b.aresta(idA, idF)
      }
      b.cadeia([cubo, ...bordoAtaque])
      b.cadeia([cubo, ...bordoFuga])
      b.aresta(bordoAtaque[bordoAtaque.length - 1], bordoFuga[bordoFuga.length - 1])
    }

    grupos.push({
      ...base,
      local: {
        eixo: 'z',
        vel: idx === 1 ? -0.95 : -0.82,
        centro: [xt + b.origem[0], yTopo + b.origem[1], zRotor],
      },
    })
  })

  // Âncoras frontais bem distribuídas para os 5 rótulos ESG (sem sobreposição)
  const ancEolica = b.ponto([0.04, 0.94, -0.15], { s: 0 })
  const ancSolarEsq = b.ponto([-1.14, -0.56, -0.62], { s: 0 })
  const ancDescarb = b.ponto([-0.92, 0.52, -0.15], { s: 0 })
  const ancDuplaMat = b.ponto([0.98, 0.56, -0.15], { s: 0 })
  const ancFrameworks = b.ponto([1.08, -0.68, -0.62], { s: 0 })

  b.rotulo(ancEolica, r[0], 0)
  b.rotulo(ancSolarEsq || ancoraSolar || cuboEsq, r[1], 0)
  b.rotulo(ancDescarb, r[2], 1)
  b.rotulo(ancDuplaMat, r[3], 0)
  b.rotulo(ancFrameworks, r[4], 1)
  b.limiarRotulo = 0.24

  return b.fechar(grupos, 1.58, 1.08, 1.4, 0.52)
}

// ISO 37001 (Opção A): Balança Clássica da Integridade em equilíbrio dinâmico + Escudo Facetado de Compliance.
function balanca({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'ISO 37001 · Antissuborno',
    'Due diligence de terceiros',
    'Canal de denúncia',
    'Controles financeiros e comerciais',
    'Cultura de integridade',
  ]
  const passo = 0.075 / d
  b.origem = [0, -0.02, 0]
  const yBase = -0.84

  // 1. Pedestal Escalonado e Coluna Central da Integridade.
  for (const [dy, raio, cor, s] of [
    [0.0, 0.56, 0, 1.2],
    [0.08, 0.44, 1, 0.85],
    [0.16, 0.3, 0, 1.1],
  ] as const) {
    const nA = 24
    const ids: number[] = []
    for (let k = 0; k < nA; k++) {
      const a = (k / nA) * Math.PI * 2
      ids.push(b.ponto([Math.cos(a) * raio, yBase + dy, Math.sin(a) * raio], { c: cor, s }))
    }
    b.cadeia(ids, true)
  }

  // Coluna canelada até o fulcro superior (y = 0.62)
  const yFulcro = 0.62
  for (let k = 0; k <= 8; k++) {
    const t = k / 8
    const y = yBase + 0.16 + (yFulcro - (yBase + 0.16)) * t
    const rCol = 0.095 - 0.025 * Math.sin(t * Math.PI)
    const anel: number[] = []
    for (let m = 0; m < 10; m++) {
      const a = (m / 10) * Math.PI * 2
      anel.push(
        b.ponto([Math.cos(a) * rCol, y, Math.sin(a) * rCol], {
          c: k % 2 === 0 ? 0 : 1,
          s: 0.9,
          f: -t * 5,
        }),
      )
    }
    b.cadeia(anel, true)
  }
  b.segmento([0, yBase + 0.16, 0], [0, yFulcro + 0.18, 0], 14, { s: 1.5 })
  const topoFulcro = b.ponto([0, yFulcro + 0.2, 0], { s: 2.8, f: 0 })

  // 2. Travessão da Balança e 2 Pratos Suspensos por Correntes (Grupo 1: oscilação de equilíbrio).
  const gBal = 1
  const L = 0.78
  // Dupla viga do travessão em ouro
  b.segmento([-L, yFulcro, -0.03], [L, yFulcro, -0.03], 18, { g: gBal, s: 1.55 })
  b.segmento([-L, yFulcro, 0.03], [L, yFulcro, 0.03], 18, { g: gBal, s: 1.25 })
  b.linha(
    [
      [-L, yFulcro, 0],
      [0, yFulcro + 0.14, 0],
      [L, yFulcro, 0],
    ],
    passo,
    { g: gBal, c: 1, s: 0.95 },
  )

  for (const lado of [-1, 1]) {
    const xp = lado * L
    const yp = -0.12
    const rPrato = 0.28
    // 4 correntes de suspensão do travessão até a borda do prato
    for (let cIdx = 0; cIdx < 4; cIdx++) {
      const a = (cIdx / 4) * Math.PI * 2 + Math.PI / 4
      b.segmento(
        [xp, yFulcro, 0],
        [xp + Math.cos(a) * rPrato, yp, Math.sin(a) * rPrato],
        8,
        { g: gBal, c: 1, s: 0.85, f: -cIdx },
      )
    }
    // Prato em calota rasa (2 anéis concêntricos em ouro)
    for (const [fR, dy, cor] of [
      [1.0, 0, 0],
      [0.65, -0.05, 1],
      [0.25, -0.07, 0],
    ] as const) {
      const nP = 18
      const ids: number[] = []
      for (let k = 0; k < nP; k++) {
        const a = (k / nP) * Math.PI * 2
        ids.push(
          b.ponto([xp + Math.cos(a) * rPrato * fR, yp + dy, Math.sin(a) * rPrato * fR], {
            g: gBal,
            c: cor,
            s: cor === 0 ? 1.25 : 0.8,
          }),
        )
      }
      b.cadeia(ids, true)
    }
  }

  // 3. Escudo Facetado / Anéis de Proteção de Compliance ao redor da Balança.
  const perfilEscudo: [number, number][] = [
    [0, 1.06],
    [0.68, 0.92],
    [1.18, 0.56],
    [1.12, -0.18],
    [0.68, -0.72],
    [0, -1.04],
    [-0.68, -0.72],
    [-1.12, -0.18],
    [-1.18, 0.56],
    [-0.68, 0.92],
  ]
  for (const zEsc of [-0.36, 0.36]) {
    b.linha(
      perfilEscudo.map(([x, y]) => [x, y, zEsc] as V3),
      passo * 1.1,
      { c: zEsc < 0 ? 0 : 1, s: zEsc < 0 ? 1.15 : 0.65, f: zEsc < 0 ? 0 : NaN },
      true,
    )
  }

  const ancTopo = b.ponto([0.08, 0.92, -0.36], { s: 0 })
  const ancEsq = b.ponto([-0.78, 0.58, -0.34], { s: 0 })
  const ancDir = b.ponto([0.82, 0.24, -0.34], { s: 0 })
  const ancPratoEsq = b.ponto([-0.78, -0.22, -0.32], { s: 0 })
  const ancBase = b.ponto([0.52, -0.78, -0.34], { s: 0 })

  b.rotulo(ancTopo || topoFulcro, r[0], 0)
  b.rotulo(ancEsq, r[1], 1)
  b.rotulo(ancDir, r[2], 0)
  b.rotulo(ancPratoEsq, r[3], 0)
  b.rotulo(ancBase, r[4], 1)
  b.limiarRotulo = 0.24

  const base: Grupo = { rumo: -0.14, balanco: 0.2, amplitude: 0.28, inclinacao: 0.16 }
  return b.fechar(
    [
      base,
      {
        ...base,
        local: {
          eixo: 'z',
          vel: 0.95,
          amplitude: 0.11,
          centro: [0, yFulcro + b.origem[1], 0],
        },
      },
    ],
    1.38,
    1.12,
    1.3,
    0.52,
  )
}

// ISO 37001 (Opção B): Escudo Corporativo 3D de Integridade com Check de Conformidade +
// Anéis de Bloqueio Antissuborno e Feixe de Auditoria de Terceiros (Due Diligence).
function escudo({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'ISO 37001 · Antissuborno',
    'Due diligence de terceiros',
    'Canal de denúncia',
    'Controles financeiros e comerciais',
    'Cultura de integridade',
  ]
  const passo = 0.07 / d
  b.origem = [0, 0.0, 0]

  // 1. Escudo Heráldico Facetado em 3D (duas camadas com nervuras de diamante).
  const contorno: [number, number][] = [
    [0, 0.96],
    [0.48, 0.88],
    [0.84, 0.68],
    [0.82, 0.08],
    [0.54, -0.52],
    [0, -0.98],
    [-0.54, -0.52],
    [-0.82, 0.08],
    [-0.84, 0.68],
    [-0.48, 0.88],
  ]
  const nC = contorno.length
  const frenteIds: number[] = []
  const costasIds: number[] = []
  const intIds: number[] = []

  for (let k = 0; k < nC; k++) {
    const [x, y] = contorno[k]
    frenteIds.push(b.ponto([x, y, -0.16], { s: 1.5, f: -k * 0.6 }))
    costasIds.push(b.ponto([x * 0.92, y * 0.92, 0.16], { c: 1, s: 0.8 }))
    intIds.push(b.ponto([x * 0.72, y * 0.72, -0.22], { c: 1, s: 1.0 }))
  }
  for (let k = 0; k < nC; k++) {
    const prox = (k + 1) % nC
    b.ligar(frenteIds[k], frenteIds[prox], passo * 0.9, { s: 1.3 })
    b.ligar(costasIds[k], costasIds[prox], passo * 1.1, { c: 1, s: 0.75 })
    b.ligar(intIds[k], intIds[prox], passo, { c: 1, s: 0.9 })
    b.aresta(frenteIds[k], costasIds[k])
    b.aresta(frenteIds[k], intIds[k])
  }

  // Grande Check (✓) de Integridade e Conformidade em ouro no centro do escudo
  const pCheck1: V3 = [-0.34, -0.02, -0.28]
  const pCheck2: V3 = [-0.08, -0.3, -0.3]
  const pCheck3: V3 = [0.42, 0.28, -0.28]
  for (const dy of [-0.04, 0, 0.04]) {
    b.linha(
      [
        [pCheck1[0], pCheck1[1] + dy, pCheck1[2]],
        [pCheck2[0], pCheck2[1] + dy, pCheck2[2]],
        [pCheck3[0], pCheck3[1] + dy, pCheck3[2]],
      ],
      passo * 0.65,
      { s: dy === 0 ? 2.4 : 1.35, f: 0 },
    )
  }

  // 2. Dois Anéis de Bloqueio / Filtro de Due Diligence girando ao redor (Grupo 1).
  const gAnel = 1
  for (const [raio, ax, az, cor] of [
    [1.22, rad(18), rad(-14), 0],
    [1.38, rad(-22), rad(20), 1],
  ] as const) {
    const N = Math.round(72 * d)
    const ids: number[] = []
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      ids.push(
        b.ponto(girar([Math.cos(a) * raio, 0, Math.sin(a) * raio], ax, az), {
          g: gAnel,
          c: cor,
          s: k % 9 === 0 ? 2.2 : 0.75,
          f: -a * 2,
        }),
      )
    }
    b.cadeia(ids, true)
  }

  const ancTopo = b.ponto([0.1, 0.92, -0.28], { s: 0 })
  const ancEsq = b.ponto([-0.86, 0.36, -0.28], { s: 0 })
  const ancDir = b.ponto([0.86, 0.36, -0.28], { s: 0 })
  const ancBaixoEsq = b.ponto([-0.68, -0.52, -0.28], { s: 0 })
  const ancBaixoDir = b.ponto([0.62, -0.68, -0.28], { s: 0 })

  b.rotulo(ancTopo, r[0], 0)
  b.rotulo(ancEsq, r[1], 1)
  b.rotulo(ancDir, r[2], 0)
  b.rotulo(ancBaixoEsq, r[3], 0)
  b.rotulo(ancBaixoDir, r[4], 1)
  b.limiarRotulo = 0.24

  const base: Grupo = { rumo: -0.14, balanco: 0.22, amplitude: 0.3, inclinacao: 0.14 }
  return b.fechar(
    [
      base,
      {
        ...base,
        local: {
          eixo: 'y',
          vel: 0.45,
          centro: [0, 0, 0],
        },
      },
    ],
    1.45,
    1.12,
    1.35,
    0.55,
  )
}

// ESG (Sugestão AGI — Opção A): Tríade E · S · G sobre a Matriz de Dupla Materialidade
// E (Esquerda): Turbinas eólicas girando + placas solares fotovoltaicas
// S (Centro): Biosfera geodésica + rede conectada de pessoas (comunidade e cadeia de valor)
// G (Direita): Estrutura de Pilares de Governança Corporativa + frontão de conformidade
function esgTriade({ densidade: d, rotulos }: OpcoesForma): Forma {
  const b = new Construtor()
  const r = rotulos ?? [
    'Ambiental (E) · Energia limpa',
    'Social (S) · Pessoas e cadeia',
    'Governança (G) · Ética e compliance',
    'Matriz de dupla materialidade',
    'GRI · SASB · IFRS S1/S2',
  ]
  const passo = 0.075 / d
  b.origem = [0, -0.04, 0]
  const ySolo = -0.78

  // 1. Plataforma Base: Matriz 3D de Dupla Materialidade com Eixos Cruzados e Setas em Ouro.
  const gx = d < 1 ? 9 : 13
  const gz = d < 1 ? 5 : 7
  const grade: number[][] = []
  for (let a = 0; a < gx; a++) {
    grade.push([])
    for (let c = 0; c < gz; c++) {
      const x = -1.52 + (3.04 * a) / (gx - 1)
      const z = -0.62 + (1.24 * c) / (gz - 1)
      grade[a].push(b.ponto([x, ySolo, z], { c: 1, s: 0.45 }))
    }
  }
  for (let a = 0; a < gx; a++) b.cadeia(grade[a])
  for (let c = 0; c < gz; c++) b.cadeia(grade.map((l) => l[c]))
  // Moldura e eixos principais da Dupla Materialidade (Impacto x Financeiro) em ouro
  caixa(b, [-1.54, ySolo - 0.05, -0.64], [1.54, ySolo, 0.64], passo * 1.3, { s: 0.9 })
  b.segmento([-1.48, ySolo + 0.01, -0.62], [1.48, ySolo + 0.01, 0.62], 22, { s: 1.3, f: -2 })
  b.segmento([-1.48, ySolo + 0.01, 0.62], [1.48, ySolo + 0.01, -0.62], 22, { s: 1.3, f: 2 })

  const grupos: Grupo[] = []
  const base: Grupo = { rumo: 0.12, balanco: 0.18, amplitude: 0.24, inclinacao: 0.22 }
  grupos.push(base)

  // 2. PILAR E (Esquerda, x = -1.0): Aerogerador de Grande Porte + Placas Solares na Base.
  const xe = -1.02
  const ze = 0.08
  const yTopoE = 0.46
  const rPasE = 0.48
  const gEolica = 1
  // Torre cônica do aerogerador
  for (let k = 0; k <= 6; k++) {
    const t = k / 6
    const y = ySolo + (yTopoE - ySolo) * t
    const rT = 0.075 - 0.038 * t
    const anel: number[] = []
    for (let m = 0; m < 8; m++) {
      const a = (m / 8) * Math.PI * 2
      anel.push(
        b.ponto([xe + Math.cos(a) * rT, y, ze + Math.sin(a) * rT], {
          c: k === 0 || k === 6 ? 0 : 1,
          s: 0.8,
        }),
      )
    }
    b.cadeia(anel, true)
  }
  b.segmento([xe, ySolo, ze], [xe, yTopoE, ze], 10, { s: 1.1, f: -2 })
  const zRotorE = ze - 0.09
  const cuboE = b.ponto([xe, yTopoE, zRotorE], { g: gEolica, s: 2.5, f: 0 })
  for (let pIdx = 0; pIdx < 3; pIdx++) {
    const ang = rad(pIdx * 120 + 15)
    const ca = Math.cos(ang)
    const sa = Math.sin(ang)
    const nx = -sa
    const ny = ca
    const atk: number[] = []
    const fug: number[] = []
    for (let k = 1; k <= 7; k++) {
      const u = k / 7
      const dist = 0.04 + (rPasE - 0.04) * u
      const corda = rPasE * 0.13 * Math.sin(Math.pow(u, 0.65) * Math.PI)
      const idA = b.ponto([xe + ca * dist + nx * corda * 0.35, yTopoE + sa * dist + ny * corda * 0.35, zRotorE], {
        g: gEolica,
        s: 1.2,
      })
      const idF = b.ponto([xe + ca * dist - nx * corda * 0.85, yTopoE + sa * dist - ny * corda * 0.85, zRotorE + 0.01], {
        g: gEolica,
        c: 1,
        s: 0.85,
      })
      atk.push(idA)
      fug.push(idF)
      if (k % 2 === 1 || k === 7) b.aresta(idA, idF)
    }
    b.cadeia([cuboE, ...atk])
    b.cadeia([cuboE, ...fug])
  }
  grupos.push({
    ...base,
    local: { eixo: 'z', vel: -0.95, centro: [xe + b.origem[0], yTopoE + b.origem[1], zRotorE] },
  })

  // 2 Módulos Solares Fotovoltaicos inclinados aos pés do aerogerador (x = -1.24 e -0.78)
  for (const xs of [-1.24, -0.78]) {
    const yF = ySolo + 0.06
    const yT = ySolo + 0.22
    const zF = -0.44
    const zT = -0.14
    const c0 = b.ponto([xs - 0.19, yF, zF], { s: 1.15 })
    const c1 = b.ponto([xs + 0.19, yF, zF], { s: 1.15 })
    const c2 = b.ponto([xs + 0.19, yT, zT], { s: 1.15 })
    const c3 = b.ponto([xs - 0.19, yT, zT], { s: 1.15 })
    b.cadeia([c0, c1, c2, c3], true)
    b.segmento([xs, yF, zF], [xs, yT, zT], 4, { c: 1, s: 0.7 })
    b.segmento([xs - 0.19, (yF + yT) / 2, (zF + zT) / 2], [xs + 0.19, (yF + yT) / 2, (zF + zT) / 2], 4, {
      s: 0.85,
      f: -xs,
    })
  }

  // 3. PILAR S (Centro, x = 0.0): Biosfera Geodésica + Rede de Pessoas Conectadas (Grupo 2).
  const gSocial = 2
  const yBio = 0.22
  const rBio = 0.36
  const nosBio = esfera(Math.max(36, Math.round(58 * d)), rBio).map((p) =>
    b.ponto([p[0], yBio + p[1], p[2]], { g: gSocial, c: 1, s: 0.85 }),
  )
  b.vizinhos(nosBio, 2)
  // Anel equatorial dourado na biosfera
  const eqBio: number[] = []
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2
    eqBio.push(
      b.ponto([Math.cos(a) * (rBio + 0.02), yBio, Math.sin(a) * (rBio + 0.02)], {
        g: gSocial,
        s: 1.25,
        f: -a,
      }),
    )
  }
  b.cadeia(eqBio, true)

  // 3 Silhuetas Humanas Estilizadas conectadas em roda sob a biosfera (Pilar Social)
  const rRodaS = 0.32
  const anelSocial: number[] = []
  for (let k = 0; k < 28; k++) {
    const a = (k / 28) * Math.PI * 2
    anelSocial.push(
      b.ponto([Math.cos(a) * rRodaS, ySolo + 0.28, Math.sin(a) * rRodaS], {
        s: 1.2,
        f: -a * 2,
      }),
    )
  }
  b.cadeia(anelSocial, true)

  for (let pIdx = 0; pIdx < 3; pIdx++) {
    const a = rad(pIdx * 120 - 90)
    const px = Math.cos(a) * rRodaS
    const pz = Math.sin(a) * rRodaS
    const tx = -Math.sin(a)
    const tz = Math.cos(a)
    // Cabeça da figura humana
    const cab = esfera(8, 0.048).map((pt) =>
      b.ponto([px + pt[0], ySolo + 0.44 + pt[1], pz + pt[2]], { s: 1.4 }),
    )
    b.vizinhos(cab, 2)
    // Tronco e pernas até o piso
    b.segmento([px, ySolo + 0.16, pz], [px, ySolo + 0.38, pz], 4, { s: 1.25 })
    b.segmento([px - tx * 0.05, ySolo, pz - tz * 0.05], [px, ySolo + 0.16, pz], 3, { c: 1, s: 0.9 })
    b.segmento([px + tx * 0.05, ySolo, pz + tz * 0.05], [px, ySolo + 0.16, pz], 3, { c: 1, s: 0.9 })
    // Braços abertos conectando na roda social
    b.segmento(
      [px - tx * 0.14, ySolo + 0.28, pz - tz * 0.14],
      [px + tx * 0.14, ySolo + 0.28, pz + tz * 0.14],
      5,
      { s: 1.15 },
    )
  }
  grupos.push({
    ...base,
    local: { eixo: 'y', vel: 0.45, centro: [0, yBio + b.origem[1], 0] },
  })

  // 4. PILAR G (Direita, x = 1.0): Estrutura de Pilares de Governança Corporativa + Frontão.
  const xg = 1.02
  const zg = 0.0
  const yBaseG = ySolo + 0.08
  const yTopoG = 0.28
  // Base escalonada (pódio de governança)
  caixa(b, [xg - 0.36, ySolo, zg - 0.26], [xg + 0.36, yBaseG, zg + 0.26], passo, { s: 1.15 })
  // 4 Colunas Clássicas de Governança (com pulso subindo)
  for (const cxCol of [xg - 0.27, xg - 0.09, xg + 0.09, xg + 0.27]) {
    for (const czCol of [zg - 0.16, zg + 0.16]) {
      b.segmento([cxCol, yBaseG, czCol], [cxCol, yTopoG, czCol], 8, {
        c: czCol < 0 ? 0 : 1,
        s: czCol < 0 ? 1.25 : 0.75,
        f: -1.5,
      })
    }
  }
  // Arquitrave e Frontão Triangular de Conformidade (teto de Governança)
  caixa(b, [xg - 0.36, yTopoG, zg - 0.24], [xg + 0.36, yTopoG + 0.07, zg + 0.24], passo, {
    s: 1.2,
  })
  for (const zf of [zg - 0.24, zg + 0.24]) {
    b.linha(
      [
        [xg - 0.38, yTopoG + 0.07, zf],
        [xg, yTopoG + 0.34, zf],
        [xg + 0.38, yTopoG + 0.07, zf],
      ],
      passo * 0.9,
      { c: zf < 0 ? 0 : 1, s: zf < 0 ? 1.35 : 0.8 },
      true,
    )
  }
  b.segmento([xg, yTopoG + 0.34, zg - 0.24], [xg, yTopoG + 0.34, zg + 0.24], 5, { s: 1.25 })

  // 5. Arcos Superiores de Integração E ↔ S ↔ G.
  const nArco = 28
  const arcoESG: number[] = []
  for (let k = 0; k <= nArco; k++) {
    const t = k / nArco
    const x = -1.02 + 2.04 * t
    const y = 0.52 + 0.34 * Math.sin(t * Math.PI)
    arcoESG.push(b.ponto([x, y, -0.05], { s: 1.25, f: -t * 6 }))
  }
  b.cadeia(arcoESG)

  const ancE = b.ponto([-0.98, 0.54, -0.2], { s: 0 })
  const ancS = b.ponto([0.0, 0.22, -0.38], { s: 0 })
  const ancG = b.ponto([0.98, 0.76, -0.24], { s: 0 })
  const ancMat = b.ponto([-1.06, -0.46, -0.52], { s: 0 })
  const ancGri = b.ponto([0.92, ySolo - 0.04, -0.62], { s: 0 })

  b.rotulo(ancE, r[0], 0)
  b.rotulo(ancS, r[1], 1)
  b.rotulo(ancG, r[2], 0)
  b.rotulo(ancMat, r[3], 0)
  b.rotulo(ancGri, r[4], 1)
  b.limiarRotulo = 0.24

  return b.fechar(grupos, 1.58, 1.04, 1.35, 0.52)
}

const limitar01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export const FORMAS: Record<string, (o: OpcoesForma) => Forma | Promise<Forma>> = {
  logo,
  pdca,
  globo,
  pulso,
  rede,
  numero,
  predio,
  chassi,
  viaduto,
  caminhao,
  laboratorio,
  humanoide,
  esg,
  esgTriade,
  balanca,
  escudo,
  radar,
  engrenagens,
  auditoria,
  evolucao,
}
