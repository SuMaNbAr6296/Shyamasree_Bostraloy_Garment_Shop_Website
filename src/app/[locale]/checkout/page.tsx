import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: 'bn' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'checkout' });

  return {
    title: `${t('title')} | Shyamasree Bostraloy`,
    description: locale === 'bn' ? 'শ্যামাশ্রী বস্ত্রালয় চেকআউট পৃষ্ঠা' : 'Shyamasree Bostraloy Checkout',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
