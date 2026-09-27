import { Product, ProductSortOption } from './types';
import { PaginatedResult } from '../common/types';

export type ProductQueryFilters = {
  categoryId?: string;
  collectionId?: string;
  search?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSortOption;
  page?: number;
  pageSize?: number;
};

export interface ProductRepository {
  getAll(filters?: ProductQueryFilters): Promise<PaginatedResult<Product>>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
  getFeatured(limit?: number): Promise<Product[]>;
  getByCategory(
    categoryId: string,
    filters?: ProductQueryFilters
  ): Promise<PaginatedResult<Product>>;
  getByCollection(
    collectionId: string,
    filters?: ProductQueryFilters
  ): Promise<PaginatedResult<Product>>;
}
