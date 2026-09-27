import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/domain/product/types';
import { productRepository } from '@/repositories';
import { useCartStore } from '@/store/cart-store';
import { useStoreHydration } from '@/lib/hooks/useStoreHydration';

export type ResolvedCartItem = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type ResolvedCartState = {
  items: ResolvedCartItem[];
  subtotal: number;
  totalItems: number;
  isLoading: boolean;
  isHydrated: boolean;
};

/**
 * Pure calculation for cart line totals and subtotal.
 * Keeps data resolution separate from calculation.
 */
export function calculateCartTotals(items: { product: Product; quantity: number }[]) {
  const resolvedItems: ResolvedCartItem[] = items.map(({ product, quantity }) => {
    const lineTotal = product.price * quantity;
    return { product, quantity, lineTotal };
  });

  const subtotal = resolvedItems.reduce((acc, item) => acc + item.lineTotal, 0);

  return { resolvedItems, subtotal };
}

/**
 * Resolves persistent cart items ({ productId, quantity }) to full domain Product models
 * using the ProductRepository abstraction boundary.
 */
export function useResolvedCart(): ResolvedCartState {
  const storeItems = useCartStore((state) => state.items);
  const storeHasHydrated = useCartStore((state) => state._hasHydrated);
  const isHydrated = useStoreHydration(storeHasHydrated);

  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});

  const missingProductIds = useMemo(() => {
    if (!isHydrated) return [];
    return storeItems
      .map((item) => item.productId)
      .filter((id) => !productsMap[id]);
  }, [storeItems, productsMap, isHydrated]);

  useEffect(() => {
    if (missingProductIds.length === 0) return;

    let isMounted = true;

    Promise.all(missingProductIds.map((id) => productRepository.getById(id)))
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
        console.error('Failed to resolve cart products:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [missingProductIds]);

  const { resolvedItems, subtotal } = useMemo(() => {
    if (!isHydrated) {
      return { resolvedItems: [], subtotal: 0 };
    }

    const availableItems = storeItems
      .filter((item) => Boolean(productsMap[item.productId]))
      .map((item) => ({
        product: productsMap[item.productId],
        quantity: item.quantity,
      }));

    return calculateCartTotals(availableItems);
  }, [storeItems, productsMap, isHydrated]);

  const totalItems = useMemo(() => {
    return storeItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [storeItems]);

  const isLoading = !isHydrated || (storeItems.length > 0 && missingProductIds.length > 0);

  return {
    items: resolvedItems,
    subtotal,
    totalItems: isHydrated ? totalItems : 0,
    isLoading,
    isHydrated,
  };
}
