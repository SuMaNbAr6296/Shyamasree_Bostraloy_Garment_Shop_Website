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

  const [productsMap, setProductsMap] = useState<Record<string, Product | null>>({});

  const missingProductIds = useMemo(() => {
    console.log('[USE_RESOLVED_CART] Recalculating missingProductIds. isHydrated:', isHydrated, 'storeItems:', storeItems, 'productsMap:', productsMap);
    if (!isHydrated) return [];
    const missing = storeItems
      .map((item) => item.productId)
      .filter((id) => productsMap[id] === undefined);
    console.log('[USE_RESOLVED_CART] missingProductIds result:', missing);
    return missing;
  }, [storeItems, productsMap, isHydrated]);

  useEffect(() => {
    if (missingProductIds.length === 0) return;

    let isMounted = true;

    Promise.all(
      missingProductIds.map(async (id) => {
        console.log('[USE_RESOLVED_CART] Requesting getById for:', id);
        const product = await productRepository.getById(id);
        console.log('[USE_RESOLVED_CART] Result from getById for:', id, '->', product ? product.id : 'null');
        return { id, product: product || null };
      })
    )
      .then((results) => {
        if (!isMounted) return;

        setProductsMap((prevMap) => {
          const nextMap = { ...prevMap };
          results.forEach(({ id, product }) => {
            nextMap[id] = product;
          });
          console.log('[USE_RESOLVED_CART] Updated productsMap:', nextMap);
          return nextMap;
        });

        // Auto-remove invalid items from the persistent cart store
        // if they no longer exist in the database/repository.
        const invalidIds = results
          .filter(({ product }) => product === null)
          .map(({ id }) => id);
          
        if (invalidIds.length > 0) {
          const cartStore = useCartStore.getState();
          invalidIds.forEach((id) => cartStore.removeItem(id));
        }
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
        product: productsMap[item.productId] as Product,
        quantity: item.quantity,
      }));

    const result = calculateCartTotals(availableItems);
    console.log('[USE_RESOLVED_CART] Final resolvedItems:', result.resolvedItems);
    return result;
  }, [storeItems, productsMap, isHydrated]);

  const totalItems = useMemo(() => {
    return storeItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [storeItems]);

  const isLoading = !isHydrated || (storeItems.length > 0 && missingProductIds.length > 0);
  console.log('[USE_RESOLVED_CART] Returning state. isLoading:', isLoading, 'items.length:', resolvedItems.length, 'totalItems:', isHydrated ? totalItems : 0);

  return {
    items: resolvedItems,
    subtotal,
    totalItems: isHydrated ? totalItems : 0,
    isLoading,
    isHydrated,
  };
}
