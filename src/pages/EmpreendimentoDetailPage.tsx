import React, { useState } from 'react';
import { Empreendimento, Property } from '../types';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  Calendar,
  Share2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { PropertyCard } from '../components/PropertyCard';

interface EmpreendimentoDetailPageProps {
  empreendimento: Empreendimento;
  onBack: () => void;
  onOpenSchedule: (target: Empreendimento) => void;
  onSelectProperty: (property: Property) => void;
}

export const EmpreendimentoDetailPage: React.FC<EmpreendimentoDetailPageProps> = ({
  empreendimento,
  onBack,
  onOpenSchedule,
  onSelectProperty,
}) => {
  const { properties, settings } = useData();
  const [activeImage, setActiveImage] = useState(0);

  const gallery = empreendimento.gallery && empreendimento.gallery.length > 0
    ? empreendimento.gallery
    : [empreendimento.coverImage];

  // Linked properties
  const linkedProperties = properties.filter((p) => p.empreendimentoId === empreendimento.id);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá Matheus Willamis! Gostaria de receber o material completo e valores do empreendimento ${empreendimento.name} em ${empreendimento.neighborhood}.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top back button */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Voltar aos Empreendimentos</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Falar com o Corretor</span>
        </button>
      </div>

      {/* Hero Banner of the Empreendimento */}
      <div className="relative aspect-[21/9] min-h-[300px] w-full rounded-3xl overflow-hidden bg-black/60 border border-white/10 mb-8">
        <img
          src={gallery[activeImage] || empreendimento.coverImage}
          alt={empreendimento.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase mb-2">
            <MapPin className="w-4 h-4" />
            <span>{empreendimento.neighborhood}, {empreendimento.city}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mb-2">
            {empreendimento.name}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl font-light">
            {empreendimento.subtitle}
          </p>
        </div>
      </div>

      {/* Gallery thumbs */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                idx === activeImage ? 'border-[#d4af37] scale-95' : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Description & Differentials */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10 space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              Sobre o Empreendimento
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
              {empreendimento.description}
            </p>
            {empreendimento.unitsSummary && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#f3df9b]">
                <strong>Configuração das unidades:</strong> {empreendimento.unitsSummary}
              </div>
            )}
          </div>

          {/* Differentials */}
          {empreendimento.differentialItems && empreendimento.differentialItems.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                Diferenciais e Estrutura
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {empreendimento.differentialItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linked properties in this empreendimento */}
          {linkedProperties.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Unidades Disponíveis neste Condomínio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {linkedProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={onSelectProperty}
                    onSchedule={() => onOpenSchedule(empreendimento)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Contact CTA Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#0e1015] border border-[#d4af37]/40 rounded-3xl p-6 shadow-2xl space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Interessado no {empreendimento.name}?
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Receba tabelas de valores, disponibilidade das unidades na planta ou prontas, e agende visita acompanhado por Matheus Willamis (CRECI 24.231).
            </p>

            <button
              onClick={() => onOpenSchedule(empreendimento)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#0a0b0e]" />
              Agendar Apresentação do Projeto
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Solicitar Tabela no WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
