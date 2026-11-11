import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Building, Phone, Instagram, Sparkles, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AboutSectionProps {
  onOpenSchedule: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenSchedule }) => {
  const { settings } = useData();

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0b0e] via-[#0d0f14] to-[#0a0b0e] relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Monogram & Photographic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Gold atmospheric blur glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-[#e5c378]/10 rounded-3xl blur-2xl opacity-60" />

              <div className="relative bg-[#0e1015] border border-[#d4af37]/40 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                
                {/* Official Logo - Full, Legible, completely NOT inside a circle */}
                <div className="w-full max-w-[320px] p-5 rounded-2xl bg-black/50 border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.25)] mb-6 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/3wvWLM7W/Logo-imobiliario-dourado-de-Matheus-Willamis.png"
                    alt="Logo Oficial Matheus Willamis"
                    className="w-auto h-28 sm:h-36 max-w-full object-contain filter drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                  />
                </div>

                {/* Name & CRECI */}
                <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                  Matheus Willamis
                </h3>
                <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
                  Corretor Imobiliário
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  CRECI 24.231 • Olinda e Região
                </div>

                <div className="w-full border-t border-white/10 pt-6 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="text-[11px] text-gray-400">Atuação</div>
                    <div className="font-bold text-white mt-0.5">Venda</div>
                  </div>
                  <div className="border-x border-white/10">
                    <div className="text-[11px] text-gray-400">Atuação</div>
                    <div className="font-bold text-white mt-0.5">Compra</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Atuação</div>
                    <div className="font-bold text-white mt-0.5">Locação</div>
                  </div>
                </div>

                {/* Direct quick action */}
                <div className="w-full mt-6 flex gap-2">
                  <a
                    href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 border border-pink-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Institutional Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3df9b]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Posicionamento Oficial
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
              “Agora é oficial. Matheus Willamis, seu corretor de imóveis.”
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Seu próximo imóvel em Olinda e região começa com quem conhece as melhores oportunidades. Atuação especializada na compra, venda e locação com rigor na análise de documentação, transparência no atendimento e proximidade em cada etapa da negociação.
            </p>

            {/* Differentials bullets based on true positioning */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Especialização Regional</h4>
                  <p className="text-xs text-gray-400">
                    Foco profundo em Casa Caiada, Jardim Atlântico, Bairro Novo, Rio Doce e Janga/Paulista.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Segurança Jurídica</h4>
                  <p className="text-xs text-gray-400">
                    Profissional devidamente credenciado (CRECI 24.231), garantindo conformidade e tranquilidade.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <Building className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Seleção de Oportunidades</h4>
                  <p className="text-xs text-gray-400">
                    Seleção criteriosa de apartamentos, casas de alto padrão e empreendimentos com potencial real.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Atendimento Consultivo</h4>
                  <p className="text-xs text-gray-400">
                    Sem pressão ou promessas irreais: orientação transparente focada nos seus objetivos de vida e investimento.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenSchedule}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)] transition-all"
              >
                Agendar Reunião ou Visita
              </button>

              <a
                href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                Conversar pelo WhatsApp
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
