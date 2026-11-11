import React, { useState } from 'react';
import { Property } from '../types';
import { 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  Phone, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';
import { useData } from '../context/DataContext';
import confetti from 'canvas-confetti';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onOpenSchedule: (target: Property) => void;
  onSelectProperty: (prop: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onOpenSchedule,
  onSelectProperty,
}) => {
  const { properties, empreendimentos, submitLead, settings } = useData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  const linkedEmpreendimento = property.empreendimentoId
    ? empreendimentos.find((e) => e.id === property.empreendimentoId)
    : null;

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.locationNeighborhood === property.locationNeighborhood || p.transactionType === property.transactionType))
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Confira este imóvel em Olinda: ${property.title} com Matheus Willamis (CRECI 24.231)`,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá Matheus Willamis! Tenho interesse no imóvel ${property.title} (Código: ${property.code || property.id}). Poderia me passar mais detalhes?`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleInlineLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        interestType: 'imovel',
        targetId: property.id,
        targetTitle: property.title,
        message: message.trim() || undefined,
        originUrl: window.location.href,
        utmSource: 'pagina_imovel',
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ffffff'],
        });
      } catch (err) {
        // silent
      }

      setFormSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Voltar ao Catálogo</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 border border-white/10 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>

          <button
            onClick={handleDirectWhatsApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Direto</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Content vs Sticky Contact Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (8 cols): Photo Gallery + Property Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Photo Gallery with Big Display and Thumbnails */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between">
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 hover:text-[#d4af37] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 hover:text-[#d4af37] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-md bg-[#d4af37] text-[#0a0b0e] text-xs font-bold uppercase tracking-wider">
                  {property.transactionType === 'venda' ? 'Venda' : 'Locação'}
                </span>
                {property.status === 'a_confirmar' && (
                  <span className="px-3 py-1 rounded-md bg-amber-950/90 text-amber-300 border border-amber-500/40 text-xs font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    A Confirmar Disponibilidade
                  </span>
                )}
              </div>

              {/* Property code */}
              {property.code && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 text-xs font-mono text-gray-300 border border-white/10">
                  Ref: {property.code}
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeImageIndex
                        ? 'border-[#d4af37] scale-95'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Location & Key Specs */}
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold mb-2">
              <MapPin className="w-4 h-4" />
              <span>{property.locationNeighborhood}, {property.locationCity}</span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {property.title}
            </h1>

            {/* Price Row for Mobile */}
            <div className="lg:hidden p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
              <div className="text-xs text-gray-400">
                {property.transactionType === 'locacao' ? 'Valor do Aluguel' : 'Valor de Venda'}
              </div>
              <div className="text-2xl font-bold text-[#d4af37] font-serif-luxury">
                {property.priceFormatted || `R$ ${property.price.toLocaleString('pt-BR')}`}
              </div>
            </div>

            {/* High-level Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0e1015] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Quartos</div>
                  <div className="text-sm font-bold text-white">{property.bedrooms} {property.suites ? `(${property.suites} suíte)` : ''}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Banheiros</div>
                  <div className="text-sm font-bold text-white">{property.bathrooms || 1} banheiros</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Garagem</div>
                  <div className="text-sm font-bold text-white">{property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Área Construída</div>
                  <div className="text-sm font-bold text-white">{property.totalArea} m²</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10 space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              Descrição do Imóvel
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities List */}
          {property.features && property.features.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Destaques & Características
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linked Empreendimento Card if applicable */}
          {linkedEmpreendimento && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#12141c] to-[#0e1015] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={linkedEmpreendimento.coverImage}
                alt={linkedEmpreendimento.name}
                className="w-full sm:w-44 h-32 rounded-xl object-cover"
              />
              <div className="space-y-2 flex-1 text-center sm:text-left">
                <div className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider">
                  Edifício / Condomínio Vinculado
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-white">
                  {linkedEmpreendimento.name}
                </h4>
                <p className="text-xs text-gray-400">
                  {linkedEmpreendimento.subtitle}
                </p>
                <div className="text-xs text-gray-300">
                  {linkedEmpreendimento.neighborhood}, {linkedEmpreendimento.city}
                </div>
              </div>
            </div>
          )}

          {/* Legal and Historical Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/80 leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso Importante:</strong> {property.disclaimer || settings.disclaimerText}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Sticky Price & Lead Scheduling Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#0e1015] border border-[#d4af37]/40 rounded-3xl p-6 shadow-2xl space-y-6">
            
            {/* Price Box */}
            <div className="border-b border-white/10 pb-5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {property.transactionType === 'locacao' ? 'Valor da Locação' : 'Valor de Investimento'}
              </div>
              <div className="text-3xl font-extrabold text-[#d4af37] font-serif-luxury tracking-tight">
                {property.priceFormatted || `R$ ${property.price.toLocaleString('pt-BR')}`}
              </div>
              {property.rentalPeriod && (
                <div className="text-xs text-gray-400 mt-1">{property.rentalPeriod}</div>
              )}
            </div>

            {/* Broker Badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#b89228] p-0.5">
                <div className="w-full h-full rounded-full bg-[#0a0b0e] flex items-center justify-center">
                  <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">MW</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Matheus Willamis</div>
                <div className="text-[11px] text-[#d4af37] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  CRECI 24.231
                </div>
              </div>
            </div>

            {/* Direct Form */}
            {!formSent ? (
              <form onSubmit={handleInlineLeadSubmit} className="space-y-3">
                <div className="text-xs font-semibold text-white">
                  Solicitar Contato ou Agendar Visita:
                </div>

                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                />

                <input
                  type="tel"
                  required
                  placeholder="Seu WhatsApp (81) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                />

                <textarea
                  rows={2}
                  placeholder="Dúvida ou horário preferido para visita..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37] resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#0a0b0e]" />
                  Enviar Solicitação
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-white">Solicitação Enviada!</div>
                <p className="text-[11px] text-gray-300">
                  Matheus Willamis entrará em contato em breve.
                </p>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <button
                onClick={() => onOpenSchedule(property)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                Agendar Data Específica
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Conversar pelo WhatsApp
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="font-serif-luxury text-2xl font-bold text-white mb-6">
            Outras Oportunidades Semelhantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProperty(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-4 rounded-2xl bg-[#0e1015] border border-white/10 hover:border-[#d4af37]/60 transition-all cursor-pointer"
              >
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'}
                  alt={p.title}
                  className="w-full h-40 rounded-xl object-cover mb-3"
                />
                <div className="text-xs text-[#d4af37] font-semibold">{p.locationNeighborhood}</div>
                <h4 className="font-serif-luxury text-sm font-bold text-white group-hover:text-[#f3df9b] transition-colors line-clamp-1 mb-1">
                  {p.title}
                </h4>
                <div className="text-base font-extrabold text-[#d4af37] font-serif-luxury">
                  {p.priceFormatted || `R$ ${p.price.toLocaleString('pt-BR')}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
