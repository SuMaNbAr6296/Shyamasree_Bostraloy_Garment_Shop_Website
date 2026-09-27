import { Category } from '@/domain/category/types';
import { CategoryRepository } from '@/domain/category/repository';
import { mockCategories } from '@/data/categories';

export class MockCategoryRepository implements CategoryRepository {
  private categories: Category[] = [...mockCategories];

  async getAll(): Promise<Category[]> {
    return this.categories
      .filter((c) => c.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ ...c }));
  }

  async getById(id: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.id === id && c.active);
    return found ? { ...found } : null;
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.slug === slug && c.active);
    return found ? { ...found } : null;
  }

  async getFeatured(): Promise<Category[]> {
    return this.categories
      .filter((c) => c.active && c.featured)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ ...c }));
  }
}
