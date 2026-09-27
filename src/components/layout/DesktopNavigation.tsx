'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function DesktopNavigation({ className }: { className?: string }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/shop', label: t('shop') },
    { href: '/categories', label: t('categories') },
    { href: '/story', label: t('story') },
    { href: '/contact', label: t('contact') },
  ] as const;

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label="Main Navigation" className={cn('hidden md:flex items-center gap-6 lg:gap-8', className)}>
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-sans font-medium transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xs',
              active
                ? 'text-primary font-semibold'
                : 'text-foreground/80 hover:text-primary'
            )}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
