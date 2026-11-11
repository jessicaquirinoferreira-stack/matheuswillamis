import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'whatsapp' | 'instagram' | 'explore';
    label: string;
    url?: string;
  };
}

const HUMAN_AVATAR =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80';

export default function VirtualAssistant() {
  const { settings, properties } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = settings.whatsappLink || 'https://w.app/matheuscorretor';
  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/matheuswillamiscorretor/';

  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Sou a Sofia, assistente virtual de Matheus Willamis (CRECI 24.231). 🌟 Estou aqui para te ajudar a encontrar o imóvel ideal em Olinda e região ou tirar dúvidas rápidas!',
      time: 'Agora',
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Como posso te orientar hoje? Escolha uma opção rápida abaixo ou digite sua pergunta:',
      time: 'Agora',
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const quickOptions = [
    { label: '🏢 Quero Comprar Imóvel', query: 'comprar imóvel' },
    { label: '🔑 Quero Alugar Imóvel', query: 'alugar imóvel' },
    { label: '💎 Oportunidade Fonte Atlântico 3', query: 'fonte atlantico' },
    { label: '📍 Bairros Atendidos', query: 'bairros atendidos' },
    { label: '📲 Falar com Matheus no WhatsApp', query: 'whatsapp' },
    { label: '📸 Conhecer Instagram Oficial', query: 'instagram' },
  ];

  const generateAnswer = (query: string): { text: string; action?: Message['action'] } => {
    const q = query.toLowerCase();

    if (q.includes('fonte') || q.includes('atlantico') || q.includes('6.500') || q.includes('itbi')) {
      return {
        text: 'O Edifício Fonte Atlântico 3 em Jardim Atlântico é um dos maiores destaques! Possui unidades de 2 e 3 quartos com suíte, varanda gourmet, lazer completo (piscina, rooftop, academia), ITBI e Registro 100% grátis e entrada super facilitada a partir de R$ 6.500! Quer receber a tabela de valores agora?',
        action: {
          type: 'whatsapp',
          label: 'Receber Tabela Fonte Atlântico no WhatsApp',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus, vim pela assistente Sofia e quero a tabela e condições do Edifício Fonte Atlântico 3.')}`,
        },
      };
    }

    if (q.includes('alug') || q.includes('loca') || q.includes('luar')) {
      return {
        text: 'Temos excelentes opções para locação, incluindo unidades mobiliadas e equipadas no Condomínio Luar de Olinda (Jardim Atlântico) e proximidades da beira-mar, prontas para morar com segurança e lazer.',
        action: {
          type: 'whatsapp',
          label: 'Ver Imóveis para Alugar no WhatsApp',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus, quero ver as opções disponíveis para locação em Olinda.')}`,
        },
      };
    }

    if (q.includes('comp') || q.includes('venda') || q.includes('adquir')) {
      return {
        text: `Temos diversas oportunidades selecionadas de venda em Olinda e Paulista (apartamentos com vista mar, condomínios com lazer completo e casas de alto padrão). Matheus Willamis oferece consultoria personalizada do financiamento bancário até a entrega das chaves!`,
        action: {
          type: 'whatsapp',
          label: 'Consultar Imóveis à Venda com Matheus',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus, gostaria de conhecer os imóveis à venda no seu catálogo.')}`,
        },
      };
    }

    if (q.includes('bairro') || q.includes('onde') || q.includes('regiao') || q.includes('olinda') || q.includes('paulista')) {
      return {
        text: 'Atuamos fortemente nas melhores localizações de Olinda e Grande Recife: Casa Caiada, Jardim Atlântico, Bairro Novo, Rio Doce e Janga/Paulista. Próximo a praias, Shopping Patteo Olinda, colégios e hospitais!',
        action: {
          type: 'whatsapp',
          label: 'Tirar Dúvida de Localização',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus, gostaria de saber quais opções você tem no meu bairro de preferência.')}`,
        },
      };
    }

    if (q.includes('insta') || q.includes('rede') || q.includes('feed') || q.includes('foto') || q.includes('video')) {
      return {
        text: 'Você pode acompanhar tours em vídeo, novidades do mercado e bastidores diretamente no Instagram oficial de Matheus: @matheuswillamiscorretor com conteúdos diários!',
        action: {
          type: 'instagram',
          label: 'Acessar Instagram @matheuswillamiscorretor',
          url: instagramUrl,
        },
      };
    }

    if (q.includes('whats') || q.includes('zap') || q.includes('contato') || q.includes('falar') || q.includes('telefone') || q.includes('numero') || q.includes('agend')) {
      return {
        text: 'O atendimento direto com o corretor Matheus Willamis (CRECI 24.231) é feito pelo WhatsApp oficial! Ele está à disposição para te enviar vídeos, simular seu financiamento ou agendar visitas.',
        action: {
          type: 'whatsapp',
          label: 'Abrir WhatsApp de Matheus Willamis',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus, gostaria de conversar sobre imóveis com você.')}`,
        },
      };
    }

    if (q.includes('creci') || q.includes('quem e') || q.includes('matheus')) {
      return {
        text: 'Matheus Willamis é corretor imobiliário credenciado sob o CRECI-PE 24.231, especialista no mercado de Olinda e região, reconhecido pelo atendimento ágil, transparente e seguro.',
        action: {
          type: 'whatsapp',
          label: 'Falar Diretamente com Matheus',
          url: `${whatsappUrl}?text=${encodeURIComponent('Olá Matheus Willamis, gostaria de conhecer o seu trabalho.')}`,
        },
      };
    }

    // Default polite response referring to Matheus
    return {
      text: `Excelente pergunta! Para detalhes específicos, simulação de parcelas e agendamento de visita, o próprio Matheus Willamis (CRECI 24.231) responde prontamente via WhatsApp ou nas redes sociais. Clique abaixo para falar agora:`,
      action: {
        type: 'whatsapp',
        label: 'Falar com Matheus no WhatsApp',
        url: `${whatsappUrl}?text=${encodeURIComponent(`Olá Matheus, vim pela sua assistente virtual Sofia. Minha dúvida é: ${query}`)}`,
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Natural brief typing pause for realistic, instant response
    setTimeout(() => {
      const response = generateAnswer(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        time: 'Agora',
        action: response.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center select-none">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir assistente virtual Sofia"
          className="relative flex items-center gap-3 p-1.5 pr-4 rounded-full bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={{
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Avatar with human photo & online indicator */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-inner flex-shrink-0">
            <img
              src={HUMAN_AVATAR}
              alt="Sofia - Assistente Virtual"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            {/* Green online ping */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-neutral-900" />
          </div>

          {/* Label */}
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-amber-200">Sofia</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                Assistente
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 font-light flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
              Tire dúvidas agora
            </p>
          </div>

          {/* Unread dot notification */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-black text-[9px] text-black font-bold items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Drawer/Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Janela de atendimento da assistente virtual Sofia"
          className="fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[82vh] sm:max-h-[580px] flex flex-col rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-amber-500/30 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/40 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400/80">
                <img
                  src={HUMAN_AVATAR}
                  alt="Sofia"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white tracking-wide">Sofia</h3>
                  <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <p className="text-[11px] text-amber-200/80">
                  Assistente Virtual de Matheus Willamis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Minimizar conversa"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick social bar inside assistant */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Atendimento oficial:</span>
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>WhatsApp</span>
                <span className="text-[9px]">↗</span>
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>Instagram</span>
                <span className="text-[9px]">↗</span>
              </a>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-md ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium rounded-tr-none'
                      : 'bg-neutral-900/90 text-neutral-100 border border-white/10 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Contextual Action Button */}
                  {m.action && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      <a
                        href={m.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold shadow transition-transform hover:scale-[1.02] active:scale-95 ${
                          m.action.type === 'whatsapp'
                            ? 'bg-[#25D366] hover:bg-[#20ba59] text-black font-bold'
                            : 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white'
                        }`}
                      >
                        {m.action.type === 'whatsapp' && (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                        )}
                        {m.action.type === 'instagram' && (
                          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        )}
                        <span>{m.action.label}</span>
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-900 border border-white/5 w-fit">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Pills */}
          <div className="px-3 py-2 bg-neutral-900/60 border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(opt.query)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-neutral-800/90 hover:bg-amber-500/20 hover:border-amber-400/50 border border-white/10 text-neutral-200 hover:text-amber-200 transition-colors flex-shrink-0 cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-neutral-950 border-t border-amber-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua dúvida ou imóvel de interesse..."
              className="flex-1 bg-neutral-900/90 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Enviar mensagem"
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-bold transition-all flex items-center justify-center cursor-pointer"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
