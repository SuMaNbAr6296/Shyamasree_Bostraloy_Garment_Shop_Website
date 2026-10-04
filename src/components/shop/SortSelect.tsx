'use client';

import React, { Suspense } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ProductSortOption } from '@/domain/product/types';
import { createShopUrl } from '@/lib/shop/query-params';
import { ArrowUpDown } from 'lucide-react';

function SortSelectContent() {
  const t = useTranslations('shop');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = (searchParams?.get('sort') as ProductSortOption) || 'featured';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const url = createShopUrl(pathname, { sort: newSort === 'featured' ? null : newSort }, searchParams || undefined);
    router.push(url);
  };

  return (
    <div className="flex items-center gap-2 font-sans text-xs sm:text-sm">
      <label htmlFor="sort-select" className="text-muted-foreground shrink-0 flex items-center gap-1.5 font-medium">
        <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
        <span className="hidden sm:inline">{t('sortLabel')}</span>
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="h-9 px-3 text-xs sm:text-sm font-medium rounded-sm border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      >
        <option value="featured">{t('sortFeatured')}</option>
        <option value="price_asc">{t('sortPriceAsc')}</option>
        <option value="price_desc">{t('sortPriceDesc')}</option>
        <option value="newest">{t('sortNewest')}</option>
        <option value="name_asc">{t('sortNameAsc')}</option>
      </select>
    </div>
  );
}

export function SortSelect() {
  return (
    <Suspense fallback={<div className="h-9 w-36 bg-muted rounded-sm animate-pulse" />}>
      <SortSelectContent />
    </Suspense>
  );
}
