import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/domain/product/types';

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const t = useTranslations('product');
  const locale = useLocale() as 'bn' | 'en';
  const description = product.description[locale] || product.description.bn;

  return (
    <section className="space-y-4 font-sans bg-card p-6 rounded-md border border-border">
      <h2 className="font-serif font-bold text-xl text-foreground border-b border-border pb-2">
        {t('description')}
      </h2>
      <p className="text-sm text-foreground/90 leading-relaxed font-sans whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
