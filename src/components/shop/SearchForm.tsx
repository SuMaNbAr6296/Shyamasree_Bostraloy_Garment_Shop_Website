'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { createShopUrl } from '@/lib/shop/query-params';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  className?: string;
}

function SearchFormContent({ className }: SearchFormProps) {
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createShopUrl(pathname, { q: query.trim() || null }, searchParams || undefined);
    router.push(url);
  };

  const handleClear = () => {
    setQuery('');
    const url = createShopUrl(pathname, { q: null }, searchParams || undefined);
    router.push(url);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative flex items-center w-full', className)}>
      <label htmlFor="shop-search-input" className="sr-only">
        {t('search')}
      </label>
      <input
        id="shop-search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search') + '...'}
        className="w-full h-10 pl-9 pr-9 text-xs sm:text-sm font-sans rounded-sm border border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
      {query && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Clear search query"
          onClick={handleClear}
          className="absolute right-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </IconButton>
      )}
    </form>
  );
}

export function SearchForm(props: SearchFormProps) {
  return (
    <Suspense fallback={<div className="h-10 w-full bg-muted rounded-sm animate-pulse" />}>
      <SearchFormContent {...props} />
    </Suspense>
  );
}
