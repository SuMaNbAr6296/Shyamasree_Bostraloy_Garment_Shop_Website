import { ProductQueryFilters } from '@/domain/product/repository';
import { ProductSortOption } from '@/domain/product/types';

export type ShopSearchParams = {
  q?: string;
  category?: string;
  collection?: string;
  minPrice?: string;
  maxPrice?: string;
  featured?: string;
  newArrival?: string;
  bestSeller?: string;
  sort?: string;
  page?: string;
};

const VALID_SORT_OPTIONS: ProductSortOption[] = [
  'featured',
  'price_asc',
  'price_desc',
  'newest',
  'name_asc',
];

export function parseShopSearchParams(raw: ShopSearchParams): ProductQueryFilters {
  const filters: ProductQueryFilters = {};

  if (raw.q && raw.q.trim().length > 0) {
    filters.search = raw.q.trim();
  }

  if (raw.category && raw.category.trim().length > 0) {
    filters.categoryId = raw.category.trim();
  }

  if (raw.collection && raw.collection.trim().length > 0) {
    filters.collectionId = raw.collection.trim();
  }

  if (raw.featured === 'true') {
    filters.featured = true;
  }

  if (raw.newArrival === 'true') {
    filters.newArrival = true;
  }

  if (raw.bestSeller === 'true') {
    filters.bestSeller = true;
  }

  if (raw.minPrice) {
    const parsed = parseInt(raw.minPrice, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      filters.minPrice = parsed;
    }
  }

  if (raw.maxPrice) {
    const parsed = parseInt(raw.maxPrice, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      if (filters.minPrice !== undefined && parsed < filters.minPrice) {
        filters.maxPrice = filters.minPrice;
      } else {
        filters.maxPrice = parsed;
      }
    }
  }

  if (raw.sort && VALID_SORT_OPTIONS.includes(raw.sort as ProductSortOption)) {
    filters.sort = raw.sort as ProductSortOption;
  } else {
    filters.sort = 'featured';
  }

  if (raw.page) {
    const parsed = parseInt(raw.page, 10);
    if (!isNaN(parsed) && parsed > 0) {
      filters.page = parsed;
    } else {
      filters.page = 1;
    }
  } else {
    filters.page = 1;
  }

  filters.pageSize = 12;

  return filters;
}

export function createShopUrl(
  pathname: string,
  newParams: Record<string, string | number | boolean | null | undefined>,
  currentSearchParams?: URLSearchParams
): string {
  const search = new URLSearchParams(currentSearchParams ? currentSearchParams.toString() : '');

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '' || value === false) {
      search.delete(key);
    } else {
      search.set(key, String(value));
    }
  });

  // Reset page to 1 when changing filters or sorting
  if ('category' in newParams || 'collection' in newParams || 'minPrice' in newParams || 'maxPrice' in newParams || 'sort' in newParams || 'q' in newParams || 'featured' in newParams || 'newArrival' in newParams || 'bestSeller' in newParams) {
    if (!('page' in newParams)) {
      search.delete('page');
    }
  }

  const queryString = search.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}
