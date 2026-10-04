import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { collectionRepository } from '@/repositories';
import { getTranslations, getLocale } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';

export async function CollectionShowcase() {
  const collections = await collectionRepository.getFeatured();
  const t = await getTranslations('home');
  const locale = (await getLocale()) as 'bn' | 'en';

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <Section
      size="md"
      eyebrow={t('collectionsEyebrow')}
      title={t('collectionsTitle')}
      className="bg-background border-b border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {collections.map((col) => {
          const name = col.name[locale] || col.name.bn;
          const desc = col.description[locale] || col.description.bn;

          return (
            <Link
              key={col.id}
              href={`/shop?collection=${col.slug}`}
              className="group relative overflow-hidden rounded-md border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:border-secondary/50 flex flex-col"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/20">
                {col.image ? (
                  <Image
                    src={col.image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    {name}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-amber-200 transition-colors">
                    {name}
                  </h3>
                  <p className="font-sans text-xs text-zinc-200 line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-card flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                <span>{locale === 'bn' ? 'সংগ্রহ দেখুন' : 'Explore Collection'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
