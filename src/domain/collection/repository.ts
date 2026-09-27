import { Collection } from './types';

export interface CollectionRepository {
  getAll(): Promise<Collection[]>;
  getById(id: string): Promise<Collection | null>;
  getBySlug(slug: string): Promise<Collection | null>;
  getFeatured(): Promise<Collection[]>;
}
