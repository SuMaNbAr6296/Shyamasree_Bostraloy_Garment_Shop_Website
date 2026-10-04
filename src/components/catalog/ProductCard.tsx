'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Product } from '@/domain/product/types';
import { PriceDisplay } from './PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { WishlistToggle } from '@/components/wishlist/WishlistToggle';
import { useQuickViewStore } from '@/store/quick-view-store';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const locale = useLocale() as 'bn' | 'en';
  const name = product.name[locale] || product.name.bn;
  const shortDesc = product.shortDescription[locale] || product.shortDescription.bn;
  const mainImage = product.images[0];

  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-md border border-border bg-card overflow-hidden shadow-xs transition-all duration-300 hover:shadow-md hover:border-secondary/40',
        className
      )}
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/20 block">
        <Link
          href={`/shop/${product.slug}`}
          className="relative w-full h-full block"
          aria-label={name}
        >
          {mainImage ? (
            <Image
              src={mainImage.src}
              alt={mainImage.alt[locale] || name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
              {name}
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10 pointer-events-none">
          {product.newArrival && (
            <Badge variant="secondary">
              {locale === 'bn' ? 'নতুন' : 'New'}
            </Badge>
          )}
          {product.bestSeller && (
            <Badge variant="accent">
              {locale === 'bn' ? 'সেরা বিক্রি' : 'Best Seller'}
            </Badge>
          )}
          {product.availability === 'out_of_stock' && (
            <Badge variant="outline" className="bg-card/90 text-destructive border-destructive/30">
              {locale === 'bn' ? 'স্টক শেষ' : 'Out of Stock'}
            </Badge>
          )}
        </div>

        {/* Wishlist Button & Quick View Button Overlay */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <WishlistToggle productId={product.id} size="sm" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-1.5 rounded-full bg-card/80 backdrop-blur-xs text-foreground/70 hover:text-primary hover:bg-card border border-border/40 shadow-2xs transition-all duration-200 cursor-pointer"
            aria-label={locale === 'bn' ? 'দ্রুত দেখুন' : 'Quick View'}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          <Link
            href={`/shop/${product.slug}`}
            className="font-serif font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-1 block"
          >
            {name}
          </Link>
          <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {shortDesc}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between pr-12 sm:pr-0">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            currency={product.currency}
            size="sm"
          />
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="text-xs font-semibold text-primary hover:text-primary-hover underline-offset-4 hover:underline cursor-pointer"
          >
            {locale === 'bn' ? 'দ্রুত দেখুন' : 'Quick View'}
          </button>
        </div>
      </div>
    </div>
  );
}
