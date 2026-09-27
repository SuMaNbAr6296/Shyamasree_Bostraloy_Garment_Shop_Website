import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

interface CategoryEditorialProps {
  locale: 'bn' | 'en';
}

export async function CategoryEditorial({ locale }: CategoryEditorialProps) {
  const t = await getTranslations({ locale, namespace: 'categories' });

  return (
    <Section size="md" className="py-12 sm:py-16 lg:py-20 bg-muted/20 border-y border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Image */}
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 rounded-md overflow-hidden border border-secondary/30 shadow-md group bg-muted">
            <Image
              src="/assets/hero/hero-01.png"
              alt={t('editorialTitle')}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-4 left-4 right-4 text-white p-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-secondary/90 text-secondary-foreground">
                <Sparkles className="w-3 h-3" />
                <span>{locale === 'bn' ? 'ডিঙ্গাল হাটতলা বুটিক' : 'Dingal Hattala Boutique'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Copy & CTA */}
          <div className="lg:col-span-6 space-y-6 font-sans">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t('editorialEyebrow')}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground leading-tight">
                {t('editorialTitle')}
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              {t('editorialDesc')}
            </p>

            <div className="pt-2">
              <Link href="/shop">
                <Button variant="primary" size="lg" className="gap-2 font-bold shadow-md">
                  <span>{t('editorialCTA')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
