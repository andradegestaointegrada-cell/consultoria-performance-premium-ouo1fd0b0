import { Lead } from '@/stores/useLeadStore'

export const exportToCSV = (leads: Lead[]) => {
  const rows = leads.map((l) => [
    new Date(l.createdAt).toLocaleDateString('pt-BR'),
    `"${l.name}"`,
    `"${l.company}"`,
    `"${l.email}"`,
    `"${l.service}"`,
    `"${l.status}"`,
    l.lgpdAgreed ? 'Sim' : 'Não',
  ])
  const csvContent = [
    'Data,Nome,Empresa,Email,Serviço,Status,LGPD',
    ...rows.map((r) => r.join(',')),
  ].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const exportToPDF = (
  stats: any,
  filteredLeads: Lead[],
  filter: string,
  chartsRef: React.RefObject<HTMLDivElement | null>,
) => {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Por favor, permita pop-ups no seu navegador para gerar o relatório em PDF.')
    return
  }

  const date = new Date().toLocaleDateString('pt-BR')
  let chartsHtml = ''

  if (chartsRef.current) {
    const svgs = chartsRef.current.querySelectorAll('.recharts-wrapper svg')
    svgs.forEach((svg, index) => {
      const clone = svg.cloneNode(true) as SVGElement
      clone.setAttribute('width', '100%')
      clone.setAttribute('height', '250px')
      // Let's force some default text fill colors for standard recharts text to show up correctly in PDF
      const textElements = clone.querySelectorAll('text')
      textElements.forEach((text) => {
        text.style.fill = '#0D0D0D'
        text.style.fontFamily = 'Open Sans, sans-serif'
      })
      const title = index === 0 ? 'Distribuição por Status' : 'Interesse por Serviço'
      chartsHtml += `<div class="chart-container"><h3>${title}</h3><div style="text-align:center;">${clone.outerHTML}</div></div>`
    })
  }

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Performance - ${date}</title>
        <style>
          body { font-family: "Open Sans", system-ui, sans-serif; padding: 40px; color: #0D0D0D; max-width: 1000px; margin: 0 auto; background: #ffffff; }
          h1 { font-family: "Times New Roman MT Condensed", "Times New Roman", serif; color: #091D39; border-bottom: 2px solid #CFAE70; padding-bottom: 16px; margin-bottom: 32px; font-size: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
          .metrics { display: flex; gap: 24px; margin-bottom: 40px; }
          .metric-card { border: 1px solid #E8E8E8; padding: 24px; border-radius: 12px; flex: 1; background: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .metric-title { font-size: 13px; text-transform: uppercase; color: #454545; margin-bottom: 8px; font-weight: 600; letter-spacing: 0.05em; }
          .metric-value { font-family: "Times New Roman MT Condensed", "Times New Roman", serif; font-size: 32px; font-weight: 700; color: #091D39; }
          .charts-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
          .chart-container { background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E8E8E8; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .chart-container h3 { font-family: "Times New Roman MT Condensed", "Times New Roman", serif; text-align: center; color: #091D39; font-size: 16px; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 0.05em; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E8E8E8; }
          th, td { text-align: left; padding: 16px; border-bottom: 1px solid #E8E8E8; }
          th { background-color: #091D39; font-weight: 600; color: #E8E8E8; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
          .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          .status-Novo { background: #091D39; color: #E8E8E8; }
          .status-Em-Atendimento { background: #CFAE70; color: #0D0D0D; }
          .status-Concluído { background: #2C2C2C; color: #E8E8E8; }
          @media print {
            body { padding: 0; background: white; }
            .metric-card, .chart-container, table { border: 1px solid #2C2C2C !important; box-shadow: none !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            th { background-color: #091D39 !important; color: #E8E8E8 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .status-Novo { background: #091D39 !important; color: #E8E8E8 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .status-Em-Atendimento { background: #CFAE70 !important; color: #0D0D0D !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .status-Concluído { background: #2C2C2C !important; color: #E8E8E8 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Performance - Consultoria Premium</h1>
        
        <div class="metrics">
          <div class="metric-card">
            <div class="metric-title">Total Leads</div>
            <div class="metric-value">${stats.total}</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">Novos</div>
            <div class="metric-value" style="color: #CFAE70;">${stats.novos}</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">Taxa de Conversão</div>
            <div class="metric-value" style="color: #2C2C2C;">${stats.taxa}%</div>
          </div>
        </div>

        ${chartsHtml ? `<div class="charts-section">${chartsHtml}</div>` : ''}

        <h2>Listagem de Leads (${filter})</h2>
        <table>
          <thead>
            <tr><th>Data</th><th>Nome</th><th>Empresa</th><th>Serviço</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${filteredLeads
              .map((l) => {
                const statusClass = l.status.replace(/\s+/g, '-')
                return `
              <tr>
                <td>${new Date(l.createdAt).toLocaleDateString('pt-BR')}</td>
                <td><strong>${l.name}</strong></td>
                <td>${l.company}</td>
                <td>${l.service}</td>
                <td><span class="status-badge status-${statusClass}">${l.status}</span></td>
              </tr>
            `
              })
              .join('')}
          </tbody>
        </table>
        <script>window.onload = () => { setTimeout(() => { window.print(); }, 800); }</script>
      </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()
}
