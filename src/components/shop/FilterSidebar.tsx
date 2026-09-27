import { Category } from '@/domain/category/types';
import { Collection } from '@/domain/collection/types';
import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from 'next-intl/server';
import { ProductQueryFilters } from '@/domain/product/repository';
import { createShopUrl } from '@/lib/shop/query-params';
import { Divider } from '@/components/ui/Divider';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, Check, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  collections: Collection[];
  activeFilters: ProductQueryFilters;
  rawSearchParams?: Record<string, string>;
  className?: string;
}

export async function FilterSidebar({
  categories,
  collections,
  activeFilters,
  className,
}: FilterSidebarProps) {
  const t = await getTranslations('shop');
  const locale = (await getLocale()) as 'bn' | 'en';

  const isCategoryActive = (slugOrId: string) => {
    return activeFilters.categoryId === slugOrId;
  };

  const isCollectionActive = (slugOrId: string) => {
    return activeFilters.collectionId === slugOrId;
  };

  const hasAnyFilter =
    activeFilters.categoryId ||
    activeFilters.collectionId ||
    activeFilters.minPrice ||
    activeFilters.maxPrice ||
    activeFilters.featured ||
    activeFilters.newArrival ||
    activeFilters.bestSeller ||
    activeFilters.search;

  return (
    <aside className={cn('space-y-6 font-sans text-xs sm:text-sm', className)}>
      {/* Sidebar Header & Reset Button */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2 font-serif font-bold text-base text-foreground">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span>{t('filterLabel')}</span>
        </div>
        {hasAnyFilter && (
          <Link
            href="/shop"
            className="text-xs text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('clearFilters')}</span>
          </Link>
        )}
      </div>

      {/* Categories Filter */}
      <div className="space-y-2.5">
        <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-muted-foreground">
          {t('allCategories')}
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/shop"
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                !activeFilters.categoryId
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{locale === 'bn' ? 'সকল বিভাগ' : 'All Categories'}</span>
              {!activeFilters.categoryId && <Check className="w-3.5 h-3.5 text-primary" />}
            </Link>
          </li>
          {categories.map((cat) => {
            const active = isCategoryActive(cat.slug) || isCategoryActive(cat.id);
            const catName = cat.name[locale] || cat.name.bn;
            const targetUrl = active ? '/shop' : `/shop?category=${cat.slug}`;

            return (
              <li key={cat.id}>
                <Link
                  href={targetUrl}
                  className={cn(
                    'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span>{catName}</span>
                  {active && <Check className="w-3.5 h-3.5 text-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider className="my-4 border-border/60" />

      {/* Collections Filter */}
      <div className="space-y-2.5">
        <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-muted-foreground">
          {t('allCollections')}
        </h3>
        <ul className="space-y-1">
          {collections.map((col) => {
            const active = isCollectionActive(col.slug) || isCollectionActive(col.id);
            const colName = col.name[locale] || col.name.bn;
            const targetUrl = active ? '/shop' : `/shop?collection=${col.slug}`;

            return (
              <li key={col.id}>
                <Link
                  href={targetUrl}
                  className={cn(
                    'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span>{colName}</span>
                  {active && <Check className="w-3.5 h-3.5 text-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider className="my-4 border-border/60" />

      {/* Quick Filters */}
      <div className="space-y-2.5">
        <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-muted-foreground">
          {t('quickFilters')}
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href={
                activeFilters.featured
                  ? createShopUrl('/shop', { featured: null })
                  : createShopUrl('/shop', { featured: 'true' })
              }
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                activeFilters.featured
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{t('featuredOnly')}</span>
              {activeFilters.featured && <Check className="w-3.5 h-3.5 text-primary" />}
            </Link>
          </li>
          <li>
            <Link
              href={
                activeFilters.newArrival
                  ? createShopUrl('/shop', { newArrival: null })
                  : createShopUrl('/shop', { newArrival: 'true' })
              }
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                activeFilters.newArrival
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{t('newArrivalsOnly')}</span>
              {activeFilters.newArrival && <Check className="w-3.5 h-3.5 text-primary" />}
            </Link>
          </li>
          <li>
            <Link
              href={
                activeFilters.bestSeller
                  ? createShopUrl('/shop', { bestSeller: null })
                  : createShopUrl('/shop', { bestSeller: 'true' })
              }
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors',
                activeFilters.bestSeller
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{t('bestSellersOnly')}</span>
              {activeFilters.bestSeller && <Check className="w-3.5 h-3.5 text-primary" />}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
