'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Product } from '@/domain/product/types';
import { Button } from '@/components/ui/Button';
import { WishlistToggle } from '@/components/wishlist/WishlistToggle';
import { useCartStore } from '@/store/cart-store';
import { useCartDrawerStore } from '@/store/cart-drawer-store';
import { ShoppingBag, Plus, Minus, CheckCircle } from 'lucide-react';

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const t = useTranslations('product');
  const tCart = useTranslations('cart');

  const [quantity, setQuantity] = useState<number>(1);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartDrawerStore((state) => state.openDrawer);

  const isOutOfStock = product.availability === 'out_of_stock';
  const isComingSoon = product.availability === 'coming_soon';
  const canPurchase = product.availability === 'in_stock';

  const handleAddToCart = () => {
    if (!canPurchase) return;

    addItem(product.id, quantity);
    openDrawer();

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(10, prev + 1));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="pt-4 border-t border-border space-y-4 font-sans">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        {showFeedback ? tCart('addedToCartNotice') : ''}
      </div>

      {/* Quantity Stepper & Stock Label */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-foreground">
          {t('specifications') ? 'পরিমাণ' : 'Quantity'}:
        </span>
        <div className="flex items-center border border-border rounded-xs bg-card">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={!canPurchase || quantity <= 1}
            className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label={tCart('decreaseQty')}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-bold text-foreground min-w-[36px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={!canPurchase || quantity >= 10}
            className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label={tCart('increaseQty')}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {canPurchase && (
          <span className="text-xs font-semibold text-accent flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {t('inStock')}
          </span>
        )}
      </div>

      {/* Action Buttons Grid */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          disabled={!canPurchase}
          onClick={handleAddToCart}
          className="flex-1 gap-2 font-bold shadow-md"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{t('addToCart')}</span>
        </Button>

        <WishlistToggle
          productId={product.id}
          size="lg"
          showLabel
          className="h-11 px-4 border border-border"
        />
      </div>

      {/* Availability Alerts */}
      {isOutOfStock && (
        <p className="text-xs text-destructive font-medium text-center bg-destructive/10 p-2 rounded-xs border border-destructive/20">
          {t('outOfStock')}
        </p>
      )}

      {isComingSoon && (
        <p className="text-xs text-secondary font-medium text-center bg-secondary/10 p-2 rounded-xs border border-secondary/20">
          {t('comingSoon')}
        </p>
      )}
    </div>
  );
}
