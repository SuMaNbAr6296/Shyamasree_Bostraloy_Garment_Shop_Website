import { getTranslations, setRequestLocale } from 'next-intl/server';
import { productRepository, categoryRepository, collectionRepository } from '@/repositories';
import { parseShopSearchParams, ShopSearchParams } from '@/lib/shop/query-params';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { ShopHero } from '@/components/shop/ShopHero';
import { ShopToolbar } from '@/components/shop/ShopToolbar';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ActiveFilterChips } from '@/components/shop/ActiveFilterChips';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ShopPagination } from '@/components/shop/ShopPagination';
import { EmptyState } from '@/components/shop/EmptyState';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ShopSearchParams>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params;
  const rawParams = await searchParams;
  const filters = parseShopSearchParams(rawParams);
  const t = await getTranslations({ locale, namespace: 'shop' });

  let pageTitle = t('title');
  if (filters.categoryId) {
    const categories = await categoryRepository.getAll();
    const matched = categories.find((c) => c.id === filters.categoryId || c.slug === filters.categoryId);
    if (matched) {
      pageTitle = matched.name[locale as 'bn' | 'en'] || matched.name.bn;
    }
  } else if (filters.collectionId) {
    const collections = await collectionRepository.getAll();
    const matched = collections.find((c) => c.id === filters.collectionId || c.slug === filters.collectionId);
    if (matched) {
      pageTitle = matched.name[locale as 'bn' | 'en'] || matched.name.bn;
    }
  }

  return {
    title: `${pageTitle} — Shyamasree Bostraloy`,
    description: t('placeholderText'),
  };
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const rawParams = await searchParams;
  const filters = parseShopSearchParams(rawParams);

  // Async repository calls
  const [paginatedResult, categories, collections] = await Promise.all([
    productRepository.getAll(filters),
    categoryRepository.getAll(),
    collectionRepository.getAll(),
  ]);

  // Determine active title / description if category or collection filter is active
  let customTitle: string | undefined;
  let customDesc: string | undefined;

  if (filters.categoryId) {
    const matchedCat = categories.find((c) => c.id === filters.categoryId || c.slug === filters.categoryId);
    if (matchedCat) {
      customTitle = matchedCat.name[locale as 'bn' | 'en'] || matchedCat.name.bn;
      customDesc = matchedCat.description[locale as 'bn' | 'en'] || matchedCat.description.bn;
    }
  } else if (filters.collectionId) {
    const matchedCol = collections.find((c) => c.id === filters.collectionId || c.slug === filters.collectionId);
    if (matchedCol) {
      customTitle = matchedCol.name[locale as 'bn' | 'en'] || matchedCol.name.bn;
      customDesc = matchedCol.description[locale as 'bn' | 'en'] || matchedCol.description.bn;
    }
  }

  const activeFilterCount =
    (filters.categoryId ? 1 : 0) +
    (filters.collectionId ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.newArrival ? 1 : 0) +
    (filters.bestSeller ? 1 : 0) +
    (filters.search ? 1 : 0);

  const filterSidebarNode = (
    <FilterSidebar
      categories={categories}
      collections={collections}
      activeFilters={filters}
      rawSearchParams={rawParams as Record<string, string>}
    />
  );

  return (
    <main className="min-h-screen bg-background text-foreground font-sans pb-16">
      {/* Editorial Shop Header */}
      <ShopHero title={customTitle} description={customDesc} />

      <Container className="py-8 space-y-6">
        {/* Toolbar (Search, Result Count, Mobile Filter Trigger, Sort) */}
        <ShopToolbar
          totalCount={paginatedResult.total}
          activeFilterCount={activeFilterCount}
          filterSidebarNode={filterSidebarNode}
        />

        {/* Active Filter Badges */}
        <ActiveFilterChips
          filters={filters}
          categories={categories}
          collections={collections}
          searchParams={rawParams as Record<string, string>}
        />

        {/* Main Catalog Grid & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start pt-2">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            {filterSidebarNode}
          </div>

          {/* Product Cards Area */}
          <div className="lg:col-span-3 space-y-8">
            {paginatedResult.items.length > 0 ? (
              <>
                <ProductGrid products={paginatedResult.items} />
                <ShopPagination
                  page={paginatedResult.page}
                  totalPages={paginatedResult.totalPages}
                  searchParams={rawParams as Record<string, string>}
                />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
