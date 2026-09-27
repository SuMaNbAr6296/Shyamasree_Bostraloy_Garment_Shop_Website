import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { StoryPageClient } from '@/components/story/StoryPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'story' });
  const siteUrl = siteConfig.url;

  return {
    title: `${t('title')} — Shyamasree Bostraloy`,
    description: t('heroSubtitle'),
    openGraph: {
      title: `${t('title')} — Shyamasree Bostraloy`,
      description: t('heroSubtitle'),
      url: `${siteUrl}/${locale}/story`,
      siteName: siteConfig.name.en,
      images: [
        {
          url: `${siteUrl}${siteConfig.assets.banner}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name.en,
        },
      ],
      locale: locale === 'bn' ? 'bn_IN' : 'en_US',
      type: 'website',
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isBn = locale === 'bn';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: isBn ? siteConfig.name.bn : siteConfig.name.en,
    description: isBn ? siteConfig.description.bn : siteConfig.description.en,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    logo: `${siteConfig.url}${siteConfig.assets.logo}`,
    image: `${siteConfig.url}${siteConfig.assets.banner}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Opposite Dingal Post Office, Dingal Hattala',
      addressLocality: 'Dingal-Kamargeria',
      addressRegion: 'Paschim Medinipur, West Bengal',
      postalCode: '721232',
      addressCountry: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: isBn ? siteConfig.owner.bn : siteConfig.owner.en,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <StoryPageClient />
    </>
  );
}
