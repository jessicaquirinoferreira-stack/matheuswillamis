import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { FilterState, Property, Empreendimento } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { EmpreendimentoCard } from '../components/EmpreendimentoCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { AboutSection } from '../components/AboutSection';
import { RegionsSection } from '../components/RegionsSection';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectProperty: (property: Property) => void;
  onSelectEmpreendimento: (emp: Empreendimento) => void;
  onOpenSchedule: (target?: Property | Empreendimento) => void;
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  filters,
  onFilterChange,
  onSelectProperty,
  onSelectEmpreendimento,
  onOpenSchedule,
  onNavigate,
}) => {
  const { properties, empreendimentos, settings, activeLandingPage } = useData();

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Transaction type
      if (filters.transactionType !== 'todos' && prop.transactionType !== filters.transactionType) {
        return false;
      }
      // Property type
      if (filters.propertyType && prop.propertyType !== filters.propertyType) {
        return false;
      }
      // Neighborhood
      if (filters.neighborhood && prop.locationNeighborhood !== filters.neighborhood) {
        return false;
      }
      // Min bedrooms
      if (filters.minBedrooms > 0 && prop.bedrooms < filters.minBedrooms) {
        return false;
      }
      // Min parking
      if (filters.minParking > 0 && prop.parkingSpaces < filters.minParking) {
        return false;
      }
      // Only featured
      if (filters.onlyFeatured && !prop.featured) {
        return false;
      }
      // Search term
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(term);
        const matchesNeighborhood = prop.locationNeighborhood.toLowerCase().includes(term);
        const matchesCode = prop.code?.toLowerCase().includes(term);
        const matchesDesc = prop.description.toLowerCase().includes(term);
        if (!matchesTitle && !matchesNeighborhood && !matchesCode && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'preco_asc') return a.price - b.price;
      if (filters.sortBy === 'preco_desc') return b.price - a.price;
      if (filters.sortBy === 'area_desc') return (b.totalArea || 0) - (a.totalArea || 0);
      return (a.order || 0) - (b.order || 0);
    });
  }, [properties, filters]);

  const featuredProperties = useMemo(() => {
    return properties.filter((p) => p.featured);
  }, [properties]);

  const handleSelectRegion = (regionName: string) => {
    onFilterChange({
      ...filters,
      neighborhood: regionName,
    });
    const catalogElement = document.getElementById('catalogo-imoveis');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Dynamic Background Slideshow of Registered Properties with Ken Burns and Cross-fade */}
        <HeroSlideshow
          properties={properties}
          onSelectProperty={onSelectProperty}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#d4af37]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold text-[#f3df9b] tracking-wider uppercase">
              Matheus Willamis • CRECI 24.231 • Olinda e Região
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
            Seu próximo imóvel em Olinda e região começa com quem conhece as{' '}
            <span className="gold-gradient-text">melhores oportunidades.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Consultoria imobiliária especializada para compra, venda e locação em Casa Caiada, Jardim Atlântico, Bairro Novo, Rio Doce e Janga.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={() => {
                const el = document.getElementById('catalogo-imoveis');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Explorar Imóveis</span>
              <ArrowRight className="w-5 h-5 text-[#0a0b0e]" />
            </button>

            <button
              onClick={() => onOpenSchedule()}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm sm:text-base font-semibold backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5 text-[#d4af37]" />
              <span>Agendar Visita</span>
            </button>
          </div>

          {/* Quick Filter Bar Mounted on Hero */}
          <div className="max-w-5xl mx-auto">
            <SearchFilterBar
              filters={filters}
              onChange={onFilterChange}
              totalResults={filteredProperties.length}
            />
          </div>

        </div>
      </section>

      {/* SPECIAL OPPORTUNITY BANNER (Direct to Premium Landing Page) */}
      {activeLandingPage && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 mb-16 relative z-20">
          <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-r from-[#14161f] via-[#1a1d26] to-[#12141a] border border-[#d4af37]/40 shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
              <img
                src={activeLandingPage.heroImage}
                alt="Oportunidade"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#14161f]" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#f3df9b] text-xs font-bold border border-[#d4af37]/40 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                {activeLandingPage.badgeText || 'OPORTUNIDADE ESPECIAL EM DESTAQUE'}
              </span>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
                {activeLandingPage.headline}
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                {activeLandingPage.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('landing')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Ver Página Exclusiva do Imóvel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenSchedule()}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs sm:text-sm font-semibold transition-all"
                >
                  Consultar Condições
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROPERTIES CATALOG SECTION */}
      <section id="catalogo-imoveis" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Catálogo de Imóveis
            </div>
            <h2 className="font-serif-luxury text-3xl font-bold text-white">
              {filters.transactionType === 'venda'
                ? 'Imóveis Selecionados para Venda'
                : filters.transactionType === 'locacao'
                ? 'Imóveis Selecionados para Locação'
                : 'Oportunidades em Olinda e Região'}
            </h2>
          </div>

          <div className="text-xs text-gray-400">
            Exibindo <strong className="text-white">{filteredProperties.length}</strong> de{' '}
            <strong className="text-white">{properties.length}</strong> imóveis
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onSchedule={onOpenSchedule}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-300 text-sm mb-4">
              Nenhum imóvel encontrado com os filtros selecionados.
            </p>
            <button
              onClick={() =>
                onFilterChange({
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
                })
              }
              className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0a0b0e] text-xs font-bold"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </section>

      {/* EMPREENDIMENTOS SECTION (Edifícios e Condomínios) */}
      <section className="py-16 bg-[#0a0b0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3df9b] text-xs font-semibold border border-[#d4af37]/30 mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Edifícios & Condomínios
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-white">
                Empreendimentos em Destaque
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Conheça os principais condomínios e edifícios trabalhados em Olinda e Paulista.
              </p>
            </div>

            <button
              onClick={() => onNavigate('empreendimentos')}
              className="text-xs font-semibold text-[#d4af37] hover:text-[#f3df9b] flex items-center gap-1 transition-colors"
            >
              <span>Ver Todos os Empreendimentos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empreendimentos.map((emp) => (
              <EmpreendimentoCard
                key={emp.id}
                empreendimento={emp}
                onSelect={onSelectEmpreendimento}
                onOpenSchedule={onOpenSchedule}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT MATHEUS WILLAMIS SECTION */}
      <AboutSection onOpenSchedule={() => onOpenSchedule()} />

      {/* REGIONS SHOWCASE SECTION */}
      <RegionsSection onSelectRegion={handleSelectRegion} />

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-t from-black via-[#0d0f14] to-[#08090b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mx-auto mb-6 border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Pronto para dar o próximo passo no seu imóvel?
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light leading-relaxed mb-8">
            Seja para comprar, vender ou alugar em Olinda e região, conte com consultoria próxima, qualificada e devidamente registrada sob o CRECI 24.231.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenSchedule()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5 text-[#0a0b0e]" />
              Agendar Visita com Matheus Willamis
            </button>

            <a
              href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Falar Direto no WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
