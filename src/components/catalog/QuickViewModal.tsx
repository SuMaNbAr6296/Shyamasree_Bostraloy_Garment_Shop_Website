'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useQuickViewStore } from '@/store/quick-view-store';
import { useCartStore } from '@/store/cart-store';
import { useCartDrawerStore } from '@/store/cart-drawer-store';
import { PriceDisplay } from './PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { WishlistToggle } from '@/components/wishlist/WishlistToggle';
import { Button } from '@/components/ui/Button';

export function QuickViewModal() {
  const t = useTranslations('quickView');
  const tProduct = useTranslations('product');
  const locale = useLocale() as 'bn' | 'en';

  const product = useQuickViewStore((state) => state.product);
  const isOpen = useQuickViewStore((state) => state.isOpen);
  const closeQuickView = useQuickViewStore((state) => state.closeQuickView);

  const [quantity, setQuantity] = useState<number>(1);

  const addItem = useCartStore((state) => state.addItem);
  const openCartDrawer = useCartDrawerStore((state) => state.openDrawer);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeQuickView();
      }
    },
    [isOpen, closeQuickView]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
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

  if (!product) return null;

  const name = product.name[locale] || product.name.bn;
  const shortDesc = product.shortDescription[locale] || product.shortDescription.bn;
  const mainImage = product.images[0];

  const canPurchase = product.availability === 'in_stock';
  const isOutOfStock = product.availability === 'out_of_stock';
  const isComingSoon = product.availability === 'coming_soon';

  const handleAddToCart = () => {
    if (!canPurchase) return;

    addItem(product.id, quantity);
    closeQuickView();
    openCartDrawer();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key={product.id} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${t('title')} — ${name}`}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-card rounded-md border border-border shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-card/80 text-foreground hover:bg-muted transition-colors border border-border/50 shadow-2xs cursor-pointer"
              aria-label={tProduct('productNotFound') ? 'বন্ধ করুন' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Product Image */}
            <div className="relative w-full md:w-1/2 aspect-4/3 md:aspect-square bg-muted/20 shrink-0 border-b md:border-b-0 md:border-r border-border">
              {mainImage ? (
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt[locale] || name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                  {name}
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
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
                {isOutOfStock && (
                  <Badge variant="outline" className="bg-card/90 text-destructive border-destructive/30">
                    {t('outOfStock')}
                  </Badge>
                )}
                {isComingSoon && (
                  <Badge variant="outline" className="bg-card/90 text-secondary border-secondary/30">
                    {t('comingSoon')}
                  </Badge>
                )}
              </div>
            </div>

            {/* Right Column: Product Details & Purchase Actions */}
            <div className="p-5 sm:p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto space-y-4">
              <div className="space-y-3">
                {/* Title & Price */}
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground leading-tight">
                    {name}
                  </h3>
                  <div className="pt-1">
                    <PriceDisplay
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                      currency={product.currency}
                      size="lg"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {shortDesc}
                </p>

                {/* Attributes Table */}
                <div className="pt-2 border-t border-border/60 text-xs space-y-1.5">
                  {product.attributes.material && (
                    <div className="flex justify-between py-0.5 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">{tProduct('material')}</span>
                      <span className="font-semibold text-foreground">{product.attributes.material[locale] || product.attributes.material.bn}</span>
                    </div>
                  )}
                  {product.attributes.fabric && (
                    <div className="flex justify-between py-0.5 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">{tProduct('fabric')}</span>
                      <span className="font-semibold text-foreground">{product.attributes.fabric[locale] || product.attributes.fabric.bn}</span>
                    </div>
                  )}
                  {product.attributes.occasion && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-muted-foreground font-medium">{tProduct('occasion')}</span>
                      <span className="font-semibold text-foreground">{product.attributes.occasion[locale] || product.attributes.occasion.bn}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Actions & Controls */}
              <div className="pt-3 border-t border-border space-y-3">
                {/* Quantity Stepper & Availability */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{t('quantity')}:</span>
                    <div className="flex items-center border border-border rounded-xs bg-card">
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={!canPurchase || quantity <= 1}
                        className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-foreground min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                        disabled={!canPurchase || quantity >= 10}
                        className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <WishlistToggle productId={product.id} size="sm" />
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    size="md"
                    disabled={!canPurchase}
                    onClick={handleAddToCart}
                    className="w-full font-bold gap-2 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </Button>

                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={closeQuickView}
                    className="block w-full"
                  >
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full gap-1.5 text-xs font-semibold"
                    >
                      <span>{t('viewFullDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
