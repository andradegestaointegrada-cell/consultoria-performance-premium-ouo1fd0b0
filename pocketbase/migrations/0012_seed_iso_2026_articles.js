migrate(
  (app) => {
    const articlesCol = app.findCollectionByNameOrId('articles')

    // Article 1: ISO 14001:2026
    try {
      app.findFirstRecordByData('articles', 'slug', 'iso-14001-2026-janela-oportunidade')
    } catch (_) {
      const record1 = new Record(articlesCol)
      record1.set(
        'title',
        'ISO 14001:2026: A Janela de Oportunidade que Gestores Visionários Não Podem Ignorar',
      )
      record1.set('slug', 'iso-14001-2026-janela-oportunidade')
      record1.set('category', 'Gestão Ambiental')
      record1.set(
        'summary',
        'A atualização da ISO 14001 prevista para 2026 traz mudanças estratégicas em mudanças climáticas e ciclo de vida.',
      )
      record1.set('published_date', '2024-05-22 12:00:00.000Z')
      record1.set('is_highlighted', false)
      record1.set(
        'content',
        `<h2>A Evolução da Gestão Ambiental para 2026</h2>
<p>A norma ISO 14001 está passando por um processo de revisão contínua, com a próxima versão prevista para 2026. Entidades renomadas do setor de certificação e compliance ambiental, como <strong>Ius</strong>, <strong>QMS Brasil</strong>, <strong>DQS</strong>, <strong>BSI</strong>, <strong>SGS</strong> e <strong>TÜV Rheinland</strong>, vêm discutindo amplamente os rumos dessa atualização e o que isso significa para as empresas que buscam manter ou alcançar a excelência em sustentabilidade.</p>

<h3>Principais Mudanças e Foco Estratégico</h3>
<p>As discussões atuais apontam que a versão 2026 da ISO 14001 trará um foco renovado e mais exigente em áreas cruciais:</p>
<ul>
    <li><strong>Mudanças Climáticas:</strong> A nova diretriz exigirá que as organizações não apenas monitorem, mas atuem ativamente na mitigação e adaptação às mudanças climáticas, integrando essa análise profundamente ao planejamento estratégico e à gestão de riscos da corporação.</li>
    <li><strong>Perspectiva de Ciclo de Vida:</strong> Haverá uma cobrança maior sobre a rastreabilidade e a responsabilidade da cadeia de suprimentos. As empresas deverão demonstrar como gerenciam os impactos ambientais de seus produtos ou serviços desde a concepção, passando pela produção e uso, até o descarte final.</li>
</ul>

<h3>O Papel das Certificadoras</h3>
<p>Líderes de mercado como <strong>SGS</strong>, <strong>BSI</strong> e <strong>TÜV Rheinland</strong> já estão orientando seus auditores para avaliar com mais rigor o alinhamento da liderança com as questões ambientais. A <strong>DQS</strong> e a <strong>QMS Brasil</strong> destacam que a transição para a nova norma exigirá um engajamento genuíno da alta direção, que deverá evidenciar o comprometimento não apenas no papel, mas em ações e investimentos concretos.</p>
<p>Consultorias especializadas, incluindo a <strong>Ius</strong>, recomendam que as organizações iniciem um diagnóstico antecipado para identificar gaps entre as práticas atuais e os novos requisitos esperados. Isso inclui revisar métricas de sustentabilidade, reforçar treinamentos e engajar fornecedores críticos em toda a cadeia de valor.</p>

<h3>Conclusão</h3>
<p>A ISO 14001:2026 não será apenas uma mudança de redação; será uma evolução na forma como as empresas tratam a gestão ambiental como pilar de negócios e competitividade. Gestores visionários que começarem a preparação agora, amparados pelo conhecimento técnico e boas práticas de nomes como QMS Brasil, DQS, BSI, SGS e TÜV Rheinland, terão não só uma transição mais tranquila, mas também uma vantagem competitiva inegável no mercado global.</p>`,
      )
      app.save(record1)
    }

    // Article 2: ISO 9001:2026
    try {
      app.findFirstRecordByData('articles', 'slug', 'iso-9001-2026-sgq-preparado')
    } catch (_) {
      const record2 = new Record(articlesCol)
      record2.set(
        'title',
        'ISO 9001:2026: O SGQ da Sua Empresa Está Preparado para o Que Vem a Seguir?',
      )
      record2.set('slug', 'iso-9001-2026-sgq-preparado')
      record2.set('category', 'Gestão da Qualidade')
      record2.set(
        'summary',
        'Com publicação prevista para setembro de 2026, a nova ISO 9001 foca em cultura de qualidade, ética e mudanças climáticas.',
      )
      record2.set('published_date', '2024-05-22 12:00:00.000Z')
      record2.set('is_highlighted', false)
      record2.set(
        'content',
        `<h2>A Nova Era da Gestão da Qualidade</h2>
<p>A norma mais adotada mundialmente para Sistemas de Gestão da Qualidade está prestes a entrar em uma nova era. Com publicação prevista para setembro de 2026, a atualização da ISO 9001 tem sido objeto de intensos debates entre especialistas, auditores e organizações de referência, como <strong>9001Simplified</strong>, <strong>TÜV Rheinland</strong>, <strong>Traininghouse</strong>, <strong>Certificação ISO</strong>, <strong>BSI</strong> e <strong>Qualyteam</strong>.</p>

<h3>O Que Esperar da Nova Versão?</h3>
<p>A ISO 9001:2026 manterá a Estrutura de Alto Nível harmonizada (Anexo SL), mas trará atualizações significativas para refletir os complexos desafios do cenário empresarial moderno e digital. As principais mudanças e focos esperados incluem:</p>
<ul>
    <li><strong>Cultura de Qualidade:</strong> Mais do que processos documentados e conformidade técnica, a norma exigirá a demonstração de uma cultura organizacional que efetivamente respire qualidade, engajando desde a alta direção até os operadores de linha de frente.</li>
    <li><strong>Ética e Integridade:</strong> A transparência nas operações e o compromisso ético ganharão ainda mais peso, alinhando a gestão da qualidade corporativa com os princípios consolidados de governança e compliance.</li>
    <li><strong>Integração com Mudanças Climáticas:</strong> Acompanhando a resolução recente da ISO, a 9001 passará a considerar explicitamente os impactos das mudanças climáticas no contexto da organização e na sua capacidade de fornecer produtos e serviços conformes de forma consistente e ininterrupta.</li>
</ul>

<h3>Preparação e Visão do Mercado</h3>
<p>Instituições renomadas como a <strong>BSI</strong> e a <strong>TÜV Rheinland</strong> já sinalizam em seus comitês que as auditorias de transição focarão fortemente no pensamento baseado em risco de ponta a ponta e na adaptação a tecnologias emergentes (IA, automação). A <strong>Qualyteam</strong>, especializada em soluções ágeis de gestão, destaca a importância da digitalização avançada do SGQ para suportar essas novas exigências com segurança e sem excesso de burocracia.</p>
<p>Iniciativas educacionais e consultivas de peso, como a <strong>Traininghouse</strong> e a plataforma interativa <strong>9001Simplified</strong>, enfatizam que o processo de transição não deve ser visto como um fardo regulatório, mas sim como uma oportunidade estratégica de otimização de processos e redução de custos operacionais. Portais especializados e fóruns de <strong>Certificação ISO</strong> recomendam veementemente que os líderes da qualidade não esperem 2026 chegar e iniciem as avaliações de impacto e gap analysis o quanto antes.</p>

<h3>Ação Estratégica</h3>
<p>Estar verdadeiramente preparado para a ISO 9001:2026 significa colocar a qualidade no epicentro da estratégia de resiliência dos negócios, sustentada por forte liderança, cultura colaborativa e responsabilidade socioambiental. Antecipe-se às mudanças exigidas pelo comitê técnico e garanta que seu Sistema de Gestão da Qualidade continue não apenas garantindo a certificação, mas agregando valor real, tangível e sustentável à sua organização frente à concorrência.</p>`,
      )
      app.save(record2)
    }
  },
  (app) => {
    try {
      const record1 = app.findFirstRecordByData(
        'articles',
        'slug',
        'iso-14001-2026-janela-oportunidade',
      )
      app.delete(record1)
    } catch (_) {}

    try {
      const record2 = app.findFirstRecordByData('articles', 'slug', 'iso-9001-2026-sgq-preparado')
      app.delete(record2)
    } catch (_) {}
  },
)
