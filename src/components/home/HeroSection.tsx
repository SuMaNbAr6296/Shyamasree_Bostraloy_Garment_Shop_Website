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
    <section className="relative bg-gradient-to-b from-card to-background pt-4 sm:pt-6 pb-12 md:pb-16 border-b border-border">
      <Container className="space-y-6 lg:space-y-8">
        {/* Editorial Text Composition */}
        <div className="w-full max-w-5xl mx-auto text-center space-y-4 sm:space-y-5">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {t('heroEyebrow')}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed w-full mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Hero Visual Showcase */}
        <div className="w-full">
          <HeroCarousel>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/shop">
                <Button variant="primary" size="lg" className="shadow-md">
                  <span>{t('shopCTA')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/categories">
                <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm hover:bg-background border-border">
                  {t('categoriesCTA')}
                </Button>
              </Link>
            </div>
          </HeroCarousel>

          {/* Mobile Buttons (below carousel) */}
          <div className="flex flex-col sm:hidden items-center justify-center gap-3 mt-6 w-full max-w-xs mx-auto">
            <Link href="/shop" className="w-full">
              <Button variant="primary" size="lg" className="w-full shadow-md">
                <span>{t('shopCTA')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="/categories" className="w-full">
              <Button variant="outline" size="lg" className="w-full border-border">
                {t('categoriesCTA')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
