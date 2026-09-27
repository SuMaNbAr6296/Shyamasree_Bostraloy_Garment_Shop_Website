import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { ContactPageClient } from '@/components/contact/ContactPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const siteUrl = siteConfig.url;

  return {
    title: `${t('title')} — Shyamasree Bostraloy`,
    description: siteConfig.description[locale as 'bn' | 'en'],
    openGraph: {
      title: `${t('title')} — Shyamasree Bostraloy`,
      description: siteConfig.description[locale as 'bn' | 'en'],
      url: `${siteUrl}/${locale}/contact`,
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isBn = locale === 'bn';

  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: isBn ? siteConfig.name.bn : siteConfig.name.en,
    description: isBn ? siteConfig.description.bn : siteConfig.description.en,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    priceRange: '₹₹',
    image: `${siteConfig.url}${siteConfig.assets.banner}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Opposite Dingal Post Office, Dingal Hattala',
      addressLocality: 'Dingal-Kamargeria',
      addressRegion: 'Paschim Medinipur, West Bengal',
      postalCode: '721232',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.61541',
      longitude: '87.52554',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
