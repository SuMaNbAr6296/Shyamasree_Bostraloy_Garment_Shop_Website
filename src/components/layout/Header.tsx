import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { DesktopNavigation } from './DesktopNavigation';
import { HeaderActions } from './HeaderActions';
import { Container } from '@/components/ui/Container';

export function Header() {
  const tCommon = useTranslations('common');

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border transition-shadow">
      <Container className="flex items-center justify-between h-16 sm:h-20">
        {/* Brand & Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
          aria-label={tCommon('brandName')}
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 overflow-hidden rounded-sm border border-secondary/30 bg-muted/40">
            <Image
              src={siteConfig.assets.logo}
              alt={tCommon('brandName')}
              fill
              className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 40px, 48px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
              {tCommon('brandName')}
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
              {tCommon('brandTagline')}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <DesktopNavigation />

        {/* Right Actions */}
        <HeaderActions />
      </Container>
    </header>
  );
}
