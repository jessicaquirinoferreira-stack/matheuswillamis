import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { FilterState, Property, Empreendimento } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticlesBackground } from './components/ParticlesBackground';
import { LeadModal } from './components/LeadModal';
import { HomePage } from './pages/HomePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { EmpreendimentoDetailPage } from './pages/EmpreendimentoDetailPage';
import { PremiumLandingPage } from './pages/PremiumLandingPage';
import { EmpreendimentosPage } from './pages/EmpreendimentosPage';
import { SobrePage } from './pages/SobrePage';
import { ContatoPage } from './pages/ContatoPage';
import { AdminPanel } from './pages/AdminPanel';
import { CinematicIntro } from './components/CinematicIntro';
import FloatingSocialButtons from './components/FloatingSocialButtons';
import VirtualAssistant from './components/VirtualAssistant';
import { Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { properties, empreendimentos, settings, activeLandingPage } = useData();

  // Navigation state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedEmpreendimento, setSelectedEmpreendimento] = useState<Empreendimento | null>(null);

  // Lead modal state
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState<Property | Empreendimento | null>(null);

  // 6-Second Luxury Cinematic Intro state: always appears on entrance, then smoothly reveals the site
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Global filters
  const [filters, setFilters] = useState<FilterState>({
    transactionType: 'todos',
    propertyType: '',
    neighborhood: '',
    minPrice: 0,
    maxPrice: 0,
    minBedrooms: 0,
    minParking: 0,
    onlyFeatured: false,
    searchTerm: '',
    sortBy: 'recente',
  });

  // URL Hash router sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') setCurrentView('admin');
      else if (hash === 'landing' || hash === 'oportunidade') setCurrentView('landing');
      else if (hash === 'comprar') {
        setCurrentView('comprar');
        setFilters((prev) => ({ ...prev, transactionType: 'venda' }));
      } else if (hash === 'alugar') {
        setCurrentView('alugar');
        setFilters((prev) => ({ ...prev, transactionType: 'locacao' }));
      } else if (hash === 'empreendimentos') setCurrentView('empreendimentos');
      else if (hash === 'sobre') setCurrentView('sobre');
      else if (hash === 'contato') setCurrentView('contato');
      else if (hash.startsWith('imovel/')) {
        const id = hash.replace('imovel/', '');
        const found = properties.find((p) => p.slug === id || p.id === id);
        if (found) {
          setSelectedProperty(found);
          setCurrentView('property-detail');
        }
      } else if (hash.startsWith('empreendimento/')) {
        const id = hash.replace('empreendimento/', '');
        const found = empreendimentos.find((e) => e.slug === id || e.id === id);
        if (found) {
          setSelectedEmpreendimento(found);
          setCurrentView('emp-detail');
        }
      } else if (!hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [properties, empreendimentos]);

  const handleNavigate = (view: string) => {
    window.location.hash = view === 'home' ? '' : view;
    setCurrentView(view);
    if (view === 'comprar') {
      setFilters((prev) => ({ ...prev, transactionType: 'venda' }));
    } else if (view === 'alugar') {
      setFilters((prev) => ({ ...prev, transactionType: 'locacao' }));
    } else if (view === 'home') {
      setFilters((prev) => ({ ...prev, transactionType: 'todos' }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setCurrentView('property-detail');
    window.location.hash = `imovel/${prop.slug || prop.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEmpreendimento = (emp: Empreendimento) => {
    setSelectedEmpreendimento(emp);
    setCurrentView('emp-detail');
    window.location.hash = `empreendimento/${emp.slug || emp.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSchedule = (target?: Property | Empreendimento) => {
    setScheduleTarget(target || null);
    setIsScheduleOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#f1f2f6] flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-white">
      {/* 6-Second Luxury Cinematic Intro */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Background Particles */}
      <ParticlesBackground />

      {/* Main Header / Navbar (Hidden on Landing Page for high focus or visible) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSchedule={() => handleOpenSchedule()}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {currentView === 'home' && (
          <HomePage
            filters={filters}
            onFilterChange={setFilters}
            onSelectProperty={handleSelectProperty}
            onSelectEmpreendimento={handleSelectEmpreendimento}
            onOpenSchedule={handleOpenSchedule}
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'comprar' || currentView === 'alugar') && (
          <HomePage
            filters={filters}
            onFilterChange={setFilters}
            onSelectProperty={handleSelectProperty}
            onSelectEmpreendimento={handleSelectEmpreendimento}
            onOpenSchedule={handleOpenSchedule}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'empreendimentos' && (
          <EmpreendimentosPage
            onSelectEmpreendimento={handleSelectEmpreendimento}
            onOpenSchedule={handleOpenSchedule}
          />
        )}

        {currentView === 'sobre' && (
          <SobrePage
            onOpenSchedule={() => handleOpenSchedule()}
            onSelectRegion={(reg) => {
              setFilters((prev) => ({ ...prev, neighborhood: reg }));
              handleNavigate('home');
            }}
          />
        )}

        {currentView === 'contato' && <ContatoPage />}

        {currentView === 'landing' && (
          <PremiumLandingPage
            onOpenSchedule={() => handleOpenSchedule()}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'property-detail' && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            onBack={() => handleNavigate('home')}
            onOpenSchedule={handleOpenSchedule}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'emp-detail' && selectedEmpreendimento && (
          <EmpreendimentoDetailPage
            empreendimento={selectedEmpreendimento}
            onBack={() => handleNavigate('empreendimentos')}
            onOpenSchedule={handleOpenSchedule}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            onBackToSite={() => handleNavigate('home')}
            onPreviewProperty={handleSelectProperty}
            onPreviewEmpreendimento={handleSelectEmpreendimento}
            onPreviewLanding={() => handleNavigate('landing')}
          />
        )}
      </main>

      {/* Footer (Not displayed on Admin to keep dashboard clean) */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onReplayIntro={handleReplayIntro}
        />
      )}

      {/* Floating Action Buttons on the Right (Official Instagram & WhatsApp) */}
      {currentView !== 'admin' && <FloatingSocialButtons />}

      {/* Virtual Assistant on the Left (Sofia with Human Photo & Fast Smart Guidance) */}
      {currentView !== 'admin' && <VirtualAssistant />}

      {/* Lead & Visit Schedule Modal */}
      <LeadModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        targetItem={scheduleTarget}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainLayout />
      </DataProvider>
    </AuthProvider>
  );
}
