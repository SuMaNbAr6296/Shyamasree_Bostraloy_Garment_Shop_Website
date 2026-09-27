import { LocalizedText, LocalizedSEO } from '../common/types';

export type Category = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image?: string;
  parentId?: string;
  sortOrder: number;
  featured: boolean;
  active: boolean;
  seo: LocalizedSEO;
};
