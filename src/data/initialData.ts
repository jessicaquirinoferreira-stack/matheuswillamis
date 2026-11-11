import { Property, Empreendimento, LandingPageConfig, SiteSettings } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  brokerName: "Matheus Willamis",
  creci: "24.231",
  bio: "Corretor imobiliário especializado no mercado de Olinda e região litorânea. Atuação com rigor técnico, atendimento personalizado e transparência em venda, compra e locação.",
  phone: "(81) 98800-0000",
  whatsapp: "(81) 98800-0000",
  whatsappLink: "https://w.app/matheuscorretor",
  instagram: "@matheuswillamiscorretor",
  instagramUrl: "https://www.instagram.com/matheuswillamiscorretor/",
  regions: [
    "Casa Caiada",
    "Jardim Atlântico",
    "Bairro Novo",
    "Rio Doce",
    "Janga / Paulista"
  ],
  heroHeadline: "Seu próximo imóvel em Olinda e região começa com quem conhece as melhores oportunidades.",
  heroSubheadline: "Matheus Willamis – Corretor Imobiliário (CRECI 24.231). Consultoria exclusiva para compra, venda e locação de imóveis e condomínios selecionados.",
  primaryColor: "#d4af37",
  logoText: "MW",
  disclaimerText: "Os dados de imóveis e valores contidos neste portal refletem referências históricas de mercado e estão sujeitos à confirmação prévia de disponibilidade e atualização de valores junto ao corretor.",
};

