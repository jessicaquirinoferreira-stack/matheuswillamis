import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface RegionsSectionProps {
  onSelectRegion: (region: string) => void;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({ onSelectRegion }) => {
  const regionsData = [
    {
      name: 'Casa Caiada',
      city: 'Olinda / PE',
      description: 'Condomínios clube, proximidade à praia, orla urbanizada, hospitais e alta conveniência.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Litoral Nobre',
    },
    {
      name: 'Jardim Atlântico',
      city: 'Olinda / PE',
      description: 'Bairro residencial em expansão com excelentes residenciais novos, casas de alto padrão e condomínios.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      badge: 'Oportunidades & Alto Padrão',
    },
    {
      name: 'Bairro Novo',
      city: 'Olinda / PE',
      description: 'Endereço tradicional e valorizado, próximo ao Shopping Patteo, faculdades, colégios e comércio vibrante.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      badge: 'Tradição & Comércio',
    },
    {
      name: 'Rio Doce',
      city: 'Olinda / PE',
      description: 'Excelente opção para primeiro imóvel e saída do aluguel, com transporte facilitado e preços acessíveis.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      badge: 'Custo-Benefício',
    },
    {
      name: 'Janga / Paulista',
      city: 'Paulista / PE',
      description: 'Beira-mar com praias calmas, empreendimentos modernos e clima de veraneio e moradia com vista mar.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      badge: 'Beira-Mar & Lazer',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3df9b] text-xs font-semibold border border-[#d4af37]/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            Localidades em Destaque
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
            Olinda e Região Metropolitana
          </h2>
          <p className="text-sm text-gray-400">
            Conheça os bairros onde Matheus Willamis atua com foco específico, mapeando oportunidades reais para morar ou investir.
          </p>
        </div>

        {/* Grid of Regions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionsData.map((reg, idx) => (
            <div
              key={reg.name}
              onClick={() => onSelectRegion(reg.name)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              <img
                src={reg.image}
                alt={reg.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/50 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[11px] font-semibold text-[#f3df9b] bg-[#0a0b0e]/80 border border-[#d4af37]/30 rounded-md backdrop-blur-md">
                  {reg.badge}
                </span>
              </div>

              {/* Region Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <div className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider mb-1">
                  {reg.city}
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#f3df9b] transition-colors mb-2">
                  {reg.name}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-2">
                  {reg.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] group-hover:translate-x-1 transition-transform">
                  <span>Ver Imóveis nesta Região</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
