import { LocalizedText, LocalizedSEO } from '../common/types';

export type ProductAvailability = 'in_stock' | 'out_of_stock' | 'coming_soon';

export type ProductSortOption =
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'name_asc';

export type ProductImage = {
  src: string;
  alt: LocalizedText;
  width?: number;
  height?: number;
};

export type ProductAttributes = {
  material?: LocalizedText;
  fabric?: LocalizedText;
  color?: LocalizedText;
  occasion?: LocalizedText;
  pattern?: LocalizedText;
  care?: LocalizedText;
};

export type Product = {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  categoryId: string;
  collectionId?: string;
  images: ProductImage[];
  price: number;
  compareAtPrice?: number;
  currency: 'INR';
  availability: ProductAvailability;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  tags: string[];
  attributes: ProductAttributes;
  seo: LocalizedSEO;
};
