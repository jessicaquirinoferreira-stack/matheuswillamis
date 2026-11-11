import React from 'react';
import { Empreendimento } from '../types';
import { Building2, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface EmpreendimentoCardProps {
  empreendimento: Empreendimento;
  onSelect: (emp: Empreendimento) => void;
  onOpenSchedule: (emp: Empreendimento) => void;
}

export const EmpreendimentoCard: React.FC<EmpreendimentoCardProps> = ({ 
  empreendimento, 
  onSelect,
  onOpenSchedule 
}) => {
  const statusLabels: Record<string, { label: string; class: string }> = {
    lancamento: { label: 'Lançamento', class: 'bg-indigo-900/80 text-indigo-200 border-indigo-500/40' },
    em_obras: { label: 'Em Construção', class: 'bg-amber-900/80 text-amber-200 border-amber-500/40' },
    pronto: { label: 'Pronto para Morar', class: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/40' },
    destaque: { label: 'Oportunidade Especial', class: 'bg-[#d4af37] text-[#0a0b0e] font-bold' },
  };

  const statusInfo = statusLabels[empreendimento.status] || { 
    label: 'Disponível', 
    class: 'bg-gray-800 text-gray-200 border-gray-700' 
  };

  return (
    <div 
      onClick={() => onSelect(empreendimento)}
      className="group bg-[#0e1015] rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] flex flex-col cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
        <img
          src={empreendimento.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={empreendimento.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-black/30" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className={`px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-md backdrop-blur-md border ${statusInfo.class}`}>
            {statusInfo.label}
          </span>
          {empreendimento.featured && (
            <span className="px-2.5 py-1 text-[11px] font-semibold text-[#f3df9b] bg-[#0a0b0e]/80 border border-[#d4af37]/40 rounded-md backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              Empreendimento Destaque
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{empreendimento.neighborhood}, {empreendimento.city}</span>
          </div>

          <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#f3df9b] transition-colors mb-2">
            {empreendimento.name}
          </h3>

          <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
            {empreendimento.subtitle || empreendimento.description}
          </p>

          {/* Units summary pill */}
          {empreendimento.unitsSummary && (
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span className="truncate">{empreendimento.unitsSummary}</span>
            </div>
          )}

          {/* Differentials bullets */}
          {empreendimento.differentialItems && empreendimento.differentialItems.length > 0 && (
            <ul className="space-y-1.5 mb-5">
              {empreendimento.differentialItems.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Conhecer Empreendimento
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSchedule(empreendimento);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#f3df9b] text-xs font-medium border border-[#d4af37]/30 transition-colors"
          >
            Quero Mais Info
          </button>
        </div>
      </div>
    </div>
  );
};
