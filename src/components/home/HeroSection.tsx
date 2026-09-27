import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroCarousel } from './HeroCarousel';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-gradient-to-b from-card to-background pt-8 sm:pt-12 pb-12 md:pb-16 border-b border-border">
      <Container className="space-y-8 lg:space-y-12">
        {/* Editorial Text Composition */}
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {t('heroEyebrow')}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="shadow-md">
                <span>{t('shopCTA')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="/categories">
              <Button variant="outline" size="lg">
                {t('categoriesCTA')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="max-w-5xl mx-auto">
          <HeroCarousel />
        </div>
      </Container>
    </section>
  );
}
