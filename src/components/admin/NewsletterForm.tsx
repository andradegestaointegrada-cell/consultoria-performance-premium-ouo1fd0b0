import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Plus, Trash2 } from 'lucide-react'
import { sendNewsletter, sendTestNewsletter, StructuredNewsletterData } from '@/services/newsletter'
import { generateNewsletterHtml } from '@/lib/newsletter-template'

export function NewsletterForm() {
  const [mode, setMode] = useState<'structured' | 'raw'>('structured')
  const [subject, setSubject] = useState('')
  const [rawContent, setRawContent] = useState('')

  const [edition, setEdition] = useState('')
  const [period, setPeriod] = useState('')
  const [mainTitle, setMainTitle] = useState('')
  const [sections, setSections] = useState([{ title: '', content: '' }])
  const [ctaText, setCtaText] = useState('')
  const [ctaUrl, setCtaUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleModeChange = (newMode: 'structured' | 'raw') => {
    setMode(newMode)
    if (
      (newMode === 'raw' && (edition || mainTitle || sections[0].title)) ||
      (newMode === 'structured' && rawContent)
    ) {
      toast({
        title: 'Modo de Edição Alterado',
        description: 'Os dados do outro modo foram preservados em rascunho.',
      })
    }
  }

  const addSection = () => setSections([...sections, { title: '', content: '' }])
  const removeSection = (idx: number) => setSections(sections.filter((_, i) => i !== idx))
  const updateSection = (idx: number, field: 'title' | 'content', value: string) => {
    const newSections = [...sections]
    newSections[idx][field] = value
    setSections(newSections)
  }

  const isValid = () => {
    if (!subject) return false
    if (mode === 'raw') return rawContent.trim().length > 0
    return (
      edition &&
      period &&
      mainTitle &&
      sections.length > 0 &&
      sections.every((s) => s.title && s.content)
    )
  }

  const buildPayload = (): StructuredNewsletterData & { content: string } => {
    if (mode === 'raw') {
      return {
        subject,
        is_raw_html: true,
        content: rawContent,
      }
    }

    const data: StructuredNewsletterData = {
      subject,
      is_raw_html: false,
      edition,
      period,
      main_title: mainTitle,
      sections,
      cta_text: ctaText,
      cta_url: ctaUrl,
    }
    return { ...data, content: generateNewsletterHtml(data as any) }
  }

  const handleTestSend = async () => {
    if (!isValid()) return
    setLoading(true)
    try {
      await sendTestNewsletter('alexandre@andradegestaointegrada.com.br', buildPayload())
      toast({ title: 'Email de Teste Enviado para Alexandre' })
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    if (!isValid()) return
    setLoading(true)
    try {
      await sendNewsletter(buildPayload())
      toast({ title: 'Campanha Enviada', description: 'Comunicação disparada com sucesso.' })
      setSubject('')
      setEdition('')
      setPeriod('')
      setMainTitle('')
      setSections([{ title: '', content: '' }])
      setCtaText('')
      setCtaUrl('')
      setRawContent('')
    } catch (e: any) {
      toast({ title: 'Erro no Envio', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="font-heading uppercase tracking-wide text-foreground text-lg">
          Nova Campanha
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
            Assunto do E-mail
          </label>
          <Input
            placeholder="Ex: Insight AGI - Novas Estratégias"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <Tabs
          value={mode}
          onValueChange={(v) => handleModeChange(v as 'structured' | 'raw')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="structured">Modelo Estruturado</TabsTrigger>
            <TabsTrigger value="raw">HTML Livre</TabsTrigger>
          </TabsList>

          <TabsContent value="structured" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                  Edição
                </label>
                <Input
                  placeholder="Ex: Edição 1"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                  Mês/Ano
                </label>
                <Input
                  placeholder="Ex: Abril de 2026"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                Título Principal
              </label>
              <Input
                placeholder="O Impacto da Performance em 2026"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase block text-muted-foreground">
                Seções de Conteúdo
              </label>
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="relative p-4 border border-border rounded-lg space-y-3 bg-muted/10"
                >
                  {sections.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-destructive"
                      onClick={() => removeSection(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Input
                    placeholder={`Título da Seção ${idx + 1}`}
                    value={sec.title}
                    onChange={(e) => updateSection(idx, 'title', e.target.value)}
                    className="pr-10"
                  />
                  <Textarea
                    placeholder="Conteúdo detalhado da seção..."
                    value={sec.content}
                    onChange={(e) => updateSection(idx, 'content', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
              <Button variant="outline" onClick={addSection} className="w-full border-dashed">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Seção
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                  Botão CTA - Texto (Opcional)
                </label>
                <Input
                  placeholder="Ex: Leia Mais"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                  Botão CTA - URL (Opcional)
                </label>
                <Input
                  placeholder="Ex: https://..."
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="raw" className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase mb-2 block text-muted-foreground">
                Código HTML Personalizado
              </label>
              <Textarea
                placeholder="Cole aqui o seu código HTML completo (<html>...</html>)"
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm leading-relaxed"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Neste modo, o template padrão da AGI será ignorado. Certifique-se de que o HTML
                possui formatação inline e estrutura de tabelas compatível com clientes de e-mail.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border mt-6">
          <Button
            onClick={handleTestSend}
            disabled={loading || !isValid()}
            variant="outline"
            className="w-full h-12 uppercase tracking-wider font-bold text-xs"
          >
            Testar (alexandre@...)
          </Button>
        </div>
        <Button
          onClick={handleSend}
          disabled={loading || !isValid()}
          className="w-full bg-[#091D39] text-[#E8E8E8] hover:bg-[#091D39]/90 dark:bg-[#CFAE70] dark:text-[#0D0D0D] dark:hover:bg-[#CFAE70]/90 uppercase tracking-widest font-bold h-12 mt-4"
        >
          {loading ? 'Processando...' : 'Disparar Campanha para Todos'}
        </Button>
      </CardContent>
    </Card>
  )
}
