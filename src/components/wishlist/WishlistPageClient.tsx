'use client';

import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist-store';
import { useResolvedWishlist } from '@/lib/wishlist/use-resolved-wishlist';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function WishlistPageClient() {
  const t = useTranslations('wishlist');
  const locale = useLocale() as 'bn' | 'en';

  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const { products, totalItems, isLoading, isHydrated } = useResolvedWishlist();

  return (
    <Section size="md" className="py-8 sm:py-12 bg-background min-h-[60vh]">
      <Container className="space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="font-sans text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">
            {locale === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            {locale === 'bn' ? 'দোকান' : 'Shop'}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{t('title')}</span>
        </nav>

        {/* Page Title & Actions */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('title')}
            </h1>
            {isHydrated && totalItems > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary-hover font-sans text-xs font-semibold">
                {t('count', { count: totalItems })}
              </span>
            )}
          </div>

          {isHydrated && products.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-sans text-muted-foreground hover:text-destructive transition-colors underline cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'তালিকা মুছুন' : 'Clear Wishlist'}</span>
            </button>
          )}
        </div>

        {/* Content */}
        {!isHydrated || isLoading ? (
          <div className="py-20 text-center text-muted-foreground font-sans text-sm">
            {locale === 'bn' ? 'পছন্দের তালিকা লোড করা হচ্ছে...' : 'Loading wishlist...'}
          </div>
        ) : products.length === 0 ? (
          /* Empty Wishlist State */
          <div className="py-16 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground border border-border/50">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {t('emptyTitle')}
              </h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {t('emptyDesc')}
              </p>
            </div>
            <Link href="/shop" className="inline-block">
              <Button variant="primary" size="lg" className="gap-2 font-bold shadow-md">
                <ArrowLeft className="w-4 h-4" />
                <span>{t('exploreShop')}</span>
              </Button>
            </Link>
          </div>
        ) : (
          /* Wishlist Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
