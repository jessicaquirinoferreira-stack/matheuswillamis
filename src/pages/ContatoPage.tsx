import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContatoPage: React.FC = () => {
  const { settings, submitLead } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        interestType: 'contato_geral',
        message: message.trim() || undefined,
        originUrl: window.location.href,
        utmSource: 'pagina_contato',
      });

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ffffff'],
        });
      } catch (err) {}

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2 block">
          Fale com Matheus Willamis
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-3">
          Canais de Atendimento
        </h1>
        <p className="text-sm text-gray-400">
          Tire dúvidas sobre imóveis, agende visitas personalizadas ou solicite avaliação de mercado em Olinda e região.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#0e1015] border border-[#d4af37]/30 space-y-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Atendimento Direto
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href={settings.whatsappLink || 'https://w.app/matheuscorretor'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">WhatsApp Oficial</div>
                  <div className="font-bold text-white text-sm">w.app/matheuscorretor</div>
                </div>
              </a>

              <a
                href={settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">Instagram Oficial</div>
                  <div className="font-bold text-white text-sm">@matheuswillamiscorretor</div>
                </div>
              </a>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">Registro Profissional</div>
                  <div className="font-bold text-white text-sm">CRECI 24.231 • Regular</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">Região de Atuação</div>
                  <div className="font-bold text-white text-sm">Olinda e Região Metropolitana (PE)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-[#0e1015] border border-white/10 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
                  Envie uma Mensagem
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Preencha os campos para receber o retorno do corretor com as melhores oportunidades.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(81) 99999-9999"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Mensagem ou Imóvel de Interesse</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Olá Matheus, procuro apartamento de 2 quartos em Casa Caiada..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df9b] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0a0b0e]" />
                  Enviar Mensagem
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Mensagem Enviada com Sucesso!
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Agradecemos seu contato. Matheus Willamis responderá via WhatsApp em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
