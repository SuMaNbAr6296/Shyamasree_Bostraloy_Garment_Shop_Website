import { create } from 'zustand';
import { Product } from '@/domain/product/types';

interface QuickViewStore {
  product: Product | null;
  isOpen: boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewStore>((set) => ({
  product: null,
  isOpen: false,
  openQuickView: (product: Product) => set({ product, isOpen: true }),
  closeQuickView: () => set({ product: null, isOpen: false }),
}));
