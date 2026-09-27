import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from 'next-intl/server';
import { ProductQueryFilters } from '@/domain/product/repository';
import { Category } from '@/domain/category/types';
import { Collection } from '@/domain/collection/types';
import { createShopUrl } from '@/lib/shop/query-params';
import { X } from 'lucide-react';

interface ActiveFilterChipsProps {
  filters: ProductQueryFilters;
  categories: Category[];
  collections: Collection[];
  searchParams: Record<string, string>;
}

export async function ActiveFilterChips({
  filters,
  categories,
  collections,
  searchParams,
}: ActiveFilterChipsProps) {
  const t = await getTranslations('shop');
  const locale = (await getLocale()) as 'bn' | 'en';

  const urlParams = new URLSearchParams(searchParams);

  const activeChips: { label: string; removeUrl: string }[] = [];

  if (filters.search) {
    activeChips.push({
      label: `"${filters.search}"`,
      removeUrl: createShopUrl('/shop', { q: null }, urlParams),
    });
  }

  if (filters.categoryId) {
    const matched = categories.find(
      (c) => c.id === filters.categoryId || c.slug === filters.categoryId
    );
    const catName = matched ? matched.name[locale] || matched.name.bn : filters.categoryId;
    activeChips.push({
      label: catName,
      removeUrl: createShopUrl('/shop', { category: null }, urlParams),
    });
  }

  if (filters.collectionId) {
    const matched = collections.find(
      (c) => c.id === filters.collectionId || c.slug === filters.collectionId
    );
    const colName = matched ? matched.name[locale] || matched.name.bn : filters.collectionId;
    activeChips.push({
      label: colName,
      removeUrl: createShopUrl('/shop', { collection: null }, urlParams),
    });
  }

  if (filters.featured) {
    activeChips.push({
      label: t('featuredOnly'),
      removeUrl: createShopUrl('/shop', { featured: null }, urlParams),
    });
  }

  if (filters.newArrival) {
    activeChips.push({
      label: t('newArrivalsOnly'),
      removeUrl: createShopUrl('/shop', { newArrival: null }, urlParams),
    });
  }

  if (filters.bestSeller) {
    activeChips.push({
      label: t('bestSellersOnly'),
      removeUrl: createShopUrl('/shop', { bestSeller: null }, urlParams),
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const priceText = `₹${filters.minPrice || 0} — ₹${filters.maxPrice || '∞'}`;
    activeChips.push({
      label: priceText,
      removeUrl: createShopUrl('/shop', { minPrice: null, maxPrice: null }, urlParams),
    });
  }

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
      {activeChips.map((chip, idx) => (
        <Link
          key={idx}
          href={chip.removeUrl}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-sans font-medium border border-primary/20"
          aria-label={`Remove filter ${chip.label}`}
        >
          <span>{chip.label}</span>
          <X className="w-3 h-3 shrink-0" />
        </Link>
      ))}

      <Link
        href="/shop"
        className="text-xs text-muted-foreground hover:text-foreground font-medium underline ml-1"
      >
        {t('clearFilters')}
      </Link>
    </div>
  );
}
