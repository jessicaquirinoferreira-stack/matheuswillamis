import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, User, Mail, MessageSquare, CheckCircle2, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { Property, Empreendimento } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: Property | Empreendimento | null;
  defaultInterestType?: 'visita' | 'imovel' | 'empreendimento' | 'contato_geral';
}

export const LeadModal: React.FC<LeadModalProps> = ({ 
  isOpen, 
  onClose, 
  targetItem,
  defaultInterestType = 'visita'
}) => {
  const { submitLead, settings } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState<'manha' | 'tarde' | 'noite' | 'qualquer'>('manha');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      const itemTitle = targetItem ? ('title' in targetItem ? targetItem.title : targetItem.name) : 'Contato Geral';
      const itemId = targetItem ? targetItem.id : undefined;

      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        interestType: defaultInterestType,
        targetId: itemId,
        targetTitle: itemTitle,
        preferredDate: date || undefined,
        preferredShift: shift,
        message: message.trim() || undefined,
        originUrl: window.location.href,
        utmSource: 'site_modal',
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3df9b', '#ffffff'],
        });
      } catch (err) {
        // silent
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar agendamento:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppForward = () => {
    const itemTitle = targetItem ? ('title' in targetItem ? targetItem.title : targetItem.name) : 'Imóvel em Olinda';
    const text = encodeURIComponent(
      `Olá Matheus Willamis! Solicitei agendamento no site para: ${itemTitle}. Meu nome é ${name} e meu WhatsApp é ${phone}. Aguardo seu retorno!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1015] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3df9b] text-xs font-semibold border border-[#d4af37]/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Atendimento Oficial com Matheus Willamis
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                Agendar Visita com o Corretor
              </h2>
              <p className="text-xs text-gray-400">
                {targetItem ? (
                  <span>
                    Imóvel de interesse:{' '}
                    <strong className="text-white">
                      {'title' in targetItem ? targetItem.title : targetItem.name}
                    </strong>
                  </span>
                ) : (
                  'Escolha o melhor dia e horário para conhecer imóveis exclusivos em Olinda e região.'
                )}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(81) 99999-9999"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Date & Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    Data Sugerida
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    Melhor Horário
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="manha" className="bg-[#0e1015]">Manhã (08h às 12h)</option>
                    <option value="tarde" className="bg-[#0e1015]">Tarde (13h às 18h)</option>
                    <option value="noite" className="bg-[#0e1015]">Final de tarde</option>
                    <option value="qualquer" className="bg-[#0e1015]">Qualquer horário</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                  Mensagem ou Dúvidas
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gostaria de saber detalhes sobre formas de pagamento, visita no final de semana, etc."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Registrando solicitação...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#0a0b0e]" />
                    Confirmar Solicitação de Visita
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                Solicitação Recebida com Sucesso!
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
                Obrigado, <strong className="text-white">{name}</strong>. Sua solicitação foi registrada no sistema. Matheus Willamis entrará em contato em breve para confirmar os detalhes.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={handleWhatsAppForward}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Agilizar Atendimento via WhatsApp
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-colors"
              >
                Concluir e Voltar ao Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
