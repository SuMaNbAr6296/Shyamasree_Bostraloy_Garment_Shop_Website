'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartDrawerStore } from '@/store/cart-drawer-store';
import { useCartStore } from '@/store/cart-store';
import { useResolvedCart } from '@/lib/cart/use-resolved-cart';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'bn' | 'en';

  const isOpen = useCartDrawerStore((state) => state.isOpen);
  const closeDrawer = useCartDrawerStore((state) => state.closeDrawer);

  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { items, subtotal, totalItems, isLoading, isHydrated } = useResolvedCart();

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    },
    [isOpen, closeDrawer]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('drawerTitle')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col border-l border-border z-10 overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                  {t('drawerTitle')}
                </h2>
                {isHydrated && totalItems > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-hover">
                    {totalItems}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                aria-label={tCommon('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-border/50">
              {!isHydrated || isLoading ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  Loading cart items...
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-foreground">
                      {t('emptyTitle')}
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                      {t('emptyDesc')}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={closeDrawer}
                    className="mt-2"
                  >
                    <Link href="/shop" className="flex items-center gap-1.5">
                      <span>{t('continueShopping')}</span>
                    </Link>
                  </Button>
                </div>
              ) : (
                items.map(({ product, quantity, lineTotal }) => {
                  const name = product.name[locale] || product.name.bn;
                  const mainImage = product.images[0];

                  return (
                    <div key={product.id} className="pt-4 first:pt-0 flex gap-3 sm:gap-4 group">
                      {/* Product Thumbnail */}
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={closeDrawer}
                        className="relative w-20 h-24 rounded-md overflow-hidden bg-muted/20 shrink-0 border border-border/60"
                      >
                        {mainImage ? (
                          <Image
                            src={mainImage.src}
                            alt={mainImage.alt[locale] || name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                            {name}
                          </div>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/shop/${product.slug}`}
                              onClick={closeDrawer}
                              className="font-serif font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-2"
                            >
                              {name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                              aria-label={t('removeItem')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ₹{product.price.toLocaleString('en-IN')} / {locale === 'bn' ? 'পিস' : 'item'}
                          </div>
                        </div>

                        {/* Quantity Stepper & Line Total */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-border rounded-xs bg-card">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(product.id)}
                              className="p-1 sm:p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none"
                              aria-label={t('decreaseQty')}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-foreground min-w-[24px] text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(product.id)}
                              className="p-1 sm:p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none"
                              aria-label={t('increaseQty')}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <PriceDisplay
                            price={lineTotal}
                            currency={product.currency}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            {isHydrated && items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-border bg-card space-y-3">
                <div className="flex items-center justify-between font-serif">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {t('subtotal')}
                  </span>
                  <PriceDisplay price={subtotal} currency="INR" size="lg" />
                </div>

                <div className="space-y-2 pt-1">
                  <Link href="/cart" onClick={closeDrawer} className="block w-full">
                    <Button variant="primary" size="md" className="w-full gap-2 font-bold">
                      <span>{t('viewCart')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href="/checkout" onClick={closeDrawer} className="block w-full">
                    <Button variant="secondary" size="md" className="w-full gap-2 font-bold shadow-xs">
                      <span>{t('checkout')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
