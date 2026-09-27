'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useSearchStore } from '@/store/search-store';
import { useRecentSearchesStore } from '@/store/recent-searches-store';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Product } from '@/domain/product/types';
import { productRepository } from '@/repositories';
import { SearchInput } from './SearchInput';
import { SearchResultItem } from './SearchResultItem';
import { RecentSearches } from './RecentSearches';
import { PopularSearches } from './PopularSearches';
import { Button } from '@/components/ui/Button';

export function SearchOverlay() {
  const t = useTranslations('search');
  const router = useRouter();

  const isOpen = useSearchStore((state) => state.isOpen);
  const closeSearch = useSearchStore((state) => state.closeSearch);
  const addRecentSearch = useRecentSearchesStore((state) => state.addSearch);

  const [rawQuery, setRawQuery] = useState<string>('');
  const debouncedQuery = useDebounce(rawQuery, 250);

  const [searchResult, setSearchResult] = useState<{
    query: string;
    items: Product[];
    total: number;
  }>({
    query: '',
    items: [],
    total: 0,
  });

  const activeQuery = debouncedQuery.trim();
  const isLoading = Boolean(activeQuery && searchResult.query !== activeQuery);
  const displayResults = searchResult.query === activeQuery ? searchResult.items : [];
  const displayTotalCount = searchResult.query === activeQuery ? searchResult.total : 0;

  // Close handler with input clear
  const handleClose = useCallback(() => {
    closeSearch();
    setRawQuery('');
  }, [closeSearch]);

  // Execute full search navigation to Shop page
  const handleExecuteSearch = useCallback(
    (queryToSubmit?: string) => {
      const q = (queryToSubmit !== undefined ? queryToSubmit : rawQuery).trim();
      if (!q) return;

      addRecentSearch(q);
      handleClose();
      router.push(`/shop?q=${encodeURIComponent(q)}`);
    },
    [rawQuery, addRecentSearch, handleClose, router]
  );

  // Live search effect using ProductRepository
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) return;

    let isMounted = true;

    productRepository
      .getAll({ search: trimmed, page: 1, pageSize: 5 })
      .then((res) => {
        if (!isMounted) return;
        setSearchResult({
          query: trimmed,
          items: res.items,
          total: res.total,
        });
      })
      .catch((err) => {
        console.error('Failed to search products:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 px-3 sm:px-4 font-sans">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-card rounded-md shadow-2xl border border-border overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Modal Header Input */}
            <div className="p-4 sm:p-5 border-b border-border bg-card flex items-center justify-between gap-3">
              <div className="flex-1">
                <SearchInput
                  value={rawQuery}
                  onChange={setRawQuery}
                  onSubmit={() => handleExecuteSearch()}
                  onClose={handleClose}
                />
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {!activeQuery ? (
                /* Initial Empty Input State */
                <div className="space-y-6">
                  <RecentSearches onSelectQuery={(q) => handleExecuteSearch(q)} />
                  <PopularSearches />
                </div>
              ) : isLoading ? (
                /* Loading State */
                <div className="py-12 text-center text-sm text-muted-foreground font-sans flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>{t('loading')}</span>
                </div>
              ) : displayResults.length === 0 ? (
                /* No Results State */
                <div className="py-12 text-center space-y-3 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground">
                    {t('noResults')}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t('noResultsDesc')}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExecuteSearch(rawQuery)}
                    className="mt-2"
                  >
                    <span>{t('viewShop')}</span>
                  </Button>
                </div>
              ) : (
                /* Results List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/60 pb-2">
                    <span>{t('results')}</span>
                    <span>{displayTotalCount} items</span>
                  </div>

                  <div className="space-y-2">
                    {displayResults.map((product) => (
                      <SearchResultItem key={product.id} product={product} />
                    ))}
                  </div>

                  {/* View All Results Button */}
                  <div className="pt-2 border-t border-border/60">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleExecuteSearch()}
                      className="w-full gap-2 font-bold shadow-xs"
                    >
                      <span>{t('viewAll')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
