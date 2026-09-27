'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist-store';
import { useStoreHydration } from '@/lib/hooks/useStoreHydration';
import { cn } from '@/lib/utils';

interface WishlistToggleProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function WishlistToggle({
  productId,
  className,
  size = 'md',
  showLabel = false,
}: WishlistToggleProps) {
  const t = useTranslations('wishlist');
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(productId));
  const storeHasHydrated = useWishlistStore((state) => state._hasHydrated);
  const isHydrated = useStoreHydration(storeHasHydrated);

  const active = isHydrated && isInWishlist;
  const label = active ? t('remove') : t('add');

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-4 py-2.5 text-sm',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer select-none',
        active
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'bg-card/80 backdrop-blur-xs text-foreground/70 hover:text-primary hover:bg-card border border-border/40 shadow-2xs',
        sizeClasses[size],
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          'transition-all duration-200',
          active ? 'fill-primary text-primary scale-110' : 'fill-transparent'
        )}
      />
      {showLabel && <span className="font-sans font-medium">{label}</span>}
    </button>
  );
}
