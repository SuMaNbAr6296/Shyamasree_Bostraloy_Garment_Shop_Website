'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Product } from '@/domain/product/types';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { useSearchStore } from '@/store/search-store';

interface SearchResultItemProps {
  product: Product;
}

export function SearchResultItem({ product }: SearchResultItemProps) {
  const locale = useLocale() as 'bn' | 'en';
  const closeSearch = useSearchStore((state) => state.closeSearch);

  const name = product.name[locale] || product.name.bn;
  const shortDesc = product.shortDescription[locale] || product.shortDescription.bn;
  const mainImage = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      onClick={closeSearch}
      className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-md border border-border/40 bg-card hover:bg-muted/40 hover:border-secondary/40 transition-all duration-200 group"
    >
      {/* Thumbnail */}
      <div className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-xs overflow-hidden bg-muted/20 shrink-0 border border-border/50">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt[locale] || name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
            {name}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="font-serif font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
          {name}
        </h4>
        <p className="font-sans text-xs text-muted-foreground line-clamp-1 leading-normal">
          {shortDesc}
        </p>
        <div className="pt-0.5">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            currency={product.currency}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
}
