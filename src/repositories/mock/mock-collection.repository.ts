import { Collection } from '@/domain/collection/types';
import { CollectionRepository } from '@/domain/collection/repository';
import { mockCollections } from '@/data/collections';

export class MockCollectionRepository implements CollectionRepository {
  private collections: Collection[] = [...mockCollections];

  async getAll(): Promise<Collection[]> {
    return this.collections
      .filter((c) => c.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ ...c }));
  }

  async getById(id: string): Promise<Collection | null> {
    const found = this.collections.find((c) => c.id === id && c.active);
    return found ? { ...found } : null;
  }

  async getBySlug(slug: string): Promise<Collection | null> {
    const found = this.collections.find((c) => c.slug === slug && c.active);
    return found ? { ...found } : null;
  }

  async getFeatured(): Promise<Collection[]> {
    return this.collections
      .filter((c) => c.active && c.featured)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ ...c }));
  }
}
