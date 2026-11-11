import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Lock,
  Clock,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumLandingPageProps {
  onOpenSchedule: () => void;
  onNavigateHome: () => void;
}

export const PremiumLandingPage: React.FC<PremiumLandingPageProps> = ({
  onOpenSchedule,
  onNavigateHome,
}) => {
  const { activeLandingPage, properties, empreendimentos, submitLead, settings } = useData();
  const [activeImage, setActiveImage] = useState(0);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [shift, setShift] = useState<'manha' | 'tarde' | 'noite' | 'qualquer'>('manha');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const config = activeLandingPage;

  // Resolve target item (e.g. Fonte Atlântico 3)
  const targetProperty = config?.targetType === 'property'
    ? properties.find((p) => p.id === config.targetId) || properties[0]
    : null;

  const targetEmpreendimento = config?.targetType === 'empreendimento'
    ? empreendimentos.find((e) => e.id === config.targetId) || empreendimentos[0]
    : null;

  const heroImage = config?.heroImage || targetProperty?.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';

  const galleryImages = targetProperty?.images || targetEmpreendimento?.gallery || [heroImage];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        interestType: 'imovel',
        targetId: config?.targetId || 'landing-exclusive',
        targetTitle: config?.title || 'Oportunidade Premium Olinda',
        preferredShift: shift,
        message: message.trim() || undefined,
        originUrl: window.location.href,
        utmSource: config?.utmSource || 'landing_premium',
        utmMedium: 'campanha_especial',
      });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3df9b', '#ffffff'],
        });
      } catch (e) {
        // silent
      }

      setLeadCaptured(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Olá Matheus Willamis! Vi a oportunidade especial do ${config?.title || 'Residencial Fonte Atlântico'} no seu site e gostaria de agendar uma apresentação exclusiva!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#08090b] text-gray-200">
      
      {/* Top Banner Navigation */}
      <div className="w-full bg-black/60 border-b border-[#d4af37]/20 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar ao Portal Principal</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-gray-400 font-medium">Atendimento Exclusivo:</span>
            <span className="text-[#d4af37] font-bold">Matheus Willamis (CRECI 24.231)</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION WITH LUXURY IMPACT */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background Image with Ambient Parallax Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Oportunidade Exclusiva"
            className="w-full h-full object-cover brightness-[0.25] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090b] via-transparent to-[#08090b]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column: Headline, Bullets, Price Callout */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-xs font-extrabold text-[#f3df9b] tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              {config?.badgeText || 'OPORTUNIDADE EXCLUSIVA — OLINDA/PE'}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              {config?.headline || 'Conquiste Seu Apartamento em Jardim Atlântico'}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
              {config?.subheadline || 'Condições especiais com entrada super facilitada e documentação inclusa.'}
            </p>

            {/* Price Callout Banner */}
            {config?.showPrice && config?.customPrice && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#d4af37]/20 via-[#f3df9b]/10 to-transparent border border-[#d4af37]/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#0a0b0e] flex items-center justify-center shrink-0 font-bold shadow-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#e5c378] uppercase tracking-wider">
                    Condição Especial de Aquisição
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-serif-luxury">
                    {config.customPrice}
                  </div>
                </div>
              </div>
            )}

            {/* Bullets of differentials */}
            <div className="space-y-3 pt-2">
              {(config?.bullets || [
                'Entrada super facilitada a partir de R$ 6.500',
                'Documentação GRÁTIS (ITBI e Registro inclusos)',
                '2 quartos sendo 1 suíte confortável + WC social',
                'Varanda privativa integrada com ventilação fresca',
                '1 vaga de garagem demarcada e privativa',
                'Atendimento oficial e consultoria com Matheus Willamis (CRECI 24.231)'
              ]).map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-200">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Floating Trust Icons */}
            <div className="pt-4 flex flex-wrap gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                CRECI 24.231 Registrado
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                Olinda e Região Metropolitana
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#d4af37]" />
                Dados e Privacidade 100% Protegidos
              </span>
            </div>

          </div>

          {/* Right Column: High Conversion Lead Capture Box */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0e1015]/90 backdrop-blur-2xl border-2 border-[#d4af37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              
              {!leadCaptured ? (
                <div>
                  <div className="text-center mb-6">
                    <span className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">
                      Atendimento Imediato
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                      {config?.contactFormTitle || 'Garanta Sua Apresentação Exclusiva'}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Preencha os dados abaixo para receber tabela de valores e agendar visita com Matheus Willamis.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        WhatsApp para Contato *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(81) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carlos@exemplo.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Melhor Turno para Conversarmos
                      </label>
                      <select
                        value={shift}
                        onChange={(e) => setShift(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="manha" className="bg-[#0e1015]">Manhã (08h às 12h)</option>
                        <option value="tarde" className="bg-[#0e1015]">Tarde (13h às 18h)</option>
                        <option value="noite" className="bg-[#0e1015]">Final de tarde</option>
                        <option value="qualquer" className="bg-[#0e1015]">Qualquer horário comercial</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-extrabold text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Registrando solicitação...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#0a0b0e]" />
                          <span>{config?.callToAction || 'Quero Garantir Minha Condição'}</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      onClick={handleWhatsAppInstant}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Prefere falar agora? Chamar direto no WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                /* Success Feedback */
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-white">
                    Solicitação Confirmada!
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Obrigado, <strong className="text-white">{name}</strong>. Matheus Willamis recebeu sua solicitação e entrará em contato em breve para apresentar todas as condições.
                  </p>

                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      onClick={handleWhatsAppInstant}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Phone className="w-4 h-4" />
                      Abrir Conversa no WhatsApp Agora
                    </button>

                    <button
                      onClick={onNavigateHome}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                    >
                      Voltar ao Portal Imobiliário
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* GALLERY SHOWCASE */}
      <section className="py-16 bg-[#0a0b0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              Perspectivas & Fotografias
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1">
              Galeria do Imóvel
            </h2>
          </div>

          <div className="relative aspect-[16/9] max-h-[550px] w-full rounded-3xl overflow-hidden bg-black/60 border border-white/10 mb-4">
            <img
              src={galleryImages[activeImage]}
              alt="Galeria"
              className="w-full h-full object-cover"
            />
            {galleryImages.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                <button
                  onClick={() => setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 hover:text-[#d4af37] transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev + 1) % galleryImages.length)}
                  className="p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 hover:text-[#d4af37] transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImage ? 'border-[#d4af37] scale-95' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE MATHEUS WILLAMIS */}
      <section className="py-20 bg-gradient-to-b from-[#0a0b0e] via-[#0d0f14] to-[#08090b] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-full max-w-[280px] mx-auto mb-4 flex items-center justify-center">
            <img
              src="https://i.postimg.cc/3wvWLM7W/Logo-imobiliario-dourado-de-Matheus-Willamis.png"
              alt="Logo Oficial Matheus Willamis"
              className="w-auto h-24 sm:h-28 max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]"
            />
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Atendimento Pessoal com Matheus Willamis
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Corretor imobiliário credenciado sob o <strong>CRECI 24.231</strong>. Acompanhamento integral desde a escolha da unidade, análise de fluxo de pagamento, aprovação de crédito e entrega das chaves.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleWhatsAppInstant}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#0a0b0e]" />
              Falar Direto no WhatsApp
            </button>

            <button
              onClick={onNavigateHome}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-semibold transition-all"
            >
              Ver Outros Imóveis no Portal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
