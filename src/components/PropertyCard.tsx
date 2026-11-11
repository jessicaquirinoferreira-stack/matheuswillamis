import React, { useState } from 'react';
import { Property } from '../types';
import { 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  Phone, 
  Calendar, 
  Eye, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onSchedule: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, onSchedule }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { settings } = useData();

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Olá Matheus Willamis! Gostaria de mais informações sobre o imóvel: ${property.title} (Código: ${property.code || property.id}).`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onSelect(property)}
      className="group relative bg-[#0e1015] rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] flex flex-col cursor-pointer"
    >
      {/* Top Image & Gallery Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-black/40 pointer-events-none" />

        {/* Carousel arrows if multiple images */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-[#d4af37] transition-all"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-[#d4af37] transition-all"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-md ${
            property.transactionType === 'venda'
              ? 'bg-[#d4af37] text-[#0a0b0e]'
              : 'bg-emerald-500 text-white'
          }`}>
            {property.transactionType === 'venda' ? 'Venda' : 'Locação'}
          </span>

          {property.featured && (
            <span className="px-2.5 py-1 text-[11px] font-semibold text-[#f3df9b] bg-[#0a0b0e]/80 border border-[#d4af37]/40 rounded-md backdrop-blur-md flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              Destaque
            </span>
          )}

          {property.status === 'a_confirmar' && (
            <span className="px-2 py-1 text-[10px] font-medium text-amber-200 bg-amber-950/80 border border-amber-500/40 rounded-md backdrop-blur-md flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              A Confirmar
            </span>
          )}
        </div>

        {/* Property Code */}
        {property.code && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-gray-300 border border-white/10">
            {property.code}
          </div>
        )}

        {/* Image pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'w-4 bg-[#d4af37]' 
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium text-gray-300 truncate">
              {property.locationNeighborhood}, {property.locationCity}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#f3df9b] transition-colors line-clamp-2 leading-snug mb-3">
            {property.title}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 font-medium">
              {property.transactionType === 'locacao' ? 'Valor da Locação' : 'Valor de Investimento'}
            </div>
            <div className="text-xl font-extrabold text-[#d4af37] font-serif-luxury tracking-tight">
              {property.priceFormatted || `R$ ${property.price.toLocaleString('pt-BR')}`}
            </div>
            {property.condoFee && (
              <div className="text-[11px] text-gray-500">
                Condomínio: aprox. R$ {property.condoFee.toLocaleString('pt-BR')}
              </div>
            )}
          </div>

          {/* Key Specs Pills Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-white/10 text-center text-xs">
            <div className="flex flex-col items-center">
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                Quartos
              </span>
              <span className="font-bold text-white mt-0.5">{property.bedrooms || '—'}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                Suítes
              </span>
              <span className="font-bold text-white mt-0.5">{property.suites || '—'}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Car className="w-3.5 h-3.5 text-[#d4af37]" />
                Vagas
              </span>
              <span className="font-bold text-white mt-0.5">{property.parkingSpaces || '—'}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Área
              </span>
              <span className="font-bold text-white mt-0.5">
                {property.totalArea ? `${property.totalArea}m²` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-3 flex items-center gap-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            Detalhes
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSchedule(property);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#f3df9b] border border-[#d4af37]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            title="Agendar Visita com Matheus Willamis"
          >
            <Calendar className="w-3.5 h-3.5" />
            Visita
          </button>

          <button
            onClick={handleWhatsApp}
            className="p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all shrink-0"
            title="Chamar no WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
