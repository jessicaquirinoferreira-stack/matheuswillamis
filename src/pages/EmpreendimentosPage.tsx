import React from 'react';
import { useData } from '../context/DataContext';
import { Empreendimento } from '../types';
import { EmpreendimentoCard } from '../components/EmpreendimentoCard';
import { Building2, Sparkles } from 'lucide-react';

interface EmpreendimentosPageProps {
  onSelectEmpreendimento: (emp: Empreendimento) => void;
  onOpenSchedule: (emp: Empreendimento) => void;
}

export const EmpreendimentosPage: React.FC<EmpreendimentosPageProps> = ({
  onSelectEmpreendimento,
  onOpenSchedule,
}) => {
  const { empreendimentos } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3df9b] text-xs font-semibold border border-[#d4af37]/30 mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
          Condomínios & Edifícios
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-3">
          Empreendimentos em Olinda e Região
        </h1>
        <p className="text-sm text-gray-400">
          Seleção de edifícios residenciais e condomínios clubes com alto padrão de acabamento, localização estratégica e estrutura completa de lazer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  );
};
