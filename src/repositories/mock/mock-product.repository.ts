import { Product, ProductSortOption } from '@/domain/product/types';
import { ProductRepository, ProductQueryFilters } from '@/domain/product/repository';
import { PaginatedResult } from '@/domain/common/types';
import { mockProducts } from '@/data/products';
import { mockCategories } from '@/data/categories';
import { mockCollections } from '@/data/collections';

export class MockProductRepository implements ProductRepository {
  private products: Product[] = [...mockProducts];

  async getAll(filters?: ProductQueryFilters): Promise<PaginatedResult<Product>> {
    let result = [...this.products];

    if (filters) {
      if (filters.categoryId) {
        const target = filters.categoryId;
        const matchedCat = mockCategories.find((c) => c.id === target || c.slug === target);
        const targetId = matchedCat ? matchedCat.id : target;
        result = result.filter((p) => p.categoryId === targetId);
      }

      if (filters.collectionId) {
        const target = filters.collectionId;
        const matchedCol = mockCollections.find((c) => c.id === target || c.slug === target);
        const targetId = matchedCol ? matchedCol.id : target;
        result = result.filter((p) => p.collectionId === targetId);
      }

      if (filters.featured !== undefined) {
        result = result.filter((p) => p.featured === filters.featured);
      }

      if (filters.newArrival !== undefined) {
        result = result.filter((p) => p.newArrival === filters.newArrival);
      }

      if (filters.bestSeller !== undefined) {
        result = result.filter((p) => p.bestSeller === filters.bestSeller);
      }

      if (filters.minPrice !== undefined) {
        result = result.filter((p) => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        result = result.filter((p) => p.price <= filters.maxPrice!);
      }

      if (filters.search) {
        const query = filters.search.trim().toLowerCase();
        result = result.filter((p) => {
          const matchBnName = p.name.bn.toLowerCase().includes(query);
          const matchEnName = p.name.en.toLowerCase().includes(query);
          const matchBnDesc = p.description.bn.toLowerCase().includes(query);
          const matchEnDesc = p.description.en.toLowerCase().includes(query);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(query));
          return matchBnName || matchEnName || matchBnDesc || matchEnDesc || matchTag;
        });
      }

      if (filters.sort) {
        result = this.sortProducts(result, filters.sort);
      }
    }

    const page = Math.max(1, filters?.page || 1);
    const pageSize = Math.max(1, filters?.pageSize || 12);
    const total = result.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const items = result.slice(startIndex, startIndex + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async getById(id: string): Promise<Product | null> {
    console.log('[MOCK_REPO] getById called with:', id);
    const found = this.products.find((p) => p.id === id);
    console.log('[MOCK_REPO] getById result for', id, ':', found ? found.id : 'null');
    return found ? { ...found } : null;
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const found = this.products.find((p) => p.slug === slug);
    return found ? { ...found } : null;
  }

  async getFeatured(limit = 6): Promise<Product[]> {
    const featured = this.products.filter((p) => p.featured);
    return featured.slice(0, limit).map((p) => ({ ...p }));
  }

  async getByCategory(
    categoryId: string,
    filters?: ProductQueryFilters
  ): Promise<PaginatedResult<Product>> {
    return this.getAll({ ...filters, categoryId });
  }

  async getByCollection(
    collectionId: string,
    filters?: ProductQueryFilters
  ): Promise<PaginatedResult<Product>> {
    return this.getAll({ ...filters, collectionId });
  }

  private sortProducts(products: Product[], sort: ProductSortOption): Product[] {
    const sorted = [...products];
    switch (sort) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case 'name_asc':
        return sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }
}