export const INITIAL_EMPREENDIMENTOS: Empreendimento[] = [
  {
    id: "emp-fonte-atlantico",
    name: "Edifício Fonte Atlântico",
    slug: "edificio-fonte-atlantico",
    subtitle: "Empreendimento residencial moderno a poucos passos da orla",
    description: "Excelente condomínio em Jardim Atlântico, planejado com arquitetura contemporânea, lazer completo e condições especiais de aquisição na planta e pronto para morar.",
    neighborhood: "Jardim Atlântico",
    city: "Olinda/PE",
    status: "destaque",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    unitsSummary: "Unidades com 2 quartos (1 suíte), varanda gourmet e 1 vaga privativa",
    differentialItems: [
      "Entrada facilitada a partir de R$ 6.500",
      "Documentação inclusa (ITBI e Registro)",
      "Elevador e portaria inteligente",
      "Piscina e deck solarium",
      "Localização valorizada em Jardim Atlântico"
    ],
    featured: true,
    order: 1
  },
  {
    id: "emp-janga-prince",
    name: "Edifício Janga Prince",
    slug: "edificio-janga-prince",
    subtitle: "Alto padrão à beira-mar com vista deslumbrante",
    description: "Empreendimento de prestígio no Janga (Paulista/PE), concebido para oferecer estilo de vida praiano com máxima comodidade, segurança 24h e estrutura de lazer diferenciada.",
    neighborhood: "Janga",
    city: "Paulista/PE",
    status: "lancamento",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    unitsSummary: "Apartamentos de 2 e 3 quartos com varanda ampla e vista mar",
    differentialItems: [
      "Pé na areia com acesso facilitado à praia",
      "Piscina com borda infinita",
      "Salão gourmet climatizado",
      "Fitness center equipado",
      "Garagem coberta"
    ],
    featured: true,
    order: 2
  },
  {
    id: "emp-solimoes",
    name: "Edifício Solimões",
    slug: "edificio-solimoes",
    subtitle: "Conforto e conveniência em endereço privilegiado",
    description: "Edifício residencial com plantas bem distribuídas, ideal para moradia ou investimento em bairro tradicional e com infraestrutura consolidada de comércio e colégios.",
    neighborhood: "Bairro Novo",
    city: "Olinda/PE",
    status: "pronto",
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    unitsSummary: "Apartamentos espaçosos de 2 e 3 quartos",
    differentialItems: [
      "Excelente custo-benefício",
      "Próximo ao Shopping Patteo e orla",
      "Taxa de condomínio enxuta",
      "Interfone e portão eletrônico"
    ],
    featured: false,
    order: 3
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-fonte-atlantico-3",
    code: "MW-001",
    title: "Residencial Fonte Atlântico 3 – Oportunidade Única",
    slug: "residencial-fonte-atlantico-3-jardim-atlantico",
    transactionType: "venda",
    propertyType: "apartamento",
    price: 215000,
    priceFormatted: "R$ 215.000",
    locationNeighborhood: "Jardim Atlântico",
    locationCity: "Olinda/PE",
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    totalArea: 58,
    privateArea: 54,
    description: "Destaque exclusivo com facilidade de pagamento: Entrada a partir de R$ 6.500 e documentação GRÁTIS (ITBI e registro inclusos). Apartamento com 2 quartos sendo 1 suíte, banheiro social, varanda/terraço aconchegante e 1 vaga fixa de garagem.",
    features: [
      "Entrada a partir de R$ 6.500",
      "Documentação grátis (ITBI e Registro)",
      "1 suíte + WC social",
      "1 vaga privativa fixa",
      "Terraço ou varanda integrada",
      "Excelente ventilação litorânea",
      "Área de serviço independente"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "disponivel",
    empreendimentoId: "emp-fonte-atlantico",
    order: 1,
    disclaimer: "Condições e valores sujeitos a confirmação de disponibilidade com o corretor."
  },
  {
    id: "prop-casa-jardim-atlantico",
    code: "MW-002",
    title: "Mansão com Piscina Privativa em Jardim Atlântico",
    slug: "casa-a-venda-jardim-atlantico-480m",
    transactionType: "venda",
    propertyType: "casa",
    price: 1300000,
    priceFormatted: "R$ 1.300.000",
    locationNeighborhood: "Jardim Atlântico",
    locationCity: "Olinda/PE",
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpaces: 5,
    totalArea: 480,
    privateArea: 480,
    description: "Imponente casa residencial com 480 m² de área construída em terreno amplo. Conta com 4 dormitórios (sendo 2 suítes masters), ampla sala para múltiplos ambientes, área gourmet privativa com piscina e capacidade de garagem para até 5 veículos.",
    features: [
      "480 m² de área construída",
      "Piscina privativa com deck",
      "4 quartos (sendo 2 suítes)",
      "Garagem para até 5 veículos",
      "Espaço gourmet com churrasqueira",
      "Cozinha ampla planejada",
      "Jardim e área verde privativa"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "disponivel",
    order: 2,
    disclaimer: "Valor anunciado referente ao registro histórico; agende visita para confirmação dos detalhes."
  },
  {
    id: "prop-apto-luar-casa-caiada",
    code: "MW-003",
    title: "Apartamento para Locação – Residencial Luar Condomínio Clube",
    slug: "apartamento-locacao-residencial-luar-casa-caiada",
    transactionType: "locacao",
    propertyType: "apartamento",
    price: 3100,
    priceFormatted: "R$ 3.000 a R$ 3.200 / mês",
    rentalPeriod: "Aluguel entre R$ 3.000 e R$ 3.200",
    condoFee: 480,
    locationNeighborhood: "Casa Caiada",
    locationCity: "Olinda/PE",
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    totalArea: 72,
    privateArea: 68,
    description: "Excelente oportunidade para locação em condomínio clube completo em Casa Caiada. Estrutura impecável de lazer com piscinas, salão de festas, quadra, playground e segurança 24h. Apartamento ventilado com varanda e suíte.",
    features: [
      "Condomínio Clube completo",
      "Piscina adulto e infantil",
      "Salão de festas e espaço grill",
      "Portaria e vigilância 24 horas",
      "Varanda espaçosa",
      "Próximo a hospitais, praia e comércio",
      "Vaga de garagem inclusa"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "a_confirmar",
    order: 3,
    disclaimer: "Imóvel sujeito à confirmação de disponibilidade atual da locação pelo corretor."
  },
  {
    id: "prop-apto-bairro-novo",
    code: "MW-004",
    title: "Apartamento à Venda em Bairro Novo – Localização Nobre",
    slug: "apartamento-a-venda-bairro-novo-olinda",
    transactionType: "venda",
    propertyType: "apartamento",
    price: 275000,
    priceFormatted: "R$ 275.000",
    locationNeighborhood: "Bairro Novo",
    locationCity: "Olinda/PE",
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    totalArea: 64,
    privateArea: 60,
    description: "Excelente apartamento à venda em Bairro Novo, ponto nobre de Olinda. Com 2 quartos (1 suíte), sala ampla em dois ambientes, varanda agradável e garagem privativa. Próximo ao mar e comércios locais.",
    features: [
      "Valor histórico: R$ 275.000",
      "2 quartos (1 suíte)",
      "Sala para 2 ambientes",
      "Varanda ventilada",
      "1 vaga de garagem privativa",
      "Bairro nobre e tradicional de Olinda",
      "Fácil acesso a transporte e serviços"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    status: "disponivel",
    order: 4,
    disclaimer: "Dados extraídos de peças institucionais; confirme status e detalhes atualizados."
  },
  {
    id: "prop-apto-rio-doce",
    code: "MW-005",
    title: "Apartamento à Venda em Rio Doce – 1º Andar com Varanda",
    slug: "apartamento-a-venda-rio-doce-olinda",
    transactionType: "venda",
    propertyType: "apartamento",
    price: 170000,
    priceFormatted: "R$ 170.000",
    locationNeighborhood: "Rio Doce",
    locationCity: "Olinda/PE",
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    totalArea: 55,
    privateArea: 52,
    description: "Oportunidade acessível em Rio Doce por R$ 170.000. Imóvel no 1º andar com 2 quartos (1 suíte), varanda arejada, portaria 24 horas e vaga de estacionamento. Excelente para quem busca sair do aluguel.",
    features: [
      "R$ 170.000 (preço histórico de venda)",
      "2 quartos (1 suíte)",
      "Varanda privativa",
      "1º andar (fácil acesso)",
      "Portaria 24 horas",
      "Vaga de garagem",
      "Próximo a transporte e conveniências"
    ],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    status: "disponivel",
    order: 5,
    disclaimer: "Sujeito à confirmação prévia com Matheus Willamis."
  }
];

export const INITIAL_LANDING_PAGE: LandingPageConfig = {
  id: "landing-fonte-atlantico",
  slug: "fonte-atlantico",
  title: "Oportunidade Especial — Residencial Fonte Atlântico 3",
  headline: "Conquiste Seu Apartamento em Jardim Atlântico com Entrada a partir de R$ 6.500",
  subheadline: "Documentação grátis (ITBI e Registro), 2 quartos com 1 suíte, varanda e lazer em Olinda. Atendimento exclusivo com Matheus Willamis (CRECI 24.231).",
  targetType: "property",
  targetId: "prop-fonte-atlantico-3",
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
  badgeText: "OPORTUNIDADE EXCLUSIVA OLINDA",
  callToAction: "Quero Garantir Minha Condição Especial",
  bullets: [
    "Entrada super facilitada a partir de apenas R$ 6.500",
    "Economia real: ITBI e Registro totalmente GRÁTIS",
    "Planta moderna com 2 quartos (1 suíte confortável) + WC social",
    "Varanda privativa com ótima ventilação litorânea",
    "1 vaga de garagem privativa e demarcada",
    "Atendimento consultivo e transparente com Matheus Willamis"
  ],
  showPrice: true,
  customPrice: "Entrada a partir de R$ 6.500 | ITBI + Registro Grátis",
  contactFormTitle: "Agende sua Apresentação com Matheus Willamis",
  active: true,
  utmSource: "campanha_olinda"
};
