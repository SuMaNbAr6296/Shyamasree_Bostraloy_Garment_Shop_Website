import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentSearchesState {
  queries: string[];
  _hasHydrated: boolean;
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearSearches: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      queries: [],
      _hasHydrated: false,

      addSearch: (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        set((state) => {
          const filtered = state.queries.filter(
            (q) => q.toLowerCase() !== trimmed.toLowerCase()
          );
          // Keep newest search first, max 6 entries
          return { queries: [trimmed, ...filtered].slice(0, 6) };
        });
      },

      removeSearch: (query: string) => {
        set((state) => ({
          queries: state.queries.filter((q) => q !== query),
        }));
      },

      clearSearches: () => {
        set({ queries: [] });
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'shyamasree-recent-searches',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (null as unknown as Storage))),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
