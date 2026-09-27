import { getTranslations } from 'next-intl/server';
import { SortSelect } from './SortSelect';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { SearchForm } from './SearchForm';

interface ShopToolbarProps {
  totalCount: number;
  activeFilterCount: number;
  filterSidebarNode: React.ReactNode;
}

export async function ShopToolbar({
  totalCount,
  activeFilterCount,
  filterSidebarNode,
}: ShopToolbarProps) {
  const t = await getTranslations('shop');

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card p-4 rounded-md border border-border shadow-xs font-sans">
      {/* Search Input */}
      <div className="w-full md:w-72 lg:w-80">
        <SearchForm />
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
        {/* Mobile Filter Trigger */}
        <MobileFilterDrawer activeFilterCount={activeFilterCount}>
          {filterSidebarNode}
        </MobileFilterDrawer>

        {/* Results Counter */}
        <span className="text-xs text-muted-foreground font-medium shrink-0">
          {t('resultCount', { count: totalCount })}
        </span>

        {/* Sort Select */}
        <SortSelect />
      </div>
    </div>
  );
}
