export interface CompanyStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon?: string;
}

export interface CompanyInfo {
  name: string;
  phone: string;
  address: string;
  mapsEmbedUrl: string;
  operationalHours: string;
  stats: CompanyStat[];
}

export interface ProductMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  priceMin: number;
  priceMax: number;
  moq: number;
  stock: 'available' | 'limited' | 'out_of_stock';
  category: 'ayam' | 'itik' | 'angsa' | 'entok' | 'lainnya';
  description: string;
  specifications: {
    age: string;
    mortalityRate: string;
    vaccination: string;
    feedType: string;
  };
  media: ProductMedia[];
}

export interface HomepageHero {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface HomepageValue {
  title: string;
  description: string;
}

export interface HomepageCta {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface HomepageData {
  hero: HomepageHero;
  values: HomepageValue[];
  featuredProductsTitle: string;
  featuredProductsDescription: string;
  ctaSection: HomepageCta;
}

export interface BlogArticle {
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string;
  tags: string[];
}
