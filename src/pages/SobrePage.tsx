import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { RegionsSection } from '../components/RegionsSection';
import { ShieldCheck, MapPin, Award, CheckCircle2, Phone, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

interface SobrePageProps {
  onOpenSchedule: () => void;
  onSelectRegion: (reg: string) => void;
}

export const SobrePage: React.FC<SobrePageProps> = ({ onOpenSchedule, onSelectRegion }) => {
  const { settings } = useData();

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="py-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3df9b] text-xs font-semibold border border-[#d4af37]/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
          Matheus Willamis • CRECI 24.231
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
          Sobre o Corretor
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          {settings.bio}
        </p>
      </div>

      <AboutSection onOpenSchedule={onOpenSchedule} />
      
      <div className="py-8">
        <RegionsSection onSelectRegion={onSelectRegion} />
      </div>
    </div>
  );
};
