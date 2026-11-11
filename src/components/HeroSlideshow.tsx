import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Property } from '../types';
import { ChevronLeft, ChevronRight, Eye, MapPin, Sparkles } from 'lucide-react';

interface HeroSlideshowProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  intervalMs?: number;
}

interface SlideItem {
  property: Property;
  imageUrl: string;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  properties,
  onSelectProperty,
  intervalMs = 6000,
}) => {
  // Collect all photos from registered properties
  const slides = useMemo<SlideItem[]>(() => {
    const list: SlideItem[] = [];
    properties.forEach((prop) => {
      if (prop.images && prop.images.length > 0) {
        // Use up to 2 best photos per property to provide good variety across all listings
        prop.images.slice(0, 2).forEach((img) => {
          list.push({ property: prop, imageUrl: img });
        });
      }
    });

    // Fallback if no images found
    if (list.length === 0) {
      return [
        {
          property: {
            id: 'fallback',
            title: 'Residencial de Alto Padrão em Olinda',
            slug: 'olinda-destaque',
            code: 'MW-001',
            transactionType: 'venda',
            propertyType: 'apartamento',
            price: 215000,
            priceFormatted: 'R$ 215.000',
            locationNeighborhood: 'Jardim Atlântico',
            locationCity: 'Olinda/PE',
            bedrooms: 2,
            suites: 1,
            bathrooms: 2,
            parkingSpaces: 1,
            totalArea: 60,
            description: '',
            features: [],
            images: [],
            featured: true,
            status: 'disponivel',
            order: 1,
          },
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
        },
      ];
    }
    return list;
  }, [properties]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, slides.length, intervalMs, nextSlide]);

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Ken Burns Scale and Cross-fade */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={`${slide.property.id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.property.title}
              className={`w-full h-full object-cover object-center brightness-[0.52] contrast-[1.05] transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Atmospheric Luxury Overlays (Balanced for High Photo Visibility & Sharp Text Contrast) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#08090b] via-[#08090b]/60 to-[#08090b]/25 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#08090b]/70 via-transparent to-[#08090b]/70 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/25 to-[#08090b]/75 pointer-events-none" />

      {/* Floating Property Info Badge & Slideshow Controls (Bottom Left of Hero) */}
      {currentSlide && (
        <div className="absolute bottom-6 left-6 sm:left-10 z-30 max-w-sm hidden md:flex flex-col gap-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          <button
            onClick={() => onSelectProperty(currentSlide.property)}
            className="group p-3 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/60 transition-all text-left shadow-2xl flex items-center gap-3"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20">
              <img
                src={currentSlide.imageUrl}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Imóvel em Exibição no Fundo</span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-[#f3df9b] transition-colors truncate">
                {currentSlide.property.title}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-300">
                <span className="flex items-center gap-1 text-gray-400">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  {currentSlide.property.locationNeighborhood}
                </span>
                <span>•</span>
                <span className="text-[#d4af37] font-bold">
                  {currentSlide.property.priceFormatted || `R$ ${currentSlide.property.price.toLocaleString('pt-BR')}`}
                </span>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#d4af37] text-gray-400 group-hover:text-[#0a0b0e] transition-colors shrink-0">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Navigation Controls & Progress Pill */}
          <div className="flex items-center justify-between px-2 text-[11px] text-gray-400">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-[#d4af37] font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>

            {/* Micro dots */}
            <div className="flex items-center gap-1">
              {slides.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-5 bg-[#d4af37]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                className="p-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile discrete counter (Bottom Right) */}
      <div className="md:hidden absolute bottom-4 right-4 z-30 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        <span>Fotos dos Imóveis: {currentIndex + 1}/{slides.length}</span>
      </div>
    </div>
  );
};
