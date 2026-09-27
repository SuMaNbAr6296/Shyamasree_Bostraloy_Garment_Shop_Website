import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { PackageSearch, RotateCcw } from 'lucide-react';

export function EmptyState() {
  const t = useTranslations('shop');

  return (
    <div className="py-16 px-4 text-center bg-card rounded-md border border-border space-y-4 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
        <PackageSearch className="w-6 h-6 text-primary" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif font-bold text-lg text-foreground">
          {t('noProductsTitle')}
        </h3>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
          {t('noProductsDesc')}
        </p>
      </div>
      <div className="pt-2">
        <Link href="/shop">
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('clearFilters')}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
