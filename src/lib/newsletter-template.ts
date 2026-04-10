import { StructuredNewsletterData } from '@/services/newsletter'

export function generateNewsletterHtml(data: StructuredNewsletterData): string {
  const sectionsHtml = data.sections
    .map(
      (sec) => `
    <tr>
      <td style="padding: 20px 0;">
        <h3 style="color: #CFAE70; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; margin: 0 0 10px 0;">${sec.title}</h3>
        <p style="color: #E8E8E8; font-family: 'Montserrat', Arial, sans-serif; font-size: 16px; line-height: 1.6; margin: 0;">${sec.content.replace(/\n/g, '<br/>')}</p>
      </td>
    </tr>
  `,
    )
    .join('')

  const ctaHtml =
    data.cta_text && data.cta_url
      ? `
    <tr>
      <td align="center" style="padding: 30px 0;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" bgcolor="#CFAE70" style="border-radius: 4px;">
              <a href="${data.cta_url}" target="_blank" style="display: inline-block; padding: 16px 32px; font-family: 'Montserrat', Arial, sans-serif; font-size: 16px; color: #0D0D0D; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${data.cta_text}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
      : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.subject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #091D39; max-width: 600px; width: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 20px; border-bottom: 1px solid rgba(207, 174, 112, 0.2);">
              <h1 style="color: #CFAE70; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Andrade</h1>
              <p style="color: #E8E8E8; font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 3px;">Gestão Integrada</p>
              <p style="color: #A0AEC0; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; margin: 15px 0 0 0; font-style: italic;">Estratégia, Conformidade e Performance</p>
            </td>
          </tr>
          <!-- Meta Info -->
          <tr>
            <td style="padding: 20px 40px 0 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="color: #CFAE70; font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">${data.edition}</td>
                  <td align="right" style="color: #CFAE70; font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">${data.period}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Main Title -->
          <tr>
            <td style="padding: 30px 40px 10px 40px; text-align: center;">
              <h2 style="color: #CFAE70; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 36px; margin: 0; line-height: 1.2;">${data.main_title}</h2>
            </td>
          </tr>
          <!-- Sections -->
          <tr>
            <td style="padding: 20px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                ${sectionsHtml}
              </table>
            </td>
          </tr>
          <!-- CTA -->
          ${ctaHtml}
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 40px 20px; background-color: #061428; border-top: 1px solid rgba(207, 174, 112, 0.2);">
              <p style="color: #A0AEC0; font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; margin: 0 0 10px 0;">© ${new Date().getFullYear()} Andrade Gestão Integrada. Todos os direitos reservados.</p>
              <p style="color: #A0AEC0; font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; margin: 0;">
                Você está recebendo este e-mail porque se cadastrou em nosso site.<br>
                <a href="{{unsubscribe_url}}" style="color: #CFAE70; text-decoration: underline;">Descadastre-se aqui</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
