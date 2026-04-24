migrate(
  (app) => {
    const articles = app.findCollectionByNameOrId('articles')

    // 1. Seed Pit Stop article
    try {
      app.findFirstRecordByData('articles', 'slug', 'pit-stop')
    } catch (_) {
      const record = new Record(articles)
      record.set('title', 'Pit Stop: Alinhamento Estratégico em Alta Velocidade')
      record.set('slug', 'pit-stop')
      record.set(
        'summary',
        'No automobilismo de alta performance, o Pit Stop não é perda de tempo, é uma ação calculada para garantir a vitória. Descubra como aplicar essa pausa na sua empresa.',
      )
      record.set(
        'content',
        `<h1>O Conceito de Pit Stop: Alinhamento Estratégico em Alta Velocidade</h1>
<p>No universo do automobilismo e, mais especificamente, na Fórmula 1, um <strong>Pit Stop</strong> perfeito pode determinar o vencedor de uma corrida. Em poucos segundos, uma equipe altamente sincronizada troca pneus, faz ajustes aerodinâmicos e resolve problemas mecânicos. No ambiente corporativo, a mesma lógica se aplica: é preciso saber a hora exata de parar, avaliar e ajustar a estratégia para não perder a vantagem competitiva.</p>

<h2>Por que sua empresa precisa de um Pit Stop?</h2>
<p>Muitas organizações aceleram rumo aos seus objetivos sem realizar manutenções periódicas em seus processos, lideranças e equipes. O resultado? Desgaste prematuro, falhas de comunicação e perda de eficiência. Um Pit Stop estratégico oferece:</p>
<ul>
  <li><strong>Revisão de Metas:</strong> Alinhamento entre os objetivos traçados e os resultados reais alcançados.</li>
  <li><strong>Ajuste de Rota:</strong> Correção de processos ineficientes antes que se tornem gargalos irreparáveis.</li>
  <li><strong>Sincronia de Equipe:</strong> Fortalecimento da comunicação e do senso de pertencimento entre os colaboradores.</li>
</ul>

<h3>A Metodologia da Andrade Gestão Integrada</h3>
<p>Inspirados pela precisão das equipes de alta performance, desenvolvemos abordagens consultivas que funcionam como verdadeiros Pit Stops para nossos clientes. Durante essas pausas estratégicas, realizamos diagnósticos rápidos e precisos, implementando melhorias que garantem que sua empresa volte à "pista" com força total.</p>

<h2>Prepare sua Equipe para Vencer</h2>
<p>Assim como na pista, o sucesso não depende apenas do piloto, mas de toda a equipe que trabalha nos bastidores. A capacitação contínua e a revisão periódica de metodologias são os pneus novos que sua empresa precisa para manter a aderência nas curvas mais fechadas do mercado.</p>

<p><strong><a href="/contato" class="text-primary hover:underline">Agende um diagnóstico com nossos especialistas</a></strong> e descubra como implementar uma cultura de Pit Stops estratégicos na sua organização.</p>`,
      )
      record.set('category', 'Metodologia')
      record.set('published_date', new Date().toISOString())
      record.set('is_highlighted', false)
      app.save(record)
    }

    // 2. Highlight ISO 14001
    try {
      const records14001 = app.findRecordsByFilter(
        'articles',
        "title ~ 'ISO 14001'",
        '-created',
        1,
        0,
      )
      if (records14001 && records14001.length > 0) {
        const iso14001 = records14001[0]
        iso14001.set('is_highlighted', true)
        app.save(iso14001)
      }
    } catch (err) {
      console.log('Error highlighting ISO 14001:', err)
    }

    // 3. Unhighlight ISO 9001
    try {
      const records9001 = app.findRecordsByFilter(
        'articles',
        "title ~ 'ISO 9001'",
        '-created',
        1,
        0,
      )
      if (records9001 && records9001.length > 0) {
        const iso9001 = records9001[0]
        iso9001.set('is_highlighted', false)
        app.save(iso9001)
      }
    } catch (err) {
      console.log('Error unhighlighting ISO 9001:', err)
    }
  },
  (app) => {
    try {
      const pitStop = app.findFirstRecordByData('articles', 'slug', 'pit-stop')
      app.delete(pitStop)
    } catch (_) {}
  },
)
