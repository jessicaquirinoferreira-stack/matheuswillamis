import React, { useState, useEffect, useRef } from 'react';
import { SkipForward, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const exitingRef = useRef(false);
  const completedRef = useRef(false);

  // Exact 7.0 seconds (7000ms)
  const TOTAL_DURATION = 7000;

  useEffect(() => {
    // Disable body scroll during cinematic intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let isMounted = true;

    const tick = (time: number) => {
      if (!isMounted) return;
      if (!startTimeRef.current) startTimeRef.current = time;
      const currentElapsed = time - startTimeRef.current;
      setElapsed(currentElapsed);

      // Begin cinematic curtain fade at 6.4s (6400ms) to dissolve cleanly by 7.0s
      if (currentElapsed >= TOTAL_DURATION - 600 && !exitingRef.current) {
        exitingRef.current = true;
        setIsExiting(true);
      }

      // Finish and open site at 7.0s (7000ms)
      if (currentElapsed >= TOTAL_DURATION) {
        if (!completedRef.current) {
          completedRef.current = true;
          document.body.style.overflow = originalOverflow;
          onComplete();
        }
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (completedRef.current) return;
    setIsExiting(true);
    setTimeout(() => {
      completedRef.current = true;
      onComplete();
    }, 250);
  };

  // Letters of MATHEUS WILLIAMIS for letter-by-letter animation
  const nameFirstPart = "MATHEUS".split("");
  const nameSecondPart = "WILLIAMIS".split("");

  // Helper time in seconds
  const time = elapsed / 1000;

  return (
    <div
      role="dialog"
      aria-label="Abertura cinematográfica Matheus Williamis"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#000000] overflow-hidden select-none transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        /* Realistic Gold Metallic Gradients & Shimmer */
        .gold-shimmer-sweep {
          background: linear-gradient(
            110deg,
            rgba(212, 175, 55, 0) 0%,
            rgba(243, 223, 155, 0.15) 35%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(243, 223, 155, 0.15) 65%,
            rgba(212, 175, 55, 0) 100%
          );
          background-size: 200% 100%;
        }

        /* SVG stroke drawing simulation calibrated for 7s pacing */
        .monogram-stroke {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawStroke 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.8s;
        }

        .circle-stroke {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawCircle 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.7s;
        }

        @keyframes drawStroke {
          0% { stroke-dashoffset: 600; opacity: 0; }
          10% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes drawCircle {
          0% { stroke-dashoffset: 800; opacity: 0; }
          10% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        /* Anamorphic horizontal flare */
        @keyframes horizontalFlare {
          0% { transform: scaleX(0); opacity: 0; }
          40% { transform: scaleX(1); opacity: 0.95; }
          80% { transform: scaleX(1.4); opacity: 0.4; }
          100% { transform: scaleX(0); opacity: 0; }
        }

        .animate-horizontal-flare {
          animation: horizontalFlare 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Subtle gold ambient breathe */
        @keyframes goldBreathe {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.48; transform: scale(1.1); }
        }

        .animate-gold-breathe {
          animation: goldBreathe 3.5s ease-in-out infinite alternate;
        }
      `}</style>

      {/* CENA 1: Volumetric Golden Central Glow & Anamorphic Horizontal Flare (0.0s - 0.8s) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft radial golden aura */}
        <div 
          className={`w-[650px] h-[650px] rounded-full bg-radial from-[#d4af37]/25 via-[#d4af37]/5 to-transparent blur-3xl transition-opacity duration-1000 ${
            time >= 0.15 ? 'opacity-100' : 'opacity-0'
          } animate-gold-breathe`}
        />

        {/* Anamorphic horizontal golden beam sweep (0.1s - 1.3s) */}
        {time >= 0.1 && time <= 1.3 && (
          <div className="absolute w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#fff5d0] to-transparent shadow-[0_0_25px_#d4af37,0_0_45px_#f3df9b] animate-horizontal-flare" />
        )}
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-4xl w-full text-center">
        
        {/* CENA 2: MONOGRAMA MW RECONSTRUÍDO DO ZERO EM SVG VETORIAL COM FACETAS DE OURO 3D (0.8s - 2.5s) */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6 flex items-center justify-center">
          
          {/* Subtle back illumination glow */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#916f1a]/30 via-[#e5c378]/25 to-[#d4af37]/40 blur-xl transition-opacity duration-1000 ${
              time >= 1.4 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <svg
            viewBox="0 0 240 240"
            className="w-full h-full relative z-10 drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]"
          >
            <defs>
              {/* Rich Polished Gold Gradient 1: Main Facing */}
              <linearGradient id="goldMetallicMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3d1" />
                <stop offset="25%" stopColor="#e5c378" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="75%" stopColor="#b89228" />
                <stop offset="100%" stopColor="#805f15" />
              </linearGradient>

              {/* Rich Polished Gold Gradient 2: Right / Shadowed Facets */}
              <linearGradient id="goldMetallicDark" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5c378" />
                <stop offset="35%" stopColor="#b89228" />
                <stop offset="70%" stopColor="#7a5a12" />
                <stop offset="100%" stopColor="#4a3608" />
              </linearGradient>

              {/* Bright Specular Bevel Gradient */}
              <linearGradient id="goldBevelLight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f3df9b" />
                <stop offset="100%" stopColor="#916f1a" />
              </linearGradient>

              {/* Laser / Line stroke gradient */}
              <linearGradient id="laserGoldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b89228" />
                <stop offset="50%" stopColor="#fff5d0" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>

              {/* Filter for 3D metallic specular gleam */}
              <filter id="goldSpecular" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* 1. Precision Outer Circular Frame */}
            <circle
              cx="120"
              cy="120"
              r="104"
              fill="none"
              stroke="url(#laserGoldStroke)"
              strokeWidth="2.5"
              className="circle-stroke"
            />
            <circle
              cx="120"
              cy="120"
              r="98"
              fill="none"
              stroke="url(#goldMetallicDark)"
              strokeWidth="1"
              strokeDasharray="4 4"
              className={`transition-opacity duration-700 ${time >= 1.7 ? 'opacity-60' : 'opacity-0'}`}
            />

            {/* 2. THE MONOGRAM MW FACETED VECTORS (Fills fade in from 2.0s onwards) */}
            <g
              filter="url(#goldSpecular)"
              className={`transition-opacity duration-1000 ${
                time >= 2.0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Left Pillar of M (Faceted 3D) */}
              <path
                d="M 54 175 L 54 75 L 74 65 L 74 175 Z"
                fill="url(#goldMetallicMain)"
              />
              <path
                d="M 74 65 L 82 72 L 82 175 L 74 175 Z"
                fill="url(#goldMetallicDark)"
              />

              {/* Left Diagonal Chevron of M */}
              <path
                d="M 74 65 L 120 135 L 110 145 L 68 80 Z"
                fill="url(#goldBevelLight)"
              />

              {/* Right Diagonal Chevron of M */}
              <path
                d="M 166 65 L 120 135 L 130 145 L 172 80 Z"
                fill="url(#goldMetallicDark)"
              />

              {/* Right Pillar of M (Faceted 3D) */}
              <path
                d="M 186 175 L 186 75 L 166 65 L 166 175 Z"
                fill="url(#goldMetallicMain)"
              />
              <path
                d="M 166 65 L 158 72 L 158 175 L 166 175 Z"
                fill="url(#goldBevelLight)"
              />

              {/* Central Interlocking W Structure (Interlaced Geometry) */}
              <path
                d="M 80 175 L 105 105 L 115 108 L 94 175 Z"
                fill="url(#goldBevelLight)"
              />
              <path
                d="M 105 105 L 120 152 L 114 158 L 98 112 Z"
                fill="url(#goldMetallicDark)"
              />
              <path
                d="M 120 152 L 135 105 L 142 112 L 126 158 Z"
                fill="url(#goldMetallicMain)"
              />
              <path
                d="M 135 105 L 160 175 L 146 175 L 125 108 Z"
                fill="url(#goldBevelLight)"
              />

              {/* Center Crest Apex Diamond Accent */}
              <polygon
                points="120,68 126,78 120,88 114,78"
                fill="url(#goldBevelLight)"
              />
            </g>

            {/* Stroke Drawing Lines (Laser Engraving Effect: 0.8s - 2.5s) */}
            <g
              fill="none"
              stroke="url(#laserGoldStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={time < 2.5 ? 'monogram-stroke' : 'opacity-0'}
            >
              <path d="M 54 175 L 54 75 L 74 65 L 120 135 L 166 65 L 186 75 L 186 175" />
              <path d="M 74 65 L 74 175" />
              <path d="M 166 65 L 166 175" />
              <path d="M 82 175 L 105 105 L 120 152 L 135 105 L 158 175" />
            </g>

            {/* Specular Edge Highlights */}
            {time >= 2.2 && (
              <g fill="none" stroke="url(#goldBevelLight)" strokeWidth="1" opacity="0.85">
                <path d="M 54 75 L 74 65 L 120 135" />
                <path d="M 186 75 L 166 65 L 120 135" />
                <path d="M 105 105 L 120 152 L 135 105" />
              </g>
            )}

            {/* CENA 6: Radiant Gleam Sweep Flare on Symbol at 6.3s */}
            {time >= 6.3 && time <= 7.0 && (
              <circle
                cx="120"
                cy="120"
                r="85"
                fill="url(#goldBevelLight)"
                opacity="0.38"
                className="animate-ping"
              />
            )}
          </svg>
        </div>

        {/* CENA 3: CONSTRUÇÃO DO NOME LETRA POR LETRA — MATHEUS WILLIAMIS (2.4s - 4.8s) */}
        <div className="min-h-[46px] sm:min-h-[60px] flex items-center justify-center mb-3">
          <h1 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.25em] flex items-center justify-center flex-wrap">
            
            {/* FIRST WORD: MATHEUS (7 letters revealed between 2.4s and 3.4s) */}
            <span className="flex items-center">
              {nameFirstPart.map((letter, index) => {
                const triggerTime = 2.4 + index * 0.14;
                const isRevealed = time >= triggerTime;

                return (
                  <span
                    key={`matheus-${index}`}
                    style={{
                      transition: 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out',
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.9)',
                      filter: isRevealed ? 'drop-shadow(0 2px 10px rgba(212,175,55,0.45))' : 'none',
                    }}
                    className="inline-block gold-gradient-text select-none"
                  >
                    {letter}
                  </span>
                );
              })}
            </span>

            {/* Space between names */}
            <span className="inline-block w-3 sm:w-6" />

            {/* SECOND WORD: WILLIAMIS (9 letters revealed between 3.5s and 4.7s) */}
            <span className="flex items-center">
              {nameSecondPart.map((letter, index) => {
                const triggerTime = 3.5 + index * 0.13;
                const isRevealed = time >= triggerTime;

                return (
                  <span
                    key={`williamis-${index}`}
                    style={{
                      transition: 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out',
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.9)',
                      filter: isRevealed ? 'drop-shadow(0 2px 10px rgba(212,175,55,0.45))' : 'none',
                    }}
                    className="inline-block gold-gradient-text select-none"
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </h1>
        </div>

        {/* CENA 4: IDENTIDADE PROFISSIONAL (4.7s - 5.7s)
            "━━━━ CORRETOR DE IMÓVEIS ━━━━" */}
        <div
          style={{
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            opacity: time >= 4.7 ? 1 : 0,
            transform: time >= 4.7 ? 'translateY(0)' : 'translateY(8px)',
          }}
          className="flex items-center justify-center gap-3 sm:gap-6 my-2 w-full max-w-md sm:max-w-lg"
        >
          {/* Left Fine Golden Horizontal Line */}
          <div
            style={{
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: time >= 4.7 ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'right',
            }}
            className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-[#f3df9b]"
          />

          {/* Subtitle text */}
          <div className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#f3df9b] shrink-0 font-sans">
            CORRETOR DE IMÓVEIS
          </div>

          {/* Right Fine Golden Horizontal Line */}
          <div
            style={{
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: time >= 4.7 ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
            }}
            className="flex-1 h-[1.5px] bg-gradient-to-r from-[#f3df9b] via-[#d4af37] to-transparent"
          />
        </div>

        {/* CENA 5: REGISTRO PROFISSIONAL (5.7s - 6.3s)
            "CRECI-PE 24231" */}
        <div
          style={{
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            opacity: time >= 5.7 ? 1 : 0,
            transform: time >= 5.7 ? 'translateY(0)' : 'translateY(6px)',
          }}
          className="mt-2"
        >
          <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-[#d4af37]/90 px-3 py-1 rounded-md border border-[#d4af37]/25 bg-black/50">
            CRECI-PE 24231
          </span>
        </div>

        {/* CENA 6: Reflexo Especular Final em Todo o Conjunto (6.3s - 7.0s) */}
        {time >= 6.3 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12 animate-pulse" />
          </div>
        )}

      </div>

      {/* DISCREET "PULAR INTRODUÇÃO" BUTTON (Bottom Right) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-gray-400 hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 text-[11px] font-medium tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
        title="Pular introdução e abrir o site imediatamente"
      >
        <span>Pular</span>
        <SkipForward className="w-3.5 h-3.5 text-[#d4af37]" />
      </button>

      {/* Minimal Gold Progress Line at bottom (Timed for 7.0s) */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5 pointer-events-none">
        <div
          style={{ width: `${Math.min((elapsed / TOTAL_DURATION) * 100, 100)}%` }}
          className="h-full bg-gradient-to-r from-[#916f1a] via-[#d4af37] to-[#fff3d1] transition-all duration-75"
        />
      </div>
    </div>
  );
};
