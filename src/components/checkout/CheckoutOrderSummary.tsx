'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { ResolvedCartItem } from '@/lib/cart/use-resolved-cart';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { calculateShippingFee, FREE_SHIPPING_THRESHOLD } from '@/lib/order/shipping';

interface CheckoutOrderSummaryProps {
  items: ResolvedCartItem[];
  subtotal: number;
}

export function CheckoutOrderSummary({ items, subtotal }: CheckoutOrderSummaryProps) {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'bn' | 'en';

  const shippingFee = calculateShippingFee(subtotal);
  const isFreeShipping = shippingFee === 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="bg-card rounded-md border border-border p-5 sm:p-6 space-y-6 shadow-2xs font-sans">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <span>{t('orderSummary')}</span>
        </h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-hover">
          {t('items')}: {items.reduce((acc, i) => acc + i.quantity, 0)}
        </span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 divide-y divide-border/40">
        {items.map(({ product, quantity, lineTotal }) => {
          const name = product.name[locale] || product.name.bn;
          const mainImage = product.images[0];

          return (
            <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3">
              <div className="relative w-14 h-16 rounded-xs overflow-hidden bg-muted/20 shrink-0 border border-border/50">
                {mainImage ? (
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt[locale] || name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                    {name}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-foreground truncate">
                  {name}
                </h4>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>Qty: {quantity}</span>
                  <span>•</span>
                  <span>₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-right">
                <PriceDisplay price={lineTotal} currency={product.currency} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Shipping Promo Callout */}
      <div className="p-3 rounded-xs bg-muted/40 border border-border/60 text-xs flex items-center gap-2">
        <Truck className="w-4 h-4 text-accent shrink-0" />
        <span className="text-muted-foreground font-medium">
          {isFreeShipping
            ? t('freeShippingBadge')
            : locale === 'bn'
            ? `আরও ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} কেনাকাটা করলে শিপিং ফ্রি!`
            : `Add ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for FREE shipping!`}
        </span>
      </div>

      {/* Price Calculations Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-border text-sm">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>{t('subtotal')}</span>
          <PriceDisplay price={subtotal} currency="INR" size="sm" />
        </div>

        <div className="flex justify-between items-center text-muted-foreground">
          <span className="flex items-center gap-1">
            <span>{t('shipping')}</span>
          </span>
          {isFreeShipping ? (
            <span className="font-bold text-accent">{t('freeShipping')}</span>
          ) : (
            <PriceDisplay price={shippingFee} currency="INR" size="sm" />
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-border font-serif text-lg font-bold text-foreground">
          <span>{t('total')}</span>
          <PriceDisplay price={grandTotal} currency="INR" size="lg" />
        </div>
      </div>

      {/* Security Tag */}
      <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground border-t border-border/40">
        <ShieldCheck className="w-4 h-4 text-accent" />
        <span>{tCommon('brandName')} — Verified Quality Guarantee</span>
      </div>
    </div>
  );
}
