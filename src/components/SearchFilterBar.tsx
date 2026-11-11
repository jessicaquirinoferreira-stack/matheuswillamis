import React, { useState } from 'react';
import { FilterState, TransactionType } from '../types';
import { Search, SlidersHorizontal, X, ArrowUpDown, Building, MapPin, DollarSign, Bed, RotateCcw } from 'lucide-react';
import { useData } from '../context/DataContext';

interface SearchFilterBarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalResults: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ filters, onChange, totalResults }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { settings } = useData();

  const handleTransactionChange = (type: TransactionType) => {
    onChange({ ...filters, transactionType: type });
  };

  const handleReset = () => {
    onChange({
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
  };

  const activeFiltersCount = [
    filters.propertyType,
    filters.neighborhood,
    filters.minPrice > 0,
    filters.maxPrice > 0,
    filters.minBedrooms > 0,
    filters.minParking > 0,
    filters.onlyFeatured,
  ].filter(Boolean).length;

  return (
    <div className="w-full bg-[#0d0f14] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40 relative z-20">
      {/* Transaction Type Tabs: Comprar, Alugar, Todos */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => handleTransactionChange('todos')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filters.transactionType === 'todos'
                ? 'bg-[#d4af37] text-[#0a0b0e] shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todos os Imóveis
          </button>
          <button
            onClick={() => handleTransactionChange('venda')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filters.transactionType === 'venda'
                ? 'bg-[#d4af37] text-[#0a0b0e] shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Comprar (Venda)
          </button>
          <button
            onClick={() => handleTransactionChange('locacao')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filters.transactionType === 'locacao'
                ? 'bg-[#d4af37] text-[#0a0b0e] shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Alugar (Locação)
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Active filters badge / clear */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar ({activeFiltersCount})
            </button>
          )}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              showAdvanced || activeFiltersCount > 0
                ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3df9b]'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Filtros Avançados</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#0a0b0e] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Quick Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, condomínio, código..."
            value={filters.searchTerm}
            onChange={(e) => onChange({ ...filters, searchTerm: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]/70 transition-colors"
          />
        </div>

        {/* Neighborhood select */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.neighborhood}
            onChange={(e) => onChange({ ...filters, neighborhood: e.target.value })}
            aria-label="Filtrar por Bairro / Região"
            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]/70 appearance-none transition-colors"
          >
            <option value="" className="bg-[#0e1015] text-gray-300">Todas as Regiões (Olinda e PE)</option>
            {settings.regions.map((reg) => (
              <option key={reg} value={reg} className="bg-[#0e1015] text-white">
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type select */}
        <div className="relative">
          <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.propertyType}
            onChange={(e) => onChange({ ...filters, propertyType: e.target.value })}
            aria-label="Filtrar por Tipo de Imóvel"
            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]/70 appearance-none transition-colors"
          >
            <option value="" className="bg-[#0e1015] text-gray-300">Todos os Tipos de Imóvel</option>
            <option value="apartamento" className="bg-[#0e1015] text-white">Apartamento</option>
            <option value="casa" className="bg-[#0e1015] text-white">Casa / Mansão</option>
            <option value="cobertura" className="bg-[#0e1015] text-white">Cobertura</option>
            <option value="terreno" className="bg-[#0e1015] text-white">Terreno / Lote</option>
            <option value="comercial" className="bg-[#0e1015] text-white">Comercial</option>
          </select>
        </div>

        {/* Sort by */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            aria-label="Ordenar resultados"
            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]/70 appearance-none transition-colors"
          >
            <option value="recente" className="bg-[#0e1015] text-white">Mais Recentes</option>
            <option value="preco_asc" className="bg-[#0e1015] text-white">Menor Preço</option>
            <option value="preco_desc" className="bg-[#0e1015] text-white">Maior Preço</option>
            <option value="area_desc" className="bg-[#0e1015] text-white">Maior Área (m²)</option>
          </select>
        </div>
      </div>

      {/* Advanced Expandable Panel */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
          {/* Minimum Bedrooms */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
              Quartos Mínimos
            </label>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => onChange({ ...filters, minBedrooms: num })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filters.minBedrooms === num
                      ? 'bg-[#d4af37] text-[#0a0b0e] border-[#d4af37]'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {num === 0 ? 'Todos' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Parking */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5">
              Vagas de Garagem
            </label>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => onChange({ ...filters, minParking: num })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filters.minParking === num
                      ? 'bg-[#d4af37] text-[#0a0b0e] border-[#d4af37]'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {num === 0 ? 'Qualquer' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Only Toggle */}
          <div className="flex items-end">
            <label className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <span className="text-xs font-medium text-gray-300">Apenas Imóveis em Destaque</span>
              <input
                type="checkbox"
                checked={filters.onlyFeatured}
                onChange={(e) => onChange({ ...filters, onlyFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] accent-[#d4af37]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Results counter bar */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <span>
          Encontrados: <strong className="text-[#f3df9b]">{totalResults}</strong> {totalResults === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
        </span>
        <span className="text-[11px] text-gray-500">
          Atualizado em tempo real
        </span>
      </div>
    </div>
  );
};
