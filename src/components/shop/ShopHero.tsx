import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from './Breadcrumb';

interface ShopHeroProps {
  title?: string;
  description?: string;
}

export function ShopHero({ title, description }: ShopHeroProps) {
  const tShop = useTranslations('shop');

  const displayTitle = title || tShop('title');
  const displayDesc = description || tShop('placeholderText');

  return (
    <header className="bg-card border-b border-border py-8 sm:py-12">
      <Container className="space-y-4">
        <Breadcrumb items={[{ label: displayTitle }]} />
        <div className="space-y-1.5 max-w-3xl">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight">
            {displayTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </Container>
    </header>
  );
}
