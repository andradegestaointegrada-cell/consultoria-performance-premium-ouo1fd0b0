migrate(
  (app) => {
    const articles = app.findCollectionByNameOrId('articles')

    const seedData = [
      {
        title:
          'ISO 14001:2026: A Janela de Oportunidade que Gestores Visionários Não Podem Ignorar',
        slug: 'iso-14001-2026-janela-oportunidade',
        summary:
          'A gestão ambiental está prestes a dar um passo importante. Entenda as mudanças da nova ISO 14001:2026 e como se antecipar para ganhar eficiência operacional.',
        category: 'Sustentabilidade Corporativa',
        published_date: '2026-04-20 10:00:00.000Z',
        content: `
        <h2>A gestão ambiental está prestes a dar um passo importante.</h2>
        <p>A nova <strong>ISO 14001:2026</strong> trará mudanças significativas. É essencial que líderes e gestores se preparem agora para transformar essas exigências em vantagens competitivas estruturais.</p>
        
        <h3>Os 5 Pontos Técnicos Fundamentais da Atualização</h3>
        <ul>
          <li><strong>1. Mudanças Climáticas (Climate Change):</strong> A nova versão exige uma análise profunda de como as mudanças climáticas afetam o negócio e como a organização impacta o clima. O alinhamento estratégico com o ESG será crucial para investidores e stakeholders.</li>
          <li><strong>2. Perspectiva de Ciclo de Vida (Lifecycle):</strong> Maior rigor na avaliação dos impactos ambientais desde a extração da matéria-prima até o descarte final do produto, exigindo rastreabilidade e responsabilidade por toda a cadeia de valor.</li>
          <li><strong>3. Gestão de Mudanças (Change Management):</strong> Processos mais robustos para gerenciar alterações operacionais, regulatórias ou de infraestrutura, garantindo que o desempenho ambiental da empresa não seja comprometido em momentos de transição.</li>
          <li><strong>4. Estrutura Harmonizada (Harmonized Structure):</strong> Maior alinhamento com outras normas de gestão (como ISO 9001 e ISO 45001), facilitando profundamente a integração dos sistemas de gestão e reduzindo a sobrecarga e burocracia documental.</li>
          <li><strong>5. Objetivos de Auditoria (Audit Objectives):</strong> Auditorias mais focadas em resultados reais e na eficácia das ações corretivas, indo muito além da simples verificação de conformidade documental. Certificadoras globais de renome como <strong>Ius, QMS Brasil, DQS, BSI, SGS e TÜV Rheinland</strong> já estão calibrando seus critérios de avaliação para este novo patamar de exigência.</li>
        </ul>

        <h3>A Experiência da AGI a seu Favor</h3>
        <p>Com mais de <strong>17 anos de experiência</strong> atuando em certificações de alta complexidade, a Andrade Gestão Integrada (AGI) é a parceira ideal e estratégica para empresas da região do <strong>ABC Paulista e Grande São Paulo</strong>. Nossa abordagem prática, enxuta e focada em resultados reais garante que a sua transição para a ISO 14001:2026 seja suave, livre de não conformidades e agregue valor tangível à sua operação corporativa.</p>
      `,
      },
      {
        title: 'O Futuro da Qualidade ISO 9001:2026',
        slug: 'o-futuro-da-qualidade',
        summary:
          'A transição para a nova versão da norma ISO 9001:2026 traz mudanças significativas que redefinem o conceito de Gestão da Qualidade.',
        category: 'ISO Standards',
        published_date: '2026-03-15 14:00:00.000Z',
        content: `
        <h2>O Caminho para a Excelência</h2>
        <p>Antecipar-se à transição não é apenas uma questão de conformidade, mas sim uma vantagem competitiva. Empresas que adotam precocemente os novos requisitos demonstram resiliência, visão de futuro e compromisso inabalável com a satisfação do cliente.</p>
        <h3>Os Pilares da Alta Performance</h3>
        <ul>
          <li><strong>Contexto:</strong> Compreensão profunda do ambiente de negócios.</li>
          <li><strong>Liderança:</strong> Engajamento total da alta direção e alinhamento com a estratégia.</li>
          <li><strong>Riscos:</strong> Gestão preditiva e preventiva.</li>
          <li><strong>Integração:</strong> Sinergia com tecnologias emergentes e IA.</li>
        </ul>
      `,
      },
    ]

    for (const data of seedData) {
      try {
        app.findFirstRecordByData('articles', 'slug', data.slug)
      } catch (_) {
        const record = new Record(articles)
        record.set('title', data.title)
        record.set('slug', data.slug)
        record.set('summary', data.summary)
        record.set('content', data.content)
        record.set('category', data.category)
        record.set('published_date', data.published_date)
        app.save(record)
      }
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData(
        'articles',
        'slug',
        'iso-14001-2026-janela-oportunidade',
      )
      app.delete(record)
    } catch (_) {}
  },
)
