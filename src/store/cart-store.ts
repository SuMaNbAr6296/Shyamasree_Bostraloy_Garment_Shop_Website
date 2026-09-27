import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  _hasHydrated: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  getTotalItems: () => number;
  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      addItem: (productId: string, quantity = 1) => {
        console.log('[CART_STORE] addItem called:', { productId, quantity });
        if (!productId || quantity < 1) return;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === productId
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { productId, quantity }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      incrementQuantity: (productId: string) => {
        const currentQty = get().getItemQuantity(productId);
        get().updateQuantity(productId, currentQty + 1);
      },

      decrementQuantity: (productId: string) => {
        const currentQty = get().getItemQuantity(productId);
        get().updateQuantity(productId, currentQty - 1);
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((i) => i.productId === productId);
        return item ? item.quantity : 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      setHasHydrated: (state: boolean) => {
        console.log('[CART_STORE] setHasHydrated called:', state);
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'shyamasree-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (null as unknown as Storage))),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
