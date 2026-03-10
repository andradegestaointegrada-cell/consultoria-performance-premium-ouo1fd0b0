import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ScrollToTop } from './components/ScrollToTop'
import Index from './pages/Index'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <ScrollToTop />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/servicos/:id" element={<ServiceDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contato" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
