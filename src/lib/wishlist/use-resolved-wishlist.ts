import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/domain/product/types';
import { productRepository } from '@/repositories';
import { useWishlistStore } from '@/store/wishlist-store';
import { useStoreHydration } from '@/lib/hooks/useStoreHydration';

export type ResolvedWishlistState = {
  products: Product[];
  totalItems: number;
  isLoading: boolean;
  isHydrated: boolean;
};

/**
 * Resolves persistent wishlist product IDs (string[]) to full domain Product models
 * using the ProductRepository abstraction boundary.
 */
export function useResolvedWishlist(): ResolvedWishlistState {
  const productIds = useWishlistStore((state) => state.productIds);
  const storeHasHydrated = useWishlistStore((state) => state._hasHydrated);
  const isHydrated = useStoreHydration(storeHasHydrated);

  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});

  const missingIds = useMemo(() => {
    if (!isHydrated) return [];
    return productIds.filter((id) => !productsMap[id]);
  }, [productIds, productsMap, isHydrated]);

  useEffect(() => {
    if (missingIds.length === 0) return;

    let isMounted = true;

    Promise.all(missingIds.map((id) => productRepository.getById(id)))
      .then((results) => {
        if (!isMounted) return;

        setProductsMap((prevMap) => {
          const nextMap = { ...prevMap };
          let changed = false;
          results.forEach((product) => {
            if (product && !nextMap[product.id]) {
              nextMap[product.id] = product;
              changed = true;
            }
          });
          return changed ? nextMap : prevMap;
        });
      })
      .catch((err) => {
        console.error('Failed to resolve wishlist products:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [missingIds]);

  const products = useMemo(() => {
    if (!isHydrated) return [];
    return productIds
      .map((id) => productsMap[id])
      .filter((product): product is Product => Boolean(product));
  }, [productIds, productsMap, isHydrated]);

  const isLoading = !isHydrated || (productIds.length > 0 && missingIds.length > 0);

  return {
    products,
    totalItems: isHydrated ? productIds.length : 0,
    isLoading,
    isHydrated,
  };
}
