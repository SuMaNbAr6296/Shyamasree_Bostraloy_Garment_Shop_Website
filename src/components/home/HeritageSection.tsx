import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { ArrowRight } from 'lucide-react';

export function HeritageSection() {
  const t = useTranslations('home');

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-card via-background to-muted/30 border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Editorial Banner Visual */}
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-md border border-secondary/30 shadow-md">
            <Image
              src={siteConfig.assets.banner}
              alt={t('heritageTitle')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Heritage Copy Composition */}
          <div className="space-y-5 text-left">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              {t('heritageEyebrow')}
            </Badge>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {t('heritageTitle')}
            </h2>

            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t('heritageDesc')}
            </p>

            <div className="pt-2">
              <Link href="/story">
                <Button variant="primary" size="md">
                  <span>{t('storyCTA')}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
