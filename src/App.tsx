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
import Methodology from './pages/Methodology'
import Cases from './pages/Cases'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import Contact from './pages/Contact'
import Dashboard from './pages/admin/Dashboard'
import NewsletterHistory from './pages/admin/NewsletterHistory'
import Login from './pages/admin/Login'
import { AdminGuard } from './components/admin/AdminGuard'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { AuthProvider } from './hooks/use-auth'

import TermsOfUse from './pages/legal/TermsOfUse'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import LGPDPortal from './pages/legal/LGPDPortal'

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
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
              <Route path="/metodologia" element={<Methodology />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminGuard>
                    <Dashboard />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/history"
                element={
                  <AdminGuard>
                    <NewsletterHistory />
                  </AdminGuard>
                }
              />

              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/portal-lgpd" element={<LGPDPortal />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)

export default App
