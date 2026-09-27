'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/shop', label: t('shop') },
    { href: '/categories', label: t('categories') },
    { href: '/story', label: t('story') },
    { href: '/contact', label: t('contact') },
  ] as const;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <IconButton
        variant="ghost"
        size="md"
        aria-label={isOpen ? tCommon('close') : tCommon('menu')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-card border-l border-border z-50 p-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-serif font-bold text-base text-primary">
                    {tCommon('brandName')}
                  </span>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label={tCommon('close')}
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </IconButton>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'px-3 py-2.5 rounded-sm text-base font-sans font-medium transition-colors',
                          active
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-foreground hover:bg-muted'
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-muted-foreground font-sans">{tCommon('language')}</span>
                  <LanguageSwitcher variant="mobile" />
                </div>

                <div className="flex items-center justify-around pt-2">
                  <Link href="/shop" onClick={handleLinkClick} aria-label={t('search')}>
                    <IconButton variant="outline" aria-label={t('search')}>
                      <Search className="w-4 h-4 text-foreground" />
                    </IconButton>
                  </Link>

                  <Link href="/wishlist" onClick={handleLinkClick} aria-label={t('wishlist')}>
                    <IconButton variant="outline" aria-label={t('wishlist')}>
                      <Heart className="w-4 h-4 text-foreground" />
                    </IconButton>
                  </Link>

                  <Link href="/cart" onClick={handleLinkClick} aria-label={t('cart')}>
                    <IconButton variant="outline" aria-label={t('cart')}>
                      <ShoppingBag className="w-4 h-4 text-foreground" />
                    </IconButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
