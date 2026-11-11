import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function FloatingSocialButtons() {
  const { settings } = useData();
  const [hovered, setHovered] = useState<'wa' | 'ig' | null>(null);

  const whatsappUrl = settings.whatsappLink || 'https://w.app/matheuscorretor';
  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/';

  return (
    <aside
      aria-label="Canais diretos de contato"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Instagram Button */}
      <div className="relative flex items-center group">
        {/* Tooltip / Label */}
        <div
          className={`mr-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-pink-500/30 text-xs text-white/90 shadow-xl transition-all duration-300 pointer-events-none ${
            hovered === 'ig' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span>Siga no Instagram</span>
          <span className="text-pink-400 font-medium">@matheuswillamiscorretor</span>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('ig')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Abrir Instagram oficial de Matheus Willamis"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-black"
          style={{
            background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
            boxShadow: '0 8px 24px rgba(214, 36, 159, 0.45)',
          }}
        >
          {/* Subtle pulse ring on idle */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 opacity-30 group-hover:opacity-60 blur-sm transition-opacity animate-pulse" />

          {/* Official Instagram SVG Icon */}
          <svg
            className="w-7 h-7 relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
          </svg>
        </a>
      </div>

      {/* WhatsApp Button */}
      <div className="relative flex items-center group">
        {/* Tooltip / Label */}
        <div
          className={`mr-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-emerald-500/30 text-xs text-white/90 shadow-xl transition-all duration-300 pointer-events-none ${
            hovered === 'wa' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Falar no WhatsApp com Matheus</span>
          <span className="text-emerald-400 font-medium">Online</span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('wa')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Conversar no WhatsApp com o corretor Matheus Willamis"
          className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2bf075] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
          style={{
            boxShadow: '0 8px 28px rgba(37, 211, 102, 0.45)',
          }}
        >
          {/* Pulsing ring animation */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-75 blur-md animate-ping" />

          {/* Official WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 relative z-10 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Quick status dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black" />
        </a>
      </div>
    </aside>
  );
}
