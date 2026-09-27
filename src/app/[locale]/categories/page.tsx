import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { categoryRepository } from '@/repositories';
import { CategoriesHero } from '@/components/categories/CategoriesHero';
import { CategoryShowcase } from '@/components/categories/CategoryShowcase';
import { CategoryEditorial } from '@/components/categories/CategoryEditorial';
import { CategoriesCTA } from '@/components/categories/CategoriesCTA';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const siteUrl = siteConfig.url;

  const isBn = locale === 'bn';
  const metaTitle = isBn
    ? 'বিভাগসমূহ | শ্যামাশ্রী বস্ত্রালয়'
    : 'Categories | Shyamasree Bostraloy';

  const metaDesc = isBn
    ? 'শাড়ি, থ্রি-পিস, কুর্তি, পুরুষদের পোশাক ও অন্যান্য ঐতিহ্যবাহী এবং সমকালীন বস্ত্রের সংগ্রহ দেখুন।'
    : 'Explore sarees, three-piece suits, kurtis, men ethnic wear and carefully selected traditional and contemporary textiles.';

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${siteUrl}/${locale}/categories`,
      siteName: siteConfig.name.en,
      images: [
        {
          url: `${siteUrl}${siteConfig.assets.banner}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name.en,
        },
      ],
      locale: isBn ? 'bn_IN' : 'en_US',
      type: 'website',
    },
  };
}

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as 'bn' | 'en';
  const categories = await categoryRepository.getAll();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: loc === 'bn' ? 'বিভাগসমূহ' : 'Categories',
    description:
      loc === 'bn'
        ? 'শ্যামাশ্রী বস্ত্রালয়ের সমস্ত শাড়ি ও বস্ত্রের বিভাগসমূহ'
        : 'All product categories at Shyamasree Bostraloy',
    url: `${siteConfig.url}/${locale}/categories`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((cat, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: cat.name[loc] || cat.name.bn,
        url: `${siteConfig.url}/${locale}/shop?category=${cat.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <CategoriesHero locale={loc} />
        <CategoryShowcase categories={categories} />
        <CategoryEditorial locale={loc} />
        <CategoriesCTA locale={loc} />
      </div>
    </>
  );
}
