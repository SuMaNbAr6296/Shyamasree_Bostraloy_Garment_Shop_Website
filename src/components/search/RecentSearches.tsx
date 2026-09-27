'use client';

import { useTranslations } from 'next-intl';
import { History, X, Trash2 } from 'lucide-react';
import { useRecentSearchesStore } from '@/store/recent-searches-store';
import { useStoreHydration } from '@/lib/hooks/useStoreHydration';

interface RecentSearchesProps {
  onSelectQuery: (query: string) => void;
}

export function RecentSearches({ onSelectQuery }: RecentSearchesProps) {
  const t = useTranslations('search');

  const queries = useRecentSearchesStore((state) => state.queries);
  const removeSearch = useRecentSearchesStore((state) => state.removeSearch);
  const clearSearches = useRecentSearchesStore((state) => state.clearSearches);
  const storeHasHydrated = useRecentSearchesStore((state) => state._hasHydrated);
  const isHydrated = useStoreHydration(storeHasHydrated);

  if (!isHydrated || queries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2.5 font-sans">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-primary" />
          <span>{t('recent')}</span>
        </div>
        <button
          type="button"
          onClick={clearSearches}
          className="text-muted-foreground hover:text-destructive transition-colors underline cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />
          <span>{t('clearRecent')}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {queries.map((query) => (
          <div
            key={query}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-medium text-foreground hover:bg-muted border border-border/50 transition-colors group cursor-pointer select-none"
          >
            <span onClick={() => onSelectQuery(query)} className="hover:text-primary">
              {query}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSearch(query);
              }}
              className="text-muted-foreground hover:text-destructive p-0.5 rounded-full"
              aria-label={`Remove ${query}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
