'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNavigation } from './MobileNavigation';

import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartDrawerStore } from '@/store/cart-drawer-store';
import { useSearchStore } from '@/store/search-store';
import { useStoreHydration } from '@/lib/hooks/useStoreHydration';

export function HeaderActions() {
  const tNav = useTranslations('navigation');

  const cartHasHydrated = useCartStore((state) => state._hasHydrated);
  const cartItems = useCartStore((state) => state.items);
  const isCartHydrated = useStoreHydration(cartHasHydrated);

  const wishlistHasHydrated = useWishlistStore((state) => state._hasHydrated);
  const wishlistProductIds = useWishlistStore((state) => state.productIds);
  const isWishlistHydrated = useStoreHydration(wishlistHasHydrated);

  const openCartDrawer = useCartDrawerStore((state) => state.openDrawer);
  const openSearch = useSearchStore((state) => state.openSearch);

  const cartCount = isCartHydrated
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const wishlistCount = isWishlistHydrated ? wishlistProductIds.length : 0;

  return (
    <>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search Trigger */}
        <IconButton
          variant="ghost"
          size="md"
          onClick={openSearch}
          aria-label={tNav('search')}
        >
          <Search className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
        </IconButton>

        {/* Language Switcher (Desktop) */}
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

        {/* Wishlist Trigger */}
        <Link href="/wishlist" className="relative" aria-label={tNav('wishlist')}>
          <IconButton variant="ghost" size="md" aria-label={tNav('wishlist')}>
            <Heart className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
          </IconButton>
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center pointer-events-none shadow-2xs">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart Trigger */}
        <div className="relative">
          <IconButton
            variant="ghost"
            size="md"
            onClick={openCartDrawer}
            aria-label={tNav('cart')}
          >
            <ShoppingBag className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
          </IconButton>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center pointer-events-none shadow-2xs">
              {cartCount}
            </span>
          )}
        </div>

        {/* Mobile Navigation Drawer Trigger */}
        <MobileNavigation />
      </div>


    </>
  );
}
