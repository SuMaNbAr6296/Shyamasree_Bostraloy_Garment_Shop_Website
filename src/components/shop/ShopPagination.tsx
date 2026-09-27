import { Link } from '@/i18n/routing';
import { createShopUrl } from '@/lib/shop/query-params';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopPaginationProps {
  page: number;
  totalPages: number;
  searchParams: Record<string, string>;
}

export function ShopPagination({ page, totalPages, searchParams }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  const urlParams = new URLSearchParams(searchParams);

  const prevUrl = page > 1 ? createShopUrl('/shop', { page: page - 1 }, urlParams) : null;
  const nextUrl = page < totalPages ? createShopUrl('/shop', { page: page + 1 }, urlParams) : null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-8 font-sans">
      {prevUrl ? (
        <Link
          href={prevUrl}
          className="inline-flex items-center gap-1 h-9 px-3 text-xs font-semibold rounded-sm border border-border bg-card text-foreground hover:bg-muted transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 h-9 px-3 text-xs font-semibold rounded-sm border border-border/40 bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      <span className="text-xs text-muted-foreground px-2 font-medium">
        {page} / {totalPages}
      </span>

      {nextUrl ? (
        <Link
          href={nextUrl}
          className="inline-flex items-center gap-1 h-9 px-3 text-xs font-semibold rounded-sm border border-border bg-card text-foreground hover:bg-muted transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 h-9 px-3 text-xs font-semibold rounded-sm border border-border/40 bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
