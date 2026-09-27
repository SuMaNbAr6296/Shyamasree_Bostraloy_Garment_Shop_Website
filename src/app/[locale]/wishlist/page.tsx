import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { WishlistPageClient } from '@/components/wishlist/WishlistPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'wishlist' });

  return {
    title: `${t('title')} — Shyamasree Bostraloy`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function WishlistPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WishlistPageClient />;
}
