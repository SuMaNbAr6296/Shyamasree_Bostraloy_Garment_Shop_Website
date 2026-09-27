import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HeritageSection } from '@/components/home/HeritageSection';
import { CollectionShowcase } from '@/components/home/CollectionShowcase';
import { FinalCTA } from '@/components/home/FinalCTA';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <HeritageSection />
      <CollectionShowcase />
      <FinalCTA />
    </main>
  );
}
