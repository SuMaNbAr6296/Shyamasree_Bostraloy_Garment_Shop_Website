import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PackageSearch } from 'lucide-react';

export default function ProductNotFound() {
  const t = useTranslations('product');

  return (
    <Container className="py-24 text-center space-y-4 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
        <PackageSearch className="w-7 h-7" />
      </div>
      <h1 className="font-serif font-bold text-2xl sm:text-3xl text-foreground">
        404 — {t('productNotFound')}
      </h1>
      <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
        The item you are looking for does not exist or has been removed from our catalog.
      </p>
      <div className="pt-2">
        <Link href="/shop">
          <Button variant="primary" size="md">
            {t('backToShop')}
          </Button>
        </Link>
      </div>
    </Container>
  );
}
