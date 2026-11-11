import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  Building2, 
  Home, 
  Key, 
  UserCheck, 
  ShieldCheck 
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenSchedule: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSchedule }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, activeLandingPage } = useData();

  const navItems = [
    { label: 'Início', view: 'home' },
    { label: 'Comprar', view: 'comprar' },
    { label: 'Alugar', view: 'alugar' },
    { label: 'Empreendimentos', view: 'empreendimentos' },
    { label: 'Sobre', view: 'sobre' },
    { label: 'Contato', view: 'contato' },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090a0d]/85 border-b border-[#d4af37]/20 transition-all duration-300">
      {/* Top micro-bar for CRECI and Fast WhatsApp Direct */}
      <div className="w-full bg-[#0d0f14] border-b border-white/5 py-1 px-4 text-[12px] text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#e5c378] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              CRECI 24.231 • Olinda e Região (PE)
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline text-gray-400">
              Venda • Compra • Locação
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-medium">WhatsApp Oficial</span>
            </a>
            <span className="text-gray-600">|</span>
            <a
              href={settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#d4af37] transition-colors"
            >
              {settings.instagram || '@matheuswillamiscorretor'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none cursor-pointer"
          aria-label="Ir para a página inicial"
        >
          <Logo size="md" imageOnly={true} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  isActive 
                    ? 'text-[#d4af37] bg-[#d4af37]/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                )}
              </button>
            );
          })}

          {/* Special Landing Page Highlight button */}
          {activeLandingPage && (
            <button
              onClick={() => handleNavClick('landing')}
              className="ml-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-[#d4af37]/40 text-[#f3df9b] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 flex items-center gap-1.5 transition-all animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Oportunidade Premium</span>
            </button>
          )}
        </nav>

        {/* Action Button: Agendar Visita */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSchedule}
            className="group relative px-5 py-2.5 rounded-xl font-medium text-sm text-[#0a0b0e] font-semibold overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] transition-all duration-300 group-hover:opacity-90" />
            <span className="relative flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0a0b0e]" />
              Agendar Visita
            </span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f14] border-b border-[#d4af37]/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                  currentView === item.view
                    ? 'text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30'
                    : 'text-gray-300 bg-white/5 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {activeLandingPage && (
            <button
              onClick={() => handleNavClick('landing')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#d4af37]/15 text-[#f3df9b] border border-[#d4af37]/40"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              Oportunidade Especial (Landing Page)
            </button>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSchedule();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-sm shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Agendar Visita Agora
            </button>
            
            <a
              href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Falar Direto no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
