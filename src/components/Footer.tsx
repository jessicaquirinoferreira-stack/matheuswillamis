import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Phone, Instagram, MapPin, Lock, ArrowUp, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FooterProps {
  onNavigate: (view: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const { settings } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#07080a] border-t border-white/10 text-gray-400 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Broker Identity */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Atuação transparente, consultiva e de alto padrão no mercado imobiliário de Olinda e litoral norte de Pernambuco.
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <span className="text-gray-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                CRECI 24.231 • Regularidade Certificada
              </span>
              <span className="text-gray-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                Olinda / PE e Região Metropolitana
              </span>
            </div>
          </div>

          {/* Column 2: Localidades de Atuação */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#e5c378]">
              Região de Atuação
            </h4>
            <ul className="space-y-2 text-xs">
              {settings.regions.map((reg) => (
                <li key={reg} className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                  {reg}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navegação Rápida */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#e5c378]">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comprar')} className="hover:text-white transition-colors">
                  Imóveis à Venda
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('alugar')} className="hover:text-white transition-colors">
                  Imóveis para Locação
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('empreendimentos')} className="hover:text-white transition-colors">
                  Edifícios & Empreendimentos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors text-[#d4af37]">
                  ★ Oportunidade Especial (Landing Page)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-white transition-colors">
                  Sobre Matheus Willamis
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contato & Redes */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-white tracking-wider uppercase mb-4 text-[#e5c378]">
              Atendimento Direto
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-[#d4af37]/10 border border-white/5 hover:border-[#d4af37]/30 text-gray-200 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">WhatsApp Corretor</div>
                  <div className="font-semibold text-white group-hover:text-[#d4af37]">w.app/matheuscorretor</div>
                </div>
              </a>

              <a
                href={settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-[#d4af37]/10 border border-white/5 hover:border-[#d4af37]/30 text-gray-200 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Instagram Oficial</div>
                  <div className="font-semibold text-white group-hover:text-[#d4af37]">@matheuswillamiscorretor</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer & Legal Notice */}
        <div className="py-6 border-b border-white/5 text-[11px] text-gray-400 leading-relaxed text-center sm:text-left">
          <p className="bg-black/30 p-3 rounded-lg border border-white/5">
            <strong className="text-gray-300 font-semibold">Aviso de Conformidade e Responsabilidade:</strong> As informações relativas aos imóveis, metragens, valores, taxas condominiais e status de comercialização apresentados neste portal possuem caráter estritamente consultivo e histórico, estando sujeitas a confirmação prévia e disponibilidade junto ao corretor credenciado Matheus Willamis (CRECI 24.231). Todas as negociações seguem as diretrizes da Lei Federal nº 6.530/78 e Código de Ética do COFECI.
          </p>
        </div>

        {/* Bottom row: Rights, discreet admin link, back to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Matheus Willamis — Corretor Imobiliário. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Replay Cinematic Intro */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="flex items-center gap-1.5 text-gray-400 hover:text-[#d4af37] transition-colors py-1 px-2.5 rounded hover:bg-white/5 border border-transparent hover:border-[#d4af37]/20"
                title="Reviver abertura cinematográfica oficial"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Ver Abertura de Luxo</span>
              </button>
            )}

            {/* Discreet Admin Link */}
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 text-gray-400 hover:text-[#d4af37] transition-colors py-1 px-2.5 rounded hover:bg-white/5 border border-transparent hover:border-white/10"
              title="Acesso restrito ao Painel de Gestão"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
