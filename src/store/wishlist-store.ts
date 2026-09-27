import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  productIds: string[];
  _hasHydrated: boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      _hasHydrated: false,

      addToWishlist: (productId: string) => {
        if (!productId) return;
        set((state) => {
          if (state.productIds.includes(productId)) return state;
          return { productIds: [...state.productIds, productId] };
        });
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }));
      },

      toggleWishlist: (productId: string) => {
        if (!productId) return;
        if (get().isInWishlist(productId)) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist(productId);
        }
      },

      isInWishlist: (productId: string) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => {
        set({ productIds: [] });
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'shyamasree-wishlist',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (null as unknown as Storage))),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
