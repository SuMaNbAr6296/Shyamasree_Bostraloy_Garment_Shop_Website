'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useResolvedCart } from '@/lib/cart/use-resolved-cart';
import { Product } from '@/domain/product/types';
import { productRepository } from '@/repositories';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function CartPageClient() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'bn' | 'en';

  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const { items, subtotal, totalItems, isLoading, isHydrated } = useResolvedCart();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    productRepository.getFeatured(4).then((products) => {
      setRecommendedProducts(products);
    });
  }, []);

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

        {/* Page Title */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('title')}
            </h1>
            {isHydrated && totalItems > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-sans text-xs font-semibold">
                {t('itemCount', { count: totalItems })}
              </span>
            )}
          </div>

          {isHydrated && items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-sans text-muted-foreground hover:text-destructive transition-colors underline cursor-pointer"
            >
              {t('clearCart')}
            </button>
          )}
        </div>

        {/* Cart Content */}
        {!isHydrated || isLoading ? (
          <div className="py-20 text-center text-muted-foreground font-sans text-sm">
            {locale === 'bn' ? 'কার্ট লোড করা হচ্ছে...' : 'Loading shopping cart...'}
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="py-16 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground border border-border/50">
              <ShoppingBag className="w-10 h-10" />
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
                <span>{t('continueShopping')}</span>
              </Button>
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-card rounded-md border border-border shadow-2xs divide-y divide-border/60">
                {items.map(({ product, quantity, lineTotal }) => {
                  const name = product.name[locale] || product.name.bn;
                  const mainImage = product.images[0];

                  return (
                    <div
                      key={product.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Thumbnail Image */}
                        <Link
                          href={`/shop/${product.slug}`}
                          className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-md overflow-hidden bg-muted/20 shrink-0 border border-border/60"
                        >
                          {mainImage ? (
                            <Image
                              src={mainImage.src}
                              alt={mainImage.alt[locale] || name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                              {name}
                            </div>
                          )}
                        </Link>

                        {/* Title & Price */}
                        <div className="space-y-1.5 flex-1">
                          <Link
                            href={`/shop/${product.slug}`}
                            className="font-serif font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {name}
                          </Link>
                          <div className="text-xs text-muted-foreground font-sans">
                            ₹{product.price.toLocaleString('en-IN')} / {locale === 'bn' ? 'পিস' : 'item'}
                          </div>
                        </div>
                      </div>

                      {/* Stepper & Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border/40">
                        <div className="flex items-center border border-border rounded-xs bg-card">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(product.id)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none"
                            aria-label={t('decreaseQty')}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm font-bold text-foreground min-w-[32px] text-center font-sans">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(product.id)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none"
                            aria-label={t('increaseQty')}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <PriceDisplay price={lineTotal} currency={product.currency} size="md" />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer rounded-full hover:bg-muted"
                          aria-label={t('removeItem')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2 font-sans">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('continueShopping')}</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary (4 cols) */}
            <div className="lg:col-span-4 bg-card rounded-md border border-border p-5 sm:p-6 space-y-6 shadow-2xs sticky top-24">
              <h2 className="font-serif text-xl font-bold text-foreground border-b border-border pb-3">
                {t('orderSummary')}
              </h2>

              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{t('subtotal')}</span>
                  <PriceDisplay price={subtotal} currency="INR" size="md" />
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between items-center font-serif">
                  <span className="text-base font-bold text-foreground">{t('subtotal')}</span>
                  <PriceDisplay price={subtotal} currency="INR" size="lg" />
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full font-bold shadow-md gap-2"
                  >
                    <span>{t('checkout')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40 font-sans">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>{tCommon('brandName')} — Authentic Handloom Textiles</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products Showcase */}
        {recommendedProducts.length > 0 && (
          <div className="pt-12 border-t border-border space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              {t('recommendedTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
