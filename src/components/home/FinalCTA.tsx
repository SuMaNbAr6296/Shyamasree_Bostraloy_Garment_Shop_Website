import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const t = useTranslations('home');

  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-secondary/15 to-transparent pointer-events-none" />
      <Container className="relative z-10 text-center space-y-6 max-w-3xl">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-primary-foreground tracking-tight leading-tight">
          {t('finalCtaTitle')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
          {t('finalCtaDesc')}
        </p>
        <div className="pt-2">
          <Link href="/shop">
            <Button
              variant="secondary"
              size="lg"
              className="shadow-lg hover:shadow-xl font-bold gap-2 text-secondary-foreground"
            >
              <span>{t('finalCtaButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
