import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Property, 
  Empreendimento, 
  LandingPageConfig, 
  Lead, 
  SiteSettings,
  PropertyType,
  PropertyStatus
} from '../types';
import { 
  Building2, 
  Home, 
  Users, 
  Sparkles, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  ExternalLink, 
  LogOut, 
  LogIn, 
  Save, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Search,
  Eye,
  Key
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
  onPreviewProperty: (property: Property) => void;
  onPreviewEmpreendimento: (emp: Empreendimento) => void;
  onPreviewLanding: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToSite,
  onPreviewProperty,
  onPreviewEmpreendimento,
  onPreviewLanding,
}) => {
  const { 
    currentUser, 
    isAdmin, 
    isDemoAdmin, 
    loginWithGoogle, 
    loginWithEmail, 
    logout, 
    enableDemoAdmin, 
    resetPassword 
  } = useAuth();

  const { 
    properties, 
    empreendimentos, 
    landingPages, 
    activeLandingPage, 
    settings, 
    leads, 
    saveProperty, 
    deleteProperty, 
    saveEmpreendimento, 
    deleteEmpreendimento, 
    saveLandingPage, 
    saveSettings, 
    updateLeadStatus, 
    deleteLead, 
    resetToInitialData 
  } = useData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'empreendimentos' | 'landing' | 'leads' | 'settings'>('dashboard');

  // Auth form states
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Editing Property State
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingEmpreendimento, setEditingEmpreendimento] = useState<Empreendimento | null>(null);
  const [editingLanding, setEditingLanding] = useState<LandingPageConfig | null>(activeLandingPage);
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await loginWithEmail(authEmail, authPassword);
      showNotification('Login realizado com sucesso!');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao realizar login');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await loginWithGoogle();
      showNotification('Autenticado com Google com sucesso!');
    } catch (err: any) {
      setAuthError(err.message || 'Erro no login com Google');
    }
  };

  const handlePasswordReset = async () => {
    if (!authEmail) {
      setAuthError('Digite seu e-mail para recuperar a senha');
      return;
    }
    try {
      await resetPassword(authEmail);
      setAuthSuccess('E-mail de recuperação enviado!');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao enviar e-mail');
    }
  };

  // If not authenticated, show luxury login screen
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0e1015] border border-[#d4af37]/40 rounded-3xl p-8 shadow-2xl relative">
          
          <div className="text-center mb-8">
            <div className="w-full max-w-[260px] mx-auto mb-4 flex items-center justify-center">
              <img
                src="https://i.postimg.cc/3wvWLM7W/Logo-imobiliario-dourado-de-Matheus-Willamis.png"
                alt="Matheus Willamis Corretor"
                className="w-auto h-20 max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]"
              />
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold text-white">
              Painel de Gestão Imobiliária
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Acesso exclusivo para Matheus Willamis (CRECI 24.231)
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200">
              {authSuccess}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                E-mail Administrativo
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="corretor@matheuswillamis.com.br"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Entrar no Painel
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Entrar com Google</span>
            </button>

            {/* 1-Click Demo Admin button for seamless review */}
            <button
              onClick={enableDemoAdmin}
              className="w-full py-2.5 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#f3df9b] border border-[#d4af37]/40 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Key className="w-3.5 h-3.5 text-[#d4af37]" />
              Acessar como Administrador Demonstrativo
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] text-gray-400">
            <button onClick={handlePasswordReset} className="hover:text-white transition-colors">
              Esqueci minha senha
            </button>
            <button onClick={onBackToSite} className="hover:text-white transition-colors">
              Voltar ao site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Property Save
  const handleSavePropertyForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    await saveProperty(editingProperty);
    setEditingProperty(null);
    showNotification('Imóvel salvo com sucesso no Firestore!');
  };

  // Handle Empreendimento Save
  const handleSaveEmpreendimentoForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmpreendimento) return;
    await saveEmpreendimento(editingEmpreendimento);
    setEditingEmpreendimento(null);
    showNotification('Empreendimento salvo com sucesso no Firestore!');
  };

  // Handle Landing Page Save
  const handleSaveLandingForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLanding) return;
    await saveLandingPage(editingLanding);
    showNotification('Landing page premium atualizada com sucesso!');
  };

  // Handle Settings Save
  const handleSaveSettingsForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(tempSettings);
    showNotification('Configurações do site salvas com sucesso!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e1015] border border-[#d4af37] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#d4af37]/20 text-[#f3df9b] text-[10px] font-bold uppercase tracking-wider border border-[#d4af37]/40">
              Área Administrativa Restrita
            </span>
            {isDemoAdmin && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/30">
                Modo Demonstração Ativo
              </span>
            )}
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Gestão do Portal Matheus Willamis
          </h1>
          <p className="text-xs text-gray-400">
            Gerencie imóveis, empreendimentos, landing pages, leads e configurações gerais.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4 text-[#d4af37]" />
            Ver Site Público
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
        {[
          { id: 'dashboard', label: 'Dashboard & Métricas', icon: Home },
          { id: 'properties', label: `Imóveis (${properties.length})`, icon: Building2 },
          { id: 'empreendimentos', label: `Empreendimentos (${empreendimentos.length})`, icon: Building2 },
          { id: 'landing', label: 'Landing Page Premium', icon: Sparkles },
          { id: 'leads', label: `Leads & Visitas (${leads.length})`, icon: Users },
          { id: 'settings', label: 'Configurações do Site', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingProperty(null);
                setEditingEmpreendimento(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#d4af37] text-[#0a0b0e] shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Total de Imóveis Cadastrados</div>
              <div className="text-3xl font-extrabold text-[#d4af37] font-serif-luxury">{properties.length}</div>
              <div className="text-[11px] text-gray-500 mt-2">
                {properties.filter((p) => p.transactionType === 'venda').length} para Venda • {properties.filter((p) => p.transactionType === 'locacao').length} para Locação
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Empreendimentos / Edifícios</div>
              <div className="text-3xl font-extrabold text-[#d4af37] font-serif-luxury">{empreendimentos.length}</div>
              <div className="text-[11px] text-gray-500 mt-2">Condomínios monitorados em Olinda e Paulista</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Leads & Solicitações de Visita</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-serif-luxury">{leads.length}</div>
              <div className="text-[11px] text-gray-500 mt-2">
                {leads.filter((l) => l.status === 'novo').length} novos para atendimento
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1015] border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Status da Landing Page</div>
              <div className="text-lg font-bold text-white font-serif-luxury mt-1">
                {activeLandingPage?.active ? 'Ativa & Publicada' : 'Pausada'}
              </div>
              <div className="text-[11px] text-[#d4af37] mt-2 truncate">
                {activeLandingPage?.title || 'Nenhuma configurada'}
              </div>
            </div>
          </div>

          {/* Seed reset & Quick Tools */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Carregar / Restaurar Dados Originais de Olinda</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Restaura os imóveis históricos (Fonte Atlântico 3, Luar, Mansão Jardim Atlântico, Bairro Novo, Rio Doce) e empreendimentos no Firestore.
              </p>
            </div>
            <button
              onClick={async () => {
                if (window.confirm('Deseja recarregar os dados padrão originais?')) {
                  await resetToInitialData();
                  showNotification('Dados padrão carregados com sucesso!');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Catálogo Oficial
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTIES MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          {!editingProperty ? (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif-luxury text-xl font-bold text-white">
                    Gerenciamento de Imóveis
                  </h2>
                  <p className="text-xs text-gray-400">
                    Cadastre novos imóveis, altere preços, fotos e status de publicação.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingProperty({
                      id: `prop-${Date.now()}`,
                      code: `MW-${Math.floor(100 + Math.random() * 900)}`,
                      title: '',
                      slug: '',
                      transactionType: 'venda',
                      propertyType: 'apartamento',
                      price: 0,
                      priceFormatted: '',
                      locationNeighborhood: 'Jardim Atlântico',
                      locationCity: 'Olinda/PE',
                      bedrooms: 2,
                      suites: 1,
                      bathrooms: 2,
                      parkingSpaces: 1,
                      totalArea: 60,
                      description: '',
                      features: ['Varanda', 'Garagem'],
                      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
                      featured: false,
                      status: 'disponivel',
                      order: properties.length + 1,
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Imóvel
                </button>
              </div>

              {/* Table of Properties */}
              <div className="bg-[#0e1015] border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Imóvel</th>
                        <th className="py-3 px-4">Tipo / Operação</th>
                        <th className="py-3 px-4">Localização</th>
                        <th className="py-3 px-4">Preço</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={prop.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80'}
                              alt=""
                              className="w-12 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{prop.title}</div>
                              <div className="text-[10px] text-gray-400 font-mono">Ref: {prop.code || prop.id}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize">{prop.propertyType}</span> •{' '}
                            <span className="text-[#d4af37] font-semibold uppercase text-[10px]">
                              {prop.transactionType}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {prop.locationNeighborhood}, {prop.locationCity}
                          </td>
                          <td className="py-3 px-4 font-bold text-[#d4af37]">
                            {prop.priceFormatted || `R$ ${prop.price.toLocaleString('pt-BR')}`}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              prop.status === 'disponivel' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                            }`}>
                              {prop.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onPreviewProperty(prop)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                                title="Visualizar página"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingProperty(prop)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#d4af37]"
                                title="Editar"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Excluir ${prop.title}?`)) {
                                    await deleteProperty(prop.id);
                                    showNotification('Imóvel excluído!');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300"
                                title="Excluir"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Editing / Creating Form */
            <div className="bg-[#0e1015] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  {editingProperty.title ? `Editar: ${editingProperty.title}` : 'Novo Imóvel'}
                </h3>
                <button
                  onClick={() => setEditingProperty(null)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleSavePropertyForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Título do Imóvel *</label>
                    <input
                      type="text"
                      required
                      value={editingProperty.title}
                      onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                      placeholder="Ex: Residencial Fonte Atlântico 3 – Oportunidade"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Código de Referência</label>
                    <input
                      type="text"
                      value={editingProperty.code}
                      onChange={(e) => setEditingProperty({ ...editingProperty, code: e.target.value })}
                      placeholder="Ex: MW-001"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Operação</label>
                    <select
                      value={editingProperty.transactionType}
                      onChange={(e) => setEditingProperty({ ...editingProperty, transactionType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    >
                      <option value="venda" className="bg-[#0e1015]">Venda</option>
                      <option value="locacao" className="bg-[#0e1015]">Locação</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Tipo de Imóvel</label>
                    <select
                      value={editingProperty.propertyType}
                      onChange={(e) => setEditingProperty({ ...editingProperty, propertyType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    >
                      <option value="apartamento" className="bg-[#0e1015]">Apartamento</option>
                      <option value="casa" className="bg-[#0e1015]">Casa</option>
                      <option value="cobertura" className="bg-[#0e1015]">Cobertura</option>
                      <option value="terreno" className="bg-[#0e1015]">Terreno</option>
                      <option value="comercial" className="bg-[#0e1015]">Comercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Status</label>
                    <select
                      value={editingProperty.status}
                      onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    >
                      <option value="disponivel" className="bg-[#0e1015]">Disponível</option>
                      <option value="a_confirmar" className="bg-[#0e1015]">A Confirmar Disponibilidade</option>
                      <option value="reservado" className="bg-[#0e1015]">Reservado</option>
                      <option value="vendido" className="bg-[#0e1015]">Vendido</option>
                      <option value="locado" className="bg-[#0e1015]">Locado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Preço Numérico (R$)</label>
                    <input
                      type="number"
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({ ...editingProperty, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Texto Formatado de Preço</label>
                    <input
                      type="text"
                      value={editingProperty.priceFormatted}
                      onChange={(e) => setEditingProperty({ ...editingProperty, priceFormatted: e.target.value })}
                      placeholder="Ex: R$ 215.000 ou R$ 3.000 / mês"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Bairro em Olinda / Região</label>
                    <input
                      type="text"
                      value={editingProperty.locationNeighborhood}
                      onChange={(e) => setEditingProperty({ ...editingProperty, locationNeighborhood: e.target.value })}
                      placeholder="Ex: Jardim Atlântico, Casa Caiada"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Quartos</label>
                    <input
                      type="number"
                      value={editingProperty.bedrooms}
                      onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Suítes</label>
                    <input
                      type="number"
                      value={editingProperty.suites}
                      onChange={(e) => setEditingProperty({ ...editingProperty, suites: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Vagas</label>
                    <input
                      type="number"
                      value={editingProperty.parkingSpaces}
                      onChange={(e) => setEditingProperty({ ...editingProperty, parkingSpaces: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Área (m²)</label>
                    <input
                      type="number"
                      value={editingProperty.totalArea}
                      onChange={(e) => setEditingProperty({ ...editingProperty, totalArea: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Descrição Completa</label>
                  <textarea
                    rows={4}
                    value={editingProperty.description}
                    onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                {/* Images (URLs separadas por vírgula ou quebra) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    URLs das Fotografias (uma por linha)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProperty.images.join('\n')}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        images: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37] font-mono"
                  />
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingProperty.featured}
                      onChange={(e) => setEditingProperty({ ...editingProperty, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] accent-[#d4af37]"
                    />
                    Destacar imóvel na página inicial
                  </label>
                </div>

                {/* Save CTA */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Imóvel no Firestore
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProperty(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EMPREENDIMENTOS MANAGEMENT (Obrigatório) */}
      {activeTab === 'empreendimentos' && (
        <div className="space-y-6">
          {!editingEmpreendimento ? (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif-luxury text-xl font-bold text-white">
                    Gestão de Empreendimentos e Edifícios
                  </h2>
                  <p className="text-xs text-gray-400">
                    Cadastre novos edifícios, gerencie diferenciais, status da obra e galerias.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingEmpreendimento({
                      id: `emp-${Date.now()}`,
                      name: '',
                      slug: '',
                      subtitle: '',
                      description: '',
                      neighborhood: 'Jardim Atlântico',
                      city: 'Olinda/PE',
                      status: 'destaque',
                      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
                      gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
                      unitsSummary: 'Apartamentos de 2 e 3 quartos',
                      differentialItems: ['Piscina', 'Elevador', 'Segurança 24h'],
                      featured: true,
                      order: empreendimentos.length + 1,
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Empreendimento
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {empreendimentos.map((emp) => (
                  <div key={emp.id} className="p-5 rounded-2xl bg-[#0e1015] border border-white/10 flex flex-col justify-between">
                    <div>
                      <img
                        src={emp.coverImage}
                        alt=""
                        className="w-full h-36 rounded-xl object-cover mb-3"
                      />
                      <div className="text-[11px] text-[#d4af37] font-semibold">{emp.neighborhood}, {emp.city}</div>
                      <h3 className="font-serif-luxury text-lg font-bold text-white mb-1">{emp.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{emp.subtitle || emp.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => onPreviewEmpreendimento(emp)}
                        className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                        Ver Página
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingEmpreendimento(emp)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#d4af37]"
                          title="Editar"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Excluir empreendimento ${emp.name}?`)) {
                              await deleteEmpreendimento(emp.id);
                              showNotification('Empreendimento excluído!');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Editing Empreendimento */
            <div className="bg-[#0e1015] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  {editingEmpreendimento.name ? `Editar: ${editingEmpreendimento.name}` : 'Novo Empreendimento'}
                </h3>
                <button onClick={() => setEditingEmpreendimento(null)} className="text-xs text-gray-400 hover:text-white">
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleSaveEmpreendimentoForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Nome do Edifício / Empreendimento *</label>
                    <input
                      type="text"
                      required
                      value={editingEmpreendimento.name}
                      onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, name: e.target.value })}
                      placeholder="Ex: Edifício Fonte Atlântico"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Subtítulo ou Chamada</label>
                    <input
                      type="text"
                      value={editingEmpreendimento.subtitle}
                      onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, subtitle: e.target.value })}
                      placeholder="Ex: Empreendimento residencial moderno a poucos passos da orla"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={editingEmpreendimento.neighborhood}
                      onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, neighborhood: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={editingEmpreendimento.city}
                      onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Status da Obra</label>
                    <select
                      value={editingEmpreendimento.status}
                      onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                    >
                      <option value="lancamento" className="bg-[#0e1015]">Lançamento</option>
                      <option value="em_obras" className="bg-[#0e1015]">Em Obras</option>
                      <option value="pronto" className="bg-[#0e1015]">Pronto para Morar</option>
                      <option value="destaque" className="bg-[#0e1015]">Oportunidade Especial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Configuração das Unidades</label>
                  <input
                    type="text"
                    value={editingEmpreendimento.unitsSummary}
                    onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, unitsSummary: e.target.value })}
                    placeholder="Ex: 2 quartos (1 suíte), varanda e 1 vaga privativa"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    value={editingEmpreendimento.description}
                    onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">URL da Imagem de Capa</label>
                  <input
                    type="text"
                    value={editingEmpreendimento.coverImage}
                    onChange={(e) => setEditingEmpreendimento({ ...editingEmpreendimento, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Diferenciais (um por linha)</label>
                  <textarea
                    rows={3}
                    value={editingEmpreendimento.differentialItems.join('\n')}
                    onChange={(e) =>
                      setEditingEmpreendimento({
                        ...editingEmpreendimento,
                        differentialItems: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Empreendimento
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingEmpreendimento(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: LANDING PAGE PREMIUM MANAGEMENT */}
      {activeTab === 'landing' && editingLanding && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                Exigência Especial do Projeto
              </span>
              <h2 className="font-serif-luxury text-xl font-bold text-white">
                Landing Page Premium de Alta Conversão
              </h2>
              <p className="text-xs text-gray-400">
                Personalize a landing page exclusiva de destaque com componentes de luxo, formulário direto e tracking.
              </p>
            </div>

            <button
              onClick={onPreviewLanding}
              className="px-4 py-2 rounded-xl bg-[#d4af37]/20 text-[#f3df9b] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-2 hover:bg-[#d4af37]/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visualizar Landing Page Ao Vivo
            </button>
          </div>

          <form onSubmit={handleSaveLandingForm} className="bg-[#0e1015] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Título Interno</label>
                <input
                  type="text"
                  value={editingLanding.title}
                  onChange={(e) => setEditingLanding({ ...editingLanding, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Badge de Topo</label>
                <input
                  type="text"
                  value={editingLanding.badgeText}
                  onChange={(e) => setEditingLanding({ ...editingLanding, badgeText: e.target.value })}
                  placeholder="OPORTUNIDADE EXCLUSIVA OLINDA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Principal (Hero)</label>
              <input
                type="text"
                value={editingLanding.headline}
                onChange={(e) => setEditingLanding({ ...editingLanding, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Subheadline</label>
              <textarea
                rows={2}
                value={editingLanding.subheadline}
                onChange={(e) => setEditingLanding({ ...editingLanding, subheadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Texto de Preço / Condição em Destaque</label>
                <input
                  type="text"
                  value={editingLanding.customPrice || ''}
                  onChange={(e) => setEditingLanding({ ...editingLanding, customPrice: e.target.value })}
                  placeholder="Entrada a partir de R$ 6.500 | ITBI + Registro Grátis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Texto do Botão CTA</label>
                <input
                  type="text"
                  value={editingLanding.callToAction}
                  onChange={(e) => setEditingLanding({ ...editingLanding, callToAction: e.target.value })}
                  placeholder="Quero Garantir Minha Condição Especial"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">URL da Imagem de Fundo Hero</label>
              <input
                type="text"
                value={editingLanding.heroImage}
                onChange={(e) => setEditingLanding({ ...editingLanding, heroImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Balas / Diferenciais Destacados (uma por linha)
              </label>
              <textarea
                rows={4}
                value={editingLanding.bullets.join('\n')}
                onChange={(e) =>
                  setEditingLanding({
                    ...editingLanding,
                    bullets: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={editingLanding.active}
                  onChange={(e) => setEditingLanding({ ...editingLanding, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] accent-[#d4af37]"
                />
                Landing page ativa e acessível publicamente no menu e banners
              </label>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações da Landing Page
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: LEADS & SOLICITAÇÕES DE VISITA */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-white">
                Contatos & Agendamentos de Visitas
              </h2>
              <p className="text-xs text-gray-400">
                Leads recebidos através do site, formulários e modal de agendamento.
              </p>
            </div>

            <div className="text-xs text-gray-400">
              Total de leads: <strong className="text-white">{leads.length}</strong>
            </div>
          </div>

          {leads.length > 0 ? (
            <div className="bg-[#0e1015] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Nome / Telefone</th>
                      <th className="py-3 px-4">Interesse / Imóvel</th>
                      <th className="py-3 px-4">Turno / Data</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Data de Envio</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{lead.name}</div>
                          <div className="text-[11px] text-[#d4af37]">{lead.phone}</div>
                          {lead.email && <div className="text-[10px] text-gray-500">{lead.email}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-200 line-clamp-1">{lead.targetTitle || 'Interesse Geral'}</div>
                          {lead.message && (
                            <div className="text-[11px] text-gray-400 italic line-clamp-1">"{lead.message}"</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {lead.preferredShift ? (
                            <span className="capitalize">{lead.preferredShift}</span>
                          ) : (
                            'Qualquer'
                          )}
                          {lead.preferredDate && (
                            <div className="text-[10px] text-gray-500">{lead.preferredDate}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={async (e) => {
                              await updateLeadStatus(lead.id, e.target.value as any);
                              showNotification('Status do lead atualizado!');
                            }}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-white focus:border-[#d4af37]"
                          >
                            <option value="novo" className="bg-[#0e1015]">Novo</option>
                            <option value="em_atendimento" className="bg-[#0e1015]">Em Atendimento</option>
                            <option value="visita_agendada" className="bg-[#0e1015]">Visita Agendada</option>
                            <option value="proposta" className="bg-[#0e1015]">Proposta em Andamento</option>
                            <option value="concluido" className="bg-[#0e1015]">Concluído</option>
                            <option value="arquivado" className="bg-[#0e1015]">Arquivado</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `Olá ${lead.name}! Sou Matheus Willamis, corretor imobiliário (CRECI 24.231). Recebi sua solicitação no site referente a ${lead.targetTitle || 'imóveis em Olinda'}. Como posso te ajudar hoje?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                              title="Chamar no WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={async () => {
                                if (window.confirm('Excluir este lead?')) {
                                  await deleteLead(lead.id);
                                  showNotification('Lead excluído!');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 text-xs">
                Nenhum lead registrado até o momento. As solicitações enviadas pelos visitantes aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettingsForm} className="bg-[#0e1015] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h2 className="font-serif-luxury text-xl font-bold text-white">
              Configurações Gerais do Site
            </h2>
            <p className="text-xs text-gray-400">
              Personalize dados institucionais, links sociais e avisos regulamentares.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Nome do Corretor</label>
              <input
                type="text"
                value={tempSettings.brokerName}
                onChange={(e) => setTempSettings({ ...tempSettings, brokerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Registro CRECI</label>
              <input
                type="text"
                value={tempSettings.creci}
                onChange={(e) => setTempSettings({ ...tempSettings, creci: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Link WhatsApp Oficial</label>
              <input
                type="text"
                value={tempSettings.whatsappLink}
                onChange={(e) => setTempSettings({ ...tempSettings, whatsappLink: e.target.value })}
                placeholder="https://w.app/matheuscorretor"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Instagram (@perfil)</label>
              <input
                type="text"
                value={tempSettings.instagram}
                onChange={(e) => setTempSettings({ ...tempSettings, instagram: e.target.value })}
                placeholder="@matheuswillamiscorretor"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Bio Institucional</label>
            <textarea
              rows={3}
              value={tempSettings.bio}
              onChange={(e) => setTempSettings({ ...tempSettings, bio: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Aviso Regulamentar / Disclaimer</label>
            <textarea
              rows={2}
              value={tempSettings.disclaimerText}
              onChange={(e) => setTempSettings({ ...tempSettings, disclaimerText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#d4af37]"
            />
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0a0b0e] font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Salvar Configurações do Site
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
