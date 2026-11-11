export type TransactionType = 'venda' | 'locacao' | 'todos';

export type PropertyType = 
  | 'apartamento' 
  | 'casa' 
  | 'cobertura' 
  | 'terreno' 
  | 'comercial' 
  | 'flat';

export type PropertyStatus = 
  | 'disponivel' 
  | 'a_confirmar' 
  | 'reservado' 
  | 'vendido' 
  | 'locado';

export interface Property {
  id: string;
  code: string;
  title: string;
  slug: string;
  transactionType: 'venda' | 'locacao';
  propertyType: PropertyType;
  price: number;
  priceFormatted: string;
  rentalPeriod?: string; // e.g. "R$ 3.000 a R$ 3.200 / mês"
  condoFee?: number;
  iptu?: number;
  locationNeighborhood: string;
  locationCity: string;
  address?: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  totalArea: number;
  privateArea?: number;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  status: PropertyStatus;
  empreendimentoId?: string;
  order: number;
  disclaimer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type EmpreendimentoStatus = 'lancamento' | 'em_obras' | 'pronto' | 'destaque';

export interface Empreendimento {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  neighborhood: string;
  city: string;
  status: EmpreendimentoStatus;
  coverImage: string;
  gallery: string[];
  unitsSummary: string;
  differentialItems: string[];
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LandingPageConfig {
  id: string;
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  targetType: 'property' | 'empreendimento';
  targetId: string;
  heroImage: string;
  badgeText: string;
  callToAction: string;
  bullets: string[];
  showPrice: boolean;
  customPrice?: string;
  contactFormTitle: string;
  active: boolean;
  utmSource?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LeadStatus = 'novo' | 'em_atendimento' | 'visita_agendada' | 'proposta' | 'concluido' | 'arquivado';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interestType: 'imovel' | 'empreendimento' | 'contato_geral' | 'avaliacao' | 'visita';
  targetId?: string;
  targetTitle?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredShift?: 'manha' | 'tarde' | 'noite' | 'qualquer';
  message?: string;
  status: LeadStatus;
  notes?: string;
  originUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

export interface SiteSettings {
  brokerName: string;
  creci: string;
  bio: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  instagram: string;
  instagramUrl: string;
  regions: string[];
  heroHeadline: string;
  heroSubheadline: string;
  primaryColor: string;
  logoText: string;
  disclaimerText: string;
  updatedAt?: string;
}

export interface FilterState {
  transactionType: TransactionType;
  propertyType: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minParking: number;
  onlyFeatured: boolean;
  searchTerm: string;
  sortBy: 'recente' | 'preco_asc' | 'preco_desc' | 'area_desc';
}
