import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

interface CategoriesCTAProps {
  locale: 'bn' | 'en';
}

export async function CategoriesCTA({ locale }: CategoriesCTAProps) {
  const t = await getTranslations({ locale, namespace: 'categories' });

  return (
    <Section size="md" className="py-12 sm:py-16 bg-background">
      <Container>
        <div className="bg-primary text-primary-foreground rounded-md p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-secondary px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs font-sans">
              {locale === 'bn' ? 'শ্যামাশ্রী বস্ত্রালয়' : 'Shyamasree Bostraloy'}
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              {t('ctaTitle')}
            </h2>

            <p className="font-sans text-sm text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
              {t('ctaDesc')}
            </p>

            <div className="pt-4">
              <Link href="/shop">
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2 font-bold shadow-md hover:bg-secondary-hover text-secondary-foreground"
                >
                  <span>{t('ctaButton')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Radial Gold Lighting */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </Container>
    </Section>
  );
}
