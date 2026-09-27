import { LocalizedText, LocalizedSEO } from '../common/types';

export type Collection = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  seo: LocalizedSEO;
};
