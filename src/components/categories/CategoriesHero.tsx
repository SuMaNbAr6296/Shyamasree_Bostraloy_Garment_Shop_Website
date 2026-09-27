import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';

interface CategoriesHeroProps {
  locale: 'bn' | 'en';
}

export async function CategoriesHero({ locale }: CategoriesHeroProps) {
  const t = await getTranslations({ locale, namespace: 'categories' });

  return (
    <section className="relative bg-muted/40 border-b border-border overflow-hidden py-10 sm:py-16 lg:py-20 min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-center justify-center">
      <Container className="relative z-10 max-w-4xl text-center space-y-4">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="font-sans text-xs text-muted-foreground flex items-center justify-center gap-2 mb-2"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            {locale === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{t('title')}</span>
        </nav>

        {/* Eyebrow Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-hover text-xs font-semibold uppercase tracking-wider font-sans">
          {t('heroEyebrow')}
        </span>

        {/* Heading H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
          {t('heroTitle')}
        </h1>

        {/* Gold Accent Divider */}
        <div className="w-16 h-0.5 bg-secondary mx-auto rounded-full my-2 opacity-80" />

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t('heroDesc')}
        </p>
      </Container>

      {/* Subtle Textile Texture / Radial Accent */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
