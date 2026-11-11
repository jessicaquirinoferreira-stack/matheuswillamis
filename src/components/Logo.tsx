import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  imageOnly?: boolean;
}

export const OFFICIAL_LOGO_URL = "https://i.postimg.cc/3wvWLM7W/Logo-imobiliario-dourado-de-Matheus-Willamis.png";

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  className = '',
  imageOnly = false,
}) => {
  const [imgError, setImgError] = useState(false);

  // Height and scale configurations - completely uncropped, natural aspect ratio, NO CIRCLE
  const sizeConfig = {
    sm: { img: 'h-10 sm:h-11', title: 'text-sm sm:text-base', sub: 'text-[9px] sm:text-[10px]' },
    md: { img: 'h-12 sm:h-14 md:h-16', title: 'text-base sm:text-lg', sub: 'text-[10px] sm:text-xs' },
    lg: { img: 'h-20 sm:h-24 md:h-28', title: 'text-xl sm:text-2xl', sub: 'text-xs sm:text-sm' },
    xl: { img: 'h-28 sm:h-36 md:h-40', title: 'text-2xl sm:text-3xl', sub: 'text-sm sm:text-base' },
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Golden Logo - Complete, Visible, Legible, NOT inside a circle */}
      {!imgError ? (
        <div className="relative shrink-0 flex items-center justify-center">
          <img
            src={OFFICIAL_LOGO_URL}
            alt="Matheus Willamis Corretor Imobiliário"
            onError={() => setImgError(true)}
            className={`${sizeConfig.img} w-auto max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-105`}
            loading="eager"
          />
        </div>
      ) : (
        /* Luxury rectangular fallback badge if network fails */
        <div className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/40 bg-[#0d0f14] shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center gap-2">
          <span className="font-serif-luxury font-extrabold text-base gold-gradient-text tracking-wide">
            MW
          </span>
          <span className="text-[11px] text-gray-300 font-medium">MATHEUS WILLAMIS</span>
        </div>
      )}

      {/* Typography alongside logo */}
      {!imageOnly && (
        <div className="hidden sm:flex flex-col justify-center">
          <span className={`font-serif-luxury font-bold ${sizeConfig.title} text-white tracking-wider leading-none drop-shadow-sm`}>
            MATHEUS WILLAMIS
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[#d4af37] font-semibold tracking-wider uppercase ${sizeConfig.sub}`}>
                Corretor Imobiliário
              </span>
              <span className="text-gray-500 text-[10px]">•</span>
              <span className="text-amber-300/90 font-mono text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                CRECI 24.231
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
